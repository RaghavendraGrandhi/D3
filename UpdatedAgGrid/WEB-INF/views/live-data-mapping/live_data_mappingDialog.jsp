<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport"
	content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta name="description" content="">
<meta name="author" content="">

<title>Data - StratApps</title>

<!-- Custom fonts for this template-->
<link href="../../resources/css/livedatamap/all.min.css"
	rel="stylesheet" type="text/css">
<link
	href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
	rel="stylesheet">
<link
	href="https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css"
	rel="stylesheet">


<!-- Custom styles for this template-->
<link href="../../resources/css/livedatamap/sb-admin-2.css"
	rel="stylesheet">
<style>
#sortable {
	list-style-type: none;
	margin: 0;
	padding: 0;
	width: 60%;
}

#sortable li {
	margin: 0 3px 3px 3px;
	padding: 0.4em;
	padding-left: 1.5em;
	font-size: 1.4em;
	height: 18px;
}

#sortable li span {
	position: absolute;
	margin-left: -1.3em;
}

.disable-element {
	pointer-events: none !important;
	opacity: 0.5;
}

</style>
<link rel="stylesheet"
	href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<style>
</style>

<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<link rel="stylesheet"
	href="../../resources/css/step/material-design-iconic-font.min.css">
<link rel="stylesheet"
	href="../../resources/css/step/acc-wizard.min.css">

<!-- Main css -->
<link rel="stylesheet" href="../../resources/css/step/style.css">
<link rel="stylesheet" href="../../resources/css/livedatamap/main.css">

</head>

<body>
	<!-- Page Wrapper -->
	<div id="wrapper">

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
						src="../../resources/images/livedatamap/stratapps.png">
					<div class="sidebar-brand-text mx-3">
						Stratapps 
					</div>

					

				</nav>
				<!-- End of Topbar -->

				<!-- Begin Page Content -->
				<div class="container-fluid">

					<!-- Page Heading -->

					<div
						class="d-sm-flex align-items-center justify-content-between mb-4">
						<h1 class="h3 mb-0 text-gray-800"></h1>
						<button type="button" class="btn btn-success mt-2 pl-3 pr-3"
							onClick="tableau.extensions.ui.closeDialog(1)">Back</button>
					</div>

					<!-- Grid row -->
					<div
						class="row accordion-gradient-bcg d-flex justify-content-center">

						<!-- Grid column -->
						<div class="col-md-12 col-xl-9 py-5">

							<!--Accordion wrapper-->
							<div class="accordion md-accordion accordion-2" id="accordionEx7"
								role="tablist" aria-multiselectable="true">

								<!-- Accordion card -->
								<div class="card" id="step1">

									<!-- Card header -->
									<div class="card-header rgba-stylish-strong z-depth-1"
										role="tab" id="heading1">
										<a data-toggle="collapse" data-parent="#accordionEx7"
											href="#collapse1" aria-expanded="true"
											aria-controls="collapse1">
											<h5 class="mb-0 white-text text-uppercase font-thin">
												step 1 <i class="fas fa fa-question-circle red-tooltip"
													style="font-size: 16px;" data-toggle="tooltip"
													data-placement="bottom" title="Welcome to StratApps"></i>
											</h5>
										</a>
									</div>

									<!-- Card body -->
									<div id="collapse1" class="collapse show" role="tabpanel"
										aria-labelledby="heading1" data-parent="#accordionEx7">
										<div class="card-body mb-1 rgba-grey-light white-text">
											<div class="col-md-12">

												<div class="row">

													<div class="col-md-6 col-lg-6 pt-2 ">
														<label>Select Tableau Work sheet/Data source</label> <select
															name="workSheet" class="form-control"
															id="selectWorksheet">

														</select>
													</div>

												</div>

												<button type="button" data-toggle="collapse"
													data-parent="#accordionEx7" href="#collapse2"
													aria-expanded="false" aria-controls="collapse2"
													class="btn btn-primary mt-2" style="margin-bottom: 20px;"
													disabled id="workSheetButton">
													Next&nbsp;<i class="fa fa-arrow-down "></i>
												</button>
											</div>
										</div>
									</div>
								</div>
								<!-- Accordion card -->

								<!-- Accordion card -->
								<div class="card disable-element" id="step2">

									<!-- Card header -->
									<div class="card-header rgba-stylish-strong z-depth-1"
										role="tab" id="heading2">
										<a class="collapsed" data-toggle="collapse"
											data-parent="#accordionEx7" href="#collapse2"
											aria-expanded="false" aria-controls="collapse2">
											<h5 class="mb-0 white-text text-uppercase font-thin">
												Step 2 <i class="fas fa-question-circle red-tooltip"
													style="font-size: 16px;" data-toggle="tooltip"
													data-placement="bottom" title="Welcome to StratApps"></i>
											</h5>
										</a>
									</div>

									<!-- Card body -->
									<div id="collapse2" class="collapse" role="tabpanel"
										aria-labelledby="heading2" data-parent="#accordionEx7">
										<div class="card-body mb-1 rgba-grey-light white-text">
											<div class="col-md-12 mb-4" style="height: 200px;" id="">

												<div class="row" id="joinDiv">

													<div class="col-md-5 col-lg-5 pt-2 ">
														<label>Select the join field from tableau data
															source</label> <select name="join" class="form-control"
															id="join_field">

														</select>
													</div>
													<div class="col-md-2 col-lg-2 text-center"
														style="padding-top: 33px; margin-left: -30px; padding-left: -11px; margin-right: 15px;">
														<div class="btn-group">
															<a class="" data-toggle="dropdown" aria-haspopup="true"
																aria-expanded="false"> <img class=" rounded-circle"
																style="width: 160px" height="32px"
																src="../../resources/images/livedatamap/1a.png"
																id="selected-join-image"></a>
															<div class="dropdown-menu menu1"
																x-placement="bottom-start"
																(click)="$event.stopPropagation()">
																<div class="col-md-12 col-lg-12 col-12">
																	<div class="row">
																		<div class="col-md-3 col-lg-3 text-center"
																			style="border-right: 1px solid #ccc8c8;"
																			onClick="selectJoin('INNER')">
																			<img class=" rounded-circle" style="width: 70px;"
																				src="../../resources/images/livedatamap/1.png">
																			<label>Inner</label>
																		</div>
																		<div class="col-md-3 col-lg-3 text-center"
																			style="border-right: 1px solid #ccc8c8;"
																			onClick="selectJoin('LEFT')">
																			<img class=" rounded-circle" style="width: 70px"
																				src="../../resources/images/livedatamap/2.png">
																			<label>Left</label>
																		</div>
																		<div class="col-md-3 col-lg-3 text-center"
																			style="border-right: 1px solid #ccc8c8;"
																			onClick="selectJoin('RIGHT')">
																			<img class=" rounded-circle" style="width: 70px"
																				src="../../resources/images/livedatamap/3.png">
																			<label>Right</label>
																		</div>
																		<div class="col-md-3 col-lg-3 text-center"
																			onClick="selectJoin('OUTER')">
																			<img class=" rounded-circle" style="width: 70px"
																				src="../../resources/images/livedatamap/4.png">
																			<label>Full Outer</label>
																		</div>

																	</div>
																</div>
															</div>
														</div>


													</div>
													<div class="col-md-5 col-lg-5 pt-2 ">
														<label>Select the join field from external data
															source</label> <select name="join" class="form-control"
															id="join_column">

														</select>
													</div>
												</div>
												<button type="button" data-toggle="collapse"
													data-parent="#accordionEx7" href="#collapse2"
													aria-expanded="false" aria-controls="collapse2"
													class="btn btn-primary mt-2 disable-element" 
													id="addFieldButton">
													Add&nbsp;<i class="fa fa-plus "></i>
												</button>

												<button type="button" data-toggle="collapse"
													data-parent="#accordionEx7" href="#collapse3"
													aria-expanded="false" aria-controls="collapse3"
													class="btn btn-primary mt-2" id="joinSubmitButton">
													Next&nbsp;<i class="fa fa-arrow-down "></i>
												</button>
											</div>
										</div>
									</div>
								</div>
								<!-- Accordion card -->

								<!-- Accordion card -->
								<div class="card disable-element" id="step3">

									<!-- Card header -->
									<div class="card-header rgba-stylish-strong z-depth-1"
										role="tab" id="heading3">
										<a class="collapsed" data-toggle="collapse"
											data-parent="#accordionEx7" href="#collapse3"
											aria-expanded="false" aria-controls="collapse3">
											<h5 class="mb-0 white-text text-uppercase font-thin">
												Step 3 <i class="fas fa-question-circle red-tooltip"
													style="font-size: 16px;" data-toggle="tooltip"
													data-placement="bottom" title="Welcome to StratApps"></i>
											</h5>
										</a>
									</div>

									<!-- Card body -->
									<div id="collapse3" class="collapse" role="tabpanel"
										aria-labelledby="heading3" data-parent="#accordionEx7">
										<div class="card-body mb-1 rgba-grey-light white-text">
											<div class="col-md-12">
												<div class="row pt-2">
													<div class="col-md-6 col-lg-6 ">
														<h5>Select fields from Tableau Data source
															preparation</h5>
															
																     <label class="checkbox-inline"><input type="checkbox" value="0" id="checkAllTableauFields"> Select All</label>
																   
															
														<select class="multi-select form-control" name="level"
															id="level" multiple="multiple" style="font-size: 1.5rem;">

														</select>
													</div>
													<div class="col-md-6 col-lg-6 ">
														<h5>Select field from external data source</h5>
														<label class="checkbox-inline"><input type="checkbox" value="1" id="checkAllExtrnalFields">SelectAll</label>
														
														<select class="multi-select form-control" name="level1"
															id="level1" multiple="multiple"
															style="font-size: 1.5rem;">

														</select>
													</div>
												</div>

												<div class="row pt-3 pl-3" id="metric-box">
													

												</div>
												<button type="button" class="btn btn-success mt-2 pl-3 pr-3"
													style="margin-bottom: 20px;" id="closeButton">Submit</button>

											</div>
										</div>
									</div>
								</div>
								<!-- Accordion card -->
							</div>
							<!--/.Accordion wrapper-->

						</div>
						<!-- Grid column -->

					</div>
					<!-- Grid row -->


				</div>
				<!-- /.container-fluid -->

			</div>
			<!-- End of Main Content -->

			<!-- Footer -->
			<footer class="sticky-footer bg-white">
				<div class="container my-auto">
					<div class="copyright text-center my-auto">
						<span>Copyright &copy;StratApps 2019</span>
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
					<h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
					<button class="close" type="button" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">Ã</span>
					</button>
				</div>
				<div class="modal-body">Select "Logout" below if you are ready
					to end your current session.</div>
				<div class="modal-footer">
					<button class="btn btn-secondary" type="button"
						data-dismiss="modal">Cancel</button>
					<a class="btn btn-primary" href="login.html">Logout</a>
				</div>
			</div>
		</div>




		<!-- <div class="container" style="align-content: center;display: none">

		<br> <br> <br>
		<div class="row" style="display: none;">
			<div class="">SELECT COLUMNS</div>
			<select name="level" class="form-control" id="columns"
				style="margin-top: 10px" multiple="multiple">

			</select>
		</div>



		<div class="acc-wizard">
			<div class="panel-group" id="accordion">
				<div class="panel panel-default active">
					<div class="panel-heading" id="headingOne">
						<h3>
							<a href="#collapseOne" data-toggle="collapse"
								data-parent="#accordion">Step 1 <span
								class="glyphicon glyphicon-question-sign" data-toggle="tooltip"
								data-placement="top"
								title="Select the work sheet from tableau dashboard"></span></a>
						</h3>
					</div>

					<div id="collapseOne" class="panel-collapse collapse in">
						<div class="panel-body">


							<div>
								<div class="">Select enterprise data work sheet</div>
								<select name="level" class="form-control" id="selectWorksheet"
									style="margin-top: 10px; width: 40%">

								</select>
							</div>
							<div class="acc-wizard-step" style="margin: 5px">

								<button class="au-btn" type="submit" id="step1" disabled>
									Next<span class="glyphicon glyphicon-arrow-down"></span>
								</button>
							</div>

						</div>
					</div>
				</div>
				<div class="panel panel-default disable-element" id="panel2">
					<div class="panel-heading" id="headingTwo">
						<h3>
							<a href="#collapseTwo" data-toggle="collapse"
								data-parent="#accordion">Step 2 <span
								class="glyphicon glyphicon-question-sign" data-toggle="tooltip"
								data-placement="top"
								title="Apply join condition to integrate enterprise data with lookup data source"></span></a>
						</h3>
					</div>
					<div id="collapseTwo" class="panel-collapse collapse">
						<div class="panel-body">
							<div>

								<div class="row">
									<div class="col-md-4">
										<div class="">Select the join field from enterprise data</div>
										<select name="join" class="form-control" id="join_field"
											style="margin-top: 10px">

										</select>
									</div>
									<div class="col-md-2">
										<div class="">Select join</div>
										<select name="join" class="form-control" id="join"
											style="margin-top: 10px">

										</select>
									</div>
									<div class="col-md-4">

										<div class="">Select join field from lookup data source</div>
										<select name="join" class="form-control" id="join_column"
											style="margin-top: 10px">

										</select>
									</div>

								</div>
								<div class="row">
									<div class="acc-wizard-step"
										style="margin-left: 20px; margin-top: 5px">

										<button class="au-btn" type="submit" id="step2">
											Next<span class="glyphicon glyphicon-arrow-down"></span>
										</button>
									</div>
								</div>

							</div>
						</div>
					</div>
				</div>
				<div class="panel panel-default disable-element" id="panel3">
					<div class="panel-heading" id="headingThree">
						<h3>
							<a href="#collapseThree" data-toggle="panel-collapse"
								data-parent="#accordion">Step 3 <span
								class="glyphicon glyphicon-question-sign" data-toggle="tooltip"
								data-placement="top"
								title="Select the fields from both the data source to represent the same in tabular view"></span></a>
						</h3>
					</div>
					<div id="collapseThree" class="panel-collapse collapse">
						<div class="panel-body">
							<div class="row">
								<div class="col-md-4">
									<div class="">Select fields from enterprise data source</div>
									<select name="level" class="form-control" id="level"
										style="margin-top: 10px" multiple="multiple">

									</select>
								</div>
								<div class="col-md-4">
									<div class="">Select fields from lookup data source</div>
									<select name="level1" class="form-control" id="level1"
										style="margin-top: 10px" multiple="multiple">

									</select>
								</div>






							</div>
							<div class="row"
								style="border: 1px solid black; border-radius: 5px; margin: 5%"
								id="metric-box"></div>
							<div class="row">
								<div class="form-submit">

									<input type="submit" value="Submit" class="au-btn"
										id="closeButton" style="margin: 20px">

								</div>
							</div>

						</div>
					</div>
				</div>
			</div>
		</div>


	</div>
	 -->
		<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
		<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
		<script>
	$(function() {
		$("#sortable").sortable();
		$("#sortable").disableSelection();
	});
</script>
		<script
			src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
		<script src="../../resources/js/d3.v3.min.js"></script>

		<script src="../../resources/js/tableau-extensions-1.latest.js"></script>
		<script src="../../resources/js/loadingView.js"></script>
		<script
			src="../../resources/js/live-data-mapping/live-data-mapping-dialog.js"></script>

		<script src="../../resources/js/step/acc-wizard.min.js"></script>
		<script src="../../resources/js/step/jquery.validate.min.js"></script>
		<script src="../../resources/js/step/additional-methods.min.js"></script>
		<script src="../../resources/js/step/jquery.steps.min.js"></script>
		<script src="../../resources/js/step/dobpicker.js"></script>
		<script src="../../resources/js/step/main.js"></script>
		<!-- Bootstrap core JavaScript-->
		<script src="../../resources/js/bootstrap/js/bootstrap.bundle.min.js"></script>

		<!-- Core plugin JavaScript-->
		<script src="../../resources/js/jquery-easing/jquery.easing.min.js"></script>

		<!-- Custom scripts for all pages-->
		<script src="../../resources/js/sb-admin-2.min.js"></script>

		<!-- Page level custom scripts -->
		<script
			src="../../resources/js/live-data-mapping/demo/chart-area-demo.js"></script>
		<script
			src="../../resources/js/live-data-mapping/demo/chart-pie-demo.js"></script>
		<script>
        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        })
        $(document).ready(function () {
            "use strict";

            // sidebar navigation-----------Jagdish-------
            $('#demo').css('display', 'none');

            $("#img").click(function () {
                $("#demo").toggle();
                $("#demo").css('display', 'block');

            });
        });
    </script>

		<script type="text/javascript">
		var count = 1;
		
		$( document ).ready(function() {
		    $("#collapseOne").addClass("in");
		    $("#selectWorksheet").on("change",function(){
		    	if($("#selectWorksheet").val() == ''){
		    	 	$("#step1").prop('disabled', true)
		    	 	
		    	}else{
		    		$("#step1").prop('disabled', false)
		    		$("#panel2").removeClass("disable-element");
		    		$("#panel3").removeClass("disable-element");
		    	}
		    })
		   
		});
		
		function appendMetric() {
			var worksheetName = $("#selectWorksheet").val();
			 var dataSourceName;
			 tableau.extensions.dashboardContent.dashboard.worksheets.find(function (sheet) {
		    	 sheet.getDataSourcesAsync().then(function (sumdata) {
		    		 dataSourceName = sumdata[0].name;
		    	 })
		     
		    });
			
			let columns_length = tableau.extensions.settings
					.get("columns_length");
			for (let i = 0; i < columns_length; i++) {
				$('.metric').append(
						$("<option></option>").attr(
								"value",
								function() {

									return "sd_"
											+ i
											+ "_"
											+ tableau.extensions.settings
													.get("columns_" + i);
								})
								.text(
										tableau.extensions.settings
												.get("columns_" + i)));
			}
			tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === worksheetName).getDataSourcesAsync().then(datasources => {
		    	 var dataSource = datasources.find(datasource => datasource.name === dataSourceName);
		    	  return dataSource.getUnderlyingDataAsync();
		    	}).then(dataTable => {
		    	console.log(dataTable)
		    	
		        var worksheetColumns = dataTable.columns;
		        let count =0;
		        $.each(worksheetColumns,function (i,f) {
		        	if(f){
		        		count++;
		        		 $('.metric')
				            .append($("<option></option>")
				                            .attr("value",function(){
				                           	 
				                           	return "pd_"+i+"_"+f.fieldName;
				                            })
				                            .text(f.fieldName)); 
		        	}
		        })
		    	})
			
		}
		function selectJoin(x){
			if(x){
				 join = x;
				switch (x) {
				case "INNER":
					$("#selected-join-image").attr("src","../../resources/images/livedatamap/1a.png");
					break;
				case "LEFT":
					$("#selected-join-image").attr("src","../../resources/images/livedatamap/2a.png");
					break;
				case "RIGHT":
					$("#selected-join-image").attr("src","../../resources/images/livedatamap/3a.png");
					break;
				case "OUTER":
					$("#selected-join-image").attr("src","../../resources/images/livedatamap/4a.png");
					break;
	
				default:
					break;
				}
			}
		}
	</script>
</body>
</html>



