<?php
// display_voter.php
require 'db_config.php';

$result = $conn->query("SELECT * FROM voters");
$voters = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $voters[] = $row;
    }
}

echo json_encode($voters);
?>
