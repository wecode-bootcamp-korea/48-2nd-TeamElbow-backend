const bookingService = require('../services/bookingService');
const { catchAsync } = require('../utils/error');

const getAllMoviesInformation = catchAsync(async (req, res) => {
    const allMoviesInformation = await bookingService.getAllMoviesInformation(req);

    res.status(200).json( allMoviesInformation );
});

const getDate = catchAsync(async (req, res) => {
    const {movieId} = req.query;
    const date = await bookingService.getDate(movieId);

    const convertedDates = date.map(item => {
        const dateObject = new Date(item.date);
        const formattedDate = dateObject.toISOString().split('T')[0];
        return formattedDate;
    });

    res.status(200).json(convertedDates);
});

const getSchedule = catchAsync(async (req, res) => {
    const {movieId, date} = req.query;
    const schedule = await bookingService.getSchedule(movieId, date);
    
    const convertedschedule = schedule.map(item => {
        const screeningId = item.screeningId;
        const theaterName = item.theaterName;
        const screeningTime = new Date(item.screeningTime);
        const time = screeningTime.toLocaleTimeString('en-US', { hour12: false });
        const remainingSeats= item.remainingSeats;
        
        
        return {
            screeningId,
            theaterName,
            time,
            remainingSeats
        };
      });

    res.status(200).json( convertedschedule );
});



module.exports = {
    getAllMoviesInformation,
    getDate,
    getSchedule
};
