const users = [];

exports.registerUser = (req, res) => {
    const { name, username, phone, password } = req.body;

    const userExists = users.find(user => user.username === username);
    if (userExists) {
        return res.status(400).json({ message: 'Foydalanuvchi allaqachon mavjud' });
    }

    const newUser = { id: Date.now().toString(), name, username, phone, password };
    users.push(newUser);
    res.status(201).json({ message: 'Foydalanuvchi muvaffaqiyatli ro\'yxatdan o\'tildi', user: newUser });
};

exports.loginUser = (req, res) => {
    const { username, password } = req.body;

    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Noto\'g\'ri foydalanuvchi nomi yoki parol' });
    }

    res.json({ message: 'Muvaffaqiyatli tizimga kirdingiz', user });
};

exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { name, phone, password } = req.body;

    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
        return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
    }

    users[userIndex] = { ...users[userIndex], name, phone, password };
    res.json({ message: 'Foydalanuvchi muvaffaqiyatli yangilandi', user: users[userIndex] });
};

exports.deleteUser = (req, res) => {
    const { id } = req.params;

    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
        return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
    }

    users.splice(userIndex, 1);
    res.json({ message: 'Foydalanuvchi muvaffaqiyatli o\'chirildi' });
};
