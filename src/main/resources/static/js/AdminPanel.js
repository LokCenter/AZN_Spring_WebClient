// Variables for the requests modal
const requestButtons = document.getElementsByClassName("request-btn");
const requestModal = document.getElementById("request-modal");
const closeRequestModal = document.getElementsByClassName("close-request-modal")[0];
// Variable for the previous year overview modal
const prevYearButtons = document.getElementsByClassName("prev-year-btn");
const prevYearModal = document.getElementById("prev-year-modal");
const closePrevYearModal = document.getElementsByClassName("close-prev-year-modal")[0];
// Variables for the edit modal
const editButtons = document.getElementsByClassName("edit-btn");
const editModal = document.getElementById("edit-modal");
const closeEditModal = document.getElementsByClassName("close-edit-modal")[0];
// Save button
const saveButton = document.getElementById("save-user-data-button");

/**
 * Make Request
 *
 * @param path request path
 * @param userid requested user id
 * @param res_callback callback func to work with response data
 */
const makeRequest = (path, userid, res_callback) => {
    // User Session cookie
    axios.defaults.withCredentials = true;

    axios.get(path + "?userId=" + userid)
        .then((response) => {
            if (response.data !== '' && (response.data.constructor === Object || response.data.constructor === Array)) {
                res_callback(response.data);
            }

        }).catch((e) => {
        console.log("cannot request data", e)
    })
}

/**
 *
 * @param userid id from user
 * @param username
 * @param path backend path
 */
const showYearPlanByUser = (userid, username, path) => {
    // set username
    document.getElementById("user-name-modal").innerHTML = username;

    makeRequest(path, userid, (data) => {
        let years = data;

        for (let year in years) {
            work = years[year].workDay !== undefined ? years[year].workDay : 0;
            sick = years[year].SickDays !== undefined ? years[year].SickDays : 0;
            vacation = years[year].availableVacation !== undefined ? years[year].availableVacation : 0;
            glaz = years[year].glazDays !== undefined ? years[year].glazDays : 0;

            addYear(year, work, sick, vacation, glaz, "No Data yet!", "year-overview-table")
        }

        prevYearModal.style.display = "block";
        disableMainWindowScrolling();
    })
}

const showRequestListByUser = (userid, username, path) => {
    // set username
    document.getElementById("request-modal-username").innerHTML = username;

    makeRequest(path, userid, (data) => {
        let typeArray = [];
        let startArray = [];
        let endArray = [];

        for (let request in data) {
            // tag should start with 'r'
            typeArray.push(data[request].tag.substring(1))
            startArray.push(data[request].startdate)
            endArray.push(data[request].enddate)
        }

        setRequestModalContent(typeArray.length, typeArray, startArray, endArray);

        requestModal.style.display = "block";
        disableMainWindowScrolling();
    })
}

function redirect(id) {
    console.log(id);
}

for (let button of editButtons) {
    button.addEventListener("click", () => {
        editModal.style.display = "block";
        disableMainWindowScrolling();
    });
}

/**
 * Closes request modal when clicking the "x".
 */
closeRequestModal.addEventListener("click", () => {
    requestModal.style.display = "none";
    enableMainWindowScrolling();
});

/**
 * Closes prev year modal when clicking the "x".
 */
closePrevYearModal.addEventListener("click", () => {
    prevYearModal.style.display = "none";
    enableMainWindowScrolling();

    // clear table
    const tbody = document.getElementById("year-overview-table-body")
    tbody.innerHTML = "";
});

/**
 * Closes the edit modal when clicking the "x".
 */
closeEditModal.addEventListener("click", () => {
    editModal.style.display = "none";
    enableMainWindowScrolling();
})

/**
 * Closes the current modal when clicking outside of it.
 */
window.addEventListener("click", (event) => {
    if (event.target === prevYearModal) {
        prevYearModal.style.display = "none";
        enableMainWindowScrolling();
        // clear table
        const tbody = document.getElementById("year-overview-table-body")
        tbody.innerHTML = "";
    } else if (event.target === editModal) {
        editModal.style.display = "none";
        enableMainWindowScrolling();
    } else if (event.target === requestModal) {
        requestModal.style.display = "none";
        enableMainWindowScrolling();
    }
});

function disableMainWindowScrolling() {
    document.body.style.overflow = "hidden";
    document.body.style.height = "100%";
}

function enableMainWindowScrolling() {
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
}

/**
 * Displays the content of the request modal depending on the number of requests
 * @param {number} numOfRequests
 * @param {array<string>} eventType
 * @param {array<string>} startDate
 * @param {array<string>} endDate
 */
function setRequestModalContent(numOfRequests, eventType, startDate, endDate) {
    const requestOverview = document.getElementById("request-overview");
    requestOverview.innerHTML = "";
    if (numOfRequests === 0) {
        requestOverview.innerHTML = "Keine Anfragen vorhanden";
    } else {
        for (let i = 0; i < numOfRequests; i++) {
            requestOverview.innerHTML += `
                <div class="event-type"><p>${eventType[i]}</p></div>
                <div><p>${startDate[i]}</p></div>
                <div><p>&ndash;</p></div>
                <div><p>${endDate[i]}</p></div>
                <div><svg class="svg-accept" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg></div>
                <div><svg class="svg-deny" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/></svg></div>
                `;
            const svgAccept = document.getElementsByClassName("svg-accept")[0];
            const svgDeny = document.getElementsByClassName("svg-deny")[0];
            svgAccept.addEventListener("click", () => {
                // Accept the request
            })
            svgDeny.addEventListener("click", () => {
                // Deny the request
            })
        }
    }
}



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
 * Trigger filterTable() when clearing the input by clicking the "x" in those browsers that support it.
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

saveButton.addEventListener("click", () => {
    // Save data
})