const mainURL = 'http://localhost:8080/';
let loginUrl = 'login.html';    // Login Url
let signUpUrl = 'signUp.html';  // Sign Up Url

let loginBtn = document.getElementById("loginBtn");
loginBtn.addEventListener('click', loginFunction);

let signUpBtn = document.getElementById("signUpBtn");
signUpBtn.addEventListener('click', signUpFunction);

function loginFunction()
{
    //window.open(mainURL + loginUrl, '_self');
    location.href = mainURL + loginUrl;
    //window.location.assign(mainURL + loginUrl);
    // const loginDocLink = document.createElement('a');
    // loginDocLink.href= mainURL+loginUrl;
    // loginDocLink.target = '_self';
    // document.body.appendChild(loginDocLink);
    // loginDocLink.click();
    // loginDocLink.remove();
}

function signUpFunction()
{
    window.location.assign(mainURL + signUpUrl);
}