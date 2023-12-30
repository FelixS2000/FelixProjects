// add_voter.php
<?php
// add_voter.php

// Include database connection file
require_once 'database.php';

// Check if form data is submitted
if (isset($_POST['voterName']) && isset($_POST['voterAge']) && isset($_POST['voterID'])) {
    // Get form data
    $voterName = $_POST['voterName'];
    $voterAge = $_POST['voterAge'];
    $voterID = $_POST['voterID'];

    // Insert data into database
    $query = "INSERT INTO voters (name, age, voter_id) VALUES ('$voterName', '$voterAge', '$voterID')";
    if (mysqli_query($conn, $query)) {
        http_response_code(200);
        echo "Voter added successfully";
    } else {
        http_response_code(500);
        echo "Error: " . $query . "" . mysqli_error($conn);
    }
}

// Close connection
mysqli_close($conn);
?>