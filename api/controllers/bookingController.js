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

const getTicketPrice = catchAsync(async (req, res) => {
  const { screeningId, seatId, audienceType } = await req.query;
  const ticketPrice = await bookingService.getTotalPrice(screeningId, seatId, audienceType);
  await res.json(ticketPrice);
});

module.exports = { getSeatsInformation, getMovieInformationInSeatsSelection, getTicketPrice };
