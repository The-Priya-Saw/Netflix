//steps for setup
//import module
//app
//db
//middleware
//route
//port
//listener

const express = require("express");
const env = require("dotenv");
const fs = require("fs");
env.config();
const port = process.env.port | 3000;
const cookieSession = require("cookie-session");
const jwt = require("jsonwebtoken");
const app = express();

const orderRoute = require("./routes/orderRoute");
const paymentRouter = require("./routes/payymentRoute");
const authRoute = require("./routes/authRoute.js");
const { default: mongoose } = require("mongoose");
const userModel = require("./models/userModel");

//middlewares
app.use(express.json());

app.use(cookieSession({
  signed: false,
  secure: false
})); 
app.use(express.urlencoded({extends: true}));
app.use(express.static(__dirname +  "/public"));

app.get("/",async (req, res) => {
  console.log("happy new year");
  if(req.session && req.session.jwt){
    console.log(req.session.jwt);
    //data stored to session is decrypted using secret key stored in .env file.
    //below syntax can be use to fetch user data from session and store it in decrypted form in given variable.
    try {
      const userData = await jwt.verify(req.session.jwt, process.env.secret);

      // User data fetched from mongodb by user id
      const loggedInUser = await userModel.findById(userData.id);

      if(!loggedInUser.plan.name){
        res.redirect("/plans");
      }else{
        res.sendFile(__dirname + "/public/home.html");
      }
    } catch (error) {
      console.log("wrong jwt");
    }
  }else{
    res.redirect("/signInPage");
  }
  
});


// Routes
app.use(orderRoute);
app.use(paymentRouter);
app.use(authRoute);


const mongodbUrl = "mongodb+srv://priya_saw:rpV8aZjDBt46dWBb@cluster0.lw1ofgj.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongodbUrl,(error) => {
  if(error){
    console.error(error);
  }
  else{
    console.log("database is connected")
  }
} )


// localhost:300/api/platom => /apt/order => [order,apt]
app.get("*", (req, res) => {
    const route = req.path.split("/").reverse()[0];
    const path = `${__dirname}/public/${route}.html`;
    console.log(path);
    if (fs.existsSync(path)) {
      res.sendFile(path);
    } else {
      res.send("404 Page not found");
    }
  });




app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})