const router = require('express').Router();
const multer = require('multer');
const { uploadImage } = require('../controllers/uploadController');
const { requireAuth } = require('../middleware/authMiddleware');
const { requireAdmin } = require('../middleware/requireAdmin');

// Configure multer to store files in memory temporarily
// (we parse it into a Buffer and send directly to Cloudinary)
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB lock at multer level too
});

// Create image upload route. Must be admin to upload images.
router.post('/image', requireAuth, requireAdmin, upload.single('image'), uploadImage);

module.exports = router;
