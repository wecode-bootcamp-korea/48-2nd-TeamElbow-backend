-- migrate:up
CREATE TABLE `members` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `member_sign_in_id` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(50) NOT NULL,
  `phone_number` varchar(50) NOT NULL,
  `email` varchar(50) UNIQUE NOT NULL,
  `birthday` date NOT NULL,
  `membership_id` int NOT NULL,
  `point` decimal(9,2) NOT NULL,
  `gender` enum('male', 'female') NOT NULL,
  FOREIGN KEY (membership_id) REFERENCES memberships (id)
);

-- migrate:down

