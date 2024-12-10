/*

  hello, this is the javascript that is used for the 
  entire page. Take a look around!
  
  I really need a job to pay my tuition fees for university.
  If you or anyone you know might like me to do something,
  send me an email at nafis@labs.im

*/

$(function(){

  // startDate = 00:02 Mon 11 Jun 2012, endDate = 23:32 Sun Jul 29 2012
  var startDate = new Date(1339372920000), endDate = new Date(1343604720000);
  //var startDate = new Date(1339027320000), endDate = new Date(1341444720000);

  // get the dates of each of the mondays between the start and end dates.
  // this is used to select which weekly data to show
  var weeklyRange = d3.time.monday.utc.range(d3.time.day.floor(startDate), endDate);

  var weeklySelection = d3.select('#weekly_list').selectAll('div').data(weeklyRange);

  // append a list of the weeks with available data in the #weekly_list div
  var weeklyList = weeklySelection.enter()
    .append('div')
    .text(function(d){
      var format = d3.time.format("%A %d %B");
      return 'Week beginning on ' + format(d);
    })
    .attr('class', function(d, i){ if (i==0) return 'selected' }) // adding a 'selected' class to the first week

  // adding and handling the click event for each week
  weeklyList.on('click', function(d) { 
    weeklyList.attr('class', '');
    d3.select(this).attr('class', 'selected');

    // The followig code is used for the triangle which points to the current selected week
    var yOffset = weekPositions[_.indexOf(_.pluck(weekPositions, 'data'), d)].offset;
    triangle.transition().attr('d', function(){ return line([{x:130, y:30}, {x:4, y: yOffset}, {x: 130, y: 187}]) + 'Z' });

    updateWeekStats(d);
    redrawGraph(d, 'karma');
    redrawGraph(d, 'uniqueArticles');
    redrawGraph(d, 'comments');
  });


  // creating an array which will store objects containing the  offset value and the data for each of the week links. This is used to position the triangle to the correct week links.
  var weekPositions = [];
  weeklyList.each(function(d){
      weekPositions.push({
        offset: $(this).offset().top - $('svg#data_pointer').offset().top + 18, // gets a y value that is used for the data pointing triangle.
        data: d
      })
  });
  
  // the "data pointer" triangle svg shape which points to the week that is currently selected
  var line = d3.svg.line()
    .x(function(d){ return d.x })
    .y(function(d){ return d.y });

  var triangle = d3.select('svg#data_pointer')
    .append('svg:path')
    .attr('d', function(){ return line([{x:130, y:30}, {x:4, y: weekPositions[0].offset}, {x: 130, y: 187}]) + 'Z' });


  var weeklyData = [];
  d3.json('readFile/month', function(data){
    weeklyData = {};

    // for each week in the weeklyRange variable, create a new key value pair in the weeklyData object
    // each key is the start date for a week and each value is an array of data for each day of the week
    _.each(weeklyRange, function(w, i){
      weeklyData[w] = data[i];
    });
    updateWeekStats(d3.time.day.utc.floor(startDate));
    drawGraph(d3.time.day.utc.floor(startDate), 'karma');
    drawGraph(d3.time.day.utc.floor(startDate), 'uniqueArticles');
    drawGraph(d3.time.day.utc.floor(startDate), 'comments');
  });

  function updateWeekStats(week){
    var data = {karma: 0, posts: 0, comments: 0};
    // get all the karma from all days between the selected week and the next week
    _.each(weeklyData[week], function(day){
      data.karma += day.karma;
      data.posts += day.uniqueArticles;
      data.comments += day.comments;
    });

    d3.select('#weekly_karma').text(data.karma);
    d3.select('#weekly_posts').text(data.posts);
    d3.select('#weekly_comments').text(data.comments);
  }

  function drawGraph(week, graph){
    var format = d3.time.format.utc('%Y-%m-%e');

    var timeScale = d3.time.scale.utc()
      .range([0, 230]);
    var firstDomain = format.parse('2012-' + (weeklyData[week][0]['month'] + 1) + '-' + weeklyData[week][0]['day']);
    var secondDomain = format.parse('2012-' + (weeklyData[week][6]['month'] + 1) + '-' + weeklyData[week][6]['day']);
    timeScale.domain([firstDomain, secondDomain])

    var y = d3.scale.linear()
      .domain([d3.min(_.pluck(weeklyData[week], graph)) * 0.7, d3.max(_.pluck(weeklyData[week], graph)) * 1.1])
      .range([280, 0]);

    // axes
    var xAxis = d3.svg.axis().scale(timeScale);
    var yAxis = d3.svg.axis().scale(y).orient('left');

    var graphSvg = d3.select('svg#' + graph + '_graph');

    graphSvg.append('g')
      .attr('class', 'x_axis')
      .attr('transform', 'translate(50,280)')
      .call(xAxis.ticks(7).tickFormat(d3.time.format('%a')));

    graphSvg.append('g')
      .attr('class', 'y_axis')
      .attr('transform', 'translate(50,0)')
      .call(yAxis);
    
    graphSvg.append('g')
      .attr('class', 'guide_lines_x')
      .attr('transform', 'translate(50,280)')
      .call(xAxis.tickFormat('').tickSize(-280,0,0));
  
    graphSvg.append('g')
      .attr('class', 'guide_lines_y')
      .attr('transform', 'translate(50,0)')
      .call(yAxis.tickFormat('').tickSize(-230,0,0));

    var line = d3.svg.line()
      .x(function(d) { return timeScale(format.parse('2012-' + (d.month + 1) + '-' + d.day)) })
      .y(function(d) { return y(d[graph]) });
    
    graphSvg.append('g')
      .attr('transform', 'translate(50, 3)')
      .append('path')
      .attr('class', 'line')
      .attr('d', line(weeklyData[week]));

    graphSvg.append('g')
      .attr('class', 'points')
      .attr('transform', 'translate(50,3)').selectAll('circle')
      .data(weeklyData[week]).enter()
      .append('circle')
        .attr('r', 3)
        .attr('cx', function(d){
          var day = format.parse('2012-' + (d.month  + 1) + '-' + d.day);
          return timeScale(day);
        })
        .attr('cy', function(d){ return y(d[graph]); })
  }
  
  function redrawGraph(week, graph){

    var format = d3.time.format.utc('%Y-%m-%e');

    // scale
    var timeScale = d3.time.scale.utc()
      .range([0, 230]);
    var firstDomain = format.parse('2012-' + (weeklyData[week][0]['month'] + 1) + '-' + weeklyData[week][0]['day']);
    var secondDomain = format.parse('2012-' + (weeklyData[week][6]['month'] + 1) + '-' + weeklyData[week][6]['day']);
    timeScale.domain([firstDomain, secondDomain])

    var y = d3.scale.linear()
      .domain([d3.min(_.pluck(weeklyData[week], graph)) * 0.7, d3.max(_.pluck(weeklyData[week], graph)) * 1.1])
      .range([280, 0]);

    // axes
    var xAxis = d3.svg.axis().scale(timeScale);
    var yAxis = d3.svg.axis().scale(y).orient('left');

    // drawing
    var graphSvg = d3.select('svg#' + graph + '_graph');

    graphSvg.select('g.y_axis')
      .transition()
      .call(yAxis);

    graphSvg.select('g.guide_lines_y')
      .transition()
      .call(yAxis.tickFormat('').tickSize(-230,0));

    var line = d3.svg.line()
      .x(function(d) { return timeScale(format.parse('2012-' + (d.month + 1) + '-' + d.day)) })
      .y(function(d) { return y(d[graph]) });
    
    graphSvg.select('path.line')
      .transition()
      .attr('d', line(weeklyData[week]));

    graphSvg.select('g.points').selectAll('circle')
      .data(weeklyData[week])
        .transition()
        .attr('cy', function(d){ return y(d[graph]); })
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////

  var dailyRange = d3.time.day.utc.range(d3.time.day.floor.utc(startDate), d3.time.day.utc(endDate));

  var dayButtons = d3.select('#day_list').selectAll('div').data(dailyRange);

  dayButtons.enter()
    .append('div')
    .attr('class', function(d){ return d3.time.format.utc('%a')(d) + ' day' })
    .html(function(d){
      var format = d3.time.format.utc('<h3>%a</h3><h2>%d</h2><h3>%b</h3>');
      return format(d);
    });

  dayButtons.on('click', function(d){
    dayButtons.attr('class', function(d){ return d3.time.format.utc('%a')(d) + ' day' })
    d3.select(this).attr('class', function(d){ return d3.time.format.utc('%a')(d) + ' selected' })
    redrawDailyGraph(d);
    updateArticleTypes(d);
  });

  var dailyData = {};
  d3.json('readFile/daily', function(data){
    _.each(dailyRange, function(d, i){
      dailyData[d] = data[i].sort(function(a, b){ return a.h < b.h ? -1 : 1 });
    });
    drawDailyGraph(d3.time.day.utc.floor(startDate));
  });

  var articleData = {}
  d3.json('readFile/daily_article_types', function(data){

    dailyRange.forEach(function(d, i){
      articleData[d] = data[i];
    });
    updateArticleTypes(d3.time.day.utc.floor(startDate));
  });

  function updateArticleTypes(day){
    d3.select('#guide #article_types code#type1').text(articleData[day][0][0]);
    d3.select('#guide #article_types code#type2').text(articleData[day][0][1]);
    d3.select('#guide #article_types code#type3').text(articleData[day][0][2]);
    d3.select('#guide #article_types code#type4').text(articleData[day][0][3]);
    d3.select('#guide #article_types #top_article a').text(articleData[day][1]['text']).attr('href', articleData[day][1]['link']);
    d3.select('#guide #article_types #top_article code').text(articleData[day][1]['points']);
  }

  var w = 600, h = 400, margin = {up: 10, bottom: 30, left: 60, right: 0};

  function drawDailyGraph(day){

    var format = d3.time.format.utc('%Y-%m-%e-%H');

    var xScale = d3.time.scale.utc()
      .range([margin.left, w - margin.right]);
    var firstDomain = format.parse('2012-' + (dailyData[day][0]['m'] + 1) + '-' + dailyData[day][0]['d'] + '-' + dailyData[day][0]['h']);
    var secondDomain = format.parse('2012-' + (dailyData[day][23]['m'] + 1) + '-' + dailyData[day][23]['d'] + '-' + dailyData[day][23]['h']);
    xScale.domain([firstDomain, secondDomain])

    var yKarma = d3.scale.linear()
      .domain([d3.min(_.pluck(dailyData[day], 'nK')) * 0.7, d3.max(_.pluck(dailyData[day], 'nK')) * 1.1])
      .range([h - margin.bottom, margin.up]);

    var yPost = d3.scale.linear()
      .domain([d3.min(_.pluck(dailyData[day], 'nP')) * 0.7, d3.max(_.pluck(dailyData[day], 'nP')) * 1.1])
      .range([h - margin.bottom, margin.up]);

    // axes
    var xAxis = d3.svg.axis().scale(xScale);
    var yAxisKarma = d3.svg.axis().scale(yKarma).orient('left');
    var yAxisPost = d3.svg.axis().scale(yPost).orient('right');

    var graphSvg = d3.select('svg#daily_graph');


    graphSvg.append('g')
      .attr('class', 'x_axis')
      .attr('transform', 'translate(0,' + (h - margin.bottom) + ')')
      .call(xAxis.tickFormat(d3.time.format.utc('%H')).ticks(24));

    graphSvg.append('g')
      .attr('class', 'y_axis_karma')
      .attr('transform', 'translate(' + margin.left + ',0)')
      .call(yAxisKarma.ticks(8));

    graphSvg.append('g')
      .attr('class', 'y_axis_post')
      .attr('transform', 'translate(' + w + ',0)')
      .call(yAxisPost.ticks(8));

    graphSvg.append('g')
      .attr('class', 'guide_lines_x')
      .attr('transform', 'translate(0,' + (h - margin.bottom) + ')')
      .call(xAxis.tickFormat('').tickSize(-h + margin.bottom + margin.up, 0,-h + margin.up + margin.bottom));

    var yGuideLines = graphSvg.append('g')
      .attr('class', 'guide_lines_y')
      .attr('transform', 'translate(' + margin.left + ',0)')
      .call(yAxisKarma.tickFormat('').tickSize(-w + margin.left, 0).ticks(10));

    graphSvg.on('mouseleave', function(){
      yGuideLines.call(yAxisKarma.tickFormat('').tickSize(-w + margin.left, 0, 0).ticks(10));
    });

    graphSvg.on('mouseenter', function(){
      yGuideLines.call(yAxisPost.tickFormat('').tickSize(w - margin.left, 0, 0));
    });

    var karmaLine = d3.svg.line().interpolate('monotone')
      .x(function(d) { return xScale(format.parse('2012-' + (d.m + 1) + '-' + d.d + '-' + d.h)) })
      .y(function(d) { return yKarma(d['nK']) });

    var postLine = d3.svg.line().interpolate('monotone')
      .x(function(d) { return xScale(format.parse('2012-' + (d.m + 1) + '-' + d.d + '-' + d.h)) })
      .y(function(d) { return yPost (d['nP']) });

    graphSvg.append('g')
      .attr('class', 'line_karma')
      .append('path')
      .attr('d', karmaLine(dailyData[day]));

    graphSvg.append('g')
      .attr('class', 'line_post')
      .append('path')
      .attr('d', postLine(dailyData[day]));

    graphSvg.append('text')
      .attr('id', 'label_karma')
      .text('New Karma')
      .attr('x', 170)
      .attr('y', -10)
      .attr('transform', 'rotate(90)');

    graphSvg.append('text')
      .attr('id', 'label_post')
      .text('New Posts')
      .attr('x', 170)
      .attr('y', -630)
      .attr('transform', 'rotate(90)');

    graphSvg.append('text')
      .attr('id', 'label_time')
      .text('time (UTC)')
      .attr('x', 310)
      .attr('y', 407)

  }

  function redrawDailyGraph(day){

    var format = d3.time.format.utc('%Y-%m-%e-%H');

    var xScale = d3.time.scale.utc()
      .range([margin.left, w - margin.right]);
    var firstDomain = format.parse('2012-' + (dailyData[day][0]['m'] + 1) + '-' + dailyData[day][0]['d'] + '-' + dailyData[day][0]['h']);
    var secondDomain = format.parse('2012-' + (dailyData[day][23]['m'] + 1) + '-' + dailyData[day][23]['d'] + '-' + dailyData[day][23]['h']);
    xScale.domain([firstDomain, secondDomain])

    var yKarma = d3.scale.linear()
      .domain([d3.min(_.pluck(dailyData[day], 'nK')) * 0.7, d3.max(_.pluck(dailyData[day], 'nK')) * 1.1])
      .range([h - margin.bottom, margin.up]);

    var yPost = d3.scale.linear()
      .domain([d3.min(_.pluck(dailyData[day], 'nP')) * 0.7, d3.max(_.pluck(dailyData[day], 'nP')) * 1.1])
      .range([h - margin.bottom, margin.up]);

    // axes
    var xAxis = d3.svg.axis().scale(xScale);
    var yAxisKarma = d3.svg.axis().scale(yKarma).orient('left');
    var yAxisPost = d3.svg.axis().scale(yPost).orient('right');

    var graphSvg = d3.select('svg#daily_graph');

    graphSvg.select('g.y_axis_karma')
      .transition()
      .call(yAxisKarma.ticks(8));

    graphSvg.select('g.y_axis_post')
      .transition()
      .call(yAxisPost.ticks(8));

    graphSvg.append('g.guide_lines_x')
      .transition()
      .call(xAxis.tickFormat('').tickSize(-h + margin.bottom + margin.up, 0));

    var yGuideLines = graphSvg.select('g.guide_lines_y')
      .transition()
      .call(yAxisKarma.tickFormat('').tickSize(-w + margin.left, 0).ticks(10));

    graphSvg.on('mouseleave', function(){
      yGuideLines.call(yAxisKarma.tickFormat('').tickSize(-w + margin.left, 0).ticks(10));
    });

    graphSvg.on('mouseenter', function(){
      yGuideLines.call(yAxisPost.tickFormat('').tickSize(w - margin.left, 0));
    });

    function redrawLine(type, key, yScale){
      var line = d3.svg.line().interpolate('monotone')
      .x(function(d) { return xScale(format.parse('2012-' + (d.m + 1) + '-' + d.d + '-' + d.h)) })
      .y(function(d) { return yScale(d[key]) });
      
      graphSvg.select('g.line_' + type).select('path')
        .transition()
        .attr('d', line(dailyData[day]));
    }

    redrawLine('karma', 'nK', yKarma);
    redrawLine('post', 'nP', yPost);

  }

});
