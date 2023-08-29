const bookingDao = require("../models/bookingDao");

const getSeatsInformation = (screeningId) => {
  const seatsInformation = bookingDao.getSeatsInformation(screeningId);
  return seatsInformation;
};

const getMovieInformationInSeatsSelection = (screeningId) => {
  const movieInforamtionInSeatsSelection =
    bookingDao.getMovieInformationInSeatsSelection(screeningId);
  return movieInforamtionInSeatsSelection;
};

const getSeatPrice = (screeningId, seatId, audienceTypeId) => {
  const screeningTypeId =
    bookingDao.getScreeningTypeIdByScreeningId(screeningId);
  const isEarlyBird = bookingDao.getIsEarlybirdByScreeningId(screeningId);
  const seatTypeId = bookingDao.getSeatTypIdeBySeatId(seatId);
  const seatPrice = bookingDao.getSeatPrice(
    audienceTypeId,
    screeningTypeId,
    isEarlyBird,
    seatTypeId
  );

  return seatPrice;
};
