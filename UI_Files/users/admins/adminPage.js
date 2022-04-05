//Home URL
const HOME_URL = 'http://127.0.0.1:5500/UI_Files/index.html';

// URLs to access API
const FETCH_URL = 'http://localhost:8080/';
const USER_SERVLET = 'users';

// Admin Sub-pages
const ADD_URL = 'addUser.html';
const UPDATE_URL = 'updateUser.html';
const DELETE_URL = 'deleteUser.html';


// Add User Button
let addUserBtn = document.getElementById('addUserBtn');
addUserBtn.addEventListener('click', addUser);

// Update User Button
let updateUserBtn = document.getElementById('updateUserBtn');
updateUserBtn.addEventListener('click', updateUserButton);

// Delete User Button
let deleteUserBtn = document.getElementById('deleteUserBtn');
deleteUserBtn.addEventListener('click', deleteUser);

// Logout Button
let logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', logOutFunction);

let approveBtn = document.getElementById('approveBtn');
approveBtn.addEventListener('click', approveUser);

 // When the window loads, check the user and then show admin page
window.onload = checkCurrentUser; 


// Ensures there is a user logged in
function checkCurrentUser()
{
  // There is a user
  if (localStorage.getItem('loggedUser'))
  {
    console.log('logged in');
    getPendingUsers();
  }
  else  // No user logged in
  {
    console.log('logged out');
    logOutFunction();
  }
}

// Find pending users
async function getPendingUsers()
{
    // Get inactive users
    await fetch(`${FETCH_URL + USER_SERVLET + '?is_Active=false'}`,
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

    // Create each cell for this row --

    // View link
    let userView = document.createElement("td");
    userView.className = "userRow";
    userView.scope = "row";
    userView.innerHTML = `<a href="#" data-bs-toggle="modal" data-bs-target="#userViewModal" value=${reimbursementItem.username} class="viewLink">View</a>`;

    //userView.addEventListener("click", setUserValue(this));

    // ID column
    let userID = document.createElement("td");
    userID.className = "userRow";
    userID.innerText = reimbursementItem.id;

    // FIRST NAME/GIVEN_NAME
    let userFirstName = document.createElement("td");
    userFirstName.className = "userRow";
    userFirstName.innerText = reimbursementItem.given_name;

    // LAST NAME/SURNAME
    let userSurname = document.createElement("td");
    userSurname.className = "userRow";
    userSurname.innerText = reimbursementItem.surname;
    
    // USERNAME
    let userUsername = document.createElement("td");
    userUsername.className = "userRow";
    userUsername.innerText = reimbursementItem.username;

    // USERNAME
    let userEmail = document.createElement("td");
    userEmail.className = "userRow";
    userEmail.innerText = reimbursementItem.email;

    // ROLE
    let userRole = document.createElement("td");
    userRole.className = "userRow";
    userRole.innerText = convertRole(reimbursementItem.role_ID);

    // Bind HTML elements to the row
    userRow.appendChild(userView);
    userRow.appendChild(userID);
    userRow.appendChild(userFirstName);
    userRow.appendChild(userSurname);
    userRow.appendChild(userUsername);
    userRow.appendChild(userEmail);
    userRow.appendChild(userRole);

    // Adds a passive event listener to the View link after it's been added to the document.
    let viewLink = userRow.childNodes[0].firstChild;
    viewLink.addEventListener("click", function() {
        setUserValue(reimbursementItem.username);
    });

    // Return the row
    return userRow;
}

function setUserValue(user) {
    approveBtn.value = user;
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

async function approveUser()
{
    let user = approveBtn.value;

    // Search in backend
    await fetch(`${FETCH_URL + USER_SERVLET + '?username=' + user}`,
    {
        method:'GET',  // GET HTTP method
        headers:{"Content-type":"application/json"},    // Indicate JSON object
    })
    .then(response => response.json())
    .then(data => updateUser(data));
}

async function updateUser(data)
{
    const updatedUser =
    {
        username : data.username,
        password : data.password,
        email : data.email,
        given_name : data.given_name,
        surname : data.surname,
        is_Active : true,
        role_ID : data.role_ID
    }

    await fetch(`${FETCH_URL + USER_SERVLET + '?update=' + String(data.id)}`,
    {
        method:'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(updatedUser)
    });

    location.reload(); 
}

// Function to add a user
function addUser()
{
    window.location.href = ADD_URL;
}

// Function to update a user
function updateUserButton()
{
    window.location.href = UPDATE_URL;
}

// Function to delete a user
function deleteUser()
{
    window.location.href = DELETE_URL;
}


// Function to log a user out
function logOutFunction()
{
    window.localStorage.clear();
    window.location.href = HOME_URL;
}