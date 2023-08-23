-- migrate:up
ALTER TABLE movies MODIFY booking_rate_percent decimal(3,1);

-- migrate:down

