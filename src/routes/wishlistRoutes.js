
const router=require("express").Router()
const c=require("../controllers/wishlistController")

router.get("/",c.getWishlist)
router.post("/add",c.addToWishlist)
router.delete("/remove",c.removeFromWishlist)

module.exports=router
