// Home Page
const INDEX_PAGE = 'http://127.0.0.1:5500/UI_Files/index.html';

// User Pages
const EMP_URL = 'employees/employeePage.html';  // Page for employees
const MAN_URL = 'managers/managerPage.html';    // Page for managers
const ADMIN_URL = 'admins/adminPage.html';      // Page for admins

// URLs to access API
const fetchURL = 'http://localhost:8080/';
const servletURL = 'login';

// Constants for the dropdown selection
const EMP = 0;
const MAN = 1;
const ADMIN = 2;

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

    // Check for a user name and password
    if (userObj.username && userObj.password)
    {
        // POST User object to validate credentials
        let data = await fetch(`${fetchURL + servletURL}`, 
        {
            method:'POST',  // POST HTTP method
            headers:{"Content-Type":"application/json"},    // Indicate JSON object
            body: JSON.stringify(userObj)   // Convert to JSON to send
        }).then(response => response.json());

        console.log(data);

        // Get ID, Role, and is_Active from returned data
        let {id, role_ID, is_Active} = data;

        if (id == -1) {
            alert("Login information incorrect.");
            return;
        }

        // Check if account is active
        if (!is_Active)    
        {
            alert("Account not active. Please contact your administrator for more information.");
            return;
        }

        // Store ID of logged in user
        localStorage.setItem('loggedUser', id);

        // Store role of logged in user
        localStorage.setItem('role_ID', role_ID);

        // Navigate based on the role
        switch(role_ID)
        {
            case EMP:
                window.location.href = EMP_URL;     // Switch to employee page
                break;

            case MAN:
                window.location.href = MAN_URL;     // Switch to manager page
                break;

            case ADMIN:
                window.location.href = ADMIN_URL;   // Switch to admin page
                break;
        }
    }
    else
    {
        alert("Missing a field");
    }
}

// Function when Back button is clicked
function goBack()
{
    window.location.href = INDEX_PAGE;
}
