var dashboard,columns,worksheet;
$(document).ready(function () {
	tableau.extensions.initializeAsync({ 'configure': configure }).then(function () {
		dashboard = tableau.extensions.dashboardContent.dashboard;		
		const payLoadString = tableau.extensions.settings.get("payLoad");
        if (payLoadString) {
        	console.log(JSON.parse(payLoadString))
        	let payLoad = JSON.parse(payLoadString)
        	var worksheets = dashboard.worksheets;
		    worksheet = worksheets.find(function (sheet) {
		      return sheet.name === payLoad.workSheet;
		    });
		    
        	const filterEvent = tableau.TableauEventType.FilterChanged;
			worksheet.addEventListener(filterEvent, function (selectionEvent) {
				console.log(selectionEvent)
				//constructData(JSON.parse(tableau.extensions.settings.get("payLoad")));
				location.reload();

			});
            constructData(JSON.parse(payLoadString));
        } else {
			configure();
		}
	});

});

function constructData(payLoad) {
	
	
    if(!payLoad.isDataSource){
         worksheet.getSummaryDataAsync().then(function (sumdata) {
        	 constructDataWithPayLoad(sumdata,payLoad)
         });
     }else{
    	 worksheet.getDataSourcesAsync().then(datasources => {
	    	  		var  dataSources1 = datasources.find(datasource => datasource.name === datasources[0].name);
	    	  		return dataSources1.getUnderlyingDataAsync();
	     }).then(function (sumdata) {
	    	 constructDataWithPayLoad(sumdata,payLoad)
        })		
     }
}
function constructDataWithPayLoad(sumdata,payLoad){
	 let list = [];
	 let consolidated = [];
	 columns =[];
	 payLoad.columns.forEach(i=>columns.push(sumdata.columns[parseInt(i)].fieldName))
//	 list.push(columns)
   	 sumdata.data.forEach(function(d){
			 var r=[],y=[];
			 payLoad.columns.forEach(i=>{
				 if(d[parseInt(i)].value != null && d[parseInt(i)].value != "%null%"){
					r.push(d[i].value);
					y.push(d[i].value);
				 }else{
	 				r.push("");
	 				y.push("");
				 }

			 })
			 
			 list.push(r);
			 payLoad.metrics.forEach(i=>{
				 if(d[parseInt(i)].value != null && d[parseInt(i)].value != "%null%"){
					y.push(d[i].value);
				 }else{
	 				y.push("");
				 }

			 })
			 consolidated.push(y);
   	 });	
	 list = multiDimensionalUnique(list)
	 consolidated = multiDimensionalUnique(consolidated)
	 list = calculateMetrics(list,consolidated,payLoad);
	
	 constructHierarchialEdgeBundling(list)
}

function multiDimensionalUnique(arr) {
    var uniques = [];
    var itemsFound = {};
    for(var i = 0, l = arr.length; i < l; i++) {
        var stringified = JSON.stringify(arr[i]);
        if(itemsFound[stringified]) { continue; }
        uniques.push(arr[i]);
        itemsFound[stringified] = true;
    }
    return uniques;
}

function calculateMetrics(list,consolidated,payLoad){
	$.each(payLoad.metrics,function(i,d){
		list.forEach(l=>{
			let arr = [];
			consolidated.forEach(r=>{
				if(l.join(',')== r.slice(0,l.length-1).join(',')){
					arr.push(r[l.length+i])
				}
			})
			
			l.push(getMetric(arr,payLoad.metricFunc[i]));
		})
	})
	return list;
}

function getMetric(arr,metricFunc){
	switch (metricFunc) {
	case "1":
		return sumFunction(arr)
	case "2":
		return avgAggFunction(arr)
	case "3":
		return Math.min.apply(Math,_arr)
	case "4":
		return Math.min.apply(Math,_arr)
	case "5":
		return customAggcount(arr)
	case "6":
		return customAggcountDist(arr)

	default:
		return;
	}
	
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
	const popupUrl = window.location.href+`/configure`;
	tableau.extensions.ui.displayDialogAsync(popupUrl, 0, { height: 650, width: 800 }).then((closePayload) => {
		const payLoadString = tableau.extensions.settings.get("payLoad");
		console.log(JSON.parse(payLoadString))
        if (payLoadString) {
            constructData(JSON.parse(payLoadString));
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

//HIERARCHIAL EDGE BUNDLING


var nodeData = [];
var nodeIndex = 0;
var rowIndex = 0;
var rowIndexAlt = 0;
var isMouseOver = false;
var diameter,cluster,line,svg,link
function constructHierarchialEdgeBundling(list){
	var set = new Set(); 
	var set2 = new Set(); 
	var arr = []
	$.each(list,function(i,d){
		set2.add(d[0]);
		set.add(d[1]);
	})
	set2.forEach(function(d) {
		let obj ={
				 "name" : d,
				  "size" : null,
				  "imports" : getImport(list,d),
				  "column":columns[0]

		}
		arr.push(obj)
	});
	set.forEach(function(value) {
		
		if(!Array.from(set2).includes(value)){
		let obj ={
				 "name" : value,
				  "size" : null,
				  "imports" : getImports(value,list ),
				  "column": columns[1]

		}
		arr.push(obj)
		}
	});
	drawHierarchialMap(arr,columns)
}
function getImport(list,d){
		  var arr1 =[];
		  $.each(list,function(k,p){
					
					if(p[0] == d && p[1]!=d){
						arr1.push(p[1]);
					}
					
		  });
		  if(arr1.length==0)
				arr1.push("-")
		  return arr1;
	  
}


function getImports(value,list) {
	var arr1 =[];
	$.each(list,function(i,d){
		
			if( d[1] == value && d[0] != value){
				arr1.push(d[0]);
			}
	})
	if(arr1.length==0)
		arr1.push("-")
	return arr1;
}
//drawHierarchialMap();
function drawHierarchialMap(classes,col){
	d4.select("#svg").html("");
	 diameter = 700, radius = diameter / 2, innerRadius = radius - 120;
	 cluster = d4.cluster().size([ 360, innerRadius ]);

	 line = d4.radialLine().curve(d4.curveBundle.beta(0.85)).radius(
			function(d) {
				return d.y;
			}).angle(function(d) {
		return d.x / 180 * Math.PI;
	});

	 svg = d4.select("#svg").append("svg").attr("width", diameter).attr(
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
			}).attr("class", "link").attr("d", line).attr("stroke-width",2) ;
	
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
	console.log(nodeData)
//});
}

function mouseovered(d) {
	
	lenght = 0;
	d4.selectAll(".search-choice").each(function() {
		lenght++
	})
	
	if (lenght == 0) {
		isMouseOver = true;

		$(".node").css({
			fill : "",
			"font" : ""
		});

		highlightSourceAndTarget(d);
		//tabFileter(d);
	}

}
function tabFileter(d) {
	console.log(d)
	tableau.extensions.initializeAsync().then(function () {
	      const dashboard = tableau.extensions.dashboardContent.dashboard;
	      const payLoadString = tableau.extensions.settings.get("payLoad");
	      const payLoad = JSON.parse(payLoadString)

	      // Then loop through each worksheet and get its filters, save promise for later.
	      dashboard.worksheets.forEach(function (worksheet) {
	        
	    	  $.each(columns,function(i,d){
	    		  worksheet.clearFilterAsync(d)
	    	  });
	         	if(Array.isArray(d)){
	         		if(d){
	         		worksheet.applyFilterAsync(columns[0], d,
				            tableau.FilterUpdateType.Replace);
	         		}
	         	}else{
	         		if(d.data.name){

	        	 worksheet.applyFilterAsync(d.data.column, [d.data.name],
				            tableau.FilterUpdateType.Replace);
	         	}
	         	}


	      });

	      d4.selectAll(".inline-loader").classed("inline-loader",false);

	    }, function (err) {
	      // Something went wrong in initialization.
	      console.log('Error while Initializing: ' + err.toString());
	    });
}
function tabFileterClear(d) {
	console.log(d)
	tableau.extensions.initializeAsync().then(function () {
	      const dashboard = tableau.extensions.dashboardContent.dashboard;
	     // console.log(columns)
	      // Then loop through each worksheet and get its filters, save promise for later.
	      dashboard.worksheets.forEach(function (worksheet) {
	    	  $.each(columns,function(i,k){
	    		
	    			  worksheet.clearFilterAsync(k)
	    	  });
	          
	      });

	      d4.selectAll(".inline-loader").classed("inline-loader",false);

	    }, function (err) {
	      // Something went wrong in initialization.
	      console.log('Error while Initializing: ' + err.toString());
	    });
}
function highlightSourceAndTarget(d) {
	console.log(d)
//	node.each(function(n) {
//		n.target = n.source = false;
//	});

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
	console.log(d)
	//tabFileterClear(d)
}
function mouseoutedByInterval(d) {
	lenght = 0;
	d4.selectAll(".search-choice").each(function() {
		lenght++
	})
	if (lenght == 0) {
		isMouseOver = false;
		link.classed("link--target", false).classed("link--source", false);

		node.classed("node--target", false).classed("node--source", false);
	}
	
}

//Lazily construct the package hierarchy from class names.
function packageHierarchy(classes) {
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
		find(d.name, d, index,d.column);
	});
	return d4.hierarchy(map[""]);
}

//Return a list of imports for the given array of nodes.
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
	window.setInterval(
				function() {
					
					if (!isMouseOver) {
						
							if (nodeIndex < nodeData.length
								&& nodeData[nodeIndex].specialIndex == nodeIndex) {
							if (nodeIndex > 0) {
								console.log(nodeData[nodeIndex])
								var previousIndex = nodeIndex - 1;
								mouseoutedByInterval(nodeData[previousIndex]);
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



