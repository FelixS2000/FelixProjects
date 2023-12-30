<?php
// add_voter.php
require 'db_config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $voterName = $_POST['voterName'];
    $voterAge = $_POST['voterAge'];
    $voterID = $_POST['voterID'];

    $stmt = $conn->prepare("INSERT INTO voters (name, age, voter_id) VALUES (?, ?, ?)");
    $stmt->bind_param("sii", $voterName, $voterAge, $voterID);
    $stmt->execute();
}
?>