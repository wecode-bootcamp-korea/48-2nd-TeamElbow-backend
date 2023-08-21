-- migrate:up
CREATE TABLE `memberships` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `level_name` varchar(50) NOT NULL,
  `free_booking_coupon` int NOT NULL,
  `free_snack_coupon` int NOT NULL,
  `store_discount_coupon` int NOT NULL,
  `free_photo_ticket_coupon` int NOT NULL,
  `half_price_point_booking_coupon` int NOT NULL,
  `earning_point_rate` int NOT NULL
);

-- migrate:down

