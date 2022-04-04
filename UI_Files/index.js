// Login file path
const loginURL = 'users/login.html';

// Sign Up file path
const signUpURL = 'users/signUp.html';

// Login Button
let loginBtn = document.getElementById("loginBtn");
loginBtn.addEventListener('click', loginFunction);

// Sign Up Button
let signUpBtn = document.getElementById("signUpBtn");
signUpBtn.addEventListener('click', signUpFunction);

window.onload = window.localStorage.clear();

// Login Option
function loginFunction()
{
    window.location.href = loginURL;
}

// Sign Up Option
function signUpFunction()
{
    window.location.href = signUpURL;
}