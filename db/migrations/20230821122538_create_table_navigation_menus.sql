-- migrate:up
CREATE TABLE `navigtion_menus` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `menu_name` varchar(30) NOT NULL
);

-- migrate:down

