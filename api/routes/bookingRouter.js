const express = require('express');
const { loginRequired } = require('../utils/auth');

const bookingController = require('../controllers/bookingController');
const bookingRouter = express.Router();

bookingRouter.get('/list', bookingController.getAllMoviesInformation);
bookingRouter.get('/date', bookingController.getDate);
bookingRouter.get('/schedule', bookingController.getSchedule);
bookingRouter.get('/myTicket', loginRequired, bookingController.getMyTicket);

module.exports = { bookingRouter };
