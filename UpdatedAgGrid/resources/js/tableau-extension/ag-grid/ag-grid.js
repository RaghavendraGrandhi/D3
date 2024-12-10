var dashboard, level1, level = 0,consolidateData = [],fieldNames = [],worksheetName,worksheet,home_url, gridOptions ;
$(document).ready(function () {
	url = window.location.href ;
	url_array = url.split("/");
	map_name = url_array[5];
	level=url_array[url_array.length-1];
	app_url = url_array[0]+"/"+url_array[1]+"/"+url_array[2]+"/"+url_array[3]+"/";

	home_url=url_array[0]+"/"+url_array[1]+"/"+url_array[2]+"/"+url_array[3]+"/"+url_array[4]+"/"+url_array[5]+"/";
	  $("#excelDownload").attr("href", app_url+"extension/download/excel");
	  $("#csvDownload").attr("href", app_url+"extension/download/csv");
	  var urlParams = new URLSearchParams(window.location.search);
		let isConfigure = urlParams.get('isConfigure');
		tableau.extensions.initializeAsync({ 'configure': showHome }).then(function () {
			dashboard = tableau.extensions.dashboardContent.dashboard;
			const payLoadString = tableau.extensions.settings.get("payLoad");
			console.log(payLoadString)
			console.log(isConfigure)
			if (payLoadString) {
				constructAdvancedChartDataWithPayLoad(JSON.parse(payLoadString));
			}
		});

});

function showHome(){
	window.location.href = app_url+"trex/live-data-mapping?isConfigure=1";
}

function constructAdvancedChartData() {
	var visualization_code,data1=[],consolidateData = [],properties = [],list = [],listSorted = [],columnArray = [],columnsWithDataTypes = [],metrics = [],worksheets,dataSourceName;
	var count_field = tableau.extensions.settings.get("selected_fields_count");
	worksheetName = tableau.extensions.settings.get("worksheetName")
	visualization_code = tableau.extensions.settings.get("visualization_code");
	worksheets = dashboard.worksheets;
		for (var x = 0; x < count_field; x++) {
			data1.push(tableau.extensions.settings.get("selected_fields_" + x));
			properties.push(tableau.extensions.settings.get("selected_properties_" + x));
		}
		worksheet = worksheets.find(function (sheet) {
			sheet.getDataSourcesAsync().then(function (sumdata) {
				dataSourceName = sumdata[0].name;
			})
			console.log(sheet.name)
			return sheet.name === worksheetName;
		});
		var dataColumns = [];
		var metricLength = tableau.extensions.settings.get("metric_count");
	
	
	
		for (let i = 0; i < metricLength; i++) {
	
			metrics.push(tableau.extensions.settings.get("metric_" + i));
	
		}
	
		const filterEvent = tableau.TableauEventType.FilterChanged;
	
		worksheet.getDataSourcesAsync().then(datasources => {
			dataSources1 = datasources.find(datasource => datasource.name === datasources[0].name);
			return dataSources1.getUnderlyingDataAsync();
		}).then(dataTable => {
			let columns = dataTable.columns
	
			consolidateData[0] = [];
			// list[0]=[];
			$.each(data1, function (j, k) {
	
				let arr = k.split("_");
				consolidateData[0].push(arr[1]);
				// list[0].push(arr[1]);
				columnArray.push(arr[1]);
				columnsWithDataTypes.push(columns[arr[0]]);
			})
			console.log(columnsWithDataTypes);
			if (visualization_code == 1) {
				$.each(metrics, function (j, k) {
					// let arr = k.split("_");
					consolidateData[0].push(k);
				})
			}
			$.each(dataTable.data, function (i, d) {
	
	
				consolidateData[i + 1] = [];
				list[i + 1] = [];
				$.each(data1, function (j, k) {
					let arr = k.split("_");
					consolidateData[i + 1].push(d[arr[0]].value);
					list[i + 1].push(d[arr[0]].value);
	
	
				})
				if (visualization_code == 1) {
					$.each(metrics, function (j, k) {
						console.log(k)
						let arr = k.split("_");
						consolidateData[i + 1].push(d[arr[0]].value);
	
	
					})
				}
			})
	
	
			list = _.sortBy(list, list[0]);
			listSorted[0] = columnArray;
			list.forEach(l => listSorted.push(l))
			listSorted = listSorted.filter(e => (e != undefined && e != null))
	
			processData( listSorted, properties,metrics)
		});
	

}
function constructAdvancedChartDataWithPayLoad(payLoad) {
		var data1 = [];
		var consolidateData = [];
		var properties = [];
	
		var list = [];
		var listSorted = [];
		var columnArray = [];
		var columnsWithDataTypes = [];
		
	
		var metrics = [];
		visualization_code = payLoad.visualizationCode;
		var worksheets = dashboard.worksheets;
		var dataSourceName = "";
		worksheetName = tableau.extensions.settings.get("worksheetName")
		worksheet = worksheets.find(function (sheet) {
			sheet.getDataSourcesAsync().then(function (sumdata) {
				dataSourceName = sumdata[0].name;
			})
			return sheet.name === worksheetName;
		});
		var dataColumns = [];
	
		const filterEvent = tableau.TableauEventType.FilterChanged;
	
		worksheet.getDataSourcesAsync().then(datasources => {
			dataSources1 = datasources.find(datasource => datasource.name === datasources[0].name);
			return dataSources1.getUnderlyingDataAsync();
		}).then(dataTable => {
			let columns = dataTable.columns
	
			consolidateData[0] = [];
			// list[0]=[];
			$.each(payLoad.columns, function (j, k) {
	
				let arr = k.split("_");
				consolidateData[0].push(arr[1]);
				// list[0].push(arr[1]);
				columnArray.push(arr[1]);
				columnsWithDataTypes.push(columns[arr[0]]);
			})
		
				$.each(payLoad.metrics, function (j, k) {
					let arr = k.split("_");
					consolidateData[0].push(arr[1]);
//					columnArray.push(arr[1]);
//					columnsWithDataTypes.push(columns[arr[0]]);
				})
			
			$.each(dataTable.data, function (i, d) {
	
	
				consolidateData[i + 1] = [];
				list[i + 1] = [];
				$.each(payLoad.columns, function (j, k) {
					let arr = k.split("_");
					consolidateData[i + 1].push(d[arr[0]].value);
					list[i + 1].push(d[arr[0]].value);
	
	
				})
			
					$.each(payLoad.metrics, function (j, k) {
						let arr = k.split("_");
						list[i + 1].push(d[arr[0]].value)
						consolidateData[i + 1].push(d[arr[0]].value);
	
	
					})
				
			})
	
	
			list = _.sortBy(list, list[0]);
			listSorted[0] = columnArray;
			list.forEach(l => listSorted.push(l))
			listSorted = listSorted.filter(e => (e != undefined && e != null))
			processData(listSorted, payLoad.properties,payLoad.metrics);
			
		});
	
}



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
 	  // processData(list);
  
    })		
	
       // worksheet.getDataSourcesAsync().then(function (datasources) {})

	
}
function processData(list,properties,metrics){
	
	var arrData = [];
	var columns = list[0];
	console.log(metrics)
	$.each(list,function(i,d){
		if(i!=0){
			var obj ={};
			$.each(columns,function(n,r){
				obj[r] = d[n]
			})
			$.each(metrics,function(n,r){
				let arr = r.split("_");
				obj[arr[1]] = d[columns.length+n]
			})
			
			arrData.push(obj)
		}
		
	})
	var columnDefs1 = []
	$.each(columns,function(n,r){
		var obj ={
				headerName : r,
				field : r
		}
		if((properties[n]!=null || properties[n]!=undefined ) && properties[n] != "NONE" && properties[n].includes("GROUP-BY")){
			obj.rowGroup = true;
		}
		if((properties[n]!=null || properties[n]!=undefined ) && properties[n] != "NONE" && properties[n].includes("ORDER-BY")){
			
					obj.sortingOrder = ['asc','desc']
			
		
		
		}
		if((properties[n]!=null || properties[n]!=undefined ) && properties[n] != "NONE" && properties[n].includes("GRAND-TOTAL")){
			
					obj.aggFunc = 'sum'
			
		}
			
			columnDefs1.push(obj)
		
		
	})
	$.each(metrics,function(n,r){
		let arr = r.split("_");
		if(arr[1] != "NONE"){
			var obj ={
					headerName : arr[2]+"("+arr[1]+")",
					field : arr[1]
			}
			if(arr[2] == "SUM"){
				obj.aggFunc = sumFunction
			}
			if(arr[2] == "AVG"){
				obj.aggFunc = avgAggFunction
			}
			if(arr[2] == "MIN"){
				obj.aggFunc = 'min'
			}
			if(arr[2] == "MAX"){
				obj.aggFunc = 'max'
			}
			if(arr[2] == "COUNT"){
				obj.aggFunc = customAggcount
			}
			if(arr[2] == "DISTINCT COUNT"){
				obj.aggFunc = customAggcountDist
			}
			
			obj.enableValue= true
				columnDefs1.push(obj)
		}
		
		
	})
		console.log(columnDefs1)
	
    var autoGroupColumnDef1 = {
       
        cellRenderer:'agGroupCellRenderer',
        cellRendererParams: {
            footerValueGetter: function(params) { return 'Total (' + params.value + ')'},
        }
        
       
    }
	
    // let the grid know which columns and what data to use
	 gridOptions = {
	    columnDefs: columnDefs1,
	    defaultColDef: {
	      width: 150,
	      sortable: true,
	      resizable: true
	    },
	    aggFuncs:{
	    	  mySumFunc: mySum
	    },
	    enableRangeSelection: true,
	    autoGroupColumnDef:autoGroupColumnDef1,
	    

	    animateRows: true
	};
	

  var eGridDiv = document.querySelector('#myGrid');
  d3.select("#myGrid").html("");
  // create the grid passing in the div to use together with the columns & data we want to use
  new agGrid.Grid(eGridDiv, gridOptions);
	console.log(arrData)

  gridOptions.api.setRowData(arrData);
	
	

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
	showHome();

	
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
function  removeCommas( line) {
	
	let indexes = [];
	
	let index = line.indexOf("\"");
	if(index>=0) {
		 indexes.push(index);
	}
	while (index >= 0) {
	  
	    index = line.indexOf("\"", index + 1);
	    indexes.push(index);
	}
	for (let i=0;i<indexes.length-1;i++) {
		if(i%2 ==0) {
			let s = line.substring(indexes[i], indexes[i+1]).replace(/[,"]+/g, ' ');
			line = line.replace(line.substring(indexes[i], indexes[i+1]), s);
		}
		
	}
	return line;
}
function hideLink(){
	$("#downloadLink").hide();
}


