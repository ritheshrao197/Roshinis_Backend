
const Product=require("../models/Product")

exports.getProducts=async(req,res)=>{
 const products=await Product.find()
 res.json(products)
}

exports.searchProducts=async(req,res)=>{
 const q=req.query.q
 const products=await Product.find({$text:{$search:q}})
 res.json(products)
}

exports.createProduct=async(req,res)=>{
 const product=await Product.create(req.body)
 res.json(product)
}
