'use strict';


// Wrap everything in an anonymous function to avoid polluting the global namespace
(function () {
	var columns,dashboard,selectedDataSource;
  


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
     		}else{
     			$("#radioButtonDiv").addClass("disable-element");
     		}
   	      columnsUpdate();
   	    });
    
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
        	  tableau.extensions.settings.set("count",xx);
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
	        var worksheetColumns = sumdata.columns;
	        worksheetColumns.forEach(function (f) {
	        	if(f.fieldName != "Code" && f.fieldName != "Name"){
		       		  $('#level')
		                 .append($("<option></option>")
		                            .attr("value",function(){
		                           	 
		                           	return f.fieldName;
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
	    			var worksheetColumns = dataTable.columns;

	    	        worksheetColumns.forEach(function (f) {
	    	        		$('#level')
	    		                 .append($("<option></option>")
	    		                            .attr("value",function(){
	    		                           	 
	    		                           	return f.fieldName;
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
