-- migrate:up
ALTER TABLE members_coupons DROP FOREIGN KEY members_coupons_ibfk_1;
ALTER TABLE members_coupons DROP FOREIGN KEY members_coupons_ibfk_2;
ALTER TABLE members_coupons DROP PRIMARY KEY;
ALTER TABLE members_coupons ADD `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT FIRST;


-- migrate:down

