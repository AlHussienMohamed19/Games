// ? =============> Global ===============>
const inputs = document.querySelectorAll('input')
const btnLogin = document.getElementById('btnLogin');
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
    if ( validationEmail() && validationPassword()) {
        isValid =true;
    } else {
        isValid =false;
    }
})

// inputs[0].addEventListener('input',function(){
//     validationName(inputs[0]);
// })

// inputs[1].addEventListener('input',function(){
//     validationName(inputs[1]);
// })

// inputs[2].addEventListener('input',function(){
//     validationEmail();
// })

// inputs[3].addEventListener('input',function(){
//     validationPassword();
// })

// inputs[4].addEventListener('input',function(){
//     validationAge();
// })

// ! =============> Functions ===============>

function setFormValues() {
    const user = {
        email: inputs[0].value,
        password: inputs[1].value
    }

    console.log(user);

    loginForm(user);
}


async function loginForm(userData) {
    const api = await fetch(`https://movies-api.routemisr.com/signin`, {
        method: 'Post',
        body: JSON.stringify(userData),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
        });

        const response = await api.json();

        if(response.message === 'success'){
            localStorage.setItem('userToken', response.token)
            location.href = './home.html'
        } else {
            document.getElementById('msg').innerHTML = response.message;
        }

        // console.log(response);
}
//  =============> Validation ===============>

function validationEmail () {

    const regexStyle = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/

    if(regexStyle.test(inputs[0].value)){
        inputs[0].classList.remove('is-invalid');
        inputs[0].classList.add('is-valid');
        return true;
    } else {
        inputs[0].classList.remove('is-valid');
        inputs[0].classList.add('is-invalid');
        return false;
    }
}

function validationPassword () {

    const regexStyle = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

    if(regexStyle.test(inputs[1].value)){
        inputs[1].classList.remove('is-invalid');
        inputs[1].classList.add('is-valid');
        return true;
    } else {
        inputs[1].classList.remove('is-valid');
        inputs[1].classList.add('is-invalid');
        return false;
    }
}
