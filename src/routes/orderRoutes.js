
const router=require("express").Router()
const c=require("../controllers/orderController")

router.post("/",c.createOrder)
router.get("/",c.getOrders)
router.get("/:id",c.getOrderById)
router.put("/:id/status",c.updateOrderStatus)

module.exports=router
