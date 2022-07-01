/**
 * DayPlan JS
 * @version 1.05 2022-07-01
 */


/* Date Switch stuff  */

// get date html
let dateSwitch = document.getElementById("dateSwitchDate");

// moment format

const format = "dddd, D MMMM, YYYY";

// set current date
dateSwitch.innerText = moment().format(format);

// Change date based on button
let leftDaySwitch = document.getElementById("left-dayPlan-switch");
let rightDaySwitch = document.getElementById("right-dayPlan-switch");

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

/**
 * Get type date on startup
 * @param elem element type
 * @param picker picker
 */
function onStartCreate(elem, picker) {
    mapTimeData(picker.attributes.id.nodeValue, picker.dataset.value);
}

// get time from map => Date
function getTime(keyValue) {
    let key = new Date();
    let keyTime = userInputData.get(keyValue).split(":");
    key.setHours(parseInt(keyTime[0]), parseInt(keyTime[1]));

    return key;
}

/**
 * Get the value of a datepicker on close
 * @param val input value
 * @param elem element type
 * @param picker picker
 */
function onPickerClose(val, elem, picker) {
    // create numbers with `00` syntax
    function withZero(val) {
        if (val <= 9) {
            return `0${val}`
        } else {
            return `${val}`
        }
    }

    let time = `${withZero(val[0])}:${withZero(val[1])}`

    mapTimeData(elem.id, time);

    // generate ist time
    // NOTE: if start_time is >= end_time  then ist will be false or pause is too big
    let ist_ = getTime("ist");

    ist_.setHours(
        (getTime("end_time").getHours() - getTime('start_time').getHours()) - getTime("pause").getHours());

    ist_.setMinutes(
        (getTime("end_time").getMinutes() - getTime('start_time').getMinutes()) - getTime("pause").getMinutes())

    // update map
    mapTimeData("ist", `${withZero(ist_.getHours())}:${withZero(ist_.getMinutes())}`)

    // set ist
    let istElem = document.getElementById("ist-cell");

    // set ist values
    istElem.childNodes[0].childNodes[1].childNodes[0].innerText = `${withZero(ist_.getHours())}`;
    istElem.childNodes[0].childNodes[1].childNodes[1].innerText = `${withZero(ist_.getMinutes())}`;
}

// Save button
let saveButton = document.getElementById("save-btn");


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
    const checkboxes = document.getElementsByName("check");
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
        // change button color if response is ok
        if (res.data) {

            const btn_save = document.getElementById("save-btn");

            // get the color from the button
            const default_color = btn_save.style.background;

            btn_save.style.background = "#50C878";

            // non-blocking sleep
            await sleep(3000)

            btn_save.style.background = default_color
        }
    }).catch((error) => {
        console.log(error)
    })
})

/**
 * Allow only one checkbox
 */
function onlyOneCheckBox(checkbox) {
    const checkboxes = document.getElementsByName('check');
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