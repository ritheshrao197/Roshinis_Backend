
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

const formatUser = (user) => {
  const obj = user.toObject ? user.toObject() : { ...user };
  delete obj.password;
  obj.username = obj.username || (obj.email ? obj.email.split('@')[0] : '');
  return obj;
};

exports.dashboard = async (req, res, next) => {
  try {
    const [products, orders, users, revenueResult, inStockProducts] = await Promise.all([
      Product.countDocuments(),
      Order.countDocuments(),
      User.countDocuments(),
      // Use aggregation pipeline instead of fetching all orders into memory
      Order.aggregate([{ $group: { _id: null, total: { $sum: '$totalAmount' } } }]),
      Product.countDocuments({ stock: { $gt: 0 } }),
    ]);

    const revenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

    res.json({ products, orders, users, revenue, inStockProducts });
  } catch (err) {
    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }).lean();
    res.json(users.map(formatUser));
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).lean();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(formatUser(user));
  } catch (err) {
    next(err);
  }
};
