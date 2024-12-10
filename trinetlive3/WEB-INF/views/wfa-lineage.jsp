<html>
<head>
<style>
.node {
	cursor: pointer;
}

.node circle {
	fill: #fff;
	stroke: steelblue;
	stroke-width: 1.5px;
}



.link {
	fill: none;
	stroke: #ccc;
	stroke-width: 1.5px;

	/* #0095d3
#89cbdf
#6db33f
#387c2c
#006990 */
}

body {
	background-image: url(../texture-noise.png);
	background-color: #000000;
}

#chart, #header, #footer {
	position: absolute;
	top: 0;
}

#header, #footer {
	z-index: 1;
	display: block;
	font-size: 36px;
	font-weight: 300;
	text-shadow: 0 1px 0 #fff;
}

#header.inverted, #footer.inverted {
	color: #fff;
	text-shadow: 0 1px 4px #000;
}

#header {
	top: 80px;
	left: 140px;
	width: 1000px;
}

#footer {
	top: 680px;
	right: 140px;
	text-align: right;
}

rect {
	fill: none;
	pointer-events: all;
}

pre {
	font-size: 18px;
}

line {
	stroke: #000;
	stroke-width: 1.5px;
}

.string, .regexp {
	color: #f39;
}

.keyword {
	color: #00c;
}

.comment {
	color: #777;
	font-style: oblique;
}

.number {
	color: #369;
}

.class, .special {
	color: #1181B8;
}

a:link, a:visited {
	color: #000;
	text-decoration: none;
}

a:hover {
	color: #666;
}

.hint {
	position: absolute;
	right: 0;
	width: 1280px;
	font-size: 12px;
	color: #999;
}

#title {
	font-family: open-sans;
	font-style: normal;
	font-weight: 600;
	background-color: #222;
	width: 1000px;
	margin-left: auto;
	margin-right: auto;
	margin-top: 30px;
	margin-bottom: 0px;
	font-size: 24px;
	color: #FFFFFF;
}

#title .header {
	font-size: 24px;
	padding-top: 5px;
	padding-right: 5px;
	padding-left: 10px;
	padding-bottom: 5px;
	display: block;
}

.node circle {
	cursor: pointer;
	fill: #fff;
	stroke: steelblue;
	stroke-width: 1.5px;
}

.node text {
	font-size: 14px;
	cursor: pointer;
	fill: black;
	font-family: calibri;
	font-weight: bold;
}

.selected {
	fill: red;
}

/*.root text{
	font-size:16px;
}*/
path.link {
	fill: none;
	stroke: #ccc;
	stroke-width: 1px;
}

#main {
	width: auto;
	height: 1000px;
	background-color: #FFFFFF;
	margin-left: auto;
	margin-right: auto;
}

#d3viz {
	width: 680px;
	height: 600px;
	float: left;
	margin-left: -75px;
	z-index: 999;
	font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

#intro {
	display: block;
	position: absolute;
	width: 275px;
	float: left;
	margin-top: 100px;
	margin-left: 373px;
	font-size: medium;
	color: #000000;
	font-family: open-sans;
	font-style: normal;
	font-weight: 300;
}

#tableau {
	width: 1200px;
	height: 900px;
	float: right;
	margin-top:10px;
	display: block;
	
}

#logo {
	margin-top: 45px;
	margin-left: auto;
	margin-right: auto;
	width: 1000px;
}
</style>
<%@include file="include-jquery-css.jsp"%>
</head>
<%@include file="include-jquery-js.jsp"%>
<%@include file="include-d3-tableau.jsp"%>
<body>
<%-- 	<%@include file="go-home.jsp"%> --%>
	<div id="main">
		<div id="d3viz"></div>
		<div id="tableau" style="display: none;"></div>
	</div>

	<script>
		$(document).ready(function() {
			initViz();
		});
		var margin, width, height, i, duration, root, selected, colored, tree, diagonal, svg;

		function loadChart() {
			$('#d3viz').html('');
			margin = {
				top : 20,
				right : 120,
				bottom : 20,
				left : 120
			}, 
			width = 960 - margin.right - margin.left,
			//height = 800 - margin.top - margin.bottom;
			height = "600";
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

			d3.csv("resources/csv/WfaStandardReport.csv", function(error, csv) {
				if (error)
					throw error;
				var data = d3.nest().key(function(d) {
					return d.Category;
				}).key(function(d) {
					return d['Subscription Type'];
				}).key(function(d) {
					return d['Display Name']+":"+d['Report ID'];
				})/* .key(function(d) {
					return d['Report ID'];
				}) */.rollup(function(v) {
					return v.map(function(d) {
						//return d['Display Name'];
						return d['Display Name']+":"+d['Report ID'];
					});
				}).entries(csv);

				var json = JSON
						.parse(JSON.stringify(data).split('"key":').join(
								'"name":').split('"values":').join(
								'"children":'));
				var parent = csv[0]['Application'];
				data = {
					'name' : parent,
					'children' : json
				};
				root = data;
				console.log(root);
				root.x0 = height / 2;
				root.y0 = 0;
				root.children.forEach(collapse);
				selected = root.name[0];
				colored = selected;
				update(root);
				//tabfilter(); 

			});

			d3.select(self.frameElement).style("height", "800px");
			unloadMask();
		}

		function update(source) {

			  // Compute the new tree layout.
			  var nodes = tree.nodes(root).reverse(),
			      links = tree.links(nodes);

			  // Normalize for fixed-depth.
			  nodes.forEach(function(d) { d.y = d.depth * 120; });

			  // Update the nodes…
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

			  // Update the links…
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
			if(d.depth<3){
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
			}else if(d.depth==3){
				var name = d.name;
				var reportId = name.split(":")[1];
				var reportName = "<b style='color:steelblue'>"+name.split(":")[0]+"</b>";
				$('#tableau').show();
				$('#main').mask('Loading for '+reportName);
				tabFilter(reportId);
			}
		}

		/***********************Tableau Viz***********************/
		var viz, workbook;
		function initViz() {
			loadMask();
			var vizDiv = document.getElementById("tableau");
			var vizURL = "https://tableau-corp-dev.trinet.com/t/TRINET-DEV1/views/WFALineage/WFALineageUsage";
			var options = {
				onFirstInteractive : function() {
					workbook = viz.getWorkbook();
					loadChart();
				}
			};
			viz = new tableauSoftware.Viz(vizDiv, vizURL, options);
		}

		function tabFilter(reportId) {
			gotoTop();
			workbook.changeParameterValueAsync('Report ID', reportId).then(function(){
				unloadMask();
			},function(err){
				alert("Unable to load the report for "+reportId);
				console.log("Unable to load the report for "+reportId);
				unloadMask();
				});;
		}
		
		function loadMask(){
			$('#main').mask('Loading');
		}
		function unloadMask(){
			$('#main').unmask();
		}
		function gotoTop(){
			$('html,body').animate({
				   scrollTop: 0
				}, 'slow');
		}
	</script>
</body>
</html>