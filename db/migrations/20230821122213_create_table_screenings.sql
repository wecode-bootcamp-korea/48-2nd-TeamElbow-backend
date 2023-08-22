-- migrate:up
CREATE TABLE `screenings` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `screening_time` datetime NOT NULL,
  `theater_id` int NOT NULL,
  `movie_id` int NOT NULL,
  `audio_and_subtitle_id` INT NOT NULL,
  FOREIGN KEY (theater_id) REFERENCES theaters (id),
  FOREIGN KEY (movie_id) REFERENCES movies (id),
  FOREIGN KEY (audio_and_subtitle_id) REFERENCES audio_and_subtitles (id)
);

-- migrate:down

