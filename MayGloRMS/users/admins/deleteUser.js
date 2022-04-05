//Home URL
const HOME_URL = 'http://127.0.0.1:5500/MayGloRMS/index.html'; 

// Admin Page
const ADMIN_URL = 'adminPage.html';

// URLs to access API
const FETCH_URL = 'http://localhost:8080/';
const USER_SERVLET = 'users';
const REIMB_SERVLET = 'reimbursements';

// Hide user info form (until user has been searched)
document.getElementById('credentials').setAttribute("hidden", "true");

// Search Button
let searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', searchUser);

// Delete Button
let deleteBtn = document.getElementById('deleteBtn');
deleteBtn.addEventListener('click', deleteUser);

// Cancel Button
let cancelBtn = document.getElementById('cancelBtn');
cancelBtn.addEventListener('click', cancelDelete);

// Logout Button
let logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', logOutFunction);

// Warning when deleting and user has reimbursements
const reimbDeleteWarn = document.getElementById('reimbDeleteWarn');
reimbDeleteWarn.hidden = true;


// When the window loads, check for a logged in user
window.onload = checkCurrentUser;

// Ensures there is a user logged in
function checkCurrentUser()
{
  // There is a user
  if (localStorage.getItem('loggedUser'))
  {
  }
  else  // No user logged in
  {
    cancelDelete();
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
    role_ID : document.getElementById("role")
};

// Function to handle searching for a user in the backend
async function searchUser()
{
    // Username to search for
    let searchName = document.getElementById('searchUsername').value;

    // re-hide the form if it's already open
    document.getElementById('credentials').hidden = true;
    reimbDeleteWarn.hidden = true;

    // If user enetered a name
    if (searchName)
    {
        // Search in backend
        await fetch(`${FETCH_URL + USER_SERVLET + '?username=' + searchName}`,
        {
            method:'GET',  // POST HTTP method
            headers:{"Content-type":"application/json"},    // Indicate JSON object
        })
        .then(response => response.json())
        .then(data => checkUserFound(data));
    }
}

// Checks for if the user exists before showing values
function checkUserFound(data)
{
    if (data.id != -1) {
        showValues(data)
        // If a user is found, un-hide hidden form
        document.getElementById('credentials').removeAttribute("hidden");
    }
    else
    {
        alert("User not found.");
        document.getElementById('credentials').hidden = true;
        reimbDeleteWarn.hidden = true;
    }
}

// Values to show on HTML page
async function showValues(data)
{
    if (data)
    {
        // If a user is found, un-hide hidden form
        document.getElementById('credentials').removeAttribute("hidden");
        
        userFound.id = data.id;
        userFound.u_name.value = data.username;
        userFound.p_word.value = data.password;
        userFound.email.value = data.email;
        userFound.given_name.value = data.given_name;
        userFound.surname.value = data.surname;
        userFound.role_ID.value = data.role_ID;

        // If it is not an admin, check for reimbursements
        if (data.role_ID != 2)
        {
            // Get the reimbursements using user's ID
            let response = await fetch(`${FETCH_URL + REIMB_SERVLET + "?user_ID=" + data.id + '&role_ID=' + data.role_ID}`,
            {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            });

            // If user has reimbursements, inform user that those will be deleted
            if (response.status == 200)
            {
                let reimbArray = await response.json();
                if(reimbArray)
                {
                    reimbDeleteWarn.removeAttribute('hidden');
                    reimbDeleteWarn.innerText = `${"User has " + reimbArray.length + " reimbursement(s) created or approved/denied that will be deleted as well."}`
                }
            }
            else 
            {
                reimbDeleteWarn.hidden = true;
                return;
            }
        }
    }
}

// When the delete button is pressed
async function deleteUser()
{
    // Fetch request to delete a User based on ID
    let response = await fetch(`${FETCH_URL + USER_SERVLET + '?id=' + userFound.id}`,
    {
        method:'DELETE',
        headers: {'Content-Type': 'application/json'},
    });

    // If success
    if (response.status == 200)
    {
        window.location.href = ADMIN_URL;     // Goes back to admin page
    }
}

// Goes back to admin page
function cancelDelete()
{
    window.location.href = ADMIN_URL;
}

// Function to log a user out
function logOutFunction()
{
    window.localStorage.clear();
    window.location.href = HOME_URL;
}