const Product = require('../models/Product');
const User = require('../models/User');
const { deleteFromCloudinary } = require('../middleware/cloudinary');

// CREATE
const createProduct = async (req, res) => {
  const product = await Product.create({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    image: {
      url: req.imageUrl,
      public_id: req.publicId
    }
  });

  res.status(201).json(product);
};

// GET ALL
const getProducts = async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
};

// UPDATE
const updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(product);
};

// DELETE
const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ error: 'Producto no encontrado' });

  if (product.image?.public_id) {
    await deleteFromCloudinary(product.image.public_id);
  }

  await User.updateMany(
    { favorites: product._id },
    { $pull: { favorites: product._id } }
  );

  await product.deleteOne();
  res.json({ message: 'Producto eliminado' });
};

// FAVORITES SIN DUPLICADOS
const toggleFavorite = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ error: 'Producto no encontrado' });

  const user = await User.findById(req.user._id);
  const exists = user.favorites.includes(product._id);

  await User.findByIdAndUpdate(
    req.user._id,
    exists
      ? { $pull: { favorites: product._id } }
      : { $addToSet: { favorites: product._id } },
    { new: true }
  );

  res.json({ message: 'Favoritos actualizados' });
};

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  toggleFavorite
};
