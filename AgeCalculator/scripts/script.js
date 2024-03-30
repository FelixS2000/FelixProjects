function substractCalculate(){
    const year1 = parseFloat(document.getElementById("year").value);
    const year2 = parseFloat(document.getElementById("year2").value);
    const rest = Number(year1) - Number(year2);
    document.getElementById("result").innerHTML = "Your age is : "+rest;
    const date = new Date(year1, 0 ,1).getTime();
    document.getElementById("date").innerHTML = date;
}