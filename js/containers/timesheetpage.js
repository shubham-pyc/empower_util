function enhanceTimesheetMainPage() {
    applyListererToSubmitButton();
}

function enhanceTimesheetFormPage() {
    try {
        assistant.injectTimesheetAssistant();
    } catch (error) {
        if (debug) {
            console.error(error);
        }
    }
}

function applyListererToSubmitButton() {
    var buttonElement = $(".sapMBtnContent:contains(Create)");
    if (buttonElement.length) {
        buttonElement.on('click', function () {
            try {
                if (debug) {
                    console.warn("Create Button Clicked");
                }
            } catch (error) {
                if (debug) {
                    console.error(error);
                }
            }
        })
    }
}