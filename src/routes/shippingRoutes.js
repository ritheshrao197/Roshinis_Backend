
const router=require("express").Router()
const c=require("../controllers/shippingController")

router.post("/calculate",c.calculateShipping)

module.exports=router
