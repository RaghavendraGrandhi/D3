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
	src="../resources/js/live-data-mapping/advanced-visualization.js"></script>
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

					<!-- Page Heading -->
					<div
						class="d-sm-flex align-items-center justify-content-between mb-4">
						<h1 class="h3 mb-0 text-gray-800">Choose the Visualization</h1>
						<button type="button" class="btn btn-success mt-2 pl-3 pr-3"
							onClick="tableau.extensions.ui.closeDialog(2)">Back</button>
					</div>

					<!-- Content Row -->

					<div class="row">

						<!-- AG Grid -->
						<div class="col-xl-3 col-lg-6">
							<div class="card shadow mb-4">
								<!-- Card Header - Dropdown -->
								<div
									class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
									<h6 class="m-0 font-weight-bold text-primary">Grid View</h6>
									<div class="dropdown no-arrow">
										<a class="dropdown-toggle" href="#" role="button"
											id="dropdownMenuLink" data-toggle="dropdown"
											aria-haspopup="true" aria-expanded="false"> <i
											class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
										</a>
										<div
											class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
											aria-labelledby="dropdownMenuLink">
											<div class="dropdown-header">Dropdown Header:</div>
											<a class="dropdown-item" href="#">Action</a> <a
												class="dropdown-item" href="#">Another action</a>
											<div class="dropdown-divider"></div>
											<a class="dropdown-item" href="#">Something else here</a>
										</div>
									</div>
								</div>
								<!-- Card Body -->
								<div class="card-body">
									<div class="chart-area">
										<a class="thumbnail" onclick="switchVisualization(1)"
											href="#data-section"> <img
											src="../resources/images/gif/Ag-grid.gif" alt="Lights"
											style="width: 100%;">



										</a>
									</div>

								</div>
							</div>
						</div>

						<!-- Coffee Wheel -->
						<div class="col-xl-3 col-lg-6">
							<div class="card shadow mb-4">
								<!-- Card Header - Dropdown -->
								<div
									class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
									<h6 class="m-0 font-weight-bold text-primary">Coffee Wheel
										View</h6>
									<div class="dropdown no-arrow">
										<a class="dropdown-toggle" href="#" role="button"
											id="dropdownMenuLink" data-toggle="dropdown"
											aria-haspopup="true" aria-expanded="false"> <i
											class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
										</a>
										<div
											class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
											aria-labelledby="dropdownMenuLink">
											<div class="dropdown-header">Dropdown Header:</div>
											<a class="dropdown-item" href="#">Action</a> <a
												class="dropdown-item" href="#">Another action</a>
											<div class="dropdown-divider"></div>
											<a class="dropdown-item" href="#">Something else here</a>
										</div>
									</div>
								</div>
								<!-- Card Body -->
								<div class="card-body">
									<div class="chart-area">
										<a class="thumbnail" onclick="switchVisualization(2)"
											href="#data-section"> <img
											src="../resources/images/gif/Coffee-wheel.gif" alt="Nature"
											style="width: 100%;">

										</a>
									</div>

								</div>
							</div>
						</div>


						<!-- Hierarchial Edge Bundling -->
						<div class="col-xl-3 col-lg-6">
							<div class="card shadow mb-4">
								<!-- Card Header - Dropdown -->
								<div
									class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
									<h6 class="m-0 font-weight-bold text-primary">Hierarchial
										Edge Bundling View</h6>
									<div class="dropdown no-arrow">
										<a class="dropdown-toggle" href="#" role="button"
											id="dropdownMenuLink" data-toggle="dropdown"
											aria-haspopup="true" aria-expanded="false"> <i
											class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
										</a>
										<div
											class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
											aria-labelledby="dropdownMenuLink">
											<div class="dropdown-header">Dropdown Header:</div>
											<a class="dropdown-item" href="#">Action</a> <a
												class="dropdown-item" href="#">Another action</a>
											<div class="dropdown-divider"></div>
											<a class="dropdown-item" href="#">Something else here</a>
										</div>
									</div>
								</div>
								<!-- Card Body -->
								<div class="card-body">
									<div class="chart-area">
										<a class="thumbnail" onclick="switchVisualization(3)"
											href="#data-section"> <img
											src="../resources/images/gif/hirachial.gif" alt="Nature"
											style="width: 100%;">


										</a>
									</div>

								</div>
							</div>
						</div>

						<!-- Concept Map -->
						<div class="col-xl-3 col-lg-6">
							<div class="card shadow mb-4">
								<!-- Card Header - Dropdown -->
								<div
									class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
									<h6 class="m-0 font-weight-bold text-primary">Concept Map
										View</h6>
									<div class="dropdown no-arrow">
										<a class="dropdown-toggle" href="#" role="button"
											id="dropdownMenuLink" data-toggle="dropdown"
											aria-haspopup="true" aria-expanded="false"> <i
											class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
										</a>
										<div
											class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
											aria-labelledby="dropdownMenuLink">
											<div class="dropdown-header">Dropdown Header:</div>
											<a class="dropdown-item" href="#">Action</a> <a
												class="dropdown-item" href="#">Another action</a>
											<div class="dropdown-divider"></div>
											<a class="dropdown-item" href="#">Something else here</a>
										</div>
									</div>
								</div>
								<!-- Card Body -->
								<div class="card-body">
									<div class="chart-area">
										<a class="thumbnail" onclick="switchVisualization(4)"
											href="#data-section"> <img
											src="../resources/images/gif/concept-map.gif" alt="Nature"
											style="width: 100%; max-height: 180px">


										</a>
									</div>

								</div>
							</div>
						</div>
						<!-- Tree Map -->
						<div class="col-xl-3 col-lg-6">
							<div class="card shadow mb-4">
								<!-- Card Header - Dropdown -->
								<div
									class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
									<h6 class="m-0 font-weight-bold text-primary">Tree Map</h6>
									<div class="dropdown no-arrow">
										<a class="dropdown-toggle" href="#" role="button"
											id="dropdownMenuLink" data-toggle="dropdown"
											aria-haspopup="true" aria-expanded="false"> <i
											class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
										</a>
										<div
											class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
											aria-labelledby="dropdownMenuLink">
											<div class="dropdown-header">Dropdown Header:</div>
											<a class="dropdown-item" href="#">Action</a> <a
												class="dropdown-item" href="#">Another action</a>
											<div class="dropdown-divider"></div>
											<a class="dropdown-item" href="#">Something else here</a>
										</div>
									</div>
								</div>
								<!-- Card Body -->
								<div class="card-body">
									<div class="chart-area">
										<a class="thumbnail" onclick="switchVisualization(5)"
											href="#data-section"> <img
											src="../resources/images/gif/tree-map.gif" alt="Nature"
											style="width: 100%; max-height: 180px">


										</a>
									</div>

								</div>
							</div>
						</div>
						<!--Bar Chart -->
						<div class="col-xl-3 col-lg-6">
							<div class="card shadow mb-4">
								<!-- Card Header - Dropdown -->
								<div
									class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
									<h6 class="m-0 font-weight-bold text-primary">Bar Chart</h6>
									<div class="dropdown no-arrow">
										<a class="dropdown-toggle" href="#" role="button"
											id="dropdownMenuLink" data-toggle="dropdown"
											aria-haspopup="true" aria-expanded="false"> <i
											class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
										</a>
										<div
											class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
											aria-labelledby="dropdownMenuLink">
											<div class="dropdown-header">Dropdown Header:</div>
											<a class="dropdown-item" href="#">Action</a> <a
												class="dropdown-item" href="#">Another action</a>
											<div class="dropdown-divider"></div>
											<a class="dropdown-item" href="#">Something else here</a>
										</div>
									</div>
								</div>
								<!-- Card Body -->
								<div class="card-body">
									<div class="chart-area">
										<a class="thumbnail" onclick="switchVisualization(6)"
											href="#data-section"> <img
											src="../resources/images/gif/bar-chart.PNG" alt="Nature"
											style="width: 100%; max-height: 180px">


										</a>
									</div>

								</div>
							</div>
						</div>
						<!-- Pie chart -->
						<div class="col-xl-3 col-lg-6">
							<div class="card shadow mb-4">
								<!-- Card Header - Dropdown -->
								<div
									class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
									<h6 class="m-0 font-weight-bold text-primary">Pie Chart</h6>
									<div class="dropdown no-arrow">
										<a class="dropdown-toggle" href="#" role="button"
											id="dropdownMenuLink" data-toggle="dropdown"
											aria-haspopup="true" aria-expanded="false"> <i
											class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
										</a>
										<div
											class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
											aria-labelledby="dropdownMenuLink">
											<div class="dropdown-header">Dropdown Header:</div>
											<a class="dropdown-item" href="#">Action</a> <a
												class="dropdown-item" href="#">Another action</a>
											<div class="dropdown-divider"></div>
											<a class="dropdown-item" href="#">Something else here</a>
										</div>
									</div>
								</div>
								<!-- Card Body -->
								<div class="card-body">
									<div class="chart-area">
										<a class="thumbnail" onclick="switchVisualization(7)"
											href="#data-section"> <img
											src="../resources/images/gif/pie-chart.PNG" alt="Nature"
											style="width: 100%; max-height: 180px">


										</a>
									</div>

								</div>
							</div>
						</div>
						<!-- Content Row -->
						<div class="row disable-element" id="data-section">

							<!-- Content Column -->
							<div class="col-lg-6 mb-4">

								<!-- Project Card Example -->
								<div class="card shadow mb-4">
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

								<!-- Color System -->
								<div class="card shadow mb-4 disable-element">
									<div class="card-header py-3">
										<h6 class="m-0 font-weight-bold text-primary">Format</h6>
									</div>
									<div class="card-body">
										<div class="row">
											<div class="col-md-5 col-lg-5">
												<label> Backgrpound</label>
											</div>
											<div class="col-md-7 col-lg-7">
												<span class="dot"></span>
											</div>
											<div class="col-md-5 col-lg-5 pt-2">
												<label> Mark Colors</label>
											</div>
											<div class="col-md-7 col-lg- pt-2">
												<span class="dot mr-2" style="background-color: #a6bcd3"></span>
												<span class="dot mr-2" style="background-color: #cfe5f3"></span>
												<span class="dot mr-2" style="background-color: #f3c695"></span>
												<span class="dot mr-2" style="background-color: #f7debd"></span>
												<span class="dot mr-2" style="background-color: #acd0a7"></span>
												<span class="dot mr-2" style="background-color: #c5e8bf"></span>
												<span class="dot mr-2" style="background-color: #dbcc96"></span>
												<span class="dot mr-2" style="background-color: #f8e6b1"></span>
												<span class="dot mr-2" style="background-color: #a4cbc9"></span>
												<span class="dot mr-2" style="background-color: #c2ddda"></span>
												<span class="dot mr-2" style="background-color: #efabac"></span>
												<span class="dot mr-2" style="background-color: #f5cecc"></span>
												<span class="dot mr-2" style="background-color: #bcb7b6"></span>
												<span class="dot mr-2" style="background-color: #ddd7d5"></span>
												<span class="dot mr-2" style="background-color: #e9b8cb"></span>
												<span class="dot mr-2" style="background-color: #a6bcd3"></span>
												<span class="dot mr-2" style="background-color: #cfe5f3"></span>
												<span class="dot mr-2" style="background-color: #f3c695"></span>
												<span class="dot mr-2" style="background-color: #f7debd"></span>
												<span class="dot mr-2" style="background-color: #acd0a7"></span>
												<div>
													<span class="badge badge1 p-2 mr-2">Reset</span><span>
														Reset to load the latest color palette</span>
												</div>
											</div>
											<div class="col-md-5 col-lg-5 pt-2">
												<label> Color By</label>
											</div>
											<div class="col-md-7 col-lg-7 pt-2">
												<div class="custom-control custom-radio pt-2">
													<input type="radio" class="custom-control-input checked"
														id="customControlValidation2" name="radio-stacked"
														required> <label class="custom-control-label"
														for="customControlValidation2">Same values have
														the same colors</label>
												</div>
												<div class="custom-control custom-radio pt-2">
													<input type="radio" class="custom-control-input"
														id="customControlValidation3" name="radio-stacked"
														required> <label class="custom-control-label"
														for="customControlValidation3">All values have
														unique colors</label>
												</div>
												<div class="custom-control custom-radio pt-2">
													<input type="radio" class="custom-control-input"
														id="customControlValidation4" name="radio-stacked"
														required> <label class="custom-control-label"
														for="customControlValidation4">Colour by dimension</label>
												</div>
											</div>
											<div class="col-md-5 col-lg-5 pt-3">
												<label> Color Links By</label>
											</div>
											<div class="col-md-7 col-lg-7 pt-2">
												<div class="custom-control custom-radio pt-2">
													<input type="radio" class="custom-control-input checked"
														id="customControlValidation5" name="radio-stacked"
														required> <label class="custom-control-label"
														for="customControlValidation5">Input- Output
														(Gradient)</label>
												</div>
												<div class="custom-control custom-radio pt-2">
													<input type="radio" class="custom-control-input"
														id="customControlValidation6" name="radio-stacked"
														required> <label class="custom-control-label"
														for="customControlValidation6">Input</label>
												</div>
												<div class="custom-control custom-radio pt-2">
													<input type="radio" class="custom-control-input"
														id="customControlValidation7" name="radio-stacked"
														required> <label class="custom-control-label"
														for="customControlValidation7">Output</label>
												</div>
												<div class="custom-control custom-radio pt-2">
													<input type="radio" class="custom-control-input"
														id="customControlValidation8" name="radio-stacked"
														required> <label class="custom-control-label"
														for="customControlValidation8">No Colour</label>
												</div>
											</div>
											<div class="col-md-5 col-lg-5 pt-3">
												<label> Node Width</label>
											</div>
											<div class="col-md-7 col-lg-7 pt-2">
												<div class="slidecontainer">
													<input type="range" min="1" max="100" value="50"
														class="slider" id="myRange">
													<p>
														Value: <span id="demo"></span>
													</p>
												</div>
											</div>
											<div class="col-md-5 col-lg-5 pt-3">
												<label> Verticle Node Padding</label>
											</div>
											<div class="col-md-7 col-lg-7 pt-2">
												<div class="slidecontainer">
													<input type="range" min="1" max="100" value="70"
														class="slider" id="myRange">
													<p>
														Value: <span id="demo1"></span>
													</p>
												</div>
											</div>
											<div class="col-md-5 col-lg-5 pt-3">
												<label> Horizontal Node Padding</label>
											</div>
											<div class="col-md-7 col-lg-7 pt-2">
												<div class="slidecontainer">
													<input type="range" min="1" max="100" value="80"
														class="slider" id="myRange">
													<p>
														Value: <span id="demo2"></span>
													</p>
												</div>
											</div>
											<div class="col-md-5 col-lg-5 pt-3">
												<label> Link Opacity(%)</label>
											</div>
											<div class="col-md-7 col-lg-7 pt-2">
												<div class="slidecontainer">
													<input type="range" min="1" max="100" value="40"
														class="slider" id="myRange">
													<p>
														Value: <span id="demo3"></span>
													</p>
												</div>
											</div>
											<div class="col-md-5 col-lg-5 pt-3">
												<label> Node Opacity(%)</label>
											</div>
											<div class="col-md-7 col-lg-7 pt-2">
												<div class="slidecontainer">
													<input type="range" min="1" max="100" value="20"
														class="slider" id="myRange">
													<p>
														Value: <span id="demo4"></span>
													</p>
												</div>
											</div>
											<div class="row col-md-12 pt-2">

												<div class="col-md-6 col-lg-6">
													<div class="row " style="border-right: 1px solid #d8d5d5;">
														<div class="col-md-6 col-lg-6 pt-3">
															<label> Laout Mode</label>
														</div>
														<div class="col-md-6 col-lg-6 pt-2">
															<div class="custom-control custom-radio pt-2">
																<input type="radio" class="custom-control-input checked"
																	id="customControlValidation9" name="radio-stacked"
																	required> <label class="custom-control-label"
																	for="customControlValidation9">Left</label>
															</div>
															<div class="custom-control custom-radio pt-2">
																<input type="radio" class="custom-control-input"
																	id="customControlValidation10" name="radio-stacked"
																	required> <label class="custom-control-label"
																	for="customControlValidation10">Right</label>
															</div>
															<div class="custom-control custom-radio pt-2">
																<input type="radio" class="custom-control-input"
																	id="customControlValidation11" name="radio-stacked"
																	required> <label class="custom-control-label"
																	for="customControlValidation11">Centered</label>
															</div>
															<div class="custom-control custom-radio pt-2">
																<input type="radio" class="custom-control-input"
																	id="customControlValidation12" name="radio-stacked"
																	required> <label class="custom-control-label"
																	for="customControlValidation12">Justified</label>
															</div>
														</div>
													</div>
												</div>
												<div class="col-md-6 col-lg-6">
													<div class="row">
														<div class="col-md-6 col-lg-6 pt-3">
															<label> Node Border</label>
														</div>
														<div class="col-md-6 col-lg-6 pt-2">
															<div class="custom-control custom-radio pt-2">
																<input type="radio" class="custom-control-input checked"
																	id="customControlValidation13" name="radio-stacked"
																	required> <label class="custom-control-label"
																	for="customControlValidation13">Enabled</label>
															</div>
															<div class="custom-control custom-radio pt-2">
																<input type="radio" class="custom-control-input"
																	id="customControlValidation14" name="radio-stacked"
																	required> <label class="custom-control-label"
																	for="customControlValidation14">Disabled</label>
															</div>
														</div>
													</div>
												</div>
												<div class="col-md-6 col-lg-6">
													<div class="row" style="border-right: 1px solid #d8d5d5;">
														<div class="col-md-6 col-lg-6 pt-3">
															<label> Labels</label>
														</div>
														<div class="col-md-6 col-lg-6 pt-2">
															<div class="custom-control custom-radio pt-2">
																<input type="radio" class="custom-control-input"
																	id="customControlValidation15" name="radio-stacked"
																	required> <label class="custom-control-label"
																	for="customControlValidation15">Enabled</label>
															</div>
															<div class="custom-control custom-radio pt-2">
																<input type="radio" class="custom-control-input"
																	id="customControlValidation16" name="radio-stacked"
																	required> <label class="custom-control-label"
																	for="customControlValidation16">Disabled</label>
															</div>
														</div>
													</div>
												</div>
												<div class="col-md-6 col-lg-6">
													<div class="row">
														<div class="col-md-6 col-lg-6 pt-3">
															<label> Label Position</label>
														</div>
														<div class="col-md-6 col-lg-6 pt-2">
															<div class="custom-control custom-radio pt-2">
																<input type="radio" class="custom-control-input"
																	id="customControlValidation17" name="radio-stacked"
																	required> <label class="custom-control-label"
																	for="customControlValidation17">Inside Node</label>
															</div>
															<div class="custom-control custom-radio pt-2">
																<input type="radio" class="custom-control-input"
																	id="customControlValidation18" name="radio-stacked"
																	required> <label class="custom-control-label"
																	for="customControlValidation18">Outside Node</label>
															</div>
														</div>
													</div>
												</div>
												<div class="col-md-6 col-lg-6">
													<div class="row" style="border-right: 1px solid #d8d5d5;">

														<div class="col-md-6 col-lg-6 pt-3">
															<label> Hide Nulls</label>
														</div>
														<div class="col-md-6 col-lg-6 pt-2">
															<div class="custom-control custom-radio pt-2">
																<input type="radio" class="custom-control-input"
																	id="customControlValidation19" name="radio-stacked"
																	required> <label class="custom-control-label"
																	for="customControlValidation19">Enabled</label>
															</div>
															<div class="custom-control custom-radio pt-2">
																<input type="radio" class="custom-control-input"
																	id="customControlValidation20" name="radio-stacked"
																	required> <label class="custom-control-label"
																	for="customControlValidation20">Disabled</label>
															</div>
														</div>
													</div>
												</div>
												<div class="col-md-6 col-lg-6">
													<div class="row">
														<div class="col-md-6 col-lg-6 pt-3">
															<label> Sort Nodes By</label>
														</div>
														<div class="col-md-6 col-lg-6 pt-2">
															<div class="custom-control custom-radio pt-2">
																<input type="radio" class="custom-control-input"
																	id="customControlValidation21" name="radio-stacked"
																	required> <label class="custom-control-label"
																	for="customControlValidation21">Automatic</label>
															</div>
															<div class="custom-control custom-radio pt-2">
																<input type="radio" class="custom-control-input"
																	id="customControlValidation22" name="radio-stacked"
																	required> <label class="custom-control-label"
																	for="customControlValidation22">Name(ASC)</label>
															</div>
															<div class="custom-control custom-radio pt-2">
																<input type="radio" class="custom-control-input"
																	id="customControlValidation23" name="radio-stacked"
																	required> <label class="custom-control-label"
																	for="customControlValidation23">Name(DESC)</label>
															</div>
														</div>
													</div>
												</div>

											</div>
											<div class="col-md-12">
												<label><i class="fas fa-info-circle"></i>&nbsp;Label:</label>
											</div>
											<div class="col-md-5 col-lg-5 pt-3">
												<label> Format Measure</label>
											</div>
											<div class="col-md-7 col-lg-7 pt-2">
												<select class="form-control">
													<option value="volvo">Emp</option>
													<option value="saab">SEA</option>
												</select>
											</div>
											<div class="col-md-5 col-lg-5 pt-3">
												<label> Font Size</label>
											</div>
											<div class="col-md-7 col-lg-7 pt-2">
												<select class="form-control">
													<option value="volvo">Emp</option>
													<option value="saab">SEA</option>
												</select>
											</div>
											<div class="col-md-5 col-lg-5 pt-3">
												<label> Font Family</label>
											</div>
											<div class="col-md-7 col-lg-7 pt-2">
												<select class="form-control">
													<option value="volvo">Emp</option>
													<option value="saab">SEA</option>
												</select>
											</div>
											<div class="col-md-12">
												<label><i class="fas fa-info-circle"></i>&nbsp;Other:</label>
											</div>
											<div class="col-md-5 col-lg-5 pt-3">
												<label> Export Visualization</label>
											</div>
											<div class="col-md-7 col-lg-7 pt-2">
												<button type="button" class="btn btn-primary mt-2">Export
													as SVG</button>

											</div>



										</div>
									</div>
								</div>

							</div>

							<div class="col-lg-6 mb-4">

								<!-- Illustrations -->
								<div class="card shadow mb-4" id="metric-selection">
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
											class="btn btn-primary mt-2" onClick="addMetric()">
											Add&nbsp;<i class="fa fa-plus "></i>
										</button>
									</div>
								</div>

								<!-- Approach -->


								<div class="card shadow mb-4 disable-element">
									<div class="card-header py-3">
										<h6 class="m-0 font-weight-bold text-primary">Tooltips</h6>
									</div>
									<div class="card-body">
										<div class="row">
											<div class="col-md-12 col-lg-12 pt-2">
												<label>Link Tooltip</label>
												<textarea class="back" rows="3" cols="80">
                                                 click refresh to retrive the latest features! Refresh will reset your column, measure and color palette.
                                                
                                                </textarea>
											</div>
											<div class="col-md-12 col-lg-12 pt-2">
												<label>Node Tooltip</label>
												<textarea class="back" rows="3" cols="80">
                                                click refresh to retrive the latest features! Refresh will reset your column, measure and color palette.
                                                
                                                 </textarea>
											</div>

										</div>

									</div>
								</div>
								<div class="card shadow mb-4 disable-element">
									<div class="card-header py-3">
										<h6 class="m-0 font-weight-bold text-primary">Dashboard
											Actions</h6>
									</div>
									<div class="card-body">

										<div class="row">
											<div class="col-md-6 col-lg-6 pt-3">
												<label> Target sheet</label>
											</div>
											<div class="col-md-6 col-lg-6 pt-2">
												<button type="button" class="btn btn-primary mt-2">Coffee
													Wheel</button>

											</div>
										</div>
										<div class="row">
											<div class="col-md-6 col-lg-6 pt-3">
												<label> Clearing the selection will</label>
											</div>
											<div class="col-md-6 col-lg-6 pt-2">
												<div class="custom-control custom-radio pt-2">
													<input type="radio" class="custom-control-input"
														id="customControlValidation17" name="radio-stacked"
														required> <label class="custom-control-label"
														for="customControlValidation17">Show All Values</label>
												</div>

											</div>
										</div>
									</div>
								</div>
								<div class="card shadow mb-4 disable-element">
									<div class="card-header py-3">
										<h6 class="m-0 font-weight-bold text-primary">Refresh</h6>
									</div>
									<div class="card-body">

										<div class="row">
											<div class="col-md-8 col-lg-8 pt-3">
												<label> click refresh to retrive the latest
													features! Refresh will reset your column, measure and color
													palette.</label>
											</div>
											<div class="col-md-4 col-lg-4 pt-2">
												<button type="button" class="btn btn-primary mt-2">Refresh</button>

											</div>
										</div>

									</div>
								</div>

							</div>
							<div class="col-md-12 col-lg-12 pt-3 ">
								<div class="card shadow mb-4">
									<div class="card-header py-3">
										<div class="row text-center">
											<div class="col-md-7 col-lg-7"></div>
											<div class="col-md-5 col-lg-5 text-right">
												<button type="button"
													class="btn btn-danger mt-2 pl-3 pr-3 mr-2">Cancel</button>
												<button type="button"
													class="btn btn-success mt-2 pl-3 pr-3 mr-2">Apply</button>
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
		<div class="modal fade" id="logoutModal" tabindex="-1" role="dialog"
			aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">Ready to
							Leave?</h5>
						<button class="close" type="button" data-dismiss="modal"
							aria-label="Close">
							<span aria-hidden="true">×</span>
						</button>
					</div>
					<div class="modal-body">Select "Logout" below if you are
						ready to end your current session.</div>
					<div class="modal-footer">
						<button class="btn btn-secondary" type="button"
							data-dismiss="modal">Cancel</button>
						<a class="btn btn-primary" href="login.html">Logout</a>
					</div>
				</div>
			</div>
		</div>
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
