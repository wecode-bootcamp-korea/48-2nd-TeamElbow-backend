const { dataSource } = require("./dataSource");

const getSeatsInformation = (screeningId) => {
  const seatsInformation = dataSource.query(
    `SELECT 
      s.id AS seatId, 
      st.type_name AS seatType,
      CASE WHEN 
        b.id IS NULL THEN 'notBooked' 
        ELSE 'booked' 
        END AS seatIsBooked
     FROM seats s 
     LEFT JOIN bookings_seats bs 
     ON bs.seat_id = s.id 
     LEFT JOIN bookings b 
     ON b.id = bs.booking_id 
     INNER JOIN seat_types st 
     ON st.id=s.seat_type_id 
     WHERE screening_id = 1 
     OR screening_id is null 
     AND theater_id = (
      SELECT 
      theater_id 
      FROM screenings 
      WHERE id = 1
     );`,
    [screeningId, screeningId]
  );
  return seatsInformation;
};

const getMovieInformationInSeatsSelection = (screeningId) => {
  const movieInforamtionInSeatsSelection = dataSource.query(
    `SELECT
      s.movie_title AS movieTitle
      s.screening_time AS screeningTime,
      m.poster_image_url AS moviePosterImageUrl,
      m.minimum_watching_age AS minimumWatchingAge,
      m.poset_image_url AS moviePosterImageUrl,
      m.running_time_minute AS runningTime
     From screenings s
     INNER JOIN movies m
     ON s.movie_id = m.id;
     WHERE s.id = ?
      ;`,
    [screeningId]
  );

  return movieInforamtionInSeatsSelection;
};

const getScreeningTypeIdByScreeningId = (screeningId) => {
  const [screeningType] = dataSource.query(
    `SELECT screening_type_id 
     FROM screenings 
     WHERE id = ?
     ; `,
    [screeningId]
  );

  return screeningType;
};

const getIsEarlybirdByScreeningId = (screeningId) => {
  const [isEarlybird] = dataSource.query(
    `SELECT
     CASE WHEN HOUR(screening_time) < 10 AND HOUR(screening_time) > 6
     THEN TRUE 
     ELSE FALSE 
     END AS isEarlyBird
     FROM screenings
     WHERE id = ?
     ; `,
    [screeningId]
  );

  return isEarlybird;
};

const getSeatTypIdeBySeatId = (seatId) => {
  const [seatTypeId] = dataSource.query(
    `SELECT
     seat_type_id
     FROM seats
     WHERE id = ?
     ;`,
    [seatId]
  );

  return seatTypeId;
};

const getSeatPrice = (
  audienceTypeId,
  screeningTypeId,
  isEarlybird,
  seatTypeId
) => {
  const [seatPrice] = dataSource.query(
    `SELECT 
      pirce AS ticketPrice 
     FROM ticket_pirces 
     WHERE audience_type_id = ? 
     AND scrrening_type_id = ?, 
     AND is_earlybird = ? 
     AND seat_type_id = ? ;`,
    [audienceTypeId, screeningTypeId, isEarlybird, seatTypeId]
  );

  return seatPrice;
};

module.exports = {
  getSeatsInformation,
  getMovieInformationInSeatsSelection,
  getScreeningTypeIdByScreeningId,
  getIsEarlybirdByScreeningId,
  getSeatTypIdeBySeatId,
  getSeatPrice,
};
