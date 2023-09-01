const bookingService = require("../services/bookingService");
const { catchAsync } = require("../utils/error");

// 토탈프라이스 그리고 멤버포인트 차감하는것 부킹아이디에 있는 멤버아이디를 가지고 그 사람의 포인트를 차감한다(x)

// DAO 단에서 부킹 아이디를 가지고 부킹태아블 안에 있는 멤버아이디를 가지고 bookings_seats 그리고 bookings 테이블 안에 있는
// 좌석정보(seat_id)들을 가지고 온다 상태를 -> confirmed 로 바꾸어 놓는다(x)

// 자동으로 업데이트 시켜야한다 결제시점 그리고 status confirmed 로 변경
// 예매번호(bookingNumber), 관람인원 (seatIds), 좌석정보 ?, totalPrice

const processPayment = catchAsync(async (req, res) => {
    const { bookingId } = await req.query;
    const memberId = await req.member.id
    await bookingService.deductPoints(memberId, bookingId);
    await bookingService.alterBooking(bookingId);
    await bookingService.alterBookingSeats(bookingId);
    res.json({ message: "Payment successful."});
})


const pendPayment = catchAsync(async(req, res) => {
    const { totalPrice, seatIds, screeningId } = await req.body;
    const memberId = await req.memberId
    await bookingService.pendPayment(memberId, screeningId, totalPrice, seatIds)
    res.json({ message: "Payment in pending"})
} );

const pendSeat = catchAsync(async(req, res) => {
    const { bookingId, seatIds } = await req.body;
    await bookingService.pendSeat
});

const processPending = catchAsync(async(req, res) => {
    const { totalPrice, seatIds, screeningId } = await req.body
    const memberId = await req.member.id
    const bookingNumber = await bookingService.createBookingNumber(screeningId, seatIds)
    await bookingService.pendPayment(bookingNumber, memberId , screeningId, totalPrice)
    const bookingId = await bookingService.getBookingId(bookingNumber)
    await seatIds.forEach((seatId)=>bookingService.pendSeat(bookingId,seatId))
    await res.json({message: "Payment in pending", bookingId: `${bookingId}`})
});

const getBookingInfo = catchAsync(async(req, res) => {
    const { bookingId } = req.query;
    const bookingInfo = await bookingService.getBookingInfo(bookingId);
    res.json(bookingInfo)
});

module.exports = { getBookingInfo, processPayment, pendPayment, pendSeat, processPending  };