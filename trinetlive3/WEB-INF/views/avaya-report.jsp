<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Avaya-Report</title>
<link rel="stylesheet"	href="resources/css/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet"	href="resources/css/jquery-ui.css">
<link href="resources/css/loadmask/jquery.loadmask.css" rel="stylesheet" type="text/css" />
<style type="text/css">
.ui-datepicker {font-size:10px;}
</style>
</head>
<body id="body">
<%@include file="go-home.jsp"%><br>
	<div id="tabs">
</div>
	<hr>
<script src="resources/js/jquery-2.2.4.min.js"></script>
<script src="resources/js/d3.v3.min.js" charset="utf-8"></script>
<script src='resources/js/treemap/tableau-2.js'></script>
 <script src="resources/js/jquery-ui.js"></script>
 <script  src="resources/js/loadmask/jquery.loadmask.js"></script>
<script>
var viz, workbook;
$(document).ready(function(){
	readUrlsFromCsv();
});

function readUrlsFromCsv(){
	$('#body').mask('Loading');
	$.getJSON('read-tableau-urls', function (csvDtoList) {
		 if(csvDtoList.length>0){
			 generateDynamicHtml(csvDtoList);
			 callTableauWorkSheets(csvDtoList);
			 $('#body').unmask();
		 }else{
			 alert("No Urls Found");
		 }
		 
	  	 }).error(function(error) {
	  		 console.log(error);
	  		alert("Unable to load visualzaitons");
	  	 });
}

function generateDynamicHtml(csvDtoList){
	var html = "";
	var divId = $('#tabs');
	divId.html('');
	html+= "<ul>";
	html+= addDynamicTabsAndDivs(csvDtoList,"generateTab");
	html+= "</ul>";
	html+= addDynamicTabsAndDivs(csvDtoList,"generateDiv");
	divId.append(html);
	$( "#tabs" ).tabs();
}


function addDynamicTabsAndDivs(csvDtoList,type){
	var html  = "";
	for(var i=0;i<csvDtoList.length;i++){
		var reportName = csvDtoList[i].reportName;
		if("generateTab"==type){
			var tabId = "#tabs-"+(i+1);
			html+= "<li><a href='"+tabId+"'>"+reportName+"</a></li>";
		}else if("generateDiv"==type){
			var tabId = "tabs-"+(i+1);
			html+= "<div id='"+tabId+"'></div>";
		}
	}
	return html;
}

function callTableauWorkSheets(csvDtoList){
	for(var i=0;i<csvDtoList.length;i++){
		var tableauUrl = csvDtoList[i].tableauUrl;
		var tabId = "tabs-"+(i+1);
		 populateViz(tableauUrl,tabId, '100%', '657px');

	}

}


//************Add Tableau Visualiazation**************************//
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
			workbook.changeParameterValueAsync('filterInput', getSysDate());
		}
	};
	viz = new tableauSoftware.Viz(vizDiv, vizURL, options);
}

function getSysDate(){
	var currentTime = new Date();
    var year      = currentTime.getFullYear();
    var currentMonth = currentTime.getMonth()+1;
    var month   = currentMonth < 10 ? '0' + currentMonth : currentMonth;
    var day     = currentTime.getDate()  < 10 ? '0' + currentTime.getDate()  : currentTime.getDate();
    return $.trim(month+"/"+day+"/"+year);
}


</script>
</body>
</html>