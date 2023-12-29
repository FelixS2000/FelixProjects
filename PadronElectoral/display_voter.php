<?php
// Retrieve the voter information from the database
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
$sql = "SELECT * FROM voters";
$result = $conn->query($sql);

// Display the voter information
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "Name: " . $row['name'] . "<br>";
        echo "Address: " . $row['address'] . "<br>";
        echo "Gender: " . $row['gender'] . "<br>";
        echo "Age: " . $row['age'] . "<br>";
        echo "Picture: <img src='uploads/" . $row['picture'] . "'><br><br>";
    }
} else {
    echo "No voters found.";
}

// Close the database connection
$conn->close();
?>
