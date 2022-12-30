const express = require("express");
const paymentRouter = express.Router();

paymentRouter.post("/api/verifyPayment",(req , res) => {
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
        res.redirect("/");
    }else{
        res.send("Payment failder");
    }
})

module.exports = paymentRouter;

