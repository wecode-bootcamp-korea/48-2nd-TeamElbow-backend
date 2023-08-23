-- migrate:up
CREATE TABLE seat_types (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  type_name varchar(30) NOT NULL UNIQUE
);
-- migrate:down

