
const router=require("express").Router()
const c=require("../controllers/productController")

router.get("/",c.getProducts)
router.get("/search",c.searchProducts)
router.post("/",c.createProduct)

module.exports=router
