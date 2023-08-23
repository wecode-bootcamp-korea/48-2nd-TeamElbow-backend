-- migrate:up
ALTER TABLE seats DROP FOREIGN KEY seats_ibfk_1;
ALTER TABLE seats DROP COLUMN screening_id;
ALTER TABLE seats DROP COLUMN seat_type;
ALTER TABLE seats DROP COLUMN is_booked;
ALTER TABLE seats ADD COLUMN theater_id int not null;
ALTER TABLE seats ADD COLUMN seat_type_id int not null;
ALTER TABLE seats ADD FOREIGN KEY (seat_type_id) REFERENCES seat_types(id);
ALTER TABLE seats ADD FOREIGN KEY (theater_id) REFERENCES theaters(id);


-- migrate:down

