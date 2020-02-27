/**********************
 Name: Casey Meurer
 Coding 03
 Purpose: Coding 3 Form validation
 **********************/
"use strict";


function validEmail(email) {

    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\ -0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email);
}

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


function clearForm() {

    document.getElementById("name").value = ("");
    document.getElementById("remail1").value = ("");
    document.getElementById("remail2").value = ("");
    document.getElementById("subject").value = ("");
    document.getElementById("message").value = ("");

    document.getElementById("msg").innerHTML = "<br>";
}

function validate() {
    var errorMessage = "";
    //get all form elements
    var nameInput = document.getElementById("name");
    var rEmail1Input = document.getElementById("remail1");
    var rEmail2Input = document.getElementById("remail2");
    var subjectInput = document.getElementById("subject");
    var messageInput = document.getElementById("message");

    //get all the stringsand trim
    var name = nameInput.value.trim();
    var email1 = rEmail1Input.value.trim();//first email
    var email2 = rEmail2Input.value.trim();//email confirmation
    var subject = subjectInput.value.trim();
    var message = messageInput.value.trim();

    //put input back into field for UX
    nameInput.value = name;
    rEmail1Input.value = email1;
    rEmail2Input.value = email2;
    subjectInput.value = subject;
    messageInput.value = message;

    //test the input string from form and store an error message
    if(name === ""){
        errorMessage += "Name cannot be empty. <br>";
    }

    if(subject === ""){
        errorMessage += "Subject cannot be empty. <br>";
    }

    if(!validEmail(email1)){
        errorMessage += "First email is invalid. <br>";
    }

    if(!validEmail(email2)){
        errorMessage += "Second email is invalid. <br>";
    }

    if(email1 != email2){
        errorMessage += "Emails must match. <br>";
    }

    if(message === ""){
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


//create clear button
var clearBtn = document.getElementById("clear");

//create and event listener and handler for the clear button
clearBtn.onclick = function(){
    clearForm();
}