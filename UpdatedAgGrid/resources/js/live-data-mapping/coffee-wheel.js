var dashboard, level1, level = 0,consolidateData = [],url,map_name,home_url,config,fieldNames = [],worksheetName,worksheet;
$(document).ready(function () {
	url = window.location.href ;
	url_array = url.split("/");
	map_name = url_array[5];
	home_url=url_array[0]+"/"+url_array[1]+"/"+url_array[2]+"/"+url_array[3]+"/"+url_array[4]+"/"+url_array[5]+"/";
	

});


var root;
var count = 0;
var maxChild=0;
var maxDepth;

function buildHierarchy(csv) {
	console.log(csv[0])
	   root = {"name": "root", "children": [],"type":""};
	  for (var i = 1; i < csv.length; i++) {
		 
		  var sequence = "";
		 for(var j=0;j<csv[i].length;j++){
			 sequence = sequence +csv[i][j]+",";
		 }
		 sequence = sequence.substring(0, sequence.length - 1);
		
	    
	    var parts = sequence.split(",");
	    
	    var currentNode = root;
	    for (var j = 0; j < parts.length ; j++) {
	      var children = currentNode["children"];
	      var type = csv[0][j];
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
	 	  childNode = {"name": nodeName, "children": [],"type":csv[0][j]};
	 	  if(childNode.depth > maxDepth)
	 		 maxDepth = childNode.depth;
	 	  console.log(childNode)
	 	
	 	  children.push(childNode);
	 	}
	 	currentNode = childNode;
	      } else {
	 	// Reached the end of the sequence; create a leaf node.
	 	childNode = {"name": nodeName,"type":csv[0][j]};
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
			  		  		const dashboard = tableau.extensions.dashboardContent.dashboard;
						    const payLoadString = tableau.extensions.settings.get("payLoad");
						    payLoad = JSON.parse(payLoadString)
						    if(payLoad.isAdvancedCharts){
						    	 tabFilterAdvanced(d);
						    }else{
						    	 tabFilter(d);
						    }
			  		  		
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
	function tabFilterAdvanced(d) {
			
			
			      const dashboard = tableau.extensions.dashboardContent.dashboard;
			    const payLoadString = tableau.extensions.settings.get("payLoad");
			    payLoad = JSON.parse(payLoadString)
			    
			      dashboard.worksheets.forEach(function (worksheet) {
			    	if(d.depth == 0){
				       
				        	for(var k=0;k<payLoad.columns.length;k++){
				        		let arr = payLoad.columns[k].split("_");
				        	 worksheet.clearFilterAsync(arr[1])
				        	}
				      
			    	}
			         // worksheet.clearFilterAsync(d.type)
			         	if(d.name == "%null%"){
			         		d.name = null;
			         	}
			         
			        	 worksheet.applyFilterAsync(d.type, [d.name],
	  				            tableau.FilterUpdateType.Replace);
			        
//			       
//
//
			      });

			      d3.selectAll(".inline-loader").classed("inline-loader",false);


}
			  			function tabFilter(d) {
			  				
			  		
			  				      const dashboard = tableau.extensions.dashboardContent.dashboard;
			  				   
			  				      // Then loop through each worksheet and get
									// its filters, save promise for later.
			  				    const payLoadString = tableau.extensions.settings.get("payLoad");
			  				    payLoad = JSON.parse(payLoadString)
			  				      // Then loop through each worksheet and get
									// its filters, save promise for later.
			  				    let columsArray = payLoad.columns.filter(e=>e.split("_")[0]=="div-pd")
			  				      console.log(payLoad)
			  				      dashboard.worksheets.forEach(function (worksheet) {
			  				    	if(d.depth == 0){
				  				       
				  				        	for(var k=0;k<columsArray.length;k++){
				  				        		let arr =columsArray[k].split("_");
				  				        		if(arr[0]=="div-pd")
				  				        			worksheet.clearFilterAsync(arr[2])
				  				        	}
				  				      
			  				    	}else{
			  				    		 // worksheet.clearFilterAsync(d.type)
			  				         	if(d.name == "%null%"){
			  				         		d.name = null;
			  				         	}
						  				  if(columsArray.join(",").includes(d.type)){
						  				        	 worksheet.applyFilterAsync(d.type, [d.name],
						  		  				            tableau.FilterUpdateType.Replace);
						  				  }
			  				    	}
			  				      })
			  				        
			  				      d3.selectAll(".inline-loader").classed("inline-loader",false);
			
			  				
  				
  				
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
