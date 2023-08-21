const express = require('express');
const router = express.Router();

const memberRouter = require('./memberRouter');
const movieRouter = require('./movieRouter');
const bookingRouter = require('./bookingRouter');

router.use('/member', memberRouter);
router.use('/movie', movieRouter);
router.use('/booking', bookingRouter);

module.exports = router;
