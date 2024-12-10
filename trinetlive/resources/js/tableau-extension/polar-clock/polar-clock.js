var dashboard, level1, level = 0,consolidateData = [],fieldNames = [];
$(document).ready(function () {
	url = window.location.href ;
	url_array = url.split("/");
	map_name = url_array[5];
	level=url_array[url_array.length-1];
	

	tableau.extensions.initializeAsync({ 'configure': configure }).then(function () {

		dashboard = tableau.extensions.dashboardContent.dashboard;
		
		
		configure();
	
		
		
	});

});
function constructData() {
	var columns =[];
	var index = []
	
	
	var data1 = [];
	for(var x=1;x<=2;x++){
		data1.push(tableau.extensions.settings.get("level"+x))
	}
	console.log(data1)
	dashboard.worksheets.forEach(function (worksheet) {
        worksheet.getDataSourcesAsync().then(function (datasources) {
          datasources.forEach(function (datasource) {
        	  console.log(datasource)
        	//  if(datasource.name == "Sheet 1 (coffeewheel)" || datasource.name == "Sheet 1 (Coffee wheel)"){
        	  datasource.getUnderlyingDataAsync().then(function(datatable){

        				  for(var i=0;i<data1.length;i++){
        					  datatable.columns.forEach(function(c){
        						  if(c.fieldName != "Number of Records"){
	        				  if(c.fieldName == data1[i]){
	        					  columns.push(c.fieldName);
	        					  index.push(c.index)
	        				  }
        				  }
        			  })
        		  }
        	  })
        	 fieldNames = columns;
        	 
        	  datasource.getUnderlyingDataAsync().then(function(datatable){
        		  let list = [];
        		  list.push(columns)
        		  for (let row of datatable.data) {
        			  var r=[];
        			  for(p=0;p<index.length ; p++){
        				  if(row[index[p]].value!=null && row[index[p]].value!= "%null%")
        				  r.push(row[index[p]].value);
        				  else
        					  r.push("");
        			  }
        		        list.push(r);
        		    }
        		 
        		
        		
        		   processData(list);

        		
        	  })
         
          })
          
       
        })
	})
	 
}
function processData(list) {
	var arrayObj = [];
	$.each(list,function(i,d){
		if(i!=0){
			var obj = {
					index:parseFloat(d[0]),
					value: Math.random()
			}
			arrayObj.push(obj)
		}
	});
	drawMap(arrayObj);
}

function drawMap(list){
	var width = 960,
    height = 800,
    radius = Math.min(width, height) / 1.9,
    spacing = .08;

var color = d3.scale.linear()
    .range(["hsl(-180,50%,50%)", "hsl(180,50%,50%)"])
    .interpolate(interpolateHsl);

var arc = d3.svg.arc()
    .startAngle(0.0)
    .endAngle(function(d) { return (d.value * 2 * Math.PI); })
    .innerRadius(function(d) { return d.index * radius; })
    .outerRadius(function(d) { return (d.index + spacing) * radius; });
var formatter = d3.format(".2%");
d3.select("body").html("")
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
	
	var gradient = svg
    .selectAll("linearGradient").data(fields).enter()
    .append("linearGradient")
    .attr("y1", "0%")
    .attr("y2", "0%")
    .attr("x1", "0%")
    .attr("x2", "100%")
    .attr("gradientUnits", "objectBoundingBox")
    .attr('id', function(d){return "gradient-"+d.index*10})
    gradient.append("stop")
	.attr("offset", "0%")
	.attr("stop-opacity", "1")
    .attr("stop-color", function(d){return color(d.index);});
    gradient.append("stop")
	.attr("offset", function(d){return 30+"%"})
	.attr("stop-opacity", ".5")
	.attr("stop-color", function(d){return color(d.index);});
    gradient.append("stop")
	.attr("offset",  function(d){return 80+"%"})
	.attr("stop-opacity", "0.7")
	.attr("stop-color", function(d){return color(d.index);});
	
	
	var field = svg.selectAll("g")
    .data(fields)
	.enter().append("g");

	field.append("path");
	field.append("rect");
	field.append("text");	
		
	d3.transition().duration(0).each(tick);
	d3.select(self.frameElement).style("height", height + "px");

	function tick() {
		field = field
      .each(function(d) { this._value = d.value; })
	  .data(fields)
      .each(function(d) { d.previousValue = this._value; });

  field.select("path")
    .transition()
      .ease("linear")
      .attrTween("d", arcTween)
	  .style("opacity", function(d) { return .7; })
      .style("fill", function(d) { return color(d.index); });

  field.select("text")
	.attr("x", function(d) { return -( ((fields().length /10) + spacing) * radius) - 50  ; })
	.attr("y",function(d) { return -(((d.index + spacing) * radius)) + 20; })
    .text(function(d) { return formatter(d.value ); })
	.style("font-size","15px")
    .transition()
      .ease("linear")
      .attr("transform", function(d) {
        return "rotate(0)"
            + "translate(0,0)"
            + "rotate(0)"
      });


	field.select("rect")
	.attr("x", function(d) { return  -( ((fields().length /10) + spacing) * radius) - 100  ; })
	.attr("y",function(d) { return -(((d.index + spacing) * radius)); })
	.attr("height",function(d) { return ((d.index + spacing) * radius)-(d.index * radius)})
	.attr("width",function(d) { return  ((fields().length /10) + spacing) * radius + 90 ;})
	.text(function(d) { return formatter(d.value); })
	.attr("fill", function(d){return "url(#gradient-"+ d.index*10 +")"})
    .transition()
	.attr("transform", function(d) {
        return "rotate(0)"
		+ "translate(0,0)"
		+ "rotate(0)"
	});
	
	  setTimeout(tick, 3000);
}

function arcTween(d) {
  var i = d3.interpolateNumber(d.previousValue, d.value);
  return function(t) { d.value = i(t); return arc(d); };
}

function fields() {
	var arrObj=[];
	$.each(list,function(i,d){
		var obj={
				index:d.index,
				value:Math.random()
		}
		arrObj.push(obj)
	})
	console.log(arrObj)
   return arrObj
}


// Avoid shortest-path interpolation.
function interpolateHsl(a, b) {
  var i = d3.interpolateString(a, b);
  return function(t) {
    return d3.hsl(i(t));
  };
}
}

function configure() {

	
	const popupUrl = `https://peoples.io/trinetlive/trex/polar-clock/configure`;
	
	tableau.extensions.ui.displayDialogAsync(popupUrl, 0, { height: 500, width: 500 }).then((closePayload) => {
		constructData();

	}).catch((error) => {
		
		switch (error.errorCode) {
			case tableau.ErrorCodes.DialogClosedByUser:
				 drawMap();
				console.log("Dialog was closed by user");
				break;
			default:
				console.error(error.message);
		}
	});
}
