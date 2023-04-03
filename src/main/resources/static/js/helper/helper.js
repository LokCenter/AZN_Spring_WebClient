/**
 * Helper File with some useful functions
 */

/**
 * gets the startDateValue of the current visible month and assigns it the correct label with full month name and year
 */
function updateTimeDisplay() {
    const params = new URLSearchParams(window.location.search)
    let year = params.get('year');
    let month = params.get('month');
    document.getElementById("month-input").value = year + '-' + month;
    dp.startDate = year + '-' + month + '-01T00:00:00';
    dp.update();
}

/**
 * Get Query String by name
 *
 * @param name
 * @param url
 */
function getQueryByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

/**
 * create numbers with `00` syntax
 * @param value value to format
 * @returns {string}
 */
function withZero(value){
    if (value <= 9) return `0${value}`;
    else return `${value}`;
}

/**
 * Checks if the value of a time slot is an empty string and sets it to "00:00" if it is.
 * @param {Object} time
 */
function setEmptyTimeToZero(time) {
    if (time.value === "") {
        time.value = "00:00";
    }
}

/**
 * Convert int to Human readable syntax
 * @param {int} day
 * @returns {string} day
 */
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

/**
 * Get Human readable Month
 * @param {integer} month
 * @returns {string} month
 */
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

/**
 * Get month as number from month string
 * @param {string} month
 * @returns {number} month
 */
function getNumberFromFullMonth(month) {
    switch (month) {
        case "Januar":
            return 1;
        case "Februar":
            return 2;
        case "März":
            return 3;
        case "April":
            return 4;
        case "Mai":
            return 5;
        case "Juni":
            return 6;
        case "Juli":
            return 7;
        case "August":
            return 8;
        case "September":
            return 9;
        case "Oktober":
            return 10;
        case "November":
            return 11;
        case "Dezember":
            return 12;
    }
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

/**
 * When given a date, color the corresponding cell by adding a class.
 * @param date
 */
function colorCell(date) {
    const cellArray = document.getElementsByClassName("month_default_cell_inner");
    const cellCoords = dp.getCellFromDate(date);
    const cellCount = cellArray.length
    const cellX = cellCoords.x;
    const cellY = cellCoords.y;

    // Get the index for cellArray from the coordinates.
    function getIndex(x, y, cells) {
        switch (cells) {
            case 28:
                return x * 4 + y;
            case 35:
                return x * 5 + y;
            case 42:
                return x * 6 + y;
        }
    }

    const cellIndex = getIndex(cellX, cellY, cellCount);
    const cellToColor = cellArray[cellIndex];
    cellToColor.classList.add("month_default_cell_inner_colored");
}

const unixToDate = (unixString) => {
    // Convert timestamp to Date object
    const date = new Date(unixString);

    // Extract day, month, and year components from Date object
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    return `${year}-${month}-${day}`;
}