'use strict';


(function () {
	var columns,dashboard;


  $(document).ready(function () {
   
    tableau.extensions.initializeDialogAsync().then(function (openPayload) {
     
    	
    	openPayload = "PAYLOAD";
    	dashboard = tableau.extensions.dashboardContent.dashboard;
    	 $("#selectWorksheet").append("<option value=''>--CHOOSE WORKSHEET--</option>");
 	  		dashboard.worksheets.forEach(function (worksheet) {
 	  			$("#selectWorksheet").append("<option value='" + worksheet.name + "'>" + worksheet.name + "</option>");
 	  		});

		  	$('#selectWorksheet').on('change', '', function (e) {
			      columnsUpdate();
			    });
      $('#closeButton').click(function(){
    	  tableau.extensions.settings.set("worksheet",  $("#selectWorksheet").val());
    	  tableau.extensions.settings.set("vertical", $("#level").val());
    	  tableau.extensions.settings.set("horizontal", $("#horizontal").val());
    	  tableau.extensions.settings.set("filter", $("#filter").val());
    	  tableau.extensions.settings.set("metric", $("#metric").val());
          tableau.extensions.settings.saveAsync().then(function(){
        	 
        	  
          	
        	  tableau.extensions.ui.closeDialog();
        	  
          })
          
    	 
    	  
    	  
      });

    });
  });
  function columnsUpdate() {
	    var worksheets = tableau.extensions.dashboardContent.dashboard.worksheets;
	    var worksheetName = $("#selectWorksheet").val();
	   

	    
	    var worksheet = worksheets.find(function (sheet) {
	      return sheet.name === worksheetName;
	    });

	    
	      worksheet.getSummaryDataAsync().then(function (sumdata) {
	        var worksheetColumns = sumdata.columns;
	        
	        worksheetColumns.forEach(function (f) {
	        	
	        	 if(!f.isGenerated && f.fieldName != "Number of Records"){
	        		 $('#level')
	                  .append($("<option></option>")
	                             .attr("value",f.fieldName)
	                             .text(f.fieldName)); 
	        		  
	        		  $('#horizontal')
	                  .append($("<option></option>")
	                             .attr("value",f.fieldName)
	                             .text(f.fieldName)); 
	        		  $('#filter')
	                  .append($("<option></option>")
	                             .attr("value",f.fieldName)
	                             .text(f.fieldName)); 
	        		  $('#metric')
	                  .append($("<option></option>")
	                             .attr("value",f.fieldName)
	                             .text(f.fieldName)); 
  			  }
	        });
	      });
	   
	  }


  
  })();
