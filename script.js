//this function gets the time and date, and appends it to the currentTime p tag
function getDateTime() {
    var now     = new Date(); 
    var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds(); 
    if(month.toString().length == 1) {
         month = '0'+month;
    }
    if(day.toString().length == 1) {
         day = '0'+day;
    }   
    if(hour.toString().length == 1) {
         hour = '0'+hour;
    }
    if(minute.toString().length == 1) {
         minute = '0'+minute;
    }
    if(second.toString().length == 1) {
         second = '0'+second;
    }   
    var dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;   
     return dateTime;
}


setInterval(function(){
    currentTime = getDateTime();
    document.getElementById("currentDay").innerHTML = currentTime
}, 1000);
//variable currentHour stores current hour to later be used in logical comparison
var currentHour = moment().hour();
//setting arrays for dynamic population
var containerMain =$(".container");
var workHours = [
    "9AM",
    "10AM",
    "11AM",
    "12PM",
    "1PM",
    "2PM",
    "3PM",
    "4PM",
    "5PM",
];
var hoursValue= [
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
];
//dynamically populates rows and appends them with divs, including buttons, text areas, etc
 for (var i = 0; i < workHours.length; i++) {
    
    var row = $('<row>');


    var col1 = $('<div>');

    var col2 = $('<textarea>');        
   
    var col3 = $('<button>');
    row.attr("id", hoursValue[i]);
    col1.text(workHours[i]);
    col3.text("save");
    row.attr("class", "row time-block");
    col1.attr("class", "col-sm-2 hour");
    col2.attr("class", "col-sm-8 description");
    col3.attr("class", "saveBtn col-sm-2");
   
   
    //appending all those columns to the row created

    row.append(col1);
    row.append(col2);
    row.append(col3);
    //appending the dynamic rows to the container
    containerMain.append(row);
    //testing current hour to the hours value on the planner, and changing attributes to reflect that
    if (hoursValue[i] > currentHour){
        col2.attr("class", "col-sm-8 description future");
    }
    else if (hoursValue[i] == currentHour){
        col2.attr("class", "col-sm-8 description present");
    }
    else{
        col2.attr("class", "col-sm-8 description past");
    }
    col2.text(localStorage.getItem(hoursValue[i]));
    
}
//this function on click saves all text area strings into local storage
$(document).on("click", ".saveBtn", function(event) {
    console.log(event);
    
    localStorage.setItem(
        $(event.target).parent().attr("id"), $(event.target).siblings(".description").val()
    );
   
});