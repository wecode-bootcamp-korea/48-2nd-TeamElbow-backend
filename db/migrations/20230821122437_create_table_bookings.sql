-- migrate:up
CREATE TABLE `bookings` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `booking_number` int UNIQUE NOT NULL,
  `booking_time` timestamp NOT NULL,
  `seat_id` int NOT NULL,
  `member_id` int NOT NULL,
  `screening_id` int NOT NULL,
  `price` int NOT NULL,
  FOREIGN KEY (seat_id) REFERENCES seats (id),
  FOREIGN KEY (member_id) REFERENCES members (id),
  FOREIGN KEY (screening_id) REFERENCES screenings (id)
);

-- migrate:down

