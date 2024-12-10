<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>jQuery UI Datepicker - Display month &amp; year menus</title>
<link rel="stylesheet"	href="resources/css/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet"	href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

</head>
<body>
	<div class="container-fluid">
		<div class="row">
			
			<div class="col-sm-10">
					<p style="margin: 2em;">Date: <input type="text" id="datepicker" class="form-control" style="width: 30%;border-radius: 0;box-shadow: 0px 0px 1px #cccccc94;"></p>
			       <!--  <div id="tableau"></div> -->
			</div>
		</div>
	</div>
<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script src="resources/js/d3.v3.min.js" charset="utf-8"></script>
<script src="resources/js/word-count/d3.layout.cloud.js"></script>
<script src="resources/js/word-count/d3.wordcloud.js"></script>
<script src="resources/js/treemap/tableau-extensions-1.latest.js"></script>
<script src="resources/js/tableau-extension/date-picker/date-picker.js"></script>

<script>
    $( "#datepicker" ).datepicker({
        changeMonth: true,
        changeYear: true,
        onSelect: function(dateText) {
            console.log("Selected date: " + dateText);
            tabfilter(dateText);
          }
      });
    $("#datepicker").datepicker("setDate", new Date());
    

var viz, workbook;
/* window.onload = function() {
	var vizDiv = document.getElementById('tableau');
	var vizURL = "https://public.tableau.com/views/dateParameter/Calendar";
	var options = {
		width : '100%',
		height : '400px',
		hideToolbar : true,
		hideTabs : true,
		onFirstInteractive : function() {
			workbook = viz.getWorkbook();
			document.getElementById('sheetName').innerHTML = viz
					.getWorkbook().getActiveSheet().getName();
		}
	};
	viz = new tableauSoftware.Viz(vizDiv, vizURL, options);
	viz.addEventListener('tabswitch', function(event) {
		document.getElementById('sheetName').innerHTML = event
				.getNewSheetName();
	});
	viz.addEventListener('marksselection', onMarksSelection);
};

function onMarksSelection(marksEvent) {
	return marksEvent.getMarksAsync().then(selectFunc);
}
 */
 
 function tabfilter(date) {
		//document.write(workbook)
		tableau.extensions.initializeAsync().then(function () {
		      const dashboard = tableau.extensions.dashboardContent.dashboard;
				
		      // Then loop through each worksheet and get its filters, save promise for later.
		      dashboard.worksheets.forEach(function (worksheet) {
		    	  /* worksheet.getDataSourcesAsync().then(datasources=>{
		    		  console.log(datasources)
		    	  }) */
		    	  var field = tableau.extensions.settings.get("level");
		    	  console.log(field)
		    	  console.log(worksheet)
		    	  if(field === "Call Survey Date"){
		    	  worksheet.clearFilterAsync(field)
			          worksheet.applyFilterAsync(field, [date],
			            tableau.FilterUpdateType.Replace);
		    	  dashboard.findParameterAsync("filterInput1").then(function(param){
		      		console.log(param)
		      		param.changeValueAsync(date)
		      	})
		    	  }else{
		    		  console.log("INVALID FIELD")
		    	  }
	     });


		    }, function (err) {
		      // Something went wrong in initialization.
		      console.log('Error while Initializing: ' + err.toString());
		    });
		
		
	}
	
	
	

/* function tabfilter(date) {
	workbook.changeParameterValueAsync('filterInput', date);
} */
</script>
</body>
</html>