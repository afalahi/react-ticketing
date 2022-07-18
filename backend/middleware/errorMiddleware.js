const handleCastErrorDB = require('../utils/handleCastError');

const errorHandler = (error, req, res, next) => {
  let err = { ...error };
  let message = error.message
  if (error.name === 'CastError') {
    err = handleCastErrorDB(err);
    message = err.message
  }
  const statusCode = error.statusCode || 500;
  const status = error.status || 'error';
  res.status(statusCode).json({
    message,
    status,
    stack: process.env.NODE_ENV === 'production' ? null : error.stack,
  });
};

module.exports = { errorHandler };
