const UserModel = require("../models/userModel.js");
const jwt = require("jsonwebtoken");

module.exports.signup = async (req, res) => {
    const emailId = req.body.email;
    const password = req.body.password;



    try {
        if(emailId.length < 5){
            throw new Error("Please enter a valid email");
        }
        if(password.length < 6){
            throw new Error("Please enter a valid password");
        }

        const user = await UserModel.create({
            email: emailId,
            password: password
        });

        const userData = {id: user.id, email: user.email, plan: user.plan};

        // Generate JWT
        const userJwt = jwt.sign(userData,process.env.secret);
        console.log(userJwt);

        // Send jwt as a cookie
        req.session.jwt = userJwt;
        
        // Send userdata as response
        res.send(userData);
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ error: error.message })
    }
}


module.exports.login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const checkUser = await UserModel.findOne({email, password});

    if(checkUser){
        console.log("Logged in", checkUser);
        const userData = {id: checkUser.id, email: checkUser.email, plan: checkUser.plan};

        // Generate JWT
        const userJwt = jwt.sign(userData,process.env.secret);
        console.log(userJwt);

        // Send jwt as a cookie
        req.session.jwt = userJwt;

        res.status(200).send(userData);
    }else{
        console.log("Invalid email or password");
        res.status(400).send({error: "Invalid email or passwod"});
    }
}


module.exports.signout = (req, res) => {
    req.session = null;
    res.redirect("/signInPage");
}