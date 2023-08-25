const express = require('express');
const { memberRouter } = require('./memberRouter');
const router = express.Router();

router.use('/member', memberRouter);

module.exports = {router};
