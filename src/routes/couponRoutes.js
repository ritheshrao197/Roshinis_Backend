
const router=require("express").Router()
const c=require("../controllers/couponController")

router.post("/apply",c.applyCoupon)

module.exports=router
