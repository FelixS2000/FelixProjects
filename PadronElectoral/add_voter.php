<?php
// Retrieve the form data
$name = $_POST['name'];
$address = $_POST['address'];
$gender = $_POST['gender'];
$age = $_POST['age'];
$picture = $_FILES['picture']['name'];

// Move the uploaded picture to a designated folder
$targetDir = "uploads/";
$targetFile = $targetDir . basename($picture);
move_uploaded_file($_FILES['picture']['tmp_name'], $targetFile);

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
$sql = "INSERT INTO voters (name, address, gender, age, picture) VALUES ('$name', '$address', '$gender', '$age', '$picture')";
if ($conn->query($sql) === TRUE) {
    echo "Voter added successfully!";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Close the database connection
$conn->close();
?>
