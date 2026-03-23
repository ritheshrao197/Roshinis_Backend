const jwt=require("jsonwebtoken")
const User=require("../models/User")

exports.requireAuth=async(req,res,next)=>{
 const header=req.headers.authorization||""

 if(!header.startsWith("Bearer ")){
  return res.status(401).json({message:"Authorization token required"})
 }

 const token=header.slice(7)

 try{
  const decoded=jwt.verify(token,process.env.JWT_SECRET)
  const user=await User.findById(decoded.id)

  if(!user){
   return res.status(401).json({message:"User not found"})
  }

  req.user=user
  next()
 }catch(err){
  return res.status(401).json({message:"Invalid token"})
 }
}
