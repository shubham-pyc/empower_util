window.onload = setup;
window.onhashchange = hashChangeHandler;
var div1Id = '#__content9-footer-text';
var div2Id = '#__content11-footer-text';
var dayClock = null;
var employee = null;
var assistant = null;
var exceptionService = null;
var debug = false;
var hashes = {
  "home": "#Shell-home",
  "timesheet": "#TimeEntry-manage",
  "manageTimesheets":"#TimeEntry-manage&/detail/"
}

function hashChangeHandler() {
  var newHash = location.hash;
  switch (newHash) {
    case hashes['home']:
      if (debug) {
        console.warn("ON HOME PAGE");
      }
      break;
    case hashes['timesheet']:
      enhanceTimesheetMainPage();
      if (debug) {
        console.warn("ON TIMESHEET PAGE");
      }
      break;
    default:
      if (debug) {
        console.warn("NO Has Registered for", newHash);
      }
  }
  if(newHash.match(hashes["manageTimesheets"])){
    if( debug ) {
      enhanceTimesheetFormPage();
      console.warn( "inside manage timesheets" );
    }
  }

}

function fetchDetails(response) {
  var punches = response.querySelectorAll("content properties");
  var lastIn = punches[punches.length - 1];
  var workingHours = lastIn.querySelector('Workinghours').innerHTML;
  var totalWorkingHours = "00:00:00";

  var allSwipes = {};

  punches.forEach((swipe, index) => {
    if (!allSwipes[swipe.querySelector('Swipedate').innerHTML]) {
      allSwipes[swipe.querySelector('Swipedate').innerHTML] = swipe.querySelector('Workinghours').innerHTML;
      totalWorkingHours = addWorkingHours(totalWorkingHours, swipe.querySelector('Workinghours').innerHTML);
    }
  });

  var punchType = Number.parseInt(lastIn.querySelector('Channel').innerHTML);
  var punchTime = new Date(lastIn.querySelector('Punchdate').innerHTML)

  if (punchType === 1) {
    setInterval(function () {
      try {
        showTimesOnPage(punchTime, workingHours, totalWorkingHours);
      } catch (err) {
        console.error(err)
      }
    }, 1000)

  } else {
    console.log(workingHours)
    showTimesOnPage(punchTime, "00:00:00", totalWorkingHours);
  }
}

function showTimesOnPage(punchTime, workingHours, totalWorkingHours) {
  var univarsalDate = new Date('1970-01-01 00:00:00');
  univarsalDate.setMilliseconds(new Date() - punchTime);
  dayClock.update(addWorkingHours(univarsalDate, workingHours));
  $(div2Id).html("<span style='font-size: 0.865rem;'>Weeks Time : " + addWorkingHours(univarsalDate, totalWorkingHours) + '</span>');
}

function setup() {
  dayClock = new Clock();
  employee = new Employee();
  //assistant = new Assistant(employee);
  exceptionService = new ExceptionService();
  
  dayClock.show();
  employee.getDetails();

  var todaysDate = getTodaysFormatedDate();
  var prevMonday = getPreviousMonay(todaysDate);
  var startDate = formatDateForURI(prevMonday);
  var endDate = formatDateForURI(getTodaysFormatedDate());

  var employee = {
    id: null
  };
  var startUrl = "https://empower.impetus.co.in//sap/bc/ui2/start_up";

  try {
    $.ajax({
      type: 'GET',
      url: startUrl,
      success: (res) => {
        employee.id = res.id;
        var timeUrl = `https://empower.impetus.co.in/sap/opu/odata/sap/ZSMARTI_SWIPE_SRV/SmartiSwipeSet?&$filter=LoginId%20eq%20%27${employee.id}%27%20and%20Punchfromdate%20eq%20%27${startDate}%27%20and%20Punchenddate%20eq%20%27${endDate}%27%20&$orderby=Swipedate`

        if (employee.id != null) {
          $.ajax({
            type: 'GET',
            url: timeUrl,
            success: fetchDetails,
            error: (err) => console.error(err)
          })
        }
      },
      error: (err) => console.error(err)
    })
  } catch (err) {
    console.error(err);
  }
}