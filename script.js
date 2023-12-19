// You can add JavaScript functionality here if needed
document.addEventListener("DOMContentLoaded", function() {
    // Example: Display the current date in the footer
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    document.querySelector("footer p").innerHTML += ` ${year}`;
});
