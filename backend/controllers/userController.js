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
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return next(new AppError('Missing a required field', 400));
    }
    const exits = await User.findOne({ email });
    if (exits) {
      return next(new AppError('User Already exists', 400));
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    });
    if (user) {
      res.status(201).json({
        _id: user._id,
        firstName,
        lastName,
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
        firstName: user.firstName,
        lastName: user.lastName,
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
    res.json(req.user);
  } catch (error) {
    return next(error);
  }
};

const generateToken = user => {
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
