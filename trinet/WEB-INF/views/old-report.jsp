<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<html>
 <link href="resources/css/loadmask/jquery.loadmask.css" rel="stylesheet" type="text/css" />
  <link rel="stylesheet" href="resources/bootstrap-modal-popup/bootstrap.min.css">
<head>
<title>Report</title>
<style type="text/css">
td, th {
    overflow: hidden;
    width: 250px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 12px;
    color: #555;
    padding: 0.2rem !important;
}
th {
    background: #999;
    color: #fff;
}
.form-control{
	min-width: 30%;
	width: auto;
	border-radius: 0;
	font-size: 13px;
}
.modal-content, btn-sm {
	border-radius: 0;
}
.checkbox-inline, .radio-inline {
    font-size: 14px;
    font-weight: 600;
    color: #aaa;
    text-transform: uppercase;
    margin: 0rem 2rem 0rem 0;
}
.form-inline{
	margin: 1rem 0;
}
</style>
</head>
<body>
	<div id="loader" class="container-fluid">
	<a href="/trinet">Go Home</a><br><hr>
	<div class="form-inline">
		<label class="radio-inline"> 
			<input type="radio" name="gender" value="report"  checked="true" onchange="updateReport('report')" >
			Report
		</label>
		<label class="radio-inline"> 
			<input type="radio" name="gender" value="attribute" onchange="updateReport('attribute')">
			Attribute
		</label>
		<label class="radio-inline"> 
			<input type="radio" name="gender" value="subjectArea" onchange="updateReport('subjectArea')">
			Subject Area
		</label>
	</div>
		<div id="report-div"><br>
		</div>
		<div id="report-header"></div>
		<div id="attributes">
		</div>
		
<div class="container">
  <div class="modal fade" id="subject-area-modal" tabindex="-1" role="dialog">
  <div class="modal-dialog modal-lg" role="document" style="width: 99%;">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      </div>
      <div class="modal-body" id="attribues-entities-body">
        <div class="table-responsive">
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
</div>

<div class="container">
  <div class="modal fade" id="report-modal" tabindex="-1" role="dialog">
  <div class="modal-dialog modal-lg" role="document" style="width: 99%;">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      </div>
      <div class="modal-body" >
        <div class="table-responsive" id="report-body">
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
</div>

	</div>
</body>
	<script  src="resources/js/jquery-2.2.4.min.js"></script>
    <script src="resources/bootstrap-modal-popup/bootstrap.min.js"></script>
   <script  src="resources/js/loadmask/jquery.loadmask.js"></script>
 <script type="text/javascript">
 var list = "";
 var attributeList = [];
 var subjectAreaIds = [];
 var subjectAreaReports = "";

function getReportDropDown(){
	 $.getJSON('read-wfa-json', function (data) {
		 cleanDivs();
		 list = data;
		 $('#report-div').html('');
		 if(data.length>0){
			 var html = "";
			 html+= '<form>';
			 html+= '<div class="form-group">';
			 html+= '<label>Please Select Report</label>';
			 html+= '<select class="form-control form-control-sm" onchange="getReportResults()" id="reportId">';
			 html+= '<option value="">---Please Select---</option>';
			 for(var i=0;i<data.length;i++){
				 html+= '<option value="'+i+'">'+data[i].name+'</option>';
				 attributeList.push(data[i].report.attributeIds);
				 subjectAreaIds.push(data[i].report.subjectAreaId);
			 }
			 html+= '</select>';
			 html+= '</div>';
			 html+= '</form>';
			 $('#report-div').append(html);
			 $("#loader").unmask();
		 }else{
			 alert("No Data Found");
		 }
		 
	 }).error(function() { alert("error in getReportDropDown()"); });
}
 
 

function getReportResults(){
	$("#loader").mask("Loading Data...");
	var index = $('#reportId option:selected').val();
	$('#report-header').html('');
	if(index!=""){
		var report = list[index];
	  	 $('#report-header').append(appendReportTable(report));
		  $.get("showDetailReport",function(response){
			  var attributes = response.attributes;
        	  var subjectAreas = response.subjectAreas;
              $('#attributes').html('');
             appendSubjectArea(subjectAreas,report);
           	 appendAttributes(attributes,report.report.attributeIds,'Attributes','attributes');
           	 appendAttributes(attributes,report.report.filters,'Filter Attributes','attributes');
           	 appendAttributes(attributes,report.report.prompts,'Prompt Attributes','attributes');
            $("#loader").unmask();
		  },'json').fail(function(data){
			  alert("Error In getReportResults()");
		  });
		  
		  
		  
		  
	}else{
		$('#attributes').html('');
		$("#loader").unmask();
		alert("Please Select Report");
	}
	return false;
}


function appendReportTable(report){
 	 var html = "";
	 var tableId= "'report-table'";
	 html+= '<button class="btn btn-outline-primary btn-sm pull-left" onclick="javascript:xport.toCSV('+tableId+');">download</button>';
  	 html+= '<table class="table table-striped table-bordered" id="report-table">';
  	 html+= '<thead>';
  	 html+=  '<tr>';
  	 html+= '<th>Id</th>';
  	 html+= '<th>Category</th>';
  	 html+= '<th>Company Code</th>';
  	 html+= '<th>Role</th>';
  	 html+= '<th>Created Date</th>';
  	 html+= '<th>Updated Date</th>';
  	 html+= '</tr>';
  	 html+= '</thead>';
  	 html+= '<tbody>';
  	 html+= '<tr>';
  	 html+= '<td>'+report.id+'</td>';
  	 html+= '<td>'+report.category+'</td>';
  	 html+= '<td>'+replaceNullAsEmpty(report.companyCode)+'</td>';
  	 html+= '<td>'+report.role+'</td>';
  	 html+= '<td>'+report.createdDateString+'</td>';
  	 html+= '<td>'+report.updatedDateString+'</td>';
  	 html+= '</tr>';
  	 html+= '</tbody>';
  	 html+= '</table>';
  	 return html;
}


function appendSubjectArea(subjectAreas,report){
	var subjectAreaId = report.report.subjectAreaId;
	 $('#attributes').append('<h4 class="pull-left">Subject Area</h4>');
	$('#attributes').append(getSubjectAreaTable(subjectAreas,subjectAreaId));
}

function getSubjectAreaTable(subjectAreas,subjectAreaId){
	var columns = subjectAreas.columns;
	var subjectAreas = subjectAreas.rowData;
	var tableId= "'Subject Area'";
	$('#attributes').append('<button class="btn btn-outline-primary btn-sm pull-left" onclick="javascript:xport.toCSV('+tableId+');">download</button>');
	var filterHtml = "";
	if(subjectAreas.length>0){
		filterHtml+= appendColumns(filterHtml,columns,"Subject Area");//Appending Columns
		filterHtml+= '<tbody>';
		for(var i=1;i<subjectAreas.length;i++){
			if(subjectAreas[i][0]==subjectAreaId){
			 	filterHtml+= '</tr>';
			 	for(var c=0;c<columns.length;c++){
	    			filterHtml+= '<td>'+subjectAreas[i][c]+'</td>';
	    		}
		       	filterHtml+= '</tr>';
			}
			
		}
		filterHtml+= '</tbody>';
    	filterHtml+= '</table>';
	}else{
		filterHtml+= noDataFound();
	}
	return filterHtml;
}

function appendAttributes(response,attributeIdsString,type,divId){
	 $('#'+divId).append('<h4 class="pull-left">'+type+'</h4>');
	 var tableId= "'"+type+"'";
	$('#'+divId).append('<button class="btn btn-outline-primary btn-sm pull-left" onclick="javascript:xport.toCSV('+tableId+');">download</button>');
   	$('#'+divId).append(generateAttributesTable(response,attributeIdsString,type));
}


function generateAttributesTable(response,attributeIdsString,type){
	var filterHtml = "";
	var columns = response.columns;
	var attributes = response.rowData;
	var attributeIds = convertStringArrayToIntegerArray(attributeIdsString);
	if(attributeIds.length>0){
	 	if(attributes.length>0){
	 	   	filterHtml+= appendColumns(filterHtml,columns,type);//Appending Columns
	 	     filterHtml+= '<tbody>';
	 	   	 for(var i=1;i<attributes.length;i++){
	 	   		 if(attributeIds.indexOf(attributes[i][0])>-1){
	 	   			 filterHtml+= '<tr>';
	 	   	    		for(var c=0;c<columns.length;c++){
	 	   	    			filterHtml+= '<td>'+attributes[i][c]+'</td>';
	 	   	    		}
	 	   		       	filterHtml+= '</tr>';
	 	   		 }
	 	   	 } 
	 	   	filterHtml+= '</tbody>';
	 	   	filterHtml+= '</table>';
	 	   	}else{
	 	   		filterHtml+=noDataFound();
	 	   	}
	}else{
		filterHtml+=noDataFound();
	}
	return filterHtml;
}



function appendFiltertedAttributeRows(filterHtml,attributes,attributeIds,columns){
	  filterHtml+= '<tbody>';
	   	 for(var i=1;i<attributes.length;i++){
	   		 if(attributeIds.indexOf(attributes[i][0])>-1){
	   			 filterHtml+= '<tr>';
	   	    		for(var c=0;c<columns.length;c++){
	   	    			filterHtml+= '<td>'+attributes[i][c]+'</td>';
	   	    		}
	   		       	filterHtml+= '</tr>';
	   		 }
	   	 } 
	   	filterHtml+= '</tbody>';
	   	filterHtml+= '</table>';
  	return filterHtml;
}
//Attribute Data
function getAllAttributes(){
	$.get("getAllAttributes",function(data){
		  cleanDivs();
       	  $('#report-div').html('');
    		 if(data.length>0){
    			 var html = "";
    			 html+= '<form>';
    			 html+= '<div class="form-group">';
    			 html+= '<label>Please Select Attribute</label>';
    			 html+= '<select class="form-control form-control-sm" onchange="getReportsByAttributeName()" id="attributeId">';
    			 html+= '<option value="">---Please Select---</option>';
    			 for(var i=0;i<data.length;i++){
    				 html+= '<option value="'+data[i]+'">'+data[i]+'</option>';
    			 }
    			 html+= '</select>';
    			 html+= '</div>';
    			 html+= '</form>';
    			 $('#report-div').append(html);
    			 $("#loader").unmask();
    		 }else{
    			 alert("No Data Found");
    		 }
    		  stopLoader();
		
	},'json').fail(function(data){
		alert("Error In getAllAttributes()");
	});
}

function getReportsByAttributeName(){
	startLoader();
	var id = $('#attributeId option:selected').val();
	$('#report-header').html('');
	
	var data = {
			'displayName':id
	}
	 $.post('getReportsByAttributeName',data, function (report) {
		 console.log(report);
		 var html = "";
		 if(report.length>0){
			 var tableId= "'Attribute'";
			$('#report-header').append('<button class="btn btn-outline-primary btn-sm pull-left" onclick="javascript:xport.toCSV('+tableId+');">download</button>');
			 html+= '<table class="table table-striped table-bordered" id="Attribute">';
		  	 html+= '<thead>';
		  	 html+=  '<tr>';
		  	 html+= '<th>Id</th>';
		  	 html+= '<th>Subject Area Name</th>';
		  	 html+= '<th>Report Name</th>';
		  	 html+= '<th>Category</th>';
		  	 html+= '<th>Company Code</th>';
		  	 html+= '<th>Role</th>';
		  	 html+= '<th>Created Date</th>';
		  	 html+= '<th>Updated Date</th>';
		  	 html+= '</tr>';
		  	 html+= '</thead>';
		  	 html+= '<tbody>';
		  	 for(var i=0;i<report.length;i++){
		  		 var idString ="'"+report[i].id+"'";
		  		 html+= '<tr>';
			  	 html+= '<td>'+report[i].id+'</td>';
			  	 html+= '<td>'+report[i].report.subjectAreaName+'</td>';
			  	 html+= '<td><a href="javascript:void(0)" onclick="getDetailReportById('+idString+')">'+report[i].name+'</a></td>';
			  	 html+= '<td>'+report[i].category+'</td>';
			  	 html+= '<td>'+replaceNullAsEmpty(report.companyCode)+'</td>';
			  	 html+= '<td>'+report[i].role+'</td>';
			  	 html+= '<td>'+report[i].createdDateString+'</td>';
			  	 html+= '<td>'+report[i].updatedDateString+'</td>';
			  	 html+= '</tr>';
		  	 }
		  	
		  	 html+= '</tbody>';
		  	 html+= '</table>';
		 }else{
			 html+= '<h4 style="color:red;">No Data Found</h4>';
		 }
	  	 $('#report-header').append(html);
	  	 stopLoader();
		 
	 },'json').fail(function() { alert("Error In getReportsByAttributeId()"); });
	
}


function getDetailReportById(reportId){
	$('.table-responsive').html('');
	startLoader();
	$.get("getDetailReportById/"+reportId,function(data){
		console.log(data);
		var subjectAreas = data.subjectAreas;
		var attributes = data.attributes;
		var report = data.report;
		$('#report-body').append(appendReportTable(report));
		appendSubjectAreaHeader("report-body");
		$('#report-body').append(getSubjectAreaTable(subjectAreas,report.report.subjectAreaId));
		 appendAttributes(attributes,report.report.attributeIds,'Attributes','report-body');
       	 appendAttributes(attributes,report.report.filters,'Filter Attributes','report-body');
       	 appendAttributes(attributes,report.report.prompts,'Prompt Attributes','report-body');
		$('#report-modal').modal('show');
		$('#attributes').html('');
		stopLoader();
	}).fail(function(response){
		alert("Error In getDetailReportById("+reportId+")")
	});
}

/**********************************Subject Area Daata***********/

function getSubjectAreaDropDown(){
	startLoader();
	  $.ajax({
	         url:"getSubjectAreaNameByIds", 
	         type: "POST", 
	         data: JSON.stringify( removeDuplicates(subjectAreaIds) ), 
	         dataType: "json",
	         contentType: "application/json",
	         success: function (data) {
	       	  cleanDivs();
	    		 if(data.length>0){
	    			 var html = "";
	    			 html+= '<form>';
	    			 html+= '<div class="form-group">';
	    			 html+= '<label>Please Select Subject Area</label>';
	    			 html+= '<select class="form-control form-control-sm" onchange="getReportsBySubjectArea()" id="subjectAreaId">';
	    			 html+= '<option value="">---Please Select---</option>';
	    			 for(var i=0;i<data.length;i++){
	    				 html+= '<option value="'+data[i].subjectAreaId+'">'+data[i].subjectAreaName+'</option>';
	    			 }
	    			 html+= '</select>';
	    			 html+= '</div>';
	    			 html+= '</form>';
	    			 $('#report-div').append(html);
	    			 $("#loader").unmask();
	    		 }else{
	    			 alert("No Data Found");
	    		 }
	    		  stopLoader();
	         },error:function(data){
	       	  alert("error in getAttributeNamesByIds");
	         }
	});
}

function getReportsBySubjectArea(){
	startLoader();
	var id = parseInt($('#subjectAreaId option:selected').val());
	$('#report-header').html('');
	subjectAreaReports  = "";
	 $.get("getReportsBySubjectAreaId/"+id, function (report) {
		 var tableId= "'Subject Area'";
		$('#report-header').append('<button class="btn btn-outline-primary btn-sm pull-left" onclick="javascript:xport.toCSV('+tableId+');">download</button>');
		 console.log(report);
		 subjectAreaReports = report;
		 var html = "";
	  	 html+= '<table class="table table-striped table-bordered" id="Subject Area">';
	  	 html+= '<thead>';
	  	 html+=  '<tr>';
	  	 html+= '<th>Id</th>';
	  	 html+= '<th>Name</th>';
	  	 html+= '<th>Category</th>';
	  	 html+= '<th>Company Code</th>';
	  	 html+= '<th>Role</th>';
	  	 html+= '<th>Created Date</th>';
	  	 html+= '<th>Updated Date</th>';
	  	 html+= '</tr>';
	  	 html+= '</thead>';
	  	 html+= '<tbody>';
	  	 for(var i=0;i<report.length;i++){
	  		 html+= '<tr>';
		  	 html+= '<td>'+report[i].id+'</td>';
		  	 html+= '<td><a href="javascript:void(0)" onclick="getAttributesAndEntitiesByReportId('+i+')">'+report[i].name+'</a></td>';
		  	 html+= '<td>'+report[i].category+'</td>';
		  	 html+= '<td>'+replaceNullAsEmpty(report.companyCode)+'</td>';
		  	 html+= '<td>'+report[i].role+'</td>';
		  	 html+= '<td>'+report[i].createdDateString+'</td>';
		  	 html+= '<td>'+report[i].updatedDateString+'</td>';
		  	 html+= '</tr>';
	  	 }
	  	
	  	 html+= '</tbody>';
	  	 html+= '</table>';
	  	 $('#report-header').append(html);
	  	 stopLoader();
		 
	 },'json').fail(function(data) {
		 console.log(data);
		 alert("Error In getReportsBySubjectArea()"); 
		 });
}


function getAttributesAndEntitiesByReportId(i){
	 $('.table-responsive').html('');
	startLoader();
	$.get("getAttributesAndEntities",function(response){
		console.log(response);
		 $('.table-responsive').append('<h4 class="pull-left">Attributes</h4>');
		 var tableId= "'Attributes'";
		$('.table-responsive').append('<button class="btn btn-outline-primary btn-sm pull-left" onclick="javascript:xport.toCSV('+tableId+');">download</button>');
		$('.table-responsive').append(generateAttributesTable(response.attributes,subjectAreaReports[i].report.attributeIds,"Attributes"));
       	$('.table-responsive').append(generateEntitiesTable(response.entities,subjectAreaReports[i].report.subjectAreaId,"Entities"));
        $('#subject-area-modal').modal('show');
       	$('#attributes').html('');
  	    stopLoader();
	},'json').fail(function(error){
		alert("Error In getAttributesAndEntitiesByReportId()")
	});
	return false;
}


function generateEntitiesTable(response,subjectAreaId){
	var columns = response.columns;
	var entities = response.rowData;
	$('.table-responsive').append('<h4>Entities</h4>');
	 var entitiesReport= "'Entity-Report'";
		$('.table-responsive').append('<button class="btn btn-outline-primary btn-sm pull-left" onclick="javascript:xport.toCSV('+entitiesReport+');">download</button>');
	var filterHtml = "";
	if(entities.length>0){
		filterHtml+= appendColumns(filterHtml,columns,"Entity-Report");//Appending Columns
		filterHtml+= '<tbody>';
		for(var i=1;i<entities.length;i++){
			if(entities[i][1]==subjectAreaId){
			 	filterHtml+= '</tr>';
			 	for(var c=0;c<columns.length;c++){
	    			filterHtml+= '<td>'+entities[i][c]+'</td>';
	    		}
		       	filterHtml+= '</tr>';
			}
			
		}
		filterHtml+= '</tbody>';
    	filterHtml+= '</table>';
	}else{
		filterHtml+= noDataFound();
	}
	return filterHtml;
}






$(document).ready(function () {
 	$("#loader").mask("Loading Data...");
 	getReportDropDown();
 });
 
function startLoader(){
	 $("#loader").mask("Loading Data...");
}

function stopLoader(){
	 $("#loader").unmask();
	 
}
function cleanDivs(){
	 $('#report-div').html('');
	 $('#report-header').html('');
	 $('#attributes').html('');
}


function replaceNullAsEmpty(data){
	if(data==null){
		return "";
	}else{
		return data;
	}
}

function updateReport(type){
	 startLoader();
	 if(type=="report"){
		 getReportDropDown();
	 }else if(type=="attribute"){
		 getAllAttributes();
	 }else{
		 getSubjectAreaDropDown();
	 }
}

function removeDuplicates(inputArray){
		var outputArray = [];
		for (var i = 0; i < inputArray.length; i++) {
			if ((jQuery.inArray(inputArray[i], outputArray)) == -1) {
				outputArray.push(inputArray[i]);
			}
		}
		return outputArray;
}


function appendColumns(filterHtml,columns,tableId){
	filterHtml+= '<table class="table table-striped table-bordered" id="'+tableId+'">';
   	filterHtml+= '<thead>';
   	filterHtml+=  '<tr>';
   	for(var col=0;col<columns.length;col++){
   		filterHtml+= '<th>'+columns[col]+'</th>';
   	}
   	filterHtml+= '</tr>';
   	filterHtml+= '</thead>';
   	return filterHtml;
}

function noDataFound(){
	return '<table class="table table-striped table-bordered"><tr><th style="color:red">No Data Found</th></tr></table>' ;
}


function convertStringArrayToIntegerArray(stringArray){
	var integerArray = [];
	for(var a=0;a<stringArray.length;a++){
		integerArray.push(parseInt(stringArray[a]));
	}
	return integerArray;
}



var xport = {
		  _fallbacktoCSV: true,  
		  toXLS: function(tableId, filename) {   
		    this._filename = (typeof filename == 'undefined') ? tableId : filename;
		    
		    //var ieVersion = this._getMsieVersion();
		    //Fallback to CSV for IE & Edge
		    if ((this._getMsieVersion() || this._isFirefox()) && this._fallbacktoCSV) {
		      return this.toCSV(tableId);
		    } else if (this._getMsieVersion() || this._isFirefox()) {
		      alert("Not supported browser");
		    }

		    //Other Browser can download xls
		    var htmltable = document.getElementById(tableId);
		    var html = htmltable.outerHTML;

		    this._downloadAnchor("data:application/vnd.ms-excel" + encodeURIComponent(html), 'xls'); 
		  },
		  toCSV: function(tableId, filename) {
		    this._filename = (typeof filename === 'undefined') ? tableId : filename;
		    // Generate our CSV string from out HTML Table
		    var csv = this._tableToCSV(document.getElementById(tableId));
		    // Create a CSV Blob
		    var blob = new Blob([csv], { type: "text/csv" });

		    // Determine which approach to take for the download
		    if (navigator.msSaveOrOpenBlob) {
		      // Works for Internet Explorer and Microsoft Edge
		      navigator.msSaveOrOpenBlob(blob, this._filename + ".csv");
		    } else {      
		      this._downloadAnchor(URL.createObjectURL(blob), 'csv');      
		    }
		  },
		  _getMsieVersion: function() {
		    var ua = window.navigator.userAgent;

		    var msie = ua.indexOf("MSIE ");
		    if (msie > 0) {
		      // IE 10 or older => return version number
		      return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
		    }

		    var trident = ua.indexOf("Trident/");
		    if (trident > 0) {
		      // IE 11 => return version number
		      var rv = ua.indexOf("rv:");
		      return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
		    }

		    var edge = ua.indexOf("Edge/");
		    if (edge > 0) {
		      // Edge (IE 12+) => return version number
		      return parseInt(ua.substring(edge + 5, ua.indexOf(".", edge)), 10);
		    }

		    // other browser
		    return false;
		  },
		  _isFirefox: function(){
		    if (navigator.userAgent.indexOf("Firefox") > 0) {
		      return 1;
		    }
		    
		    return 0;
		  },
		  _downloadAnchor: function(content, ext) {
		      var anchor = document.createElement("a");
		      anchor.style = "display:none !important";
		      anchor.id = "downloadanchor";
		      document.body.appendChild(anchor);

		      // If the [download] attribute is supported, try to use it
		      
		      if ("download" in anchor) {
		        anchor.download = this._filename + "." + ext;
		      }
		      anchor.href = content;
		      anchor.click();
		      anchor.remove();
		  },
		  _tableToCSV: function(table) {
		    // We'll be co-opting `slice` to create arrays
		    var slice = Array.prototype.slice;

		    return slice
		      .call(table.rows)
		      .map(function(row) {
		        return slice
		          .call(row.cells)
		          .map(function(cell) {
		            return '"t"'.replace("t", cell.textContent);
		          })
		          .join(",");
		      })
		      .join("\r\n");
		  }
		};


function appendSubjectAreaHeader(divId){
	 $('#'+divId).append('<h4 class="pull-left">Subject Area</h4>');
	 var tableId= "'Subject Area'";
	$('#'+divId).append('<button class="btn btn-outline-primary btn-sm pull-left" onclick="javascript:xport.toCSV('+tableId+');">download</button>');
}

</script>
</html>