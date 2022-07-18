const AppError = require('../utils/AppError');

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

module.exports = handleCastErrorDB;
