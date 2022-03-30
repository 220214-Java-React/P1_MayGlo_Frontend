const homeURL = 'http://127.0.0.1:5500/UI_Files/index.html'; //Home URL
const newReimbURL = 'newReimbursement.html';

const fetchURL = 'http://localhost:8080/';  // <-- URL to use when accessing API
const servletURL = 'reimbursements';        // <-- Servlet whose methods should be used

// New Reimbursement Button
let newReimbBtn = document.getElementById('newReimbBtn');
newReimbBtn.addEventListener('click', newReimbursement);

// Logout Button
let logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', logOutFunction);

window.onload = getReimbursements;  // When the window loads, show reimbursements

async function getReimbursements()
{
    // Get the reimbursements using loggedUser's ID
    await fetch(`${fetchURL + servletURL + "/?user_ID=" + localStorage.getItem('loggedUser')}`,
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
    const reimbRow = document.createElement("tr");      // Current row
    reimbRow.className = "reimbRow";                    // Assign class

    // Destructure object for needed values
    let {reimb_ID, amount, timeSubmitted, type_ID, status_ID} = reimbursementItem;

    // Create each cell for this row --

    // ID column
    let reimbID = document.createElement("th");
    reimbID.className = "reimbCell";
    reimbID.scope = "row";
    reimbID.innerText = reimb_ID;

    // Amount column
    let reimbAmt = document.createElement("td");
    reimbAmt.className = "reimbCell";
    reimbAmt.innerText = amount;

    // Time Submission column
    let reimbSubmit = document.createElement("td");
    reimbSubmit.className = "reimbCell";
    reimbSubmit.innerText = timeSubmitted;

    // Type column
    let reimbType = document.createElement("td");
    reimbType.className = "reimbCell";
    reimbType.innerText = convertType(type_ID);

    // Status column
    let reimbStatus = document.createElement("td");
    reimbStatus.className = "reimbCell";
    reimbStatus.innerText = convertStatus(status_ID);

    // Bind HTML elements to the row
    reimbRow.appendChild(reimbID);
    reimbRow.appendChild(reimbAmt);
    reimbRow.appendChild(reimbSubmit);
    reimbRow.appendChild(reimbType);
    reimbRow.appendChild(reimbStatus);

    // Return the row
    return reimbRow;
}

// Converts Type ID
function convertType(ID)
{
    switch(ID)
    {
        case 0:
            return "Lodging";
        case 1:
            return "Travel";
        case 2:
            return "Food";
        case 3:
            return "Other";
    }
}

// Converts Status ID
function convertStatus(ID)
{
    switch(ID)
    {
        case 0:
            return "Pending";
        case 1:
            return "Approved";
        case 2:
            return "Denied";
    }
}

// Switch to the New Reimbursement Page
function newReimbursement()
{
    window.location.href = newReimbURL;
}

// Function to log a user out
async function logOutFunction()
{
    window.localStorage.clear();
    window.location.href = "/index.html";
}