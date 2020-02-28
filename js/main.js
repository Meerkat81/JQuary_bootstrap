/**********************
 Name: Casey Meurer
 Coding 03
 Purpose: Coding 3 Form validation
 **********************/
"use strict";

//TODO convert EMAIL REGEX TO JQUARY
function validEmail(email) {

    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\ -0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email);
}
//JQuary
$(document).ready(function () {
    $("form").submit(function(event){
        var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\ -0-9]+\.)+[a-zA-Z]{2,}))$/;
        var name = $("#name").val();
        var email =$("#remail1").val();
        var subject = $("#subject").val();
        var message = $("#message").val();

        if(regex.test(email)==false){
            email
        }
    });
});


function sendForm() {
    const XHR = new XMLHttpRequest();
    let formData = new FormData(document.getElementById('contact-data'))


    XHR.addEventListener("load",transferComplete);
    XHR.addEventListener("error", transferFailed);
    console.log(formData);

    function transferComplete(){
        var msgArea = document.getElementById("msg");
        var response = XHR.responseText;
        if (response != "okay") {
            msgArea.innerText = "Try again later";
        } else {
            msgArea.innerText = "Sent!";
        }


    }

    function transferFailed() {
        var msgArea = document.getElementById("msg");
        var response = XHR.responseText;
        
    }

    XHR.open('POST', 'email.php');
    XHR.send(formData);
}


$.fn.clearForm =  function() {

    $('#name').val ('');
    $('#remail1').val('');
    $('#remail2').val('');
    $('#subject').val('');
    $('#message').val('');

    $('#msg').html( '<br>');
};

function validate() {
    var errorMessage = "";
    //get all form elements
    var nameInput = $('#name').val().trim();
    var rEmail1Input = $('#remail1').val().trim();
    var rEmail2Input = $('#remail2').val().trim();
    var subjectInput = $('#subject').val().trim();
    var messageInput = $('#message').val().trim();

    //put input back into field for UX
    $('#name').val(nameInput);
    $('#remail1').val(rEmail1Input);
    $('#remail2').val(rEmail2Input);
    $('#subject').val(subjectInput);
    $('#message').val(messageInput);

    //test the input string from form and store an error message
    if(nameInput === ""){
        errorMessage += "Name cannot be empty. <br>";
    }

    if(subjectInput === ""){
        errorMessage += "Subject cannot be empty. <br>";
    }

    if(!validEmail(rEmail1Input)){
        errorMessage += "First email is invalid. <br>";
    }

    if(!validEmail(rEmail2Input)){
        errorMessage += "Second email is invalid. <br>";
    }

    if(rEmail1Input != rEmail2Input){
        errorMessage += "Emails must match. <br>";
    }

    if(messageInput === ""){
        errorMessage += "Message cannot be empty. <br>";
    }

    return errorMessage;
}


//CONFIG SEND BUTTON
var sendBtn = document.getElementById("send")


//CREATE LISTENER FOR SEND BUTTON
sendBtn.onclick = function(){

    var msgArea = document.getElementById("msg");
    //get the validation of the form
    var msg = validate();
    if (msg === ""){
        msgArea.innerHTML = "Sending....";
        sendForm();
        clearForm();
        return true;
    } else {
        msgArea.innerHTML = msg;
        return false;
    }
};

/*
//create clear button
var clearBtn = document.getElementById("clear");

//create and event listener and handler for the clear button
clearBtn.onclick = function(){
    clearForm();
}

 */
//JQuary Clear
$(document).ready(function () {
    $('#clear').click(function () {
        $(this).clearForm();

    })


})