const mongoose=require("mongoose")

const schema=new mongoose.Schema({
 name:String,
 description:String,
 price:Number,
 originalPrice:Number,
 sku:String,
 ingredients:[String],
 benefits:[String],
 nutritionFacts:Object,
 category:String,
 stock:Number,
 image:String,
 images:[String],
 reviews:[{
   userId:String,
   rating:Number,
   comment:String
 }],
 createdAt:{type:Date,default:Date.now},
 updatedAt:{type:Date,default:Date.now}
})

schema.index({name:"text",description:"text"})

module.exports=mongoose.model("Product",schema)
