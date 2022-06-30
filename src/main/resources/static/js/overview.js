const dp = new DayPilot.Month("dp", {
    locale: "de-de",
    viewType: "Month",
    showWeekend: true,
    timeRangeSelectedHandling: "Enabled",
    onTimeRangeSelected: async (args) => {
        const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
        const dp = args.control;
        dp.clearSelection();
        if (modal.canceled) { return; }
        dp.events.add({
            start: args.start,
            end: args.end,
            id: DayPilot.guid(),
            text: modal.result
        });
    },
    eventDeleteHandling: "Update",
    onEventDeleted: (args) => {
        console.log(args.e.id());
    },
    eventMoveHandling: "Update",
    onEventMoved: (args) => {
        console.log(args.e.id());
    },
    eventResizeHandling: "Update",
    onEventResized: (args) => {
        console.log(args.e.id());
    },
    eventClickHandling: "Disabled",
    eventHoverHandling: "Disabled",
});
dp.events.list = [];
dp.init();

function previousMonth() {
    dp.startDate = dp.startDate.addMonths(-1);
    dp.update();
    updateTimeDisplay();
}

function nextMonth() {
    dp.startDate = dp.startDate.addMonths(1);
    dp.update();
    updateTimeDisplay();
}

function updateTimeDisplay() {
    let timeDisplay = dp.startDate.value;
    let year = timeDisplay.slice(0, 4);
    let month = timeDisplay.slice(5,7);
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