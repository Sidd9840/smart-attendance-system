let attendance =
JSON.parse(localStorage.getItem("attendance")) || [];

let table =
document.getElementById("reportTable");

attendance.forEach(function(record){

    let row = table.insertRow();

    row.insertCell(0).innerHTML = record.name;
    row.insertCell(1).innerHTML = record.roll;
    row.insertCell(2).innerHTML = record.status;

});
