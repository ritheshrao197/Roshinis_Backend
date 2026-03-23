
const {createPhonePePayment}=require("../services/phonepeService")
const {createRazorpayOrder}=require("../services/razorpayService")

exports.phonepe=async(req,res)=>{

 const {orderId,amount}=req.body

 try{
  const response=await createPhonePePayment(orderId,amount)

  res.json(response)
 }catch(err){
  res.status(500).json({message:err.message || "PhonePe payment failed"})
 }

}

exports.razorpay=async(req,res)=>{

 const {amount}=req.body

 try{
  const order=await createRazorpayOrder(amount)

  res.json(order)
 }catch(err){
  res.status(500).json({message:err.message || "Razorpay order creation failed"})
 }

}

exports.cod=async(req,res)=>{

 res.json({
  message:"Order placed with Cash on Delivery"
 })

}
