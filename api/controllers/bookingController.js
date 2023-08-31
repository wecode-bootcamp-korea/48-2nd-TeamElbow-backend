const bookingService = require('../services/bookingService');
const { catchAsync } = require('../utils/error');

const getAllMoviesInformation = catchAsync(async (req, res) => {
    const { sortBy } = req.query;
    const allMoviesInformation = await bookingService.getAllMoviesInformation(sortBy);
    
    res.status(200).json( allMoviesInformation );
});

const getDate = catchAsync(async (req, res) => {
    const {movieId} = req.query;
    const date = await bookingService.getDate(movieId);

    res.status(200).json(date);
});

const getSchedule = catchAsync(async (req, res) => {
    const {movieId, date} = req.query;
    const schedule = await bookingService.getSchedule(movieId, date);
    
    res.status(200).json( schedule );
});

module.exports = {
    getAllMoviesInformation,
    getDate,
    getSchedule
};
