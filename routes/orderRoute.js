const express = require("express");
const router = express.Router();
const Razorpay = require('razorpay');


//refer razor pay api documentation for generating order id
router.post("/api/orders", (req,res) => {
    const orderAmount = req.body.amount;
    console.log(orderAmount);
    var instance = new Razorpay({ key_id: process.env.key_id, key_secret: process.env.key_secret });
    
    var options = {
        amount: orderAmount * 100,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11",
    };

    instance.orders.create(options, (err, order) => {
        if(err){
            console.error(err.message);
            res.status(400).send(err);
        }else{
            console.log(order);
            order.plan = req.body.plan;
            res.status(200).send(order);
        }
    });
});


module.exports = router;