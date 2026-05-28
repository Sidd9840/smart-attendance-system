/* eslint-disable */
let locationVerified = false;

const collegeLat = 30.0869;
const collegeLon = 78.2676;
const allowedDistance = 500000;

function checkLocation() 
{
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(success, error);
    }
    else
    {
        alert("Geolocation not supported");
    }
}

function success(position)
{
    let userLat = position.coords.latitude;
    let userLon = position.coords.longitude;

    let distance = calculateDistance(userLat, userLon, collegeLat, collegeLon);

    if(distance <= allowedDistance)
    {
        locationVerified = true;
        document.getElementById("location-result").innerHTML =
        "Location Verified ✅ Attendance Allowed";
    }
    else
    {
        locationVerified = false;
        document.getElementById("location-result").innerHTML =
        "Outside Campus ❌ Attendance Blocked";
    }
}

function error()
{
    alert("Please allow location access");
}

function calculateDistance(lat1, lon1, lat2, lon2)
{
    const R = 6371000;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

function isAttendanceTime()
{
    let now = new Date();
    let hour = now.getHours();

    // Attendance allowed from 9 AM to 15 PM
    if(hour >= 9 && hour < 16)
    {
        return true;
    }

    return false;
}

function submitAttendance()
{
    let roll = document.getElementById("roll").value;
    let status = document.getElementById("status").value;

    if(roll === "")
    {
        alert("Enter Roll Number");
        return false;
    }

    if(locationVerified === false)
    {
        alert("Verify Location First");
        return false;
    }

    if(isAttendanceTime() === false)
    {
        alert("Attendance Time Closed");
        return false;
    }

    let attendance = {
        roll: roll,
        status: status,
       date: new Date().toISOString().split("T")[0]
    };

    let records = JSON.parse(localStorage.getItem("attendance")) || [];
    records.push(attendance);

    localStorage.setItem("attendance", JSON.stringify(records));

    alert("Attendance Submitted Successfully");

    document.querySelector("form").reset();
    locationVerified = false;

    return false;
}