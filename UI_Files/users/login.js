//const testBaseURL = 'http://127.0.0.1:5500/UI_Files/';          // ONLY FOR TESTING
const indexPage = 'http://127.0.0.1:5500/UI_Files/index.html';

const thisURL = window.location.href;
const adminURL = 'admins/adminPage.html';       // Page for admins


const fetchURL = 'http://localhost:8080/';  // <-- URL to use when accessing API
const servletURL = 'login.html';            // <-- Servlet whose methods should be used

// Constants for the dropdown selection
const EMP = "0";
const MANAGER = "1";
const ADMIN = "2";

// Login Button
let loginBtn = document.getElementById('loginBtn');
loginBtn.addEventListener('click', loginFunction);

// Back Button
let backBtn = document.getElementById('backBtn');
backBtn.addEventListener('click', goBack);

// Function ran when login button is clicked
async function loginFunction()
{
    // Get username from DOM element
    let username = document.getElementById('username').value;
    // Get password from DOM element
    let password = document.getElementById('password').value;

    // Wrap into a user object
    let userObj = 
    {
        username: username,
        password: password
    }

    if (userObj.username && userObj.password)
    {
        // POST User object to validate credentials
        fetch(`${fetchURL + servletURL}`, 
            {
                method:'POST',  // POST HTTP method
                headers:{"Content-Type":"application/json"},    // Indicate JSON object
                body: JSON.stringify(userObj)   // Convert to JSON to send
            })
            .then(response => console.log(response.body))
            .then(data => console.log(data));

        // Based on response, navigate user to correct HTML page
        //if (response.status == 204) window.location.href = adminURL;
    }
    else
    {
        alert("Missing a field");
    }
}

// Function when Back button is clicked
function goBack()
{
    window.location.href = indexPage;
    // history.back();     // Goes back a page
}
