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

// Reimbursement TYPE filter
let typeDrop = document.getElementById('type_ID');
typeDrop.addEventListener('change', filterType);

// Reimbursement TYPE filter
let statusDrop = document.getElementById('status_ID');
statusDrop.addEventListener('change', filterStatus);

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

    // View link
    let reimbView = document.createElement("td");
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
    reimbAmt.innerText = "$" + amount;

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
    reimbRow.appendChild(reimbView);
    reimbRow.appendChild(reimbID);
    reimbRow.appendChild(reimbAmt);
    reimbRow.appendChild(reimbSubmit);
    reimbRow.appendChild(reimbType);
    reimbRow.appendChild(reimbStatus);

    // Return the row
    return reimbRow;
}

function filterType() {
    // Declare variables
    var filter, table, tr, td, i, txtValue;
    filter = typeDrop.value;
    table = document.getElementById("reimbTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[4];
        if (td) {
            txtValue = td.innerText;
            if (txtValue == convertType(parseInt(filter))) {
            tr[i].style.display = "";
            } else {
            tr[i].style.display = "none";
            }
        }
    }
}

function filterStatus() {
    // Declare variables
    var filter, table, tr, td, i, txtValue;
    filter = statusDrop.value;
    table = document.getElementById("reimbTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[4];
        if (td) {
            txtValue = td.innerText;
            if (txtValue == convertType(parseInt(filter))) {
            tr[i].style.display = "";
            } else {
            tr[i].style.display = "none";
            }
        }
    }
}

// Nearly unmodified code from w3schools' example of table sorting
function sortByRowInteger(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("reimbTable");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 0; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir == "asc") {
          if (parseInt(x.innerHTML) > parseInt(y.innerHTML)) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (parseInt(x.innerHTML) < parseInt(y.innerHTML)) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount ++;
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }


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