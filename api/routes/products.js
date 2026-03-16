const express = require('express');
const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  toggleLike
} = require('../controllers/productController');

const { upload, uploadToCloudinary } = require('../middleware/cloudinary');
const { requireAuth, checkAdmin } = require('../middleware/auth');

router.get('/', getProducts);
router.get('/:id', getProductById);

router.post('/', requireAuth, checkAdmin, upload.single('image'), uploadToCloudinary, createProduct);
router.put('/:id', requireAuth, checkAdmin, upload.single('image'), uploadToCloudinary, updateProduct);
router.delete('/:id', requireAuth, checkAdmin, deleteProduct);

// Like toggle — cualquier usuario logueado
router.put('/:id/like', requireAuth, toggleLike);

module.exports = router;