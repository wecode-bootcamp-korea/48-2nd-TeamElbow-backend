const bookingService = require("../services/bookingService");
const { catchAsync } = require("../utils/error");

const getAllMoviesInformation = catchAsync(async (req, res) => {
  const { sortBy } = req.query;
  const allMoviesInformation = await bookingService.getAllMoviesInformation(sortBy);

  res.status(200).json(allMoviesInformation);
});

const getDate = catchAsync(async (req, res) => {
  const { movieId } = req.query;
  const date = await bookingService.getDate(movieId);

  res.status(200).json(date);
});

const getSchedule = catchAsync(async (req, res) => {
  const { movieId, date } = req.query;
  const schedule = await bookingService.getSchedule(movieId, date);

  res.status(200).json(schedule);
});

const getSeatsInformation = catchAsync(async (req, res) => {
  const { screeningId } = await req.query;
  const seatsInformation = await bookingService.getSeatsInformation(screeningId);
  await res.json(seatsInformation);
});

const getMovieInformationInSeatsSelection = catchAsync(async (req, res) => {
  const { screeningId } = await req.query;
  const movieInformation = await bookingService.getMovieInformationInSeatsSelection(screeningId);
  await res.json(movieInformation);
});

const getIsEarlybird = catchAsync(async (req, res) => {
  const { screeningId } = await req.query;
  const isEarlyBird = await bookingService.getIsEalrybirdByscreeningId(screeningId);
  await res.json(isEarlyBird);
});

module.exports = {
  getAllMoviesInformation,
  getDate,
  getSchedule,
  getSeatsInformation,
  getMovieInformationInSeatsSelection,
  getIsEarlybird,
};
