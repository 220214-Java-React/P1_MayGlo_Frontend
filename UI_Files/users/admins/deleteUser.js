const thisURL = window.location.href;
const adminURL = 'adminPage.html';

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

async function searchUser()
{
    // Username to search for
    let searchName = document.getElementById('searchUsername').value;

    // If user enetered a name
    if (searchName)
    {
        // Search in backend
        await fetch(thisURL, 
            {
                method:'POST',  // POST HTTP method
                headers:{"Content-type":"application/json"},    // Indicate JSON object
                body: JSON.stringify(searchName)
            })
    
        // If a user is found, un-hide hidden form
        document.getElementById('credentials').removeAttribute("hidden");
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