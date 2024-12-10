var dashboard, level1, level = 0,url,home_url,urlObj,config,worksheetName,worksheet;
$(document).ready(function () {
	url = window.location.href ;
	hoem_url = url.split("/");
	map_name = hoem_url[5];
	home_url=hoem_url[0]+"/"+hoem_url[1]+"/"+hoem_url[2]+"/"+hoem_url[3]+"/"+hoem_url[4]+"/"+hoem_url[5];
	
	tableau.extensions.initializeAsync({ 'configure': configure }).then(function () {

		dashboard = tableau.extensions.dashboardContent.dashboard;
		
		
		configure();

		
		tableau.extensions.settings.addEventListener(tableau.TableauEventType.SettingsChanged, (settingsEvent) => {
			updateExtensionBasedOnSettings(settingsEvent.newSettings)
		});
	});

});
function constructData() {
	var columns =[];
	var index = []
	
	
	var data1 = [];
	for(var x=1;x<=2;x++){
		data1.push(tableau.extensions.settings.get("level"+x))
	}
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
	   processData(list);
 
   })
	
}
function processData(list){
	var set = new Set(); 
	var arr = []
	$.each(list,function(i,d){
		if(i!=0){
		$.each(d[1].split(","),function(n,k){
			set.add(k.trim());
		})
		var obj ={
				 "name" : d[0],
				  "size" : null,
				  "imports" : d[1].split(",")

		}
		arr.push(obj)
		}
	})
	set.forEach(function(value) {
		var obj ={
				 "name" : value,
				  "size" : null,
				  "imports" : getImports(value,list)

		}
		arr.push(obj)
	});
	console.log(arr)
	drawMap(arr)
}

function getImports(value,list) {
	var arr =[];
	$.each(list,function(i,d){
		if(d[1].split(",").indexOf(value) > -1){
			arr.push(d[0]);
		}
	})
	return arr;
}
function configure() {

	const popupUrl = home_url+`/configure`;
	//const popupUrl = `http://localhost:9999/trinet/configure`;

	tableau.extensions.ui.displayDialogAsync(popupUrl, 0, { height: 500, width: 500 }).then((closePayload) => {
		level = tableau.extensions.settings.get("level");
		constructData();
		const filterEvent = tableau.TableauEventType.FilterChanged;
		worksheet.addEventListener(filterEvent, function (selectionEvent) {
			console.log(selectionEvent)
			constructData();
		});
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
