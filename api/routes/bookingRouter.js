const express = require("express");
const bookingController = require("../controllers/bookingController");

const bookingRouter = express.Router();

bookingRouter.get("/seatsInformation", bookingController.getSeatsInformation);
bookingRouter.get("/movieInformation", bookingController.getMovieInformationInSeatsSelection);
bookingRouter.get("/ticketPrice", bookingController.getTicketPrice);

module.exports = { bookingRouter };
