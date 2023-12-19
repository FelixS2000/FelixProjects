document.addEventListener("DOMContentLoaded", function() {
    
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
    document.querySelector("footer p").innerHTML += ` ${formattedDate}`;
});
