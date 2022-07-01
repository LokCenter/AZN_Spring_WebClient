/**
 * DayPlan JS
 * @version 1.02 2022-06-08
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

// onClick handler
leftDaySwitch.addEventListener("click", (e) => {
    currDate = currDate.subtract(1, "day");
    dateSwitch.innerText = currDate.format(format);
});

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


// update date
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

// get time on startup
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

// get time on change
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


// onClick
saveButton.addEventListener('click', (e) => {
    console.log(userInputData);


    // user comment or empty
    let userComment = document.getElementById("comment").value;

    //get checked checkbox
    let checked_item = null;
    const checkboxes = document.getElementsByName("check");
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
    axios.post("http://localhost:8880/dayplan", {
        "start_time": userInputData.get('start_time'),
        "end_time": userInputData.get('end_time'),
        "comment": userComment
    }).then((res) => {
        if (res.data) {
            var btn_save = document.getElementById("save-btn");

            btn_save.style.background = "#50C878";
        }
    }).catch((error) => {
        console.log(error)
    })
})

//allow only one checkbox
function onlyOneCheckBox(checkbox) {
    const checkboxes = document.getElementsByName('check');
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false
    })
}

// default value to check if something has changed
let inputChange = false // default is false