
const Cart = require("../models/Cart");

exports.getCart = async(req,res)=>{

 const cart = await Cart.findOne({userId:req.user.id});

 res.json(cart);

};

exports.addToCart = async(req,res)=>{

 const {productId,quantity} = req.body;

 let cart = await Cart.findOne({userId:req.user.id});

 if(!cart){
  cart = await Cart.create({userId:req.user.id,items:[{productId,quantity}]});
 }else{
  cart.items.push({productId,quantity});
  await cart.save();
 }

 res.json(cart);

};
