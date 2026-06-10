console.log("Attendance JS Loaded");

let students = JSON.parse(localStorage.getItem("students")) || [];

console.log(students);

let table = document.getElementById("attendanceTable");

students.forEach(function(student, index){

    let row = table.insertRow();

    row.insertCell(0).innerHTML = student.name;
    row.insertCell(1).innerHTML = student.roll;

    row.insertCell(2).innerHTML =
    `<input type="checkbox" id="att${index}">`;

});

function saveAttendance(){

    let attendance = [];

    students.forEach(function(student, index){

        attendance.push({
            name: student.name,
            roll: student.roll,
            status: document.getElementById(`att${index}`).checked
            ? "Present"
            : "Absent"
        });

    });

    localStorage.setItem("attendance", JSON.stringify(attendance));

    window.location.href = "report.html";
}
