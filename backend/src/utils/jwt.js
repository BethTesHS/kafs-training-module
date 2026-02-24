const jwt = require('jsonwebtoken');
const config = require('../config/env');

const generateToken = (userId, role) => {
  return jwt.sign(
    { userId, role },
    config.JWT_SECRET,
    { expiresIn: config.JWT_EXPIRY }
  );
};

const verifyToken = (token) => {
  return jwt.verify(token, config.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };