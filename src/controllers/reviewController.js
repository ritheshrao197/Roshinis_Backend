
const Product=require("../models/Product")

exports.addReview=async(req,res)=>{

 const {productId,userId,rating,comment}=req.body

 const product=await Product.findById(productId)

 product.reviews.push({userId,rating,comment})

 await product.save()

 res.json(product)

}
