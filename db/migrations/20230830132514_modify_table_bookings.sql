-- migrate:up
ALTER TABLE bookings ADD column status varchar(10) NOT NULL;

-- migrate:down

