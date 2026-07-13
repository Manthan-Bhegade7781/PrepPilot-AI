const mongoose = require("mongoose");

async function connectDB(){

    try{
        await mongoose.connect(process.env.MONGO_URL);

        console.log("MongoDB connected Successfully..!!");

    }catch(err){

        console.log(err);
        
    }
}

module.exports = connectDB;