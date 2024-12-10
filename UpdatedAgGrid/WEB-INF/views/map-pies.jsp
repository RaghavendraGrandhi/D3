<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page isELIgnored="false"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link rel="stylesheet" href="resources/bootstrap-modal-popup/bootstrap.min.css">
<link rel="stylesheet" href="resources/css/animate.min.css">
<title>State wise WSE report</title>
<style type="text/css">
.col{width: 1000px;}
iframe{
	margin: 0 auto;
}
[class*="highcharts-name"] {
  fill: #89c9ce;
}
[class*="highcharts-name"]:hover {
  fill: #ec8a2587;
}

.container1, .container2 {
    width: 500px;
    position: relative;
    -webkit-perspective: 800px;
    -moz-perspective: 800px;
    -o-perspective: 800px;
    perspective: 800px;
}
.card {
    width: 100%;
    height: 100%;
    position: absolute;
    -webkit-transition: -webkit-transform 1s;
    -moz-transition: -moz-transform 1s;
    -o-transition: -o-transform 1s;
    transition: transform 1s;
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    -o-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -webkit-transform-origin: 50% 50%;
}
.card div {
    display: block;
    height: 100%;
    width: 100%;
    line-height: 260px;
    color: white;
    text-align: center;
    font-weight: bold;
    font-size: 140px;
    position: absolute;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -o-backface-visibility: hidden;
    backface-visibility: hidden;
}
.card .front {
  background: #fff;
}
.card .back {
    background: #fff;
    -webkit-transform: rotateY( 180deg );
    -moz-transform: rotateY( 180deg );
    -o-transform: rotateY( 180deg );
    transform: rotateY( 180deg );
}
.card.flipped {
    -webkit-transform: rotateY( 180deg );
    -moz-transform: rotateY( 180deg );
    -o-transform: rotateY( 180deg );
    transform: rotateY( 180deg );
}
</style>
</head>
<body>
	<a href="/trinet" style="float: left;">Go Home</a><br>
	<br>

	<div class="form-inline" style="margin-left: 30px;">
		<label class="radio-inline"> 
			<input type="radio" name="report-filterA" value="client"  checked="true" onchange="flipA()" >
			Client
		</label>
		<label class="radio-inline"> 
			<input type="radio" name="report-filterA" value="wse" onchange="flipA()">
			WSE
		</label>
	</div>

	<div style="min-width: 1800px; display: flex;height: 670px;" class="container">
		<div>
			<div class="container1">
				<div class="card" onclick="flipA()">
					<div class="front" style="width: 480px" id="viz1"></div>
					<div class="back" style="width: 480px" id="viz2"></div>
				</div>
			</div>
		</div>
		<div class="col">
			<div id="container"></div>
		</div>
		<div style="width: 1700px"><div id="viz3"></div></div>
	</div>
	<div>
		<div class="form-inline" style="margin-left: 30px;">
			<label class="radio-inline"> 
			<input type="radio"	name="report-filterB" value="client" checked="true" onchange="flipB()">
				Trinet Optys
			</label> <label class="radio-inline"> 
			<input type="radio"	name="report-filterB" value="wse" onchange="flipB()"> Census Data
			</label>
		</div>
		<div class="container2">
			<div class="card" onclick="flipB()">
				<div class="front" id="viz4"></div>
				<div class="back" id="viz5"></div>
			</div>
		</div>
	</div>
</body>
<!-- <script src="https://code.jquery.com/jquery-2.1.4.min.js"></script> -->
<script src="resources/js/jquery-2.2.4.min.js"></script>
<script src="https://cdn.rawgit.com/nnattawat/flip/master/dist/jquery.flip.min.js"></script>

<script src="resources/js/high-charts/proj4.js"></script>
<script src="resources/js/high-charts/highcharts.js"></script>
<script src="resources/js/high-charts/map.js"></script>
<script src="resources/js/high-charts/exporting.js"></script>
<script src="resources/js/high-charts/us-all.js"></script>

<script src="resources/js/d3.v3.min.js" charset="utf-8"></script>
<script src="resources/js/word-count/d3.layout.cloud.js"></script>
<script src="resources/js/word-count/d3.wordcloud.js"></script>
<script src='resources/js/treemap/tableau-2.js'></script>

<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/0.9.0rc1/jspdf.min.js"></script> -->

<script type="text/javascript">

function flipA() {
    $('.container1 > .card').toggleClass('flipped');
}
function flipB() {
    $('.container2 > .card').toggleClass('flipped');
}

function save(){
	$('#secondDiv').html('');
	var v = $('#all-report').html();
	$('#secondDiv').append(v);
}
//New map-pie series type that also allows lat/lon as center option.
//Also adds a sizeFormatter option to the series, to allow dynamic sizing
//of the pies.
Highcharts.seriesType('mappie', 'pie', {
 center: null, // Can't be array by default anymore
 clip: true, // For map navigation
 states: {
     hover: {
         halo: {
             size: 5
         }
     }
 },
 dataLabels: {
     enabled: false
 }
}, {
 getCenter: function () {
     var options = this.options,
         chart = this.chart,
         slicingRoom = 2 * (options.slicedOffset || 0);
     if (!options.center) {
         options.center = [null, null]; // Do the default here instead
     }
     // Handle lat/lon support
     if (options.center.lat !== undefined) {
         var point = chart.fromLatLonToPoint(options.center);
         options.center = [
             chart.xAxis[0].toPixels(point.x, true),
             chart.yAxis[0].toPixels(point.y, true)
         ];
     }
     // Handle dynamic size
     if (options.sizeFormatter) {
         options.size = options.sizeFormatter.call(this);
     }
     // Call parent function
     var result = Highcharts.seriesTypes.pie.prototype.getCenter.call(this);
     // Must correct for slicing room to get exact pixel pos
     result[0] -= slicingRoom;
     result[1] -= slicingRoom;
     return result;
 },
 translate: function (p) {
     this.options.center = this.userOptions.center;
     this.center = this.getCenter();
     return Highcharts.seriesTypes.pie.prototype.translate.call(this, p);
 }
});



var data = [
	// state, Active, Deceased, Leave, Leave W/Py, Term w/Pay, Terminated, sum, winner
	['AK', 0, 0, 0, 0, 0, 111, 111, -1], 
	['AL', 62, 2, 0, 0, 0, 978, 1042 -1], 
	['AR', 35, 0, 0, 0, 0, 429, 464 -1],  
	['AZ', 1503, 7, 4, 0, 0, 5922, 7436 -1],  
	['CA', 102143, 371, 576, 173, 36, 314370, 417669 -1], 
	['CO', 6923, 44, 15, 6, 3, 35527, 42518 -1], 
	['CT', 3839, 10, 13, 3, 15, 8345, 12225 -1],  
	['DC', 1975, 4, 7, 5, 3, 5041, 7035 -1],  
	['DE', 753, 2, 2, 1, 1, 988, 1747, -1],
	['FL', 35856, 228, 133, 19, 10, 113652, 149898, -1],
	['GA', 8776, 37, 34, 5, 8, 24903, 33763, -1],
	['HI', 64, 0, 0, 0, 0, 858, 922, -1],
	['IA', 92, 1, 0, 0, 0, 283, 376, -1],
	['ID', 174, 0, 0, 0, 0, 229, 403, -1],
	['IL', 6205, 12, 8, 5, 12, 10608, 16850, -1],
	['IN', 478, 3, 1, 0, 0, 1679, 2161, -1],
	['KS', 251, 1, 0, 0, 0, 341, 593, -1],
	['KY', 94, 2, 1, 0, 0, 148, 245, -1],
	['LA', 248, 2, 0, 0, 0, 809, 1059, -1],
	['MA', 8771, 36, 20, 13, 14, 24565, 33419, -1],
	['MD', 1151, 6, 5, 4, 0, 3329, 4495, -1],
	['ME', 24, 0, 0, 0, 0, 174, 198, -1],
	['MI', 517, 3, 1, 1, 1, 1528, 2051, -1],
	['MN', 313, 1, 4, 0, 0, 1072, 1390, -1],
	['MO', 1646, 3, 8, 2, 0, 2226, 3885, -1],
	['MS', 64, 0, 0, 1, 0, 158, 223, -1],
	['MT', 231, 1, 0, 0, 2, 398, 632, -1],
	['NC', 7248, 20, 23, 1, 4, 13319, 20615, -1],
	['ND', 0, 0, 0, 0, 0, 53, 53, -1],
	['NE', 26, 0, 0, 0, 0, 288, 314, -1],
	['NH', 419, 1, 0, 1, 0, 2986, 3407, -1],
	['NJ', 7391, 23, 27, 4, 17, 16651, 24113, -1],
	['NM', 154, 2, 0, 0, 0, 1426, 1582, -1],
	['NV', 1586, 4, 7, 0, 2, 3787, 5386, -1],
	['NY', 70983, 90, 228, 87, 118, 127742, 199248, -1],
	['OH', 946, 5, 4, 0, 1, 2178, 3134, -1],
	['OK', 898, 3, 0, 0, 2, 2571, 3474, -1],
	['OR', 733, 2, 1, 0, 0, 2766, 3502, -1],
	['PA', 1490, 4, 6, 2, 1, 5232, 6735, -1],
	['RI', 69, 1, 0, 0, 0, 1446, 1516, -1],
	['SC', 1959, 3, 10, 5, 0, 2154, 4131, -1],
	['SD', 2, 0, 0, 0, 0, 138, 140, -1],
	['TN', 2617, 6, 11, 2, 0, 3418, 6054, -1],
	['TX', 21533, 121, 55, 17, 4, 83992, 105722, -1],
	['UT', 547, 2, 1, 0, 1, 1453, 2004, -1],
	['VA', 3627, 20, 6, 2, 1, 10867, 14523, -1],
	['VT', 9, 1, 0, 0, 0, 291, 301, -1],
	['WA', 1220, 8, 2, 0, 2, 4532, 5764, -1],
	['WI', 700, 6, 6, 1, 0, 2770, 3483, -1],
	['WV', 120, 0, 2, 0, 0, 160, 282, -1],
	['WY', 38, 0, 0, 0, 0, 84, 122, 1]	
 ],
 maxVotes = 0,
activeColor = '#009688',
deceasedColor = '#FB8C00',
leaveColor = '#3cb7cc',
leaveWithoutPayColor = '#5D1F79';
termWithoutPayColor = '#1D0D48';
terminatedColor = '#aaa';



//Compute max votes to find relative sizes of bubbles
Highcharts.each(data, function (row) {
 maxVotes = Math.max(maxVotes, row[7]);
});

//Build the chart
var chart = Highcharts.mapChart('container', {
 title: {text: '' },

 chart: {
     animation: false // Disable animation, especially for zooming
 },
 credits: { enabled: false },
 exporting: { enabled: false },

 colorAxis: {
	  min: 0,
     dataClasses: [{
         from: -1,
         to: 0,
         color: activeColor,
         name: 'Active'
     }, {
         from: 0,
         to: 1,
         color: deceasedColor,
         name: 'Deceased'
     }, {
         from: 2,
         to: 3,
         name: 'Leave',
         color: leaveColor
     }, {
         from: 3,
         to: 4,
         name: 'Leave Without Pay',
         color: leaveWithoutPayColor
     },{
         from: 4,
         to: 5,
         name: 'Term_w/Pay',
         color: termWithoutPayColor
     },{
         from: 5,
         to: 6,
         name: 'Terminated',
         color: terminatedColor
     }]
 },

 mapNavigation: {
     enabled: true
 },
 // Limit zoom range
 yAxis: {
     minRange: 2300
 },

 tooltip: {
     useHTML: true
 },

 // Default options for the pies
 plotOptions: {
     mappie: {
         borderColor: 'rgba(255,255,255,0.4)',
         borderWidth: 1,
         tooltip: {
             headerFormat: ''
         }
     },
     series:{
         point:{
             events:{
                 click: function(){
                	 if(this.id!=null){
                		 tabFilter(this.id);
                	 }else{
                		 tabFilter(this.series.name);
                	 }
                    
                 }
             }
         }
     }
 },

 series: [{
     mapData: Highcharts.maps['countries/us/us-all'],
     data: data,
     name: 'States',
     borderColor: '#FFF',
     showInLegend: false,
     joinBy: ['postal-code', 'id'],
     // state, Active, Deceased, Leave, Leave W/Py, Term w/Pay, Terminated, sum, winner
     keys: ['id', 'Active', 'Deceased', 'Leave', 'Leave_W_Py', 'Term_w/Pay', 'Terminated', 'sum', 'winner'],
     tooltip: {
         headerFormat: '',
         pointFormatter: function () {
             var hoverVotes = this.hoverVotes; // Used by pie only
             return '<b>' + this.id + ' WSE</b><br/>' +
                 Highcharts.map([
                     ['Active', this.Active, activeColor],
                     ['Deceased', this.Deceased, deceasedColor],
                     ['Leave', this.Leave, leaveColor],
                     ['Leave Without Pay', this.Leave_W_Py, leaveWithoutPayColor],
                     ['Term Without Pay', this.Term_W_Py, termWithoutPayColor],
                     ['Terminated', this.Terminated, terminatedColor]
                 ].sort(function (a, b) {
                     return b[1] - a[1]; // Sort tooltip by most votes
                 }), function (line) {
                     return '<span style="color:' + line[2] +
                         // Colorized bullet
                         '">\u25CF</span> ' +
                         // Party and votes
                         (line[0] === hoverVotes ? '<b>' : '') +
                         line[0] + ': ' +
                         Highcharts.numberFormat(line[1], 0) +
                         (line[0] === hoverVotes ? '</b>' : '') +
                         '<br/>';
                 }).join('') +
                 '<hr/>Total: ' + Highcharts.numberFormat(this.sum, 0);
         }
     }
 }, {
     name: 'Separators',
     type: 'mapline',
     data: Highcharts.geojson(Highcharts.maps['countries/us/us-all'], 'mapline'),
     color: '#707070',
     showInLegend: false,
     enableMouseTracking: false
 }, {
     name: 'Connectors',
     type: 'mapline',
     color: 'rgba(130, 130, 130, 0.5)',
     zIndex: 5,
     showInLegend: false,
     enableMouseTracking: false
 }]
});

//When clicking legend items, also toggle connectors and pies
Highcharts.each(chart.legend.allItems, function (item) {
 var old = item.setVisible;
 item.setVisible = function () {
     var legendItem = this;
     old.call(legendItem);
     Highcharts.each(chart.series[0].points, function (point) {
         if (chart.colorAxis[0].dataClasses[point.dataClass].name === legendItem.name) {
             // Find this state's pie and set visibility
             Highcharts.find(chart.series, function (item) {
                 return item.name === point.id;
             }).setVisible(legendItem.visible, false);
             // Do the same for the connector point if it exists
             var connector = Highcharts.find(chart.series[2].points, function (item) {
                 return item.name === point.id;
             });
             if (connector) {
                 connector.setVisible(legendItem.visible, false);
             }
         }
     });
     chart.redraw();
 };
});

//Add the pies after chart load, optionally with offset and connectors
Highcharts.each(chart.series[0].points, function (state) {
 if (!state.id) {
     return; // Skip points with no data, if any
 }

 var pieOffset = state.pieOffset || {},
     centerLat = parseFloat(state.properties.latitude),
     centerLon = parseFloat(state.properties.longitude);

 // Add the pie for this state
 chart.addSeries({
     type: 'mappie',
     name: state.id,
     zIndex: 6, // Keep pies above connector lines
     sizeFormatter: function () {
         var yAxis = this.chart.yAxis[0],
             zoomFactor = (yAxis.dataMax - yAxis.dataMin) /
                 (yAxis.max - yAxis.min);
         /* return Math.max(
             this.chart.chartWidth / 45 * zoomFactor,
            this.chart.chartWidth / 11 * zoomFactor * state.sum / maxVotes
         ); */
         return Math.max(25,25);
     },
     tooltip: {
         // Use the state tooltip for the pies as well
         pointFormatter: function () {
             return state.series.tooltipOptions.pointFormatter.call({
                 id: state.id,
                 hoverVotes: this.name,
                 Active: state.Active,
                 Deceased: state.Deceased,
                 Leave: state.Leave,
                 Leave_W_Py: state.Leave_W_Py,
                 Term_W_Py: state.Term_W_Py,
                 Terminated: state.Terminated,
                 sum: state.sum
             });
         }
     },
     data: [{
         name: 'Active',
         y: state.Active,
         color: activeColor
     }, {
         name: 'Deceased',
         y: state.Deceased,
         color: deceasedColor
     }, {
         name: 'Leave',
         y: state.Leave,
         color: leaveColor
     }, {
         name: 'Leave Without Pay',
         y: state.grnVotes,
         color: leaveWithoutPayColor
     }],
     center: {
         lat: centerLat + (pieOffset.lat || 0),
         lon: centerLon + (pieOffset.lon || 0)
     }
 }, false);

 // Draw connector to state center if the pie has been offset
 if (pieOffset.drawConnector !== false) {
     var centerPoint = chart.fromLatLonToPoint({
             lat: centerLat,
             lon: centerLon
         }),
         offsetPoint = chart.fromLatLonToPoint({
             lat: centerLat + (pieOffset.lat || 0),
             lon: centerLon + (pieOffset.lon || 0)
         });
     chart.series[2].addPoint({
         name: state.id,
         path: 'M' + offsetPoint.x + ' ' + offsetPoint.y +
             'L' + centerPoint.x + ' ' + centerPoint.y
     }, false);
 }
});
//Only redraw once all pies and connectors have been added
chart.redraw();
 populateViz("https://tableau-corp-dev.trinet.com/t/TRINET-DEV1/views/MapChart-CPQ/1stViz_1","viz1", '100%', '657px');
populateViz("https://tableau-corp-dev.trinet.com/t/TRINET-DEV1/views/MapChart-CPQ/2ndViz","viz2", '100%', '657px');
populateViz3("https://tableau-corp-dev.trinet.com/t/TRINET-DEV1/views/MapChart-CPQ/3rdViz","viz3", '100%', '657px');
populateViz("https://tableau-corp-dev.trinet.com/t/TRINET-DEV1/views/WDCINDUSTRYDATA/WDCINDUSTRYDATA","viz5", '1840px', '394px');
populateViz("https://tableau-corp-dev.trinet.com/t/TRINET-DEV1/views/MapChart-CPQ/4thViz","viz4", '1840px', '394px'); 

var viz, workbook;
function populateViz(url,divId, width_, height_){
	var vizDiv = document.getElementById(divId);
	var vizURL = url;
	var options = {
		width : width_,
		height : height_,
		hideToolbar : true,
		hideTabs : true,
		onFirstInteractive : function() {
			workbook = viz.getWorkbook();
		}
	};
	viz = new tableauSoftware.Viz(vizDiv, vizURL, options);
}


var viz3,workbook3;
function populateViz3(url,divId, width_, height_){
	var vizDiv = document.getElementById(divId);
	var vizURL = url;
	var options = {
		width : width_,
		height : height_,
		hideToolbar : true,
		hideTabs : true,
		onFirstInteractive : function() {
			workbook3 = viz3.getWorkbook();
		}
	};
	viz3 = new tableauSoftware.Viz(vizDiv, vizURL, options);
}
function tabFilter(d) {
workbook.changeParameterValueAsync('filterInput', d);
	workbook3.changeParameterValueAsync('filterInput', d);
	animateByType("slideInUp","viz3");
}
function animateByType(type,divId) {
    $('#'+divId).removeClass().addClass(type + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
      $(this).removeClass();
    });
  };
		
	</script>
</html>