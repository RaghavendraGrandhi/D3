<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>D3 TreeHeatmap</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width">
        <link rel="stylesheet" href="resources/css/heat-map-2/main.css">
    </head>
    <body>
<div class="container-fluid">
	<div class="row">
		<div class="col-sm-2 bgblue">
			<%@ include file="menu.jsp"%>
		</div>
		<div class="col-sm-10">
			<div id="controls">
            <div class="depth">
                <span>Depth Levels:</span>
                <select onchange="depth_changed(this)">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3" selected>3</option>
                    <option value="4">4</option>
                </select>
            </div>
            <div class="values">
                <span>Values:</span>
                <select onchange="values_changed(this)">
                    <option value="0" selected>Revenues</option>
                    <option value="1">Cost</option>
                </select>
            </div>
            <div class="units">
                <span>Unit:</span>
                <select onchange="unit_changed(this)">
                    <option value="NONE">None</option>
                    <option value="CURRENCY" selected>USD</option>
                    <option value="PERCENT">%</option>
                </select>
            </div>
        </div>
        <div id="chart"></div>
		</div>
	</div>
</div> 

        

        <script src="resources/js/heat-map-2/jquery-1.7.2.min.js"></script>
        <script src="resources/js/heat-map-2/d3.min.js"></script>
        <script src="resources/js/heat-map-2/underscore-min.js"></script>
        <script src="resources/js/heat-map-2/heatmap.js"></script>

        <script>
        var data, options, heatmap;


        data = {
            label_short:'Acme',
            label_long:'Acme',
            children:[
                {
                    label_short:'NA',
                    label_long:'North America',
                    children:[
                        {
                            label_short:'US',
                            label_long:'United States',
                            children:[
                                {
                                    label_short:'NY',
                                    label_long:'New York',
                                    values:[200, 45],
                                },
                                {
                                    label_short:'SF',
                                    label_long:'San Francisco',
                                    values:[300, 12],
                                },
                                {
                                    label_short:'OTH',
                                    label_long:'Other',
                                    values:[100, 79],
                                }
                            ]
                        },
                        {
                            label_short:'CA',
                            label_long:'Canada',
                            children:[
                                {
                                    label_short:'MO',
                                    label_long:'Montreal',
                                    values:[60, 32],
                                },
                                {
                                    label_short:'VA',
                                    label_long:'Vancouver',
                                    values:[20, 33],
                                },
                                {
                                    label_short:'OTH',
                                    label_long:'Other',
                                    values:[40, 19],
                                }
                            ]
                        },
                        {
                            label_short:'MEX',
                            label_long:'Mexico',
                            children:[
                                {
                                    label_short:'MC',
                                    label_long:'Mexico City',
                                    values:[60, 90],
                                },
                                {
                                    label_short:'OTH',
                                    label_long:'Other',
                                    values:[20, 28],
                                }
                            ]
                        }
                    ]
                },
                {
                    label_short:'EU',
                    label_long:'Europe',
                    children:[
                        {
                            label_short:'FRA',
                            label_long:'France',
                            children:[
                                {
                                    label_short:'PA',
                                    label_long:'Paris',
                                    values:[80, 14],
                                },
                                {
                                    label_short:'MA',
                                    label_long:'Marseille',
                                    values:[10, 61],
                                },
                                {
                                    label_short:'LY',
                                    label_long:'Lyon',
                                    values:[8, 63],
                                },
                                {
                                    label_short:'OTH',
                                    label_long:'Other',
                                    values:[22, 45],
                                }
                            ]
                        },
                        {
                            label_short:'GER',
                            label_long:'Germany',
                            children:[
                                {
                                    label_short:'BE',
                                    label_long:'Berlin',
                                    values:[100, 81],
                                },
                                {
                                    label_short:'MU',
                                    label_long:'Munich',
                                    values:[30, 30],
                                },
                                {
                                    label_short:'OTH',
                                    label_long:'Other',
                                    values:[50, 11],
                                }
                            ]
                        }
                    ]
                }
            ]
        };

        function build_parent_links(node, parent) {
            node.parent = parent;
            if (node.children !== undefined)
                _.each(node.children, function(child){ build_parent_links(child, node); });
        }
        function aggregate_values(node) {
            if (node.values === undefined) {
                node.values = [0,0];
                _.each(node.children, function(child){
                    _.each(aggregate_values(child), function(value, index) { node.values[index] += value; });
                });
            }

            return node.values;
        }
        build_parent_links(data, null);
        aggregate_values(data);



        options = {
            title: 'Company Results',
            unit: 'CURRENCY',
            depth: 3,
            max_cell_width: 500,
            click_handler: click_handler,
        };

        heatmap = createTreeHeatmap( $('#chart').get(0), data, options );



        function unit_changed(e) {
            var unitValue = e.options[e.selectedIndex].value;
            heatmap.change_unit(unitValue);
        }

        function depth_changed(e) {
            var depthValue = parseInt(e.options[e.selectedIndex].value);
            heatmap.change_depth(depthValue);
        }

        function values_changed(e) {
            var value = parseInt(e.options[e.selectedIndex].value);
            heatmap.change_value_index(value);
        }

        function click_handler(is_drill_down, root_node, hit_node) {
            if (is_drill_down)
                heatmap.change_root_node(hit_node);
            else
                heatmap.change_root_node(root_node.parent);
        }
        </script>
    </body>
</html>
