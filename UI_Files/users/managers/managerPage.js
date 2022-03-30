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
window.onload = getRoleTest;

async function getRoleTest()
{
    
    await fetch(`${fetchURL + servletURL + "/?user_ID=" + localStorage.getItem('loggedUser') + '&role_ID=' + localStorage.getItem('role_ID')}`,
    {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(data => constructRows(data));
}



function constructRows(arrayReimb)
{
    // Get the element containing the table of reimbursements
    const listArea = document.getElementById("reimbTable");

    console.log(arrayReimb);
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

    // Bind HTML elements to the row
    //reimbRow.appendChild(reimbView);  ---
    reimbRow.appendChild(reimbID);
    reimbRow.appendChild(reimbAmt);
    reimbRow.appendChild(reimbTimeSubmit);
    reimbRow.appendChild(reimbTimeResolved);
    reimbRow.appendChild(reimbDesc);
    reimbRow.appendChild(reimbAuthor);
    reimbRow.appendChild(reimbResolver);
    reimbRow.appendChild(reimbStatus);
    reimbRow.appendChild(reimbType);

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













