var dashboard, level1, level = 0,url,home_url,urlObj,config;
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
        		  list.push(columns.join(';'))
        		  for (let row of datatable.data) {
        			  var r="";
        			  for(p=0;p<index.length ; p++){
        				  r= r+row[index[p]]+";";
        			  }
        		        list.push(r.substring(0, r.length - 1));
        		    }
        		  //let values = list.filter((el, i, arr) => arr.indexOf(el) === i);
        		  consolidateData = list;
        		  $.post(home_url+"-csv",
        				    {
        				        "mydata" : consolidateData.toString()
        				    }
        				);
        		 
        		    //console.log(list)
        	  })
          })
        })
	})
	console.log(index)
}


function configure() {

	const popupUrl = "https://peoples.io/trinetlive/trex/table-driven/configure";
	//const popupUrl = `http://localhost:9999/trinet/configure`;

	tableau.extensions.ui.displayDialogAsync(popupUrl, 0, { height: 500, width: 500 }).then((closePayload) => {
		level = tableau.extensions.settings.get("level");
		console.log(level)
		constructData();
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
