const router=require("express").Router()
const c=require("../controllers/adminController")

router.get("/",c.getUsers)
router.get("/:id",c.getUserById)

module.exports=router
