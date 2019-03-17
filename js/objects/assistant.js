function Assistant(employee) {

    this.currentDate = null;
    this.isInserted = false;
    this.buttonId = "#timesheetUpdate"
    this.updateButton = null;
    this.currentDate = null;
    this.employee = employee;

    this.updateCurrentDateHandler = (currentDate) => {
        this.updateButton.attr('data', currentDate);
        this.currentDate = new Date(currentDate);
        this.currentDate = formatDateForURI(this.currentDate);
    }

    this.onClickHandler = () => {
        const SELECTED_DATE_CLASS = ".sapMeCalendarSelected";
        try {
            var selectedDates = [];
            var selectedElements = $(SELECTED_DATE_CLASS)
            if (selectedElements.length) {
                selectedElements.each(function (index, element) {
                    element = $(element);
                    var selectedDate = element.find('input').attr('value');
                    selectedDate = formatDateForURI(selectedDate);
                    selectedDates.push(selectedDate);
                })
            }
            var startDate = selectedDates[0];
            var endDate = selectedDates[selectedDates.length - 1];
            employee.getWorkingHoursBetween(startDate, endDate, function (response) {
                try {
                    var workingHours = formatAndGetWorkingHours(response);
                    if (debug) {
                        console.warn(workingHours);
                    }
                    var averageWorkingHours = workingHours.averageWorkingHours;
                    $("input[id$=decimalTimeEntryValue-inner]").attr('value', averageWorkingHours);
                } catch (error) {
                    if (debug) {
                        console.error(error);
                    }
                }
            })
        } catch (error) {
            if (debug) {
                console.error(error);
            }
        }

    }

    this.injectTimesheetAssistant = function () {

        try {

            var divId = ".sapMBarRight";

            this.updateButton = create({
                "node": "button",
                "class": "sapMBarChild sapMBtn sapMBtnBase",
                "aid": this.buttonId,
                "eclick": this.onClickHandler
            });
            var lowerSpan = create({
                "node": "span",
                "class": "sapMBtnEmphasized sapMBtnInner sapMBtnText"
            });
            var textSpan = create({
                "node": "span",
                "class": "sapMBtnContent",
                "html": "Update"
            });
            lowerSpan.append(textSpan);
            this.updateButton.append(lowerSpan);
            $(divId).prepend(this.updateButton);
            this.isInserted = true;

        } catch (error) {
            if (debug) {
                console.error(error);
            }
        }

    }
}