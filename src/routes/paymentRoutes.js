
const router=require("express").Router()
const c=require("../controllers/paymentController")

router.post("/phonepe",c.phonepe)
router.post("/razorpay",c.razorpay)
router.post("/cod",c.cod)

module.exports=router
