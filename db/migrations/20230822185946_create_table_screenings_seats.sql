-- migrate:up
CREATE TABLE screenings_seats (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  screening_id INT NOT NULL,
  seat_id INT NOT NULL,
  FOREIGN KEY (screening_id) REFERENCES screenings (id),
  FOREIGN KEY (seat_id) REFERENCES seats (id)
);

-- migrate:down

