const {dataSource} = require('./dataSource');



const getAllMoviesInformation = async (sortBy) => {
    try {
        const ordering = getOrdering(sortBy);

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
    try{
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
    )
    return schedule;
    } catch(err)  {
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
    )
    return schedule;
    } catch(err) {
        console.error(err);
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
