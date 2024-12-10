<!DOCTYPE html>
<html>

<head>
<script src="http://d3js.org/d3.v3.min.js"></script>
<script src="resources/js/word-count-new/word-count-new.js"></script>
<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min.js"></script>
 <script  src="resources/js/jquery-1.6.2.min.js"></script>
</head>
<body>
<script>


var sources = "";
var container = "svg";
var w = 700;
var h = 600;
var wordSize;
var layout;
$(document).ready(function() {
	$.getJSON('read-word-count-data', function(data) {
		sources = data;
		wordSize = 140;
		//var str = d3.select("#input").property("value");
		//var list = str.split(/[\s.,]+/);
		result = { };
		for(i = 0; i < sources.length; ++i) {
			if(!result[sources[i].text])
				result[sources[i].text] = 0;
			++result[sources[i].text];
		} 

		var newList = sources;
		var frequency_list = [];
		var len = newList.length;
		for (var i = 0; i < len; i++) {

			var temp = newList[i].text;
			frequency_list.push({
				text : temp,
				freq : result[newList[i].text],
				time : 0 
			});
	 
		}
		frequency_list.sort(function(a,b) { return parseFloat(b.freq) - parseFloat(a.freq) } );  
	 
	 
		for(var t = 0 ; t < len ; t++)
		{
		var addTime = (100 * t) +500;
		frequency_list[t].time=addTime;
		}


			for(i in frequency_list){
				if(frequency_list[i].freq*wordSize > 160)	
					wordSize = 3;
			}
			
			
	var sizeScale = d3.scale.linear()
	                       .domain([0, d3.max(frequency_list, function(d) { return d.freq} )])
	                                        .range([1, 100]); // 95 because 100 was causing stuff to be missing

		
			layout = d3.layout.cloud().size([w, h])
	        .words(frequency_list)
	        .padding(5)
		    .rotate(function() { return ~~(Math.random() * 2) * 90; })
		    .font("Impact")
		    .fontSize(function(d) { return sizeScale(d.freq); })
			  .on("end",draw)
			  .start();
		/* d3.wordcloud().size([ 800, 250 ]).fill(
				d3.scale.ordinal().range(
						[ "#884400", "#448800", "#888800", "#444400" ])).words(
				sources).onwordclick(function(d, i) {
			tabfilter(d);
		}).start(); */
		
	}).error(function() {
		alert("error");
	});
});

function generate() {
	
    }
    
    
    
    
    function draw(words) {
	
		
		var fill = d3.scale.category20();

		d3.select(container).remove();

        d3.select("body").append(container)
        .attr("width", w)
        .attr("height", h) 
	     	.append("g")
        .attr("transform", "translate(" + [w/2, h/2] + ")")
      	.selectAll("text")
        .data(words)
      	.enter().append("text")
		  
		.transition()
		.duration(function(d) { return d.time}  )
		.attr('opacity', 1)
        .style("font-size", function(d) { return d.size + "px"; })
        .style("font-family", "Impact")
          .style("fill", function(d, i) { return fill(i); })
        .attr("text-anchor", "middle")
		.attr("transform", function(d) {
          return "rotate(" + d.rotate + ")";
        })
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });

    }
	

               
 

</script>

</body>


</html>