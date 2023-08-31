const { dataSource } = require("./dataSource");

const getAllMoviesInformation = async (ordering) => {
  try {
    const allMoviesInformation = await dataSource.query(
      `SELECT
      id,
      movie_title as movieTitle,
      poster_image_url as moviePosterImageUrl,
      DATE_FORMAT(release_date , '%Y-%m-%d') AS movieReleaseDate,
      booking_rate_percent as bookingRatePercent
     From movies
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
      id,
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
