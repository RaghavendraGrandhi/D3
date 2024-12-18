<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/>
<link href="resources/css/vizdoc/visdock.css" rel="stylesheet" type="text/css"/>
<script src="resources/js/d3/d3.v3.min.js"></script>
<script src="resources/js/vizdoc/visdock.js"></script>
<script src="resources/js/vizdoc/2D.js"></script>
<script src="resources/js/vizdoc/IntersectionUtilities.js"></script>
<script src="resources/js/vizdoc/visdock.utils.js"></script>
    <style type="text/css">

path.arc {
  cursor: move;
  fill: #fff;
}

.node circle {
  fill: #fff;
  stroke: steelblue;
  stroke-width: 1.5px;
}

.node {
  font-size: 10px;
  pointer-events: none;
}

.link {
  fill: none;
  stroke: #ccc;
  stroke-width: 1.5px;
}

    </style>
  </head>
  <body>
    <div id="body">

    </div>
    <script type="text/javascript">

var w = 1200,
    h = 1000,
    rx = w / 2,
    ry = h / 2,
    m0,
    rotate = 0;
VisDock.init('#body', {width: 1200, height: 1000});
AnnotatedByData.layerTypes = ["circle"];
var viewport = VisDock.getViewport();

var cluster = d3.layout.cluster()
    .size([360, ry - 120])
    .sort(null);

var diagonal = d3.svg.diagonal.radial()
    .projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });

var svg = d3.select("#body").append("div")
    .style("width", w + "px")
    .style("height", w + "px");

var vis = svg.append("svg:svg")
    .attr("width", w)
    .attr("height", w)
  .append("svg:g")
    .attr("transform", "translate(" + rx + "," + ry + ")");

var vis = viewport.append("svg:g")
	.attr("transform", "translate(" + rx + "," + ry + ")");

vis.append("svg:path")
    .attr("class", "arc")
    .attr("d", d3.svg.arc().innerRadius(ry - 120).outerRadius(ry).startAngle(0).endAngle(2 * Math.PI))
    .on("mousedown", mousedown);

d3.json("resources/json/rotating-cluster.json", function(json) {
  VisDock.startChrome();
  var nodes = cluster.nodes(json);

  var link = vis.selectAll("path.link")
      .data(cluster.links(nodes))
    .enter().append("svg:path")
      .attr("class", "link")
      .attr("d", diagonal);

  var node = vis.selectAll("g.node")
      .data(nodes)
    .enter().append("svg:g")
      .attr("class", "node")
      .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })

  node.append("svg:circle")
      .attr("r", 3);

  node.append("svg:text")
      .attr("dx", function(d) { return d.x < 180 ? 8 : -8; })
      .attr("dy", ".31em")
      .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
      .attr("transform", function(d) { return d.x < 180 ? null : "rotate(180)"; })
      .text(function(d) { return d.name; });
  VisDock.finishChrome();
});

d3.select(window)
    .on("mousemove", mousemove)
    .on("mouseup", mouseup);

function mouse(e) {
  return [e.pageX - rx, e.pageY - ry];
}

function mousedown() {
  m0 = mouse(d3.event);
  d3.event.preventDefault();
}

function mousemove() {
  if (m0) {
  	VisDock.startChrome();
    var m1 = mouse(d3.event),
        dm = Math.atan2(cross(m0, m1), dot(m0, m1)) * 180 / Math.PI,
        tx = "translate3d(0," + (ry - rx) + "px,0)rotate3d(0,0,0," + dm + "deg)translate3d(0," + (rx - ry) + "px,0)";
    svg
        .style("-moz-transform", tx)
        .style("-ms-transform", tx)
        .style("-webkit-transform", tx);
    update();
    VisDock.finishChrome();
  }
}

function mouseup() {
  if (m0) {
  	m0 = 0;
  }
}

function update(){
    VisDock.startChrome();
    var m1 = mouse(d3.event),
        dm = Math.atan2(cross(m0, m1), dot(m0, m1)) * 180 / Math.PI,
        tx = "rotate3d(0,0,0,0deg)";

    rotate += dm;
    if (rotate > 360) rotate -= 360;
    else if (rotate < 0) rotate += 360;
    m0 = null;

    svg
        .style("-moz-transform", tx)
        .style("-ms-transform", tx)
        .style("-webkit-transform", tx);

    vis
        .attr("transform", "translate(" + rx + "," + ry + ")rotate(" + rotate + ")")
      .selectAll("g.node text")
        .attr("dx", function(d) { return (d.x + rotate) % 360 < 180 ? 8 : -8; })
        .attr("text-anchor", function(d) { return (d.x + rotate) % 360 < 180 ? "start" : "end"; })
        .attr("transform", function(d) { return (d.x + rotate) % 360 < 180 ? null : "rotate(180)"; });
    m0 = mouse(d3.event);
    VisDock.updateLayers();
    AnnotatedByData.update();
    VisDock.finishChrome();	
}

function cross(a, b) {
  return a[0] * b[1] - a[1] * b[0];
}

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}

VisDock.eventHandler = {
	getHitsPolygon : function(points, inclusive) {
		var shapebound = new createPolygon(points);
		return shapebound.intersectEllipse(viewport.selectAll("circle")[0], inclusive)
	},
	getHitsLine : function(points, inclusive) {
		var shapebound = new createLine(points);
		return shapebound.intersectEllipse(viewport.selectAll("circle")[0], inclusive)
	},
	getHitsEllipse : function(points, inclusive) {
		var shapebound = new createEllipse(points);
		return shapebound.intersectEllipse(viewport.selectAll("circle")[0], inclusive)
	},
	setColor : function(hits) {
		for (var i = 0; i < hits.length; i++) {
			VisDock.utils.addEllipseLayer(hits[i], undefined, num - 1)
		}
	},
	changeColor : function(color, query, index) {
		for (var i = 0; i < query.length; i++) {
			var vis = query[i].attr("style").split("opacity:")[1].split(";")[0]
			query[i][0][0].setAttributeNS(null, "style", "fill: " + color + "; stroke: black; opacity: " + vis)
		}
	},
	changeVisibility : function(vis, query, index) {
		for (var i = 0; i < query.length; i++) {
			var color = query[i].attr("style").split(";")[0]
			query[i][0][0].setAttributeNS(null, "style", color + "; opacity: " + vis)
		}
	},
	removeColor : function(hits, index) {
		for (var i = 0; i < hits.length; i++) {
			hits[i].remove();
		}
	},
}


    </script>
 