<!DOCTYPE html>
<html>
<head>
<script src="../resources/js/ag-grid/ag-grid-enterprise.min.noStyle.js"></script>
<link rel="stylesheet" href="../resources/css/ag-grid/ag-grid.css">
<link rel="stylesheet"
	href="../resources/css/ag-grid/ag-theme-balham.css">
<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<script src="../resources/js/d3.v3.min.js"></script>
<script src="../resources/js/treemap/tableau-extensions-1.latest.js"></script>
<script src="../resources/js/bootstrap/js/bootstrap.bundle.min.js"></script>
<link href="../resources/css/livedatamap/sb-admin-2.css"
	rel="stylesheet">
<link rel="stylesheet"
	href="../resources/css/bootstrap/css/bootstrap.min.css">


<script type="text/javascript"
	src="../resources/js/tableau-extension/ag-grid2/ag-grid.js"></script>

</head>
<body>
	<nav
		class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow"
		id="navbar">

		<!-- Sidebar Toggle (Topbar) -->
		<button id="sidebarToggleTop"
			class="btn btn-link d-md-none rounded-circle mr-3">
			<i class="fa fa-bars"></i>
		</button>

		<!-- Topbar Search -->
		<!-- <img class="img-profile " style="width: 34px;"
			src="../resources/images/livedatamap/stratapps.png"
			onClick="showHome()">
		<div class="sidebar-brand-text mx-3">Stratapps</div> -->
		<div class="dropdown" style="float: right; margin: 10px">
			<button class="btn btn-secondary dropdown-toggle" type="button"
				id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
				aria-expanded="false">Export</button>
			<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
				<li onClick="exportToExcel()" style="cursor: pointer">Generate
					Exel</li>


			</div>

		</div>
		<button onclick='sendData()'></button>
		</div>


	</nav>
	<div style="padding: 10px">
		<div class="alert alert-primary" role="alert"
			style="text-align: center; width: 100%; display: none;"
			id="downloadLink">
			Please click the download button <a href="" target="_blank"
				class="btn btn-success" onClick="hideLink()" id="excelDownload">download</a>
		</div>

		<!-- <button onclick="getSelectedRows()">Get Selected Rows</button> -->
		<div id="myGrid" style="height: 700px; width: 100%;"
			class="ag-theme-balham"></div>
	</div>
	<script type="text/javascript" charset="utf-8">
		
	</script>
</body>
</html>