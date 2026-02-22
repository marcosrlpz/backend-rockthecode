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

/* ============================
   PUBLIC
============================ */

// Ver todos los productos
router.get('/', getProducts);

// Ver producto por ID
router.get('/:id', getProductById);

/* ============================
   ADMIN
============================ */

// Crear producto
router.post(
  '/',
  requireAuth,
  checkAdmin,
  upload.single('image'),
  uploadToCloudinary,
  createProduct
);

// Actualizar producto
router.put('/:id', requireAuth, checkAdmin, updateProduct);

// Eliminar producto
router.delete('/:id', requireAuth, checkAdmin, deleteProduct);

module.exports = router;