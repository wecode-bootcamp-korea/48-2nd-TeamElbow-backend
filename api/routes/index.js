const express = require("express");
const router = express.Router();
const { memberRouter } = require("./memberRouter");
const { movieRouter } = require("./movieRouter");

router.use("/member", memberRouter);
router.use("/movies", movieRouter);

module.exports = { router };
