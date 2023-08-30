const {dataSource} = require('./dataSource');

const getAllMoviesInformation = async (ordering) => {
    
    try {
        const allMoviesInformation = await dataSource.query(
            `
            SELECT
            id,
            movie_title as movieTitle,
            minimum_watching_age as minimumWatchingAge,
            booking_rate_percent as bookingRatePercent,
            poster_image_url AS moviePosterImageUrl,
            running_time_minute AS movieRunningTimeMinute
            FROM movies
            ${ordering};
            `
        )
        
        return allMoviesInformation;
    } catch(err) {
        console.log(err);
        const error = new Error("dataSource Error");
        error.statusCode = 400;

        throw error;
    }
};

const getDate = async (movieId) => {
    try{
        const schedule = await dataSource.query(
            `
            SELECT 
            DISTINCT DATE(screening_time) AS date
            FROM screenings
            WHERE movie_id = ?
            ORDER BY date;
            `,
            [movieId]
    )
    return schedule;
    } catch(err)  {
        console.log(err);
        const error = new Error("dataSource Error");
        error.statusCode = 400;

        throw error;
    };
};

const getSchedule = async (movieId, date) => {
    try{
        const schedule = await dataSource.query(
            `
            SELECT 
            s.id AS screeningId,
            t.theater_name AS theaterName, 
            s.screening_time AS screeningTime,        
            (SELECT COUNT(*) FROM seats WHERE theater_id = t.id) - COUNT(bs.seat_id) AS remainingSeats 
            FROM screenings s 
            JOIN theaters t ON s.theater_id = t.id 
            LEFT JOIN bookings_seats bs ON s.id = (SELECT screening_id FROM bookings WHERE id = bs.booking_id) 
            WHERE s.movie_id = ?     
            AND DATE(s.screening_time) = ?
            GROUP BY screeningId, theaterName, s.screening_time 
            ORDER BY theaterName, s.screening_time;
            `,
            [movieId, date]
    )
    return schedule;
    } catch(err)  {
        console.log(err);
        const error = new Error("dataSource Error");
        error.statusCode = 400;

        throw error;
    };
};

module.exports = {
    getAllMoviesInformation,
    getDate,
    getSchedule
}
