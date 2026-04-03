const User = require('../models/User');
const Product = require('../models/Product');
const { signToken } = require('../utils/jwt');
const { deleteFromCloudinary } = require('../middleware/cloudinary');

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'username, email y password son obligatorios' });
    }

    const existsEmail = await User.findOne({ email });
    if (existsEmail) return res.status(409).json({ message: 'Email ya existe' });

    const existsUser = await User.findOne({ username });
    if (existsUser) return res.status(409).json({ message: 'Username ya existe' });

    const user = await User.create({
      username,
      email,
      password,
      role: 'user',
      image: req.imageUrl
        ? { url: req.imageUrl, public_id: req.publicId }
        : undefined
    });

    const token = signToken(user._id);
    res.status(201).json({ user, token });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Credenciales incorrectas' });

    const match = await user.matchPassword(password);
    if (!match) return res.status(401).json({ message: 'Credenciales incorrectas' });

    const token = signToken(user._id);
    res.status(200).json({ user, token });
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate('favorites');
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate('favorites');
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('favorites');
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const updateMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const { username, email, password, oldPassword } = req.body;

    if (username) user.username = username;
    if (email) user.email = email;

    // Si quiere cambiar la contraseña debe confirmar la antigua
    if (password) {
      if (!oldPassword) {
        return res.status(400).json({ message: 'Debes proporcionar la contraseña actual para cambiarla' });
      }
      const match = await user.matchPassword(oldPassword);
      if (!match) {
        return res.status(401).json({ message: 'La contraseña actual no es correcta' });
      }
      user.password = password;
    }

    // Actualizar imagen si se sube una nueva
    if (req.imageUrl) {
      if (user.image?.public_id) {
        await deleteFromCloudinary(user.image.public_id);
      }
      user.image = { url: req.imageUrl, public_id: req.publicId };
    }

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Función compartida para eliminar un usuario, su imagen y sus productos
const removeUser = async (user) => {
  // Eliminar imagen de Cloudinary
  if (user.image?.public_id) {
    await deleteFromCloudinary(user.image.public_id);
  }

  // Borrado en cascada: eliminar productos del usuario y sus imágenes
  const products = await Product.find({ owner: user._id });
  for (const product of products) {
    if (product.image?.public_id) {
      await deleteFromCloudinary(product.image.public_id);
    }
  }
  await Product.deleteMany({ owner: user._id });

  // Eliminar el usuario de los favoritos de otros usuarios
  await User.updateMany(
    { favorites: { $in: products.map(p => p._id) } },
    { $pull: { favorites: { $in: products.map(p => p._id) } } }
  );

  await user.deleteOne();
};

const deleteMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    await removeUser(user);
    res.status(200).json({ message: 'Cuenta eliminada' });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    await removeUser(user);
    res.status(200).json({ message: 'Usuario eliminado' });
  } catch (error) {
    next(error);
  }
};

const toggleRole = async (req, res, next) => {
  try {
    if (req.params.id === req.user._id.toString()) {
      return res.status(403).json({ message: 'No puedes cambiar tu propio rol' });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    user.role = user.role === 'user' ? 'admin' : 'user';
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const toggleFavorite = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

    const user = await User.findById(req.user._id);

    const exists = user.favorites.includes(productId);
    if (exists) {
      user.favorites.pull(productId);
    } else {
      user.favorites.addToSet(productId);
    }

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
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
};