<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page isELIgnored="false"%>
<html>
<head>
<link rel="stylesheet"	href="resources/css/bootstrap/css/bootstrap.min.css">
<link type="text/css" rel="stylesheet" href="resources/css/concept-map/concept-map.css" />
<script src="resources/js/jquery-1.6.2.min.js"></script>
<script src="resources/js/d3.v3.min.js" charset="utf-8"></script>
<script src="resources/js/concept-map/packages.js" type="text/javascript"></script>
<script src="resources/js/concept-map/concept-map-alt1.js" type="text/javascript"></script>
<script>
$(function() {
	var plot = new ConceptMap("graph", "graph-info", ${map});
});
</script>
<style type="text/css">
.empty{
	display: none!important;
}
.empty-circle{
	display: none!important;
}

</style>
</head>
<body>
	<div class="container">
		<a href="/trinet">Go Home</a><br><hr>
		<div class="row">
			<div id="graph" class="conceptmap" style="margin: 0 auto;"></div>
			<div id="graph-info"></div>
		</div>
	</div>
</body>
</html>