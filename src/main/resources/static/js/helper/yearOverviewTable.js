/**
 * Year Overview Functions
 * Adds data to the year overview table.
 * @param tableBodyName The name of the table the elements should be inserted in
 * @param yearRowData   An object containing the new row data
 */
function addYear(tableBodyName, yearRowData) {
    const yearOverviewTableBody = document.getElementById(tableBodyName).getElementsByTagName("tbody")[0];
    let newRow = yearOverviewTableBody.insertRow();
    let year = newRow.insertCell();
    let work = newRow.insertCell();
    let sick = newRow.insertCell();
    let availableVacation = newRow.insertCell();
    let approvedVacation = newRow.insertCell();
    let elapsedVacation = newRow.insertCell();
    let glaz = newRow.insertCell();
    let balance = newRow.insertCell();
    year.innerText = yearRowData.year;
    work.innerText = yearRowData.work;
    sick.innerText = yearRowData.sick;
    availableVacation.innerText = yearRowData.availableVacation;
    approvedVacation.innerText = yearRowData.approvedVacation;
    elapsedVacation.innerText = yearRowData.elapsedVacation;
    glaz.innerText = yearRowData.glaz;
    balance.innerText = yearRowData.balance;
}

function addAllYears(tableBodyName, years) {
    // go over each year
    for (let year in years) {
        console.log(years);
        const yearRowData = {
            year: year,
            work: years[year].workDay !== undefined ? years[year].workDay : 0,
            sick: years[year].sickDay !== undefined ? years[year].sickDay : 0,
            availableVacation: years[year].availableVacation !== undefined ? years[year].availableVacation : 0,
            approvedVacation: years[year].approvedVacation !== undefined ? years[year].approvedVacation : 0,
            elapsedVacation: years[year].elapsedVacation !== undefined ? years[year].elapsedVacation : 0,
            glaz: years[year].glazDay !== undefined ? years[year].glazDay : 0,
            balance: years[year].balance !== undefined ? years[year].balance : 0
        };
        addYear(tableBodyName, yearRowData);
    }
}