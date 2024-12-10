
<!DOCTYPE html>
<html>
<!-- Use the Source, Luke -->
<head>
<title>CodeFlower Source code visualization</title>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link href='http://fonts.googleapis.com/css?family=Rosario:400,700'	rel='stylesheet' type='text/css'>
<style type="text/css">
circle.node {
	cursor: pointer;
	stroke: #000;
	stroke-width: .5px;
}

circle.node.directory {
	stroke: #9ecae1;
	stroke-width: 2px;
}

circle.node.collapsed {
	stroke: #555;
}

.nodetext {
	fill: #252929;
	font-weight: bold;
	text-shadow: 0 0 0.2em white;
}

line.link {
	fill: none;
	stroke: #9ecae1;
	stroke-width: 1.5px;
}

body {
	font-family: 'Rosario', sans-serif;
}

#visualization {
	overflow: auto;
}

h1 {
	font-size: 62px;
	font-weight: 300;
	letter-spacing: -2px;
	line-height: 1em;
	margin: 1em 0;
}

textarea {
	width: 98%;
	height: 200px;
}
</style>
</head>
<body>
	<div class="container-fluid">
		<div class="row">
			<div class="col-sm-2 bgblue">
				<%@ include file="menu.jsp"%>
			</div>
			<div class="col-sm-10">
    <div class="content">
        <div id="visualization" class="text-center"></div>
        <form id="jsonInput" hidden>
        <fieldset>
          <textarea id="jsonData"></textarea>
          <div class="pull-right">
            <button type="submit" class="btn btn-primary btn-large">Update</button>
          </div>
        </fieldset>
        </form>
        <form id="jsonConverter">
        </form>
    </div>
	<script type="text/javascript" src="resources/js/code-flower/d3.js"></script>
	<script type="text/javascript"		src="resources/js/code-flower/d3.geom.js"></script>
	<script type="text/javascript"		src="resources/js/code-flower/d3.layout.js"></script>
	<script type="text/javascript"		src="resources/js/code-flower/CodeFlower.js"></script>
	<script type="text/javascript"		src="resources/js/code-flower/dataConverter.js"></script>
    <script type="text/javascript">
      var currentCodeFlower;
      var createCodeFlower = function(json) {
        // update the jsonData textarea
        document.getElementById('jsonData').value = JSON.stringify(json);
        // remove previous flower to save memory
        if (currentCodeFlower) currentCodeFlower.cleanup();
        // adapt layout size to the total number of elements
        var total = countElements(json);
        w = parseInt(Math.sqrt(total) * 30, 10);
        h = parseInt(Math.sqrt(total) * 30, 10);
        // create a new CodeFlower
        currentCodeFlower = new CodeFlower("#visualization", w, h).update(json);
      };

      d3.json('readFile/code-flower', createCodeFlower);

      document.getElementById('jsonInput').addEventListener('submit', function(e) {
        e.preventDefault();
        document.getElementById('visualization').scrollIntoView();
        var json = JSON.parse(document.getElementById('jsonData').value);
        currentCodeFlower.update(json);
      });
      document.getElementById('jsonConverter').addEventListener('submit', function(e) {
        e.preventDefault();
        var origin = this.children[0].children[0].value;
        var data = this.children[0].children[1].value;
        var json = convertToJSON(data, origin);
        document.getElementById('visualization').scrollIntoView();
        createCodeFlower(json);
      });
    </script>
    <script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-26354577-2']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

    </script>
			</div>
		</div>
	</div>
</body>
</html>
