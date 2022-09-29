const prevYearButtons = document.getElementsByClassName("prev-year-btn");
const prevYearModal = document.getElementById("prev-year-modal");
const closePrevYearModal = document.getElementsByClassName("close-prev-year-modal")[0];

function redirect(id) {
    console.log(id);
}

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
    edit.innerHTML = "<button>Bearbeiten</button>";

    /**
     * Adds a click event to the "Anzeigen" button to display the modal showing an overview over the previous years.
     */
    prevYear.children[0].onclick = () => {
        prevYearModal.style.display = "block";
    };
}

addUserToTable("Bärbel Holland", "1h 18min Guthaben", 2, 1, 2);
addUserToTable("Richard Alexander Marktdorf", "0h 39min Schuld", 9, 0, 0);


// To be removed when deleting hard-coded placeholders
for (let button of prevYearButtons) {
    button.addEventListener("click", () => {
        prevYearModal.style.display = "block";
    });
}

closePrevYearModal.addEventListener("click", () => {
    prevYearModal.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target === prevYearModal) {
        prevYearModal.style.display = "none";
    }
});


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