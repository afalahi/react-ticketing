const { Schema, model } = require('mongoose');

const ticketSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    subject: {
      type: String,
      required: [true, 'Ticket subject can not be empty'],
    },
    description: {
      type: String,
      required: [true, 'Description can not be empty'],
      minLength: 20,
    },
    notes: [
      {
        body: String,
        by: Schema.Types.ObjectId,
      },
    ],
    severity: {
      type: String,
      required: true,
      enum: ['Low', 'Medium', 'High', 'Critical'],
      default: 'Low',
    },
    status: {
      type: String,
      required: true,
      enum: ['New', 'Open', 'Closed'],
      default: 'New',
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = model('Ticket', ticketSchema);
