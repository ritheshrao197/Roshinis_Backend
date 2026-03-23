
const mongoose=require("mongoose")

const schema=new mongoose.Schema({
 code:String,
 discountType:String,
 discountValue:Number,
 expiryDate:Date,
 active:Boolean
})

module.exports=mongoose.model("Coupon",schema)
