var dashboard, level1, level = 0,consolidateData = [],fieldNames = [],worksheetName,worksheet,home_url;
$(document).ready(function () {
	url = window.location.href ;
	url_array = url.split("/");
	map_name = url_array[5];
	level=url_array[url_array.length-1];
	home_url=url_array[0]+"/"+url_array[1]+"/"+url_array[2]+"/"+url_array[3]+"/"+url_array[4]+"/"+url_array[5]+"/";
	
	tableau.extensions.initializeAsync({ 'configure': configure }).then(function () {
		dashboard = tableau.extensions.dashboardContent.dashboard;

		
	});

});



function constructData() {
	var columns_fields =[];
	var columns_fields2 =[];
	var index = []
	var index2 = []
	var data1 = [];
	var data2 = [];
	
	var list=[];
	var list2=[];
	var columns_fields_indexes1 =[];
	var columns_fields_indexes2 =[];
	var dataSource1=[];	
	var count_field =tableau.extensions.settings.get("selected_field_count");
	var join = tableau.extensions.settings.get("join");
	
	
	for(var x=0;x<count_field;x++){
		data1.push(tableau.extensions.settings.get("selected_field_"+x))
	}
	
	console.log(data1)
	
	var worksheets = dashboard.worksheets;
    worksheetName = tableau.extensions.settings.get("worksheet");
    var dataSourceName="";
     worksheet = worksheets.find(function (sheet) {
    	 sheet.getDataSourcesAsync().then(function (sumdata) {
    		 dataSourceName = sumdata[0].name;
    	 })
      return sheet.name === worksheetName;
    });
     
     tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === worksheetName).getDataSourcesAsync().then(datasources => {
    	  dataSource = datasources.find(datasource => datasource.name === dataSourceName);
    	  return dataSource.getUnderlyingDataAsync();
    	}).then(dataTable => {
    	console.log(dataTable)
    		$.each(dataTable.data,function(i,d){
    			dataSource1[i]=[];
    			$.each(d,function(m,n){
    				dataSource1[i].push(n.formattedValue);
    			})
    			list[i]=[];
    			$.each(data1,function(j,k){
    				let arr = k.split("_");
    				if(arr[0] == "pd"){
    					
    					list[i].push(d[arr[1]].formattedValue);
    				}
    				
    			})
    		})
    		$.each(columns.rowData,function(i,d){
    			list2[i]=[];
    			$.each(data1,function(j,k){
    				let arr = k.split("_");
    				if(arr[0] == "sd"){
    					
    					list2[i].push(d[arr[1]]);
    				}
    				
    			})
    		})
    		$.each(data1,function(j,k){
    			let arr = k.split("_");
    			if(arr[0] == "sd"){
					
    				columns_fields_indexes1.push(arr[1]);
				}
    			if(arr[0] == "pd"){
					
    				columns_fields_indexes2.push(arr[1]);
				}
    			
    			columns_fields.push( arr[2]);
    		})
    		mapJoin(dataSource1,columns,join,columns_fields_indexes1,columns_fields_indexes2,columns_fields)
    	
    	});
    
    	
 	  
  
   
	
	
}
function mapJoin(list1,list2,join,c1,c2,columns_fields){
	switch (join) {
	case "inner":
		innerJoin(list1,list2,c1,c2,columns_fields);
		break;
	case "left":
		leftJoin(list1,list2,c1,c2);
		break;
	case "right":
		rightJoin(list1,list2,c1,c2);
		break;
	case "outer":
		outerJoin(list1,list2,c1,c2);
		break;

	default:
		break;
	}
}
function innerJoin(list1,list2,c1,c2,columns_fields){
	 console.log(list1)
     console.log(list2)
     console.log(columns_fields)
     console.log(c1)
     console.log(c2)

	let join_field =tableau.extensions.settings.get("join_field").split("_")[1];
	let join_column =tableau.extensions.settings.get("join_column").split("_")[1];
	let data=[]
	data[0]=columns_fields;
	let count=1
	$.each(list1,function(i,d){
		$.each(list2.rowData,function(k,n){
			if(d[join_field] == n[join_column]){
				data[count]=[];
				$.each(c1,function(kk,nn){
					data[count].push(n[nn]);
				})
				$.each(c2,function(ii,dd){
					data[count].push(d[dd]);
				})
				count++
			}
		})
	})
	console.log(data)
	processData(data);
}

function innerJoin1(list1,list2,c1,c2,columns_fields){
	let join_field =tableau.extensions.settings.get("join_field");
	let join_column =tableau.extensions.settings.get("join_column");
	let index1;
	let index2;
	let data=[];
	$.each(list1[0],function(i,d){
		if(d == join_field){
			index1 = i;
			return;
		}
			
	})
	
	$.each(list2.columns,function(i,d){
		if(d == join_column){
			index2 = i;
			return;
		}
		
	})
	console.log(list1)
	console.log(list2)
	console.log(c1)
	console.log(c2)
	console.log(index1)
	console.log(index2)
	console.log(c2)
	let count =1;
	$.each(list1,function(i,d){
		if(i == 0){
			data.push(d)
		}else{
			$.each(list2.rowData,function(k,n){
					if(d[index1]==n[index2]){
						data[count]=[];
						$.each(d,function(p,r){
							data[count].push(r);
						})
						$.each(c2,function(p,r){
							if(r!=index2)
							data[count].push(n[r])
						})
						
					count++;
				}
			})
		}
			
	})
	console.log(data)
	processData(data);
	
}
function leftJoin(list1,list2,c1,c2){
	
}
function rightJoin(list1,list2,c1,c2){
	
}
function outerJoin(list1,list2,c1,c2){
	
}

// AG GRID

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
  // create the grid passing in the div to use together with the columns &
	// data we want to use
  new agGrid.Grid(eGridDiv, gridOptions);
	
  gridOptions.api.setRowData(arr);

}
function getSelectedRows() {
    const selectedNodes = gridOptions.api.getSelectedNodes()  
    const selectedData = selectedNodes.map( function(node) { return node.data })
    const selectedDataStringPresentation = selectedData.map( function(node) { return node.make + ' ' + node.model }).join(', ')
 }

// CONFIGURE
function configure() {

	tableau.extensions.initializeAsync({ 'configure': configure }).then(function () {
		$.each(columns.columns,function(n,r){
			tableau.extensions.settings.set("columns_"+n,r);
		})
		tableau.extensions.settings.set("columns_length",columns.columns.length);
	
		 tableau.extensions.settings.saveAsync().then(function(){
			
			 const popupUrl = home_url+`configure`;
	
				tableau.extensions.ui.displayDialogAsync(popupUrl, 0, { height: 500, width: 1200 }).then((closePayload) => {
					 console.log(tableau.extensions.settings.getAll())
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
		  })
	});
	

}

