import express from "express";
import multer from "multer";
import bodyParser from "body-parser";
const errorHandler = require('./middleware/errorHandler');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorHandler);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

let quizzes = [];

app.get('/quizzes', (req, res) => {
  res.json(quizzes);
});

app.post('/quizzes', upload.single('image'), (req, res) => {
  const { title, answers } = req.body;
  const id = Date.now().toString();
  const imagePath = req.file ? req.file.path : '';

  const newQuiz = {
    id,
    title,
    imagePath,
    answers: JSON.parse(answers)
  };

  quizzes.push(newQuiz);
  res.status(201).json(newQuiz);
});

app.put('/quizzes/:id', upload.single('image'), (req, res) => {
  const { id } = req.params;
  const { title, answers } = req.body;
  const quizIndex = quizzes.findIndex(quiz => quiz.id === id);

  if (quizIndex === -1) {
    return res.status(404).json({ message: 'Quiz not found' });
  }

  const updatedQuiz = {
    ...quizzes[quizIndex],
    title,
    answers: JSON.parse(answers),
    imagePath: req.file ? req.file.path : quizzes[quizIndex].imagePath
  };

  quizzes[quizIndex] = updatedQuiz;
  res.json(updatedQuiz);
});

app.delete('/quizzes/:id', (req, res) => {
  const { id } = req.params;
  const quizIndex = quizzes.findIndex(quiz => quiz.id === id);

  if (quizIndex === -1) {
    return res.status(404).json({ message: 'Quiz not found' });
  }

  quizzes.splice(quizIndex, 1);
  res.json({ message: 'Quiz deleted successfully' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
