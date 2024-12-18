
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" type="text/css"
	href="resources/css/chart-wheel/styles.css" />

<link href="resources/css/icapture/icapture.css" rel="stylesheet"
	type="text/css" />
<link rel="stylesheet"
	href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<script src="resources/js/multiselect/bootstrap.min.js"></script>
</body>


<script src="https://code.jquery.com/jquery-1.12.4.js"></script>

<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

<link rel="stylesheet"
	href="resources/css/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<script>
  $( function() {
    $( "#draggable" ).draggable();
  } );
  </script>
<title>Chart Wheel</title>
<style type="text/css">
#draggable {
	
}

#example3 {
	float: left;
	margin: 63px 33% 0 33%;
}

#shareme .box {
	float: left;
	margin: 5% 8% 0 8%;
	width: 100%;
}

#shareme .box a {
	color: #404040;
	text-shadow: 0 1px 1px rgba(167, 167, 167, .4);
}

#shareme .box a:hover {
	text-decoration: none;
}

#shareme .count {
	font-weight: bold;
	font-size: 50px;
	float: left;
	border-right: 2px solid #57b8d1;
	line-height: 40px;
	padding-right: 10px
}

#shareme .share {
	float: left;
	margin-left: 10px;
	font-size: 20px;
	width: 82px;
}

#shareme .buttons {
	position: absolute;
	width: 294px;
	background-color: #fff;
	border: 1px solid rgba(0, 0, 0, .2);
	padding: 10px;
	-webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, .1);
	-moz-box-shadow: 0 1px 2px rgba(0, 0, 0, .1);
	box-shadow: 0 1px 2px rgba(0, 0, 0, .1);
}

#shareme .button {
	float: left;
	max-width: 50px;
	margin: 0 10px 0 0;
}

#shareme .facebook {
	margin: 0 4px 0 0;
}
</style>
</head>
<body>

	<div class="container-fluid">
		<div class="row">
			<div class="col-sm-2 bgblue">
				<%-- <%@include file="menu.jsp" %> --%>
			</div>
			<div class="col-sm-10">
				<div class="main">
					<div id=viz1 style="width: 1024px; margin: 0px auto"></div>
				</div>
			</div>
		</div>

		<div id="draggable" class="ui-widget-content btn btn-primary"
			onclick="takeScreenShot()"
			style="float: right; bottom: 20px; right: 20px">SCREENSHOT</div>
	</div>


	<!-- <table>
  <tr>
  <td rowspan=2>  </div> </td>
  <td> <div id=viz2>Comparison of all Charts  for : <span id="1234" style="font-weight:bold"> </span> </div> </td>
  </tr>
   <tr>
  
  <td><div id=viz3> Comparison of all properties for : <span id="12345" style="font-weight:bold"> </span> </div> </td>
  </tr>
  </table> -->

	<script src="resources/js/icapture/html2canvas.js"></script>
	<script src="resources/js/icapture/icapture.js"></script>
	<script src="resources/js/icapture/html2canvas.svg.js"></script>


	<script src="resources/js/chart-wheel/lavalamp.js"></script>
	<script src="resources/js/chart-wheel/d3.js" type="text/javascript"></script>
	<script src="resources/js/chart-wheel/sr.js" type="text/javascript"></script>
	<script src="resources/js/chart-wheel/CustomTooltip.js"
		type="text/javascript"></script>
	<script src="resources/js/chart-wheel/superformula.js"
		type="text/javascript"></script>

	<script type="text/javascript">
    
    var colors1 = [];
    var colors = [];
	var ringNames = [];
	var rings = [];
	 var isColor2 = [];
	 var Series = [];
	var w = 760,
    h = 600,
    start = Date.now();
	var cc=0,dim=0;
	var base=100,factor=25;

	  
/* var colors1 =[
              ["#7cb109","#01692c","#008b54","#01d9ff","#016fac","#535ca9","#d0281d","#ff9934","#ec6c3f","#da2a50"],
              ["#023467","#064c91","#175eac","#308dd0","#539fd9","#8fcaec","#010900","#2b3b17","#44583d","#6d7c21","#aaada6"],
              ["#FFCC99","#FF9933","#FFCCCC","#FF99CC","#CC6699","#993366","#660033","#CC0099","#330033","#ff00ff"],
              ["#9d5990","#214e77","#008c92","#44ab8c","#68ac59","#7eb44d","#d5c427","#f99c47","#ee796b","#f397a0"],
              ["#15260f","#386728","#598d46","#a3c098","#a2e5d6","#9593e1","#5652cf","#2c27c3","#1a1775","#080727"]         
              ];   */ 
/* var isColor2=[
              [9,4,4,5,9,8,7,8],
              [6,7,5,7,7,7,6,7],
              [8,7,3,8,7,7,6,8],
              [8,8,6,7,6,6,5,9],
              [7,7,4,8,8,4,8,8],
              [6,7,5,7,6,5,6,9],
              [4,5,7,5,6,5,9,6],
              [8,6,9,6,7,3,8,8],
              [7,8,8,7,6,3,8,8],
              [8,8,7,8,7,5,7,9]
              ]; */
/*   var rings = [
             {radius: base+ factor * 1, width: 16, speed: 0,show : true,  name:"Portability"},
             {radius: base+ factor * 2, width: 16, speed: 0,show : true,  name:"Scalability"},
             {radius: base+ factor * 3, width: 16, speed: 0,show : true,  name:"Maturity"},  
             {radius: base+ factor * 4, width: 16, speed: 0,show : true,  name:"Extensibility"},  
             {radius: base+ factor * 5, width: 20, speed: 0,show : true,  name:"Customization"},
             {radius: base+ factor * 6, width: 20, speed: 0,show : true,  name:"Availability of Charts"},
             {radius: base+ factor * 7, width: 20, speed: 0,show : true,  name:"Documnatation"},  
             {radius: base+ factor * 8, width: 24, speed: 0,show : true,  name:"Look and Feel"},
             {radius: base+ factor * 9, width: 24, speed: 0,show : true,  name:"Usability"},
             {radius: base+ factor * 10, width: 24, speed: 0,show : true,  name:"Dhoni"}
             
             ];   */

/* var Series =["Infoviz","Protoviz","Axiis","Flare","Raphael","Dundas (Free)","Highcharts ","D3js"]; */




var bkColor ="#DDD";
var tooltip = CustomTooltip("my_tooltip", 200);

var Series1 =[true,true,true,true,true,true,true,true];
var small,svg1,svg2,ring,snames,legend = "";
$.ajax({
    type: "GET",
    url: "resources/csv/chart-wheel/chart-wheel-ring-color.csv",
    dataType: "text",
    success: function(data) {
    	processData(data);
    },error:function(data){
    	alert("Error In Reading CSV File");
    }
 });
function processData(allText) {
	
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {
            for (var j=0; j<headers.length; j++) {
            	colors.push(data[j]);
                ringNames.push(headers[j]);
                rings.push({ colori:j, radius: (base+ factor* (j+1)), width: 24, speed: 0,show : true,  name:headers[j]})
            }
        }
    }
    colors1.push(colors);
    $.ajax({
        type: "GET",
        url: "resources/csv/chart-wheel/chart-wheel-series-range.csv",
        dataType: "text",
        success: function(allText) {
        	console.log(allText)
        	var array = [];
        	var allTextLines = allText.split(/\r\n|\n/);
            var headers = allTextLines[0].split(',');
            Series = headers;
            for (var i=1; i<allTextLines.length; i++) {
                var data = allTextLines[i].split(',');
                isColor2.push(data);
            }
        	 populateChart(colors1);
        },error:function(data){
        	alert("Error In Reading Second File");
        }
     });
    
   
}

function populateChart(colors1){
	   small = superformula();
svg = d3.select("#viz1").append("svg:svg")
 .attr("width", 1024)
 .attr("height", h)
.append("svg:g")
 .attr("transform", "translate(" + (w / 2 +10) + "," + (h / 2 ) + ")scale(.65)");
	
	 svg1 = d3.select("#viz2").append("svg:svg")
 .attr("width", 400)
 .attr("height", 250)
.append("svg:g")
 .attr("transform", "translate(" + 300 *0.8 + "," + h *0.01 + ")scale(.8)");
	
	 svg2 = d3.select("#viz3").append("svg:svg")
 .attr("width", 400)
 .attr("height", 250)
.append("svg:g")
 .attr("transform", "translate(" + 300 *0.8 + "," + h *0.01 + ")scale(.8)");

ring =svg.selectAll("g")
 .data(rings)
.enter().append("svg:g")
 .attr("class", "ring")
 .each(ringEnter);


snames = svg.selectAll(".series")
   .data(Series).enter()
	  .append("text")
	  .attr("class","SeriesText")
	  .attr("x",function(d,i) { return 0+ (400)*Math.cos((Math.PI/4*i)-(Math.PI/6));})
	  .attr("y",function(d,i) { return 0+ (400)*Math.sin(((Math.PI/4*i)-Math.PI/6));})
	  .attr("text-anchor", "middle")
	  .style("fill", function(d,i) { return Series1[i]?"#222":"#aaa"})
	  .text(function(d) { return d; })
	  .on("mouseout", function(d,i) { d3.select(this).style("font-size","18px");})
	  .on("mouseover", function(d,i) { d3.select(this).style("font-size","24px");  barchart1(i)})
	  .on("click", function(d,i) { Series1[i]= !Series1[i]; reload2(); });
		
	
	
legend = svg.selectAll(".legend")
   .data(rings)
 .enter().append("g")
   .attr("class", "legend")
   .attr("transform", function(d, i) { return "translate(20," + ((i * 24)-400) + ")"; })
	  .on("click", function(d, i) {rings[i].show = !rings[i].show ; reload2()})
	  .on("mouseout", function(d,i) { d3.select(this).style("fill","#666");})
	  .on("mouseover", function(d,i) { d3.select(this).style("fill",colors1[getTindex()][i]); barchart(i)}); //console.log(getTindex()+"-"+i+"-"+colors1[getTindex()][i]); 

legend.append("rect")
   .attr("x", 158-w)
   .attr("width", 18)
   .attr("height", 18)
   .style("fill", function(d,i) { return colors1[getTindex()][i]; });

legend.append("text")
   .attr("x", 194 -w)
   .attr("y", 9)
   .attr("dy", ".35em")
   .style("text-anchor", "start")
   .text(function(d) { return d.name; });
	  
	  svg.append("svg:text")
   .attr("class", "title4")
    .attr("transform", function(d, i) { return "translate(-580,-415)"; })
	   .on("click", function(d,i) { slect_AllProperties(d,i,this,true)})
	   .text("Select All");
	   
	 svg.append("svg:text")
   .attr("class", "title4")
   .attr("transform", function(d, i) { return "translate(-500,-415)"; })
	  .on("click", function(d,i) { slect_AllProperties(d,i,this,false)})
	  .text("Deselect All");
	  
	  svg.append("svg:text")
   .attr("class", "title3")
   .attr("transform", function(d, i) { return "translate(300,-415)"; })
	  .on("click", function(d,i) { reslt_allSelection(d,i,this)})
	  .text("[X] Reset");
}
	  

  
	  
  
  function slect_AllProperties (data, i, element,values) {
 
    for(var k=0; k< rings.length; k++)
	{
	 rings[k].show = values;
	}
   reload2(); 
 }
 
 function reslt_allSelection (data, i, element) {
 
      for(var k=0; k< rings.length; k++)
	{
	 rings[k].show = true;
	}
	
	for (var j=0; j< Series1.length; j++)
	 Series1[j] = true;
	 
   reload2(); 
 }
 

  
function ringEnter(d, i) {
  var n = 80,k = 360 / n;cc=0; dim=0;


 d3.select(this).selectAll("g")
    .data(d3.range(n).map(function() { return d; }))
    .enter()
	 .append("path")	 
	 .attr("transform", function(_, i) { return "rotate(" + i * k + ")translate(" + d.radius + ")"; })
	 .attr("fill",  function(d,j) { var ccx=cc++ % 10; if(ccx==0) dim++; var dimx=dim%8;  var x= isColor2[i][dimx] >ccx ? 1:0; d3.select(this).attr("chartName",Series[dimx]); d3.select(this).attr("value1",isColor2[i][dimx]); d3.select(this).attr("ab",x); d3.select(this).attr("dimx",dimx);d.colori=i; return x==1 && Series1[dimx] ? colors1[getTindex()][i] :bkColor;}) //console.log(i +":"+ dimx + ":"+ ccx + "    ="+ isColor1[i][dimx][ccx]); 
    .attr("class", "small")
	.attr("d", small.size((d.width/10 + d.radius)*0.3).type(getShape()))
	.on("mouseover", function(d,i) { show_details(d,i,this)})
	.on("mouseout", function(d,i) { hide_details(d,i,this)})
	  
}


function show_details (data, i, element) {
 
 if(d3.select(element).attr("fill") != bkColor)
 {
    content = ""
    content +="<span class=\"name\"> For: </span> "+ d3.select(element).attr("chartName")+" <br> <span class=\"name\"> Feature:</span> "+ data.name+" <br>  <span class=\"name\">Rating : </span>"+d3.select(element).attr("value1"); 
    tooltip.showTooltip(content,d3.event)
//	  barchart(i);
//barchart1(7);
//console.log(i);
  }
  

  
 }
 
 
 function hide_details (data, i, element) {
      tooltip.hideTooltip();
 }

 var xyz;
function barchart(newdimx) {

if(xyz == null)
{


var bar1=svg.selectAll(".legend1")
      .data(Series)
    .enter().append("g")
      .attr("class", "legend1")
	   .attr("transform", function(d, i) { return "translate(750," + ((i * 30)-400) + ")"; })
      
svg.append("svg:text")
      .attr("class", "title1")
       .attr("transform", function(d, i) { return "translate(500,-430)"; })
	   .text("Comparison of all Charts for: \" " +rings[newdimx].name+" \"");
  bar1.append("rect")
      .attr("x", -100)
	  .attr("y", 2)
	  .attr("rx",5)
      .attr("ry",5)
	  .style("stroke","#eee")
	  .style("stroke-width",2)
      .attr("width", function(d,i) {return 30 * isColor2[newdimx][i]})
      .attr("height", 18)
      .style("fill", function(d,i) { return colors1[getTindex()][newdimx]; });

 bar1.append("text")
      .style("text-anchor", "middle")
	  .attr("class","vals")
	  .attr("x", function(d,i) {return 30 * isColor2[newdimx][i]-90})
	  .attr("y", 7)
	  .attr("dx", -3) // padding-right
      .attr("dy", ".45em") // vertical-align: middle
     .attr("text-anchor", "end") // text-align: right
	 .style("font-size", "14px") // vertical-align: middle
	  
      .text(function(d,i) {  return isColor2[newdimx][i]; });
	  
  bar1.append("text")
      .attr("x", -280)
      .attr("y", 9)
      .attr("dy", ".35em")
	  .style("fill", "#888")
      .style("text-anchor", "start")
      .text(function(d) { return d; });
}
else
{

  svg.selectAll(".legend1 rect").transition().duration(500).attr("width", function(d,i) {return (30 * isColor2[newdimx][i])}).style("fill", function(d,i) { return colors1[getTindex()][newdimx]; });
  svg.selectAll(".legend1 .vals").transition().duration(500).attr("x", function(d,i) {return 30 * isColor2[newdimx][i] -90}).text(function(d,i) {  return isColor2[newdimx][i]; });
  svg.selectAll(".title1").text("Comparison of all Charts for: \" " +rings[newdimx].name+" \"");
}
	xyz=newdimx;
}

var xyzb;
function barchart1(newdimx1) {

if(xyzb == null)
	{
 var bar2=svg.selectAll(".legend2")
		  .data(rings)
		.enter().append("g")
		  .attr("class", "legend2")
		   .attr("transform", function(d, i) { return "translate(750," + ((i * 30)) + ")"; });


		svg.append("svg:text")
		  .attr("class", "title2")
		   .attr("transform", function(d, i) { return "translate(500,-30)"; })
		   .text("Comparison of all properties for: \" " +Series[newdimx1]+" \"");
		   
	  var rects=bar2.append("rect")
		  .attr("x", -100)
		  .attr("class","modern")
		  .attr("y", 2)
		  .attr("width", function(d,i) {return 30 * isColor2[i][newdimx1]})
		  .attr("height",18)
		  .attr("rx",5)
		  .attr("ry",5)
		  .style("stroke","#eee")
		  .style("stroke-width",2)
		  .style("fill", function(d,i) { return colors1[getTindex()][i]; })
		  .attr("svg:title",function(d,i) { return isColor2[i][newdimx1]; });

		  bar2.append("text")
		  .style("text-anchor", "middle")
		  .attr("class","vals")
		  .attr("x", function(d,i) {return 30 * isColor2[i][newdimx1]-90})
		  .attr("y", 11)
		  .attr("dx", -3) // padding-right
		  .attr("dy", ".35em") // vertical-align: middle
		 .attr("text-anchor", "end") // text-align: right
		 .style("font-size", "14px") // vertical-align: middle
		 
		  .text(function(d,i) {  return isColor2[i][newdimx1]; });

	  bar2.append("text")
		  .attr("x", -280)
		  .attr("y", 10)
		  .attr("dy", ".45em")
		  .style("text-anchor", "start")
		   .style("fill", "#888")
		   .text(function(d,i) { return d.name; });
	}
	else
	{
		svg.selectAll(".legend2 rect").transition().duration(500).attr("width", function(d,i) {return (30 * isColor2[i][newdimx1])}).style("fill", function(d,i) { return colors1[getTindex()][i]; });
		svg.selectAll(".legend2 .vals").transition().duration(500).attr("x", function(d,i) {return 30 * isColor2[i][newdimx1] -90}).text(function(d,i) {  return isColor2[i][[newdimx1]]; });
		svg.selectAll(".title2").text("Comparison of all properties for: \" " +Series[newdimx1]+" \"");
	}
	xyzb=newdimx1;
}


function reload1()
{
d3.selectAll(".small").each(function (d, i) { small.size((d.width/10 + d.radius)*0.3).type(getShape()); d3.select(this).attr("d", small);}
	 );
	 
	 
}

function reload2()
{
d3.selectAll(".small").each
	 ( 
		 function (d, i) 
		 {
		 var clr=  rings[d.colori].show && d3.select(this).attr("ab")==1 && Series1[d3.select(this).attr("dimx")] ? colors1[getTindex()][d.colori] :bkColor;
		 d3.select(this).transition().duration(500).attr("fill", clr);
		 d3.selectAll(".SeriesText").data(Series).style("fill", function(d,i) { return Series1[i]?"#222":"#aaa"});
		 }
	 );
	// var ind=getTindex();
	//svg1.selectAll(".legend rect").transition().duration(500).each(function (d, i) {d3.select(this).style("fill", function(d,j) { return rings[i].show ? colors1[ind][i] : "#eee"; })});
	svg.selectAll(".legend rect").transition().duration(500).style("fill", function(d,i) { return rings[i].show ? colors1[getTindex()][i] : "#eee"; });
	barchart(xyz);
	barchart1(xyzb);
}



$('#shareme').sharrre({
	  share: {
	    googlePlus: true,
	    facebook: true,
	    twitter: true,
	    linkedin: true,
		delicious: true
	  },
	  enableTracking: true,
	  buttons: {
	    googlePlus: {size: 'tall'},
	    facebook: {layout: 'box_count'},
	    twitter: {count: 'vertical'},
	    linkedin: {counter:'top'},
		delicious: {size: 'tall'}
	  },
	  hover: function(api, options){
	    $(api.element).find('.buttons').show();
	  },
	  hide: function(api, options){
	    $(api.element).find('.buttons').hide();
	  }
	});


function takeScreenShot() {
	$("#selectedImg").hide();
	$("#draggable").hide();
    
    
    html2canvas(document.body, {
        onrendered: function(canvas) {
            icapture = new ICapture({image: canvas.toDataURL()});
        },
        allowTaint : true,
        useCORS : true
    });     




}

$(document).ready(function(){
	document.onkeydown = function(e) {
        var event = e || window.event;
		if(event.which=="27") {
		    icapture.destroy();
		    icapture = null;
		    $("#draggable").show();
		} 
    }
  } );
    //initiate & destroy icapture on key press
    





    </script>

</body>

</html>