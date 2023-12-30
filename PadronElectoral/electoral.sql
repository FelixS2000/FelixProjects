-- electoral.sql
CREATE DATABASE electoral;
USE electoral;

CREATE TABLE voters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    voter_id VARCHAR(255) NOT NULL UNIQUE
);
