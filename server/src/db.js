const mongoose = require("mongoose");

const connect = async () =>{
    try{
        await mongoose.connect("mongodb://admin:fullstack@localhost:27017/shop?authSource=admin");
        console.log("Mongoose connected")
    }catch(e){
        console.error(`Couldn't connect to MongoDB with Mongoose: ${e}`);
    }
}

module.exports={connect};