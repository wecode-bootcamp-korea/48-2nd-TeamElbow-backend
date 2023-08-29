const express = require("express");
const bookingController = require("../controllers/bookingController");

const bookingRouter = express.Router();

bookingRouter.get("/booking", bookingController.selectSeat);

module.exports = { bookingRouter };
