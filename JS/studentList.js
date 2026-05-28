let students =
JSON.parse(localStorage.getItem("students")) || [];

let table =
document.getElementById("studentListTable");

students.forEach(function(s)
{
    table.innerHTML += `
    <tr>
        <td>${s.roll}</td>
        <td>${s.name}</td>
        <td>${s.course}</td>
        <td>${s.email}</td>
    </tr>
    `;
});