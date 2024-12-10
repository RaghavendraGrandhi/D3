<!DOCTYPE html>
<html>
<head>

<style>
.clear-all {
	margin-top: 40px;
	border-radius: 6px;
}

.node {
	font: 300 11px "Helvetica Neue", Helvetica, Arial, sans-serif;
	fill: #bbb;
}

.node:hover {
	fill: #000;
}

.link {
	stroke: steelblue;
	stroke-opacity: 0.4;
	fill: none;
	pointer-events: none;
}

.node:hover, .node--source, .node--target {
	font-weight: 700 ! important;
}

.node--source {
	fill: #2ca02c  ! important;
}

.node--active {
	font-weight: 700 ! important;
	fill: #000 ! important;
}

.node--target {
	fill: #d62728 ! important;
}

.link--source {
	stroke: #d62728;
}

.link--target {
	stroke: #2ca02c;
}

.link--source, .link--target {
	stroke-opacity: 1;
	stroke-width: 2px;
}
</style>

<script src="../resources/js/multiselect/jquery-3.1.1.min.js"></script>


<link rel="stylesheet"
	href="../resources/css/bootstrap/css/bootstrap.min.css">
	<link href="../resources/css/component-chosen.css" rel="stylesheet">
	
<script type="text/javascript"
	src="../resources/js/tableau-extension/heb/heb.js"></script>
<script src="../resources/js/popper.min.js"></script>
<script src="../resources/js/multiselect/bootstrap.min.js"></script>

<script src="../resources/js/d3.v4.min.js"></script>
<script src="../resources/js/multiselect/tether.min.js"></script>
<script src="../resources/js/multiselect/chosen.jquery.js"></script>
<script src="../resources/js/treemap/tableau-extensions-1.latest.js"></script>
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
		<img class="img-profile " style="width: 34px;"
			src="../resources/images/livedatamap/stratapps.png"
			onClick="showHome()">
		<div class="sidebar-brand-text mx-3">Stratapps</div>

	</nav>
	<div style="padding: 10px">


		<!-- <button onclick="getSelectedRows()">Get Selected Rows</button> -->
		<div class="container-fluid">


			<div class="row">

				<div class="col-sm-10">
					<div class="container">

						<div class="row">
							<div class=" col-md-4 ">
								<label>Select Fields:</label> <select id="optgroup"
									class="form-control form-control-chosen"
									data-placeholder="Please select..." multiple>
									<optgroup label="Fields" id="users">

									</optgroup>


								</select>
							</div>
							<div class="col-md-4">
								<button type="button" class="btn-primary mx-auto clear-all"
									onclick="clearAll()">CLEAR ALL</button>
							</div>
						</div>


					</div>
					<div id="svg" class="text-center" style="margin-left: 5%"></div>
				</div>
			</div>
		</div>
	</div>
	<script type="text/javascript" charset="utf-8">
		
	</script>
</body>
</html>