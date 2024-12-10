<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page isELIgnored="false"%>
<html>
<head>
<link href="resources/css/loadmask/jquery.loadmask.css" rel="stylesheet"
	type="text/css" />
<meta charset="utf-8">
<link href="resources/css/component-chosen.css" rel="stylesheet">

<style>
.clear-all {
	margin-top: 40px;
	border-radius: 6px;
}

.node {
	font: 300 11px "Helvetica Neue", Helvetica, Arial, sans-serif;
	fill: #bbb;
}

.node:hover {
	fill: #000;
}

.link {
	stroke: steelblue;
	stroke-opacity: 0.4;
	fill: none;
	pointer-events: none;
}

.node:hover, .node--source, .node--target {
	font-weight: 700;
}

.node--source {
	fill: #2ca02c;
}

.node--target {
	fill: #d62728 ! important;
}
.node--active{
	font-weight: 700 ! important;
	fill: #000 ! important;
}

.link--source {
	stroke: #d62728;
}

.link--target {
	stroke: #2ca02c;
}

.link--source, .link--target {
	stroke-opacity: 1;
	stroke-width: 2px;
}
</style>

</head>
<body>



	<div class="container-fluid">
		<div class="row">
			<div class="col-sm-2 bgblue">
				<%@ include file="menu.jsp"%>
			</div>
			<div class="col-sm-10">
				<div class="container">

					<div class="row">
						<div class=" col-md-4 ">
							<label>Select User:</label> <select id="optgroup"
								class="form-control form-control-chosen"
								data-placeholder="Please select..." multiple>
								<optgroup label="Users" id="users">

								</optgroup>


							</select>
						</div>
						<div class="col-md-4">
							<button type="button" class="btn-primary mx-auto clear-all"
								onclick="clearAll()">CLEAR ALL</button>
						</div>
					</div>


				</div>
				<div id="svg" class="text-center"></div>
			</div>
		</div>
	</div>


</body>
<jsp:include page="include-loader.jsp" />
<script src="resources/js/d3.v4.min.js"></script>
<script src="resources/js/multiselect/tether.min.js"></script>
<script src="resources/js/multiselect/chosen.jquery.js"></script>
<script>
	var nodeData = [];
	var nodeIndex = 0;
	var rowIndex = 0;
	var rowIndexAlt = 0;
	var isMouseOver = false;
	var diameter = 960, radius = diameter / 2, innerRadius = radius - 120;

	var cluster = d3.cluster().size([ 360, innerRadius ]);

	var line = d3.radialLine().curve(d3.curveBundle.beta(0.85)).radius(
			function(d) {
				return d.y;
			}).angle(function(d) {
		return d.x / 180 * Math.PI;
	});

	var svg = d3.select("#svg").append("svg").attr("width", diameter).attr(
			"height", diameter).append("g").attr("transform",
			"translate(" + radius + "," + radius + ")");

	var link = svg.append("g").selectAll(".link"), node = svg.append("g")
			.selectAll(".node");

	d3.json("eis-hierarchical-edge-bundling-excel",
			function(error, classes) {
				loadMask();
				if (error)
					throw error;
				var root = packageHierarchy(classes).sum(function(d) {
					return d.size;
				});
				for (i = 0; i < classes.length; i++) {
					d3.select("#users").append("option").text(classes[i].name);
				}
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

				link = link.data(packageImports(root.leaves())).enter().append(
						"path").each(function(d) {
					d.source = d[0], d.target = d[d.length - 1];
				}).attr("class", "link").attr("d", line);

				node = node.data(root.leaves()).enter().append("text").attr(
						"class", "node").attr("id", function(d) {

					rowIndexAlt++;
					var rowIndex = rowIndexAlt - 1;
					d['specialIndex'] = rowIndex;
					nodeData.push(d);
					return "node-" + rowIndex;
				}).attr("dy", "0.31em").attr(
						"transform",
						function(d) {
							return "rotate(" + (d.x - 90) + ")translate("
									+ (d.y + 8) + ",0)"
									+ (d.x < 180 ? "" : "rotate(180)");
						}).attr("text-anchor", function(d) {
					return d.x < 180 ? "start" : "end";
				}).text(function(d) {
					unloadMask();
					return d.data.key;
				}).on("mouseover", mouseovered).on("mouseout", mouseouted);
			});

	function mouseovered(d) {
		lenght=0;
		d3.selectAll(".search-choice").each(function() {
			lenght++
		})
		console.log(lenght)
		if(lenght == 0){
		isMouseOver = true;
		
		$(".node").css({
			fill : "",
			"font" : ""
		});
		
		highlightSourceAndTarget(d);
		}
		

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
		lenght=0;
		d3.selectAll(".search-choice").each(function() {
			lenght++
		})
		console.log(lenght)
		if(lenght == 0){
		isMouseOver = false;
		link.classed("link--target", false).classed("link--source", false);

		node.classed("node--target", false).classed("node--source", false);
		}
	}

	// Lazily construct the package hierarchy from class names.
	function packageHierarchy(classes) {
		var map = {};

		function find(name, data, index) {
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
				}
			}
			return node;
		}

		classes.forEach(function(d, index) {
			find(d.name, d, index);
		});
		return d3.hierarchy(map[""]);
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
					alert("ok");
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
		
		
		lenght=0;
		d3.selectAll(".search-choice a").each(function() {
			lenght++
		})
		
		clearPrevious()
		isMouseOver = true;
		if(lenght == 0)
			clearAll();
		d3.selectAll(".search-choice")
				.each(
						function() {
							var value = d3.select(this).select("span").text();
							for (i = 0; i < nodeData.length; i++) {
								if (value == nodeData[i].data.name) {
									//nodes.push(nodeData[i]);
									
									d3.select('#node-' + i).style("fill","#000").style("font-weight","700");
									
									link
											.each(function(l) {
												
												if (!(d3.select(this).classed(
														"link--target") || d3
														.select(this).classed(
																"link--source"))) {
													d3
															.select(this)
															.classed(
																	"link--target",
																	function(l) {
																		if (l.target === nodeData[i]) {
																			
																			return l.source.source = true
																		};
																})
															.classed(
																	"link--source",
																	function(l) {
																		if (l.source === nodeData[i]) {
																			
																			return l.target.target = true;
																		}

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
		d3.selectAll("node--target").style("fill","#d62728!important")
		
	}
	
	
function filterNodes1() {
		
		
		lenght=0;
		filterdIndex = [];
		nodeActive = [];
		d3.selectAll(".search-choice a").each(function() {
			lenght++
		})
		
		clearPrevious()
		isMouseOver = true;
		if(lenght == 0)
			clearAll();
		d3.selectAll(".search-choice")
				.each(
						function() {
							var value = d3.select(this).select("span").text();
							for (i = 0; i < nodeData.length; i++) {
								d3.select('#node-' + i).classed("node--active",false);
								if (value == nodeData[i].data.name) {
									//nodes.push(nodeData[i]);
									nodeActive.push(i);
									filterdIndex.push(nodeData[i].data.key);
								}

							}		

						});
		nodeActive.forEach(function(d,i){
			d3.select('#node-' + d).classed("node--active",true);
		})
		
		link
		.each(function(l) {
			
	
				d3
						.select(this).classed(
								"link--source",
								function(l) {
									
									
									
									for(j=0;j<filterdIndex.length;j++){
										if (l.target.data.imports.indexOf(filterdIndex[j])<0
												
												) {
											
											return l.target.target = false;
										};
										
										//console.log(nodeData[filterdIndex[j]].data.key == l.source.data.key);

									}
										return l.target.target = true;

								}).classed(
										"link--target",
										function(l) {
											for(j=0;j<filterdIndex.length;j++){
												if (l.source.data.key ==filterdIndex[j]
														
														) {
													//console.log(l.source.data.key)
													return l.source.source = false;
												};
												
												//console.log(nodeData[filterdIndex[j]].data.key == l.source.data.key);

											}
												return l.source.source = false;

										})
						
						.raise();
			
		})
		
		d3.selectAll(".link--source").each(function(l){
			//console.log(l.source.data.key)
			count =0 ;
			for(j=0;j<filterdIndex.length;j++){
				if(l.source.data.key == filterdIndex[j]){
					
					count++;
				}
			}
			if(count ==0){
				 l.target.target = false;
				d3.select(this).classed("link--source",false);
			}else{
				
				node.each(function(n){
					
					if(l.target.data.key == n.data.key){
						
						d3.select(this).classed("node--target",true).style("fill","#d62728 ! important");
					}
				})
				
			}
			
		})
		d3.selectAll(".node").style("fill","#bbb")
		
	

									
		
		
	}

	
	function clearAll() {
		
		
		d3.selectAll(".search-choice-close").each(function() {
			d3.select(this).dispatch('click');
		})
		node.classed(function(n){
			d3.select(this).classed("node--active",false);
		})
		mouseouted(null);

	}
	
	function clearPrevious() {
		
		isMouseOver = false;
		
		link.classed("link--target", false).classed("link--source", false);
		node.classed("node--source",false).classed("node--target",false).classed("node--active",false);
		
		
	}
	
</script>