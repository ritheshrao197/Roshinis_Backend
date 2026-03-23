
const Product=require("../models/Product")

exports.getReviews=async(req,res)=>{
 const product=await Product.findById(req.params.productId)

 if(!product){
  return res.status(404).json({message:"Product not found"})
 }

 res.json(product.reviews || [])
}

exports.addReview=async(req,res)=>{

 const {productId,userId,rating,comment}=req.body

 const product=await Product.findById(productId)

 if(!product){
  return res.status(404).json({message:"Product not found"})
 }

 product.reviews.push({userId,rating,comment})

 await product.save()

 res.json(product)

}
