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

// Update Button
let updateBtn = document.getElementById('updateBtn');
updateBtn.addEventListener('click', updateUser);

// Cancel Button
let cancelBtn = document.getElementById('cancelBtn');
cancelBtn.addEventListener('click', cancelCreate);

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
    
        // If a user is found, un-hide hidden form
        document.getElementById('credentials').removeAttribute("hidden");
    }
}

// Values to show on HTML page
function showValues(data)
{
    console.log(data);

    // Data needed:
    // username
    // password
    // email
    // given_name
    // surname
    // role_ID
    // Set value for each HTML element
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
        userFound.is_Active.checked = data.is_Active;
        userFound.role_ID.value = data.role_ID;
    }
}

// When the update button is pressed
async function updateUser()
{
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

    console.log(updatedUser);

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


// Function when Back button is clicked
function cancelCreate()
{
    window.location.href = adminURL;     // Goes back to admin page
}