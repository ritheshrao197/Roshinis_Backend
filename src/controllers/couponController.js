
const Coupon=require("../models/Coupon")

exports.applyCoupon=async(req,res)=>{

 const {code,total}=req.body

 const coupon=await Coupon.findOne({code})

 if(!coupon) return res.json({valid:false})

 const discount=coupon.discountValue

 res.json({
  valid:true,
  discount,
  newTotal:total-discount
 })

}
