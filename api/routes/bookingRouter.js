const bookingController = require("../controllers/bookingController");
const express = require("express");
const bookingRouter = express.Router();
const auth = require("../utils/auth");

bookingRouter.post("/pay", auth.loginRequired, bookingController.processPayment);

module.exports = { bookingRouter };