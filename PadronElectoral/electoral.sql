-- electoral.sql
CREATE DATABASE electoral;
USE electoral;
CREATE TABLE voters (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  age INT NOT NULL,
  address VARCHAR(100) NOT NULL,
  gender VARCHAR(10),
  photo BLOB
);

INSERT INTO voters (id,name,age,address,gender,photo) VALUES (?,?,?,?,?)
