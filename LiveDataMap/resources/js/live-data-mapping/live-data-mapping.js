var dashboard, level1, level = 0,consolidateData = [],fieldNames = [],worksheetName,worksheet,home_url, visualization_code,columnHierarchial=[];
$(document).ready(function () {
	url = window.location.href ;
	url_array = url.split("/");
	map_name = url_array[5];
	level=url_array[url_array.length-1];
	app_url = url_array[0]+"/"+url_array[1]+"/"+url_array[2]+"/"+url_array[3]+"/";
	home_url=url_array[0]+"/"+url_array[1]+"/"+url_array[2]+"/"+url_array[3]+"/"+url_array[4]+"/"+url_array[5]+"/";
	
	tableau.extensions.initializeAsync({ 'configure': showHome }).then(function () {
		dashboard = tableau.extensions.dashboardContent.dashboard;
		dashboard.worksheets.forEach(function (worksheet) {
    	    $("#selectWorksheet").append("<option value='" + worksheet.name + "'>" + worksheet.name + "</option>");
    	  	});
		$("#advancedChartLink").attr("href",app_url+"advanced/charts?workSheet="+$("#selectWorksheet").val());
		
		
	});
	
//	$("#selectWorksheet").on("change",function(){
//		columnsUpdate($("#selectWorksheet").val());
//		$("#advancedChartLink").attr("href",app_url+"advanced/charts?workSheet="+$(this).val());
//	})

});
function columnsUpdate(worksheetName) {
	$("#advancedChartLinkButton").addClass("disable-element");
	
    var worksheets = tableau.extensions.dashboardContent.dashboard.worksheets;
 
    var dataSourceName;
     var worksheet = worksheets.find(function (sheet) {
    	 sheet.getDataSourcesAsync().then(function (sumdata) {
    		 dataSourceName = sumdata[0].name;
    	 })
      return sheet.name === worksheetName;
    });
   
   
    	  
	     worksheet.getDataSourcesAsync().then(datasources => {
	   	  dataSources1 = datasources.find(datasource => datasource.name === datasources[0].name);
		  return dataSources1.getUnderlyingDataAsync();
		}).then(dataTable => {
			console.log(dataTable);
			$.each(dataTable.columns,function(i,d){
				tableau.extensions.settings.set("columns_"+ i,i+"_"+d.fieldName);
				console.log(i+"_"+d.fieldName);
			})
			
			tableau.extensions.settings.set("columns_size",dataTable.columns.length);
			
			 tableau.extensions.settings.saveAsync().then(function(){
				$.redirect(app_url+"advanced/charts?workSheet="+worksheetName)
				
				$(".spinner").css("display", "none");
       	  })
			
		});
   
  }


function constructData() {
	var columns_fields =[];
	var columns_fields2 =[];
	var index = []
	var index2 = []
	var data1 = [];
	var data2 = [];
	var properties = [];
	
	var list=[];
	var list2=[];
	var columns_fields_indexes1 =[];
	var columns_fields_indexes2 =[];
	var propery_indexes1 =[];
	var propery_indexes2 =[];
	var dataSource1=[];	
	var count_field =tableau.extensions.settings.get("selected_fields_count");
	var join = tableau.extensions.settings.get("join");
	 visualization_code=tableau.extensions.settings.get("visualization_code");
	
	
	for(var x=0;x<count_field;x++){
		data1.push(tableau.extensions.settings.get("selected_fields_"+x));
		properties.push(tableau.extensions.settings.get("selected_properties_"+x));
	}
	
	
	console.log(properties)
	var worksheets = dashboard.worksheets;
    worksheetName = tableau.extensions.settings.get("worksheet");
    var dataSourceName="";
     worksheet = worksheets.find(function (sheet) {
    	 sheet.getDataSourcesAsync().then(function (sumdata) {
    		 dataSourceName = sumdata[0].name;
    	 })
      return sheet.name === worksheetName;
    });
     const filterEvent = tableau.TableauEventType.FilterChanged;
    
     worksheet.getDataSourcesAsync().then(datasources => {
    	  dataSources1 = datasources.find(datasource => datasource.name === datasources[0].name);
    	  return dataSources1.getUnderlyingDataAsync();
    	}).then(dataTable => {
    		$.each(dataTable.data,function(i,d){
    			dataSource1[i]=[];
    			$.each(d,function(m,n){
    				dataSource1[i].push(n.value);
    			})
    			list[i]=[];
    			$.each(data1,function(j,k){
    				let arr = k.split("_");
    				if(arr[0] == "pd"){
    					
    					list[i].push(d[arr[1]]);
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
    				if(visualization_code && properties[j]!="NONE"){
    					propery_indexes1.push(arr[1])
    				}
				}
    			if(arr[0] == "pd"){
					
    				columns_fields_indexes2.push(arr[1]);
    				if(visualization_code ==1){
    					propery_indexes2.push(arr[1])
    				}
				}
    			
    			columns_fields.push( arr[2]);
    		})
    		let join_field =tableau.extensions.settings.get("join_field").split("_")[1];
    		let join_column =tableau.extensions.settings.get("join_column").split("_")[1];
    		var pdLength=tableau.extensions.settings.get("primary_column_count");
    		var metricLength=tableau.extensions.settings.get("metric_count");
    		
    		var pdColumns=[];
    		var metrics=[];
    		for(let i=0;i<pdLength;i++){
    			
    			if(!tableau.extensions.settings.get("primary_column_"+i).includes("(generated)")){
    				pdColumns.push(tableau.extensions.settings.get("primary_column_"+i));
    			}
    		}
    		for(let i=0;i<metricLength;i++){
    			
    			metrics.push(tableau.extensions.settings.get("metric_"+i));
    			
    		}
    		
    		var obj={
			primartDs:{columns:pdColumns,
				rowData:dataSource1
			},
			secondaryDs:columns,
			join:join,
			primaryDataIndex:columns_fields_indexes2,
			secondaryDataIndex:columns_fields_indexes1,
			primaryJoinIndex:join_field,
			secondaryJoinIndex:join_column,
			metrics:metrics,
			visualization:visualization_code,
			properties:properties
	}
	$.ajax({
        url: app_url+"extractData",
        type: 'POST',
        data: JSON.stringify(obj),
        dataType: 'json',
        success: function (d) {
        	switchVisualization(visualization_code,d)
        	 worksheet.addEventListener(filterEvent, function (selectionEvent) {
     			console.log(selectionEvent)
     			buildDataWithFilters(d,obj,workSheet);
     			 
     			
     		});
           
        },
        cache: false,
        contentType:  'application/json; charset=utf-8',
        processData: false,
        error :function (d) {
        	
        	$("#error_msg").text(d.responseText);
        	$(".alert-danger").show().delay(5000).fadeOut('slow');
        
           
        }
    });
    	});
	
}

function buildDataWithFilters(d,obj,workSheet){
	var filterIndexe;
	var filtereValues =[];
	
	 worksheet.getFiltersAsync().then(function(f){
        	console.log(f)
	 })
}
function switchVisualization(x,d) {
	
	$(".visualization").css("display", "none");
	
	switch (x) {
	case "1":
		
		constructAgGrid(d);
		$('.spinner').css("display", "none");
		$("#myGrid").css("display", "block");
		break;
	case "2":
		constructCoffeeWheel(d);
		$('.spinner').css("display", "none");
		$("#coffeeWheel").css("display", "block");
		break;
	case "3":
		constructHierarchialEdgeBundling(d);
		$('.spinner').css("display", "none");
		$("#hierarchialEdgeBundling").css("display", "block");
		break;
	case "4":
		constructConceptmap(d);
		$('.spinner').css("display", "none");
		$("#conceptMap").css("display", "block");
		break;
	case "5":
		constructTreeLayout(d);
		$('.spinner').css("display", "none");
		
		break;
	case "6":
		constructBarChart(d);
		$('.spinner').css("display", "none");
		
		break;
	case "7":
		constructPieChart(d);
		$('.spinner').css("display", "none");
		
		break;

	default:
		break;
	}

}

function constructCoffeeWheel(x) {
	drawMap(x);
}
function constructConceptmap(x) {
	processDataForConceptMap(x);
}
function constructTreeLayout(x) {
	window.location.href = app_url+"trex/wfa-new-tree-map";
}
function constructBarChart(x) {
	window.location.href = app_url+"extension/bar-chart";
}
function constructPieChart(x) {
	window.location.href = app_url+"extension/pie-chart";
}


// AG GRID

function constructAgGrid(list){

	window.location.href = app_url+"extension/ag-grid";

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
					if(closePayload==1){
						showHome();
						
					}else{
						openVisualizationView();
					}


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
function openVisualizationView(){
	 const popupUrl = app_url+`trex/visualization/configure`;
		tableau.extensions.ui.displayDialogAsync(popupUrl, 0, { height: 500, width: 1200 }).then((closePayload) => {
			if( closePayload==2){
				configure();
				
			}else{
				constructData();
			}
			


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

// HIERARCHIAL EDGE BUNDLING


var nodeData = [];
var nodeIndex = 0;
var rowIndex = 0;
var rowIndexAlt = 0;
var isMouseOver = false;
var diameter,cluster,line,svg,link



function constructHierarchialEdgeBundling(list){
	var set = new Set(); 
	var arr = []
	columnHierarchial = list[0];
	$.each(list,function(i,d){
		if(i!=0){
	
			set.add(d[1]);
		var obj ={
				 "name" : d[0],
				  "size" : null,
				  "imports" : getImport(list,d),
				  "column":list[0][0]

		}
		arr.push(obj)
		}
	});
	console.log(set)
	set.forEach(function(value) {
		var obj ={
				 "name" : value,
				  "size" : null,
				  "imports" : getImports(value,list),
				  "column":list[0][1]

		}
		arr.push(obj)
	});
	console.log(arr)
	drawHierarchialMap(arr)
}
function getImport(list,d){
	
		  var arr1 =[];
		  $.each(list,function(k,p){
				if(k!=0){
					
					if(p[0] == d[0]){
						arr1.push(p[1]);
					}
					
				}
		  });
		  return arr1;
	  
}


function getImports(value,list) {
	var arr1 =[];
	$.each(list,function(i,d){
		if(1!=0){
			if(d[1] == value){
				arr1.push(d[0]);
			}
		}
	})
	return arr1;
}
//drawHierarchialMap();
function drawHierarchialMap(classes,col){
	d4.select("#hierarchial").html("");
	 diameter = 700, radius = diameter / 2, innerRadius = radius - 120;
console.log(classes)
	 cluster = d4.cluster().size([ 360, innerRadius ]);

	 line = d4.radialLine().curve(d4.curveBundle.beta(0.85)).radius(
			function(d) {
				return d.y;
			}).angle(function(d) {
		return d.x / 180 * Math.PI;
	});

	 svg = d4.select("#hierarchial").append("svg").attr("width", diameter).attr(
			"height", diameter).append("g").attr("transform",
			"translate(" + radius + "," + radius + ")");

	 link = svg.append("g").selectAll(".link"), node = svg.append("g")
			.selectAll(".node");
/* 	d4.json("hierarchical-edge-bundling-excel", function(error, classes) {
	if (error)
		throw error; */
		
	var root = packageHierarchy(classes).sum(function(d) {
		return d.size;
	});
	var set = new Set(); 
	for (i = 0; i < classes.length; i++) {
		set.add(classes[i].name);
		
	}
	set.forEach(function(value) {
		d4.select("#users").append("option").text(value);
	});
	$('.form-control-chosen').chosen({
		allow_single_deselect : false,
		width : '100%'
	});
	$('.form-control-chosen-required').chosen({
		allow_single_deselect : false,
		width : '100%'
	});
	$('.form-control-chosen-search-threshold-100').chosen({
		allow_single_deselect : false,
		disable_search_threshold : 100,
		width : '100%'
	});
	$('.form-control-chosen-optgroup').chosen({
		width : '100%'
	});

	$(function() {
		$('[title="clickable_optgroup"]').addClass(
				'chosen-container-optgroup-clickable');
	});

	cluster(root);

	link = link.data(packageImports(root.leaves())).enter().append("path")
			.each(function(d) {
				d.source = d[0], d.target = d[d.length - 1];
			}).attr("class", "link").attr("d", line);

	node = node.data(root.leaves()).enter().append("text").attr("class",
			"node").attr("id", function(d) {
		rowIndexAlt++;
		var rowIndex = rowIndexAlt - 1;
		d['specialIndex'] = rowIndex;
		nodeData.push(d);
		
		return "node-" + rowIndex;
	}).attr("dy", "0.31em").attr(
			"transform",
			function(d) {
				return "rotate(" + (d.x - 90) + ")translate(" + (d.y + 8)
						+ ",0)" + (d.x < 180 ? "" : "rotate(180)");
			}).attr("text-anchor", function(d) {
		return d.x < 180 ? "start" : "end";
	}).text(function(d) {
		return d.data.key;
	}).on("mouseover", mouseovered).on("mouseout", mouseouted);
//});
}

function mouseovered(d) {
	console.log(d)
	lenght = 0;
	d4.selectAll(".search-choice").each(function() {
		lenght++
	})
	console.log(d)
	if (lenght == 0) {
		isMouseOver = true;

		$(".node").css({
			fill : "",
			"font" : ""
		});

		highlightSourceAndTarget(d);
		tabFileter(d);
	}

}
function tabFileter(d) {
	
	tableau.extensions.initializeAsync().then(function () {
	      const dashboard = tableau.extensions.dashboardContent.dashboard;

	      // Then loop through each worksheet and get its filters, save promise for later.
	      dashboard.worksheets.forEach(function (worksheet) {
	        
	          worksheet.clearFilterAsync(columnHierarchial[0])
	         	if(Array.isArray(d)){
	         		worksheet.applyFilterAsync(columnHierarchial[0], d,
  				            tableau.FilterUpdateType.Replace);
	         	}else{
	        	 worksheet.applyFilterAsync(columnHierarchial[0], [d.data.name],
				            tableau.FilterUpdateType.Replace);
	         	}


	      });

	      d4.selectAll(".inline-loader").classed("inline-loader",false);

	    }, function (err) {
	      // Something went wrong in initialization.
	      console.log('Error while Initializing: ' + err.toString());
	    });
}
function tabFileterClear(d) {
	
	tableau.extensions.initializeAsync().then(function () {
	      const dashboard = tableau.extensions.dashboardContent.dashboard;

	      // Then loop through each worksheet and get its filters, save promise for later.
	      dashboard.worksheets.forEach(function (worksheet) {
	        
	          worksheet.clearFilterAsync(columnHierarchial[0])
	         
	        	
	      });

	      d4.selectAll(".inline-loader").classed("inline-loader",false);

	    }, function (err) {
	      // Something went wrong in initialization.
	      console.log('Error while Initializing: ' + err.toString());
	    });
}
function highlightSourceAndTarget(d) {

	node.each(function(n) {
		n.target = n.source = false;
	});

	link.classed("link--target", function(l) {
		if (l.target === d) {
			return l.source.source = true
		}
		;

	}).classed("link--source", function(l) {
		if (l.source === d) {
			return l.target.target = true;
		}

	}).filter(function(l) {

		return l.target === d || l.source === d;

	}).raise();

	node.classed("node--target", function(n) {
		return n.target;
	}).classed("node--source", function(n) {
		return n.source;
	});

}

function mouseouted(d) {
	lenght = 0;
	d4.selectAll(".search-choice").each(function() {
		lenght++
	})
	if (lenght == 0) {
		isMouseOver = false;
		link.classed("link--target", false).classed("link--source", false);

		node.classed("node--target", false).classed("node--source", false);
	}
	tabFileterClear(d)
}

// Lazily construct the package hierarchy from class names.
function packageHierarchy(classes) {
	console.log(classes)
	var map = {};

	function find(name, data, index,column) {
		var node = map[name], i;
		if (!node) {
			node = map[name] = data || {
				name : name,
				children : []
			};
			if (name.length) {
				node.parent = find(name.substring(0, i = name
						.lastIndexOf(".")));
				node.parent.children.push(node);
				node.key = name.substring(i + 1);
				node.index = index;
				node.column = column;
			}
		}
		return node;
	}

	classes.forEach(function(d, index) {
		find(d.name, d, index);
	});
	return d4.hierarchy(map[""]);
}

// Return a list of imports for the given array of nodes.
function packageImports(nodes) {
	var map = {}, imports = [];

	// Compute a map from name to node.
	nodes.forEach(function(d) {
		map[d.data.name] = d;
	});

	// For each import, construct a link from the source to target node.
	nodes.forEach(function(d) {
		if (d.data.imports)
			d.data.imports.forEach(function(i) {
				if (map[i] != undefined) {
					imports.push(map[d.data.name].path(map[i]));
				}

			});
	});
	return imports;
}
window
		.setInterval(
				function() {
					if (!isMouseOver) {
						if (nodeIndex < nodeData.length
								&& nodeData[nodeIndex].specialIndex == nodeIndex) {
							if (nodeIndex > 0) {
								var previousIndex = nodeIndex - 1;
								mouseouted(nodeData[previousIndex]);
							}
							$(".node")
									.css(
											{
												fill : "#bbb",
												"font" : "300 11px Helvetica Neue, Helvetica, Arial, sans-serif"
											});
							$('#node-' + nodeData[nodeIndex].specialIndex)
									.css({
										fill : "#000",
										"font-weight" : "700"
									});
							highlightSourceAndTarget(nodeData[nodeIndex]);
							nodeIndex++;
						} else {
							nodeIndex = 0;
						}
					}

				}, 1000);

$(document).on(
		'click',
		'[title="clickable_optgroup"] .group-result',
		function() {

			var unselected = $(this).nextUntil('.group-result').not(
					'.result-selected');
			if (unselected.length) {
				unselected.trigger('mouseup');
			} else {
				$(this).nextUntil('.group-result').each(
						function() {
							$(
									'a.search-choice-close[data-option-array-index="'
											+ $(this).data(
													'option-array-index')
											+ '"]').trigger('click');
						});
			}
		});

function filterNodes() {
	node.each(function(n) {
		n.target = n.source = false;
	});
	lenght = 0;
	var filters =[]
	d4.selectAll(".search-choice a").each(function(d) {
		lenght++
		filters.push(d)
		
	})
	

	clearPrevious()
	isMouseOver = true;
	if (lenght == 0)
		clearAll();
	d4
			.selectAll(".search-choice")
			.each(
					function() {
						var value = d4.select(this).select("span").text();
						for (i = 0; i < nodeData.length; i++) {
							if (value == nodeData[i].data.name) {
								//nodes.push(nodeData[i]);

								d4.select('#node-' + i).style("fill",
										"#000").style("font-weight", "700");

								link
										.each(function(l) {

											if (!(d4.select(this).classed(
													"link--target") || d4
													.select(this).classed(
															"link--source"))) {
												d4
														.select(this)
														.classed(
																"link--target",
																function(l) {
																	if (l.target === nodeData[i]) {

																		return l.source.source = true
																	}
																	;
																})
														.classed(
																"link--source",
																function(l) {
																	if (l.source === nodeData[i]) {

																		return l.target.target = true;
																	}

																}).filter(function(l) {

																	return l.target === d || l.source === d;

																}).raise();
											}
										})

								node.classed("node--target", function(n) {
									return n.target;
								}).classed("node--source", function(n) {
									return n.source;
								})

								break;
							}
						}

					});
	d4.selectAll("node--target").style("fill", "#d62728!important")
	

}

function filterNodes1() {

	lenght = 0;
	filterdIndex = [];
	nodeActive = [];
	
	var filters =[]
	d4.selectAll(".search-choice a").each(function() {
		lenght++
		
		
	})
	
	clearPrevious()
	isMouseOver = true;
	if (lenght == 0)
		clearAll();
	d4.selectAll(".search-choice").each(function() {
		var value = d4.select(this).select("span").text();
		filters.push(value)
		for (i = 0; i < nodeData.length; i++) {
			d4.select('#node-' + i).classed("node--active", false);
			if (value == nodeData[i].data.name) {
				//nodes.push(nodeData[i]);
				nodeActive.push(i);
				filterdIndex.push(nodeData[i].data.key);
			}

		}

	});
	tabFileter(filters)
	nodeActive.forEach(function(d, i) {
		d4.select('#node-' + d).classed("node--active", true);
	})

	link.each(function(l) {

		d4.select(this).classed("link--source", function(l) {

			for (j = 0; j < filterdIndex.length; j++) {
				if (l.target.data.imports.indexOf(filterdIndex[j]) < 0

				) {

					return l.target.target = false;
				}
				;

				//console.log(nodeData[filterdIndex[j]].data.key == l.source.data.key);

			}
			return l.target.target = true;

		}).classed("link--target", function(l) {
			for (j = 0; j < filterdIndex.length; j++) {
				if (l.source.data.key == filterdIndex[j]

				) {
					//console.log(l.source.data.key)
					return l.source.source = false;
				}
				;

				//console.log(nodeData[filterdIndex[j]].data.key == l.source.data.key);

			}
			return l.source.source = false;

		})

		.raise();

	})

	d4.selectAll(".link--source").each(
			function(l) {
				//console.log(l.source.data.key)
				count = 0;
				for (j = 0; j < filterdIndex.length; j++) {
					if (l.source.data.key == filterdIndex[j]) {

						count++;
					}
				}
				if (count == 0) {
					l.target.target = false;
					d4.select(this).classed("link--source", false);
				} else {

					node.each(function(n) {

						if (l.target.data.key == n.data.key) {

							d4.select(this).classed("node--target", true)
									.style("fill", "#d62728 ! important");
						}
					})

				}

			})
	d4.selectAll(".node").style("fill", "#bbb")

}

function clearAll() {

	d4.selectAll(".search-choice-close").each(function() {
		d4.select(this).dispatch('click');
	})
	node.classed(function(n) {
		d4.select(this).classed("node--active", false);
	})
	mouseouted(null);

}

function clearPrevious() {

	isMouseOver = false;

	link.classed("link--target", false).classed("link--source", false);
	node.classed("node--source", false).classed("node--target", false)
			.classed("node--active", false);

}


// CONCEPT MAP

function processDataForConceptMap(list){
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



//CONFIGURE Advanced Visualization
function configureAdvancedVizualization() {
	worksheetName = $("#selectWorksheet").val();
		
	tableau.extensions.initializeAsync({ 'configure': configure }).then(function () {
		const url = app_url+`advanced/configure?workSheet=`+worksheetName;
		tableau.extensions.ui.displayDialogAsync(url, 0, { height: 500, width: 1200 }).then((closePayload) => {
			constructAdvancedChartData();
		}).catch((error) => {
			
			switch (error.errorCode) {
				case tableau.ErrorCodes.DialogClosedByUser:
					
					console.log("Dialog was closed by user");
					break;
				default:
					console.error(error.message);
			}
		});
	});


}

function constructAdvancedChartData(){
	var columns_fields =[];
	
	var index = []
	var index2 = []
	var data1 = [];
	var data2 = [];
	var properties = [];
	
	var list=[];
	var list2=[];
	var columns_fields_indexes1 =[];
	var columns_fields_indexes2 =[];
	var propery_indexes1 =[];
	var propery_indexes2 =[];
	var dataSource1=[];	
	
	var count_field =tableau.extensions.settings.get("selected_fields_count");
	
	 visualization_code=tableau.extensions.settings.get("visualization_code");
	
	
	for(var x=0;x<count_field;x++){
		data1.push(tableau.extensions.settings.get("selected_fields_"+x));
		properties.push(tableau.extensions.settings.get("selected_properties_"+x));
	}
	
	
	console.log(properties)
	var worksheets = dashboard.worksheets;
    var dataSourceName="";
     worksheet = worksheets.find(function (sheet) {
    	 sheet.getDataSourcesAsync().then(function (sumdata) {
    		 dataSourceName = sumdata[0].name;
    	 })
      return sheet.name === worksheetName;
    });
     
     
     const filterEvent = tableau.TableauEventType.FilterChanged;
    
     worksheet.getDataSourcesAsync().then(datasources => {
    	  dataSources1 = datasources.find(datasource => datasource.name === datasources[0].name);
    	  return dataSources1.getUnderlyingDataAsync();
    	}).then(dataTable => {
    		list[0]=[];
    		$.each(data1,function(j,k){
    			
				let arr = k.split("_");
				list[0].push(arr[1]);
    		})
    		$.each(dataTable.data,function(i,d){
    			
    			dataSource1[i]=[];
    			$.each(d,function(m,n){
    				dataSource1[i].push(n.value);
    			})
    			
    			list[i]=[];
    			$.each(data1,function(j,k){
    				let arr = k.split("_");
    				
    					list[i].push(d[arr[0]]);
    				
    				
    			})
    		})
    		
    		console.log(list)
    		var pdLength=tableau.extensions.settings.get("primary_column_count");
    		var metricLength=tableau.extensions.settings.get("metric_count");
    		
    		var metrics=[];
    		for(let i=0;i<pdLength;i++){
    			
    			if(!tableau.extensions.settings.get("primary_column_"+i).includes("(generated)")){
    				pdColumns.push(tableau.extensions.settings.get("primary_column_"+i));
    			}
    		}
    		for(let i=0;i<metricLength;i++){
    			
    			metrics.push(tableau.extensions.settings.get("metric_"+i));
    			
    		}
    		
    		var obj={
			primartDs:{columns:pdColumns,
				rowData:dataSource1
			},
			secondaryDs:columns,
			join:join,
			primaryDataIndex:columns_fields_indexes2,
			secondaryDataIndex:columns_fields_indexes1,
			primaryJoinIndex:join_field,
			secondaryJoinIndex:join_column,
			metrics:metrics,
			visualization:visualization_code,
			properties:properties
	}
	$.ajax({
        url: app_url+"extractData",
        type: 'POST',
        data: JSON.stringify(obj),
        dataType: 'json',
        success: function (d) {
        	switchVisualization(visualization_code,d)
        	 worksheet.addEventListener(filterEvent, function (selectionEvent) {
     			console.log(selectionEvent)
     			buildDataWithFilters(d,obj,workSheet);
     			 
     			
     		});
           
        },
        cache: false,
        contentType:  'application/json; charset=utf-8',
        processData: false,
        error :function (d) {
        	
        	$("#error_msg").text(d.responseText);
        	$(".alert-danger").show().delay(5000).fadeOut('slow');
        
           
        }
    });
    	});
	

}








