const express = require("express");
const env = require("dotenv");
const fs = require("fs");
env.config();
const port = process.env.port | 3000;

const orderRoute = require("./routes/orderRoute");
const paymentRouter = require("./routes/payymentRoute");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extends: true}));
app.use(express.static(__dirname +  "/public"));

app.get("/",(req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.use(orderRoute);
app.use(paymentRouter);


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