const bookingDao = require("../models/bookingDao");

<<<<<<< HEAD
// const calculateTotalPrice = async (screeningId, seatIds) => {
//     const ticketPrices = await bookingDao.getTicketPricesForScreening(screeningId);
//     const totalPrice = calculateTotalPriceBasedOnSeats(ticketPrices, seatIds);
//     return totalPrice;
// }

const deductPoints = async (memberId, bookingId) => {
    const member = await bookingDao.getMemberPointById(memberId);
    const amount = await bookingDao.getTotalPriceByBookingId(bookingId)
    const {status} = await bookingDao.getBookingInfo( bookingId )
    if (status === 'confirmed') {
        throw new Error("payment already confirmed")
    }
    else if (member.point < amount) {
        throw new Error("Insufficient points.")
    };

    const newPoint = member.point - amount;
    await bookingDao.updateMemberPoints(memberId, newPoint);
};

const createBooking = async (memberId, screeningId, seatIds, totalPrice) => {
    const bookingId = await bookingDao.createBooking(memberId, screeningId, seatIds, totalPrice);
    return bookingId;
};

const createBookingNumber = async (screeningId, seatIds) => {
 const bookingNumber = await screeningId.toString() + '-' + await seatIds[0].toString();
 return bookingNumber;
}

const getBookingId = async (bookingNumber) => {
    const bookingId = await bookingDao.getBookingId( bookingNumber )
    return bookingId
}


const pendPayment =  async ( bookingNumber, memberId , screeningId, totalPrice ) => {
    await bookingDao.pendPayment( bookingNumber, memberId , screeningId, totalPrice );
}

const pendSeat = async ( bookingId, seatId ) => {
    await bookingDao.pendSeat( bookingId, seatId );
}

const getBookingInfo = async ( bookingId ) => {
    const result = await bookingDao.getBookingInfo( bookingId )
    return result
}

const alterBooking = async ( bookingId ) => {
    await bookingDao.alterBooking( bookingId );
}

const alterBookingSeats = async ( bookingId ) => {
    await bookingDao.alterBookingSeats( bookingId );
}

module.exports = { alterBookingSeats, alterBooking, getBookingInfo, getBookingId, pendSeat, pendPayment, createBookingNumber, deductPoints, createBooking };
=======
const getAllMoviesInformation = async (sortBy) => {
  return await bookingDao.getAllMoviesInformation(sortBy);
};

const getDate = async (movieId) => {
  return await bookingDao.getDate(movieId);
};
const getSchedule = async (movieId, date) => {
  return await bookingDao.getSchedule(movieId, date);
};

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
  const translatedWeekdDay = (await weekDay[shortenedDay]) || shortenedDay;
  return await date.replace(date.substring(11, 14), translatedWeekdDay);
};

const getMovieInformationInSeatsSelection = async (screeningId) => {
  const [movieInforamtionInSeatsSelection] = await bookingDao.getMovieInformationInSeatsSelection(screeningId);
  const { screeningDate } = movieInforamtionInSeatsSelection;
  movieInforamtionInSeatsSelection.screeningDate = await translateWeekDay(screeningDate);
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
  const seatIds = Array.isArray(seatId) ? seatId : [seatId];
  const audienceTypes = Array.isArray(audienceType) ? audienceType : [audienceType];

  const prices = await Promise.all(seatIds.map((id, index) => getSeatPrice(screeningId, id, audienceTypes[index])));

  return prices.reduce((total, price) => total + price, 0);
};

module.exports = {
  getSeatsInformation,
  getMovieInformationInSeatsSelection,
  getSeatPrice,
  getTotalPrice,
  getIsEalrybirdByscreeningId,
  getAllMoviesInformation,
  getDate,
  getSchedule,
};
>>>>>>> main
