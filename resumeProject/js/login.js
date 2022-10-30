function validated() {

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (username == "admin" && password == "admin") {
        window.location ="/resumeProject/html/data.html";

    } else {
        alert("Invalid username/password");
        return "/resumeProject/html/login.html";
    }
}