//Time formater
function convertToTimeString(date) {
  return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}


//Function to Add to times together;
function addWorkingHours(workingHour1, workingHour2) {
  if (workingHour1 instanceof Date)
    workingHour1 = convertToTimeString(workingHour1);
  if (workingHour2 instanceof Date)
    workingHour2 = convertToTimeString(workingHour2);

  let workingHour1Arr = workingHour1.split(':');
  let workingHour2Arr = workingHour2.split(':');
  let resultWorkingHourArr = [];
  let carry = 0;

  for (let i = 2; i >= 0; i--) {
    let t = +workingHour1Arr[i] + +workingHour2Arr[i];
    if (carry > 0)
      t += carry;

    if (t >= 60 && i > 0) {
      resultWorkingHourArr[i] = t % 60;
      carry = Math.floor(t / 60);
    } else {
      resultWorkingHourArr[i] = t;
      carry = 0;
    }
    if (resultWorkingHourArr[i] < 10)
      resultWorkingHourArr[i] = '0' + resultWorkingHourArr[i];
  }
  return resultWorkingHourArr.join(":");
}

function getPreviousMonay(todaysDate) {
  var day = todaysDate.getDay();
  var retValue = todaysDate;
  if (todaysDate.getDay() == 0) {
    retValue.setDate(todaysDate.getDate() - 6);
  } else {
    retValue.setDate(todaysDate.getDate() - (day - 1));
  }
  return retValue;
}


//Get today's Formated Date;
function formatDateForURI(startDate) {
  if (typeof startDate == "string") {
    startDate = new Date(startDate);
  }
  var currentDate = startDate;
  date
  var stringDate = '';
  stringDate += currentDate.getFullYear();
  var month = currentDate.getMonth() + 1;
  var date = currentDate.getDate();
  stringDate += (month < 10) ? '0' + month : month;
  stringDate += (date < 10) ? '0' + date : date;
  return stringDate;
}



//Today's Time at 12:00 AM;
function getTodaysFormatedDate() {
  var date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

function formatAndGetWorkingHours(response) {
  var retValue = {
    "allSwipes": "",
    "totalWorkingHours": "00:00:00",
    "averageWorkingHours": "00.00"
  }
  try {
    var punches = response.querySelectorAll("content properties");
    var allSwipes = {};
    var totalWorkingHours = "00:00:00";
    punches.forEach((swipe, index) => {
      if (!allSwipes[swipe.querySelector('Swipedate').innerHTML]) {
        allSwipes[swipe.querySelector('Swipedate').innerHTML] = swipe.querySelector('Workinghours').innerHTML;
        totalWorkingHours = addWorkingHours(totalWorkingHours, swipe.querySelector('Workinghours').innerHTML);
      }
    });
    retValue["allSwipes"] = allSwipes;
    retValue["totalWorkingHours"] = totalWorkingHours;
    retValue["averageWorkingHours"] = calculateAverageWorkingHours(totalWorkingHours,Object.keys(allSwipes).length);
  } catch (error) {
    if (debug) {
      console.error(error);
    }
  }
  return retValue;

}

function formatWorkingHoursForTimesheet(workingHours) {
  var times = workingHours.split(":");
  times.splice(-1);
  times[1] = Math.round(times[1] / 6);
  return times.join(".");
}

function calculateAverageWorkingHours(totalTime, days) {
  var retValue = "00.00";
  if (!days) {
    return retValue;
  }
  try {
    var totalTime = totalTime.split(":");
    var averageHours = +totalTime[0] / days;
    var extraMinutes = getDecimal(averageHours);
    averageHours = Number.parseInt(averageHours);
    var averageMinutes = Number.parseInt(extraMinutes * 60) + Number.parseInt(+totalTime[1] / days);
    retValue = [averageHours, averageMinutes, totalTime[2]].join(":")
    retValue = formatWorkingHoursForTimesheet(retValue);
  } catch (error) {
    if (debug) {
      console.error(error);
    }
  }
  return retValue;

}


function getDecimal(float) {
  var offset = Number.parseInt(float);
  var decimal = Math.round(float * 100) / 100;
  return decimal - offset;
}