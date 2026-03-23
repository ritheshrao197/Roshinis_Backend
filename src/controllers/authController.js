
const User=require("../models/User")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

const sanitizeUser=user=>{
 const obj=user.toObject ? user.toObject() : user
 delete obj.password
 return obj
}

exports.register=async(req,res)=>{

 const {name,email,password}=req.body

 const existingUser=await User.findOne({email})

 if(existingUser){
  return res.status(400).json({message:"Email already registered"})
 }

 const hash=await bcrypt.hash(password,10)

 const user=await User.create({name,email,password:hash})

 const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})

 res.status(201).json({user:sanitizeUser(user),token})

}

exports.login=async(req,res)=>{

 const {email,password}=req.body

 const user=await User.findOne({email})

 if(!user) return res.status(400).json({message:"User not found"})

 const match=await bcrypt.compare(password,user.password)

 if(!match) return res.status(400).json({message:"Invalid password"})

 const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})

 res.json({user:sanitizeUser(user),token})

}

exports.getProfile=async(req,res)=>{
 res.json({user:sanitizeUser(req.user)})
}

exports.updateProfile=async(req,res)=>{
 const {name,email,password}=req.body

 if(email && email!==req.user.email){
  const existingUser=await User.findOne({email})

  if(existingUser){
   return res.status(400).json({message:"Email already registered"})
  }

  req.user.email=email
 }

 if(name!==undefined){
  req.user.name=name
 }

 if(password){
  req.user.password=await bcrypt.hash(password,10)
 }

 await req.user.save()

 res.json({user:sanitizeUser(req.user)})
}
