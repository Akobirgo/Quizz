const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
    required: false,
  },
  answers: [
    {
      answer_id: {
        type: Number,
        required: true,
      },
      answer_title: {
        type: String,
        required: true,
      },
      is_correct: {
        type: Boolean,
        required: true,
      },
    },
  ],
});

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;
