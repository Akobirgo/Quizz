const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./userController');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/users/register', userController.registerUser); 
app.post('/users/login', userController.loginUser);
app.put('/users/:id', userController.updateUser);
app.delete('/users/:id', userController.deleteUser);

app.listen(port, () => {
    console.log(`Server http://localhost:${port} da ishga tushdi`);
});
