
const mongoose=require("mongoose")

const schema=new mongoose.Schema({
 name:String,
 price:Number,
 description:String,
 category:String,
 stock:Number,
 image:String,
 createdAt:{type:Date,default:Date.now}
})

module.exports=mongoose.model("Product",schema)
