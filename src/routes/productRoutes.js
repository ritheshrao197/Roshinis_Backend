
const router=require("express").Router()
const c=require("../controllers/productController")

router.get("/",c.getProducts)
router.get("/search",c.searchProducts)
router.get("/:id",c.getProductById)
router.post("/",c.createProduct)
router.put("/:id",c.updateProduct)
router.delete("/:id",c.deleteProduct)

module.exports=router
