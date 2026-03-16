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

router.post('/register', upload.single('image'), uploadToCloudinary, register);
router.post('/login', login);

router.get('/me', requireAuth, getMe);
router.put('/me', requireAuth, upload.single('image'), uploadToCloudinary, updateMe);
router.delete('/me', requireAuth, deleteMe);

router.put('/favorites/:productId', requireAuth, toggleFavorite);

router.get('/', requireAuth, checkAdmin, getUsers);
router.get('/:id', requireAuth, checkAdmin, getUserById);
router.delete('/:id', requireAuth, checkAdmin, deleteUser);
router.put('/:id/role', requireAuth, checkAdmin, toggleRole);

module.exports = router;