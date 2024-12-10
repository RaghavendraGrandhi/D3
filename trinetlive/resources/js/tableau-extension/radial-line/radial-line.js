var dashboard, level1, level = 0,consolidateData = [],fieldNames = [],worksheetName,worksheet,url,map_name,home_url;
$(document).ready(function () {
	url = window.location.href ;
	url_array = url.split("/");
	map_name = url_array[5];
	level=url_array[url_array.length-1];
	home_url=url_array[0]+"/"+url_array[1]+"/"+url_array[2]+"/"+url_array[3]+"/"+url_array[4]+"/"+url_array[5]+"/";

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
	
	  var worksheets = dashboard.worksheets;
	     worksheetName = tableau.extensions.settings.get("worksheet");

	     worksheet = worksheets.find(function (sheet) {
	      return sheet.name === worksheetName;
	    });
	    
	    worksheet.getSummaryDataAsync().then(function (sumdata) {
	    	
	    	 for(var i=0;i<data1.length;i++){
	    	sumdata.columns.forEach(function(c){
	        				  if(c.fieldName == data1[i]){
	        					  columns.push(c.fieldName);
	        					  index.push(c.index)
	        				  }
        			  })
	    	 }
        			  
        			   let list = [];
        	list.push(columns)
        	sumdata.data.forEach(function(d){

  			  var r=[];
  			  for(p=0;p<index.length ; p++){
  				  if(d[index[p]].value!=null && d[index[p]].value!= "%null%")
  				  r.push(d[index[p]].value);
  				  else
  					  r.push("");
  			  }
  		        list.push(r);
  		    
        	})
    		console.log(list)
 		   processData(list);
	  
	    })

	
}
var den ;
var filterColumn="";
function processData(list) {
	var arrayObj = [];
	var countArr = [];
	var list1=[];
	$.each(list,function(i,d){
		if(i!=0){
			countArr.push(parseInt(d[1]));
			list1.push(d)
			
		}else{
			filterColumn=d[0];
		}
	});
	
	 getDenaminator(Math.max(...countArr),0)

	 list1.sort(sortFunction);

		function sortFunction(a, b) {
		    if (a[1] === b[1]) {
		        return 0;
		    }
		    else {
		        return (a[1] < b[1]) ? -1 : 1;
		    }
		}
	console.log(list1)
	$.each(list1,function(i,d){
		
			var obj = {
					term:d[0],
					count: parseInt(d[1])/den
			}
			arrayObj.push(obj)
		
	});
	 
	
	drawMap(arrayObj);
}

function getDenaminator(x,i) {
	den=1;
	if(x>10){
		getDenaminator(x/10,++i)
	}else{
		
		
		for(j=0;j<i;j++){
			den = den*10;
		}
		
		
	}
	
}
var myVar = null;
function drawMap(list){
	var dt=list;
	// d3.select("body").html("");
	var div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);
	 var types=[{name:" ",color : "#009999",dcolor:"#006666"}];
	
	 if(myVar != null){
		 clearInterval(myVar);
	 }

	    var width = 550,
	     height = 600,
	     twoPi = 2 * Math.PI,
	     progress = 0,
	     total = 1308573, // must be hard-coded if server doesn't report Content-Length
	     formatPercent = d3.format(".0%");
	    d3.select("#rcharts").html("");
	   
	    var svg = d3.select("#rcharts").append("svg")
	    .style("padding-left","50px")
	     .attr("width", width)
	     .attr("height", height)
	      .append("g")
	     
	     .attr("transform", "translate(" + 30 + "," + -130 + ")");

	     var baseRad=12, cgap=12,maxVal=11;
	     
	    var cx1=300,cy1=450,el="p0",cl="c0",tl="t0",ind=0,rad;
	    
	   rad=baseRad;
	     svg.selectAll(".p0")
	     .data(dt)
	     .enter()
	     .append("path")
	      
	     .each(ringEnter);
	     rad=baseRad; 
	    svg.selectAll(".C0").data(dt)
	     .enter()
	     
	     .append("circle")
	     
	     .each(cEnter)
	       		
	    .on("click",function(d){
	    	clearInterval(myVar)
	    	console.log(myVar)
	    	$(".tooltip").html(d.term+": "+d.count*den)
	    	tabFilter(d)})
	    	 
	     .on ("mouseout", function(){state = true;
	     clearInterval(myVar)
	     	myVar = setInterval(myTimer, 1000);
	     });
	     
	     var k=0;
	     
	    console.log(dt)
	    function myTimer() {
	    
	    	if(k < dt.length){
		    	$(".tooltip").html(dt[k].term+": "+dt[k].count*den)
		    	k++;
	    	}
	    	else
	    		k=0;
	     
	    }

	     
	    var txtxas= svg.selectAll(".txC0").data(dt)
	     .enter()
	     .append("svg:text")
	       .attr("class", "Today")
	       .style("font-size", "12px")
	        .style("font-family", "calibri")
	        
	        .style("fill",types[ind].dcolor)
	        .attr("transform", function(d, i) 
			{ var xx=cx1-3; 
			return "translate("+xx+","+((cy1/3)*2-((cgap)*i))+")"; 
			})
	        .attr("text-anchor", "end")
	        .text( function(d, i) {  return getSnip(d.term,31) });

	    txtxas.append("title")
	       .text(function(d) { return d.term+" ("+d.count+")"; });
	       
	       svg.append("svg:text")
	       .attr("class", "Today")
	       .style("font-size", "26px")
	       .style("fill",types[ind].dcolor)
	       .style("font-family", "Iceland")
	        .attr("transform", function(d, i) 
			{ 
			return "translate("+(cx1-30)+","+(cy1+8)+")"; 
			})
	      .text(types[ind].name);//.on("click",function(d){tabFilter(d)});
	       var state =true;
	       function tabFilter(d) {
	    	   console.log(state)
	    	  
 				      dashboard.worksheets.forEach(function (worksheet) {
 				    	 if(d == "clearAll" && state){
 				    		   worksheet.clearFilterAsync(filterColumn);
 				    		  clearInterval(myVar)
 				 	     	myVar = setInterval(myTimer, 1000);
 				    	   }else if(d != "clearAll"){
 				    		   state = false;
 				    		   console.log(d)
	  				        worksheet.clearFilterAsync(filterColumn);
 				        	 worksheet.applyFilterAsync(filterColumn, [d.term],
 		  				            tableau.FilterUpdateType.Replace);
 				    	   }

 				      });

	       }
	       myVar = setInterval(myTimer, 1000);
	       div.transition()		
           .duration(200)		
           .style("opacity", .9)
           .style("left", 330 + "px")
	       .style("top",330+ "px")
	       . html();
           		
	      
	       
	    function ringEnter(d, i) {
	       
	       var ratio = d.count/maxVal;
	       var arc = d3.svg.arc().startAngle(0).innerRadius(5+cgap*rad).
		   outerRadius(5+cgap*rad+1).endAngle(twoPi*ratio);
	       d3.select(this)
	        .attr("transform", "translate(" + cx1 + "," + cy1+ ")")
	        
	        .attr("class",el)
	        .attr("d", arc)
	        .style("fill",types[ind].color);  
	        rad++;
	      }
	      
	     function cEnter(d, i) {
	       
	       var ratio = d.count/maxVal;
	      // console.log(ratio);
	       d3.select(this)
	         .attr("transform", "translate(" + cx1 + "," + cy1 + ")")
	         .on("mouseover", function(d) {		
		           
		            clearInterval(myVar)
		            $(".tooltip").html(d.term+": "+Math.round(d.count * den))
		           
            })
	         .attr("class",cl)
	         .attr("cx",function(d,i) { return  (5+cgap*rad)*Math.cos(twoPi*ratio-twoPi/4);})
	         .attr("cy",function(d,i) { return  (5+cgap*rad)*Math.sin(twoPi*ratio-twoPi/4);})
	         .style("fill",types[ind].dcolor)
	         .attr("r", 3);
	         rad++;
	      }
	     function tEnter(d, i) {
	    	 
	    	 var ratio = d.count/maxVal;
	    	 // console.log(ratio);
	    	 d3.select(this)
	    	 
	    	 .attr("transform", "translate(" + cx1 + "," + cy1 + ")")
	    	 .attr("class",tl)
	    	 .attr("cx",function(d,i) { return  (5+cgap*rad)*Math.cos(twoPi*ratio-twoPi/4);})
	    	 .attr("cy",function(d,i) { return  (5+cgap*rad)*Math.sin(twoPi*ratio-twoPi/4);})
	    	 .style("fill",types[ind].dcolor)
	    	 .text(d.count)
	    	
	     }
		  function getSnip(text, len)
	    {
	      if(text.length > len)
	     return text.substring(0,len) +"..";
	      else
	      return text;
	    }  
		 
}


function configure() {

	
	const popupUrl = home_url+`configure`;
	
	tableau.extensions.ui.displayDialogAsync(popupUrl, 0, { height: 500, width: 500 }).then((closePayload) => {
		constructData();
		const filterEvent = tableau.TableauEventType.FilterChanged;
		worksheet.addEventListener(filterEvent, function (selectionEvent) {
			console.log(selectionEvent)
			constructData();
		});
		//
	
		
	}).catch((error) => {
		
		switch (error.errorCode) {
			case tableau.ErrorCodes.DialogClosedByUser:
				
				console.log("Dialog was closed by user");
				break;
			default:
				console.error(error.message);
		}
	});
}

