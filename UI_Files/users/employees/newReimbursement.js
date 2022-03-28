const thisURL = window.location.href;
const employeeURL = 'employeePage.html';

// Submit Button
let submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', submitReimbursement);

// Cancel Button
let cancelBtn = document.getElementById('cancelBtn');
cancelBtn.addEventListener('click', cancelReimbursement);

// Function for when a new Reimbursement is submitted
function submitReimbursement()
{
    window.location.href = employeeURL;     // Go back to employee page
}

// Function when Cancel button is clicked
function cancelReimbursement()
{
    window.location.href = employeeURL;     // Goes back to employee page
}









