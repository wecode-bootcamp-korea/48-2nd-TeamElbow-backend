-- migrate:up
CREATE TABLE `seat_prices` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `screening_id` int NOT NULL,
  `seat_id` int NOT NULL,
  `price` int NOT NULL,
  FOREIGN KEY (screening_id) REFERENCES screenings (id),
  FOREIGN KEY (seat_id) REFERENCES seats (id)
);


-- migrate:down

