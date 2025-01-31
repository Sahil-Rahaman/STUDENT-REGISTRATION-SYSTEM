const studentInput = document.querySelector("#student-name");
const emailInput = document.querySelector("#Email-id");
const idInput = document.querySelector("#student-ID");
const contactInput = document.querySelector("#contact-no");
const addbtn = document.querySelector("#Add");
const displayDetails = document.querySelector(".display-details");

let editStatus = false;
let editCard = null;

addbtn.addEventListener("click", (event) => {
    event.preventDefault();

    const student = studentInput.value.trim();
    const email = emailInput.value.trim();
    const id = idInput.value.trim();
    const contact = contactInput.value.trim();

    if (student === "" || email === "" || id === "" || contact === "") {
        alert("All fields are required");
        return;
    }

    if (editStatus) {
        // Updating the existing student entry
        editCard.querySelector(".name").textContent = `Student Name: ${student}`;
        editCard.querySelector(".email").textContent = `Student Email-ID: ${email}`;
        editCard.querySelector(".id").textContent = `Student ID: ${id}`;
        editCard.querySelector(".contact").textContent = `Contact No: ${contact}`;

        addbtn.textContent = "Add";
        editStatus = false;
        editCard = null;
    } else {
        // Creating a new student card
        const details = createStudentElement(student, email, id, contact);
        displayDetails.appendChild(details);
    }

    saveData();  // Save after adding or editing
    clearInputs();
});

function createStudentElement(student, email, id, contact) {
    const details = document.createElement("div");
    details.classList.add("student-card");

    details.innerHTML = `
        <ul class="studentDetails">
            <li class="name">Student Name: ${student}</li>
            <li class="email">Student Email-ID: ${email}</li>
            <li class="id">Student ID: ${id}</li>
            <li class="contact">Contact No: ${contact}</li>
        </ul>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>`;

    details.querySelector(".edit").addEventListener("click", () => {
        editStatus = true;
        editCard = details;

        studentInput.value = student;
        emailInput.value = email;
        idInput.value = id;
        contactInput.value = contact;

        addbtn.textContent = "Update";
    });

    details.querySelector(".delete").addEventListener("click", () => {
        displayDetails.removeChild(details);
        saveData(); // Save after deletion
    });

    return details;
}

function saveData() {
    const studentList = [];
    document.querySelectorAll(".student-card").forEach(card => {
        studentList.push({
            student: card.querySelector(".name").textContent.split(": ")[1],
            email: card.querySelector(".email").textContent.split(": ")[1],
            id: card.querySelector(".id").textContent.split(": ")[1],
            contact: card.querySelector(".contact").textContent.split(": ")[1]
        });
    });

    localStorage.setItem("students", JSON.stringify(studentList));
}

function extractData() {
    const savedData = JSON.parse(localStorage.getItem("students") || "[]");

    savedData.forEach(({ student, email, id, contact }) => {
        const details = createStudentElement(student, email, id, contact);
        displayDetails.appendChild(details);
    });
}

// Function to clear inputs
function clearInputs() {
    studentInput.value = "";
    emailInput.value = "";
    idInput.value = "";
    contactInput.value = "";
}

// Load stored data when page loads
extractData();
