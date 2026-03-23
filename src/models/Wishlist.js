
const mongoose=require("mongoose")

const schema=new mongoose.Schema({
 userId:String,
 products:[{productId:String}]
})

module.exports=mongoose.model("Wishlist",schema)
