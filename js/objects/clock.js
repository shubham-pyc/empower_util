//Clock Element
function Clock() {
    this.timeElements = [];
    this.delimiter = ":";
    this.constructClock = function () {
        try {
            this.timeElements = create({
                "node": "div",
                "class": "clock-box p-1",
                "html": "00:00:00"
            })

            var mainDiv = create({
                "node": "div",
                "class": "clock row p-1",
                "child": [this.timeElements]
            });
            return mainDiv;
        } catch (error) {
            if (exceptionService) {
                exceptionService.reportException(error);
            }
        }
        return null;


    }
    this.clock = this.constructClock();

    //Used to update the time for the clock
    //@params in format hh:mm:ss delimiter can be set
    this.update = function (time) {
        try {
            this.timeElements.text(time);
        } catch (error) {
            if (exceptionService) {
                exceptionService.reportException(error);
            }
        }
    }
    this.show = function () {
        try {
            $("body").append(this.clock);
        } catch (error) {
            if (exceptionService) {
                exceptionService.reportException(error);
            }
        }

    }
}