-- migrate:up
CREATE TABLE `coupons` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `coupon_name` varchar(50) NOT NULL,
  `the_number_of_coupon` int NOT NULL
);

-- migrate:down

