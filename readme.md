HOW TO SETUP MERN PROJECT:

- install node from official website
- create folder and open with vs code
- run the command :  npx create-react-app appName
- delete the unnecessary files,logos,images
- in public folder, there will be your index.html file
- in server folder, create app.js file

-----------------------------------------------------------
NODEMON: nodemon is use for hot loading. we do not have to run node server again and again.
setup for nodemon:

1. install nodemon(eg. npm i nodemon)
2. go to packag.json
3. in scripts object add one more key value pair as

"scripts:{
"start": nodemon app.js,
}

------------------------------------------------------------
SETUP : app.js

Follow these below steps in  app.js file

1. import modules or packages like express mongoose

- first install (eg. npm i express mongoose dotenv) the packages before importing (eg. const express = require("express"))


2. app
 eg. const app = express();

3. connecting to mongodb by using mongoose:
connect to mongodb database :
- login to mongodb atlas
- create cluster
- create collections
- provide database access by clicking on "add new database users"
- now click on connect button and copy the mongodb  connection link
- then paste it in the code and modify the link by editing the username and password in the link

example: 

const mongodbURl = " link";

mongoose.connect(mongodbUrl )
.then(() => console.log("db connected"))
.catch( err => conole.log("db connecction error",err));


4. middleware(add middleware if any needed).
example: 
- app.use(morgan("dev"))
- app.use(express.static('public'));

5. routes( here you will import the route which u will create in router folder(eg. router/textRouter.js) )

eg.   const testRoutes = require("./routes/testRouter");
      app.use("/" testRoutes);



6. port 
- create .env file and set the port number(eg. PORT=8000)

const port = process.env.PORT || 3000;

7. listeners

eg. const server = app.listener(port, () => console.log(server running at `${port}`));


---------------------------------------------------------------------------------------

HOW TO CONNECT FRONTEND WITH BACKEND:

- in server folder, create folders for 
1)contoller
2)routes
3)models ( in the folder we define the json schema for storing data by importing mongoose schema)
4)middleware

------------------------------------------------------------------------------------------

CONTROLLER SETUP : testController.js 

eg.  exports.getTest = async (req res) => {
    res.status(200).json({
        message: 'Test api is working'
    })
}


- Now import this controller in router testRouter.js file

------------------------------------------------------------------------------------------

ROUTER SETUP: testRouter.js

1. import modules

eg. const express = require("express");
    const router = express.Router();

_____________________________________________________________________________________

2. import controllers

eg. const{getTest} = require("../controllers/testController");

____________________________________________________________________________________
3. import middlewares if any (this is needed for api)


____________________________________________________________________________________

4. api routes

eg. router.get('/test', getTest);

// when we visit the site https://localhost:3000/test ,   
//then it will execute the function getTest which was in testController.js file


_____________________________________________________________________________________

5. export( this is done so that we can use this router in the main app.js file)

eg.  module.exports = router;




---------------------------------------------------













How to implement user authentication to our node application using jwt(json web token):
SETUP: 
1) add middleware by using this code:
app.use(express.static('public'));  
This will allow you to use display static html pages to localhost server

2) connect to  mongodb database

3) auth routes:

- /signup  GET     sign up page
- /login   GET     log in page
- /signup  POST    create a new user in the database
- /login   POST    authenticate a current user
- /logout  GET     log a user out

4) routes: 
- create a route folder and inside that create a js file(eg. authroutes.js) to specify all the required auth routes to  handle authentication
- inside the js file in route folder, import express, import router, set auth routes by using following code:
-example1 :
router.get('/signup', () => {});
router.post('/signup', () => {});
router.get('/login', () => {});
router.post('/login', () => {});

5) controller
- now create controller folder and inside that again create one js file (eg. authController.js) 
- in controller file you will be creating  function  for each auth routes.
- example2:

module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.signup_post = (req, res) => {
    res.send('signup');
}

module.exports.login_post= (req, res) => {
    res.render('login');
}

6) now import that controller file in authroute.js and call the functions of auth controller in router.get and router.post 


___________________________________________________________________________________________________________________

DEPLOY APP USING AZURE COSMOS DB :

1.  in config file, set the remote url and local url.

eg. module.exports = {
    remoteUrl : "paste link here",
    localUrl: "link"
};

2. open azure portal, search for azure cosmo db and select azure cosmo. it will open the cosmo db dashboard

3. click on add button, and do all the configurations and clck on create button

4. now click on resources, u will be able to see all the details of your db and then click on connection string

5. go to connection string, copy the primary connection string and use as environment variable

6. mongoose.connect(process.env.CUSTOMCONNSTR_MyConnectionString || database.localURl);

7. here CUSTOMCONNSTR is the env variable provided by azure and MyConnectionString is the variable which we will declare on azure

8. push the changes to git

9. now go to app services of azure

10. click on add, then select web app, enter all details and click on create. 

11. now go to resources which u created and click on deployment options

12. select github,enter required details and click on ok.

13. now go to application settings, go to connection string, enter "MyConnectionString" as key

14. paste primary connection string as value and choose custom string then save it

15. go to overview. and ur app is deployed. click on data explorer to see the collections of data of ur app  




 
____________________________________________________________________________________________________________________
 references: https://dev.to/kunaal438/how-to-create-netflix-clone-netflix-clone-with-hmtl-css-js-989

