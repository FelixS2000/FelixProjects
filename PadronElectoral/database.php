<?php
// database.php

// Include settings file
require_once 'settings.php';

// Connect to database
$conn = new mysqli($db['host'], $db['user'], $db['password'], $db['name']);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>