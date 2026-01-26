const express = require('express');
const router = express.Router();

const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  toggleFavorite
} = require('../controllers/productController');

const { upload, uploadToCloudinary } = require('../middleware/cloudinary');
const { requireAuth, checkAdmin } = require('../middleware/auth');

router.get('/', getProducts);

router.post(
  '/',
  requireAuth,
  checkAdmin,
  upload.single('image'),
  uploadToCloudinary,
  createProduct
);

router.put('/:id', requireAuth, checkAdmin, updateProduct);
router.delete('/:id', requireAuth, checkAdmin, deleteProduct);
router.post('/:id/favorite', requireAuth, toggleFavorite);

module.exports = router;
