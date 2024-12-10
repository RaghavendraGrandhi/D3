'use strict';


// Wrap everything in an anonymous function to avoid polluting the global namespace
(function () {
	var columns,dashboard,selectedDataSource, worksheetColumns;
  


  $(document).ready(function () {
    
    tableau.extensions.initializeDialogAsync().then(function (openPayload) {
    	 dashboard = tableau.extensions.dashboardContent.dashboard;
    	 $("#selectWorksheet").append("<option value=''>--CHOOSE WORKSHEET--</option>");
    	  	dashboard.worksheets.forEach(function (worksheet) {
    	    $("#selectWorksheet").append("<option value='" + worksheet.name + "'>" + worksheet.name + "</option>");
    	  	});
     	openPayload = "PAYLOAD";
            var radioValue = $("input[name='dataSource']:checked").val();
            if(radioValue){
            	selectedDataSource = radioValue;
            }
            $("input[name='dataSource']").on('change', '', function (e) {
            	 var radioValue = $("input[name='dataSource']:checked").val();
                 if(radioValue){
                 	selectedDataSource = radioValue;
                 }
         	      columnsUpdate();
         	      
       	    });
     	$('#selectWorksheet').on('change', '', function (e) {
     		if($('#selectWorksheet').val().length>0){
     		$("#radioButtonDiv").removeClass("disable-element");
     		$("#addMetric").show();
     		}else{
     			$("#radioButtonDiv").addClass("disable-element");
     			$("#addMetric").hide();
     		}
   	      columnsUpdate();
   	    });
     	$("#level").on('change',function(e){
     		let values = $("#level").val();
     		$("#dimensionDiv").empty();
     		values.forEach(i=>{
     			$("#dimensionDiv").append("<div class=\"row\" style=\"margin:10px\"><div class=\"col-sm-5\"><input value=\""+worksheetColumns[i].fieldName+"\" class=\"form-control \"\></div><div class=\"col-sm-5\"><select  class=\"form-control col-md-5 property\"><option value=\"0\">--NONE--</option><option value=\"1\">GROUP BY</option><option value=\"2\">ORDER BY</option><option value=\"3\">GRAND TOTAL</option></select></div></div>")
     		})
     	})
     	$("#metricDiv").on("click", ".remove-metric", function(){
			
      		$(this).parent().parent().remove();
      		
      	});
     	$("#addMetric").on('click',function(){
     		
     		let metricString = "<select class=\"form-control col-md-5 metric\">"+$('#level').html()+"</select>"
     	  $("#metricDiv").append("<div class=\"row\" style=\"margin:10px\"><div class=\"col-sm-4\">"+metricString+"</div><div class=\"col-sm-4\"><select  class=\"form-control col-md-5 metricFun\"><option value=\"1\">SUM</option><option value=\"2\">AVG</option><option value=\"3\">MIN</option><option value=\"4\">MAX</option><option value=\"5\">COUNT</option><option value=\"6\">DISTINCT COUNT</option></select></div>"
     			  +"<div class=\"col-sm-2\"><button type=\"button\" data-toggle=\"collapse\"class=\"btn btn-primary mt-2 remove-metric\" ><span class=\"glyphicon glyphicon-remove\"></span><i class=\"fa fa-times-circle\"></div></i></button></div>")
     	})
    
    	openPayload = "PAYLOAD";
      $('#closeButton').click(function(){
    	  Object.keys(tableau.extensions.settings.getAll()).forEach(function(d){
    		  tableau.extensions.settings.erase(d)
    	  })
    	
        
        	  var values = $("#level").val();
        	 
        	  var xx =0;
        	 
        	  values.forEach(function(value){
        		  tableau.extensions.settings.set(xx++,value);
        	  })
        	   var fieldMetricArray = $('.property').map(function() {
				 return this.value;
			 }).get();
        	  var yy =0;
        	  fieldMetricArray.forEach(function(value){
        		  tableau.extensions.settings.set('property_'+yy++,value);
        	  })
        	  var metricArray = $('.metric').map(function() {
        		  return this.value;
        	  }).get();
        	  var metricFunArray = $('.metricFun').map(function() {
        		  return this.value;
        	  }).get();
        	  var zz =0;
        	  metricArray.forEach(function(value){
        		  tableau.extensions.settings.set('metric_'+zz++,value);
        	  })
        	  var pp = 0;
        	  metricFunArray.forEach(function(value){
        		  tableau.extensions.settings.set('metricFun_'+pp++,value);
        	  })

        	  tableau.extensions.settings.set("count",xx);
        	  tableau.extensions.settings.set("property-count",yy);
        	  tableau.extensions.settings.set("metric-count",zz);
        	  tableau.extensions.settings.set("worksheet",  $("#selectWorksheet").val());
        	  tableau.extensions.settings.set("selectedDataSource",  selectedDataSource);
        	  tableau.extensions.settings.saveAsync().then(function(){
        		  console.log(tableau.extensions.settings.getAll())
        		  closeDialog()
        	  })
        	  })
         
          
         
      
      

    });
  });
  function columnsUpdate() {
	    var worksheets = tableau.extensions.dashboardContent.dashboard.worksheets;
	    var worksheetName = $("#selectWorksheet").val();
	   
		$('#level').empty();  
		$("#loadDiv").show();
	    
	    var worksheet = worksheets.find(function (sheet) {
	      return sheet.name === worksheetName;
	    });
	    if(selectedDataSource == 0){
	      worksheet.getSummaryDataAsync().then(function (sumdata) {
	         worksheetColumns = sumdata.columns;
	        worksheetColumns.forEach(function (f) {
	        	if(f.fieldName != "Code" && f.fieldName != "Name"){
		       		  $('#level')
		                 .append($("<option></option>")
		                            .attr("value",function(){
		                           	 
		                           	return f.index;
		                            })
		                            .text(f.fieldName)); 
       		 
	        	}
	        	$("#loadDiv").hide();
       		 
   			
	        });
	      });
	    }else{
	    	  worksheet.getDataSourcesAsync().then(datasources => {
	    	   	var  dataSources1 = datasources.find(datasource => datasource.name === datasources[0].name);
	    		  return dataSources1.getUnderlyingDataAsync();
	    		}).then(dataTable => {
	    			 worksheetColumns = dataTable.columns;

	    	        worksheetColumns.forEach(function (f) {
	    	        		$('#level')
	    		                 .append($("<option></option>")
	    		                            .attr("value",function(){
	    		                           	 
	    		                           	return f.index;
	    		                            })
	    		                            .text(f.fieldName)); 
	           		 
	    	        	
	    	        });
	    	        $("#loadDiv").hide();
	    		});
	    }
	  }

  function closeDialog() {
   

    tableau.extensions.settings.saveAsync().then((newSavedSettings) => {
      tableau.extensions.ui.closeDialog();
     
    });
  }
  
})();

