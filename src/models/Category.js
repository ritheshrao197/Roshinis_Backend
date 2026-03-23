
const mongoose=require("mongoose")

const schema=new mongoose.Schema({
 name:String,
 description:String,
 createdAt:{type:Date,default:Date.now}
})

module.exports=mongoose.model("Category",schema)
