function substractCalculate(){
    let year1 = parseInt(document.getElementById('year'), 10);
    let year2 = parseInt(document.getElementById("year2"), 10);
    let rest = Number(year1) - Number(year2);
    document.getElementById("result").innerHTML = rest;
}