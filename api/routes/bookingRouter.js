const express = require("express");

const bookingController = require("../controllers/bookingController");
const bookingRouter = express.Router();

bookingRouter.get("/list", bookingController.getAllMoviesInformation);
bookingRouter.get("/date", bookingController.getDate);
bookingRouter.get("/schedule", bookingController.getSchedule);
bookingRouter.get("/seatsInformation", bookingController.getSeatsInformation);
bookingRouter.get("/movieInformation", bookingController.getMovieInformationInSeatsSelection);
bookingRouter.get("/ticketPrice", bookingController.getIsEarlybird);

module.exports = { bookingRouter };
