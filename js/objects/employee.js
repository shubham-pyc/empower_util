function Employee() {
    this.emp = {
        "id": "",
        "email": "",
        "firstName": "",
        "lastName": ""
    }
    this.startUrl = "https://empower.impetus.co.in//sap/bc/ui2/start_up";

    this.getDetails = function () {

        try {
            fetch(this.startUrl).then((res) => {
                return res.json();
            }).then(({
                id,
                email,
                firstName,
                lastName
            }) => {
                this.emp.id = id;
                this.emp.email = email;
                this.emp.firstName = firstName;
                this.emp.lastName = lastName;
                console.warn(this.emp);
            })

        } catch (error) {
            if (exceptionService) {
                exceptionService.reportException(error);
            }
        }

    }
    this.getSwipeDetails = function (startDate, endDate) {
        var SWIPE_URL = `https://empower.impetus.co.in/sap/opu/odata/sap/ZSMARTI_SWIPE_SRV/SmartiSwipeSet?&$filter=LoginId%20eq%20%27${this.emp.id}%27%20and%20Punchfromdate%20eq%20%27${startDate}%27%20and%20Punchenddate%20eq%20%27${endDate}%27%20&$orderby=Swipedate`;

    }

    this.getWorkingHoursForDay = function (date, callback) {
        if (!this.emp.id) {
            return;
        }
        var SWIPE_URL = `https://empower.impetus.co.in/sap/opu/odata/sap/ZSMARTI_SWIPE_SRV/SmartiSwipeSet?&$filter=LoginId%20eq%20%27${this.emp.id}%27%20and%20Punchfromdate%20eq%20%27${date}%27%20and%20Punchenddate%20eq%20%27${date}%27%20&$orderby=Swipedate`;

        try {
            $.ajax({
                type: 'GET',
                url: SWIPE_URL,
                success: callback,
                error: (err) => {
                    if (exceptionService) {
                        exceptionService.reportException(error);
                    }
                }
            })
        } catch (error) {
            if (exceptionService) {
                exceptionService.reportException(error);
            }
        }
    }
    this.getWorkingHoursBetween = function (start, end, callback) {
        if (!this.emp.id) {
            return;
        }
        var SWIPE_URL = `https://empower.impetus.co.in/sap/opu/odata/sap/ZSMARTI_SWIPE_SRV/SmartiSwipeSet?&$filter=LoginId%20eq%20%27${this.emp.id}%27%20and%20Punchfromdate%20eq%20%27${start}%27%20and%20Punchenddate%20eq%20%27${end}%27%20&$orderby=Swipedate`;

        try {
            $.ajax({
                type: 'GET',
                url: SWIPE_URL,
                success: callback,
                error: (err) => {
                    if (exceptionService) {
                        exceptionService.reportException(error);
                    }
                }
            })
        } catch (error) {
            if (exceptionService) {
                exceptionService.reportException(error);
            }
        }

    }
}