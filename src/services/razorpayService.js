
exports.createRazorpayOrder=async(amount)=>{
 let Razorpay

 try{
  Razorpay=require("razorpay")
 }catch(err){
  throw new Error("Razorpay SDK is not installed on the backend")
 }

 if(!process.env.RAZORPAY_KEY || !process.env.RAZORPAY_SECRET){
  throw new Error("Razorpay environment variables are missing")
 }

 const razorpay=new Razorpay({
  key_id:process.env.RAZORPAY_KEY,
  key_secret:process.env.RAZORPAY_SECRET
 })

 const order=await razorpay.orders.create({
  amount:amount*100,
  currency:"INR"
 })

 return order

}
