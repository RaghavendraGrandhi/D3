<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>WSE Count</title>
<link rel="stylesheet" href="resources/css/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" href="resources/css/jquery-ui.css">
<style type="text/css">
.ui-datepicker {font-size:10px;}
</style>
</head>
<body>

<%@include file="go-home.jsp" %>
<div class="container-fluid">
	<div class="row">
	<p>Date: 
	<input type="text" id="date-picker" onchange="updateReport()"  class="form-control form-control-sm" style="width: 100%;border-radius: 0;box-shadow: 0px 0px 1px #cccccc94;"></p>
	</div>
	<div id="wse-viz"></div>
</div>	
</body>
<script src="resources/js/jquery-2.2.4.min.js"></script>
<script src="resources/js/jquery-ui.js"></script>
<script src="resources/js/d3.v3.min.js" charset="utf-8"></script>
<script src='resources/js/treemap/tableau-2.js'></script>
<script type="text/javascript">
$("#date-picker").datepicker({changeMonth:true,changeYear:true});
$("#date-picker").datepicker('setDate',new Date());
$(document).ready(function(){
	populateViz("https://tableau-corp-dev.trinet.com/t/TRINET-DEV1/views/DatePicker/3rdViz","wse-viz", '100%', '657px');
});

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

function updateReport(){
	var date = $('#date-picker').val();
	workbook.changeParameterValueAsync('filterInput1', date);
}

</script>
</html>