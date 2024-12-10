<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!DOCTYPE html>
<html>
<head>
<script src="../resources/js/ag-grid/ag-grid-enterprise.min.noStyle.js"></script>
<link rel="stylesheet" href="../resources/css/ag-grid/ag-grid.css">
<link rel="stylesheet"
	href="../resources/css/ag-grid/ag-theme-balham.css">
<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<script src="../resources/js/bootstrap/js/bootstrap.bundle.min.js"></script>
<link href="../resources/css/livedatamap/sb-admin-2.css"
	rel="stylesheet">
<link rel="stylesheet"
	href="../resources/css/bootstrap/css/bootstrap.min.css">
<script src="../resources/js/d3.v3.min.js"></script>
<script src="../resources/js/treemap/tableau-extensions-1.latest.js"></script>


<script type="text/javascript"
	src="../resources/js/tableau-extension/ag-grid/ag-grid.js"></script>
<style type="text/css">
.visualization {
	background-image: url(../resources/images/livedatamap/sa10.png);
	background-repeat: no-repeat;
	background-size: 100% auto;
	background-position: center top;
	background-attachment: fixed;
}

.img-profile {
	cursor: pointer;
}
</style>
</head>
<body>
	<!-- Topbar -->
	<nav
		class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow"
		id="navbar">

		<!-- Sidebar Toggle (Topbar) -->
		<button id="sidebarToggleTop"
			class="btn btn-link d-md-none rounded-circle mr-3">
			<i class="fa fa-bars"></i>
		</button>

		<!-- Topbar Search -->
		<img class="img-profile " style="width: 34px;"
			src="../resources/images/livedatamap/stratapps.png"
			onClick="showHome()">
		<div class="sidebar-brand-text mx-3">Stratapps</div>
		<div class="dropdown" style="float: right;margin: 10px">
			<button class="btn btn-secondary dropdown-toggle" type="button"
				id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
				aria-expanded="false">Export</button>
			<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
				<a class="dropdown-item" href="" target="_blank" id="excelDownload">excel</a> 
				<a class="dropdown-item" href="" target="_blank" id="excelDownload" style="display: none">csv</a> 
			</div>
		</div>


	</nav>
	<!-- <button onclick="getSelectedRows()">Get Selected Rows</button> -->
	
		
		
		<div id="myGrid" style="height: 700px; width: 100%;"
			class="ag-theme-balham visualization"></div>

	<script type="text/javascript" charset="utf-8">
	
		var data = ${data};
		var properties = ${properties};
		processData(data, properties);
		
		function showHome() {
			window.location.href = app_url + "trex/live-data-mapping";

		}
	</script>
</body>
</html>