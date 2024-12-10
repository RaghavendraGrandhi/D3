<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>



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

	<script src="../resources/js/jquery/jquery-3.3.1.min.js"></script>

 <script src="../resources/js/jquery.redirect.js"></script>
    <script src="../resources/js/treemap/tableau-extensions-1.latest.js"></script>
 

  <style type="text/css">
  
  .img-profile{
  cursor: pointer;
  }
  </style>
	<!-- Topbar -->
	<nav
		class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow"
		id="navbar" >

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

	

	</nav>
	


	<!-- Bootstrap core JavaScript-->
	<script src="../resources/js/bootstrap/js/bootstrap.bundle.min.js"></script>

	<!-- Core plugin JavaScript-->
	<script src="../resources/js/jquery-easing/jquery.easing.min.js"></script>

	<!-- Custom scripts for all pages-->
	<script src="../resources/js/sb-admin-2.min.js"></script>
	
	<script src="../resources/js/bootstrap.min.js"></script>
	

	

	<script type="text/javascript">
	var app_url;
	$(document).ready(function () {
		url = window.location.href ;
		url_array = url.split("/");
		map_name = url_array[5];
		level=url_array[url_array.length-1];
		app_url = url_array[0]+"/"+url_array[1]+"/"+url_array[2]+"/"+url_array[3]+"/";
		home_url=url_array[0]+"/"+url_array[1]+"/"+url_array[2]+"/"+url_array[3]+"/"+url_array[4]+"/"+url_array[5]+"/";
		
		tableau.extensions.initializeAsync({ 'configure': showHome }).then(function () {
			dashboard = tableau.extensions.dashboardContent.dashboard;

			
		});

	});
		function showHome() {
			window.location.href = app_url+"trex/live-data-mapping";
		}

		
		
	
	</script>
