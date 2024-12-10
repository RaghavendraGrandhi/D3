<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page isELIgnored="false"%>
<html>
<head>
<link rel="stylesheet"
	href="../resources/css/bootstrap/css/bootstrap.min.css">
	<link href="resources/css/loadmask/jquery.loadmask.css" rel="stylesheet" type="text/css" />
	
<link type="text/css" rel="stylesheet"
	href="../resources/css/concept-map/concept-map.css" />
<script src="../resources/js/jquery-1.6.2.min.js"></script>
 <script  src="../resources/js/loadmask/jquery.loadmask.js"></script>

<script src="../resources/js/d3.v3.min.js" charset="utf-8"></script>
<script src="../resources/js/concept-map/packages.js"
	type="text/javascript"></script>
<script src="../resources/js/concept-map/concept-map2.js"
	type="text/javascript"></script>
<script src="../resources/js/treemap/tableau-extensions-1.latest.js"></script>
<script src="../resources/js/tableau-extension/tabluea-util.js"></script>

</head>
<body id="main">
	<div class="container">
	
		<div class="row">
			<div id="graph" class="conceptmap" style="margin: 0 auto;"></div>
			<div id="graph-info"></div>
		</div>
	</div>
</body>
</html>