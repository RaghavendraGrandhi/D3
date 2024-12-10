
<!DOCTYPE html>
<html class="no-js">
<link href="resources/css/loadmask/jquery.loadmask.css" rel="stylesheet" type="text/css" />
<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
    <title>Treemap - Neat Zoom Effect</title>
    <script type="text/javascript" src="resources/js/tree-map-2/modernizr.js" charset="utf-8"></script>
    <script type="text/javascript" src="resources/js/d3.v3.min.js"></script>
    <script src="resources/js/jquery-1.6.2.min.js"></script>
    <script  src="resources/js/loadmask/jquery.loadmask.js"></script>
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
            fill: #FFFFFF;
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
    <select onchange="updateTreeMap()" id="tree-map-selection">
        <option value="size">Size</option>
        <option value="count">Count</option>
    </select>
</div>
</body>

<script type="text/javascript">
var xlsxFileName = "tree-size";
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


$(document).ready(function(){
	$("#body").mask("Loading...");
	populateChart();
});
  
    
    function updateTreeMap(){
    	$("#body").mask("Loading...");
		var value = $('#tree-map-selection option:selected').val();
		if(value=="count"){
			xlsxFileName = "tree-count";
		}else{
			xlsxFileName = "tree-size";
		}
		
		d3.select("svg").remove();
		treemap = d3.layout.treemap()
	        .round(false)
	        .size([chartWidth, chartHeight])
	        .sticky(true)
	        .value(function(d) {
	            return d.size;
	        });
			
		chart = d3.select("#body")
	        .append("svg:svg")
	        .attr("width", chartWidth)
	        .attr("height", chartHeight)
	        .append("svg:g");
			
		populateChart();
	}

    function populateChart(){
        d3.json("readXlsxFile/"+xlsxFileName, function(data) {
      	  	data = {'name':'','children':data};
      	    console.log(data);
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
            /*     .append("g")
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
                .style("fill", headerColor); */
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
            var n = "";
            var childEnterTransition = childrenCells.enter()
                .append("g")
                .attr("class", "cell child")
                .on("click", function(d) {
                    zoom(node === d.parent ? root : d.parent);
                })
                .append("svg")
                .attr("class", "clip");
            childEnterTransition.append("rect")
            	.attr("id", function(d) {
            		return d.name;
                })
                .classed("background", true)
                .style("fill", function(d) {
                    return color(d.parent.name);
                }).append('title').text(function(d) {
            		return d.name;
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
                .style("display", "block")
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
                .style("display", "block")
                .text(function(d) {
                    return d.name;
                });

            // exit transition
            childrenCells.exit()
                .remove();

          /*   d3.select("select").on("change", function() {
                console.log("select zoom(node)");
                treemap.value(this.value == "size" ? size : count)
                    .nodes(root);
                zoom(node);
            }); */

            zoom(node);
        	$("#body").unmask();
        });
    }
    
    



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
                .style("display", "block");
        }

        var zoomTransition = chart.selectAll("g.cell").transition().duration(transitionDuration)
            .attr("transform", function(d) {
                return "translate(" + xscale(d.x) + "," + yscale(d.y) + ")";
            })
            .each("start", function() {
                d3.select(this).select("label")
                    .style("display", "block");
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
            	if(d.name.indexOf("S_HRP")>-1){
            		if(xlsxFileName=="tree-count"){
            			return "#2E8B57";
            		}else{
            			return "#4682B4";
            		}
            		
            	}else if(d.name.indexOf("S_MTX")>-1){
            		if(xlsxFileName=="tree-count"){
            			return "#3CB371";
            		}else{
            			return "#63B8FF";
            		}
            	}else if(d.name.indexOf("S_PSCRM")>-1){
            		if(xlsxFileName=="tree-count"){
            			return "#00CD66";
            		}else{
            			return "#5CACEE";
            		}
            	}else if(d.name.indexOf("S_PSFN")>-1){
            		if(xlsxFileName=="tree-count"){
            			return "#43CD80";
            		}else{
            			return "#4F94CD";
            		}
            	}else if(d.name.indexOf("S_PSHR")>-1){
            		if(xlsxFileName=="tree-count"){
            			return "#4EEE94";
            		}else{
            			return "#87CEFA";
            		}
            	}else if(d.name.indexOf("S_REF")>-1){
            		if(xlsxFileName=="tree-count"){
            			return "#00EE76";
            		}else{
            			return "#B0E2FF";
            		}
            	}else if(d.name.indexOf("S_SFDC")>-1){
            		if(xlsxFileName=="tree-count"){
            			return "#54FF9F";
            		}else{
            			return "#A4D3EE";
            		}
            	}else if(d.name.indexOf("S_SNOW")>-1){
            		if(xlsxFileName=="tree-count"){
            			return "#00FF7F";
            		}else{
            			return "#8DB6CD";
            		}
            	}else{
            		return "#999999";
            	}
            	
                //return d.children ? headerColor : color(d.parent.name);
            });

        node = d;

        if (d3.event) {
            d3.event.stopPropagation();
        }
    }
</script>

</html>