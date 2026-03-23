
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
