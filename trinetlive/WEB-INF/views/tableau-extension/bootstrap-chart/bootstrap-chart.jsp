<!DOCTYPE html>
<html>

<head>

	<link type="text/css" rel="stylesheet" media="all" href="../resources/css//bootstrap/bootstrap.min.css" />
	<title>..:: BOOTSTRAP CHART ::..</title>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.5.7/css/mdb.min.css" />

<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.5.7/js/mdb.min.js"></script>

	<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>


	<script src="../resources/js/tableau-extension/chart-wheel/d3.js" type="text/javascript"></script>


	<script src="../resources/js/treemap/tableau-extensions-1.latest.js"></script>
	<script src="../resources/js/tableau-extension/bootstrap-chart/bootstrap-chart.js"></script>
	<script src="../resources/js/bootstrap/js/bootstrap.min.js"></script>
	
	<style>
/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 10px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: green; 
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #000; 
}
</style>
</head>

<body>
	

	<div class="container clearFix" style=" text-align: center;">
	<div>
	<h1 >. . : : BOOTSTRAP CHART : : . .</h1>
	</div> 
		<button type="button" class="btn btn-primary btn-lg">SONGS CHART</button>
		<button type="button" class="btn btn-primary btn-lg">BAR HIERARCHY</button>
		<button type="button" class="btn btn-primary btn-lg">CODE FLOWER</button>
		<button type="button" class="btn btn-primary btn-lg">DEPARTMENTS</button>
		<div id="chart" style="margin: auto;margin-top: 20px">		
		</div>
		 
	</div>

	<script type="text/javascript">
		$(document)
			.ready(
				function () {
					$("button").click(function(){
						$("#chart").html("")
						switch ($(this).text()) {
						case "SONGS CHART":
							$("#chart").append('<iframe src="http://localhost:9999/trinetlive/songs-chart" class="animated slideInDown" width="660" height="270"></iframe>')
							break;
						case "BAR HIERARCHY":
							$("#chart").append('<iframe src="http://localhost:9999/trinetlive/barhierarchy" class="animated slideInLeft" width="660" height="270"></iframe>')
							break;
						case "CODE FLOWER":
							$("#chart").append('<iframe src="http://localhost:9999/trinetlive/code-flower" class="animated slideInRight" width="660" height="270"></iframe>')
							break;
						case "DEPARTMENTS":
							$("#chart").append('<iframe src="http://localhost:9999/trinetlive/departments" class="animated slideInUp" width="660" height="270"></iframe>')
							break;

						default:
							break;
						}
					})
				});
	</script>

</body>

</html>