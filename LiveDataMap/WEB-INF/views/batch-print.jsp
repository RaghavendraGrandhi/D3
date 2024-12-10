
<style>
<!--
iframe {
	width: 770px ! important;
	height: 260px !important;
	visibility: visible !important;
	position: absolute;
}
.loader {
	    left: 35%;
    top: 25%;
    position: fixed;
	border: 8px solid #f3f3f3;
	border-radius: 50%;
	border-top: 8px solid #3498db;
	width: 80px;
	height: 80px;
	-webkit-animation: spin 2s linear infinite; /* Safari */
	animation: spin 2s linear infinite;
}
.hidden{
    visibility: hidden;
}
.shown{
    visibility: visible;
}

@keyframes spin { 0% {transform: rotate(0deg);}
100%{transform:rotate(360deg);}
}
-->
</style>


<div class="container-fluid">
	<div class="row" style="margin-left: 5%">

		<div class="row">

			<div >
				<div id="vizContainer" style="width: 100%; height: 450px;"></div>
				<div class="loader hidden"></div>
				<div id="dataTarget"></div>
				<div id="dataTarget1"></div>
				<div id="dataTarget2"></div>
			</div>
			<!-- <div id="div-1" >
				<div id="vizContainer1" style="width: 100%; height: 450px;"></div>

				<div id="dataTarget1"></div>
			</div>
			<div id="div-2">
				<div id="vizContainer2" style="width: 100%; height: 450px;"></div>

				<div id="dataTarget2"></div>
			</div> -->

		</div>
		<div class="page-header">
			<button id="getData" onclick="getSummaryData()" class="btn" disabled>Get
				Reports</button>
		</div>
	</div>
</div>

<!-- load tableau js api library -->
<script type="text/javascript"
	src="http://public.tableau.com/javascripts/api/tableau-2.min.js"></script>
<!-- load jquery library -->
<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<!-- load jquery library -->
<script type="text/javascript">
	// initViz and getSummaryData code is adapted from https://github.com/tableau/js-api-samples
	var viz, sheet, sheet1, sheet2, viz1, viz2, table, result, urls = [], workSheet;
	function initViz() {

		var containerDiv = document.getElementById("vizContainer"), 
		url = "https://tableau-corp-dev.trinet.com/t/TRINET-DEV1/views/BatchPrint/BatchPrint", //replace with your tableau url
		containerDiv1 = document.getElementById("vizContainer1"), containerDiv2 = document
				.getElementById("vizContainer2"),

		options = {

			hideTabs : true,
			hideToolbar : true,
			onFirstInteractive : function() {
				document.getElementById('getData').disabled = false;
			}
		};
		viz = new tableau.Viz(containerDiv, url, options);
		//viz1 = new tableau.Viz(containerDiv1, url, options);
		//viz2 = new tableau.Viz(containerDiv2, url, options);
	}

	//function for downloading multiple files is adapted from here: http://jsfiddle.net/diegolamonica/ssk8z9pa/
	// Multiple file download only works in Chrome
	var i = 0;
	function downloadAll(files) {
		if (files.length == 0)
			return;
		file = files.pop();
		switch (i) {
		case 0:
			urls[0] = String(file[0]);
			console.log(urls[0])
			i++;
			break;
		case 1:
			urls[1] = String(file[0]);
			console.log(urls[1])
			i++;
			break;
		case 2:
			urls[2] = String(file[0]);
			console.log(urls[2])
			i++;
			break;

		}

		//window.open(file[0], '_blank');

	}

	function getSummaryData() {
		$(".loader").removeClass("hidden").addClass("shown");
		urls = [];
		i = 0;
		workSheet = viz.getWorkbook().getActiveSheet().getWorksheets();
		sheet = workSheet.get("URLs");
		 sheet1 =workSheet.get("Dashboard");
		sheet2 = workSheet.get("Print"); 
		//replace "URLs" with the name of your worksheet containing the URLs
		options = {
			maxRows : 0, // Max rows to return. Use 0 to return all rows
			ignoreAliases : false,
			ignoreSelection : true,
		};
		sheet.getSummaryDataAsync(options).then(function(t) {
			table = t;
			var tgt = document.getElementById("dataTarget");
			var data = table.getData()
			var value_array = new Array();
			//reshape array to fit download code
			for (var i = 0; i < data.length; i++) {
				value_array[i] = new Array(data[i][0].value);
			}
			//call download function from above
			downloadAll(value_array)
		}).otherwise(function(err) {
			console.log("1=>"+err);
		});
	 	sheet1.getSummaryDataAsync(options).then(function(t) {
			table = t;
			var tgt = document.getElementById("dataTarget1");
			var data = table.getData()
			var value_array = new Array();
			//reshape array to fit download code
			for (var i = 0; i < data.length; i++) {
				value_array[i] = new Array(data[i][0].value);
			}
			//call download function from above
			downloadAll(value_array)
		}).otherwise(function(err) {
			console.log("sheet1=>"+err);
		});
		sheet2.getSummaryDataAsync(options).then(function(t) {
			table = t;
			var tgt = document.getElementById("dataTarget2");
			var data = table.getData()
			var value_array = new Array();
			//reshape array to fit download code
			for (var i = 0; i < data.length; i++) {
				value_array[i] = new Array(data[i][0].value);
			}
			//call download function from above
			downloadAll(value_array);
		}).otherwise(function(err) {
			console.log(err);
		}); 
		waitForIt()
	}
	
	function waitForIt() {
		if (urls.length != 3) {
			setTimeout(function() {
				waitForIt()
			}, 100);
		} else {
			$.post("merge-pdf", {
				url_0 : urls[0],
				url_1 : urls[1],
				url_2 : urls[2]
			}).done(function(data) {
				i = 0;
				result = data
				$(".loader").removeClass("shown").addClass("hidden");
				window.open("http://dev01brtabcrp03:8080/trinet/resources/pdf/BatchPrint.pdf","_blank")
				
			});
			
			
		}
		;
		
		
	}
	$(document).ready(function() {
		initViz();
	});
</script>

