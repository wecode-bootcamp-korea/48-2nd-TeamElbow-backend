-- migrate:up
ALTER TABLE `bookings_seats` 
DROP FOREIGN KEY `bookings_seats_ibfk_1`,
DROP FOREIGN KEY `bookings_seats_ibfk_2`;
ALTER TABLE `bookings_seats`
ADD COLUMN `id` INT NOT NULL AUTO_INCREMENT FIRST,
DROP PRIMARY KEY,
ADD PRIMARY KEY (`id`);
ALTER TABLE `bookings_seats`
ADD CONSTRAINT `bookings_seats_ibfk_1`
FOREIGN KEY (booking_id) REFERENCES bookings(id),
ADD CONSTRAINT `bookings_seats_ibfk_2`
FOREIGN KEY (seat_id) REFERENCES seats(id);

-- migrate:down

