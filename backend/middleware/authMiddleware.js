const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const AppError = require('../utils/AppError');

const protect = async (req, res, next) => {
  const { authorization } = req.headers ?? {};
  try {
    if (!authorization || !authorization.toLowerCase().startsWith('bearer')) {
      const message = !authorization
        ? 'Unauthorized, missing authorization header'
        : 'Unauthorized, invalid token in header';
      return next(new AppError(message, 403));
    }
    const token = authorization.split(' ')[1];
    jwt.verify(
      token,
      process.env.JWT_SECRET,
      { audience: 'support_desk', issuer: 'supportdesk.com' },
      (error, token) => {
        if (error) {
          if (error.name === 'TokenExpiredError') {
            return next(new AppError('Please log in again', 401));
          }
          return next(new AppError(error.message, 401));
        }
        return User.findById(token._id)
          .select('-password -__v -isAdmin')
          .then(result => {
            if (!result) {
              return next(
                new AppError('Unauthorized: User does not exit', 401)
              );
            }
            req.user = result;
            res.locals.token = token;
            next();
          })
          .catch(error => {
            return next(new AppError(error, 401));
          });
      }
    );
  } catch (error) {
    return next(new AppError(error, 401));
  }
};

module.exports = protect;
