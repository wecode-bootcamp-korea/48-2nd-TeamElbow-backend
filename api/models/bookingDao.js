const { dataSource } = require("./dataSource");

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
      m.minimum_watching_age AS minimumWatchingAge,
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

module.exports = {
  getSeatsInformation,
  getMovieInformationInSeatsSelection,
  getAudienceTypeIdByAudienceType,
  getScreeningTypeIdByScreeningId,
  getIsEarlybirdByScreeningId,
  getSeatTypIdeBySeatId,
  getSeatPrice,
};
