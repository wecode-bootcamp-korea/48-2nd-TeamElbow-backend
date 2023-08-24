const movieDao = require("../models/movieDao");

const recordBookingRate = async (req) => {
  const movieIdArray = await movieDao.getAllMovieId();
  const pathParam = await req.path;
  if (pathParam === "/list") {
    await movieIdArray.forEach(async (id) => {
      const bookingRate = await movieDao.calculateBookingRate(id);
      movieDao.recordBookingRate(id, bookingRate);
    });
  } else if (pathParam === "/detail") {
    const { movieId } = await req.query;
    const bookingRate = await movieDao.calculateBookingRate(movieId);
    movieDao.recordBookingRate(movieId, bookingRate);
  }
};

const getAllMoviesInformation = async (req) => {
  const { sortBy } = await req.query;
  const ordering = async (sortBy) => {
    switch (sortBy) {
      case "bookingRate":
        return `ORDER BY bookingRatePercent`;
      case "alphabet":
        return `ORDER BY movieTitle`;
      default:
        return `ORDER BY bookingRatePercent`;
    }
  };

  const allMoviesInformation = await movieDao.getAllMoviesInformation(await ordering(sortBy));
  return allMoviesInformation;
};

const getSpecificMovieInformation = async (movieId) => {
  const specificMovieInformation = await movieDao.getSpecificMovieInformation(movieId);
  return specificMovieInformation;
};
module.exports = { recordBookingRate, getAllMoviesInformation, getSpecificMovieInformation };
