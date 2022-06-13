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
     ["ist", "00:00"]
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
    // check if ab is less than ae
    // check start and end
    if (getTime("start_time") < getTime("end_time")) {
        // check end - start >= stop
        let diffTime = new Date().setHours(
            getTime("end_time").getHours() - getTime("start_time").getHours(),
            getTime("end_time").getMinutes() - getTime("start_time").getMinutes());

        if (diffTime < getTime("pause")) {
            Swal.fire({
                icon: 'error',
                title: 'Falsche Eingabe',
                text: 'Pause kann nich größer als Arbeitszeit',
            })

            // stop
            return;
        }


    } else {
        // start should be smaller than end
        // show error popup
        Swal.fire({
            icon: 'error',
            title: 'Falsche Eingabe',
            text: 'Arbeitsbeginn muss kleiner sein als Arbeitsende',
        })
    }

    console.log(userInputData);
})

/*Popup*/


// default value to check if something has changed
let inputChange = false // default is false