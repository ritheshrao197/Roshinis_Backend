
const router=require("express").Router()
const c=require("../controllers/reviewController")

router.get("/:productId",c.getReviews)
router.post("/",c.addReview)

module.exports=router
