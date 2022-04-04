//Home URL
const homeURL = 'http://127.0.0.1:5500/UI_Files/index.html'; 

// Admin Page
const adminURL = 'adminPage.html';

// URLs to access API
const fetchURL = 'http://localhost:8080/';
const servletURL = 'users';

// Hide user info form (until user has been searched)
document.getElementById('credentials').setAttribute("hidden", "true");

// Search Button
let searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', searchUser);

// Update Button
let updateBtn = document.getElementById('updateBtn');
updateBtn.addEventListener('click', updateUser);

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

// Credentials to show for the user found
let userFound =
{
    // Get each element on HTML page
    id : 0, // <-- For deletion
    u_name : document.getElementById("username"),
    p_word : document.getElementById("password"),
    email : document.getElementById("email"),
    given_name : document.getElementById("given_name"),
    surname : document.getElementById("surname"),
    is_Active : document.getElementById("is_Active"),
    role_ID : document.getElementById("role")
};

async function searchUser()
{
    // Username to search for
    let searchName = document.getElementById('searchUsername').value;

    // re-hide the form if it's already open
    document.getElementById('credentials').hidden = true;

    // If user enetered a name
    if (searchName)
    {
        // Search in backend
        let data = await fetch(`${fetchURL + servletURL + '?username=' + searchName}`,
        {
            method:'GET',  // POST HTTP method
            headers:{"Content-type":"application/json"},    // Indicate JSON object
        })
        .then(response => response.json())
        .then(data => showValues(data));
    
        if (data.id != -1) {
            // If a user is found, un-hide hidden form
            document.getElementById('credentials').removeAttribute("hidden");
        }
    }
}

// Values to show on HTML page
function showValues(data)
{
    // Check if user was found
    if (data.id != -1)
    {
        // If a user is found, un-hide hidden form
        document.getElementById('credentials').removeAttribute("hidden");
        
        // Show values
        userFound.id = data.id;
        userFound.u_name.value = data.username;
        userFound.p_word.value = data.password;
        userFound.email.value = data.email;
        userFound.given_name.value = data.given_name;
        userFound.surname.value = data.surname;
        userFound.is_Active.checked = data.is_Active;
        userFound.role_ID.value = data.role_ID;
    } else {
        alert("User not found.");
        document.getElementById('credentials').hidden = true;
    }
}

// When the update button is pressed
async function updateUser()
{
    // Create User object to send to API
    const updatedUser =
    {
        username : userFound.u_name.value,
        password : userFound.p_word.value,
        email : userFound.email.value,
        given_name : userFound.given_name.value,
        surname : userFound.surname.value,
        is_Active : userFound.is_Active.checked,
        role_ID : userFound.role_ID.value
    }

    // Fetch request to delete a User based on ID
    let response = await fetch(`${fetchURL + servletURL + '?update=' + String(userFound.id)}`,
    {
        method:'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(updatedUser)
    });

    // If success
    if (response.status == 200)
    {
        window.location.href = adminURL;     // Goes back to admin page
    }
}


// Goes back to admin page
function cancelCreate()
{
    window.location.href = adminURL;
}

// Function to log a user out
function logOutFunction()
{
    window.localStorage.clear();
    window.location.href = homeURL;
}