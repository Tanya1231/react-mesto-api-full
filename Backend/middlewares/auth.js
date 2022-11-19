require('dotenv').config();
const jwt = require('jsonwebtoken');
const ErrorUnauthorized = require('../errors/ErrorUnauthorized');

const { NODE_ENV, JWT_SECRET } = process.env;
const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new ErrorUnauthorized('Необходима авторизация');
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret');
  } catch (err) {
    next(err);
  }
  req.user = payload;
  next();
};

module.exports = auth;
