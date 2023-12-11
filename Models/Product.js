const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");


const productSchema = new mongoose.Schema({
    name : {
        type:String,
        required:[true,"Product Name Must be Provied"]
    },
    price:{
        type:Number,
        required:[true,"Product price must be provided"]
    },
    featured:{
        type:Boolean,
        default:false
    },
    rating:{
        type:Number,
        default:4.5
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    company:{
        type:String,
        enum:{
            values:["marcos","liddy","ikea","caressa"]
        },
    },
});

module.exports = mongoose.model("Product",productSchema);