
const router=require("express").Router()
const c=require("../controllers/wishlistController")

router.get("/",c.getWishlist)
router.post("/add",c.addToWishlist)

module.exports=router
