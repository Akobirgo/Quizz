const User = require('../controllers/login_user.controllers'); 
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
    }

    const token = jwt.sign({ id: user._id }, 'your_jwt_secret_key', { expiresIn: '1h' });

    res.status(200).json({ message: 'Kirish muvaffaqiyatli', token });
  } catch (error) {
    res.status(500).json({ message: 'Xatolik yuz berdi', error });
  }
};
