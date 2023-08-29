const movieDao = require("../models/movieDao");

const getAllMoviesInformation = async (req) => {
  const { sortBy } = await req.query;
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

  const allMoviesInformation = await movieDao.getAllMoviesInformation(
    await ordering(sortBy)
  );
  return allMoviesInformation;
};

const getSpecificMovieInformation = async (movieId) => {
  const specificMovieInformation = await movieDao.getSpecificMovieInformation(
    movieId
  );
  return specificMovieInformation;
};
module.exports = { getAllMoviesInformation, getSpecificMovieInformation };
