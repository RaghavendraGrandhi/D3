<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>PopCha! Movie Network</title>
<link rel="stylesheet"	href="resources/css/network-graph/network-graph.css" />
<link rel="shortcut icon" href="popcha.ico" type="image/x-icon">
<script>
      // Sniff MSIE version
      // http://james.padolsey.com/javascript/detect-ie-in-js-using-conditional-comments/
      var ie = ( function() {
        var undef,
        v = 3,
        div = document.createElement('div'),
        all = div.getElementsByTagName('i');
        while (
         div.innerHTML='<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',all[0]
        );
        return v > 4 ? v : undef;
      }() );

      function takeAction() {
        if( ie && ie < 9 ) {
	  D3notok();
        } else {
          // Load D3.js, and once loaded do our stuff
          var head = document.getElementsByTagName('head')[0];
          var script = document.createElement('script');
          script.type = 'text/javascript';
	  script.src = "http://d3js.org/d3.v3.min.js";
          script.addEventListener('load', D3ok, false);
          script.onload = "D3ok();";
	  head.appendChild(script);
       }
     }
    </script>
</head>
<body onload="takeAction();">
<div class="container-fluid">
	<div class="row">
		<div class="col-sm-2 bgblue">
			<%@ include file="menu.jsp"%>
		</div>
		<div class="col-sm-10">
		   	<div id="movieNetwork" style="margin-top: 1em;"></div>
			<div id="sidepanel">
				<div id="movieInfo" class="panel_off"></div>
			</div>		
		</div>
	</div>
</div>

	<script src="resources/js/network-graph/network-graph.js"></script>
</body>
</html>