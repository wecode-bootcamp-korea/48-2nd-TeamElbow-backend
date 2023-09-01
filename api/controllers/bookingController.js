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

const processPayment = catchAsync(async (req, res) => {
  const { bookingId } = await req.query;
  const memberId = await req.member.id;
  await bookingService.deductPoints(memberId, bookingId);
  await bookingService.alterBooking(bookingId);
  await bookingService.alterBookingSeats(bookingId);
  const movieId = await bookingService.getMovieIdBybookingId(bookingId);
  await bookingService.calculateBookingRate(movieId);
  await bookingService.recordBookingRate(movieId);
  res.json({ message: "Payment successful." });
});

const pendPayment = catchAsync(async (req, res) => {
  const { totalPrice, seatIds, screeningId } = await req.body;
  const memberId = await req.memberId;
  await bookingService.pendPayment(memberId, screeningId, totalPrice, seatIds);
  res.json({ message: "Payment in pending" });
});

const pendSeat = catchAsync(async (req, res) => {
  const { bookingId, seatIds } = await req.body;
  await bookingService.pendSeat;
});

const processPending = catchAsync(async (req, res) => {
  const { totalPrice, seatIds, screeningId } = await req.body;
  const memberId = await req.member.id;
  const bookingNumber = await bookingService.createBookingNumber(screeningId, seatIds);
  await bookingService.pendPayment(bookingNumber, memberId, screeningId, totalPrice);
  const bookingId = await bookingService.getBookingId(bookingNumber);
  await seatIds.forEach((seatId) => bookingService.pendSeat(bookingId, seatId));
  await res.json({ message: "Payment in pending", bookingId: `${bookingId}` });
});

const getBookingInfo = catchAsync(async (req, res) => {
  const { bookingId } = req.query;
  const bookingInfo = await bookingService.getBookingInfo(bookingId);
  res.json(bookingInfo);
});

module.exports = {
  getAllMoviesInformation,
  getDate,
  getSchedule,
  getSeatsInformation,
  getMovieInformationInSeatsSelection,
  getIsEarlybird,
  getBookingInfo,
  processPayment,
  pendPayment,
  pendSeat,
  processPending,
};
