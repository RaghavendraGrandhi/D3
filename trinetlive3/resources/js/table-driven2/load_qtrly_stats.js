// Define dimensions of the plot
var margin = {top: 120, right: 60, bottom: 60, left: 180};
var height = 500; 
var width = 960;

// Define the transition duration
var transDur = 500;

// Set up a global variable for the names of the stats reported here
// (in hopes of making it easier to keep line colors consistent
var reportStats = [];
var stats;

var data = "";
$(document).ready(function(){
	plotChart();
});
function plotChart(){
	$('#mask').mask("Please Wait...");
	// Load in the CRD quarterly stats table
	var date = $('#dates option:selected').val();
	if(date==undefined){
		date = "";
	}
	d3.json("get-table-driven-data?date="+date, function(data) {
		console.log(data)
		$('#table').html('');
		$('#plot').html('');
		var list = data.list;
	    // Format the variables as neeeded
		list.forEach(function(d) {
	        d.stat_name = d.name;
	        d.datestring = d.hours;
	        d.qtr_result = +d.recordsProcessed;
	    });
	    // Assign the data outside of the function for later use
	    stats = list;
	    addDates(data.dates);
	    // Load the initial stats table
	    makeMultiTable(stats);
	    // Make a vector for all of the stats, so that plot attributes can be
	    // kept consistent - probably a better way to do this.
	    d3.selectAll("tbody tr")
	        .each(function(d) { reportStats.push(d.key); });
	    // Setup the line plot
	    //setupPlot(height, width, margin);

	    $('#mask').unmask();
	});

}

function addDates(dates){
	  var x = document.getElementById("dates");
	    for(var i in dates){
	        var option = document.createElement("option");
	        option.text = dates[i];
	        x.add(option);
	    }


}

function GetUnique(inputArray){
	var outputArray = [];
	for (var i = 0; i < inputArray.length; i++) {
		if ((jQuery.inArray(inputArray[i].name, outputArray)) == -1) {
			outputArray.push(inputArray[i].name);
		}
	}
	return outputArray;
}

function getDates(inputArray) {
	var outputArray = [];
	for (var i = 0; i < inputArray.length; i++) {
		if ((jQuery.inArray(inputArray[i].date, outputArray)) == -1) {
			outputArray.push(inputArray[i].date);
		}
	}
	return outputArray;
}

function updateChart(){
	plotChart();
	
}


