const router = require('express').Router();

const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');
const AppError = require('../utils/AppError');

router.get('/', (req, res) => {
  res.json('Users');
});

router
  .route('/register')
  .post(registerUser)
  .all((req, res, next) => {
    return next(new AppError('Method Not Allowed', 405));
  });

router
  .route('/login')
  .post(loginUser)
  .all((req, res, next) => {
    return next(new AppError('Method Not Allowed', 405));
  });
router
  .route('/me')
  .get(protect, getMe)
  .all((req, res, next) => {
    return next(new AppError('Method Not Allowed', 405));
  });

module.exports = router;
