var dashboard, level1, level = 0,consolidateData = [],fieldNames = [],url,map_name,home_url;
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
	dashboard.worksheets.forEach(function (worksheet) {
        worksheet.getDataSourcesAsync().then(function (datasources) {
          datasources.forEach(function (datasource) {
        	  console.log(datasource)
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
        		  // let values = list.filter((el, i, arr) => arr.indexOf(el)
					// === i);
        		  consolidateData = list;
        		  console.log(list);
        		   drawMap(list);

        	  })
         
          })
          
       
        })
	})

}


function configure() {

	
	const popupUrl = home_url+`configure`;
	
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
   

function drawMap(list) {
	var status = true;
	d3.select("body").html("")
	var svg = d3.select("body")
		.append("svg")
		.append("g")

	svg.append("g")
		.attr("class", "slices");
	svg.append("g")
		.attr("class", "labels");
	svg.append("g")
		.attr("class", "lines");

	var width = 960,
	    height = 450,
		radius = Math.min(width, height) / 2;

	var pie = d3.layout.pie()
		.sort(null)
		.value(function(d) {
			return d.value;
		});

	var arc = d3.svg.arc()
		.outerRadius(radius * 0.8)
		.innerRadius(radius * 0.4);

	var outerArc = d3.svg.arc()
		.innerRadius(radius * 0.9)
		.outerRadius(radius * 0.9);

	svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	var key = function(d){ return d.data.label; };
	var domain=[];
	var range =[];
	var fil;
	$.each(list,function(i,d){
		if(i!= 0){
			
		domain.push(d[0])
		range.push(d[1])
		}else{
			fil=d[0]
		}
	})

	var color = d3.scale.ordinal()
		.domain(domain)
		.range(range);

	function randomData (){
		var labels = color.domain();
		return labels.map(function(label){
			return { label: label, value: Math.random() }
		});
	}

	change(randomData());

	
	 setInterval(function(){ 
		 if(status)
		 change(randomData());
		 
	 }, 1000);
	 
	 function tabFilter(d) {
		 	
			tableau.extensions.initializeAsync().then(function () {
			      const dashboard = tableau.extensions.dashboardContent.dashboard;

			      dashboard.worksheets.forEach(function (worksheet) {
			    	if(status){
				        	 worksheet.clearFilterAsync(fil)
			    	}else{
			        	 worksheet.applyFilterAsync(fil, [d.data.label],
	  				            tableau.FilterUpdateType.Replace);
			    	}

			      });

			      d3.selectAll(".inline-loader").classed("inline-loader",false);

			    }, function (err) {
			      // Something went wrong in initialization.
			      console.log('Error while Initializing: ' + err.toString());
			    });

	}
	 function handleMouseOver(d){
		 
		 status = false;
		 tabFilter(d)
	 }
	 function handleMouseOut(d){
		 
		 status = true;
		 tabFilter(d)

	 }
	function change(data) {

		/* ------- PIE SLICES -------*/
		var slice = svg.select(".slices").selectAll("path.slice")
			.data(pie(data), key);

		slice.enter()
			.insert("path")
			.style("fill", function(d) { return color(d.data.label); })
			.attr("class", "slice").on("mouseover", function(d) {handleMouseOver(d)})
	          .on("mouseout", function(d) {handleMouseOut(d)});

		slice		
			.transition().duration(1000)
			.attrTween("d", function(d) {
				this._current = this._current || d;
				var interpolate = d3.interpolate(this._current, d);
				this._current = interpolate(0);
				return function(t) {
					return arc(interpolate(t));
				};
			});

		slice.exit()
			.remove();

		/* ------- TEXT LABELS -------*/

		var text = svg.select(".labels").selectAll("text")
			.data(pie(data), key);

		text.enter()
			.append("text")
			.attr("dy", ".35em")
			.text(function(d) {
				return d.data.label;
			});
		
		function midAngle(d){
			return d.startAngle + (d.endAngle - d.startAngle)/2;
		}

		text.transition().duration(1000)
			.attrTween("transform", function(d) {
				this._current = this._current || d;
				var interpolate = d3.interpolate(this._current, d);
				this._current = interpolate(0);
				return function(t) {
					var d2 = interpolate(t);
					var pos = outerArc.centroid(d2);
					pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
					return "translate("+ pos +")";
				};
			})
			.styleTween("text-anchor", function(d){
				this._current = this._current || d;
				var interpolate = d3.interpolate(this._current, d);
				this._current = interpolate(0);
				return function(t) {
					var d2 = interpolate(t);
					return midAngle(d2) < Math.PI ? "start":"end";
				};
			});

		text.exit()
			.remove();

		/* ------- SLICE TO TEXT POLYLINES -------*/

		var polyline = svg.select(".lines").selectAll("polyline")
			.data(pie(data), key);
		
		polyline.enter()
			.append("polyline");

		polyline.transition().duration(1000)
			.attrTween("points", function(d){
				this._current = this._current || d;
				var interpolate = d3.interpolate(this._current, d);
				this._current = interpolate(0);
				return function(t) {
					var d2 = interpolate(t);
					var pos = outerArc.centroid(d2);
					pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
					return [arc.centroid(d2), outerArc.centroid(d2), pos];
				};			
			});
		
		polyline.exit()
			.remove();
	};

}


