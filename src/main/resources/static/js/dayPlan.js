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

// get time on change
function  onPickerClose(val, elem, picker) {
    // create numbers with `00` syntax
    function withZero(val) {
        if (val <= 9) {
            return `0${val}`
        } else {
            return `${val}`
        }
    }
    let time = `${withZero(val[0])}:${withZero(val[1])}`

    //Todo: Validate time
    mapTimeData(elem.id, time);
}

// Save button
let saveButton = document.getElementById("save-btn");


// onClick
saveButton.addEventListener('click', (e) => {
    // check if ab is less than ae
    let start = new Date();
    let startTime = userInputData.get("start_time").split(":");
    start.setHours(parseInt(startTime[0]), parseInt(startTime[1]));

    let end = new Date();
    let endTime = userInputData.get("end_time").split(":");
    end.setHours(parseInt(endTime[0]), parseInt(endTime[1]));

    // check start and end
    if (start < end) {
        // ...
    } else {
        // start should be smaller than end
        // show error popup
        Swal.fire({
            icon: 'error',
            title: 'Falsche Eingabe',
            text: 'Arbeitsbeginn muss kleiner sein als Arbeitsende',
        })
    }

})

/*Popup*/


// default value to check if something has changed
let inputChange = false // default is false