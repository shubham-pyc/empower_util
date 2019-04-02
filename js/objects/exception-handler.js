function ExceptionService() {
    this.debug = true;
    this.reportException = function (error) {
        var methodName = arguments.caller.callee;
        if (this.debug) {
            console.error(error);
        }
    }
}