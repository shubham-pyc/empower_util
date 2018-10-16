window.onload = startup;
var div1Id = '#__content9-footer-text';
var div2Id = '#__content11-footer-text';


function fetchDetails(response){
  var punches = response.querySelectorAll("content properties");
  var lastIn = punches[punches.length -1];
  var workingHours = lastIn.querySelector('number').innerHTML;
  var totalWorkingHours = "00:00:00";

  var allSwipes = {};

  punches.forEach((swipe, index) => {
    if(!allSwipes[swipe.querySelector('Swipedate').innerHTML]){
      allSwipes[swipe.querySelector('Swipedate').innerHTML] = swipe.querySelector('number').innerHTML;
      totalWorkingHours = addWorkingHours(totalWorkingHours, swipe.querySelector('number').innerHTML);
    }
  });

  console.log("totalWorkingHours : "+totalWorkingHours);

  var punchType = Number.parseInt(lastIn.querySelector('Channel').innerHTML);
  var punchTime = new Date(lastIn.querySelector('Punchdate').innerHTML)

  if(punchType===1){
      setInterval(function(){
        try{
          showTimesOnPage(punchTime, workingHours, totalWorkingHours);
        }catch(err){
          console.error(err)
        }
      },1000)

  }else{
    console.log(workingHours)
    showTimesOnPage(punchTime, "00:00:00", totalWorkingHours);
  }
}

function showTimesOnPage(punchTime, workingHours, totalWorkingHours){
    //Show Todays Time
    let time = calculateTime(punchTime,workingHours);
    var todaysTime = time.getHours()+":"+time.getMinutes()+":"+time.getSeconds();

    //Show Week Time
    time = calculateTime(punchTime,totalWorkingHours); 
    $(div1Id).html("Todays Time : "+todaysTime);   
    $(div2Id).html("Weeks Time : "+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds());
}

function calculateTime(punchTime,workingHours){
  //console.log("workingHours : "+workingHours);
  var currentTime = new Date();
  var timeDifference = (currentTime - punchTime);
  var currentHours = new Date('1970-01-01 '+workingHours);
  currentHours = new Date(currentHours.getTime()+timeDifference)
  return currentHours;
}

function addWorkingHours(workingHour1,workingHour2){
  let workingHour1Arr = workingHour1.split(':');
  let workingHour2Arr = workingHour2.split(':');
  let resultWorkingHourArr= [];
  let carry = 0;

  for (let i = 2; i >= 0; i--) {
    let t = +workingHour1Arr[i]+ +workingHour2Arr[i];
    if(carry > 0)
        t += carry;

    if(t>= 60 && i > 0){
      resultWorkingHourArr[i] = t%60;
      carry = Math.floor(t/60);
    }else{
      resultWorkingHourArr[i] = t;
      carry = 0;
    }
  }
  return resultWorkingHourArr.join(":");
}

function getTodaysDate(startDate){
  var currentDate = startDate;
  var stringDate = '';
  stringDate+= currentDate.getFullYear();
  var month = currentDate.getMonth() +1;
  var date = currentDate.getDate();
  stringDate += (month<10)?'0'+month:month;
  stringDate += (date<10)?'0'+date:date;
  return stringDate;
}

function startup(){

  var todaysDate = new Date();
  todaysDate.setHours(24,0,0,0)
  //todaysDate.setDate(todaysDate.getDate() - 3);
  console.log("todaysDate : "+todaysDate);
  
  var endDate = getTodaysDate(todaysDate);
  console.log("endDate : "+endDate);

  var date = todaysDate;
  var day = date.getDay();
  var prevMonday = date;
  if(date.getDay() == 0){
    prevMonday.setDate(date.getDate() - 7);
  }
  else{
    prevMonday.setDate(date.getDate() - day);
  }
  console.log("prevMonday : "+prevMonday);
  var startDate = getTodaysDate(prevMonday);  

  var employee = {id:null};
  var startUrl = "https://empower.impetus.co.in//sap/bc/ui2/start_up";

  try{
    $.ajax({
      type:'GET',
      url:startUrl,
      success:(res)=>{
        employee.id = res.id;
        var timeUrl = `https://empower.impetus.co.in/sap/opu/odata/sap/ZSMARTI_SWIPE_SRV/SmartiSwipeSet?&$filter=LoginId%20eq%20%27${employee.id}%27%20and%20Punchfromdate%20eq%20%27${startDate}%27%20and%20Punchenddate%20eq%20%27${endDate}%27%20&$orderby=Swipedate`

        if(employee.id != null){
          $.ajax({
            type:'GET',
            url:timeUrl,
            success:fetchDetails,
            error:(err)=>console.error(err)
          })
        }
      },
      error:(err)=>console.error(err)
    })
  }
  catch(err){
    console.error(err);
  }
}
// function start(){
//   if(window.location.hash ==="#Shell-home"){
//
//   }
// }
