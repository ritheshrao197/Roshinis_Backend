
const Category=require("../models/Category")

exports.getCategories=async(req,res)=>{
 const categories=await Category.find()
 res.json(categories)
}

exports.createCategory=async(req,res)=>{
 const cat=await Category.create(req.body)
 res.status(201).json(cat)
}

exports.updateCategory=async(req,res)=>{
 const cat=await Category.findByIdAndUpdate(
  req.params.id,
  req.body,
  {new:true,runValidators:true}
 )

 if(!cat){
  return res.status(404).json({message:"Category not found"})
 }

 res.json(cat)
}

exports.deleteCategory=async(req,res)=>{
 const cat=await Category.findByIdAndDelete(req.params.id)

 if(!cat){
  return res.status(404).json({message:"Category not found"})
 }

 res.json({message:"Category deleted successfully"})
}
