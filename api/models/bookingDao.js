const { dataSource } = require("./dataSource");

  const alterBooking = async (bookingId) => {
   await dataSource.query(
    `UPDATE bookings
    SET status = 'confirmed'
    WHERE id = ?;`,
    [bookingId]
    );
  }

  const alterBookingSeats = async (bookingId) => {
    await dataSource.query(
     `UPDATE bookings_seats
     SET status = 'confirmed'
     WHERE booking_id = ?;`,
     [bookingId]
     );
   }

  const getMemberPointById = async (memberId) => {
    const [member] = await dataSource.query(
        `SELECT id, point FROM members WHERE id = ?;`, [memberId]
    );
    return member;
  };

  const updateMemberPoints = async (memberId, newPoint) => {
    await dataSource.query(`UPDATE members SET point = ? WHERE id = ?;`,
   [newPoint, memberId] );
  };

  const pendPayment = async ( bookingNumber, memberId , screeningId, totalPrice ) => {
    await dataSource.query(`
        INSERT INTO bookings (booking_number, member_id, screening_id, total_price, status)
        VALUES (?, ?, ?, ?, 'pending');`,
         [bookingNumber, memberId, screeningId, totalPrice]
    );
  };

  const getBookingId = async ( bookingNumber ) => {
    const [bookingId] = await dataSource.query(`
        SELECT id FROM bookings WHERE booking_number = ?;`,
        [bookingNumber] );
    return bookingId.id
  };

  const pendSeat = async ( bookingId, seatId ) => {
    await dataSource.query(`
        INSERT INTO bookings_seats (booking_id, seat_id, status)
        VALUES (?, ?, 'pending');`
        , [bookingId, seatId]
        );
  }

  const getBookingInfo = async (bookingId) => {
    const [result] = await dataSource.query(`
            SELECT
                bookings.total_price AS totalPrice,
                members.point AS memberPoint,
                bookings.status AS status
            FROM
                bookings
            INNER JOIN
                members ON bookings.member_id = members.id
            WHERE
                bookings.id = ?;`,
                [bookingId]
                );
        return result;
  }


  const getTotalPriceByBookingId = async (bookingId) => {
    const [result] = await dataSource.query(`
        SELECT
            bookings.total_price AS totalPrice
        FROM
            bookings
        WHERE
            bookings.id = ?;`,
            [bookingId]
            );
    return result.totalPrice;
  }

  module.exports = { alterBookingSeats, getTotalPriceByBookingId, getBookingInfo, pendSeat, getBookingId, pendPayment, alterBooking, getMemberPointById, updateMemberPoints }