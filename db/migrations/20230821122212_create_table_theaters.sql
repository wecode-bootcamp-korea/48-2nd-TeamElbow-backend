-- migrate:up
CREATE TABLE `theaters` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `teathers_property` varchar(30) NOT NULL
);

-- migrate:down

