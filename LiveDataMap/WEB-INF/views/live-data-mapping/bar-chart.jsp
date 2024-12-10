<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="">
<meta name="author" content="">
<style type="text/css">
li {
	text-align: left;
	margin: 15px;
}

.col-lg-4 p {
	margin: 15px;
}

.container-fluid {
	background-color: #121111
}

#hs-component {
	background-color: white;
	padding: 30px 0;
}

#hs-component .container {
	background-color: white;
	padding: 30px;
}

footer {
	bottom: 0px;
	margin-left: 100px;
	margin-right: 100px
}
   body{
    background-image: url(../resources/images/livedatamap/sa10.png);
    background-repeat: no-repeat;
   
    background-position: center bottom;
    background-attachment: fixed;
  }
</style>
<title>Custom charts with datasheet</title>
<link href="../resources/css/bar-chart/bootstrap.min.css"
	rel="stylesheet">
<script src="../resources/js/bar-chart/ie-emulation-modes-warning.js"></script>
<script type="text/javascript" src="../resources/js/bar-chart/jquery.js"></script>
<script type="text/javascript" src="../resources/js/bar-chart/i18n.js"></script>
<script type="text/javascript"
	src="../resources/js/bar-chart/VanBase.js"></script>
<script type="text/javascript"
	src="../resources/js/bar-chart/VanCharts.js"></script>
<script type="text/javascript">
	function draw(data) {
		 var text =$("#code").val(); 
		 console.log(text)
		 var options=eval("("+JSON.stringify(data)+")")
		var dom = $("#chartContainer");
		dom.empty();
		var charts = new VanCharts(options, dom);
	}
</script>
<link href="../resources/css/bar-chart/carousel.css" rel="stylesheet">
</head>
<body>
	<script>
		(function(i, s, o, g, r, a, m) {
			i['GoogleAnalyticsObject'] = r;
			i[r] = i[r] || function() {
				(i[r].q = i[r].q || []).push(arguments)
			}, i[r].l = 1 * new Date();
			a = s.createElement(o), m = s.getElementsByTagName(o)[0];
			a.async = 1;
			a.src = g;
			m.parentNode.insertBefore(a, m)
		})(window, document, 'script',
				'//www.google-analytics.com/analytics.js', 'ga');

		ga('create', 'UA-60507510-1', 'auto');
		ga('send', 'pageview');
	</script>



	<div id="hs-component">
		<div class="col-md-4">
			<textarea id="code" name="code"
				style="width: 378px; display: none; height: 500px;">
			
                    </textarea>

		</div>

		<div id="chartContainer" class="col-md-6"
			style="width: 878px; height: 500px;"></div>
			</div>

		<script type="text/javascript">
			$(document).ready(function() {
				//draw();
			});
			var data = ${data};
			console.log(data)
			processData(data);
			function showHome() {
				window.location.href = app_url + "trex/live-data-mapping";

			}
			function processData(data) {
				var seriesName = new Set();
				var categories = new Set();
				
				$.each(data,function(i,d){
					if(i!=0){
						seriesName.add(d[0])
						categories.add(d[1])
					}
				})
				var series =[]
				let count = 0;
				for (let item of seriesName) {
					var obj = {
							seriesName:item,
							value:[],
							seriesIndex:count++
					}
							
					
					$.each(data,function(i,d){
						if(i!=0 && item == d[0]){
							obj.value.push(d[2])
							
						}
					})
					series.push(obj);
				}

				constructMap(series,Array.from(categories))
			}
			function constructMap(series,category) {
				var dataObj ={
						  chartType: "Custom",
						  title: {
						    text: "Custom",
						    font: {
						      fontName: "Microsoft YaHei",
						      size: 18.666666666666668
						    }
						  },
						  legend: {font: {fontName: "Microsoft YaHei"}},
						  data: {
						    series:series,
						    category: category
						  },
						  canvasCount: 3,
						  dataSheet: {
						    font: {fontName: "Microsoft YaHei"},
						    background: {border: {
						      isRoundBorder: false,
						      borderStyle: 1,
						      borderColor: "rgb(0,0,0)"
						    }}
						  },
						  tooltip: {
						    isShowMutiSeries: false,
						    valueFormat: "#.##",
						    labelContent: "${SERIES}${BR}${CATEGORY}${BR}${VALUE}"
						  },
						  plot: {
						    typeConfig: [
						      {
						        conditionAttrType: "CustomAttr",
						        attrList: [{
						          attrType: "AttrBarSeries",
						          attr: {
						            seriesOverlapPercent: -0.25,
						            axisPosition: "LEFT",
						            categoryIntervalPercent: 1
						          }
						        }],
						        renderer: 1
						      },
						      {
						        conditionAttrType: "CustomAttr",
						        attrConditions: {"conditions": [{
						          compare: 0,
						          rightValue: 2,
						          leftValue: "SeriesIndex"
						        }]},
						        attrList: [{
						          attrType: "AttrLineSeries",
						          attr: {
						            isNullValueBreak: true,
						            axisPosition: "LEFT",
						            isCurve: false,
						            lineStyle: 5,
						            markerType: "NullMarker"
						          }
						        }],
						        renderer: 2
						      }
						    ],
						    conditionConfig: [
						      {
						        conditionAttrType: "CustomAttr",
						        attrConditions: {"conditions": [{
						          compare: 0,
						          rightValue: 1,
						          leftValue: ""
						        }]},
						        renderer: 1
						      },
						      {
						        conditionAttrType: "CustomAttr",
						        attrConditions: {"conditions": [{
						          compare: 0,
						          rightValue: 2,
						          leftValue: ""
						        }]},
						        renderer: 1
						      }
						    ],
						    yAxis: {
						      position: "left",
						      mainGridStyle: 1,
						      axisType: "ValueAxis",
						      font: {"fontName": "Century Gothic"},
						      gap: 0
						    },
						    "color": {
						      colorStyle: "fill",
						      definedColors: "bright"
						    },
						    xAxis: {
						      position: "bottom",
						      axisType: "CategoryAxis",
						      lineColor: "",
						      lineStyle: 0,
						      isShowAxisLabel: false,
						      drawBetweenTick: true,
						      tickMarkType: 0
						    }
						  }
						}
				//$("#code").val(dataObj);
				draw(dataObj);
				
			}
		</script>
</body>


<script src="../resources/js/bar-chart/bootstrap.min.js"></script>
<script src="../resources/js/bar-chart/docs.min.js"></script>
<!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
<script src="../resources/js/bar-chart/ie10-viewport-bug-workaround.js"></script>