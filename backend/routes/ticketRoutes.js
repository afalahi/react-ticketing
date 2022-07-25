const router = require('express').Router();
const {
  newTicket,
  getTickets,
  getTicket,
  deleteTicket,
  updateTicket,
} = require('../controllers/ticketController');
const protect = require('../middleware/authMiddleware');

router.route('/').get(protect, getTickets).post(protect, newTicket);

router
  .route('/:id')
  .get(protect, getTicket)
  .put(protect, updateTicket)
  .delete(protect, deleteTicket);

module.exports = router;
