// URLs to access API
const fetchURL = 'http://localhost:8080/';  // <-- URL to use when accessing API
const servletURL = 'reimbursements/';        // <-- Servlet whose methods should be used

const employeeURL = 'employeePage.html';    // Employee home page

// Submit Button
let submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', submitReimbursement);

// Cancel Button
let cancelBtn = document.getElementById('cancelBtn');
cancelBtn.addEventListener('click', cancelReimbursement);

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









