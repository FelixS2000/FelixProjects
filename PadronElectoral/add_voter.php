// add_voter.php
</<?php 
    header("Access-Control-Allow-Origin: *"); // Allow all origins for testing, but restrict in production
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
    $settings = json_decode(file_get_contents('settings.json'), true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        die('Error reading settings.json');
    }
    
    
    // Connect to DB
    $conn = new mysqli($db['127.0.0.1'], $db['root'], $db['Felix1729!2020'], $db['electoral']);
    if ($conn->connect_error) {
        die('Connection failed: ' . $conn->connect_error);
    }
    
    // Insert voter
    $stmt = $conn->prepare("INSERT INTO voters (name, age, gender, address, photo) VALUES (?, ?, ?, ?, ?)");
    if (!$stmt) {
        die('Query preparation failed: ' . $conn->error);
    }
    
    // ...
    $name = mysqli_real_escape_string($conn, $_POST['name']);
    $age = filter_var($_POST['age'], FILTER_VALIDATE_INT);
    $gender = mysqli_real_escape_string($conn, $_POST['gender']);
    $address = mysqli_real_escape_string($conn, $_POST['address']);
    // Handle photo upload securely (see details below)
    
    
    $stmt->bind_param('sisbs', $_POST['name'], $_POST['age'], $_POST['gender'], $_POST['address'], $_POST['photo']);
    
    $stmt->execute();
?>
