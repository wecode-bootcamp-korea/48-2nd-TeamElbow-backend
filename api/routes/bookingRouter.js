const express = require('express');
const bookingController = require('../controllers/bookingController');
const { loginRequired } = require('../utils/auth');

const bookingRouter = express.Router();

bookingRouter.get('/list', bookingController.getAllMoviesInformation);
bookingRouter.get('/date', bookingController.getDate);
bookingRouter.get('/schedule', bookingController.getSchedule);
bookingRouter.get("/seatsInformation", bookingController.getSeatsInformation);
bookingRouter.get("/movieInformation", bookingController.getMovieInformationInSeatsSelection);
bookingRouter.get("/ticketPrice", bookingController.getIsEarlybird);
bookingRouter.patch("/pay", loginRequired, bookingController.processPayment);
bookingRouter.post("/pending", loginRequired, bookingController.processPending);
bookingRouter.get("/pay", loginRequired, bookingController.getBookingInfo);
bookingRouter.get('/myTicket', loginRequired, bookingController.getMyTicket);


module.exports = { bookingRouter };
