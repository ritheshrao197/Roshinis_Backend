
const Order=require("../models/Order")
const {v4:uuid}=require("uuid")

exports.createOrder=async(req,res)=>{

 const orderId="ORD-"+uuid()

 const order=await Order.create({
  orderId,
  ...req.body
 })

 res.status(201).json(order)

}

exports.getOrders=async(req,res)=>{

 const orders=await Order.find()

 res.json(orders)

}

exports.getOrderById=async(req,res)=>{
 const query=req.params.id.startsWith("ORD-")
  ? {orderId:req.params.id}
  : {_id:req.params.id}

 const order=await Order.findOne(query)

 if(!order){
  return res.status(404).json({message:"Order not found"})
 }

 res.json(order)
}

exports.updateOrderStatus=async(req,res)=>{
 const order=await Order.findOneAndUpdate(
  req.params.id.startsWith("ORD-") ? {orderId:req.params.id} : {_id:req.params.id},
  {orderStatus:req.body.orderStatus || req.body.status},
  {new:true}
 )

 if(!order){
  return res.status(404).json({message:"Order not found"})
 }

 res.json(order)
}
