const express = require("express");
const { memberRouter } = require("./memberRouter");
const { bookingRouter } = require("./bookingRouter");
const { movieRouter } = require('./movieRouter');

const router = express.Router();

router.use("/member", memberRouter);
router.use('/movies', movieRouter);
router.use("/booking", bookingRouter);

module.exports = { router };
