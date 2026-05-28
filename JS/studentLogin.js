function studentLogin()
{
    let roll = document.getElementById("studentRoll").value;

    let password =
    document.getElementById("studentPassword").value;

    let students =
    JSON.parse(localStorage.getItem("students")) || [];

    let validUser = false;

    students.forEach(function(student)
    {
        if(student.roll === roll &&
           student.password === password)
        {
            validUser = true;
        }
    });

    if(validUser)
    {
        window.location.href =
        "markAttendance.html";
    }
    else
    {
        alert("Invalid Login");
    }

    return false;
}