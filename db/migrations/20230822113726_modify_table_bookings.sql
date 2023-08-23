-- migrate:up
ALTER TABLE bookings DROP FOREIGN KEY bookings_ibfk_1;
ALTER TABLE bookings DROP COLUMN seat_id;

-- migrate:down

