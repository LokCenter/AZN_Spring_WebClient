/**
 * set colors for the different occasion
 * @type {string} for hexCode
 */
const colorUrlaub = "#80aeff";
const colorKrank = "#ff7597";
const colorGLAZ = "#9aff8d";

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
    timeRangeSelectedHandling: "Enabled",
    onTimeRangeSelected: async (args) => {
        const modal = await DayPilot.Modal.form(form, data);
        const dp = args.control;
        dp.clearSelection();
        if (modal.canceled) {
            return;
        }
        dp.events.add({
            start: args.start,
            end: args.end,
            id: DayPilot.guid(),
            text: checkBackColor(modal.result.backColor),
            backColor: modal.result.backColor,
            barColor: modal.result.backColor,
            borderColor: modal.result.backColor,
        });
    },
    eventDeleteHandling: "Update",
    onEventDelete: (args) => {
        if (!confirm("Eintrag löschen?")) {
            args.preventDefault();
        } else {
            console.log(args.e.id());
        }
    },
    eventMoveHandling: "Update",
    onEventMove: (args) => {
        if (!confirm("Änderung speicher?")) {
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
    let finalDisplay = month + " " + year;
    document.getElementById("dateSwitchDate").innerText = finalDisplay;
}

updateTimeDisplay()