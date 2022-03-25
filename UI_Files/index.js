const mainURL = 'http://localhost:8080/';
let loginUrl = 'login.html';    // Login Url
let signUpUrl = 'signUp.html';  // Sign Up Url

let loginBtn = document.getElementById("loginBtn");
loginBtn.addEventListener('click', loginFunction);

let signUpBtn = document.getElementById("signUpBtn");
signUpBtn.addEventListener('click', signUpFunction);

function loginFunction()
{
    window.location.href = mainURL + loginUrl;
}

function signUpFunction()
{
    window.location.href = mainURL + signUpUrl;
}