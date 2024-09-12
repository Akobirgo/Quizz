const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', authController.registerUser);
router.post('/verify-email', authController.verifyEmail);

module.exports = router;
