const { uploadBuffer } = require('../services/cloudinaryService');

/**
 * POST /api/upload/image
 * Accepts multipart/form-data with a field named "image".
 * Returns { url, publicId }.
 */
exports.uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided (field name: "image")' });
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/jpg'];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({ message: 'Invalid file type. Use JPEG, PNG, WEBP, or GIF.' });
    }

    const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
    if (req.file.size > MAX_SIZE) {
      return res.status(400).json({ message: 'File too large. Maximum size is 5 MB.' });
    }

    const result = await uploadBuffer(req.file.buffer);

    res.json({ url: result.url, publicId: result.publicId });
  } catch (err) {
    // Give a clear message if Cloudinary isn't configured yet
    if (err.message && err.message.includes('not configured')) {
      return res.status(503).json({
        message: 'Image upload is not configured. Set CLOUDINARY_* environment variables.',
      });
    }
    next(err);
  }
};
