<html>
<head>
<link href="resources/css/loadmask/jquery.loadmask.css" rel="stylesheet" type="text/css" />
<style>
.node {
	cursor: pointer;
}

.node circle {
	fill: #fff;
	stroke: steelblue;
	stroke-width: 1.5px;
}



.link {
	fill: none;
	stroke: #ccc;
	stroke-width: 1.5px;

	/* #0095d3
#89cbdf
#6db33f
#387c2c
#006990 */
}

body {
	background-image: url(../texture-noise.png);
	background-color: #000000;
}

#chart, #header, #footer {
	position: absolute;
	top: 0;
}

#header, #footer {
	z-index: 1;
	display: block;
	font-size: 36px;
	font-weight: 300;
	text-shadow: 0 1px 0 #fff;
}

#header.inverted, #footer.inverted {
	color: #fff;
	text-shadow: 0 1px 4px #000;
}

#header {
	top: 80px;
	left: 140px;
	width: 1000px;
}

#footer {
	top: 680px;
	right: 140px;
	text-align: right;
}

rect {
	fill: none;
	pointer-events: all;
}

pre {
	font-size: 18px;
}

line {
	stroke: #000;
	stroke-width: 1.5px;
}

.string, .regexp {
	color: #f39;
}

.keyword {
	color: #00c;
}

.comment {
	color: #777;
	font-style: oblique;
}

.number {
	color: #369;
}

.class, .special {
	color: #1181B8;
}

a:link, a:visited {
	color: #000;
	text-decoration: none;
}

a:hover {
	color: #666;
}

.hint {
	position: absolute;
	right: 0;
	width: 1280px;
	font-size: 12px;
	color: #999;
}

#title {
	font-family: open-sans;
	font-style: normal;
	font-weight: 600;
	background-color: #222;
	width: 1000px;
	margin-left: auto;
	margin-right: auto;
	margin-top: 30px;
	margin-bottom: 0px;
	font-size: 24px;
	color: #FFFFFF;
}

#title .header {
	font-size: 24px;
	padding-top: 5px;
	padding-right: 5px;
	padding-left: 10px;
	padding-bottom: 5px;
	display: block;
}

.node circle {
	cursor: pointer;
	fill: #fff;
	stroke: steelblue;
	stroke-width: 1.5px;
}

.node text {
	font-size: 14px;
	cursor: pointer;
	fill: black;
	font-family: calibri;
	font-weight: bold;
}

.selected {
	fill: red;
}

/*.root text{
	font-size:16px;
}*/
path.link {
	fill: none;
	stroke: #ccc;
	stroke-width: 1px;
}

#main {
	width: auto;
	height: 1000px;
	background-color: #FFFFFF;
	margin-left: auto;
	margin-right: auto;
}

#d3viz {
	width: 680px;
	height: 600px;
	float: left;
	margin-left: -75px;
	z-index: 999;
	font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

#intro {
	display: block;
	position: absolute;
	width: 275px;
	float: left;
	margin-top: 100px;
	margin-left: 373px;
	font-size: medium;
	color: #000000;
	font-family: open-sans;
	font-style: normal;
	font-weight: 300;
}

#tableau {
	width: 969px;;
	height: 800px;
	float: right;
	margin-top: 10px;
	display: block;
	
}

#logo {
	margin-top: 45px;
	margin-left: auto;
	margin-right: auto;
	width: 1000px;
}

/* LODER  */
.show{
display: block;
}
.hide{
display: none;
}

</style>
 <script  src="../resources/js/jquery-1.6.2.min.js"></script>
<script src="../resources/js/d3.v3.min.js"></script>
<script src="../resources/js/treemap/tableau-extensions-1.latest.js"></script>
<script src="../resources/js/tableau-extension/wfa-new-tree-map.js"></script>

 
</head>
<body style="background: #fff">
 <div id="main" style="margin-left: 100px">
    	<div id="d3viz" >
        </div>
        <div id="tableau">
        </div>
    </div>
 

</body>
</html>