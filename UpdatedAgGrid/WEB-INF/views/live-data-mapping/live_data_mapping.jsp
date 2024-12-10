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
 <link rel="stylesheet" href="../resources/css/ag-grid/ag-grid.css">
 <link rel="stylesheet"
	href="../resources/css/ag-grid/ag-theme-balham.css">
<link rel="stylesheet" href="../resources/css/livedatamap/main.css">
<link href="../resources/css/component-chosen.css" rel="stylesheet">
<link rel="stylesheet"	href="../resources/css/bootstrap/css/bootstrap.min.css">
<link type="text/css" rel="stylesheet" href="../resources/css/concept-map/concept-map.css" />
	<script src="../resources/js/jquery/jquery-3.3.1.min.js"></script>

 <script src="../resources/js/jquery.redirect.js"></script>
 	<script src="../resources/js/live-data-mapping/lodash.min.js"></script>
 
 <script src="../resources/js/ag-grid/ag-grid-enterprise.min.noStyle.js"></script>

  <style type="text/css">
  .visualization{
    background-image: url(../resources/images/livedatamap/sa10.png);
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-position: center top;
    background-attachment: fixed;
  }
   body{
    background-image: url(../resources/images/livedatamap/sa10.png);
    background-repeat: no-repeat;
   
    background-position: center bottom;
    background-attachment: fixed;
  }
  
.space-bg{
height: 290px;
width: 100%
}
  .img-profile{
  cursor: pointer;
  }
  .disable-element {
	pointer-events: none !important;
	opacity: 0.2;
}
#advancedChartDiv,#dataMapDiv{
	margin:10px;
    padding: 20px 20px 54px 22px;
    border-radius: 5px;
   
 
}
  </style>
</head>
<body>
<body class="bg-gradient-primary">
	<!-- Topbar -->
	<nav
		class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow"
		id="navbar" style="display: none;">

		<!-- Sidebar Toggle (Topbar) -->
		<button id="sidebarToggleTop"
			class="btn btn-link d-md-none rounded-circle mr-3">
			<i class="fa fa-bars"></i>
		</button>

		<!-- Topbar Search -->
		<img class="img-profile " style="width: 34px;"
			src="../resources/images/livedatamap/stratapps.png" onClick="showHome()">
		<div class="sidebar-brand-text mx-3">
			Stratapps
		</div>
		<div class="dropdown" style="float: right; margin: 10px;display: none">
					<button class="btn btn-secondary dropdown-toggle" type="button"
						id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
						aria-expanded="false">Export</button>
					<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
						<li onClick="exportToExcelAdvanced()" style="cursor: pointer">Generate
							Exel</li>
					</div>
		</div>
	

	</nav>
	<!-- End of Topbar -->
	<div class="container">

		<div class="card o-hidden border-0 shadow-lg my-5" id="company-info">
			<div class="card-body p-0">
				<!-- Nested Row within Card Body -->
				<div class="row">
					<div class="col-lg-6 bg-register-image"><div class="space-bg" ></div></div>
					<div class="col-lg-6">
						<!-- <button onclick="getSelectedRows()">Get Selected Rows</button> -->
						<div class="alert alert-danger alert-dismissible fade show"
							role="alert" style="display: none; margin: 5%">
							<button type="button" class="close" data-dismiss="alert"
								aria-label="Close">
								<span aria-hidden="true">&times;</span>

							</button>
							<span id="error_msg"></span>
						</div>
						<div class="p-5" style="margin: 60px 0 60px 0;">
						
							
						
							<div id="dataMapDiv" style="background-color: #3faba4" class="col-md-11">
							
								<div ><!-- style="text-align: center;" -->
								<!-- <input type="radio" name="configChart" style="text-align: left;margin-right: 50px" checked
									value="0"> -->
									<h1 class="h4 text-gray-900 mb-4" style="color: white!important;"><input type="radio" name="configChart" style="text-align: left;margin-right: 50px
									;" checked
									value="0">External data source</h1>
								</div>
								<form class="user" method="post" enctype="multipart/form-data"
									id="data">
	
									<div class="input-group">
										<div class="custom-file">
											<input type="file" name="filename" id="filename"
												class="custom-file-input" required="true"> <label
												class="custom-file-label" for="filename">Choose file</label>
										</div>
										<div class="input-group-append">
											<button class="btn btn btn-primary" type="submit">Submit</button>
										</div>
									</div>
								</form>
							</div>
							
						<div id="advancedChartDiv" style="background-color: #5c9bd1" class="col-md-11" >
						<div class="spinner-advanced">
							<h5>LOADING DATA...</h5>
						</div>
						<div id="advancedChartDivContent">
								<div >
									<h1 class="h4 text-gray-900 mb-4" style="color: white!important;"><input type="radio" name="configChart" 
									style="text-align: left;margin-right: 50px;" 
									value="1">Advanced Charts</h1>
								</div>
								<form class="user" method="post" enctype="multipart/form-data"
									id="advancedChartForm">
	
									<div class="input-group">
										<div class="custom-file">
											<select name="workSheet" class="form-control"
															id="selectWorksheet" required="true">

														</select>
										</div>
										<div class="input-group-append ">
										<button id="advancedChartLinkButton" class="btn btn btn-primary " type="submit"
										style="cursor: pointer;">Submit</button>
											<!-- <a href="" id="advancedChartLink" class="btn btn btn-primary disable-element" >Submit</a> -->
										</div>
									</div>
								</form>
								</div>
							</div> 
							<div class="text-center">
								<a class="small" href="http://www.stratapps.net/">StratApps
									App for Tablaeu</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		

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
								<label>Select User:</label> <select id="optgroup"
									class="form-control form-control-chosen"
									data-placeholder="Please select..." multiple>
									<optgroup label="Users" id="users">

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

	</div>
	<div style="padding: 10px" class=" " id="agGridView">
		<div class="alert alert-primary" role="alert"
			style="text-align: center; width: 100%; display: none;"
			id="downloadLink">
			Please click the download button <a href="" target="_blank"
				class="btn btn-success" onClick="hideLink()" id="excelDownload">download</a>
		</div>

		<!-- <button onclick="getSelectedRows()">Get Selected Rows</button> -->
		<div id="agGrid" style="height: 700px; width: 100%;"
			class="ag-theme-balham"></div>
	</div>
	
	<div id="conceptMap" style="margin-left: 50px;min-height: 500px;"
			class="visualization">
			<div id="graph"  style="margin: 0 auto;"></div>
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
	<!-- <script src="../resources/js/jquery-easing/jquery.easing.min.js"></script> -->

	<!-- Custom scripts for all pages-->
	<script src="../resources/js/sb-admin-2.min.js"></script>
	<script src="../resources/js/d3.v3.min.js"></script>
	<script src="../resources/js/d3.v4.min.js"></script>
	<script src="../resources/js/tableau-extensions-1.latest.js"></script>
	<script src="../resources/js/bootstrap.min.js"></script>
	
	<script src="../resources/js/loadingView.js"></script>
	<script src="../resources/js/live-data-mapping/coffee-wheel.js"></script>
	<script src="../resources/js/live-data-mapping/live-data-mapping.js"></script>

	<!-- HIERACHIAL EDGE BUNDLING -->


	<script src="../resources/js/popper.min.js"></script>


	<script src="../resources/js/multiselect/tether.min.js"></script>
	<script src="../resources/js/multiselect/chosen.jquery.js"></script>
	
	<!-- CONCEPT MAP -->
	<script src="../resources/js/concept-map/packages.js" type="text/javascript"></script>
	<script src="../resources/js/concept-map/concept-map-blend.js" type="text/javascript"></script>
	

	<script type="text/javascript">
		$(document).ready(function() {
		
			$("#navbar").hide();
			$("#advancedChartDiv form").addClass("disable-element");
			 $("input[type='radio']").click(function(){
	            var configValue = $("input[name='configChart']:checked").val();
	           
	            if(configValue == 0){
	            	$("#dataMapDiv form").removeClass("disable-element");
					$("#advancedChartDiv form").addClass("disable-element");
	            }else if(configValue == 1){
	            	$("#dataMapDiv form").addClass("disable-element");
					$("#advancedChartDiv form").removeClass("disable-element");
				
	            }
	        }); 
			$('input[type="file"]').change(function(e) {
				var fileName = e.target.files[0].name;
				$(".custom-file-label").text(fileName);

			});
			$("#agGridView").css("display", "none");
			$(".visualization").css("display", "none");
			$(".spinner").css("display", "none");
			$(".spinner-advanced").css("display", "none");

		});

		function showHome() {
			$("#navbar").hide();
			$(".visualization").empty();
			$("#agGrid").empty();
			$("#agGridView").css("display", "none");
			$(".visualization").css("display", "none");
			$(".spinner").css("display", "none");
			clearInterval(hebRotate)
			$("#company-info").show();
			$("#advancedChartLinkButton").show();
			$(".dropdown").hide();
		}

		var columns = [];
		$("form#data").submit(function(e) {
			e.preventDefault();
			
			var formData = new FormData(this);
			$('#company-info').hide();
			$("#navbar").show();
			
			$('.spinner').css("display", "block");
			console.log(app_url);
			$.ajax({

				//url: "https://peoples.io/LiveDataMap/upload/live-data-mapping",
				url : app_url + "upload/live-data-mapping",
				type : 'POST',
				data : formData,
				success : function(data) {
					columns = data;
					configure();

				},
				cache : false,
				contentType : false,
				processData : false
			});
		});
		
		$("form#advancedChartForm").submit(function(e) {
			e.preventDefault();	
			$('#company-info').hide();
			$("#navbar").show();
			$('.spinner').css("display", "block");
			columnsUpdate($("#selectWorksheet").val());
		});
		
		function showDialog(){
			alert(app_url+"advanced/charts?workSheet="+$("#selectWorksheet").val())
			window.location.replace(app_url+"advanced/charts?workSheet="+$("#selectWorksheet").val()+"&&isConfigure=1");
			//configureAdvancedVizualization()
			
		}
		
		
	
	</script>
</body>

</html>
