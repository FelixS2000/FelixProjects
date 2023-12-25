<?php

// Connect to the database 
$dbhost = "127.0.0.1";
$dbuser = "root";
$dbpass = "Felix1729!2020";
$dbname = "electoral";

$conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Get form data
$name = $_POST['name'];
$age = $_POST['age']; 
$address = $_POST['address'];
$photo = addslashes(file_get_contents($_FILES['photo']['tmp_name']));

// Insert voter query
$stmt = $conn->prepare("INSERT INTO voters (name, age, address, photo) VALUES (?, ?, ?, ?)");
$stmt->bind_param("sisi", $name, $age, $address, $photo);

if ($stmt->execute()) {
  echo "Voter added successfully"; 
} else {
  echo "Error adding voter: " . $conn->error;
}

$stmt->close();
$conn->close();