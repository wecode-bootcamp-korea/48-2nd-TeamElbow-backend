-- migrate:up
ALTER TABLE screenings ADD COLUMN screening_type_id int not null,
ADD FOREIGN KEY (screening_type_id) REFERENCES screening_types(id);

-- migrate:down

