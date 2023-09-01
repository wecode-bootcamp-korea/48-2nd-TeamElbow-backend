const bookingDao = require("../models/bookingDao");

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