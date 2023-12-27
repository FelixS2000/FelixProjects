-- Active: 1703690840413@@127.0.0.1@3306@electoral
// add_voter.php

// Get DB settings from settings.json
header("Access-Control-Allow-Methods: POST"); 
$settings = json_decode(file_get_contents('settings.json'), true);
$db = $settings['db'];

// Connect to DB 
$conn = new mysqli($db['127.0.0.1'], $db['root'], $db['Felix1729!2020'], $db['electoral']);

// Insert voter 
$stmt = $conn->prepare("INSERT INTO voters (name, age, gender, address, photo) VALUES (?, ?, ?, ?, ?)");

$stmt->bind_param('sisbs', $_POST['name'], $_POST['age'], $_POST['gender'], $_POST['address'], $_POST['photo']);

$stmt->execute();
