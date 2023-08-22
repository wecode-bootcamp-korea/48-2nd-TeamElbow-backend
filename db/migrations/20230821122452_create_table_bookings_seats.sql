-- migrate:up
CREATE TABLE `bookings_seats` (
  `booking_id` int,
  `seat_id` int,
  PRIMARY KEY (`booking_id`, `seat_id`),
  FOREIGN KEY (booking_id) REFERENCES bookings (id),
  FOREIGN KEY (seat_id) REFERENCES seats (id)
);


-- migrate:down

