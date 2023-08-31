const bookingService = require("../services/bookingService");
const { catchAsync } = require("../utils/error");

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

module.exports = { getSeatsInformation, getMovieInformationInSeatsSelection, getIsEarlybird };
