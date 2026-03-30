
const router = require('express').Router();
const c = require('../controllers/orderController');
const { requireAuth } = require('../middleware/authMiddleware');
const { requireAdmin } = require('../middleware/requireAdmin');

// All order routes require authentication
router.use(requireAuth);

router.post('/', c.createOrder);

// Admin sees ALL orders; regular users see only their own
router.get('/', c.getOrders);
router.get('/:id', c.getOrderById);
router.put('/:id/status', requireAdmin, c.updateOrderStatus);

module.exports = router;
