const bookingController = require("../controllers/bookingController");
const express = require("express");
const bookingRouter = express.Router();
const auth = require("../utils/auth");

//1번 결제창으로 넘겨주는 기능 동시에 Booking table(관련된테이블도)에 pending으로 status 설정
//그전에 booking/booking_seats 테이블에 상태 칼럼추가
// 
bookingRouter.patch("/pay", auth.loginRequired, bookingController.processPayment);
bookingRouter.post("/pending", auth.loginRequired, bookingController.processPending);
bookingRouter.get("/pay", auth.loginRequired, bookingController.getBookingInfo);

module.exports = { bookingRouter };