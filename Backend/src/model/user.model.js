const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    username:{
        type:String,
        required:true,
        unique:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        default:null
    },

    googleId:{
        type:String,
        default:null
    },

    profilePicture:{
        type:String,
        default:null
    }

});

module.exports = mongoose.model("users", userSchema);