
const Category=require("../models/Category")

exports.getCategories=async(req,res)=>{
 const categories=await Category.find()
 res.json(categories)
}

exports.createCategory=async(req,res)=>{
 const cat=await Category.create(req.body)
 res.json(cat)
}
