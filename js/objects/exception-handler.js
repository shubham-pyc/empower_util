function ExceptionService() {
    this.debug = false;
    this.reportException = function (error) {
        try {
            var methodName = arguments.caller.callee;
            if (this.debug) {
                console.error(error);
            }
        }catch(e){

        }
        
    }
}