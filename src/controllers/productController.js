
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

exports.getProductById=async(req,res)=>{
 const product=await Product.findById(req.params.id)

 if(!product){
  return res.status(404).json({message:"Product not found"})
 }

 res.json(product)
}

exports.createProduct=async(req,res)=>{
 const product=await Product.create({
  ...req.body,
  updatedAt:new Date()
 })
 res.status(201).json(product)
}

exports.updateProduct=async(req,res)=>{
 const product=await Product.findByIdAndUpdate(
  req.params.id,
  {
   ...req.body,
   updatedAt:new Date()
  },
  {new:true,runValidators:true}
 )

 if(!product){
  return res.status(404).json({message:"Product not found"})
 }

 res.json(product)
}

exports.deleteProduct=async(req,res)=>{
 const product=await Product.findByIdAndDelete(req.params.id)

 if(!product){
  return res.status(404).json({message:"Product not found"})
 }

 res.json({message:"Product deleted successfully"})
}
