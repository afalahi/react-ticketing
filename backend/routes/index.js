const router = require('express').Router();

router.use('/users', require('./userRoutes'));
router.use('/tickets', require('./ticketRoutes'));

module.exports = router;
