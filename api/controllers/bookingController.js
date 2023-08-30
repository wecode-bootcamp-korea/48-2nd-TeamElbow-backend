const bookingService = require("../services/bookingService");
const { catchAsync } = require("../utils/error");

const processPayment = catchAsync(async (req, res) => {
    const { memberId, screeningId, seatIds, totalPrice } = await req.body;
    console.log(memberId)
    await bookingService.deductPoints(memberId, totalPrice);
    const bookingId = await bookingService.createBooking(memberId, screeningId, seatIds, totalPrice);
    res.json({ message: "Payment successful.", bookingId});
})

module.exports = { processPayment };