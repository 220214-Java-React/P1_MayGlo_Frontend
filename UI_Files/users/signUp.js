const testBaseURL = 'http://127.0.0.1:5500/UI_Files/';          // ONLY FOR TESTING
const indexPage = 'index.html';


const thisURL = window.location.href;
const employeeURL = 'employees/employeePage.html';    // Page for employees
const managerURL = 'managers/managerPage.html';      // Page for managers
const adminURL = 'admins/adminPage.html';          // Page for admins


// Constants for the dropdown selection
const EMP = "EMPLOYEE";
const MANAGER = "MANAGER";
const ADMIN = "ADMIN";

// Sign Up Button
let signUpBtn = document.getElementById('signUpBtn');
signUpBtn.addEventListener('button', signUpFunction);

// Back Button
let backBtn = document.getElementById('backBtn');
backBtn.addEventListener('click', goBack);

async function signUpFunction()
{
    let id = 0; // ID for Role ID on backend
    let roleString = document.getElementById('role').value;   // Drop down value

    // Model backend design
    switch(roleString)
    {
        case EMP:       // Employees
            id = 0;
            break;
        case MANAGER:   // Managers
            id = 1;
            break;
        case ADMIN:     // Admins
            id = 2;
            break;
    }

    // Create a user with necessary credentials
    let userObj = 
    {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
        email: document.getElementById('email').value,
        given_name: document.getElementById('given_name').value,
        surname: document.getElementById('surname').value,
        role_ID: id
    }

    // POST User object to create user in backend
    let response = await fetch(thisURL, 
    {
        method:'POST',  // POST HTTP method
        headers:{"Content-type":"application/json"},    // Indicate JSON object
        body: JSON.stringify(userObj)   // Convert to JSON to send
    });


    // User was created successfully
    if (response.status == 204) 
    {
        // Switch page
        switch(roleString)
        {
            case EMP:       // Employees
                window.location.href = employeeURL;
                break;
            case MANAGER:   // Managers
                window.location.href = managerURL;
                break;
            case ADMIN:     // Admins
                window.location.href = adminURL;
                break;
        }
    }
}


// Function when Back button is clicked
function goBack()
{
    window.location.href = testBaseURL + indexPage;
    // history.back();     // Goes back a page
}