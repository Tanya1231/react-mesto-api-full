const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const ErrorNotFound = require('../errors/ErrorNotFound');
const { login, createUser } = require('../controllers/users');
const routerCards = require('./cards');
const routerUsers = require('./users');
const auth = require('../middlewares/auth');

const method = (value, next) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  } return next(new ErrorNotFound('URL не валиден'));
};

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
    about: Joi.string().min(2).max(30).default('Исследователь'),
    avatar: Joi.string().custom(method).default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

router.use('/users', auth, routerUsers);
router.use('/cards', auth, routerCards);

router.use('*', (err, req, res, next) => {
  next(new ErrorNotFound('Страница не найдена'));
});

module.exports = router;
