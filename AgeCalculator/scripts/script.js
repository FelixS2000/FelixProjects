function substractCalculate(){
    const year1 = parseFloat(document.getElementById("year").value);
    const year2 = parseFloat(document.getElementById("year2").value);
    const rest = Number(year1) - Number(year2);
    document.getElementById("result").innerHTML = rest;
}