/** @format */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/UserModel');
const AppError = require('../utils/AppError');
const responseHandler = require('../utils/responseHandler');
/**
 *
 * @desc register new user
 * @route /api/users/register
 * @access Public
 */
const registerUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    const body = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user),
    };
    responseHandler(res, body, 201);
  } catch (error) {
    return next(error);
  }
};

/**
 *
 * @desc Log users in
 * @route /api/users/login
 * @access Public
 */
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const body = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: generateToken(user),
      };
      responseHandler(res, body);
    } else {
      return next(new AppError('Invalid Credentials', 401));
    }
  } catch (error) {
    return next(error);
  }
};

const getMe = (req, res, next) => {
  try {
    responseHandler(res, req.user);
  } catch (error) {
    return next(error);
  }
};

const generateToken = (user) => {
  const { _id, email, firstName, lastName } = user;
  return jwt.sign(
    { _id, email, name: `${firstName} ${lastName}` },
    process.env.JWT_SECRET,
    {
      subject: email,
      audience: 'support_desk',
      expiresIn: '1h',
      issuer: 'supportdesk.com',
    }
  );
};
module.exports = {
  registerUser,
  loginUser,
  getMe,
};
