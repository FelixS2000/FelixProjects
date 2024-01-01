<?php
// Connect to database (replace placeholders with actual credentials)
$conn = mysqli_connect("localhost", "username", "password", "electoral");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_POST['submit'])) {
    $name = $_POST['name'];
    $age = $_POST['age'];
    $address = $_POST['address'];
    $gender = $_POST['gender'];
    $photo = $_FILES['photo'];

    // ... (code to validate and sanitize input)

    // Insert data into database (using prepared statements for security)
    $sql = "INSERT INTO voters (name, age, address, gender, photo) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssiss", $name, $age, $address, $gender, $photo);
    // ... (handle photo upload)
    $stmt->execute();

    echo "Voter registered successfully!";
}

// Retrieve and display voter data
$sql = "SELECT id, name, age, address, gender, photo FROM voters";
$result = $conn->query($sql);

// ... (code to display voter data in HTML format)
// ... (existing code)

// Retrieve and display voter data
$sql = "SELECT id, name, age, address, gender, photo FROM voters";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "<h2>Registered Voters</h2>";
    echo "<table>";
    echo "<thead>";
    echo "<tr>";
    echo "<th>ID</th>";
    echo "<th>Name</th>";
    echo "<th>Age</th>";
    echo "<th>Address</th>";
    echo "<th>Gender</th>";
    echo "<th>Photo</th>";
    echo "</tr>";
    echo "</thead>";
    echo "<tbody>";

    while ($row = $result->fetch_assoc()) {
        echo "<tr>";
        echo "<td>" . $row['id'] . "</td>";
        echo "<td>" . $row['name'] . "</td>";
        echo "<td>" . $row['age'] . "</td>";
        echo "<td>" . $row['address'] . "</td>";
        echo "<td>" . $row['gender'] . "</td>";
        echo "<td><img src='" . $row['photo'] . "' alt='Voter Photo' width='100' height='100'></td>";
        echo "</tr>";
    }

    echo "</tbody>";
    echo "</table>";
} else {
    echo "No voters registered yet.";
}



mysqli_close($conn);
?>
