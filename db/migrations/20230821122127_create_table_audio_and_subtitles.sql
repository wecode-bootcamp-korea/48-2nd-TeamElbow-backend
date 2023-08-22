-- migrate:up
CREATE TABLE `audio_and_subtitles` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `audio_subtitle_type` varchar(30) NOT NULL
);

-- migrate:down

