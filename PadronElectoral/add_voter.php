<?php

// DB connection function
function dbConnect() {

  // Load settings
  $settings = json_decode(file_get_contents('settings.json'), true);

  // Connect to DB
  return new mysqli($settings['db']['127.0.0.1'], $settings['db']['root'], $settings['db']['Felix1729!2020'], $settings['db']['electoral']);

}

// Handle form submission 
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

  // Connect to DB
  $conn = dbConnect();

  // Check required fields
  if (empty($_POST['name']) || empty($_POST['age']) || empty($_POST['address']) || empty($_FILES['photo'])) {
    // Redirect back to form
    header("Location: index.html");
    exit;
  }

  // Validate age is number
  if (!is_numeric($_POST['age'])) { 
    // Show error
  }

  // Prepare statement
  $stmt = $conn->prepare("INSERT INTO voters (name, age, address, photo) VALUES (?, ?, ?, ?)");
  
  // Bind params
  $stmt->bind_param('siss', $_POST['name'], $_POST['age'], $_POST['address'], $_POST['photo']); 

  // Execute statement
  if (!$stmt->execute()) {
    // Show error
  } else {
    // Success, redirect
    header("Location: register.php");
    exit;
  }

  $stmt->close();
  $conn->close();

}
