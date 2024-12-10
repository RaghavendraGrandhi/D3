var dashboard, level1, level = 0,consolidateData = [],fieldNames = [],url,map_name,home_url,app_url,columns;
$(document).ready(function () {
	url = window.location.href ;
	url_array = url.split("/");
	map_name = url_array[5];
	app_url = url_array[0]+"/"+url_array[1]+"/"+url_array[2]+"/"+url_array[3]+"/";
	home_url=url_array[0]+"/"+url_array[1]+"/"+url_array[2]+"/"+url_array[3]+"/"+url_array[4]+"/"+url_array[5]+"/";
	tableau.extensions.initializeAsync({ 'configure': configure }).then(function () {

		dashboard = tableau.extensions.dashboardContent.dashboard;
		
		
	
	
	});

});
function configure() {
	showHome();
}
function constructData() {
	var columns =[];
	var index = []
	var rep_id =0;
	columns.push("APPLICATION")
	 var worksheets = tableau.extensions.dashboardContent.dashboard.worksheets;
	 var worksheetName  = tableau.extensions.settings.get("worksheet");
	var data1 = [];
	for(var x=1;x<=4;x++){
		data1.push(tableau.extensions.settings.get("level"+x))
	}
	   var worksheet = worksheets.find(function (sheet) {
	      return sheet.name === worksheetName;
	    });

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
        						  if(c.fieldName == "Report ID")
        							  rep_id = c.index;
        			  })
        		  }
        	  })
        	 fieldNames = columns;
        	  let list = [];
    		  list.push(columns)
        	  datasource.getUnderlyingDataAsync().then(function(datatable){
        		  
        		  for (let row of datatable.data) {
        			  var r=[];
        			  r.push("APPLICATION")
        			  for(p=0;p<index.length ; p++){
        				  if(row[index[p]].value!=null && row[index[p]].value!= "%null%")
        				  r.push(row[index[p]].value);
        				  else
        					  r.push("");
        			  }
        			  
        			 r.push(row[rep_id].value)
        		        list.push(r);
        		    }
        		  // let values = list.filter((el, i, arr) => arr.indexOf(el)
					// === i);
        	
        		  
        		 console.log(list)
        		  processData(list);

        		
        	  })
        	 
        
         
          })
          
       
        })
	
	
}



function processData(list){
	
var objAarr = [];
	 columns = [];
	$.each(list,function(i,d){
		if(i!=0){
			var obj ={
				
			}
			$.each(columns,function(k,n){
				obj[n]=d[k];
			})
			objAarr.push(obj);
		}else
			columns = d;
		
	})
	
	console.log(objAarr)
	 loadChart(objAarr,columns);

}





var viz, workbook;

var margin, width, height, i, duration, root, selected, colored, tree, diagonal, svg;
function loadChart(list,c) {
	var listResult =[];
	$.each(list,function(i,d){
		let r ={};
		for (let [key, value] of Object.entries(d)) {
			 if(key!= c[0]){
				 r[key]=value;
			 }
		}
	
		listResult.push(r);
	})
	console.log(listResult)
	$('#d3viz').html('');
	margin = {
		top : 20,
		right : 120,
		bottom : 20,
		left : 120
	}, width = 960 - margin.right - margin.left, 
			- margin.top - margin.bottom;
	height = 400;
	i = 0, duration = 750, root;
	selected = null;
	colored = null;

	tree = d3.layout.tree().size([ height, width ]);

	diagonal = d3.svg.diagonal().projection(function(d) {
		return [ d.y, d.x ];
	});

	svg = d3.select("#d3viz").append("svg").attr("width",
			width + margin.right + margin.left).attr("height",
			height + margin.top + margin.bottom).append("g").attr(
			"transform",
			"translate(" + margin.left + "," + margin.top + ")").attr(
			"fill", "white");

//	d3.csv("resources/csv/1.csv", function(error, csv) {
//		if (error)
//			throw error;
	//	console.log(csv)
	var data =d3.nest();
		c.forEach(col=>{
			data = data.key(function(d) {
				return d[col];
			})
		})
		data = data.rollup(function(v) {
			return v.map(function(d) {
				return d[c[c.length -1]];
			});
		}).entries(list);
		
		console.log(data)
		
		var json = JSON
				.parse(JSON.stringify(data[0].values).split('"key":').join(
						'"name":').split('"values":').join(
						'"children":'));
		var parent = data[0].key;
		data = {
			'name' : parent,
			'children' : json
		};
						root = data;
		root.x0 = height / 2;
		root.y0 = 0;
		root.children.forEach(collapse);
		selected = root.name[0];
		colored = selected;
		update(root);
		//tabfilter(); 

	//});

	d3.select(self.frameElement).style("height", "800px");
	//unloadMask();
}

function update(source) {

	  // Compute the new tree layout.
	  var nodes = tree.nodes(root).reverse(),
	      links = tree.links(nodes);

	  // Normalize for fixed-depth.
	  nodes.forEach(function(d) { d.y = d.depth * 120; });

	  // Update the nodesâ¦
	  var node = svg.selectAll("g.node")
	      .data(nodes, function(d) { return d.id || (d.id = ++i); });

	  // Enter any new nodes at the parent's previous position.
	  var nodeEnter = node.enter().append("g")
	      .attr("class", "node")
	      .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
	      .on("click", click);

	  nodeEnter.append("circle")
	      .attr("r", 1e-6)
	      .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

	  nodeEnter.append("text")
	      .attr("dy", ".35em")
	      //.text(function(d) { return d.name; })
	       .text(function(d) { 
	    	
	    	   if(d.depth==3){
	    		   return d.name.split(":")[0]; 
	    	   }else{
	    		   return d.name; 
	    	   }
	    	   })
	      .style("fill-opacity", 1e-6);

	  // Transition nodes to their new position.
	  var nodeUpdate = node.transition()
	      .duration(duration)
	      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

	  nodeUpdate.select("circle")
	      .attr("r", 4.5)
	      .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

	  nodeUpdate.select("text")
	      .style("fill-opacity", 1)
	      .attr("text-anchor", function(d) { 
	        return d.children ? "end" : "start"; 
	      })
	      .attr("x", function(d) { 
	        return d.children ? -10 : 10;
	      });

	  // Transition exiting nodes to the parent's new position.
	  var nodeExit = node.exit().transition()
	      .duration(duration)
	      .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
	      .remove();

	  nodeExit.select("circle")
	      .attr("r", 1e-6);

	  nodeExit.select("text")
	      .style("fill-opacity", 1e-6);

	  // Update the linksâ¦
	  var link = svg.selectAll("path.link")
	      .data(links, function(d) { return d.target.id; });

	  // Enter any new links at the parent's previous position.
	  link.enter().insert("path", "g")
	      .attr("class", "link")
	      .attr("d", function(d) {
	        var o = {x: source.x0, y: source.y0};
	        return diagonal({source: o, target: o});
	      });

	  // Transition links to their new position.
	  link.transition()
	      .duration(duration)
	      .attr("d", diagonal);

	  // Transition exiting nodes to the parent's new position.
	  link.exit().transition()
	      .duration(duration)
	      .attr("d", function(d) {
	        var o = {x: source.x, y: source.y};
	        return diagonal({source: o, target: o});
	      })
	      .remove();

	  // Stash the old positions for transition.
	  nodes.forEach(function(d) {
	    d.x0 = d.x;
	    d.y0 = d.y;
	  });
	}

function collapse(d) {
	if (d.children) {
		d._children = d.children;
		d._children.forEach(collapse);
		d.children = null;
	}
}
// Toggle children on click.
function click(d) {
	
	if(d.depth<columns.length-1){
		if (d.children) {
			d._children = d.children;
			d.children = null;
		} else {
			d.children = d._children;
			d._children = null;
		}
		if (d.parent) {
			d.parent.children.forEach(function(element) {
				if (d !== element) {
					collapse(element);
				}
			});
		}
		update(d);
		tabFilter(0,0);
	}else if(d.depth==columns.length-1){
		d3.selectAll(".inline-loader").classed("inline-loader",false);
		
		
		
		console.log(d)
		//$('#tableau').show();
		//loadMask();
		tabFilter(d.depth,columns[d.depth],d.name);
	}
	

}

/***********************Tableau Viz***********************/

function tabFilter(d,name,value) {
	if(name == 0 && value == 0){
		  dashboard.worksheets.forEach(function (worksheet) {
			  worksheet.clearFilterAsync(columns[columns.length-1]);
		  })
	}else{
	//document.write(workbook)

		if(d==columns.length-1){
	      // Then loop through each worksheet and get its filters, save promise for later.
	      dashboard.worksheets.forEach(function (worksheet) {
	        
	          worksheet.clearFilterAsync(name);
	          worksheet.applyFilterAsync(name, [value],
	            tableau.FilterUpdateType.Replace);
	       


	      });
		}else if(d<columns.length-1){
			 dashboard.worksheets.forEach(function (worksheet) {
				  worksheet.clearFilterAsync(columns[columns.length-1]);
			  })
		}


	}
	
}






