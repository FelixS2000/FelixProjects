<?php

// Check if the request method is GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
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

    // Retrieve data from the GET parameters
    $name = $_GET['name'];
    $age = $_GET['age'];
    $gender = $_GET['gender'];
    $address = $_GET['address'];
    $photo = $_GET['photo'];  // Note: In practice, you should handle file uploads differently

    // Perform database insertion (replace this with your actual database schema)
    $sql = "INSERT INTO voters (name, age, gender, address, photo) VALUES ('$name', $age, '$gender', '$address', '$photo')";

    if ($conn->query($sql) === TRUE) {
        echo "Voter added successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    // Close the database connection
    $conn->close();
} else {
    // If the request method is not GET, return an error
    header('HTTP/1.1 405 Method Not Allowed');
    header('Allow: GET');
    echo "Method Not Allowed";
}

?>
