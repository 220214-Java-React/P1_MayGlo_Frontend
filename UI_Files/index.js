const thisURL = window.location.href;
const loginURL = 'users/login.html';    // Login file path
const signUpURL = 'users/signUp.html';  // Sign Up file path

// Login Button
let loginBtn = document.getElementById("loginBtn");
loginBtn.addEventListener('click', loginFunction);

// Sign Up Button
let signUpBtn = document.getElementById("signUpBtn");
signUpBtn.addEventListener('click', signUpFunction);

window.localStorage.clear();

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