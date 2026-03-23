
const router=require("express").Router()
const c=require("../controllers/analyticsController")

router.get("/dashboard",c.dashboard)

module.exports=router
