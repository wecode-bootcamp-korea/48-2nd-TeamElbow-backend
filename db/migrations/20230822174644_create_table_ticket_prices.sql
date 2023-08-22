-- migrate:up
CREATE TABLE ticket_prices (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  screening_type_id INT NOT NULL,
  is_earylbird BOOLEAN NOT NULL,
  audience_type_id INT NOT NULL,
  seat_type_id INT NOT NULL,
  FOREIGN KEY (screening_type_id) REFERENCES screening_types (id),
  FOREIGN KEY (audience_type_id) REFERENCES audience_types (id),
  FOREIGN KEY (seat_type_id) REFERENCES seat_types (id)
);

-- migrate:down

