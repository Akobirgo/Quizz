const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserModel = require('./UserModel');
require('dotenv').config();

// JWT token yaratish funksiyalari
const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  });
};

// Ro'yxatdan o'tish
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await UserModel.createUser(username, email, hashedPassword);

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });
    res.status(201).json({ accessToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login qilish
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ message: 'Email yoki parol xato' });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });
    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Refresh token orqali yangi access token yaratish
exports.refreshToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(403).json({ message: 'Token topilmadi' });

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Yaroqsiz token' });

    const accessToken = generateAccessToken(user);
    res.json({ accessToken });
  });
};
