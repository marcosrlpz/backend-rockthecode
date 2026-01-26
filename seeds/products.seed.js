const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('🗄️ Conectado a MongoDB');
    
    await Product.deleteMany({}); // Limpiar
    
    const products = [
      { name: 'iPhone 15', price: 999, description: 'Último modelo', category: 'tech' },
      { name: 'MacBook Pro', price: 1999, description: 'M1 Pro', category: 'tech' },
      { name: 'Zapatillas Nike', price: 129, description: 'Air Max', category: 'fashion' }
    ];
    
    await Product.insertMany(products);
    console.log('✅ 3 productos sembrados');
    process.exit();
  })
  .catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
  });
