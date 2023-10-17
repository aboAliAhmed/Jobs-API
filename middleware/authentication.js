const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { UnauthenticatedError } = require('../errors/index');
const User = require('../models/User');

dotenv.config({ path: './config.env' });

const auth = async (req, res, next) => {
  //check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('you are not logged in, Please login first');
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach the user to the job routes
    const user = User.findById(payload.id).select('-password');
    req.user = user;
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (err) {
    throw new UnauthenticatedError('Authentication invalid');
  }
};

module.exports = auth;
