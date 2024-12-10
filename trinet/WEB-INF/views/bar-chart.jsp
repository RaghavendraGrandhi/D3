<!DOCTYPE html>
<html lang="en"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
<style type="text/css">
li{text-align:left;margin:15px;}
.col-lg-4 p{margin:15px;}
.container-fluid{background-color:#121111}
#hs-component {
	background-color: white;
	padding: 30px 0;
}
#hs-component .container {
	background-color: white;
	padding: 30px;
}
footer{bottom:0px;margin-left:100px;margin-right:100px}
</style>
    <title>Custom charts with datasheet</title>
    <link href="resources/css/bar-chart/bootstrap.min.css" rel="stylesheet">
  <script src="resources/js/bar-chart/ie-emulation-modes-warning.js"></script>
 <script type="text/javascript" src="resources/js/bar-chart/jquery.js"></script>  
 <script type="text/javascript" src="resources/js/bar-chart/i18n.js"></script>
 <script type="text/javascript" src="resources/js/bar-chart/VanBase.js"></script>
 <script type="text/javascript" src="resources/js/bar-chart/VanCharts.js"></script>
 <script type="text/javascript">
function draw(){ 
     var text =$("#code").val(); 
	 var options=eval("("+text+")")
     var dom = $("#chartContainer");
	 dom.empty();
     var charts = new VanCharts(options, dom);
}
</script>
    <link href="resources/css/bar-chart/carousel.css" rel="stylesheet">
  </head>
   <body>
   <script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-60507510-1', 'auto');
  ga('send', 'pageview');

</script>
  <div class="container-fluid">
	<div class="row-fluid">
	<div class="col-lg-4">
	<a href="http://www.vancharts.com/" title="Javascript Charts library & maker-----VanCharts">
    <img class="img-circle" src="../img/vancharts-logo.png" alt="vancharts logo" style="align:center">
     </a>
</div>
		<div class="span12">
			<ul class="nav nav-pills pull-right">
				<li   class="active"><a href="/trinet">Home</a></li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</div>
  

<div id="hs-component">
		<div class="col-md-4">						
 <textarea id="code" name="code" style="width: 378px; height: 500px;">{
  "chartType": "Custom",
  "title": {
    "text": "Custom",
    "font": {
      "fontName": "Microsoft YaHei",
      "size": 18.666666666666668
    }
  },
  "legend": {"font": {"fontName": "Microsoft YaHei"}},
  "data": {
    "series": [
      {
        "seriesName": "2013",
        "value": [
          2301,
          2400,
          3100,
          2500,
          1500,
          1600,
          2500,
          3102,
          3204,
          4000,
          2300,
          1100
        ],
        "seriesIndex": 0
      },
      {
        "seriesName": "2014",
        "value": [
          2401,
          2300,
          3200,
          2700,
          1700,
          1500,
          2800,
          3200,
          3400,
          4200,
          2500,
          1500
        ],
        "seriesIndex": 1
      }
    ],
    "category": [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ]
  },
  "canvasCount": 3,
  "dataSheet": {
    "font": {"fontName": "Microsoft YaHei"},
    "background": {"border": {
      "isRoundBorder": false,
      "borderStyle": 1,
      "borderColor": "rgb(0,0,0)"
    }}
  },
  "tooltip": {
    "isShowMutiSeries": false,
    "valueFormat": "#.##",
    "labelContent": "${SERIES}${BR}${CATEGORY}${BR}${VALUE}"
  },
  "plot": {
    "typeConfig": [
      {
        "conditionAttrType": "CustomAttr",
        "attrList": [{
          "attrType": "AttrBarSeries",
          "attr": {
            "seriesOverlapPercent": -0.25,
            "axisPosition": "LEFT",
            "categoryIntervalPercent": 1
          }
        }],
        "renderer": 1
      },
      {
        "conditionAttrType": "CustomAttr",
        "attrConditions": {"conditions": [{
          "compare": 0,
          "rightValue": 2,
          "leftValue": "SeriesIndex"
        }]},
        "attrList": [{
          "attrType": "AttrLineSeries",
          "attr": {
            "isNullValueBreak": true,
            "axisPosition": "LEFT",
            "isCurve": false,
            "lineStyle": 5,
            "markerType": "NullMarker"
          }
        }],
        "renderer": 2
      }
    ],
    "conditionConfig": [
      {
        "conditionAttrType": "CustomAttr",
        "attrConditions": {"conditions": [{
          "compare": 0,
          "rightValue": 1,
          "leftValue": ""
        }]},
        "renderer": 1
      },
      {
        "conditionAttrType": "CustomAttr",
        "attrConditions": {"conditions": [{
          "compare": 0,
          "rightValue": 2,
          "leftValue": ""
        }]},
        "renderer": 1
      }
    ],
    "yAxis": {
      "position": "left",
      "mainGridStyle": 1,
      "axisType": "ValueAxis",
      "font": {"fontName": "Century Gothic"},
      "gap": 0
    },
    "color": {
      "colorStyle": "fill",
      "definedColors": "bright"
    },
    "xAxis": {
      "position": "bottom",
      "axisType": "CategoryAxis",
      "lineColor": "",
      "lineStyle": 0,
      "isShowAxisLabel": false,
      "drawBetweenTick": true,
      "tickMarkType": 0
    }
  }
}
                    </textarea>

</div>


<div class="col-md-2">
<button class="btn btn-primary"  type="button" onclick="javascript:draw()">Refresh</button>

					</div>
					<div id="chartContainer" class="col-md-6" style="width: 878px; height: 500px;">
					</div>

					<script type="text/javascript">
    $(document).ready(function(){
    draw();
    });
</script>



 


</body>

  
    <script src="resources/js/bar-chart/bootstrap.min.js"></script>
    <script src="resources/js/bar-chart/docs.min.js"></script>
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <script src="resources/js/bar-chart/ie10-viewport-bug-workaround.js"></script>
  

