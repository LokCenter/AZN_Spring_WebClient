/**
 * DayPlan JS
 * @version 1.05 2022-07-01
 */

const startTime = document.getElementById("start_time");
const endTime = document.getElementById("end_time");
const pause = document.getElementById("pause");

/* Date Switch stuff  */

// get date html
let dateSwitch = document.getElementById("dateSwitchDate");

// moment format & locale
const format = "dddd, DD.MM.YYYY";
moment.locale("de");

// set current date
dateSwitch.innerText = moment().format(format);

// Change date based on button
const leftDaySwitch = document.getElementById("left-dayPlan-switch");
const rightDaySwitch = document.getElementById("right-dayPlan-switch");

// to keep track where we are
let currDate = moment();

/**
 * go to the left day
 */
leftDaySwitch.addEventListener("click", (e) => {
    currDate = currDate.subtract(1, "day");
    dateSwitch.innerText = currDate.format(format);
});

/**
 * Go to the right day
 */
rightDaySwitch.addEventListener("click", (e) => {
    currDate = currDate.add(1, "day");
    dateSwitch.innerText = currDate.format(format);
});

/*Input stuff */

// input map
let userInputData = new Map([
    ["start_time", "0:00"],
    ["end_time", "00:00"],
    ["pause", "00:00"],
    ["soll", "00:00"],
    ["ist", "00:00"],
]);


/**
 * Update the right map entry
 * @param key
 * @param value
 */
function mapTimeData(key, value) {
    switch (key) {
        case "start_time":
            userInputData.set("start_time", value);
            break;
        case "end_time":
            userInputData.set("end_time", value);
            break;
        case "pause":
            userInputData.set("pause", value);
            break
        case "soll":
            userInputData.set("soll", value);
            break;
        case "ist":
            userInputData.set("ist", value);
            break;
    }
}

// get time from map => Date
function getTime(keyValue) {
    let key = new Date();
    let keyTime = userInputData.get(keyValue).split(":");
    key.setHours(parseInt(keyTime[0]), parseInt(keyTime[1]));

    return key;
}

/**
 * Get the value of a time on change and calculate ist.
 * @param {string} key mapTimeData key
 * @param {string} value mapTimeData value
 */
function onTimeChange(key, value) {
    // create numbers with `00` syntax
    function withZero(value){
        if (value <= 9) return `0${value}`;
        else return `${value}`;
    }

    mapTimeData(key, value);

    // Generate ist time if end_time isn't "00:00"
    // NOTE: if start_time is >= end_time  then ist will be false or pause is too big
    if (endTime.value !== "00:00") {
        let istValue = getTime("ist");
        istValue.setHours(
            getTime("end_time").getHours() - getTime("start_time").getHours() - getTime("pause").getHours()
        );
        istValue.setMinutes(
            getTime("end_time").getMinutes() - getTime("start_time").getMinutes() - getTime("pause").getMinutes()
        );
        // Update map
        mapTimeData("ist", `${withZero(istValue.getHours())}:${withZero(istValue.getMinutes())}`);

        // Set ist
        const ist = document.getElementById("ist");
        ist.value = `${withZero(istValue.getHours())}:${withZero(istValue.getMinutes())}`;

        // Display soll
        const soll = document.getElementById("soll");
        soll.value = userInputData.get("soll");
    }
}

// Event Listeners listening for time input changes
startTime.addEventListener("change", () => {
    onTimeChange("start_time", startTime.value);
});
endTime.addEventListener("change", () => {
    onTimeChange("end_time", endTime.value);
});
pause.addEventListener("change", () => {
    onTimeChange("pause", pause.value);
});


// Save button
let saveButton = document.getElementById("save-button");


/**
 * Save Button
 *
 * @description Data will be sent to the Spring Controller (Client Side)
 */
saveButton.addEventListener('click', (e) => {
    // user comment or empty
    let userComment = document.getElementById("comment").value;

    //get checked checkbox
    let checked_item = null;
    const checkboxes = document.querySelectorAll(".radio");
    // find checked value
    checkboxes.forEach((item) => {
        if (item.checked === true) {
            checked_item = item.value;
        }
    })

    // send data to the backend

    // Get CSRF token
    const token = $("meta[name='_csrf']").attr("content");
    const header = $("meta[name='_csrf_header']").attr("content");

    // csrf to header
    axios.defaults.headers.post[header] = token
    // data
    axios.post("http://localhost:8880/dayplan", {
        "start_time": userInputData.get('start_time'),
        "end_time": userInputData.get('end_time'),
        "pause": userInputData.get('pause'),
        "soll": userInputData.get("soll"),
        "ist": userInputData.get('ist'),
        "checked": checked_item,
        "comment": userComment
    }).then(async (res) => {
        // Display confirmation message if response is ok
        if (res.data) {
            const saveConfirmation = document.getElementById("save-confirmation");
            saveConfirmation.innerText = "Änderungen wurden gespeichert";
            // non-blocking sleep
            await sleep(2000);
            saveConfirmation.innerText = "";
        }
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

/**
 * Sleep function wih async
 * @param milli milliseconds as int
 *
 * NOTE: async needed inside functions
 */
function sleep(milli) {
    return new Promise(resolve => setTimeout(resolve, milli));
}

// default value to check if something has changed
let inputChange = false // default is false