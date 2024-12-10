'use strict';

var columns,dashboard,pdColumns,join="INNER";
// Wrap everything in an anonymous function to avoid polluting the global namespace
(function () {
  


  $(document).ready(function () {
    
    tableau.extensions.initializeDialogAsync().then(function (openPayload) {
    	 dashboard = tableau.extensions.dashboardContent.dashboard;
    	 $("#selectWorksheet").append("<option value=''>--Choose Worksheet--</option>");
    	  	dashboard.worksheets.forEach(function (worksheet) {
    	    $("#selectWorksheet").append("<option value='" + worksheet.name + "'>" + worksheet.name + "</option>");
    	  	});
     	openPayload = "PAYLOAD";
     	
     	
     	$('#selectWorksheet').on('change', '', function (e) {
     		clearFields()
     		if($('#selectWorksheet').val()!=''){
     			columnsUpdate();
     			$("#workSheetButton").prop('disabled',false);
     		}else{
     			$("#workSheetButton").prop('disabled',true);
     			$("#step2").addClass("disable-element");
     			$("#collapse2").removeClass("in");
     			$("#step3").addClass("disable-element");
     			$("#collapse3").removeClass("in");
     		}
     		
   	    });
     	$("#workSheetButton").on("click", "", function(){
     		$("#step2").removeClass("disable-element");
     		$("#collapse1").removeClass("in");
     		$("#collapse1").removeClass("show");
     	})
     	$("#joinSubmitButton").on("click", "", function(){
     		$("#step3").removeClass("disable-element");
     		$("#collapse1").removeClass("in");
     		$("#collapse2").removeClass("in");
     		$("#collapse1").removeClass("show");
     	})
     	$("#checkAllTableauFields").click(function() {
     		let c = $('.calculation-field').map(function() {
      		    return $(this).attr("id").split("-")[1].replace(/`/g,' ');
      		}).get();
     		console.log(c)
     		if($(this).is(":checked")){
     			c.forEach(i=>{
     			  if(i.includes("pd_")){
     				  $("#div-"+i.replace(/\s/g,'').replace("#","")).remove();
     			  }
   				 
   			  })
   			  addAllfields("level");
   			 $("#level option").prop('disabled',true);
     		}else{
     			c.forEach(i=>{
       			  if(i.includes("pd_")){
       				  $("#div-"+i.replace(/\s/g,'').replace("#","")).remove();
       			  }
     				 
     			  })
     			$("#level option").prop('disabled',false);
     		}
 			 
     	   
     	});
     	$("#checkAllExtrnalFields").click(function() {
     		let c = $('.calculation-field').map(function() {
      		    return $(this).attr("id").split("-")[1].replace(/`/g,' ');
      		}).get();
 			  console.log(c)
 			 if($(this).is(":checked")){
      			c.forEach(i=>{
      			  if(i.includes("sd_")){
      				  $("#div-"+i.replace(/\s/g,'').replace("#","")).remove();
      			  }
    				 
    			  })
    			   addAllfields("level1");
    			 $("#level1 option").prop('disabled',true);
      		}else{
     			c.forEach(i=>{
         			  if(i.includes("sd_")){
         				  $("#div-"+i.replace(/\s/g,'').replace("#","")).remove();
         			  }
       				 
       			  })
       			$("#level1 option").prop('disabled',false);
       		}
     	});
     	 
     	 $("#level").on("click", "option", function(){
     		constructMetricViewClick($(this))
     	
     		$(this).prop('disabled',true);
     	});
     	 $("#level1").on("click", "option", function(){
      		constructMetricViewClick($(this));
      		$(this).prop('disabled',true);
      	});
     	 $("#metric-box").on("click", ".remove-field", function(){
     		
     		 var eId= $(this).parent().attr("id").split("-")[1];
     		$(this).parent().remove();

       		$("#"+eId.replace(/./g,'')).prop('disabled',false);
       		
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
     		 $('#level1')
             .append($("<option></option>")
                        .attr("value",function(){
                       	 
                       	return "sd_"+i+"_"+tableau.extensions.settings.get("columns_"+i);
                        }).attr("id",function(){
                           	return "sd_"+i+"_"+tableau.extensions.settings.get("columns_"+i).replace(/\s/g,'');
                        })
                         .text(tableau.extensions.settings.get("columns_"+i)));
     		 $('#metric')
             .append($("<option></option>")
                        .attr("value",function(){
                       	 
                       	return "sd_"+i+"_"+tableau.extensions.settings.get("columns_"+i);
                        })
                         .text(tableau.extensions.settings.get("columns_"+i)));
     	
     	}

     	 $('#join').append($("<option></option>").attr("value","Inner Join").text("Inner Join"));
     	 $('#join').append($("<option></option>").attr("value","Left Join").text("Left Join"));
     	 $('#join').append($("<option></option>").attr("value","Right Join").text("Right Join"));
     	 $('#join').append($("<option></option>").attr("value","Outer Join").text("Outer Join"));
     	 
	  	  
     	
     	
     	
    
    
    	openPayload = "PAYLOAD";
      $('#closeButton').click(function(){
    	  Object.keys(tableau.extensions.settings.getAll()).forEach(function(d){
    		  tableau.extensions.settings.erase(d)
    	  })

	  	 
	  
	  	  var columns = $("#columns").val();
	  	    var join_field = $("#join_field").val();
	     	var join_column = $("#join_column").val();
        	 
        	 
        	  var xx =0;
        	  var yy =0;
        	  var zz =0;
        	  pdColumns.forEach(function(value){
        		  tableau.extensions.settings.set("primary_column_"+ zz++ ,value);
        	  })
        	   tableau.extensions.settings.set("primary_column_count",zz);

        	  var calFieldArray = $('.calculation-field').map(function() {
        		    return $(this).attr("id").split("-")[1].replace(/`/g,' ');
        		}).get();
        	  if(calFieldArray){
        		  calFieldArray.forEach(function(value){
            		  tableau.extensions.settings.set("selected_field_"+ xx++,value);
            	  })
            	  }
        	  console.log(calFieldArray)
        	  tableau.extensions.settings.set("selected_field_count",xx);
        	  
        	  var calArray = $('.calculation').map(function() {
      		    return this.value;
      		}).get();
        	  if(calArray){
        	  let countMetric =0
        	  $.each(calArray,function(i,d){
        		  console.log(d)
        		  if(d!="NONE" ){
        			  tableau.extensions.settings.set("metric_"+countMetric,d);
        			  countMetric++;
        		  }
        	  })
        	  tableau.extensions.settings.set("metric_count",countMetric);
        	  }

        	  tableau.extensions.settings.set("selected_column_count",yy);
        	  tableau.extensions.settings.set("worksheet",  $("#selectWorksheet").val());
        	  tableau.extensions.settings.set("join",join);
        	  tableau.extensions.settings.set("join_field",join_field);
        	  tableau.extensions.settings.set("join_column",join_column);
        	  tableau.extensions.settings.saveAsync().then(function(){
        		  closeDialog()
        	  })
        	  })


    });
  });
  
  
  function clearFields(){
	  $('#level').empty();
	    $('#metric').empty();
	    $('#join_field').empty();
	   $("#metric-box").empty();
  }
  
  
  function constructMetricView(){
	  var values = $("#level").val();
		var values1 = $("#level1").val();
		$('#metric-box').empty();
		$('#metric-box').append($("<div class=\"row\"><div class=\"col-md-3\"></div><div class=\"col-md-3\"><div>Select Calculation</div></div></div>"));
		  if(values){
		$.each(values,function(i,value){
			
			$('#metric-box').append($("<div class=\"row\">" +
					"<div class=\"col-md-3\"><select class=\"form-control \" style=\"margin-left:50px;margin:10px;width:200px\" >" +
					"<option value=\""+value+"\" selected>"+value.split("_")[2]+"</option></select></div>" +
							"<div class=\"col-md-3\">"+
							"<select name=\"metric\" class=\"form-control calculation\" id=\"metric_cal_0\" style=\"margin-top: 10px\">"+
							"<option value=\"NONE\">--NONE--</option><option value=\""+value+"_SUM\">SUM</option><option value=\""+value+"_MIN\">MIN</option><option value=\""+value+"_MAX\">MAX</option>"+
							 "<option value=\""+value+"_AVG\">AVG</option><option value=\""+value+"_COUNT\">COUNT</option><option value=\""+value+"_DISTINCT COUNT\">DISTINCT COUNT</option></select></div>" +
							 		"<div class=\"col-md-3\"><button type=\"button\" class=\"btn btn-default btn-lg\"><span class=\"glyphicon glyphicon-minus\"></span></button></div>"));
	  })
		  }
	  if(values1){
	  values1.forEach(function(value){
			
			$('#metric-box').append($("<div class=\"row\">" +
					"<div class=\"col-md-3\"><select class=\"form-control \" style=\"margin-left:50px;margin:10px;width:200px\" >" +
					"<option value=\""+value+"\" selected>"+value.split("_")[2]+"</option></select></div>" +
							"<div><div class=\"col-md-3\">"+
							"<select name=\"metric\" class=\"form-control calculation\" id=\"metric_cal_0\" style=\"margin-top: 10px\">"+
							"<option value=\"NONE\">--NONE--</option><option value=\""+value+"_SUM\">SUM</option><option value=\""+value+"_MIN\">MIN</option><option value=\""+value+"_MAX\">MAX</option>"+
							 "<option value=\""+value+"_AVG\">AVG</option><option value=\""+value+"_COUNT\">COUNT</option><option value=\""+value+"_DISTINCT COUNT\">DISTINCT COUNT</option></select></div>"));
	  })
	  }
  }

  function constructMetricViewClick1( element){
	  console.log(element.val())
	  var value = element.val();
		
			
			$('#metric-box').append($("<div class=\"row\" id=\"div-"+value.replace(/\s/g,'').replace("#","")+"\">" +
					"<div class=\"col-md-3\"><select class=\"form-control calculation-field\" style=\"margin-left:50px;margin:10px;width:200px\" >" +
					"<option value=\""+value+"\" selected>"+value.split("_")[2]+"</option></select></div>" +
					"<div class=\"col-md-3\" style=\"margin-top: 10px\"><button type=\"button\" class=\"btn btn-default btn-sm form-control remove-field\" id=\"remove-"+value+"\" style=\"width: 40px\"><span class=\"glyphicon glyphicon-minus\"></span></button></div></div>"));
	 

  }
  
  function  addAllfields(id){
	   $("#"+id+" option").map(function() {
		   constructMetricViewClick($(this));
		});
	  
	  
  };
  function constructMetricViewClick( element){
	  console.log(element.val())
	  var value = element.val();
	  
	  
	  $('#metric-box').append($("<span class=\"badge badge1 p-2 mr-2 calculation-field\" id=\"div-"+value.replace(/\s/g,'')+"\">"+value.split("_")[2]+" &nbsp;<i class=\"fa fa-times-circle danger remove-field\"></i></span>"));
	  
	  
  }
  function joinDiv( ){
	  
	  var value = $("#joinDiv").html();
	  
	  
	  $('#metric-box').append($("<span class=\"badge badge1 p-2 mr-2 calculation-field\" id=\"div-"+value.replace(/\s/g,'`')+"\">"+value.split("_")[2]+" &nbsp;<i class=\"fa fa-times-circle danger remove-field\"></i></span>"));
	  
	  
  }
  
  
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
	   
	     
	     worksheet.getDataSourcesAsync().then(datasources => {
    	  let dataSources1 = datasources.find(datasource => datasource.name === datasources[0].name);
    	  
    	  return dataSources1.getUnderlyingDataAsync();
    	}).then(dataTable => {
	    	
	        var worksheetColumns = dataTable.columns;
	        console.log(worksheetColumns)
	    	 
	        let count =0;
	        pdColumns=[]
	        $.each(worksheetColumns,function (i,f) {
	        	if(f){
	        	
	        		
		       		  $('#level')
		                 .append($("<option></option>")
		                            .attr("value",function(){
		                            	
		                            
		                           	return "pd_"+count+"_"+f.fieldName;
		                            }).attr("id",function(){
			                           	return "pd_"+count+"_"+f.fieldName.replace(/\s/g,'');
			                          })
		                            .attr("class",function(){
		                            
		                           	return "level-elements";
		                            })
		                            .text(f.fieldName)); 
		       		 $('#metric')
		            .append($("<option></option>")
		                            .attr("value",function(){
		                           	 
		                           	return "pd_"+count+"_"+f.fieldName;
		                            })
		                            .text(f.fieldName)); 
		       		$('#join_field')
		       		.append($("<option></option>")
                            .attr("value",function(){
                            	pdColumns.push(f.fieldName);
                           	return "pd_"+count+"_"+f.fieldName;
                            })
                            .text(f.fieldName));
		       		count++;
       		 
	        	}
	        	
   			
	        });
	      
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
