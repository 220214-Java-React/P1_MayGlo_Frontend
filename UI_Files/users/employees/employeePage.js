const thisURL = window.location.href;
const homeURL = 'http://127.0.0.1:5500/UI_Files/index.html'; //Home URL
const newReimbURL = 'newReimbursement.html';

// New Reimbursement Button
let newReimbBtn = document.getElementById('newReimbBtn');
newReimbBtn.addEventListener('click', newReimbursement);

// Logout Button
let logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', logOutFunction);

// Switch to the New Reimbursement Page
function newReimbursement()
{
    window.location.href = newReimbURL;
}

// Function to log a user out
function logOutFunction()
{
    window.location.href = homeURL;
}