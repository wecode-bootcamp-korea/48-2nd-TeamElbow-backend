-- migrate:up
ALTER TABLE memberships_coupons DROP FOREIGN KEY memberships_coupons_ibfk_1;
ALTER TABLE memberships_coupons DROP FOREIGN KEY memberships_coupons_ibfk_2;
ALTER TABLE memberships_coupons DROP PRIMARY KEY;
ALTER TABLE memberships_coupons ADD `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT FIRST;


-- migrate:down

