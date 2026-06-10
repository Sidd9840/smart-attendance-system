document.getElementById("loginForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    var username =
    document.getElementById("username").value;

    var password =
    document.getElementById("password").value;

    if(username === "teacher" &&
       password === "1234")
    {
        alert("Login Successful");

        window.location.href =
        "dashboard.html";
    }
    else
    {
        alert("Invalid Username or Password");
    }

});
