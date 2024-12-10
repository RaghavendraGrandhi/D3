var dashboard, level1, level = 0,consolidateData = [],fieldNames = [],worksheetName,worksheet,home_url,data=[],gridOptions;
$(document).ready(function () {
	url = window.location.href ;
	url_array = url.split("/");
	map_name = url_array[5];
	level=url_array[url_array.length-1];
	app_url = url_array[0]+"/"+url_array[1]+"/"+url_array[2]+"/"+url_array[3]+"/";
	home_url=url_array[0]+"/"+url_array[1]+"/"+url_array[2]+"/"+url_array[3]+"/"+url_array[4]+"/"+url_array[5]+"/";
	
	tableau.extensions.initializeAsync({ 'configure': configure }).then(function () {

		dashboard = tableau.extensions.dashboardContent.dashboard;
		
//		 $("#excelDownload").attr("href", app_url+"extension/download/excel2");
		const savedSheetName = tableau.extensions.settings.get("worksheet");
        if (savedSheetName) {
            // We have a saved sheet name, show its selected marks
							dashboard = tableau.extensions.dashboardContent.dashboard;
							
            constructData();
        } else {
            // If there isn't a sheet saved in settings, show the dialog
							dashboard = tableau.extensions.dashboardContent.dashboard;
							 
							configure();
		}

		
	});

});


function sendData(){	
	
	var columns =[];
	var index = []
	
	
	var data1 = [];
	var selectedDataSource = tableau.extensions.settings.get("selectedDataSource");
	console.log(tableau.extensions.settings.get("selectedDataSource"));
	var count =tableau.extensions.settings.get("count");
	
	for(var x=0;x<count;x++){
		data1.push(tableau.extensions.settings.get(x))
	}
	console.log(data1)
	var worksheets = dashboard.worksheets;
     worksheetName = tableau.extensions.settings.get("worksheet");
    
    // concole.log("worksheet:"+worksheetName);
    
     worksheet = worksheets.find(function (sheet) {
      return sheet.name === worksheetName;
    });
    
     if(selectedDataSource ==0){
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
    	data = list;
 		$.ajax({
 	        url: app_url+"extension/download/excel2",
 	        type: 'POST',
 	        data: JSON.stringify(list),
 	        dataType: 'json',
 	        success: function (d) {
 	        	window.open("http://www.trinet.com");
 	        },
 	        cache: false,
 	        contentType:  'application/json; charset=utf-8',
 	        processData: false,
 	        error :function (d) {
 	        	tableau.extensions.initializeAsync({ 'configure': configure }).then(function () {
 	           var blob = new Blob([d.responseText], { type: 'application/vnd.ms-excel' });
 	            var downloadUrl = URL.createObjectURL(blob);
 	          //  downloadUrl.slice(5);
// 	           var downloadLink = $("#excelDownload");
// 	           var link$ = downloadLink;
// 	          link$.attr("href", downloadUrl);
// 	   
 	        // link$.click();
 	            var a = document.createElement("a");
 	            a.href = downloadUrl+ ":linktarget=tab1";
 	            a.download = "downloadFile.xlsx";
 	            a.id = 'testData';
 	            a.target = '_blank';
 	            //document.body.appendChild(a);
 	            a.click();
 	            //document.body.removeChild(a);
 	        	//$("#error_msg").text(d.responseText);
 	        	//$(".alert-danger").show().delay(5000).fadeOut('slow');
 	        	});
 	           
 	        }
 	    });

    })		
     }else{
    	 worksheet.getDataSourcesAsync().then(datasources => {
	    	   	var  dataSources1 = datasources.find(datasource => datasource.name === datasources[0].name);
	    		  return dataSources1.getUnderlyingDataAsync();
	    		}).then(function (sumdata) {
    	     	
    	     	
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
        	data = list;
     		$.ajax({
     	        url: app_url+"extension/download/excel2",
     	        type: 'POST',
     	        data: JSON.stringify(list),
     	        dataType: 'json',
     	        success: function (d) {
     	        	var w = window.open("", "mywindow");
     	            w.document.open();
     	            w.document.write(d);
     	            w.document.close();
     	        },
     	        cache: false,
     	        contentType:  'application/json; charset=utf-8',
     	        processData: false,
     	        error :function (d) {
     	        	var w = window.open("", "mywindow");
     	            w.document.open();
     	            w.document.write(d);
     	            w.document.close();
     	        	$("#error_msg").text(d.responseText);
     	        	$(".alert-danger").show().delay(5000).fadeOut('slow');
     	        
     	           
     	        }
     	    });
        })		

     }
}
//});



function constructData() {
	var columns =[];
	var index = []
	
	
	var data1 = [];
	var metric = [];
	var metricColumn = [];
	var metricFun = [];
	var property = [];
	var selectedDataSource =tableau.extensions.settings.get("selectedDataSource");

	var count =tableau.extensions.settings.get("count");
	var propertyCount =tableau.extensions.settings.get("property-count");
	var metricCount =tableau.extensions.settings.get("metric-count");
	
	for(var x=0;x<count;x++){
		data1.push(tableau.extensions.settings.get(x))
	}
	for(var x=0;x<propertyCount;x++){
		property.push(tableau.extensions.settings.get('property_'+x))
	}
	for(var x=0;x<metricCount;x++){
		metric.push(tableau.extensions.settings.get('metric_'+x))
		metricFun.push(tableau.extensions.settings.get('metricFun_'+x))
	}
	console.log(data1)
	var worksheets = dashboard.worksheets;
     worksheetName = tableau.extensions.settings.get("worksheet");
    
     worksheet = worksheets.find(function (sheet) {
      return sheet.name === worksheetName;
    });
    
     if(selectedDataSource ==0){
     worksheet.getSummaryDataAsync().then(function (sumdata) {
     	
     	console.log(sumdata)
    	 for(var i=0;i<data1.length;i++){
    	

        					  columns.push(sumdata.columns[parseInt(data1[i])].fieldName);
        					 
        					  index.push(parseInt(data1[i]))
        				  
    			 
    	 }
     	for(var i=0;i<metric.length;i++){
     		
     		
     		metricColumn.push(sumdata.columns[parseInt(metric[i])].fieldName);
     		
     		
     		
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
 			 for(p=0;p<metric.length ; p++){
				  if(d[parseInt(metric[p])].value!=null && d[parseInt(metric[p])].value!= "%null%")
				  r.push(d[parseInt(metric[p])].value);
				  else
					  r.push("");
			  }
 		        list.push(r);
 		    
    	})
    	data = list;
 		console.log(list)
 		console.log(metricColumn)
 	   processData(list,property,metricColumn,metricFun);
 		$.ajax({
		        url: app_url+"extension/download/excelSave",
		        type: 'POST',
		        data: JSON.stringify(list),
		        dataType: 'json',
		        success: function (d) {
		        	console.log("hgjg")
		           
		        },
		        cache: false,
		        contentType:  'application/json; charset=utf-8',
		        processData: false,
		        error :function (d) {
		        	
		        	$("#error_msg").text(d.responseText);
		        	$(".alert-danger").show().delay(5000).fadeOut('slow');
		        
		           
		        }
		    });
  
    })		
     }else{
    	 worksheet.getDataSourcesAsync().then(datasources => {
	    	   	var  dataSources1 = datasources.find(datasource => datasource.name === datasources[0].name);
	    		  return dataSources1.getUnderlyingDataAsync();
	    		}).then(function (sumdata) {
	    	     	console.log(sumdata)

    	     	
	    			 for(var i=0;i<data1.length;i++){
	    			    	

   					  columns.push(sumdata.columns[parseInt(data1[i])].fieldName);
   					 
   					  index.push(parseInt(data1[i]))
   				  
			 
	    			 }	
	    			 for(var i=0;i<metric.length;i++){
	    		     		
	    		     		
	    		     		metricColumn.push(sumdata.columns[parseInt(metric[i])].fieldName);
	    		     		
	    		     		
	    		     		
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
     			 for(p=0;p<metric.length ; p++){
   				  if(d[parseInt(metric[p])].value!=null && d[parseInt(metric[p])].value!= "%null%")
   				  r.push(d[parseInt(metric[p])].value);
   				  else
   					  r.push("");
   			  }
     		        list.push(r);
     		    
        	})
        	data = list;
     		console.log(list)
     	   processData(list,property,metricColumn,metricFun);
     			$.ajax({
     		        url: app_url+"extension/download/excelSave",
     		        type: 'POST',
     		        data: JSON.stringify(list),
     		        dataType: 'json',
     		        success: function (d) {
    		        	console.log("hgjg")

     		           
     		        },
     		        cache: false,
     		        contentType:  'application/json; charset=utf-8',
     		        processData: false,
     		        error :function (d) {
     		        	
     		        	$("#error_msg").text(d.responseText);
     		        	$(".alert-danger").show().delay(5000).fadeOut('slow');
     		        
     		           
     		        }
     		    });

      
        })		

     }
	
       // worksheet.getDataSourcesAsync().then(function (datasources) {})

	
}
function processData(list,property,metric,metricFun){
	
	var arr = [];
	var columns = list[0];
	$.each(list,function(i,d){
		if(i!=0){
			var obj ={};
			$.each(columns,function(n,r){
				obj[r] = d[n]
			})
			$.each(metric,function(n,r){
				obj[r] = d[n+columns.length]
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
		switch (property[n]) {
		case "0":
			break;
		case "1":
			obj['rowGroup']=true;
			break;
		case "2":
			obj['sort']= 'asc';
			break;
		case "3":
			break;

		default:
			break;
		}
		columnDefs.push(obj)
	})
	$.each(metric,function(n,r){
		var obj ={
				headerName : r,
				field : r
		}
		switch (metricFun[n]) {
		case "1":
			obj['aggFunc']=sumFunction;
			break;
		case "2":
			obj['aggFunc']=avgAggFunction;
			break;
		case "3":
			obj['aggFun']='min';
			break;
		case "4":
			obj['aggFunc']='max';
			break;
		case "5":
			obj['aggFunc']=customAggcount;
			break;
		case "6":
			obj['aggFunc']=customAggcountDist;
			break;

		default:
			break;
		}
		
		columnDefs.push(obj)
	})
	console.log(columnDefs)
	
	
    var autoGroupColumnDef = {
        headerName: "Model", 
        field: "model", 
        cellRenderer:'agGroupCellRenderer',
        cellRendererParams: {
            checkbox: true
        }
    }

    // let the grid know which columns and what data to use
     gridOptions = {
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

function customAggSum(values) {
	
    var sum = 0;
    values.forEach( function(value) {sum += value;} );
    return sum;
}
function customAggcount(values) {
	return values.length;
}
function customAggcountDist(values) {
	values = $.unique( values )
	return values.length;
}
function sumFunction(values) {
    var result = 0;
    values.forEach( function(value) {
    	value  = parseFloat(value);
        if (typeof value === 'number') {
            result += value;
        }
    });
    return result.toFixed(2);
}

function avgAggFunction(values) {

    // the average will be the sum / count
    var sum = 0;
    var count = 0;

    values.forEach( function(value) {
        var groupNode = value !== null && value!== undefined && typeof value === 'object';
        if (groupNode) {
            // we are aggregating groups, so we take the
            // aggregated values to calculated a weighted average
            sum += value.avg * value.count;
            count += value.count;
        } else {
            // skip values that are not numbers (ie skip empty values)
            if (typeof value === 'number') {
                sum += value;
                count++;
            }
        }
    });

    // avoid divide by zero error
    if (count!==0) {
        var avg = sum / count;
    } else {
        avg = null;
    }

    // the result will be an object. when this cell is rendered, only the avg is shown.
    // however when this cell is part of another aggregation, the count is also needed
    // to create a weighted average for the next level.
    var result = {
        count: count,
        avg: avg,
        // the grid by default uses toString to render values for an object, so this
        // is a trick to get the default cellRenderer to display the avg value
        toString: function() {
            return this.avg.toFixed(2);
        }
    };

    return result;
}

// similar to Math.min() except handles missing values, if any value is missing, then
// it returns the other value, or 'null' if both are missing.
function min(a, b) {
	Math.max()
    var aMissing = typeof a !== 'number';
    var bMissing = typeof b !== 'number';

    if (aMissing && bMissing) {
        return null;
    } else if (aMissing) {
        return b;
    } else if (bMissing) {
        return a;
    } else if (a > b) {
        return b;
    } else {
        return a;
    }
}

// similar to Math.max() except handles missing values, if any value is missing, then
// it returns the other value, or 'null' if both are missing.
function max(a, b) {
    var aMissing = typeof a !== 'number';
    var bMissing = typeof b !== 'number';

    if (aMissing && bMissing) {
        return null;
    } else if (aMissing) {
        return b;
    } else if (bMissing) {
        return a;
    } else if (a < b) {
        return b;
    } else {
        return a;
    }
}
function getSelectedRows() {
    const selectedNodes = gridOptions.api.getSelectedNodes()  
    const selectedData = selectedNodes.map( function(node) { return node.data })
    const selectedDataStringPresentation = selectedData.map( function(node) { return node.make + ' ' + node.model }).join(', ')
    }

function configure() {

	
	const popupUrl = home_url+`configure`;
	// const popupUrl = `http://localhost:9999/trinet/configure`;

	tableau.extensions.ui.displayDialogAsync(popupUrl, 0, { height: 650, width: 800 }).then((closePayload) => {
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

function exportToExcel(){
	var csvData = gridOptions.api.getDataAsCsv();
	
	$.ajax({
	        url:app_url+"excelSave",
	        type: 'POST',
	        data: JSON.stringify(csv2Array(csvData)),
	        dataType: 'json',
	        success: function(d) {
        	console.log(d)
        	
        		fileKey = d.fileKey
        	 	$("#excelDownload").attr("href", app_url+"download/"+worksheetName+"/"+fileKey);
        		$("#downloadLink").show();
	        },
	        cache: false,
	        contentType:  'application/json; charset=utf-8',
	        processData: false,
	        error :function (d) {
	        	
	        	$("#error_msg").text(d.responseText);
	        	$(".alert-danger").show().delay(5000).fadeOut('slow');
	        
	           
	        }
	    });
}

function csv2Array(csv){
    //read file from input
     let allTextLines = csv.split(/\r|\n|\r/);
     allTextLines = allTextLines.map(e=>{
    	 return e.split("\",\"").map(i=>{return i.replace(/['"]+/g, '')});
     }).filter(e=>(e.length==1 && e[0]!="")||e.length>1)
     console.log(allTextLines)
     let headers = allTextLines[0];
     let lines = [];
     console.log(allTextLines[0])
     if(!headers.join(",").includes("Model") && !headers.join(",").includes("Group") ){
	      for (let i = 0; i < allTextLines.length; i++) {
	        let data = allTextLines[i];
	        let obj =[];
	        for (let j = 0; j < data.length; j++) {
	        		obj.push(data[j].replace(/['"]+/g, ''));
	          }
	
	        if(obj.length>0 && !obj.join(",").includes("->"))
	         lines.push(obj);
	      
	     }
     }else{
    	 let columns = allTextLines[0].filter(e=>e!="Model"&& e!= "Group" );
    	 console.log(columns)
    	 
    	 lines.push(columns);
    	 for (let i = 1; i < allTextLines.length; i++) {
    		 if(allTextLines[i].join(",").includes("->")){
    			 continue;
    		 }
 	        let data = allTextLines[i];
 	        let obj =[];
 	        for (let j = 1; j < data.length; j++) {
 	        		obj.push(data[j]);
 	          }
 	        
 	        if(obj.length>0){
 	        	lines.push(obj)
 	        }
 	         
 	      
 	     }
     }
     console.log(lines);
     return lines;
}
function hideLink(){
	$("#downloadLink").hide();
}


