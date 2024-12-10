var dashboard, level1, level = 0,url,home_url,urlObj,config,horizontal,filter,metric,worksheetName,worksheet;
$(document).ready(function () {
	url = window.location.href ;
	hoem_url = url.split("/");
	map_name = hoem_url[5];
	home_url=hoem_url[0]+"/"+hoem_url[1]+"/"+hoem_url[2]+"/"+hoem_url[3]+"/"+hoem_url[4]+"/"+hoem_url[5];
	
	tableau.extensions.initializeAsync({ 'configure': configure }).then(function () {

		dashboard = tableau.extensions.dashboardContent.dashboard;
		
		
		configure();

		
		
	});

});
function constructData1() {
	var columns =[];
	var index = []
	var dates =[];
	
	dashboard.worksheets.forEach(function (worksheet) {
        worksheet.getDataSourcesAsync().then(function (datasources) {
          datasources.forEach(function (datasource) {
        	  datasource.getUnderlyingDataAsync().then(function(datatable){
        		  var s=1;
        		  datatable.columns.forEach(function(c){
        			  
        			  if(c.fieldName != "Number of Records"){
        				  if(c.fieldName == "Name"){
        					  columns[0] = c.fieldName;
        					  index[0] = c.index
        				  }else{
			        			  columns[s] = (c.fieldName);
			        			  index[s] = (c.index);
			        			  s++;
        				  }
        			  }
        		  })
        	  })
        	  datasource.getUnderlyingDataAsync().then(function(datatable){
        		  let list = [];
        		  list.push(columns)
        		  for (let row of datatable.data) {
        			  var r=[];
        			  for(p=0;p<index.length ; p++){
        				  r.push(row[index[p]].value);
        			  }
        		        list.push(r);
        		    }
        		  console.log(list)
        		  plotChart(list)
        	  })
          })
        })
	})
}
function constructData() {
	var columns =[];
	var index = []
	
	
	var data1 = [];
	
		data1.push(tableau.extensions.settings.get("vertical"))
		data1.push(tableau.extensions.settings.get("horizontal"))
		data1.push(tableau.extensions.settings.get("filter"))
		data1.push(tableau.extensions.settings.get("metric"))
	
	console.log(data1)
	 var worksheets = dashboard.worksheets;
    worksheetName = tableau.extensions.settings.get("worksheet");

    worksheet = worksheets.find(function (sheet) {
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
	  plotChart(list)
 
   })
	
}


function configure() {

	const popupUrl = home_url+`/configure`;

	tableau.extensions.ui.displayDialogAsync(popupUrl, 0, { height: 500, width: 500 }).then((closePayload) => {
		level = tableau.extensions.settings.get("vertical");
		horizontal = tableau.extensions.settings.get("horizontal");
		filter = tableau.extensions.settings.get("filter");
		metric = tableau.extensions.settings.get("metric");
		console.log(level)
		console.log(horizontal)
		console.log(filter)
		console.log(metric)
		constructData();
		const filterEvent = tableau.TableauEventType.FilterChanged;
		worksheet.addEventListener(filterEvent, function (selectionEvent) {
			console.log(selectionEvent)
			date_status = false;
			constructData();
		});
		//window.location = home_url+"?config=false";
		//drawMap(level)
	}).catch((error) => {
		
		switch (error.errorCode) {
			case tableau.ErrorCodes.DialogClosedByUser:
				console.log("Dialog was closed by user");
				break;
			default:
				console.error(error.message);
		}
	});
}
