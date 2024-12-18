<!DOCTYPE html>
<html>
<head>
<link type="text/css" rel="stylesheet" media="all"
	href="../resources/css/chart-wheel/fancymenu.css" />
<link type="text/css" rel="stylesheet" media="all"
	href="../resources/css/chart-wheel/styles.css" />
<title>..:: Chart Wheel ::..</title>
</head>
<body>
	<h1 style="height: 30px; padding-top: 0px; color: #eee">. . : :
		Chart Wheel : : . .</h1>

	<div class="main"
		style="width: 1024px; height: 605px; margin: 0px auto">
		<div id=viz1 style="width: 1024px; margin: 0px auto">
			<p title="Interpretation of Chart" class="green"
				style="top: 6px; left: 160px;">
				<img src="../resources/images/chart-wheel/14.png" class="spaceTop"
					width="660" height="270" />
			</p>

			<p title="About Chart" class="openTop openLeft blue"
				style="top: 230px; left: 750px;">
				<span
					style="font-size: 16px; color: #1078C7; font-weight: bold; text-decoration: underline">
					About Chart :</span> <br> <span
					style="font-size: 14px; color: #1078C7">While analyzing a
					business requirement, often the necessity is to zero out on few
					charts which would be best in the case. Evaluating all the charts
					repeatedly every time is tedious, so we prepared an index,
					illustrated by a concentric comparison chart, nicknamed chart
					wheel.</span> <img style="width: 450px; padding: 10px;"
					src="../resources/images/chart-wheel/bkdummyimage.png"> </img>


			</p>

			<p title="About Chart Events" class="openTop red"
				style="top: 480px; left: 00px;">
				<img src="../resources/images/chart-wheel/15.png" class="spaceTop"
					width="660" height="370" />
			</p>

			<p title="About Data & Plugins used" class="openTop openLeft black"
				style="top: 530px; left: 700px;">
				<span
					style="font-size: 16px; color: #000; font-weight: bold; text-decoration: underline">
					About Data :</span> <br> <span style="font-size: 14px; color: #333">Data
					used in this Visusalization is dummy for the scenario. Overall
					rating given to each charting tool doesnot have any actual
					significance. However rating at individual attribute level is based
					on our understanding and useage of the tool.</span> <br>
				<br> <span
					style="font-size: 16px; color: #000; font-weight: bold; text-decoration: underline">
					Tools Used :</span> <br> <span style="font-size: 14px; color: #333">
					1. <a style="font-size: 14px; color: #333" href="http://d3js.org/">
						D3Js </a> - for creating visualisation I have used d3js libarary
				</span> <br> <br>
				<br> <span
					style="font-size: 16px; color: #000; font-weight: bold; text-decoration: underline">
					Plugins Used :</span> <br> <span style="font-size: 14px; color: #333">
					1. <a style="font-size: 14px; color: #333"
					href="http://bl.ocks.org/1020902"> D3Js Superformula</a> - for
					shape changeing
				</span> <br> <span style="font-size: 14px; color: #333"> 2. <a
					style="font-size: 14px; color: #333"
					href="http://demo.tutorialzine.com/2010/04/slideout-context-tips-jquery-css3/demo.html">Jquery
						Slideout </a>- for showing cotextual help for chart
				</span> <br> <span style="font-size: 14px; color: #333"> 3. <a
					style="font-size: 14px; color: #333"
					href="http://www.devthought.com/2007/01/29/cssjavascript-true-power-fancy-menu/">Jquery
						Menu </a>- for selecting the shape and theme for chart
				</span> <br> <img style="width: 450px; padding: 10px;"
					src="../resources/images/chart-wheel/bkdummyimage.png"> </img>
			</p>


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
		<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>

		<script type="text/javascript"
			src="../resources/js/tableau-extension/chart-wheel/script.js"></script>
		<script
			src="../resources/js/tableau-extension/chart-wheel/lavalamp.js"
			type="text/javascript"></script>
		<script src="../resources/js/tableau-extension/chart-wheel/d3.js"
			type="text/javascript"></script>
		<script
			src="../resources/js/tableau-extension/chart-wheel/CustomTooltip.js"
			type="text/javascript"></script>
		<script
			src="../resources/js/tableau-extension/chart-wheel/superformula.js"
			type="text/javascript"></script>

		<script src="../resources/js/treemap/tableau-extensions-1.latest.js"></script>
		<script
			src="../resources/js/tableau-extension/chart-wheel/chart-wheel.js"></script>

		<script type="text/javascript">
    function drawMap(Series,isColor2,rings){

    	var w = 760,
    	    h = 600,
    	    start = Date.now();
    		var cc=0,dim=0;

    	var base=100,factor=25;
    		

    	var colors1 =[["#7cb109","#01692c","#008b54","#01d9ff","#016fac","#535ca9","#d0281d","#ff9934","#ec6c3f","#da2a50"],["#023467","#064c91","#175eac","#308dd0","#539fd9","#8fcaec","#010900","#2b3b17","#44583d","#6d7c21","#aaada6"],["#FFCC99","#FF9933","#FFCCCC","#FF99CC","#CC6699","#993366","#660033","#CC0099","#330033","#ff00ff"],["#9d5990","#214e77","#008c92","#44ab8c","#68ac59","#7eb44d","#d5c427","#f99c47","#ee796b","#f397a0"],["#15260f","#386728","#598d46","#a3c098","#a2e5d6","#9593e1","#5652cf","#2c27c3","#1a1775","#080727"]];
    	//var isColor2=[[9,4,4,5,9,8,7,8],[6,7,5,7,7,7,6,7],[8,7,3,8,7,7,6,8],[8,8,6,7,6,6,5,9],[7,7,4,8,8,4,8,8],[6,7,5,7,6,5,6,9],[4,5,7,5,6,5,9,6],[8,6,9,6,7,3,8,8],[7,8,8,7,6,3,8,8],[8,8,7,8,7,5,7,9]];
    	//var rings = [{radius: base+ factor * 1, width: 16, speed: 0,show : true,  name:"Portability"},{radius: base+ factor * 2, width: 16, speed: 0,show : true,  name:"Scalability"},{radius: base+ factor * 3, width: 16, speed: 0,show : true,  name:"Maturity"},  {radius: base+ factor * 4, width: 16, speed: 0,show : true,  name:"Extensibility"},  {radius: base+ factor * 5, width: 20, speed: 0,show : true,  name:"Customization"},{radius: base+ factor * 6, width: 20, speed: 0,show : true,  name:"Availability of Charts"},{radius: base+ factor * 7, width: 20, speed: 0,show : true,  name:"Documnatation"},  {radius: base+ factor * 8, width: 24, speed: 0,show : true,  name:"Look and Feel"},{radius: base+ factor * 9, width: 24, speed: 0,show : true,  name:"Usability"},{radius: base+ factor * 10, width: 24, speed: 0,show : true,  name:"Overall Score"}];

    	var bkColor ="#DDD";
    	var tooltip = CustomTooltip("my_tooltip", 200);

   // 	var Series =["Infoviz","Protoviz","Axiis","Flare","Raphael","Dundas (Free)","Highcharts ","D3js"];
    	var Series1 =[true,true,true,true,true,true,true,true];
    	d3.select("#viz1 svg").remove();
    	var small = superformula();
  	  var svg = d3.select("#viz1").append("svg:svg")
  	    .attr("width", 1024)
  	    .attr("height", h)
  	  .append("svg:g")
  	    .attr("transform", "translate(" + (w / 2 +10) + "," + (h / 2 ) + ")scale(.65)");
  		
  		var svg1 = d3.select("#viz2").append("svg:svg")
  	    .attr("width", 400)
  	    .attr("height", 250)
  	  .append("svg:g")
  	    .attr("transform", "translate(" + 300 *0.8 + "," + h *0.01 + ")scale(.8)");
  		
  		var svg2 = d3.select("#viz3").append("svg:svg")
  	    .attr("width", 400)
  	    .attr("height", 250)
  	  .append("svg:g")
  	    .attr("transform", "translate(" + 300 *0.8 + "," + h *0.01 + ")scale(.8)");

  	var ring =svg.selectAll("g")
  	    .data(rings)
  	  .enter().append("svg:g")
  	    .attr("class", "ring")
  	    .each(ringEnter);


  	var snames = svg.selectAll(".series")
  	      .data(Series).enter()
  		  .append("text")
  		  .attr("class","SeriesText")
  		  .attr("x",function(d,i) { return 0+ (400)*Math.cos((Math.PI/(Series.length/2)*i)-(Math.PI/6));})
  		  .attr("y",function(d,i) { return 0+ (400)*Math.sin(((Math.PI/(Series.length/2)*i)-Math.PI/6));})
  		  .attr("text-anchor", "middle")
  		  .style("fill", function(d,i) { return Series1[i]?"#222":"#aaa"})
  		  .text(function(d) { return d; })
  		  .on("mouseout", function(d,i) { d3.select(this).style("font-size","18px");})
  		  .on("mouseover", function(d,i) { d3.select(this).style("font-size","24px");  barchart1(i)})
  		  .on("click", function(d,i) { 
  			 
  			  Series1[i]= !Series1[i]; reload2(); 
  			tabFilterColumn(d,Series1[i])  
  		  });
  			
  		
  		
  	var legend = svg.selectAll(".legend")
  	      .data(rings)
  	    .enter().append("g")
  	      .attr("class", "legend")
  	      .attr("transform", function(d, i) { return "translate(20," + ((i * 24)-400) + ")"; })
  		  .on("click", function(d, i) {
  			
  			  rings[i].show = !rings[i].show ; reload2();
  			 tabFilterLegend(d);
  			   
  		  })
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
  		  
  	$(document).ready(function () {
  	barchart(rings.length-1);
  	barchart1(7);
  	  });
  	  
  	 function tabFilterColumn(d,state) {
  	  
			      dashboard.worksheets.forEach(function (worksheet) {
			    	 if(state){
			    		   worksheet.clearFilterAsync(d);
			    		 
			    	   }else{
			    		  
				        worksheet.clearFilterAsync(d);
			        	 worksheet.applyFilterAsync(d, [0],
	  				            tableau.FilterUpdateType.Replace);
			    	   }

			      });

     }
  	 var fieldArray = []
  	 $.each(rings,function(i,d){
  		fieldArray.push(d.name)
  	 })
  	 
  	
  	 function tabFilterLegend(d) {
  	  console.log(fieldArray)
			      dashboard.worksheets.forEach(function (worksheet) {
			    	 if(d.show){
			    		 if(fieldArray.contains(d.name)){
			    			 worksheet.clearFilterAsync(name);
				        	 worksheet.applyFilterAsync(name, fieldArray,
		  				            tableau.FilterUpdateType.Replace);
			    		 }else{
			    			 fieldArray.push(d.name)
			    			 worksheet.clearFilterAsync(name);
				        	 worksheet.applyFilterAsync(name, fieldArray,
		  				            tableau.FilterUpdateType.Replace);
			    		 }
			    		   
			    		 
			    	   }else{
			    		   var index = fieldArray.indexOf(d.name);    // <-- Not supported in <IE9
			    		   if (index !== -1) {
			    			   fieldArray.splice(index, 1);
			    			   worksheet.clearFilterAsync(name);
					        	 worksheet.applyFilterAsync(name, fieldArray,
			  				            tableau.FilterUpdateType.Replace);
			    		   }
				        
			    	   }

			      });

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
  	  var n = Series.length*10,k = 360 / n;cc=0; dim=0;


  	 d3.select(this).selectAll("g")
  	    .data(d3.range(n).map(function() { return d; }))
  	    .enter()
  		 .append("path")	 
  		 .attr("transform", function(_, i) { return "rotate(" + i * k + ")translate(" + d.radius + ")"; })
  		 .attr("fill",  function(d,j) { var ccx=cc++ % 10; if(ccx==0) dim++; var dimx=dim%(Series.length);  var x= isColor2[i][dimx] >ccx ? 1:0; d3.select(this).attr("chartName",Series[dimx]); d3.select(this).attr("value1",isColor2[i][dimx]); d3.select(this).attr("ab",x); d3.select(this).attr("dimx",dimx);d.colori=i; return x==1 && Series1[dimx] ? colors1[getTindex()][i] :bkColor;}) //console.log(i +":"+ dimx + ":"+ ccx + "    ="+ isColor1[i][dimx][ccx]); 
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
//  		  barchart(i);
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
    	
    	
    	
    }

    
   
    </script>


		<div id="example3">


			<style type="text/css">
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
</body>

</html>



