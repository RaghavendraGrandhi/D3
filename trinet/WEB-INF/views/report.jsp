<html>
<link href="resources/css/loadmask/jquery.loadmask.css" rel="stylesheet" type="text/css" />
  <link rel="stylesheet" href="resources/bootstrap-modal-popup/bootstrap.min.css">
  <link rel="Stylesheet" type="text/css" href="https://code.jquery.com/ui/1.9.0/themes/base/jquery-ui.css" />
    <script type="text/javascript" src="https://code.jquery.com/jquery-1.8.2.js"></script>
<script type="text/javascript" src="https://code.jquery.com/ui/1.9.0/jquery-ui.js"></script>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Lineage Report</title>
<style type="text/css">
td, th {
    overflow: hidden !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-align:left !important;
    text-overflow: ellipsis !important;
    font-size: 12px !important;
    color: #555 !important;
    padding: 0.2rem !important;
     border-collapse: collapse;
  border-spacing: 0;
}
th {
    background: #87CEFA;
    color: #fff;
    
}
.r-width{
width: 10%
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
    /* text-transform: uppercase; */
    margin: 0rem 2rem 0rem 0;
}
.form-inline{
	margin: 1rem 0;
}

.min{
width: 0.1%;
text-align: center;
}
hr{margin: 10px 0;}
.table{
	width: auto;
	clear: both;
}
.form-control:focus {
    box-shadow: inset 0 0 0 rgba(0, 0, 0, .075), 0 0 1px rgba(102, 175, 233, .6);
}
</style>
</head>
<body>
<div id="loader" class="container-fluid">
	<a href="/trinet" class='link'>Go Home</a><hr>
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
	<div id="drop-down-div"></div>
	<div id="content-div"><br></div><!-- Report Div -->
</div>


		
<div class="container">
  <div class="modal fade" id="subject-area-modal" tabindex="-1" role="dialog">
  <div class="modal-dialog modal-lg" role="document" style="width: 99%;">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      </div>
      <div class="modal-body">
        <div class="table-responsive" id="subject-area-modal-body">
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
</div>

</body>

	<script  src="resources/js/jquery-2.2.4.min.js"></script>
    <script src="resources/bootstrap-modal-popup/bootstrap.min.js"></script>
   <script  src="resources/js/loadmask/jquery.loadmask.js"></script>
   
    <script type="text/javascript">
    var list = "";
    var excelData = "";
    var attributeList = [];
    var subjectAreas = [];
    var attributeObjects = [];
    var subjectAreaIds = [];
    var subjectAreaReports = "";
    
    $(document).ready(function () {
     	startLoader();
     	getJsonAndExcelData();
     });
    function startLoader(){
   	 $("#loader").mask("Loading Data...");
   }

   function stopLoader(){
   	 setTimeout(function(){ $("#loader").unmask() }, 500);
   	 
   }
   function cleanDropDownDiv(){
   	 $('#drop-down-div').html('');
   }
   function cleanContentDiv(){
	   $('#content-div').html('');
   }


   function replaceNullAsEmpty(data){
   	if(data==null || data=="null"){
   		return "-";
   	}else{
   		return data;
   	}
   }

   function updateReport(type){
	   cleanDropDownDiv();
  		cleanContentDiv();
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
	   var uniqueNames = [];
	   $.each(inputArray, function(i, el){
	       if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
	   });
	   return uniqueNames;
   }
   
   
   function removeDuplicateObjects(myArr, prop) {
	    return myArr.filter((obj, pos, arr) => {
	        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
	    });
	}
  
   
   function appendColumns(filterHtml,columns,tableId){
		filterHtml+= '<table class="table table-striped table-bordered" id="'+tableId+'">';
	   	filterHtml+= '<thead>';
	   	filterHtml+=  '<tr>';
	   	for(var col=0;col<columns.length;col++){
	   		if(col==9){
	   			filterHtml+= '<th style="display:none">'+columns[col]+'</th>';
	   		}else{
	   			filterHtml+= '<th>'+columns[col]+'</th>';
	   		}
	   		
	   	}
	   	filterHtml+= '</tr>';
	   	filterHtml+= '</thead>';
	   	return filterHtml;
	}
   
   function noDataFound(){
		return '<table class="table table-striped table-bordered"><tr><th style="color:white">No Data Found</th></tr></table>' ;
	}
   
   function convertStringArrayToIntegerArray(stringArray){
		var integerArray = [];
		for(var a=0;a<stringArray.length;a++){
			integerArray.push(parseInt(stringArray[a]));
		}
		return integerArray;
	}

   
   function getSubjectAreas(){
	   var rows = excelData.rowData;
	   for(var i=0;i<rows.length;i++){
		   if(rows[i][1]!=undefined){
			   var subjectArea = {
					   'id':$.trim(rows[i][0]),
					   'name':$.trim(rows[i][1])
			   }
			   subjectAreas.push(subjectArea);
		   }
		   
	   }
	   subjectAreas = removeDuplicateObjects(subjectAreas, "id");
	   console.log(subjectAreas);
	   return subjectAreas;
   }
   
   function getAttributes(){
	   var rows = excelData.rowData;
	   for(var i=0;i<rows.length;i++){
		   if(rows[i][1]!=undefined){
			   var attribute = {
					   'id':$.trim(rows[i][6]),
					   'name':$.trim(rows[i][7])
			   }
			   attributeObjects.push(attribute);
		   }
	   }
	   attributeObjects = removeDuplicateObjects(attributeObjects, "id");
	   return attributeObjects;
   }
   
   /************Get Excel And Json Data************************/
   function getJsonAndExcelData(){
	   $.getJSON('fetchJsonExcelData', function (data) {
		   console.log(data);
	   		 list = data.json;
	   		 excelData = data.excel;
	   		 getReportDropDown();
	   		 getSubjectAreas();
	   		 getAttributes();
	   		console.log(attributeObjects)
	   		 stopLoader();
	   	 }).error(function() { console.log("Error In fetchJsonExcelData()")  });
   }
   
   //*****************Report Radio Button Code***********************************//
    function getReportDropDown(){
   	 if(list.length>0){
			 var html = "";
			 html+= '<form>';
			 html+= '<div class="form-group">';
			 html+= '<label>Please Select Report</label>';
			 html+= '<select class="form-control form-control-sm" onchange="getReportsByReportId()" id="reportId">';
			 html+= '<option value="">---Please Select---</option>';
			 for(var i=0;i<list.length;i++){
				 html+= '<option value="'+i+'">'+list[i].name+'</option>';
				 attributeList.push(list[i].report.attributeIds);
				 subjectAreaIds.push(list[i].report.subjectAreaId);
			 }
			 html+= '</select>';
			 html+= '</div>';
			 html+= '</form>';
			 $('#drop-down-div').append(html);
			 stopLoader();
		 }else{
			 alert("No Data Found");
		 }
   }
    
   function getReportsByReportId(){
	   startLoader();
	   var index = $('#reportId option:selected').val();
		$('#content-div').html('');
		if(index!=""){
			var report = list[index];
			console.log(index);
			console.log(report);
			$('#content-div').append(appendReportTable(report,"content-div"));
			$('#content-div').append(generateAttributeTable("Attributes","content-div",report.report.attributeIds));
			$('#content-div').append(generateAttributeTable("Filter Attributes","content-div",report.report.filters));
			$('#content-div').append(generateAttributeTable("Prompt Attributes","content-div",report.report.prompts));
			$('#content-div').append(appendSortAttributes(report.report.sorts,"content-div"));
			$('#content-div').append(appendOperators(report.report.filterOperators,"content-div","Filter-Operator"));
			$('#content-div').append(appendOperators(report.report.promptOperators,"content-div","Prompt-Operator"));
		 	/*    $( ".amount" ).tooltip({
				     position: {
				        my: "center bottom",
				        at: "center top-1",
				       collision: "flip",
				        using: function( position, feedback ) {
				            $( this ).addClass( feedback.vertical )
				                .css( position );
				        }
				    } 
				});  */
			 stopLoader();
		}else{
			stopLoader();
			alert("Please Select Report");
		}
		return false;
   }
   
   function appendReportTable(report,divId){
	 	 var html = "";
	 	$('#'+divId).append('<h4 class="pull-left">Report</h4>');
	 	 var tableId= "'Report'";
		/*  html+= '<button class="btn btn-outline-primary btn-sm pull-left" style="margin-left:10px;" onclick="javascript:xport.toCSV('+tableId+');">download</button><br>'; */
	  	 html+= '<table class="table table-striped table-bordered" id="Report">';
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
	  	 html+= '<td >'+report.id+'</td>';
	  	 html+= '<td >'+report.category+'</td>';
	  	 html+= '<td >'+replaceNullAsEmpty(report.companyCode)+'</td>';
	  	 html+= '<td >'+report.role+'</td>';
	  	 html+= '<td >'+report.createdDateString+'</td>';
	  	 html+= '<td>'+report.updatedDateString+'</td>';
	  	 html+= '</tr>';
	  	 html+= '</tbody>';
	  	 html+= '</table>';
	  	 return html;
	}

   
   
   function appendSortAttributes(sorts,divId){
	   var html = "";
	   if(sorts.length>0){
		   $('#'+divId).append('<h4 class="pull-left">Sort</h4>');
		 	 var tableId= "'Sort'";
			 /* html+= '<button class="btn btn-outline-primary btn-sm pull-left" style="margin-left:10px;" onclick="javascript:xport.toCSV('+tableId+');">download</button><br>'; */
		  	 html+= '<table class="table table-striped table-bordered" id="Sort">';
		  	 html+= '<thead>';
		  	 html+=  '<tr>';
		  	 html+= '<th>Attribute Display Name</th>';
		  	 html+= '<th>Value</th>';
		  	 html+= '</tr>';
		  	 html+= '</thead>';
		  	 html+= '<tbody>';
		  	 $.each(sorts,function(index,sort){
		  		 html+= '<tr>';
		  		 $.each(attributeObjects,function(index,attribute){
		  			 if(sort.attributeId==parseInt(attribute.id)){
		  				 html+= '<td>'+attribute.name+'</td>';
		  			 }
		  		 });
			  	
			  	 html+= '<td>'+sort.value+'</td>';
			  	 html+= '</tr>';
		  	 });
		  	 html+= '</tbody>';
		  	 html+= '</table>';
	   }else{
		   html+=noDataFound();
	   }
	   return html;
   }

   function appendOperators(operators,divId,tableName){
	   var html = "";
	   $('#'+divId).append('<h4 class="pull-left">'+tableName+'</h4>');
	    var tableId= "'"+tableName+"'";
	   if(operators.length>0){
			/*  html+= '<button class="btn btn-outline-primary btn-sm pull-left" style="margin-left:10px;" onclick="javascript:xport.toCSV('+tableId+');">download</button><br>'; */
		  	 html+= '<table class="table table-striped table-bordered" id='+tableName+'>';
		  	 html+= '<thead>';
		  	 html+=  '<tr>';
		  	html+= '<th>Attribute Name</th>';
		  	 html+= '<th>Operator Name</th>';
		  	 html+= '<th>Variable Code</th>';
		  	 html+= '<th>Values</th>';
		  	 html+= '</tr>';
		  	 html+= '</thead>';
		  	 html+= '<tbody>';
		  	 $.each(operators,function(index,operator){
		  		 html+= '<tr>';
		  		$.each(attributeObjects,function(index,attribute){
		  			 if(operator.attributeId==parseInt(attribute.id)){
		  				 html+= '<td>'+attribute.name+'</td>';
		  			 }
		  		 });
		  		 html+= '<td>'+operator.operator+'</td>';
		  		 html+= '<td>'+replaceNullAsEmpty(operator.variableCode)+'</td>';
			  	 html+= '<td>'+operator.values+'</td>';
			  	 html+= '</tr>';
		  	 });
		  	 html+= '</tbody>';
		  	 html+= '</table>';
	   }else{
		   html+=noDataFound();
	   }
	   return html;
   }
   
 
   
   function generateAttributeTable(type,divId,attributeIdsString){
	   var filterHtml = "";
	   $('#'+divId).append('<h4 class="pull-left">'+type+'</h4>');
		var columns = excelData.columns;
		var attributes = excelData.rowData;
		var attributeIds = convertStringArrayToIntegerArray(attributeIdsString);
		if(attributeIds.length>0){
		 	if(attributes.length>0){
		 		var tableId= "'"+type+"'";
		 		if(type=="Attributes"){
			 		$('#'+divId).append('<button class="btn btn-outline-primary btn-sm pull-left" style="margin-left:10px;" onclick="javascript:xport.toCSV('+tableId+');">download</button>');

		 		}
		 	   	filterHtml+= appendColumns(filterHtml,columns,type);//Appending Columns
		 	     filterHtml+= '<tbody>';
		 	   	 for(var i=1;i<attributes.length;i++){
		 	   		 if(attributeIds.indexOf(attributes[i][6])>-1){
		 	   			 filterHtml+= '<tr>';
		 	   	    	 	for(var c=0;c<columns.length;c++){
		 	   	    		 if(c==7){
	 	   	    					filterHtml+= '<td class="amount" title="'+attributes[i][9]+'">'+attributes[i][c]+'</td>';
	 	   	    				}else if(c==9){
	 	   	    					filterHtml+= '<td style="display:none;">'+attributes[i][c]+'</td>';
	 	   	    				}else{
	 	   	    					filterHtml+= '<td>'+attributes[i][c]+'</td>';
	 	   	    				} 
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
   
 
   
   //*********************Attributes Radio Button*********************************//
   function getAllAttributes(){
	    var attributeDisplayNames = [];
	   var rows = excelData.rowData;
	   for(var i=0;i<rows.length;i++){
		   if(rows[i][1]!=undefined){
			   attributeDisplayNames.push($.trim(rows[i][7]));
			   var subjectArea = {
					   'id':$.trim(rows[i][0]),
					   'name':$.trim(rows[i][1])
			   }
			   subjectAreas.push(subjectArea);
		   }
		   
	   }
	   subjectAreas = removeDuplicateObjects(subjectAreas, "id");
	   attributeDisplayNames = removeDuplicates(attributeDisplayNames);
	   var html = "";
		 html+= '<form>';
		 html+= '<div class="form-group">';
		 html+= '<label>Please Select Attribute</label>';
		 html+= '<select class="form-control form-control-sm" onchange="getReportsByAttributeName()" id="attributeName">';
		 html+= '<option value="">---Please Select---</option>';
		 for(var i=0;i<attributeDisplayNames.length;i++){
			 html+= '<option value="'+attributeDisplayNames[i]+'">'+attributeDisplayNames[i]+'</option>';
		 }
		 html+= '</select>';
		 html+= '</div>';
		 html+= '</form>';
		 $('#drop-down-div').append(html); 
	   stopLoader();
   }
   
   
   
   function getReportsByAttributeName(){
	   cleanContentDiv();
	   var selectedAttributeName = $.trim($('#attributeName option:selected').val());
	   var attributeIds = [];
	   var updatedReports = [];
	   var subjectAreaIds  = [];
	   var rows = excelData.rowData;
	   for(var i=0;i<rows.length;i++){
		   if(rows[i][1]!=undefined){
			   if(selectedAttributeName==$.trim(rows[i][7])){
				  attributeIds.push(parseInt(rows[i][6]));
				  subjectAreaIds.push(parseInt(rows[i][0]));
			   }
			   
		   }
	   }
	   console.log(attributeIds);
	   var updatedReport = "";
	   $.each(attributeIds,function(index,value){
		   updatedReport = $(list).filter(function( index ) {
			   var ids = list[index].report.attributeIds;
			   value = value.toString();
			   return ids.indexOf(value)>-1;
           });
	   });
	   
	   $(updatedReport).each(function(){
		   updatedReports.push(this);
		});
	   appendReports(updatedReports,"Attribute-Report");
   }
   
   
   
   function appendReports(report,tableId){
	 	 var html = "";
		 	$('#content-div').append('<h4 class="pull-left">Report</h4>');
		 	if(report.length>0){
		 		 var updatedTableId= "'"+tableId+"'";
/* 				 html+= '<button class="btn btn-outline-primary btn-sm pull-left" style="margin-left:10px;" onclick="javascript:xport.toCSV('+updatedTableId+');">download</button><br>';
 */			  	 html+= '<table class="table table-striped table-bordered" id="'+tableId+'">';
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
				  	 $.each(subjectAreas,function(index,value){
				  		 var id = value.id;
				  		 if(id==report[i].report.subjectAreaId){
				  			 html+= '<td>'+value.name+'</td>';
				  		 }
				  	 });
				  	 var reportId = "'"+report[i].id+"'";
				  	 html+= '<td><a href="javascript:void(0)" onclick="getDetailReportById('+reportId+','+updatedTableId+')">'+report[i].name+'</a></td>';
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
		 		html+= noDataFound();
		 	}
		 	$('#content-div').append(html);
   }
   
   function getDetailReportById(reportId,tableId){
	   $('#subject-area-modal-body').html('');
	   var reportIndex = 0;
	   $.each(list,function(index,report){
		   var id = report.id;
		   if(reportId==id){
			   reportIndex = index;
		   }
	   });
	   var report = list[reportIndex];
	   if(tableId=="Attribute-Report"){
		   $('#subject-area-modal-body').append(appendReportTable(report,"subject-area-modal-body"));
		   $('#subject-area-modal-body').append(generateAttributeTable("Filter Attributes","subject-area-modal-body",report.report.filters));
			$('#subject-area-modal-body').append(generateAttributeTable("Prompt Attributes","subject-area-modal-body",report.report.prompts)); 
	   }
		 $('#subject-area-modal-body').append(generateAttributeTable("Attributes","subject-area-modal-body",report.report.attributeIds));
		$('#subject-area-modal').modal('show');
	   
   }
   
   
   //**********************Subject Area Dropdown******************************//
   function getSubjectAreaDropDown(){
	   $('#drop-down-div').html('');
	   var html = "";
		 html+= '<form>';
		 html+= '<div class="form-group">';
		 html+= '<label>Please Select Subject Area</label>';
		 html+= '<select class="form-control form-control-sm" onchange="getReportsBySubjectArea()" id="subjectAreaId">';
		 html+= '<option value="">---Please Select---</option>';
		 for(var i=0;i<subjectAreas.length;i++){
			 html+= '<option value="'+subjectAreas[i].id+'">'+subjectAreas[i].name+'</option>';
		 }
		 html+= '</select>';
		 html+= '</div>';
		 html+= '</form>';
		 $('#drop-down-div').append(html);
		 stopLoader();
   }
   
   
   function getReportsBySubjectArea(){
	   cleanContentDiv();
	   var updatedReport = [];
	   var subjectAreaId = parseInt($('#subjectAreaId option:selected').val());
	   $.each(list,function(index,report){
		   if(report.report.subjectAreaId == subjectAreaId){
			   updatedReport.push(report);
		   }
	   });
	   appendReports(updatedReport,"SubjectArea-Report");
   }
   
   
   //********************Csv Download****************************//
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
    

    </script>
</html>