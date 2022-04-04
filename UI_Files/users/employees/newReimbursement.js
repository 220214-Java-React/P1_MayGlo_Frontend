//Home URL
const homeURL = 'http://127.0.0.1:5500/UI_Files/index.html'; 

// URLs to access API
const fetchURL = 'http://localhost:8080/';
const servletURL = 'reimbursements';

// Employee home page
const employeeURL = 'employeePage.html';

// Submit Button
let submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', submitReimbursement);

// Cancel Button
let cancelBtn = document.getElementById('cancelBtn');
cancelBtn.addEventListener('click', cancelReimbursement);

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
    cancelReimbursement();
  }
}

// Function for when a new Reimbursement is submitted
async function submitReimbursement()
{
    // Create a reimbursement object with necessary info
    let reimbObj = 
    {
        amount: document.getElementById('amount').value,
        description: document.getElementById('description').value,
        type_ID: document.getElementById('type_ID').value
    }

    // Check properties of user object, ensure it has values
    let isValid = Object.values(reimbObj).every(value => 
    {
        if (!value)
            return false;
        else
            return true;
    })

    // Ensure a positive, decimal based number is entered
    if (Number(reimbObj.amount) > 0)
    {
        reimbObj.amount = Number.parseFloat(reimbObj.amount).toFixed(2);
    }
    else
    {
        alert("Enter a proper decimal number for the amount.");
        return;
    }

    if (isValid)
    {
        // POST Reimbursement object to create it in backend
        let response = await fetch(`${fetchURL + servletURL + "?userID=" + localStorage.getItem('loggedUser')}`, 
        {
            method:'POST',  // POST HTTP method
            headers:{"Content-type":"application/json"},    // Indicate JSON object
            body: JSON.stringify(reimbObj)   // Convert to JSON to send
        });

        // Reimbursement was created successfully
        if (response.status == 201)
        {
            // Switch page
            window.location.href = employeeURL;
        }
        else 
        {
            alert("Something went wrong while Creating the Reimbursement");
        }
    }
    else
    {
        alert("Missing a field");       // Missing something
    }

    window.location.href = employeeURL;     // Go back to employee page
}

// Function when Cancel button is clicked
function cancelReimbursement()
{
    window.location.href = employeeURL;     // Goes back to employee page
}

// Function to log a user out
function logOutFunction()
{
    window.localStorage.clear();
    window.location.href = homeURL;
}