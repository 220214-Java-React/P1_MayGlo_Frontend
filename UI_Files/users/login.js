const indexPage = 'http://127.0.0.1:5500/UI_Files/index.html';

const EMP_URL = 'employees/employeePage.html';   // Page for employees
const MAN_URL = 'managers/managerPage.html'; // Page for managers
const ADMIN_URL = 'admins/adminPage.html';       // Page for admins

const fetchURL = 'http://localhost:8080/';  // <-- URL to use when accessing API
const servletURL = 'login.html';            // <-- Servlet whose methods should be used

// Constants for the dropdown selection
const EMP_STATUS = 201;
const MANAGER_STATUS = 202;
const ADMIN_STATUS = 203;

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
        let response = await fetch(`${fetchURL + servletURL}`, 
            {
                method:'POST',  // POST HTTP method
                headers:{"Content-Type":"application/json"},    // Indicate JSON object
                body: JSON.stringify(userObj)   // Convert to JSON to send
            })

        // Based on response, navigate user to correct HTML page
        //if (response.status == 204) window.location.href = adminURL;

        console.log(response.status);

        switch (response.status)
        {
            case EMP_STATUS:
                window.location.href = EMP_URL;     // Switch to employee page
                break;

            case MANAGER_STATUS:
                window.location.href = MAN_URL;     // Switch to manager page
                break;

            case ADMIN_STATUS:
                window.location.href = ADMIN_URL;   // Switch to admin page
                break;
            default:
                alert("User was not found");    // User couldn't be found
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
    window.location.href = indexPage;
    // history.back();     // Goes back a page
}
