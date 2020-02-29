/**********************
 Name: Casey Meurer
 Coding 03
 Purpose: Coding 3 Form validation
 **********************/
"use strict";

//convert EMAIL REGEX TO JQUARY
$.fn.validEmail = function (email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\ -0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};


$.fn.sendForm = function(){
    var formValues = $("form").serialize();
    console.log(formValues);
    $.post("./email.php", formValues, function (data) {
        if (data != "okay") {
            $("#msg").html("Try again later");
        }else{
            $("#msg").html("Sent!")
        }
    });

};


$.fn.clearForm =  function() {

    $('#name').val ('');
    $('#remail1').val('');
    $('#remail2').val('');
    $('#subject').val('');
    $('#message').val('');

    $('#msg').html( '<br>');
};

$.fn.validate = function() {
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

    if(!$(this).validEmail(rEmail1Input)){
        errorMessage += "First email is invalid. <br>";
    }

    if(!$(this).validEmail(rEmail2Input)){
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
//JQuary Send
$(document).ready(function () {
    $('#send').click(function () {
        //var msgArea = $('#msg');
        var msg = $(this).validate();
        if (msg === ""){
            $('#msg').html('Sending......');
            $(this).sendForm();
            $(this).clearForm();
        } else {
            $('#msg').html(msg);
        }

    })
});



//JQuary Clear
$(document).ready(function () {
    $('#clear').click(function () {
        $(this).clearForm();
    })
});