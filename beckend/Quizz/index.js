const express = require('express');
const mongoose = require('mongoose');
const quizRoutes = require('../routes/quizz.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', quizRoutes);

mongoose.connect('mongodb://localhost:27017/quizdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection error:', error));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
