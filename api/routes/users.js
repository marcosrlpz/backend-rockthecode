const express = require('express');
const router = express.Router();

const {
  register,
  login,
  getUsers,
  getUserById,
  getMe,
  updateMe,
  deleteMe,
  deleteUser,
  toggleRole,
  toggleFavorite
} = require('../controllers/userController');

const { upload, uploadToCloudinary } = require('../middleware/cloudinary');
const { requireAuth, checkAdmin } = require('../middleware/auth');

/* ============================
   AUTH
============================ */

// REGISTER (con imagen opcional)
router.post('/register', upload.single('image'), uploadToCloudinary, register);

// LOGIN
router.post('/login', login);

/* ============================
   USER (logueado)
============================ */

// Ver mi perfil
router.get('/me', requireAuth, getMe);

// Actualizar mi perfil
router.put('/me', requireAuth, updateMe);

// Borrar mi cuenta
router.delete('/me', requireAuth, deleteMe);

// Añadir / quitar favorito
router.put('/favorites/:productId', requireAuth, toggleFavorite);

/* ============================
   ADMIN
============================ */

// Ver todos los usuarios
router.get('/', requireAuth, checkAdmin, getUsers);

// Ver usuario por ID
router.get('/:id', requireAuth, checkAdmin, getUserById);

// Borrar usuario
router.delete('/:id', requireAuth, checkAdmin, deleteUser);

// Cambiar rol
router.put('/:id/role', requireAuth, checkAdmin, toggleRole);

module.exports = router;