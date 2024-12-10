var dashboard, level1, level = 0,consolidateData = [],fieldNames = [],worksheetName,worksheet,home_url;
$(document).ready(function () {
	url = window.location.href ;
	url_array = url.split("/");
	map_name = url_array[5];
	level=url_array[url_array.length-1];
	home_url=url_array[0]+"/"+url_array[1]+"/"+url_array[2]+"/"+url_array[3]+"/"+url_array[4]+"/"+url_array[5]+"/";
	
	tableau.extensions.initializeAsync({ 'configure': configure }).then(function () {

		dashboard = tableau.extensions.dashboardContent.dashboard;
		
		
		configure();
		
		
		
		
	});

});
function constructData() {
	var columns =[];
	var index = []
	
	
	var data1 = [];
	var count =tableau.extensions.settings.get("count");
	
	for(var x=0;x<count;x++){
		data1.push(tableau.extensions.settings.get(x))
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
	
       // worksheet.getDataSourcesAsync().then(function (datasources) {})

	
}
function processData(list){
	
	var arr = [];
	var columns = list[0];
	$.each(list,function(i,d){
		if(i!=0){
			var obj ={};
			$.each(columns,function(n,r){
				obj[r] = d[n]
			})
			
			arr.push(obj)
		}
		
	})
	var columnDefs = []
	$.each(columns,function(n,r){
		var obj ={
				headerName : r,
				field : r
		}
		columnDefs.push(obj)
	})
	
	
    var autoGroupColumnDef = {
        headerName: "Model", 
        field: "model", 
        cellRenderer:'agGroupCellRenderer',
        cellRendererParams: {
            checkbox: true
        }
    }

    // let the grid know which columns and what data to use
    var gridOptions = {
      columnDefs: columnDefs,
      enableSorting: true,
      enableFilter: true,
      autoGroupColumnDef: autoGroupColumnDef,
      groupSelectsChildren: true,
      rowSelection: 'multiple'
    };

  // lookup the container we want the Grid to use
  var eGridDiv = document.querySelector('#myGrid');
  d3.select("#myGrid").html("");
  // create the grid passing in the div to use together with the columns & data we want to use
  new agGrid.Grid(eGridDiv, gridOptions);
	
  gridOptions.api.setRowData(arr);
	
	

}
function getSelectedRows() {
    const selectedNodes = gridOptions.api.getSelectedNodes()  
    const selectedData = selectedNodes.map( function(node) { return node.data })
    const selectedDataStringPresentation = selectedData.map( function(node) { return node.make + ' ' + node.model }).join(', ')
    }
function configure() {

	
	const popupUrl = home_url+`configure`;
	// const popupUrl = `http://localhost:9999/trinet/configure`;

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

