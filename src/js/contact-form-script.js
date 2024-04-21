$("#contactForm").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        formError();
        submitMSG(false, "Controlla di aver compilato tutti i campi!");
    } else {
        // everything looks good!
        event.preventDefault();
        submitForm();
    }
});

function submitInProgress(){
    $('#submit').css('display', 'none');
    $('#contactForm').find('.fa-spinner').css('display', 'inline-block');
}

function submitDone(){
    $('#submit').css('display', 'inline-block');
    $('#contactForm').find('.fa-spinner').css('display', 'none');
}


function submitForm(){
    // Initiate Variables With Form Content
    var data = $("#contactForm").serialize();
    submitInProgress();

    $.ajax({
        type: "POST",
        url: "https://script.google.com/macros/s/AKfycbzMxjrhCmngwRbXc-wPJ_SJp6WdQSkHjdoGixsn1xJBOUYImnPZtB0otFw04rPhtA8afA/exec",
        data: data,
        success: function(){
            formSuccess();
        },
        error: function(){
            formError();
            submitMSG(false, "Qualcosa è andato storto, riprova più tardi.")
        },
        complete: function(){
            submitDone();
        }
    });
}

function formSuccess(){
    $("#contactForm")[0].reset();
    submitMSG(true, "Grazie per la tua conferma!")
}

function formError(){
    $("#contactForm").removeClass().addClass('animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass();
    });
}

function submitMSG(valid, msg){
    if(valid){
        var msgClasses = "h3 text-center animated text-success";
    } else {
        var msgClasses = "h3 text-center text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}