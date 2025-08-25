function calculateAge(){
    const year1 = parseFloat(document.getElementById("year").value);
    const year2 = parseFloat(document.getElementById("year2").value);
    
    if (isNaN(year1) || isNaN(year2)) {
        document.getElementById("result").innerHTML = "Please enter valid numbers";
        return;
    }
    
    const rest = year1 - year2;
    document.getElementById("result").innerHTML = "Your age is : "+rest;
    const date = new Date(year1, 0 ,1).getTime();
    document.getElementById("date").innerHTML = date;
}