// ? =============> Global ===============>
const inputs = document.querySelectorAll('input')
const btnRegister = document.getElementById('btnRegister');
const formInputs = document.querySelector('form');
let isValid = false;
// console.log(inputs);

// ! =============> When Start ===============>

// * =============> Events ===============>

formInputs.addEventListener('submit', function (e) {

    e.preventDefault();

    if (isValid) {
        setFormValues();
    }

})

formInputs.addEventListener('input',function() {
    if (validationName(inputs[0]) && validationName(inputs[1]) && validationEmail() && validationPassword() && validationAge() ) {
        isValid =true;
    } else {
        isValid =false;
    }
})


// inputs[0].addEventListener('blur',function() { 
//     validationName(inputs[0]); 
// })

// inputs[1].addEventListener('blur',function() { 
//     validationName(inputs[1]); 
// })

// inputs[2].addEventListener('blur',function() { 
//     validationEmail(); 
// })

// inputs[3].addEventListener('blur',function() { 
//     validationPassword(); 
// })

// inputs[4].addEventListener('blur',function() { 
//     validationAge(); 
// })

// ! =============> Functions ===============>

function setFormValues() {
    const user = {
        first_name: inputs[0].value,
        last_name: inputs[1].value,
        email: inputs[2].value,
        password: inputs[3].value,
        age: inputs[4].value
    }

    console.log(user);

    registerForm(user);
}

async function registerForm(userData) {
    const api = await fetch(`https://movies-api.routemisr.com/signup`, {
        method: 'Post',
        body: JSON.stringify(userData),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
        });

        const response = await api.json();

        if(response.message === 'success'){
            location.href = './index.html'
        } else {
            document.getElementById('msg').innerHTML = response.errors?.email.message;
        }

        // console.log(response);
}

// function blurFunc(input) {  
//     input.classList.remove('is-valid');
//     input.classList.remove('is-invalid');
// }

//  =============> Validation ===============>

function validationName (input) {

    const regexStyle = /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){3,14}$/

    if(regexStyle.test(input.value)){
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        return true;
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        return false;
    }
}

function validationEmail () {

    const regexStyle = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/

    if(regexStyle.test(inputs[2].value)){
        inputs[2].classList.remove('is-invalid');
        inputs[2].classList.add('is-valid');
        return true;
    } else {
        inputs[2].classList.remove('is-valid');
        inputs[2].classList.add('is-invalid');
        return false;
    }
}

function validationPassword () {

    const regexStyle = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

    if(regexStyle.test(inputs[3].value)){
        inputs[3].classList.remove('is-invalid');
        inputs[3].classList.add('is-valid');
        return true;
    } else {
        inputs[3].classList.remove('is-valid');
        inputs[3].classList.add('is-invalid');
        return false;
    }
}

function validationAge () {

    const regexStyle = /^[1-7][0-9]|80$/

    if(regexStyle.test(inputs[4].value)){
        inputs[4].classList.remove('is-invalid');
        inputs[4].classList.add('is-valid');
        return true;
    } else {
        inputs[4].classList.remove('is-valid');
        inputs[4].classList.add('is-invalid');
        return false;
    }
}