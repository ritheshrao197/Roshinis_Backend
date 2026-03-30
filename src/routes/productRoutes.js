
const router = require('express').Router();
const c = require('../controllers/productController');
const { requireAuth } = require('../middleware/authMiddleware');
const { requireAdmin } = require('../middleware/requireAdmin');

// Public: read product list and individual products
router.get('/', c.getProducts);
router.get('/search', c.searchProducts);
router.get('/:id', c.getProductById);

// Admin-only: create, update, delete
router.post('/', requireAuth, requireAdmin, c.createProduct);
router.put('/:id', requireAuth, requireAdmin, c.updateProduct);
router.delete('/:id', requireAuth, requireAdmin, c.deleteProduct);

module.exports = router;
