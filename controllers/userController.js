const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { deleteFromCloudinary } = require('../middleware/cloudinary');

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

// REGISTER
const register = async (req, res) => {
  const { username, email, password } = req.body;

  const exists = await User.findOne({ $or: [{ email }, { username }] });
  if (exists) {
    return res.status(400).json({ error: 'Usuario ya existe' });
  }

  const user = await User.create({
    username,
    email,
    password,
    role: 'user',
    image: req.imageUrl
      ? { url: req.imageUrl, public_id: req.publicId }
      : {}
  });

  res.status(201).json({
    token: generateToken(user._id),
    user: user.toJSON()
  });
};

// LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && await user.matchPassword(password)) {
    res.json({
      token: generateToken(user._id),
      user: user.toJSON()
    });
  } else {
    res.status(401).json({ error: 'Credenciales inválidas' });
  }
};

// GET ME
const getMe = async (req, res) => {
  const user = await User.findById(req.user._id).populate('favorites');
  res.json(user);
};

// DELETE USER
const deleteUser = async (req, res) => {
  if (req.user.role === 'user' && req.user._id.toString() !== req.params.id) {
    return res.status(403).json({ error: 'No autorizado' });
  }

  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

  if (user.image?.public_id) {
    await deleteFromCloudinary(user.image.public_id);
  }

  await user.deleteOne();
  res.json({ message: 'Usuario eliminado' });
};

// UPDATE ROLE
const updateRole = async (req, res) => {
  if (req.user._id.toString() === req.params.id) {
    return res.status(403).json({ error: 'No puedes cambiar tu propio rol' });
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role: 'admin' },
    { new: true }
  );

  res.json({ message: 'Rol actualizado', user });
};

module.exports = { register, login, getMe, deleteUser, updateRole };
