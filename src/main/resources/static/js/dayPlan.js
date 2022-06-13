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
     ["end_time", "0:00"],
     ["pause", "0"],
     ["soll", "0:00"],
     ["ist", "0:00"]
]);



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

// get time on change
function  onPickerClose(val, elem, picker) {
    let time = `${val[0]}:${val[1]}`
    mapTimeData(elem.id, time);
}

// Save button

/*Popup*/

// default value to check if something has changed
let inputChange = false // default is false

