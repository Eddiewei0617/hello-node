SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

CREATE DATABASE `iii-todos` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `iii-todos`;

CREATE TABLE `members` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(256) DEFAULT NULL,
  `password` char(60) DEFAULT NULL,
  `name` varchar(64) DEFAULT NULL,
  `photo` varchar(128) DEFAULT NULL,
  `last_logined_at` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mem_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `members` (`id`, `email`, `password`, `name`, `photo`, `last_logined_at`, `created_at`, `updated_at`) VALUES
(1,	'test@example.com',	'$2b$10$mWhGA/WRJfAbZPb4btWY7ubEVccaSnXQ6TIS4kMgUH0G/i9WyKfjq',	'tester',	NULL,	'2021-10-12 18:18:30',	'2021-10-10 13:31:30',	'2021-10-12 10:18:29'),
(2,	'test2@example.com',	NULL,	'tester2',	NULL,	'2021-10-11 11:23:58',	'2021-10-10 13:31:30',	'2021-10-11 03:23:58');

CREATE TABLE `member_todos` (
  `member_id` int(10) unsigned NOT NULL,
  `todo_id` int(11) NOT NULL,
  PRIMARY KEY (`member_id`,`todo_id`),
  KEY `todo_id` (`todo_id`),
  KEY `member_id` (`member_id`),
  CONSTRAINT `member_todos_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`) ON DELETE CASCADE,
  CONSTRAINT `member_todos_ibfk_2` FOREIGN KEY (`todo_id`) REFERENCES `todos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `member_todos` (`member_id`, `todo_id`) VALUES
(1,	1),
(2,	1),
(1,	2),
(1,	3),
(2,	4),
(1,	5),
(1,	6),
(2,	7),
(1,	8),
(1,	9),
(1,	10),
(1,	11),
(1,	12),
(1,	13),
(1,	14),
(1,	15),
(1,	16),
(1,	17),
(1,	18),
(1,	19),
(1,	20),
(1,	21),
(1,	22),
(2,	24);

CREATE TABLE `todos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL,
  `content` text,
  `photo` varchar(128) DEFAULT NULL,
  `deadline` date DEFAULT NULL,
  `status` char(1) NOT NULL DEFAULT 'A',
  `creator_id` int(10) unsigned DEFAULT NULL,
  `updator_id` int(10) unsigned DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `creator_id` (`creator_id`),
  KEY `updator_id` (`updator_id`),
  CONSTRAINT `todos_ibfk_1` FOREIGN KEY (`creator_id`) REFERENCES `members` (`id`) ON DELETE SET NULL,
  CONSTRAINT `todos_ibfk_2` FOREIGN KEY (`updator_id`) REFERENCES `members` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `todos` (`id`, `title`, `content`, `photo`, `deadline`, `status`, `creator_id`, `updator_id`, `created_at`, `updated_at`) VALUES
(1,	'test todo 1',	'no data no data\n編輯資料',	'/uploads/todo-1633930548981.jpg',	'2021-10-11',	'A',	1,	1,	'2021-10-10 13:31:54',	'2021-10-11 05:39:10'),
(2,	'test todo 2',	'no data no data',	NULL,	'2021-12-31',	'B',	1,	1,	'2021-10-10 13:31:54',	'2021-10-11 12:45:40'),
(3,	'test todo 3',	'no data no data',	'/uploads/todo-1633930819596.jpg',	'2021-10-14',	'C',	1,	1,	'2021-10-10 13:32:40',	'2021-10-11 05:40:19'),
(4,	'test todo 4',	'no data no data',	NULL,	'2021-12-31',	'A',	1,	1,	'2021-10-10 13:32:58',	'2021-10-11 12:45:40'),
(5,	'test todo 5',	'no data no data',	NULL,	'2021-12-31',	'A',	1,	1,	'2021-10-10 13:34:56',	'2021-10-11 12:45:40'),
(6,	'test todo 6',	'no data no data',	NULL,	'2021-12-31',	'A',	1,	1,	'2021-10-10 13:34:56',	'2021-10-11 12:45:40'),
(7,	'test todo 7',	'no data no data',	NULL,	'2021-12-31',	'A',	1,	1,	'2021-10-10 13:34:56',	'2021-10-11 12:45:40'),
(8,	'test todo 8',	'no data no data',	NULL,	'2021-12-31',	'A',	1,	1,	'2021-10-10 13:34:56',	'2021-10-11 12:45:40'),
(9,	'test todo 9',	'no data no data',	NULL,	'2021-12-31',	'A',	1,	1,	'2021-10-10 13:34:56',	'2021-10-11 12:45:40'),
(10,	'test todo 10',	'no data no data',	NULL,	'2021-12-31',	'A',	1,	1,	'2021-10-10 13:34:56',	'2021-10-11 12:45:40'),
(11,	'test todo 11',	'no data no data',	NULL,	'2021-12-31',	'A',	1,	1,	'2021-10-10 13:34:56',	'2021-10-11 12:45:40'),
(12,	'test todo 12',	'no data no data',	NULL,	'2021-12-31',	'A',	1,	1,	'2021-10-10 13:34:56',	'2021-10-11 12:45:40'),
(13,	'test todo 13',	'no data no data',	NULL,	'2021-12-31',	'A',	1,	1,	'2021-10-10 13:34:56',	'2021-10-11 12:45:40'),
(14,	'test todo 14',	'no data no data',	NULL,	'2021-12-31',	'A',	1,	1,	'2021-10-10 13:34:56',	'2021-10-11 12:45:40'),
(15,	'test todo 15',	'no data no data',	NULL,	'2021-12-31',	'A',	1,	1,	'2021-10-10 13:34:56',	'2021-10-11 12:45:40'),
(16,	'test todo 16',	'no data no data',	NULL,	'2021-12-31',	'A',	1,	1,	'2021-10-10 13:34:56',	'2021-10-11 12:45:40'),
(17,	'test todo 17',	'no data no data',	NULL,	'2021-12-31',	'A',	1,	1,	'2021-10-10 13:34:56',	'2021-10-11 12:45:40'),
(18,	'test todo 18',	'no data no data',	NULL,	'2021-12-31',	'A',	1,	1,	'2021-10-10 13:34:56',	'2021-10-11 12:45:40'),
(19,	'test todo 19',	'no data no data',	NULL,	'2021-12-31',	'A',	1,	1,	'2021-10-10 13:34:56',	'2021-10-11 12:45:40'),
(20,	'test todo 20',	'no data no data',	NULL,	'2021-12-31',	'A',	1,	1,	'2021-10-10 13:34:56',	'2021-10-11 12:45:40'),
(21,	'test todo 21',	'no data no data',	NULL,	'2021-12-31',	'A',	1,	1,	'2021-10-10 13:34:56',	'2021-10-11 12:45:40'),
(22,	'test todo 22',	'no data no data',	NULL,	'2021-12-31',	'A',	1,	1,	'2021-10-10 13:34:56',	'2021-10-11 12:45:40'),
(24,	'測試TODO2',	'測試 again 修改內容',	'/uploads/todo-1633956723497.jpg',	'2021-10-10',	'B',	1,	1,	'2021-10-11 12:52:03',	'2021-10-11 13:18:25');