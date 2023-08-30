const express = require("express");
const { memberRouter } = require("./memberRouter");
const { bookingRouter } = require("./bookingRouter");
const router = express.Router();

router.use("/member", memberRouter);
router.use("/booking", bookingRouter);

module.exports = { router };
