require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const connectDB = require('./api/config/db');
const errorHandler = require('./api/middleware/errorHandler');

const app = express();

// Conectar base de datos
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rutas
app.use('/api/users', require('./api/routes/users'));
app.use('/api/products', require('./api/routes/products'));

// Ruta raíz
app.get('/', (req, res) => {
  res.json({ message: '🚀 Rock the Code v2 API funcionando!' });
});

// Middleware global de errores
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en puerto ${PORT}`);
}).on('error', (err) => {
  console.error('Error al iniciar el servidor:', err);
});
