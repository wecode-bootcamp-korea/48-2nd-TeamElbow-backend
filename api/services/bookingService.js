const bookingDao = require("../models/bookingDao");

// const calculateTotalPrice = async (screeningId, seatIds) => {
//     const ticketPrices = await bookingDao.getTicketPricesForScreening(screeningId);
//     const totalPrice = calculateTotalPriceBasedOnSeats(ticketPrices, seatIds);
//     return totalPrice;
// }

const deductPoints = async (memberId, amount) => {
    const member = await bookingDao.getMemberPointById(memberId);
console.log(member)
    if (member.point < amount) {
        throw new Error("Insufficient points.")
    };

    const newPoint = member.point - amount;
    await bookingDao.updateMemberPoints(memberId, newPoint);
};

const createBooking = async (memberId, screeningId, seatIds, totalPrice) => {
    const bookingId = await bookingDao.createBooking(memberId, screeningId, seatIds, totalPrice);
    return bookingId;
};

module.exports = { deductPoints, createBooking };