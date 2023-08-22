-- migrate:up
ALTER TABLE seat_prices DROP FOREIGN KEY seat_prices_ibfk_1;
ALTER TABLE seat_prices DROP FOREIGN KEY seat_prices_ibfk_2;
DROP TABLE seat_prices;


-- migrate:down

