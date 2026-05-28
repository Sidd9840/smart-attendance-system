document.addEventListener("DOMContentLoaded", function () {

    // Logout button
    const logoutBtn = document.querySelector('a[href="index.html"]');

    logoutBtn.addEventListener("click", function (e) {

        let confirmLogout = confirm("Are you sure you want to logout?");

        if (!confirmLogout) {
            e.preventDefault(); // logout cancel
        }

    });

});

document.addEventListener("DOMContentLoaded", function(){

    var students = JSON.parse(localStorage.getItem("students")) || [];

    var total = students.length;

    document.getElementById("totalStudents").innerText = "Total Students : " + total;

});