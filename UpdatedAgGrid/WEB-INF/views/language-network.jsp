
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    	<!-- <link rel="pingback" href="http://www.cotrino.com/xmlrpc.php" /> 
    	<link rel="alternate" type="application/rss+xml" title="Cotrino &raquo; Feed" href="http://www.cotrino.com/feed/" /> -->
		<title>Language Network</title>
		<link href="resources/css/language-network/langnet.css" rel="stylesheet" type="text/css" />
		<link rel="stylesheet" href="resources/css/language-network/jquery-ui.css" type="text/css" media="all" />
	</head>
	<body>
	<a href="/trinet">Go Home</a><br><hr>
	<div id="graphHolder"></div>
	<div id="toolbox">
		<p id="titlep">
			<div id="title">LanguageNetwork</div><br/>
		</p>
		<div id="chartSelector">
			<input type="radio" value="network" id="networkOption" name="chartOption" checked="checked" /><label for="networkOption">network</label>
			<input type="radio" value="chord" id="chordOption" name="chartOption" /><label for="chordOption">chord</label>
		</div>
		<p><input id="hide_checkbox" type="checkbox" onClick="hide()" />Hide unrelated languages</p>
		<div id="sliderContainer">
			Filter by similarity level: <span id="similarity"></span>
			<div id="slider"></div>
		</div>
		<p id="hint"></p>
		<div id="language_information"></div>
	</div>
	<script type="text/javascript" src="resources/js/language-network/langnet.js"></script>
	<script type="text/javascript" src="resources/js/language-network/Levenshtein.js"></script>
	<script src="resources/js/language-network/jquery.min.js" type="text/javascript"></script>
	<script src="resources/js/language-network/jquery-ui.min.js" type="text/javascript"></script>
	<script src="resources/js/language-network/d3.v2.js"></script>
	<script type="text/javascript">
		$(function() {
			 $("#about" ).dialog({
				autoOpen: false,
				show: "blind",
				hide: "explode",
				width: 800,
				height: 600
			});
			$("#chartSelector").buttonset();
			$("#chartSelector").change(function(event){
				chartChange($("input[type=radio]:checked").val());
			});
			restart();
			$("#slider").slider({ change: filterChange, min: similarityThresholdMin, max: similarityThresholdMax, value: similarityThreshold });
		});
	</script>
	</body>
</html>
