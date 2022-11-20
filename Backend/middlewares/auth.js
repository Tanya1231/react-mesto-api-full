const jwt = require('jsonwebtoken');
const ErrorUnauthorized = require('../errors/ErrorUnauthorized');

const { NODE_ENV, JWT_SECRET } = process.env;
const auth = (req, res, next) => {
  const { autorization } = req.headers;
  if (!autorization || !autorization.startsWith('Bearer ')) {
    throw new ErrorUnauthorized('Необходима авторизация');
  }
  const token = autorization.replace('Bearer ', '');

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
