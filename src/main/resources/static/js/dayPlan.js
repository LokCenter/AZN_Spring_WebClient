/**
 * DayPlan JS
 * @version 1.05 2022-07-01
 */

const startTime = document.getElementById("start_time");
const endTime = document.getElementById("end_time");
const pause = document.getElementById("pause");
const dateInput = document.getElementById("dateInput")

/* Date Switch stuff  */

// get date html
let dateSwitch = document.getElementById("dateSwitchDate");

// moment locale
moment.locale("de");

// set the right date
url = new URL(window.location.href);

if (url.searchParams.get('date')) {
    queryDate = url.searchParams.get('date');
    dateSwitch.innerText = moment(queryDate, 'DD-MM-YYYY').format('dddd') + ", ";
    dateInput.value = moment(queryDate, 'DD-MM-YYYY').format('YYYY-MM-DD');
} else {
    // set current date
    dateSwitch.innerText = moment().format('dddd') + ", ";
    dateInput.value = moment().format("YYYY-MM-DD");
}

// set the right title
document.title = moment(dateInput.value, 'YYYY-MM-DD').format('dddd, DD.MM.YYYY');

function setEmptyDateToDate(date) {
    if (date.value === "") {
        if (url.searchParams.get('date')) {
            dateInput.value = moment(queryDate, 'DD-MM-YYYY').format('YYYY-MM-DD');
        } else {
            date.value = moment().format("YYYY-MM-DD");
        }
    }
}
dateInput.addEventListener("change", () => {
    setEmptyDateToDate(dateInput);
});

/**
 * Set date for value in input Box
 */
function setDateFromInput() {
    let dateVal = dateInput.value
    let dateTemp = moment(dateVal, 'YYYY-MM-DD')
    if (url.searchParams.has('userid')) {
        window.location.href =  window.location.href.split('?')[0] + `?date=${dateTemp.format("DD-MM-YYYY")}&userid=${localStorage.id}`
    } else {
        window.location.href =  window.location.href.split('?')[0] + `?date=${dateTemp.format("DD-MM-YYYY")}`
    }
}

dateInput.addEventListener("focusout", setDateFromInput)
dateInput.addEventListener("keyup", event => {
    if (event.key === "Enter") {
        setDateFromInput();
    }
})

// Change date based on button
const leftDaySwitch = document.getElementById("left-dayPlan-switch");
const rightDaySwitch = document.getElementById("right-dayPlan-switch");

// to keep track where we are
let currDate = moment(dateInput.value, "YYYY-MM-DD")

/**
 * go to the left day
 */
leftDaySwitch.addEventListener("click", (e) => {
    currDate = currDate.subtract(1, "day");
    let url = new URL(window.location.href);
    // go to the left date
    if (url.searchParams.has('userid')) {
        window.location.href =  window.location.href.split('?')[0] + `?date=${currDate.format("DD-MM-YYYY")}&userid=${getQueryByName("userid")}`
    } else {
        window.location.href =  window.location.href.split('?')[0] + `?date=${currDate.format("DD-MM-YYYY")}`
    }
});

/**
 * Go to the right day
 */
rightDaySwitch.addEventListener("click", (e) => {
    currDate = currDate.add(1, "day");
    let url = new URL(window.location.href);
    // go to the left date
    if (url.searchParams.has('userid')) {
        window.location.href =  window.location.href.split('?')[0] + `?date=${currDate.format("DD-MM-YYYY")}&userid=${getQueryByName("userid")}`
    } else {
        window.location.href =  window.location.href.split('?')[0] + `?date=${currDate.format("DD-MM-YYYY")}`
    }
});

// get time from display => Date
function getTime(keyValue) {
    let key = new Date();
    let timeTemp;
    let startTimeTemp = document.getElementById("start_time").value;
    let endTimeTemp = document.getElementById("end_time").value;
    let pauseTimeTemp = document.getElementById("pause").value;
    let istTimeTemp = document.getElementById("ist").value;
    switch (keyValue) {
        case "start_time":
            timeTemp = startTimeTemp;
            break;
        case "end_time":
            timeTemp = endTimeTemp;
            break;
        case "pause":
            timeTemp = pauseTimeTemp;
            break
        case "ist":
            timeTemp = istTimeTemp;
            break;
    }
    key.setHours(parseInt(timeTemp.slice(0,2)), parseInt(timeTemp.slice(3,5)), 0)
    return key;
}

/**
 * Get the value of a time on change and calculate ist.
 * @param {string} key mapTimeData key
 * @param {string} value mapTimeData value
 */
function onTimeChange(key, value) {
    // Generate ist time
    // NOTE: if start_time is >= end_time  then ist will be false or pause is too big
    let istValue = getTime("ist");
    istValue.setHours(
        getTime("end_time").getHours() - getTime("start_time").getHours() - getTime("pause").getHours()
    );
    istValue.setMinutes(
        getTime("end_time").getMinutes() - getTime("start_time").getMinutes() - getTime("pause").getMinutes()
    );

    // Set ist
    const ist = document.getElementById("ist");
    ist.value = `${withZero(istValue.getHours())}:${withZero(istValue.getMinutes())}`;
}
onTimeChange();

// Event Listeners listening for time input changes
startTime.addEventListener("change", () => {
    setEmptyTimeToZero(startTime);
    onTimeChange("start_time", startTime.value);
});
endTime.addEventListener("change", () => {
    setEmptyTimeToZero(endTime);
    onTimeChange("end_time", endTime.value);
});
pause.addEventListener("change", () => {
    setEmptyTimeToZero(pause);
    onTimeChange("pause", pause.value);
});

/**
 * Save Button
 *
 * @description Data will be sent to the Spring Controller (Client Side)
 */
let saveButton = document.getElementById("save-button");
saveButton.addEventListener('click', (e) => {
    // user comment or empty
    let userComment = document.getElementById("comment").value;
    let radioGlaz = document.getElementById("radio-glaz").checked;
    let radioSick = document.getElementById("radio-sick").checked;
    let radioVacation = document.getElementById("radio-vacation").checked;
    let radioSchool = document.getElementById("radio-school").checked;

    // send data to the backend

    // Get CSRF token
    const token = $("meta[name='_csrf']").attr("content");
    const header = $("meta[name='_csrf_header']").attr("content");

    // csrf to header
    axios.defaults.headers.post[header] = token
    // data
    axios.post("/dayplan", {
        "start_time": document.getElementById("start_time").value,
        "end_time": document.getElementById("end_time").value,
        "pause": document.getElementById("pause").value,
        "comment": userComment,
        "school": radioSchool,
        "sick": radioSick,
        "vacation": radioVacation,
        "glaz": radioGlaz,
        "date": currDate.format("DD-MM-YYYY")

    }).then(async (res) => {
        // Display confirmation message if response is ok
        const saveConfirmation = document.getElementById("save-confirmation");
        if (res.data) {
            saveConfirmation.innerText = "Änderungen wurden gespeichert";

        }else {
            saveConfirmation.innerText = "Änderungen wurden nicht gespeichert"
        }

        // non-blocking sleep
        await sleep(2000);
        saveConfirmation.innerText = "";
    }).catch((error) => {
        console.log(error)
    })
})

/**
 * Allow only one checkbox
 */
function onlyOneCheckBox(checkbox) {
    const checkboxes = document.querySelectorAll(".radio");
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false
    })
}

const disabledCheckboxes = Array.from(document.querySelectorAll("input[type='checkbox']:disabled"));
let isCheckboxChecked = (checkbox) => checkbox.checked;
const timeInputStart = document.querySelector("input[name='start_time']");
const timeInputEnd = document.querySelector("input[name='end_time']");
const timeInputPause = document.querySelector("input[name='pause']");

/**
 * Disable inputs of type "time" when any disabled checkbox is checked.
 */
if (disabledCheckboxes.some(isCheckboxChecked) === true) {
    timeInputStart.disabled = true;
    timeInputEnd.disabled = true;
    timeInputPause.disabled = true;
} else {
    timeInputStart.disabled = false;
    timeInputEnd.disabled = false;
    timeInputPause.disabled = false;
}