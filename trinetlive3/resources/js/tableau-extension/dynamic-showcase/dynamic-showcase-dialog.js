'use strict';

(function () {
	var columns,dashboard;
  
  const datasourcesSettingsKey = 'selectedDatasources';
  let selectedDatasources = [];

  $(document).ready(function () {
    
    tableau.extensions.initializeDialogAsync().then(function (openPayload) {
     
    
    	dashboard = tableau.extensions.dashboardContent.dashboard;
   	 $("#selectWorksheet").append("<option value=''>--CHOOSE WORKSHEET--</option>");
  	  	dashboard.worksheets.forEach(function (worksheet) {
  	    $("#selectWorksheet").append("<option value='" + worksheet.name + "'>" + worksheet.name + "</option>");
  	  	});
   	openPayload = "PAYLOAD";
   	
   	
   	$('#selectWorksheet').on('change', '', function (e) {
 	      columnsUpdate();
 	    });
   	
      $('#closeButton').click(function(){
    	  tableau.extensions.settings.set("worksheet",  $("#selectWorksheet").val());
    	  tableau.extensions.settings.set("level1", $("#level1").val());
    	  tableau.extensions.settings.set("level2", $("#level2").val());
    	  tableau.extensions.settings.set("level3", $("#level3").val());
    	  
          tableau.extensions.settings.saveAsync().then(function(){

        	  tableau.extensions.ui.closeDialog();
            	 
              })
          })

      
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
	        	console.log(f)
	        	 if(!f.isGenerated && f.fieldName != "Number of Records"){
       		  $('#level1')
                 .append($("<option></option>")
                            .attr("value",function(){
                           	 
                           	return f.fieldName;
                            })
                            .text(f.fieldName)); 
       		  $('#level2')
       		  .append($("<option></option>")
       				  .attr("value",function(){
       					  
       					  return f.fieldName;
       				  })
       				  .text(f.fieldName)); 
       		  $('#level3')
       		  .append($("<option></option>")
       				  .attr("value",function(){
       					  
       					  return f.fieldName;
       				  })
       				  .text(f.fieldName)); 
       		 
       		 
   			  }
	        });
	      });
	   
	  }


})();
