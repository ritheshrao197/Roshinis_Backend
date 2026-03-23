
const router=require("express").Router()
const c=require("../controllers/authController")
const {requireAuth}=require("../middleware/authMiddleware")

router.post("/register",c.register)
router.post("/login",c.login)
router.get("/profile",requireAuth,c.getProfile)
router.put("/profile",requireAuth,c.updateProfile)

module.exports=router
