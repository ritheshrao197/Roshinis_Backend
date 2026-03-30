
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  orderId: String,
  userId: { type: String, required: true, index: true },
  items: [{
    productId: String,
    quantity: Number,
    price: Number,
  }],
  totalAmount: Number,
  paymentMethod: String,
  paymentStatus: { type: String, default: 'Pending' },
  orderStatus: { type: String, default: 'Pending' },
  shippingAddress: {
    name: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', schema);
