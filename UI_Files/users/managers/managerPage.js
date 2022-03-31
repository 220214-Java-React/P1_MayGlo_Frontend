//const thisURL = window.location.href;     // Current URL
const homeURL = 'http://127.0.0.1:5500/UI_Files/index.html'; //Home URL

const fetchURL = 'http://localhost:8080/';  // <-- URL to use when accessing API
const servletURL = 'reimbursements';        // <-- Servlet whose methods should be used

// Logout Button
let logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', logOutFunction);

// Function to log a user out
function logOutFunction()
{
    window.location.href = homeURL;
}

// When window loads
window.onload = showReimbursements;

// Managers can see all reimbursements and approve/deny them = get all reimbursements
async function showReimbursements()
{
    await fetch(`${fetchURL + servletURL + "/?user_ID=" + localStorage.getItem('loggedUser') + '&role_ID=' + localStorage.getItem('role_ID')}`,
    {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(data => constructRows(data));
}

// Create the rows for the table after getting needed data
function constructRows(arrayReimb)
{
    // Get the element containing the table of reimbursements
    const listArea = document.getElementById("reimbTable");

    console.log(arrayReimb);
    // Create a row for each reimbursement, append it to the table
    arrayReimb.forEach(element => listArea.appendChild(createRow(element)));
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
    let reimbView = document.createElement("th");
    reimbView.className = "reimbCell";
    reimbView.scope = "row";
    reimbView.innerHTML = "<a href=''>View</a>";

    // ID column
    let reimbID = document.createElement("td");
    reimbID.className = "reimbCell";
    reimbID.innerText = reimb_ID;

    // Amount column
    let reimbAmt = document.createElement("td");
    reimbAmt.className = "reimbCell";
    reimbAmt.innerText = amount;

    // Time Submission column
    let reimbTimeSubmit = document.createElement("td");
    reimbTimeSubmit.className = "reimbCell";
    reimbTimeSubmit.innerText = timeSubmitted;  //  -------

    // Time Resolved column
    let reimbTimeResolved = document.createElement("td");
    reimbTimeResolved.className = "reimbCell";
    reimbTimeResolved.innerText = reimbursementItem.timeResolved;

    // Description column
    let reimbDesc = document.createElement("td");
    reimbDesc.className = "reimbCell";
    reimbDesc.innerText = reimbursementItem.description;

    // Author column
    let reimbAuthor = document.createElement("td");
    reimbAuthor.className = "reimbCell";
    reimbAuthor.innerText = reimbursementItem.authorName;

    // Resolver column
    let reimbResolver = document.createElement("td");
    reimbResolver.className = "reimbCell";
    reimbResolver.innerText = reimbursementItem.resolverName;

    // Status column
    let reimbStatus = document.createElement("td");
    reimbStatus.className = "reimbCell";
    reimbStatus.innerText = convertStatus(status_ID);

    // Type column
    let reimbType = document.createElement("td");
    reimbType.className = "reimbCell";
    reimbType.innerText = convertType(type_ID);
    
    // Approve Button
    const approveBtn = document.createElement('button');
    approveBtn.setAttribute('id', 'approveBtn');
    approveBtn.setAttribute('type', 'button');
    approveBtn.setAttribute('name', reimb_ID);      // tie reimb_ID to button
    approveBtn.innerText = 'APPROVE';
    approveBtn.addEventListener('click', approveReimbursement);
    
    // Deny Button
    const denyBtn = document.createElement('button');
    denyBtn.setAttribute('id', 'denyBtn');
    denyBtn.setAttribute('type', 'button');
    denyBtn.setAttribute('name', reimb_ID);         // tie reimb_ID to button
    denyBtn.innerText = 'DENY';
    denyBtn.addEventListener('click', denyReimbursement);

    // Bind HTML elements to the row
    //reimbRow.appendChild(reimbView);  ---
    reimbRow.appendChild(reimbID);              // Reimbursement ID
    reimbRow.appendChild(reimbAmt);             // Amount
    reimbRow.appendChild(reimbTimeSubmit);      // Time submission
    reimbRow.appendChild(reimbTimeResolved);    // Time resolution
    reimbRow.appendChild(reimbDesc);            // Description
    reimbRow.appendChild(reimbAuthor);          // Author
    reimbRow.appendChild(reimbResolver);        // Resolver
    reimbRow.appendChild(reimbStatus);          // Status
    reimbRow.appendChild(reimbType);            // Type
    reimbRow.appendChild(approveBtn);           // Approve Button
    reimbRow.appendChild(denyBtn);              // Deny Button

    // Return the row
    return reimbRow;
}

// Function for when approve button is clicked
async function approveReimbursement()
{
    await fetch(`${fetchURL + servletURL + "/?user_ID=" + localStorage.getItem('loggedUser') + '&role_ID=' + localStorage.getItem('role_ID')}`,
    {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({reimb_ID : this.name, status_ID : 1})
    }).then(response => console.log(response.status))
}

// Function for when deny button is clicked
async function denyReimbursement()
{
    await fetch(`${fetchURL + servletURL + "/?user_ID=" + localStorage.getItem('loggedUser') + '&role_ID=' + localStorage.getItem('role_ID')}`,
    {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({reimb_ID : this.name, status_ID : 2})
    }).then(response => console.log(response.status))
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
