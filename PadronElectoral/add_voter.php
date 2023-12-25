<?php

// Connect to DB
$dbhost = "127.0.0.1";
$dbuser = "root"; 
$dbpass = "Felix1729!2020";
$dbname = "electoral";

$conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Check for form submission
if($_SERVER['REQUEST_METHOD'] == 'POST') {

  // Get form data
  $name = $_POST['name'];
  $age = $_POST['age'];
  $address = $_POST['address'];
  
  // Upload photo
  $photo = $_FILES['photo']['name'];
  move_uploaded_file($_FILES['photo']['tmp_name'], "uploads/$photo");

  // Insert query
  $stmt = $conn->prepare("INSERT INTO voters (name, age, address, photo) VALUES (?, ?, ?, ?)");
  $stmt->bind_param("sisi", $name, $age, $address, $photo);
  
  if($stmt->execute()) {
    echo "Voter added";
  }

}

// Select and display voters
$sql = "SELECT id, name, age, address FROM voters";
$result = $conn->query($sql);

while($row = $result->fetch_assoc()) {
  // Print table rows
  echo $row['id'] . " " . $row['name']; 
}

// Close connection
$stmt->close();
$conn->close();

?>