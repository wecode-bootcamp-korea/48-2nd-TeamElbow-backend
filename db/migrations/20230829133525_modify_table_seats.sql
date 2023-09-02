-- migrate:up
ALTER TABLE `seats` 
CHANGE COLUMN `seat_column` `seat_row` VARCHAR(1) NOT NULL ,
CHANGE COLUMN `seat_row` `seat_column` INT NOT NULL ;

-- migrate:down

