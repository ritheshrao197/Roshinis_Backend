
const Wishlist=require("../models/Wishlist")

exports.getWishlist=async(req,res)=>{
 const list=await Wishlist.findOne({userId:req.query.userId})
 res.json(list)
}

exports.addToWishlist=async(req,res)=>{

 const {userId,productId}=req.body

 let list=await Wishlist.findOne({userId})

 if(!list){
  list=await Wishlist.create({userId,products:[{productId}]})
 }else{
  list.products.push({productId})
  await list.save()
 }

 res.json(list)

}

exports.removeFromWishlist=async(req,res)=>{
 const userId=req.body.userId||req.query.userId
 const productId=req.body.productId||req.query.productId

 if(!userId || !productId){
  return res.status(400).json({message:"userId and productId are required"})
 }

 const list=await Wishlist.findOne({userId})

 if(!list){
  return res.status(404).json({message:"Wishlist not found"})
 }

 list.products=list.products.filter(item=>item.productId!==productId)
 await list.save()

 res.json(list)
}
