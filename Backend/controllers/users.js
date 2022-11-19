const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ErrorCode = require('../errors/ErrorCode');
const ErrorConflict = require('../errors/ErrorConflict');
const ErrorNotFound = require('../errors/ErrorNotFound');
const ErrorServer = require('../errors/ErrorServer');
const ErrorUnauthorized = require('../errors/ErrorUnauthorized');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.send(users);
  } catch (err) {
    return next(new ErrorServer('Ошибка по умолчанию'));
  }
};

const getUserById = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (user) {
      return res.send(user);
    }
    return next(new ErrorNotFound('Указанный пользователь не найден'));
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return next(new ErrorCode('Переданные данные не валидны'));
    }
    return next(new ErrorServer('Ошибка по умолчанию'));
  }
};

const createUser = async (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, about, avatar, email, password: hashedPassword,
    });
    return res.send({
      _id: user._id,
      email: user.email,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new ErrorCode('Переданные данные не валидны'));
    }
    if (err.code === 11000) {
      return next(new ErrorConflict('При регистрации указан email, который уже существует на сервере'));
    }
    return next(new ErrorServer('Ошибка по умолчанию'));
  }
};

const updateProfile = async (req, res, next) => {
  const { name, about } = req.body;
  const owner = req.user._id;
  try {
    const user = await User.findByIdAndUpdate(
      owner,
      { name, about },
      { new: true, runValidators: true },
    );
    if (!user) {
      return next(new ErrorNotFound('User с указанным _id не найден'));
    }
    return res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new ErrorCode('Переданные данные не валидны'));
    }
    return next(new ErrorServer('Ошибка по умолчанию'));
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new ErrorUnauthorized('Неправильный email или пароль');
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      throw new ErrorUnauthorized('Неправильный email или пароль');
    }
    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'some-secret',
    );
    res.cookie('jwt', token, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
    });
    res.send({ message: 'Авторизация успешна' });
  } catch (err) {
    next(err);
  }
};

const getMyInfo = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return next(new ErrorNotFound('Указанный пользователь не найден'));
    }
    return res.send(user);
  } catch (err) {
    return next(new ErrorServer('Ошибка по умолчанию'));
  }
};

const updateAvatar = async (req, res, next) => {
  const { avatar } = req.body;
  const owner = req.user._id;
  try {
    const user = await User.findByIdAndUpdate(
      owner,
      { avatar },
      { new: true, runValidators: true },
    );
    if (!user) {
      return next(new ErrorNotFound('User с указанным _id не найден'));
    }
    return res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new ErrorCode('Переданные данные не валидны'));
    }
    return next(new ErrorServer('Ошибка по умолчанию'));
  }
};

const logoff = (req, res) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: false,
    secure: true,
  });
  res.status(200)
    .send({ message: 'Вы вышли из аккаунта' });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
  login,
  getMyInfo,
  logoff,
};
