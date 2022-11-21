require('dotenv').config();
const jwt = require('jsonwebtoken');
// const ErrorUnauthorized = require('../errors/ErrorUnauthorized');

const { NODE_ENV, JWT_SECRET } = process.env;
const auth = (req, res, next) => {
  if (req.cookies.jwt) {
    const token = req.cookies.jwt;

    let payload;
    try {
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret');
    } catch (err) {
      next(err);
    }
    req.user = payload;
    next();
  }
};

module.exports = auth;
