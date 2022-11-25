const dateSwitchDate = document.getElementById("dateSwitchDateMonthPlan");
const prevMonthButton = document.getElementById("left-monthPlan-switch");
const nextMonthButton = document.getElementById("right-monthPlan-switch");

prevMonthButton.addEventListener("click", () => {
    viewedDate.setMonth(viewedDate.getMonth() - 1);

    url = new URL(window.location.href);

    if (url.searchParams.has('userid')) {
        window.location = window.location.href.split('?')[0] + `?month=${viewedDate.getMonth()}&year=${viewedDate.getFullYear()}&userid=${getQueryByName("userid")}`
        return;
    }

    // go one month left
    window.location = window.location.href.split('?')[0] + `?month=${viewedDate.getMonth()}&year=${viewedDate.getFullYear()}`
})
nextMonthButton.addEventListener("click", () => {
    viewedDate.setMonth(viewedDate.getMonth() + 1);

    url = new URL(window.location.href);

    if (url.searchParams.has('userid')) {
        window.location = window.location.href.split('?')[0] + `?month=${viewedDate.getMonth()}&year=${viewedDate.getFullYear()}&userid=${getQueryByName("userid")}`
        return;
    }

    // go one month right
    window.location = window.location.href.split('?')[0] + `?month=${viewedDate.getMonth()}&year=${viewedDate.getFullYear()}`
})

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
        let start = new Date();
        let end = new Date();
        let pause = new Date();
        let ist = null;

        let starttime = data[i].start;
        let endtime =   data[i].end;
        let pausetime =  data[i].pause;

        if (starttime && endtime && pausetime) {
            ist = new Date();
            start.setHours(parseInt(starttime.slice(0, 2)), parseInt(starttime.slice(3, 5)), 0)
            end.setHours(parseInt(endtime.slice(0, 2)), parseInt(endtime.slice(3, 5)), 0)
            pause.setHours(parseInt(pausetime.slice(0, 2)), parseInt(pausetime.slice(3, 5)), 0)

            ist.setHours(
                end.getHours() - start.getHours() - pause.getHours()
            );
            ist.setMinutes(
                end.getMinutes() - start.getMinutes() - pause.getMinutes()
            );
        }
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
        istCell.textContent = ist !== null? `${withZero(ist.getHours())}:${withZero(ist.getMinutes())}` : "";
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