const thisURL = window.location.href;
const adminURL = 'adminPage.html';

const fetchURL = 'http://localhost:8080/';  // <-- URL to use when accessing API
const servletURL = 'users/';                // <-- Servlet whose methods should be used


// Constants for the dropdown selection
const EMP = "EMPLOYEE";
const MANAGER = "MANAGER";
const ADMIN = "ADMIN";

document.getElementById('credentials').setAttribute("hidden", "true");

// Search Button
let searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', searchUser);

// Delete Button
let deleteBtn = document.getElementById('deleteBtn');
deleteBtn.addEventListener('click', deleteUser);

// Cancel Button
let cancelBtn = document.getElementById('cancelBtn');
cancelBtn.addEventListener('click', cancelCreate);

// Credentials to show for the user found
let userFound =
{
    // Get each element on HTML page
    u_name : document.getElementById("username"),
    p_word : document.getElementById("password"),
    email : document.getElementById("email"),
    given_name : document.getElementById("given_name"),
    surname : document.getElementById("surname"),
    role_ID : document.getElementById("role")
};

async function searchUser()
{
    // Username to search for
    let searchName = document.getElementById('searchUsername').value;

    // If user enetered a name
    if (searchName)
    {
        // Search in backend
        let data = await fetch(`${fetchURL + servletURL + '?username=' + searchName}`,
        {
            method:'GET',  // POST HTTP method
            headers:{"Content-type":"application/json"},    // Indicate JSON object
        })
        .then(response => response.json());

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
            
            userFound.u_name.value = data.username;
            userFound.p_word.value = data.password;
            userFound.email.value = data.email;
            userFound.given_name.value = data.given_name;
            userFound.surname.value = data.surname;
            userFound.role_ID.value = data.role_ID;
        }
    }
}


function deleteUser()
{
    console.log("Button Works");
    
}



// Function when Back button is clicked
function cancelCreate()
{
    window.location.href = adminURL;     // Goes back to admin page
}