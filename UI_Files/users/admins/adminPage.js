//const mainURL = 'http://localhost:8080/adminPage.html';     // Current URL
const homeURL = 'http://127.0.0.1:5500/UI_Files/index.html'; //Home URL
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