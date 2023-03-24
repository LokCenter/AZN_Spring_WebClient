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
// Rows of APTable
const tableRows = document.getElementById("APTable").tBodies[0].rows;
const durationInput = document.getElementById("duration");
const vacationTableBody = document.getElementById("vacation-info").getElementsByTagName("tbody")[0];

let durationInputValue = 0;
let durationInputYear = 0;

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
 * Show default value modal
 */
const standardValuesButton = document.getElementById("set-standard-values");
standardValuesButton.addEventListener("click", () => {
    const modal = document.body.appendChild(document.createElement("div"));
    modal.classList.add("modal");
    modal.classList.add("standard-values-modal");
    modal.style.display = "block";
    modal.innerHTML =
        "<div class='modal-content'>" +
            "<div class='modal-content__header'>" +
                "<h2>Standardwerte für neue Benutzer</h2>" +
                "<span class='close' id='close-standard-values'>&times;</span>" +
            "</div>" +
            "<div class='modal-content__body'>" +
                "<table id='default-values-table'>" +
                    "<thead>" +
                        "<tr>" +
                            "<th>Startdatum</th>" +
                            "<th>Arbeitsbeginn</th>" +
                            "<th>Arbeitsende</th>" +
                            "<th>Pause</th>" +
                            "<th>Urlaubstage</th>" +
                            "<th>Löschen</th>" +
                        "</tr>" +
                    "</thead>" +
                    "<tbody></tbody>" +
                "</table>" +
                "<div id='standard-values-form'>" +
                    "<fieldset>" +
                        "<legend>Standardwerte hinzufügen</legend>" +
                            "<div class='standards-input-container'>" +
                                "<input type='date' name='standard-start-date' id='standard-start-date'>" +
                                "<label for='standard-start-date'>Startdatumn</label>" +
                                "<input type='time' name='standard-start-time' id='standard-start-time' value='07:15'>" +
                                "<label for='standard-start-time'>Arbeitsbeginn</label>" +
                                "<input type='time' name='standard-end-time' id='standard-end-time' value='16:00'>" +
                                "<label for='standard-end-time'>Arbeitsende</label>" +
                                "<input type='time' name='standard-pause' id='standard-pause' value='01:00'>" +
                                "<label for='standard-pause'>Pause</label>" +
                                "<input type='number' min='0' name='standard-vacation' id='standard-vacation' value='30'>" +
                                "<label for='standard-vacation'>Urlaubstage</label>" +
                                "<button type='button' id='add-default-values'>Hinzufügen</button>" +
                            "</div>" +
                    "</fieldset>" +
                "</div>" +
                "<p id='default-modal-message'></p>" +
            "</div>" +
        "</div>";
    document.getElementById('add-default-values').addEventListener("click", () => {
        addDefault()
    })
    // get data
    axios.get("/admin/defaults/get")
        .then((response) => {
            if (response.data !== '' && (response.data.constructor === Object || response.data.constructor === Array)) {
                for (let data in response.data) {
                    let deD = new Intl.DateTimeFormat("de")
                    const newDefaultRow = document.getElementById("default-values-table").tBodies[0].insertRow();
                    newDefaultRow.insertCell().innerText = deD.format(new Date(response.data[data].defaultStartDate))
                    newDefaultRow.insertCell().innerText = response.data[data].defaultStartTime;
                    newDefaultRow.insertCell().innerText = response.data[data].defaultEndTime;
                    newDefaultRow.insertCell().innerText = response.data[data].defaultPause;
                    newDefaultRow.insertCell().innerText = response.data[data].defaultVacationDays;
                    newDefaultRow.insertCell().innerHTML = "<div class='delete-container' onclick='deleteDefault(this.parentNode.parentNode)'>&#x2716;</div>";
                }
            }
        }).catch((e) => {
        console.log("cannot request data", e)
        })
    document.getElementById("close-standard-values").addEventListener("click", () => {modal.remove();});
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.remove();
        }
    });
})

/**
 * Delete default value row
 */
function deleteDefault(row) {
    let deleteDate = row.children[0].innerText;
    // Get CSRF token
    const token = $("meta[name='_csrf']").attr("content");
    const header = $("meta[name='_csrf_header']").attr("content");
    // csrf to header
    axios.defaults.headers.put[header] = token
    // data
    axios.put("admin/defaults/delete", {
        "start_date": deleteDate
    }).then(async (res) => {
        if (res.data) {
            row.remove();
        }
    }).catch((error) => {
        console.log(error)
    })
}

/**
 * Add new default values
 // */
function addDefault() {
    const defaultStartDate = document.getElementById("standard-start-date");
    const defaultStartTime = document.getElementById("standard-start-time");
    const defaultEndTime = document.getElementById("standard-end-time");
    const defaultPause = document.getElementById("standard-pause");
    const defaultVacation = document.getElementById("standard-vacation");
    const defaultModalMessage = document.getElementById("default-modal-message");
    if (defaultStartDate.value && defaultStartTime.value && defaultEndTime.value && defaultPause.value && defaultVacation.value && (defaultStartTime.value < defaultEndTime.value)) {
        // make backend request
        // Get CSRF token
        const token = $("meta[name='_csrf']").attr("content");
        const header = $("meta[name='_csrf_header']").attr("content");
        // csrf to header
        axios.defaults.headers.post[header] = token
        // data
        axios.post("admin/defaults/add", {
            "start_time": defaultStartTime.value,
            "end_time": defaultEndTime.value,
            "pause": defaultPause.value,
            "start_date": defaultStartDate.value,
            "vacation": defaultVacation.value
        }).then(async (res) => {
            // Display confirmation message if response is ok
            if (res.data) {
                const newDefaultRow = document.getElementById("default-values-table").tBodies[0].insertRow();
                newDefaultRow.insertCell().innerText = defaultStartDate.valueAsDate.toLocaleDateString("de-DE");
                newDefaultRow.insertCell().innerText = defaultStartTime.value;
                newDefaultRow.insertCell().innerText = defaultEndTime.value;
                newDefaultRow.insertCell().innerText = defaultPause.value;
                newDefaultRow.insertCell().innerText = defaultVacation.value;
                newDefaultRow.insertCell().innerHTML = "<div class='delete-container' onclick='deleteDefault(this.parentNode.parentNode)'>&#x2716;</div>";
                defaultModalMessage.innerText = "";
                defaultModalMessage.style.display = "none";
            }
        }).catch((error) => {
            console.log(error)
            defaultModalMessage.innerText = "Daten konnten nicht gespeichert werden. Eingabe überprüfen.";
            defaultModalMessage.style.display = "block";
        })
    }
    else {
        defaultModalMessage.innerText = "Daten konnten nicht gespeichert werden. Eingabe überprüfen.";
        defaultModalMessage.style.display = "block";
    }
}

/**
 * Creates a popup showing a user's year plan.
 * @param userid id from user
 * @param username
 * @param path backend path
 */
const showYearPlanByUser = (userid, username, path) => {
    document.getElementById("dept-both").focus()
    // set username
    document.getElementById("user-name-modal").innerHTML = username;
    makeRequest(path, userid, (data) => {
        let years = data;
        for (let year in years) {
            work = years[year].workDay !== undefined ? years[year].workDay : 0;
            sick = years[year].sickDay !== undefined ? years[year].sickDay : 0;
            vacation = years[year].availableVacation !== undefined ? years[year].availableVacation : 0;
            glaz = years[year].glazDay !== undefined ? years[year].glazDay : 0;
            balance =  years[year].balance !== undefined ? years[year].balance : 0;
            addYear(year, work, sick, vacation, glaz, balance, "year-overview-table")
        }
        prevYearModal.style.display = "block";
        disableMainWindowScrolling();
    })
}

/**
 * Creates a popup showing a user's requests.
 * @param userid id from user
 * @param username
 * @param path backend path
 */
const showRequestListByUser = (userid, username, path) => {
    document.getElementById("dept-both").focus()
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
        setRequestModalContent(typeArray.length, typeArray, startArray, endArray, userid);
        requestModal.style.display = "block";
        disableMainWindowScrolling();
    })
}

/**
 * Creates a popup showing a user's submissions.
 * @param id id from user
 * @param name
 */
function showSubmissions(id, name) {
    document.getElementById("dept-both").focus()
    localStorage.setItem('name', name)
    const modal = document.body.appendChild(document.createElement("div"));
    modal.classList.add("modal");
    modal.classList.add("submissions-modal");
    modal.style.display = "block";
    disableMainWindowScrolling();
    modal.innerHTML =
        "<div class='modal-content'>" +
            "<div class='modal-content__header'>" +
                "<h2>Arbeitszeitnachweisabgaben</h2>" +
                "<span class='close' id='close-submissions'>&times;</span>" +
            "</div>" +
            "<div class='modal-content__body'>" +
                "<div id='submissions-container'></div>" +
            "</div>" +
        "</div>";
    // submitted months by userid
    axios.get("/admin/azn/get?userId="+ id)
        .then((response) => {
            if (response.data !== '' && (response.data.constructor === Object || response.data.constructor === Array)) {
              let months = [];
              let years = [];
              for (i in response.data) {
                  months.push(response.data[i].month)
                  years.push(`${response.data[i].year}`)
              }
                setSubmissionModalContent(months.length, months, years, id);
            }
        }).catch((e) => {
        console.log("cannot request data", e)
    })
    document.getElementById("close-submissions").addEventListener("click", () => {
        modal.remove();
        enableMainWindowScrolling();
    })
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.remove();
            enableMainWindowScrolling();
        }
    })
}

/**
 * Displays a list of a user's submissions.
 * @param {number} amountOfSubmissions
 * @param {array} months
 * @param {array} years
 * @param {number} id
 */
function setSubmissionModalContent(amountOfSubmissions, months, years, id) {
    const submissionsContainer = document.getElementById("submissions-container");
    submissionsContainer.innerHTML = "";
    if (amountOfSubmissions === 0) {
        submissionsContainer.innerHTML = "Kein Arbeitszeitnachweis abgegeben";
        submissionsContainer.style.display = "flex";
        submissionsContainer.style.justifyContent = "center";
        submissionsContainer.style.overflowY = "auto";
    }
    else {
        for (let i = 0; i < amountOfSubmissions; i++) {
            submissionsContainer.innerHTML += `
                <div>
                    <p className='submitted-date'>${getFullMonth(months[i]-1)} ${years[i]}</p>
                    <a href="/admin/monthplan/?month=${months[i]-1}&year=${years[i]}&userid=${id}" className='go-to-submitted-plan'>Zum Monatsplan</a>
                </div>`;
        }
        submissionsContainer.style.overflowY = "scroll";
    }
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
    window.location.reload();
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
        clearEditData();
    } else if (event.target === requestModal) {
        requestModal.style.display = "none";
        enableMainWindowScrolling();
        window.location.reload();
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

const putRequestsChange = (startDate, endDate, userId, path, res_callback) => {
    axios.defaults.withCredentials = true;
    const token = $("meta[name='_csrf']").attr("content");
    const header = $("meta[name='_csrf_header']").attr("content");
    // csrf to header
    axios.defaults.headers.put[header] = token
    axios.put(`${path}?startDate=${startDate}&endDate=${endDate}&userid=${userId}`)
        .then(res => {})
        .catch(e => {
            console.log(e);
        });
}

const acceptRequest = (startDate, endDate, userId, path, elem) => {
    putRequestsChange(startDate, endDate, userId, path,() => {});
    elem.remove();
}

const deleteRequest = (startDate, endDate, userId, path, elem) => {
    putRequestsChange(startDate, endDate, userId, path,() => {});
    elem.remove();
}

/**
 * Displays the content of the request modal depending on the number of requests
 * @param {number} numOfRequests
 * @param {array<string>} eventType
 * @param {array<string>} startDate
 * @param {array<string>} endDate
 * @param {number} userid
 */
function setRequestModalContent(numOfRequests, eventType, startDate, endDate, userid) {
    const requestOverview = document.getElementById("request-overview");
    requestOverview.innerHTML = "";
    if (numOfRequests === 0) {
        requestOverview.innerHTML = "Keine Anfragen vorhanden";
        requestOverview.style.display = "flex";
        requestOverview.style.justifyContent = "center";
        requestOverview.style.overflowY = "auto";
    } else {
        requestOverview.style.display = "grid";
        requestOverview.style.overflowY = "scroll";
        for (let i = 0; i < numOfRequests; i++) {
            requestOverview.innerHTML += `
                <div class="event-container">
                <div class="event-type"><p>${eventType[i]}</p></div>
                <div><p>${startDate[i]}</p></div>
                <div><p>&ndash;</p></div>
                <div><p>${endDate[i]}</p></div>
                <div><svg 
                onclick="acceptRequest('${startDate[i]}', '${endDate[i]}', ${userid}, 'admin/requests/accept', this.parentNode.parentNode)" class="svg-accept" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg></div>
                <div><svg onclick="deleteRequest('${startDate[i]}', '${endDate[i]}', ${userid}, 'admin/requests/delete', this.parentNode.parentNode)" class="svg-deny" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/></svg></div>
                </div>`
        }
    }
}

durationInput.addEventListener("click", () => {
    let duration = 0;
    // Get the amount of years a user is present
    if (durationInput.value !== "") {
        duration = durationInput.valueAsNumber;
    }
    if (duration > 5) duration = 5;
    // add
    for (let i = durationInputValue; i < duration && vacationTableBody.rows.length -1 < duration; i++) {
        durationInputYear++;
        const newRow = vacationTableBody.insertRow();
        const newYear = newRow.insertCell();
        const newVacation = newRow.insertCell();
        newYear.innerHTML = `${durationInputYear}`;
        newVacation.innerHTML = `<input type="text" name="vacation-${i}" id="vacation-${i}" max="2">`;
    }

    durationInputValue = vacationTableBody.rows.length -1
    // remove
    for (let i = durationInputValue; i > duration; i--) {
        durationInputYear--;
       vacationTableBody.deleteRow(vacationTableBody.rows.length -1);
    }
    durationInputValue = vacationTableBody.rows.length -1;
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
    // Loop through table rows and hide those that don't match the filter
    for (let i = 0; i < tableRows.length; i++) {
        let tableData = tableRows[i].getElementsByTagName("td")[0];
        if (tableData) {
            let textValue = tableData.textContent.toUpperCase();
            if (textValue.indexOf(filter) > -1) {
                tableRows[i].style.display = "";
            } else {
                tableRows[i].style.display = "none";
            }
        }
    }
    colorFilteredResults();
}

/**
 * Filter table by selected department
 */
function filterDept(elem) {
    for (let row of tableRows) {
        // Display the row if its department matches the selected filter
        if (elem.value.includes(row.cells[1].innerText)) row.style.display = "";
        else row.style.display = "none";
    }
    colorFilteredResults();
}

// Sort table by name (1st column)
const APTableBody = document.getElementById("APTable").tBodies[0];
const APTableRows = APTableBody.rows;
let switching = true;
let shouldSwitch = false;
let i;
while (switching) {
    switching = false;
    for (i = 0; i < APTableRows.length - 1; i++) {
        shouldSwitch = false;
        let x = APTableRows[i].cells[0].innerText;
        let y = APTableRows[i + 1].cells[0].innerText;
        if (x.toLowerCase() > y.toLowerCase()) {
            shouldSwitch = true;
            break;
        }
    }
    if (shouldSwitch) {
        APTableRows[i].parentNode.insertBefore(APTableRows[i + 1], APTableRows[i]);
        switching = true;
    }
}

/**
 * Color the background of the result correctly
 */
function colorFilteredResults() {
    // counter starts at 1 to keep in line with css nth-child selector
    let counter = 1;
    // i = 1 to skip the header row
    for (let i = 0; i < tableRows.length; i++) {
        // Continue loop if current row isn't displayed
        if (tableRows[i].style.display === "none") continue;
        // Color row's background according to if it's even (0) or odd (1)
        if (counter % 2 === 0) tableRows[i].style.backgroundColor = "var(--clr-mid)";
        else if (counter % 2 === 1) tableRows[i].style.backgroundColor = "var(--clr-light)";
        counter++;
    }
}

function adminRedirect(id, name) {
    if (id.length > 0) {
        localStorage.setItem('id', id);
        localStorage.setItem('name', name)
        window.location.href = `/admin/monthplan?userid=${id}`
    }
}

/**
 * Show admin edit data
 * @param userid
 * @param name
 */
const adminEdit = (userid, name) => {
    document.getElementById("dept-both").focus()
    document.getElementById('user-name-modal-edit').innerText = name;
    document.getElementById('user-name-modal-edit').setAttribute('tag', userid)
   // worktime list
    axios.get("admin/worktimeList?userId="+ userid)
        .then((response) => {
            if (response.data !== '' && response.data != null) {
                let table = document.getElementById("time-history-table");
                // set time change values
                if (response.data.length) {
                    document.getElementById('work-start').value = response.data[0].workTime['start']
                    document.getElementById('work-end').value = response.data[0].workTime['end']
                    document.getElementById('pause').value = response.data[0].workTime['pause']
                    // format to the right date syntax for input=date
                    let d = new Date(response.data[0].date);
                    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
                    let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
                    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
                    document.getElementById("work-time-date").value = `${ye}-${mo}-${da}`
                }

              for (const item in response.data) {
                  const row = table.insertRow();

                  row.insertCell().innerText = new Date(response.data[item].date).toLocaleDateString('de-DE')
                  row.insertCell().innerText = response.data[item].workTime['start'];
                  row.insertCell().innerText = response.data[item].workTime['end'];
                  row.insertCell().innerText = response.data[item].workTime['pause'];
              }
            }
        }).catch((e) => {
            console.log("cannot request data", e)
        });
        // get vacation data
        axios.get("admin/yearsList?userId="+ userid)
            .then((response) => {
                if (response.data !== '' && response.data != null) {
                    let year  = 1;
                    const vacationTableBody = document.getElementById("vacation-info").getElementsByTagName("tbody")[0]
                    // create rows and columns
                    for (let i in response.data) {
                        const row = vacationTableBody.insertRow();
                        row.insertCell().innerText = i;
                        row.insertCell().innerHTML = `<input type="number" min="0" oninput="validity.valid||(value='0');" value="${response.data[i]}">`
                    }
                    // set list size from object
                    let durationInput = document.getElementById("duration");
                    durationInputValue = Object.keys(response.data).length -1;
                    durationInput.value = Object.keys(response.data).length -1;
                    durationInputYear = Object.keys(response.data)[ Object.keys(response.data).length -1];
                    durationInput.disabled = false;
                }
        }).catch((e) => {
        });
}

/**
 * Axios edit data request
 */
const sendEditData = () => {
   // get id from user
    let userId = document.getElementById('user-name-modal-edit').getAttribute('tag');
    // check userId
    if (userId) {
        // make backend request
        // Get CSRF token
        const token = $("meta[name='_csrf']").attr("content");
        const header = $("meta[name='_csrf_header']").attr("content");
        // csrf to header
        axios.defaults.headers.post[header] = token
        // data
        let yearVacationList = [...vacationTableBody.rows].map(row => [...row.cells]).map(tds => [...[tds[0].innerText, tds[1].children[0].value]]);
        axios.post("admin/edit?userId="+userId, {
            "start_time": document.getElementById('work-start').value,
            "end_time":document.getElementById('work-end').value,
            "pause": document.getElementById('pause').value,
            "date": document.getElementById('work-time-date').value,
            "yearsVacationList": yearVacationList
        }).then(async (res) => {
            // Display confirmation message if response is ok
            if (res.data) {
                window.location.reload();
            } else {
                window.alert("Dies konnte leider nicht gespeichert werden.");
            }
        }).catch((error) => {
            console.log(error);
            window.alert("Dies konnte leider nicht gespeichert werden.");
        })
    }
}

/**
 * Clear edit data
 */
const clearEditData = () => {
    $("#time-history-table tr:has(td)").remove();
    $("#vacation-info tr:has(td)").remove();
}

// Make anchors, buttons unselectable via keyboard to prevent being able to open multiple modals
for (let elem of document.querySelectorAll("a, button")) {
    elem.tabIndex = "-1";
}