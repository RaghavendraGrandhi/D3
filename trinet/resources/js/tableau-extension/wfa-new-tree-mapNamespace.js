'use strict';

/**
 * UINamespace Sample Extension
 * 
 * This is the popup extension portion of the UINamespace sample, please see
 * uiNamespace.js in addition to this for context.  This extension is 
 * responsible for collecting configuration settings from the user and communicating
 * that info back to the parent extension.
 * 
 * This sample demonstrates two ways to do that:
 *   1) The suggested and most common method is to store the information 
 *      via the settings namespace.  The parent can subscribe to notifications when
 *      the settings are updated, and collect the new info accordingly.
 *   2) The popup extension can receive and send a string payload via the open 
 *      and close payloads of initializeDialogAsync and closeDialog methods.  This is useful
 *      for information that does not need to be persisted into settings.
 */


// Wrap everything in an anonymous function to avoid polluting the global namespace
(function () {
	var columns;
  /**
   * This extension collects the IDs of each datasource the user is interested in
   * and stores this information in settings when the popup is closed.
   */
  const datasourcesSettingsKey = 'selectedDatasources';
  let selectedDatasources = [];

  $(document).ready(function () {
    
    tableau.extensions.initializeDialogAsync().then(function (openPayload) {
    	 let dashboard = tableau.extensions.dashboardContent.dashboard;
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
    	  tableau.extensions.settings.set("level4", $("#level4").val());
    	  
          tableau.extensions.settings.saveAsync().then(function(){

        	  tableau.extensions.ui.closeDialog("");
            	 
              })
          })
          
    	 
    	  
    	  
  
     



      
    });
  });
  
  
 
 
  
  
  function columnsUpdate() {
	    var worksheets = tableau.extensions.dashboardContent.dashboard.worksheets;
	    var worksheetName = $("#selectWorksheet").val();
	   

	    // Get the worksheet object for the specified names.
	    var worksheet = worksheets.find(function (sheet) {
	      return sheet.name === worksheetName;
	    });

	    // If underlying is 1 then get Underlying, else get Summary. Note that the columns will
	    // look different if you have summary or underlying.
	      // Note that for our purposes and to speed things up we only want 1 record.
	      worksheet.getUnderlyingDataAsync({ maxRows: 1 }).then(function (sumdata) {
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
           		  $('#level4')
           		  .append($("<option></option>")
           				  .attr("value",function(){
           					  
           					  return f.fieldName;
           				  })
           				  .text(f.fieldName)); 
           		 
       			  }
	        });
	      });
	   
	  }


 
  function closeDialog() {
   

    tableau.extensions.settings.saveAsync().then((newSavedSettings) => {
      tableau.extensions.ui.closeDialog("");
     
    });
  }
})();
