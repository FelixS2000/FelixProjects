<?php

// Read database connection details from settings.json
$settingsJson = file_get_contents("settings.json");
$settings = json_decode($settingsJson, true);

// Check if the file is not empty
if (!empty($settings)) {
    // Extract database connection details
    $dbHost = $settings["db"]["127.0.0.1"];
    $dbUser = $settings["db"]["root"];
    $dbPassword = $settings["db"]["Felix1729!2020"];
    $dbName = $settings["db"]["electoral"];

    // Create a database connection
    $conn = new mysqli($dbHost, $dbUser, $dbPassword, $dbName);

    // Check the connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Fetch voter data from the database
    $sql = "SELECT * FROM voters";
    $result = $conn->query($sql);

    // Check if there are rows in the result
    if ($result->num_rows > 0) {
        // Fetch all rows and convert to an associative array
        while ($row = $result->fetch_assoc()) {
            $voters[] = $row;
        }

        // Output the voter data as JSON
        header("Content-Type: application/json");
        echo json_encode($voters);
    } else {
        // Handle cases where no voters are found
        echo "No voters found!";
    }

    // Close the database connection
    $conn->close();
} else {
    // Handle cases where the settings are not available
    echo "Invalid settings!";
}
?>
