<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Exclusions-Poc</title>
<%@include file="include-bootstrap-css.jsp"%>
<%@include file="include-jquery-css.jsp"%>
<style type="text/css">
.ui-datepicker {font-size:10px;}
#filter-input-div {
	-webkit-filter: blur(5px);
	-moz-filter: blur(5px);
	-o-filter: blur(5px);
	-ms-filter: blur(5px);
	filter: blur(5px);
}

#filter-button {
	float: right;
}

.sidebar {
	height: 100%;
	background: #2f3646;
	color: #fff;
	padding: 0 15px;
}
.form-control {
	border-radius: 0 !important;
}
</style>
</head>
<body id="body">
<%@include file="go-home.jsp"%>
<div id="base-div">
		<div class="col-sm-4" style="height: 900px;width: 300px;">
			<div class="sidebar" id="filter-input-div">
				<div class="alert alert-danger" id="error-div" style="display: none">
					<strong id="error-message"></strong>
				</div>
				<form>
					<div class="form-group">
						<label for=delimiter>Select Delimiter Type:</label> <select
							class="form-control" id="de-limiter-type">
							<option value="new-line">New Line</option>
							<option value="comma">Comma Seperated</option>
						</select>
					</div>
					<div class="form-group">
						<label for="company-code">Enter Company Code(s):</label>
						<textarea rows="2" cols="2" class="form-control" id="company-code"></textarea>
					</div>
					<button type="button" id="filter-button" class="btn btn-default"
						onclick="filterChart()" disabled="disabled">Filter</button>
				</form>
			</div>
		</div>
		<div class="col-sm-8" id="tabs" style="width: 77%"></div>
	</div>
	<hr>
<%@include file="include-jquery-js.jsp"%>
<%@include file="include-bootstrap-js.jsp"%>
<script src="resources/js/d3/d3.v3.min.js" charset="utf-8"></script>
<script src='resources/js/tableau/tableau-2.js'></script>
<script type="text/javascript">
var viz1,viz2,viz3,workbook1,workbook2,workbook3;
$(document).ready(function(){
	readUrlsFromCsv();
});

function readUrlsFromCsv(){
	$('#base-div').mask('Loading');
	 $.get('read-exclusions-poc-urls', function (csvDtoList) {
		 console.log(csvDtoList);
		 if(csvDtoList.length>0){
			 generateDynamicHtml(csvDtoList);
			 callTableauWorkSheets(csvDtoList);
		 }else{
			 alert("No Urls Found");
		 }
	  	 },'json').fail(function(error) {
	  		 console.log(error);
	  		alert("Unable to load visualzaitons");
	  	 }); 
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
		if(i==0){
			populateViz1(tableauUrl,tabId, '100%', '657px');
		}else if(i==1){
			populateViz2(tableauUrl,tabId, '100%', '657px');
		}else if(i==2){
			populateViz3(tableauUrl,tabId, '100%', '657px');
		}
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
			//workbookId.changeParameterValueAsync('Exclude Customer ID',filterInput);
		}
	};
	vizId = new tableauSoftware.Viz(vizDiv, vizURL, options);
}

function populateViz1(url,divId, width_, height_){
	   var vizDiv = document.getElementById(divId);
		var vizURL = url;
		var options = {
			width : width_,
			height : height_,
			hideToolbar : true,
			hideTabs : true,
			onFirstInteractive : function() {
				workbook1 = viz1.getWorkbook();
			}
		};
		viz1 = new tableauSoftware.Viz(vizDiv, vizURL, options);
	}
function populateViz2(url,divId, width_, height_){
	   var vizDiv = document.getElementById(divId);
		var vizURL = url;
		var options = {
			width : width_,
			height : height_,
			hideToolbar : true,
			hideTabs : true,
			onFirstInteractive : function() {
				workbook2 = viz2.getWorkbook();
			}
		};
		viz2 = new tableauSoftware.Viz(vizDiv, vizURL, options);
	}
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
				$('#base-div').unmask();
				$('#filter-button').attr('disabled', false);
				unblurDiv();

			}
		};
		viz3 = new tableauSoftware.Viz(vizDiv, vizURL, options);
	}



function removeDuplicatesFromArrayList(names) {
	var uniqueNames = [];
	$.each(names, function(i, el) {
		if ($.inArray(el, uniqueNames) === -1)
			uniqueNames.push(el);
	});
	return uniqueNames;
}

function unblurDiv() {
	$('#filter-input-div').css({
		'-webkit-filter' : 'none',
		'-moz-filter' : 'none',
		'-o-filter' : 'none',
		'-ms-filter' : 'none',
		'filter' : 'none',
	});
}

function filterChart() {
	hideErrorMessage("error-div", "error-message");
	var companyCodes = $.trim($('#company-code').val());
	if (companyCodes.length > 0) {
		$('#base-div').mask('Loading');
		var delimiterType = $('#de-limiter-type option:selected').val();
		if (delimiterType == "new-line") {
			if (companyCodes.indexOf(",") < 0) {
				var lines = companyCodes.match(/^.*((\r\n|\n|\r)|$)/gm);
				var array = [];
				$.each(lines, function(index, value) {
					if ($.trim(value).length > 0) {
						value = value.replace(/\n|\r/g, "");
						array.push(value);
					}
				});
				array = removeDuplicatesFromArrayList(array);
				filterCharts(array.toString());
			} else {
				showErrorMessage("Invalid Pattern", "error-div","error-message");
				$('#base-div').unmask();
			}
		} else {
			var pattern = /[0-9a-zA-Z]+(,\s*[0-9a-zA-Z]+)*/;
			if (/^\w+(,\w+)*$/.test(companyCodes)) {
				filterCharts(companyCodes);
			} else {
				showErrorMessage("Invalid Pattern", "error-div","error-message");
				$('#base-div').unmask();
			}
		}
	} else {
		showErrorMessage("Please Enter Company Code", "error-div","error-message");
	}
	return false;
}
function filterCharts(filterInput){
	filterInput = filterInput.toUpperCase();
	workbook1.changeParameterValueAsync('Exclude Customer ID', filterInput);
	workbook2.changeParameterValueAsync('Exclude Customer ID', filterInput);
	workbook3.changeParameterValueAsync('Exclude Customer ID', filterInput).then(function () {
		$('#base-div').unmask();
	    });
}
function showErrorMessage(message, divId, textId) {
	$('#' + textId).text(message);
	$('#' + divId).show(600);
}
function hideErrorMessage(divId, textId) {
	$('#' + textId).text('');
	$('#' + divId).hide();
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


</script>
</body>
</html>