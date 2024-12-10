var dashboard, level1, level = 0,consolidateData = [],url,map_name,home_url,config,fieldNames = [],worksheetName,worksheet;
$(document).ready(function () {
	url = window.location.href ;
	url_array = url.split("/");
	map_name = url_array[5];
	home_url=url_array[0]+"/"+url_array[1]+"/"+url_array[2]+"/"+url_array[3]+"/"+url_array[4]+"/"+url_array[5]+"/";

	tableau.extensions.initializeAsync({ 'configure': configure }).then(function () {

		dashboard = tableau.extensions.dashboardContent.dashboard;
		
	
		configure();
		
		
	});

});
function constructData() {
	var columns =[];
	var index = []
	var egCol = -1;
	
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
   	console.log(sumdata)
   	 for(var i=0;i<data1.length;i++){
   	sumdata.columns.forEach(function(c){
			   		if(c.fieldName != "Number of Records"){
						  if(c.fieldName == data1[i]){
							  columns.push(c.fieldName);
							  index.push(c.index)
							  if(c.fieldName == "Entity Group")
								   egCol = c.index;
						  }
					  }

   			  })
   	 }
   			  
   			   let list = [];
   	list.push(columns)
   	sumdata.data.forEach(function(d){
		   	  var r=[];
			  for(p=0;p<index.length ; p++){
				          				  
				  if(d[index[p]].value!=null && d[index[p]].value!= "%null%"){
					  if(egCol> -1 && egCol == index[p]){
						  r.push(d[index[p]].value+" (EG)");
					  }else
					  r.push(d[index[p]].value);
				  }else
					  r.push("");
			  }
		        list.push(r);

		    
   	})
		console.log(list)
	   processData(list);
 
   })
	
}
function getWorkSheet(){
	var worksheets_ = dashboard.worksheets;
    var worksheetName_ = tableau.extensions.settings.get("worksheet");
    if(worksheetName_ != null && worksheetName_.length > 0){
	   var worksheet_ = worksheets_.find(function (sheet) {
	     return sheet.name === worksheetName_;
	   });
	   return worksheet_;
    }else{
    	return null;
    }
}

function configure() {

	
	//const popupUrl = `https://peoples.io/trinetlive1/trex/concept-map/configure`;
	const popupUrl = home_url+`configure`;
	
	tableau.extensions.ui.displayDialogAsync(popupUrl, 0, { height: 500, width: 500 }).then((closePayload) => {
		
		getWorkSheet().getFiltersAsync().then(function(f){
 	    	f.forEach(function(f1){
 	    		console.log(f1.fieldName)
 	    		 worksheet.clearFilterAsync(f1.fieldName)
 	    	})
 	    })
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
function processData(list){
	console.log(list)
	var ditems = new Set(); 
	var x = new Set(); 
	var theme = new Set(); 
	var prespective = new Set(); 
	var ditemAarr = [];
	var themeAarr = [];
	var prespectiveAarr = [];
	var columns = [];
	$.each(list,function(i,d){
		if(i!=0){
			ditems.add(d[0]);
			x.add(d[1])
		}else
			columns = d;
		
	})
	var i=0;
	x.forEach(function(v){
		if(i%2 == 0)
			theme.add(v);
		else
			prespective.add(v);
		i++;
	})
	ditems.forEach(function(v){
		var obj ={
				"type" : "ditem",
			    "name" : v,
			    "description" : "Sample Description goes here about "+v,
			    "date" : new Date(),
			    "slug" : "Slug goes here about "+v,
			    "links" : getLinks(v,list),
			    "column":columns[0]
		}
		ditemAarr.push(obj)
	})
	theme.forEach(function(v){
		var obj ={
				"type" : "theme",
			    "name" : v,
			    "column":columns[1]
			   
		}
		themeAarr.push(obj)
	})
	prespective.forEach(function(v){
		var obj ={
				"type" : "perspective",
			    "name" : v,
			    "column":columns[1]
			   
		}
		prespectiveAarr.push(obj)
	})
	var json ={
				"ditems" : ditemAarr,
			    "themes" : themeAarr,
			    "perspectives" : prespectiveAarr
			   
		}
	
	
	console.log(json)
	var plot = new ConceptMap("graph", "graph-info", json);

}

function getLinks(value,list) {
	var a = new Set();
	var arr =[];
	$.each(list,function(i,d){
		if(d.indexOf(value) > -1){
			a.add(d[1]);
		}
	})
	return Array.from(a);
}

function loadMask(){
	$('#main').mask('Loading');
}
function unloadMask(){
	$('#main').unmask();
}
