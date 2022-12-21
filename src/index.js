// URL for the API
const url = "http://localhost:3000";

// Get all ramen objects from the API
function getAllRamens() {
    return fetch(`${url}/ramens`)
        .then(response => response.json())
        .then(data => data);
}

// Get specific ramen from the API by ID
function getRamenById(id) {
    return fetch(`${url}/ramens/${id}`)
        .then(response => response.json())
        .then (data => data);
}

// When the page loads, retrieve all the ramen objects and display them on the page
window.addEventListener("load" , () => {
    getAllRamens().then(ramens => {
        const ramenMenu = document.getElementById("ramen-menu");
        ramens.forEach (ramen => {
            const img = document.createElement("img");
            img.src = ramen.image;
            img.alt = ramen.name;
            img.dataset.id = ramen.id;
            // Append img element to ramen menu
            ramenMenu.appendChild(img);
        });
    });
});

// When you click on an image, see all the info about that ramen displayed
const ramenMenu = document.getElementById("ramen-menu");
ramenMenu.addEventListener("click", event => {
    if (event.target.tagName === "IMG") {
        const id = event.target.dataset.id;
        getRamenById(id).then(ramen => {
            const ramenDetail = document.getElementById("ramen-detail");
            ramenDetail.innerHTML = `
            <h2>${ramen.name}</h2>
            <p>${ramen.description}</p>
            <p>Insert comment here</p>
            <p>Insert rating here</p>
            `;
        });
    }
});

// Create a new ramen object and add it to the page when the form is submitted
const newRamen = document.getElementById("new-ramen");
newRamen.addEventListener("submit", event => {
    event.preventDefault();

    // Get form data
    const formData = new FormData(event.target);
    const name = formData.get("name");

    // Send POST request
    fetch(`${url}/ramens`, {
     method: "POST",
     body: formData
    }).then(response => response.json())
    .then(data => {
        // Create an img element for the new ramen
        const img = document.createElement("img");
        img.alt = data.name;
        img.dataset.id = data.id;
        // Append the img to the ramen-menu div
        const ramenMenu = document.getElementById("ramen-menu");
        ramenMenu.appendChild(img);
    });
});






