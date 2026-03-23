
const router=require("express").Router()
const c=require("../controllers/adminController")

router.get("/dashboard",c.dashboard)

module.exports=router
