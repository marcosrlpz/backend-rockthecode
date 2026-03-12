require('dotenv').config();

const mongoose = require('mongoose');
const Product = require('../api/models/Product');

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
    await Product.deleteMany();

    const products = [
      {
        name: 'iPhone 15',
        price: 999,
        description: 'Último modelo Apple',
        category: 'tech'
      },
      {
        name: 'MacBook Pro',
        price: 1999,
        description: 'Chip M1 Pro',
        category: 'tech'
      },
      {
        name: 'Zapatillas Nike',
        price: 129,
        description: 'Air Max',
        category: 'fashion'
      },
      {
        name: 'Samsung Galaxy S24',
        price: 899,
        description: 'Flagship Android 2024',
        category: 'tech'
      },
      {
        name: 'Auriculares Sony WH-1000XM5',
        price: 349,
        description: 'Cancelación de ruido premium',
        category: 'tech'
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