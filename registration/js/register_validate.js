$(document).ready(function () {

    $("#submitform").on("click", function () {

        var first_name = $('#first_name').val();
        var last_name = $('#last_name').val();
        var email = $('#email').val();
        var password = $('#password').val();


        // Hiding error messages 
        $('.errormessage').hide();

        if (checkfirst_name(first_name) == false) {
            $('#errorfirst_name').show();
            return false;
        } else if (checklast_name(last_name) == false) {
            $('#errorlast_name').show();
            return false;
        } else if (checkEmail(email) == false) {
            $('#erroremail').show();
            return false;
        } else if (checkPassword(password) == false) {
            $('#errorpassword').show();
            return false;

        } else {
            register();
            // alert("successful")

        }

    });
});


//function used to validate first_name
function checkfirst_name(first_name) {
    //regular expression for first_name
    var pattern = /^[A-Z]([0-9a-zA-Z]){2,10}$/;
    if (pattern.test(first_name)) {
        return true;
    } else {
        return false;
    }
}

//function used to validate last_name
function checklast_name(last_name) {
    //regular expression for last_name
    var pattern = /^[A-Z]([0-9a-zA-Z]){2,10}$/;
    if (pattern.test(last_name)) {
        return true;
    } else {
        return false;
    }
}

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

function register(){
    //event.preventDefault()
    console.log("inside register function");
    let url = "http://localhost:8080/register";
    let objectReg = {};
    objectReg.firstName = $("#first_name").val();
    objectReg.lastName = $("#last_name").val();
    objectReg.email = $("#email").val();
    objectReg.password = $("#password").val();

    console.log(objectReg);

    if (objectReg) {
        $.ajax({
            url: url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(objectReg),
            type: "POST",
            success: function (result) {
                console.log(result);
                alert(result);
                
            },

            error: function (msg) {
                console.log(msg);
                alert(msg);
                
            }
        });
    }
    return false;

}