const express = require('express');
const memberController = require('../controllers/memberController');

const memberRouter = express.Router();

memberRouter.post('/signup', memberController.signUp);
memberRouter.post('/signin', memberController.signIn);

module.exports = { memberRouter };
