var dashboard, level1, level = 0,consolidateData = [],fieldNames = [],data1=[],columns,dataSource,vsCode,visualizationCode;
var url,home_url,map_name,level,app_url;
var field_counter =0;

$(document).ready(function () {
	buildUrls();
	var urlParams = new URLSearchParams(window.location.search);
	let isConfigure = urlParams.get('isConfigure');
	vsCode = urlParams.get('visualization_code')
	visualizationCode = urlParams.get('visualization_code')
	 tableau.extensions.initializeDialogAsync().then(function (openPayload) {
		dashboard = tableau.extensions.dashboardContent.dashboard;
		var count_field =tableau.extensions.settings.get("selected_field_count");
		fetChMapName(vsCode);
		columnsUpdate1(worksheetName);
		
		$("#field-body").on("click", ".remove-field", removeField);
		$("#metric-body").on("click", ".remove-metric", removeMetric);
		
		$('#closeButton').click(buildDataAndPayLoad)
		//$('#cancelButton').click(tableau.extensions.ui.closeDialog());
		
	});

});
function fetChMapName(vsCode){
	switch (vsCode) {
	case "1":
		$("#mapName").append("AG Grid")
		break;
	case "2":
		$("#mapName").append("Coffee Wheel")
		break;
	case "3":
		$("#mapName").append("Hierarchial Edge Bundling")
		break;
	case "4":
		$("#mapName").append("Concept Map")
		break;
	case "5":
		$("#mapName").append("Tree Map")
		break;

	default:
		break;
	}
}
function columnsUpdate(worksheetName) {
	console.log(visualizationCode)
     if(visualizationCode <6){
    	 let column_size = tableau.extensions.settings.get("columns_size")
    	 columns=[]
    	 for (var i = 0; i < column_size; i++) {
    		 columns.push(tableau.extensions.settings.get("columns_"+i));
		}
     }else{
    	var worksheets = tableau.extensions.dashboardContent.dashboard.worksheets;
 	    var dataSourceName;
 	    worksheets.find(function (sheet) {
 	    	 if(sheet.name === worksheetName){
 	    		sheet.getSummaryDataAsync().then(dataTable => {
 	    			dataSource = dataTable;
 	      			columns=[]
 	      			$.each(dataTable.columns,function(i,d){
 	      				   columns.push(i+"_"+d.fieldName);
 	      			})
 	      			$('#field-body').empty();
 	      			field_counter = 5;
	 	   			for (var i = 0; i < 5; i++) {
	 	   				addField();
	 	   			}
 	      		});
 	    	 }
 	    });
     }
     $('.spinner').css("display", "none");
     $('#wrapper').css("display", "block");
}

function columnsUpdate1(worksheetName) {
	console.log(visualizationCode)
    var worksheets = tableau.extensions.dashboardContent.dashboard.worksheets;
    var dataSourceName;
     var worksheet = worksheets.find(function (sheet) {
    	 sheet.getDataSourcesAsync().then(function (sumdata) {
    		 dataSourceName = sumdata[0].name;
    	 })
      return sheet.name === worksheetName;
    });
   
     if(visualizationCode <=5){
	     worksheet.getDataSourcesAsync().then(datasources => {
	   	  dataSources1 = datasources.find(datasource => datasource.name === datasources[0].name);
		  return dataSources1.getUnderlyingDataAsync();
		}).then(dataTable => {
			dataSource = dataTable;
			console.log(dataTable);
			columns=[]
			$.each(dataTable.columns,function(i,d){
				   columns.push(i+"_"+d.fieldName);
				   data1.push(i+"_"+d.fieldName)
			})
			 $('.spinner').css("display", "none");
			$('#wrapper').css("display", "block");
			console.log(data1)
			data1.forEach(e=>{
				$("#field1").append($("<option></option>")
			                            .attr("value",function(){return e;}).attr("id",function(){return e.replace(/\s/g,'');})
			                            .text(e.split("_")[2])); 
				$("#measure-field").append($("<option></option>")
	                    .attr("value",function(){return e;})
	                    .text(e.split("_")[2]));
			})
			switchVisualization(visualizationCode);
		});
     }else{
    	 worksheet.getSummaryDataAsync().then(dataTable => {
    		 dataSource = dataTable;
   			columns=[]
   			console.log(dataTable);
   			$.each(dataTable.columns,function(i,d){
   				   columns.push(i+"_"+d.fieldName);
   				 data1.push(i+"_"+d.fieldName)
   			})
   			$('#field-body').empty();
   			field_counter = 5;
			for (var i = 0; i < 5; i++) {
				addField();
			}
			$('.spinner').css("display", "none");
			$('#wrapper').css("display", "block");
			switchVisualization(visualizationCode);
   		});
     }
}


function configure(){
	
}
function buildDataAndPayLoad(){
	 var fieldArray = getFieldArray();
	 var propertyArray = getPropertyArray();
	 var fieldMetricArray = getMetricArray();
	 var calArray = getCalArray();
	 var xx =0;
	 var pp =0;
	 let payLoad = {
				visualizationCode:visualizationCode,
				isAdvancedCharts:true,
				worksheetName:worksheetName,
				columns:[],
				properties:[],
				metrics:[]
			}
	 tableau.extensions.settings.set("worksheetName",worksheetName)
	 tableau.extensions.settings.set("visualization_code", visualizationCode);
	 payLoad.visualizationCode = visualizationCode;
	 
	 if(fieldArray){
		 fieldArray.forEach(function(value){
			  tableau.extensions.settings.set("selected_fields_"+ xx,value);
			  tableau.extensions.settings.set("selected_properties_"+ xx,value+"_"+propertyArray[xx]);
			  payLoad.columns.push(value);
			  payLoad.properties.push(value+"_"+propertyArray[xx]);
			  xx++;
		  })
	 }
	 tableau.extensions.settings.set("selected_fields_count",xx);
	 
	 if(fieldMetricArray){
	   	  let countMetric =0
	   	  $.each(fieldMetricArray,function(i,d){
	   		  if(calArray[i]!="NONE" ){
	   			  tableau.extensions.settings.set("metric_"+countMetric,d+"_"+calArray[i]);
	   			  payLoad.metrics.push(d+"_"+calArray[i])
	   			  countMetric++;
	   		  }
	   	  })
	   	  tableau.extensions.settings.set("metricCount",countMetric);
	 }
	 tableau.extensions.settings.erase("payLoad");
	 tableau.extensions.settings.set("payLoad", JSON.stringify(payLoad));
     tableau.extensions.settings.saveAsync().then(function(){ tableau.extensions.ui.closeDialog();})
}

function removeField(){
		var fieldArray = getFieldArray();
		if(fieldArray.length>1){
			$(this).parent().parent().remove();
			fieldArray = getFieldArray();
			if(fieldArray.length < field_counter ){
				
				$("#addFieldButton").prop( "disabled", false );
					if((visualizationCode == 3 || visualizationCode==4) ){
						addMetric();
						$("#metric-selection").removeClass("disable-element");
						$("#metricAddButton").addClass("disable-element");
					}
			}
		}
}

function removeMetric(){
	var fieldArray =getFieldArray();
	$(this).parent().parent().remove();
	if(fieldArray.length < field_counter){
		$("#addFieldButton").show();
		$("#addFieldButton").removeClass("disable-element");
		if(visualizationCode == 3 || visualizationCode==4){
			addField();
			$("#metric-selection").addClass("disable-element");
		}
	}
}

function buildUrls(){
	url = window.location.href ;
	url_array = url.split("/");
	map_name = url_array[5];
	level=url_array[url_array.length-1];
	app_url = url_array[0]+"/"+url_array[1]+"/"+url_array[2]+"/"+url_array[3]+"/";
	home_url=url_array[0]+"/"+url_array[1]+"/"+url_array[2]+"/"+url_array[3]+"/"+url_array[4]+"/"+url_array[5]+"/";
}

function getFieldArray(){
	return $('.field').map(function() {
		    return this.value;
		}).get()
}

function getMetricArray(){
	return fieldMetricArray = $('.field-metric').map(function() {
		 return this.value;
	 }).get();
	 
	  
}

function getCalArray(){
	return calArray = $('.calculation').map(function() {
		    return this.value;
		}).get();
}

function getPropertyArray(){
	return calArray = $('.property').map(function() {
		return this.value;
	}).get();
}

function addField(){
	 var fieldArray = $('.field').map(function() {
		    return this.value;
		}).get();
	 if(fieldArray.length <field_counter){
		 	var str_option="";
		 	var property_option="";
		 	columns.forEach(e=>{str_option = str_option +"<option value=\""+e+"\" id=\"fieldOption-"+e.split("_")[1]+"\">"+e.split("_")[1]+"</option>";})
			if(visualizationCode == 1){
				property_option = "<div class=\"col-md-5 col-lg-5 pt-2 \"><label>Property</label><select class=\"form-control property\" "+
							" style=\"width: 200px; height: 32px\"><option value=\"NONE\">--NONE--</option><option value=\"GROUP-BY\">GROUP BY</option>" +
							"</select></div>";
			}
			var str="<div class=\"row\"><div class=\"col-md-5 col-lg-5 pt-2 \"><label>Dimension</label> <select class=\"form-control field\" "+
							" style=\"width: 200px; height: 32px\">"+str_option+"</select> </div>"+property_option+"<div class=\"col-md-1 col-lg-1 pt-4 mt-3\"><label></label>"+
							"<button type=\"button\" data-toggle=\"collapse\"class=\"btn btn-primary mt-2 remove-field\" ><i class=\"fa fa-times-circle\"></i></button>"+
							"</div></div>";
			$('#field-body').append(str);
			if(fieldArray.length+1 >= field_counter)
				$("#addFieldButton").prop( "disabled", true );
			else
				$("#addFieldButton").prop( "disabled", false );
	 }else{
		 $("#addFieldButton").prop( "disabled", true );
	 }
}

function setFieldCounter(){
	if(visualizationCode){
		$("#data-section").removeClass("disable-element");
		$('#field-body').empty();
		$("#addFieldButton").prop( "disabled", false );
		switch (visualizationCode) {
		case "1":
			$("#metric-selection").removeClass("disable-element");
			$("#metricAddButton").removeClass("disable-element");
			field_counter = 100;
			addField();
			break;
		case "2":
			$("#metric-selection").addClass("disable-element");
			//columnsUpdate(worksheetName);
			field_counter = 5;
			for (var i = 0; i < 5; i++) {
				addField();
			}
			break;
		case "3":
			$("#metric-selection").addClass("disable-element");
			field_counter = 2;
			for (var i = 0; i < 2; i++) {
				addField();
			}
			break;
		case "4":
			$("#metric-selection").addClass("disable-element");
			field_counter = 2;
			for (var i = 0; i < 2; i++) {
				addField();
			}
			break;
		case "5":
			$("#metric-selection").addClass("disable-element");
			field_counter = 6;
			for (var i = 0; i < 3; i++) {
				addField();
			}
			break;
		s
			
		default:
			
			break;
		}
	}
}

function addMetric(){
	var str_option="";
	columns.forEach(e=>{str_option = str_option +"<option value=\""+e+"\" id=\"fieldOption-"+e.replace(/\s/g,'')+"\">"+e.split("_")[1]+"</option>";  })
	var	metric_option = "<select class=\"form-control calculation\"><option value=\"NONE\" >--NONE--</option><option value=\"SUM\" >SUM</option><option value=\"MIN\" >MIN</option>"+
	"<option value=\"MAX\" >MAX</option><option value=\"AVG\" >AVG</option><option value=\"COUNT\" >COUNT</option><option value=\"DISTINCT COUNT\" >DISTINCT COUNT</option></select>";
	
	var str="<div class=\"row\"><div class=\"col-md-4 col-lg-4 pt-2 \"><label>Measure</label> <select class=\"form-control field-metric\" >"+str_option+"</select>"
					+"</div><div class=\"col-md-4 col-lg-4 pt-3 \"><label></label>"+metric_option+"</div><div class=\"col-md-2 col-lg-2 pt-4 mt-2\"><label></label><button type=\"button\" data-toggle=\"collapse\""
					+"class=\"btn btn-primary mt-2 remove-metric\"><i class=\"fa fa-times-circle\"></i></div></div>";
	$('#metric-body').append(str);
}

// AG GRID

function processData(list){
	
	var arr = [];
	var columns = list[0];
	$.each(list,function(i,d){
		if(i!=0){
			var obj ={};
			$.each(columns,function(n,r){
				obj[r] = d[n]
			})
			
			arr.push(obj)
		}
		
	})
	var columnDefs = []
	$.each(columns,function(n,r){
		var obj ={
				headerName : r,
				field : r
		}
		columnDefs.push(obj)
	})
	
    var autoGroupColumnDef = {
        headerName: "Model", 
        field: "model", 
        cellRenderer:'agGroupCellRenderer',
        cellRendererParams: {
            checkbox: true
        }
    }

    // let the grid know which columns and what data to use
    var gridOptions = {
      columnDefs: columnDefs,
      enableSorting: true,
      enableFilter: true,
      autoGroupColumnDef: autoGroupColumnDef,
      groupSelectsChildren: true,
      rowSelection: 'multiple'
    };

  // lookup the container we want the Grid to use
  var eGridDiv = document.querySelector('#myGrid');
  d3.select("#myGrid").html("");
  // create the grid passing in the div to use together with the columns &
	// data we want to use
  var ag = new agGrid.Grid(eGridDiv, gridOptions);
  gridOptions.api.setRowData(arr);
  $('#myGrid').removeClass("loader");

}

function getSelectedRows() {
    const selectedNodes = gridOptions.api.getSelectedNodes()  
    const selectedData = selectedNodes.map( function(node) { return node.data })
    const selectedDataStringPresentation = selectedData.map( function(node) { return node.make + ' ' + node.model }).join(', ')
    console.log(gridOptions.api.getSelectedNodes() )
}

function closeDialog() {
    tableau.extensions.settings.saveAsync().then((newSavedSettings) => {
      tableau.extensions.ui.closeDialog();
    });
}

