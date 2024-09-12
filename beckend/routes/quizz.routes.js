const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizz.controllers');

router.post('/quizzes', quizController.createQuiz);

module.exports = router;
