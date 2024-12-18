<!DOCTYPE html>
<meta charset="utf-8">
<style>

  html { color: #585858; background-color: #fff; }
  body { font-size: 13px; font-family: 'Helvetica',Helvetica,Arial,sans-serif; }
  h1,h2,h3,h4,h5,h6,strong{ font-weight:bold; }
  h1 { color: #585858; font-size: 28px; font-weight: lighter; }
  h2 { color: #585858; font-size: 21px; font-weight: lighter;  }
  p { margin: 0; padding: 5px 0; color: #585858; font-size: 13px; font-weight: lighter; }
  ol, ul, dl { margin-bottom: 1em; line-height: 1.2em; }
  ol, ul { margin-left: 1.5em; }
  ol li { list-style: decimal; }
  blockquote { font-weight: bold; font-style: italic; }
  blockquote p { padding: 10px 0 0 0; }
  a { color:#206dd6;text-decoration:none; }
  sup { vertical-align: super; height: 0; font-size: 10px; }
  h1 sup, h2 sup, h3 sup { vertical-align: super; height: 0; font-size: 12px; }

  abbr,acronym {border-bottom:1px dotted #000;cursor:help;}
  em{font-style:italic;}
  strong{font-weight:bold;}
  del{text-decoration:line-through; }

  .clear { clear: both; display: block; height: 0; overflow: hidden; visibility: hidden; width: 0; }
  .clearfix:after { clear: both; content: "."; display: block; height: 0; visibility: hidden; }

  /* D3 SVG common styles */
  svg text { pointer-events: none; }
  .axis path, .axis line { fill: none; shape-rendering: crispEdges; }
  .bar { fill: steelblue; }
  .y text { fill: #7d7d7d; font-family: 'Arial Narrow', Arial, sans-serif; font-stretch: condensed; font-size: 11px; }
  .legend { font-weight: bold; font-size: 13px; }
  .d3charts { position: relative; clear: both; }
  .d3charts h4 { margin: 5px 0 15px 84px; font-size: 16px; color: #7d7d7d; font-weight: bold; text-transform: uppercase; }

  /* D3 tooltip */
  .d3-tip { width: 100px; line-height: 1; font-weight: bold; padding: 10px; background: transparent; color: #f5fafa; border-radius: 2px; text-align: left; pointer-events: none; }
  .d3-tip strong { text-transform: uppercase; font-size: 10px; font-weight: lighter; letter-spacing: normal; pointer-events: none; }
  .d3-tip span { display: inline-block; padding: 0; font-size: 18px; pointer-events: none; }

  #annualYieldsChart { margin:0; padding: 10px 0 0; }
  #annualYieldsChart .title { text-transform: uppercase; font-weight: bold; }
  #annualYieldsChart .line { stroke-width: 3px; }
  #annualYieldsChart .grid-background { fill: #f9f9f9; }
  #annualYieldsChart .grid .tick { stroke: #fff; stroke-opacity: 0.7; shape-rendering: crispEdges; }
  #annualYieldsChart .grid path { stroke-width: 1; opacity: 0.7; stroke: #fff; }
  .annual-yields-year-axis { 
    position: relative; width: 100%; margin: 70px 0 0 0; clear: both; height: 32px;
    -webkit-box-shadow: 0px 10px 4px 0px rgba(209,209,209,1); -moz-box-shadow: 0px 10px 4px 0px rgba(209,209,209,1); box-shadow: 0px 10px 4px 0px rgba(209,209,209,1);
  }
  .annual-yields-year-axis ul { margin: 0 0 0 80px; list-style-type: none; }
  .annual-yields-year-axis li { float: left; width: 22px; margin: 0; padding: 0 0 3px 1px; border-bottom: 14px solid #ebf3f5; color: #b6b6b6; font-size: 22px; text-align: center; }
  .annual-yields-year-axis span { display: inline-block; text-indent: -99999em; }
  .annual-yields-year-axis span.marked { text-indent: 0; }
  #annualYieldsChart .axis path,
  #annualYieldsChart .axis line { fill: none; stroke: none; stroke-width: 1; shape-rendering: crispEdges; }
  #annualYieldsChart .yAxis line  { opacity: 0; }
  #annualYieldsChart .overlay { fill: none; pointer-events: all; }
  #annualYieldsChart .focus circle { fill: none; }
  #annualYieldsChart .axis path, #annualYieldsChart .axis line { fill: none; stroke: #f8f8f8; shape-rendering: crispEdges; }
  #annualYieldsChart .x.axis line { fill: none; stroke: #e4e4e4; shape-rendering: crispEdges; opacity: 0; }
  #annualYieldsChart path.domain { opacity: 0; }
  .annual-yield-chart-divider { margin: 25px auto 20px; }
  #annualYieldsChart .x text { fill: #7d7d7d; font-family: 'Arial Narrow', Arial, sans-serif; font-stretch: condensed; font-size: 11px; }
  #annualYieldsChart .annual-yield-grid-background { fill: #f1f1f1; }
  #annualYieldsChart .year-legend { text-transform: none; font-weight: normal; }
  #annualYieldsChart .legend-grade text { font-weight: bold; text-transform: normal; }
  #annualYieldsChart .legend-controls-annual-yields text { font-weight: bold; text-transform: normal; }

  .source { margin: 0 10px 10px 80px; }


</style>
<body>
  
  <div id="annualYieldsChart" class="d3charts"></div>

  <div class="source">
   
  </div>


  <script src="http://d3js.org/d3.v3.min.js"></script>
  <script src="http://labratrevenge.com/d3-tip/javascripts/d3.tip.v0.6.3.js"></script>
  <script>

    var dataSource = "../resources/csv/annual_yields_36M_All.csv";
    renderAnnualYieldsChart(dataSource);


    function renderAnnualYieldsChart(dataSource) {

      var margin = {top: 50, right: 50, bottom: 30, left: 80},
      canvasHeight = 370,
      width = 830,
      height = 380 - margin.top - margin.bottom;

      var x = d3.scale.ordinal().rangeRoundBands([0, width], 0),
      y = d3.scale.linear().range([height, 0]),
      xAxis = d3.svg.axis().scale(x).orient("bottom").tickFormat(""),
      yAxis = d3.svg.axis().scale(y).orient("left").tickFormat(function(d){ return d + "%"; });

      /* Lines */
      var line = d3.svg.line()
      .interpolate("basis") 
      .x(function(d) { return x(d.month); })
      .y(function(d) { return y(d.percentage); });

      /* Canvas */
      var svg = d3.select("#annualYieldsChart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", canvasHeight)
      .attr({"margin-top": margin.top, "margin-left":0})
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


      /* Set background */
      svg.append("rect").attr("class", "annual-yield-grid-background").attr({"height": 300, "width": 805, "x": 1, "y":0});

      /* Chart title */
      svg.append("text")
      .attr("class", "title")
      .attr("x", 174).attr("y", -25).attr("text-anchor", "middle")  
      .style({"font-size":"18px", "fill":"#7d7d7d" }) 
      .text("Net Annualized Return by Vintage");

      /* Legend: Term controls */
      svg.append("text").attr({"x": 410, "y": -25}).text("Term")
      .style({"fill":"#a1a1a1", "font-family": "Arial Narrow"});

      var colorLegend = d3.scale.ordinal().range(["#5278a5", "#6ec6e2", "#5aa335", "#89c540", "#eae200", "#ffca2c", "#f7951e", "#a1a1a1"]),
      legendData = ["A","B","C","D","E","FG","All"],
      termsControls = ["36","60"],
      defaultPageLoad = true;


      var legendControls = svg.selectAll(".legend")
      .data(termsControls)
      .enter().append("g")
      .attr("class", "legend-controls-annual-yields")
      .attr("id", function(d, i) { return  "term-" + d;})
      .attr("transform", function(d, i) { 
        var grades = termsControls.length;
        return "translate(-" + (((grades - i) * 31 + (width/4))) + ", -43)"; }
        );
      legendControls.append("rect")
      .attr("x", width - 118).attr("width", 26).attr("height", 26)
      .attr("class", function(d) { return "avg-stated-interest-control" + d;})
      .style({"fill":"#a1a1a1", "cursor":"pointer"});
      legendControls.append("text").attr("x", 719)
      .attr("y", 14).attr("dy", ".25em").attr("class", function(d){ return ("term-control-" + d); })
      .text(function(d) { return d; }).style({"fill":"#fff", "cursor": "pointer"});

      /* Legend: Grades */
      colorLegend.domain(legendData);
      svg.append("text").attr({"x": 551, "y": -25}).text("Grade").style({"fill":"#a1a1a1", "font-family": "Arial Narrow"});

      var legend = svg.selectAll(".legend")
      .data(colorLegend.domain().slice()).enter().append("g").attr("class", "legend-grade")
      .attr("id", function(d, i) { return  "grade-" + d;})
      .attr("transform", function(d, i) { 
        var grades = legendData.length;
        return "translate(-" + (((grades - i) * 31) - 29) + ", -43)"; }
        );
      legend.append("rect")
      .attr("x", width - 52).attr({"width": 26,"height": 26})
      .attr("class", function(d) { return "rect-grade-" + d; })
      .style({"fill": colorLegend, "cursor":"pointer"});
      legend.append("text").attr("x", width - 44)
      .attr("y", 14).attr("dy", ".25em")
      .text(function(d,i) { return d; })
      .style({"fill": "#fff", "cursor": "pointer"})
      .attr("font-weight", function(d, i){
        if (d === "All") { return ("normal"); } else { return ("bold"); }
      })
      .attr("text-transform", function(d, i){
        if (d === "All") { return ("none"); } else { return ("uppercase"); }
      });

      /* Static UI elements */
      d3.select("#annualYieldsChart").select(".rect-grade-All").style({"fill":"#a1a1a1", "font-weight":"bold"}).attr({"width":30});
      d3.select("#annualYieldsChart").select("#grade-FG").select("text").attr({"x":782});


      /* Using for loop to draw multiple vertical lines */
      var drawVerticalGridLines = function(gridWidth){
        for (var j=gridWidth; j <= width; j=j+gridWidth) {
          svg.append("svg:line")
          .attr("class", "vertical-grid-lines")
          .attr("x1", j-gridWidth)
          .attr("y1", 0)
          .attr("x2", j-gridWidth)
          .attr("y2", height)
          .style("stroke", function(){
            return j%3===0 ? "#e4e4e4" : "#f8f8f8";
          })
          .style("stroke-width", 1.5);
        };
      };


      /* Draw chart */
      var drawData = function(data, dataTerm){
        var colorVintage = [];
        if (dataTerm === "36") {
          colorVintage = d3.scale.ordinal().range(["#784a1c", "#007070", "#c70076", "#8f62cc", "#45bdbd", "#e996c8"]);
        } else {
          colorVintage = d3.scale.ordinal().range(["#c70076", "#8f62cc", "#45bdbd", "#e996c8"]);
        }
        /* Mapping data */
        colorVintage.domain(d3.keys(data[0]).filter(function(key) { return key !== "Months"; }));
        var vintageGrades = colorVintage.domain().map(function(name) {
          return {
            name: name,
            values: data.map(function(d) {
              var percentValue = d[name];
              if(percentValue !== "") { percentValue = +d[name] }
                return {month: +d.Months, percentage: percentValue};
            })
          };
        });

        /* Remove some rows that percentage is null */
        for(var i in vintageGrades){
          var values = vintageGrades[i].values;
          for(var j = values.length-1 ; j>=0 ; j--){
            if(values[j].percentage === ""){
              values.splice(j,1);
            }
          }
        }

        /* Set data for X Axis */
        x.domain(data.map(function(d,i) { return d.Months ; }));
        svg.append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis).append("text");


        /* Set data for Y Axis */
        var vintageMinPercentage = d3.min(vintageGrades, function(c) {
          return d3.min(c.values, function(v) { return v.percentage; });
        }),
        vintageMaxPercentage = d3.max(vintageGrades, function(c) {
          return Math.ceil(d3.max(c.values, function(v) { return v.percentage; })); 
        }),
        resetVintageMin = vintageMinPercentage > 0 ? 0 : -5; /* -5 is the default hard coded negative percentage */

        if (vintageMaxPercentage % 5 === 0) {
          vintageMaxPercentage = vintageMaxPercentage + 5;
        } else {
          vintageMaxPercentage = vintageMaxPercentage + 5 - (vintageMaxPercentage%5);
        }
        y.domain([ resetVintageMin, vintageMaxPercentage ]);
        svg.append("g")
        .attr("class", "y axis yAxis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)");

        /* Draw line for each vintage year - Data */
        var vintage = svg.selectAll(".vintage")
        .data(vintageGrades).enter()
        .append("g")
        .attr("class", "vintage");

        vintage.append("path")
        .attr("class", "line")
        .attr("d", function(d) { return line(d.values); })
        .style("stroke", function(d) { return colorVintage(d.name); })
        .style("fill-opacity", 0)
        .attr("id", function(d) { return d.name; })
        .on("mouseout", function() { tooltip.style("display", "none"); })
        .on("mouseover", function(d) {
          var xPosition = d3.mouse(this)[0],
          yPosition = d3.mouse(this)[1];
          tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")")
          .style({"display": "block"})
          .attr("fill",function() { return colorVintage(d.name); });
          tooltip.select("text").text(function(){ return d.name; });
        });


        /* Animation */
        /* Note: Firefox will crash after a number of animation loops, put a lazy check */
        if(window.navigator.userAgent.toLowerCase().indexOf('firefox') <  0){
          d3.select("#annualYieldsChart").selectAll("path.line").each(function(d,i) {
            var eachPath = d3.select(this),
            totalLength = eachPath.node().getTotalLength();
            eachPath.attr("stroke-dasharray", totalLength + " " + totalLength)
            .attr("stroke-dashoffset", totalLength)
            .transition()
            .duration(1800)
            .ease("linear")
            .attr("stroke-dashoffset", 0);
          });
        }


        /* Grid horizontal lines */
        svg.insert("g", ".vintage")         
        .attr("class", "y axis")
        .attr("transform", "translate(0,0)")
        .call(d3.svg.axis().scale(y)
          .orient("left")
          .tickSize(-805, 0, 0)
          .tickFormat("")
          );

        /* Month ticks for Grid vertical lines */
        svg.insert("g", ".vintage")         
        .attr("class", "x axis")
        .attr("transform", "translate(-10,0)")
        .call(d3.svg.axis().scale(x).orient("bottom").tickSize(height, height, 0));

        d3.select("#annualYieldsChart").select(".x").selectAll(".tick line").style({"opacity": "0", "stroke-width": "0"});

        /* Tooltip, initial display is hidden */
        var tooltip = svg.append("g")
        .attr("class", "tooltip")
        .style("display", "none");

        tooltip.append("rect")
        .attr("width", 50)
        .attr("height", 20)
        .attr("rx","5").attr("ry","5")
        .style("opacity", 1);

        tooltip.append("text")
        .attr("x", 25) .attr("dy", "1.2em")
        .style("text-anchor", "middle")
        .attr({"font-size":"12px", "fill":"#fff"});

        /* Legend: year */
        svg.append("text").attr("x", 821)
        .attr("class", "year-legend-label")
        .attr("y", 10).attr("dy", ".25em")
        .text("Vintage")
        .style({"fill":"#a1a1a1", "font-family": "Arial Narrow"});

        var legendYear = svg.selectAll(".legend-year")
        .data(function(d){ 
          return colorVintage.domain().slice().reverse();  
        })
        .enter().append("g")
        .attr("class", "legend-year")
        .attr("transform", "translate(0, 375)");
        
        legendYear.append("text")
        .attr("x", 825)
        .attr("y",function(d,i) {
          if (i===0) { return -(height+36); }
          else { return -((height+36) - (i*25)); }
        })
        .attr("font-weight","bold")
        .style("fill", colorVintage)
        .text(function(d) { return d; });
      };

      /* Load chart data */
      var loadChartData = function(dataSource, dataTerm){
        d3.csv(dataSource, function(error, data){ 
          drawData(data, dataTerm);
        });
      };

      var formatMonthTicks = function(tickDivider){
        d3.select("#annualYieldsChart").select(".x").selectAll(".tick text").each(function(d,i) {
          i++;
          if (i%tickDivider !==0) { d3.select(this).style("opacity", 0); }
        });
      }



      /* Default selection ALL terms, ALL grades */
      if (defaultPageLoad){
      /* On page load, the default Data is "30" term for "All" grade
       * Term "36" : selected
       * Grade "All" : selected
       * Default vertical grid width: width/months = 23
       */
       var defaultVerticalGridWidth = 23, defaultTickDivider = 3, defaultTerm = "36";
       d3.select("#annualYieldsChart").select("#term-36").select("text").classed("selected", true);
       d3.select("#annualYieldsChart").select("#term-36").append("circle").attr("cx", 726).attr("cy", 33).attr("r", 3).attr("width", 3).attr("height", 3).style("fill", "#a1a1a1");
       d3.select("#annualYieldsChart").select("#grade-All").select("text").classed("selected", true);
       d3.select("#annualYieldsChart").select("#grade-All").append("circle").attr("cx", 793).attr("cy", 33).attr("r", 3).attr("width", 3).attr("height", 3).style("fill", "#a1a1a1");
       drawVerticalGridLines(defaultVerticalGridWidth);
       loadChartData(dataSource, defaultTerm);
       defaultPageLoad = false;
     }


     /* Interaction: Term selection */
     legendControls.on("click", function(e) {
      var xPos = +(d3.select(this).select("rect").attr("x")) + 14;
      d3.select("#annualYieldsChart").selectAll(".legend-controls-annual-yields").selectAll("text").classed("selected", false);
      d3.select("#annualYieldsChart").selectAll(".legend-controls-annual-yields").selectAll("circle").remove();
      d3.select("#annualYieldsChart").select("g.xAxis").remove();
      d3.select("#annualYieldsChart").select("g.yAxis").remove();
      d3.select("#annualYieldsChart").select(".year-legend-label").remove();
      d3.select("#annualYieldsChart").selectAll(".legend-year").remove();
      d3.select("#annualYieldsChart").selectAll(".vintage").remove();
      d3.select("#annualYieldsChart").selectAll(".tick").remove();
      d3.select("#annualYieldsChart").selectAll("line").remove();
      d3.select("#annualYieldsChart").selectAll(".hline").remove();
      
      /* Set the selected Term */
      d3.select(this).select("text").classed("selected", true);
      d3.select(this).append("circle").attr("cx", xPos).attr("cy", 33).attr("r", 3).attr("width", 3).attr("height", 3).style("fill", "#a1a1a1");
      
      /* Get selected term and selected grade */
      var selectedTerm = d3.select(this).text();
      var selectedGrade = d3.select("#annualYieldsChart .legend-grade text.selected").text();
      var selectedDataSource = "../resources/csv/annual_yields_" + selectedTerm + "M_" + selectedGrade + ".csv";
      if (selectedTerm === "36") {
        verticalGridWidth = 23;
      } else {
        verticalGridWidth = 17.5;
      }
      drawVerticalGridLines(verticalGridWidth);
      loadChartData(selectedDataSource, selectedTerm);
      
    });

/* Interaction: Grade selection - Only one grade is selected at a time */
legend.on("click", function(e) {
  var selectedAnnualYieldGrade = d3.select(this).text(),
  xPos = +(d3.select(this).select("rect").attr("x")) + 14;

  d3.select("#annualYieldsChart").selectAll(".legend-grade").classed("selected", false);
  d3.select("#annualYieldsChart").selectAll(".legend-grade").selectAll("circle").remove();
  d3.select("#annualYieldsChart").select("g.xAxis").remove();
  d3.select("#annualYieldsChart").select("g.yAxis").remove();
  d3.select("#annualYieldsChart").select(".year-legend-label").remove();
  d3.select("#annualYieldsChart").selectAll(".legend-year").remove();
  d3.select("#annualYieldsChart").selectAll(".vintage").remove();
  d3.select("#annualYieldsChart").selectAll(".tick").remove();
  d3.select("#annualYieldsChart").selectAll("line").remove();
  d3.select("#annualYieldsChart").selectAll(".hline").remove();

  /* Set the selected Grade & Term */
  d3.select(this).classed("selected", true);
  d3.select(this).select("text").classed("selected", true);
  d3.select(this).append("circle")
  .attr("cx", xPos).attr("cy", 33).attr("r", 3).attr("width", 3).attr("height", 3)
  .style("fill", function(){
    var selectedGradeId = "#grade-"+selectedAnnualYieldGrade,
    circleColour = d3.select("#annualYieldsChart")
    .select(selectedGradeId)
    .select("rect").style("fill");
    return circleColour;
  });

  /* Get the selected Grade & Term */
  var selectedGrade = d3.select(this).text();
  var selectedTerm = d3.select("#annualYieldsChart .legend-controls-annual-yields text.selected").text();
  var selectedDataSource = "../resources/csv/annual_yields_" + selectedTerm + "M_" + selectedGrade + ".csv";
  if (selectedTerm === "36") {
    verticalGridWidth = 23;
  } else {
    verticalGridWidth = 17.5;
  }
  drawVerticalGridLines(verticalGridWidth);
  loadChartData(selectedDataSource, selectedTerm);
});

};



</script>