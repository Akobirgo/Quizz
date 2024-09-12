const Quiz = require('../Quizz/model');
const AppError = require('../utils/AppError');

exports.createQuiz = async (req, res) => {
  try {
    const { title, imagePath, answers } = req.body;

    const quiz = new Quiz({
      title,
      imagePath,
      answers,
    });

    await quiz.save();

    res.status(201).json({ message: 'Savol muvaffaqiyatli yaratildi', quiz });
  } catch (error) {
    res.status(500).json({ message: 'Xatolik yuz berdi', error: error.message });
  }
};

const AppError = require('../utils/AppError');

exports.getQuizById = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return next(new AppError('No quiz found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        quiz,
      },
    });
  } catch (err) {
    next(err); 
  }
};

