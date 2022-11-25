/**
 * Helper File with some useful functions
 */

/**
 * gets the startDateValue of the current visible month and assigns it the correct label with full month name and year
 */
function updateTimeDisplay() {
    let timeDisplay = dp.startDate.value;
    let year = timeDisplay.slice(0, 4);
    let month = timeDisplay.slice(5, 7);
    switch (month) {
        case "01":
            month = "Januar";
            break;
        case "02":
            month = "Februar";
            break;
        case "03":
            month = "März";
            break;
        case "04":
            month = "April";
            break;
        case "05":
            month = "Mai";
            break;
        case "06":
            month = "Juni";
            break;
        case "07":
            month = "Juli";
            break;
        case "08":
            month = "August";
            break;
        case "09":
            month = "September";
            break;
        case "10":
            month = "Oktober";
            break;
        case "11":
            month = "November";
            break;
        case "12":
            month = "Dezember";
            break;
    }
    document.getElementById("dateSwitchDate").innerText = month + " " + year;
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