let generatedCode = "";

function generateFiveLetterCode() {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < 5; i++) {
        result += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return result;
}

function sendMail() {
    const code = generateFiveLetterCode(); 
    let parms = {
        to_name: document.getElementById("firstName").value, 
        from_name: "Pixel University", 
        message: code, // Message content
        to_email: document.getElementById("email").value 
    };

    emailjs.send("service_qmhfbmm", "template_l64nbii", parms)
    .then(function(response) {
        alert("Email sent successfully!");
        document.getElementById('validEmail').classList.remove('d-none');
        setTimeout(() => {
            document.getElementById('validEmail').classList.add('d-none'); // Hide the paragraph
        }, 3000);
        generatedCode = code; // Store the generated code
    }, function(error) {
        document.getElementById('invalidEmail').classList.remove('d-none');
        setTimeout(() => {
            document.getElementById('invalidEmail').classList.add('d-none'); // Hide the paragraph
        }, 3000);
        console.log('FAILED...', error);
        
    });
}

function validateCode() {
    const inputCode = document.getElementById("codeVerify").value; // Get the value from the input field
    const codeInvalidAlert = document.getElementById('codeInvalid');
    const codeValidAlert = document.getElementById('codeValid');

    // Clear previous messages
    codeInvalidAlert.classList.add('d-none');
    codeValidAlert.classList.add('d-none');

    // Check if the input code is valid
    if (inputCode !== generatedCode) {
        codeInvalidAlert.classList.remove('d-none'); // Show invalid code alert
        setTimeout(() => {
            codeInvalidAlert.classList.add('d-none'); // Hide the alert after 3 seconds
        }, 3000);
    } else {
        codeValidAlert.classList.remove('d-none'); // Show valid code alert
        setTimeout(() => {
            codeValidAlert.classList.add('d-none'); // Hide the alert after 3 seconds
            window.location.href = '../src/index.html'; // Redirect to index.html
        }, 3000);
    }
}




function showText() {
    const select = document.getElementById('questionSelect');
    const resultText = document.getElementById('resultText');
    const higherEducationForm = document.getElementById('higherEducationForm');
    const shsEducationForm = document.getElementById('shsEducationForm'); // Ensure this form exists in your HTML
    const selectedValue = select.value;

    // Hide both forms initially
    higherEducationForm.style.display = 'none';
    if (shsEducationForm) {
        shsEducationForm.style.display = 'none';
    }

    // Clear the result text
    resultText.innerHTML = "";

    switch (selectedValue) {
        case 'text1':
            higherEducationForm.style.display = 'block'; // Show the higher education form
            break;
        case 'text2':
            if (shsEducationForm) {
                shsEducationForm.style.display = 'block'; // Show the SHS form if it exists
            }
            resultText.innerHTML = "You selected: Senior High School Education.";
            break;
        case 'text3':
            resultText.innerHTML = "You selected: Basic Education.";
            break;
        default:
            // Do nothing as both forms are hidden and result text is cleared
            return;
    }

    // Automatically close the dropdown
    setTimeout(() => select.blur(), 1);
}

(function ($) {
    "use strict";

    //* Form js
    function personalInformationForm() {
        var current_fs, next_fs, previous_fs; // fieldsets
        var left, opacity, scale; // fieldset properties which we will animate
        var animating; // flag to prevent quick multi-click glitches

        $(".next").click(function () {
            if (animating) return false;
            animating = true;

            current_fs = $(this).parent();
            next_fs = $(this).parent().next();

            // activate next step on progress bar using the index of next_fs
            $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

            // show the next fieldset
            next_fs.show();
            // hide the current fieldset with style
            current_fs.animate({
                opacity: 0
            }, {
                step: function (now, mx) {
                    scale = 1 - (1 - now) * 0.2;
                    left = (now * 50) + "%";
                    opacity = 1 - now;
                    current_fs.css({
                        'transform': 'scale(' + scale + ')',
                        'position': 'absolute'
                    });
                    next_fs.css({
                        'left': left,
                        'opacity': opacity
                    });
                },
                duration: 800,
                complete: function () {
                    current_fs.hide();
                    animating = false;
                },
                easing: 'easeInOutBack'
            });
        });

        $(".previous").click(function () {
            if (animating) return false;
            animating = true;

            current_fs = $(this).parent();
            previous_fs = $(this).parent().prev();

            // de-activate current step on progress bar
            $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

            // show the previous fieldset
            previous_fs.show();
            // hide the current fieldset with style
            current_fs.animate({
                opacity: 0
            }, {
                step: function (now, mx) {
                    scale = 0.8 + (1 - now) * 0.2;
                    left = ((1 - now) * 50) + "%";
                    opacity = 1 - now;
                    current_fs.css({
                        'left': left
                    });
                    previous_fs.css({
                        'transform': 'scale(' + scale + ')',
                        'opacity': opacity
                    });
                },
                duration: 800,
                complete: function () {
                    current_fs.hide();
                    animating = false;
                },
                easing: 'easeInOutBack'
            });
        });

        $(".submit").click(function () {
            return false; // Prevent default form submission
        });
    }

    //* Select js
    function nice_Select() {
        if ($('.product_select').length) {
            $('.product_select').niceSelect(); // Ensure it applies to the correct class
        }
    }

    /*Function Calls*/
    personalInformationForm();
    nice_Select();
})(jQuery);
