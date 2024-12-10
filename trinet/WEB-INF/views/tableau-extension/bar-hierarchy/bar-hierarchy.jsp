<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
<style type="text/css">
svg {
	font-size: 14px;
}

rect.background {
	fill: none;
	pointer-events: all;
}

.axis {
	shape-rendering: crispEdges;
}

.axis path, .axis line {
	fill: none;
	stroke: #000;
	stroke-width: .5px;
}
</style>
</head>
<body>
<div class="container-fluid">
	<div class="row">
		
		<div class="col-sm-10">
		   <div id="vis"></div>		
		</div>
	</div>
</div>
<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>

<script type="text/javascript" src="../resources/js/barhierarchy/d3.js"></script>
<script type="text/javascript" src="../resources/js/barhierarchy/d3.layout.js"></script>


<script src="../resources/js/treemap/tableau-extensions-1.latest.js"></script>
<script src="../resources/js/tableau-extension/bar-hierarchy/bar-hierarchy.js"></script>
<script type="text/javascript">

var m = [80, 160, 0, 160], // top right bottom left
    w = 1080 - m[1] - m[3], // width
    h = 700 - m[0] - m[2], // height
    x = d3.scale.linear().range([0, w]),
    y = 25, // bar height
    z = d3.scale.ordinal().range(["steelblue", "#aaa"]); // bar color
    var level=0;
    var daraArray;
var hierarchy = d3.layout.partition()
    .children(function(d) { return d.size; });

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("top");

var svg = d3.select("#vis").append("svg:svg")
    .attr("width", w + m[1] + m[3])
    .attr("height", h + m[0] + m[2])
  .append("svg:g")
    .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

   


svg.append("svg:rect")
    .attr("class", "background")
    .attr("width", w)
    .attr("height", h)
    .on("click", up);

svg.append("svg:g")
    .attr("class", "x axis");

svg.append("svg:g")
    .attr("class", "y axis")
  .append("svg:line")
    .attr("y1", "100%");
//barhierarchy
//d3.json("../readFile/barhierarchy", function(root) {
	function chart(root){
			dataArray = root;
			console.log(root);
			
		  hierarchy.nodes(root);
		  x.domain([0, root.children]).nice();
		  down(root, 0);
	};

function getMaxLevel(x){
	if(x.childrens!= null && x.childrens.length > 0){
		level++;
		getMaxLevel(x.childrens[0])
	}
}


function down(d, i) {
	console.log(d)
	console.log(level)
  if (!d.childrens || this.__transition__) return;
  var duration = d3.event && d3.event.altname ? 7500 : 750,
      delay = duration / d.childrens.length;

  // Mark any currently-displayed bars as exiting.
  var exit = svg.selectAll(".enter").attr("class", "exit");

  // Entering nodes immediately obscure the clicked-on bar, so hide it.
  exit.selectAll("rect").filter(function(p) { return p === d; })
      .style("fill-opacity", 1e-6);

  // Enter the new bars for the clicked-on data.
  // Per above, entering bars are immediately visible.
  var enter = bar(d)
      .attr("transform", stack(i))
      .style("opacity", 1);

  // Have the text fade-in, even though the bars are visible.
  // Color the bars as parents; they will fade to childrens if appropriate.
  enter.select("text").style("fill-opacity", 1e-6);
  enter.select("rect").style("fill", z(true));

  // Update the x-scale domain.
  x.domain([0, d3.max(d.childrens, function(d) { return d.children; })]).nice();

  // Update the x-axis.
  svg.selectAll(".x.axis").transition()
      .duration(duration)
      .call(xAxis);

  // Transition entering bars to their new position.
  var enterTransition = enter.transition()
      .duration(duration)
      .delay(function(d, i) { return i * delay; })
      .attr("transform", function(d, i) { return "translate(0," + y * i * 1.2 + ")"; });

  // Transition entering text.
  enterTransition.select("text").style("fill-opacity", 1);

  // Transition entering rects to the new x-scale.
  enterTransition.select("rect")
      .attr("width", function(d) { return x(d.children); })
      .style("fill", function(d) { return z(!!d.childrens); });

  // Transition exiting bars to fade out.
  var exitTransition = exit.transition()
      .duration(duration)
      .style("opacity", 1e-6)
      .remove();

  // Transition exiting bars to the new x-scale.
  exitTransition.selectAll("rect").attr("width", function(d) { return x(d.children); });

  // Rebind the current node to the background.
  svg.select(".background").data([d]).transition().duration(duration * 2); d.index = i;
}

function up(d) {
  if (!d.parent || this.__transition__) return;
  var duration = d3.event && d3.event.altname ? 7500 : 750,
      delay = duration / d.childrens.length;

  // Mark any currently-displayed bars as exiting.
  var exit = svg.selectAll(".enter").attr("class", "exit");

  // Enter the new bars for the clicked-on data's parent.
  var enter = bar(d.parent)
      .attr("transform", function(d, i) { return "translate(0," + y * i * 1.2 + ")"; })
      .style("opacity", 1e-6);

  // Color the bars as appropriate.
  // Exiting nodes will obscure the parent bar, so hide it.
  enter.select("rect")
      .style("fill", function(d) { return z(!!d.childrens); })
    .filter(function(p) { return p === d; })
      .style("fill-opacity", 1e-6);

  // Update the x-scale domain.
  x.domain([0, d3.max(d.parent.childrens, function(d) { return d.children; })]).nice();

  // Update the x-axis.
  svg.selectAll(".x.axis").transition()
      .duration(duration * 2)
      .call(xAxis);

  // Transition entering bars to fade in over the full duration.
  var enterTransition = enter.transition()
      .duration(duration * 2)
      .style("opacity", 1);

  // Transition entering rects to the new x-scale.
  // When the entering parent rect is done, make it visible!
  enterTransition.select("rect")
      .attr("width", function(d) { return x(d.children); })
      .each("end", function(p) { if (p === d) d3.select(this).style("fill-opacity", null); });

  // Transition exiting bars to the parent's position.
  var exitTransition = exit.selectAll("g").transition()
      .duration(duration)
      .delay(function(d, i) { return i * delay; })
      .attr("transform", stack(d.index));

  // Transition exiting text to fade out.
  exitTransition.select("text")
      .style("fill-opacity", 1e-6);

  // Transition exiting rects to the new scale and fade to parent color.
  exitTransition.select("rect")
      .attr("width", function(d) { return x(d.children); })
      .style("fill", z(true));

  // Remove exiting nodes when the last child has finished transitioning.
  exit.transition().duration(duration * 2).remove();

  // Rebind the current parent to the background.
  svg.select(".background").data([d.parent]).transition().duration(duration * 2);
}

// Creates a set of bars for the given data node, at the specified index.
function bar(d) {
  var bar = svg.insert("svg:g", ".y.axis")
      .attr("class", "enter")
      .attr("transform", "translate(0,5)")
    .selectAll("g")
      .data(d.childrens)
    .enter().append("svg:g")
      .style("cursor", function(d) { return !d.childrens ? null : "pointer"; })
      .on("click", down);

  bar.append("svg:text")
      .attr("x", -6)
      .attr("y", y / 2)
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .text(function(d) { return d.name; });

  bar.append("svg:rect")
      .attr("width", function(d) { return x(d.children); })
      .attr("height", y);

  return bar;
}

// A stateful closure for stacking bars horizontally.
function stack(i) {
  var x0 = 0;
  return function(d) {
    var tx = "translate(" + x0 + "," + y * i * 1.2 + ")";
    x0 += x(d.children);
    return tx;
  };
}
</script>
</body>
</html>