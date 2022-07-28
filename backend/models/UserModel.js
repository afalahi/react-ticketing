/** @format */

const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'please enter your first name'],
    },
    lastName: {
      type: String,
      required: [true, 'please enter your last name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Enter a valid Email'],
    },
    password: {
      type: String,
      required: [true, 'Please choose a password'],
      validate: {
        validator: function (value) {
          return validator.isStrongPassword(value);
        },
        message:
          'The {PATH}: ({VALUE}), does not meet the minimum requirements',
      },
    },
    confirmPassword: {
      type: String,
      required: [true, 'Retype your password'],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Passwords don't match.",
      },
    },
    isAgent: {
      type: Boolean,
      required: true,
      default: false,
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
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  this.confirmPassword = undefined;
  this.firstName =
    this.firstName.charAt(0).toUpperCase() +
    this.firstName.slice(1).toLowerCase();
  this.lastName =
    this.lastName.charAt(0).toUpperCase() +
    this.lastName.slice(1).toLowerCase();
  next();
});
module.exports = model('User', userSchema);
