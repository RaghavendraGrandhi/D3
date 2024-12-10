<html>
<head>
<link type="text/css" rel="stylesheet" media="all" href="resources/css/concept-map/concept-map.css" />
 <script src="resources/js/jquery-1.6.2.min.js"></script>
<script src="resources/js/d3.v3.min.js" charset="utf-8"></script>
<script src="resources/js/concept-map/packages.js" type="text/javascript"></script>
<script src="resources/js/concept-map/concept-map.js" type="text/javascript"></script>
<script>
$(function(){
	plotConceptMap();
});
function plotConceptMap()
{
	d3.json("readFile/metadata.json", function(dataJson) {
		var plot = new ConceptMap("graph", "graph-info", dataJson);
	});
}
</script>
<style>
body{
padding-top: 10px;
}
</style>
</head>
<body>
 <a href="/trinet">Go Home</a><br><br>
	<div id="graph" class="conceptmap" ></div>
	<div id="graph-info"></div>
</body>
</html>