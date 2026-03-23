
const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");

exports.dashboard = async(req,res)=>{

 const products = await Product.countDocuments();
 const orders = await Order.countDocuments();
 const users = await User.countDocuments();

 const revenueData = await Order.find();

 let revenue = 0;

 revenueData.forEach(o=>{
  revenue += o.totalAmount || 0;
 });

 res.json({products,orders,users,revenue});

};
