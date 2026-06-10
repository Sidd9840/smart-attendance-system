let students =
JSON.parse(localStorage.getItem("students")) || [];

let table =
document.getElementById("attendanceTable");

students.forEach(function(student,index){

    let row = table.insertRow();

    row.insertCell(0).innerHTML = student.name;
    row.insertCell(1).innerHTML = student.roll;

    row.insertCell(2).innerHTML =
    `<input type="checkbox" id="att${index}">`;

});

const classLat = 28.6139;
const classLng = 77.2090;
const allowedDistance = 100;

function saveAttendance(){

    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition(
            function(position){

                let userLat = position.coords.latitude;
                let userLng = position.coords.longitude;

                let distance =
                calculateDistance(
                    classLat,
                    classLng,
                    userLat,
                    userLng
                );

                if(distance <= allowedDistance){

                    let attendance = [];

                    students.forEach(function(student,index){

                        attendance.push({
                            name: student.name,
                            roll: student.roll,
                            status:
                            document.getElementById(`att${index}`).checked
                            ? "Present"
                            : "Absent",
                            distance: distance.toFixed(2) + " meters"
                        });

                    });

                    localStorage.setItem(
                        "attendance",
                        JSON.stringify(attendance)
                    );

                    window.location.href = "report.html";
                }
                else{
                    alert("You are outside the allowed location range.");
                }

            },
            function(){
                alert("Location permission is required to mark attendance.");
            }
        );

    }
    else{
        alert("Geolocation is not supported by this browser.");
    }
}

function calculateDistance(lat1, lon1, lat2, lon2){

    const R = 6371000;

    let dLat =
    (lat2 - lat1) * Math.PI / 180;

    let dLon =
    (lon2 - lon1) * Math.PI / 180;

    let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);

    let c =
    2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}
