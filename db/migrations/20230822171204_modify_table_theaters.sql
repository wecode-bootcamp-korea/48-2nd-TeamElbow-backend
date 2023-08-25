-- migrate:up
ALTER TABLE theaters CHANGE name theater_name varchar(30) not null unique;
ALTER TABLE theaters DROP COLUMN theaters_property;
INSERT INTO memberships (membership_name, earning_point_rate) values (`normal`,2);
-- migrate:down

