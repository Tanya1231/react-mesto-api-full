const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const ErrorNotFound = require('../errors/ErrorNotFound');

const {
  getUsers, getUserById, updateProfile, updateAvatar, getMyInfo,
} = require('../controllers/users');

const method = (value, next) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  } return next(new ErrorNotFound('URL не валиден'));
};

router.get('/', getUsers);

router.get('/me', getMyInfo);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).required().hex(),
  }),
}), getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateProfile);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(method).default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'),
  }),
}), updateAvatar);

module.exports = router;
