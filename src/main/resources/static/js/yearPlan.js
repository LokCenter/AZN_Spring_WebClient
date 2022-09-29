/**
 * Adds a new row to the year overview table.
 * @param year The year these values correspond to.
 * @param work Amount of work days.
 * @param sick Amount of sick days.
 * @param vacation Amount of vacation days.
 * @param glaz Amount of GLAZ days.
 * @param {string} overtime Amount of GLAZ days.
 */
function addYear(year, work, sick, vacation, glaz, overtime) {
    const yearOverviewTableBody = document.getElementById("year-overview").getElementsByTagName("tbody")[0];
    let newRow = yearOverviewTableBody.insertRow();
    let newYear = newRow.insertCell();
    let newWork = newRow.insertCell();
    let newSick = newRow.insertCell();
    let newVacation = newRow.insertCell();
    let newGLAZ = newRow.insertCell();
    let newOvertime = newRow.insertCell();
    newYear.innerText = year;
    newWork.innerText = work;
    newSick.innerText = sick;
    newVacation.innerText = vacation;
    newGLAZ.innerText = glaz;
    newOvertime.innerText = overtime;
}

addYear(2022, 365, 0, 30, 0, "00h 00min Guthaben");
