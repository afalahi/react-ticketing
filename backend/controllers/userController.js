const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/UserModel');
const AppError = require('../utils/AppError');
/**
 *
 * @desc register new user
 * @route /api/users/register
 * @access Public
 */
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(new AppError('Missing a required field', 400));
    }
    const exits = await User.findOne({ email });
    if (exits) {
      return next(new AppError('User Already exists', 400));
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashedPassword });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user),
      });
    } else {
      return next(new AppError('Invalid user data', 400));
    }
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
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user),
      });
    } else {
      return next(new AppError('Invalid Credentials', 401));
    }
  } catch (error) {
    return next(error);
  }
};

const getMe = (req, res, next) => {
  try {
    res.json(res.locals.token);
  } catch (error) {
    return next(error);
  }
};

const generateToken = user => {
  const { _id, email, name } = user;
  return jwt.sign({ _id, email, name }, process.env.JWT_SECRET, {
    subject: email,
    audience: 'support_desk',
    expiresIn: '1h',
    issuer: 'supportdesk.com',
  });
};
module.exports = {
  registerUser,
  loginUser,
  getMe,
};
