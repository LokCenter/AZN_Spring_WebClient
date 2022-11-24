const dateSwitchDate = document.getElementById("dateSwitchDateMonthPlan");



const prevMonthButton = document.getElementById("left-monthPlan-switch");
const nextMonthButton = document.getElementById("right-monthPlan-switch");

prevMonthButton.addEventListener("click", () => {
    viewedDate.setMonth(viewedDate.getMonth() - 1);

    // go one month left
    window.location = window.location.href.split('?')[0] + `?month=${viewedDate.getMonth()}&year=${viewedDate.getFullYear()}`
})
nextMonthButton.addEventListener("click", () => {
    viewedDate.setMonth(viewedDate.getMonth() + 1);

    // go one month right
    window.location = window.location.href.split('?')[0] + `?month=${viewedDate.getMonth()}&year=${viewedDate.getFullYear()}`
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

function displayTable(date, data) {
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
        startCell.textContent = data[i].start;
        let endCell = row.insertCell();
        endCell.textContent = data[i].end;
        let pauseCell = row.insertCell();
        pauseCell.textContent = data[i].pause
        let istCell = row.insertCell();
        let sollCell = row.insertCell();
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
        commentCell.textContent = data[i].comment === true? 'x': ''
    }
}