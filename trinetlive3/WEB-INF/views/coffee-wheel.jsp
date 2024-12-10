<!DOCTYPE html>
<meta charset="utf-8">
<title>Coffee flavour Wheel</title>
<meta name="description" content="A visualisation of coffee flavours.">
<style>
  path {
    stroke: #000;
    stroke-width: 1.5;
    cursor: pointer;
  }

  text {
    font: 11px sans-serif;
    cursor: pointer;
  }

  h1 {
    text-align: center;
    margin: .5em 0;
  }

  p#intro {
    text-align: center;
    margin: 1em 0;
  }
</style>

<body>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-2 bgblue">
        <%@ include file="menu.jsp"%>
      </div>
      <div class="col-sm-10">
        <div id="vis" class="text-center"></div>
      </div>
    </div>
  </div>
</body>

<script src="resources/js/d3.v3.min.js"></script>
<script>

  function buildHierarchy(csv) {
    var root = { "name": "root", "children": [] };
    for (var i = 1; i < csv.length; i++) {
      if (csv[i][4] == '') {
        var sequence = csv[i][0] + "," + csv[i][1] + "," + csv[i][2] + "," + csv[i][3];
      }
      else {
        var sequence = csv[i][0] + "," + csv[i][1] + "," + csv[i][2] + "," + csv[i][3] + "," + csv[i][4];
      }

      //alert(sequence);
      //var size = +csv[i][1];

      var parts = sequence.split(",");

      var currentNode = root;
      for (var j = 0; j < parts.length; j++) {
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
            childNode = { "name": nodeName, "children": [] };
            children.push(childNode);
          }
          currentNode = childNode;
        } else {
          // Reached the end of the sequence; create a leaf node.
          childNode = { "name": nodeName };
          children.push(childNode);
        }
      }
    }
    return root;
  };


  var width = 840,
    height = width,
    radius = width / 2,
    x = d3.scale.linear().range([0, 2 * Math.PI]),
    y = d3.scale.pow().exponent(1.3).domain([0, 1]).range([0, radius]),
    padding = 5,
    duration = 1000;

  var div = d3.select("#vis");
  var color = d3.scale.ordinal().range(['#f9f0ab', '#e8e596', '#f0e2a3', '#ede487', '#efd580', '#f1cb82', '#f1c298', '#e8b598', '#d5dda1', '#c9d2b5', '#aec1ad', '#a7b8a8', '#b49a3d', '#b28647', '#a97d32', '#b68334', '#d6a680', '#dfad70', '#a2765d', '#9f6652', '#b9763f', '#bf6e5d', '#af643c', '#9b4c3f', '#72659d', '#8a6e9e', '#8f5c85', '#934b8b', '#9d4e87', '#92538c', '#8b6397', '#716084', '#2e6093', '#3a5988', '#4a5072', '#393e64', '#aaa1cc', '#e0b5c9', '#e098b0', '#ee82a2', '#ef91ac', '#eda994', '#eeb798', '#ecc099', '#f6d5aa', '#f0d48a', '#efd95f', '#eee469', '#dbdc7f', '#dfd961', '#ebe378', '#f5e351']);

  div.select("img").remove();

  var vis = div.append("svg")
    .attr("width", width + padding * 2)
    .attr("height", height + padding * 2)
    .append("g")
    .attr("transform", "translate(" + [radius + padding, radius + padding] + ")");

  var partition = d3.layout.partition()
    .sort(null)
    .value(function (d) { return 5.8 - d.depth; });

  var arc = d3.svg.arc()
    .startAngle(function (d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
    .endAngle(function (d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
    .innerRadius(function (d) { return Math.max(0, d.y ? y(d.y) : d.y); })
    .outerRadius(function (d) { return Math.max(0, y(d.y + d.dy)); });

  //d3.csv("resources/csv/coffee_wheel.csv", function(error, temp) {
  //d3.csv("getcsvdata", function(error, temp) {	
  /*  var data = d3.nest()
     .key(function(d) { return d.one; })
     .key(function(d) { return d.two; })
     .key(function(d) { return d.three; })
     .key(function(d) { return d.four; })
     .key(function(d) { return d.five; })
         .entries(temp);
   
   var json = JSON.parse(JSON.stringify(data).split('"key":').join('"name":').split('"values":').join('"children":'));
   alert(JSON.stringify(json));
   console.log(JSON.stringify(json));
   
   var nodes = json; */
   
    d3.text("resources/csv/coffee_wheel.csv", function (text) {
      var csv = d3.csv.parseRows(text);
      var json = buildHierarchy(csv);

      var nodes = partition.nodes(json);
      var path = vis.selectAll("path").data(nodes);
      path.enter().append("path")
        .attr("id", function (d, i) { return "path-" + i; })
        .attr("d", arc)
        .attr("fill-rule", "evenodd")
        .style("fill", function (d) { return color((d.children ? d : d.parent).name); })
        .on("click", click);

      var text = vis.selectAll("text").data(nodes);
      var textEnter = text.enter().append("text")
        .style("fill-opacity", 1)
        .style("fill", function (d) {
          return brightness(d3.rgb(colour(d))) < 125 ? "#eee" : "#000";
        })
        .attr("text-anchor", function (d) {
          return x(d.x + d.dx / 2) > Math.PI ? "end" : "start";
        })
        .attr("dy", ".2em")
        .attr("transform", function (d) {
          var multiline = (d.name || "").split(" ").length > 1,
            angle = x(d.x + d.dx / 2) * 180 / Math.PI - 90,
            rotate = angle + (multiline ? -.5 : 0);
          return "rotate(" + rotate + ")translate(" + (y(d.y) + padding) + ")rotate(" + (angle > 90 ? -180 : 0) + ")";
        })
        .on("click", click);
      textEnter.append("tspan")
        .attr("x", 0)
        .text(function (d) { return d.depth ? d.name.split(" ")[0] : ""; });
      textEnter.append("tspan")
        .attr("x", 0)
        .attr("dy", "1em")
        .text(function (d) { return d.depth ? d.name.split(" ")[1] || "" : ""; });

      function click(d) {
        path.transition()
          .duration(duration)
          .attrTween("d", arcTween(d));

        // Somewhat of a hack as we rely on arcTween updating the scales.
        text.style("visibility", function (e) {
          return isParentOf(d, e) ? null : d3.select(this).style("visibility");
        })
          .transition()
          .duration(duration)
          .attrTween("text-anchor", function (d) {
            return function () {
              return x(d.x + d.dx / 2) > Math.PI ? "end" : "start";
            };
          })
          .attrTween("transform", function (d) {
            var multiline = (d.name || "").split(" ").length > 1;
            return function () {
              var angle = x(d.x + d.dx / 2) * 180 / Math.PI - 90,
                rotate = angle + (multiline ? -.5 : 0);
              return "rotate(" + rotate + ")translate(" + (y(d.y) + padding) + ")rotate(" + (angle > 90 ? -180 : 0) + ")";
            };
          })
          .style("fill-opacity", function (e) { return isParentOf(d, e) ? 1 : 1e-6; })
          .each("end", function (e) {
            d3.select(this).style("visibility", isParentOf(d, e) ? null : "hidden");
          });
      }
    });

  
  function isParentOf(p, c) {
    if (p === c) return true;
    if (p.children) {
      return p.children.some(function (d) {
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
	  console.log(x)
 
    var my = maxY(d),
      xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
      yd = d3.interpolate(y.domain(), [d.y, my]),
      yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
    return function (d) {
      return function (t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d); };
    };
  }

  function maxY(d) {
    return d.children ? Math.max.apply(Math, d.children.map(maxY)) : d.y + d.dy;
  }

  // http://www.w3.org/WAI/ER/WD-AERT/#color-contrast
  function brightness(rgb) {
    return rgb.r * .299 + rgb.g * .587 + rgb.b * .114;
  }
</script>
<script>
  if (top != self) top.location.replace(location);
</script>