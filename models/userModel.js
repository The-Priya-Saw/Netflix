const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true
    },
    plan: {
        name: {
            type: String
        },
        amount: {
            type: Number
        }
    }
});

const userModel = mongoose.model("User",UserSchema);

module.exports = userModel;