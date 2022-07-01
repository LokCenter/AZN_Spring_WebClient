const selection = [
    {name: "Urlaub", id: "#80aeff"},
    {name: "Krank", id: "#ff7597"},
    {name: "GLAZ", id: "#9aff8d"},
];

function checkBackColor(color) {
    switch (color) {
        case "#80aeff":
            return "Urlaub";
        case "#ff7597":
            return "Krank";
        case "#9aff8d":
            return "GLAZ";
    }
}

const form = [
    {name: "Test", id: "backColor", options: selection},
];

const data = {
    backColor: "#80aeff",
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
        });
    },
    eventDeleteHandling: "Update",
    onEventDeleted: (args) => {
        console.log(args.e.id());
    },
    eventMoveHandling: "Update",
    onEventMoved: (args) => {
        const data = args.e.data;
        console.log(data.start + " " + data.end);
    },
    eventResizeHandling: "Update",
    onEventResized: (args) => {
        const data = args.e.data;
        console.log(data);
    },
    eventClickHandling: "Update",
    onEventClick: async (args) => {
        const modal = await DayPilot.Modal.form(form, args.e.data);
        if (modal.canceled) {
            return;
        }
        args.e.text(checkBackColor(modal.result.backColor));
        dp.events.update(args.e);
    },
    eventHoverHandling: "Disabled",
});
dp.events.list = [];
dp.init();

function previousMonth(EventData) {
    dp.startDate = dp.startDate.addMonths(-1);
    dp.update();
    updateTimeDisplay();
}

function nextMonth(eventData) {
    dp.startDate = dp.startDate.addMonths(1);
    dp.update();
    updateTimeDisplay();
}

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
    document.getElementById("start").innerText = finalDisplay;
}

updateTimeDisplay()