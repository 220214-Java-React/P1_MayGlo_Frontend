// Home Page URL
const indexPage = 'http://127.0.0.1:5500/UI_Files/index.html';

// URLs to access API
const FETCH_URL = 'http://localhost:8080/';
const USER_SERVLET = 'users';

// Sign Up Button
let signUpBtn = document.getElementById('signUpBtn');
signUpBtn.addEventListener('click', signUpFunction);

// Back Button
let backBtn = document.getElementById('backBtn');
backBtn.addEventListener('click', goBack);

// When the sign up button is pressed
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
        let response = await fetch(`${FETCH_URL + USER_SERVLET}`,  // <-- URL/servlet to fetch
        {
            method:'POST',  // POST HTTP method
            headers:{"Content-type":"application/json"},    // Indicate JSON object
            body: JSON.stringify(userObj)   // Convert to JSON to send
        });

        // User was created successfully
        if (response.status == 201)
        {
            goBack();   // Go back home
        }
        else
        {
            alert("Something went wrong during Sign Up");
        }
    }
    else
    {
        alert("Missing a field");   // All fields must have a value
    }
}


// Function when Back button is clicked
function goBack()
{
    window.location.href = indexPage;
}