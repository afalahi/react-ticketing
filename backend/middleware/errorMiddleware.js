/** @format */

const {
  handleCastError,
  handleValidationError,
  handleDuplicateKeyError,
} = require('../utils/mongoDBErrors');

const errorHandler = (error, req, res, next) => {
  let err = { ...error };
  let message = error.message;
  if (error.name === 'CastError') {
    err = handleCastError(err);
    message = err.message;
  }
  if (error.code === 11000) {
    err = handleDuplicateKeyError(err);
    message = err.message;
  }
  if (error.name === 'ValidationError') {
    err = handleValidationError(err);
    message = err.message;
  }
  const statusCode = err.statusCode || 500;
  const status = err.status || 'error';
  statusCode === 405 && res.setHeader('Allow', 'POST');
  res.status(statusCode).json({
    message: statusCode === 500 ? 'Oops something went wrong' : message,
    status,
    stack: process.env.NODE_ENV === 'production' ? null : error.stack,
  });
};

module.exports = { errorHandler };
