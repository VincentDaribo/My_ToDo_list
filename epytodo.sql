DROP DATABASE IF EXISTS epytodo;

CREATE DATABASE epytodo;

USE epytodo;

DROP TABLE IF EXISTS `user`;

CREATE TABLE user (
    id int NOT NULL AUTO_INCREMENT,
    email varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,
    name varchar(255) NOT NULL,
    firstname varchar(255) NOT NULL,
    created_at datetime default CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `todo`;

CREATE TABLE todo (
    id int NOT NULL AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    description varchar(255) NOT NULL,
    created_at datetime default CURRENT_TIMESTAMP,
    due_time datetime NOT NULL,
    user_id int NOT NULL,
    status ENUM('not started', 'todo', 'in progress', 'done') default 'not started',
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=latin1;