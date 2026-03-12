const Product = require('../models/Product');
const User = require('../models/User');
const { deleteFromCloudinary } = require('../middleware/cloudinary');

exports.createProduct = async (req, res, next) => {
  try {
    const { name, price, description, category } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: 'name y price son obligatorios' });
    }

    const product = await Product.create({
      name,
      price,
      description,
      category,
      image: req.imageUrl
        ? { url: req.imageUrl, public_id: req.publicId }
        : undefined
    });

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

    const { name, price, description, category } = req.body;

    if (name) product.name = name;
    if (price) product.price = price;
    if (description) product.description = description;
    if (category) product.category = category;

    // Si se sube nueva imagen, eliminar la anterior y guardar la nueva
    if (req.imageUrl) {
      if (product.image?.public_id) {
        await deleteFromCloudinary(product.image.public_id);
      }
      product.image = { url: req.imageUrl, public_id: req.publicId };
    }

    await product.save();
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

    if (product.image?.public_id) {
      await deleteFromCloudinary(product.image.public_id);
    }

    await User.updateMany(
      { favorites: product._id },
      { $pull: { favorites: product._id } }
    );

    await product.deleteOne();
    res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};