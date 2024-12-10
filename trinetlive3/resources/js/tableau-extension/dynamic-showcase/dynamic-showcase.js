var dashboard, level1, level = 0,consolidateData = [],fieldNames = [];
$(document).ready(function () {
	url = window.location.href ;
	url_array = url.split("/");
	map_name = url_array[5];
	level=url_array[url_array.length-1];
	

	tableau.extensions.initializeAsync({ 'configure': configure }).then(function () {

		dashboard = tableau.extensions.dashboardContent.dashboard;
		
		configure();
		
		
		
	
	});

});
function constructData() {

	var columns =[];
	var index = []
	
	
	var data1 = [];
	for(var x=1;x<=3;x++){
		data1.push(tableau.extensions.settings.get("level"+x))
	}
	console.log(data1)
	
	  var worksheets = dashboard.worksheets;
	     worksheetName = tableau.extensions.settings.get("worksheet");

	    var worksheet = worksheets.find(function (sheet) {
	      return sheet.name === worksheetName;
	    });
	    
	    worksheet.getSummaryDataAsync().then(function (sumdata) {
	    	
	    	 for(var i=0;i<data1.length;i++){
	    	sumdata.columns.forEach(function(c){
	        				  if(c.fieldName == data1[i]){
	        					  columns.push(c.fieldName);
	        					  index.push(c.index)
	        				  }
        			  })
	    	 }
        			  
        			   let list = [];
        	list.push(columns)
        	sumdata.data.forEach(function(d){

  			  var r=[];
  			  for(p=0;p<index.length ; p++){
  				  if(d[index[p]].value!=null && d[index[p]].value!= "%null%")
  				  r.push(d[index[p]].value);
  				  else
  					  r.push("");
  			  }
  		        list.push(r);
  		    
        	})
    		console.log(list)
 		   processData(list);
	  
	    })

	

	
	var simulation_stop = full_simulation();
	
}
function processData(list) {
	var arrayColumn = [];
	var countArr = [];
	$.each(list,function(i,d){
		if(i!=0){
			countArr.push(parseInt(d[1]));
			
		}else{
			arrayColumn=d;
		}
	});
	
	 getDenaminator(Math.max(...countArr),0)
	console.log(den)
	$.each(list,function(i,d){
		if(i!=0){
			var obj = {
					term:d[0],
					count: parseInt(d[1])/den
			}
			arrayObj.push(obj)
		}
	});
	drawMap(arrayObj);
}


function configure() {

	const popupUrl = `http://localhost:9999/trinet/trex/dynamic-showcase/configure`;
	
	tableau.extensions.ui.displayDialogAsync(popupUrl, 0, { height: 500, width: 500 }).then((closePayload) => {
		constructData();

		
	}).catch((error) => {
		
		switch (error.errorCode) {
			case tableau.ErrorCodes.DialogClosedByUser:
				 drawMap();
				console.log("Dialog was closed by user");
				break;
			default:
				console.error(error.message);
		}
	});
}


