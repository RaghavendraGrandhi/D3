var dashboard, columns,worksheet;
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
				constructData(JSON.parse(tableau.extensions.settings.get("payLoad")));
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
			 //processData(list,property,metricColumn,metricFun);
   	 });	
	 list = multiDimensionalUnique(list)
	 consolidated = multiDimensionalUnique(consolidated)
	 list = calculateMetrics(list,consolidated,payLoad);
	 console.log(consolidated)
	 console.log(list)
	 drawMap(list)
}
function processData(list){
	drawMap(list);
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
		const filterEvent = tableau.TableauEventType.FilterChanged;
		worksheet.addEventListener(filterEvent, function (selectionEvent) {
		
			const payLoadString = tableau.extensions.settings.get("payLoad");
	        if (payLoadString) {
	            constructData(JSON.parse(payLoadString));
	        } 
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

/*
 * MAP CODE 
 */

var root;
var count = 0;
var maxChild=0;
var maxDepth;

function buildHierarchy(csv) {
	console.log(csv[0])
	   root = {"name": "root", "children": [],"type":""};
	  for (var i = 0; i < csv.length; i++) {
		 
		  var sequence = "";
		 for(var j=0;j<csv[i].length;j++){
			 sequence = sequence +csv[i][j]+",";
		 }
		 sequence = sequence.substring(0, sequence.length - 1);
		
	    
	    var parts = sequence.split(",");
	    
	    var currentNode = root;
	    for (var j = 0; j < parts.length ; j++) {
	      var children = currentNode["children"];
	      var type = columns[j];
	      var nodeName = parts[j];
	      var childNode;
	      if (j + 1 < parts.length) {
	   // Not yet at the end of the sequence; move down the tree.
	 	var foundChild = false;
	 	for (var k = 0; k < children.length; k++) {
	 	  if (children[k]["name"] == nodeName) {
	 	    childNode = children[k];
	 	    foundChild = true;
	 	    break;
	 	  }
	 	}
		// If we don't already have a child node for this branch, create it.
	 	if (!foundChild) {
	 	  childNode = {"name": nodeName, "children": [],"type":columns[j]};
	 	  if(childNode.depth > maxDepth)
	 		 maxDepth = childNode.depth;
	 	  	children.push(childNode);
	 	}
	 	currentNode = childNode;
	      } else {
	 	// Reached the end of the sequence; create a leaf node.
	 	childNode = {"name": nodeName,"type":columns[j]};
	 	  if(childNode.depth > maxDepth)
		 		 maxDepth = childNode.depth;
	 	children.push(childNode);
	      }
	    }
	   
	  }
	  console.log(root)
	  return root;
	};





	var width = 700,
    padding = 5,
    duration = 1000;
  	var arc,path,height,radius, x,y;
  	 var text,csv,json;
  
  		height = width,
  	    radius = width / 2,
  	    x = d3.scale.linear().range([0, 2 * Math.PI]);
  	    y = d3.scale.pow().exponent(1.3).domain([0, 1]).range([0, radius]);
  	  
  	
	function drawMap(list){
		
		  let lenght = list.length;
		
		

			console.log(maxDepth)
			var div = d3.select("#coffeeWheel").html("");
			var color = d3.scale.ordinal().range(['#e0f7fa','#b2ebf2','#80deea','#4dd0e1','#26c6da','#00bcd4','#00acc1','#0097a7','#00e5ff','#006064','#00b8d4']);
			
			div.select("img").remove();
			
			var vis = div.append("svg")
			    .attr("width", width + padding * 2)
			    .attr("height", height + padding * 2)
			  .append("g")
			    .attr("transform", "translate(" + [radius + padding, radius + padding] + ")");
			
			var partition = d3.layout.partition()
			    .sort(null)
			    .value(function(d) { return 5.8 - d.depth; });
			
			 arc = d3.svg.arc()
			    .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
			    .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
			    .innerRadius(function(d) { return Math.max(0, d.y ? y(d.y) : d.y); })
			    .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });
			  	//	d3.text("../../resources/csv/coffee_wheel2.csv", function(text) {
			  	  	
			  			//var csv = d3.csv.parseRows(text);
			  	  	 
			  var json = buildHierarchy(list);
			  	  		var nodes = partition.nodes(json);
			  	  		 path = vis.selectAll("path").data(nodes);
			  	  		path.enter().append("path")
			  		      .attr("id", function(d, i) { return "path-" + i; })
			  		      .attr("d", arc)
			  		      .attr("fill-rule", "evenodd")
			  		      .style("fill", function(d) { return color((d.children ? d : d.parent).name); })
			  		      .on("click", click);
			
			  			   text = vis.selectAll("text").data(nodes);
			  			  var textEnter = text.enter().append("text")
			  			      .style("fill-opacity", 1)
			  			      .style("fill", function(d) {
			  			        return brightness(d3.rgb(colour(d))) < 125 ? "#000" : "#000";
			  			      })
			  			      .attr("text-anchor", function(d) {
			  			        return x(d.x + d.dx / 2) > Math.PI ? "end" : "start";
			  			      })
			  			      .attr("dy", ".2em")
			  			      .attr("transform", function(d) {
			  			        var multiline = (d.name || "").split(" ").length > 1,
			  			            angle = x(d.x + d.dx / 2) * 180 / Math.PI - 90,
			  			            rotate = angle + (multiline ? -.5 : 0);
			  			        return "rotate(" + rotate + ")translate(" + (y(d.y) + padding) + ")rotate(" + (angle > 90 ? -180 : 0) + ")";
			  			      })
			  			      .on("click", click);
			  			  textEnter.append("tspan")
			  			      .attr("x", 0)
			  			      .text(function(d) { return d.depth ? d.name.split(" ")[0] : ""; });
			  			  textEnter.append("tspan")
			  			      .attr("x", 0)
			  			      .attr("dy", "1em")
			  			      .text(function(d) { return d.depth ? d.name.split(" ")[1] || "" : ""; });
			  		  	  function click(d) {
			  		  	   
			  		  		 tabFilter(d);
			  		  		  path.transition()
			  		  	      .duration(duration)
			  		  	      .attrTween("d", arcTween(d));

			  		  	    // Somewhat of a hack as we rely on arcTween updating the scales.
			  		  	    text.style("visibility", function(e) {
			  		  	          return isParentOf(d, e) ? null : d3.select(this).style("visibility");
			  		  	        })
			  		  	      .transition()
			  		  	        .duration(duration)
			  		  	        .attrTween("text-anchor", function(d) {
			  		  	          return function() {
			  		  	            return x(d.x + d.dx / 2) > Math.PI ? "end" : "start";
			  		  	          };
			  		  	        })
			  		  	        .attrTween("transform", function(d) {
			  		  	          var multiline = (d.name || "").split(" ").length > 1;
			  		  	          return function() {
			  		  	            var angle = x(d.x + d.dx / 2) * 180 / Math.PI - 90,
			  		  	                rotate = angle + (multiline ? -.5 : 0);
			  		  	            return "rotate(" + rotate + ")translate(" + (y(d.y) + padding) + ")rotate(" + (angle > 90 ? -180 : 0) + ")";
			  		  	          };
			  		  	        })
			  		  	        .style("fill-opacity", function(e) { return isParentOf(d, e) ? 1 : 1e-6; })
			  		  	        .each("end", function(e) {
			  		  	          d3.select(this).style("visibility", isParentOf(d, e) ? null : "hidden");
			  		  	        });
			  		  	 
			  		  	  }
			  		   
			  		  	
			
			  //		})
			  		
			  		
	}
			  			function tabFilter(d) {
			  				
			  				tableau.extensions.initializeAsync().then(function () {
			  				      const dashboard = tableau.extensions.dashboardContent.dashboard;
			  				  
			  				      console.log(d)
			  				      dashboard.worksheets.forEach(function (worksheet) {
			  				    	if(d.depth == 0){
				  				       columns.forEach(i=>worksheet.clearFilterAsync(i))
				  				     
			  				    	}else{
			  				    		 // worksheet.clearFilterAsync(d.type)
			  				         	if(d.name == "%null%"){
			  				         		d.name = null;
			  				         	}
						  				        	 worksheet.applyFilterAsync(d.type, [d.name],
						  		  				            tableau.FilterUpdateType.Replace);
			  				    	}
			  				      })
			  				        
			  				      d3.selectAll(".inline-loader").classed("inline-loader",false);
			
			  				    }, function (err) {
			  				      console.log('Error while Initializing: ' + err.toString());
			  				    });
  				
  				
  			}

  

function isParentOf(p, c) {
  if (p === c) return true;
  if (p.children) {
    return p.children.some(function(d) {
      return isParentOf(d, c);
    });
  }
  return false;
}

function colour(d) {
	
  if (d.children) {
    // There is a maximum of two children!
    var colours = d.children.map(colour),
        a = d3.hsl(colours[0]),
        b = d3.hsl(colours[1]);
    
    // L*a*b* might be better here...
    return d3.hsl((a.h + b.h) / 2, a.s * 1.2, a.l / 1.2);
  }
  return d.colour || "#fff";
}

// Interpolate the scales!
function arcTween(d) {
  var my = maxY(d),
      xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
      yd = d3.interpolate(y.domain(), [d.y, my]),
      yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
  return function(d) {
    return function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d); };
  };
}

function maxY(d) {
  return d.children ? Math.max.apply(Math, d.children.map(maxY)) : d.y + d.dy;
}

// http://www.w3.org/WAI/ER/WD-AERT/#color-contrast
function brightness(rgb) {
  return rgb.r * .299 + rgb.g * .587 + rgb.b * .114;
}


