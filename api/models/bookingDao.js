const { dataSource } = require("./dataSource");

const getAllMoviesInformation = async (sortBy) => {
  try {
    const ordering = getOrdering(sortBy);

    const allMoviesInformation = await dataSource.query(
      `
            SELECT
            id,
            movie_title as movieTitle,
            minimum_watching_age as movieMinimumWatchingAge,
            booking_rate_percent as bookingRatePercent,
            poster_image_url AS moviePosterImageUrl,
            running_time_minute AS movieRunningTimeMinute
            FROM movies
            ${ordering};
            `
    );
    return allMoviesInformation;
  } catch (err) {
    const error = new Error("dataSource Error");
    error.statusCode = 400;

    throw error;
  }
};

const getOrdering = (sortBy) => {
  switch (sortBy) {
    case "bookingRate":
      return `ORDER BY -bookingRatePercent`;
    case "alphabet":
      return `ORDER BY movieTitle`;
    default:
      return `ORDER BY -bookingRatePercent`;
  }
};

const getDate = async (movieId) => {
  try {
    const schedule = await dataSource.query(
      `
            SELECT 
            DISTINCT 
            CONCAT(DATE_FORMAT(screening_time, '%Y.%m.%d'),
            ' (',
            CASE DAYOFWEEK(screening_time)
            WHEN 1 THEN '일'
            WHEN 2 THEN '월'
            WHEN 3 THEN '화'
            WHEN 4 THEN '수'
            WHEN 5 THEN '목'
            WHEN 6 THEN '금'
            WHEN 7 THEN '토'
            ELSE 'Unknown'
            END,
            ')'
            ) AS date
            FROM screenings
            WHERE movie_id = ?
            ORDER BY date;
            `,
      [movieId]
    );
    return schedule;
  } catch (err) {
    const error = new Error("dataSource Error");
    error.statusCode = 400;

    throw error;
  }
};

const getSchedule = async (movieId, date) => {
  try {
    const schedule = await dataSource.query(
      `
            SELECT 
            s.id AS screeningId,
            t.theater_name AS theaterName, 
            CONCAT(
            DATE_FORMAT(s.screening_time, '%H:%i'),
            '~',
            DATE_FORMAT(ADDTIME(s.screening_time, SEC_TO_TIME(m.running_time_minute * 60)), '%H:%i')
            ) AS screeningTime,        
            (SELECT COUNT(*) FROM seats WHERE theater_id = t.id) - COUNT(bs.seat_id) AS remainingSeats 
            FROM screenings s 
            JOIN theaters t ON s.theater_id = t.id
            JOIN movies m ON s.movie_id = m.id
            LEFT JOIN bookings_seats bs ON s.id = (SELECT screening_id FROM bookings WHERE id = bs.booking_id) 
            WHERE s.movie_id = ?     
            AND DATE(s.screening_time) = ?
            GROUP BY screeningId, theaterName, s.screening_time 
            ORDER BY theaterName, s.screening_time;
            `,
      [movieId, date]
    );
    return schedule;
  } catch (err) {
    console.error(err);
    const error = new Error("dataSource Error");
    error.statusCode = 400;

    throw error;
  }
};

const getSeatsInformation = async (screeningId) => {
  try {
    const seatsInformation = await dataSource.query(
      `SELECT 
      s.seat_row AS seatRow,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'seatId', s.id,
          'seatColumn', s.seat_column, 
          'seatType', st.type_name, 
          'isSeatBooked', CASE WHEN b.id IS NULL THEN 'false' ELSE 'true' END
          )
        ) AS seats
     FROM seats s 
     LEFT JOIN bookings_seats bs 
     ON bs.seat_id = s.id 
     LEFT JOIN bookings b 
     ON b.id = bs.booking_id 
     INNER JOIN seat_types st 
     ON st.id=s.seat_type_id 
     WHERE screening_id = ? 
     OR screening_id is null 
     AND theater_id = (
      SELECT 
      theater_id 
      FROM screenings 
      WHERE id = ?)
      GROUP BY s.seat_row
     ;`,
      [screeningId, screeningId]
    );
    return seatsInformation;
  } catch {
    const error = new Error("dataSource Error");
    error.statusCode = 400;

    throw error;
  }
};

const getMovieInformationInSeatsSelection = (screeningId) => {
  try {
    const movieInforamtionInSeatsSelection = dataSource.query(
      `SELECT
      m.movie_title AS movieTitle,
      DATE_FORMAT(s.screening_time, '%Y.%m.%d(%a)') AS screeningDate,
      CONCAT(
        TIME_FORMAT(
          s.screening_time, 
          '%H:%i'
        )
        ,'-'
        ,TIME_FORMAT(
          ADDTIME(
            s.screening_time, 
            SEC_TO_TIME(m.running_time_minute * 60)
            ),
          '%H:%i'
         )
      ) AS screeningTime,
      m.poster_image_url AS moviePosterImageUrl,
      m.minimum_watching_age AS movieMinimumWatchingAge,
      m.poster_image_url AS moviePosterImageUrl
     FROM screenings s
     INNER JOIN movies m
     ON s.movie_id = m.id
     WHERE s.id = ?
      ;`,
      [screeningId]
    );

    return movieInforamtionInSeatsSelection;
  } catch {
    const error = new Error("dataSource Error");
    error.statusCode = 400;

    throw error;
  }
};

const getAudienceTypeIdByAudienceType = async (audienceType) => {
  try {
    const [getAudienceTypeId] = await dataSource.query(
      `SELECT id AS audienceTypeId
     FROM audience_types
     WHERE type_name = ?
     ;`,
      [audienceType]
    );
    const { audienceTypeId } = getAudienceTypeId;
    return audienceTypeId;
  } catch {
    const error = new Error("dataSource Error");
    error.statusCode = 400;

    throw error;
  }
};

const getScreeningTypeIdByScreeningId = async (screeningId) => {
  try {
    const [getScreeningTypeId] = await dataSource.query(
      `SELECT screening_type_id AS screeningTypeId
     FROM screenings 
     WHERE id = ?
     ; `,
      [screeningId]
    );
    const { screeningTypeId } = getScreeningTypeId;
    return screeningTypeId;
  } catch {
    const error = new Error("dataSource Error");
    error.statusCode = 400;

    throw error;
  }
};

const getIsEarlybirdByScreeningId = async (screeningId) => {
  try {
    const [getIsEarlybird] = await dataSource.query(
      `SELECT
     CASE WHEN HOUR(screening_time) < 10 AND HOUR(screening_time) > 6
     THEN TRUE 
     ELSE FALSE 
     END AS isEarlybird
     FROM screenings
     WHERE id = ?
     ; `,
      [screeningId]
    );
    const { isEarlybird } = getIsEarlybird;
    return isEarlybird;
  } catch {
    const error = new Error("dataSource Error");
    error.statusCode = 400;

    throw error;
  }
};

const getSeatTypIdeBySeatId = async (seatId) => {
  try {
    const [getSeatTypeId] = await dataSource.query(
      `SELECT
     seat_type_id AS seatTypeId
     FROM seats
     WHERE id = ?
     ;`,
      [seatId]
    );
    const { seatTypeId } = getSeatTypeId;
    return seatTypeId;
  } catch {
    const error = new Error("dataSource Error");
    error.statusCode = 400;

    throw error;
  }
};

const getSeatPrice = async (audienceTypeId, screeningTypeId, isEarlybird, seatTypeId) => {
  try {
    const [getSeatPrice] = await dataSource.query(
      `SELECT 
      price AS seatPrice 
     FROM ticket_prices 
     WHERE audience_type_id = ?
     AND screening_type_id = ? 
     AND is_earlybird = ? 
     AND seat_type_id = ? ;`,
      [audienceTypeId, screeningTypeId, isEarlybird, seatTypeId]
    );
    const { seatPrice } = await getSeatPrice;
    return Number(seatPrice);
  } catch {
    const error = new Error("dataSource Error");
    error.statusCode = 400;

    throw error;
  }
};

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


module.exports = {
  getAllMoviesInformation,
  getDate,
  getSchedule,
  getSeatsInformation,
  getMovieInformationInSeatsSelection,
  getAudienceTypeIdByAudienceType,
  getScreeningTypeIdByScreeningId,
  getIsEarlybirdByScreeningId,
  getSeatTypIdeBySeatId,
  getSeatPrice,
  alterBookingSeats, getTotalPriceByBookingId, getBookingInfo, pendSeat, getBookingId, pendPayment, alterBooking, getMemberPointById, updateMemberPoints
};
