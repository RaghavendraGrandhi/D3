
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
			<div class="col-md-3">
				<div class="">Table View</div>
				<select name="level" class="form-control" id="level"
					style="margin-top: 10px" multiple="multiple">

				</select>
			</div>
			<div class="col-md-9" id="metric-div">
				<div class="row">
					<div class="col-md-3">
						<div class="">Select Metric</div>
						<select name="metric" class="form-control" id="metric"
							style="margin-top: 10px">

						</select>
					</div>
					<div class="col-md-3">
						<div class="">Select Calculation</div>
						<select name="metric" class="form-control" id="metric_cal_0"
							style="margin-top: 10px">
							<option value="1">SUM</option>
							<option value="2">MIN</option>
							<option value="3">MAX</option>
							<option value="4">AVG</option>

						</select>
					</div>
					<div class="col-md-2">

						<a href="#" class="btn btn-info btn-md addMetric"
							style="margin-top: 35px"> <span
							class="glyphicon glyphicon-plus"></span>
						</a>

					</div>
				</div>
			</div>
			<div class="col-md-4" style="top: 80">
				<button id="closeButton" class="btn btn-primary">Submit</button>
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
	<script type="text/javascript">
		var count = 1;
		$(".addMetric")
				.click(
						function() {
							$("#metric-div")
									.append(
											"<div class=\"row\"><div class=\"col-md-3\"><div >Select Metric</div><select name=\"metric\" class=\"form-control metric\" id=\"metric_0\" style=\"margin-top: 10px\"> "
													+

													"</select></div><div class=\"col-md-3\"><div >Select Calculation</div><select name=\"metric\" class=\"form-control\" id=\"metric_cal_0\" "+
						"style=\"margin-top: 10px\"><option value=\"1\">SUM</option><option value=\"2\">MIN</option><option value=\"3\">MAX</option><option value=\"4\">AVG</option>"
													+

													"</select></div><div class=\"col-md-2\"><a href=\"#\" class=\"btn btn-info btn-md addMetric\" style=\"margin-top: 35px\"> <span class=\"glyphicon glyphicon-plus\"></span>"
													+ "</a></div></div>");
							appendMetric();
						})
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
	</script>


</body>



