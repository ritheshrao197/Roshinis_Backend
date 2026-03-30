const cloudinary = require('cloudinary').v2;

// Configure from env — called once on first use
function getClient() {
  if (
    !process.env.CLOUDINARY_CLOUD ||
    !process.env.CLOUDINARY_KEY ||
    !process.env.CLOUDINARY_SECRET ||
    process.env.CLOUDINARY_CLOUD === 'cloud_name' // placeholder guard
  ) {
    throw new Error('Cloudinary environment variables are not configured');
  }

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });

  return cloudinary;
}

/**
 * Upload a file buffer to Cloudinary.
 * @param {Buffer} buffer - The file buffer from multer memoryStorage
 * @param {string} folder - Cloudinary folder to organise uploads
 * @returns {Promise<{url: string, publicId: string}>}
 */
exports.uploadBuffer = (buffer, folder = 'roshinis/products') => {
  const client = getClient();

  return new Promise((resolve, reject) => {
    const stream = client.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
        transformation: [
          { width: 1200, height: 1200, crop: 'limit' },
          { quality: 'auto:good' },
          { fetch_format: 'auto' },
        ],
      },
      (error, result) => {
        if (error) return reject(error);
        resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );
    stream.end(buffer);
  });
};

/**
 * Delete an image from Cloudinary by publicId.
 * @param {string} publicId
 */
exports.deleteImage = async (publicId) => {
  if (!publicId) return;
  const client = getClient();
  await client.uploader.destroy(publicId);
};
