
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=1200">
    <title>Simpson's Paradox</title>

    <link rel="stylesheet" href="../resources/css/simpson-paradox/bootstrap.min.css">
    <link href="../resources/css/simpson-paradox/flat-ui.css" rel="stylesheet">
    <link rel="stylesheet" href="../resources/css/simpson-paradox/simp-style.css">
  </head>
  <body ng-app="mainApp">
   <div class="container" ng-controller="MainCtrl">
        <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>

    <a href="/trinet">Go Home</a>
      <div class="row">
    
        <div class="col-lg-6">
          <div id = "donut-chart"></div>
        </div>
		 <div class="col-lg-6">
          <div id = 'line-chart'></div>
        </div>
      </div>
      <div class="row">

       
      </div>
      
        <br>
      <div class="row">
     
        <div class="force-directed-container vis col-lg-8">
          <h4> Departments </h4>
          <svg></svg>
          <a class="btn btn-primary combine-button" href="#">combine</a>
        </div>
      </div>
   
        <!-- the table -->
     
<div class="row">
  <div class="col-lg-4" >
      <div line-chart></div>
      <div slider class="ui-slider female" gender="female" style="position: relative; left: 45px; width: 235px"></div>
      <div slider class="ui-slider male" gender="male" style="position: relative; left: 45px; width: 235px"></div>
  </div>

  <div class="col-lg-8">
    <table class="table table-striped">
      <thead>
        <tr>
          <th colspan = "1"></th>
          <th colspan = "2"># applied</th>
          <th colspan = "2"># admitted</th>
          <th colspan = "2">% admitted</th>
        </tr>
        <tr>
          <th colspan = "1">departments</th>
          <th colspan = "1">men</th>
          <th colspan = "1">women</th>
          <th colspan = "1">men</th>
          <th colspan = "1">women</th>
          <th colspan = "1">men</th>
          <th colspan = "1">women</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>"Easy"</td>
          <td>
            {{departments.easy.male.applied| number:0 }} <br>
            <div bar measure="applied" gender="male" program = "easy"></div>
          </td>
          <td>
            {{departments.easy.female.applied| number:0 }}<br>
            <div bar measure="applied" gender="female" program = "easy"></div>
          </td>
          <td>
            {{departments.easy.male.admitted| number:0 }} <br>
            <div bar measure="admitted" gender="male" program = "easy"></div>
          </td>
          <td>
            {{departments.easy.female.admitted| number:0 }} <br>
            <div bar measure="admitted" gender="female" program = "easy"></div>
          </td>
          <td>
            <div donut gender="male" department="easy"></div>
          </td>
          <td>
            <div donut gender="female" department="easy"></div>
          </td>
        </tr>

        <tr>
          <td>"Hard"</td>
          <td>{{departments.hard.male.applied | number:0 }} <br>
            <div bar measure="applied" gender="male" program = "hard"></div>
          </td>
          <td>
            {{departments.hard.female.applied | number:0 }} <br>
            <div bar measure="applied" gender="female" program = "hard"></div>
          </td>
          <td>
            {{departments.hard.male.admitted | number:0 }} <br>
            <div bar measure="admitted" gender="male" program = "hard"></div>
          </td>
          <td>
            {{departments.hard.female.admitted | number:0 }} <br>
            <div bar measure="admitted" gender="female" program = "hard"></div>
          </td>
          <td>
            <div donut gender="male" department="hard"></div>
          </td>
          <td>
            <div donut gender="female" department="hard"></div>
          </td>
        </tr>
        
        
        <tr>
          <td>Combined</td>
          <td>{{departments.hard.male.applied + departments.easy.male.applied| number:0 }}</td>
          <td>{{departments.hard.female.applied + departments.easy.female.applied| number:0 }}</td>
          <td>{{departments.hard.male.admitted + departments.easy.male.admitted| number:0 }}</td>
          <td>{{departments.hard.female.admitted + departments.easy.female.admitted| number:0 }}</td>
          <td>
            <div donut gender="male" department="combined"></div>
          </td>
          <td>
            <div donut gender="female" department="combined"></div>
          </td>
        </tr>
        <tr>
          <td colspan="7">
            <h3 id="declaration">Simpson's paradox? {{pdox}}</h3>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>


    </div><!-- /.container -->  
    <div class="custom-tooltip" style="opacity:0;"></div>
  </body>
    <!-- libraries: js -->
	<script src="../resources/js/d3.v3.min.js" charset="utf-8"></script>
    <script type="text/javascript" src="../resources/js/simpson-paradox/underscore.js"></script>
    <script src="../resources/js/simpson-paradox/angular.min.js"></script>
    <script src="../resources/js/simpson-paradox/jquery-1.8.3.min.js"></script>
    <script src="../resources/js/simpson-paradox/jquery-ui-1.10.3.custom.min.js"></script>
    <script src="../resources/js/simpson-paradox/bootstrap.min.js"></script>

    <!-- non-angular scripts -->
    <script src="../resources/js/simpson-paradox/line-chart.js"></script>
    <script src="../resources/js/simpson-paradox/donut-chart.js"></script>
    <script src="../resources/js/simpson-paradox/force-directed.js"></script>
    <script src="../resources/js/simpson-paradox/tooltip.js"></script>

  <!-- build:js({.tmp,app}) scripts/scripts.js -->
    <script src="../resources/js/simpson-paradox/app.js"></script>
    <script src="../resources/js/simpson-paradox/controller.js"></script>
    <script src="../resources/js/simpson-paradox/donutDirect.js"></script>
    <script src="../resources/js/simpson-paradox/slider.js"></script>
    <script src="../resources/js/simpson-paradox/lineDirect.js"></script>
    <script src="../resources/js/simpson-paradox/barDirect.js"></script>
    <script src="../resources/js/treemap/tableau-extensions-1.latest.js"></script>
<script src="../resources/js/tableau-extension/tabluea-util.js"></script>

</html>