var dashboard, level1, level = 0,consolidateData = [],url,map_name,home_url,config,worksheetName,worksheet,name;
var state = 0;
$(document).ready(function () {
	url = window.location.href ;
	url_array = url.split("/");
	map_name = url_array[5];
	home_url=url_array[0]+"/"+url_array[1]+"/"+url_array[2]+"/"+url_array[3]+"/"+url_array[4]+"/"+url_array[5]+"/";
	
	tableau.extensions.initializeAsync({ 'configure': configure111 }).then(function () {
		
		dashboard = tableau.extensions.dashboardContent.dashboard;
		
		configure111();
	});

});
function constructData() {
	var columns =[];
	var data1 =[];

	var index = [];
	var list = [];
	
	var count =tableau.extensions.settings.get("count");
	
	for(var x=0;x<count;x++){
		data1.push(tableau.extensions.settings.get(x))
	}
	
	 var worksheets = dashboard.worksheets;
     worksheetName = tableau.extensions.settings.get("worksheet");
     name = tableau.extensions.settings.get("name");
    
     worksheet = worksheets.find(function (sheet) {
      return sheet.name === worksheetName;
    });
    
     columns.push("Name")
     columns.push("Code")
     
    worksheet.getSummaryDataAsync().then(function (sumdata) {
    	sumdata.columns.forEach(function(c){
    	   	
				if (c.fieldName == name) {
				index[0]=c.index
			
			   }else if (c.fieldName == "Code") {
				   index[1]=c.index
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
var filterColumn;
var filterColumnIndex;
var data;

function processData(list) {
	var filterColumnLocal=[];
	var filterColumnIndexLocal=[];
	 var dataLocal = [];
	var color = [];
	var name = [];
	var list1=[];
	$.each(list,function(i,d){
		if(i!=0){
			name.push(d[0]);
			color.push(d[1])
			var dt =[]
			$.each(d,function(n,j){
				if(n>1){
					dt.push(j);
				}
				})
			dataLocal.push(dt);
		}else{
			$.each(d,function(n,j){
				if(n>1){
					filterColumnLocal.push(j);
					filterColumnIndexLocal.push(n);
				}
			})
		}
	});
	
	var rings =[];
	var base=100,factor=25;
	$.each(name,function(i,d){
		var obj = {
				radius: base+ factor * (i+1), 
				width: 16, 
				speed: 0,
				show : true,  
				name:d
		}
		rings.push(obj)
	})
	
	filterColumn = filterColumnLocal;
	data = dataLocal
	console.log(rings)
	console.log(dataLocal)
	console.log(filterColumnLocal)
	drawMap(filterColumnLocal,dataLocal,rings);
}



function configure111() {

	
	const popupUrl = home_url+`configure`;

   
	tableau.extensions.ui.displayDialogAsync(popupUrl, 0, { height: 500, width: 500 }).then((closePayload) => {
		constructData()
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


