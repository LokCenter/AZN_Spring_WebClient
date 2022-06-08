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
