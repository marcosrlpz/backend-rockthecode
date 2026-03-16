require('dotenv').config();

const mongoose = require('mongoose');
const Product = require('../api/models/Product');
const User = require('../api/models/User');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('🗄️ MongoDB conectado para seed');
  } catch (error) {
    console.error('❌ Error conectando MongoDB:', error.message);
    process.exit(1);
  }
};

const seedProducts = async () => {
  try {
    // Buscar un admin para asignar como owner
    const admin = await User.findOne({ role: 'admin' });

    if (!admin) {
      console.error('❌ No hay ningún admin en la base de datos. Crea uno primero desde MongoAtlas.');
      process.exit(1);
    }

    await Product.deleteMany();

    const products = [
      {
        name: 'iPhone 15',
        price: 999,
        description: 'Último modelo Apple con chip A17',
        category: 'tech',
        owner: admin._id
      },
      {
        name: 'MacBook Pro M3',
        price: 1999,
        description: 'Portátil profesional con chip M3 Pro',
        category: 'tech',
        owner: admin._id
      },
      {
        name: 'Zapatillas Nike Air Max',
        price: 129,
        description: 'Zapatillas con amortiguación Air Max',
        category: 'fashion',
        owner: admin._id
      },
      {
        name: 'Samsung Galaxy S24',
        price: 899,
        description: 'Flagship Android con IA integrada',
        category: 'tech',
        owner: admin._id
      },
      {
        name: 'Sony WH-1000XM5',
        price: 349,
        description: 'Auriculares con cancelación de ruido premium',
        category: 'tech',
        owner: admin._id
      }
    ];

    await Product.insertMany(products);
    console.log('✅ Productos sembrados correctamente');
    process.exit();
  } catch (error) {
    console.error('❌ Error en la seed:', error.message);
    process.exit(1);
  }
};

const runSeed = async () => {
  await connectDB();
  await seedProducts();
};

runSeed();