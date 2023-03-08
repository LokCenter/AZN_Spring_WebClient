const dateSwitchDate = document.getElementById("dateSwitchDateMonthPlan");
const prevMonthButton = document.getElementById("left-monthPlan-switch");
const nextMonthButton = document.getElementById("right-monthPlan-switch");

prevMonthButton.addEventListener("click", () => {
    viewedDate.setMonth(viewedDate.getMonth() - 1);
    url = new URL(window.location.href);
    if (url.searchParams.has('userid')) {
        window.location = window.location.href.split('?')[0] + `?month=${viewedDate.getMonth()}&year=${viewedDate.getFullYear()}&userid=${getQueryByName("userid")}`
        return;
    }
    // go one month left
    window.location = window.location.href.split('?')[0] + `?month=${viewedDate.getMonth()}&year=${viewedDate.getFullYear()}`
})
nextMonthButton.addEventListener("click", () => {
    viewedDate.setMonth(viewedDate.getMonth() + 1);
    url = new URL(window.location.href);
    if (url.searchParams.has('userid')) {
        window.location = window.location.href.split('?')[0] + `?month=${viewedDate.getMonth()}&year=${viewedDate.getFullYear()}&userid=${getQueryByName("userid")}`
        return;
    }
    // go one month right
    window.location = window.location.href.split('?')[0] + `?month=${viewedDate.getMonth()}&year=${viewedDate.getFullYear()}`
})

/**
 * Show monthplan content
 * @param date month date
 * @param data month java data
 */
function displayTable(date, data, dataSoll) {
    let totalDaysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    let datesOfMonth = [];
    // Split date; 0 = day, 1 = month, 2 = year
    let splitLocalDate = date.toLocaleDateString("de-de").split(".");
    for (let i = 1; i <= totalDaysInMonth; i++) {
        date.setDate(i);
        let dateToPush = "";
        // Add leading zero if day and/or month are in single digits
        // i = day, splitLocalDate[1] = month
        if (i < 10 && splitLocalDate[1] < 10) {
            dateToPush = `${getWeekdayString(date.getDay())}, 0${i}.0${splitLocalDate[1]}.${splitLocalDate[2]}`;
        }
        else if (i < 10) {
            dateToPush = `${getWeekdayString(date.getDay())}, 0${i}.${splitLocalDate[1]}.${splitLocalDate[2]}`;
        }
        else if (splitLocalDate[1] < 10) {
            dateToPush = `${getWeekdayString(date.getDay())}, ${i}.0${splitLocalDate[1]}.${splitLocalDate[2]}`;
        }
        else {
            dateToPush = `${getWeekdayString(date.getDay())}, ${date.toLocaleDateString('de-de')}`;
        }
        datesOfMonth.push(dateToPush);
    }
    // Set the date back to day 1 to prevent issues with following months of different lengths
    date.setDate(1);

    const tableBody = document.getElementsByTagName("tbody")[0];
    tableBody.innerHTML = "";
    for (let i = 0; i < totalDaysInMonth; i++) {
        let start = null
        let end = null
        let pause = null
        let ist = null;
        let starttime = data[i].start;
        let endtime =   data[i].end;
        let pausetime =  data[i].pause;
        if (starttime && endtime && pausetime) {
            start = new Date();
            end = new Date();
            pause = new Date();
            ist = new Date();
            start.setHours(parseInt(starttime.slice(0, 2)), parseInt(starttime.slice(3, 5)), 0)
            end.setHours(parseInt(endtime.slice(0, 2)), parseInt(endtime.slice(3, 5)), 0)
            pause.setHours(parseInt(pausetime.slice(0, 2)), parseInt(pausetime.slice(3, 5)), 0)
            ist.setHours(
                end.getHours() - start.getHours() - pause.getHours()
            );
            ist.setMinutes(
                end.getMinutes() - start.getMinutes() - pause.getMinutes()
            );
        }
        // Creating the date cell
        let row = tableBody.insertRow();
        let dateCell = row.insertCell();
        dateCell.textContent = datesOfMonth[i];
        // Creating the other cells
        let startCell = row.insertCell();
        startCell.textContent = start !== null? `${withZero(start.getHours())}:${withZero(start.getMinutes())}` : "";
        let endCell = row.insertCell();
        endCell.textContent = end !== null? `${withZero(end.getHours())}:${withZero(end.getMinutes())}` : "";
        let pauseCell = row.insertCell();
        pauseCell.textContent = pause !== null? `${withZero(pause.getHours())}:${withZero(pause.getMinutes())}` : "";
        let istCell = row.insertCell();
        istCell.textContent = ist !== null? `${withZero(ist.getHours())}:${withZero(ist.getMinutes())}` : "";
        // set soll time only on week days not on the weekend
        var dt = moment(datesOfMonth[i], "DD.MM.YYYY").toDate()
        let sollCell = row.insertCell();
        sollCell.textContent = ""
        let glazCell = row.insertCell();
        glazCell.textContent = data[i].glaz === true? 'x': ''
        let sickCell = row.insertCell();
        sickCell.textContent = data[i].sick === true? 'x': ''
        let vacationCell = row.insertCell();
        vacationCell.textContent = data[i].vacation === true ? 'x': ''
        let holidayCell = row.insertCell();
        holidayCell.textContent = data[i].holiday === true? 'x': ''
        let schoolCell = row.insertCell();
        schoolCell.textContent = data[i].school === true? 'x': ''
        let commentCell = row.insertCell();
        commentCell.textContent = data[i].comment != null ? data[i].comment: ''
        if (glazCell.textContent == 'x' || sickCell.textContent == 'x' || vacationCell.textContent == 'x' || holidayCell.textContent == 'x' || schoolCell.textContent == 'x' || commentCell.textContent == 'x') {
            continue;
        }
        if ((dt.getDay() % 6) === 0) {
            sollCell.textContent = ""
        } else {
            sollCell.textContent = dataSoll[i].slice(0, -3);
        }
    }
}

const submitButton = document.getElementById("submit-azn");
/**
 * Submit month
 */
submitButton.addEventListener("click", (e) => {
    // Get CSRF token
    const token = $("meta[name='_csrf']").attr("content");
    const header = $("meta[name='_csrf_header']").attr("content");
    // csrf to header
    axios.defaults.headers.put[header] = token
    // data
    axios.put("monthplan/submit", {
        "year": document.getElementById("dateSwitchDateMonthPlan").innerHTML.split(' ')[1],
        "month": getNumberFromFullMonth(document.
        getElementById("dateSwitchDateMonthPlan").innerHTML.split(' ')[0])
    }).then(async (res) => {
        // Display confirmation message if response is ok
        if (res.data) {
            submitButton.setAttribute("disabled", "")
            aznStatus.innerHTML = "Abgegeben <span>&olarr;</span>";
            aznStatus.getElementsByTagName("span")[0].style.color = "blue";
            aznStatus.removeEventListener("click", () => {showMessages(res.data)});
            aznStatus.style.textDecoration = "none";
            aznStatus.style.cursor = "default";
        }
    }).catch((error) => {
        console.log(error)
    })
})

const aznStatus = document.getElementById("azn-status");

/**
 * Displays the messages from the admin with their reason for denial.
 * @param messages
 */
function showMessages(messages) {
    const messageBox = document.body.appendChild(document.createElement("div"));
    messageBox.id = "message-box";
    messageBox.innerHTML =
        "<div class='message-box-content'>" +
            "<div class='message-box-content__header'>" +
                "<h2>Ablehnungsgrund</h2>" +
                "<span class='close' id='close-messages'>&times;</span>" +
            "</div>" +
            "<div class='message-box-content__body'>" +
                "<div id='message-container'>" +
                    "<button onclick='deleteAllMessages()' id='delete-all-messages'>Alle Nachrichten löschen</button>" +
                    "<table id='message-history'>" +
                        "<thead>" +
                            "<tr>" +
                                "<th scope='col'>Absender</th>" +
                                "<th scope='col'>Nachricht</th>" +
                                "<th scope='col'>Löschen</th>" +
                            "</tr>" +
                        "</thead>" +
                        "<tbody></tbody>" +
                    "</table>" +
                    "<button id='acknowledge-message'>OK</button>" +
                "</div>" +
            "</div>" +
        "</div>"

    if (messages.length === 0) {
        document.getElementsByClassName("message-box-content__body")[0].outerHTML = "<div id='message-container'><p>Momentan liegen keine Nachrichten vor.</p><button id='acknowledge-message'>OK</button></div>"
    } else {
        const messageTableBody = document.getElementById("message-history").getElementsByTagName("tbody")[0];
        for (let i = 0; i < messages.length; i++) {
            const newRow = messageTableBody.insertRow();
            newRow.insertCell().textContent = "Admin";
            newRow.insertCell().textContent = messages[i].message;
            let deleteCell = newRow.insertCell();
            deleteCell.textContent = "\u00D7";
            deleteCell.classList.add("delete-message");
            deleteCell.addEventListener('click', (e) => {
                if (window.confirm("Diese Nachricht wirklich löschen?")) {
                    const token = $("meta[name='_csrf']").attr("content");
                    const header = $("meta[name='_csrf_header']").attr("content");

                    // csrf to header
                    axios.defaults.headers.put[header] = token
                    // data
                    axios.put("/monthplan/message?messageId="+messages[i].messageId, {}).then(async (res) => {
                        // Display confirmation message if response is ok
                        console.log(res)
                        if (res.data) {
                            e.target.parentNode.remove();
                            if (messageTableBody.getElementsByTagName("tr").length === 0) {
                                document.getElementsByClassName("message-box-content__body")[0].outerHTML = "<div id='message-container'><p>Momentan liegen keine Nachrichten vor.</p><button id='acknowledge-message'>OK</button></div>"
                                document.getElementById("acknowledge-message").addEventListener("click", () => {
                                    messageBox.remove();
                                    window.location.reload();
                                });
                            }
                        } else {
                            window.alert("Das hat leider nicht funktioniert.");
                        }
                    }).catch((error) => {
                        console.log(error)
                        window.alert("Das hat leider nicht funktioniert.");
                    })
                }
            })
        }
    }
    document.getElementById("acknowledge-message").addEventListener("click", () => {
        messageBox.remove();
        window.location.reload();
    });
    document.getElementById("close-messages").addEventListener("click", () => {
        messageBox.remove();
        window.location.reload();
    });
    window.addEventListener("click", (event) => {
        if (event.target === messageBox) {
            messageBox.remove();
            window.location.reload();
        }
    });
}

// Make anchors, buttons unselectable via keyboard to prevent being able to open multiple modals
for (let elem of document.querySelectorAll("a, button")) {
    elem.tabIndex = "-1";
}

/**
 * Delete all messages
 */
const deleteAllMessages = () => {
    const messageTableBody = document.getElementById("message-history").getElementsByTagName("tbody")[0];
    const messageBox = document.getElementById("message-box");
    if (window.confirm("Wirklich alle Nachrichten köschen?")) {
        // Get CSRF token
        const token = $("meta[name='_csrf']").attr("content");
        const header = $("meta[name='_csrf_header']").attr("content");
        // csrf to header
        axios.defaults.headers.put[header] = token
        // data
        axios.put("monthplan/messages/delete", {
            "year": document.getElementById("dateSwitchDateMonthPlan").innerHTML.split(' ')[1],
            "month": getNumberFromFullMonth(document.
            getElementById("dateSwitchDateMonthPlan").innerHTML.split(' ')[0])
        }).then(async (res) => {
            // Display confirmation message if response is ok
            if (res.data) {
                for (let i = messageTableBody.getElementsByTagName("tr").length - 1; i >= 0; i--) {
                    messageTableBody.getElementsByTagName("tr")[i].remove();
                }
                if (messageTableBody.getElementsByTagName("tr").length === 0) {
                    document.getElementsByClassName("message-box-content__body")[0].outerHTML = "<div id='message-container'><p>Momentan liegen keine Nachrichten vor.</p><button id='acknowledge-message'>OK</button></div>"
                    document.getElementById("acknowledge-message").addEventListener("click", () => {
                        messageBox.remove();
                        window.location.reload();
                    });
                }
            } else {
                // Todo: show error message
                window.alert("Das hat leider nicht funktioniert.");
            }
        }).catch((error) => {
            console.log(error)
            // Todo: show error message
            window.alert("Das hat leider nicht funktioniert.");
        })
    }
}