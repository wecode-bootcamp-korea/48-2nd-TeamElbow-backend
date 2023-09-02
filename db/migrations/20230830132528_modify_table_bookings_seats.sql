-- migrate:up
ALTER TABLE bookings_seats ADD column status varchar(10) NOT NULL;

-- migrate:down

