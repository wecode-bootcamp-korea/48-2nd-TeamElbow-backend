const { dataSource } = require("./dataSource");

const calculateBookingRate = async (movieId) => {
  const [allBookings] = await dataSource.query(
    `SELECT 
    COUNT(id) as denominator
    FROM 
    screenings_seats;`
  );

  const [specificBookings] = await dataSource.query(
    `SELECT 
      COUNT(movie_id) as numerator
     FROM 
      (SELECT 
        ss.id, 
        s.movie_id 
        FROM screenings_seats ss 
        LEFT JOIN screenings s 
        ON ss.screening_id = s.id 
        where movie_id = ?) t 
     group by movie_id;`,
    [movieId]
  );
  const bookingRatePercent = (specificBookings["numerator"] / allBookings["denominator"]) * 100;
  return bookingRatePercent;
};

const recordBookingRate = async (movieId, bookingRatePercent) => {
  await dataSource.query(
    `UPDATE 
      movies 
     SET booking_rate_percent=?
     WHERE id = ?;`,
    [bookingRatePercent, movieId]
  );
};

const getAllMovieId = async () => {
  const allMovieIdJson = await dataSource.query(`SELECT id FROM movies;`);
  const allMovieId = await allMovieIdJson.map((element) => element.id);
  return allMovieId;
};

const getAllMoviesInformation = async (ordering) => {
  const allMoviesInformation = await dataSource.query(
    `SELECT
      movie_title as movieTitle,
      poster_image_url as moviePosterImageUrl,
      release_date as movieReleaseDate,
      booking_rate_percent as bookingRatePercent
     From movies
     ${ordering};
      `
  );
  return allMoviesInformation;
};

const getSpecificMovieInformation = async (movieId) => {
  const specificMovieInformation = await dataSource.query(
    `SELECT
      movie_title as movieTitle,
      poster_image_url as moviePosterImageUrl,
      release_date as movieReleaseDate,
      booking_rate_percent as bookingRatePercent,
      description as movieDescription,
      running_time_minute as movieRunningTimeMinute,
      minimum_watching_age as movieMinimumWatchingAge,
      language as movieLanguage,
      director as movieDirector,
      actor as movieActor
     From movies
     WHERE id = ?;
      `,
    [movieId]
  );
  return specificMovieInformation;
};

module.exports = {
  calculateBookingRate,
  recordBookingRate,
  getAllMoviesInformation,
  getSpecificMovieInformation,
  getAllMovieId,
};
