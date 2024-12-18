<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSV TO JSON</title>
    <script src="resources/js/d3.v3.min.js"></script>
    <script type="text/javascript" src="resources/js/underscrore.js"></script>

  <script type="text/javascript" async="" src="https://www.google-analytics.com/ga.js"></script>
  </head>
  <body>
    <h3>Coffee Wheel</h3>
    <script>
      //*************************************************
      // SETUP DATA VIZ
      //*************************************************
      var width = 960, height = 700, radius = 300;

      var color = d3.scale.ordinal().range(['#74E600','#26527C','#61D7A4','#6CAC2B','#408AD2','#218359','#36D792','#679ED2','#B0F26D','#4B9500','#98F23D','#04396C','#007241']);

      var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height * .52 + ")");

      var partition = d3.layout.partition()
        .sort(null)
        .size([2 * Math.PI, radius * radius])
        .value(function(d) { return d.pop; });

      var arc = d3.svg.arc()
        .startAngle(function(d) { return d.x; })
        .endAngle(function(d) { return d.x + d.dx; })
        .innerRadius(function(d) { return Math.sqrt(d.y); })
        .outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });

      //*************************************************
      // GET THE CSV DATA
      //*************************************************
      d3.csv("resources/csv/religions.csv", function(error, data) {

        _.each(data, function(element, index, list){
            element.five = +element.five;
        });

        //*************************************************
        // THE FUNCTION
        //*************************************************
        function genJSON(csvData, groups) {

          var genGroups = function(data) {
            return _.map(data, function(element, index) {
              return { name : index, children : element };
            });
          };

          var nest = function(node, curIndex) {
            if (curIndex === 0) {
              node.children = genGroups(_.groupBy(csvData, groups[0]));
              _.each(node.children, function (child) {
                nest(child, curIndex + 1);
              });
            }
            else {
              if (curIndex < groups.length) {
                node.children = genGroups(
                  _.groupBy(node.children, groups[curIndex])
                );
                _.each(node.children, function (child) {
                  nest(child, curIndex + 1);
                });
              }
            }
            return node;
          };
          return nest({}, 0);
        }
        //*************************************************
        // CALL THE FUNCTION
        //*************************************************
        var preppedData = genJSON(data, ['year', 'cat', 'type', 'pop']);

        //*************************************************
        // LOAD THE PREPPED DATA IN D3
        //*************************************************
        console.log(preppedData);
        var path = svg.datum(preppedData).selectAll("path")
          .data(partition.nodes)
        .enter().append("path")
          .attr("display", function(d) { return d.depth ? null : "none"; }) // hide inner ring
          .attr("d", arc)
          .attr("class", function(d) { return (d.children ? d : d.parent).name; })
          .style("stroke", "#fff")
          .style("fill", function(d) { return color((d.children ? d : d.parent).name); })
          .style("fill-rule", "evenodd")

      });
    </script>
  </body>
</html>