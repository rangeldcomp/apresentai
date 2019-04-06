var attempt = 3; // Variable to count number of attempts.
// Below function Executes on click of login button.
window.onload = function validate(){
    document.getElementById("login-form").onsubmit = function () {
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;

        if (username === "Formget" && password === "formget#123") {

            alert("Login successfully");
            window.location.replace("./paginas/navegate_facade.html");

            return true;
        } else {
            attempt--;// Decrementing by one.
            alert("You have left " + attempt + " attempt;");
            // Disabling fields after 3 attempts.
            if (attempt == 0) {
                document.getElementById("username").disabled = true;
                document.getElementById("password").disabled = true;
                document.getElementById("submit").disabled = true;

                return false;
            }
        }
    } 
}