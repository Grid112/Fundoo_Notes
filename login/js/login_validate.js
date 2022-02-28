$(document).ready(function () {

    $("#submitform").on("click", function () {

        
        var email = $('#email').val();
        var password = $('#password').val();


        // Hiding error messages 
        $('.errorMsg').hide();

        if (checkEmail(email) == false) {
            $('#erroremail').show();
            return false;
        } else if (checkPassword(password) == false) {
            $('#errorpassword').show();
            return false;

        } else {
            login();
            // alert("successful")

        }

    });
});


//function used to check valid email
function checkEmail(email) {
    //regular expression for email
    var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    console.log(pattern.test(email));
    if (pattern.test(email)) {
        return true;
    } else {
        return false;
    }
}

//function used to validate password
function checkPassword(password) {
    console.log(password);
    //regular expression for password
    var pattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/;
    if (pattern.test(password)) {
        return true;
    } else {
        return false;
    }
}

function login(){
    event.preventDefault();
    console.log("inside login function");
    let url = "http://localhost:8080/user_login";
    let objectLog = {};
    objectLog.email = $("#email").val();
    objectLog.password = $("#password").val();

    console.log(objectLog);

    if (objectLog) {
        $.ajax({
            url: url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(objectLog),
            type: "POST",
            
            success: function (result) {
                console.log(result.responseText);
                alert(result.responseText);
                
            },

            error: function (msg) {

                console.log(msg.responseText);
                // alert(result.responseText);
                localStorage.setItem("token", JSON.stringify(msg.responseText));
                console.log(msg);
                // alert(JSON.stringify(msg));                
            }
        });
    }
    return false;

}