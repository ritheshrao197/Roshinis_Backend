
const Product = require('../models/Product');

exports.getReviews = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId).select('reviews').lean();

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product.reviews || []);
  } catch (err) {
    next(err);
  }
};

exports.addReview = async (req, res, next) => {
  try {
    const { productId, rating, comment } = req.body;

    // userId comes from authenticated user, not from body (prevents spoofing)
    const userId = req.user._id.toString();

    if (!productId) {
      return res.status(400).json({ message: 'productId is required' });
    }
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Prevent duplicate reviews from same user
    const existingReview = product.reviews.find((r) => r.userId === userId);
    if (existingReview) {
      // Update existing review instead of duplicating
      existingReview.rating = rating;
      existingReview.comment = comment || existingReview.comment;
    } else {
      product.reviews.push({ userId, rating, comment });
    }

    await product.save();

    res.json({ message: 'Review submitted', reviews: product.reviews });
  } catch (err) {
    next(err);
  }
};
