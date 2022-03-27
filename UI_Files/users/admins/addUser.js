const thisURL = window.location.href;
const adminURL = 'adminPage.html';

// Constants for the dropdown selection
const EMP = "EMPLOYEE";
const MANAGER = "MANAGER";
const ADMIN = "ADMIN";

// Create Button
let signUpBtn = document.getElementById('signUpBtn');
signUpBtn.addEventListener('click', signUpFunction);

// Cancel Button
let cancelBtn = document.getElementById('cancelBtn');
cancelBtn.addEventListener('click', cancelCreate);

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
        window.location.href = adminURL;
    }
}


// Function when Back button is clicked
function cancelCreate()
{
    window.location.href = adminURL;     // Goes back to admin page
}