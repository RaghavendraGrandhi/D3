
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>HN stats</title>
  <link type="text/css" rel="stylesheet" href="resources/css/hn-stats/css.css">
  <link href='resources/css/hn-stats/css1.css' rel='stylesheet' type='text/css'>
  <link href='resources/css/hn-stats/css2.css' rel='stylesheet' type='text/css'>
  <link href='resources/css/hn-stats/css3.css' rel='stylesheet' type='text/css'>
  <link href='resources/css/hn-stats/css4.css' rel='stylesheet' type='text/css'>
<script type="text/javascript">
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-31565613-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>  
</head>
<body>

<div class="container-fluid">
	<div class="row">
		<div class="col-sm-2 bgblue">
			<%@ include file="menu.jsp"%>
		</div>
		<div class="col-sm-10">
<noscript><h1>Sorry, you need javascript to view this page (it is heavily dependent on d3.js)</h1></noscript>
  <div id="title">
    <div id="titles">
      <h3 id="first">HN</h3>
      <h3 id="second">Statistics</h3>
    </div>
  </div>
  <div id="weekly">
    <h1>In a Week</h1>
    <div id="weekly_list">
    </div>
    <svg id="data_pointer">
    </svg>
    <div id="weekly_data">
      <div class="data_box">
        <div class="data_title">total karma</div>
        <div class="data_numbers" id="weekly_karma">0</div>
      </div>
      <div class="data_box">
        <div class="data_title">total posts</div>
        <div class="data_numbers" id="weekly_posts">0</div>
      </div>
      <div class="data_box">
        <div class="data_title">comments</div>
        <div class="data_numbers" id="weekly_comments">0</div>
      </div>
    </div><!-- weekly_list -->

    <div id="weekly_graphs">
      <div id="graph_titles">
        <h2 id="karma">Karma per day</h2>
        <h2 id="articles">Unique articles per day</h2>
        <h2 id="comments">Comments per day</h2>
      </div>
      <svg id="karma_graph"></svg>
      <svg id="uniqueArticles_graph"></svg>
      <svg id="comments_graph"></svg>
    </div>
  </div><!-- weekly -->

  <div id="daily">
    <h1>In a day</h1>

    <div id="daily_data">
      <div id="guide">
        <p><span id="new_karma_colour"></span> - New karma</p>
        <p><span id="new_post_colour"></span> - New posts</p>
        <p>Hover over the graph to change background guide lines from new karma to new posts</p>

        <div id="article_types">
          <p>Articles with karma between 0 and 50:</p>
          <code id="type1"></code>
          <p>Articles with karma between 51 and 100:</p>
          <code id="type2"></code>
          <p>Articles with karma between 101 and 200:</p>
          <code id="type3"></code>
          <p>Articles with karma over 200</p>
          <code id="type4"></code>

          <div id="top_article">
            <p>Top article:</p>
            <code></code><a></a>
          </div>
        </div>
      </div>
      <svg id="daily_graph"></svg>
    </div>

    <div id="day_list">
    </div>
  </div><!-- daily -->
</div>
	</div>
</div>


</body>
<script type="text/javascript" src="resources/js/hn-stats/d3.v2.min.js" charset="utf-8"></script>
  <script type="text/javascript" src="resources/js/hn-stats/underscore-min.js"></script>
  <script type="text/javascript" src="resources/js/hn-stats/jquery-1.7.2.min.js"></script>
  <script type="text/javascript" src="resources/js/hn-stats/app.js"></script>
</html>
