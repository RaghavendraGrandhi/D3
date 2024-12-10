
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

<script src="../../resources/js/tableau-extensions-1.latest.js"></script>
<script src="../../resources/js/loadingView.js"></script>
<script
	src="../../resources/js/live-data-mapping/live-data-mapping-dialog.js"></script>
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

<body>
	<div class="container" style="align-content: center;">

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
								data-parent="#accordion">Step 1</a>
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
										
										<button class="au-btn" type="submit">Next<span class="glyphicon glyphicon-arrow-down"></span></button>
									</div>
							
						</div>
					</div>
				</div>
				<div class="panel panel-default">
					<div class="panel-heading" id="headingTwo">
						<h3>
							<a href="#collapseTwo" data-toggle="collapse"
								data-parent="#accordion">Step 2</a>
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
									<div class="acc-wizard-step" style="margin-left: 20px;margin-top: 5px">
										
										<button class="au-btn" type="submit">Next<span class="glyphicon glyphicon-arrow-down"></span></button>
									</div>
								</div>
								
							</div>
						</div>
					</div>
				</div>
				<div class="panel panel-default">
					<div class="panel-heading" id="headingThree">
						<h3>
							<a href="#collapseThree" data-toggle="panel-collapse"
								data-parent="#accordion">Step 3</a>
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
								
								
								
								<div class="col-md-9" id="metric-div">
									<div class="row">
										<div class="col-md-3">
											<div class="">Select Metric</div>
											<select name="metric" class="form-control metric" id="metric"
												style="margin-top: 10px">
												<option value="NONE">--NONE--</option>
											</select>
										</div>
										<div class="col-md-3">
											<div class="">Select Calculation</div>
											<select name="metric" class="form-control calculation"
												id="metric_cal_0" style="margin-top: 10px">
												<option value="NONE">--NONE--</option>
												<option value="SUM">SUM</option>
												<option value="MIN">MIN</option>
												<option value="MAX">MAX</option>
												<option value="AVG">AVG</option>
												<option value="COUNT">COUNT</option>
												<option value="DISTINCT COUNT">DISTINCT COUNT</option>

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
								

							</div>
							<div class="row" style="border: 1px solid black;border-radius: 5px;margin: 5%" id="metric-box">
								
								</div>
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
	<script type="text/javascript">
		var count = 1;
		
		$( document ).ready(function() {
		    $("#collapseOne").addClass("in");
		});
		$(document).on('click', "a.addMetric",
						function() {
							$("#metric-div")
									.append(
											"<div class=\"row\"><div class=\"col-md-3\"><div >Select Metric</div><select name=\"metric\" class=\"form-control metric\" id=\"metric_0\" style=\"margin-top: 10px\"> "
													+

													"</select></div><div class=\"col-md-3\"><div >Select Calculation</div><select name=\"metric\" class=\"form-control calculation\" id=\"metric_cal_0\" "+
						"style=\"margin-top: 10px\"><option value=\"NONE\">NONE</option><option value=\"SUM\">SUM</option><option value=\"MIN\">MIN</option><option value=\"MAX\">MAX</option><option value=\"AVG\">AVG</option><option value=\"COUNT\">COUNT</option>"
													+"<option value=\"DISTINCT COUNT\">DISTINCT COUNT</option>"

													+"</select></div><div class=\"col-md-2\"><a href=\"#\" class=\"btn btn-info btn-md addMetric\" style=\"margin-top: 35px\"> <span class=\"glyphicon glyphicon-plus\"></span>"
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
	<script src="../../resources/js/step/acc-wizard.min.js"></script>
	<script src="../../resources/js/step/jquery.validate.min.js"></script>
	<script src="../../resources/js/step/additional-methods.min.js"></script>
	<script src="../../resources/js/step/jquery.steps.min.js"></script>
	<script src="../../resources/js/step/dobpicker.js"></script>
	<script src="../../resources/js/step/main.js"></script>


</body>



