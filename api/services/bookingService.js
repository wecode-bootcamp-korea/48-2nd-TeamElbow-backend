const bookingDao = require("../models/bookingDao");

const getSeatsInformation = async (screeningId) => {
  const seatsInformation = await bookingDao.getSeatsInformation(screeningId);
  return seatsInformation;
};

const weekDay = {
  Mon: "월",
  Tue: "화",
  Wed: "수",
  Thu: "목",
  Fri: "금",
  Sat: "토",
  Sun: "일",
};

const translateWeekDay = async (date) => {
  const shortenedDay = await date.substring(11, 14);
  console.log(shortenedDay);
  const translatedWeekdDay = (await weekDay[shortenedDay]) || shortenedDay;
  return await date.replace(date.substring(11, 14), translatedWeekdDay);
};

const getMovieInformationInSeatsSelection = async (screeningId) => {
  const [movieInforamtionInSeatsSelection] = await bookingDao.getMovieInformationInSeatsSelection(screeningId);
  const { screeningDate } = movieInforamtionInSeatsSelection;
  movieInforamtionInSeatsSelection.screeningDate = await translateWeekDay(screeningDate);
  console.log(movieInforamtionInSeatsSelection);
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

const getIsEalrybirdByscreeningId = async (screeningId) => {
  const isEarlyBird = await bookingDao.getIsEarlybirdByScreeningId(screeningId);

  return isEarlyBird;
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
  getIsEalrybirdByscreeningId,
};
