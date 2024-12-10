<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport"
	content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta name="description" content="">
<meta name="author" content="">

<title>Index - StratApps</title>

<!-- Custom fonts for this template-->
<link href="../resources/css/livedatamap/all.min.css" rel="stylesheet"
	type="text/css">
<link
	href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
	rel="stylesheet">

<!-- Custom styles for this template-->
<link href="../resources/css/livedatamap/sb-admin-2.css"
	rel="stylesheet">
<link rel="stylesheet"
	href="../resources/css/bootstrap/css/bootstrap.min.css">
<!-- <link rel="stylesheet" href="../resources/css/ag-grid/ag-grid.css">
 <link rel="stylesheet"
	href="../resources/css/ag-grid/ag-theme-balham.css">-->
<link rel="stylesheet" href="../resources/css/livedatamap/main.css">
<link href="../resources/css/component-chosen.css" rel="stylesheet">
<link rel="stylesheet"
	href="../resources/css/bootstrap/css/bootstrap.min.css">
<link type="text/css" rel="stylesheet"
	href="../resources/css/concept-map/concept-map.css" />
<script src="../resources/js/jquery/jquery-3.3.1.min.js"></script>

<script src="../resources/js/jquery.redirect.js"></script>

<style type="text/css">
.visualization {
	background-image: url(../resources/images/livedatamap/sa10.png);
	background-repeat: no-repeat;
	background-size: 100% auto;
	background-position: center top;
	background-attachment: fixed;
}

body {
	background-image: url(../resources/images/livedatamap/sa10.png);
	background-repeat: no-repeat;
	background-position: center bottom;
	background-attachment: fixed;
}

.space-bg {
	height: 290px;
	width: 100%
}

.img-profile {
	cursor: pointer;
}

.disable-element {
	pointer-events: none !important;
	opacity: 0.5;
}
</style>
</head>
<body>
<body class="bg-gradient-primary">
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
	</nav>
	<!-- Coffee Wheel-->
	<div id="coffeeWheel" style="margin: 20px; min-height: 500px;"
		class=" visualization"></div>

	<!-- Hierarchial Edge Bundling> -->
	<div class="container-fluid visualization" id="hierarchialEdgeBundling">
		<div class="row">
			<div class="col-sm-10">
				<div class="container">
					<div class="row">
						<div class=" col-md-4 ">
							<label>Select Fileds :</label> <select id="optgroup"
								class="form-control form-control-chosen"
								data-placeholder="Please select..." multiple>
								<optgroup id="users">
								</optgroup>
							</select>
						</div>
						<div class="col-md-4">
							<button type="button" class="btn-primary mx-auto clear-all"
								onclick="clearAll()">CLEAR ALL</button>
						</div>
					</div>
				</div>
				<div id="hierarchial" class="text-center" style="margin-left: 5%;"></div>
			</div>
		</div>
	</div>

	<div id="agGrid" style="height: 500px; margin: 20px;"
		class=" visualization"></div>
	<div id="conceptMap" style="margin-left: 50px; min-height: 500px;"
		class="visualization">
		<div id="graph" style="margin: 0 auto;"></div>
		<div id="graph-info"></div>
	</div>
	<div class="spinner">
		<div class="bounce1"></div>
		<div class="bounce2"></div>
		<div class="bounce3"></div>
	</div>


	<!-- Bootstrap core JavaScript-->
	<script src="../resources/js/bootstrap/js/bootstrap.bundle.min.js"></script>

	<!-- Core plugin JavaScript-->
	<script src="../resources/js/jquery-easing/jquery.easing.min.js"></script>

	<!-- Custom scripts for all pages-->
	<script src="../resources/js/sb-admin-2.min.js"></script>
	<script src="../resources/js/d3.v3.min.js"></script>
	<script src="../resources/js/d3.v4.min.js"></script>
	<script src="../resources/js/tableau-extensions-1.latest.js"></script>
	<script src="../resources/js/bootstrap.min.js"></script>

	<!-- <script src="../resources/js/ag-grid/ag-grid-enterprise.min.noStyle.js"></script> -->
	<script src="../resources/js/live-data-mapping/lodash.min.js"></script>
	<script src="../resources/js/loadingView.js"></script>
	<script
		src="../resources/js/live-data-mapping/coffee-wheel-advanced.js"></script>
	<script
		src="../resources/js/live-data-mapping/live-data-map-advanced.js"></script>

	<!-- HIERACHIAL EDGE BUNDLING -->
	<script src="../resources/js/popper.min.js"></script>
	<script src="../resources/js/multiselect/tether.min.js"></script>
	<script src="../resources/js/multiselect/chosen.jquery.js"></script>

	<!-- CONCEPT MAP -->
	<script src="../resources/js/concept-map/packages.js"
		type="text/javascript"></script>
	<script src="../resources/js/concept-map/concept-map.js"
		type="text/javascript"></script>
	<script type="text/javascript">
		var worksheetName = "${workSheet}";
	
		
	</script>
</body>
</html>
