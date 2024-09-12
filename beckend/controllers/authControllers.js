exports.verifyEmail = async (req, res, next) => {
    try {
      const { email, verificationToken } = req.body;
  
      const user = await User.findOne({ email, verificationToken });
  
      if (!user) {
        return res.status(400).json({
          status: 'fail',
          message: 'Xato tasdiqlash kodi yoki elektron pochta.',
        });
      }
  
      user.emailVerified = true;
      user.verificationToken = undefined;
      await user.save();
  
      res.status(200).json({
        status: 'success',
        message: 'Elektron pochta muvaffaqiyatli tasdiqlandi!',
      });
    } catch (err) {
      next(err);
    }
  };
  