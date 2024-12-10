<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Bubble Chart - vallandingham.me</title>
<meta name="description" content="Example Bubble chart implementation in JS. Based on NYT visualization">
<meta name="author" content="Jim Vallandingham">

<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet"	href="resources/css/gate-chart/reset.css">
<link rel="stylesheet"	href="resources/css/gate-chart/bubble_chart.css">
</head>
<body>
	<div id="body" class="container-fluid">
		<div class="row">
			<div class="col-sm-2 bgblue">
				<%@ include file="menu.jsp"%>
			</div>
			<div class="col-sm-10">
				<div class="container">
					<div id="toolbar">
						<button id="all" class="button active">All Grants</button> 
						<button id="year" class="button">Grants By Year</button>
					</div>
					<div id="vis"></div>
					<div class="footer"></div>
				</div>
			</div>
		</div>
	</div>


	<script src="resources/js/d3.v3.min.js"></script>
	<script src="resources/js/gate-chart/tooltip.js"></script>
	<script src="resources/js/gate-chart/bubble_chart.js"></script>

	<!-- PLEASE REMOVE AFTER CLONING -->
	<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-17355070-1', 'auto');
  ga('send', 'pageview');

  </script>
	<!-- END REMOVE -->
</body>
</html>