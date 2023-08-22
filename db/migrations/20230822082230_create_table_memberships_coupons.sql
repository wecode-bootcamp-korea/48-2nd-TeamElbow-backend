-- migrate:up
CREATE TABLE `memberships_coupons` (
  `membership_id` int not null,
  `coupon_id` int not null,
  `the_number_of_coupon` int not null,
  PRIMARY KEY (`membership_id`, `coupon_id`),
  FOREIGN KEY (membership_id) REFERENCES memberships (id),
  FOREIGN KEY (coupon_id) REFERENCES coupons (id)
);

-- migrate:down

