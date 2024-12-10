
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
	src="../../resources/js/tableau-extension/ag-grid2/ag-grid-dialog.js"></script>
<link rel="stylesheet"
	href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<style>
  .disable-element {
	pointer-events: none !important;
	opacity: 0.2;
}
</style>

<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">


<body>
	<div class="container" style="align-content: center; margin-top: 100px">
		<div class="">SELECT WORKSHEET</div>
		<select name="level" class="form-control" id="selectWorksheet"
			style="margin-top: 3%">

		</select> <br>
		<div class="">SELECT DataSource</div>
		<div class="disable-element" id="radioButtonDiv">
		<div class="radio" >
			<label><input type="radio" name="dataSource" checked value="0">Work Sheet Data Source</label>
		</div>
		<div class="radio">
			<label><input type="radio" name="dataSource" value="1">Data Source</label>
		</div>
		</div>
		<div class="">SELECT FIELDS</div>
		<div id="loadDiv" style="display: none">LOADING...</div>
		<select name="level" class="form-control" id="level"
			style="margin-top: 3%;height: 150px" multiple="multiple">

		</select>


		<button id="closeButton" class="btn btn-primary"
			style="margin-top: 5%">Submit</button>
	</div>


</body>



