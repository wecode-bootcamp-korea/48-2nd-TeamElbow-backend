const { dataSource } = require("./dataSource");

const getAllMoviesInformation = async (ordering) => {
  try {
    const allMoviesInformation = await dataSource.query(
      `SELECT
      id,
      movie_title AS movieTitle,
      poster_image_url AS moviePosterImageUrl,
      DATE_FORMAT(release_date , '%Y-%m-%d') AS movieReleaseDate,
      booking_rate_percent AS bookingRatePercent,
      RANK() OVER 
        (ORDER BY -booking_rate_percent) AS boxofficeRanking
     FROM movies
     ${ordering};
      `
    );
    return allMoviesInformation;
  } catch (err) {
    console.log(err);
    const error = new Error("dataSource Error");
    error.statusCode = 400;

    throw error;
  }
};

const getSpecificMovieInformation = async (movieId) => {
  try {
    const specificMovieInformation = await dataSource.query(
      `SELECT
      m1.id,
      m1.movie_title AS movieTitle,
      m1.poster_image_url AS moviePosterImageUrl,
      m1.release_date AS movieReleaseDate,
      m1.booking_rate_percent AS bookingRatePercent,
      m1.description AS movieDescription,
      m1.running_time_minute AS movieRunningTimeMinute,
      m1.minimum_watching_age AS movieMinimumWatchingAge,
      m1.language AS movieLanguage,
      m1.director AS movieDirector,
      m1.actor AS movieActor,
      m2.boxofficeRanking
     FROM movies m1
     INNER JOIN (SELECT m.id, RANK() OVER (ORDER BY -booking_rate_percent) AS boxofficeRanking FROM movies m) m2
     ON m1.id = m2.id
     WHERE m1.id = ?;
      `,
      [movieId]
    );
    return specificMovieInformation;
  } catch (err) {
    console.log(err);
    const error = new Error("dataSource Error");
    error.statusCode = 400;

    throw error;
  }
};

module.exports = {
  getAllMoviesInformation,
  getSpecificMovieInformation,
};
