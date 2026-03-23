
const router=require("express").Router()
const c=require("../controllers/orderController")

router.post("/",c.createOrder)
router.get("/",c.getOrders)

module.exports=router
