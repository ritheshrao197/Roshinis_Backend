
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
 name:String,
 description:String,
 price:Number,
 category:String,
 stock:Number,
 image:String,
 rating:{type:Number,default:0},
 reviews:[{
   userId:String,
   rating:Number,
   comment:String
 }],
 createdAt:{type:Date,default:Date.now}
});

module.exports = mongoose.model("Product",productSchema);
