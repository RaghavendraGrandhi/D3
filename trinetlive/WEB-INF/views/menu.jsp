
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>D3 Charts</title>
<link rel="stylesheet"
	href="resources/css/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
	<link href="resources/css/icapture/icapture.css" rel="stylesheet"
	type="text/css" />
<style type="text/css">
ul {
	list-style: none;
	margin-left: -2em;
}

li>a, li>a:visited {
	color: #fff;
}

a:hover {
	text-decoration: none;
	color: #111;
}

hr {
	width: 65%;
	margin-left: 0;
}

h5 {
	color: #305e93a8;
}

code {
	padding: .2rem .4rem;
	font-size: 90%;
	color: #ff4591;
	background-color: #ffffff;
	border-radius: 0;
}

.bgblue {
	background-color: #5bb6e8;
}
/* width */
::-webkit-scrollbar {
  width: 5px;
}
scrollbar{
 width: 5px;
}
/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 10px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: green; 
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #000; 
}
</style>
</head>
<body>
	<div class="bgblue" style="margin-top: 1em; padding: 10px 20px;">
	<h5>Finalize</h5>
		<ul>
			<li><a href="avaya">Avaya Report</a>
			<li><a href="exclusions-poc">Exclusions Poc</a>
			<li><a href="wfa-lineage">WFA-Lineage</a>
			<li><a href="eis-hierarchical-edge-bundling">EIS-hierarchical-edge-bundling</a></li>
			<li><a href="rotating-cluster">Rotating Cluster</a>
		</ul>
		<h5>CSV</h5>
		<ul>
		
		<li><a href="hierarchical-edge-bundling-old">hierarchical-edge-bundling(old)</a></li>
				<li><a href="hierarchical-edge-bundling-new">hierarchical-edge-bundling(new)</a></li>
		
		<li><a href="avaya-report">Avaya (NEW)</a>
		<li><a href="departments">Department (NEW)</a>
		<li><a href="tableau-alerts?type=all">Tableau Alerts</a>
		<li><a href="map-pies">WSE Map</a>
		<li><a href="concept-map-old">Concept Map(old)</a></li>
				<li><a href="concept-map-new">Concept Map(new)</a></li>
		
		<li><a href="report-lineage">Report Lineage</a></li>
		<li><a href="simulator">Simulator</a>
			<li><a href="graph-chart">Graph Chart</a>
			<li><a href="chart-wheel">Chart Wheel</a></li>
			<li><a href="coffee-wheel">Coffee Wheel</a></li>
			<li><a href="cross-filter">Cross Filter</a></li>
			<li><a href="pie-chart">Pie Chart</a></li>
			<li><a href="report-lineage">Report Lineage</a></li>
			<li><a href="heat-map">Heat Map</a></li>
			<li><a href="heat-map-histogram">Heat Map (Histogram) </a></li>
			<li><a href="trade">Trade</a></li>
			<li><a href="tree-map-1">Tree Map</a> <code>tableau</code></li>
			<li><a href="table-driven">Table Driven</a></li>
			<li><a href="word-count">Word Cloud Map </a>
			<li><a href="gate-chart">Gate Chart</a></li>
			<li><a href="bubble-chart-3">Bubble-Chart-3</a></li>
			<li><a href="donut-variation">Donut Variation</a></li>
			<li><a href="donut-variation2">Donut Variation 2</a></li>
			<code>tableau</code></li>
			<li><a href="batch-print">Batch Print</a></li>
			<li><a href="trinet_usa">Trinet USA</a></li>
			<li><a href="xmlToCsv">XML To CSV</a></li>
		</ul>
		<h5>JSON</h5>
		<ul>
			<li><a href="drilldown-chart">DrillDown</a>
			<li><a href="process-map">Process Map</a>
			<li><a href="bar-chart">Bar Chart</a></li>
			<li><a href="songs-chart">Songs Chart</a></li>
			<li><a href="facebook">Facebook</a></li>
		    <li><a href="focus-node">Focus Node</a></li>
		    <li><a href="node-focus">Node Focus</a></li>
			<li><a href="language-network">Language Network</a></li>
			<li><a href="barhierarchy">Bar Hierarchy</a></li>
			<li><a href="arena-chart">Arena Chart</a></li>
			<li><a href="bullet-chart">Bullet-Chart</a></li>
			<li><a href="bullet-bar-chart">Bullet-Bar-Chart</a></li>
			<li><a href="heat-map-1">Heat Map-1</a></li>
			<li><a href="heat-map-2">Heat Map-2</a></li>
			<li><a href="hn-stats">HN Statistics</a></li>
			<li><a href="liquid-fill">Liquid Fill</a></li>
			<li><a href="nfl-chart">NFL Chart</a></li>
			<li><a href="pyramid-chart">Pyramid Chart</a></li>
		</ul>
		<h5>Upcoming</h5>
		<ul>
			<li><a href="neo4j-simple">Neo4J Simple</a>
			<li><a href="webvowl">WebVOWL</a></li>
			<li><a href="code-flower">Code Flower</a></li>
			<li><a href="network-graph">Network Graph</a></li>
			<li><a href="neo4j">neo4j</a></li>
			<li><a href="bubble-chart-1">Bubble-Chart-1</a></li>
			<li><a href="bubble-chart-2">Bubble-Chart-2</a></li>
			<li><a href="map">Country Map</a></li>
		</ul>
		<h5>D3</h5>
		<ul>
			<li><a href="date-picker2">DatePicker</a>
			
		</ul>
	</div>
	
	 <script src="resources/js/multiselect/jquery-3.1.1.min.js"></script>
	<!-- <script src="resources/js/jquery-3.2.1.slim.min.js"></script> -->
	<script src="resources/js/popper.min.js"></script>
<script src="resources/js/multiselect/bootstrap.min.js"></script>
<script src="resources/js/icapture/html2canvas.js"></script>
<script src="resources/js/icapture/icapture.js"></script>

<script>
	$(document)
			.ready(
					function() {
						var element = '<div id="draggable" class="ui-widget-content btn btn-primary" onclick="takeScreenShot()" '
								+ 'style="position:fixed; bottom: 20px; right: 20px">'
								+ 'SCREENSHOT</div>';

						$("body").append(element);
					})
	function takeScreenShot() {
		$("#draggable").hide();

		html2canvas(document.body, {
			onrendered : function(canvas) {
				icapture = new ICapture({
					image : canvas.toDataURL()
				});
			},
			allowTaint : true,
			useCORS : true
		});

	}
</script>
</body>
</html>