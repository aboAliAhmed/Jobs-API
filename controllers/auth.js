const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

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

  res.status(StatusCodes.CREATED).json({ user: user.name, token });
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if no email or password provided
    if (!email || !password) {
      throw new BadRequestError('Please provide your email and password');
    }

    const user = await User.findOne({ email });
    const isPasswordCorrect = await user.comparePassword(password);

    if (!user || !isPasswordCorrect) {
      throw new UnauthenticatedError('Invalid credentials');
    }

    // Compare password
    const token = user.createJWT();
    res.status(StatusCodes.OK).send({ user: user.name, token });
  } catch (err) {
    console.log(err);
  }
};
