
const router=require("express").Router()
const c=require("../controllers/couponController")

const { requireAuth } = require("../middleware/authMiddleware");
const { requireAdmin } = require("../middleware/requireAdmin");

router.post("/apply",c.applyCoupon)

// Admin CRUD routes
router.use(requireAuth, requireAdmin);
router.get("/", c.getCoupons);
router.post("/", c.createCoupon);
router.put("/:id", c.updateCoupon);
router.delete("/:id", c.deleteCoupon);

module.exports=router
