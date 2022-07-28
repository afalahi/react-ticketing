/** @format */

const AppError = require('./AppError');

const handleCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};
const handleDuplicateKeyError = (err) => {
  let message;
  const keys = Object.keys(err.keyValue);
  if (keys.includes('email')) message = 'User already exists';
  return new AppError(message, 409);
};
const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};
module.exports = {
  handleCastError,
  handleValidationError,
  handleDuplicateKeyError,
};
