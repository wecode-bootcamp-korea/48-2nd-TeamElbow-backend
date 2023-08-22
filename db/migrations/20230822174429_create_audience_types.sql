-- migrate:up
CREATE TABLE audience_types (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  type_name VARCHAR(30) NOT NULL UNIQUE
);

-- migrate:down

