-- migrate:up
CREATE TABLE `seats` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `screening_id` int NOT NULL,
  `seat_column` varchar(1) NOT NULL,
  `seat_row` int NOT NULL,
  `seat_type` varchar(20) NOT NULL,
  FOREIGN KEY (screening_id) REFERENCES screenings (id)
);

-- migrate:down

