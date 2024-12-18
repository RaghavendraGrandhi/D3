<html>
<head>
<title>U.S. Census Population Pyramid</title>
<script type="text/javascript"
	src="resources/js/pyramid-chart/d3.min.js"></script>
<script type="text/javascript"
	src="resources/js/pyramid-chart/census.js"></script>
<style type="text/css">
body {
	font: 12px sans-serif;
	margin: 0;
	padding: 5px;
	color: #888;
}

h1 {
	padding-left: 10px;
	margin-bottom: 2px;
	color: #333;
}

.source {
	padding-left: 10px;
}

.source a, .source a:hover {
	color: #888;
}

.label {
	position: absolute;
	/*  top: 60px; */
	left: 15px;
	font-size: 48px;
	font-weight: bold;
	color: #dedede;
}

.break {
	border-bottom: solid 1px #dedede;
	margin: 10px 15px 2px 15px;
	width: 545px;
}

.years, .controls {
	padding-top: 10px;
	padding-left: 15;
	width: 540;
	text-align: center;
	font-size: 12px;
}

.years span, .controls span {
	padding-left: 2px;
	padding-right: 2px;
}

.years .title {
	font-size: 13px;
	font-variant: small-caps;
	letter-spacing: 1;
}

.years a, .controls a {
	color: #888;
	text-decoration: none;
}

.years a:hover, .controls a:hover {
	color: #000;
	text-decoration: underline;
}

.years a.y1890 {
	color: #bbb;
}

.years a.active {
	color: #000;
}

.controls a {
	font-variant: small-caps;
	letter-spacing: 1;
	text-decoration: none;
}

svg {
	shape-rendering: crispEdges;
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
			<h2>U.S. Census Population Pyramid, 1850-2000</h2>
		    <div id="pyramid-chart"></div>
		</div>
	</div>
</div>
<script type="text/javascript">

document.onkeydown = function(event) {
    var y = year;
    switch (event.keyCode) {
        case 37: // left arrow
            y = Math.max(1850, year-10);
            if (y == 1890) y -= 10;
            break;
        case 39: // right arrow
            y = Math.min(2000, year+10);
            if (y == 1890) y += 10;
            break;
        case 32: // space bar
            toggle();
            return;
    }
    if (y != year) goto(y);
};

function isYear(d) { return d.year == year; }
function linkClass(y) { return "y"+y.toFixed(0) + (y==year?" active":""); }
function tooltipText(d) {
    return d3.format(",")(d.people)
        + " " + (d.sex==1?"men":"women")
        + " aged " + (d.age==90?"90+":d.age+"-"+(d.age+4))
	    + " in " + d.year;
}
function barWidth(d) { return x1(d.people); }

function goto(yr, dur) {
	dur = dur || 300;
	var old = year;
	year = yr;
	
	label.text(year);
	
	div.selectAll("span.link a")
	   .attr("class", linkClass);
	
	var fb = vis.selectAll("rect.female").data(fdat.filter(isYear), {
	    nodeKey: function(node) { return node.getAttribute("id"); },
	    dataKey: function(data) { return "f"+(data.year - data.age); }
    });
    fb.enter("svg:rect")
	    .attr("id", function(d) { return "f"+(d.year - d.age); })
	    .attr("class", "female")
	    .attr("fill", "pink")
		.attr("transform", lTransform)
	    .attr("width", function(d) { return x1(d.people); })
	    .attr("y", yr>old ? 20 : -20)
	    .attr("height", y.rangeBand())
	    .attr("opacity", 0.0001)
	  .transition()
	    .duration(dur)
	    .attr("y", 0)
	    .attr("opacity", 1);
    fb.exit().transition()
        .duration(dur)
	    .attr("y", yr>old ? -20 : 30)
        .attr("opacity", 0.0001)
        .each("end", function() { d3.select(this).remove(); });
	fb.transition()
        .duration(dur)
	    .attr("transform", lTransform)
	    .attr("y", 0)
	    .attr("width", function(d) { return x1(d.people); })
	    .attr("opacity", 1);
	fb.selectAll("title").text(tooltipText);


	var mb = vis.selectAll("rect.male").data(mdat.filter(isYear), {
	    nodeKey: function(node) { return node.getAttribute("id"); },
	    dataKey: function(data) { return "m"+(data.year - data.age); }
    });
    mb.enter("svg:rect")
	    .attr("id", function(d) { return "m"+(d.year - d.age); })
	    .attr("class", "male")
	    .attr("fill", "steelblue")
	    .attr("transform", rTransform)
	    .attr("width", function(d) { return x1(d.people); })
	    .attr("y", yr>old ? 20 : -20)
	    .attr("height", y.rangeBand())
	    .attr("opacity", 0.0001)
	  .transition()
	    .duration(dur)
	    .attr("y", 0)
	    .attr("opacity", 1);
    mb.exit().transition()
        .duration(dur)
        .attr("y", yr>old ? -20 : 30)
        .attr("opacity",0.0001)
        .each("end", function() { d3.select(this).remove(); });
	mb.transition()
        .duration(dur)
	    .attr("transform", rTransform)
	    .attr("y", 0)
	    .attr("width", function(d) { return x1(d.people); })
	    .attr("opacity", 1);
	mb.select("title").text(tooltipText);
}

var timer = undefined;
function stop() {
    clearInterval(timer);
    timer = undefined;
    ctrls.select("a.toggle").text("play");
}
function toggle() {
	if (!timer) {
		play();
	} else {
		stop();
	}
}
function play(rev) {
	rev = rev || false;
	if (timer) { stop(); }
	ctrls.select("a.toggle").text("stop");
	var advance = function() {
		var y = year + (rev?-1:1)*10;
		if (y == 1890) {
			// skip 1890
			y = y + (rev?-1:1)*10;
		}
		if (y < 1850 || y > 2000) {
			// stop at end points
			stop();
			return;
		} else {
			// else advance
			goto(y, 800);
		}
	};
	advance();
	timer = setInterval(advance, 850);
}

var data = census,
    maxp = data.reduce(function(a,b) { return Math.max(a,b.people); }, 0),
    mdat = data.filter(function(d) { return d.sex==1; })
               .sort(function(a,b) { return b.age - a.age; }),
    fdat = data.filter(function(d) { return d.sex==2; })
               .sort(function(a,b) { return b.age - a.age; });

var w = 250,
    h = 19 * 20,
    bins = d3.range(19),
    year = 1850,
    y = d3.scale.ordinal().domain(bins).rangeBands([0, h], 0.25),
    x1 = d3.scale.linear().domain([0, maxp]).range([0, w]),
    x2 = d3.scale.linear().domain([0, maxp]).range([w, 0]),
    rf = "javascript:return false;";

var label = d3.select("#pyramid-chart")
  .append("div")
    .attr("class", "label")
    .text(year.toFixed(0));

var vis = d3.select("#pyramid-chart")
  .append("svg:svg")
    .attr("width", 2*w + 40)
    .attr("height", h + 40)
  .append("svg:g")
    .attr("transform", "translate(20,15)");

// pyramid bar chart

vis.append("svg:g")
  .selectAll("text.ages")
    .data(bins)
  .enter("svg:text")
    .filter(function(d) { return d%2==0; })
    .attr("class", "ages")
    .attr("x", w+15)
    .attr("y", function(d) { return y(d) + y.rangeBand() + 7; })
    .attr("fill", "#888")
    .attr("text-anchor", "middle")
    .attr("font-size", "12px")
    .text(function(d) { return (90-d*5).toFixed(0); });

var rTransform = function(d,i) {
    return "translate("+(w+30)+","+y(i).toFixed(2)+")";
}
var lTransform = function(d,i) {
    return "translate("+x2(d.people).toFixed(2)+","+y(i).toFixed(2)+")";
}
var lEnter = function(d,i) {
    return "translate("+w+","+y(i).toFixed(2)+")";
}

var mbars = vis.selectAll("rect.male")
    .data(mdat.filter(isYear))
  .enter("svg:rect")
    .attr("id", function(d) { return "m"+(d.year - d.age); })
    .attr("class", "male")
    .attr("fill", "steelblue")
    .attr("transform", rTransform)
    .attr("width", barWidth)
    .attr("height", y.rangeBand())
    .attr("y", 0)
    .attr("opacity", 1);

mbars.append("svg:title").text(tooltipText);

var fbars = vis.selectAll("rect.female")
    .data(fdat.filter(isYear))
  .enter("svg:rect")
    .attr("id", function(d) { return "f"+(d.year - d.age); })
    .attr("class", "female")
    .attr("fill", "pink")
    .attr("opacity", 1)
    .attr("transform", lTransform)
    .attr("width", barWidth)
    .attr("height", y.rangeBand())
    .attr("y", 0)
    .attr("opacity", 1);

fbars.append("svg:title").text(tooltipText);

// animated intro for bars

mbars.attr("width", 0)
    .transition()
      .duration(500)
      .delay(function(d,i) { return 30*i; })
      .attr("width", barWidth);

fbars.attr("width", 0)
    .attr("transform", lEnter)
    .transition()
      .duration(500)
      .delay(function(d, i) { return 30*i; })
      .attr("width", barWidth)
      .attr("transform", lTransform);

// age label

vis.append("svg:text")
    .attr("x", w+15)
    .attr("y", h+8)
    .attr("dy", ".71em")
    .attr("fill", "#888")
    .attr("text-anchor", "middle")
    .attr("font-size", "13px")
    .attr("font-variant", "small-caps")
    .attr("letter-spacing", 1)
    .text("age");

// gridlines and labels for right pyramid

var rules1 = vis.selectAll("g.rule1")
    .data(x1.ticks(5))
  .enter("svg:g")
    .filter(function(d) { return d > 0; })
    .attr("class", "rule1")
    .attr("transform", function(d) { return "translate("+(w+30+x1(d))+",0)";});

rules1.append("svg:line")
    .attr("y1", h - 2)
    .attr("y2", h + 4)
    .attr("stroke", "#bbb");

rules1.append("svg:line")
    .attr("y1", 0)
    .attr("y2", h)
    .attr("stroke", "white")
    .attr("stroke-opacity", .3);

rules1.append("svg:text")
    .attr("y", h + 9)
    .attr("dy", ".71em")
    .attr("text-anchor", "middle")
    .attr("font-size", "12px")
    .attr("fill", "#bbb")
    .text(function(d) { return (d/1000000).toFixed(0)+"M"; });

// gridlines and labels for left pyramid

var rules2 = vis.selectAll("g.rule2")
    .data(x2.ticks(5))
  .enter("svg:g")
    .filter(function(d) { return d > 0; })
    .attr("class", "rule2")
    .attr("transform", function(d) { return "translate("+(x2(d))+",0)";});

rules2.append("svg:line")
    .attr("y1", h - 2)
    .attr("y2", h + 4)
    .attr("stroke", "#bbb");

rules2.append("svg:line")
    .attr("y1", 0)
    .attr("y2", h)
    .attr("stroke", "white")
    .attr("stroke-opacity", .3);

rules2.append("svg:text")
    .attr("y", h + 9)
    .attr("dy", ".71em")
    .attr("text-anchor", "middle")
    .attr("font-size", "12px")
    .attr("fill", "#bbb")
    .text(function(d) { return (d/1000000).toFixed(0)+(d==0?"":"M"); });

d3.select("#pyramid-chart")
  .append("div")
    .attr("class", "break");

var div = d3.select("#pyramid-chart")
  .append("div")
    .attr("class", "years");

div.append("span")
  .attr("class", "title")
  .text("year");

var ctrls = d3.select("#pyramid-chart")
  .append("div")
  .attr("class", "controls");
ctrls.append("span").append("a")
  .attr("class", "control back")
  .attr("href", "javascript:play(true);")
  .text("<< ");
ctrls.append("span").append("a")
  .attr("class", "control toggle")
  .attr("href", "javascript:toggle();")
  .text("play");
ctrls.append("span").append("a")
  .attr("class", "control forward")
  .attr("href", "javascript:play();")
  .text(" >>");

div.selectAll("span.link")
    .data(d3.range(1850, 2001, 10))
  .enter("span")
    .attr("class", "link")
  .append("a")
    .attr("class", linkClass)
    .attr("href", function(d) { return d==1890?null:"javascript:goto("+d+");"; })
    .text(function(d) { return d.toFixed(0); });

div.select("a.y1890")
    .attr("title", "Most of the 1890 census was destroyed in "+
        "1921 during a fire in the basement of the "+
        "Commerce Building in Washington, D.C.");

    </script>
</body>
</html>
