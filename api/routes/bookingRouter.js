const express = require('express');

const bookingController = require('../controllers/bookingController');
const bookingRouter = express.Router();

bookingRouter.get('/list', bookingController.getAllMoviesInformation);
bookingRouter.get('/date', bookingController.getDate);
bookingRouter.get('/schedule', bookingController.getSchedule);


module.exports = { bookingRouter };
