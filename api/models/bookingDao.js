const { dataSource } = require("./dataSource");

// const getTicketPricesForScreening = async (screeningId) => {
//     const ticketPrices = await dataSource.query(
//       `
//       SELECT prices, seat_type_id
//       FROM ticket_prices
//       WHERE screening_type_id = (
//         SELECT screening_type_id
//         FROM screenings
//         WHERE id = ?
//       )
//       `, [screeningId]);
//       return ticketPrices;
//   }
  
  const createBooking = async (memberId, screeningId, seatIds, totalPrice) => {
    const bookingNumber = memberId.toString()+screeningId.toString()+seatIds.toString()
    const bookingResult = await dataSource.query(
      `
      INSERT INTO bookings (member_id, screening_id, total_price, booking_number)
      VALUES (?, ?, ?, ?);
      `, [memberId, screeningId, totalPrice, bookingNumber]);
  
    const bookingId = bookingResult.insetId;
  
    for (const seatId of seatIds) {
      await dataSource.query(
        `
        INSERT INTO bookings_seats (booking_id, seat_id)
        VALUES (?, ?);
        `, [bookingId, seatId]);
    }
  
    return bookingId;
  }

  const getMemberPointById = async (memberId) => {
    const [member] = await dataSource.query(
        `SELECT id, point FROM members WHERE id = ?`, [memberId]
    );
    console.log(member)
    return member;
  };

  const updateMemberPoints = async (memberId, newPoint) => {
    await dataSource.query(`UPDATE members SET point = ? WHERE id = ?`,
   [newPoint, memberId] );
  };

  


  module.exports = { createBooking, getMemberPointById, updateMemberPoints }