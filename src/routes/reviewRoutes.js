
const router = require('express').Router();
const c = require('../controllers/reviewController');
const { requireAuth } = require('../middleware/authMiddleware');

router.get('/:productId', c.getReviews);
router.post('/', requireAuth, c.addReview); // Must be authenticated to submit a review

module.exports = router;
