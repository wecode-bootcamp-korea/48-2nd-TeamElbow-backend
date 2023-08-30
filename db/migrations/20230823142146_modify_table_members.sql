-- migrate:up
ALTER TABLE `members` 
CHANGE COLUMN `membership_id` `membership_id` INT NOT NULL DEFAULT 1 ,
CHANGE COLUMN `point` `point` DECIMAL(9,2) NOT NULL DEFAULT 100000 ;

-- migrate:down

