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
 * Closes the prev year modal when clicking outside it.
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
 * Closes the edit modal when clicking outside it.
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

const vacationTableBody = document.getElementById("vacation-info").getElementsByTagName("tbody")[0];

/**
 * Adds rows to the table allowing the editing of yearly vacation days depending on length of the apprenticeship.
 */
function addVacationYearsToTable() {
    if (duration > 5) duration = 5;
    for (let i = 0; i <= duration; i++) {
        const newRow = vacationTableBody.insertRow();
        const newYear = newRow.insertCell();
        const newVacation = newRow.insertCell();
        newYear.innerHTML = `<label for="vacation-${i}">${i+1}. Jahr</label>`;
        newVacation.innerHTML = `<input type="text" name="vacation-${i}" id="vacation-${i}" max="2">`;
    }
}

const durationInput = document.getElementById("duration");
let duration = 0;
durationInput.addEventListener("change", () => {
    // Empty tbody
    vacationTableBody.innerHTML = "";
    // Get the amount of years a user is present
    if (durationInput.value !== "") {
        duration = durationInput.valueAsNumber;
    }
    addVacationYearsToTable();
})

const searchBar = document.getElementById("filter-input");
/**
 * Trigger filterTable() when clearing the input by clicking the "x" in this browser that support it.
 */
searchBar.addEventListener("search", () => {
    if (document.getElementById("filter-input").value === "") filterTable();
})

/**
 * Filter "APTable" table by first column (name)
 */
function filterTable() {
    const filter = document.getElementById("filter-input").value.toUpperCase();
    const tableRow = document.getElementById("APTable").getElementsByTagName("tr");

    // Loop through table rows and hide those that don't match the filter
    for (let i = 0; i < tableRow.length; i++) {
        let tableData = tableRow[i].getElementsByTagName("td")[0];
        if (tableData) {
            let textValue = tableData.textContent.toUpperCase();
            if (textValue.indexOf(filter) > -1) {
                tableRow[i].style.display = "";
            } else {
                tableRow[i].style.display = "none";
            }
        }
    }

    // Color the background of the result correctly
    // counter starts at 1 to keep in line with css nth-child selector
    let counter = 1;
    // i = 1 to skip the header row
    for (let i = 1; i < tableRow.length; i++) {
        // Continue loop if current row isn't displayed
        if (tableRow[i].style.display === "none") continue;
        // Color row's background according to if it's even (0) or odd (1)
        if (counter % 2 === 0) tableRow[i].style.backgroundColor = "var(--clr-mid)";
        else if (counter % 2 === 1) tableRow[i].style.backgroundColor = "var(--clr-light)";
        counter++;
    }

}