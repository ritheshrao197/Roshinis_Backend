
const Coupon=require("../models/Coupon")

exports.applyCoupon=async(req,res)=>{

  try {
    const { code, total } = req.body;
    const coupon = await Coupon.findOne({ code: code.toUpperCase() });

    if (!coupon) return res.json({ valid: false, message: "Invalid coupon code" });
    if (!coupon.active) return res.json({ valid: false, message: "Coupon is inactive" });
    if (new Date(coupon.expiryDate) < new Date()) {
      return res.json({ valid: false, message: "Coupon has expired" });
    }

    let discount = 0;
    if (coupon.discountType === 'percentage') {
      discount = total * (coupon.discountValue / 100);
    } else {
      discount = coupon.discountValue;
    }

    // Ensure discount isn't more than the total
    discount = Math.min(discount, total);

    res.json({
      valid: true,
      discount,
      newTotal: total - discount
    });
  } catch (err) {
    res.status(500).json({ valid: false, message: "Server error applying coupon" });
  }

}

// Admin: Get all coupons
exports.getCoupons = async (req, res, next) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.json(coupons);
  } catch (err) {
    next(err);
  }
};

// Admin: Create a new coupon
exports.createCoupon = async (req, res, next) => {
  try {
    const { code, discountType, discountValue, expiryDate, active } = req.body;
    
    if (!code || !discountType || !discountValue || !expiryDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await Coupon.findOne({ code: code.toUpperCase() });
    if (existing) {
      return res.status(400).json({ message: "Coupon code already exists" });
    }

    const coupon = await Coupon.create({
      code: code.toUpperCase(),
      discountType,
      discountValue: Number(discountValue),
      expiryDate: new Date(expiryDate),
      active: active !== undefined ? active : true,
    });

    res.status(201).json(coupon);
  } catch (err) {
    next(err);
  }
};

// Admin: Update a coupon
exports.updateCoupon = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { code, discountType, discountValue, expiryDate, active } = req.body;

    const coupon = await Coupon.findById(id);
    if (!coupon) return res.status(404).json({ message: "Coupon not found" });

    if (code) coupon.code = code.toUpperCase();
    if (discountType) coupon.discountType = discountType;
    if (discountValue) coupon.discountValue = Number(discountValue);
    if (expiryDate) coupon.expiryDate = new Date(expiryDate);
    if (active !== undefined) coupon.active = active;

    await coupon.save();
    res.json(coupon);
  } catch (err) {
    next(err);
  }
};

// Admin: Delete a coupon
exports.deleteCoupon = async (req, res, next) => {
  try {
    const { id } = req.params;
    const coupon = await Coupon.findByIdAndDelete(id);
    
    if (!coupon) return res.status(404).json({ message: "Coupon not found" });

    res.json({ message: "Coupon deleted successfully" });
  } catch (err) {
    next(err);
  }
};
