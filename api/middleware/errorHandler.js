const errorHandler = (err, req, res, next) => {
  console.error('❌ ERROR:', err);

  // Error de validación Mongoose
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: Object.values(err.errors).map(val => val.message)
    });
  }

  // Error ID inválido
  if (err.name === 'CastError') {
    return res.status(400).json({
      message: 'ID inválido'
    });
  }

  // Error JWT
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      message: 'Token inválido'
    });
  }

  res.status(500).json({
    message: 'Error interno del servidor'
  });
};

module.exports = errorHandler;