const bookingDao = require('../models/bookingDao');

const getAllMoviesInformation = async (req) => {
    const {sortBy} = await req.query;
    const ordering = async (sortBy) => {
        switch (sortBy) {
            case "bookingRate":
                return `ORDER BY -bookingRatePercent`;
            case "alphabet":
                return `ORDER BY movieTitle`;
            default:
                return `ORDER BY -bookingRatePercent`;
        }
    };

    const allMoviesInformation = await bookingDao.getAllMoviesInformation(await ordering(sortBy));
    return allMoviesInformation;
};

const getDate = async (movieId) => {
    return await bookingDao.getDate(movieId);
};
const getSchedule = async (movieId, date) => {
    return await bookingDao.getSchedule(movieId, date);
};

module.exports = {
    getAllMoviesInformation,
    getDate,
    getSchedule
};
