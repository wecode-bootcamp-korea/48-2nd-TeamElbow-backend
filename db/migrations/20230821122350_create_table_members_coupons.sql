-- migrate:up
CREATE TABLE `member_coupons` (
  `member_id` int not null,
  `coupon_id` null,
  PRIMARY KEY (`member_id`, `coupon_id`),
  FOREIGN KEY (member_id) REFERENCES members (id),
  FOREIGN KEY (coupon_id) REFERENCES coupons (id)
);

-- migrate:down

