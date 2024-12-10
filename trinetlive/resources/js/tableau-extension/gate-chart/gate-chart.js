var dashboard, level1, level = 0,consolidateData = [],fieldNames = [],home_url,worksheetName,worksheet;
$(document).ready(function () {
	url = window.location.href ;



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
	for(var x=1;x<=5;x++){
		data1.push(tableau.extensions.settings.get("level"+x))
	}
	console.log(data1)
	 var worksheets = dashboard.worksheets;
    worksheetName = tableau.extensions.settings.get("worksheet");

    worksheet = worksheets.find(function (sheet) {
     return sheet.name === worksheetName;
   });
   
   worksheet.getSummaryDataAsync().then(function (sumdata) {
		sumdata.columns.forEach(function(c){
			console.log(c)
			if(c.fieldName == "Id"){
					  columns.push(c.fieldName);
					  index.push(c.index)
				  }
			if(c.fieldName == "Group"){
				  columns.push(c.fieldName);
				  index.push(c.index)
			  }
		})
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



function configure() {


	const popupUrl = url+`/configure`;

	tableau.extensions.ui.displayDialogAsync(popupUrl, 0, { height: 500, width: 500 }).then((closePayload) => {
		constructData();
		const filterEvent = tableau.TableauEventType.FilterChanged;
		worksheet.addEventListener(filterEvent, function (selectionEvent) {
			console.log(selectionEvent)
			constructData();
		});
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

function processData(list){
	
	var arr = [];
	var columns = [];
	$.each(list,function(i,d){
		if(i!=0){
			var dArr = d[5].split("/");
			var obj ={
					"id":d[1],
					"group":d[0],
					"grantTitle" : d[2],
				    "organization" :d[3],
				    "totalAmount" : parseInt(d[4]),
				    "grantStartDate" : d[5],
				    "startDay":parseInt(dArr[1]),
				    "startMonth":parseInt(dArr[0]),
				    "startYear":parseInt(dArr[2])
			}
			arr.push(obj)
		}else
			columns = d;
		
	})
	
	console.log(arr[0])
	display(null,arr);
	

}


