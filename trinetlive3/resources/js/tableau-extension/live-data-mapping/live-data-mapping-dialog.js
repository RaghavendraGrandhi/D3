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
     	
     	let columns_length= tableau.extensions.settings.get("columns_length");
     	for(let i=0;i<columns_length;i++){
     		 $('#columns')
             .append($("<option></option>")
                        .attr("value",function(){
                       	 
                       	return "sd_"+i+"_"+tableau.extensions.settings.get("columns_"+i);
                        })
                         .text(tableau.extensions.settings.get("columns_"+i)));
     		 
     		$('#join_column').append($("<option></option>").attr("value",function(){
              	 
               	return "sd_"+i+"_"+tableau.extensions.settings.get("columns_"+i);
                })
                 .text(tableau.extensions.settings.get("columns_"+i)));
     		 $('#level')
             .append($("<option></option>")
                        .attr("value",function(){
                       	 
                       	return "sd_"+i+"_"+tableau.extensions.settings.get("columns_"+i);
                        })
                         .text(tableau.extensions.settings.get("columns_"+i)));
     	
     	}
     	 $('#join').append($("<option></option>").attr("value","inner").text("Inner Join"));
     	 $('#join').append($("<option></option>").attr("value","left").text("Left Join"));
     	 $('#join').append($("<option></option>").attr("value","right").text("Right Join"));
     	 $('#join').append($("<option></option>").attr("value","outer").text("Outer Join"));
     	 
	  	  
     	
     	
     	
    
    
    	openPayload = "PAYLOAD";
      $('#closeButton').click(function(){
    	  Object.keys(tableau.extensions.settings.getAll()).forEach(function(d){
    		  tableau.extensions.settings.erase(d)
    	  })
    	var values = $("#level").val();
 	  	
	  	  var join = $("#join").val();
	  
	  	  var columns = $("#columns").val();
	  	    var join_field = $("#join_field").val();
	     	var join_column = $("#join_column").val();
        	 
        	 
        	  var xx =0;
        	  var yy =0;
        	 
        	  values.forEach(function(value){
        		  console.log(value)
        		  tableau.extensions.settings.set("selected_field_"+ xx++,value);
        	  })
        	  tableau.extensions.settings.set("selected_field_count",xx);
//        	  columns.forEach(function(value){
//        		  tableau.extensions.settings.set("selected_column_"+ yy++,value);
//        	  })
        	  tableau.extensions.settings.set("selected_column_count",yy);
        	  tableau.extensions.settings.set("worksheet",  $("#selectWorksheet").val());
        	  tableau.extensions.settings.set("join",join);
        	  tableau.extensions.settings.set("join_field",join_field);
        	  tableau.extensions.settings.set("join_column",join_column);
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
	   

	    
	   
	    var dataSourceName;
	     var worksheet = worksheets.find(function (sheet) {
	    	 sheet.getDataSourcesAsync().then(function (sumdata) {
	    		 dataSourceName = sumdata[0].name;
	    	 })
	      return sheet.name === worksheetName;
	    });
	     worksheet.getDataSourcesAsync().then(data=>{
	    	 console.log(data);
	    	 $('#metric')
             .append($("<option></option>")
                        .attr("value",function(){
                       	 
                       	return "pd_";
                        })
                        .text("")); 
	     })
	     
	     tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === worksheetName).getDataSourcesAsync().then(datasources => {
	    	 var dataSource = datasources.find(datasource => datasource.name === dataSourceName);
	    	  return dataSource.getUnderlyingDataAsync();
	    	}).then(dataTable => {
	    	console.log(dataTable)
	    	
	        var worksheetColumns = dataTable.columns;
	        let count =0;
	        $.each(worksheetColumns,function (i,f) {
	        	if(f){
	        		count++;
		       		  $('#level')
		                 .append($("<option></option>")
		                            .attr("value",function(){
		                           	 
		                           	return "pd_"+i+"_"+f.fieldName;
		                            })
		                            .text(f.fieldName)); 
		       		$('#join_field')
		       		.append($("<option></option>")
                            .attr("value",function(){
                           	 
                           	return "pd_"+i+"_"+f.fieldName;
                            })
                            .text(f.fieldName));
       		 
	        	}
       		 
   			
	        });
	        console.log(count)
	    	});
	      worksheet.getDataSourcesAsync().then(function (sumdata) {
	      });
	   
	  }

  function closeDialog() {
   

    tableau.extensions.settings.saveAsync().then((newSavedSettings) => {
      tableau.extensions.ui.closeDialog();
     
    });
  }
  
})();
