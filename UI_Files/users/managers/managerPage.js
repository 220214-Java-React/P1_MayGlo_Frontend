//const thisURL = window.location.href;     // Current URL
const homeURL = 'http://127.0.0.1:5500/UI_Files/index.html'; //Home URL

// Logout Button
let logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', logOutFunction);

// Function to log a user out
function logOutFunction()
{
    window.location.href = homeURL;
}


















