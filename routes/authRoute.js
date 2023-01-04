const express = require("express");
const router = express.Router();
const authController = require("../controller/authController.js");


router.post('/api/signup' , authController.signup);

router.post('/api/login' , authController.login);

router.get("/api/signout", authController.signout);

module.exports = router;

