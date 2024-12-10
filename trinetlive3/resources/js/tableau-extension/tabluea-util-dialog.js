'use strict';
var columns,dashboard;

// Wrap everything in an anonymous function to avoid polluting the global namespace
(function () {
	
 

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
   	
    	openPayload = "PAYLOAD";
      $('#closeButton').click(function(){
    	  tableau.extensions.settings.set("worksheet",  $("#selectWorksheet").val());

    	  tableau.extensions.settings.set("level1", $("#level1").val());
    	  tableau.extensions.settings.set("level2", $("#level2").val());
    	  tableau.extensions.settings.saveAsync().then(function(){
        	  var worksheets = dashboard.worksheets;
        	    var worksheetName = tableau.extensions.settings.get("worksheet");

        	    var worksheet = worksheets.find(function (sheet) {
        	     return sheet.name === worksheetName;
        	   });
        	    worksheet.getFiltersAsync().then(function(f){
        	    	f.forEach(function(f1){
        	    		console.log(f1.fieldName)
        	    		 worksheet.clearFilterAsync(f1.fieldName)
        	    	})
        	    })
              	 closeDialog()
            	 
              })
          })



//      dashboard.worksheets.forEach(function (worksheet) {
//        worksheet.getDataSourcesAsync().then(function (datasources) {
//          datasources.forEach(function (datasource) {
//        	  datasource.getUnderlyingDataAsync().then(function(datatable){
//        		  let field = datatable.columns;
//        		  field.forEach(function (f) {
//        			  if(!f.isGenerated){
//            		  $('#level1')
//                      .append($("<option></option>")
//                                 .attr("value",function(){})
//                                 .text(f.fieldName)); 
//        			  }
//        			  $('#level2')
//        			  .append($("<option></option>")
//        					  .attr("value",function(){})
//        					  .text(f.fieldName)); 
//        		  
//            	  });
//        		    console.log(datatable.columns)
//        	  })
//        	 // console.log(datasource.fields)
//        	 
//          });
//        });
//      });
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
      		
  			  }
	        });
	      });
	   
	  }



  function closeDialog() {
    

    tableau.extensions.settings.saveAsync().then((newSavedSettings) => {
      tableau.extensions.ui.closeDialog();
     
    });
  }
 
})();
