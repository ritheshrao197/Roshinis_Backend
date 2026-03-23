
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

exports.register = async(req,res)=>{

 const {name,email,password} = req.body;

 const hash = await bcrypt.hash(password,10);

 const user = await User.create({name,email,password:hash});

 res.json({user,token:generateToken(user._id)});

};

exports.login = async(req,res)=>{

 const {email,password} = req.body;

 const user = await User.findOne({email});

 if(!user) return res.status(400).json({message:"User not found"});

 const match = await bcrypt.compare(password,user.password);

 if(!match) return res.status(400).json({message:"Invalid password"});

 res.json({user,token:generateToken(user._id)});

};
