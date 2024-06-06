const form = document.getElementById("login-form")
const usersContainer = document.getElementById("users-container")

async function onFormSubmit(event) {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value

    usersContainer.textContent = "Loading ..."

    const tokenResponse = await fetch("http://localhost:8000/api/v1/token/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email, password: password})
    })

    const data = await tokenResponse.json()
    const accessToken = data.access

    const usersResponse = await fetch("http://localhost:8000/api/v1/notes/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken
        }
    })

    usersContainer.textContent = ""

    const usersData = await usersResponse.json()

    usersData.forEach(user => {
        usersContainer.innerHTML += `
            <p>${note.title} - ${note.body}</p>
        `
    })

}

form.addEventListener("submit", onFormSubmit)

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    fetch('/api/v1/token/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
    .then(response => response.json())
    .then(data => {
        const token = data.access;
        return fetch('/api/v1/notes/', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    })
    .then(response => response.json())
    .then(notes => {
        const container = document.getElementById('users-container');
        container.innerHTML = '';
        notes.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.innerHTML = `<h3>${note.title}</h3><p>${note.description}</p>`;
            container.appendChild(noteElement);
        });
    })
    .catch(error => console.error('Error:', error));
});

