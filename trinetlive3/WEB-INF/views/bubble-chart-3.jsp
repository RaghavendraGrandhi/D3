
<!doctype html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

  <meta name="description" content="Visualization of movie ratings and profits">
  <meta name="author" content="Jim Vallandingham">

  <meta name="viewport" content="width=device-width,initial-scale=1">

  <!-- CSS-->
  <link href='resources/css/bubble-chart-3/b3.css' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" href="resources/css/bubble-chart-3/reset.css">
  <link rel="stylesheet" href="resources/css/bubble-chart-3/bootstrap.min.css">
  <link rel="stylesheet" href="resources/css/bubble-chart-3/chosen.css">
  <link rel="stylesheet" href="resources/css/bubble-chart-3/style.css">
  <!-- end CSS-->
  <script src="resources/js/bubble-chart-3/modernizr-2.0.6.min.js"></script>
</head>
<body>
<div class="container-fluid">
	<div class="row">
		<div class="col-sm-2 bgblue">
			<%@ include file="menu.jsp"%>
		</div>
		<div class="col-sm-10">
			<div class="container" id="main-container">
    <div id="main" role="main">
      <div class="row">
        <div class="span8">
          <select data-placeholder="Filter by Genre..." class="chzn-select" id="genre-select" multiple style="width:280px;" tabindex="4">
            <option value=""></option> 
            <option value="Action">Action</option> 
            <option value="Adventure">Adventure</option> 
            <option value="Animation">Animation</option> 
            <option value="Biography">Biography</option> 
            <option value="Comedy">Comedy</option> 
            <option value="Crime">Crime</option> 
            <option value="Documentary">Documentary</option> 
            <option value="Drama">Drama</option> 
            <option value="Horror">Horror</option> 
            <option value="Mystery">Mystery</option> 
            <option value="Romance">Romance</option> 
            <option value="Thriller">Thriller</option> 
          </select>
        </div>
        <div class="span5 offset3">
          <select data-placeholder="Filter by Story..." class="chzn-select" id="story-select" multiple style="width:280px;" tabindex="4">
            <option value=""></option>
            <option value="Comedy">Comedy</option>
            <option value="Discovery">Discovery</option>
            <option value="Escape">Escape</option>
            <option value="Fish Out Of Water">Fish Out Of Water</option>
            <option value="Journey And Return">Journey And Return</option>
            <option value="Love">Love</option>
            <option value="Maturation">Maturation</option>
            <option value="Metamorphosis">Metamorphosis</option>
            <option value="Monster Force">Monster Force</option>
            <option value="Pursuit">Pursuit</option>
            <option value="Quest">Quest</option>
            <option value="Rags To Riches">Rags To Riches</option>
            <option value="Rescue">Rescue</option>
            <option value="Revenge">Revenge</option>
            <option value="Rivalry">Rivalry</option>
            <option value="Sacrifice">Sacrifice</option>
            <option value="Temptation">Temptation</option>
            <option value="The Riddle">The Riddle</option>
            <option value="Tragedy">Tragedy</option>
            <option value="Transformation">Transformation</option>
            <option value="Underdog">Underdog</option>
            <option value="Wretched Excess">Wretched Excess</option>
          </select>
        </div>
      </div>
      <div id="vis"></div>
      <div id="tooltip" class="hidden">
        <div class="content"></div>
        <div class="tri"></div>
      </div>
      <div class="row">
        <div class="span5">
          <div id="years" class="control">
            <h3>Year</h3>
            <div class="control-links">
            <a id="all" class="active">All</a> | 
            <a id="2011">2011</a> | 
            <a id="2010">2010</a> | 
            <a id="2009">2009</a> | 
            <a id="2008">2008</a> | 
            <a id="2007">2007</a>
          </div>
          </div>
        </div>
        <div class="span3 offset5">
          <div id="top" class="control">
            <h3>Top</h3>
            <div class="control-links">
            <a id="top-0">0</a> | 
            <a id="top-5">5</a> | 
            <a id="top-15">15</a> | 
            <a id="top-25">25</a> | 
            <a id="top-50" class="active">50</a>
          </div>
            <h3>Rated</h3>
          </div>
        </div>
        <div class="span3">
          <div id="bottom" class="control">
            <h3>Lowest</h3>
            <div class="control-links">
              <a id="bottom-0" class="active">0</a> | 
              <a id="bottom-5">5</a> | 
              <a id="bottom-15">15</a> | 
              <a id="bottom-25">25</a> | 
              <a id="bottom-50">50</a>
            </div>
            <h3>Rated</h3>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="span4"><a id="key-link" href="javascript:void(0)">Hide Key</a></div>
        <div class="span4 offset8"><a id="story-link" href="javascript:void(0)">Hide Stories</a></div>
      </div>
      <div class="row">
        <div class="span7">
          <div id="key"></div>
          <p></p>
        </div>
        <div class="span9">
          <div id="stories-section">
            <div id="stories"> 
              <div id="story-list">
                <ul>
                  <li><a href="javascript:void(0)">Comedy</a></li>
                  <li><a href="javascript:void(0)">Discovery</a></li>
                  <li><a href="javascript:void(0)">Fish Out Of Water</a></li>
                  <li><a href="javascript:void(0)">Journey And Return</a></li>
                  <li><a href="javascript:void(0)">Love</a></li>
                  <li><a href="javascript:void(0)">Escape</a></li>
                  <li><a href="javascript:void(0)">Maturation</a></li>
                  <li><a href="javascript:void(0)">Metamorphosis</a></li>
                </ul>
                <ul>
                  <li><a href="javascript:void(0)">Pursuit</a></li>
                  <li><a href="javascript:void(0)">Quest</a></li>
                  <li><a href="javascript:void(0)">Monster Force</a></li>
                  <li><a href="javascript:void(0)">Rags To Riches</a></li>
                  <li><a href="javascript:void(0)">Rescue</a></li>
                  <li><a href="javascript:void(0)">Revenge</a></li>
                  <li><a href="javascript:void(0)">Rivalry</a></li>
                  <li><a href="javascript:void(0)">Sacrifice</a></li>
                </ul>
                <ul>
                  <li><a href="javascript:void(0)">Temptation</a></li>
                  <li><a href="javascript:void(0)">The Riddle</a></li>
                  <li><a href="javascript:void(0)">Tragedy</a></li>
                  <li><a href="javascript:void(0)">Transformation</a></li>
                  <li><a href="javascript:void(0)">Wretched Excess</a></li>
                  <li><a href="javascript:void(0)">Underdog</a></li>
                </ul>
              </div>
            </div>
            <div id="story-detail">
              <p>Hover over a story name for more information.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="details">
      <h2>Details</h2>
      <div class="row">
        <div class="col-sm-6 offset1">
          <p></p>
          <div id="detail-love">
            <h2>Most <span id="sub-title-love">Loved</span></h2>
          </div>
        </div>
        <div class="col-sm-6 offset2">
          <p></p>
          <div id="detail-hate">
              <h2>Most <span id="sub-title-hate">Hated</span></h2>
            </div>
          </div>
        </div>
      </div>
    </div> <!--! end of .container -->	
		</div>
	</div>
</div>
  

    <script src="resources/js/jquery-1.6.2.min.js"></script>
    <script>window.jQuery || document.write('<script src="js/libs/jquery-1.6.2.min.js"><\/script>')</script>


      <script defer src="resources/js/bubble-chart-3/plugins.js"></script>
      <script defer src="resources/js/bubble-chart-3/script.js"></script>
      <script src="resources/js/bubble-chart-3/jquery.lettering-0.6.1.min.js"></script>
      <script src="resources/js/bubble-chart-3/bootstrap-modal.js"></script>
      <script src="resources/js/bubble-chart-3/chosen.jquery.min.js"></script>
      <!-- <script src="js/libs/coffee-script.js"></script> -->
      <script src="resources/js/bubble-chart-3/d3.min.js"></script>
      <script src="resources/js/bubble-chart-3/d3.csv.min.js"></script>
      <!-- <script type="text/coffeescript" src="coffee/vis.coffee"></script> -->
      <script src="resources/js/bubble-chart-3/vis.js"></script>
      <script type="text/javascript">
        $(document).ready(function() {
            $("#title-top").lettering('words');
            $(".chzn-select").chosen();
            $('.control-links a').click(function() {
              $(this).siblings().removeClass('active');
              $(this).addClass('active');
              });
            $('#years a').click(function() {
              var new_options = {"year": $(this).attr("id")};
              update_options(new_options);
              });
            $('#top a').click(function() {
              var top_limit = $(this).attr("id").split("-");
              var new_options = {"top": parseInt(top_limit[1])};
              update_options(new_options);
              });
            $('#bottom a').click(function() {
              var bottom_limit = $(this).attr("id").split("-");
              var new_options = {"bottom": parseInt(bottom_limit[1])};
              update_options(new_options);
              });
            $("#genre-select").change(function() {
              var genres = $(this).val();
              var new_options = {"genres": genres};
              update_options(new_options);
              });
            $("#story-select").change(function() {
              var stories = $(this).val();
              var new_options = {"stories": stories};
              update_options(new_options);
              });
            $('#key-link').click(function() {
                $("#key").slideToggle( 'slow', function() {
                  var link = $('#key-link');
                  if(link.text() == "Show Key")
                  {
                  link.text('Hide Key');
                  }
                  else
                  {
                  link.text('Show Key');
                  }
                  });
                return false;
                });
            $('#story-link').click(function() {
                $("#stories-section").slideToggle('slow',function() {
                  var link = $('#story-link');
                  if(link.text() == "Show Stories")
                  {
                  link.text('Hide Stories');
                  }
                  else
                  {
                  link.text('Show Stories');
                  }
                  });
                return false;
                });

            var stories = {"Comedy": "A series of complications leads the protagonist into ridiculous situations.",
              "Discovery": "Through a major upheaval, the protagonist discovers a truth about themselves and a better understanding of life.",
              "Fish Out Of Water": "The protagonist tries to cope in a completely different place / time / world.",
              "Journey And Return": "The protagonist goes on a physical journey and returns changed.",
              "Love": "A couple meet and overcome obstacles to discover true love. Or – tragically – don’t.",
              "Escape": "The protagonist, trapped by antagonistic forces and must escape. Pronto.",
              "Maturation": "The protagonist has an experience that matures them or starts a new stage of life, often adulthood.",
              "Metamorphosis": "The protagonist literally changes into something else (i.e. a werewolf, hulk, giant cockroach).",
              "Pursuit": "The protagonist has to chase somebody or something, usually in a hide-and-seek fashion.",
              "Quest": "The protagonist searches for a person, place or thing, overcoming a number of challenges.",
              "Monster Force": "A monster / alien / something scary and supernatural must be fought and overcome.",
              "Rags To Riches": "The protagonist is poor, then rich.",
              "Rescue": "The protagonist must save someone who is trapped physically or emotionally.",
              "Revenge": "The protagonist retaliates against another for a real or imagined injury.",
              "Rivalry": "The protagonist must triumph over a adversary to attain an object or goal.",
              "Sacrifice": "The protagonist must make a difficult choice between pleasing themselves or a higher purpose (e.g. love, honour).",
              "Temptation": "The protagonist has to make a moral choice between right and wrong.",
              "The Riddle": "The protagonist has to solve a puzzle or a crime.",
              "Tragedy": "The protagonist is brought down by a fatal flaw in their character or by forces out of their control.",
              "Transformation": "The protagonist lives through a series of events that change them as a person.",
              "Wretched Excess": "The protagonist pushes the limits of acceptable behaviour, destroying themselves in the process.",
              "Underdog": "Total loser faces overwhelming odds but wins in the end."
            };

            $('#story-list a').mouseover(function() {
                var key = $(this).text();
                var story = stories[key];
                $("#story-detail p").html(story);
                return false;
                });
            });
          </script>


<script> // Change UA-XXXXX-X to be your site's ID
  window._gaq = [['_setAccount','UA-17355070-1'],['_trackPageview'],['_trackPageLoadTime']];
  Modernizr.load({
    load: ('https:' == location.protocol ? '//ssl' : '//www') + '.google-analytics.com/ga.js'
  });
</script>


<!--[if lt IE 7 ]>
<script src="//ajax.googleapis.com/ajax/libs/chrome-frame/1.0.3/CFInstall.min.js"></script>
<script>window.attachEvent('onload',function(){CFInstall.check({mode:'overlay'})})</script>
<![endif]-->

</body>
</html>