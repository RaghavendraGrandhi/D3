
<!DOCTYPE html>
<meta charset="utf-8">
<title>Coffee flavour Wheel</title>
<meta name="description" content="A visualisation of coffee flavours.">
<style>
path {
	stroke: #000;
	stroke-width: 1.5;
	cursor: pointer;
}

text {
	font: 11px sans-serif;
	cursor: pointer;
}

h1 {
	text-align: center;
	margin: .5em 0;
}

p#intro {
	text-align: center;
	margin: 1em 0;
}
</style>
<body>
	<div class="container-fluid">
		<div class="row">

			<div class="col-sm-10">
				<div id="vis" class="text-center"></div>
			</div>
		</div>
	</div>
	
</body>
<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>

<script src="../resources/js/d3.v3.min.js"></script>
<script src="../resources/js/treemap/tableau-extensions-1.latest.js"></script>
<script
	src="../resources/js/tableau-extension/coffee-wheel/coffee-wheel.js"></script>
<script>

</script>
<script>
	
  if (top != self) top.location.replace(location);
</script>