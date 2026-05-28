document.getElementById("studentForm")
.addEventListener("submit", function (e)
{
    e.preventDefault();

    var name =
    document.querySelector('input[placeholder="Student Name"]').value;

    var roll =
    document.querySelector('input[placeholder="Roll Number"]').value;

    var course =
    document.querySelector('input[placeholder="Course"]').value;

    var email =
    document.querySelector('input[placeholder="Email"]').value;

    var students =
    JSON.parse(localStorage.getItem("students")) || [];

    // Duplicate Roll Check
    for(let i = 0; i < students.length; i++)
    {
        if(students[i].roll === roll)
        {
            alert("Student Already Exists");
            return;
        }
    }

    var student = {
        name: name,
        roll: roll,
        course: course,
        email: email
    };

    students.push(student);

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    alert("Student Added Successfully");

    document.getElementById("studentForm").reset();

    showStudents();
});


function showStudents()
{
    var students =
    JSON.parse(localStorage.getItem("students")) || [];

    var table =
    document.getElementById("studentTable");

    table.innerHTML = `
    <tr>
        <th>Roll No</th>
        <th>Name</th>
        <th>Course</th>
        <th>Email</th>
        <th>Action</th>
    </tr>
    `;

    students.forEach(function (s, index)
    {
        table.innerHTML += `
        <tr>
            <td>${s.roll}</td>
            <td>${s.name}</td>
            <td>${s.course}</td>
            <td>${s.email}</td>
            <td>
                <button onclick="deleteStudent(${index})">
                Delete
                </button>
            </td>
        </tr>
        `;
    });
}

showStudents();


function deleteStudent(index)
{
    var students =
    JSON.parse(localStorage.getItem("students")) || [];

    students.splice(index, 1);

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    showStudents();
}