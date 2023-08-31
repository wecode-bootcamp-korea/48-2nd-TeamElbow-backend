const express = require('express');
const { memberRouter } = require('./memberRouter');
const { movieRouter } = require('./movieRouter');
const { bookingRouter } = require('./bookingRouter');

const router = express.Router();

router.use('/member', memberRouter);
router.use('/movies', movieRouter);
router.use("/booking", bookingRouter);


module.exports = { router };
