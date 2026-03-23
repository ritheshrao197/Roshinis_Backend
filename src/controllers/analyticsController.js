
const Product=require("../models/Product")

exports.dashboard=async(req,res)=>{

 const products=await Product.countDocuments()

 res.json({
  totalProducts:products
 })

}
