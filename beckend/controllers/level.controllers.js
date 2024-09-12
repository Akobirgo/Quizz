const User = require('../controllers/login_user.controllers');

const determineUserLevel = (points) => {
    if (points < 100) {
        return 'Beginner';
    } else if (points < 500) {
        return 'Intermediate';
    } else {
        return 'Advanced';
    }
};

const getUserLevel = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const points = user.points || 0;
        const level = determineUserLevel(points);

        res.status(200).json({
            userId: user._id,
            name: user.name,
            points: points,
            level: level
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    getUserLevel,
};
