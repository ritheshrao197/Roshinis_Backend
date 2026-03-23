
const Product=require("../models/Product")
const Order=require("../models/Order")
const User=require("../models/User")

exports.dashboard=async(req,res)=>{

 const products=await Product.countDocuments()
 const orders=await Order.countDocuments()
 const users=await User.countDocuments()
 const inStockProducts=await Product.countDocuments({stock:{$gt:0}})
 const revenueData=await Order.find()

 let revenue=0
 revenueData.forEach(order=>{
  revenue+=order.totalAmount||0
 })

 res.json({
  totalProducts:products,
  totalOrders:orders,
  totalUsers:users,
  totalRevenue:revenue,
  inStockProducts
 })

}
