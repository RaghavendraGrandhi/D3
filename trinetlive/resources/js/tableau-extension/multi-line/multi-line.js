var dashboard, level1, level = 0,consolidateData = [],fieldNames = [];
$(document).ready(function () {
	url = window.location.href ;
	url_array = url.split("/");
	map_name = url_array[5];
	level=url_array[url_array.length-1];
	// When initializing an extension, an optional object is passed that maps a
	// special ID (which
	// must be 'configure') to a function. This, in conjuction with adding the
	// correct context menu
	// item to the manifest, will add a new "Configure..." context menu item to
	// the zone of extension
	// inside a dashboard. When that context menu item is clicked by the user,
	// the function passed
	// here will be executed.

	tableau.extensions.initializeAsync({ 'configure': configure }).then(function () {

		dashboard = tableau.extensions.dashboardContent.dashboard;
		
		if(level ==100)
		configure();
		
		
		
		// This event allows for the parent extension and popup extension to
		// keep their
		// settings in sync. This event will be triggered any time a setting is
		// changed for this extension, in the parent or popup (i.e. when
		// settings.saveAsync is called).
		// level = tableau.extensions.settings.get("level");
		// console.log(level)
		
		tableau.extensions.settings.addEventListener(tableau.TableauEventType.SettingsChanged, (settingsEvent) => {
			updateExtensionBasedOnSettings(settingsEvent.newSettings)
		});
	});

});
function constructData() {
	var columns =[];
	var index = []
	
	
	var data1 = [];
	for(var x=1;x<=5;x++){
		data1.push(tableau.extensions.settings.get("level"+x))
	}
	console.log(data1)
	dashboard.worksheets.forEach(function (worksheet) {
        worksheet.getDataSourcesAsync().then(function (datasources) {
          datasources.forEach(function (datasource) {
        	  console.log(datasource)
        	//  if(datasource.name == "Sheet 1 (coffeewheel)" || datasource.name == "Sheet 1 (Coffee wheel)"){
        	  datasource.getUnderlyingDataAsync().then(function(datatable){

        				  for(var i=0;i<data1.length;i++){
        					  datatable.columns.forEach(function(c){
        						  if(c.fieldName != "Number of Records"){
	        				  if(c.fieldName == data1[i]){
	        					  columns.push(c.fieldName);
	        					  index.push(c.index)
	        				  }
        				  }
        			  })
        		  }
        	  })
        	 fieldNames = columns;
        	 
        	  datasource.getUnderlyingDataAsync().then(function(datatable){
        		  let list = [];
        		  list.push(columns)
        		  for (let row of datatable.data) {
        			  var r=[];
        			  for(p=0;p<index.length ; p++){
        				  if(row[index[p]].value!=null && row[index[p]].value!= "%null%")
        				  r.push(row[index[p]].value);
        				  else
        					  r.push("");
        			  }
        		        list.push(r);
        		    }
        		  // let values = list.filter((el, i, arr) => arr.indexOf(el)
					// === i);
        		  consolidateData = list;
        		  console.log(list);
        		   drawMap(list);
//        		  $.ajax({
//        			  method: "POST",
//        			  url: "https://peoples.io/trinetlive/trex/coffee-wheel-csv",
//        			  data: { mydata: consolidateData.toString() }
//        			})
//        			  .done(function( msg ) {
//        				  //window.location ="https://peoples.io/trinetlive/trex/coffee-wheel/1"
//        			    //alert( "Data Saved: " + msg );
//        			  });
//        		  $.post("https://peoples.io/trinetlive/trex/coffee-wheel-csv",
//        				    {
//        				        "mydata" : consolidateData.toString()
//        				    }
//        				).done(function(d) {
//        					console.log(d)
//        				   if(d === "success")
//        					   setTimeout(() => {
//        						   drawMap()
//							}, 5000);
//        				  ;
//        				  })
//        				  .fail(function() {
//        				    alert( "error" );
//        				  });
        		 
        		
        	  })
        	//  }
         
          })
          
       
        })
	})
	 //console.log(depth)
	//console.log(index)
}


function configure() {

	// This uses the window.location.origin property to retrieve the scheme,
	// hostname, and
	// port where the parent extension is currently running, so this string
	// doesn't have
	// to be updated if the extension is deployed to a new location.
	const popupUrl = `https://peoples.io/trinetlive/trex/coffee-wheel/configure`;
	// const popupUrl = `http://localhost:9999/trinet/configure`;

    /**
	 * This is the API call that actually displays the popup extension to the
	 * user. The popup is always a modal dialog. The only required parameter is
	 * the URL of the popup, which must be the same domain, port, and scheme as
	 * the parent extension.
	 * 
	 * The developer can optionally control the initial size of the extension by
	 * passing in an object with height and width properties. The developer can
	 * also pass a string as the 'initial' payload to the popup extension. This
	 * payload is made available immediately to the popup extension. In this
	 * example, the value '5' is passed, which will serve as the default
	 * interval of refresh.
	 */
	tableau.extensions.ui.displayDialogAsync(popupUrl, 0, { height: 500, width: 500 }).then((closePayload) => {
		constructData();
//		 drawMap();

// ?tableau.extensions.settings.get("level"):0
// +"1";
		
	}).catch((error) => {
		// One expected error condition is when the popup is closed by the user
		// (meaning the user
		// clicks the 'X' in the top right of the dialog). This can be checked
		// for like so:
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


var root;
var count = 0;

function buildHierarchy(csv,level) {
	console.log(csv[0])
	   root = {"name": "root", "children": [],"type":""};
	  for (var i = 1; i < csv.length; i++) {
		 
		  var sequence = "";
		 for(var j=0;j<csv[i].length;j++){
			 sequence = sequence +csv[i][j]+",";
		 }
		 sequence = sequence.substring(0, sequence.length - 1);
		 /*
			 * if(level == 0){ if(csv[i][4] == '') { var sequence =
			 * csv[i][0]+","+csv[i][1]+","+csv[i][2]+","+csv[i][3]; } else { var
			 * sequence =
			 * csv[i][0]+","+csv[i][1]+","+csv[i][2]+","+csv[i][3]+","+csv[i][4]; }
			 * }else{ if(csv[i][level-1] == '') { var sequence = ""; for(var
			 * j=0;j<level;j++){ sequence = sequence+csv[i][j-1]+","; }
			 * sequence = sequence.substring(0, sequence.length - 1);
			 *  } else { var sequence =""; for(var j=0;j<level;j++){ sequence =
			 * sequence+csv[i][j]+","; } sequence = sequence.substring(0,
			 * sequence.length - 1); } }
			 */
	  	 // console.log(sequence);
	    // var size = +csv[i][1];
	    
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
	 	  children.push(childNode);
	 	}
	 	currentNode = childNode;
	      } else {
	 	// Reached the end of the sequence; create a leaf node.
	 	childNode = {"name": nodeName,"type":csv[0][j]};
	 	children.push(childNode);
	      }
	    }
	  }
	  console.log(root)
	  return root;
	};




// d3.csv("resources/csv/coffee_wheel.csv", function(error, temp) {
// d3.csv("getcsvdata", function(error, temp) {
	 /*
		 * var data = d3.nest() .key(function(d) { return d.one; })
		 * .key(function(d) { return d.two; }) .key(function(d) { return
		 * d.three; }) .key(function(d) { return d.four; }) .key(function(d) {
		 * return d.five; }) .entries(temp);
		 * 
		 * var json =
		 * JSON.parse(JSON.stringify(data).split('"key":').join('"name":').split('"values":').join('"children":'));
		 * alert(JSON.stringify(json)); console.log(JSON.stringify(json));
		 * 
		 * var nodes = json;
		 */
	var width = 700,
    height = width,
    radius = width / 2,
    x = d3.scale.linear().range([0, 2 * Math.PI]),
    y = d3.scale.pow().exponent(1.3).domain([0, 1]).range([0, radius]),
    padding = 5,
    duration = 1000;
  	var arc,path;
  	 var text,csv,json;
	function drawMap(list){
	  	
		  
					  
			var div = d3.select("#vis").html("");
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
			  	  	  var json = buildHierarchy(list,level);
			  		//console.log(csv)
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
			
			  				      // Then loop through each worksheet and get
									// its filters, save promise for later.
			  				      
			  				      dashboard.worksheets.forEach(function (worksheet) {
			  				    	if(d.depth == 0){
				  				        worksheet.getFiltersAsync().then(function(f){
				  				        	for(var k=0;k<f.length;k++){
				  				        	 worksheet.clearFilterAsync(f[k].fieldName)
				  				        	}
				  				        })
			  				    	}
			  				          worksheet.clearFilterAsync(d.type)
			  				         
			  				         
			  				        	 worksheet.applyFilterAsync(d.type, [d.name],
			  		  				            tableau.FilterUpdateType.Replace);
			  				        
//			  				       
//			
//			
			  				      });
			
			  				      d3.selectAll(".inline-loader").classed("inline-loader",false);
			
			  				    }, function (err) {
			  				      // Something went wrong in initialization.
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
