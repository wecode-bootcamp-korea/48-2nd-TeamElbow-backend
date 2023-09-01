const express = require("express");

const bookingController = require("../controllers/bookingController");
const auth = require("../utils/auth");

const bookingRouter = express.Router();

bookingRouter.get("/list", bookingController.getAllMoviesInformation);
bookingRouter.get("/date", bookingController.getDate);
bookingRouter.get("/schedule", bookingController.getSchedule);
bookingRouter.get("/seatsInformation", bookingController.getSeatsInformation);
bookingRouter.get("/movieInformation", bookingController.getMovieInformationInSeatsSelection);
bookingRouter.get("/ticketPrice", bookingController.getIsEarlybird);
bookingRouter.patch("/pay", auth.loginRequired, bookingController.processPayment);
bookingRouter.post("/pending", auth.loginRequired, bookingController.processPending);
bookingRouter.get("/pay", auth.loginRequired, bookingController.getBookingInfo);


module.exports = { bookingRouter };
