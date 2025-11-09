const form = document.getElementById('signupForm');

/* First Name Validation */
const firstname = document.getElementById('firstname');
const firstnameError = document.getElementById('firstnameError');

function validateFirstName() {
    firstnameError.textContent = '';

    if (!firstname.validity.valid) {
        if (firstname.validity.valueMissing) {
            firstnameError.textContent = "PLEASE ENTER YOUR FIRST NAME";
        } else if (firstname.validity.tooShort) {
            firstnameError.textContent = "NAME MUST BE AT LEAST 3 LETTERS";
        } else if (firstname.validity.patternMismatch) {
            firstnameError.textContent = "USE LETTERS ONLY, 3-12 CHARACTERS";
        }
        return false;
    }
    return true;
}

firstname.addEventListener('input', validateFirstName);

/* Second Name Validation */
const secondname = document.getElementById('secondname');
const secondnameError = document.getElementById('secondnameError');

function validateSecondName() {
    secondnameError.textContent = '';

    if (!secondname.validity.valid) {
        if (secondname.validity.valueMissing) {
            secondnameError.textContent = "PLEASE ENTER YOUR SECOND NAME";
        } else if (secondname.validity.tooShort) {
            secondnameError.textContent = "SURNAME MUST BE AT LEAST 3 LETTERS";
        } else if (secondname.validity.patternMismatch) {
            secondnameError.textContent = "USE LETTERS ONLY, 3-12 CHARACTERS";
        }
        return false;
    }
    return true;
}

secondname.addEventListener('input', validateSecondName);

/* Email Validation */
const email = document.getElementById('email');
const emailError = document.getElementById('emailError');

function validateEmail() {
    emailError.textContent = '';

    if (!email.validity.valid) {
        if (email.validity.valueMissing) {
            emailError.textContent = "PLEASE ENTER YOUR EMAIL";
        } else if (email.validity.typeMismatch) {
            emailError.textContent = "PLEASE ENTER A VALID EMAIL ADDRESS";
        }
        return false;
    }
    return true;
}

email.addEventListener('input', validateEmail);

/* Phone Validation */
const phone = document.getElementById('phone');
const phoneError = document.getElementById('phoneError');

function validatePhone() {
    phoneError.textContent = '';

    if (!phone.validity.valid) {
        if (phone.validity.valueMissing) {
            phoneError.textContent = "PLEASE ENTER YOUR PHONE NUMBER";
        } else if (phone.validity.patternMismatch) {
            phoneError.textContent = "ENTER A VALID PHONE NUMBER";
        }
        return false;
    }
    return true;
}

phone.addEventListener('input', validatePhone);

/* Password Validation */
const password = document.getElementById('password');
const passwordError = document.getElementById('passwordError');

function validatePassword() {
    passwordError.textContent = '';
    const value = password.value;

    // Reset custom validity
    password.setCustomValidity('');

    if (!password.validity.valid) {
        if (password.validity.valueMissing) {
            passwordError.textContent = "PLEASE ENTER A PASSWORD";
            password.setCustomValidity("invalid"); // trigger :invalid
            return false;
        }
    } else {
        // Regex: at least 1 uppercase and 1 number, min 8 chars
        const pattern = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!pattern.test(value)) {
            passwordError.textContent = "PASSWORD MUST HAVE 8 CHARACTERS AND AT LEAST ONE CAPITAL LETTER AND ONE NUMBER";
            password.setCustomValidity("invalid"); // trigger :invalid
            return false;
        }
    }

    // If everything is valid
    password.setCustomValidity('');
    return true;
}

password.addEventListener('input', validatePassword);

/* Confirm Password Validation */
const confirmPassword = document.getElementById('confirmPassword');
const confirmPasswordError = document.getElementById('confirmPasswordError');

function validateConfirmPassword() {
    confirmPasswordError.textContent = '';

    // Reset custom validity
    confirmPassword.setCustomValidity('');

    if (!confirmPassword.validity.valid) {
        if (confirmPassword.validity.valueMissing) {
            confirmPasswordError.textContent = "PLEASE CONFIRM YOUR PASSWORD";
            confirmPassword.setCustomValidity("invalid"); // trigger :invalid
            return false;
        }
    } else if (confirmPassword.value !== password.value) {
        confirmPasswordError.textContent = "PASSWORDS DO NOT MATCH";
        confirmPassword.setCustomValidity("invalid"); // trigger :invalid
        return false;
    }

    // Field is valid
    confirmPassword.setCustomValidity('');
    return true;
}

confirmPassword.addEventListener('input', validateConfirmPassword);

const formdiv = document.querySelector(".form");
const createAccountError = document.getElementById('createAccountError');

/* Form Submit Validation */
form.addEventListener('submit', (e) => {
    
    // Run all validations
    const isFirstNameValid = validateFirstName();
    const isSecondNameValid = validateSecondName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    const isFormValid = isFirstNameValid && isSecondNameValid && isEmailValid &&
                        isPhoneValid && isPasswordValid && isConfirmPasswordValid;

    formdiv.style.borderColor = "var(--terminal-green-dim)";

    if (!isFormValid) {
        e.preventDefault(); // Prevent submission if any field fails
        createAccountError.textContent = "INVALID DETAILS";
        formdiv.style.borderColor = "var(--terminal-red-dim)";
        
    }
});
