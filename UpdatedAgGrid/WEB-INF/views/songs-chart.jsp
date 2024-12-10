<!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>Song Networks: Interative Network Tutorial</title>
<meta name="description" content="Demo for How to Build an Interactive Network Visualization.">
<meta name="author" content="Jim Vallandingham">
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet" href="resources/css/songs-chart/reset.css">
<link rel="stylesheet" href="resources/css/songs-chart/bootstrap.min.css">
<link rel="stylesheet" href="resources/css/songs-chart/style.css">


<script src="resources/js/songs-chart/modernizr-2.0.6.min.js"></script>
</head>
<body>
<div id="container" class="container">
<header>
<a href="/trinet">Go Home</a><br><hr>
<h1>Similar Song Networks</h1>
</header>
<div id="song_selection" class="control">
<h3>Song</h3>
<select id="song_select">
<option value="call_me_al.json">You Can Call Me Al</option>
<option value="sledgehammer_2_rounds.json">Sledgehammer</option>
<option value="poker_face.json">Poker Face</option>
<option value="jolene.json">Jolene</option>
<option value="helplessness_blues.json">Helplessness Blues</option>
<option value="she_said.json">She Said She Said</option>
<option value="short_skirt.json">Short Skirt, Long Jacket</option>
</select>
</div>
<div id="controls">
<div id="layouts" class="control">
<h3>Layout</h3>
<a id="force" class="active">Force Directed</a>
<a id="radial">Artists</a>
</div>
<div id="filters" class="control">
<h3>Filter</h3>
<a id="all" class="active">All</a>
<a id="popular">Popular</a>
<a id="obscure">Obscure</a>
</div>
<div id="sorts" class="control">
<h3>Sort</h3>
<a id="songs" class="active">Songs</a>
<a id="links">Links</a>
</div>
<div id="search_section" class="control">
<form id="search_form" action="" method="post">
<p class="search_title">Search <input type="text" class="text-input" id="search" value="" /></p>
</form>
</div>
<div id="main" role="main">
<div id="vis"></div>
</div>
</div> 

<script>window.jQuery || document.write('<script src="resources/js/songs-chart/jquery-1.7.2.min.js"><\/script>')</script>
<script defer src="resources/js/songs-chart/plugins.js"></script>
<script src="resources/js/songs-chart/coffee-script.js"></script>
<script src="resources/js/d3.v2.min.js"></script>
<script src="resources/js/songs-chart/Tooltip.js"></script>
<script type="text/coffeescript" src="resources/js/songs-chart/vis.coffee"></script>
<script> // Change UA-XXXXX-X to be your site's ID
    window._gaq = [['_setAccount','UA-865100-4'],['_trackPageview'],['_trackPageLoadTime']];
    Modernizr.load({
      load: ('https:' == location.protocol ? '//ssl' : '//www') + '.google-analytics.com/ga.js'
    });
  </script>
<!--[if lt IE 7 ]>
    <script src="//ajax.googleapis.com/ajax/libs/chrome-frame/1.0.3/CFInstall.min.js"></script>
    <script>window.attachEvent('onload',function(){CFInstall.check({mode:'overlay'})})</script>
  <![endif]-->
</body>
</html>
