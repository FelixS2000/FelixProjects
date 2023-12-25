<?php

// Connect to the database
$dbhost = "127.0.0.1";
$dbuser = "root";
$dbpass = "Felix1729!2020";
$dbname = "electoral";

$conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
} 

// Select voters query 
$sql = "SELECT id, name, age, address FROM voters";

$result = $conn->query($sql);

?>

<!DOCTYPE html>
<html>
<head>
  <title>Voter Register</title>
</head>
<body>

  <h1>Voter Register</h1>
  
  <table>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Age</th>
      <th>Address</th>
    </tr>

    <?php while($row = $result->fetch_assoc()): ?>
    <tr>
      <td><?php echo $row['id']; ?></td>
      <td><?php echo $row['name']; ?></td>
      <td><?php echo $row['age']; ?></td>
      <td><?php echo $row['address']; ?></td>
    </tr>
    <?php endwhile; ?>


  </table>

</body>
</html>