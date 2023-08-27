const movieService = require("../services/movieService");
const { catchAsync } = require("../utils/error");

const getAllMoviesInformation = catchAsync(async (req, res) => {
  await movieService.recordBookingRate(req);
  const allMoviesInformation = await movieService.getAllMoviesInformation(req);
  res.json(allMoviesInformation);
});

const getSpecificMovieInformation = catchAsync(async (req, res) => {
  await movieService.recordBookingRate(req);
  const { movieId } = await req.query;
  const specificMovieInformation = await movieService.getSpecificMovieInformation(movieId);
  res.json(specificMovieInformation);
});

module.exports = { getAllMoviesInformation, getSpecificMovieInformation };
