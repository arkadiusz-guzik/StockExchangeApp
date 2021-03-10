DROP SCHEMA IF EXISTS `stock_exchange_db`;

CREATE SCHEMA `stock_exchange_db`;
USE `stock_exchange_db` ;

SET foreign_key_checks = 0;

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `user_id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL unique,
  `password` varchar(100) NOT NULL,
  `email` varchar(30) NOT NULL,
  `money` double(9,2) DEFAULT 10000.00,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB
AUTO_INCREMENT = 1;

DROP TABLE IF EXISTS `stocks`;
CREATE TABLE `stocks` (
  `stock_id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `shortcut` VARCHAR(20) NOT NULL,
  `number` int(9) NOT NULL,
  `price` double(9,2) NOT NULL,
  `user_id` BIGINT(20) NOT NULL,
  PRIMARY KEY (`stock_id`),
  KEY `fk_stock_users` (`user_id`),
  CONSTRAINT `fk_stock_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) 
ENGINE=InnoDB
AUTO_INCREMENT = 1;

DROP TABLE IF EXISTS `history`;
CREATE TABLE `history` (
  `history_id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `date` VARCHAR(20) NOT NULL,
  `action` VARCHAR(4) NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `shortcut` VARCHAR(20) NOT NULL,
  `price` double(9,2) NOT NULL,
  `number` int(9) NOT NULL,
  `total_price` double(9,2) NOT NULL,
  `account_balance` double(9,2) NOT NULL,
  `user_id` BIGINT(20) NOT NULL,
  PRIMARY KEY (`history_id`),
  KEY `fk_history_users` (`user_id`),
  CONSTRAINT `fk_history_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) 
ENGINE=InnoDB
AUTO_INCREMENT = 1;