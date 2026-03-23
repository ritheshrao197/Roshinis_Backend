
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
 userId:String,
 items:[{
  productId:String,
  quantity:Number,
  price:Number
 }],
 totalAmount:Number,
 paymentStatus:String,
 orderStatus:{type:String,default:"Pending"},
 createdAt:{type:Date,default:Date.now}
});

module.exports = mongoose.model("Order",orderSchema);
