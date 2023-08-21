-- migrate:up
CREATE TABLE `movies` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `movie_title` VARCHAR(50) NOT NULL,
  `running_time_minute` INT NOT NULL,
  `minimum_watching_age` INT NOT NULL,
  `language` VARCHAR(30) NOT NULL,
  `genre` VARCHAR(30) NOT NULL,
  `poster_image_url` VARCHAR(255) NOT NULL,
  `director_and_actor` JSON NOT NULL,
  `description` TEXT NOT NULL,
  `booking_rate_percent` INT NOT NULL,
  `release_date` DATE NOT NULL
);

-- migrate:down

