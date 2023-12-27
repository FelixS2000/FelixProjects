<?php
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $name = htmlspecialchars($_POST["name"]);
    $age = htmlspecialchars($_POST["age"]);
    $gender = htmlspecialchars($_POST["gender"]);
    $address = htmlspecialchars($_POST["address"]);
    // Note: You should handle file uploads securely, and this example is simplified for demonstration purposes.
    // You may want to store uploaded files in a secure directory and validate file types, size, etc.
    $photo = $_FILES["photo"]["name"];
    
    // Create an associative array for the voter data
    $voterData = array(
        "name" => $name,
        "age" => $age,
        "gender" => $gender,
        "address" => $address,
        "photo" => $photo
    );

    // Convert the array to JSON format
    $jsonData = json_encode($voterData);

    // Save the voter data to a file (for demonstration purposes)
    file_put_contents("voters.json", $jsonData);

    // Provide a success message
    echo "Voter added successfully!";
} else {
    // Handle cases where the form is not submitted properly
    echo "Invalid request!";
}
?>
