//Home URL
const homeURL = 'http://127.0.0.1:5500/UI_Files/index.html';

// URLs to access API
const fetchURL = 'http://localhost:8080/';
const servletURL = 'users';

// Admin Sub-pages
const addURL = 'addUser.html';
const updateURL = 'updateUser.html';
const deleteURL = 'deleteUser.html';


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
    let {id, given_name, surname, username, email, role_ID} = reimbursementItem;

    // Create each cell for this row --

    // View link
    let userView = document.createElement("td");
    userView.className = "userRow";
    userView.scope = "row";
    userView.innerHTML = `<a href="#" data-bs-toggle="modal" data-bs-target="#userViewModal" value=${username} class="viewLink">View</a>`;

    //userView.addEventListener("click", setUserValue(this));

    // ID column
    let userID = document.createElement("td");
    userID.className = "userRow";
    userID.innerText = id;

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

    // Adds a passive event listener to the View link after it's been added to the document.
    let viewLink = userRow.childNodes[0].firstChild;
    viewLink.addEventListener("click", function() {
        setUserValue(username);
    });

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

async function approveUser()
{
    let user = approveBtn.value;
    console.log("The value of the user to be approve/activated is: " + user);
    
        // Search in backend
        await fetch(`${fetchURL + servletURL + '?username=' + user}`,
        {
            method:'GET',  // GET HTTP method
            headers:{"Content-type":"application/json"},    // Indicate JSON object
        })
        .then(response => response.json())
        .then(data => updateUser(data));
}

async function updateUser(data)
{
    console.log(data);
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

    console.log(updatedUser);
    console.log(data.id);

    let response = await fetch(`${fetchURL + servletURL + '?update=' + String(data.id)}`,
    {
        method:'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(updatedUser)
    });

    location.reload(); 
}

function setUserValue(user) {
    approveBtn.value = user;
    console.log("The value of the Approve/Active button is: " + approveBtn.value);
}

// Function to add a user
function addUser()
{
    window.location.href = addURL;
}

// Function to update a user
function updateUserButton()
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
    window.location.href = homeURL;
}