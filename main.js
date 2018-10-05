window.onload = startup;
var divId = '#__content9-footer-text';



function fetchDetails(response){
  var punches = response.querySelectorAll("content properties");
  var lastIn = punches[punches.length -1];
  var workingHours = lastIn.querySelector('number').innerHTML;
  var punchType = Number.parseInt(lastIn.querySelector('Channel').innerHTML);
  var punchTime = new Date(lastIn.querySelector('Punchdate').innerHTML)

  if(punchType===1){
      var recur = setInterval(function(){
        try{
          let time = calculateTime(punchTime,workingHours);
          let timeString = time.getHours()+":"+time.getMinutes()+":"+time.getSeconds();
          var element = $(divId).text("current-time:   "+timeString);
        }catch(err){
          console.error(err)
        }
      },1000)

  }else{
    console.log(workingHours)
    var element = $(divId).text("current-time:   "+timeString);
  }


}
function calculateTime(punchTime,workingHours){
  var currentTime = new Date();
  var timeDifference = (currentTime - punchTime);
  var currentHours = new Date('1970-01-01 '+workingHours);
  currentHours = new Date(currentHours.getTime()+timeDifference)
  return currentHours;
}

function getTodaysDate(){
  var currentDate = new Date();
  var stringDate = '';
  stringDate+= currentDate.getFullYear();
  var month = currentDate.getMonth() +1;
  var date = currentDate.getDate();
  stringDate += (month<10)?'0'+month:month;
  stringDate += (date<10)?'0'+date:date;
  return stringDate;
}

function startup(){

  var startDate = getTodaysDate();
  var endDate = startDate;
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
