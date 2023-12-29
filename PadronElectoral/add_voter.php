<?php
// Retrieve the form data
$name = $_POST['name'];
$address = $_POST['address'];
$gender = $_POST['gender'];
$age = $_POST['age'];
$picture = $_FILES['photo']['name'];

// Move the uploaded picture to a designated folder
$targetDir = "uploads/";
$targetFile = $targetDir . basename($picture);

if (!move_uploaded_file($_FILES['photo']['tmp_name'], $targetFile)) {
    die("Error moving uploaded file");
}

// Save the voter information to the database
$dbHost = "127.0.0.1";
$dbUser = "root";
$dbPassword = "Felix1729!2020";
$dbName = "electoral";

// Connect to the database
$conn = new mysqli($dbHost, $dbUser, $dbPassword, $dbName);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare and execute the SQL query
$sql = "INSERT INTO voters (name, address, gender, age, picture) VALUES (?, ?, ?, ?, ?)";

// Bind parameters to the SQL query
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssiss", $name, $address, $gender, $age, $picture);

// Execute the SQL query
if ($stmt->execute()) {
    echo "Voter added successfully!";
} else {
    echo "Error: " . $stmt->error;
}

// Close the prepared statement and the database connection
$stmt->close();
$conn->close();
?>