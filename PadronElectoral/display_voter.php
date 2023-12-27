<?php
header('Content-Type: application/json');
echo json_encode($voters);
// Assuming you are using MySQL for the database
$host = '127.0.0.1';
$user = 'root';
$password = 'Felix1729!2020';
$database = 'electoral';

// Create a database connection
$conn = new mysqli($host, $user, $password, $database);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Perform a simple query to retrieve voter information (replace this with your actual database schema)
$sql = "SELECT name,age,address,gender,photo FROM voters";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Output data in JSON format (you can customize this based on your needs)
    $voters = array();
    while ($row = $result->fetch_assoc()) {
        $voters[] = $row;
    }
    echo json_encode($voters);
} else {
    echo "No voters found";
}

// Close the database connection
$conn->close();

?>
