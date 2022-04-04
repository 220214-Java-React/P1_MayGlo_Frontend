//Home URL
const homeURL = 'http://127.0.0.1:5500/UI_Files/index.html'; 

const fetchURL = 'http://localhost:8080/';  // <-- URL to use when accessing API
const servletURL = 'users';                 // <-- Servlet whose methods should be used

const adminURL = 'adminPage.html';          // Admin home page

// Create Button
let createBtn = document.getElementById('createBtn');
createBtn.addEventListener('click', signUpFunction);

// Cancel Button
let cancelBtn = document.getElementById('cancelBtn');
cancelBtn.addEventListener('click', cancelCreate);

// Logout Button
let logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', logOutFunction);

// When the window loads, check for a logged in user
window.onload = checkCurrentUser;

// Ensures there is a user logged in
function checkCurrentUser()
{
  // There is a user
  if (localStorage.getItem('loggedUser'))
  {
    console.log('logged in');
  }
  else  // No user logged in
  {
    console.log('logged out');
    cancelCreate();
  }
}

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
        role_ID: document.getElementById('role').value
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
        let response = await fetch(`${fetchURL + servletURL}`, 
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
        else    // User was not created correctly
        {
            alert("Something went wrong while Adding User");
        }
    }
    else
    {
        alert("Missing a field");       // Missing something
    }
}


// Function when Back button is clicked
function cancelCreate()
{
    window.location.href = adminURL;     // Goes back to admin page
}

// Function to log a user out
function logOutFunction()
{
    window.localStorage.clear();
    window.location.href = homeURL;
}