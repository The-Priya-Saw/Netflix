const express = require("express");
const router = express.Router();
const Razorpay = require('razorpay');
const jwt = require("jsonwebtoken");



//refer razor pay api documentation for generating order id

router.post("/api/orders", (req,res) => {
    const userData = jwt.verify(req.session.jwt,process.env.secret);
    console.log(userData);
    const orderAmount = req.body.amount;
    console.log(orderAmount);
    var instance = new Razorpay({ key_id: process.env.key_id, key_secret: process.env.key_secret });
    console.log(req.session.jwt);
    var options = {
        amount: orderAmount * 100,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11",
        notes: [req.body.plan, userData.id]
    };

    instance.orders.create(options, async (err, order) => {
        if(err){
            console.error(err.message);
            res.status(400).send(err);
        }else{
            // console.log(await instance.orders.fetch(order.id));
            order.plan = req.body.plan;
            res.status(200).send(order);
        }
    });
});


module.exports = router;