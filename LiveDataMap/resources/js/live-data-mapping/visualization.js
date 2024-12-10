var dashboard, level1, level = 0,consolidateData = [],fieldNames = [],worksheetName,worksheet,home_url,data1=[];
$(document).ready(function () {
	url = window.location.href ;
	url_array = url.split("/");
	map_name = url_array[5];
	level=url_array[url_array.length-1];
	app_url = url_array[0]+"/"+url_array[1]+"/"+url_array[2]+"/"+url_array[3]+"/";
	home_url=url_array[0]+"/"+url_array[1]+"/"+url_array[2]+"/"+url_array[3]+"/"+url_array[4]+"/"+url_array[5]+"/";
	
	tableau.extensions.initializeAsync({ 'configure': configure }).then(function () {
		dashboard = tableau.extensions.dashboardContent.dashboard;
		var count_field =tableau.extensions.settings.get("selected_field_count");
		
		
		
		for(var x=0;x<count_field;x++){
			data1.push(tableau.extensions.settings.get("selected_field_"+x))
		}
		
		data1.forEach(e=>{
			$("#field1").append($("<option></option>")
		                            .attr("value",function(){
		                            	
		                            
		                           	return e;
		                            }).attr("id",function(){
			                           	return e.replace(/\s/g,'');
			                          })
		                           
		                            .text(e.split("_")[2])); 
			$("#measure-field").append($("<option></option>")
                    .attr("value",function(){
                    	
                    
                   	return e;
                    })
                    .text(e.split("_")[2]));
		})
		$("#field-body").on("click", ".remove-field", function(){
			
      		$(this).parent().parent().remove();
      		 var fieldArray = $('.field').map(function() {
	      		    return this.value;
	      		}).get();
			 
      		if(fieldArray.length < field_counter)
				$("#addFieldButton").show();

      	});
		$("#metric-body").on("click", ".remove-metric", function(){
			
			$(this).parent().parent().remove();
			
			
		});
		
		 $('#closeButton').click(function(){
			 var fieldArray = $('.field').map(function() {
	      		    return this.value;
	      		}).get();
			 var propertyArray = []
			$('.property').map(function() {
				
				propertyArray.push($(this).val());
			 }).get();
			console.log(propertyArray)
      	   //return;
			  var xx =0;
			  var pp =0;
     	  if(fieldArray){
     		 fieldArray.forEach(function(value){
         		  tableau.extensions.settings.set("selected_fields_"+ xx,value);
         		  	  if(propertyArray[xx]!=null && propertyArray[xx]!= undefined && propertyArray[xx].length >0){
         			  tableau.extensions.settings.set("selected_properties_"+ xx,value+"_"+propertyArray[xx].join());
         		  	  }else{
         		  		 tableau.extensions.settings.set("selected_properties_"+ xx,value+"_NONE");
         		  	  }
         		
         		  xx++;
         	  })
         	  }
     	  console.log(fieldArray)
     	  tableau.extensions.settings.set("selected_fields_count",xx);
			 var fieldMetricArray = $('.field-metric').map(function() {
				 return this.value;
			 }).get();
			 
			 var calArray = $('.calculation').map(function() {
	      		    return this.value;
	      		}).get();
	        	  
			 if(fieldMetricArray){
	        	  let countMetric =0
	        	  $.each(fieldMetricArray,function(i,d){
	        		 
	        		  if(calArray[i]!="NONE" ){
	        			  tableau.extensions.settings.set("metric_"+countMetric,d+"_"+calArray[i]);
	        			  countMetric++;
	        		  }
	        	  })
	        	  tableau.extensions.settings.set("metric_count",countMetric);
	        }
	        	  tableau.extensions.settings.set("visualization_code", visualizationCode);
			 tableau.extensions.settings.saveAsync().then(function(){
       		  closeDialog()
       	  })
		 })
		
	});

});


function configure(){
	
}
var field_counter =0;

function addField(){
	 var fieldArray = $('.field').map(function() {
		    return this.value;
		}).get();
	 if(fieldArray.length <field_counter){
		 	var str_option="";
		 	var property_option="";
			data1.forEach(e=>{
				str_option = str_option +"<option value=\""+e+"\" id=\"fieldOption-"+e.replace(/\s/g,'')+"\">"+e.split("_")[2]+"</option>";
				
			})
			
			if(visualizationCode == 1){
				property_option = "<div class=\"col-md-5 col-lg-5 pt-2 \"><label>Property</label><select class=\"form-control property\" multiple"+
							" style=\"width: 200px; height: 32px\"><option value=\"GROUP-BY\">GROUP BY</option><option value=\"ORDER-BY\">ORDER BY</option><option value=\"GRAND-TOTAL\">GRAND TOTAL</option>" +
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
		case 1:
			$("#metric-selection").removeClass("disable-element");
			field_counter = 100;
			addField();
			break;
		case 2:
			$("#metric-selection").addClass("disable-element");
			field_counter = 5;
			for (var i = 0; i < 5; i++) {
				addField();
			}
			break;
		case 3:
			$("#metric-selection").addClass("disable-element");
			field_counter = 2;
			for (var i = 0; i < 2; i++) {
				addField();
			}
			break;
		case 4:
			$("#metric-selection").addClass("disable-element");
			field_counter = 2;
			for (var i = 0; i < 2; i++) {
				addField();
			}
			break;
		case 5:
			$("#metric-selection").addClass("disable-element");
			field_counter = 6;
			for (var i = 0; i < 3; i++) {
				addField();
			}
			break;
		case 6:
			$("#metric-selection").addClass("disable-element");
			field_counter = 3;
			for (var i = 0; i < 3; i++) {
				addField();
			}
			break;
		case 7:
			$("#metric-selection").addClass("disable-element");
			field_counter = 3;
			for (var i = 0; i < 3; i++) {
				addField();
			}
			break;
			
		default:
			break;
		}
		
	}
}


function addMetric(){
	var str_option="";
	data1.forEach(e=>{
		str_option = str_option +"<option value=\""+e+"\" id=\"fieldOption-"+e.replace(/\s/g,'')+"\">"+e.split("_")[2]+"</option>";                    
	})
	var	metric_option = "<select class=\"form-control calculation\"><option value=\"NONE\" >--NONE--</option><option value=\"SUM\" >SUM</option><option value=\"MIN\" >MIN</option>"+
	"<option value=\"MAX\" >MAX</option><option value=\"AVG\" >AVG</option><option value=\"COUNT\" >COUNT</option><option value=\"DISTINCT COUNT\" >DISTINCT COUNT</option></select>";
	
	var str="<div class=\"row\"><div class=\"col-md-4 col-lg-4 pt-2 \"><label>Measure</label> <select class=\"form-control field-metric\" >"+str_option+"</select>"
					+"</div><div class=\"col-md-4 col-lg-4 pt-3 \"><label></label> "+metric_option+"</div><div class=\"col-md-2 col-lg-2 pt-4 mt-2\"><label></label><button type=\"button\" data-toggle=\"collapse\""
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
	console.log(ag.columnApi)
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

