<html>
<head>
<meta charset="UTF-8">
<title>Word Cloud</title>
<script src="resources/js/d3.v3.min.js" charset="utf-8"></script>
<script src="resources/js/word-count/d3.layout.cloud.js"></script>
<script src="resources/js/word-count/d3.wordcloud.js"></script>

<style type="text/css">
#main {
	width: auto;
	/* height: 1000px; */
	background-color: #FFFFFF;
	margin-left: auto;
	margin-right: auto;
}
/*  #tableau{
	width: 550px;
	height: 800px;
	margin: 0;
	display: block;
	/* margin-left: 400px; */
}
* /
#wordcloud {
	width: 680px;
	height: 500px;
	float: left;
	margin: 0;
	z-index: 999;
	margin-left: 25% font-family: "Helvetica Neue", Helvetica, Arial,
		sans-serif;
}
</style>
 <script  src="resources/js/jquery-1.6.2.min.js"></script>
<script src='resources/js/treemap/tableau-2.js'></script>
</head>
<a href="/trinet" style="float: left;">Go Home</a>

<body style="text-align: center;background-color: #c5e09c">
	<div id="main" style="background-color: #c5e09c">
		<div id="wordcloud"></div>
		<div id="tableau" style="margin-left: 22%"></div>
	</div>
	<!--  <strong><div id="details" style="width:100%;text-align:center;line-height:2em;margin-top:0.5em"></div></strong> -->
	<script>
	//var sources = "";
	/* 	$(document).ready(function() {
			$.getJSON('read-word-count-data', function(data) {
				sources = data;
				d3.wordcloud().size([ 800, 250 ]).fill(
						d3.scale.ordinal().range(
								[ "#884400", "#448800", "#888800", "#444400" ])).words(
						sources).onwordclick(function(d, i) {
					tabfilter(d);
				}).start();
				
			}).error(function() {
				alert("error");
			});
		}); */
		var sources = [
			{text:'AVAYA', size:26},
			{text:'CPQ', size:20 },
			{text:'PSHR', size:102},
			{text:'PSHR', size:47},
			{text:'PSFN', size:46}, 
			{text:'SFDC', size:36},
			{text:'HRP', size:29},
			{text:'REF', size:29},
			{text:'MTX', size:56},
			{text:'PSCRM', size:56},
			{text:'SNOW', size:27}, 
			{text:'PASS', size:41}, 
			{text:'PLM', size:53}, 
			{text:'TCLOUD', size:76}, 
		]
		
		d3.wordcloud().size([ 800, 250 ]).fill(
				d3.scale.ordinal().range(
						[ "#884400", "#448800", "#888800", "#444400" ])).words(
				sources).onwordclick(function(d, i) {
			tabfilter(d);
		}).start();
		
		
		var viz, workbook;
		window.onload = function() {
			var vizDiv = document.getElementById('tableau');
			var vizURL = "https://tableau-corp-dev.trinet.com/t/TRINET-DEV1/views/WordCount/WordCount";
			//var vizURL = "https://public.tableau.com/views/WordCount_3/WordCount";
			var options = {
				width : '900px',
				height : '394px',
				hideToolbar : true,
				hideTabs : true,
				onFirstInteractive : function() {
					//alert("Haiiii");
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

		function tabfilter(d) {
			var filterString = "";
			filterString = d.text;
			if (filterString == 'Service now') {
				setParameter('filterInput', filterString);
			} else {
				setParameter('filterInput', 'S_' + filterString);
			}
		}

		function setParameter(name, value) {
			workbook.changeParameterValueAsync(name, value);
		}
		
		
	</script>
</body>
</html>