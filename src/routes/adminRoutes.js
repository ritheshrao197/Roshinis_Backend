
const router = require('express').Router();
const c = require('../controllers/adminController');
const { requireAuth } = require('../middleware/authMiddleware');
const { requireAdmin } = require('../middleware/requireAdmin');

// All admin routes require a valid JWT AND admin role
router.use(requireAuth, requireAdmin);

router.get('/dashboard', c.dashboard);
router.get('/users', c.getUsers);
router.get('/users/:id', c.getUserById);

module.exports = router;
