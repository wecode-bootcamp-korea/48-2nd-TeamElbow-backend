const bookingDao = require("../models/bookingDao");

const getSeatsInformation = async (screeningId) => {
  const seatsInformation = await bookingDao.getSeatsInformation2(screeningId);
  return seatsInformation;
};

const getMovieInformationInSeatsSelection = async (screeningId) => {
  const [movieInforamtionInSeatsSelection] = await bookingDao.getMovieInformationInSeatsSelection(screeningId);
  const { screeningDate } = movieInforamtionInSeatsSelection;
  const translateWeekday = async (screeningDate) => {
    if (screeningDate.includes("Mon")) {
      movieInforamtionInSeatsSelection.screeningDate = await screeningDate.replace("Mon", "월");
    } else if (screeningDate.includes("Tue")) {
      movieInforamtionInSeatsSelection.screeningDate = await screeningDate.replace("Tue", "화");
    } else if (screeningDate.includes("Wed")) {
      movieInforamtionInSeatsSelection.screeningDate = await screeningDate.replace("Wed", "수");
    } else if (screeningDate.includes("Thu")) {
      movieInforamtionInSeatsSelection.screeningDate = await screeningDate.replace("Thu", "목");
    } else if (screeningDate.includes("Fri")) {
      movieInforamtionInSeatsSelection.screeningDate = await screeningDate.replace("Fri", "금");
    } else if (screeningDate.includes("Sat")) {
      movieInforamtionInSeatsSelection.screeningDate = await screeningDate.replace("Sat", "토");
    } else if (screeningDate.includes("Sun")) {
      movieInforamtionInSeatsSelection.screeningDate = await screeningDate.replace("Sun", "일");
    }
  };
  await translateWeekday(screeningDate);
  return movieInforamtionInSeatsSelection;
};

const getSeatPrice = async (screeningId, seatId, audienceType) => {
  const audienceTypeId = await bookingDao.getAudienceTypeIdByAudienceType(audienceType);
  const screeningTypeId = await bookingDao.getScreeningTypeIdByScreeningId(screeningId);
  const isEarlyBird = await bookingDao.getIsEarlybirdByScreeningId(screeningId);
  const seatTypeId = await bookingDao.getSeatTypIdeBySeatId(seatId);
  const seatPrice = await bookingDao.getSeatPrice(audienceTypeId, screeningTypeId, isEarlyBird, seatTypeId);

  return seatPrice;
};

const getTotalPrice = async (screeningId, seatId, audienceType) => {
  if (Array.isArray(seatId)) {
    let totalPrice = 0;
    for (let i = 0; i < seatId.length; i++) {
      const price = await getSeatPrice(screeningId, seatId[i], audienceType[i]);
      totalPrice = totalPrice + price;
    }
    return totalPrice;
  } else {
    const totalPrice = await getSeatPrice(screeningId, seatId, audienceType);
    return totalPrice;
  }
};

module.exports = {
  getSeatsInformation,
  getMovieInformationInSeatsSelection,
  getSeatPrice,
  getTotalPrice,
};
