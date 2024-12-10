<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport"
	content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta name="description" content="">
<meta name="author" content="">

<title>Charts - StratApps</title>

<link rel="stylesheet"
	href="../resources/css/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">


<link rel="stylesheet" href="../resources/css/livedatamap/main.css">


<!-- Custom fonts for this template-->
<link href="../resources/css/livedatamap/all.min.css" rel="stylesheet"
	type="text/css">
<link
	href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
	rel="stylesheet">
<link
	href="https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css"
	rel="stylesheet">


<!-- Custom styles for this template-->
<link href="../resources/css/livedatamap/sb-admin-2.css"
	rel="stylesheet">
<script src="../resources/js/jquery-3.1.1.min.js"></script>



<script src="../resources/js/d3.v3.min.js"></script>
<script src="../resources/js/tableau-extensions-1.latest.js"></script>
<script src="../resources/js/bootstrap.min.js"></script>
<script src="../resources/js/loadingView.js"></script>



<script type="text/javascript"
	src="../resources/js/live-data-mapping/advanced-visualization-ads.js"></script>
<style>
.disable-element {
	pointer-events: none !important;
	opacity: 0.5;
}
</style>

</head>
<body id="page-top">
	<!-- Page Wrapper -->
	<div id="wrapper" style="display: none">

		<!-- Content Wrapper -->
		<div id="content-wrapper" class="d-flex flex-column">

			<!-- Main Content -->
			<div id="content">

				<!-- Topbar -->
				<nav
					class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

					<!-- Sidebar Toggle (Topbar) -->
					<button id="sidebarToggleTop"
						class="btn btn-link d-md-none rounded-circle mr-3">
						<i class="fa fa-bars"></i>
					</button>

					<!-- Topbar Search -->
					<img class="img-profile " style="width: 34px;"
						src="../resources/images/livedatamap/stratapps.png">
					<div class="sidebar-brand-text mx-3">Stratapps</div>

					

				</nav>
				<!-- End of Topbar -->

				<!-- Begin Page Content -->
				<div class="container-fluid">

					<div class="col-lg-12 mb-4" style="text-align: center;">
						<div class="card-header py-6"><h3 class="m-0 font-weight-bold text-primary" id="mapName"></h3></div>
					</div>
					<!-- Content Row -->

					<div class="">

						<!-- AG Grid -->

						<!-- Content Row -->
						
						<div  id="data-section">
							<!-- Content Column -->
							<div class="col-lg-6 mb-4">

								<!-- Project Card Example -->
								<div class="">
									<div class="card-header py-3">
									
										<h6 class="m-0 font-weight-bold text-primary">Dimension
											Selection</h6>
									</div>
									<div class="card-body">
										<div class="col-md-12" id="field-body">

											<div class="row">

												<div class="col-md-6 col-lg-6 pt-2 ">
													<label>Dimension</label> <select class="form-control field"
														id="field1" style="width: 200px; height: 32px">

													</select>
												</div>
												<div class="col-md-2 col-lg-2 pt-4 mt-2">
													<label></label>
													<button type="button" data-toggle="collapse"
														class="btn btn-primary mt-2 remove-field">
														<i class="fa fa-times-circle"></i>
													</button>
												</div>

											</div>


										</div>
										<button type="button" data-toggle="collapse"
											data-parent="#accordionEx7" href="#collapse2"
											aria-expanded="false" aria-controls="collapse2"
											class="btn btn-primary mt-2" onClick="addField()"
											id="addFieldButton">
											Add&nbsp;<i class="fa fa-plus "></i>
										</button>
									</div>
								</div>

							</div>

							<div class="col-lg-6 mb-4">

								<!-- Illustrations -->
								<div class="card " id="metric-selection">
									<div class="card-header py-3">
										<h6 class="m-0 font-weight-bold text-primary">Metric
											Selection</h6>
									</div>
									<div class="card-body">
										<div class="col-md-12" id="metric-body">

											<div class="row"></div>


										</div>
										<button type="button" data-toggle="collapse"
											data-parent="#accordionEx7" href="#collapse2"
											aria-expanded="false" aria-controls="collapse2"
											class="btn btn-primary mt-2" onClick="addMetric()" id="metricAddButton">
											Add&nbsp;<i class="fa fa-plus "></i>
										</button>
									</div>
								</div>

								<!-- Approach -->


					</div>	
							<div class="col-md-12 col-lg-12 pt-3 ">
								<div class="card ">
									<div class="card-header py-3">
										<div class="row text-center">
											<div class="col-md-7 col-lg-7"></div>
											<div class="col-md-5 col-lg-5 text-right">
												<button type="button" id="cancelButton" onclick="tableau.extensions.ui.closeDialog()"
													class="btn btn-danger mt-2 pl-3 pr-3 mr-2">Cancel</button>
												<button type="button" class="btn btn-info mt-2 pl-3 pr-3"
													id="closeButton">Ok</button>
											</div>
										</div>

									</div>
								</div>
							</div>
						</div>

					</div>
					<!-- /.container-fluid -->

				</div>
				<!-- End of Main Content -->

				<!-- Footer -->
				<footer class="sticky-footer bg-white">
					<div class="container my-auto">
						<div class="copyright text-center my-auto">
							<span>Copyright &copy; StratApps 2019</span>
						</div>
					</div>
				</footer>
				<!-- End of Footer -->

			</div>
			<!-- End of Content Wrapper -->

		</div>
		<!-- End of Page Wrapper -->

		<!-- Scroll to Top Button-->
		<a class="scroll-to-top rounded" href="#page-top"> <i
			class="fas fa-angle-up"></i>
		</a>

		<!-- Logout Modal-->
		
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
	<script src="../resources/js/loadingView.js"></script>

	<!-- Page level custom scripts -->
<!-- 	<script src="../resources/js/live-data-mapping/demo/chart-area-demo.js"></script>
	<script src="../resources/js/live-data-mapping/demo/chart-pie-demo.js"></script>
	 -->
	<script type="text/javascript" charset="utf-8">
		var worksheetName = "${workSheet}";

		function showHome() {
			window.location.href = app_url + "trex/live-data-mapping";

		}
		var visualizationCode = 1;
		//tableau.extensions.settings.set("visualization_code", x);
		function switchVisualization(x) {
			visualizationCode = x;
			setFieldCounter();
			
		}
	</script>
</body>
</html>
