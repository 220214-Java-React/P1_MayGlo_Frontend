//const mainURL = 'http://localhost:8080/adminPage.html';     // Current URL
const homeURL = 'http://127.0.0.1:5500/UI_Files/index.html'; //Home URL
const fetchURL = 'http://localhost:8080/';
const servletURL = 'users';
const addURL = 'addUser.html';
const updateURL = 'updateUser.html';
const deleteURL = 'deleteUser.html';


// Add User Button
let addUserBtn = document.getElementById('addUserBtn');
addUserBtn.addEventListener('click', addUser);

// Update User Button
let updateUserBtn = document.getElementById('updateUserBtn');
updateUserBtn.addEventListener('click', updateUser);

// Delete User Button
let deleteUserBtn = document.getElementById('deleteUserBtn');
deleteUserBtn.addEventListener('click', deleteUser);

// Logout Button
let logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', logOutFunction);

window.onload = getPendingUsers;  // When the window loads, show reimbursements

async function getPendingUsers()
{
    // Get inactive users
    await fetch(`${fetchURL + servletURL + '?is_Active=false'}`,
    {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(data => constructRows(data)); // Create the table
}

function constructRows(arrayReimb)
{
    // Get the element containing the table of reimbursements
    const listArea = document.getElementById("reimbTable");

    // Create a row for each reimbursement, append it to the table
    arrayReimb.forEach(element => listArea.appendChild(createRow(element)))
}

// Creates a row in the reimbursement table for the employee
function createRow(reimbursementItem)
{
    const userRow = document.createElement("tr");      // Current row
    userRow.className = "userRow";                    // Assign class

    // Destructure object for needed values
    let {user_ID, given_name, surname, username, email, role_ID} = reimbursementItem;

    // Create each cell for this row --

    // View link
    let userView = document.createElement("td");
    userView.className = "userRow";
    userView.scope = "row";
    userView.innerHTML = '<a href="#" data-bs-toggle="modal" data-bs-target="#userViewModal">View</a>';

    // ID column
    let userID = document.createElement("td");
    userID.className = "userRow";
    userID.innerText = user_ID;

    // FIRST NAME/GIVEN_NAME
    let userFirstName = document.createElement("td");
    userFirstName.className = "userRow";
    userFirstName.innerText = given_name;

    // LAST NAME/SURNAME
    let userSurname = document.createElement("td");
    userSurname.className = "userRow";
    userSurname.innerText = surname;
    
    // USERNAME
    let userUsername = document.createElement("td");
    userUsername.className = "userRow";
    userUsername.innerText = username;

    // USERNAME
    let userEmail = document.createElement("td");
    userEmail.className = "userRow";
    userEmail.innerText = email;

    // ROLE
    let userRole = document.createElement("td");
    userRole.className = "userRow";
    userRole.innerText = convertRole(role_ID);

    // Bind HTML elements to the row
    userRow.appendChild(userView);
    userRow.appendChild(userID);
    userRow.appendChild(userFirstName);
    userRow.appendChild(userSurname);
    userRow.appendChild(userUsername);
    userRow.appendChild(userEmail);
    userRow.appendChild(userRole);

    // Return the row
    return userRow;
}

// Converts Role ID
function convertRole(ID)
{
    switch(ID)
    {
        case 0:
            return "Employee";
        case 1:
            return "Manager";
        case 2:
            return "Admin";
    }
}

// Function to add a user
function addUser()
{
    window.location.href = addURL;
}

// Function to update a user
function updateUser()
{
    window.location.href = updateURL;
}

// Function to delete a user
function deleteUser()
{
    window.location.href = deleteURL;
}


// Function to log a user out
function logOutFunction()
{
    window.localStorage.clear();
    window.location.href = "/index.html";
}