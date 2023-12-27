-- electoral.sql
CREATE DATABASE electoral;
USE electoral;
CREATE TABLE voters (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  age INT NOT NULL,
  address VARCHAR(100) NOT NULL,
  photo BLOB
);
