
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
</style>
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

<script src="../../resources/js/treemap/tableau-extensions-1.latest.js"></script>
<script
	src="../../resources/js/tableau-extension/live-data-mapping/live-data-mapping-dialog.js"></script>
<link rel="stylesheet"
	href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<style>
</style>

<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">


<body>
	<div class="container" style="align-content: center; margin-top: 100px">
		<div class="row">
			<div class="">SELECT WORKSHEET</div>
			<select name="level" class="form-control" id="selectWorksheet"
				style="margin-top: 10px; width: 40%">

			</select>
		</div>
		<br>
		<div class="row">
			<div class="col-md-4">
				<div class="">SELECT FIED(PRIMARY DATA SOURCE)</div>
				<select name="join" class="form-control" id="join_field"
					style="margin-top: 10px">

				</select>
			</div>
			<div class="col-md-2">
				<div class="">SELECT JOIN</div>
				<select name="join" class="form-control" id="join"
					style="margin-top: 10px">

				</select>
			</div>
			<div class="col-md-4">

				<div class="">SELECT FIED(SECONDARY DATA SOURCE)</div>
				<select name="join" class="form-control" id="join_column"
					style="margin-top: 10px">

				</select>
			</div>
		</div>
		<br>
		<div class="row">
			<div class="col-md-6">
				<div class="">Table View</div>
				<select name="level" class="form-control" id="level"
					style="margin-top: 10px" multiple="multiple">

				</select>
			</div>
			<div class="col-md-6" style="display: none;">
				<div class="">Select Metric</div>
				<select name="level" class="form-control" id="metric"
					style="margin-top: 10px" >

				</select>
			</div>
			<div class="col-md-4" style="top:80">
				<button id="closeButton" class="btn btn-primary" >Submit</button>
			</div>
			
		</div>
		
		<br>
		<div class="row" style="display: none;">
			<div class="">SELECT COLUMNS</div>
			<select name="level" class="form-control" id="columns"
				style="margin-top: 10px" multiple="multiple">

			</select>
		</div>






	</div>


</body>



