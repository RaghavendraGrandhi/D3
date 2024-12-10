<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Avaya-Report</title>
<%@include file="include-bootstrap-css.jsp"%>
<%@include file="include-jquery-css.jsp"%>
<link href="resources/css/loadmask/jquery.loadmask.css" rel="stylesheet" type="text/css" />
<style type="text/css">
.ui-datepicker {font-size:10px;}
#tabs-1,#tabs-2 {
	-webkit-filter: blur(5px);
	-moz-filter: blur(5px);
	-o-filter: blur(5px);
	-ms-filter: blur(5px);
	filter: blur(5px);
}
</style>
</head>
<body id="body">
	<%@include file="go-home.jsp"%>
	<div id="tabs">
</div>
	<hr>
<%@include file="include-jquery-js.jsp"%>
<%@include file="include-bootstrap-js.jsp"%>
<script src="resources/js/d3/d3.v3.min.js" charset="utf-8"></script>
<script src='resources/js/tableau/tableau-2.js'></script>
 <script  src="resources/js/loadmask/jquery.loadmask.js"></script>
<script>
var viz1,viz2,workbook1,workbook2;
$(document).ready(function(){
	readUrlsFromCsv();
});

function readUrlsFromCsv(){
	$('#body').mask('Loading');
	 $.get('read-tableau-urls', function (csvDtoList) {
		 if(csvDtoList.length>0){
			 generateDynamicHtml(csvDtoList);
			 callTableauWorkSheets(csvDtoList);
			 $('#body').unmask();
		 }else{
			 alert("No Urls Found");
		 }
		 
	  	 },'json').fail(function(error) {
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
		var workbookId = "workbook"+(i+1);
		var vizId = "viz"+(i+1);
		 populateViz(tableauUrl,tabId, '100%', '657px',workbookId,vizId);

	}

}


//************Add Tableau Visualiazation**************************//
function populateViz(url,divId, width_, height_,workbookId,vizId){
   var vizDiv = document.getElementById(divId);
	var vizURL = url;
	var options = {
		width : width_,
		height : height_,
		hideToolbar : true,
		hideTabs : true,
		onFirstInteractive : function() {
			workbookId = vizId.getWorkbook();
			workbookId.changeParameterValueAsync('filterInput1', getSysDate()).then(function () {
				unblurDiv();
			    });
		}
	};
	vizId = new tableauSoftware.Viz(vizDiv, vizURL, options);
}

function getSysDate(){
	var currentTime = new Date();
    var year      = currentTime.getFullYear();
    var currentMonth = currentTime.getMonth()+1;
    var month   = currentMonth < 10 ? '0' + currentMonth : currentMonth;
    var day     = currentTime.getDate()  < 10 ? '0' + currentTime.getDate()  : currentTime.getDate();
    return $.trim(month+"/"+day+"/"+year);
}

function unblurDiv() {
	$('#tabs-1,#tabs-2').css({
		'-webkit-filter' : 'none',
		'-moz-filter' : 'none',
		'-o-filter' : 'none',
		'-ms-filter' : 'none',
		'filter' : 'none',
	});
}

</script>
</body>
</html>