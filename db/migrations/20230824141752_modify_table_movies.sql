-- migrate:up
ALTER TABLE movies 
DROP COLUMN director_and_actor,
ADD director varchar(30) NOT NULL AFTER `poster_image_url`,
ADD actor varchar(100) NOT NULL AFTER `director`;
ALTER TABLE movies
MODIFY COLUMN minimum_watching_age varchar(30) NOT NULL;

-- migrate:down

