'use strict';


// Wrap everything in an anonymous function to avoid polluting the global namespace
(function () {
	var columns,dashboard;
  


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
        	  tableau.extensions.settings.set("name",  $("#name").val());
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
	   

	    
	    var worksheet = worksheets.find(function (sheet) {
	      return sheet.name === worksheetName;
	    });

	    
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
	        	if(f.fieldName != "Code"){
	        		 $('#name')
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
