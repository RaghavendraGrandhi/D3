<!DOCTYPE html>
<meta charset="utf-8">
<style>

svg {
  font: 10px sans-serif;
}
   body{
    text-align: center;
    background-image: url(../resources/images/livedatamap/sa10.png);
    background-repeat: no-repeat;
   
    background-position: center bottom;
    background-attachment: fixed;
  }

</style>
<body>
<%@ include file="extension-home.jsp" %>

<script type="text/javascript" src="../resources/js/bar-chart/jquery.js"></script>

<script src="../resources/js/d3.v3.min.js"></script>
<script src="../resources/js/treemap/tableau-extensions-1.latest.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.15/lodash.min.js"></script>
<script>
var columnsWithDataTypes;
$(document).ready(function () {
	
	tableau.extensions.initializeAsync({ 'configure': configure }).then(function () {

		dashboard = tableau.extensions.dashboardContent.dashboard;
		
		constructAdvancedChartDataWithPayLoad()
	
	
	});

});
function configure(){
	window.location.href = app_url + "trex/live-data-mapping";
}
function constructAdvancedChartDataWithPayLoad() {
	const payLoadString = tableau.extensions.settings.get("payLoad");
	let payLoad = JSON.parse(payLoadString);
	let worksheetName  = tableau.extensions.settings.get("worksheetName")
	console.log(payLoad)
		var data1 = [];
		var consolidateData = [];
		var list = [];
		var listSorted = [];
		var columnArray = [];
		columnsWithDataTypes = [];
	
		visualization_code = payLoad.visualizationCode;
		var worksheets = dashboard.worksheets;
		var dataSourceName = "";
		worksheet = worksheets.find(function (sheet) {
			sheet.getDataSourcesAsync().then(function (sumdata) {
				dataSourceName = sumdata[0].name;
			})
			return sheet.name === worksheetName;
		});
		var dataColumns = [];
	
		worksheet.getDataSourcesAsync().then(datasources => {
			dataSources1 = datasources.find(datasource => datasource.name === datasources[0].name);
			return dataSources1.getUnderlyingDataAsync();
		}).then(dataTable => {
			console.log(dataTable)
			let columns = dataTable.columns
			consolidateData[0] = [];
			$.each(payLoad.columns, function (j, k) {
	
				let arr = k.split("_");
				columnArray.push(arr[1]);
				columnsWithDataTypes.push(columns[arr[0]]);
				
			})
			
			$.each(dataTable.data, function (i, d) {
				list[i] = [];
				payLoad.columns.forEach(k=> {
					let arr = k.split("_");
					list[i].push(d[arr[0]].value);
				})
				
			})
			list = _.sortBy(list, list[0]);
				console.log(list)
				listSorted[0] = columnArray;
				list.forEach(l => listSorted.push(l))
				listSorted = listSorted.filter(e => (e != undefined && e != null))
				processData(listSorted)
		});
}
function processData(data) {
	var result = []
	$.each(data,function(i,d){
		if(i!=0){
			let obj = {
					origin:d[0],
					carrier:d[1],
					count:d[2]
			}
			result.push(obj);
		}
	});
	$.each(result,function(i,d){
		let count =0;
		let totalCount =0;
		$.each(result,function(k,n){
			if(d.origin == n.origin && d.carrier==n.carrier){
				count++;
			}
			if(d.origin == n.origin){
				totalCount++;
			}
			
		})
		d.count = count;
		//d.origin = d.origin+"("+totalCount+")";
	})
	
	result = _.uniqWith(result, _.isEqual);
	console.log(result);
	drawPieChart(result);
}
// Load the flight data asynchronously.
 function drawPieChart(response) {

	// Define the margin, radius, and color scale. Colors are assigned lazily, so
	// if you want deterministic behavior, define a domain for the color scale.
	var m = 10,
	    r = 100,
	    z = d3.scale.category20c();

	// Define a pie layout: the pie angle encodes the count of flights. Since our
	// data is stored in CSV, the counts are strings which we coerce to numbers.
	var pie = d3.layout.pie()
	    .value(function(d) { return +d.count; })
	    .sort(function(a, b) { return b.count - a.count; });

	// Define an arc generator. Note the radius is specified here, not the layout.
	var arc = d3.svg.arc()
	    .innerRadius(r / 2)
	    .outerRadius(r);
  // Nest the flight data by originating airport. Our data has the counts per
  // airport and carrier, but we want to group counts by aiport.
  var airports = d3.nest()
      .key(function(d) {  return d.origin; })
      .entries(response);
  console.log(airports);
  // Insert an svg element (with margin) for each airport in our dataset. A
  // child g element translates the origin to the pie center.
  var svg = d3.select("body").selectAll("div")
      .data(airports)
    .enter().append("div") // http://code.google.com/p/chromium/issues/detail?id=98951
      .style("display", "inline-block")
      .style("width", (r + m) * 2 + "px")
      .style("height", (r + m) * 2 + "px")
    .append("svg")
      .attr("width", (r + m) * 2)
      .attr("height", (r + m) * 2)
    .append("g")
      .attr("transform", "translate(" + (r + m) + "," + (r + m) + ")");
    var div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);
  // Add a label for the airport. The `key` comes from the nest operator.
  svg.append("text")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .text(function(d) { return d.key; });

  // Pass the nested per-airport values to the pie layout. The layout computes
  // the angles for each arc. Another g element will hold the arc and its label.
  var g = svg.selectAll("g")
      .data(function(d) { return pie(d.values) })
    .enter().append("g").on("mouseover", function(d) {
  	 
      div.transition()		
          .duration(200)		
          .style("opacity", .9);		
      div	.html(d.data.carrier + ": " + d.data.count)	
          .style("left", (d3.event.pageX) + "px")		
          .style("top", (d3.event.pageY - 28) + "px");	
      })					
  .on("mouseout", function(d) {		
      div.transition()		
          .duration(500)		
          .style("opacity", 0);	
  }).on("click", function(d) {		
      tabFilter(d)
});

  // Add a colored arc path, with a mouseover title showing the count.
  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return z(d.data.carrier); })
    .append("title")
      .text(function(d) { return d.data.carrier + ": " + d.data.count; });
      

  // Add a label to the larger arcs, translated to the arc centroid and rotated.
  g.filter(function(d) { return d.endAngle - d.startAngle > .2; }).append("text")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")rotate(" + angle(d) + ")"; })
      .text(function(d) { return d.data.carrier; });

  // Computes the label angle of an arc, converting from radians to degrees.
  function angle(d) {
    var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
    return a > 90 ? a - 180 : a;
  }
  function tabFilter(d) {
		console.log(d)
		tableau.extensions.initializeAsync().then(function () {
		      const dashboard = tableau.extensions.dashboardContent.dashboard;

		      // Then loop through each worksheet and get its filters, save promise for later.
		      dashboard.worksheets.forEach(function (worksheet) {
		        
		    	  worksheet.applyFilterAsync(d.data[0][1], [d.data.carrier],
				            tableau.FilterUpdateType.Replace);
		          /* worksheet.clearFilterAsync(data[0][1]).then(function(){
		        		
		          }) */

		      });


		    }, function (err) {
		      // Something went wrong in initialization.
		      console.log('Error while Initializing: ' + err.toString());
		    });
	}
};

</script>
</body>
