<html>
<head>
<title>Quarterly Report to the City and County of Denver</title>
<link href="resources/css/loadmask/jquery.loadmask.css" rel="stylesheet"
	type="text/css" />
<style type="text/css">
path.line {
	fill: none;
	stroke: #000;
	stroke-width: 3px;
}

.axis {
	shape-rendering: crispEdges;
}

.x.axis line, .x.axis path, .y.axis line, .y.axis path {
	fill: none;
	stroke: #000;
}

th, td {
	font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
	font-size: 1em;
	padding-left: 7px;
	padding-right: 7px;
	padding-top: 4px;
	padding-bottom: 4px;
	vertical-align: middle;
	text-align: center;
}

th {
	color: white;
	background-color: steelblue;
}

td {
	border: 1px solid steelblue;
}

td.rowkey {
	text-align: left;
}

tr:hover {
	color: #000000;
	background-color: #E0E0E0;
}

tr[chosen=true] {
	background-color: #B5CDE1;
}
}
</style>
</head>

<body>
	<div id="mask">
		<div class="col-sm-10 mt-3">
			<select id="dates" onchange="updateChart(this)">
			</select>
		</div>

		<div id="table"></div>
		<div id="plot"></div>
	</div>

</body>


<script src="resources/js/jquery-1.6.2.min.js"></script>
<script src="resources/js/loadmask/jquery.loadmask.js"></script>
<script type="text/javascript" src="resources/js/d3.v3.min.js"></script>
<script type="text/javascript"
	src="resources/js/table-driven/makeMultiTable.js"></script>
<script type="text/javascript"
	src="resources/js/table-driven/setupPlot.js"></script>
<script type="text/javascript"
	src="resources/js/table-driven/drawLinePlot.js"></script>
<script type="text/javascript"
	src="resources/js/table-driven/toggleStat.js"></script>
<script type="text/javascript"
	src="resources/js/table-driven/load_qtrly_stats.js"></script>








</html>
