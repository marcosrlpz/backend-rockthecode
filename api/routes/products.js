const express = require('express');
const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

const { upload, uploadToCloudinary } = require('../middleware/cloudinary');
const { requireAuth, checkAdmin } = require('../middleware/auth');

router.get('/', getProducts);
router.get('/:id', getProductById);

router.post('/', requireAuth, checkAdmin, upload.single('image'), uploadToCloudinary, createProduct);
router.put('/:id', requireAuth, checkAdmin, upload.single('image'), uploadToCloudinary, updateProduct);
router.delete('/:id', requireAuth, checkAdmin, deleteProduct);

module.exports = router;