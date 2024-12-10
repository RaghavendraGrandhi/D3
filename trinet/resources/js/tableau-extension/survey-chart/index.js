(function() {

var districts = [
  {"name":"Birmingham, Ala.","first-year-bachelor":36780,"masters-deg-highest":54613,"evaluations":false,"recall":true},
  {"name":"Mobile County, Ala.","first-year-bachelor":36144,"masters-deg-highest":52737,"evaluations":false,"recall":true},
  {"name":"Anchorage, Alaska","first-year-bachelor":45611,"masters-deg-highest":69289,"teacher-day":7,"recall":true},
  {"name":"Mesa, Ariz.","first-year-bachelor":35569,"masters-deg-highest":54722,"teacher-day":7.5,"evaluations":true,"recall":false},
  {"name":"Little Rock, Ark.","first-year-bachelor":33285,"masters-deg-highest":58792,"teacher-day":7.5,"recall":true},
  {"name":"Fresno Unified, Calif.","first-year-bachelor":40208,"masters-deg-highest":49412,"teacher-day":7,"recall":true},
  {"name":"Long Beach Unified, Calif.","first-year-bachelor":49812,"masters-deg-highest":82892,"teacher-day":8,"evaluations":false,"recall":true},
  {"name":"Los Angeles Unified, Calif.","first-year-bachelor":44742,"masters-deg-highest":59997,"evaluations":true,"recall":true},
  {"name":"Oakland Unified, Calif.","first-year-bachelor":39456,"masters-deg-highest":58094,"teacher-day":7,"evaluations":true,"recall":true},
  {"name":"Sacramento Unified, Calif.","first-year-bachelor":40885,"masters-deg-highest":56474,"evaluations":true,"recall":true},
  {"name":"San Diego Unified, Calif.","first-year-bachelor":38348,"masters-deg-highest":64475,"teacher-day":7.08,"recall":true},
  {"name":"San Francisco Unified, Calif.","first-year-bachelor":46020,"masters-deg-highest":58712,"teacher-day":7.5},
  {"name":"Denver, Colo.","first-year-bachelor":37551,"masters-deg-highest":61100,"teacher-day":8,"evaluations":true,"recall":true},
  {"name":"Douglas County, Colo.","first-year-bachelor":34134,"masters-deg-highest":64038,"teacher-day":7.5,"recall":true},
  {"name":"Harrison  Two, Colo.","first-year-bachelor":35000,"masters-deg-highest":90000,"teacher-day":8,"evaluations":true},
  {"name":"Jefferson County, Colo.","first-year-bachelor":32608,"masters-deg-highest":70602,"teacher-day":8,"recall":true},
  {"name":"Bridgeport, Conn.","first-year-bachelor":42428,"masters-deg-highest":76778,"teacher-day":6.87,"evaluations":false,"recall":true},
  {"name":"Hartford, Conn.","first-year-bachelor":42893,"masters-deg-highest":75612,"teacher-day":7.25,"evaluations":false,"recall":true},
  {"name":"New Haven, Conn.","first-year-bachelor":42174,"masters-deg-highest":80376,"evaluations":true,"recall":true},
  {"name":"Christina, Del.","first-year-bachelor":36903,"masters-deg-highest":73254,"teacher-day":7.5,"evaluations":true,"recall":true},
  {"name":"District of Columbia, D.C.","first-year-bachelor":51539,"masters-deg-highest":100839,"teacher-day":7.5,"evaluations":true,"recall":true},
  {"name":"Brevard County, Fla.","first-year-bachelor":36400,"masters-deg-highest":58975,"teacher-day":8,"evaluations":true},
  {"name":"Broward County, Fla.","first-year-bachelor":39000,"masters-deg-highest":74900,"teacher-day":7.5,"evaluations":true,"recall":true},
  {"name":"Duval County, Fla.","first-year-bachelor":37300,"masters-deg-highest":68449,"teacher-day":7.33,"evaluations":true,"recall":true},
  {"name":"Hillsborough County, Fla.","first-year-bachelor":37018,"masters-deg-highest":64500,"teacher-day":8,"evaluations":true,"recall":true},
  {"name":"Lee County, Fla.","first-year-bachelor":38192,"masters-deg-highest":63669,"teacher-day":8,"evaluations":true,"recall":true},
  {"name":"Miami-Dade County, Fla.","first-year-bachelor":38500,"masters-deg-highest":71325,"teacher-day":7.33,"evaluations":true,"recall":true},
  {"name":"Orange County, Fla.","first-year-bachelor":37000,"masters-deg-highest":65596,"teacher-day":7.5,"evaluations":true,"recall":true},
  {"name":"Palm Beach County, Fla.","first-year-bachelor":36822,"masters-deg-highest":69200,"teacher-day":7.5,"evaluations":true,"recall":true},
  {"name":"Pinellas County, Fla.","first-year-bachelor":36925,"masters-deg-highest":62090,"teacher-day":7.5,"evaluations":true,"recall":true},
  {"name":"Polk County, Fla.","first-year-bachelor":35000,"masters-deg-highest":57856,"teacher-day":7.75,"evaluations":true,"recall":true},
  {"name":"Atlanta, Ga.","first-year-bachelor":44312,"masters-deg-highest":73114,"teacher-day":7.5,"evaluations":false,"recall":true},
  {"name":"Cobb County, Ga.","first-year-bachelor":38958,"masters-deg-highest":66318,"teacher-day":8,"evaluations":false},
  {"name":"Dekalb County School System, Ga.","first-year-bachelor":40963,"masters-deg-highest":67842,"teacher-day":8,"evaluations":false,"recall":false},
  {"name":"Fulton County, Ga.","first-year-bachelor":39132,"masters-deg-highest":69456,"teacher-day":8,"recall":false},
  {"name":"Gwinnett County, Ga.","first-year-bachelor":38009,"masters-deg-highest":69620,"teacher-day":8,"evaluations":false},
  {"name":"Hawaii Dept. of Education, Hawaii","first-year-bachelor":42509,"masters-deg-highest":65401,"teacher-day":7,"recall":true},
  {"name":"Meridian Joint District, Idaho","first-year-bachelor":31750,"masters-deg-highest":46912},
  {"name":"Chicago, Ill.","first-year-bachelor":49159,"masters-deg-highest":86215,"teacher-day":7.5,"evaluations":true,"recall":false},
  {"name":"Elgin  U-46, Ill.","first-year-bachelor":39349,"masters-deg-highest":83903,"evaluations":false,"recall":true},
  {"name":"Indianapolis, Ind.","first-year-bachelor":35684,"masters-deg-highest":66692},
  {"name":"Des Moines, Iowa","first-year-bachelor":36834,"masters-deg-highest":60745,"teacher-day":7.75,"evaluations":true,"recall":true},
  {"name":"Wichita, Kan.","first-year-bachelor":37998,"masters-deg-highest":53633,"teacher-day":7.17,"recall":true},
  {"name":"Jefferson County, Ky.","first-year-bachelor":39720,"masters-deg-highest":73215,"teacher-day":7,"recall":true},
  {"name":"Caddo Parish, La.","first-year-bachelor":40414,"masters-deg-highest":56452,"evaluations":true,"recall":true},
  {"name":"East Baton Rouge Parish School System, La.","first-year-bachelor":43536,"masters-deg-highest":65416,"recall":true},
  {"name":"Jefferson Parish, La.","first-year-bachelor":40949,"masters-deg-highest":56549,"recall":true},
  {"name":"Louisiana Recovery, La.","first-year-bachelor":43294,"masters-deg-highest":59294,"recall":false},
  {"name":"New Orleans, La.","first-year-bachelor":39813,"masters-deg-highest":58013,"teacher-day":7,"evaluations":true,"recall":true},
  {"name":"Portland, Maine","first-year-bachelor":33669,"masters-deg-highest":62208,"teacher-day":6.5,"recall":true},
  {"name":"Anne Arundel County, Md.","first-year-bachelor":43996,"masters-deg-highest":83041,"teacher-day":7.92,"recall":true},
  {"name":"Baltimore, Md.","first-year-bachelor":46774,"masters-deg-highest":82770,"teacher-day":7.08,"recall":true},
  {"name":"Baltimore County, Md.","first-year-bachelor":43000,"masters-deg-highest":80730,"teacher-day":7,"evaluations":false,"recall":true},
  {"name":"Montgomery County, Md.","first-year-bachelor":46410,"masters-deg-highest":96966,"teacher-day":8,"evaluations":true,"recall":true},
  {"name":"Prince George's County, Md.","first-year-bachelor":44799,"masters-deg-highest":82873,"teacher-day":7.5,"evaluations":true,"recall":true},
  {"name":"Boston, Mass.","first-year-bachelor":46754,"masters-deg-highest":82178,"teacher-day":6.67,"evaluations":false,"recall":true},
  {"name":"Springfield, Mass.","first-year-bachelor":37087,"masters-deg-highest":61000,"teacher-day":7.25,"evaluations":true,"recall":true},
  {"name":"Detroit, Mich.","first-year-bachelor":39647,"masters-deg-highest":72516,"teacher-day":7.17,"evaluations":true,"recall":true},
  {"name":"Anoka-Hennepin Independent, Minn.","first-year-bachelor":37231,"masters-deg-highest":66033,"teacher-day":7.67,"evaluations":true,"recall":true},
  {"name":"Minneapolis, Minn.","first-year-bachelor":37087,"teacher-day":7.75,"evaluations":true,"recall":true},
  {"name":"St. Paul, Minn.","first-year-bachelor":40366,"masters-deg-highest":75864,"recall":true},
  {"name":"Desoto County, Miss.","first-year-bachelor":32281,"masters-deg-highest":59984,"evaluations":false},
  {"name":"Jackson, Miss.","first-year-bachelor":32372,"masters-deg-highest":62173,"evaluations":true},
  {"name":"Kansas City, Mo.","first-year-bachelor":32928,"masters-deg-highest":61776,"teacher-day":8,"recall":true},
  {"name":"St. Louis, Mo.","first-year-bachelor":38250,"masters-deg-highest":71594,"teacher-day":7.37,"recall":true},
  {"name":"Billings, Mont.","first-year-bachelor":35391,"masters-deg-highest":60688,"teacher-day":8,"recall":true},
  {"name":"Omaha, Neb.","first-year-bachelor":33460,"masters-deg-highest":67221,"teacher-day":7.83,"evaluations":false,"recall":true},
  {"name":"Clark County, Nev.","first-year-bachelor":34688,"masters-deg-highest":51895,"teacher-day":7.18,"evaluations":true,"recall":true},
  {"name":"Manchester, N.H.","first-year-bachelor":33904,"masters-deg-highest":65736,"recall":true},
  {"name":"Newark, N.J.","first-year-bachelor":50000,"masters-deg-highest":99932,"teacher-day":6.75,"recall":true},
  {"name":"Albuquerque, N.M.","first-year-bachelor":30000,"masters-deg-highest":68759,"teacher-day":7,"evaluations":false,"recall":true},
  {"name":"Buffalo, N.Y.","first-year-bachelor":32897,"masters-deg-highest":74657,"teacher-day":6.83},
  {"name":"New York City, N.Y.","first-year-bachelor":45530,"masters-deg-highest":94154,"teacher-day":6.83,"recall":true},
  {"name":"Rochester, N.Y.","first-year-bachelor":41825,"masters-deg-highest":90910,"evaluations":true,"recall":true},
  {"name":"Charlotte-Mecklenburg, N.C.","first-year-bachelor":34386,"masters-deg-highest":67349,"evaluations":false,"recall":false},
  {"name":"Guilford County, N.C.","first-year-bachelor":34730,"masters-deg-highest":64020,"teacher-day":7.5,"evaluations":false,"recall":false},
  {"name":"Wake County, N.C.","first-year-bachelor":34462,"masters-deg-highest":67493,"evaluations":false,"recall":false},
  {"name":"Fargo, N.D.","first-year-bachelor":37245,"masters-deg-highest":58218,"teacher-day":7.5,"recall":true},
  {"name":"Cincinnati, Ohio","first-year-bachelor":39262,"masters-deg-highest":77377,"teacher-day":7,"evaluations":true,"recall":true},
  {"name":"Cleveland, Ohio","first-year-bachelor":37412,"masters-deg-highest":77558,"teacher-day":6.67,"recall":true},
  {"name":"Columbus, Ohio","first-year-bachelor":42333,"masters-deg-highest":86001,"teacher-day":7.5,"recall":true},
  {"name":"Dayton City, Ohio","first-year-bachelor":33936,"masters-deg-highest":62646,"teacher-day":7.25,"recall":true},
  {"name":"Toledo, Ohio","first-year-bachelor":34086,"masters-deg-highest":64303,"teacher-day":7,"recall":true},
  {"name":"Oklahoma City, Okla.","first-year-bachelor":32325,"masters-deg-highest":49375,"teacher-day":7.5,"evaluations":true,"recall":true},
  {"name":"Tulsa, Okla.","first-year-bachelor":32900,"masters-deg-highest":49436,"teacher-day":7.83,"evaluations":true,"recall":true},
  {"name":"Portland, Ore.","first-year-bachelor":35886,"masters-deg-highest":64199,"teacher-day":7.5,"evaluations":false,"recall":true},
  {"name":"Philadelphia, Pa.","first-year-bachelor":45360,"masters-deg-highest":76462,"teacher-day":7.07,"recall":true},
  {"name":"Pittsburgh, Pa.","first-year-bachelor":38120,"masters-deg-highest":82800,"teacher-day":7.27,"evaluations":true,"recall":true},
  {"name":"Providence, R.I.","first-year-bachelor":36236,"masters-deg-highest":71124,"teacher-day":6.67,"evaluations":true,"recall":true},
  {"name":"Charleston County, S.C.","first-year-bachelor":33740,"masters-deg-highest":57185,"evaluations":false,"recall":true},
  {"name":"Greenville County, S.C.","first-year-bachelor":32595,"masters-deg-highest":57592,"evaluations":false,"recall":true},
  {"name":"Sioux Falls, S.D.","first-year-bachelor":30505,"masters-deg-highest":47917,"teacher-day":8,"recall":true},
  {"name":"Memphis, Tenn.","first-year-bachelor":41310,"masters-deg-highest":62219,"teacher-day":7.25,"evaluations":true,"recall":true},
  {"name":"Metropolitan Nashville, Tenn.","first-year-bachelor":34474,"masters-deg-highest":57187,"teacher-day":7.5,"evaluations":true,"recall":true},
  {"name":"Aldine Independent, Texas","first-year-bachelor":45114,"masters-deg-highest":71329,"teacher-day":8,"evaluations":false,"recall":true},
  {"name":"Austin Independent, Texas","first-year-bachelor":43286,"masters-deg-highest":64833,"evaluations":false},
  {"name":"Brownsville Independent, Texas","first-year-bachelor":40350,"masters-deg-highest":61452,"teacher-day":7.75,"evaluations":false},
  {"name":"Cypress-Fairbanks Independent, Texas","first-year-bachelor":45250,"masters-deg-highest":69111,"teacher-day":8,"evaluations":true},
  {"name":"Dallas Independent, Texas","first-year-bachelor":45100,"masters-deg-highest":70196,"teacher-day":8.5,"evaluations":false},
  {"name":"Fort Worth Independent, Texas","first-year-bachelor":45405,"masters-deg-highest":71767,"evaluations":false,"recall":true},
  {"name":"Houston Independent, Texas","first-year-bachelor":45887,"masters-deg-highest":70941,"evaluations":true,"recall":false},
  {"name":"Northside Independent, Texas","first-year-bachelor":46675,"masters-deg-highest":75793,"evaluations":false},
  {"name":"Granite, Utah","first-year-bachelor":33004,"masters-deg-highest":57272,"recall":true},
  {"name":"Burlington, Vt.","first-year-bachelor":38740,"masters-deg-highest":66635,"teacher-day":7.75,"evaluations":false,"recall":true},
  {"name":"Fairfax County, Va.","first-year-bachelor":45161,"masters-deg-highest":87487,"teacher-day":7.5,"recall":true},
  {"name":"Norfolk, Va.","first-year-bachelor":38012,"masters-deg-highest":64642,"evaluations":true,"recall":true},
  {"name":"Prince William County, Va.","first-year-bachelor":43612,"masters-deg-highest":96377,"teacher-day":7,"recall":true},
  {"name":"Richmond, Va.","first-year-bachelor":39712,"masters-deg-highest":68251,"teacher-day":7,"recall":true},
  {"name":"Virginia Beach, Va.","first-year-bachelor":38597,"masters-deg-highest":68414,"teacher-day":7.33},
  {"name":"Seattle, Wash.","first-year-bachelor":42086,"masters-deg-highest":60710,"teacher-day":7.5,"evaluations":true,"recall":true},
  {"name":"Spokane, Wash.","first-year-bachelor":33401,"masters-deg-highest":57970,"teacher-day":7.5,"recall":true},
  {"name":"Kanawha County, W.Va.","first-year-bachelor":33406,"masters-deg-highest":58284,"evaluations":true},
  {"name":"Milwaukee, Wis.","first-year-bachelor":37721,"masters-deg-highest":69832,"teacher-day":7.55,"recall":true},
  {"name":"Laramie School District One, Wyo.","first-year-bachelor":46160,"masters-deg-highest":69077,"teacher-day":7.5,"recall":true}
];

var chicago;

districts.some(function(district) {
  if (/chicago/i.test(district.name)) {
    return chicago = district;
  }
});

districts.sort(function(a, b) {
  return (b === chicago) - (a === chicago)
      || d3.ascending(a.name, b.name);
});

districts.forEach(function(district, i) {
  district.index = i;
});

var formatDollars = d3.format(".3s"),
    formatMinutes = d3.format("02d"),
    formatHours = function(d) { return isNaN(d) ? "N.A." : Math.floor(d) + ":" + formatMinutes(Math.round((d % 1) * 60)); },
    formatCurrency = function(d) { return isNaN(d) ? "N.A." : formatDollars(d); },
    formatCategorical = function(d) { return d === true ? "●" : d === false ? "○" : "N.A."; },
    formatDefault = String;

var salaryScale = d3.scale.linear().domain([0, d3.max(districts, function(d) { return d["masters-deg-highest"]; })]).range([0, 156]),
    timeScale = d3.scale.linear().domain([0, 9]).range([0, 156]);

var dimensions = [
  {name:                "name", format:     formatDefault},
  {name: "first-year-bachelor", format:    formatCurrency, scale: salaryScale},
  {name: "masters-deg-highest", format:    formatCurrency, scale: salaryScale},
  {name:         "teacher-day", format:       formatHours, scale: timeScale},
  {name:         "evaluations", format: formatCategorical, categorical: true},
  {name:              "recall", format: formatCategorical, categorical: true}
];

dimensions.forEach(function(dimension, i) {
  dimension.index = i;
});

var row = d3.select("#g-chart").selectAll(".g-row")
    .data(districts)
  .enter().append("g")
    .attr("class", "g-row")
    .classed("g-special", function(district) { return district === chicago; })
    .attr("transform", function(district, i) { return "translate(0," + i * 21 + ")"; });

row.append("rect")
    .attr("class", "g-background")
    .attr("width", "100%")
    .attr("height", 20);

row.each(function(district) {
  var cell = d3.select(this).selectAll(".g-cell")
      .data(dimensions)
    .enter().append("g")
      .attr("class", "g-cell")
      .classed("g-quantitative", function(dimension) { return dimension.scale; })
      .classed("g-categorical", function(dimension) { return dimension.categorical; })
      .attr("transform", function(dimension, i) { return "translate(" + i * 160 + ")"; });

  var quantitativeCell = cell.filter(function(dimension) { return dimension.scale && !isNaN(district[dimension.name]); });

  quantitativeCell.append("rect")
      .attr("class", "g-bar")
      .attr("width", function(dimension) { return dimension.scale(Math.min(chicago[dimension.name], district[dimension.name])); })
      .attr("height", 20);

  quantitativeCell.filter(function(dimension) { return +district[dimension.name] > +chicago[dimension.name]; }).append("rect")
      .attr("class", "g-bar-cap")
      .attr("x", function(dimension) { return dimension.scale(chicago[dimension.name]); })
      .attr("width", function(dimension) { return dimension.scale(district[dimension.name] - chicago[dimension.name]); })
      .attr("height", 20);

  cell.append("text")
      .attr("class", "g-value")
      .attr("x", function(dimension) { return dimension.scale ? 3 : 0; })
      .attr("y", function(dimension) { return dimension.categorical ? 9 : 10; })
      .attr("dy", ".35em")
      .classed("g-na", function(dimension) { return district[dimension.name] === undefined; })
      .classed("g-yes", function(dimension) { return district[dimension.name] === true; })
      .classed("g-no", function(dimension) { return district[dimension.name] === false; })
      .text(function(dimension) { return dimension.format(district[dimension.name]); })
      .attr("clip-path", function(dimension) { return (dimension.clipped = this.getComputedTextLength() > 140) ? "url(#g-clip-cell)" : null; });

  cell.filter(function(dimension) { return dimension.clipped; }).append("rect")
      .style("fill", "url(#g-clip-gradient)")
      .attr("x", 136)
      .attr("width", 20)
      .attr("height", 20);
});

d3.selectAll(".g-special .g-categorical").append("text")
    .attr("class", "g-value g-label")
    .attr("x", 15)
    .attr("y", 10)
    .attr("dy", ".35em")
    .text(function(dimension) { return chicago[dimension.name] ? "Yes" : "No"; });

d3.select("#g-chart").selectAll(".g-compare")
    .data(dimensions.filter(function(dimension) { return dimension.scale; }))
  .enter().append("line")
    .attr("class", "g-compare")
    .attr("transform", function(dimension) { return "translate(" + (dimension.scale(chicago[dimension.name]) + dimension.index * 160) + ",0)"; })
    .attr("y2", "100%");

d3.selectAll(".g-body .g-subtitle")
    .data(dimensions)
    .on("click", sort);

function sort(dimension) {
  var dimensionName = dimension.name,
      descending = d3.select(this).classed("g-ascending");

  d3.selectAll(".g-descending").classed("g-descending", false);
  d3.selectAll(".g-ascending").classed("g-ascending", false);

  if (descending) {
    d3.select(this).classed("g-descending", true);
    var orderQuantitative = function(a, b) {
      return ((b === chicago) - (a === chicago))
          || (isNaN(a[dimensionName]) - isNaN(b[dimensionName]))
          || (a[dimensionName] - b[dimensionName])
          || (a.index - b.index);
    };

    var orderName = function(a, b) {
      return ((b === chicago) - (a === chicago))
          || b.name.localeCompare(a.name);
    };
  } else {
    d3.select(this).classed("g-ascending", true);

    var orderQuantitative = function(a, b) {
      return ((b === chicago) - (a === chicago))
          || (isNaN(a[dimensionName]) - isNaN(b[dimensionName]))
          || (b[dimensionName] - a[dimensionName])
          || (a.index - b.index);
    };

    var orderName = function(a, b) {
      return ((b === chicago) - (a === chicago))
          || a.name.localeCompare(b.name);
    };
  }

  d3.selectAll(".g-row")
      .sort(dimensionName === "name" ? orderName : orderQuantitative)
      .each(function(district, i) { district.index = i; })
    .transition()
      .delay(function(district, i) { return (i - 1) * 10; })
      .duration(750)
      .attr("transform", function(district, i) { return "translate(0," + i * 21 + ")"; });
}

})();
