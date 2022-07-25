const AppError = require('../utils/AppError');
const Ticket = require('../models/TicketModel');
const User = require('../models/UserModel');

const getTickets = async (req, res, next) => {
  try {
    const tickets = await Ticket.find({ user: req.user._id }).select('-__v');
    res.status(200).json(tickets);
  } catch (error) {
    return next(error);
  }
};

const newTicket = async (req, res, next) => {
  try {
    const ticket = new Ticket({ ...req.body, user: req.user._id });
    await ticket.save();
    res.status(201).json({ ...ticket.toObject(), __v: undefined });
  } catch (error) {
    return next(error);
  }
};

const getTicket = async (req, res, next) => {
  try {
    const ticketId = req.params.id;
    const ticket = await Ticket.findById(ticketId).select('-__v');

    if (!ticket) {
      return next(new AppError('The ticket requested does not exists', 404));
    }
    if (ticket.user.toString() !== req.user._id.toString()) {
      return next(
        new AppError('You do not have permissions to access this page', 403)
      );
    }
    res.status(200).json(ticket);
  } catch (error) {
    return next(error);
  }
};

const deleteTicket = async (req, res, next) => {
  try {
    const ticketId = req.params.id;
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return next(new AppError('The ticket requested does not exists', 404));
    }
    if (ticket.user.toString() !== req.user._id.toString()) {
      return next(
        new AppError('You do not have permissions to perform this action', 403)
      );
    }
    await ticket.delete();
    res.status(200).json('success');
  } catch (error) {
    return next(error);
  }
};
const updateTicket = async (req, res, next) => {
  try {
    const ticketId = req.params.id;
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return next(new AppError('The ticket requested does not exists', 404));
    }
    if (ticket.user.toString() !== req.user._id.toString()) {
      return next(
        new AppError('You do not have permissions to perform this action', 403)
      );
    }
    await ticket.updateOne(req.body, { new: true });
    res.status(200).json({ ...ticket.toObject(), __v: undefined });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getTicket,
  getTickets,
  newTicket,
  deleteTicket,
  updateTicket,
};
