var Duration = require('duration');

function calculateTimeDifferance(unixTimeStamp){
var postedDate = new Date(unixTimeStamp*1000);
var currentDate = new Date();
var passedDuration = new Duration(postedDate,currentDate);
var timeago = showAppropriateUnite(passedDuration);
return `${timeago.time} ${timeago.unit} ago`;
}


function showAppropriateUnite(passedTime){
   var time ;
   var unit;
   var timeObject = {};
    
   switch(true){
   case passedTime.years>=1:
   time = passedTime.years;
   unit = 'year';
   break;
   
   case passedTime.months>=1:
   time = passedTime.months;
   unit = 'month'
   break;

   case passedTime.days>=1:
   time = passedTime.days;
   unit = 'day';
   break;
   
   case passedTime.hours>=1:
   time = passedTime.hours;
   unit = 'hour'
   break;    
   
   
   default:
      time=passedTime.minutes;
      unit = 'minute'
     break;  
    }
   timeObject.time = time;
   timeObject.unit = unit;
  
  return timeObject;
}


export default calculateTimeDifferance;