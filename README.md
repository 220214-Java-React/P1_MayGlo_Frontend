## Project 1 - MayGlo Reimbursement Management System (RMS)

##### *Lightweight reimbursement management system*

###### *Last Edit: April 6, 2022*

---

### Summary:

MayGlo RMS allows employees to submit reimbursement requests for various types of work-related expenses. 
To use the system, visitors must register for an account on the sign-up page. 
After registration, access to the system must be granted by an existing administrator.

Upon login, local storage data for the current user's id and role is saved in the browser.
This data is used to carry out various HTTP requests. Local storage is cleared upon logging out.

All reimbursement and user information is stored in an AWS-hosted PostgreSQL database.
The database relies on primary/foreign key links to ensure data integrity when records are modified or deleted.
The MayGlo RMS system utilizes a custom Java EE Servlet-based API.

---

### Role-related features:

- Admins can:
    - Create new employees, managers, and other admins
    - Update users:
      - Reset passwords
      - Deactivate accounts
    - Delete users:
        - View number of associated reimbursements that will be deleted
        - Preview fields before deletion
    - View and approve pending users
- Managers can:
  - View and approve/deny pending reimbursements
  - View a list of all approved/denied reimbursements
- Employees can:
  - Submit reimbursements. Pending reimbursements may be edited.
  - View a list of their submitted reimbursements.

### Global features:
- Form input validation with alerts for:
  - Missing fields
  - No results
  - Incorrect login information
- Sort records by ID, Amount, Description, Author, Resolver, Status, or Type
- Filter by reimbursement type or status
- Redirection if users attempt to access a portal not associated with their role
- Bootstrap 5 styling