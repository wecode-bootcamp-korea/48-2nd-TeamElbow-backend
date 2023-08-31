const bookingDao = require('../models/bookingDao');

const getAllMoviesInformation = async (sortBy) => {
    return await bookingDao.getAllMoviesInformation(sortBy);
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
