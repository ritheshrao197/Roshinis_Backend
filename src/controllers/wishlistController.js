
const Wishlist = require('../models/Wishlist');

exports.getWishlist = async (req, res, next) => {
  try {
    const userId = req.query.userId;
    if (!userId) return res.status(400).json({ message: 'userId is required' });

    const list = await Wishlist.findOne({ userId }).lean();
    res.json(list || { userId, products: [] });
  } catch (err) {
    next(err);
  }
};

exports.addToWishlist = async (req, res, next) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ message: 'userId and productId are required' });
    }

    let list = await Wishlist.findOne({ userId });

    if (!list) {
      list = await Wishlist.create({ userId, products: [{ productId }] });
    } else {
      // Deduplicate: only add if not already present
      const alreadyExists = list.products.some((p) => p.productId === productId);
      if (!alreadyExists) {
        list.products.push({ productId });
        await list.save();
      }
    }

    res.json(list);
  } catch (err) {
    next(err);
  }
};

exports.removeFromWishlist = async (req, res, next) => {
  try {
    const userId = req.body.userId || req.query.userId;
    const productId = req.body.productId || req.query.productId;

    if (!userId || !productId) {
      return res.status(400).json({ message: 'userId and productId are required' });
    }

    const list = await Wishlist.findOne({ userId });

    if (!list) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    list.products = list.products.filter((item) => item.productId !== productId);
    await list.save();

    res.json(list);
  } catch (err) {
    next(err);
  }
};
