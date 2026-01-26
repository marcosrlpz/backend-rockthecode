const express = require('express');
const router = express.Router();
const { register, login, getMe, deleteUser, updateRole } = require('../controllers/userController');
const { upload, uploadToCloudinary } = require('../middleware/cloudinary');
const { requireAuth, checkAdmin } = require('../middleware/auth');

// REGISTER (con imagen Cloudinary)
router.post('/register', upload.single('image'), uploadToCloudinary, register);

// LOGIN
router.post('/login', login);

// PROTEGIDAS
router.get('/me', requireAuth, getMe);
router.delete('/:id', requireAuth, deleteUser);
router.put('/:id/role', requireAuth, checkAdmin, updateRole);

module.exports = router;
