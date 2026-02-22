const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = async (req, res, next) => {
  try {
    let token;

    // 1️⃣ Header Authorization: Bearer token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // 2️⃣ Header personalizado
    if (!token && req.header('x-auth-token')) {
      token = req.header('x-auth-token');
    }

    // 3️⃣ Cookies
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ message: 'Token requerido' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'Usuario no válido' });
    }

    req.user = user;
    next();

  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

const checkAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Permisos de admin requeridos' });
  }
  next();
};

module.exports = { requireAuth, checkAdmin };