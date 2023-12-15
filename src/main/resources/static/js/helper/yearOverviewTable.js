/**
 * Year Overview Functions
 * Adds data to the year overview table.
 * @param year
 * @param work
 * @param sick
 * @param availableVacation
 * @param approvedVacation
 * @param elapsedVacation
 * @param glaz
 * @param overtime
 * @param tableBodyName
 */
function addYear(year, work, sick, availableVacation,  approvedVacation, elapsedVacation, glaz, overtime, tableBodyName) {
    const yearOverviewTableBody = document.getElementById(tableBodyName).getElementsByTagName("tbody")[0];
    let newRow = yearOverviewTableBody.insertRow();
    let newYear = newRow.insertCell();
    let newWork = newRow.insertCell();
    let newSick = newRow.insertCell();
    let newAvailableVacation = newRow.insertCell();
    let newApprovedVacation = newRow.insertCell();
    let newElapsedVacation = newRow.insertCell();
    let newGLAZ = newRow.insertCell();
    let newOvertime = newRow.insertCell();
    newYear.innerText = year;
    newWork.innerText = work;
    newSick.innerText = sick;
    newAvailableVacation.innerText = availableVacation;
    newApprovedVacation.innerText = approvedVacation;
    newElapsedVacation.innerText = elapsedVacation;
    newGLAZ.innerText = glaz;
    newOvertime.innerText = overtime;
}