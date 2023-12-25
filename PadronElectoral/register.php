<?php

$host = "localhost";
$user = "root"; 
$password = "Felix1729!2020";
$dbname = "electoral";

// Load settings 
$settings = json_decode(file_get_contents('settings.json'), true);

$conn = new mysqli($host, $user, $password, $dbname);

$sql = "SELECT * FROM voters";
$result = $conn->query($sql);

?>

<!DOCTYPE html>
<html>
<head>
  <title>Voter Register</title>
</head>
<body>
  <h1>Voter Register</h1>
  
  <?php if ($result->num_rows > 0) { ?>
  
    <table>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Age</th>
        <th>Address</th>
        <th>Photo</th>
      </tr>
      
      <?php while($row = $result->fetch_assoc()) { ?>
      
        <tr>
          <td><?php echo $row['id']; ?></td>
          <td><?php echo $row['name']; ?></td>
          <td><?php echo $row['age']; ?></td>
          <td><?php echo $row['address']; ?></td>
          <td><img src="data:image/jpg;base64,<?php echo base64_encode($row['photo']); ?>" width="100"></td>
        </tr>
        
      <?php } ?>
      
    </table>
    
  <?php } else { ?>
    <p>No voters found</p>
  <?php } ?>
  
</body>
</html>