//Home URL
const HOME_URL = 'http://127.0.0.1:5500/MayGloRMS/index.html'; 

// URLs to access API
const FETCH_URL = 'http://localhost:8080/';
const REIMB_SERVLET = 'reimbursements';

// Pending Toggle
let pendingToggle = document.getElementById('pendingToggle');

// Reimbursement type filter
let typeDrop = document.getElementById('type_ID');
typeDrop.addEventListener('change', filterType);

// Reimbursement status filter
let statusDrop = document.getElementById('status_ID');
statusDrop.addEventListener('change', filterStatus);

// Logout Button
let logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', logOutFunction);

// Function to log a user out
function logOutFunction()
{
    window.localStorage.clear();
    window.location.href = HOME_URL;
}

// Get the element containing the table of reimbursements
const reimbBody = document.getElementById("reimbBody");

// When window loads
window.onload = checkCurrentUser;

// Ensures there is a user logged in
function checkCurrentUser()
{
  // There is a user
  if (localStorage.getItem('loggedUser'))
  {
    showReimbursements();
  }
  else  // No user logged in
  {
    logOutFunction();
  }
}

// Managers can see all reimbursements and approve/deny them = get all reimbursements
async function showReimbursements()
{
    // Clear body data
    reimbBody.innerHTML = "";     

    // Show pending or approved/denied reimb's
    let sendPending = pendingToggle.checked == true ? 1 : 0;

    await fetch(`${FETCH_URL + REIMB_SERVLET + "?user_ID=" + localStorage.getItem('loggedUser') + '&role_ID=' + localStorage.getItem('role_ID') + '&pending=' + sendPending}`,
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
    // Create a row for each reimbursement, append it to the table
    arrayReimb.forEach(element => reimbBody.appendChild(createRow(element)));
}

// Creates a row in the reimbursement table for the employee
function createRow(reimbursementItem)
{      
    // Current row element
    const reimbRow = document.createElement("tr");

    // Assign class to new element
    reimbRow.className = "reimbRow";                    

    // Create each cell for this row --

    // View column
    let reimbView = document.createElement("th");
    reimbView.className = "reimbCell";
    reimbView.scope = "row";
    reimbView.innerHTML = "<a href=''>View</a>";

    // ID column
    let reimbID = document.createElement("td");
    reimbID.className = "reimbCell";
    reimbID.innerText = reimbursementItem.reimb_ID;

    // Amount column
    let reimbAmt = document.createElement("td");
    reimbAmt.className = "reimbCell";
    reimbAmt.innerText = "$" + reimbursementItem.amount;

    // Time Submission column
    let reimbTimeSubmit = document.createElement("td");
    reimbTimeSubmit.className = "reimbCell";
    reimbTimeSubmit.innerText = reimbursementItem.timeSubmitted;

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
    reimbStatus.innerText = convertStatus(reimbursementItem.status_ID);

    // Type column
    let reimbType = document.createElement("td");
    reimbType.className = "reimbCell";
    reimbType.innerText = convertType(reimbursementItem.type_ID);
    
    // Approve Button
    const approveBtn = document.createElement('button');
    approveBtn.setAttribute('id', 'approveBtn');
    approveBtn.setAttribute('type', 'button');
    approveBtn.setAttribute('name', reimbursementItem.reimb_ID);      // tie reimb_ID to button
    approveBtn.style.backgroundColor = "#0d6efd";
    approveBtn.className = "btnCustom";
    approveBtn.innerText = 'Approve';
    approveBtn.addEventListener('click', approveReimbursement);
    
    // Deny Button
    const denyBtn = document.createElement('button');
    denyBtn.setAttribute('id', 'denyBtn');
    denyBtn.setAttribute('type', 'button');
    denyBtn.setAttribute('name', reimbursementItem.reimb_ID);         // tie reimb_ID to button
    denyBtn.className = "btnCustom";
    denyBtn.style.backgroundColor = "#dc3545";
    denyBtn.innerText = 'Deny';
    denyBtn.addEventListener('click', denyReimbursement);

    // Bind HTML elements to the row
    //reimbRow.appendChild(reimbView);  --  For bootstrap (causing issues at the moment)
    reimbRow.appendChild(reimbID);              // Reimbursement ID
    reimbRow.appendChild(reimbAmt);             // Amount
    reimbRow.appendChild(reimbTimeSubmit);      // Time submission
    reimbRow.appendChild(reimbTimeResolved);    // Time resolution
    reimbRow.appendChild(reimbDesc);            // Description
    reimbRow.appendChild(reimbAuthor);          // Author
    reimbRow.appendChild(reimbResolver);        // Resolver
    reimbRow.appendChild(reimbStatus);          // Status
    reimbRow.appendChild(reimbType);            // Type

    // Show buttons if they are pending
    if (reimbursementItem.status_ID == 0)
    {
        reimbRow.appendChild(approveBtn);           // Approve Button
        reimbRow.appendChild(denyBtn);              // Deny Button
    }

    // Return the row
    return reimbRow;
}

// Function for when approve button is clicked
async function approveReimbursement()
{
    await fetch(`${FETCH_URL + REIMB_SERVLET + "?user_ID=" + localStorage.getItem('loggedUser') + '&role_ID=' + localStorage.getItem('role_ID')}`,
    {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({reimb_ID : this.name, status_ID : 1})
    });

    location.reload();
}

// Function for when deny button is clicked
async function denyReimbursement()
{
    await fetch(`${FETCH_URL + REIMB_SERVLET + "?user_ID=" + localStorage.getItem('loggedUser') + '&role_ID=' + localStorage.getItem('role_ID')}`,
    {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({reimb_ID : this.name, status_ID : 2})
    });

    location.reload();
}

function filterType() {
    // Declare variables
    var filter, table, tr, td, i, txtValue;
    filter = typeDrop.value;
    table = document.getElementById("reimbBody");
    tr = table.getElementsByTagName("tr");

    if (filter == "none") {
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[8];
            if (td) {
                tr[i].style.display = "";
            }
        }
        return;
    } else {
        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[8];
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
    table = document.getElementById("reimbBody");
    tr = table.getElementsByTagName("tr");

    if (filter == "none") {
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[7];
            if (td) {
                tr[i].style.display = "";
            }
        }
        return;
    } else {
        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[7];
            if (td) {
                txtValue = td.innerText;
                console.log(txtValue, convertStatus(parseInt(filter)));
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
    table = document.getElementById("reimbBody");
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
    table = document.getElementById("reimbBody");
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
    table = document.getElementById("reimbBody");
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