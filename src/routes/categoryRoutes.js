
const router=require("express").Router()
const c=require("../controllers/categoryController")

router.get("/",c.getCategories)
router.post("/",c.createCategory)

module.exports=router
