-- migrate:up
CREATE TABLE `memberships` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `membership_name` varchar(50) NOT NULL,
  `earning_point_rate` int NOT NULL
);

-- migrate:down

