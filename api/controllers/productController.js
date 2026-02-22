const Product = require('../models/Product');
const User = require('../models/User');
const { deleteFromCloudinary } = require('../middleware/cloudinary');

/* ============================
   CREATE PRODUCT (Admin)
============================ */
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

/* ============================
   GET ALL PRODUCTS
============================ */
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

/* ============================
   GET PRODUCT BY ID
============================ */
exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.status(200).json(product);

  } catch (error) {
    next(error);
  }
};

/* ============================
   UPDATE PRODUCT (Admin)
============================ */
exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    const { name, price, description, category } = req.body;

    if (name) product.name = name;
    if (price) product.price = price;
    if (description) product.description = description;
    if (category) product.category = category;

    await product.save();

    res.status(200).json(product);

  } catch (error) {
    next(error);
  }
};

/* ============================
   DELETE PRODUCT (Admin)
============================ */
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // 🔹 Eliminar imagen Cloudinary
    if (product.image?.public_id) {
      await deleteFromCloudinary(product.image.public_id);
    }

    // 🔹 Quitar producto de favoritos de usuarios
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