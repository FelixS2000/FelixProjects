<?php
// db_config.php
$servername = "127.0.0.1";
$username = "root";
$password = "Felix1729!2000";
$dbname = "electoral";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>