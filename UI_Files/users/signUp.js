const baseURL = 'http://127.0.0.1:5500/UI_Files/';          // ONLY FOR TESTING
const indexPage = 'index.html';

const thisURL = window.location.href;
const employeeURL = 'employees/employeePage.html';    // Page for employees
const managerURL = 'managers/managerPage.html';      // Page for managers
const adminURL = 'admins/adminPage.html';          // Page for admins


const fetchURL = 'http://localhost:8080/';  // <-- URL to use when accessing API
const servletURL = 'users/';                // <-- Servlet whose methods should be used

// Constants for the dropdown selection
const EMP = 0;
const MANAGER = 1;
const ADMIN = 2;

// Sign Up Button
let signUpBtn = document.getElementById('signUpBtn');
signUpBtn.addEventListener('click', signUpFunction);

// Back Button
let backBtn = document.getElementById('backBtn');
backBtn.addEventListener('click', goBack);

async function signUpFunction()
{
    // Create a user with necessary credentials
    let userObj = 
    {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
        email: document.getElementById('email').value,
        given_name: document.getElementById('given_name').value,
        surname: document.getElementById('surname').value,
        role_ID: document.getElementById('role').value      // Drop down value
    }

    // Check properties of user object, ensure it has values
    let isValid = Object.values(userObj).every(value => 
        {
            if (!value)
                return false;
            else
                return true;
        })

    // User object is a valid object
    if (isValid)
    {
        // POST User object to create user in backend
        let response = await fetch(`${fetchURL + servletURL}`,  // <-- URL/servlet to fetch
        {
            method:'POST',  // POST HTTP method
            headers:{"Content-type":"application/json"},    // Indicate JSON object
            body: JSON.stringify(userObj)   // Convert to JSON to send
        });



        let data = await fetch(`${fetchURL + servletURL + '?username=' + userObj.username}`,
        {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        .then(resp => resp.json());

        console.log(data);

        let {id, role_ID} = data;   // Get ID and Role from returned data

        localStorage.setItem('loggedUser', id);     // Store user ID
    
        // User was created successfully
        if (id) 
        {
            // Switch page
            switch(role_ID)
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
                default:
                    alert("Could Not Sign Up");
            }
        }
        else
        {
            alert("Something went wrong during Sign Up");
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
    window.location.href = baseURL + indexPage;
    // history.back();     // Goes back a page
}