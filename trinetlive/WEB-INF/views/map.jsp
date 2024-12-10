
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<title>Mapping with D3 | Visible Data</title>

	<link rel="stylesheet" type="text/css" href="http://eyeseast.github.io/visible-data/components/bootstrap/dist/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="http://eyeseast.github.io/visible-data/css/utilities.css">
	<link rel="alternate" type="application/rss+xml" title="" href="http://eyeseast.github.com/visible-data/feed.xml">
	<script src="http://eyeseast.github.io/visible-data/components/queue.js" type="text/javascript"></script>
	<script src="http://d3js.org/d3.v3.min.js" type="text/javascript"></script>
	

</head>
<body>
<a href="/trinet">Go Home</a>
	<div class="container">
	
<!-- 	<header class="page-header">
		
		
			
			<h3><a href="/visible-data/">Visible Data</a></h3>
			
			<div class="row">
				<h1 class="col-md-8">Mapping with D3</h1>
				<h2 class="quiet col-md-4 right">Dec 14, 2012</h2>
			</div>
		
		

	</header> -->

	<div class="content row">
	<article class="post col-md-12">
	<style type="text/css">

.counties path {
  stroke: #fff;
  stroke-width: .5px;
  stroke-opacity: .5;
  fill: #81abce;
}

.states {
  stroke: #fff;
  stroke-width: 1px;
  fill: none;
}

.counties path:hover {
  fill: Steelblue;
}

</style>

<p>Trying out D3&#39;s geographic features.</p>

<h3 id="caption">Hover over a county:</h3>

<div id="map">
    <h4 class="loading">Loading...</h4>
</div>

<script type="text/javascript">
/* var urls = {
        counties: "http://eyeseast.github.io/visible-data/data/gis/us-counties.json",
        states: "http://eyeseast.github.io/visible-data/data/gis/us-states.json"
    } */
   margin = { top: 0, right: 0, bottom: 0, left: 0 }
  , width = 960 - margin.right - margin.left
  , height = 500
  , path = d3.geo.path()
  , map;

var q = queue()
    .defer(d3.json, "http://eyeseast.github.io/visible-data/data/gis/us-counties.json")
    .defer(d3.json, "http://eyeseast.github.io/visible-data/data/gis/us-states.json")
    .await(ready);

function ready(error, countylines, statelines) {
    window.error = error;
    window.countylines = countylines;
    window.statelines = statelines;

    if (error) throw error;

    var stateIds = {};
    statelines.features.forEach(function(d) {
        stateIds[d.id] = d.properties.name;
    });

    countylines.features.forEach(function(d) {
        d.properties.state = stateIds[d.id.slice(0,2)];
    })

    // remove the loading text
    d3.select('.loading').remove();

    map = d3.select('#map').append('svg')
        .style('width', width)
        .style('height', height);

    var counties = map.append('g')
        .attr('class', 'counties')
      .selectAll('path')
        .data(countylines.features)
      .enter().append('path')
        .attr('d', path);

    counties.on('mouseover', showCaption)
        .on('mousemove', showCaption)
        .on('mouseout', function() {
            caption.html(starter);
        });

    var states = map.append('g')
        .attr('class', 'states')
      .selectAll('path')
        .data(statelines.features)
      .enter().append('path')
        .attr('d', path);

    var caption = d3.select('#caption')
      , starter = caption.html();

    function showCaption(d, i) {
        var name = [d.properties.name, d.properties.state].join(', ');
        caption.html(name);
    }

};

d3.selectAll('pre').attr('class', 'prettyprint');
prettyPrint();

</script>

</article>

	</div>
	</div>
	<script type="text/javascript">
	  var _gaq = _gaq || [];
	  _gaq.push(['_setAccount', 'UA-32005313-1']);
	  _gaq.push(['_trackPageview']);
	  (function() {
	    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	  })();
	</script>
</body>
</html>