/**
 * Year Overview Functions
 */
/**
 * Adds data to the year overview table in the modal.
 * @param year
 * @param work
 * @param sick
 * @param vacation
 * @param glaz
 * @param overtime
 * @param tableBodyName
 */
function addYear(year, work, sick, vacation, glaz, overtime, tableBodyName) {
    const yearOverviewTableBody = document.getElementById(tableBodyName).getElementsByTagName("tbody")[0];
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