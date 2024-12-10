<html>
<head>
<style>

.node {
  cursor: pointer;
}

.node circle {
  fill: #fff;
  stroke: steelblue;
  stroke-width: 1.5px;
}

.node text {
  font: 10px sans-serif;
}

.link {
  fill: none;
  stroke: #ccc;
  stroke-width: 1.5px;
  
/* #0095d3
#89cbdf
#6db33f
#387c2c
#006990 */
}

body {
	background-image: url(../texture-noise.png);
	background-color: #000000;
}

#chart, #header, #footer {
  position: absolute;
  top: 0;
}

#header, #footer {
  z-index: 1;
  display: block;
  font-size: 36px;
  font-weight: 300;
  text-shadow: 0 1px 0 #fff;
}

#header.inverted, #footer.inverted {
  color: #fff;
  text-shadow: 0 1px 4px #000;
}

#header {
  top: 80px;
  left: 140px;
  width: 1000px;
}

#footer {
  top: 680px;
  right: 140px;
  text-align: right;
}

rect {
  fill: none;
  pointer-events: all;
}

pre {
  font-size: 18px;
}

line {
  stroke: #000;
  stroke-width: 1.5px;
}

.string, .regexp {
  color: #f39;
}

.keyword {
  color: #00c;
}

.comment {
  color: #777;
  font-style: oblique;
}

.number {
  color: #369;
}

.class, .special {
  color: #1181B8;
}

a:link, a:visited {
  color: #000;
  text-decoration: none;
}

a:hover {
  color: #666;
}

.hint {
  position: absolute;
  right: 0;
  width: 1280px;
  font-size: 12px;
  color: #999;
}
#title {
	font-family: open-sans;
	font-style: normal;
	font-weight: 600;
	background-color: #222;
	width: 1000px;
	margin-left: auto;
	margin-right: auto;
	margin-top: 30px;
	margin-bottom: 0px;
	font-size: 24px;
	color: #FFFFFF;
}
#title .header {
	font-size: 24px;
	padding-top: 5px;
	padding-right: 5px;
	padding-left: 10px;
	padding-bottom: 5px;
	display: block;

}

.node circle {
  cursor: pointer;
  fill: #fff;
  stroke: steelblue;
  stroke-width: 1.5px;
}

.node text {
  font-size: 11px;
  cursor:pointer;
  fill:black;
}

.selected {
    fill: red;
}

/*.root text{
	font-size:16px;
}*/

path.link {
  fill: none;
  stroke: #ccc;
  stroke-width: 1px;
}

#main{
	width: auto;
	height: 1000px;
	background-color: #FFFFFF;
	margin-left: auto;
	margin-right: auto;
}

#d3viz{
	width: 680px;
	height: 600px;
	float: left;
	margin: 0;
	z-index: 999;
	font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

#intro{
	display: block;
	position: absolute;
	width: 275px;
	float: left;
	margin-top: 100px;
	margin-left: 373px;
	font-size: medium;
	color: #000000;
	font-family: open-sans;
	font-style: normal;
	font-weight: 300;
}

#tableau{
	width: 550px;
	height: 800px;
	float: right;
	margin: 0;
	display: block;
	/* margin-left: 400px; */
}

#logo {
	margin-top: 45px;
	margin-left: auto;
	margin-right: auto;
	width: 1000px;
}


</style>
<script src="resources/js/d3.v3.min.js"></script>
<script src='resources/js/treemap/tableau-2.js'></script>
<script src='resources/js/treemap/d3.layout.js'></script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</head>
<body>
<a href="/trinet" style="color: white;">Home</a>
 <div class="container">
  <!-- Trigger the modal with a button -->
  <!-- Modal -->
  <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <div class="modal-body">
          <div id="main">
    		</div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</div>
<script>
$(document).ready(function(){
	$('#myModal').modal('show');
});


//********************************************T****************
//stick it on the page
var viz, workbook;

window.onload= function() {
	var vizDiv = document.getElementById('main');
	//http://tableau-corp-dev.trinet.com/t/TRINET-DEV1/views/D3POC_24-11/D3POC
	
	var vizURL = "https://tableau-corp-dev.trinet.com/t/TRINET-DEV1/views/Demo_01-03/PS_JOB";
	
 	var options = {
		width: '100%',
		height: '675px',
		hideToolbar: true,
		hideTabs: true,
		onFirstInteractive: function () {
			workbook = viz.getWorkbook();
			document.getElementById('sheetName').innerHTML = viz.getWorkbook().getActiveSheet().getName();
		}
	};
	viz = new tableauSoftware.Viz(vizDiv, vizURL, options);
	viz.addEventListener('tabswitch', function(event) {
		document.getElementById('sheetName').innerHTML = event.getNewSheetName();
	});
	viz.addEventListener('marksselection', onMarksSelection);
};

//get selected marks
function onMarksSelection(marksEvent) {
return marksEvent.getMarksAsync().then(selectFunc);
}

//filter data
function showOnly(filterName, values) {
	sheet = viz.getWorkbook().getActiveSheet();
	if(sheet.getSheetType() === 'worksheet') {
		sheet.applyFilterAsync(filterName, values, 'REPLACE');
		//console.log("filtered");
	} else {
		worksheetArray = sheet.getWorksheets();
		for(var i = 0; i < worksheetArray.length; i++) {
			worksheetArray[i].applyFilterAsync(filterName, values, 'REPLACE');
		}
		//console.log("filtered");
	}
}

//clear filter
function clearFilter(filterName) {
	sheet = viz.getWorkbook().getActiveSheet();
	if(sheet.getSheetType() === 'worksheet') {
		sheet.clearFilterAsync(filterName);
	} else {
		worksheetArray = sheet.getWorksheets();
		for(var i = 0; i < worksheetArray.length; i++) {
			worksheetArray[i].clearFilterAsync(filterName);
		}
	}
}

//set parameter for fed, agency, burueau
function setParameter(name,value) {
	/* console.log(name+"--------"+value) */
	workbook.changeParameterValueAsync(name,value);
	console.log("param set");
}

function setAndFilter(filterName,values,name,value) {
	/* alert("482: "+filterName, values); */
	setParameter(name,value).then(
	showOnly(filterName, values)
	);
	//console.log("param set");
}

</script>
</body>
</html>