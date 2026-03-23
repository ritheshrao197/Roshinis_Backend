
const Order=require("../models/Order")
const {v4:uuid}=require("uuid")

exports.createOrder=async(req,res)=>{

 const orderId="ORD-"+uuid()

 const order=await Order.create({
  orderId,
  ...req.body
 })

 res.json(order)

}

exports.getOrders=async(req,res)=>{

 const orders=await Order.find()

 res.json(orders)

}
