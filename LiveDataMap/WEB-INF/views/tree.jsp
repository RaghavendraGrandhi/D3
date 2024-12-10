<html>
<head>
<style>

.node {
  cursor: pointer;
}

.node circle {
  fill: #fff;
  stroke: steelblue;
  stroke-width: 1.5px;
}

.node text {
  font: 10px sans-serif;
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
  font-size: 11px;
  cursor:pointer;
  fill:black;
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

#main{
	width: auto;
	height: 1000px;
	background-color: #FFFFFF;
	margin-left: auto;
	margin-right: auto;
}

#d3viz{
	width: 680px;
	height: 600px;
	float: left;
	margin: 0;
	z-index: 999;
	font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

#intro{
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

#tableau{
	width: 550px;
	height: 800px;
	float: right;
	margin: 0;
	display: block;
	/* margin-left: 400px; */
}

#logo {
	margin-top: 45px;
	margin-left: auto;
	margin-right: auto;
	width: 1000px;
}


</style>
<%-- <script src="resources/js/d3.v3.min.js" charset="utf-8"></script> --%>
<script src="resources/js/d3.v3.min.js"></script>
<%-- <script src='resources/js/three-level/tableau-2.js'></script>
<script src='resources/js/three-level/d3.layout.js'></script> --%>

<script src='resources/js/treemap/tableau-2.js'></script>
<script src='resources/js/treemap/d3.layout.js'></script>
 <script  src="resources/js/jquery-1.6.2.min.js"></script>
</head>
<body style="background: #006990">
<a href="/trinet" style="color: white;">Go Home</a><br><br>
<select id="username" onchange="test()">
	<option value="1" >Sravan</option>
	<option value="2" >K</option>
	<option value="3" >G</option>

</select>
 <div id="main">
    	<div id="d3viz">
        </div>
        <div id="tableau">
        </div>
    </div>

<script>


$(document).ready(function(){
	test();
});
var margin,width,height,i,duration,root,selected,colored,tree,diagonal,svg;


function test(){
	alert($('#username option:selected').val());
	$('#d3viz').html('');
	 margin = {top: 20, right: 120, bottom: 20, left: 120},
    width = 960 - margin.right - margin.left,
    height = 800 - margin.top - margin.bottom;
 i = 0,
    duration = 750,
    root;
 selected = null;
 colored = null;

 tree = d3.layout.tree()
    .size([height, width]);

 diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x]; });

 svg = d3.select("#d3viz").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr("fill","white");
 
 console.log(svg);
 
 d3.csv("resources/csv/data.csv", function( error,csv ) {
	 if (error) throw error;
	 var data = d3.nest()
		.key(function(d) { return d.sitename; })
		.key(function(d) { return d.projectname; })
		.key(function(d) { return d.datasourcename; })
		.key(function(d) { return d.workbookname; })
		.rollup(function(v) { return v.map(function(d) { return d.workbookname; }); })
		.entries(csv);
	    
	 var json = JSON.parse(JSON.stringify(data).split('"key":').join('"name":').split('"values":').join('"children":'));
	 
	 data = {'name':'User','children':json};
	 root = data;
	  root.x0 = height / 2;
	  root.y0 = 0;
	  function collapse(d) {
	    if (d.children) {
	      d._children = d.children;
	      d._children.forEach(collapse);
	      d.children = null;
	    }
	  }
	  root.children.forEach(collapse);
	  selected = root.name[0];
	  colored = selected;
	  update(root);
	  tabfilter(); 
	
}); 
 


d3.select(self.frameElement).style("height", "800px");
}

 

	


function update(source) {
  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse(),
      links = tree.links(nodes);

  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * 180; });

  // Update the nodes
  var node = svg.selectAll("g.node")
      .data(nodes, function(d) { return d.id || (d.id = ++i); });

  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
      .on("click", click);

  nodeEnter.append("circle")
      .attr("r", 1e-6)
      .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

  nodeEnter.append("text")
      .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
      .attr("dy", ".35em")
      .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
      .text(function(d) { return d.name; })
      .style("fill-opacity", 1e-6);

  // Transition nodes to their new position.
  var nodeUpdate = node.transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

  nodeUpdate.select("circle")
      .attr("r", 4.5)
      .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

  nodeUpdate.select("text")
      .style("fill-opacity", 1);

  // Transition exiting nodes to the parent's new position.
  var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
      .remove();

  nodeExit.select("circle")
      .attr("r", 1e-6);

  nodeExit.select("text")
      .style("fill-opacity", 1e-6);

  // Update the links
  var link = svg.selectAll("path.link")
      .data(links, function(d) { return d.target.id; });

  // Enter any new links at the parent's previous position.
  link.enter().insert("path", "g")
      .attr("class", "link")
      .attr("d", function(d) {
        var o = {x: source.x0, y: source.y0};
        return diagonal({source: o, target: o});
      });

  // Transition links to their new position.
  link.transition()
      .duration(duration)
      .attr("d", diagonal);

  // Transition exiting nodes to the parent's new position.
  link.exit().transition()
      .duration(duration)
      .attr("d", function(d) {
        var o = {x: source.x, y: source.y};
        return diagonal({source: o, target: o});
      })
      .remove();

  // Stash the old positions for transition.
  nodes.forEach(function(d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });
}

// Toggle children on click.
function click(d) {
  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else {
    d.children = d._children;
    d._children = null;
  }
  console.log(d.children);
  update(d);
  tabfilter(d);
}

//filter Tableau viz

function tabfilter(d) {
	  var filterString = "";
	  //console.log(d);
	  if(d!=undefined){
		  if (d.depth==0){
			     setParameter('filterInput','Semantic Analysis');
			  }else if(d.depth==1){
			    filterString = 'Subject Area|'+d.name;
			    //filterString = 'Subject Area';
			    //alert('filterInput'+","+filterString);
			   // setParameter('filterInput',filterString);
			  } 
			  else if(d.depth==2){
				    filterString = 'Folder Name|'+d.parent.name+'|'+d.name;
				    //filterString = 'Folder Name';
				   	//alert(filterString);
				   // setParameter('filterInput',filterString);
				  }else if(d.depth==3){
					  filterString = 'My Name|'+d.parent.name+'|'+d.name;
					    //filterString = 'Folder Name';
					   	//alert(filterString);
					   // setParameter('filterInput',filterString);
				  }
			  else {
			     filterString = 'Attribute Name|'+d.parent.parent.name+'|'+d.parent.name+'|'+d.name;
			     //filterString = 'Attribute Name';
			     // alert(filterString);
			    // setParameter('filterInput',filterString);
			  }
	  }
	  
	} 
//********************************************T****************
//stick it on the page
var viz, workbook;

window.onload= function() {
	var vizDiv = document.getElementById('tableau');
	/* https://public.tableau.com/profile/roshni.gupta#!/vizhome/D3POC1/Dashboard1 */
	/* https://public.tableau.com/profile/tamas.foldi#!/vizhome/SuperGetData/CustomerSales */
	/* var vizURL = "https://public.tableau.com/views/FederalSpending_0/FederalBudget"; */
	/* Working  https://public.tableau.com/views/D3POC1/Dashboard1*/
	/* Working http://172.16.17.64/views/D3POC1/No_ofReports */
	/* Old not working https://public.tableau.com/views/D3POC1_0/D3POC */
	
	var vizURL = "https://dev01brtabcrp03/t/TRINET-DEV1/views/D3POC_24-11/D3POC";
	
 	var options = {
		width: '450px',
		height: '675px',
		hideToolbar: true,
		hideTabs: true,
		onFirstInteractive: function () {
			workbook = viz.getWorkbook();
			document.getElementById('sheetName').innerHTML = viz.getWorkbook().getActiveSheet().getName();
		}
	};
	viz = new tableauSoftware.Viz(vizDiv, vizURL, options);
	viz.addEventListener('tabswitch', function(event) {
		document.getElementById('sheetName').innerHTML = event.getNewSheetName();
	});
	viz.addEventListener('marksselection', onMarksSelection);
};

//get selected marks
function onMarksSelection(marksEvent) {
return marksEvent.getMarksAsync().then(selectFunc);
}

//filter data
function showOnly(filterName, values) {
	sheet = viz.getWorkbook().getActiveSheet();
	if(sheet.getSheetType() === 'worksheet') {
		sheet.applyFilterAsync(filterName, values, 'REPLACE');
		//console.log("filtered");
	} else {
		worksheetArray = sheet.getWorksheets();
		for(var i = 0; i < worksheetArray.length; i++) {
			worksheetArray[i].applyFilterAsync(filterName, values, 'REPLACE');
		}
		//console.log("filtered");
	}
}

//clear filter
function clearFilter(filterName) {
	sheet = viz.getWorkbook().getActiveSheet();
	if(sheet.getSheetType() === 'worksheet') {
		sheet.clearFilterAsync(filterName);
	} else {
		worksheetArray = sheet.getWorksheets();
		for(var i = 0; i < worksheetArray.length; i++) {
			worksheetArray[i].clearFilterAsync(filterName);
		}
	}
}

//set parameter for fed, agency, burueau
function setParameter(name,value) {
	/* console.log(name+"--------"+value) */
	workbook.changeParameterValueAsync(name,value);
	console.log("param set");
}

function setAndFilter(filterName,values,name,value) {
	/* alert("482: "+filterName, values); */
	setParameter(name,value).then(
	showOnly(filterName, values)
	);
	//console.log("param set");
}


</script>
</body>
</html>