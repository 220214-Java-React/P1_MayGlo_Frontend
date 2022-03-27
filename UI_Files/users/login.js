const testBaseURL = 'http://127.0.0.1:5500/UI_Files/';          // ONLY FOR TESTING
const indexPage = 'index.html';

const thisURL = window.location.href;
const adminURL = 'admins/adminPage.html';       // Page for admins

// Login Button
let loginBtn = document.getElementById('loginBtn');
loginBtn.addEventListener('button', loginFunction);

// Back Button
let backBtn = document.getElementById('backBtn');
backBtn.addEventListener('click', goBack);

// Function ran when login button is clicked
async function loginFunction()
{
    // Get username from DOM element
    let username = document.getElementById('username').textContent;
    // Get password from DOM element
    let password = document.getElementById('password').textContent;

    // Wrap into a user object
    let userObj = 
    {
        username: username,
        password: password
    }

    // POST User object to validate credentials
    let response = await fetch(thisURL, 
        {
            method:'POST',  // POST HTTP method
            headers:{"Content-type":"application/json"},    // Indicate JSON object
            body: JSON.stringify(userObj)   // Convert to JSON to send
        });

    // Based on response, navigate user to correct HTML page
    if (response) window.location.href = adminURL;
}

// Function when Back button is clicked
function goBack()
{
    window.location.href = testBaseURL + indexPage;
    // history.back();     // Goes back a page
}
