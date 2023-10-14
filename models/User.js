const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { config } = require('dotenv');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    minlength: 5,
    maxlength: 20,
  },
  email: {
    type: String,
    required: [true, 'please provide an email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'please provide password'],
    minlength: 8,
    maxlength: 20,
  },
});

userSchema.pre('save', async function (next) {
  // To only run if the password is modified
  if (!this.isModified('password')) return next();

  // Hash password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

userSchema.method.createJWT = function () {
  // generate otken to authorize the user
  const token = jwt.sign(
    { userId: this._id, name: this.name },
    config.env.JWT_SECRET,
    config.env.JWT_EXPIRES,
  );
};

const User = mongoose.model('User', userSchema);

module.exports = User;
