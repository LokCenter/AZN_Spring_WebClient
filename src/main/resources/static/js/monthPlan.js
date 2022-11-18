const dateSwitchDate = document.getElementById("dateSwitchDate");
// Initially set viewedDate to the current date
let viewedDate = new Date();
dateSwitchDate.textContent = `${getFullMonth(viewedDate.getMonth())} ${viewedDate.getFullYear()}`;
displayTable(viewedDate);

const prevMonthButton = document.getElementById("left-dayPlan-switch");
const nextMonthButton = document.getElementById("right-dayPlan-switch");
prevMonthButton.addEventListener("click", () => {
    viewedDate.setMonth(viewedDate.getMonth() - 1);
    dateSwitchDate.textContent = `${getFullMonth(viewedDate.getMonth())} ${viewedDate.getFullYear()}`;
    displayTable(viewedDate);
})
nextMonthButton.addEventListener("click", () => {
    viewedDate.setMonth(viewedDate.getMonth() + 1);
    dateSwitchDate.textContent = `${getFullMonth(viewedDate.getMonth())} ${viewedDate.getFullYear()}`;
    displayTable(viewedDate);
})

function getFullMonth(month) {
    switch (month) {
        case 0:
            return "Januar";
        case 1:
            return "Februar";
        case 2:
            return "März";
        case 3:
            return "April";
        case 4:
            return "Mai";
        case 5:
            return "Juni";
        case 6:
            return "Juli";
        case 7:
            return "August";
        case 8:
            return "September";
        case 9:
            return "Oktober";
        case 10:
            return "November";
        case 11:
            return "Dezember";
        default:
            return "?";
    }
}

function getWeekdayString(day) {
    switch (day) {
        case 0:
            return "So";
        case 1:
            return "Mo";
        case 2:
            return "Di";
        case 3:
            return "Mi";
        case 4:
            return "Do";
        case 5:
            return "Fr";
        case 6:
            return "Sa";
        default:
            return "?";
    }
}

function displayTable(date) {
    let totalDaysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    let datesOfMonth = [];
    for (let i = 1; i <= totalDaysInMonth; i++) {
        date.setDate(i);
        let dateToPush = `${getWeekdayString(date.getDay())}, ${date.toLocaleDateString()}`;
        // Add leading zero if date is in single digits
        if (i < 10) {
            dateToPush = `${getWeekdayString(date.getDay())}, 0${date.toLocaleDateString()}`;
        }
        datesOfMonth.push(dateToPush);
    }
    // Set the date back to day 1 to prevent issues with following months of different lengths
    date.setDate(1);

    const tableBody = document.getElementsByTagName("tbody")[0];
    tableBody.innerHTML = "";
    for (let i = 0; i < totalDaysInMonth; i++) {
        // Creating the date cell
        let row = tableBody.insertRow();
        let dateCell = row.insertCell();
        dateCell.textContent = datesOfMonth[i];

        // Creating the other cells
        let startCell = row.insertCell();
        let endCell = row.insertCell();
        let pauseCell = row.insertCell();
        let istCell = row.insertCell();
        let sollCell = row.insertCell();
        let glazCell = row.insertCell();
        let sickCell = row.insertCell();
        let vacationCell = row.insertCell();
        let holidayCell = row.insertCell();
        let schoolCell = row.insertCell();
        let commentCell = row.insertCell();
    }
}