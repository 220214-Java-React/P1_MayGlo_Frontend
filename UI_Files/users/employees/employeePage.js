//Home URL
const homeURL = 'http://127.0.0.1:5500/UI_Files/index.html'; 

// New Reimbursement Page
const newReimbURL = 'newReimbursement.html';

// URLs to access API
const fetchURL = 'http://localhost:8080/';
const servletURL = 'reimbursements';

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

// Div to show reimbursement info
let amountData = document.getElementById('amount');
let descData = document.getElementById('description');
let typeData = document.getElementById('typeData');

// Save Changes Button
let saveBtn = document.getElementById('saveBtn');
saveBtn.addEventListener('click', saveChanges);

// When the window loads, check user and get reimbursements
window.onload = checkCurrentUser;

// Ensures there is a user logged in
function checkCurrentUser()
{
  // There is a user
  if (localStorage.getItem('loggedUser'))
  {
    console.log('logged in');
    getReimbursements();
  }
  else  // No user logged in
  {
    console.log('logged out');
    logOutFunction();
  }
}


// Get all reimbursements for this user
async function getReimbursements()
{
    // Get the reimbursements using loggedUser's ID
    await fetch(`${fetchURL + servletURL + "/?user_ID=" + localStorage.getItem('loggedUser') + '&role_ID=' + localStorage.getItem('role_ID')}`,
    {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(data => constructRows(data)); // Create the table
}

// Create the rows for the table of reimbursements
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
    let {reimb_ID, amount, timeSubmitted, description, type_ID, status_ID} = reimbursementItem;

    // Create each cell for this row --

    // View link
    let reimbView = document.createElement("td");
    reimbView.className = "reimbCell";
    reimbView.scope = "row";
    reimbView.innerHTML = '<a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal">View</a>';
    reimbView.setAttribute('id', reimbursementItem.reimb_ID);
    reimbView.addEventListener('click', constructInfo);

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

    // Description column
    let reimbDesc = document.createElement("td");
    reimbDesc.className = "reimbCell";
    reimbDesc.innerText = description;
    
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
    reimbRow.appendChild(reimbDesc);
    reimbRow.appendChild(reimbType);
    reimbRow.appendChild(reimbStatus);

    // Return the row
    return reimbRow;
}

// Info to show when viewing a reimbursement
async function constructInfo()
{

    // Get the reimbursement
    let info = await fetch(`${fetchURL + servletURL + "/?user_ID=" + localStorage.getItem('loggedUser') + '&role_ID=' + localStorage.getItem('role_ID') + '&reimb_ID=' + this.id}`,
    {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => response.json());

    // Enable/disable info based on status
    if (info.status_ID != 0)
    {
        amountData.disabled = true;
        descData.disabled = true;
        typeData.disabled = true;
        saveBtn.disabled = true;
    }
    else
    {
        amountData.disabled = false;
        descData.disabled = false;
        typeData.disabled = false;
        saveBtn.disabled = false;
    }

    // Store reimbursement ID for saving changes
    localStorage.setItem('reimbViewID', info.reimb_ID);

    // Show data
    amountData.value = info.amount;
    descData.value = info.description;
    typeData.value = info.type_ID;
}

// Function to save changes to a reimbursement
async function saveChanges()
{
    // Fields to update on the object
    const reimbObj =
    {
        reimb_ID: localStorage.getItem('reimbViewID'),
        amount: amountData.value,
        description: descData.value,
        type_ID: typeData.value
    }

    // PUT request to update reimbursement
    await fetch(`${fetchURL + servletURL + "/?user_ID=" + localStorage.getItem('loggedUser') + '&role_ID=' + localStorage.getItem('role_ID')}`,
    {
        method: 'PUT',
        body: JSON.stringify(reimbObj)
    })

    // Refresh page
    window.location.reload();
}

function filterType() {
    // Declare variables
    var filter, table, tr, td, i, txtValue;
    filter = typeDrop.value;
    table = document.getElementById("reimbTable");
    tr = table.getElementsByTagName("tr");

    if (filter == "none") {
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[5];
            if (td) {
                tr[i].style.display = "";
            }
        }
        return;
    } else {
        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[5];
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
}

        

function filterStatus() {
    // Declare variables
    var filter, table, tr, td, i, txtValue;
    filter = statusDrop.value;
    table = document.getElementById("reimbTable");
    tr = table.getElementsByTagName("tr");

    if (filter == "none") {
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[6];
            if (td) {
                tr[i].style.display = "";
            }
        }
        return;
    } else {
        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[6];
            if (td) {
                txtValue = td.innerText;
                if (txtValue == convertStatus(parseInt(filter))) {
                tr[i].style.display = "";
                } else {
                tr[i].style.display = "none";
                }
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

function sortByRowAmount(n) {
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

        // Split at the dollar sign
        xamt = x.innerHTML.split('$');
        yamt = y.innerHTML.split('$');
        
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir == "asc") {
          if (parseInt(xamt[1]) > parseInt(yamt[1])) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (parseInt(xamt[1]) < parseInt(yamt[1])) {
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

function sortByAlphabetical(n) {
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

        // Split at the dollar sign
        xamt = x.innerHTML.split('$');
        yamt = y.innerHTML.split('$');
        
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir == "asc") {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              // If so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
            }
          } else if (dir == "desc") {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
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
function logOutFunction()
{
    window.localStorage.clear();
    window.location.href = homeURL;
}