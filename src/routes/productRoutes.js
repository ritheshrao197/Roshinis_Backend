
const router=require("express").Router()
const c=require("../controllers/productController")

router.get("/",c.getProducts)
router.post("/",c.createProduct)

module.exports=router
