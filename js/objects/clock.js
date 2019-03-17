//Clock Element
function Clock() {
    this.timeElements = [];
    this.delimiter = ":";
    this.constructClock = function () {
        this.timeElements = create({
            "node":"div",
            "class":"clock-box p-1",
            "html":"00:00:00"
        })

        var mainDiv = create({
            "node": "div",
            "class": "clock row p-1",
            "child": [this.timeElements]
        });

        return mainDiv;
    }
    this.clock = this.constructClock();

    //Used to update the time for the clock
    //@params in format hh:mm:ss delimiter can be set
    this.update = function (time) {
        this.timeElements.text(time);
    }
    this.show = function(){
        $("body").append(this.clock);
    }
}