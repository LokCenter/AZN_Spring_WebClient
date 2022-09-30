// Variable for the previous year overview modal
const prevYearButtons = document.getElementsByClassName("prev-year-btn");
const prevYearModal = document.getElementById("prev-year-modal");
const closePrevYearModal = document.getElementsByClassName("close-prev-year-modal")[0];
// Variables for the edit modal
const editButtons = document.getElementsByClassName("edit-btn");
const editModal = document.getElementById("edit-modal");
const closeEditModal = document.getElementsByClassName("close-edit-modal")[0];
const saveButton = document.getElementById("save-user-data-button");

function redirect(id) {
    console.log(id);
}

/**
 * Adds a user to the admin panel table.
 * @param name
 * @param overtime
 * @param sick
 * @param glaz
 * @param vacation
 */
function addUserToTable(name, overtime, sick, glaz, vacation) {
    const APTable = document.getElementById("APTable");
    const newRow = APTable.insertRow();
    let newName = newRow.insertCell();
    let newOvertime = newRow.insertCell();
    let newSick = newRow.insertCell();
    let newGlaz = newRow.insertCell();
    let newVacation = newRow.insertCell();
    newName.innerText = name;
    newOvertime.innerText = overtime;
    newSick.innerText = sick;
    newGlaz.innerText = glaz;
    newVacation.innerText = vacation;

    let requests = newRow.insertCell();
    let prevYear = newRow.insertCell();
    let edit = newRow.insertCell();
    requests.innerHTML = "<a href=\"#\">0</a>";
    prevYear.innerHTML = "<button class=\"prev-year-btn\">Anzeigen</button>";
    edit.innerHTML = "<button class=\"edit-btn\">Bearbeiten</button>";

    /**
     * Adds a click event to the "Anzeigen" button to display the modal showing an overview of the previous years.
     */
    prevYear.children[0].onclick = () => {
        prevYearModal.style.display = "block";
        disableMainWindowScrolling();
    };

    /**
     * Adds a click event to the "Bearbeiten" button to display the modal allowing for changes to be made.
     */
    edit.children[0].onclick = () => {
        editModal.style.display = "block";
        disableMainWindowScrolling();
    }
}

addUserToTable("Bärbel Holland", "1h 18min Guthaben", 2, 1, 2);
addUserToTable("Richard Alexander Marktdorf", "0h 39min Schuld", 9, 0, 0);


// Adds event to each "Anzeigen" button which is hard-coded in the HTML file.
// Can be removed once all table entries are added via JS only.
for (let button of prevYearButtons) {
    button.addEventListener("click", () => {
        prevYearModal.style.display = "block";
        disableMainWindowScrolling();
    });
}

for (let button of editButtons) {
    button.addEventListener("click", () => {
        editModal.style.display = "block";
        disableMainWindowScrolling();
    });
}
/**
 * Closes prev year modal when clicking the "x".
 */
closePrevYearModal.addEventListener("click", () => {
    prevYearModal.style.display = "none";
    enableMainWindowScrolling();
});

/**
 * Closes the prev year modal when clicking outside of it.
 */
window.addEventListener("click", (event) => {
    if (event.target === prevYearModal) {
        prevYearModal.style.display = "none";
        enableMainWindowScrolling();
    }
});

/**
 * Closes the edit modal when clicking the "x".
 */
closeEditModal.addEventListener("click", () => {
    editModal.style.display = "none";
    enableMainWindowScrolling();
})

/**
 * Closes the edit modal when clicking outside of it.
 */
window.addEventListener("click", (event) => {
    if (event.target === editModal) {
        editModal.style.display = "none";
        enableMainWindowScrolling();
    }
})

function disableMainWindowScrolling() {
    document.body.style.overflow = "hidden";
    document.body.style.height = "100%";
}

function enableMainWindowScrolling() {
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
}

saveButton.addEventListener("click", () => {
    // Save data
})

/**
 * Adds data to the year overview table in the modal.
 * @param year
 * @param work
 * @param sick
 * @param vacation
 * @param glaz
 * @param overtime
 */
function addYear(year, work, sick, vacation, glaz, overtime) {
    const yearOverviewTableBody = document.getElementById("year-overview-table").getElementsByTagName("tbody")[0];
    let newRow = yearOverviewTableBody.insertRow();
    let newYear = newRow.insertCell();
    let newWork = newRow.insertCell();
    let newSick = newRow.insertCell();
    let newVacation = newRow.insertCell();
    let newGLAZ = newRow.insertCell();
    let newOvertime = newRow.insertCell();
    newYear.innerText = year;
    newWork.innerText = work;
    newSick.innerText = sick;
    newVacation.innerText = vacation;
    newGLAZ.innerText = glaz;
    newOvertime.innerText = overtime;
}

addYear(2021, 365, 0, 30, 0, "00h 00min Guthaben");
addYear(2022, 365, 0, 30, 0, "00h 00min Guthaben");

