
const Order = require('../models/Order');
const { v4: uuid } = require('uuid');

exports.createOrder = async (req, res, next) => {
  try {
    const { items, totalAmount, paymentMethod } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Order must contain at least one item' });
    }
    if (!totalAmount || Number(totalAmount) <= 0) {
      return res.status(400).json({ message: 'Invalid total amount' });
    }

    const orderId = 'ORD-' + uuid();

    const order = await Order.create({
      orderId,
      userId: req.user._id.toString(),
      ...req.body,
    });

    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    let query = {};

    // Admins see all orders; regular users see only their own
    if (req.user.role !== 'admin') {
      query.userId = req.user._id.toString();
    }

    const orders = await Order.find(query).sort({ createdAt: -1 }).lean();
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const queryFilter = req.params.id.startsWith('ORD-')
      ? { orderId: req.params.id }
      : { _id: req.params.id };

    const order = await Order.findOne(queryFilter).lean();

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Non-admins can only view their own order
    if (req.user.role !== 'admin' && order.userId !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(order);
  } catch (err) {
    next(err);
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const validStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
    const newStatus = req.body.orderStatus || req.body.status;

    if (!newStatus || !validStatuses.includes(newStatus)) {
      return res.status(400).json({
        message: `Status must be one of: ${validStatuses.join(', ')}`,
      });
    }

    const order = await Order.findOneAndUpdate(
      req.params.id.startsWith('ORD-') ? { orderId: req.params.id } : { _id: req.params.id },
      { orderStatus: newStatus },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (err) {
    next(err);
  }
};
