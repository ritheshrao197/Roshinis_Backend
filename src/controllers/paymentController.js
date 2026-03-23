
const {createPhonePePayment}=require("../services/phonepeService")
const {createRazorpayOrder}=require("../services/razorpayService")

exports.phonepe=async(req,res)=>{

 const {orderId,amount}=req.body

 const response=await createPhonePePayment(orderId,amount)

 res.json(response)

}

exports.razorpay=async(req,res)=>{

 const {amount}=req.body

 const order=await createRazorpayOrder(amount)

 res.json(order)

}

exports.cod=async(req,res)=>{

 res.json({
  message:"Order placed with Cash on Delivery"
 })

}
