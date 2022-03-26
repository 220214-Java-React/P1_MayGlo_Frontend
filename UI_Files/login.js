const mainURL = 'http://localhost:8080/login.html'; // Url of tomcat server

let loginBtn = document.getElementById('loginBtn');
loginBtn.addEventListener('click', loginFunction);

async function loginFunction()
{
    let username = document.getElementById('username').textContent;
    let password = document.getElementById('password').textContent;

    let userObj = 
    {
        username: username,
        password: password
    }

    await fetch(mainURL, 
        {
            method:'POST',
            headers:{"Content-type":"application/json"},
            body: JSON.stringify(userObj)
        });
}
