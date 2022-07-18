const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'please enter a name'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please choose a password'],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = model('User', userSchema);
