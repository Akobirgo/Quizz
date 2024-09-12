const express = require('express');
const router = express.Router();
const levelController = require('../controllers/level.controllers');

router.get('/user/:id/level', levelController.getUserLevel);

module.exports = router;
