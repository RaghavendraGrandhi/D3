var dashboard, level1, level = 0, consolidateData = [], fieldNames = [], worksheet, home_url, visualization_code, columnHierarchial = [], app_url, start, end,gridOptions;
var columnData=[];
$(document).ready(function () {

	$(".visualization").css("display", "none");
	$(".spinner").css("display", "block");

	url = window.location.href;
	url_array = url.split("/");
	map_name = url_array[5];
	level = url_array[url_array.length - 1];
	app_url = url_array[0] + "/" + url_array[1] + "/" + url_array[2] + "/" + url_array[3] + "/";
	home_url = url_array[0] + "/" + url_array[1] + "/" + url_array[2] + "/" + url_array[3] + "/" + url_array[4] + "/" + url_array[5] + "/";
	var urlParams = new URLSearchParams(window.location.search);
	let isConfigure = urlParams.get('isConfigure');
	
	tableau.extensions.initializeAsync({ 'configure': configure }).then(function () {
		dashboard = tableau.extensions.dashboardContent.dashboard;
		const payLoadString = tableau.extensions.settings.get("payLoad");
		console.log(payLoadString)
		console.log(isConfigure)
		if (isConfigure == "0" && payLoadString) {
			constructAdvancedChartDataWithPayLoad(JSON.parse(payLoadString));
		} else {
			configure();
		}
	});

});
function showHome(){
	window.location.href = app_url+"trex/live-data-mapping?isConfigure=1";
}
// CONFIGURE Advanced Visualization

function constructAdvancedChartData() {
	visualization_code = tableau.extensions.settings.get("visualization_code");
	if(visualization_code != 1){
		var data1 = [];
		var consolidateData = [];
		var properties = [];
		var list = [];
		var listSorted = [];
		var columnArray = [];
		var columnsWithDataTypes = [];
		var metrics = [];
		var count_field = tableau.extensions.settings.get("selected_fields_count");
		for (var x = 0; x < count_field; x++) {
			data1.push(tableau.extensions.settings.get("selected_fields_" + x));
			properties.push(tableau.extensions.settings.get("selected_properties_" + x));
		}
	
		var worksheets = dashboard.worksheets;
		var dataSourceName = "";
		worksheet = worksheets.find(function (sheet) {
			sheet.getDataSourcesAsync().then(function (sumdata) {
				dataSourceName = sumdata[0].name;
			})
			return sheet.name === worksheetName;
		});
		var dataColumns = [];
		var metricLength = tableau.extensions.settings.get("metric_count");
	
		for (let i = 0; i < metricLength; i++) {
			metrics.push(tableau.extensions.settings.get("metric_" + i));
		}
	
		const filterEvent = tableau.TableauEventType.FilterChanged;
	
		worksheet.getDataSourcesAsync().then(datasources => {
			dataSources1 = datasources.find(datasource => datasource.name === datasources[0].name);
			return dataSources1.getUnderlyingDataAsync();
		}).then(dataTable => {
			let columns = dataTable.columns
			
			consolidateData[0] = [];
			// list[0]=[];
			$.each(data1, function (j, k) {
	
				let arr = k.split("_");
				consolidateData[0].push(arr[1]);
				// list[0].push(arr[1]);
				columnArray.push(arr[1]);
				columnsWithDataTypes.push(columns[arr[0]]);
			})
			console.log(columnsWithDataTypes);
			if (visualization_code == 1) {
				$.each(metrics, function (j, k) {
					// let arr = k.split("_");
					consolidateData[0].push(k);
				})
			}
			$.each(dataTable.data, function (i, d) {
	
	
				consolidateData[i + 1] = [];
				list[i + 1] = [];
				$.each(data1, function (j, k) {
					let arr = k.split("_");
					consolidateData[i + 1].push(d[arr[0]].value);
					list[i + 1].push(d[arr[0]].value);
	
	
				})
				if (visualization_code == 1) {
					$.each(metrics, function (j, k) {
						console.log(k)
						let arr = k.split("_");
						consolidateData[i + 1].push(d[arr[0]].value);
	
	
					})
				}
			})
	
	
			list = _.sortBy(list, list[0]);
			listSorted[0] = columnArray;
			list.forEach(l => listSorted.push(l))
			listSorted = listSorted.filter(e => (e != undefined && e != null))
	
			if (visualization_code == 3 || visualization_code == 4) {
				switchVisualization(visualization_code, listSorted, properties);
			} else {
				var obj = {
					properties: properties,
					data: listSorted,
					consolidateData: consolidateData
				}
				$.ajax({
					url: app_url + "storeData",
					type: 'POST',
					data: JSON.stringify(obj),
					dataType: 'json',
					success: function (d) {
	
						switchVisualization(visualization_code, listSorted, properties)
	
					},
					cache: false,
					contentType: 'application/json; charset=utf-8',
					processData: false,
					error: function (d) {
	
						$("#error_msg").text(d.responseText);
						$(".alert-danger").show().delay(5000).fadeOut('slow');
					}
				});
			}
	
		});
	}else{
		constructAgGrid();
	}

}
function constructAdvancedChartDataWithPayLoad(payLoad) {
	console.log(payLoad)
	if(payLoad.visualizationCode != 1){
		var data1 = [];
		var consolidateData = [];
		var properties = [];
	
		var list = [];
		var listSorted = [];
		var columnArray = [];
		var columnsWithDataTypes = [];
		var metrics = [];
		visualization_code = payLoad.visualizationCode;
		var worksheets = dashboard.worksheets;
		var dataSourceName = "";
		worksheet = worksheets.find(function (sheet) {
			sheet.getDataSourcesAsync().then(function (sumdata) {
				dataSourceName = sumdata[0].name;
			})
			return sheet.name === worksheetName;
		});
		var dataColumns = [];
	
		const filterEvent = tableau.TableauEventType.FilterChanged;
	
		worksheet.getDataSourcesAsync().then(datasources => {
			dataSources1 = datasources.find(datasource => datasource.name === datasources[0].name);
			return dataSources1.getUnderlyingDataAsync();
		}).then(dataTable => {
			let columns = dataTable.columns
	
			consolidateData[0] = [];
			// list[0]=[];
			$.each(payLoad.columns, function (j, k) {
	
				let arr = k.split("_");
				consolidateData[0].push(arr[1]);
				// list[0].push(arr[1]);
				columnArray.push(arr[1]);
				columnsWithDataTypes.push(columns[arr[0]]);
			})
			if (visualization_code == 1 || visualization_code == 3 || visualization_code == 4) {
				$.each(payLoad.metrics, function (j, k) {
					// let arr = k.split("_");
					consolidateData[0].push(k);
				})
			}
			$.each(dataTable.data, function (i, d) {
				consolidateData[i + 1] = [];
				list[i] = [];
				payLoad.columns.forEach(k=> {
					let arr = k.split("_");
					consolidateData[i + 1].push(d[arr[0]].value);
					list[i].push(d[arr[0]].value);
				})
				if (visualization_code == 1 || visualization_code == 3 || visualization_code == 4) {
					$.each(payLoad.metrics, function (j, k) {
						let arr = k.split("_");
						consolidateData[i + 1].push(d[arr[0]].value);
					})
				}
			})
			
			
			if (visualization_code == 3 || visualization_code == 4) {
				if(payLoad.metrics != undefined && payLoad.metrics.length>0){
					list = getCalculatedArray(list,consolidateData,payLoad.metrics);
				}
				list = _.sortBy(list, list[0]);
				console.log(list)
				listSorted[0] = columnArray;
				list.forEach(l => listSorted.push(l))
				listSorted = listSorted.filter(e => (e != undefined && e != null))
				switchVisualization(visualization_code, listSorted, properties,payLoad.metrics);
			} else if(visualization_code != 2) {
				var obj = {
					properties: properties,
					data: listSorted,
					consolidateData: consolidateData
				}
				list = _.sortBy(list, list[0]);
				listSorted[0] = columnArray;
				list.forEach(l => listSorted.push(l))
				listSorted = listSorted.filter(e => (e != undefined && e != null))
				switchVisualization(visualization_code, listSorted, properties,payLoad.metrics)
			}else if(visualization_code == 2){
				list = _.sortBy(list, list[0]);
				listSorted[0] = columnArray;
				list.forEach(l => listSorted.push(l))
				listSorted = listSorted.filter(e => (e != undefined && e != null))
//				const filterEvent = tableau.TableauEventType.FilterChanged;
//				worksheet.addEventListener(filterEvent, function (selectionEvent) {
//					console.log(selectionEvent)
//					constructAdvancedCoffeeWheel(listSorted);
//				});
				constructAdvancedCoffeeWheel(listSorted);
			}
	
		});
	}else{
		constructAgGrid()
	}

}

function getCalculatedArray(list,consolidateData,metric){
	let d =[];
	list.forEach(e=>d.push(e[0]))
	d=$.unique(d);
	let arr = metric[0].split("_");
	let data = [];
	if(arr[2]!= "NONE"){
	switch (arr[2]) {
		case "SUM":
			d.forEach(e=>{
				let a=[],r=[];
				consolidateData.forEach(c=>{
					if(c[0] == e){
						a.push(c[1]);
					}
				})
				r.push(e);
				r.push(_.sum(a).toFixed(2).toString());
				data.push(r);
			})
			return data;
		case "AVG":
			d.forEach(e=>{
				let a=[],r=[];
				consolidateData.forEach(c=>{
					if(c[0] == e){
						a.push(c[1]);
					}
				})
				r.push(e);
				r.push((_.sum(a)/a.length).toFixed(2).toString());
				data.push(r);
			})
			return data;
		case "MIN":
			d.forEach(e=>{
				let a=[],r=[];
				consolidateData.forEach(c=>{
					if(c[0] == e){
						a.push(c[1]);
					}
				})
				r.push(e);
				r.push(_.min(a).toFixed(2).toString());
				data.push(r);
			})
			return data;
		case "MAX":
			d.forEach(e=>{
				let a=[],r=[];
				consolidateData.forEach(c=>{
					if(c[0] == e){
						a.push(c[1]);
					}
				})
				r.push(e);
				r.push(_.max(a).toFixed(2).toString());
				data.push(r);
			})
			return data;
		case "COUNT":
			d.forEach(e=>{
				let a=[],r=[];
				consolidateData.forEach(c=>{
					if(c[0] == e){
						a.push(c[1]);
					}
				})
				r.push(e);
				r.push(a.length.toString());
				data.push(r);
			})
			return data;
		case "DISTINCT COUNT":
			d.forEach(e=>{
				let a=[],r=[];
				consolidateData.forEach(c=>{
					if(c[0] == e){
						a.push(c[1]);
					}
				})
				r.push(e);
				r.push($.unique(a).length.toString());
				data.push(r);
			})
			return data;
		
		default:
			break;
	}
	}
	
}
function switchVisualization(visualization_code, list, properties,metrics) {

	$(".visualization").css("display", "none");
	
	switch (parseInt(visualization_code)) {
		case 1:
			constructAgGrid();
			$('.spinner').css("display", "none");
			$("#agGrid").css("display", "block");
			break;
		case 2:
			constructAdvancedCoffeeWheel(list);
			$('.spinner').css("display", "none");
			$("#coffeeWheel").css("display", "block");
			break;
		case 3:
			constructHierarchialEdgeBundling(list);
			$('.spinner').css("display", "none");
			$("#hierarchialEdgeBundling").css("display", "block");
			break;
		case 4:
			constructConceptmap(list);
			$('.spinner').css("display", "none");
			$("#conceptMap").css("display", "block");
			break;
		case 5:
			constructTreeLayout(list);
			$('.spinner').css("display", "none");
			break;
		case 6:
			constructBarChart(list);
			$('.spinner').css("display", "none");
			break;
		case 7:
			constructPieChart(list);
			$('.spinner').css("display", "none");
			break;
		default:
			break;
	}

}

function constructCoffeeWheel(x) {
	drawMap(x);
}

function constructConceptmap(x) {
	processDataForConceptMap(x);
}

function constructTreeLayout(x) {
	window.location.href = app_url + "trex/wfa-new-tree-map";
}

function constructBarChart(x) {
	window.location.href = app_url + "extension/bar-chart";
}

function constructPieChart(x) {
	window.location.href = app_url + "extension/pie-chart";
}

// AG GRID

function constructAgGrid() {
	window.location.href = app_url + "extension/ag-grid?isConfigure=1";
}

// CONFIGURE
function configure() {
	tableau.extensions.initializeAsync({ 'configure': showHome }).then(function () {
		tableau.extensions.settings.saveAsync().then(function () {
			const popupUrl = app_url + `advanced/configure?workSheet=` + worksheetName;
			tableau.extensions.ui.displayDialogAsync(popupUrl, 0, { height: 500, width: 1200 }).then((closePayload) => {
				if (tableau.extensions.settings.get("visualization_code") != 2) {
					constructAdvancedChartDataWithPayLoad(JSON.parse(tableau.extensions.settings.get("payLoad")));
				}
				if (tableau.extensions.settings.get("visualization_code") == 2) {
//					var worksheets = dashboard.worksheets;
//					var dataSourceName = "";
//					worksheet = worksheets.find(function (sheet) {
//						sheet.getDataSourcesAsync().then(function (sumdata) {
//							dataSourceName = sumdata[0].name;
//						})
//						return sheet.name === worksheetName;
//					});
//					const filterEvent = tableau.TableauEventType.FilterChanged;
//					worksheet.addEventListener(filterEvent, function (selectionEvent) {
//						console.log(selectionEvent)
//						constructAdvancedChartDataWithPayLoad(JSON.parse(tableau.extensions.settings.get("payLoad")));
//					});
					constructAdvancedChartDataWithPayLoad(JSON.parse(tableau.extensions.settings.get("payLoad")));
				}

			}).catch((error) => {
				switch (error.errorCode) {
					case tableau.ErrorCodes.DialogClosedByUser:
						console.log("Dialog was closed by user");
						break;
					default:
						console.error(error.message);
				}
			});
		})
	});
}
// TWO WAY BINDINGS FOR COFFEE WHEEl
function constructAdvancedCoffeeWheel() {
	var data1 = [];
	var consolidateData = [];
	var properties = [];
	var list = [];
	var metrics = [];
	var worksheets = dashboard.worksheets;
	var dataSourceName = "";
	var dataColumns = [];
	var count_field = tableau.extensions.settings.get("selected_fields_count");
	visualization_code = tableau.extensions.settings.get("visualization_code");

	for (var x = 0; x < count_field; x++) {
		data1.push(tableau.extensions.settings.get("selected_fields_" + x));
		properties.push(tableau.extensions.settings.get("selected_properties_" + x));
	}
	
	worksheet = worksheets.find(function (sheet) {
		sheet.getDataSourcesAsync().then(function (sumdata) {
			dataSourceName = sumdata[0].name;
		})
		return sheet.name === worksheetName;
	});
	const filterEvent = tableau.TableauEventType.FilterChanged;
	worksheet.getDataSourcesAsync().then(datasources => {
		dataSources1 = datasources.find(datasource => datasource.name === datasources[0].name);
		return dataSources1.getUnderlyingDataAsync();
	}).then(dataTable => {
		console.log(dataTable)
		let columns = dataTable.columns
		list[0] = [];
		$.each(data1, function (j, k) {
			let arr = k.split("_");
			list[0].push(arr[1]);
		})
		$.each(dataTable.data, function (i, d) {
			list[i + 1] = [];
			$.each(data1, function (j, k) {
				let arr = k.split("_");
				list[i + 1].push(d[arr[0]].value);
			})
		})
		constructCoffeeWheel(list);
		$('.spinner').css("display", "none");
		$("#coffeeWheel").css("display", "block");
	});
}

// HIERARCHIAL EDGE BUNDLING


var nodeData = [];
var nodeIndex = 0;
var rowIndex = 0;
var rowIndexAlt = 0;
var isMouseOver = false;
var diameter, cluster, line, svg, link



function constructHierarchialEdgeBundling(list) {
	var set = new Set();
	var arr = []
	columnHierarchial = list[0];
	$.each(list, function (i, d) {
		if (i != 0) {

			set.add(d[1]);
			var obj = {
				"name": d[0].toString(),
				"size": null,
				"imports": getImport(list, d),
				"column": list[0][0]

			}
			arr.push(obj)
		}
	});
	console.log(set)
	set.forEach(function (value) {
		var obj = {
			"name": value,
			"size": null,
			"imports": getImports(value, list),
			"column": list[0][1]

		}
		arr.push(obj)
	});
	console.log(arr)
	drawHierarchialMap(arr)
}
function getImport(list, d) {

	var arr1 = [];
	$.each(list, function (k, p) {
		if (k != 0) {

			if (p[0] == d[0]) {
				arr1.push(p[1]);
			}

		}
	});
	return arr1;

}


function getImports(value, list) {
	var arr1 = [];
	$.each(list, function (i, d) {
		if (1 != 0) {
			if (d[1] == value) {
				arr1.push(d[0]);
			}
		}
	})
	return arr1;
}
// drawHierarchialMap();
function drawHierarchialMap(classes, col) {
	d4.select("#hierarchial").html("");
	diameter = 700, radius = diameter / 2, innerRadius = radius - 120;
	cluster = d4.cluster().size([360, innerRadius]);

	line = d4.radialLine().curve(d4.curveBundle.beta(0.85)).radius(
		function (d) {
			return d.y;
		}).angle(function (d) {
			return d.x / 180 * Math.PI;
		});

	svg = d4.select("#hierarchial").append("svg").attr("width", diameter).attr(
		"height", diameter).append("g").attr("transform",
			"translate(" + radius + "," + radius + ")");

	link = svg.append("g").selectAll(".link"), node = svg.append("g")
		.selectAll(".node");
	/*
	 * d4.json("hierarchical-edge-bundling-excel", function(error, classes) { if
	 * (error) throw error;
	 */

	var root = packageHierarchy(classes).sum(function (d) {
		return d.size;
	});
	var set = new Set();
	for (i = 0; i < classes.length; i++) {
		set.add(classes[i].name);

	}
	set.forEach(function (value) {
		d4.select("#users").append("option").text(value);
	});
	$('.form-control-chosen').chosen({
		allow_single_deselect: false,
		width: '100%'
	});
	$('.form-control-chosen-required').chosen({
		allow_single_deselect: false,
		width: '100%'
	});
	$('.form-control-chosen-search-threshold-100').chosen({
		allow_single_deselect: false,
		disable_search_threshold: 100,
		width: '100%'
	});
	$('.form-control-chosen-optgroup').chosen({
		width: '100%'
	});

	$(function () {
		$('[title="clickable_optgroup"]').addClass(
			'chosen-container-optgroup-clickable');
	});

	cluster(root);

	link = link.data(packageImports(root.leaves())).enter().append("path")
		.each(function (d) {
			d.source = d[0], d.target = d[d.length - 1];
		}).attr("class", "link").attr("d", line);

	node = node.data(root.leaves()).enter().append("text").attr("class",
		"node").attr("id", function (d) {
			rowIndexAlt++;
			var rowIndex = rowIndexAlt - 1;
			d['specialIndex'] = rowIndex;
			nodeData.push(d);

			return "node-" + rowIndex;
		}).attr("dy", "0.31em").attr(
			"transform",
			function (d) {
				return "rotate(" + (d.x - 90) + ")translate(" + (d.y + 8)
					+ ",0)" + (d.x < 180 ? "" : "rotate(180)");
			}).attr("text-anchor", function (d) {
				return d.x < 180 ? "start" : "end";
			}).text(function (d) {
				return d.data.name;
			}).on("mouseover", mouseovered).on("mouseout", mouseouted);
	// });
}

function mouseovered(d) {
	lenght = 0;
	d4.selectAll(".search-choice").each(function () {
		lenght++
	})
	if (lenght == 0) {
		isMouseOver = true;

		$(".node").css({
			fill: "",
			"font": ""
		});

		highlightSourceAndTarget(d);
		tabFileter(d);
	}

}
function tabFileter(d) {

	tableau.extensions.initializeAsync().then(function () {
		const dashboard = tableau.extensions.dashboardContent.dashboard;

		// Then loop through each worksheet and get its filters, save
		// promise for later.
		dashboard.worksheets.forEach(function (worksheet) {

			worksheet.clearFilterAsync(columnHierarchial[0])
			if (Array.isArray(d)) {
				worksheet.applyFilterAsync(columnHierarchial[0], d,
					tableau.FilterUpdateType.Replace);
			} else {
				worksheet.applyFilterAsync(columnHierarchial[0], [d.data.name],
					tableau.FilterUpdateType.Replace);
			}


		});

		d4.selectAll(".inline-loader").classed("inline-loader", false);

	}, function (err) {
		// Something went wrong in initialization.
		console.log('Error while Initializing: ' + err.toString());
	});
}
function tabFileterClear(d) {

	tableau.extensions.initializeAsync().then(function () {
		const dashboard = tableau.extensions.dashboardContent.dashboard;

		// Then loop through each worksheet and get its filters, save
		// promise for later.
		dashboard.worksheets.forEach(function (worksheet) {

			worksheet.clearFilterAsync(columnHierarchial[0])


		});

		d4.selectAll(".inline-loader").classed("inline-loader", false);

	}, function (err) {
		// Something went wrong in initialization.
		console.log('Error while Initializing: ' + err.toString());
	});
}
function highlightSourceAndTarget(d) {

	node.each(function (n) {
		n.target = n.source = false;
	});

	link.classed("link--target", function (l) {
		if (l.target === d) {
			return l.source.source = true
		}
		;

	}).classed("link--source", function (l) {
		if (l.source === d) {
			return l.target.target = true;
		}

	}).filter(function (l) {

		return l.target === d || l.source === d;

	}).raise();

	node.classed("node--target", function (n) {
		return n.target;
	}).classed("node--source", function (n) {
		return n.source;
	});

}

function mouseouted(d) {
	lenght = 0;
	d4.selectAll(".search-choice").each(function () {
		lenght++
	})
	if (lenght == 0) {
		isMouseOver = false;
		link.classed("link--target", false).classed("link--source", false);

		node.classed("node--target", false).classed("node--source", false);
	}
	tabFileterClear(d)
}

// Lazily construct the package hierarchy from class names.
function packageHierarchy(classes) {
	console.log(classes)
	var map = {};

	function find(name, data, index, column) {
		var node = map[name], i;
		if (!node) {
			node = map[name] = data || {
				name: name,
				children: []
			};
			if (name.length) {
				node.parent = find(name.substring(0, i = name
					.lastIndexOf(".")));
				node.parent.children.push(node);
				node.key = name.substring(i + 1);
				node.index = index;
				node.column = column;
			}
		}
		return node;
	}

	classes.forEach(function (d, index) {
		find(d.name, d, index);
	});
	return d4.hierarchy(map[""]);
}

// Return a list of imports for the given array of nodes.
function packageImports(nodes) {
	var map = {}, imports = [];

	// Compute a map from name to node.
	nodes.forEach(function (d) {
		map[d.data.name] = d;
	});

	// For each import, construct a link from the source to target node.
	nodes.forEach(function (d) {
		if (d.data.imports)
			d.data.imports.forEach(function (i) {
				if (map[i] != undefined) {
					imports.push(map[d.data.name].path(map[i]));
				}

			});
	});
	return imports;
}
var r = function setInterval(){
	if(visualization_code == 3){
		window
		.setInterval(
			function () {
				if (!isMouseOver) {
					if (nodeIndex < nodeData.length
						&& nodeData[nodeIndex].specialIndex == nodeIndex) {
						if (nodeIndex > 0) {
							var previousIndex = nodeIndex - 1;
							mouseouted(nodeData[previousIndex]);
						}
						$(".node")
							.css(
								{
									fill: "#bbb",
									"font": "300 11px Helvetica Neue, Helvetica, Arial, sans-serif"
								});
						$('#node-' + nodeData[nodeIndex].specialIndex)
							.css({
								fill: "#000",
								"font-weight": "700"
							});
						highlightSourceAndTarget(nodeData[nodeIndex]);
						nodeIndex++;
					} else {
						nodeIndex = 0;
					}
				}

			}, 1000);
	}
}


$(document).on(
	'click',
	'[title="clickable_optgroup"] .group-result',
	function () {

		var unselected = $(this).nextUntil('.group-result').not(
			'.result-selected');
		if (unselected.length) {
			unselected.trigger('mouseup');
		} else {
			$(this).nextUntil('.group-result').each(
				function () {
					$(
						'a.search-choice-close[data-option-array-index="'
						+ $(this).data(
							'option-array-index')
						+ '"]').trigger('click');
				});
		}
	});

function filterNodes() {
	node.each(function (n) {
		n.target = n.source = false;
	});
	lenght = 0;
	var filters = []
	d4.selectAll(".search-choice a").each(function (d) {
		lenght++
		filters.push(d)
	})
	clearPrevious()
	isMouseOver = true;
	if (lenght == 0)
		clearAll();
		d4.selectAll(".search-choice")
		.each(
			function () {
				var value = d4.select(this).select("span").text();
				for (i = 0; i < nodeData.length; i++) {
					if (value == nodeData[i].data.name) {
						// nodes.push(nodeData[i]);
						d4.select('#node-' + i).style("fill",
							"#000").style("font-weight", "700");
						link
							.each(function (l) {

								if (!(d4.select(this).classed(
									"link--target") || d4
										.select(this).classed(
											"link--source"))) {
									d4
										.select(this)
										.classed(
											"link--target",
											function (l) {
												if (l.target === nodeData[i]) {

													return l.source.source = true
												}
												;
											})
										.classed(
											"link--source",
											function (l) {
												if (l.source === nodeData[i]) {

													return l.target.target = true;
												}

											}).filter(function (l) {

												return l.target === d || l.source === d;

											}).raise();
								}
							})
						node.classed("node--target", function (n) {
							return n.target;
						}).classed("node--source", function (n) {
							return n.source;
						})
						break;
					}
				}
			});
	d4.selectAll("node--target").style("fill", "#d62728!important")
}

function filterNodes1() {
	lenght = 0;
	filterdIndex = [];
	nodeActive = [];
	var filters = []
	d4.selectAll(".search-choice a").each(function () {
		lenght++
	})
	clearPrevious()
	isMouseOver = true;
	if (lenght == 0)
		clearAll();
	d4.selectAll(".search-choice").each(function () {
		var value = d4.select(this).select("span").text();
		filters.push(value)
		for (i = 0; i < nodeData.length; i++) {
			d4.select('#node-' + i).classed("node--active", false);
			if (value == nodeData[i].data.name) {
				// nodes.push(nodeData[i]);
				nodeActive.push(i);
				filterdIndex.push(nodeData[i].data.key);
			}
		}
	});
	tabFileter(filters)
	nodeActive.forEach(function (d, i) {
		d4.select('#node-' + d).classed("node--active", true);
	})
	link.each(function (l) {
		d4.select(this).classed("link--source", function (l) {
			for (j = 0; j < filterdIndex.length; j++) {
				if (l.target.data.imports.indexOf(filterdIndex[j]) < 0) {
					return l.target.target = false;
				}
			}
			return l.target.target = true;
		}).classed("link--target", function (l) {
			for (j = 0; j < filterdIndex.length; j++) {
				if (l.source.data.key == filterdIndex[j]) {
					// console.log(l.source.data.key)
					return l.source.source = false;
				}
			}
			return l.source.source = false;
		}).raise();
	})
	d4.selectAll(".link--source").each(
		function (l) {
			// console.log(l.source.data.key)
			count = 0;
			for (j = 0; j < filterdIndex.length; j++) {
				if (l.source.data.key == filterdIndex[j]) {
					count++;
				}
			}
			if (count == 0) {
				l.target.target = false;
				d4.select(this).classed("link--source", false);
			} else {
				node.each(function (n) {
					if (l.target.data.key == n.data.key) {
						d4.select(this).classed("node--target", true)
							.style("fill", "#d62728 ! important");
					}
				})
			}
		})
	d4.selectAll(".node").style("fill", "#bbb")

}

function clearAll() {
	d4.selectAll(".search-choice-close").each(function () {
		d4.select(this).dispatch('click');
	})
	node.classed(function (n) {
		d4.select(this).classed("node--active", false);
	})
	mouseouted(null);
}

function clearPrevious() {
	isMouseOver = false;
	link.classed("link--target", false).classed("link--source", false);
	node.classed("node--source", false).classed("node--target", false)
		.classed("node--active", false);

}


// CONCEPT MAP

function processDataForConceptMap(list) {
	console.log(list)
	var ditems = new Set();
	var x = new Set();
	var theme = new Set();
	var prespective = new Set();
	var ditemAarr = [];
	var themeAarr = [];
	var prespectiveAarr = [];
	var columns = [];
	$.each(list, function (i, d) {
		if (i != 0) {
			ditems.add(d[0]);
			x.add(d[1])
		} else if (i == 0) {
			columns = d;
		}

	})
	var i = 0;
	x.forEach(function (v) {
		if (i % 2 == 0)
			theme.add(v);
		else
			prespective.add(v);
		i++;
	})
	var date = new Date();
	ditems.forEach(function (v) {
		var obj = {
			"type": "ditem",
			"name": v,
			"description": "Sample Description goes here about " + v,
			"slug": "Slug goes here about " + v,
			"links": getLinks(v, list),
			"column": columns[0]
		}
		ditemAarr.push(obj)
	})
	theme.forEach(function (v) {
		var obj = {
			"type": "theme",
			"name": v,
			"column": columns[1]

		}
		themeAarr.push(obj)
	})
	prespective.forEach(function (v) {
		var obj = {
			"type": "perspective",
			"name": v,
			"column": columns[1]

		}
		prespectiveAarr.push(obj)
	})
	var json = {
		"ditems": ditemAarr,
		"themes": themeAarr,
		"perspectives": prespectiveAarr

	}
	var plot = new ConceptMap("graph", "graph-info", json);

}
function getLinks(value, list) {
	var a = new Set();
	var arr = [];
	$.each(list, function (i, d) {
		if (d.indexOf(value) > -1) {
			a.add(d[1]);
		}
	})
	
	return Array.from(a);
}

function isValidDate(s) {
	var bits = s.split('/');
	var d = new Date(bits[2] + '/' + bits[1] + '/' + bits[0]);
	return !!(d && (d.getMonth() + 1) == bits[1] && d.getDate() == Number(bits[0]));
}

function processData(list, properties,metrics){
	var arr = [];
	var columns = list[0];
	console.log(list)
	$.each(list,function(i,d){
		if(i!=0){
			var obj ={};
			$.each(columns,function(n,r){
				obj[r] = d[n]
			})
			arr.push(obj)
		}
	})
	var columnDefs1 = []
	$.each(columns,function(n,r){
		var obj ={
				headerName : r,
				field : r
		}
		if((properties[n]!=null || properties[n]!=undefined ) && properties[n] != "NONE" && properties[n].includes("GROUP-BY")){
			obj.rowGroup = true;
		}
		if((properties[n]!=null || properties[n]!=undefined ) && properties[n] != "NONE" && properties[n].includes("ORDER-BY")){
					obj.sortingOrder = ['asc','desc']
		}
		if((properties[n]!=null || properties[n]!=undefined ) && properties[n] != "NONE" && properties[n].includes("GRAND-TOTAL")){
					obj.aggFunc = 'sum'
		}
			columnDefs1.push(obj)
	})
    var autoGroupColumnDef1 = {
        cellRenderer:'agGroupCellRenderer',
        cellRendererParams: {
            footerValueGetter: function(params) { return 'Total (' + params.value + ')'},
        }
    }
	
    // let the grid know which columns and what data to use
	 gridOptions = {
	    columnDefs: columnDefs1,
	    defaultColDef: {
	      width: 150,
	      sortable: true,
	      resizable: true
	    },
	    enableRangeSelection: true,
	    autoGroupColumnDef:autoGroupColumnDef1,
	    animateRows: true
	};
  var eGridDiv = document.querySelector('#agGrid');
  d3.select("#agGrid").html("");
  // create the grid passing in the div to use together with the columns & data we want to use
  new agGrid.Grid(eGridDiv, gridOptions);
  gridOptions.api.setRowData(arr);
}

function getSelectedRows() {
    const selectedNodes = gridOptions.api.getSelectedNodes()  
    const selectedData = selectedNodes.map( function(node) { return node.data })
    const selectedDataStringPresentation = selectedData.map( function(node) { return node.make + ' ' + node.model }).join(', ')
}

function customAggSum(values) {
	
    var sum = 0;
    values.forEach( function(value) {sum += value;} );
    return sum;
}
function customAggcount(values) {
	console.log(values)
	return values.length;
}
function customAggcountDist(values) {
	console.log(values)
	values = $.unique( values )
	return values.length;
}
function sumFunction(values) {
	console.log(values)
    var result = 0;
    values.forEach( function(value) {
    	value  = parseFloat(value);
        if (typeof value === 'number') {
            result += value;
        }
    });
    return result.toFixed(2);
}

function avgAggFunction(values) {

    // the average will be the sum / count
    var sum = 0;
    var count = 0;

    values.forEach( function(value) {
        var groupNode = value !== null && value!== undefined && typeof value === 'object';
        if (groupNode) {
            // we are aggregating groups, so we take the
            // aggregated values to calculated a weighted average
            sum += value.avg * value.count;
            count += value.count;
        } else {
            // skip values that are not numbers (ie skip empty values)
            if (typeof value === 'number') {
                sum += value;
                count++;
            }
        }
    });

    // avoid divide by zero error
    if (count!==0) {
        var avg = sum / count;
    } else {
        avg = null;
    }

    // the result will be an object. when this cell is rendered, only the avg is shown.
    // however when this cell is part of another aggregation, the count is also needed
    // to create a weighted average for the next level.
    var result = {
        count: count,
        avg: avg,
        // the grid by default uses toString to render values for an object, so this
        // is a trick to get the default cellRenderer to display the avg value
        toString: function() {
            return this.avg.toFixed(2);
        }
    };

    return result;
}

// similar to Math.min() except handles missing values, if any value is missing, then
// it returns the other value, or 'null' if both are missing.
function min(a, b) {
	Math.max()
    var aMissing = typeof a !== 'number';
    var bMissing = typeof b !== 'number';

    if (aMissing && bMissing) {
        return null;
    } else if (aMissing) {
        return b;
    } else if (bMissing) {
        return a;
    } else if (a > b) {
        return b;
    } else {
        return a;
    }
}

// similar to Math.max() except handles missing values, if any value is missing, then
// it returns the other value, or 'null' if both are missing.
function max(a, b) {
    var aMissing = typeof a !== 'number';
    var bMissing = typeof b !== 'number';

    if (aMissing && bMissing) {
        return null;
    } else if (aMissing) {
        return b;
    } else if (bMissing) {
        return a;
    } else if (a < b) {
        return b;
    } else {
        return a;
    }
}



function exportToExcel(){
	var csvData = gridOptions.api.getDataAsCsv();
	$.ajax({
	        url:app_url+"excelSave",
	        type: 'POST',
	        data: JSON.stringify(csv2Array(csvData)),
	        dataType: 'json',
	        success: function(d) {
        		fileKey = d.fileKey
        	 	$("#excelDownload").attr("href", app_url+"download/"+worksheetName+"/"+fileKey);
        		$("#downloadLink").show();
	        },
	        cache: false,
	        contentType:  'application/json; charset=utf-8',
	        processData: false,
	        error :function (d) {
	        	$("#error_msg").text(d.responseText);
	        	$(".alert-danger").show().delay(5000).fadeOut('slow');
	        }
	    });
}

function csv2Array(csv){
    //read file from input
     let allTextLines = csv.split(/\r|\n|\r/);
     let headers = allTextLines[0].split(',');
     let lines = [];
      for (let i = 0; i < allTextLines.length; i++) {
        // split content based on comma
        let data = allTextLines[i].split(',');
        let obj =[];
        for (let j = 0; j < data.length; j++) {
        	if(data[j].replace(/['"]+/g, '') != "" && !data[j].replace(/['"]+/g, '').includes("Model"))
        		obj.push(data[j].replace(/['"]+/g, ''));
          }
         // log each row to see output
        if(obj.length>0 && !obj.join(",").includes("->"))
        	lines.push(obj);
     }
     return lines;
    }
function hideLink(){
	$("#downloadLink").hide();
}
