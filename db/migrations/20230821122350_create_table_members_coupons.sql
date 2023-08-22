-- migrate:up
CREATE TABLE `members_coupons` (
  `member_id` int not null,
  `coupon_id` int not null,
  `the_number_of_coupon` int not null,
  PRIMARY KEY (`member_id`, `coupon_id`),
  FOREIGN KEY (member_id) REFERENCES members (id),
  FOREIGN KEY (coupon_id) REFERENCES coupons (id)
);

-- migrate:down

