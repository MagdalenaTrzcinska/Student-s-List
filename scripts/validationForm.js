const name = document.getElementById('name');
const surname = document.getElementById('surname');
const email = document.getElementById('email');
const formControl = document.querySelectorAll('.form-single');
const small = document.querySelectorAll('small');


function checkingInputs() {
    const nameValue = name.value;
    const surnameValue = surname.value;
    const emailValue = email.value;
    removeClasses();

    if (nameValue === '') {
        errorMessage(0, "Enter a name.");
    } else if (withoutNumbersAndSpace(nameValue)) {
        errorMessage(0, "Name contains a forbidden character.");
    } else {
        formControl[0].classList.add('success');
    }

    if (surnameValue === '') {
        errorMessage(1, "Enter a surname.");
    } else if (withoutNumbersAndSpace(surnameValue)) {
        errorMessage(1, "Surname contains a forbidden character.");
    } else {
        formControl[1].classList.add('success');
    }

    if (emailValue === '') {
        errorMessage(2, "Enter an email.");
    } else if (withoutSpace(emailValue)) {
        errorMessage(2, "Email contains a forbidden character.");
    } else if (!withoutAtRule(emailValue)) {
        errorMessage(2, "Email must include @");
    } else {
        formControl[2].classList.add('success');
    }
    if (formControl[0].classList.contains('success') && formControl[1].classList.contains('success') && formControl[2].classList.contains('success')) {
        return true;
    }
}

function errorMessage(id, message) {
    formControl[id].classList.add('error');
    small[id].innerText = message;
}

function removeClasses() {
    formControl.forEach((e) => {
        e.classList.remove('error');
        e.classList.remove('success');
    });
}

function withoutNumbersAndSpace(name) {
    return /\s|\d/.test(name);
}

function withoutSpace(email) {
    return /\s/.test(email);
}

function withoutAtRule(email) {
    return /@/.test(email);
}


