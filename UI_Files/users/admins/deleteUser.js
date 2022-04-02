const thisURL = window.location.href;
const adminURL = 'adminPage.html';

// URLs to access API
const fetchURL = 'http://localhost:8080/';  // <-- URL to use when accessing API
const servletURL = 'users/';                // <-- Servlet whose methods should be used

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

        // If a user is found, un-hide hidden form
        document.getElementById('credentials').removeAttribute("hidden");
    }
}

// Values to show on HTML page
function showValues(data)
{
    console.log(data);
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
    }
}

// When the delete button is pressed
async function deleteUser()
{
    // Fetch request to delete a User based on ID
    let response = await fetch(`${fetchURL + servletURL + '?id=' + userFound.id}`,
    {
        method:'DELETE',
        headers: {'Content-Type': 'application/json'},
    });

    // If success
    if (response.status == 200)
    {
        window.location.href = adminURL;     // Goes back to admin page
    }
}

function cancelDelete()
{
    window.location.href = adminURL;     // Goes back to admin page
}