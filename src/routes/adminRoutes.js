
const router=require("express").Router()
const c=require("../controllers/adminController")

router.get("/dashboard",c.dashboard)
router.get("/users",c.getUsers)
router.get("/users/:id",c.getUserById)

module.exports=router
