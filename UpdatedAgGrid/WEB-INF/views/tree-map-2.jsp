
<!DOCTYPE html>
<html class="no-js">
<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
    <title>Treemap - Neat Zoom Effect</title>
    <script type="text/javascript" src="resources/js/tree-map-2/modernizr.js" charset="utf-8"></script>
    <script type="text/javascript" src="resources/js/d3.v3.min.js"></script>
    <style type="text/css">
        body {
            overflow: hidden;
            margin: 0;
            font-size: 12px;
            font-family: "Helvetica Neue", Helvetica;
        }

        .footer {
            z-index: 1;
            display: block;
            font-size: 26px;
            font-weight: 200;
            text-shadow: 0 1px 0 #fff;
        }

        svg {
            overflow: hidden;
        }

        rect {
            pointer-events: all;
            cursor: pointer;
            stroke: #EEEEEE;
        }

        .chart {
            display: block;
            margin: auto;
        }

        .label {
            stroke: #000000;
            fill: #000000;
            stroke-width: 0;
            margin: 2px;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .parent .label {
            font-size: 12px;
            stroke: #FFFFFF;
            fill: #FFFFFF;
        }

        .child .label {
            font-size: 11px;
        }

        .cell {
            font-size: 11px;
            cursor: pointer
        }
    </style>
</head>
<body>
 <a href="/trinet">Go Home</a><br><br>
<div id="body"></div>
<div class="footer">
    <select>
        <option value="size">Size</option>
        <option value="count">Count</option>
    </select>
</div>
</body>

<script type="text/javascript">


function buildHierarchy(csv) {
	  var root = {"name": "flare", "children": []};
	  for (var i = 1; i < csv.length; i++) {
		 
			  var sequence = csv[i][0]+","+csv[i][1]+","+csv[i][2];
	   
	  	 //alert(sequence);
	    //var size = +csv[i][1];
	    
	    var parts = sequence.split(",");
	    
	    var currentNode = root;
	    for (var j = 0; j < parts.length ; j++) {
	      var children = currentNode["children"];
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
	 	  childNode = {"name": nodeName, "children": []};
	 	  children.push(childNode);
	 	}
	 	currentNode = childNode;
	      } else {
	 	// Reached the end of the sequence; create a leaf node.
	 	childNode = {"name": nodeName,"size":csv[i][3]};
	 	children.push(childNode);
	      }
	    }
	  }
	  return root;
	};
	
    var chartWidth = 550;
    var chartHeight = 550;
    var xscale = d3.scale.linear().range([0, chartWidth]);
    var yscale = d3.scale.linear().range([0, chartHeight]);
    var color = d3.scale.category10();
    var headerHeight = 20;
    var headerColor = "#555555";
    var transitionDuration = 500;
    var root;
    var node;
    
    var treemap = d3.layout.treemap()
        .round(false)
        .size([chartWidth, chartHeight])
        .sticky(true)
        .value(function(d) {
            return d.size;
        });

    var chart = d3.select("#body")
        .append("svg:svg")
        .attr("width", chartWidth)
        .attr("height", chartHeight)
        .append("svg:g");

    d3.text("resources/csv/tree-map-2.csv", function(text) {
    	var csv = d3.csv.parseRows(text);
  	   var json = buildHierarchy(csv);
  	   var data = json;
        node = root = data;
        var nodes = treemap.nodes(root);
        var children = nodes.filter(function(d) {
            return !d.children;
        });
        var parents = nodes.filter(function(d) {
            return d.children;
        });

        // create parent cells
        var parentCells = chart.selectAll("g.cell.parent")
            .data(parents, function(d) {
                return "p-" + d.name;
            });
        var parentEnterTransition = parentCells.enter()
            .append("g")
            .attr("class", "cell parent")
            .on("click", function(d) {
                zoom(d);
            })
            .append("svg")
            .attr("class", "clip")
            .attr("width", function(d) {
                return Math.max(0.01, d.dx);
            })
            .attr("height", headerHeight);
        parentEnterTransition.append("rect")
            .attr("width", function(d) {
                return Math.max(0.01, d.dx);
            })
            .attr("height", headerHeight)
            .style("fill", headerColor);
        parentEnterTransition.append('text')
            .attr("class", "label")
            .attr("transform", "translate(3, 13)")
            .attr("width", function(d) {
                return Math.max(0.01, d.dx);
            })
            .attr("height", headerHeight)
            .text(function(d) {
                return d.name;
            });
        // update transition
        var parentUpdateTransition = parentCells.transition().duration(transitionDuration);
        parentUpdateTransition.select(".cell")
            .attr("transform", function(d) {
                return "translate(" + d.dx + "," + d.y + ")";
            });
        parentUpdateTransition.select("rect")
            .attr("width", function(d) {
                return Math.max(0.01, d.dx);
            })
            .attr("height", headerHeight)
            .style("fill", headerColor);
        parentUpdateTransition.select(".label")
            .attr("transform", "translate(3, 13)")
            .attr("width", function(d) {
                return Math.max(0.01, d.dx);
            })
            .attr("height", headerHeight)
            .text(function(d) {
                return d.name;
            });
        // remove transition
        parentCells.exit()
            .remove();

        // create children cells
        var childrenCells = chart.selectAll("g.cell.child")
            .data(children, function(d) {
                return "c-" + d.name;
            });
        // enter transition
        var childEnterTransition = childrenCells.enter()
            .append("g")
            .attr("class", "cell child")
            .on("click", function(d) {
                zoom(node === d.parent ? root : d.parent);
            })
            .append("svg")
            .attr("class", "clip");
        childEnterTransition.append("rect")
            .classed("background", true)
            .style("fill", function(d) {
                return color(d.parent.name);
            });
        childEnterTransition.append('text')
            .attr("class", "label")
            .attr('x', function(d) {
                return d.dx / 2;
            })
            .attr('y', function(d) {
                return d.dy / 2;
            })
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .style("display", "none")
            .text(function(d) {
                return d.name;
            });
        // update transition
        var childUpdateTransition = childrenCells.transition().duration(transitionDuration);
        childUpdateTransition.select(".cell")
            .attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")";
            });
        childUpdateTransition.select("rect")
            .attr("width", function(d) {
                return Math.max(0.01, d.dx);
            })
            .attr("height", function(d) {
                return d.dy;
            })
            .style("fill", function(d) {
                return color(d.parent.name);
            });
        childUpdateTransition.select(".label")
            .attr('x', function(d) {
                return d.dx / 2;
            })
            .attr('y', function(d) {
                return d.dy / 2;
            })
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .style("display", "none")
            .text(function(d) {
                return d.name;
            });

        // exit transition
        childrenCells.exit()
            .remove();

        d3.select("select").on("change", function() {
            console.log("select zoom(node)");
            treemap.value(this.value == "size" ? size : count)
                .nodes(root);
            zoom(node);
        });

        zoom(node);
    });


    function size(d) {
        return d.size;
    }


    function count(d) {
        return 1;
    }


    //and another one
    function textHeight(d) {
        var ky = chartHeight / d.dy;
        yscale.domain([d.y, d.y + d.dy]);
        return (ky * d.dy) / headerHeight;
    }

    function getRGBComponents(color) {
        var r = color.substring(1, 3);
        var g = color.substring(3, 5);
        var b = color.substring(5, 7);
        return {
            R: parseInt(r, 16),
            G: parseInt(g, 16),
            B: parseInt(b, 16)
        };
    }


    function idealTextColor(bgColor) {
        var nThreshold = 105;
        var components = getRGBComponents(bgColor);
        var bgDelta = (components.R * 0.299) + (components.G * 0.587) + (components.B * 0.114);
        return ((255 - bgDelta) < nThreshold) ? "#000000" : "#ffffff";
    }


    function zoom(d) {
        this.treemap
            .padding([headerHeight / (chartHeight / d.dy), 0, 0, 0])
            .nodes(d);

        // moving the next two lines above treemap layout messes up padding of zoom result
        var kx = chartWidth / d.dx;
        var ky = chartHeight / d.dy;
        var level = d;

        xscale.domain([d.x, d.x + d.dx]);
        yscale.domain([d.y, d.y + d.dy]);

        if (node != level) {
            chart.selectAll(".cell.child .label")
                .style("display", "none");
        }

        var zoomTransition = chart.selectAll("g.cell").transition().duration(transitionDuration)
            .attr("transform", function(d) {
                return "translate(" + xscale(d.x) + "," + yscale(d.y) + ")";
            })
            .each("start", function() {
                d3.select(this).select("label")
                    .style("display", "none");
            })
            .each("end", function(d, i) {
                if (!i && (level !== self.root)) {
                    chart.selectAll(".cell.child")
                        .filter(function(d) {
                            return d.parent === self.node; // only get the children for selected group
                        })
                        .select(".label")
                        .style("display", "")
                        .style("fill", function(d) {
                            return idealTextColor(color(d.parent.name));
                        });
                }
            });

        zoomTransition.select(".clip")
            .attr("width", function(d) {
                return Math.max(0.01, (kx * d.dx));
            })
            .attr("height", function(d) {
                return d.children ? headerHeight : Math.max(0.01, (ky * d.dy));
            });

        zoomTransition.select(".label")
            .attr("width", function(d) {
                return Math.max(0.01, (kx * d.dx));
            })
            .attr("height", function(d) {
                return d.children ? headerHeight : Math.max(0.01, (ky * d.dy));
            })
            .text(function(d) {
                return d.name;
            });

        zoomTransition.select(".child .label")
            .attr("x", function(d) {
                return kx * d.dx / 2;
            })
            .attr("y", function(d) {
                return ky * d.dy / 2;
            });

        zoomTransition.select("rect")
            .attr("width", function(d) {
                return Math.max(0.01, (kx * d.dx));
            })
            .attr("height", function(d) {
                return d.children ? headerHeight : Math.max(0.01, (ky * d.dy));
            })
            .style("fill", function(d) {
                return d.children ? headerColor : color(d.parent.name);
            });

        node = d;

        if (d3.event) {
            d3.event.stopPropagation();
        }
    }
</script>

</html>