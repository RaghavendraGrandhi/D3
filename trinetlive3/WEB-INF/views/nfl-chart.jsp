<html>
<head>
    <!-- <link rel="stylesheet" type="text/css" href="resources/css/nfl-chart/default.css" media="screen"/>
    <link type="text/css" rel="stylesheet" href="resources/css/nfl-chart/style.css"/> -->
 <style type="text/css">
/* @import url(resources/css/nfl-chart/style-1.css?aea6f0a); */
.node rect {
  cursor: move;
  fill-opacity: .9;
  shape-rendering: crispEdges;
}

.node text {
  fill:#fff;
  pointer-events: none;
  //~ text-shadow: 0 1px 0 #fff;
}

.link {
  fill: none;
  stroke: #000;
  stroke-opacity: .2;
}

.link:hover {
  stroke-opacity: .5;
}

</style>
  </head>
<body>
<div class="container-fluid">
	<div class="row">
		
		<div class="col-sm-10">
			<div class="container1">
				<div class="main">		
					<div id="content" class="content">
		                <div id="chart"></div>
			        </div>
				</div>
				<div class="wrapper"></div>
			</div>
		</div>
	</div>
</div> 

</body>

<script type="text/javascript" src="resources/js/d3.v3.min.js"></script><!-- https://piratepeel.github.io/lib/d3.v3/d3.v3.js -->
<script src='resources/js/nfl-chart/catxml.js'></script>
<script src='resources/js/nfl-chart/narrative.js'></script>
       
</html>