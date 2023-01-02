const express = require("express");
const paymentRouter = express.Router();
const Razorpay = require('razorpay');
const userModel = require("../models/userModel");


paymentRouter.post("/api/verifyPayment", async (req , res) => {
    const {razorpay_payment_id, razorpay_order_id, razorpay_signature} = req.body;
    
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    var crypto = require("crypto");
    var expectedSignature = crypto.createHmac('sha256', process.env.key_secret)
                                    .update(body.toString())
                                    .digest('hex');
                                    console.log("sig received " ,razorpay_signature);
                                    console.log("sig generated " ,expectedSignature);
  
    var response = {"signatureIsValid":"false"};
    if(expectedSignature === razorpay_signature)
        response={"signatureIsValid":"true"}
    
    if(response){
        var instance = new Razorpay({ key_id: process.env.key_id, key_secret: process.env.key_secret });
        const order = await instance.orders.fetch(razorpay_order_id);
        const plan = {
            name: order.notes[0],
            amount: order.amount / 100
        }

        // Update user by id
        await userModel.updateOne({_id: order.notes[1]}, {plan})


        console.log(res.session);
        res.redirect("/");
    }else{
        res.send("Payment unsuccessful");
    }
})

module.exports = paymentRouter;

