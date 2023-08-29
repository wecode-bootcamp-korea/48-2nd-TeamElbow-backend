const express = require('express');
const { memberRouter } = require('./memberRouter');
const { movieRouter } = require('./movieRouter');

const router = express.Router();

router.use('/member', memberRouter);
router.use('/movies', movieRouter);

module.exports = { router };
