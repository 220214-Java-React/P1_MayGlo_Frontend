// const mainURL = 'http://localhost:8080/';   // Only use for GETs/POSTs
const loginUrl = 'login.html';    // Login Url
const signUpUrl = 'signUp.html';  // Sign Up Url

let loginBtn = document.getElementById("loginBtn");
loginBtn.addEventListener('click', loginFunction);

let signUpBtn = document.getElementById("signUpBtn");
signUpBtn.addEventListener('click', signUpFunction);

function loginFunction()
{
    window.location.href = loginUrl;
}

function signUpFunction()
{
    window.location.href = signUpUrl;
}