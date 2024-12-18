

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>d3.js concept browser - ramblings.mcpher.com</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<link rel="stylesheet" type="text/css"	href="resources/css/node-focus/node-focus.css">
<script type="text/javascript" src="https://d3js.org/d3.v3.min.js"></script>
<script type="text/javascript" src="https://www.google.com/jsapi"></script>


</head>
<body>
	<div class="container-fluid">
		<div class="row">
			<div class="col-sm-2 bgblue">
				<%@ include file="menu.jsp"%>
			</div>
			<div class="col-sm-10">
				<div id="chart"></div>
			</div>
		</div>
	</div>
<script type="text/javascript">
	google.load("jquery", "1");
	google.setOnLoadCallback(function() {
		initialize().then(function(control) {
			doTheTreeViz(control);
		});
	});

	function doTheTreeViz(control) {

		var svg = control.svg;

		var force = control.force;
		force.nodes(control.nodes).links(control.links).start();

		// Update the links
		var link = svg.selectAll("line.link").data(control.links, function(d) {
			return d.key;
		});

		// Enter any new links
		var linkEnter = link.enter().insert("svg:line", ".node").attr("class",
				"link").attr("x1", function(d) {
			return d.source.x;
		}).attr("y1", function(d) {
			return d.source.y;
		}).attr("x2", function(d) {
			return d.target.x;
		}).attr("y2", function(d) {
			return d.target.y;
		}).append("svg:title").text(function(d) {
			return d.target.name + ":" + d.source.name;
		});

		// Exit any old links.
		link.exit().remove();

		// Update the nodes
		var node = svg.selectAll("g.node").data(control.nodes, function(d) {
			return d.key;
		});

		node.select("circle").style("fill", function(d) {
			return getColor(d);
		}).attr("r", function(d) {
			return getRadius(d);
		})

		// Enter any new nodes.
		var nodeEnter = node
				.enter()
				.append("svg:g")
				.attr("class", "node")
				.attr("transform", function(d) {
					return "translate(" + d.x + "," + d.y + ")";
				})
				.on("dblclick", function(d) {
					control.nodeClickInProgress = false;
					if (d.url)
						window.open(d.url);
				})
				.on(
						"click",
						function(d) {
							// this is a hack so that click doesnt fire on the1st click of a dblclick
							if (!control.nodeClickInProgress) {
								control.nodeClickInProgress = true;
								setTimeout(
										function() {
											if (control.nodeClickInProgress) {
												control.nodeClickInProgress = false;
												if (control.options.nodeFocus) {
													d.isCurrentlyFocused = !d.isCurrentlyFocused;
													doTheTreeViz(makeFilteredData(control));
												}
											}
										}, control.clickHack);
							}
						}).call(force.drag);

		nodeEnter.append("svg:circle").attr("r", function(d) {
			return getRadius(d);
		}).style("fill", function(d) {
			return getColor(d);
		}).on("mouseover", function(d) {
			// enhance all the links that end here
			enhanceNode(d);
		})

		.on("mouseout", function(d) {
			resetNode(d);

		}).append("svg:title").text(function(d) {
			return d[control.options.nodeLabel];
		})

		function enhanceNode(selectedNode) {
			link.filter(
					function(d) {
						return d.source.key == selectedNode.key
								|| d.target.key == selectedNode.key;
					}).style("stroke", control.options.routeFocusStroke).style(
					"stroke-width", control.options.routeFocusStrokeWidth);

			if (text) {
				text.filter(function(d) {
					return areWeConnected(selectedNode, d);
				}).style("fill", control.options.routeFocusStroke);
			}
		}

		function areWeConnected(node1, node2) {
			for (var i = 0; i < control.data.links.length; i++) {
				var lnk = control.data.links[i];
				if ((lnk.source.key === node1.key && lnk.target.key === node2.key)
						|| (lnk.source.key === node2.key && lnk.target.key === node1.key))
					return lnk;
			}
			return null;
		}
		function resetNode(selectedNode) {
			link.style("stroke", control.options.routeStroke).style(
					"stroke-width", control.options.routeStrokeWidth);
			if (text) {
				text.style("fill", control.options.routeStroke);
			}
		}

		if (control.options.nodeLabel) {
			// text is done once for shadow as well as for text
			var textShadow = nodeEnter
					.append("svg:text")
					.attr(
							"x",
							function(d) {
								var x = (d.right || !d.fixed) ? control.options.labelOffset
										: (-d.dim.width - control.options.labelOffset);
								return x;
							}).attr("dy", ".31em").attr("class", "shadow")
					.attr("text-anchor", function(d) {
						return !d.right ? 'start' : 'start';
					}).style("font-size", control.options.labelFontSize + "px")
					.text(function(d) {
						return d.shortName ? d.shortName : d.name;
					});

			var text = nodeEnter
					.append("svg:text")
					.attr(
							"x",
							function(d) {
								var x = (d.right || !d.fixed) ? control.options.labelOffset
										: (-d.dim.width - control.options.labelOffset);
								return x;
							}).attr("dy", ".35em").attr("class", "text").attr(
							"text-anchor", function(d) {
								return !d.right ? 'start' : 'start';
							}).style("font-size",
							control.options.labelFontSize + "px").text(
							function(d) {
								return d.shortName ? d.shortName : d.name;
							})

					.on(
							"mouseover",
							function(d) {
								// enhance all the links that end here
								enhanceNode(d);
								d3.select(this).style('fill',
										control.options.routeFocusStroke);
							})

					.on("mouseout", function(d) {
						resetNode(d);
					});
		}

		// Exit any old nodes.
		node.exit().remove();
		control.link = svg.selectAll("line.link");
		control.node = svg.selectAll("g.node");
		force.on("tick", tick);

		if (control.options.linkName) {
			link.append("title").text(function(d) {
				return d[control.options.linkName];
			});
		}

		function tick() {
			link.attr("x1", function(d) {
				return d.source.x;
			}).attr("y1", function(d) {
				return d.source.y;
			}).attr("x2", function(d) {
				return d.target.x;
			}).attr("y2", function(d) {
				return d.target.y;
			});
			node.attr("transform", function(d) {
				return "translate(" + d.x + "," + d.y + ")";
			});

		}

		function getRadius(d) {
			return makeRadius(control, d);
		}
		function getColor(d) {
			return control.options.nodeFocus && d.isCurrentlyFocused ? control.options.nodeFocusColor
					: control.color(d.group);
		}

	}

	function makeRadius(control, d) {
		var r = control.options.radius
				* (control.options.nodeResize ? Math
						.sqrt(d[control.options.nodeResize])
						/ Math.PI : 1);
		return control.options.nodeFocus && d.isCurrentlyFocused ? control.options.nodeFocusRadius
				: r;
	}

	function makeFilteredData(control, selectedNode) {
		// we'll keep only the data where filterned nodes are the source or target
		var newNodes = [];
		var newLinks = [];

		for (var i = 0; i < control.data.links.length; i++) {
			var link = control.data.links[i];
			if (link.target.isCurrentlyFocused
					|| link.source.isCurrentlyFocused) {
				newLinks.push(link);
				addNodeIfNotThere(link.source, newNodes);
				addNodeIfNotThere(link.target, newNodes);
			}
		}
		// if none are selected reinstate the whole dataset
		if (newNodes.length > 0) {
			control.links = newLinks;
			control.nodes = newNodes;
		} else {
			control.nodes = control.data.nodes;
			control.links = control.data.links;
		}
		return control;

		function addNodeIfNotThere(node, nodes) {
			for (var i = 0; i < nodes.length; i++) {
				if (nodes[i].key == node.key)
					return i;
			}
			return nodes.push(node) - 1;
		}
	}

	function getPixelDims(scratch, t) {
		// scratch is an elemen with the correct styling, t is the text to be counted in pixels
		scratch.empty();
		scratch.append(document.createTextNode(t));
		return {
			width : scratch.outerWidth(),
			height : scratch.outerHeight()
		};
	}
	function initialize() {

		var initPromise = $.Deferred();
		var control = {};
		control.divName = "#chart";

		//some basic options
		var newoptions = {
			nodeLabel : "label",
			nodeResize : "count",
			height : 900,
			nodeFocus : true,
			radius : 3,
			charge : -500
		};
		// defaults
		control.options = $.extend({
			stackHeight : 12,
			radius : 5,
			fontSize : 14,
			labelFontSize : 8,
			labelLineSpacing : 2.5,
			nodeLabel : null,
			markerWidth : 0,
			markerHeight : 0,
			width : $(control.divName).outerWidth(),
			gap : 1.5,
			nodeResize : "",
			linkDistance : 80,
			charge : -120,
			styleColumn : null,
			styles : null,
			linkName : null,
			nodeFocus : true,
			nodeFocusRadius : 25,
			nodeFocusColor : "FireBrick",
			labelOffset : 5,
			gravity : .05,
			routeFocusStroke : "FireBrick",
			routeFocusStrokeWidth : 3,
			circleFill : "Black",
			routeStroke : "Black",
			routeStrokeWidth : 1,
			height : $(control.divName).outerHeight()

		}, newoptions);

		var options = control.options;
		options.gap = options.gap * options.radius;
		control.width = options.width;
		control.height = options.height;
		// this is an element that can be used to determine the width of a text label

		control.scratch = $(document.createElement('span')).addClass('shadow')
				.css('display', 'none').css("font-size",
						control.options.labelFontSize + "px");
		$('#chart').append(control.scratch);

		getTheData(control).then(
				function(data) {

					control.data = data;
					control.nodes = data.nodes;
					control.links = data.links;
					control.color = d3.scale.category20();
					control.clickHack = 200;

					control.svg = d3.select(control.divName).append("svg:svg")
							.attr("width", control.width).attr("height",
									control.height);

					control.force = d3.layout.force().size(
							[ control.width, control.height ]).linkDistance(
							control.options.linkDistance).charge(
							control.options.charge).gravity(
							control.options.gravity);

					initPromise.resolve(control);
				});
		return initPromise.promise();
	}

	function getTheData(control) {
		var dataPromise = getTheRawData();
		var massage = $.Deferred();
		dataPromise.done(function(data) {
			// need to massage it
			massage.resolve(dataMassage(control, data));
		}).fail(function(error) {
			console.log(error);
			massage.reject(error);
		});
		return massage.promise();
	}

	function dataMassage(control, data) {

		var ind = data, nodes = [], links = [];
		// the tags are to be circles
		for (var i = 0; i < ind.length; i++) {
			ind[i].isCurrentlyFocused = false;
			nodes.push(ind[i]);
			// add links to pages
			for (var j = 0; j < ind[i].pages.length; j++) {
				//push this page as a node
				var node = findOrAddPage(control, ind[i].pages[j], nodes);
				node.isCurrentlyFocused = false;
				// create a link
				var link = {
					source : node,
					target : ind[i],
					key : node.key + "_" + ind[i].key
				};
				links.push(link);
			}
		}
		// sort nodes alpha
		nodes.sort(function(a, b) {
			return a.name < b.name ? -1 : (a.name == b.name ? 0 : 1);
		});
		control.pageCount = 0;
		control.pageRectSize = {
			width : 0,
			height : 0,
			radius : 0
		};
		for (var i = 0; i < nodes.length; i++) {
			page = nodes[i];
			page.group = 0;
			page.dim = getPixelDims(control.scratch, page.name);
			if (page.fixed) {
				control.pageCount++;
				// this will calculate the width/height in pixels of the largest label
				control.pageRectSize.width = Math.max(
						control.pageRectSize.width, page.dim.width);
				control.pageRectSize.height = Math.max(
						control.pageRectSize.height, page.dim.height);
				control.pageRectSize.radius = Math.max(
						control.pageRectSize.radius, makeRadius(control, page));
				page.group = 1;
			}

		}
		var options = control.options;

		// we're going to fix the nodes that are pages into two columns
		for (var i = 0, c = 0; i < nodes.length; i++) {
			var page = nodes[i];
			if (page.fixed) {
				page.right = (c > control.pageCount / 2);
				// y dimension calc same for each column
				page.y = ((c % (control.pageCount / 2)) + .5)
						* (control.pageRectSize.height);

				// x based on right or left column
				page.x = page.right ? control.width
						- control.pageRectSize.width - options.labelOffset
						: page.dim.width + options.labelOffset;
				c++;
			}

		}

		return {
			nodes : nodes,
			links : links
		};

	}

	function findOrAddPage(control, page, nodes) {
		for (var i = 0; i < nodes.length; i++) {
			if (nodes[i].key === page.key) {
				nodes[i].count++;
				return nodes[i];
			}
		}
		page.fixed = true;
		page.count = 0;
		return nodes[nodes.push(page) - 1];
	}

	// modify with your proxy and dataurl
	// take the raw data and prepare it for d3
	function getParameterByName(name) {
		name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex
				.exec(location.search);
		return results == null ? "" : decodeURIComponent(results[1].replace(
				/\+/g, " "));
	}
	// modify with your proxy and dataurl
	// take the raw data and prepare it for d3
	function getTheRawData() {
		// here's a php proxy to make jsonP
		var proxyUrl = "https://script.google.com/macros/s/AKfycbzMhwJy-OAR28YTBxO1AbVdSQQFI101X3UDzY-1yc9lUgBfpSc/exec";
		;

		// blogwheel.json - blog only
		// sitewheel.json - both
		// allwheel.json - site

		var dataUrl = getParameterByName('data')
				|| "https://storage.googleapis.com/xliberation.com/dump/blogwheel.json";

		// promise will be resolved when done
		return getPromiseData(dataUrl, proxyUrl);
	}

	// no need to touch this
	// general deferred handler for getting json data through proxy and creating promise
	function getPromiseData(url, proxyUrl) {
		var deferred = $.Deferred();
		var u = proxyUrl + "?url=" + encodeURIComponent(url);

		$.getJSON(
				u,
				null,
				function(data) {
					if (Math.floor(data.responseCode / 100) !== 2) {
						throw 'error ' + data.responseCode + ' getting data '
								+ data.result;
					}
					// data returned by apps script proxy is encoded json.
					deferred.resolve(JSON.parse(data.result));
				}).error(function(res, status, err) {
			deferred.reject("error " + err + " for " + url);
		});

		return deferred.promise();
	}
</script>
</body>
</html>