// const { BadRequestError } = require('../errors/bad-request');

const { StatusCodes } = require('http-status-codes');
const User = require('../models/User');

exports.register = async (req, res) => {
  // check filling the form
  /* const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError('Please fill the form');
  } */

  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

exports.login = async (req, res) => {
  res.send('login user');
};
