
const Order=require("../models/Order")
const Product=require("../models/Product")
const User=require("../models/User")

const formatUser=user=>{
 const obj=user.toObject ? user.toObject() : user
 delete obj.password
 obj.username=obj.username || (obj.email ? obj.email.split("@")[0] : "")
 return obj
}

exports.dashboard=async(req,res)=>{

 const products=await Product.countDocuments()
 const orders=await Order.countDocuments()
 const users=await User.countDocuments()

 const revenueData=await Order.find()

 let revenue=0
 revenueData.forEach(o=>{
  revenue+=o.totalAmount||0
 })

 res.json({products,orders,users,revenue})

}

exports.getUsers=async(req,res)=>{
 const users=await User.find().sort({createdAt:-1})
 res.json(users.map(formatUser))
}

exports.getUserById=async(req,res)=>{
 const user=await User.findById(req.params.id)

 if(!user){
  return res.status(404).json({message:"User not found"})
 }

 res.json(formatUser(user))
}
