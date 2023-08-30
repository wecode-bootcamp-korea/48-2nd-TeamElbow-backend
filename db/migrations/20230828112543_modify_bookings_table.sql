-- migrate:up
ALTER TABLE bookings CHANGE COLUMN `booking_time` `booking_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ;


-- migrate:down

