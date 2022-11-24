/**
 * set colors for the different occasion
 * @type {string} for hexCode
 */
const colorUrlaub = colors.colorVacation;
const colorKrank = colors.colorSick;
const colorGLAZ = colors.colorGLAZ;

/**
 * sets the available options of occasions to choose for the admin
 */
const selection = [
    {name: "Urlaub", id: colorUrlaub},
    {name: "Krank", id: colorKrank},
    {name: "GLAZ", id: colorGLAZ},
];

/**
 * set standard display value (on creation) for admin
 */
let selectionColor = colorUrlaub;

/**
 * returns a description depending on the color given
 */
function checkBackColor(color) {
    switch (color) {
        case colorUrlaub:
            return "Urlaub";
        case colorKrank:
            return "Krank";
        case colorGLAZ:
            return "GLAZ";
    }
}

const form = [
    {name: "Art des Eintrags", id: "backColor", type: "radio", options: selection},
];

const data = {
    backColor: selectionColor,
};

const dp = new DayPilot.Month("dp", {
    locale: "de-de",
    viewType: "Month",
    showWeekend: true,
    timeRangeSelectedHandling: "Disabled",
    eventDeleteHandling: "Update",
    onEventDelete: (args) => {
        if (!confirm("Eintrag löschen?")) {
            args.preventDefault();
        } else {
            console.log(args.e.id());
        }
    },
    eventResizeHandling: "Update",
    onEventResize: (args) => {
        if (!confirm("Änderung speicher?")) {
            args.preventDefault();
        } else {
            console.log(args.e.id());
        }
    },
    eventMoveHandling: "Disabled",
    eventClickHandling: "Disabled",
    eventHoverHandling: "Disabled",
});

dp.events.list = [
    {
        "start": "2022-07-14T00:00:00",
        "end": "2022-11-16T00:00:00",
        "id": "fbfe1a1b-f58f-5e2b-bf9b-03194c164fdf",
        "text": "Urlaub",
        "backColor": "#80aeff",
        "barColor": "#80aeff",
        "borderColor": "#80aeff",
    },
];

dp.init();

/**
 * When given a date, color the corresponding cell by adding a class.
 * @param date
 */
function colorCell(date) {
    const cellArray = document.getElementsByClassName("month_default_cell_inner");
    const cellCoords = dp.getCellFromDate(date);
    const cellX = cellCoords.x;
    const cellY = cellCoords.y;

    // Get the index for cellArray from the coordinates.
    function getIndex(x, y) { return x * 6 + y; }

    const cellIndex = getIndex(cellX, cellY);
    const cellToColor = cellArray[cellIndex];
    cellToColor.classList.add("month_default_cell_inner_colored");
}

const leftDaySwitch = document.getElementById("left-dayPlan-switch");
const rightDaySwitch = document.getElementById("right-dayPlan-switch");

/**
 * Display the previous month
 */
leftDaySwitch.addEventListener("click", (e) => {
    /**
     * remove a month to the startDate of the currently displayed calendar -> previous month will be displayed
     */
    dp.startDate = dp.startDate.addMonths(-1);
    dp.update();
    updateTimeDisplay();
    axios.get("http://localhost:8880/overview", {
        params: {
            start_date: dp.startDate.addDays(-7),
            end_date: dp.startDate.addDays(40)
        }
    }).then(async (res) => {
    }).catch((error) => {
        console.log(error)
    });
});

/**
 * Display the next month
 */
rightDaySwitch.addEventListener("click", (e) => {
    /**
     * add a month to the startDate of the currently displayed calendar -> next month will be displayed
     */
    dp.startDate = dp.startDate.addMonths(1);
    dp.update();
    updateTimeDisplay();
    axios.get("http://localhost:8880/overview", {
        params: {
            start_date: dp.startDate.addDays(-7),
            end_date: dp.startDate.addDays(40)
        }
    }).then(async (res) => {
    }).catch((error) => {
        console.log(error)
    });
});

updateTimeDisplay()

// Set color for legend
const legendColorGeneralHoliday = document.getElementById("colorGeneralHoliday");
legendColorGeneralHoliday.style.backgroundColor = colors.colorGeneralHoliday;
const legendColorVacationPending = document.getElementById("colorVacationPending");
legendColorVacationPending.style.backgroundColor = colors.colorVacationPending;
const legendColorVacation = document.getElementById("colorVacation");
legendColorVacation.style.backgroundColor = colors.colorVacation;
const legendColorGeneralVacation = document.getElementById("colorGeneralVacation");
legendColorGeneralVacation.style.backgroundColor = colors.colorGeneralVacation;
const legendColorGLAZPending = document.getElementById("colorGLAZPending");
legendColorGLAZPending.style.backgroundColor = colors.colorGLAZPending;
const legendColorGLAZ = document.getElementById("colorGLAZ");
legendColorGLAZ.style.backgroundColor = colors.colorGLAZ;
const legendColorSick = document.getElementById("colorSick");
legendColorSick.style.backgroundColor = colors.colorSick;

const createEventButton = document.getElementById("create-event-button");
createEventButton.addEventListener("click",() => {
    const modal = document.body.appendChild(document.createElement("div"));
    modal.classList.add("modal");

    modal.innerHTML =
        "<div class='modal__content'>" +
            "<div class='modal__header'>" +
                "<h2>Eintrag einfügen</h2>" +
                "<span id='close'>&times;</span>" +
            "</div>" +
            "<div class='modal__body'>" +
                "<form name='add-new-entry' action='' method=''>" +
                    "<div class='fieldset-container'>" +
                        "<fieldset>" +
                            "<legend>Art des Eintrags</legend>" +
                            "<div class='choice-container'>" +
                                "<input type='radio' name='radio-choice' id='radio-vacation' value='Urlaub' required>" +
                                "<label for='radio-vacation'>Urlaub</label>" +
                                "<input type='radio' name='radio-choice' id='radio-sick' value='Krank' required>" +
                                "<label for='radio-sick'>Krank</label>" +
                                "<input type='radio' name='radio-choice' id='radio-overtime' value='GLAZ' required>" +
                                "<label for='radio-overtime'>GLAZ</label>" +
                            "</div>" +
                        "</fieldset>" +
                    "</div>" +
                    "<div class='date-container'>" +
                        "<input type='date' id='date-start' name='date-start' required>" +
                        "<label for='date-start'>Startdatum</label>" +
                        "<input type='date' id='date-end' name='date-end' required>" +
                        "<label for='date-end'>Enddatum</label>" +
                    "</div>" +
                    "<div class='button-container'>" +
                        "<button type='submit' id='save-button'>Speichern</button>" +
                        "<button type='button' id='cancel-button'>Abbrechen</button>" +
                    "</div>" +
                "</form>" +
            "</div>" +
        "</div>";

    const saveButton = document.getElementById("save-button");
    saveButton.addEventListener("click", () => {
        console.log("Save");
    })

    // Close/Remove modal when clicking close/abbrechen/outside of modal__content
    const closeButton = document.getElementById("close");
    closeButton.addEventListener("click", () => {
        modal.remove();
    });

    const cancelButton = document.getElementById("cancel-button");
    cancelButton.addEventListener("click", () => {
        modal.remove();
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.remove();
        }
    });
});