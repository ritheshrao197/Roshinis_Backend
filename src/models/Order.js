
const mongoose=require("mongoose")

const schema=new mongoose.Schema({
 orderId:String,
 userId:String,
 items:[{
   productId:String,
   quantity:Number,
   price:Number
 }],
 totalAmount:Number,
 paymentMethod:String,
 paymentStatus:String,
 orderStatus:{type:String,default:"Pending"},
 createdAt:{type:Date,default:Date.now}
})

module.exports=mongoose.model("Order",schema)
