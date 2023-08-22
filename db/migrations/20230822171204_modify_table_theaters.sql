-- migrate:up
ALTER TABLE theaters CHANGE name theater_name varchar(30) not null unique;
ALTER TABLE theaters DROP COLUMN theaters_property;

-- migrate:down

