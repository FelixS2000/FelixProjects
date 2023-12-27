// add_voter.php

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

$stmt->bind_param('sisbs', $_POST['name'], $_POST['age'], $_POST['gender'], $_POST['address'], $_POST['photo']);

$stmt->execute();
