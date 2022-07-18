const router = require('express').Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');
router
  .get('/', (req, res) => {
    res.json('Users');
  })
  .post('/login', loginUser)
  .post('/register', registerUser)
  .get('/me', protect, getMe);

module.exports = router;
