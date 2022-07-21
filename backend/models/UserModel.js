const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'please enter a name'],
    },
    lastName: {
      type: String,
      required: [true, 'please enter a name'],
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
        validator: function (val) {
          return validator.isStrongPassword(val);
        },
        message:
          'The {PATH}: ({VALUE}), does not meet the minimum requirements',
      },
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Retype your password'],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords don't match.",
      },
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
  this.passwordConfirm = undefined;

  next();
});
module.exports = model('User', userSchema);
