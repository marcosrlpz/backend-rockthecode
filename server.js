const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// RUTAS
app.use('/api/users', require('./routes/users'));
app.use('/api/products', require('./routes/products'));

app.get('/', (req, res) => {
  res.json({ message: '🚀 Rock the Code v2 API funcionando!' });
});

// Conectar MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('🗄️ MongoDB conectado'))
  .catch((err) => console.error('❌ Error MongoDB:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en puerto ${PORT}`);
});
