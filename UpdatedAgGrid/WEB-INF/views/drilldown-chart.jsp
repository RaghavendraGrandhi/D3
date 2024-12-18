<!DOCTYPE html>
<html>
<head>
<link href="https://netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet">
<title>Drill Down Chart</title>
</head>
<body>
<a href="/trinet">Go Home</a>
<div id="container" style="height: 500px; min-width: 310px; max-width: 800px; margin: 0 auto"></div>
</body>
<script src="resources/js/high-charts/jquery-3.1.1.min.js"></script>
<script src="resources/js/high-charts/highmaps.js"></script>
<script src="resources/js/high-charts/data.js"></script>
<script src="resources/js/high-charts/drilldown.js"></script>
<script src="resources/js/high-charts/us-all.js"></script>
<script type="text/javascript">


/*
TODO:
- Check data labels after drilling. Label rank? New positions?
- Not US Mainland text
- Separators
*/

var data = Highcharts.geojson(Highcharts.maps['countries/us/us-all']),
    // Some responsiveness
    small = $('#container').width() < 400;

// Set drilldown pointers
$.each(data, function (i) {
    this.drilldown = this.properties['hc-key'];
    this.value = i; // Non-random bogus data
});

// Instanciate the map
Highcharts.mapChart('container', {
    chart: {
        events: {
            drilldown: function (e) {

                if (!e.seriesOptions) {
                    var chart = this,
                        mapKey = 'countries/us/' + e.point.drilldown + '-all',
                        // Handle error, the timeout is cleared on success
                        fail = setTimeout(function () {
                            if (!Highcharts.maps[mapKey]) {
                                chart.showLoading('<i class="icon-frown"></i> Failed loading ' + e.point.name);

                                fail = setTimeout(function () {
                                    chart.hideLoading();
                                }, 1000);
                            }
                        }, 3000);

                    // Show the spinner
                    chart.showLoading('<i class="icon-spinner icon-spin icon-3x"></i>'); // Font Awesome spinner

                    // Load the drilldown map
                    $.getScript('https://code.highcharts.com/mapdata/' + mapKey + '.js', function () {

                        data = Highcharts.geojson(Highcharts.maps[mapKey]);

                        // Set a non-random bogus value
                        $.each(data, function (i) {
                            this.value = i;
                        });

                        // Hide loading and add series
                        chart.hideLoading();
                        clearTimeout(fail);
                        chart.addSeriesAsDrilldown(e.point, {
                            name: e.point.name,
                            data: data,
                            dataLabels: {
                                enabled: true,
                                format: '{point.name}'
                            }
                        });
                    });
                }


                this.setTitle(null, { text: e.point.name });
            },
            drillup: function () {
                this.setTitle(null, { text: 'USA' });
            }
        }
    },

    title: {
        text: 'Highcharts Map Drilldown'
    },

    subtitle: {
        text: 'USA',
        floating: true,
        align: 'right',
        y: 50,
        style: {
            fontSize: '16px'
        }
    },

    legend: small ? {} : {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    colorAxis: {
        min: 0,
        minColor: '#E6E7E8',
        maxColor: '#005645'
    },

    mapNavigation: {
        enabled: true,
        buttonOptions: {
            verticalAlign: 'bottom'
        }
    },

    plotOptions: {
        map: {
            states: {
                hover: {
                    color: '#EEDD66'
                }
            }
        }
    },

    series: [{
        data: data,
        name: 'USA',
        dataLabels: {
            enabled: true,
            format: '{point.properties.postal-code}'
        }
    }],

    drilldown: {
        activeDataLabelStyle: {
            color: '#FFFFFF',
            textDecoration: 'none',
            textOutline: '1px #000000'
        },
        drillUpButton: {
            relativeTo: 'spacingBox',
            position: {
                x: 0,
                y: 60
            }
        }
    }
});



</script>
</html>