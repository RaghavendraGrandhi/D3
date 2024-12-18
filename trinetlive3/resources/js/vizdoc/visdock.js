/* ------------------------------------------------------------------
* visdock.js
*
* Created Spring 2013 by Jungu Choi, Yuetling Wong, Eli Fisher, and
* Niklas Elmqvist.
* ------------------------------------------------------------------
*/

// Create unique VisDock namepace
var visdock = {};

// @@@@ these things should be in CSS stylesheets
var
//width = 800,
//height = 600,
dockWidth = 200, dockHeight = 300, queryWidth = 200, queryHeight = 250, query_posx = 0, query_posy = queryHeight, query_box_height = 30, padding = 4, numButtonCols = 3, buttonOffset = dockWidth / numButtonCols, titleOffset = 12,
 buttonSize = (dockWidth - (numButtonCols + 1) * padding) / numButtonCols / 1.0, buttonHeight = 3/4 * (dockWidth - (numButtonCols + 1) * padding) / numButtonCols / 1.0, VERSION = "1.0";

var captured = [];
var num0 = 0;
var num = 0;
//var initg = 0;
//var init_g = 0;
var annotationArray = [];
var numAnno = 0;

var colorchoose = [];
colorchoose[0] = ["#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF"];
colorchoose[1] = ["#FF9933", "#FF9966", "#FF9999", "#FF99CC", "#FF99FF", "#FFCC00"];
colorchoose[2] = ["#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333"];
colorchoose[3] = ["#CC9999", "#CC99CC", "#CC99FF", "#CCCC00", "#CCCC33", "#CCCC66"];
colorchoose[4] = ["#9900CC", "#9900FF", "#993300", "#993333", "#993366", "#993399"];
colorchoose[5] = ["#9999FF", "#99CC00", "#99CC33", "#99CC66", "#99CC99", "#99CCCC"];

var PointerTool = {
	name : "Pointer",
	image : "https://raw.github.com/VisDockHub/NewVisDock/master/master/images/cursor.png",
	select : function() {
		console.log("select: " + PointerTool.name);
		Toolbox.setTool(PointerTool);
	},
	install : function() {
		VisDock.startChrome();
		if (VisDock.mode == "single"){
			Panel.annotation.selectAll("rect").attr("pointer-events", "visiblePainted");
		} else {
			for (var i = 0; i < VisDock.svgArray.length; i++){
				Panel.annotationArray[i].selectAll("rect").attr("pointer-events", "visiblePainted");
			}
		}
		
		VisDock.finishChrome();
		// do nothing
	},
	uninstall : function() {
		// do nothing
		
	}
};

var RectangleTool = {
	name : "Rect",
	image : "https://raw.github.com/VisDockHub/NewVisDock/master/master/images/Rectangle.png",
	start : 0,
	bbox : null,
	select : function() {
		Toolbox.setTool(RectangleTool);
	},
	install : function() {
		//VisDock.eventHandler = true;
		//alert(VisDock.eventHandler)
		//CC.remove()
		//BirdView.birdview.remove()
		/*var Chrome =(/Firefox/i.test(navigator.userAgent))? 0 : 1
		
		if (Chrome && BirdView.birdinit) {
			BirdView.removeBirdView();
		}*/
		VisDock.startChrome();
		if (VisDock.mode == "single"){
			Panel.viewport.selectAll("*").attr("pointer-events", "none");
			Panel.panel.on("mousedown", RectangleTool.mousedown);
		} else {
			for (var i = 0; i < VisDock.svgArray.length; i++){
				Panel.multiview[i].selectAll("*").attr("pointer-events", "none");
				Panel.panelArray[i].on("mousedown", RectangleTool.mousedown);				
			}
		}
		VisDock.finishChrome();
		/*if (Chrome && BirdView.birdinit) {
			BirdView.init(Panel.panel, BirdView.width, BirdView.height)
		}*/
	},
	uninstall : function() {
		//VisDock.eventHandler = null;
		/*var Chrome =(/Firefox/i.test(navigator.userAgent))? 0 : 1
		if (Chrome && BirdView.birdinit) {
			BirdView.removeBirdView();
		}*/
		VisDock.startChrome();	
		if (VisDock.mode == "single"){	
			Panel.viewport.selectAll("*").attr("pointer-events", "visiblePainted");
			Panel.panel.on("mouseup", null);
			Panel.panel.on("mousemove", null);
			Panel.panel.on("mousedown", null);
		} else {
			for (var i = 0; i < VisDock.svgArray.length; i++){
				Panel.multiview[i].selectAll("*").attr("pointer-events", "visiblePainted");
				Panel.panelArray[i].on("mouseup", null);
				Panel.panelArray[i].on("mousemove", null);
				Panel.panelArray[i].on("mousedown", null);			
			}
		}
		VisDock.finishChrome();
		/*if (Chrome && BirdView.birdinit) {
			BirdView.init(Panel.panel, BirdView.width, BirdView.height)
		}*/		
	},
	getBoundingBox : function(curr) {
		var minX = Math.min(curr[0], RectangleTool.start[0]);
		var maxX = Math.max(curr[0], RectangleTool.start[0]);
		var minY = Math.min(curr[1], RectangleTool.start[1]);
		var maxY = Math.max(curr[1], RectangleTool.start[1]);
		return [minX, minY, maxX - minX, maxY - minY];
	},
	mousedown : function() {

		if (VisDock.mode == "single"){
			// Prevent Browser's default behaviour
			d3.event.preventDefault();

			// Store starting point
			RectangleTool.start = d3.mouse(this);
	
			// Create the rubber band bounding box
			RectangleTool.bbox = Panel.panel.append("rect").attr("id", "selection").attr("x", RectangleTool.start[0]).attr("y", RectangleTool.start[1]).attr("width", "10").attr("height", "10").attr("class", "selection");
	
			// Install event handlers
			Panel.panel.on("mousemove", function() {
	
				// Update the selection
				var box = RectangleTool.getBoundingBox(d3.mouse(this));
				if (RectangleTool.bbox)
					RectangleTool.bbox.attr("x", box[0]).attr("y", box[1]).attr("width", box[2]).attr("height", box[3]);
			});
			Panel.panel.on("mouseup", function() {
				// Forward the selection
				var box = RectangleTool.getBoundingBox(d3.mouse(this));
				Toolbox.select("Rectangle", [[(box[0] - Panel.x), (box[1] - Panel.y)], [(box[0] - Panel.x), (box[1] - Panel.y) + box[3]], [(box[0] - Panel.x) + box[2], (box[1] - Panel.y) + box[3]], [(box[0] - Panel.x) + box[2], (box[1] - Panel.y)]], Toolbox.inclusive);

				// Remove the bounding box
				RectangleTool.bbox.remove();
				RectangleTool.bbox = null;
			});			
		} else {
			// Prevent Browser's default behaviour
			d3.event.preventDefault();
			Panel.viewindex = parseInt(this.getAttribute("id").split("MainPanel")[1]);
			// Store starting point
			RectangleTool.start = d3.mouse(this);
	
			// Create the rubber band bounding box
			RectangleTool.bbox = d3.select(this)
				.append("rect").attr("id", "selection").attr("x", RectangleTool.start[0]).attr("y", RectangleTool.start[1]).attr("width", "10").attr("height", "10").attr("class", "selection");
	
			// Install event handlers
			d3.select(this).on("mousemove", function() {
	
				// Update the selection
				var box = RectangleTool.getBoundingBox(d3.mouse(this));
				if (RectangleTool.bbox)
					RectangleTool.bbox.attr("x", box[0]).attr("y", box[1]).attr("width", box[2]).attr("height", box[3]);
			});
			d3.select(this).on("mouseup", function() {
				// Forward the selection
				var box = RectangleTool.getBoundingBox(d3.mouse(this));
				Toolbox.select("Rectangle", [[(box[0] - Panel.x), (box[1] - Panel.y)], [(box[0] - Panel.x), (box[1] - Panel.y) + box[3]], [(box[0] - Panel.x) + box[2], (box[1] - Panel.y) + box[3]], [(box[0] - Panel.x) + box[2], (box[1] - Panel.y)]], Toolbox.inclusive);

				// Remove the bounding box
				RectangleTool.bbox.remove();
				RectangleTool.bbox = null;
			});				
		}


	}
};

var EllipseTool = {
	name : "Ellipse",
	image : "https://raw.github.com/VisDockHub/NewVisDock/master/master/images/Ellipse.png",
	start : 0,
	bellipse : null,
	select : function() {
		console.log("select: " + EllipseTool.name);
		Toolbox.setTool(EllipseTool);
	},
	install : function() {
		//VisDock.eventHandler = true;
		/*var Chrome =(/Firefox/i.test(navigator.userAgent))? 0 : 1
		if (Chrome && BirdView.birdinit) {
			BirdView.removeBirdView();
		}*/
		VisDock.startChrome();		
		if (VisDock.mode == "single"){	
			Panel.viewport.selectAll("*").attr("pointer-events", "none");
			Panel.panel.on("mousedown", EllipseTool.mousedown);
		} else {
			for (var i = 0; i < VisDock.svgArray.length; i++){
				Panel.multiview[i].selectAll("*").attr("pointer-events", "none");
				Panel.panelArray[i].on("mousedown", EllipseTool.mousedown);			
			}
		}
		VisDock.finishChrome();
		/*if (Chrome && BirdView.birdinit) {
			BirdView.init(Panel.panel, BirdView.width, BirdView.height)
		}*/		
	},
	uninstall : function() {
		//VisDock.eventHandler = null;
		/*var Chrome =(/Firefox/i.test(navigator.userAgent))? 0 : 1
		if (Chrome && BirdView.birdinit) {
			BirdView.removeBirdView();
		}*/
		VisDock.startChrome();	

		if (VisDock.mode == "single"){	
			Panel.viewport.selectAll("*").attr("pointer-events", "visiblePainted");
			Panel.panel.on("mouseup", null);
			Panel.panel.on("mousemove", null);
			Panel.panel.on("mousedown", null);
		} else {
			for (var i = 0; i < VisDock.svgArray.length; i++){
				Panel.multiview[i].selectAll("*").attr("pointer-events", "visiblePainted");
				Panel.panelArray[i].on("mouseup", null);
				Panel.panelArray[i].on("mousemove", null);
				Panel.panelArray[i].on("mousedown", null);			
			}
		}
			
		VisDock.finishChrome();
		/*if (Chrome && BirdView.birdinit) {
			BirdView.init(Panel.panel, BirdView.width, BirdView.height)
		}*/		
	},
	getBoundingEllipse : function(curr) {
		var cen_X = Math.round((EllipseTool.start[0] + curr[0]) / 2);
		var cen_Y = Math.round((EllipseTool.start[1] + curr[1]) / 2);
		var r_X = Math.abs(cen_X - curr[0]);
		var r_Y = Math.abs(cen_Y - curr[1]);
		return [cen_X, cen_Y, r_X, r_Y];
	},
	mousedown : function() {

		// Prevent Browser's default behaviour
		d3.event.preventDefault();
		Panel.viewindex = parseInt(this.getAttribute("id").split("MainPanel")[1]);
		
		// Store starting point
		EllipseTool.start = d3.mouse(this);

		// Create the rubber band bounding box
		EllipseTool.bellipse = d3.select(this)
			.append("ellipse").attr("id", "selection").attr("cx", "0").attr("cy", "0").attr("rx", "0").attr("ry", "0").attr("class", "selection");

		// Install event handlers
		d3.select(this).on("mousemove", function() {

			// Update the selection
			var ellip = EllipseTool.getBoundingEllipse(d3.mouse(this));
			if (EllipseTool.bellipse)
				EllipseTool.bellipse.attr("cx", ellip[0]).attr("cy", ellip[1]).attr("rx", ellip[2]).attr("ry", ellip[3]);
		});

		d3.select(this).on("mouseup", function() {
			// Forward the selection
			EllipseTool.start[0] = EllipseTool.start[0] - Panel.x;
			EllipseTool.start[1] = EllipseTool.start[1] - Panel.y;
			var x = d3.mouse(this)[0] - Panel.x;
			var y = d3.mouse(this)[1] - Panel.y;
			var ellip = EllipseTool.getBoundingEllipse([x, y]);

			Toolbox.select("Ellipse", ellip, Toolbox.inclusive);

			// Remove the bounding box
			EllipseTool.bellipse.remove();
			EllipseTool.bellipse = null;
		});
	},

	click : function() {
		console.log("click ellipse");
	}
};

var LassoTool = {
	name : "Lasso",
	image : "https://raw.github.com/VisDockHub/NewVisDock/master/master/images/Lasso.png",
	start : 0,
	segments : 0,
	dragging : 0,
	points : [],
	rPoints : [],
	blasso : null,
	strpoints : [],

	select : function() {
		console.log("select: " + LassoTool.name);
		Toolbox.setTool(LassoTool);
	},
	install : function() {
		//VisDock.eventHandler = true;
		/*var Chrome =(/Firefox/i.test(navigator.userAgent))? 0 : 1
		if (Chrome && BirdView.birdinit) {
			BirdView.removeBirdView();
		}*/
		VisDock.startChrome();	
		if (VisDock.mode == "single"){	
			Panel.viewport.selectAll("*").attr("pointer-events", "none");
			Panel.panel.on("mousedown", LassoTool.mousedown);
		} else {
			for (var i = 0; i < VisDock.svgArray.length; i++){
				Panel.multiview[i].selectAll("*").attr("pointer-events", "none");
				Panel.panelArray[i].on("mousedown", LassoTool.mousedown);			
			}
		}			
		
		VisDock.finishChrome();
		/*if (Chrome && BirdView.birdinit) {
			BirdView.init(Panel.panel, BirdView.width, BirdView.height)
		}*/		
	},
	uninstall : function() {
		//VisDock.eventHandler = null;
		/*var Chrome =(/Firefox/i.test(navigator.userAgent))? 0 : 1
		if (Chrome && BirdView.birdinit) {
			BirdView.removeBirdView();
		}*/
		VisDock.startChrome();	
		if (VisDock.mode == "single"){	
			Panel.viewport.selectAll("*").attr("pointer-events", "visiblePainted");
			Panel.panel.on("mouseup", null);
			Panel.panel.on("mousemove", null);
			Panel.panel.on("mousedown", null);
		} else {
			for (var i = 0; i < VisDock.svgArray.length; i++){
				Panel.multiview[i].selectAll("*").attr("pointer-events", "visiblePainted");
				Panel.panelArray[i].on("mouseup", null);
				Panel.panelArray[i].on("mousemove", null);
				Panel.panelArray[i].on("mousedown", null);			
			}
		}			
		VisDock.finishChrome();
		/*if (Chrome && BirdView.birdinit) {
			BirdView.init(Panel.panel, BirdView.width, BirdView.height)
		}*/		
	},

	getPoints : function() {
		var str = [];

		for (var i = 0; i < LassoTool.segments; i++) {
			if (i != LassoTool.segments - 1) {
				str = [str + LassoTool.points[i][0] + "," + LassoTool.points[i][1] + " "];
			} else {
				str = [str + LassoTool.points[i][0] + "," + LassoTool.points[i][1] + " "];
			}
		}
		str = [str + LassoTool.points[0][0] + "," + LassoTool.points[0][1]];
		LassoTool.strpoints = str;
		return str;
	},

	LassoToolUpdate : function(curr) {
		LassoTool.points[LassoTool.segments] = curr;
		//[curr[0], curr[1]];
		var x = curr[0] - Panel.x;
		var y = curr[1] - Panel.y;
		LassoTool.rPoints[LassoTool.segments] = [x, y];
	},

	mousedown : function() {
		// Prevent Browser's default behaviour
		d3.event.preventDefault();
		Panel.viewindex = parseInt(this.getAttribute("id").split("MainPanel")[1]);
		
		// Store starting point
		LassoTool.start = d3.mouse(this);

		if (LassoTool.dragging == false) {
			LassoTool.dragging = true;
			LassoTool.LassoToolUpdate(d3.mouse(this));
			LassoTool.segments += 1;
			var points = LassoTool.getPoints();
			if (LassoTool.segments == 1) {
				LassoTool.blasso = d3.select(this).append("polygon").attr("id", "selection").attr("points", points).attr("class", "selection");
			} else {
				LassoTool.blasso.attr("points", points);
			}
		}

		d3.select(this).on("mouseup", function() {

			// Remove event handlers
			//alert(d3.event.button);
			//Panel.panel.on("mousemove", null);
			//Panel.panel.on("mouseup", null);

			// Update Segment number
			LassoTool.LassoToolUpdate(d3.mouse(this));
			LassoTool.segments += 1;
			var points = LassoTool.getPoints();
			//LassoTool.segments -= 1;
			LassoTool.blasso.attr("points", points);
			//alert(points);
			// Right Button click to end selection
			//if (d3.event.button == 2) {

			LassoTool.points[LassoTool.segments] = LassoTool.points[0];
			LassoTool.dragging = 0;
			LassoTool.segments = 0;

			//alert(LassoTool.points[0])
			//alert(LassoTool.points[0] + " " + LassoTool.points[1]);
			//}

			// Forward the selection
			Toolbox.select("Lasso", LassoTool.rPoints, Toolbox.inclusive);

			// Remove the bounding box
			LassoTool.blasso.remove();
			LassoTool.blasso = null;
			LassoTool.strpoints = "";
			LassoTool.points = [];
			LassoTool.rPoints = [];
		});

		// Install event handlers
		d3.select(this).on("mousemove", function() {
			if (LassoTool.dragging) {
				// Update the selection
				LassoTool.LassoToolUpdate(d3.mouse(this));
				LassoTool.segments += 1;
				var points = LassoTool.getPoints();
				//Freeselect.segments -= 1;
				LassoTool.blasso.attr("points", points);
			}
		});
		console.log("click lasso");
	}
};

var Straight = {
	name : "Straight",
	image : "https://raw.github.com/VisDockHub/NewVisDock/master/master/images/straight_line.png",
	start : 0,
	Line : null,

	select : function() {
		console.log("select: " + Straight.name);
		Toolbox.setTool(Straight);
	},
	install : function() {
		//VisDock.eventHandler = true;
		/*var Chrome =(/Firefox/i.test(navigator.userAgent))? 0 : 1
		if (Chrome && BirdView.birdinit) {
			BirdView.removeBirdView();
		}*/
		VisDock.startChrome();	
		if (VisDock.mode == "single"){	
			Panel.viewport.selectAll("*").attr("pointer-events", "none");
			Panel.panel.on("mousedown", Straight.mousedown);
		} else {
			for (var i = 0; i < VisDock.svgArray.length; i++){
				Panel.multiview[i].selectAll("*").attr("pointer-events", "none");
				Panel.panelArray[i].on("mousedown", Straight.mousedown);			
			}
		}			
		VisDock.finishChrome();
		/*if (Chrome && BirdView.birdinit) {
			BirdView.init(Panel.panel, BirdView.width, BirdView.height)
		}*/		
	},
	uninstall : function() {
		//VisDock.eventHandler = null;
		VisDock.startChrome();
		if (VisDock.mode == "single"){	
			Panel.viewport.selectAll("*").attr("pointer-events", "visiblePainted");
			Panel.panel.on("mouseup", null);
			Panel.panel.on("mousemove", null);
			Panel.panel.on("mousedown", null);
		} else {
			for (var i = 0; i < VisDock.svgArray.length; i++){
				Panel.multiview[i].selectAll("*").attr("pointer-events", "visiblePainted");
				Panel.panelArray[i].on("mouseup", null);
				Panel.panelArray[i].on("mousemove", null);
				Panel.panelArray[i].on("mousedown", null);			
			}
		}
		VisDock.finishChrome();
	},
	mousedown : function() {

		// Prevent Browser's default behaviour
		d3.event.preventDefault();
		Panel.viewindex = parseInt(this.getAttribute("id").split("MainPanel")[1]);
		
		// Store starting point
		Straight.start = d3.mouse(this);

		// Create the rubber band straight line
		//Straight.Line = Panel.panel.append("line")
		//    .attr("id", "selection")
		//    .attr("x1", Straight.start[0])
		//    .attr("y1", Straight.start[1])
		//    .attr("x2", d3.mouse(this)[0])
		//    .attr("y2", d3.mouse(this)[1])
		//    .attr("class", "selection");
		Straight.Line = d3.select(this).append("line").attr("id", "selection").attr("x1", "0").attr("y1", "0").attr("x2", "1").attr("y2", "1").attr("class", "selection");
		// Install event handlers
		d3.select(this).on("mousemove", function() {

			// Update the selection
			Straight.Line.attr("x1", Straight.start[0]).attr("y1", Straight.start[1]).attr("x2", d3.mouse(this)[0]).attr("y2", d3.mouse(this)[1]);

		});
		var this_panel = this;
		d3.select(this).on("mouseup", function() {

			// Remove event handlers

			d3.select(this).on("mousemove", null);
			d3.select(this).on("mouseup", null);

			// Forward the selection
			Toolbox.select("Straight", [[Straight.start[0] - Panel.x, Straight.start[1] - Panel.y],
			 [(d3.mouse(this)[0] - Panel.x), (d3.mouse(this)[1] - Panel.y)]], true);

			// Remove the bounding box
			Straight.Line.remove();
			Straight.Line = null;

		});

		console.log("click Straight");
	}
};

var Polyline = {
	name : "Polyline",
	image : "https://raw.github.com/VisDockHub/NewVisDock/master/master/images/PolyLine.png",
	start : 0,
	before : 0,
	segments : 0,
	dragging : 0,
	points : [],
	rPoints : [],
	bpolyline : null,

	select : function() {
		console.log("select: " + Polyline.name);
		Toolbox.setTool(Polyline);
	},
	install : function() {
		//VisDock.eventHandler = true;
		/*var Chrome =(/Firefox/i.test(navigator.userAgent))? 0 : 1
		if (Chrome && BirdView.birdinit) {
			BirdView.removeBirdView();
		}*/
		VisDock.startChrome();			
		if (VisDock.mode == "single"){	
			Panel.viewport.selectAll("*").attr("pointer-events", "none");
			Panel.panel.on("mousedown", Polyline.mousedown);
		} else {
			for (var i = 0; i < VisDock.svgArray.length; i++){
				Panel.multiview[i].selectAll("*").attr("pointer-events", "none");
				Panel.panelArray[i].on("mousedown", Polyline.mousedown);			
			}
		}		
		
		VisDock.finishChrome();
		/*if (Chrome && BirdView.birdinit) {
			BirdView.init(Panel.panel, BirdView.width, BirdView.height)
		}*/		
	},
	uninstall : function() {
		//VisDock.eventHandler = null;
		/*var Chrome =(/Firefox/i.test(navigator.userAgent))? 0 : 1
		if (Chrome && BirdView.birdinit) {
			BirdView.removeBirdView();
		}*/
		VisDock.startChrome();		
		if (VisDock.mode == "single"){	
			Panel.viewport.selectAll("*").attr("pointer-events", "visiblePainted");
			Panel.panel.on("mouseup", null);
			Panel.panel.on("mousemove", null);
			Panel.panel.on("mousedown", null);
		} else {
			for (var i = 0; i < VisDock.svgArray.length; i++){
				Panel.multiview[i].selectAll("*").attr("pointer-events", "visiblePainted");
				Panel.panelArray[i].on("mouseup", null);
				Panel.panelArray[i].on("mousemove", null);
				Panel.panelArray[i].on("mousedown", null);			
			}
		}
		VisDock.finishChrome();
		/*if (Chrome && BirdView.birdinit) {
			BirdView.init(Panel.panel, BirdView.width, BirdView.height)
		}*/		
	},

	getPoints : function() {
		var str = [];
		for (var i = 0; i < Polyline.segments; i++) {
			if (i != Polyline.segments - 1) {
				str = [str + Polyline.points[i][0] + "," + Polyline.points[i][1] + " "];
			} else {
				str = [str + Polyline.points[i][0] + "," + Polyline.points[i][1]];
			}
		}
		return str;
	},

	PolylineUpdate : function(curr) {
		Polyline.points[Polyline.segments] = curr;
		//[curr[0], curr[1]];
		Polyline.rPoints[Polyline.segments] = [(curr[0] - Panel.x), (curr[1] - Panel.y)];
	},

	mousedown : function() {

		// Prevent Browser's default behaviour
		d3.event.preventDefault();
		Panel.viewindex = parseInt(this.getAttribute("id").split("MainPanel")[1]);
		
		// Store starting point
		Polyline.before = Polyline.start;
		Polyline.start = [d3.mouse(this)[0], d3.mouse(this)[1]];

		Polyline.dragging = true;
		Polyline.PolylineUpdate(d3.mouse(this));
		Polyline.segments += 1;
		var points = Polyline.getPoints();
		if (Polyline.segments == 1) {
			Polyline.bpolyline = d3.select(this).append("polyline").attr("id", "selection").attr("points", points).attr("class", "selection");
		} else {
			Polyline.bpolyline.attr("points", points);
		}

		d3.select(this).on("mouseup", function() {

			// Remove event handlers
			//Panel.panel.on("mousemove", null);
			//Panel.panel.on("mouseup", null);

			// Update Segment number
			Polyline.PolylineUpdate(d3.mouse(this));
			Polyline.segments += 1;
			var points = Polyline.getPoints();
			Polyline.segments -= 1;
			Polyline.bpolyline.attr("points", points);
			//alert(Polyline.start + " " + Polyline.before)
			// Right Button click to end selection
			//if (d3.event.button == 2) {
			if (Polyline.start[0] == Polyline.before[0] && Polyline.start[1] == Polyline.before[1]) {
				Polyline.dragging = 0;
				Polyline.segments = 0;
				Polyline.bpolyline.remove();
				Polyline.bpolyline = null;
				// Forward the selection
				Toolbox.select("Polyline", Polyline.rPoints, true);
				Polyline.points = [];
				Polyline.rPoints = [];
			}
			// Remove the bounding box
		});

		// Install event handlers
		d3.select(this).on("mousemove", function() {

			if (Polyline.dragging) {
				// Update the selection
				Polyline.PolylineUpdate([d3.mouse(this)[0], d3.mouse(this)[1]]);
				Polyline.segments += 1;
				var points = Polyline.getPoints();
				Polyline.segments -= 1;
				Polyline.bpolyline.attr("points", points);
			}
		});

		console.log("click straight");
	}
};

var Freeselect = {
	name : "Freeselect",
	image : "https://raw.github.com/VisDockHub/NewVisDock/master/master/images/free_select.png",
	start : 0,
	segments : 0,
	dragging : 0,
	points : [],
	rPoints : [],
	bfreeline : null,

	select : function() {
		console.log("select: " + Freeselect.name);
		Toolbox.setTool(Freeselect);
	},
	install : function() {
		//VisDock.eventHandler = true;
		/*var Chrome =(/Firefox/i.test(navigator.userAgent))? 0 : 1
		if (Chrome && BirdView.birdinit) {
			BirdView.removeBirdView();
		}*/
		VisDock.startChrome();		
		if (VisDock.mode == "single"){	
			Panel.viewport.selectAll("*").attr("pointer-events", "none");
			Panel.panel.on("mousedown", Freeselect.mousedown);
		} else {
			for (var i = 0; i < VisDock.svgArray.length; i++){
				Panel.multiview[i].selectAll("*").attr("pointer-events", "none");
				Panel.panelArray[i].on("mousedown", Freeselect.mousedown);			
			}
		}		

		/*if (Chrome && BirdView.birdinit) {
			BirdView.init(Panel.panel, BirdView.width, BirdView.height)
		}*/
		VisDock.finishChrome();		
	},
	uninstall : function() {
		VisDock.startChrome();
		if (VisDock.mode == "single"){	
			Panel.viewport.selectAll("*").attr("pointer-events", "visiblePainted");
			Panel.panel.on("mouseup", null);
			Panel.panel.on("mousemove", null);
			Panel.panel.on("mousedown", null);
		} else {
			for (var i = 0; i < VisDock.svgArray.length; i++){
				Panel.multiview[i].selectAll("*").attr("pointer-events", "visiblePainted");
				Panel.panelArray[i].on("mouseup", null);
				Panel.panelArray[i].on("mousemove", null);
				Panel.panelArray[i].on("mousedown", null);			
			}
		}
		VisDock.finishChrome();
	},

	getPoints : function() {
		var str = [];
		for (var i = 0; i < Freeselect.segments; i++) {
			if (i != Freeselect.segments - 1) {
				str = [str + Freeselect.points[i][0] + "," + Freeselect.points[i][1] + " "];
			} else {
				str = [str + Freeselect.points[i][0] + "," + Freeselect.points[i][1]];
			}
		}
		return str;
	},

	FreeselectUpdate : function(curr) {
		Freeselect.points[Freeselect.segments] = curr;
		Freeselect.rPoints[Freeselect.segments] = [(curr[0] - Panel.x), (curr[1] - Panel.y)];
	},

	mousedown : function() {

		// Prevent Browser's default behaviour
		d3.event.preventDefault();
		Panel.viewindex = parseInt(this.getAttribute("id").split("MainPanel")[1]);
		
		// Store starting point
		Freeselect.start = d3.mouse(this);

		if (Freeselect.dragging == false) {
			Freeselect.dragging = true;
			Freeselect.FreeselectUpdate(d3.mouse(this));
			Freeselect.segments += 1;
			var points = Freeselect.getPoints();
			if (Freeselect.segments == 1) {
				Freeselect.bfreeline = d3.select(this).append("polyline").attr("id", "selection").attr("points", points).attr("class", "selection");
			} else {
				Freeselect.bfreeline.attr("points", points);
			}
		}

		d3.select(this).on("mouseup", function() {

			// Remove event handlers
			//alert(d3.event.button);
			//Panel.panel.on("mousemove", null);
			//Panel.panel.on("mouseup", null);

			// Update Segment number
			Freeselect.FreeselectUpdate(d3.mouse(this));
			Freeselect.segments += 1;
			var points = Freeselect.getPoints();
			Freeselect.segments -= 1;
			Freeselect.bfreeline.attr("points", points);

			// Right Button click to end selection
			//if (d3.event.button == 2) {
			Freeselect.dragging = 0;
			Freeselect.segments = 0;
			Freeselect.bfreeline.remove();
			Freeselect.bfreeline = null;
			//}

			// Forward the selection
			Toolbox.select("Freeselect", Freeselect.rPoints, Toolbox.inclusive);
			Freeselect.points = [];
			Freeselect.rPoints = [];

			// Remove the bounding box

		});

		// Install event handlers
		d3.select(this).on("mousemove", function() {

			if (Freeselect.dragging) {
				// Update the selection
				Freeselect.FreeselectUpdate(d3.mouse(this));
				Freeselect.segments += 1;
				var points = Freeselect.getPoints();
				//Freeselect.segments -= 1;
				Freeselect.bfreeline.attr("points", points);
			}

		});

		console.log("click straight");
	}
};

var PolygonTool = {
	name : "Polygon",
	image : "https://raw.github.com/VisDockHub/NewVisDock/master/master/images/polygon.png",
	start : 0,
	before : 0,
	segments : 0,
	dragging : 0,
	strpoints : [],
	points : [],
	rPoints : [],
	bpolygon : null,

	select : function() {
		console.log("select: " + PolygonTool.name);
		Toolbox.setTool(PolygonTool);
	},
	install : function() {
		//VisDock.eventHandler = true;
		/*var Chrome =(/Firefox/i.test(navigator.userAgent))? 0 : 1
		if (Chrome && BirdView.birdinit) {
			BirdView.removeBirdView();
		}*/
		VisDock.startChrome();		
		if (VisDock.mode == "single"){	
			Panel.viewport.selectAll("*").attr("pointer-events", "none");
			Panel.panel.on("mousedown", PolygonTool.mousedown);
		} else {
			for (var i = 0; i < VisDock.svgArray.length; i++){
				Panel.multiview[i].selectAll("*").attr("pointer-events", "none");
				Panel.panelArray[i].on("mousedown", PolygonTool.mousedown);			
			}
		}		

		VisDock.finishChrome();
		/*if (Chrome && BirdView.birdinit) {
			BirdView.init(Panel.panel, BirdView.width, BirdView.height)
		}*/		
	},
	uninstall : function() {
		//VisDock.eventHandler = null;
		VisDock.startChrome();
		if (VisDock.mode == "single"){	
			Panel.viewport.selectAll("*").attr("pointer-events", "visiblePainted");
			Panel.panel.on("mouseup", null);
			Panel.panel.on("mousemove", null);
			Panel.panel.on("mousedown", null);
		} else {
			for (var i = 0; i < VisDock.svgArray.length; i++){
				Panel.multiview[i].selectAll("*").attr("pointer-events", "visiblePainted");
				Panel.panelArray[i].on("mouseup", null);
				Panel.panelArray[i].on("mousemove", null);
				Panel.panelArray[i].on("mousedown", null);			
			}
		}
		VisDock.finishChrome();
	},

	getPoints : function() {
		var str = [];
		for (var i = 0; i < PolygonTool.segments; i++) {
			if (i != PolygonTool.segemnts - 1) {
				str = [str + PolygonTool.points[i][0] + "," + PolygonTool.points[i][1] + " "];
			} else {
				str = [str + PolygonTool.points[i][0] + "," + PolygonTool.points[i][1] + " "];
			}
		}
		str = [str + PolygonTool.points[0][0] + "," + PolygonTool.points[0][1]];
		PolygonTool.strpoints = str;
		return str;
	},

	PolygonToolUpdate : function(curr) {
		PolygonTool.points[PolygonTool.segments] = curr;
		//[curr[0], curr[1]];
		PolygonTool.rPoints[PolygonTool.segments] = [(curr[0] - Panel.x), (curr[1] - Panel.y)];
	},

	mousedown : function() {

		// Prevent Browser's default behaviour
		d3.event.preventDefault();
		Panel.viewindex = parseInt(this.getAttribute("id").split("MainPanel")[1]);

		// Store starting point
		PolygonTool.before = PolygonTool.start;
		PolygonTool.start = d3.mouse(this);

		// Dragging event is enabled
		//if (Polyline.dragging) {
		//    Polyline.dragging = false;
		//}
		//else {
		//    Polyline.dragging = true;
		//}

		PolygonTool.dragging = true;
		PolygonTool.PolygonToolUpdate(d3.mouse(this));
		PolygonTool.segments += 1;
		var points = PolygonTool.getPoints();
		//alert(points);
		if (PolygonTool.segments == 1) {
			PolygonTool.bpolygon = d3.select(this).append("polygon").attr("id", "selection").attr("points", points).attr("class", "selection");
		} else {
			PolygonTool.bpolygon.attr("points", points);
		}

		d3.select(this).on("mouseup", function() {

			// Remove event handlers
			//alert(d3.event.button);
			//Panel.panel.on("mousemove", null);
			//Panel.panel.on("mouseup", null);

			// Update Segment number
			PolygonTool.PolygonToolUpdate(d3.mouse(this));
			PolygonTool.segments += 1;
			var points = Polyline.getPoints();
			PolygonTool.segments -= 1;
			PolygonTool.bpolygon.attr("points", points);

			// Double click to end selection
			if (PolygonTool.start[0] == PolygonTool.before[0] && PolygonTool.start[1] == PolygonTool.before[1]) {
				//if (d3.event.button == 2) {
				//alert("segments = " + PolygonTool.segments + " length = " + PolygonTool.points.length);
				PolygonTool.points.length = PolygonTool.segments - 1;
				PolygonTool.points[PolygonTool.segments - 1] = PolygonTool.points[0];
				PolygonTool.dragging = 0;
				PolygonTool.segments = 0;
				PolygonTool.bpolygon.remove();
				PolygonTool.bpolygon = null;
				// Forward the selection
				Toolbox.select("Polygon", Polyline.rPoints, Toolbox.inclusive);
				PolygonTool.points = [];
				PolygonTool.rPoints = [];
			}
			// Remove the bounding box
		});

		// Install event handlers
		d3.select(this).on("mousemove", function() {

			if (PolygonTool.dragging) {
				// Update the selection
				PolygonTool.PolygonToolUpdate(d3.mouse(this));
				PolygonTool.segments += 1;
				var points = PolygonTool.getPoints();
				PolygonTool.segments -= 1;
				PolygonTool.bpolygon.attr("points", points);
			}
		});

		console.log("click straight");
	}
};

var PanZoomTool = {
	name : "PanZoom",
	image : "https://raw.github.com/VisDockHub/NewVisDock/master/master/images/Pan.png",
	start : null,
	panel : null,
	select : function() {
		console.log("select: " + PanZoomTool.name);
		Toolbox.setTool(PanZoomTool);
	},
	install : function() {
		/*var Chrome =(/Firefox/i.test(navigator.userAgent))? 0 : 1
		if (Chrome && BirdView.birdinit) {
			BirdView.removeBirdView();
		}*/
		VisDock.startChrome();	
		if (VisDock.mode == "single"){	
			Panel.viewport.selectAll("*").attr("pointer-events", "none");
			Panel.panel.on("mousedown", PanZoomTool.mousedown);
			window.addEventListener("mousewheel", PanZoomTool.mousewheel, false);
			window.addEventListener("DOMMouseScroll", PanZoomTool.mousewheel, false);			
		} else {
			for (var i = 0; i < VisDock.svgArray.length; i++){
				Panel.multiview[i].selectAll("*").attr("pointer-events", "none");
				Panel.panelArray[i].on("mousedown", PanZoomTool.mousedown);	
				VisDock.svgArray[i][0][0].addEventListener("mousewheel", PanZoomTool.mousewheel, false);
				VisDock.svgArray[i][0][0].addEventListener("DOMMouseScroll", PanZoomTool.mousewheel, false);
			}
		}			

		//window.addEventListener("mousewheel", PanZoomTool.mousewheel, false);
		//window.addEventListener("DOMMouseScroll", PanZoomTool.mousewheel, false);
		
		VisDock.finishChrome();
		/*if (Chrome && BirdView.birdinit) {
			BirdView.init(Panel.panel, BirdView.width, BirdView.height)
		}*/
		
		//Panel.multiview[0].append("text").attr("class", "indicator").attr("x", 500).attr("y", 500);
				
	},
	uninstall : function() {
		/*var Chrome =(/Firefox/i.test(navigator.userAgent))? 0 : 1
		if (Chrome && BirdView.birdinit) {
			BirdView.removeBirdView();
		}*/
		VisDock.startChrome();		
		//Panel.panel.on("mousedown", null);
		if (VisDock.mode == "single"){	
			Panel.viewport.selectAll("*").attr("pointer-events", "visiblePainted");
			Panel.panel.on("mouseup", null);
			Panel.panel.on("mousemove", null);
			Panel.panel.on("mousedown", null);
			window.removeEventListener("mousewheel", PanZoomTool.mousewheel, false);
			window.removeEventListener("DOMMouseScroll", PanZoomTool.mousewheel, false);			
		} else {
			for (var i = 0; i < VisDock.svgArray.length; i++){
				Panel.multiview[i].selectAll("*").attr("pointer-events", "visiblePainted");
				Panel.panelArray[i].on("mouseup", null);
				Panel.panelArray[i].on("mousemove", null);
				Panel.panelArray[i].on("mousedown", null);		
				VisDock.svgArray[i][0][0].removeEventListener("mousewheel", PanZoomTool.mousewheel, false);
				VisDock.svgArray[i][0][0].removeEventListener("DOMMouseScroll", PanZoomTool.mousewheel, false);
			}
		}		
		//window.removeEventListener("mousewheel", PanZoomTool.mousewheel, false);
		//window.removeEventListener("DOMMouseScroll", PanZoomTool.mousewheel, false);
				
		VisDock.finishChrome();
		/*if (Chrome && BirdView.birdinit) {
			BirdView.init(Panel.panel, BirdView.width, BirdView.height)
		}*/		
	},
	mousedown : function() {
		//PanZoomTool.start = d3.mouse(currentView);
		if (VisDock.mode != "single"){
			PanZoomTool.panel = this.getAttribute("id").split("MainPanel")[1];
			var currentView = Panel.panelArray[PanZoomTool.panel][0][0].parentNode;
		} else {
			var currentView = Panel.panel[0][0].parentNode;
		}
				
		
		PanZoomTool.start = d3.mouse(currentView);
		d3.select(currentView).on("mousemove", function() {
		//Panel.multiview[0].on("mousemove", function() {
			var curr = d3.mouse(currentView);
			//d3.select(".indicator").text(d3.select(this)[0][0].getAttribute("id"));
			//d3.select(".indicator").text(this.getAttribute("id") + " x = " + d3.mouse(this)[0] + " , y = " + d3.mouse(this)[1]);
			/*if (BirdView.Bird != undefined){
				//var T = BirdView.Bird.getCTM().inverse();
				//var TMat = T.translate(-1*(curr[0] - PanZoomTool.start[0]), -1*(curr[1] - PanZoomTool.start[1]));
				//var TMat = T;//.translate(0,0)
				var T = BirdView.Bird.getAttribute("transform").split("translate(");
				if (T.length > 1){
					var tx = parseFloat(T[1].split(",")[0]);
					var ty = parseFloat(T[1].split(",")[1].split(")")[0]);
				} else {
					var tx = 0;
					var ty = 0;
				}
				
				var x = tx + (-1*(curr[0] - PanZoomTool.start[0]));
				var y = ty + (-1*(curr[1] - PanZoomTool.start[1]));
				BirdView.Bird.setAttribute("transform", T[0] + "translate(" + x + "," + y + ")");
				d3.selectAll("#BirdFrame").attr("transform", T[0] + "translate(" + (x) + "," + (y) + ")");
				//BirdView.Bird.setAttribute("transform", "matrix("+TMat.a+","+TMat.b+","+TMat.c+","+TMat.d+","+TMat.e+","+TMat.f+")");
			}*/
			
		
			//d3.select(".indicator").text(this.getAttribute("id") + " x = " + (curr[0] - PanZoomTool.start[0])
			//				 + " , y = " + (curr[1] - PanZoomTool.start[1]));
			//d3.select(".indicator").text(this.getAttribute("id") + " x = " + (curr[0])
			//				 + " , y = " + curr[1]);			
						 
			Panel.pan(curr[0] - 1*PanZoomTool.start[0], curr[1] - 1*PanZoomTool.start[1], this.childNodes[0].childNodes[2].childNodes[0]);
			//Panel.panelArray[0].attr("transform", "translate(" + Panel.xArray[0] + "," + Panel.yArray[0] + ")");
			//d3.selectAll("#MainPanel0").attr("transform", "translate(" + Panel.xArray[0] + "," + Panel.yArray[0] + ")");
			if (BirdView.Bird != ""){
			
			var T2 = d3.select("#BirdViewCanvas").attr("transform");
			d3.select("#BirdViewCanvas").attr("transform","");
			
			var x = (-1*(curr[0] - PanZoomTool.start[0]));
			var y = (-1*(curr[1] - PanZoomTool.start[1]));
			
			var r = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
			//VisDock.svg[0][0].appendChild(r);
			this.parentNode.appendChild(r);
			var TMat = r.getCTM();//.inverse();		
		
			var T = BirdView.Bird.getCTM();//.scale(BirdView.s_x, BirdView.s_y);
			var TMat = T.translate(x, y);//.scale(1/Panel.scale, 1/Panel.scale);//Tx, Ty);
			var TMat2 = T.translate(x, y);//.scale(1/Panel.scale, 1/Panel.scale);
			var TMat3 = TMat.inverse();
			//VisDock.svg[0][0].removeChild(r);
			this.parentNode.removeChild(r);
			BirdView.Bird.setAttribute("transform", "matrix("+TMat.a+","+TMat.b+","+TMat.c+","+TMat.d+","+TMat.e+","+TMat.f+")");
			d3.select("#clippedView").attr("transform", "matrix("+TMat3.a+","+TMat3.b+","+TMat3.c+","+TMat3.d+","+TMat3.e+","+TMat3.f+")");
			d3.selectAll("#BirdFrame")
				.attr("style", "fill:white; stroke-width: " + (30 * Panel.scale) + "; stroke: red; opacity:0.5")
				.attr("transform", "matrix("+TMat2.a+","+TMat2.b+","+TMat2.c+","+TMat2.d+","+TMat2.e+","+TMat2.f+")");
		
			d3.select("#BirdViewCanvas").attr("transform", T2);				
			}
			PanZoomTool.start = curr;

		});
		d3.select(currentView).on("mouseup", function() {
			d3.select(currentView).on("mousemove", null);
			d3.select(currentView).on("mouseup", null);
		});
	},
	mousewheel : function(evt) {
		// Prevent default behavior (scrolling)
		if (evt.preventDefault)
			evt.preventDefault();
		evt.returnValue = false;

		// Now determine the amount of zoom
		var delta;
		if (evt.wheelDelta)
			delta = evt.wheelDelta / 360;
		// Chrome/Safari
		else
			delta = evt.detail / -9;
		// Mozilla

		// This chunk of codes responds to the zooming event to adjust the birdeye's view frame.
		/*var T = BirdView.Bird.getAttribute("transform").split("translate(");
		var sx = parseFloat(T[0].split("scale(")[1].split(",")[0]);
		var sy = parseFloat(T[0].split("scale(")[1].split(",")[1].split(")")[0]);
		if (T.length > 1){
			var tx = parseFloat(T[1].split(",")[0]);
			var ty = parseFloat(T[1].split(",")[1].split(")")[0]);
		} else {
			var tx = 0;
			var ty = 0;
		}
		*/
		if (VisDock.mode == "single"){
			var dz = Math.pow(1 + Panel.zoomScale, delta);
			var Tx = Panel.x;
			var Ty = Panel.y;
			Tx -= (evt.clientX - 8) / Panel.scale - (evt.clientX - 8)/ (Panel.scale * dz);
			Ty -= (evt.clientY - 8) / Panel.scale - (evt.clientY - 8) / (Panel.scale * dz);
			var mult = Panel.scale * dz;
		
				
			//var x = tx + (-1*(curr[0] - PanZoomTool.start[0]));
			//var y = ty + (-1*(curr[1] - PanZoomTool.start[1]));

			//d3.selectAll("#BirdFrame").attr("transform", "scale(" + (BirdView.s_x) + "," + (BirdView.s_y) + ")translate(" + (tx+Tx) + "," + (ty+Ty) + ")");
			///////////////////////////////////////////////////////////////////////////////////////
			
			// @@@ Still need to determine exact mouse position wrt viewport!
			Panel.zoom(evt.clientX - 8, evt.clientY - 8, delta);
		} else {
			if (evt.wheelDelta){
				var CX = (evt.offsetX);
				var CY = evt.offsetY;
			}
			// Chrome/Safari
			else{
				var CX = evt.pageX;
				var CY = evt.pageY;
			}			
			//var CX = evt.offsetX;
			//var CY = evt.offsetY;
			var index = parseInt(this.getAttribute("id").split("svgVisDock")[1]);
			var dz = Math.pow(1 + Panel.zoomScale, delta);
			var Tx = Panel.xArray[index];
			var Ty = Panel.yArray[index];
			//Tx -= (evt.clientX - 8) / Panel.scaleArray[index] - (evt.clientX - 8)/ (Panel.scaleArray[index] * dz);
			//Ty -= (evt.clientY - 8) / Panel.scaleArray[index] - (evt.clientY - 8) / (Panel.scaleArray[index] * dz);
			Tx -= (CX - 8) / Panel.scaleArray[index] - (CX - 8)/ (Panel.scaleArray[index] * dz);
			Ty -= (CY - 8) / Panel.scaleArray[index] - (CY - 8) / (Panel.scaleArray[index] * dz);			
			var mult = Panel.scaleArray[index] * dz;
			Panel.zoom(CX - 8, CY - 8, delta, Panel.multiview[index][0][0]);			
		}
		if (BirdView.Bird != "") {
		var T2 = d3.select("#BirdViewCanvas").attr("transform");
		d3.select("#BirdViewCanvas").attr("transform","");
		
		var r = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
		VisDock.svg[0][0].appendChild(r);
		var TMat = r.getCTM().inverse();		
		
		var T = r.getCTM().scale(BirdView.s_x, BirdView.s_y);
		var TMat = T.rotate(-Panel.rotation)
			.translate(-1*Tx,-1*Ty).scale(1/Panel.scale, 1/Panel.scale);//.rotate(-Panel.rotation);//Tx, Ty);
		var TMat2 = T.rotate(-Panel.rotation).translate(-1*Tx, -1*Ty).scale(1/Panel.scale, 1/Panel.scale);
		var TMat3 = TMat.inverse();
		VisDock.svg[0][0].removeChild(r);
		BirdView.Bird.setAttribute("transform", "matrix("+TMat.a+","+TMat.b+","+TMat.c+","+TMat.d+","+TMat.e+","+TMat.f+")");
		d3.selectAll("#BirdFrame")
			.attr("style", "fill:white; stroke-width: " + (30 * Panel.scale) + "; stroke: red; opacity:0.5")
			.attr("transform", "matrix("+TMat2.a+","+TMat2.b+","+TMat2.c+","+TMat2.d+","+TMat2.e+","+TMat2.f+")");
		d3.select("#clippedView").attr("transform", "matrix("+TMat3.a+","+TMat3.b+","+TMat3.c+","+TMat3.d+","+TMat3.e+","+TMat3.f+")");
		d3.select("#BirdViewCanvas").attr("transform", T2);
		/*BirdView.Bird.setAttribute("transform", "scale(" + (BirdView.s_x/mult) + "," + (BirdView.s_y/mult) 
			+ ")translate(" + (Tx) + "," + (Ty) + ")");		
			//+ ")translate(" + (tx + 1/(mult/BirdView.s_x)*(-Tx)) + "," + (ty + 1/(mult/BirdView.s_x)*( -Ty)) + ")");*/	
		}	
	}
};

var RotateTool = {
	name : "Rotate",
	image : "https://raw.github.com/VisDockHub/NewVisDock/master/master/images/rotate.png",
	start : null,

	select : function() {
		console.log("select: " + RotateTool.name);
		Toolbox.setTool(RotateTool);
	},
	install : function() {
		/*var Chrome =(/Firefox/i.test(navigator.userAgent))? 0 : 1
		if (Chrome && BirdView.birdinit) {
			BirdView.removeBirdView();
		}*/
		VisDock.startChrome();		
		
		//var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel";
		if (VisDock.mode == "single"){
			Panel.viewport.selectAll("*").attr("pointer-events", "none");
			Panel.panel.selectAll(".annotationLabels").selectAll("rect").attr("pointer-events", "visiblePainted");
			VisDock.svg[0][0].addEventListener("mousewheel", RotateTool.mousewheel, false);
			VisDock.svg[0][0].addEventListener("DOMMouseScroll", RotateTool.mousewheel, false);
		} else {
			for (var i = 0; i < VisDock.svgArray.length; i++){
				Panel.multiview[i].selectAll("*").attr("pointer-events", "none");
				Panel.panelArray[i].selectAll(".annotationLabels").selectAll("rect").attr("pointer-events", "visiblePainted");
				VisDock.svgArray[i][0][0].addEventListener("mousewheel", RotateTool.mousewheel, false);
				VisDock.svgArray[i][0][0].addEventListener("DOMMouseScroll", RotateTool.mousewheel, false);
			}			
		}
		VisDock.finishChrome();
		/*if (Chrome && BirdView.birdinit) {
			BirdView.init(Panel.panel, BirdView.width, BirdView.height)
		}*/		
	},
	uninstall : function() {
		/*var Chrome =(/Firefox/i.test(navigator.userAgent))? 0 : 1
		if (Chrome && BirdView.birdinit) {
			BirdView.removeBirdView();
		}*/
		VisDock.startChrome();
		if (VisDock.mode == "single"){		
			VisDock.svg[0][0].removeEventListener("mousewheel", RotateTool.mousewheel, false);
			VisDock.svg[0][0].removeEventListener("DOMMouseScroll", RotateTool.mousewheel, false);
			Panel.viewport.selectAll("*").attr("pointer-events", "visiblePainted");
		} else {
			for (var i = 0; i < VisDock.svgArray.length; i++){
				VisDock.svgArray[i][0][0].removeEventListener("mousewheel", RotateTool.mousewheel, false);
				VisDock.svgArray[i][0][0].removeEventListener("DOMMouseScroll", RotateTool.mousewheel, false);
				Panel.panelArray[i].selectAll("*").attr("pointer-events", "visiblePainted");
			}			
		}
		VisDock.finishChrome();
		/*if (Chrome && BirdView.birdinit) {
			BirdView.init(Panel.panel, BirdView.width, BirdView.height)
		}*/		
	},
	mousewheel : function(evt) {
		if (evt.preventDefault)
			evt.preventDefault();
		evt.returnValue = false;
		if (evt.wheelDelta){
			var CX = (evt.offsetX);
			var CY = evt.offsetY;
		}
			// Chrome/Safari
		else{
			var CX = evt.pageX;
			var CY = evt.pageY;
		}		
		//var CX = evt.offsetX;
		//var CY = evt.offsetY;
		var delta = evt.wheelDelta ? evt.wheelDelta / 360 : evt.detail / -9;
		
		Panel.rotate(delta, [CX - 8, CY - 8], this.childNodes[0].childNodes[2].childNodes[0]);
		
		var T2 = d3.select("#BirdViewCanvas").attr("transform");
		d3.select("#BirdViewCanvas").attr("transform","");
		
		var r = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
		VisDock.svg[0][0].appendChild(r);
		var TMat = r.getCTM();	
		var x = evt.clientX - 8;
		var y = evt.clientY - 8;
		
		var T = r.getCTM().scale(BirdView.s_x, BirdView.s_y);
		var T = BirdView.Bird.getCTM();
		//var Tin = T.inverse();
		
		if (Panel.x != 0 || Panel.y != 0){
			//x = x - Panel.x;
			//y = y - Panel.y;
		}
		
		//if (Panel.rotation != 0){
			var TMat = T//.scale(1/Panel.scale, 1/Panel.scale)//.translate(-Panel.x, -Panel.y)
				.translate(x, y).rotate(-delta*10).translate(-x, -y);//.translate(Panel.x, Panel.y);//Tx, Ty);	
		//} else {
		//	var TMat = T.scale(1/Panel.scale, 1/Panel.scale)//.translate(-Panel.x, -Panel.y)
		//		.translate(x, y).rotate(-delta*10).translate(-x,-y)//.translate(Panel.x, Panel.y);//Tx, Ty);
		///}
		//var TMat = T.rotate(-delta*10)//.scale(1/Panel.scale, 1/Panel.scale)//.translate(-Panel.x, -Panel.y)
		//	.translate(x, y).rotate(-delta*10).translate(-x,-y)//.translate(Panel.x, Panel.y);//Tx, Ty);			
			
		var TMat2 = T//.scale(1/Panel.scale, 1/Panel.scale)
			.translate(x, y).rotate(-delta*10).translate(-x,-y);
		var TMat3 = TMat.inverse();
		VisDock.svg[0][0].removeChild(r);
		BirdView.Bird.setAttribute("transform", "matrix("+TMat.a+","+TMat.b+","+TMat.c+","+TMat.d+","+TMat.e+","+TMat.f+")");
		d3.selectAll("#BirdFrame")
			.attr("style", "fill:white; stroke-width: " + (30 * Panel.scale) + "; stroke: red; opacity:0.5")
			.attr("transform", "matrix("+TMat2.a+","+TMat2.b+","+TMat2.c+","+TMat2.d+","+TMat2.e+","+TMat2.f+")");
		
		d3.select("#clippedView").attr("transform", "matrix("+TMat3.a+","+TMat3.b+","+TMat3.c+","+TMat3.d+","+TMat3.e+","+TMat3.f+")");
		d3.select("#BirdViewCanvas").attr("transform", T2);		
		
	}
};

var AnnotatedByPointTool = {
	name : "AbyPoint",
	image : "https://raw.github.com/VisDockHub/NewVisDock/master/master/images/AnP.png",
	index : 0,
	start : null,
	end : [],
	isDrag : false,
	isResize : false,
	boxWidth: 100,
	boxHeight: 25,
	noProp: 0,
	//T: [],
	select : function() {
		console.log("select: " + AnnotatedByPointTool.name);
		Toolbox.setTool(AnnotatedByPointTool);
	},
	install : function() {
		/*var Chrome =(/Firefox/i.test(navigator.userAgent))? 0 : 1
		if (Chrome && BirdView.birdinit) {
			BirdView.removeBirdView();
		}*/
		VisDock.startChrome();	
		if (VisDock.mode == "single"){	
			Panel.viewport.selectAll("*").attr("pointer-events", "none");
			Panel.annotation.selectAll("*").attr("pointer-events", "visiblePainted");
			Panel.panel.on("mousedown", AnnotatedByPointTool.mousedown);
		} else {
			for (var i = 0; i < VisDock.svgArray.length; i++){
				Panel.multiview[i].selectAll("*").attr("pointer-events", "none");
				Panel.annotationArray[i].selectAll("*").attr("pointer-events", "visiblePainted");
				Panel.panelArray[i].on("mousedown", AnnotatedByPointTool.mousedown);
			}			
		}
		VisDock.finishChrome();
		/*if (Chrome && BirdView.birdinit) {
			BirdView.init(Panel.panel, BirdView.width, BirdView.height)
		}*/		
	},
	uninstall : function() {
		/*var Chrome =(/Firefox/i.test(navigator.userAgent))? 0 : 1
		if (Chrome && BirdView.birdinit) {
			BirdView.removeBirdView();
		}*/
		VisDock.startChrome();
		if (VisDock.mode == "single"){			
			Panel.panel.on("mousedown", null);
			Panel.viewport.selectAll("*").attr("pointer-events", "visiblePainted");
			Panel.annotation.selectAll("*").attr("pointer-events", "none");
		} else {
			for (var i = 0; i < VisDock.svgArray.length; i++) {
				Panel.panelArray[i].on("mousedown", null);
				Panel.multiview[i].selectAll("*").attr("pointer-events", "visiblePainted");
				Panel.annotationArray[i].selectAll("*").attr("pointer-events", "none");
			}			
		}
		VisDock.finishChrome();
		/*if (Chrome && BirdView.birdinit) {
			BirdView.init(Panel.panel, BirdView.width, BirdView.height)
		}*/		
	},
	mousedown : function(evt) {
		if (AnnotatedByPointTool.noProp == 1) {
			return;
		}
		
		// Disable BirView for Chrome browser
		VisDock.startChrome();
		//var Chrome =(/Firefox/i.test(navigator.userAgent))? 0 : 1
		//if (Chrome && BirdView.birdinit) {
		//	BirdView.removeBirdView();
		//}
						
		//AnnotatedByPointTool.start = d3.mouse(VisDock.svg[0][0]);
		AnnotatedByPointTool.start = d3.mouse(this.parentNode);
		var points = AnnotatedByPointTool.start;
		var TMat = this.childNodes[2].childNodes[0].getCTM().inverse();
		//var TMat = Panel.hostvis[0][0].getCTM().inverse();
		
		var tpoints = [];
		tpoints[0] = (points[0]) * TMat.a + (points[1]) * TMat.c + TMat.e;
		tpoints[1] = (points[0]) * TMat.b + (points[1]) * TMat.d + TMat.f; 
		//tpoints[0] = (points[0]+0*Panel.x) * TMat.a + (points[1]+0*Panel.y) * TMat.c + TMat.e;
		//tpoints[1] = (points[0]+0*Panel.x) * TMat.b + (points[1]+0*Panel.y) * TMat.d + TMat.f; 		
		AnnotatedByPointTool.start = tpoints;
		
		AnnotatedByPointTool.end[0] = AnnotatedByPointTool.start[0] + 50;
		AnnotatedByPointTool.end[1] = AnnotatedByPointTool.start[1] - 50;
		
		//var points2 = AnnotatedByPointTool.end;

		//var tpoints2 = [];
		//tpoints2[0] = (points2[0]+0*Panel.x) * TMat.a + (points2[1]+0*Panel.y) * TMat.c + TMat.e;
		//tpoints2[1] = (points2[0]+0*Panel.x) * TMat.b + (points2[1]+0*Panel.y) * TMat.d + TMat.f;
		//AnnotatedByPointTool.start = tpoints;
		//AnnotatedByPointTool.end = tpoints2;
		if (VisDock.mode == "single")
			var annotation = Panel.annotation.append("g").attr("class", "annotations");
		else {
			AnnotatedByPointTool.index = parseInt(this.getAttribute("id").split("MainPanel")[1]);
			var annotation = Panel.annotationArray[AnnotatedByPointTool.index]
				.append("g").attr("class", "annotations");
		}
							//.attr("transform", "tpoints");
		annotationArray[numAnno] = [];
		annotationArray[numAnno][0] = annotation;
		annotationArray[numAnno][1] = 0;
		numAnno++;
		//annotation.append("circle").attr("cx", AnnotatedByPointTool.start[0]).attr("cy", AnnotatedByPointTool.start[1]).attr("class", "annotation-circle").attr("r", 2).attr("fill", "red").attr("opacity", 0.8);

		annotation.append("line").attr("x1", AnnotatedByPointTool.start[0])
				.attr("y1", AnnotatedByPointTool.start[1]).attr("x2", AnnotatedByPointTool.end[0])
				.attr("y2", AnnotatedByPointTool.end[1]).attr("class", "annotation-line");

		var label = annotation.append("g").attr("pointer-events", "visiblePainted").attr("class", "annotationLabels");
		var r = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
		//AnnotatedByPointTool.T.push(Panel.viewport[0][0].getCTM());
		var t = r.getCTM();
		if (t == null){
			//VisDock.svg[0][0].appendChild(r);
			this.parentNode.appendChild(r);
			t = r.getCTM();
		}
		var x2 = AnnotatedByPointTool.end[0];//annotations[i].childNodes[1].getAttributeNS(null, "x2");
		var y2 = AnnotatedByPointTool.end[1];//annotations[i].childNodes[1].getAttributeNS(null, "y2");
		if (VisDock.mode == "single")
			var tmat = t.translate(1*x2, 1*y2).rotate(-Panel.rotation).translate(-1*x2, -1*y2);
		else
			var tmat = t.translate(1*x2, 1*y2)
						.rotate(-Panel.rotationArray[AnnotatedByPointTool.index]).translate(-1*x2, -1*y2);
			
		label[0][0].setAttributeNS(null, "transform", "matrix("+ tmat.a+","+ tmat.b+","+ tmat.c+","+ tmat.d+","+ tmat.e+","+ tmat.f+")");

		var textbox = label.append("rect").attr("x", AnnotatedByPointTool.end[0])
							.attr("y", AnnotatedByPointTool.end[1])
							.attr("id", numAnno - 1)
							.attr("class", "annotation-textbox")
							.attr("width", AnnotatedByPointTool.boxWidth)
							.attr("height", AnnotatedByPointTool.boxHeight)
							.attr("style", "fill: white; opacity: 0.5; stroke: black; stroke-width: 1px; cursor:text")
							.attr("pointer-events", "visiblePainted")
								.on("mousedown", function(){
									
									var id = parseInt(this.getAttributeNS(null, "id"));
									var newText = window.prompt("Please enter the text you want to annotate",
										this.parentNode.childNodes[5].innerHTML); 
									 //d3.select(d3.selectAll(".annotation-textbox")[0][id].parentNode).select("text")[0][0].innerHTML );
									AnnotatedByPointTool.noProp = 1;
									if (newText != null && newText != "") {
										var str = newText;
										var str2 = newText;
										if (newText.length > 7){
											str = newText.substr(0, 6) + "...";
											//var sample = VisDock.svg.append("text").text(newText)
											//				.attr("display", "hidden");
											if (VisDock.mode == "single")
												var sample = VisDock.svg.append("text").text(newText)
															.attr("display", "hidden");
											else 
												var sample = VisDock.svgArray[AnnotatedByPointTool.index]
															.append("text").text(newText)
															.attr("display", "hidden");
																						 															
											var w = sample[0][0].getComputedTextLength() + 5;
											sample.remove();
											if (w > AnnotatedByPointTool.boxWidth){
												d3.selectAll(".annotation-textbox")[0][id].setAttributeNS(null, "width", w);
											}											
										} 
										/*if (newText.length > 20) {
											var sample = VisDock.svg.append("text").text(newText)
															.attr("display", "hidden")
											var w = sample[0][0].getComputedTextLength() + 5
											QueryManager.annoWidth[id] = w;
											d3.selectAll(".annotation-textbox")[0][id].setAttributeNS(null, "width", w)
											sample.remove();
										} else {
											d3.selectAll(".annotation-textbox")[0][id].setAttributeNS(null, "width", AnnotatedByPointTool.boxWidth)
										}*/
							
										QueryManager.annoText[parseInt(this.getAttributeNS(null, "id"))] = newText;
										this.parentNode.childNodes[5].innerHTML = str2;
										//d3.select(d3.selectAll(".annotation-textbox")[0][id].parentNode).select("text")[0][0].innerHTML = str2;
										QueryManager.names2[parseInt(this.getAttributeNS(null, "id"))].text(str);
									}
							})	
							.on("mousemove", function(){
								AnnotatedByPointTool.noProp = 1;
							})							
							.on("mouseout", function(){
								AnnotatedByPointTool.noProp = 0;
							});
		var hover = label.append("rect").attr("x", AnnotatedByPointTool.end[0])	
						.attr("y", AnnotatedByPointTool.end[1])
						.attr("width", AnnotatedByPointTool.boxWidth/10)
						.attr("height", AnnotatedByPointTool.boxHeight/2)	
						.attr("pointer-events", "visiblePainted")
						.attr("style", "fill: blue; opacity: 0.5; stroke: black; stroke-width: 1px; cursor: pointer")
						.on("mousedown", function(){
							AnnotatedByPointTool.noProp = 1;
						})	
						.on("mousemove", function(){
							AnnotatedByPointTool.noProp = 1;
						})							
						.on("mouseout", function(){
							AnnotatedByPointTool.noProp = 0;
						});
		var exit = label.append("rect").attr("x", AnnotatedByPointTool.end[0])
						.attr("id", "exit")	
						.attr("y", AnnotatedByPointTool.end[1] + AnnotatedByPointTool.boxHeight/2)
						.attr("width", AnnotatedByPointTool.boxWidth/10)
						.attr("height", AnnotatedByPointTool.boxHeight/2)	
						.attr("pointer-events", "visiblePainted")
						.attr("style", "fill: red; opacity: 0.5; stroke: black; stroke-width: 1px; cursor: pointer")
						.attr("class", numAnno - 1)
						.on("mousedown", function(){
							//AnnotatedByPointTool.noProp = 1;
							d3.event.stopPropagation();
							if (VisDock.mode == "single") Panel.panel.on("mouseup", null);
							else Panel.panelArray[AnnotatedByPointTool.index].on("mouseup", null);
							var index = this.getAttributeNS(null, "class");
							QueryManager.removeAnnotation(index, "byPoint");
							//annotation.remove();
							QueryManager.annotation[index].remove();							
						})	
						.on("mousemove", function(){
							AnnotatedByPointTool.noProp = 1;
						})							
						.on("mouseout", function(){
							AnnotatedByPointTool.noProp = 0;
						});
		var exit_1 = label.append("line").attr("x1", AnnotatedByPointTool.end[0]).attr("id", "exit_1")
							.attr("x2", AnnotatedByPointTool.end[0] + AnnotatedByPointTool.boxWidth/10)
							.attr("y1", AnnotatedByPointTool.end[1] + AnnotatedByPointTool.boxHeight)	
							.attr("y2", AnnotatedByPointTool.end[1] + AnnotatedByPointTool.boxHeight/2)	
							.attr("class", numAnno - 1)
							.attr("style", "stroke-width: 1px; stroke: black; cursor: pointer")			
							.on("mousedown", function(){
								d3.event.stopPropagation();
								Panel.panelArray[AnnotatedByPointTool.index].on("mouseup", null);
								//annotation.remove();
								var index2 = this.getAttributeNS(null, "class");
								QueryManager.removeAnnotation(index2, "byPoint");
								QueryManager.annotation[index2].remove();								
							});		
		var exit_2 = label.append("line").attr("x1", AnnotatedByPointTool.end[0]).attr("id", "exit_2")
							.attr("x2", AnnotatedByPointTool.end[0] + AnnotatedByPointTool.boxWidth/10)
							.attr("y2", AnnotatedByPointTool.end[1] + AnnotatedByPointTool.boxHeight)	
							.attr("y1", AnnotatedByPointTool.end[1] + AnnotatedByPointTool.boxHeight/2)	
							.attr("style", "stroke-width: 1px; stroke: black; cursor: pointer")		
							.attr("class", numAnno - 1)
							.on("mousedown", function(){
								d3.event.stopPropagation();
								Panel.panelArray[AnnotatedByPointTool.index].on("mouseup", null);
								var index2 = this.getAttributeNS(null, "class");
								QueryManager.removeAnnotation(index2, "byPoint");
								//annotation.remove();
								QueryManager.annotation[index2].remove();								
							});				
		QueryManager.annoText[numAnno - 1] = "Label " + numAnno.toString();		
		QueryManager.annoWidth[numAnno - 1] = AnnotatedByPointTool.boxWidth;
		QueryManager.annoHeight[numAnno - 1] = AnnotatedByPointTool.boxHeight;	
		var textContent = label.append("text").attr("x", 5 + AnnotatedByPointTool.end[0] + AnnotatedByPointTool.boxWidth/10)
								.attr("y", AnnotatedByPointTool.end[1] + AnnotatedByPointTool.boxHeight*2/3)
								.attr("id", numAnno - 1)
								.text("Label " + numAnno.toString())
								.attr("style", "font-size: 12px")
								.attr("class", numAnno - 1)
								.on("mousedown", function(){
									
									
									var id = parseInt(this.getAttributeNS(null, "id"));
									
									var newText = window.prompt("Please enter the text you want to annotate",
										this.innerHTML);
									AnnotatedByPointTool.noProp = 1;
									if (newText != null && newText != "") {
										var str = newText;
										var str2 = newText;
										if (newText.length > 7){
											str = newText.substr(0, 6) + "...";
											if (VisDock.mode == "single")
												var sample = VisDock.svg.append("text").text(newText)
															.attr("display", "hidden");
											else
												var sample = VisDock.svgArray[AnnotatedByPointTool.index]
															.append("text").text(newText)
															.attr("display", "hidden");												 
											var w = sample[0][0].getComputedTextLength() + 5;
											sample.remove();
											if (w > AnnotatedByPointTool.boxWidth) {
												d3.selectAll(".annotation-textbox")[0][id].setAttributeNS(null, "width", w);
											}											
										} 
										/*if (newText.length > 20) {
											var sample = VisDock.svg.append("text").text(newText)
															.attr("display", "hidden")
											var w = sample[0][0].getComputedTextLength() + 5
											QueryManager.annoWidth[id] = w;
											d3.selectAll(".annotation-textbox")[0][id].setAttributeNS(null, "width", w)
											sample.remove();
										} else {
											d3.selectAll(".annotation-textbox")[0][id].setAttributeNS(null, "width", AnnotatedByPointTool.boxWidth)
										}*/
										
										//if (newText.length > 20){
											//str = newText.substr(0, 6) + "..."
										//	str2 = newText.substr(0, 20)
										//	for (var u = 1; u < Math.ceil(newText.length / 20); u++){
												//var sample = document.createElementNS("http://www.w3.org/2000/svg", "text")
												/*d3.select(this.parentNode).append("text")
													.attr("x", 5 + AnnotatedByPointTool.end[0] + AnnotatedByPointTool.boxWidth/10)
													.attr("y", 12 + AnnotatedByPointTool.end[1] + AnnotatedByPointTool.boxHeight*2/3)*/
												/*VisDock.svg[0][0].appendChild(sample)
												 * 
												 */
										//		var sample = VisDock.svg.append("text").text(newText.substr((u - 1) * 20, 20))
										//						.attr("display", "hidden")
												/*var textNode = document.createTextNode(newText.substr((u) * 20, 20));
												sample.appendChild(textNode);
												sample.setAttributeNS(null, "hidden", "none")
												sample.setAttributeNS(null, "style", "font-size:12px; font-family: Verdana, sans-serif;")*/
												//sample.textContent()
										//		var w = sample[0][0].getComputedTextLength();
										//		str2 = str2 + "<tspan dy = 12, dx = -" + w + ">" + newText.substr(u * 20, 20) +
										//				 "</tspan>"
										//		sample.remove()
						 				//	}
										//	sample.remove();						 					
						 				//	var d;
										//}										
										QueryManager.annoText[parseInt(this.getAttributeNS(null, "id"))] = newText;
										//this.textContent = str2;
										this.innerHTML = str2;
										QueryManager.names2[parseInt(this.getAttributeNS(null, "id"))].text(str);
									}
						//span = div.append("xhtml:span").attr("class", "close-btn").attr("id", this.getAttributeNS(null, "class"));
						//span.append("xhtml:a").attr("href", "#").text("x");
						//span.style("left", (parseInt(div.style("width")) - 40) + "px");
						//span.on("mousedown", function() {
							//d3.event.stopPropagation();
							//Panel.panel.on("mouseup", null);
							//annotation.remove();
							//QueryManager.annotation[parseInt(this.getAttributeNS(null, "id"))].remove();
						//});
					//}
								})				
								.on("mousemove", function(){
									AnnotatedByPointTool.noProp = 1;
								})
								.on("mouseout", function(){
									AnnotatedByPointTool.noProp = 0;
								});
														
		var index = QueryManager.addAnnotation("red", 1, "Label " + numAnno);
		label.attr("id", index);

		annotation.append("circle").attr("cx", AnnotatedByPointTool.start[0]).attr("cy", AnnotatedByPointTool.start[1])
					.attr("pointer-events", "visiblePainted")
					.attr("r", 5).attr("class", "annotation-dot")
					.attr("style", "fill: black; cursor: pointer")
					.on("mousedown", function(){
						AnnotatedByPointTool.isDrag = 1;
						var TMat = this.getCTM().inverse();
						var tpoints = [];
						var tpoints2 = [];
						var tpoints3 = [];
						
						//tpoints[0] = (firstPlace[0]+0*Panel.x) * TMat.a + (firstPlace[1]+0*Panel.y) * TMat.c + TMat.e;
						//tpoints[1] = (firstPlace[0]+0*Panel.x) * TMat.b + (firstPlace[1]+0*Panel.y) * TMat.d + TMat.f;
						if (VisDock.mode == "single"){
							var panelview = VisDock.svg;
						} else {
							var panelview = VisDock.svgArray[AnnotatedByPointTool.index];
						}
						panelview.on("mousemove", function(){
						if (AnnotatedByPointTool.isDrag){
							VisDock.startChrome();
							if (VisDock.mode == "single")
								secondPlace = d3.mouse(VisDock.svg[0][0]);
							else secondPlace = d3.mouse(VisDock.svgArray[AnnotatedByPointTool.index]);
							
							tpoints2[0] = (secondPlace[0]) * TMat.a + (secondPlace[1]) * TMat.c + TMat.e;
							tpoints2[1] = (secondPlace[0]) * TMat.b + (secondPlace[1]) * TMat.d + TMat.f; 
							//tpoints2[0] = (secondPlace[0]+0*Panel.x) * TMat.a + (secondPlace[1]+0*Panel.y) * TMat.c + TMat.e;
							//tpoints2[1] = (secondPlace[0]+0*Panel.x) * TMat.b + (secondPlace[1]+0*Panel.y) * TMat.d + TMat.f; 
					
							var T = label[0][0].getAttributeNS(null, "transform").split(",");
							var Ta = T[0].split("(")[1];
							Ta = parseFloat(Ta);
							var Tb = parseFloat(T[1]);
							var Tc = parseFloat(T[2]);
							var Td = parseFloat(T[3]);
							var Te = parseFloat(T[4]);
							var Tf = T[5].split(")")[0];
							Tf = parseFloat(Tf);
							//var T = label[0][0].getCTM().inverse();
							tpoints3[0] = (tpoints2[0]+0*Panel.x) * Ta + (tpoints2[1]+0*Panel.y) * Tc + Te;
							tpoints3[1] = (tpoints2[0]+0*Panel.x) * Tb + (tpoints2[1]+0*Panel.y) * Td + Tf;
							
							/*tpoints3[0] = (tpoints2[0]+0*Panel.x) * T.a + (tpoints2[1]+0*Panel.y) * T.c + T.e;
							tpoints3[1] = (tpoints2[0]+0*Panel.x) * T.b + (tpoints2[1]+0*Panel.y) * T.d + T.f;*/
																	
					annotation.select(".annotation-line").attr("x1", tpoints2[0])//secondPlace[0])
						.attr("y1", tpoints2[1]);
					annotation.select(".annotation-dot").attr("cx", tpoints2[0])
						.attr("cy", tpoints2[1]);
					/*annotation.selectAll("rect").attr("x", tpoints2[0])//secondPlace[0])
						.attr("y", tpoints2[1])
					annotation.selectAll("text").attr("x", 5 + tpoints2[0] + AnnotatedByPointTool.boxWidth/10)
						.attr("y", tpoints2[1] + AnnotatedByPointTool.boxHeight*2/3)
						
					annotation.select("#exit").attr("x", tpoints2[0]) // Exit Button
						.attr("y", tpoints2[1] + AnnotatedByPointTool.boxHeight/2)
					annotation.select("#exit_1").attr("x1", tpoints2[0]) // Exit X_1
						.attr("x2", tpoints2[0] + AnnotatedByPointTool.boxWidth/10)
						.attr("y1", tpoints2[1] + AnnotatedByPointTool.boxHeight)
						.attr("y2", tpoints2[1] + AnnotatedByPointTool.boxHeight/2)	
					annotation.select("#exit_2").attr("x1", tpoints2[0]) // Exit X_2
						.attr("x2", tpoints2[0] + AnnotatedByPointTool.boxWidth/10)
						.attr("y1", tpoints2[1] + AnnotatedByPointTool.boxHeight/2)
						.attr("y2", tpoints2[1] + AnnotatedByPointTool.boxHeight)*/										
				}
				VisDock.finishChrome();
			});
			if (VisDock.mode == "single"){
				var panelview = VisDock.svg;
			} else {
				var panelview = VisDock.svgArray[AnnotatedByPointTool.index];
			}			
			panelview.on("mouseup", function(){
				AnnotatedByPointTool.isDrag = false;
			});						 						
					})	
					.on("mousemove", function(){
						AnnotatedByPointTool.noProp = 1;
					})							
					.on("mouseout", function(){
						AnnotatedByPointTool.noProp = 0;
					});
							
		hover.on("mousedown", function(){
			d3.event.stopPropagation();
			var firstPlace, secondPlace;
			AnnotatedByPointTool.isDrag = true;
			if (VisDock.mode == "single"){
				var panelview = VisDock.svg;
			} else {
				var panelview = VisDock.svgArray[AnnotatedByPointTool.index];
			}			
			firstPlace = d3.mouse(panelview[0][0]);	

			var TMat = this.getCTM().inverse();

			var tpoints = [];
			var tpoints2 = [];
			var tpoints3 = [];
			tpoints[0] = (firstPlace[0]+0*Panel.x) * TMat.a + (firstPlace[1]+0*Panel.y) * TMat.c + TMat.e;
			tpoints[1] = (firstPlace[0]+0*Panel.x) * TMat.b + (firstPlace[1]+0*Panel.y) * TMat.d + TMat.f; 
			//strpoints = [strpoints + (tpoints[0]) + "," + (tpoints[1]) + " "]
				
			panelview.on("mousemove", function(){
				if (AnnotatedByPointTool.isDrag){

					// Disable BirdView for Chrome
					VisDock.startChrome();
										
					secondPlace = d3.mouse(panelview[0][0]);
					//secondPlace = d3.mouse(VisDock.svg[0][0]);
					tpoints2[0] = (secondPlace[0]+0*Panel.x) * TMat.a + (secondPlace[1]+0*Panel.y) * TMat.c + TMat.e;
					tpoints2[1] = (secondPlace[0]+0*Panel.x) * TMat.b + (secondPlace[1]+0*Panel.y) * TMat.d + TMat.f; 
					
					var T = label[0][0].getAttributeNS(null, "transform").split(",");
					var Ta = T[0].split("(")[1];
					Ta = parseFloat(Ta);
					var Tb = parseFloat(T[1]);
					var Tc = parseFloat(T[2]);
					var Td = parseFloat(T[3]);
					var Te = parseFloat(T[4]);
					var Tf = T[5].split(")")[0];
					Tf = parseFloat(Tf);
					tpoints3[0] = (tpoints2[0]+0*Panel.x) * Ta + (tpoints2[1]+0*Panel.y) * Tc + Te;
					tpoints3[1] = (tpoints2[0]+0*Panel.x) * Tb + (tpoints2[1]+0*Panel.y) * Td + Tf; 
										
					annotation.select(".annotation-line").attr("x2", tpoints3[0])//secondPlace[0])
						.attr("y2", tpoints3[1]);
					annotation.selectAll("rect").attr("x", tpoints2[0])//secondPlace[0])
						.attr("y", tpoints2[1]);
					annotation.selectAll("text").attr("x", 5 + tpoints2[0] + AnnotatedByPointTool.boxWidth/10)
						.attr("y", tpoints2[1] + AnnotatedByPointTool.boxHeight*2/3);
						
					annotation.select("#exit").attr("x", tpoints2[0]) // Exit Button
						.attr("y", tpoints2[1] + AnnotatedByPointTool.boxHeight/2);
					
					annotation.select("#exit_1").attr("x1", tpoints2[0]) // Exit X_1
						.attr("x2", tpoints2[0] + AnnotatedByPointTool.boxWidth/10)
						.attr("y1", tpoints2[1] + AnnotatedByPointTool.boxHeight)
						.attr("y2", tpoints2[1] + AnnotatedByPointTool.boxHeight/2);	
					annotation.select("#exit_2").attr("x1", tpoints2[0]) // Exit X_2
						.attr("x2", tpoints2[0] + AnnotatedByPointTool.boxWidth/10)
						.attr("y1", tpoints2[1] + AnnotatedByPointTool.boxHeight/2)
						.attr("y2", tpoints2[1] + AnnotatedByPointTool.boxHeight);	
					
					// Enable BirdView for Chrome	
					VisDock.finishChrome();						
															
				}
			});	
			panelview.on("mouseup", function(){
				AnnotatedByPointTool.isDrag = false;
			});
		});
		//BirdView.restoreBirdView()
		// Enable BirdView for Chrome
		VisDock.startChrome();
		//if (Chrome && BirdView.birdinit) {
		//	BirdView.init(Panel.panel, BirdView.width, BirdView.height)
		//}		
		
		/*var foreignObject = label.append("foreignObject").attr("x", AnnotatedByPointTool.end[0]).attr("y", AnnotatedByPointTool.end[1]).attr("width", "120px").attr("height", "45px");
		var div = foreignObject.append("xhtml:div").text("label " + numAnno);
		var divWidth = div.style("width");
		var divHeight = div.style("height");
		var span = div.append("xhtml:span").attr("class", "close-btn");
		span.append("xhtml:a").attr("href", "#").text("x");
		var index = QueryManager.addAnnotation("red", 1, "label " + numAnno);
		

		span.on("mousedown", function() {
			d3.event.stopPropagation();
			Panel.panel.on("mouseup", null);
			annotation.remove();
			QueryManager.annotation[index].remove();
		});

		label.on("mousedown", function() {
			d3.event.stopPropagation();
			var firstPlace, secondPlace;
			firstPlace = d3.mouse(this);
			label.on("mousemove", function() {
				secondPlace = d3.mouse(this);
				if (Math.abs(secondPlace[0] - firstPlace[0]) > 10 || Math.abs(secondPlace[1] - firstPlace[1]) > 10) {
					if (div.style("width") != divWidth || div.style("height") != divHeight) {
						foreignObject.attr("width", parseInt(div.style("width")) + 20);
						foreignObject.attr("height", parseInt(div.style("height")) + 15);
						span.style("left", (parseInt(div.style("width")) - 40) + "px");
						divWidth = div.style("width");
						divHeight = div.style("height");
						if (annotation.select("line").attr("x2") < AnnotatedByPointTool.start[0] && annotation.select("line").attr("y2") < AnnotatedByPointTool.start[1]) {
							annotation.select("line").attr("x2", parseInt(foreignObject.attr("x")) + parseInt(divWidth) + 12);
							//	.attr("y2", d3.mouse(this)[1]);
						}
						AnnotatedByPointTool.isResize = true;
					} else {
						AnnotatedByPointTool.isDrag = true;
						//drag
						if (d3.mouse(this)[0] < AnnotatedByPointTool.start[0] && d3.mouse(this)[1] < AnnotatedByPointTool.start[1]) {
							annotation.select("line").attr("x2", d3.mouse(this)[0]).attr("y2", d3.mouse(this)[1]);
							label.select("foreignObject").attr("x", d3.mouse(this)[0] - parseInt(foreignObject.attr("width"))).attr("y", d3.mouse(this)[1]);
						} else {
							annotation.select("line").attr("x2", d3.mouse(this)[0]).attr("y2", d3.mouse(this)[1]);
							label.select("foreignObject").attr("x", d3.mouse(this)[0]).attr("y", d3.mouse(this)[1]);
						}
					}
				}
			});
			label.on("mouseup", function() {
				if (AnnotatedByPointTool.isDrag != true && AnnotatedByPointTool.isResize != true)//just click
				{
					d3.event.stopPropagation();
					var newText = window.prompt("Please enter the text you want to annotate");
					if (newText != null && newText != "") {
						div.text(newText);
						QueryManager.names2[parseInt(this.getAttributeNS(null, "class"))].text(newText);
						span = div.append("xhtml:span").attr("class", "close-btn").attr("id", this.getAttributeNS(null, "class"));
						span.append("xhtml:a").attr("href", "#").text("x");
						span.style("left", (parseInt(div.style("width")) - 40) + "px");
						span.on("mousedown", function() {
							d3.event.stopPropagation();
							Panel.panel.on("mouseup", null);
							annotation.remove();
							QueryManager.annotation[parseInt(this.getAttributeNS(null, "id"))].remove();
						});
					}
				}
				label.on("mousemove", null);

			});
			AnnotatedByPointTool.isDrag = false;
			AnnotatedByPointTool.isResize = false;
		});*/	
		
	},

	changeColor : function(color, index) {
		annotationArray[index][0].select("circle").attr("fill", color);
		annotationArray[index][0].select("line").style("stroke", color);
		annotationArray[index][0].select("div").style("color", color);
	},

	changeLabel : function(newname, index) {
		annotationArray[index][0].select("div").text(newname);
		var span = annotationArray[index][0].select("div").append("xhtml:span").attr("class", "close-btn").attr("id", index);
		span.append("xhtml:a").attr("href", "#").text("x");
		span.style("left", (parseInt(annotationArray[index][0].select("div").style("width")) - 40) + "px");
		span.on("mousedown", function() {
			d3.event.stopPropagation();
			if (VisDock.mode == "single") Panel.panel.on("mouseup", null);
			else Panel.panelArray[AnnotatedByPointTool.index].on("mouseup", null);
			annotationArray[index][0].remove();
			QueryManager.annotation[index].remove();
		});
	},

	removeLabel : function(index) {
		annotationArray[index][0].remove();
	}
};

var AnnotatedByAreaTool = {
	name : "AbyArea",
	image : "https://raw.github.com/VisDockHub/NewVisDock/master/master/images/AnA.png",
	index : 0,
	start : 0,
	segments : 0,
	dragging : 0,
	points : [],
	blasso : [],
	areaarray : [],
	count : 0,
	strpoints : [],
	pointStart : [],
	end : [],
	isDrag : false,
	isMobile : false,
	isResize : false,
	boxWidth: 100,
	boxHeight: 25,
	noProp: 0,	
	index : 0,

	select : function() {
		console.log("select: " + AnnotatedByAreaTool.name);
		Toolbox.setTool(AnnotatedByAreaTool);
	},

	install : function() {
		//VisDock.eventHandler = true;
		/*var Chrome =(/Firefox/i.test(navigator.userAgent))? 0 : 1
		if (Chrome && BirdView.birdinit) {
			BirdView.removeBirdView();
		}*/
		VisDock.startChrome();		
		if (VisDock.mode == "single"){
			Panel.viewport.selectAll("*").attr("pointer-events", "none");
			Panel.annotation.selectAll("*").attr("pointer-events", "visiblePainted");
			Panel.panel.on("mousedown", AnnotatedByAreaTool.mousedown);
		} else {
			for (var i = 0; i < VisDock.svgArray.length; i++){
				Panel.multiview[i].selectAll("*").attr("pointer-events", "none");
				Panel.annotationArray[i].selectAll("*").attr("pointer-events", "visiblePainted");
				Panel.panelArray[i].on("mousedown", AnnotatedByAreaTool.mousedown);				
			}
		}
		VisDock.finishChrome();
		/*if (Chrome && BirdView.birdinit) {
			BirdView.init(Panel.panel, BirdView.width, BirdView.height)
		}*/			
	},

	uninstall : function() {
		//VisDock.eventHandler = null;
		/*var Chrome =(/Firefox/i.test(navigator.userAgent))? 0 : 1
		if (Chrome && BirdView.birdinit) {
			BirdView.removeBirdView();
		}*/
		VisDock.startChrome();		
		if (VisDock.mode == "single"){
			Panel.panel.on("mousedown", null);
			Panel.panel.on("mousemove", null);
			Panel.panel.on("mouseup", null);
			Panel.viewport.selectAll("*").attr("pointer-events", "visiblePainted");
			Panel.annotation.selectAll("*").attr("pointer-events", "none");
		} else {
			for (var i = 0; i < VisDock.svgArray.length; i++){
				Panel.panelArray[i].on("mousedown", null);
				Panel.panelArray[i].on("mousemove", null);
				Panel.panelArray[i].on("mouseup", null);
				Panel.multiview[i].selectAll("*").attr("pointer-events", "visiblePainted");
				Panel.annotationArray[i].selectAll("*").attr("pointer-events", "none");				
			}	
		}
		VisDock.finishChrome();
		/*if (Chrome && BirdView.birdinit) {
			BirdView.init(Panel.panel, BirdView.width, BirdView.height)
		}*/			
	},

	getPoints : function() {
		var str = [];

		for (var i = 0; i < AnnotatedByAreaTool.segments; i++) {
			if (i != AnnotatedByAreaTool.segments - 1) {
				str = [str + AnnotatedByAreaTool.points[i][0] + "," + AnnotatedByAreaTool.points[i][1] + " "];
			} else {
				str = [str + AnnotatedByAreaTool.points[i][0] + "," + AnnotatedByAreaTool.points[i][1] + " "];
			}
		}
		str = [str + AnnotatedByAreaTool.points[0][0] + "," + AnnotatedByAreaTool.points[0][1]];
		AnnotatedByAreaTool.strpoints = str;
		return str;
	},

	AnnotatedByAreaToolUpdate : function(curr) {
		if (VisDock.mode == "single")
			var TMat = Panel.hostvis[0][0].getCTM().inverse();
		else {
			var TMat = Panel.multivis[AnnotatedByAreaTool.index][0][0].getCTM().inverse();	
		}
		var tpoints = AnnotatedByAreaTool.calculateTransform(curr[0], curr[1], TMat);
		AnnotatedByAreaTool.points[AnnotatedByAreaTool.segments] = tpoints;
		
		//[curr[0], curr[1]];
	},
	calculateTransform : function(x, y, TMat) {
		var tpoints = [];
		tpoints[0] = (x) * TMat.a + (y) * TMat.c + TMat.e + Panel.x; 
		tpoints[1] = (x) * TMat.b + (y) * TMat.d + TMat.f + Panel.y; 
		return tpoints;
	},
	calculateInverseTransform : function(x, y, TMat){
		var tpoints = [];
		tpoints[0] = (x+0*Panel.x) * TMat.a + (y+0*Panel.y) * TMat.c + TMat.e;
		tpoints[1] = (x+0*Panel.x) * TMat.b + (y+0*Panel.y) * TMat.d + TMat.f;
		return tpoints;
	},
	mousedown : function() {

		if (AnnotatedByAreaTool.noProp == 1) {
			return;
		}
		var gView, pView, panelview, mainpanel;
		if (VisDock.mode == "single"){
			gView = Panel.hostvis;
			pView = Panel.viewport;
			mainpanel = Panel.panel;
			panelview = VisDock.svg;
		} else {
			AnnotatedByAreaTool.index = parseInt(this.parentNode.getAttribute("id").split("svgVisDock")[1]);
			gView = Panel.multivis[AnnotatedByAreaTool.index];
			pView = Panel.multiview[AnnotatedByAreaTool.index];
			mainpanel = Panel.panelArray[AnnotatedByAreaTool.index];
			panelview = VisDock.svgArray[AnnotatedByAreaTool.index];
		}
		// Disable BirdView for Chrome Browser
		VisDock.startChrome();

		// Prevent Browser's default behaviour
		d3.event.preventDefault();
		
		// Store starting point
		var N = AnnotatedByAreaTool.blasso.length;
		//var TMat = Panel.hostvis[0][0].getCTM().inverse();
		var TMat = gView[0][0].getCTM().inverse();
		var x1 = d3.mouse(this)[0];
		var y1 = d3.mouse(this)[1];
		AnnotatedByAreaTool.start = AnnotatedByAreaTool.calculateInverseTransform(x1, y1, TMat);

		if (AnnotatedByAreaTool.dragging == false) {
			AnnotatedByAreaTool.dragging = true;
			AnnotatedByAreaTool.AnnotatedByAreaToolUpdate(d3.mouse(this));
			AnnotatedByAreaTool.segments += 1;
			var points = AnnotatedByAreaTool.getPoints();
			if (AnnotatedByAreaTool.segments == 1) {
				AnnotatedByAreaTool.blasso[N] = pView.append("polygon")//Panel.panel.append("polygon")
				.attr("id", "selection").attr("points", points).attr("class", "selection").attr("transform", "translate(" + (-Panel.x) + "," + (-Panel.y) + ")");
			} else {
				AnnotatedByAreaTool.blasso[N].attr("points", points);
			}
		}

		mainpanel.on("mousemove", function() {
			if (AnnotatedByAreaTool.dragging 
				&& AnnotatedByAreaTool.noProp == 0 && AnnotatedByAreaTool.isMobile == false) {
				// Update the selection
				VisDock.startChrome();
				AnnotatedByAreaTool.AnnotatedByAreaToolUpdate(d3.mouse(this));
				AnnotatedByAreaTool.segments += 1;
				var points = AnnotatedByAreaTool.getPoints();
				AnnotatedByAreaTool.blasso[N].attr("points", points);
				VisDock.finishChrome();
			}
		});
		

		mainpanel.on("mouseup", function() {
			
			VisDock.startChrome();
			if (AnnotatedByAreaTool.noProp){
				return;
			} 
			
			// Update Segment number
			AnnotatedByAreaTool.AnnotatedByAreaToolUpdate(d3.mouse(this));
			AnnotatedByAreaTool.segments += 1;
			var points = AnnotatedByAreaTool.getPoints();
			AnnotatedByAreaTool.blasso[N].attr("points", points);

			var maxLeft = 0, maxRight = 0, maxUp = 0, maxBottom = 0;
			for (var i = 0; i < AnnotatedByAreaTool.segments; i++) {
				if (i == 0) {
					maxLeft = maxRight = AnnotatedByAreaTool.points[0][0];
					maxUp = maxBottom = AnnotatedByAreaTool.points[0][1];
				} else {
					if (AnnotatedByAreaTool.points[i][0] < maxLeft)
						maxLeft = AnnotatedByAreaTool.points[i][0];
					if (AnnotatedByAreaTool.points[i][0] > maxRight)
						maxRight = AnnotatedByAreaTool.points[i][0];
					if (AnnotatedByAreaTool.points[i][1] < maxUp)
						maxUp = AnnotatedByAreaTool.points[i][1];
					if (AnnotatedByAreaTool.points[i][1] > maxBottom)
						maxBottom = AnnotatedByAreaTool.points[i][1];
				}
			}
			AnnotatedByAreaTool.pointStart[0] = (maxLeft + maxRight) / 2 - Panel.x;
			AnnotatedByAreaTool.pointStart[1] = (maxUp + maxBottom) / 2 - Panel.y;
			AnnotatedByAreaTool.end[0] = AnnotatedByAreaTool.pointStart[0] + 50;
			AnnotatedByAreaTool.end[1] = AnnotatedByAreaTool.pointStart[1] - 50;

			//var annotation = Panel.viewport.append("g").attr("class", "annotations");
			var annotation = pView.append("g").attr("class", "annotations");
			annotationArray[numAnno] = [];
			annotationArray[numAnno][0] = annotation;
			annotationArray[numAnno][1] = 1;

			AnnotatedByAreaTool.areaarray.push(numAnno);
			//alert(AnnotatedByAreaTool.areaarray)
			numAnno++;

				//.attr("transform", "translate(" + (-Panel.x) + "," + (-Panel.y) + ")");
			annotation.append("line").attr("x1", AnnotatedByAreaTool.pointStart[0])
				.attr("y1", AnnotatedByAreaTool.pointStart[1])
				.attr("x2", AnnotatedByAreaTool.end[0])
				.attr("y2", AnnotatedByAreaTool.end[1])
				.attr("class", "annotation-line");
				//.attr("transform", "translate(" + (-Panel.x) + "," + (-Panel.y) + ")")

			var label = annotation.append("g").attr("pointer-events", "visiblePainted")
				.attr("class", "annotationLabels");
				//.attr("transform", "translate(" + (-Panel.x) + "," + (-Panel.y) + ")");
				
			var r = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
			var t = r.getCTM();
			if (t == null){
				//VisDock.svg[0][0].appendChild(r);
				panelview[0][0].appendChild(r);
				t = r.getCTM();
			}
			var x2 = AnnotatedByAreaTool.end[0];//annotations[i].childNodes[1].getAttributeNS(null, "x2")
			var y2 = AnnotatedByAreaTool.end[1];//annotations[i].childNodes[1].getAttributeNS(null, "y2")
			var tmat = t.translate(1*x2, 1*y2).rotate(-Panel.rotation).translate(-1*x2, -1*y2);
			label[0][0].setAttributeNS(null, "transform", "matrix("+ tmat.a+","+ tmat.b+","+ tmat.c+","+ tmat.d+","+ tmat.e+","+ tmat.f+")");

			var textbox = label.append("rect").attr("x", AnnotatedByAreaTool.end[0])
							.attr("y", AnnotatedByAreaTool.end[1])
							.attr("id", numAnno - 1)
							.attr("class", "annotation-textbox")
							.attr("width", AnnotatedByAreaTool.boxWidth)
							.attr("height", AnnotatedByAreaTool.boxHeight)
							.attr("style", "fill: white; opacity: 0.5; stroke: black; stroke-width: 1px; cursor:text")
							.attr("pointer-events", "visiblePainted")
								.on("mousedown", function(){
									
									var id = parseInt(this.getAttributeNS(null, "id"));
									var newText = window.prompt("Please enter the text you want to annotate",
										this.parentNode.childNodes[5].innerHTML);
									 //d3.select(d3.selectAll(".annotation-textbox")[0][id].parentNode).select("text")[0][0].innerHTML );
									AnnotatedByAreaTool.noProp = 1;
									if (newText != null && newText != "") {
										var str = newText;
										var str2 = newText;
										if (newText.length > 7){
											str = newText.substr(0, 6) + "...";
											var sample = panelview.append("text").text(newText)
															.attr("display", "hidden");
											//var sample = VisDock.svg.append("text").text(newText)
											//				.attr("display", "hidden");															
											var w = sample[0][0].getComputedTextLength() + 5;
											sample.remove();
											if (w > AnnotatedByPointTool.boxWidth){
												d3.selectAll(".annotation-textbox")[0][id].setAttributeNS(null, "width", w);
											}											
										} 
										/*if (newText.length > 20) {
											var sample = VisDock.svg.append("text").text(newText)
															.attr("display", "hidden")
											var w = sample[0][0].getComputedTextLength() + 5
											QueryManager.annoWidth[id] = w;
											d3.selectAll(".annotation-textbox")[0][id].setAttributeNS(null, "width", w)
											sample.remove();
										} else {
											d3.selectAll(".annotation-textbox")[0][id].setAttributeNS(null, "width", AnnotatedByPointTool.boxWidth)
										}*/
							
										QueryManager.annoText[parseInt(this.getAttributeNS(null, "id"))] = newText;
										this.parentNode.childNodes[5].innerHTML = str2;
										//d3.select(d3.selectAll(".annotation-textbox")[0][id].parentNode).select("text")[0][0].innerHTML = str2;
										QueryManager.names2[parseInt(this.getAttributeNS(null, "id"))].text(str);
									}
							})	
							.on("mousemove", function(){
								AnnotatedByAreaTool.noProp = 1;
							})							
							.on("mouseout", function(){
								AnnotatedByAreaTool.noProp = 0;
							});
			var hover = label.append("rect").attr("x", AnnotatedByAreaTool.end[0])	
						.attr("y", AnnotatedByAreaTool.end[1])
						.attr("width", AnnotatedByAreaTool.boxWidth/10)
						.attr("height", AnnotatedByAreaTool.boxHeight/2)	
						.attr("pointer-events", "visiblePainted")
						.attr("style", "fill: blue; opacity: 0.5; stroke: black; stroke-width: 1px; cursor: pointer")
						.on("mousedown", function(){
							AnnotatedByAreaTool.noProp = 1;
						})	
						.on("mousemove", function(){
							AnnotatedByAreaTool.noProp = 1;
						})							
						.on("mouseout", function(){
							AnnotatedByAreaTool.noProp = 0;
						});
			var exit = label.append("rect").attr("x", AnnotatedByAreaTool.end[0])
						.attr("id", "exit")	
						.attr("y", AnnotatedByAreaTool.end[1] + AnnotatedByAreaTool.boxHeight/2)
						.attr("width", AnnotatedByAreaTool.boxWidth/10)
						.attr("height", AnnotatedByAreaTool.boxHeight/2)	
						.attr("pointer-events", "visiblePainted")
						.attr("style", "fill: red; opacity: 0.5; stroke: black; stroke-width: 1px; cursor: pointer")
						.attr("class", numAnno - 1)
						.on("mousedown", function(){
							//AnnotatedByPointTool.noProp = 1;
							d3.event.stopPropagation();
							//Panel.panel.on("mouseup", null);
							mainpanel.on("mouseup", null);
							var index = this.getAttributeNS(null, "class");
							QueryManager.removeAnnotation(index, "byPoint");
							//annotation.remove();
							QueryManager.annotation[index].remove();							
						})	
						.on("mousemove", function(){
							AnnotatedByAreaTool.noProp = 1;
						})							
						.on("mouseout", function(){
							AnnotatedByAreaTool.noProp = 0;
						});
			var exit_1 = label.append("line").attr("x1", AnnotatedByAreaTool.end[0]).attr("id", "exit_1")
							.attr("x2", AnnotatedByAreaTool.end[0] + AnnotatedByAreaTool.boxWidth/10)
							.attr("y1", AnnotatedByAreaTool.end[1] + AnnotatedByAreaTool.boxHeight)	
							.attr("y2", AnnotatedByAreaTool.end[1] + AnnotatedByAreaTool.boxHeight/2)	
							.attr("class", numAnno - 1)
							.attr("style", "stroke-width: 1px; stroke: black; cursor: pointer")			
							.on("mousedown", function(){
								d3.event.stopPropagation();
								mainpanel.on("mouseup", null);
								//Panel.panel.on("mouseup", null);
								//annotation.remove();
								var index = this.getAttributeNS(null, "class");
								QueryManager.removeAnnotation(index, "byPoint");
								QueryManager.annotation[index].remove();								
							});		
			var exit_2 = label.append("line").attr("x1", AnnotatedByAreaTool.end[0]).attr("id", "exit_2")
							.attr("x2", AnnotatedByAreaTool.end[0] + AnnotatedByAreaTool.boxWidth/10)
							.attr("y2", AnnotatedByAreaTool.end[1] + AnnotatedByAreaTool.boxHeight)	
							.attr("y1", AnnotatedByAreaTool.end[1] + AnnotatedByAreaTool.boxHeight/2)	
							.attr("style", "stroke-width: 1px; stroke: black; cursor: pointer")		
							.attr("class", numAnno - 1)
							.on("mousedown", function(){
								d3.event.stopPropagation();
								mainpanel.on("mouseup", null);
								//Panel.panel.on("mouseup", null);
								var index = this.getAttributeNS(null, "class");
								QueryManager.removeAnnotation(index, "byPoint");
								//annotation.remove();
								QueryManager.annotation[index].remove();								
							});
													
			//var foreignObject = label.append("foreignObject").attr("x", AnnotatedByAreaTool.end[0]).attr("y", AnnotatedByAreaTool.end[1]).attr("width", "120px").attr("height", "45px")
			//.attr("transform","translate("+(-Panel.x)+","+(-Panel.y)+")");
			//var div = foreignObject.append("xhtml:div").text("label" + numAnno)

			//var divWidth = div.style("width");
			//var divHeight = div.style("height");
			//var span = div.append("xhtml:span").attr("class", "close-btn");
			//span.append("xhtml:a").attr("href", "#").text("x");
			//var index = QueryManager.addAnnotation("red", 1, "label " + numAnno);
			//label.attr("class", index);

			//span.on("mousedown", function() {
			//	d3.event.stopPropagation();
			//	Panel.panel.on("mouseup", null);
			//	annotation.remove();
			//	QueryManager.annotation[index].remove();
			//	AnnotatedByAreaTool.blasso.remove();
			//	AnnotatedByAreaTool.strpoints = "";
			//	AnnotatedByAreaTool.points = [];
			//});
			
			/*label.on("mousedown", function() {
				d3.event.stopPropagation();
				var firstPlace, secondPlace;
				firstPlace = d3.mouse(this);
				label.on("mousemove", function() {
					secondPlace = d3.mouse(this);
					if (Math.abs(secondPlace[0] - firstPlace[0]) > 10 || Math.abs(secondPlace[1] - firstPlace[1]) > 10) {
						if (div.style("width") != divWidth || div.style("height") != divHeight) {
							foreignObject.attr("width", parseInt(div.style("width")) + 20);
							foreignObject.attr("height", parseInt(div.style("height")) + 15);
							span.style("left", (parseInt(div.style("width")) - 40) + "px");
							divWidth = div.style("width");
							divHeight = div.style("height");
							if (annotation.select("line").attr("x2") < AnnotatedByAreaTool.pointStart[0] && annotation.select("line").attr("y2") < AnnotatedByAreaTool.pointStart[1]) {
								annotation.select("line").attr("x2", parseInt(foreignObject.attr("x")) + parseInt(divWidth) + 12);
								//	.attr("y2", d3.mouse(this)[1]);
							}
							AnnotatedByAreaTool.isResize = true;
						} else {
							AnnotatedByAreaTool.isDrag = true;
							//drag
							if (d3.mouse(this)[0] < AnnotatedByAreaTool.pointStart[0] && d3.mouse(this)[1] < AnnotatedByAreaTool.pointStart[1]) {
								annotation.select("line").attr("x2", d3.mouse(this)[0]).attr("y2", d3.mouse(this)[1]);
								label.select("foreignObject").attr("x", d3.mouse(this)[0] - parseInt(foreignObject.attr("width"))).attr("y", d3.mouse(this)[1]);
							} else {
								annotation.select("line").attr("x2", d3.mouse(this)[0]).attr("y2", d3.mouse(this)[1]);
								label.select("foreignObject").attr("x", d3.mouse(this)[0]).attr("y", d3.mouse(this)[1]);
							}
						}
					}
				});
				label.on("mouseup", function() {
					d3.event.stopPropagation();
					if (AnnotatedByAreaTool.isDrag != true && AnnotatedByAreaTool.isResize != true)//just click
					{
						var newText = window.prompt("Please enter the text you want to annotate");
						if (newText != null && newText != "") {
							div.text(newText);
							QueryManager.names[parseInt(this.getAttributeNS(null, "class"))].text(newText);
							span = div.append("xhtml:span").attr("class", "close-btn").attr("id", this.getAttributeNS(null, "class"));
							span.append("xhtml:a").attr("href", "#").text("x");
							span.style("left", (parseInt(div.style("width")) - 40) + "px");
							span.on("mousedown", function() {
								d3.event.stopPropagation();
								Panel.panel.on("mouseup", null);
								annotation.remove();
								QueryManager.annotation[parseInt(this.getAttributeNS(null, "id"))].remove();
								AnnotatedByAreaTool.blasso.remove();
								AnnotatedByAreaTool.strpoints = "";
								AnnotatedByAreaTool.points = [];
							});
						}
					}
					label.on("mousemove", null);

				});
				AnnotatedByAreaTool.isDrag = false;
				AnnotatedByAreaTool.isResize = false;
			});*/
			
			var textContent = label.append("text").attr("x", 5 + AnnotatedByAreaTool.end[0] + AnnotatedByAreaTool.boxWidth/10)
								.attr("y", AnnotatedByAreaTool.end[1] + AnnotatedByAreaTool.boxHeight*2/3)
								.attr("id", numAnno - 1)
								.text("Label " + numAnno.toString())
								.attr("style", "font-size: 12px")
								.attr("class", numAnno - 1)
								.on("mousedown", function(){
																		
									var id = parseInt(this.getAttributeNS(null, "id"));
									
									var newText = window.prompt("Please enter the text you want to annotate",
										this.innerHTML);
									AnnotatedByAreaTool.noProp = 1;
									if (newText != null && newText != "") {
										var str = newText;
										var str2 = newText;
										if (newText.length > 7){
											str = newText.substr(0, 6) + "...";
											var sample = panelview.append("text").text(newText)
															.attr("display", "hidden");
											//var sample = VisDock.svg.append("text").text(newText)
											//				.attr("display", "hidden");															
											var w = sample[0][0].getComputedTextLength() + 5;
											sample.remove();
											if (w > AnnotatedByAreaTool.boxWidth) {
												d3.selectAll(".annotation-textbox")[0][id].setAttributeNS(null, "width", w);
											}											
										} 
										/*if (newText.length > 20) {
											var sample = VisDock.svg.append("text").text(newText)
															.attr("display", "hidden")
											var w = sample[0][0].getComputedTextLength() + 5
											QueryManager.annoWidth[id] = w;
											d3.selectAll(".annotation-textbox")[0][id].setAttributeNS(null, "width", w)
											sample.remove();
										} else {
											d3.selectAll(".annotation-textbox")[0][id].setAttributeNS(null, "width", AnnotatedByPointTool.boxWidth)
										}*/
										
										//if (newText.length > 20){
											//str = newText.substr(0, 6) + "..."
										//	str2 = newText.substr(0, 20)
										//	for (var u = 1; u < Math.ceil(newText.length / 20); u++){
												//var sample = document.createElementNS("http://www.w3.org/2000/svg", "text")
												/*d3.select(this.parentNode).append("text")
													.attr("x", 5 + AnnotatedByPointTool.end[0] + AnnotatedByPointTool.boxWidth/10)
													.attr("y", 12 + AnnotatedByPointTool.end[1] + AnnotatedByPointTool.boxHeight*2/3)*/
												/*VisDock.svg[0][0].appendChild(sample)
												 * 
												 */
										//		var sample = VisDock.svg.append("text").text(newText.substr((u - 1) * 20, 20))
										//						.attr("display", "hidden")
												/*var textNode = document.createTextNode(newText.substr((u) * 20, 20));
												sample.appendChild(textNode);
												sample.setAttributeNS(null, "hidden", "none")
												sample.setAttributeNS(null, "style", "font-size:12px; font-family: Verdana, sans-serif;")*/
												//sample.textContent()
										//		var w = sample[0][0].getComputedTextLength();
										//		str2 = str2 + "<tspan dy = 12, dx = -" + w + ">" + newText.substr(u * 20, 20) +
										//				 "</tspan>"
										//		sample.remove()
						 				//	}
										//	sample.remove();						 					
						 				//	var d;
										//}										
										QueryManager.annoText[parseInt(this.getAttributeNS(null, "id"))] = newText;
										//this.textContent = str2;
										this.innerHTML = str2;
										QueryManager.names2[parseInt(this.getAttributeNS(null, "id"))].text(str);
									}
						//span = div.append("xhtml:span").attr("class", "close-btn").attr("id", this.getAttributeNS(null, "class"));
						//span.append("xhtml:a").attr("href", "#").text("x");
						//span.style("left", (parseInt(div.style("width")) - 40) + "px");
						//span.on("mousedown", function() {
							//d3.event.stopPropagation();
							//Panel.panel.on("mouseup", null);
							//annotation.remove();
							//QueryManager.annotation[parseInt(this.getAttributeNS(null, "id"))].remove();
						//});
					//}
								})				
								.on("mousemove", function(){
									AnnotatedByAreaTool.noProp = 1;
								})
								.on("mouseout", function(){
									AnnotatedByAreaTool.noProp = 0;
								});			

			AnnotatedByAreaTool.points[AnnotatedByAreaTool.segments] = AnnotatedByAreaTool.points[0];
			AnnotatedByAreaTool.dragging = false;
			AnnotatedByAreaTool.segments = 0;

			var index = QueryManager.addAnnotation("red", 1, "Label " + numAnno);
			label.attr("id", index);


			//annotation.append("circle").attr("cx", AnnotatedByAreaTool.pointStart[0])
				//.attr("cy", AnnotatedByAreaTool.pointStart[1])
				//.attr("class", "annotation-circle").attr("r", 2)
				//.attr("fill", "red").attr("opacity", 0.8)
			annotation.append("circle").attr("cx", AnnotatedByAreaTool.pointStart[0])
					.attr("cy", AnnotatedByAreaTool.pointStart[1])
					.attr("pointer-events", "visiblePainted")
					.attr("r", 5).attr("class", "annotation-dot")
					.attr("style", "fill: black; cursor: pointer")
					.on("mousedown", function(){
						AnnotatedByAreaTool.noProp = 1;
						AnnotatedByAreaTool.isMobile = 1;
						AnnotatedByAreaTool.isDrag = 0;
						var TMat = this.getCTM().inverse();
						var tpoints = [];
						var tpoints2 = [];
						var tpoints3 = [];
						
						//tpoints[0] = (firstPlace[0]+0*Panel.x) * TMat.a + (firstPlace[1]+0*Panel.y) * TMat.c + TMat.e;
						//tpoints[1] = (firstPlace[0]+0*Panel.x) * TMat.b + (firstPlace[1]+0*Panel.y) * TMat.d + TMat.f;
						
						panelview.on("mousemove", function(){
						//VisDock.svg.on("mousemove", function(){
						if (AnnotatedByAreaTool.isMobile){
							VisDock.startChrome();
							//secondPlace = d3.mouse(VisDock.svg[0][0]);
							secondPlace = d3.mouse(panelview[0][0]);
							tpoints2[0] = (secondPlace[0]+0*Panel.x) * TMat.a + (secondPlace[1]+0*Panel.y) * TMat.c + TMat.e;
							tpoints2[1] = (secondPlace[0]+0*Panel.x) * TMat.b + (secondPlace[1]+0*Panel.y) * TMat.d + TMat.f; 
					
							var T = label[0][0].getAttributeNS(null, "transform").split(",");
							var Ta = T[0].split("(")[1];
							Ta = parseFloat(Ta);
							var Tb = parseFloat(T[1]);
							var Tc = parseFloat(T[2]);
							var Td = parseFloat(T[3]);
							var Te = parseFloat(T[4]);
							var Tf = T[5].split(")")[0];
							Tf = parseFloat(Tf);
							//var T = label[0][0].getCTM().inverse();
							tpoints3[0] = (tpoints2[0]+0*Panel.x) * Ta + (tpoints2[1]+0*Panel.y) * Tc + Te;
							tpoints3[1] = (tpoints2[0]+0*Panel.x) * Tb + (tpoints2[1]+0*Panel.y) * Td + Tf;
							
							/*tpoints3[0] = (tpoints2[0]+0*Panel.x) * T.a + (tpoints2[1]+0*Panel.y) * T.c + T.e;
							tpoints3[1] = (tpoints2[0]+0*Panel.x) * T.b + (tpoints2[1]+0*Panel.y) * T.d + T.f;*/

							var index = annotation[0][0].childNodes[1].getAttributeNS(null, "id");
							var x2 = annotation.select(".annotation-line").attr("x2");
							var y2 = annotation.select(".annotation-line").attr("y2");
							AnnotatedByData.distances[index] = [x2 - tpoints2[0], tpoints2[1] - y2];
																	
							annotation.select(".annotation-line").attr("x1", tpoints2[0])//secondPlace[0])
								.attr("y1", tpoints2[1]);
							annotation.select(".annotation-dot").attr("cx", tpoints2[0])
								.attr("cy", tpoints2[1]);
					/*annotation.selectAll("rect").attr("x", tpoints2[0])//secondPlace[0])
						.attr("y", tpoints2[1])
					annotation.selectAll("text").attr("x", 5 + tpoints2[0] + AnnotatedByPointTool.boxWidth/10)
						.attr("y", tpoints2[1] + AnnotatedByPointTool.boxHeight*2/3)
						
					annotation.select("#exit").attr("x", tpoints2[0]) // Exit Button
						.attr("y", tpoints2[1] + AnnotatedByPointTool.boxHeight/2)
					annotation.select("#exit_1").attr("x1", tpoints2[0]) // Exit X_1
						.attr("x2", tpoints2[0] + AnnotatedByPointTool.boxWidth/10)
						.attr("y1", tpoints2[1] + AnnotatedByPointTool.boxHeight)
						.attr("y2", tpoints2[1] + AnnotatedByPointTool.boxHeight/2)	
					annotation.select("#exit_2").attr("x1", tpoints2[0]) // Exit X_2
						.attr("x2", tpoints2[0] + AnnotatedByPointTool.boxWidth/10)
						.attr("y1", tpoints2[1] + AnnotatedByPointTool.boxHeight/2)
						.attr("y2", tpoints2[1] + AnnotatedByPointTool.boxHeight)*/										
						}
						VisDock.finishChrome();
					});	
					panelview.on("mouseup", function(){
					//VisDock.svg.on("mouseup", function(){						
						AnnotatedByAreaTool.isMobile = false;
						//AnnotatedByAreaTool.noProp = 0;
					});						 						
					})	
					.on("mousemove", function(){
						AnnotatedByAreaTool.noProp = 1;
					})							
					.on("mouseout", function(){
						AnnotatedByAreaTool.noProp = 0;
					});
					
			QueryManager.annoText[numAnno - 1] = "Label " + numAnno.toString();		
			QueryManager.annoWidth[numAnno - 1] = AnnotatedByAreaTool.boxWidth;
			QueryManager.annoHeight[numAnno - 1] = AnnotatedByAreaTool.boxHeight;
			
			hover.on("mousedown", function(){
				d3.event.stopPropagation();
				var firstPlace, secondPlace;
				AnnotatedByAreaTool.noProp = 1;
				AnnotatedByAreaTool.isMobile = true;
				//AnnotatedByAreaTool.isDrag = true;
				//firstPlace = d3.mouse(VisDock.svg[0][0]);	
				firstPlace = d3.mouse(panelview[0][0]);	
	
				var TMat = this.getCTM().inverse();
	
				var tpoints = [];
				var tpoints2 = [];
				var tpoints3 = [];
				tpoints[0] = (firstPlace[0]+0*Panel.x) * TMat.a + (firstPlace[1]+0*Panel.y) * TMat.c + TMat.e;
				tpoints[1] = (firstPlace[0]+0*Panel.x) * TMat.b + (firstPlace[1]+0*Panel.y) * TMat.d + TMat.f; 
				//strpoints = [strpoints + (tpoints[0]) + "," + (tpoints[1]) + " "]
					
				//VisDock.svg.on("mousemove", function(){
				panelview.on("mousemove", function(){					
					if (AnnotatedByAreaTool.isMobile){
	
						// Disable BirdView for Chrome
						VisDock.startChrome();
											
						var secondPlace = d3.mouse(panelview[0][0]);
						//var secondPlace = d3.mouse(VisDock.svg[0][0]);
						tpoints2[0] = (secondPlace[0]+0*Panel.x) * TMat.a + (secondPlace[1]+0*Panel.y) * TMat.c + TMat.e;
						tpoints2[1] = (secondPlace[0]+0*Panel.x) * TMat.b + (secondPlace[1]+0*Panel.y) * TMat.d + TMat.f; 
						
						var T = label[0][0].getAttributeNS(null, "transform").split(",");
						var Ta = T[0].split("(")[1];
						Ta = parseFloat(Ta);
						var Tb = parseFloat(T[1]);
						var Tc = parseFloat(T[2]);
						var Td = parseFloat(T[3]);
						var Te = parseFloat(T[4]);
						var Tf = T[5].split(")")[0];
						Tf = parseFloat(Tf);
						tpoints3[0] = (tpoints2[0]+0*Panel.x) * Ta + (tpoints2[1]+0*Panel.y) * Tc + Te;
						tpoints3[1] = (tpoints2[0]+0*Panel.x) * Tb + (tpoints2[1]+0*Panel.y) * Td + Tf; 
											
						annotation.select(".annotation-line").attr("x2", tpoints3[0])//secondPlace[0])
							.attr("y2", tpoints3[1]);
						annotation.selectAll("rect").attr("x", tpoints2[0])//secondPlace[0])
							.attr("y", tpoints2[1]);
						annotation.selectAll("text").attr("x", 5 + tpoints2[0] + AnnotatedByAreaTool.boxWidth/10)
							.attr("y", tpoints2[1] + AnnotatedByAreaTool.boxHeight*2/3);
							
						annotation.select("#exit").attr("x", tpoints2[0]) // Exit Button
							.attr("y", tpoints2[1] + AnnotatedByAreaTool.boxHeight/2);
					
						annotation.select("#exit_1").attr("x1", tpoints2[0]) // Exit X_1
							.attr("x2", tpoints2[0] + AnnotatedByAreaTool.boxWidth/10)
								.attr("y1", tpoints2[1] + AnnotatedByAreaTool.boxHeight)
							.attr("y2", tpoints2[1] + AnnotatedByAreaTool.boxHeight/2);	
						annotation.select("#exit_2").attr("x1", tpoints2[0]) // Exit X_2
							.attr("x2", tpoints2[0] + AnnotatedByAreaTool.boxWidth/10)
							.attr("y1", tpoints2[1] + AnnotatedByAreaTool.boxHeight/2)
							.attr("y2", tpoints2[1] + AnnotatedByAreaTool.boxHeight);	
					
					// Enable BirdView for Chrome	
						VisDock.finishChrome();						
															
					}
				});	
				panelview.on("mouseup", function(){
				//VisDock.svg.on("mouseup", function(){					
					AnnotatedByAreaTool.isMobile = false;
					//AnnotatedByAreaTool.noProp = 0;
				});
			});	
			VisDock.finishChrome();
			// Forward the selection
			//  	Toolbox.select("Lasso", LassoTool.points, true);

			// Remove the bounding box
			//	AnnotatedByAreaTool.blasso.remove();
			//	AnnotatedByAreaTool.blasso = null;
			//	AnnotatedByAreaTool.strpoints = "";  //if we need to set it null
			//	AnnotatedByAreaTool.points = [];
			});

		// Install event handlers

	
		
	},

	changeColor : function(color, index) {
		annotationArray[index][0].select("circle").attr("fill", color);
		annotationArray[index][0].select("line").style("stroke", color);
		annotationArray[index][0].select("div").style("color", color);
		//	AnnotatedByAreaTool.blasso.style("fill", color);
	},
	changeLabel : function(newname, index) {
		annotationArray[index][0].select("div").text(newname);
		var span = annotationArray[index][0].select("div").append("xhtml:span").attr("class", "close-btn").attr("id", index);
		span.append("xhtml:a").attr("href", "#").text("x");
		span.style("left", (parseInt(annotationArray[index][0].select("div").style("width")) - 40) + "px");
		span.on("mousedown", function() {
			d3.event.stopPropagation();
			Panel.panel.on("mouseup", null);
			annotationArray[index][0].remove();
			AnnotatedByAreaTool.blasso.remove();
			AnnotatedByAreaTool.strpoints = "";
			//if we need to set it null
			AnnotatedByAreaTool.points = [];
			QueryManager.annotation[index].remove();
		});
	},

	removeLabel : function(index) {
		annotationArray[index][0].remove();
		AnnotatedByAreaTool.blasso.remove();
		AnnotatedByAreaTool.strpoints = "";
		//if we need to set it null
		AnnotatedByAreaTool.points = [];
	}
};

/*
var AnnotatedByAreaTool = {
	name : "AbyArea",
	image : "images/AnA.png",
	start : 0,
	segments : 0,
	dragging : 0,
	points : [],
	blasso : [],
	areaarray : [],
	count : 0,
	strpoints : [],
	pointStart : [],
	end : [],
	isDrag : false,
	isResize : false,
	index : 0,

	select : function() {
		console.log("select: " + AnnotatedByAreaTool.name);
		Toolbox.setTool(AnnotatedByAreaTool);
	},

	install : function() {
		//VisDock.eventHandler = true;
		VisDock.startChrome();		
		Panel.viewport.selectAll("*").attr("pointer-events", "none");
		Panel.annotation.selectAll("*").attr("pointer-events", "visiblePainted");
		Panel.panel.on("mousedown", AnnotatedByAreaTool.mousedown);
		VisDock.finishChrome();
	
	},

	uninstall : function() {
		//VisDock.eventHandler = null;
		VisDock.startChrome();		
		Panel.panel.on("mousedown", null);
		Panel.panel.on("mousemove", null);
		Panel.panel.on("mouseup", null);
		Panel.viewport.selectAll("*").attr("pointer-events", "visiblePainted");
		Panel.annotation.selectAll("*").attr("pointer-events", "none");
		VisDock.finishChrome();

	},

	getPoints : function() {
		var str = [];

		for (var i = 0; i < AnnotatedByAreaTool.segments; i++) {
			if (i != AnnotatedByAreaTool.segments - 1) {
				str = [str + AnnotatedByAreaTool.points[i][0] + "," + AnnotatedByAreaTool.points[i][1] + " "];
			} else {
				str = [str + AnnotatedByAreaTool.points[i][0] + "," + AnnotatedByAreaTool.points[i][1] + " "];
			}
		}
		str = [str + AnnotatedByAreaTool.points[0][0] + "," + AnnotatedByAreaTool.points[0][1]];
		AnnotatedByAreaTool.strpoints = str;
		return str;
	},

	AnnotatedByAreaToolUpdate : function(curr) {
		AnnotatedByAreaTool.points[AnnotatedByAreaTool.segments] = curr;
		//[curr[0], curr[1]];
	},

	mousedown : function() {
		// Prevent Browser's default behaviour
		d3.event.preventDefault();
		// Store starting point
		var N = AnnotatedByAreaTool.blasso.length;
		AnnotatedByAreaTool.start = d3.mouse(this);

		if (AnnotatedByAreaTool.dragging == false) {
			AnnotatedByAreaTool.dragging = true;
			AnnotatedByAreaTool.AnnotatedByAreaToolUpdate(d3.mouse(this));
			AnnotatedByAreaTool.segments += 1;
			var points = AnnotatedByAreaTool.getPoints();
			if (AnnotatedByAreaTool.segments == 1) {
				AnnotatedByAreaTool.blasso[N] = Panel.viewport.append("polygon")//Panel.panel.append("polygon")
				.attr("id", "selection").attr("points", points).attr("class", "selection").attr("transform", "translate(" + (-Panel.x) + "," + (-Panel.y) + ")");
			} else {
				AnnotatedByAreaTool.blasso[N].attr("points", points);
			}
		}

		Panel.panel.on("mouseup", function() {

			// Update Segment number
			AnnotatedByAreaTool.AnnotatedByAreaToolUpdate(d3.mouse(this));
			AnnotatedByAreaTool.segments += 1;
			var points = AnnotatedByAreaTool.getPoints();
			AnnotatedByAreaTool.blasso[N].attr("points", points);

			var maxLeft = 0, maxRight = 0, maxUp = 0, maxBottom = 0;
			for (var i = 0; i < AnnotatedByAreaTool.segments; i++) {
				if (i == 0) {
					maxLeft = maxRight = AnnotatedByAreaTool.points[0][0];
					maxUp = maxBottom = AnnotatedByAreaTool.points[0][1];
				} else {
					if (AnnotatedByAreaTool.points[i][0] < maxLeft)
						maxLeft = AnnotatedByAreaTool.points[i][0];
					if (AnnotatedByAreaTool.points[i][0] > maxRight)
						maxRight = AnnotatedByAreaTool.points[i][0];
					if (AnnotatedByAreaTool.points[i][1] < maxUp)
						maxUp = AnnotatedByAreaTool.points[i][1];
					if (AnnotatedByAreaTool.points[i][1] > maxBottom)
						maxBottom = AnnotatedByAreaTool.points[i][1];
				}
			}
			AnnotatedByAreaTool.pointStart[0] = (maxLeft + maxRight) / 2;
			AnnotatedByAreaTool.pointStart[1] = (maxUp + maxBottom) / 2;
			AnnotatedByAreaTool.end[0] = AnnotatedByAreaTool.pointStart[0] + 50;
			AnnotatedByAreaTool.end[1] = AnnotatedByAreaTool.pointStart[1] - 50;

			var annotation = Panel.viewport.append("g");
			annotationArray[numAnno] = [];
			annotationArray[numAnno][0] = annotation;
			annotationArray[numAnno][1] = 1;

			AnnotatedByAreaTool.areaarray.push(numAnno)
			//alert(AnnotatedByAreaTool.areaarray)
			numAnno++;
			annotation.append("circle").attr("cx", AnnotatedByAreaTool.pointStart[0]).attr("cy", AnnotatedByAreaTool.pointStart[1]).attr("class", "annotation-circle").attr("r", 2).attr("fill", "red").attr("opacity", 0.8).attr("transform", "translate(" + (-Panel.x) + "," + (-Panel.y) + ")");
			annotation.append("line").attr("x1", AnnotatedByAreaTool.pointStart[0]).attr("y1", AnnotatedByAreaTool.pointStart[1]).attr("x2", AnnotatedByAreaTool.end[0]).attr("y2", AnnotatedByAreaTool.end[1]).attr("class", "annotation-line").attr("transform", "translate(" + (-Panel.x) + "," + (-Panel.y) + ")")

			var label = annotation.append("g").attr("pointer-events", "visiblePainted").attr("transform", "translate(" + (-Panel.x) + "," + (-Panel.y) + ")");

			var foreignObject = label.append("foreignObject").attr("x", AnnotatedByAreaTool.end[0]).attr("y", AnnotatedByAreaTool.end[1]).attr("width", "120px").attr("height", "45px")
			//.attr("transform","translate("+(-Panel.x)+","+(-Panel.y)+")");
			var div = foreignObject.append("xhtml:div").text("label" + numAnno)

			var divWidth = div.style("width");
			var divHeight = div.style("height");
			var span = div.append("xhtml:span").attr("class", "close-btn");
			span.append("xhtml:a").attr("href", "#").text("x");
			var index = QueryManager.addAnnotation("red", 1, "label " + numAnno);
			label.attr("class", index);

			span.on("mousedown", function() {
				d3.event.stopPropagation();
				Panel.panel.on("mouseup", null);
				annotation.remove();
				QueryManager.annotation[index].remove();
				AnnotatedByAreaTool.blasso.remove();
				AnnotatedByAreaTool.strpoints = "";
				AnnotatedByAreaTool.points = [];
			});

			label.on("mousedown", function() {
				d3.event.stopPropagation();
				var firstPlace, secondPlace;
				firstPlace = d3.mouse(this);
				label.on("mousemove", function() {
					secondPlace = d3.mouse(this);
					if (Math.abs(secondPlace[0] - firstPlace[0]) > 10 || Math.abs(secondPlace[1] - firstPlace[1]) > 10) {
						if (div.style("width") != divWidth || div.style("height") != divHeight) {
							foreignObject.attr("width", parseInt(div.style("width")) + 20);
							foreignObject.attr("height", parseInt(div.style("height")) + 15);
							span.style("left", (parseInt(div.style("width")) - 40) + "px");
							divWidth = div.style("width");
							divHeight = div.style("height");
							if (annotation.select("line").attr("x2") < AnnotatedByAreaTool.pointStart[0] && annotation.select("line").attr("y2") < AnnotatedByAreaTool.pointStart[1]) {
								annotation.select("line").attr("x2", parseInt(foreignObject.attr("x")) + parseInt(divWidth) + 12);
								//	.attr("y2", d3.mouse(this)[1]);
							}
							AnnotatedByAreaTool.isResize = true;
						} else {
							AnnotatedByAreaTool.isDrag = true;
							//drag
							if (d3.mouse(this)[0] < AnnotatedByAreaTool.pointStart[0] && d3.mouse(this)[1] < AnnotatedByAreaTool.pointStart[1]) {
								annotation.select("line").attr("x2", d3.mouse(this)[0]).attr("y2", d3.mouse(this)[1]);
								label.select("foreignObject").attr("x", d3.mouse(this)[0] - parseInt(foreignObject.attr("width"))).attr("y", d3.mouse(this)[1]);
							} else {
								annotation.select("line").attr("x2", d3.mouse(this)[0]).attr("y2", d3.mouse(this)[1]);
								label.select("foreignObject").attr("x", d3.mouse(this)[0]).attr("y", d3.mouse(this)[1]);
							}
						}
					}
				});
				label.on("mouseup", function() {
					d3.event.stopPropagation();
					if (AnnotatedByAreaTool.isDrag != true && AnnotatedByAreaTool.isResize != true)//just click
					{
						var newText = window.prompt("Please enter the text you want to annotate");
						if (newText != null && newText != "") {
							div.text(newText);
							QueryManager.names[parseInt(this.getAttributeNS(null, "class"))].text(newText);
							span = div.append("xhtml:span").attr("class", "close-btn").attr("id", this.getAttributeNS(null, "class"));
							span.append("xhtml:a").attr("href", "#").text("x");
							span.style("left", (parseInt(div.style("width")) - 40) + "px");
							span.on("mousedown", function() {
								d3.event.stopPropagation();
								Panel.panel.on("mouseup", null);
								annotation.remove();
								QueryManager.annotation[parseInt(this.getAttributeNS(null, "id"))].remove();
								AnnotatedByAreaTool.blasso.remove();
								AnnotatedByAreaTool.strpoints = "";
								AnnotatedByAreaTool.points = [];
							});
						}
					}
					label.on("mousemove", null);

				});
				AnnotatedByAreaTool.isDrag = false;
				AnnotatedByAreaTool.isResize = false;
			});

			AnnotatedByAreaTool.points[AnnotatedByAreaTool.segments] = AnnotatedByAreaTool.points[0];
			AnnotatedByAreaTool.dragging = false;
			AnnotatedByAreaTool.segments = 0;

			// Forward the selection
			//  	Toolbox.select("Lasso", LassoTool.points, true);

			// Remove the bounding box
			//	AnnotatedByAreaTool.blasso.remove();
			//	AnnotatedByAreaTool.blasso = null;
			//	AnnotatedByAreaTool.strpoints = "";  //if we need to set it null
			//	AnnotatedByAreaTool.points = [];
		});

		// Install event handlers
		Panel.panel.on("mousemove", function() {
			if (AnnotatedByAreaTool.dragging) {
				// Update the selection
				AnnotatedByAreaTool.AnnotatedByAreaToolUpdate(d3.mouse(this));
				AnnotatedByAreaTool.segments += 1;
				var points = AnnotatedByAreaTool.getPoints();
				AnnotatedByAreaTool.blasso[N].attr("points", points)
			}
		});
	},

	changeColor : function(color, index) {
		annotationArray[index][0].select("circle").attr("fill", color);
		annotationArray[index][0].select("line").style("stroke", color);
		annotationArray[index][0].select("div").style("color", color);
		//	AnnotatedByAreaTool.blasso.style("fill", color);
	},
	changeLabel : function(newname, index) {
		annotationArray[index][0].select("div").text(newname);
		var span = annotationArray[index][0].select("div").append("xhtml:span").attr("class", "close-btn").attr("id", index);
		span.append("xhtml:a").attr("href", "#").text("x");
		span.style("left", (parseInt(annotationArray[index][0].select("div").style("width")) - 40) + "px");
		span.on("mousedown", function() {
			d3.event.stopPropagation();
			Panel.panel.on("mouseup", null);
			annotationArray[index][0].remove();
			AnnotatedByAreaTool.blasso.remove();
			AnnotatedByAreaTool.strpoints = "";
			//if we need to set it null
			AnnotatedByAreaTool.points = [];
			QueryManager.annotation[index].remove();
		});
	},

	removeLabel : function(index) {
		annotationArray[index][0].remove();
		AnnotatedByAreaTool.blasso.remove();
		AnnotatedByAreaTool.strpoints = "";
		//if we need to set it null
		AnnotatedByAreaTool.points = [];
	}
};*/

/*var AnnotatedByData = {
	name : "AByData",
	image : "images/AnnArea.png",
	select : function() {
		console.log("select: " + AnnotatedByData.name);
		Toolbox.setTool(AnnotatedByData);
	},
	install : function() {
		Panel.annotation.selectAll("rect").attr("pointer-events", "visiblePainted")
		// do nothing
	},
	uninstall : function() {
		// do nothing
		
	}	
};*/

var AnnotatedByData = {
	name : "AbyData",
	image : "https://raw.github.com/VisDockHub/NewVisDock/master/master/images/AnnArea.png",
	start : null,
	end : [],
	isDrag : false,
	isResize : false,
	boxWidth: 100,
	boxHeight: 25,
	noProp: 0,
	layerTypes : ["path"],
	distances : [],
	delta : [],
	layers : [],
	select : function() {
		console.log("select: " + AnnotatedByData.name);
		Toolbox.setTool(AnnotatedByData);
	},
	install : function() {
		VisDock.startChrome();		

		/*Panel.panel.selectAll("*").on("mousedown", function(){
			AnnotatedByData.layers.push(this)
			this.setAttributeNS(null, 'pointer-events', 'none')
			Panel.panel.selectAll("*").on("mousemove", function(){
				AnnotatedByData.layers.push(this)
				this.setAttributeNS(null, 'pointer-events', 'none')
			})
			Panel.panel.selectAll("*").on("mouseup", function(){
				AnnotatedByData.layers.push(this)
				this.setAttributeNS(null, 'pointer-events', 'none')
			})			
			Panel.panel.selectAll("*").on("mouseup", function(){
				AnnotatedByData.layers.push(this)
				this.setAttributeNS(null, 'pointer-events', 'none')
				//Panel.panel.on("mousedown", null)
				//Panel.panel.on("mousemove", null)
				//Panel.panel.on("mouseup", null)
			})
		})*/
		
		Panel.viewport.selectAll("*").attr("pointer-events", "none");
		Panel.annotation.selectAll("*").attr("pointer-events", "visiblePainted");
		Panel.viewport.selectAll("*").attr("pointer-events", "none");
		for (var i = 0; i < AnnotatedByData.layerTypes.length; i++){
			Panel.panel.selectAll(AnnotatedByData.layerTypes[i]).attr("pointer-events", "visiblePainted")
			.on("mousedown", AnnotatedByData.mousedown);
			
			//.on("mouseclick", function(){
			
				//Panel.panel.on("mousedown", AnnotatedByData.mousedown)
			//})
		}
		//Panel.panel.on("mousedown", AnnotatedByData.mousedown);
		VisDock.finishChrome();
	},
	uninstall : function() {
		VisDock.startChrome();		
		Panel.panel.on("mousedown", null);
		Panel.panel.selectAll("*").attr("pointer-events", "visiblePainted");
		Panel.annotation.selectAll("*").attr("pointer-events", "none");
		for (var i = 0; i < AnnotatedByData.layerTypes.length; i++){
			Panel.panel.selectAll(AnnotatedByData.layerTypes[i]).attr("pointer-events", "visiblePainted")
			.on("mousedown", null);
		}		
		VisDock.finishChrome();		
	},
	obtainData : function(object) {
		if (object.tagName == "ellipse"){
			var cx = parseFloat(object.getAttributeNS(null, "cx"));
			if (isNaN(cx)) cx = 0;
			var cy = parseFloat(object.getAttributeNS(null, "cy"));
			if (isNaN(cy)) cy = 0;
			var rx = parseFloat(object.getAttributeNS(null, "rx"));
			if (isNaN(rx)) rx = 0;
			var ry = parseFloat(object.getAttributeNS(null, "ry"));
			if (isNaN(ry)) ry = 0;
			var TMat = object.getCTM();
			return [cx, cy, TMat];
		} else if (object.tagName == "circle"){
			var cx = parseFloat(object.getAttributeNS(null, "cx"));
			if (isNaN(cx)) cx = 0;
			var cy = parseFloat(object.getAttributeNS(null, "cy"));
			if (isNaN(cy)) cy = 0;
			var r = parseFloat(object.getAttributeNS(null, "r"));
			if (isNaN(r)) r = 0;
			var TMat = object.getCTM();
			return [cx, cy, TMat];		
		} else if (object.tagName == "rect"){
			var x = parseFloat(object.getAttributeNS(null, "x"));
			if (isNaN(x)) x = 0;
			var y = parseFloat(object.getAttributeNS(null, "y"));
			if (isNaN(y)) y = 0;
			var width = parseFloat(object.getAttributeNS(null, "width"));
			if (isNaN(width)) width = 0;
			var height = parseFloat(object.getAttributeNS(null, "height"));
			if (isNaN(height)) height = 0;
			var TMat = object.getCTM();
			return [x, y, TMat];	
		} else if (object.tagName == "polygon"){
			var points = objecct.getAttributeNS(null, "points").split(" ");
			var first = points[0].split(",");
			var x = first[0];
			var y = first[1];
			var TMat = object.getCTM();
			return [x, y, TMat];				
		} else if (object.tagName == "path"){
			if (object.getAttribute("d") == undefined || object.getAttribute("d") == null){
				x = -1;
				y = -1;
			} else {			
			var s = object.getAttributeNS(null, "d").split(/[MLHVCSQTAZmlhvcsqtaz ]/i);
			var i = 0;
			var j = 0;
			while (i == 0){
				if (object.getAttributeNS(null, "d") != "" && s[j] != undefined) {
					if (s[j].split(",").length == 2){
						var x = parseFloat(s[j].split(",")[0]); 
						var y = parseFloat(s[j].split(",")[1]);
						i = 1;
					} else {
						j++;
					}
				} else {
					var x = -1;
					var y = -1;
					i = 1;
				}
			}
			}
			var TMat = object.getCTM();
			return [x, y, TMat];	 			
		} else if (object.tagName == "line"){
			
		} else if (object.tagName == "polyline"){
			
		}
		var TMat = object.getCTM().inverse();
	},
	calculateTransform : function(x, y, TMat){
		var tpoints = [];
		tpoints[0] = (x + 0*Panel.x) * TMat.a + (y + 0*Panel.y) * TMat.c + TMat.e;
		tpoints[1] = (x + 0*Panel.x) * TMat.b + (y + 0*Panel.y) * TMat.d + TMat.f;
		return tpoints;
	},
	mousedown : function(evt) {
		// Disable BirView for Chrome browser
		VisDock.startChrome();
		
		if (AnnotatedByData.noProp == 1) {
			return;
		}
		

		AnnotatedByData.layers.push(this);
		//alert(this)
		
		AnnotatedByData.start = d3.mouse(VisDock.svg[0][0]);
		var points = AnnotatedByData.start;
		var TMat = Panel.hostvis[0][0].getCTM().inverse();
		
		/*var tpoints = [];
		tpoints[0] = (points[0]+0*Panel.x) * TMat.a + (points[1]+0*Panel.y) * TMat.c + TMat.e;
		tpoints[1] = (points[0]+0*Panel.x) * TMat.b + (points[1]+0*Panel.y) * TMat.d + TMat.f;*/ 
		AnnotatedByData.start = AnnotatedByData.calculateTransform(points[0], points[1], TMat);
		AnnotatedByData.end[0] = AnnotatedByData.start[0] + 50;
		AnnotatedByData.end[1] = AnnotatedByData.start[1] - 50;
		

		//var points2 = AnnotatedByPointTool.end;

		//var tpoints2 = [];
		//tpoints2[0] = (points2[0]+0*Panel.x) * TMat.a + (points2[1]+0*Panel.y) * TMat.c + TMat.e;
		//tpoints2[1] = (points2[0]+0*Panel.x) * TMat.b + (points2[1]+0*Panel.y) * TMat.d + TMat.f;
		//AnnotatedByPointTool.start = tpoints;
		//AnnotatedByPointTool.end = tpoints2;
		
		var annotation = Panel.annotation.append("g").attr("class", "annotationsD");
							//.attr("transform", "tpoints");
		annotationArray[numAnno] = [];
		annotationArray[numAnno][0] = annotation;
		annotationArray[numAnno][1] = 0;
		numAnno++;
		//annotation.append("circle").attr("cx", AnnotatedByPointTool.start[0]).attr("cy", AnnotatedByPointTool.start[1]).attr("class", "annotation-circle").attr("r", 2).attr("fill", "red").attr("opacity", 0.8);

		annotation.append("line").attr("x1", AnnotatedByData.start[0])
				.attr("y1", AnnotatedByData.start[1]).attr("x2", AnnotatedByData.end[0])
				.attr("y2", AnnotatedByData.end[1]).attr("class", "annotation-line");

		var label = annotation.append("g").attr("pointer-events", "visiblePainted").attr("class", "annotationLabelsD");
		var r = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
		//AnnotatedByPointTool.T.push(Panel.viewport[0][0].getCTM());
		var t = r.getCTM();
		if (t == null){
			VisDock.svg[0][0].appendChild(r);
			t = r.getCTM();
		}
		var x2 = AnnotatedByData.end[0];//annotations[i].childNodes[1].getAttributeNS(null, "x2")
		var y2 = AnnotatedByData.end[1];//annotations[i].childNodes[1].getAttributeNS(null, "y2")
		var tmat = t.translate(1*x2, 1*y2).rotate(-Panel.rotation).translate(-1*x2, -1*y2);
		label[0][0].setAttributeNS(null, "transform", "matrix("+ tmat.a+","+ tmat.b+","+ tmat.c+","+ tmat.d+","+ tmat.e+","+ tmat.f+")");

		AnnotatedByData.distances.push([x2 - AnnotatedByData.start[0], AnnotatedByData.start[1] - y2]);
		var textbox = label.append("rect").attr("x", AnnotatedByData.end[0])
							.attr("y", AnnotatedByData.end[1])
							.attr("id", numAnno - 1)
							.attr("class", "annotation-textbox")
							.attr("width", AnnotatedByData.boxWidth)
							.attr("height", AnnotatedByData.boxHeight)
							.attr("style", "fill: white; opacity: 0.5; stroke: black; stroke-width: 1px; cursor:text")
							.attr("pointer-events", "visiblePainted")
								.on("mousedown", function(){
									
									var id = parseInt(this.getAttributeNS(null, "id"));
									var newText = window.prompt("Please enter the text you want to annotate",
										this.parentNode.childNodes[5].innerHTML);
										//d3.select(d3.selectAll(".annotation-textbox")[0][id].parentNode).select("text")[0][0].innerHTML );
									AnnotatedByData.noProp = 1;
									if (newText != null && newText != "") {
										var str = newText;
										var str2 = newText;
										if (newText.length > 7){
											str = newText.substr(0, 6) + "...";
											var sample = VisDock.svg.append("text").text(newText)
															.attr("display", "hidden");
											var w = sample[0][0].getComputedTextLength() + 5;
											sample.remove();
											if (w > AnnotatedByData.boxWidth){
												d3.selectAll(".annotation-textbox")[0][id].setAttributeNS(null, "width", w);
											}											
										} 
										/*if (newText.length > 20) {
											var sample = VisDock.svg.append("text").text(newText)
															.attr("display", "hidden")
											var w = sample[0][0].getComputedTextLength() + 5
											QueryManager.annoWidth[id] = w;
											d3.selectAll(".annotation-textbox")[0][id].setAttributeNS(null, "width", w)
											sample.remove();
										} else {
											d3.selectAll(".annotation-textbox")[0][id].setAttributeNS(null, "width", AnnotatedByPointTool.boxWidth)
										}*/
							
										QueryManager.annoText[parseInt(this.getAttributeNS(null, "id"))] = newText;
										this.parentNode.childNodes[5].innerHTML = str2;
										//d3.select(d3.selectAll(".annotation-textbox")[0][id].parentNode).select("text")[0][0].innerHTML = str2;
										QueryManager.names2[parseInt(this.getAttributeNS(null, "id"))].text(str);
									}
							})	
							.on("mousemove", function(){
								AnnotatedByData.noProp = 1;
							})							
							.on("mouseout", function(){
								AnnotatedByData.noProp = 0;
							});

		var hover = label.append("rect").attr("x", AnnotatedByData.end[0])	
						.attr("y", AnnotatedByData.end[1])
						.attr("width", AnnotatedByData.boxWidth/10)
						.attr("height", AnnotatedByData.boxHeight/2)	
						.attr("pointer-events", "visiblePainted")
						.attr("style", "fill: green; opacity: 0.5; stroke: black; stroke-width: 1px; cursor: pointer")
						.on("mousedown", function(){
							AnnotatedByData.noProp = 1;
						})	
						.on("mousemove", function(){
							AnnotatedByData.noProp = 1;
						})							
						.on("mouseout", function(){
							AnnotatedByData.noProp = 0;
						});
		var exit = label.append("rect").attr("x", AnnotatedByData.end[0])
						.attr("id", "exit")	
						.attr("y", AnnotatedByData.end[1] + AnnotatedByData.boxHeight/2)
						.attr("width", AnnotatedByData.boxWidth/10)
						.attr("height", AnnotatedByData.boxHeight/2)	
						.attr("pointer-events", "visiblePainted")
						.attr("style", "fill: red; opacity: 0.5; stroke: black; stroke-width: 1px; cursor: pointer")
						.attr("class", numAnno - 1)
						.on("mousedown", function(){
							//AnnotatedByPointTool.noProp = 1;
							d3.event.stopPropagation();
							Panel.panel.on("mouseup", null);
							var index = this.getAttributeNS(null, "class");
							QueryManager.removeAnnotation(index, "byPoint");
							//annotation.remove();
							QueryManager.annotation[index].remove();							
						})	
						.on("mousemove", function(){
							AnnotatedByData.noProp = 1;
						})							
						.on("mouseout", function(){
							AnnotatedByData.noProp = 0;
						});
		var exit_1 = label.append("line").attr("x1", AnnotatedByData.end[0]).attr("id", "exit_1")
							.attr("x2", AnnotatedByData.end[0] + AnnotatedByData.boxWidth/10)
							.attr("y1", AnnotatedByData.end[1] + AnnotatedByData.boxHeight)	
							.attr("y2", AnnotatedByData.end[1] + AnnotatedByData.boxHeight/2)	
							.attr("class", numAnno - 1)
							.attr("style", "stroke-width: 1px; stroke: black; cursor: pointer")			
							.on("mousedown", function(){
								d3.event.stopPropagation();
								Panel.panel.on("mouseup", null);
								//annotation.remove();
								var index = this.getAttributeNS(null, "class");
								QueryManager.removeAnnotation(index, "byPoint");
								QueryManager.annotation[index].remove();								
							});		
		var exit_2 = label.append("line").attr("x1", AnnotatedByData.end[0]).attr("id", "exit_2")
							.attr("x2", AnnotatedByData.end[0] + AnnotatedByData.boxWidth/10)
							.attr("y2", AnnotatedByData.end[1] + AnnotatedByData.boxHeight)	
							.attr("y1", AnnotatedByData.end[1] + AnnotatedByData.boxHeight/2)	
							.attr("style", "stroke-width: 1px; stroke: black; cursor: pointer")		
							.attr("class", numAnno - 1)
							.on("mousedown", function(){
								d3.event.stopPropagation();
								Panel.panel.on("mouseup", null);
								var index = this.getAttributeNS(null, "class");
								QueryManager.removeAnnotation(index, "byPoint");
								//annotation.remove();
								QueryManager.annotation[index].remove();								
							});				
		QueryManager.annoText[numAnno - 1] = "Label " + numAnno.toString();		
		QueryManager.annoWidth[numAnno - 1] = AnnotatedByData.boxWidth;
		QueryManager.annoHeight[numAnno - 1] = AnnotatedByData.boxHeight;	
		var textContent = label.append("text").attr("x", 5 + AnnotatedByData.end[0] + AnnotatedByData.boxWidth/10)
								.attr("y", AnnotatedByData.end[1] + AnnotatedByData.boxHeight*2/3)
								.attr("id", numAnno - 1)
								.text("Label " + numAnno.toString())
								.attr("style", "font-size: 12px")
								.attr("class", numAnno - 1)
								.on("mousedown", function(){
									
									
									var id = parseInt(this.getAttributeNS(null, "id"));
									
									var newText = window.prompt("Please enter the text you want to annotate", this.innerHTML);
										//d3.select(d3.selectAll(".annotation-textbox")[0][id].parentNode).select("text")[0][0].innerHTML );
									AnnotatedByData.noProp = 1;
									if (newText != null && newText != "") {
										var str = newText;
										var str2 = newText;
										if (newText.length > 7){
											str = newText.substr(0, 6) + "...";
											var sample = VisDock.svg.append("text").text(newText)
															.attr("display", "hidden");
											var w = sample[0][0].getComputedTextLength() + 5;
											sample.remove();
											if (w > AnnotatedByData.boxWidth) {
												d3.selectAll(".annotation-textbox")[0][id].setAttributeNS(null, "width", w);
											}											
										} 
										/*if (newText.length > 20) {
											var sample = VisDock.svg.append("text").text(newText)
															.attr("display", "hidden")
											var w = sample[0][0].getComputedTextLength() + 5
											QueryManager.annoWidth[id] = w;
											d3.selectAll(".annotation-textbox")[0][id].setAttributeNS(null, "width", w)
											sample.remove();
										} else {
											d3.selectAll(".annotation-textbox")[0][id].setAttributeNS(null, "width", AnnotatedByPointTool.boxWidth)
										}*/
										
										//if (newText.length > 20){
											//str = newText.substr(0, 6) + "..."
										//	str2 = newText.substr(0, 20)
										//	for (var u = 1; u < Math.ceil(newText.length / 20); u++){
												//var sample = document.createElementNS("http://www.w3.org/2000/svg", "text")
												/*d3.select(this.parentNode).append("text")
													.attr("x", 5 + AnnotatedByPointTool.end[0] + AnnotatedByPointTool.boxWidth/10)
													.attr("y", 12 + AnnotatedByPointTool.end[1] + AnnotatedByPointTool.boxHeight*2/3)*/
												/*VisDock.svg[0][0].appendChild(sample)
												 * 
												 */
										//		var sample = VisDock.svg.append("text").text(newText.substr((u - 1) * 20, 20))
										//						.attr("display", "hidden")
												/*var textNode = document.createTextNode(newText.substr((u) * 20, 20));
												sample.appendChild(textNode);
												sample.setAttributeNS(null, "hidden", "none")
												sample.setAttributeNS(null, "style", "font-size:12px; font-family: Verdana, sans-serif;")*/
												//sample.textContent()
										//		var w = sample[0][0].getComputedTextLength();
										//		str2 = str2 + "<tspan dy = 12, dx = -" + w + ">" + newText.substr(u * 20, 20) +
										//				 "</tspan>"
										//		sample.remove()
						 				//	}
										//	sample.remove();						 					
						 				//	var d;
										//}										
										QueryManager.annoText[parseInt(this.getAttributeNS(null, "id"))] = newText;
										//this.textContent = str2;
										this.innerHTML = str2;
										QueryManager.names2[parseInt(this.getAttributeNS(null, "id"))].text(str);
									}
						//span = div.append("xhtml:span").attr("class", "close-btn").attr("id", this.getAttributeNS(null, "class"));
						//span.append("xhtml:a").attr("href", "#").text("x");
						//span.style("left", (parseInt(div.style("width")) - 40) + "px");
						//span.on("mousedown", function() {
							//d3.event.stopPropagation();
							//Panel.panel.on("mouseup", null);
							//annotation.remove();
							//QueryManager.annotation[parseInt(this.getAttributeNS(null, "id"))].remove();
						//});
					//}
								})				
								.on("mousemove", function(){
									AnnotatedByData.noProp = 1;
								})
								.on("mouseout", function(){
									AnnotatedByData.noProp = 0;
								});
														
		var index = QueryManager.addAnnotation("red", 1, "Label " + numAnno);
		label.attr("id", index);

		annotation.append("circle").attr("cx", AnnotatedByData.start[0]).attr("cy", AnnotatedByData.start[1])
					.attr("pointer-events", "visiblePainted")
					.attr("r", 5).attr("class", "annotation-dot")
					.attr("style", "fill: black; cursor: pointer")
					.on("mousedown", function(){
						AnnotatedByData.isDrag = 1;
						var TMat = this.getCTM().inverse();
						var tpoints = [];
						var tpoints2 = [];
						var tpoints3 = [];
						
						//tpoints[0] = (firstPlace[0]+0*Panel.x) * TMat.a + (firstPlace[1]+0*Panel.y) * TMat.c + TMat.e;
						//tpoints[1] = (firstPlace[0]+0*Panel.x) * TMat.b + (firstPlace[1]+0*Panel.y) * TMat.d + TMat.f;
						
						VisDock.svg.on("mousemove", function(){
						if (AnnotatedByData.isDrag){
							VisDock.startChrome();
							secondPlace = d3.mouse(VisDock.svg[0][0]);
							tpoints2[0] = (secondPlace[0]+0*Panel.x) * TMat.a + (secondPlace[1]+0*Panel.y) * TMat.c + TMat.e;
							tpoints2[1] = (secondPlace[0]+0*Panel.x) * TMat.b + (secondPlace[1]+0*Panel.y) * TMat.d + TMat.f; 
					
							var T = label[0][0].getAttributeNS(null, "transform").split(",");
							var Ta = T[0].split("(")[1];
							Ta = parseFloat(Ta);
							var Tb = parseFloat(T[1]);
							var Tc = parseFloat(T[2]);
							var Td = parseFloat(T[3]);
							var Te = parseFloat(T[4]);
							var Tf = T[5].split(")")[0];
							Tf = parseFloat(Tf);
							//var T = label[0][0].getCTM().inverse();
							tpoints3[0] = (tpoints2[0]+0*Panel.x) * Ta + (tpoints2[1]+0*Panel.y) * Tc + Te;
							tpoints3[1] = (tpoints2[0]+0*Panel.x) * Tb + (tpoints2[1]+0*Panel.y) * Td + Tf;
							
							/*tpoints3[0] = (tpoints2[0]+0*Panel.x) * T.a + (tpoints2[1]+0*Panel.y) * T.c + T.e;
							tpoints3[1] = (tpoints2[0]+0*Panel.x) * T.b + (tpoints2[1]+0*Panel.y) * T.d + T.f;*/

							var index = annotation[0][0].childNodes[1].getAttributeNS(null, "id");
							var x2 = annotation.select(".annotation-line").attr("x2");
							var y2 = annotation.select(".annotation-line").attr("y2");
							AnnotatedByData.distances[index] = [x2 - tpoints2[0], tpoints2[1] - y2];
																	
							annotation.select(".annotation-line").attr("x1", tpoints2[0])//secondPlace[0])
								.attr("y1", tpoints2[1]);
							annotation.select(".annotation-dot").attr("cx", tpoints2[0])
								.attr("cy", tpoints2[1]);
					/*annotation.selectAll("rect").attr("x", tpoints2[0])//secondPlace[0])
						.attr("y", tpoints2[1])
					annotation.selectAll("text").attr("x", 5 + tpoints2[0] + AnnotatedByPointTool.boxWidth/10)
						.attr("y", tpoints2[1] + AnnotatedByPointTool.boxHeight*2/3)
						
					annotation.select("#exit").attr("x", tpoints2[0]) // Exit Button
						.attr("y", tpoints2[1] + AnnotatedByPointTool.boxHeight/2)
					annotation.select("#exit_1").attr("x1", tpoints2[0]) // Exit X_1
						.attr("x2", tpoints2[0] + AnnotatedByPointTool.boxWidth/10)
						.attr("y1", tpoints2[1] + AnnotatedByPointTool.boxHeight)
						.attr("y2", tpoints2[1] + AnnotatedByPointTool.boxHeight/2)	
					annotation.select("#exit_2").attr("x1", tpoints2[0]) // Exit X_2
						.attr("x2", tpoints2[0] + AnnotatedByPointTool.boxWidth/10)
						.attr("y1", tpoints2[1] + AnnotatedByPointTool.boxHeight/2)
						.attr("y2", tpoints2[1] + AnnotatedByPointTool.boxHeight)*/										
				}
				VisDock.finishChrome();
			});	
			VisDock.svg.on("mouseup", function(){
				AnnotatedByData.isDrag = false;
			});					 						
					})	
					.on("mousemove", function(){
						AnnotatedByData.noProp = 1;
					})					
					.on("mouseout", function(){
						AnnotatedByData.noProp = 0;
					});
							
		hover.on("mousedown", function(){
			d3.event.stopPropagation();
			var firstPlace, secondPlace;
			AnnotatedByData.isDrag = true;
			firstPlace = d3.mouse(VisDock.svg[0][0]);	

			var TMat = this.getCTM().inverse();

			var tpoints = [];
			var tpoints2 = [];
			var tpoints3 = [];
			tpoints[0] = (firstPlace[0]+0*Panel.x) * TMat.a + (firstPlace[1]+0*Panel.y) * TMat.c + TMat.e;
			tpoints[1] = (firstPlace[0]+0*Panel.x) * TMat.b + (firstPlace[1]+0*Panel.y) * TMat.d + TMat.f; 
			//strpoints = [strpoints + (tpoints[0]) + "," + (tpoints[1]) + " "]
				
			VisDock.svg.on("mousemove", function(){
				if (AnnotatedByData.isDrag){

					// Disable BirdView for Chrome
					VisDock.startChrome();
										
					secondPlace = d3.mouse(VisDock.svg[0][0]);
					tpoints2[0] = (secondPlace[0]+0*Panel.x) * TMat.a + (secondPlace[1]+0*Panel.y) * TMat.c + TMat.e;
					tpoints2[1] = (secondPlace[0]+0*Panel.x) * TMat.b + (secondPlace[1]+0*Panel.y) * TMat.d + TMat.f; 
					
					var T = label[0][0].getAttributeNS(null, "transform").split(",");
					var Ta = T[0].split("(")[1];
					Ta = parseFloat(Ta);
					var Tb = parseFloat(T[1]);
					var Tc = parseFloat(T[2]);
					var Td = parseFloat(T[3]);
					var Te = parseFloat(T[4]);
					var Tf = T[5].split(")")[0];
					Tf = parseFloat(Tf);
					tpoints3[0] = (tpoints2[0]+0*Panel.x) * Ta + (tpoints2[1]+0*Panel.y) * Tc + Te;
					tpoints3[1] = (tpoints2[0]+0*Panel.x) * Tb + (tpoints2[1]+0*Panel.y) * Td + Tf;
					 
					var index = annotation[0][0].childNodes[1].getAttributeNS(null, "id");
					var x1 = annotation.select(".annotation-line").attr("x1");
					var y1 = annotation.select(".annotation-line").attr("y1");
					AnnotatedByData.distances[index] = [tpoints3[0] - x1, y1 - tpoints3[1]];
								
					annotation.select(".annotation-line").attr("x2", tpoints3[0])//secondPlace[0])
						.attr("y2", tpoints3[1]);
					annotation.selectAll("rect").attr("x", tpoints2[0])//secondPlace[0])
						.attr("y", tpoints2[1]);
					annotation.selectAll("text").attr("x", 5 + tpoints2[0] + AnnotatedByData.boxWidth/10)
						.attr("y", tpoints2[1] + AnnotatedByData.boxHeight*2/3);
						
					annotation.select("#exit").attr("x", tpoints2[0]) // Exit Button
						.attr("y", tpoints2[1] + AnnotatedByData.boxHeight/2);
					
					annotation.select("#exit_1").attr("x1", tpoints2[0]) // Exit X_1
						.attr("x2", tpoints2[0] + AnnotatedByData.boxWidth/10)
						.attr("y1", tpoints2[1] + AnnotatedByData.boxHeight)
						.attr("y2", tpoints2[1] + AnnotatedByData.boxHeight/2);	
					annotation.select("#exit_2").attr("x1", tpoints2[0]) // Exit X_2
						.attr("x2", tpoints2[0] + AnnotatedByData.boxWidth/10)
						.attr("y1", tpoints2[1] + AnnotatedByData.boxHeight/2)
						.attr("y2", tpoints2[1] + AnnotatedByData.boxHeight);	
					
					// Enable BirdView for Chrome	
					VisDock.finishChrome();						
															
				}
			});	
			VisDock.svg.on("mouseup", function(){
				AnnotatedByData.isDrag = false;
			});
		});
		//Panel.panel.selectAll("*").attr("pointer-events", "visiblePainted")
		
		// Enable BirdView for Chrome
		VisDock.finishChrome();	
		
		/*var foreignObject = label.append("foreignObject").attr("x", AnnotatedByPointTool.end[0]).attr("y", AnnotatedByPointTool.end[1]).attr("width", "120px").attr("height", "45px");
		var div = foreignObject.append("xhtml:div").text("label " + numAnno);
		var divWidth = div.style("width");
		var divHeight = div.style("height");
		var span = div.append("xhtml:span").attr("class", "close-btn");
		span.append("xhtml:a").attr("href", "#").text("x");
		var index = QueryManager.addAnnotation("red", 1, "label " + numAnno);
		

		span.on("mousedown", function() {
			d3.event.stopPropagation();
			Panel.panel.on("mouseup", null);
			annotation.remove();
			QueryManager.annotation[index].remove();
		});

		label.on("mousedown", function() {
			d3.event.stopPropagation();
			var firstPlace, secondPlace;
			firstPlace = d3.mouse(this);
			label.on("mousemove", function() {
				secondPlace = d3.mouse(this);
				if (Math.abs(secondPlace[0] - firstPlace[0]) > 10 || Math.abs(secondPlace[1] - firstPlace[1]) > 10) {
					if (div.style("width") != divWidth || div.style("height") != divHeight) {
						foreignObject.attr("width", parseInt(div.style("width")) + 20);
						foreignObject.attr("height", parseInt(div.style("height")) + 15);
						span.style("left", (parseInt(div.style("width")) - 40) + "px");
						divWidth = div.style("width");
						divHeight = div.style("height");
						if (annotation.select("line").attr("x2") < AnnotatedByPointTool.start[0] && annotation.select("line").attr("y2") < AnnotatedByPointTool.start[1]) {
							annotation.select("line").attr("x2", parseInt(foreignObject.attr("x")) + parseInt(divWidth) + 12);
							//	.attr("y2", d3.mouse(this)[1]);
						}
						AnnotatedByPointTool.isResize = true;
					} else {
						AnnotatedByPointTool.isDrag = true;
						//drag
						if (d3.mouse(this)[0] < AnnotatedByPointTool.start[0] && d3.mouse(this)[1] < AnnotatedByPointTool.start[1]) {
							annotation.select("line").attr("x2", d3.mouse(this)[0]).attr("y2", d3.mouse(this)[1]);
							label.select("foreignObject").attr("x", d3.mouse(this)[0] - parseInt(foreignObject.attr("width"))).attr("y", d3.mouse(this)[1]);
						} else {
							annotation.select("line").attr("x2", d3.mouse(this)[0]).attr("y2", d3.mouse(this)[1]);
							label.select("foreignObject").attr("x", d3.mouse(this)[0]).attr("y", d3.mouse(this)[1]);
						}
					}
				}
			});
			label.on("mouseup", function() {
				if (AnnotatedByPointTool.isDrag != true && AnnotatedByPointTool.isResize != true)//just click
				{
					d3.event.stopPropagation();
					var newText = window.prompt("Please enter the text you want to annotate");
					if (newText != null && newText != "") {
						div.text(newText);
						QueryManager.names2[parseInt(this.getAttributeNS(null, "class"))].text(newText);
						span = div.append("xhtml:span").attr("class", "close-btn").attr("id", this.getAttributeNS(null, "class"));
						span.append("xhtml:a").attr("href", "#").text("x");
						span.style("left", (parseInt(div.style("width")) - 40) + "px");
						span.on("mousedown", function() {
							d3.event.stopPropagation();
							Panel.panel.on("mouseup", null);
							annotation.remove();
							QueryManager.annotation[parseInt(this.getAttributeNS(null, "id"))].remove();
						});
					}
				}
				label.on("mousemove", null);

			});
			AnnotatedByPointTool.isDrag = false;
			AnnotatedByPointTool.isResize = false;
		});*/	
	},
	/*update : function(){
		
	},*/
	update : function(){
		VisDock.startChrome();
		var annotations = Panel.panel.selectAll(".annotationsD")[0];
		var circle = Panel.panel.selectAll(".annotationsD").selectAll("circle");
		var line = Panel.panel.selectAll(".annotationsD").selectAll("line");
		var i = 0;
		for (var i = 0; i < annotations.length; i++){
			var object = AnnotatedByData.layers[i];
		
			var xy = AnnotatedByData.obtainData(AnnotatedByData.layers[i]);
			var xy2 = AnnotatedByData.calculateTransform(xy[0], xy[1], xy[2]);
			
			var cx = parseFloat(circle[i][0].getAttributeNS(null, "cx"));
			var cy = parseFloat(circle[i][0].getAttributeNS(null, "cy"));
			var TMat = circle[i][0].getCTM().inverse();
			
			var points = AnnotatedByData.calculateTransform(xy2[0], xy2[1], TMat);
//var points = [0,0];
//var xy2 = [0,0];
			if (isNaN(points[0])){
				var aa = 0;
			}
			var x_dis = xy2[0] - points[0];
			var y_dis = xy2[1] - points[1];
			
			circle[i][0].setAttribute("cx", points[0]);//xy2[0])
			circle[i][0].setAttribute("cy", points[1]);//xy2[1])
			
			if (cx == -1 || cy == -1) {
				circle[i][0].setAttribute("display", "none");
				line[i][0].setAttribute("display", "none");
				annotations[i].setAttribute("display", "none");
			} else {
				circle[i][0].setAttribute("display", "inline");
				line[i][0].setAttribute("display", "inline");
				annotations[i].setAttribute("display", "inline");				
			}
			
			//d3.select(line[i][0]).attr("x1", points[0])
			//d3.select(line[i][0]).attr("y1", points[1])
			//d3.select(line[i][0]).attr("x2", points[0] + AnnotatedByData.distances[i][0])
			//d3.select(line[i][0]).attr("y2", points[1] - AnnotatedByData.distances[i][1])
			
			line[i][0].setAttribute("x1", points[0]);//xy2[0])
			line[i][0].setAttribute("y1", points[1]);//xy2[1])
			line[i][0].setAttribute("x2", points[0] + AnnotatedByData.distances[i][0]);//xy2[0])
			line[i][0].setAttribute("y2", points[1] - AnnotatedByData.distances[i][1]);//xy2[1])	

			var r = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
			VisDock.svg[0][0].appendChild(r);
			var t = r.getCTM();
						
			var x2 = points[0] + AnnotatedByData.distances[i][0];//AnnotatedByData.end[0]//annotations[i].childNodes[1].getAttributeNS(null, "x2")
			var y2 = points[1] - AnnotatedByData.distances[i][1];//AnnotatedByData.end[1]//annotations[i].childNodes[1].getAttributeNS(null, "y2")
			var tmat = t.translate(1*x2, 1*y2).rotate(Panel.rotation).translate(-1*x2, -1*y2);

			d3.selectAll(".annotationLabelsD")[0][i]
				.setAttribute("transform", "matrix("+ tmat.a+","+ tmat.b+","+ tmat.c+","+ tmat.d+","+ tmat.e+","+ tmat.f+")");
			
			VisDock.svg[0][0].removeChild(r);
			
			//annotations[i].childNodes[1].childNodes[0].setAttribute("x", points[0] + AnnotatedByData.distances[i][0]);
			//annotations[i].childNodes[1].childNodes[0].setAttribute("y", points[1] - AnnotatedByData.distances[i][1]);
			//annotations[i].childNodes[1].childNodes[1].setAttribute("x", points[0] + AnnotatedByData.distances[i][0]);
			//annotations[i].childNodes[1].childNodes[1].setAttribute("x", points[0] + AnnotatedByData.distances[i][0]);
			//annotations[i].childNodes[1].childNodes[2]
			//annotations[i].childNodes[1].childNodes[2]
								
			d3.select(annotations[i]).selectAll("rect").attr("x", points[0] + AnnotatedByData.distances[i][0])
				.attr("y", points[1] - AnnotatedByData.distances[i][1]);
			d3.select(annotations[i]).selectAll("text").attr("x", 5 + points[0] + AnnotatedByData.distances[i][0] + AnnotatedByPointTool.boxWidth/10)
				.attr("y", points[1] - AnnotatedByData.distances[i][1] + AnnotatedByPointTool.boxHeight*2/3);
		
			d3.selectAll("#exit")[0][i].setAttribute("x", points[0] + AnnotatedByData.distances[i][0]); // Exit Button
			d3.selectAll("#exit")[0][i].setAttribute("y", points[1] - AnnotatedByData.distances[i][1] + AnnotatedByPointTool.boxHeight/2);		
				
			d3.select(annotations[i]).select("#exit").attr("x", points[0] + AnnotatedByData.distances[i][0]) // Exit Button
				.attr("y", points[1] - AnnotatedByData.distances[i][1] + AnnotatedByPointTool.boxHeight/2);
					
			d3.select(annotations[i]).select("#exit_1").attr("x1", points[0] + AnnotatedByData.distances[i][0]) // Exit X_1
				.attr("x2", points[0] + AnnotatedByData.distances[i][0] + AnnotatedByPointTool.boxWidth/10)
				.attr("y1", points[1] - AnnotatedByData.distances[i][1] + AnnotatedByPointTool.boxHeight)
				.attr("y2", points[1] - AnnotatedByData.distances[i][1] + AnnotatedByPointTool.boxHeight/2);
			d3.select(annotations[i]).select("#exit_2").attr("x1", points[0] + AnnotatedByData.distances[i][0]) // Exit X_2
				.attr("x2", points[0] + AnnotatedByData.distances[i][0] + AnnotatedByPointTool.boxWidth/10)
				.attr("y1", points[1] - AnnotatedByData.distances[i][1] + AnnotatedByPointTool.boxHeight/2)
				.attr("y2", points[1] - AnnotatedByData.distances[i][1] + AnnotatedByPointTool.boxHeight);

			var tmat = t.translate(1*x2, 1*y2).rotate(-Panel.rotation).translate(-1*x2, -1*y2);
			d3.selectAll(".annotationLabelsD")[0][i]
				.setAttribute("transform", "matrix("+ tmat.a+","+ tmat.b+","+ tmat.c+","+ tmat.d+","+ tmat.e+","+ tmat.f+")");
			
		}
		VisDock.finishChrome();
	}		
};

/* The below code is derived from SVG lens code provided by
 * Bogotobogo: http://www.bogotobogo.com/svg_source/famoustiger.svg
 */
var RectMagLens = {
	name : "RecLens",
	image : "https://raw.github.com/VisDockHub/NewVisDock/master/master/images/RectMag.png",
	lensOn : 0,
	CP : [],
	CPArray: [],
	node : [],
	nodeArray : [],
	circle : [],
	CC : [],
	CCArray : [],
	cc : [],
	ccArray : [],
	rec : [],
	recArray : [],
	rec2 : [],
	rec2Array : [],
	scale : 4,
	scaleArray : [],
	x : 0,
	xArray : [],
	y : 0,
	yArray : [],	
	select : function() {
		console.log("select: " + RectMagLens.name);
		Toolbox.setTool(RectMagLens);
	},
	install : function() {
		var Chrome =(/Firefox/i.test(navigator.userAgent))? 0 : 1;
		if (Chrome && BirdView.birdinit) {
			BirdView.removeBirdView();
		}	

		var xmlns = "http://www.w3.org/2000/svg"; 
		var svgns = "http://www.w3.org/1999/xlink";		
		
		if (VisDock.mode == "single"){
			Panel.panel.on("mousemove", RectMagLens.mousemove);
			//Panel.viewport.selectAll("*").attr("pointer-events", "none");
			//Panel.panel.selectAll(".annotationLabels").selectAll("rect").attr("pointer-events", "visiblePainted");
			VisDock.svg[0][0].addEventListener("mousewheel", this.mousewheel, false);
			VisDock.svg[0][0].addEventListener("DOMMouseScroll", this.mousewheel, false);
			Panel.viewport.selectAll("*").attr("pointer-events", "none");		
			
			RectMagLens.CP = Panel.panel.append("clipPath").attr("id", "VisDock_CP");
			RectMagLens.rec = RectMagLens.CP.append("rect")
				.attr("x", -50/RectMagLens.scale*Panel.scale).attr("y", -50/RectMagLens.scale*Panel.scale)
				.attr("width", 100/RectMagLens.scale*Panel.scale)
				.attr("height", 100/RectMagLens.scale*Panel.scale).attr("pointer-events", "none");	
			RectMagLens.node = document.createElementNS(xmlns,'use');
			RectMagLens.CC = Panel.panel.append("g").attr("id", "clippedV");	
			
			RectMagLens.cc = RectMagLens.CC.append("rect").attr("style", "fill:white")
				.attr("x", -50/RectMagLens.scale*Panel.scale).attr("y", -50/RectMagLens.scale*Panel.scale)
				.attr("width", 100/RectMagLens.scale*Panel.scale)
				.attr("height", 100/RectMagLens.scale*Panel.scale);		
				
			RectMagLens.CC[0][0].appendChild(RectMagLens.node);		
			
			RectMagLens.node.setAttributeNS(svgns, "xlink:href", "#VisDockViewPort");
			RectMagLens.node.setAttributeNS(null, "clip-path","url(#VisDock_CP)");			
			
			RectMagLens.rec2 = RectMagLens.CC.append("rect")
				.attr("x", -50/RectMagLens.scale*Panel.scale).attr("y", -50/RectMagLens.scale*Panel.scale)
				.attr("width", 100/RectMagLens.scale*Panel.scale)
				.attr("height", 100/RectMagLens.scale*Panel.scale)	

			//.attr("style", "fill:none; stroke:gray; stroke-width:7").attr("pointer-events", "none")	
				.attr("style", "fill:none; stroke:gray; stroke-width:"+7/RectMagLens.scale*Panel.scale).attr("pointer-events", "none");
							
			RectMagLens.CC.attr("display", "none");
		} else {
			for (var i = 0; i < VisDock.svgArray.length; i++){
				Panel.panelArray[i].on("mousemove", RectMagLens.mousemove);
				Panel.multiview[i].selectAll("*").attr("pointer-events", "none");
				//Panel.panelArray[i].selectAll(".annotationLabels").selectAll("rect").attr("pointer-events", "visiblePainted");
				VisDock.svgArray[i][0][0].addEventListener("mousewheel", this.mousewheel, false);
				VisDock.svgArray[i][0][0].addEventListener("DOMMouseScroll", this.mousewheel, false);
				
				if (RectMagLens.scaleArray[i] == undefined){
					RectMagLens.scaleArray[i] = 4;
					RectMagLens.xArray[i] = 0;
					RectMagLens.yArray[i] = 0;
				}
				
				RectMagLens.CPArray[i] = Panel.panelArray[i].append("clipPath").attr("id", "VisDock_CP" + i);
				RectMagLens.recArray[i] = RectMagLens.CPArray[i].append("rect")
					.attr("x", -50/RectMagLens.scaleArray[i]*Panel.scaleArray[i])
					.attr("y", -50/RectMagLens.scaleArray[i]*Panel.scaleArray[i])
					.attr("width", 100/RectMagLens.scaleArray[i]*Panel.scaleArray[i])
					.attr("height", 100/RectMagLens.scaleArray[i]*Panel.scaleArray[i])
					.attr("pointer-events", "none");		
				RectMagLens.nodeArray[i] = document.createElementNS(xmlns,'use');
				RectMagLens.CCArray[i] = Panel.panelArray[i].append("g").attr("id", "clippedV");	
				
				////////////////////////////////////////////////////////////////////////////
				RectMagLens.ccArray[i] = RectMagLens.CCArray[i].append("rect").attr("style", "fill:white")
					.attr("x", -50/RectMagLens.scaleArray[i]*Panel.scaleArray[i])
					.attr("y", -50/RectMagLens.scaleArray[i]*Panel.scaleArray[i])
					.attr("width", 100/RectMagLens.scaleArray[i]*Panel.scaleArray[i])
					.attr("height", 100/RectMagLens.scaleArray[i]*Panel.scaleArray[i]);
					
				RectMagLens.CCArray[i][0][0].appendChild(RectMagLens.nodeArray[i]);
				
				RectMagLens.nodeArray[i].setAttributeNS(svgns, "xlink:href", "#VisDockViewPort" + i);
				RectMagLens.nodeArray[i].setAttributeNS(null, "clip-path","url(#VisDock_CP" + i + ")");				

				RectMagLens.rec2Array[i] = RectMagLens.CCArray[i].append("rect")
					.attr("x", -50/RectMagLens.scaleArray[i]*Panel.scaleArray[i])
					.attr("y", -50/RectMagLens.scaleArray[i]*Panel.scaleArray[i])
					.attr("width", 100/RectMagLens.scaleArray[i]*Panel.scaleArray[i])
					.attr("height", 100/RectMagLens.scaleArray[i]*Panel.scaleArray[i])	

			//.attr("style", "fill:none; stroke:gray; stroke-width:7").attr("pointer-events", "none")	
					.attr("style", "fill:none; stroke:gray; stroke-width:"+7/RectMagLens.scaleArray[i]*Panel.scaleArray[i])
					.attr("pointer-events", "none");
					
				RectMagLens.CCArray[i].attr("display", "none");
			}			
		}		
		
		
		//window.addEventListener("mousewheel", this.mousewheel, false);
		//window.addEventListener("DOMMouseScroll", this.mousewheel, false);
				
		// Install Rectangular Magnifying Lens	
	

		//CircMagLens.CC.attr("transform", "scale("+CircMagLens.scale+")");//"matrix(" + c.a +","+ c.b + "," + c.c + "," + c.d + "," + c.e + "," + c.f + ")")//"scale(1.5)translate(0,0)")
		
		
		RectMagLens.lensOn = 1;
		if (Chrome && BirdView.birdinit) {
			BirdView.restoreBirdView();//Panel.panel, BirdView.width, BirdView.height)
		}
	},
	uninstall : function() {
		var Chrome =(/Firefox/i.test(navigator.userAgent))? 0 : 1;
		//if (Chrome && BirdView.birdinit) {
		//	BirdView.removeBirdView();
		//}
		VisDock.startChrome();
		
		RectMagLens.lensOn = 0;
		if (VisDock.mode == "single"){
			
			this.CP.remove();
			this.node.remove();
			this.CC.remove();
			this.cc.remove();
			this.rec.remove();
			this.rec2.remove();
			Panel.panel.on("mousemove", null);
			VisDock.svg[0][0].removeEventListener("DOMMouseScroll", this.mousewheel, false);
			VisDock.svg[0][0].removeEventListener("mousewheel", this.mousewheel, false);
			Panel.viewport.selectAll("*").attr("pointer-events", "visiblePainted");
		} else {
			for (var i = 0; i < VisDock.svgArray.length; i++){
				this.CPArray[i].remove();
				this.nodeArray[i].remove();
				this.CCArray[i].remove();
				this.ccArray[i].remove();
				this.recArray[i].remove();
				this.rec2Array[i].remove();
				Panel.panelArray[i].on("mousemove", null);
				VisDock.svgArray[i][0][0].removeEventListener("DOMMouseScroll", this.mousewheel, false);
				VisDock.svgArray[i][0][0].removeEventListener("mousewheel", this.mousewheel, false);
				Panel.multiview[i].selectAll("*").attr("pointer-events", "visiblePainted");				
			}
		}
		VisDock.finishChrome();
		//if (Chrome && BirdView.birdinit) {
		//	BirdView.init(Panel.panel, BirdView.width, BirdView.height)
		//}
	},
	update : function(index) {
		var newx;
		var newy;
		var x;
		var y;		
		if (VisDock.mode == "single"){
			newx = (RectMagLens.scale - 1)*this.x;//d3.mouse(Panel.panel[0][0])[0];
			newy = (RectMagLens.scale - 1)*this.y;//d3.mouse(Panel.panel[0][0])[1];			
			
			RectMagLens.CC.attr("transform", "scale("+RectMagLens.scale+")");//"matrix(" + c.a +","+ c.b + "," + c.c + "," + c.d + "," + c.e + "," + c.f + ")")//"scale(1.5)translate(0,0)")
			RectMagLens.rec2
				.attr("x", -50/RectMagLens.scale*Panel.scale).attr("y", -50/RectMagLens.scale*Panel.scale)
				.attr("width", 100/RectMagLens.scale*Panel.scale)
			//.attr("style", "fill:none; stroke:gray; stroke-width:7").attr("pointer-events", "none")
				.attr("height", 100/RectMagLens.scale*Panel.scale)
				.attr("style", "fill:none; stroke:gray; stroke-width:"+7/RectMagLens.scale*Panel.scale).attr("pointer-events", "none");			

			RectMagLens.cc.attr("style", "fill:white")
				.attr("x", -50/RectMagLens.scaleArray[index]*Panel.scaleArray[index])
				.attr("y", -50/RectMagLens.scaleArray[index]*Panel.scaleArray[index])
				.attr("width", 100/RectMagLens.scaleArray[index]*Panel.scaleArray[index])
				.attr("height", 100/RectMagLens.scaleArray[index]*Panel.scaleArray[index]);

			RectMagLens.rec
				.attr("x", -50/RectMagLens.scale*Panel.scale).attr("y", -50/RectMagLens.scale*Panel.scale)
				.attr("width", 100/RectMagLens.scale*Panel.scale)
				.attr("height", 100/RectMagLens.scale*Panel.scale).attr("pointer-events", "none");
			
			x = RectMagLens.x;//d3.mouse(Panel.panel[0][0])[0]
			y = RectMagLens.y;//d3.mouse(Panel.panel[0][0])[1]			
			
			RectMagLens.CC.attr("display", "inline");
		//RectMagLens.node.setAttributeNS(null, "transform", "translate(" + (-1/RectMagLens.scale*newx-50/RectMagLens.scale*Panel.scale) + 
		//			"," + (-1/RectMagLens.scale*newy-50/RectMagLens.scale*Panel.scale) + ")")
			RectMagLens.node.setAttributeNS(null, "transform", "translate(" + (-1/RectMagLens.scale*newx) + 
					"," + (-1/RectMagLens.scale*newy) + ")");			
			
			RectMagLens.rec.attr("x", x-50/RectMagLens.scale*Panel.scale);//CircMagLens.scale*newx)
			RectMagLens.rec.attr("y", y-50/RectMagLens.scale*Panel.scale);//CircMagLens.scale*newy)			
			
			RectMagLens.cc.attr("x", (x/RectMagLens.scale-50/RectMagLens.scale*Panel.scale)); //1.5^2*newx)
		//CircMagLens.cc.attr("cy", (y))
			RectMagLens.cc.attr("y", (y/RectMagLens.scale-50/RectMagLens.scale*Panel.scale)); //1.5^2*newy)			
			
			RectMagLens.rec2.attr("x", (x/RectMagLens.scale-50/RectMagLens.scale*Panel.scale));
		//CircMagLens.cir2.attr("cy", (y))
			RectMagLens.rec2.attr("y", (y/RectMagLens.scale-50/RectMagLens.scale*Panel.scale));			
			
		} else {
			newx = (RectMagLens.scaleArray[index] - 1)*this.xArray[index];//d3.mouse(Panel.panel[0][0])[0];
			newy = (RectMagLens.scaleArray[index] - 1)*this.yArray[index];//d3.mouse(Panel.panel[0][0])[1];
		
			RectMagLens.CCArray[index].attr("transform", "scale("+RectMagLens.scaleArray[index]+")");//"matrix(" + c.a +","+ c.b + "," + c.c + "," + c.d + "," + c.e + "," + c.f + ")")//"scale(1.5)translate(0,0)")
			RectMagLens.rec2Array[index]
				.attr("x", -50/RectMagLens.scaleArray[index]*Panel.scaleArray[index])
				.attr("y", -50/RectMagLens.scaleArray[index]*Panel.scaleArray[index])
				.attr("width", 100/RectMagLens.scaleArray[index]*Panel.scaleArray[index])
			//.attr("style", "fill:none; stroke:gray; stroke-width:7").attr("pointer-events", "none")
				.attr("height", 100/RectMagLens.scaleArray[index]*Panel.scaleArray[index])
				.attr("style", "fill:none; stroke:gray; stroke-width:"+7/RectMagLens.scaleArray[index]*Panel.scaleArray[index])
				.attr("pointer-events", "none");
		
			RectMagLens.ccArray[index].attr("style", "fill:white")
				.attr("x", -50/RectMagLens.scaleArray[index]*Panel.scaleArray[index])
				.attr("y", -50/RectMagLens.scaleArray[index]*Panel.scaleArray[index])
				.attr("width", 100/RectMagLens.scaleArray[index]*Panel.scaleArray[index])
				.attr("height", 100/RectMagLens.scaleArray[index]*Panel.scaleArray[index]);	
				
			RectMagLens.recArray[index]
				.attr("x", -50/RectMagLens.scaleArray[index]*Panel.scaleArray[index])
				.attr("y", -50/RectMagLens.scaleArray[index]*Panel.scaleArray[index])
				.attr("width", 100/RectMagLens.scaleArray[index]*Panel.scaleArray[index])
				.attr("height", 100/RectMagLens.scaleArray[index]*Panel.scaleArray[index])
				.attr("pointer-events", "none");
				
			x = RectMagLens.xArray[index];//d3.mouse(Panel.panel[0][0])[0]
			y = RectMagLens.yArray[index];//d3.mouse(Panel.panel[0][0])[1]				
	
			RectMagLens.CCArray[index].attr("display", "inline");
		//RectMagLens.node.setAttributeNS(null, "transform", "translate(" + (-1/RectMagLens.scale*newx-50/RectMagLens.scale*Panel.scale) + 
		//			"," + (-1/RectMagLens.scale*newy-50/RectMagLens.scale*Panel.scale) + ")")
			RectMagLens.nodeArray[index].setAttributeNS(null, "transform", "translate(" + (-1/RectMagLens.scaleArray[index]*newx) + 
					"," + (-1/RectMagLens.scaleArray[index]*newy) + ")");	
			
			RectMagLens.recArray[index]
				.attr("x", x-50/RectMagLens.scaleArray[index]*Panel.scaleArray[index]);//CircMagLens.scale*newx)
			RectMagLens.recArray[index]
				.attr("y", y-50/RectMagLens.scaleArray[index]*Panel.scaleArray[index]);//CircMagLens.scale*newy)			
		
			RectMagLens.ccArray[index]
				.attr("x", (x/RectMagLens.scaleArray[index]-50/RectMagLens.scaleArray[index]*Panel.scaleArray[index])); //1.5^2*newx)
		//CircMagLens.cc.attr("cy", (y))
			RectMagLens.ccArray[index]
				.attr("y", (y/RectMagLens.scaleArray[index]-50/RectMagLens.scaleArray[index]*Panel.scaleArray[index])); //1.5^2*newy)		
											
			RectMagLens.rec2Array[index]
				.attr("x", (x/RectMagLens.scaleArray[index]-50/RectMagLens.scaleArray[index]*Panel.scaleArray[index]));
		//CircMagLens.cir2.attr("cy", (y))
			RectMagLens.rec2Array[index]
				.attr("y", (y/RectMagLens.scaleArray[index]-50/RectMagLens.scaleArray[index]*Panel.scaleArray[index]));											
		}
	
		
		//VisDock.startChrome();
		//newx = d3.mouse(Panel.panel[0][0])[0] - (CircMagLens.scale - 1)*d3.mouse(Panel.panel[0][0])[0];
		//newy = d3.mouse(Panel.panel[0][0])[1] - (CircMagLens.scale - 1)*d3.mouse(Panel.panel[0][0])[1];
		



						

		

				
		//CircMagLens.node.setAttributeNS(null, "transform", "translate(" + (-1/CircMagLens.scale*x) + "," + (-1/CircMagLens.scale*y) + ")")
		

		//CircMagLens.cir.attr("transform", "translate("+newx)")

		//CircMagLens.cir.attr("cx", CircMagLens.scale*newx)
		//CircMagLens.cir.attr("cy", CircMagLens.scale*newy)
		
		//CircMagLens.cc.attr("cx", (x))///CircMagLens.scale))

		
		//CircMagLens.cir2.attr("cx", (x))

		//alert("SDJK")		
		//VisDock.finishChrome();
	},	
	mousemove : function() {
		if (VisDock.mode == "single"){
			var index = 0;
			RectMagLens.x = d3.mouse(Panel.panel[0][0])[0];
			RectMagLens.y = d3.mouse(Panel.panel[0][0])[1];
							
		} else {
			var index = this.getAttribute("id").split("MainPanel")[1];
			RectMagLens.xArray[index] = d3.mouse(Panel.panelArray[index][0][0])[0]; 
			RectMagLens.yArray[index] = d3.mouse(Panel.panelArray[index][0][0])[1]; 
			for (var i = 0; i < VisDock.svgArray.length; i ++) {
				if (i != index){
					d3.select("#MainPanel" + i).select("#clippedV").attr("display", "none");
				} else {
					d3.select("#MainPanel" + i).select("#clippedV").attr("display", "inline");
				}
			}
		}
		RectMagLens.update(index);	
	},
	mousewheel : function(evt) {
		
		var delta;
		if (evt.preventDefault)
			evt.preventDefault();
		evt.returnValue = false;		
		if (evt.wheelDelta){
			delta = evt.wheelDelta / 360;
			//alert(delta)
		// Chrome/Safari
		}
		else
			delta = evt.detail / -9;
		// Mozilla		
		//alert(delta)
		
		
		if (VisDock.mode == "single"){
			if (RectMagLens.scale + delta > 0.1)
				RectMagLens.scale += delta;
			RectMagLens.update(0);
		} else {
			var index = this.getAttribute("id").split("svgVisDock")[1];
			if (RectMagLens.scaleArray[index] + delta > 0.1)
				RectMagLens.scaleArray[index] += delta;
			RectMagLens.update(index);			
		}	
		//CircMagLens.uninstall();
		//CircMagLens.install();
		//alert("bbb")
			
		//alert("sss")	

		//alert("sss")		
	}	
};


/* The below code for CircMagLEns is derived from SVG lens code provided by
 * Bogotobogo: http://www.bogotobogo.com/svg_source/famoustiger.svg
 */
var CircMagLens = {
	name : "CircLens",
	image : "https://raw.github.com/VisDockHub/NewVisDock/master/master/images/CircMag.PNG",
	lensOn : 0,
	CP : [],
	CPArray: [],
	node : [],
	nodeArray : [],
	circle : [],
	CC : [],
	CCArray : [],
	cc : [],
	ccArray : [],
	cir : [],
	cirArray : [],
	cir2 : [],
	cir2Array : [],
	scale : 4,
	scaleArray : [],
	x : 0,
	xArray : [],
	y : 0,
	yArray : [],
	select : function() {
		console.log("select: " + CircMagLens.name);
		Toolbox.setTool(CircMagLens);
	},
	install : function() {
		//Panel.annotation.selectAll("rect").attr("pointer-events", "visiblePainted")
		
		var Chrome =(/Firefox/i.test(navigator.userAgent))? 0 : 1;
		if (Chrome && BirdView.birdinit) {
			BirdView.removeBirdView();
		}	

		var xmlns = "http://www.w3.org/2000/svg"; 
		var svgns = "http://www.w3.org/1999/xlink";

		if (VisDock.mode == "single"){
			Panel.panel.on("mousemove", CircMagLens.mousemove);
			VisDock.svg[0][0].addEventListener("mousewheel", this.mousewheel, false);
			VisDock.svg[0][0].addEventListener("DOMMouseScroll", this.mousewheel, false);
			Panel.viewport.selectAll("*").attr("pointer-events", "none");
			
			
			CircMagLens.CP = Panel.panel.append("clipPath").attr("id", "VisDock_CP");
			CircMagLens.cir = CircMagLens.CP.append("circle")
				.attr("cx", 0).attr("cy", 0).attr("r", 50/CircMagLens.scale*Panel.scale).attr("pointer-events", "none");
			CircMagLens.node = document.createElementNS(xmlns,'use');
			CircMagLens.CC = Panel.panel.append("g").attr("id", "clippedV");
			CircMagLens.cc = CircMagLens.CC.append('circle').attr('style', 'fill:white')
				.attr('cx', 0).attr('cy', 0).attr('r', 50/CircMagLens.scale*Panel.scale);
			CircMagLens.CC[0][0].appendChild(CircMagLens.node);
			
			CircMagLens.node.setAttributeNS(svgns,'xlink:href', '#VisDockViewPort');
			CircMagLens.node.setAttributeNS(null, "clip-path","url(#VisDock_CP)");
		
			CircMagLens.cir2 = CircMagLens.CC.append("circle")
				.attr("cx", 0).attr("cy", 0).attr("r", 50/CircMagLens.scale*Panel.scale)
				//.attr("style", "fill:none; stroke:gray; stroke-width:7").attr("pointer-events", "none")	
				.attr("style", "fill:none; stroke:gray; stroke-width:"+7/CircMagLens.scale*Panel.scale).attr("pointer-events", "none");
		//CircMagLens.CC.attr("transform", "scale("+CircMagLens.scale+")");//"matrix(" + c.a +","+ c.b + "," + c.c + "," + c.d + "," + c.e + "," + c.f + ")")//"scale(1.5)translate(0,0)")
			CircMagLens.CC.attr("display", "none");
		} else {
			for (var i = 0; i < VisDock.svgArray.length; i++){
				Panel.panelArray[i].on("mousemove", CircMagLens.mousemove);
				VisDock.svgArray[i][0][0].addEventListener("mousewheel", this.mousewheel, false);
				VisDock.svgArray[i][0][0].addEventListener("DOMMouseScroll", this.mousewheel, false);
				Panel.multiview[i].selectAll("*").attr("pointer-events", "none");

				if (CircMagLens.scaleArray[i] == undefined){
					CircMagLens.scaleArray[i] = 4;
					CircMagLens.xArray[i] = 0;
					CircMagLens.yArray[i] = 0;
				}
			
			
				CircMagLens.CPArray[i] = Panel.panelArray[i].append("clipPath").attr("id", "VisDock_CP" + i);
				CircMagLens.cirArray[i] = CircMagLens.CPArray[i].append("circle")
					.attr("cx", 0).attr("cy", 0).attr("r", 50/CircMagLens.scaleArray[i]*Panel.scaleArray[i])
					.attr("pointer-events", "none");
				CircMagLens.nodeArray[i] = document.createElementNS(xmlns,'use');
				CircMagLens.CCArray[i] = Panel.panelArray[i].append("g").attr("id", "clippedV");
				CircMagLens.ccArray[i] = CircMagLens.CCArray[i].append('circle').attr('style', 'fill:white')
					.attr('cx', 0).attr('cy', 0)
					.attr('r', 50/CircMagLens.scaleArray[i]*Panel.scaleArray[i]);
				CircMagLens.CCArray[i][0][0].appendChild(CircMagLens.nodeArray[i]);
			
				CircMagLens.nodeArray[i].setAttributeNS(svgns,'xlink:href', '#VisDockViewPort' + i);
				CircMagLens.nodeArray[i].setAttributeNS(null, "clip-path","url(#VisDock_CP" + i + ")");
		
				CircMagLens.cir2Array[i] = CircMagLens.CCArray[i].append("circle")
					.attr("cx", 0).attr("cy", 0)
					.attr("r", 50/CircMagLens.scaleArray[i]*Panel.scaleArray[i])
				//.attr("style", "fill:none; stroke:gray; stroke-width:7").attr("pointer-events", "none")	
					.attr("style", "fill:none; stroke:gray; stroke-width:"+7/CircMagLens.scaleArray[i]*Panel.scaleArray[i])
					.attr("pointer-events", "none");
		//CircMagLens.CC.attr("transform", "scale("+CircMagLens.scale+")");//"matrix(" + c.a +","+ c.b + "," + c.c + "," + c.d + "," + c.e + "," + c.f + ")")//"scale(1.5)translate(0,0)")
				CircMagLens.CCArray[i].attr("display", "none");			
			}
		}
		
		
		// Install Circular Magnifying Lens	


		
		CircMagLens.lensOn = 1;
		if (Chrome && BirdView.birdinit) {
			BirdView.restoreBirdView();//Panel.panel, BirdView.width, BirdView.height)
		}		
	},
	uninstall : function() {
		var Chrome =(/Firefox/i.test(navigator.userAgent))? 0 : 1;
		VisDock.startChrome();
		//if (Chrome && BirdView.birdinit) {
		//	BirdView.removeBirdView();
		//}
		CircMagLens.lensOn = 0;
		//this.CP = []
		
		if (VisDock.mode == "single"){
			this.CP.remove();
		//this.node = []
			this.node.remove();
		//this.circle = []
		//this.circle.remove();
			this.CC.remove();
		//this.CC = []
			this.cc.remove();
		//this.cc = []
			this.cir.remove();
		//this.cir = []
			this.cir2.remove();
		//this.cir2 = []	
			Panel.panel.on("mousemove", null);
			VisDock.svg[0][0].removeEventListener("DOMMouseScroll", this.mousewheel, false);
			VisDock.svg[0][0].removeEventListener("mousewheel", this.mousewheel, false);
			Panel.viewport.selectAll("*").attr("pointer-events", "visiblePainted");
		} else {
			for (var i = 0; i < VisDock.svgArray.length; i++){
				this.CPArray[i].remove();
		//this.node = []
				this.nodeArray[i].remove();
		//this.circle = []
		//this.circle.remove();
				this.CCArray[i].remove();
		//this.CC = []
				this.ccArray[i].remove();
		//this.cc = []
				this.cirArray[i].remove();
		//this.cir = []
				this.cir2Array[i].remove();
		//this.cir2 = []	
				Panel.panelArray[i].on("mousemove", null);
				VisDock.svgArray[i][0][0].removeEventListener("DOMMouseScroll", this.mousewheel, false);
				VisDock.svgArray[i][0][0].removeEventListener("mousewheel", this.mousewheel, false);
				Panel.multiview[i].selectAll("*").attr("pointer-events", "visiblePainted");				
			}
		}

		VisDock.finishChrome();
		//if (Chrome && BirdView.birdinit) {
		//	BirdView.init(Panel.panel, BirdView.width, BirdView.height)
		//}			
	},
	update : function(index) {
		var newx;
		var newy;
		var x;
		var y;	
		
		if (VisDock.mode == "single"){
			newx = (CircMagLens.scale - 1)*this.x;//d3.mouse(Panel.panel[0][0])[0];
			newy = (CircMagLens.scale - 1)*this.y;//d3.mouse(Panel.panel[0][0])[1];		
			CircMagLens.CC.attr("transform", "scale("+CircMagLens.scale+")");//"matrix(" + c.a +","+ c.b + "," + c.c + "," + c.d + "," + c.e + "," + c.f + ")")//"scale(1.5)translate(0,0)")
			CircMagLens.cir2.attr("cx", 0).attr("cy", 0).attr("r", 50/CircMagLens.scale*Panel.scale)
				.attr("style", "fill:none; stroke:gray; stroke-width:"+7/CircMagLens.scale*Panel.scale)
				.attr("pointer-events", "none");
			CircMagLens.cc.attr('style', 'fill:white')
				.attr('cx', 0).attr('cy', 0).attr('r', 50/CircMagLens.scale*Panel.scale);
			CircMagLens.cir.attr("cx", 0).attr("cy", 0).attr("r", 50/CircMagLens.scale*Panel.scale)
				.attr("pointer-events", "none");
			x = CircMagLens.x;//d3.mouse(Panel.panel[0][0])[0]
			y = CircMagLens.y;//d3.mouse(Panel.panel[0][0])[1]				

			CircMagLens.CC.attr("display", "inline");
			CircMagLens.node.setAttributeNS(null, "transform", "translate(" + (-1/CircMagLens.scale*newx) + 
					"," + (-1/CircMagLens.scale*newy) + ")");	
			
			CircMagLens.cir.attr("cx", x);//CircMagLens.scale*newx)
			CircMagLens.cir.attr("cy", y);//CircMagLens.scale*newy)
			
			CircMagLens.cc.attr("cx", (x/CircMagLens.scale)); //1.5^2*newx)
		//CircMagLens.cc.attr("cy", (y))
			CircMagLens.cc.attr("cy", (y/CircMagLens.scale)); //1.5^2*newy)			

			CircMagLens.cir2.attr("cx", (x/CircMagLens.scale));
		//CircMagLens.cir2.attr("cy", (y))
			CircMagLens.cir2.attr("cy", (y/CircMagLens.scale));
			
		} else {
			newx = (CircMagLens.scaleArray[index] - 1)*this.xArray[index];//d3.mouse(Panel.panel[0][0])[0];
			newy = (CircMagLens.scaleArray[index] - 1)*this.yArray[index];//d3.mouse(Panel.panel[0][0])[1];		
			CircMagLens.CCArray[index]
				.attr("transform", "scale("+CircMagLens.scaleArray[index]+")");//"matrix(" + c.a +","+ c.b + "," + c.c + "," + c.d + "," + c.e + "," + c.f + ")")//"scale(1.5)translate(0,0)")
			CircMagLens.cir2Array[index]
				.attr("cx", 0).attr("cy", 0).attr("r", 50/CircMagLens.scaleArray[index]*Panel.scaleArray[index])
				.attr("style", "fill:none; stroke:gray; stroke-width:"+7/CircMagLens.scaleArray[index]*Panel.scaleArray[index])
				.attr("pointer-events", "none");
			CircMagLens.ccArray[index].attr('style', 'fill:white')
				.attr('cx', 0).attr('cy', 0).attr('r', 50/CircMagLens.scaleArray[index]*Panel.scaleArray[index]);
			CircMagLens.cirArray[index].attr("cx", 0).attr("cy", 0)
				.attr("r", 50/CircMagLens.scaleArray[index]*Panel.scaleArray[index])
				.attr("pointer-events", "none");
			x = CircMagLens.xArray[index];//d3.mouse(Panel.panel[0][0])[0]
			y = CircMagLens.yArray[index];//d3.mouse(Panel.panel[0][0])[1]				

			CircMagLens.CCArray[index].attr("display", "inline");
			CircMagLens.nodeArray[index]
				.setAttributeNS(null, "transform", "translate(" + (-1/CircMagLens.scaleArray[index]*newx) + 
					"," + (-1/CircMagLens.scaleArray[index]*newy) + ")");	
			
			CircMagLens.cirArray[index].attr("cx", x);//CircMagLens.scale*newx)
			CircMagLens.cirArray[index].attr("cy", y);//CircMagLens.scale*newy)
			
			CircMagLens.ccArray[index].attr("cx", (x/CircMagLens.scaleArray[index])); //1.5^2*newx)
		//CircMagLens.cc.attr("cy", (y))
			CircMagLens.ccArray[index].attr("cy", (y/CircMagLens.scaleArray[index])); //1.5^2*newy)			

			CircMagLens.cir2Array[index].attr("cx", (x/CircMagLens.scaleArray[index]));
		//CircMagLens.cir2.attr("cy", (y))
			CircMagLens.cir2Array[index].attr("cy", (y/CircMagLens.scaleArray[index]));			
		}
		//VisDock.startChrome();
		//newx = d3.mouse(Panel.panel[0][0])[0] - (CircMagLens.scale - 1)*d3.mouse(Panel.panel[0][0])[0];
		//newy = d3.mouse(Panel.panel[0][0])[1] - (CircMagLens.scale - 1)*d3.mouse(Panel.panel[0][0])[1];

			//.attr("style", "fill:none; stroke:gray; stroke-width:7").attr("pointer-events", "none")
			
						

		

				
		//CircMagLens.node.setAttributeNS(null, "transform", "translate(" + (-1/CircMagLens.scale*x) + "," + (-1/CircMagLens.scale*y) + ")")
		

		//CircMagLens.cir.attr("transform", "translate("+newx)")

		//CircMagLens.cir.attr("cx", CircMagLens.scale*newx)
		//CircMagLens.cir.attr("cy", CircMagLens.scale*newy)
		
		//CircMagLens.cc.attr("cx", (x))///CircMagLens.scale))

		
		//CircMagLens.cir2.attr("cx", (x))

		//alert("SDJK")		
		//VisDock.finishChrome();
	},
	mousemove : function() {
		if (VisDock.mode == "single"){
			var index = 0;
			CircMagLens.x = d3.mouse(Panel.panel[0][0])[0];
			CircMagLens.y = d3.mouse(Panel.panel[0][0])[1];			
		} else {
			var index = this.getAttribute("id").split("MainPanel")[1];
			CircMagLens.xArray[index] = d3.mouse(Panel.panelArray[index][0][0])[0];
			CircMagLens.yArray[index] = d3.mouse(Panel.panelArray[index][0][0])[1];
			for (var i = 0; i < VisDock.svgArray.length; i ++) {
				if (i != index){
					d3.select("#MainPanel" + i).select("#clippedV").attr("display", "none");
				} else {
					d3.select("#MainPanel" + i).select("#clippedV").attr("display", "inline");
				}
			}				
		}
		

		CircMagLens.update(index);					
		
	},
	mousewheel : function(evt) {
		
		var delta;
		if (evt.preventDefault)
			evt.preventDefault();
		evt.returnValue = false;		
		if (evt.wheelDelta){
			delta = evt.wheelDelta / 360;
			//alert(delta)
		// Chrome/Safari
		}
		else
			delta = evt.detail / -9;
		// Mozilla		
		//alert(delta)
		
		if (VisDock.mode == "single"){
			if (CircMagLens.scale + delta > 0.1)
				CircMagLens.scale += delta;		
			CircMagLens.update(0);			
		} else {
			var index = this.getAttribute("id").split("svgVisDock")[1];
			if (CircMagLens.scaleArray[index] + delta > 0.1)
				CircMagLens.scaleArray[index] += delta;
			CircMagLens.update(index);	
		}
		

		//CircMagLens.uninstall();
		//CircMagLens.install();
		//alert("bbb")
		
		//alert("sss")		
	}
		
};

/*var CircMagLens = {
	name : "CircLens",
	image : "images/CircMag.PNG",
	CP : [],
	node : [],
	circle : [],
	CC : [],
	cc : [],
	cir : [],
	cir2 : [],
	scale : 1.5,
	select : function() {
		console.log("select: " + CircMagLens.name);
		Toolbox.setTool(CircMagLens);
	},
	install : function() {
		//Panel.annotation.selectAll("rect").attr("pointer-events", "visiblePainted")
		var xmlns = "http://www.w3.org/2000/svg"; 
		var svgns = "http://www.w3.org/1999/xlink"
		CircMagLens.CP = Panel.panel.append("clipPath").attr("id", "VisDock_CP")
		CircMagLens.cir = CircMagLens.CP.append("circle").attr("cx", 0).attr("cy", 0).attr("r", 50).attr("pointer-events", "none")
		CircMagLens.node = document.createElementNS(xmlns,'use');
		CircMagLens.CC = Panel.panel.append("g").attr("id", "clippedV")
		CircMagLens.cc = CircMagLens.CC.append('circle').attr('style', 'fill:white')
			.attr('cx', 0).attr('cy', 0).attr('r', 50)
		CircMagLens.CC[0][0].appendChild(CircMagLens.node)
		
		CircMagLens.node.setAttributeNS(svgns,'xlink:href','#VisDockViewPort');
		CircMagLens.node.setAttributeNS(null, "clip-path","url(#VisDock_CP)")
		
		CircMagLens.cir2 = CircMagLens.CC.append("circle").attr("cx", 0).attr("cy", 0).attr("r", 50)
			.attr("style", "fill:none; stroke:gray; stroke-width:7").attr("pointer-events", "none")	
		CircMagLens.CC.attr("transform", "scale(1.5)");//"matrix(" + c.a +","+ c.b + "," + c.c + "," + c.d + "," + c.e + "," + c.f + ")")//"scale(1.5)translate(0,0)")
		CircMagLens.CC.attr("display", "none")
		
		Panel.panel.on("mousemove", CircMagLens.mousemove);
		window.addEventListener("DOMMouseScroll", PanZoomTool.mousewheel, false);
		// do nothing
	},
	uninstall : function() {
		// do nothing
		//this.CP = []
		this.CP.remove();
		//this.node = []
		this.node.remove();
		//this.circle = []
		//this.circle.remove();
		this.CC.remove();
		//this.CC = []
		this.cc.remove();
		//this.cc = []
		this.cir.remove();
		//this.cir = []
		this.cir2.remove();
		//this.cir2 = []	
		Panel.panel.on("mousemove", null)	
		window.removeEventListener("DOMMouseScroll", CircMagLens.mousewheel, false);
	},
	mousemove : function() {
		var newx;
		var newy;
		var x;
		var y;	
		CircMagLens.scale = 1.5;
		
		newx = d3.mouse(Panel.panel[0][0])[0] - 0.5*d3.mouse(Panel.panel[0][0])[0];
		newy = d3.mouse(Panel.panel[0][0])[1] - 0.5*d3.mouse(Panel.panel[0][0])[1];
		x = d3.mouse(Panel.panel[0][0])[0]
		y = d3.mouse(Panel.panel[0][0])[1]
		CircMagLens.CC.attr("display", "inline")	
		//alert(CircMagLens.scale + " " + 1/CircMagLens.scale)
				CircMagLens.node.setAttributeNS(null, "transform", "translate(" + (-0.67*newx) + "," + (-0.67*newy) + ")scale(1)")
				
		//CircMagLens.node.setAttributeNS(null, "transform", "translate(" + (-1/CircMagLens.scale*newx) + "," + (-1/CircMagLens.scale*newy) + ")scale(1)")
		
		CircMagLens.cir.attr("cx", 1.5^2*newx)//Math.pow(CircMagLens.scale,2)*newx)
		CircMagLens.cir.attr("cy", 1.5^2*newx)//Math.pow(CircMagLens.scale,2)*newy)
		CircMagLens.cc.attr("cx", x/1.5)//x/CircMagLens.scale) //1.5^2*newx)
		CircMagLens.cc.attr("cy", y/1.5)//y/CircMagLens.scale) //1.5^2*newy)
		CircMagLens.cir2.attr("cx", x/1.5)//x/CircMagLens.scale)
		CircMagLens.cir2.attr("cy", y/1.5)//y/CircMagLens.scale)			
	},
	mousewheel : function(evt) {
		var delta;
		if (evt.preventDefault)
			evt.preventDefault();
		evt.returnValue = false;		
		if (evt.wheelDelta)
			delta = evt.wheelDelta / 360;
		// Chrome/Safari
		else
			delta = evt.detail / -9;
		// Mozilla		
		CircMagLens.scale = delta;
	}
		
};*/


/* We partially use the SVG lens code provided by
 * Bogotobogo: http://www.bogotobogo.com/svg_source/famoustiger.svg
 * to make the BirdView functionality
 */
var BirdView = {
	panel : null,
	x : 0,
	y : 0,
	width : 0,
	height : 0,
	birdinit : 0,
	box : [],
	Bird : [],
	birdview : [],
	birdclipped : [],
	sx : 1,
	sy : 1,
	T : 0,
	s_x : 1,
	s_y : 1,
	w: 0,
	h: 0,
	scale : 1,
	rotation : 0,
	zoomScale : 0.8,
	box : null,
	viewport : null,
	
	viewbound : null,
	start : null,

	init : function(svg, width, height) {
		BirdView.birdinit = 1;
		BirdView.width = width;
		BirdView.height = height;
		var xmlns = "http://www.w3.org/2000/svg"; 
		// Create the bird's eye view panel group
		this.x = 0;
		this.y = (height - height / 4);
		
		VisDock.panel = svg.append("g").attr("transform", "translate(" + 0 + ", " + (height - height / 4) + ")");

		//this.box = VisDock.panel.append("rect").attr("width", width).attr("height", width).attr("rx", 10).attr("ry", 10)
		//.attr("id", "birdView").attr("class", "birdView");

		var clipped = VisDock.panel.append("g").attr("width", width).attr("height", width).attr("clip-path", "url(#birdView)");

		// Set the clip path for the new panel
		var clip = VisDock.svg.append("clipPath").attr("id", "birdView");
		clip.append("rect").attr("width", width).attr("height", width).attr("rx", 10).attr("ry", 10);
		
		//.attr("transform", "translate(" + 0 + ", " + (height - height/4) + ")");

		// Create the viewport
		VisDock.viewport = clipped.append("g").attr("rx", 10).attr("ry", 10).attr("id", "BirdViewPort");
		VisDock.viewbound = clipped.append("rect").attr("width", 0).attr("height", 0).attr("rx", 10).attr("ry", 10)
		.attr("id", "birdBound").attr("x", 0).attr("y", 0).attr("fill", "white").attr("stroke", "black").attr("stroke-width", 2).attr("fill-opacity", 1).attr("class", "birdBound");
		/*
		 // Demonstrates clipping
		 this.viewport.append("ellipse")
		 .attr("cx", (width - dockWidth) / 2)
		 .attr("cy", height / 2)
		 .attr("rx", width / 1.5)
		 .attr("ry", height / 1.5)
		 .attr("style", "fill: red;");
		 */
		//var VisBirdCP = this.viewbound;
		/*var svgns = 'http://www.w3.org/1999/xlink'
		var Bird = document.createElementNS(xmlns,'use');
		Bird.setAttributeNS(svgns,'xlink:href','#VisDockViewPort');
		Bird.setAttributeNS(null, "clip-path","url(#birdView)")
		Bird.setAttributeNS(null, "transform", "scale(0.1)")*/
		
		// initialize bird eye
		var h = height / width * dockWidth;
		this.w = width - dockWidth;
		this.h = dockHeight + queryHeight - 8;
		this.birdview = VisDock.svg.append("g").attr("transform", "translate(" + (width - dockWidth) + "," + (dockHeight + queryHeight + query_box_height - 8) + ")")
							.attr("id", "BirdViewCanvas");
		this.birdclipped = this.birdview.append("clipPath").attr("id","BirdClipped");
		this.birdview.append("rect").attr("rx", 5).attr("ry", 5).attr("width", dockWidth).attr("height", h)
			.attr("fill", "white").attr("stroke", "black").attr("clip-path", "url(#BirdClipped)");
		this.birdclipped.append("rect").attr("rx", 5).attr("ry", 5).attr("width", width).attr("height", height).attr("fill", "white").attr("stroke", "black");


		var svgns = 'http://www.w3.org/1999/xlink';
		var scaleX = dockWidth / width;
		var scaleY = h / height;
		this.s_x = scaleX;
		this.s_y = scaleY;
		
		// Create BirdView Panel
		var panelClipped = this.birdview.append("clipPath").attr("id", "birdViewPanel");
		panelClipped.append("rect").attr("width", width * scaleX).attr("height", height * scaleY)
			.attr("transform", "scale("+ (1/this.s_x) + "," + (1/this.s_y) + ")")
			.attr("id", "clippedView");
		//panelClipped.append("rect").attr("width", width).attr("height", height)
			//.attr("transform", "scale("+ this.s_x + "," + this.s_y + ")")
			//.attr("id", "clippedView");
		
		this.Bird = document.createElementNS(xmlns,'use');
		this.Bird.setAttributeNS(svgns,'xlink:href','#MainPanel');
		this.Bird.setAttribute("clip-path", "url(#birdViewPanel)");
		//this.Bird.setAttributeNS(null, "clip-path","url(#BirdClipped)");
		this.Bird.setAttributeNS(null, "transform", "scale(" + scaleX + "," + scaleY + ")");
		
		//var frameClipped = this.birdview.append("clipPath").attr("id", "frameClipped");
		this.birdview[0][0].appendChild(this.Bird);	
		var frame = this.birdview.append("rect").attr("rx", 5).attr("ry", 5).attr("width", width).attr("height", height)
			.attr("style", "fill:white; stroke-width: " + (10 * 1/scaleX) + "; stroke: red; opacity:0.5").attr("stroke", "black")
			.attr("transform", "scale(" + scaleX + "," + scaleY + ")").attr("id", "BirdFrame")
			.attr("clip-path", "url(#birdViewPanel)");
		this.T = this.Bird.getCTM();		
	},
	install : function() {
		//VisDock.eventHandler = true;
		//alert(VisDock.eventHandler)
		BirdView.viewbound.selectAll("*").attr("pointer-events", "none");
		BirdView.viewbound.on("mousedown", BirdView.mousedown);
		BirdView.viewbound.on("mouseover", function() {
			window.addEventListener("mousewheel", BirdView.mousewheel, false);
			window.addEventListener("DOMMouseScroll", BirdView.mousewheel, false);
		});
		BirdView.viewbound.on("mouseout", function() {
			window.removeEventListener("mousewheel", BirdView.mousewheel, false);
			window.removeEventListener("DOMMouseScroll", BirdView.mousewheel, false);
		});
	},

	mousedown : function() {
		//alert(this);
		BirdView.start = d3.mouse(this);
		BirdView.viewbound.on("mousemove", function() {
			var curr = d3.mouse(this);

			BirdView.pan(curr[0] - BirdView.start[0], curr[1] - BirdView.start[1]);
			BirdView.start = curr;
		});
		BirdView.viewbound.on("mouseup", function() {
			BirdView.viewbound.on("mousemove", null);
			BirdView.viewbound.on("mouseup", null);
		});
	},

	mousewheel : function(evt) {
		// Prevent default behavior (scrolling)
		if (evt.preventDefault)
			evt.preventDefault();
		evt.returnValue = false;
		// Now determine the amount of zoom
		var delta;
		if (evt.wheelDelta)
			delta = evt.wheelDelta / 360;
		// Chrome/Safari
		else
			delta = evt.detail / -9;
		// Mozilla
		// @@@ Still need to determine exact mouse position wrt viewport!
		BirdView.zoom(evt.clientX - 8, evt.clientY - 8, delta);
	},

	StartBound : function(width, height, tx, ty, sx, sy) {
		BirdView.sx = sx;
		BirdView.sy = sy;
		BirdView.viewbound.attr("width", (width * sx)).attr("height", (height * sx));
		BirdView.install();
	},

	pan : function(dx, dy) {
		BirdView.x += (dx / BirdView.scale);
		BirdView.y += (dy / BirdView.scale);
		BirdView.setTransform();
	},

	zoom : function(px, py, delta) {
		var dz = Math.pow(1 + this.zoomScale, delta);
		this.x -= px / this.scale - px / (this.scale * dz);
		this.y -= py / this.scale - py / (this.scale * dz);
		this.scale *= dz;
		this.setTransform();
	},

	rotate : function(delta) {
		BirdView.rotation -= delta * 10.0;
		BirdView.setTransform();
	},

	setTransform : function() {
		BirdView.viewbound.attr("transform", "scale(" + BirdView.scale + ")" + "translate(" + BirdView.x + " " + BirdView.y + ") " + "rotate(" + BirdView.rotation + ")");
	},

	applyInverse : function(invTransform, view) {
		if (VisDock.mode == "single"){
			var svgRoot = VisDock.svg[0][0];
			var ps = svgRoot.createSVGPoint();
			var pw = ps.matrixTransform(invTransform);
		} else {
			var index = view.getAttribute("id").split("MainPanel")[1];
			var svgRoot = VisDock.svgArray[index][0][0];
			var ps = svgRoot.createSVGPoint();
			var pw = ps.matrixTransform(invTransform);			
		}

	},

	reset : function() {
		this.dx = this.dy = 0;
		this.scale = 1.0;
		this.rotation = 0;
		BirdView.viewbound.attr("transform", "");
	},
	removeBirdView : function() {
		var svgns = "http://www.w3.org/1999/xlink";		
		BirdView.Bird.setAttributeNS(svgns,'xlink:href', null);
		//VisDock.svg.select("#BirdViewCanvas").remove();
	},
	restoreBirdView : function() {
		var svgns = "http://www.w3.org/1999/xlink";		
		BirdView.Bird.setAttributeNS(svgns,'xlink:href','#VisDockViewPort');
	}
};
var Toolbox = {
	dock : null,
	currTool : null,
	inclusive : 1,
	move: 0,
	x : 0,
	y : dockHeight - dockHeight / 4 - 4,
	scale : 1,
	panelbox : null,
	hideorshow : 1,
	tools : [PointerTool, RectangleTool, EllipseTool, LassoTool, Straight, Polyline, Freeselect,
	 PolygonTool, PanZoomTool, RotateTool, AnnotatedByPointTool, AnnotatedByAreaTool, AnnotatedByData, RectMagLens, CircMagLens],

	init : function(svg, width, height) {

		// Create a group
		this.dock = svg.append("g").attr("transform", "translate(" + (width - dockWidth + 1) + ", 0)")
						.attr("class", "ToolDock").style("display","none");

		// Create the main button panel
		/*

		.attr("x", 0)
		.attr("y", 0)
		//.attr("rx", 20)
		//.attr("ry", 20)
		.attr("width", dockWidth)
		.attr("height", height)
		.attr("class", "dock");*/
		// Create the main button panel
		this.panelbox = this.dock.append("rect").attr("x", 0).attr("y", 0).attr("width", dockWidth).attr("height", dockHeight).attr("class", "dock");

		var MinMax = this.dock.append("polygon").attr("class", "MinMax")

		//.attr("y",padding)
		.attr("points", "185,10 197,10 191,1 ")
		//.attr("x",dockWidth - 20)
		//.attr("width",20)
		//.attr("height",11)
		.attr("fill", "black")
		//.attr("stroke","black")
		//.attr("stroke-width",0.5)
		//.attr("fill-opacity", 1)
		.on("click", function() {
			if (Toolbox.hideorshow == 1) {
				Toolbox.hideorshow = 0;
				//this.setAttributeNS(null,"fill","crimson")
				//MinMaxImage.attr("transform", "rotate(180)");
				this.setAttributeNS(null, "points", "185,1 191,10 197,1 ");
				//BirdView.panel.attr("display", "none");
				for (var i = 0; i < Toolbox.tools.length; i++) {
					button[i].attr("display", "none");

				}
				Toolbox.panelbox.attr("height", 20);
				QueryManager.dock.attr("display", "none");
				checkbox.attr("display", "none");
			} else {
				Toolbox.hideorshow = 1;
				this.setAttributeNS(null, "points", "185,10 197,10 191,1");
				//  this.setAttributeNS(null,"fill","lightgreen")
				//MinMaxImage.attr("transform", "rotate(180)");
				//BirdView.panel.attr("display", "inline");
				for (var i = 0; i < Toolbox.tools.length; i++) {
					button[i].attr("display", "inline");
				}
				Toolbox.panelbox.attr("height", dockHeight);
				QueryManager.dock.attr("display", "inline");
				checkbox.attr("display", "inline");
			}
		});
		//.attr("transform", "rotation(180)");
		/*
		 var MinMaxImage = MinMax.append("svg:image")
		 .attr("x", 0)
		 .attr("y", 0)
		 .attr("width", 24)
		 .attr("height", 24)
		 //.attr("id", "arrowimage")
		 .attr("xlink:href", "images/DownArrow.png");*/

		var title = this.dock.append("text").attr("class", "title").attr("text-anchor", "middle").text("VisDock v" + VERSION);
		var button = [];
		//adds the bird's eye view of the visualizatio
		//BirdView.init(this.dock, dockWidth, height);

		// Figure out the vertical offset
		var offset = parseInt(title.style("font-size"), 10);
		title.attr("x", dockWidth / 2).attr("y", offset);

		offset += padding / 2;

		// Create the buttons
		for (var i = 0; i < this.tools.length; i++) {

			// Create the button group
			var xPos = (i % numButtonCols) * buttonOffset + padding;
			var yPos = Math.floor(i / numButtonCols) * (3 / 4) * buttonOffset + offset;
			button[i] = this.dock.append("g").attr("transform", "translate(" + xPos + ", " + yPos + ")").on("click", this.tools[i].select);

			// Create the button panel
			button[i].append("rect").attr("x", 0).attr("y", 0).attr("rx", 10).attr("ry", 10).attr("width", buttonSize).attr("height", buttonHeight)
				.attr("id", this.tools[i].name).attr("class", "button");
				//.attr("style", "fill: white");

			// Create the label
			button[i].append("svg:text").attr("x", buttonSize / 2).attr("y", (buttonHeight * 3 / 4 + 10)).attr("text-anchor", "middle").attr("class", "label").text(this.tools[i].name);

			button[i].append("svg:image").attr("x", (buttonSize / 4)).attr("y", (buttonHeight / 10) + 0).attr("width", buttonSize / 2).attr("height", buttonSize / 2).attr("xlink:href", this.tools[i].image);

		}
		// Create Checkbox
		var yPos = Math.floor(this.tools.length / numButtonCols) * (3/4)*buttonOffset + offset;
		var checkbox = this.dock.append("g").attr("class", "borderline").attr("transform", "translate(25, " + (yPos + 4) + ")");
		checkbox.append("rect")//.attr("transform", "translate(25, " + (yPos - 2) + ")")//.attr("x", 25).attr("y", yPos - 2)
			.attr("width", 15).attr("height", 15)//alert("CSDCS")
			.attr("fill", "white");
		//.attr("stroke","black")
		//.on("click",function(){alert(checked)})
		var checked = checkbox.append("svg:image")//.attr("transform", "translate(25, " + (yPos - 2) + ")")//.attr("x", 25).attr("y", yPos - 2)
			.attr("width", 15).attr("height", 15).attr("xlink:href", "https://raw.github.com/VisDockHub/NewVisDock/master/master/images/checkbox_yes.png").on("click", function() {
			if (Toolbox.inclusive == true) {
				Toolbox.inclusive = false;
				//alert("0")
				checked.attr("xlink:href", "https://raw.github.com/VisDockHub/NewVisDock/master/master/images/checkbox_no.png");
				//checked.setAttributeNS(null,"xlink:href", "images/checkbox_no.png")
			} else {
				Toolbox.inclusive = true;
				//alert("1")
				checked.attr("xlink:href", "https://raw.github.com/VisDockHub/NewVisDock/master/master/images/checkbox_yes.png");
				//checked.setAttributeNS(null,"xlink:href", "images/checkbox_yes.png")
			}

		});
		//alert(checked.attr("xlink:href"))
		checkbox.append("text").text("Borderline Inclusive").attr("transform", "translate(20,13)");//.attr("x", 42).attr("y", yPos + 11).text("Borderline Inclusive")
	},

	setTool : function(tool) {

		// No need to change if already selected
		if (tool == this.currTool)
			return;

		// Uninstall old tool
		if (this.currTool != null)
			this.currTool.uninstall();

		// Install new tool
		tool.install();

		// Update interface
		this.currTool = tool;
		this.dock.selectAll(".button").attr("style", "fill: white;");
		this.dock.selectAll("#" + tool.name).attr("style", "fill: white; stroke: khaki; stroke-width: 5");
		//this.dock.selectAll("#" + tool.name).attr("style", "fill: khaki;");
	},

	select : function(SelectType, polygon, inclusive) {
		if (VisDock.eventHandler != null) {
			/*if (VisDock.numSvgPolygon == 0) {
				VisDock.numSvgPolygon = document.getElementsByTagName("polygon").length;
			}
			if (VisDock.numSvgRect == 0) {
				VisDock.numSvgRect = document.getElementsByTagName("rect").length;
			}
			if (VisDock.numSvgCircle == 0) {
				VisDock.numSvgCircle = document.getElementsByTagName("circle").length;
			}
			if (VisDock.numSvgEllipse == 0) {
				VisDock.numSvgEllipse = document.getElementsByTagName("ellipse").length;
			}
			if (VisDock.numSvgStraight == 0) {
				VisDock.numSvgStraight = document.getElementsByTagName("line").length;
			}
			if (VisDock.numSvgPolyline == 0) {
				VisDock.numSvgPolyline = 0;
			}
			if (VisDock.numSvgPath == 0) {
				VisDock.numSvgPath = document.getElementsByTagName("path").length;
			}*/
			num0 = num;
			
			var Chrome =(/Firefox/i.test(navigator.userAgent))? 0 : 1;
			/*if (Chrome && BirdView.birdinit) {
				BirdView.removeBirdView();
			}*/			
			if (SelectType == "Lasso") {
				VisDock.captured[num] = VisDock.eventHandler.getHitsPolygon(polygon, inclusive);
			} else if (SelectType == "Polygon") {
				VisDock.captured[num] = VisDock.eventHandler.getHitsPolygon(polygon, inclusive);
			} else if (SelectType == "Rectangle") {
				VisDock.captured[num] = VisDock.eventHandler.getHitsPolygon(polygon, inclusive);
			} else if (SelectType == "Ellipse") {
				VisDock.captured[num] = VisDock.eventHandler.getHitsEllipse(polygon, inclusive);
			} else if (SelectType == "Straight" || SelectType == "Polyline" || SelectType == "Freeselect") {
				VisDock.captured[num] = VisDock.eventHandler.getHitsLine(polygon, inclusive);
			}

			// Get the items selected from the host visualization
			//alert(VisDock.captured[num])
			VisDock.startChrome();
			// Create a new layer for this selection
			if (VisDock.captured[num].length != 0) {
				num++;
				//			alert("hi")
				VisDock.eventHandler.setColor(VisDock.captured[num - 1]);
				query_posy = (num - 1) * query_box_height;
				//var query = QueryManager.dock.append("g")
				//    .attr("transform", "translate(" + query_posx + ", " + query_posy + ")")
				/*
				 var query = QueryManager.dock.append("g")
				 .attr("transform", "translate(0, " + query_posy + ")")
				 query.append("rect")
				 .attr("x", 0).attr("y", 0)
				 .attr("width",queryWidth)
				 .attr("height",query_box_height)
				 .attr("style","fill: " + VisDock.color[num-1]);
				 query.append("svg:text")
				 .attr("x", queryWidth / 2)
				 .attr("y", query_box_height / 2)
				 .attr("text-anchor","middle")
				 .text("Query " + num);*/
				QueryManager.addQuery();
			}
			VisDock.finishChrome();
			/*if (Chrome && BirdView.birdinit) {
				BirdView.restoreBirdView();
			}*/		
			// Set selection color for this set of ids
		}
	},
	/*tranform of master to move birdview
	 //this.x += (( birdView.width / Panel.width) * dx) / Panel.scale;
	 //this.y += (( birdView.width / Panel.width) * dy) / Panel.scale;
	 this.x -= (birdviewbound.width / width)* dx / Panel.scale;
	 this.y -= ((birdviewbound.height)/dockHeight) * dy / Panel.scale;
	 this.setTransform();
	 },

	 // zoom: function(px, py, delta) {
	 // var dz = Math.pow(1 + this.zoomScale, delta);
	 // this.x += px / this.scale - px / (Panel.scale * dz);
	 // this.y += py / this.scale - py / (Panel.scale * dz);
	 // this.scale *= dz;
	 // birdviewbound.attr("transform",
	 // "scale(" + this.scale + ")");
	 // //this.setTransform();
	 //},

	 rotate: function(delta) {
	 Panel.rotation += delta * 10.0;
	 this.setTransform();
	 }

	 setTransform: function() {
	 var scalef = 1/Panel.scale;
	 birdviewbound.attr("transform",
	 "scale(" + 1/this.scale + ")" +
	 "translate(" + this.x + " " + this.y + ") " +
	 "rotate(" + Panel.rotation + ")");
	 },

	 reset: function() {
	 this.dx = this.dy = 0;
	 Panel.scale = 1.0;
	 Panel.rotation = 0;
	 this.viewport.attr("transform", "");
	 },*/
};

var QueryManager = {
	dock : null,
	names : [],
	names2 : [],
	query : [],
	querytoggle : [],
	querybox : [],
	position : [],
	type : [],
	annoText : [],
	annoWidth: [],
	annoHeight: [],	
	annotation : [],
	annotationtoggle : [],
	annotationbox : [],
	annotationtoggle : [],
	annotationindex : 0,
	layers : [],
	colorbutton : [],
	changecolor : [],
	colors : [],
	exit : [],
	hide : [],
	visibility : [],
	margin : 5,
	t_width : 20, // transparency button width
	c_width : 40, // colour button width
	e_width : 0, // exit button width
	b_width : 20, // scroll bar width
	b_height : 8 * query_box_height,
	b_pos_y : 0, // initial scroll bar y position
	b_posy : 0, // scroll bar y position before change
	ScrollHeight : 0,
	ScrollbHeight : 0,
	ScrollBar : [],
	percentile : [],
	percent : [],
	Bar : [],
	correct : 0,
	x1 : queryWidth / 2 - 25,
	x2 : queryWidth / 1.5 - 25,
	x3 : 0,
	x4 : 0,
	relative : 0,
	trashtoggle : 0,
	uniontoggle : 0,
	commontoggle : 0,
	xortoggle : 0,
	remove : 0,
	extra : 0,
	removed : [],
	init : function(svg, width, height) {},
	addQuery : function() {
		if (VisDock.color[num - 1] == undefined) {
			VisDock.color[num - 1] = "black";
		}
		QueryManager.position[numAnno + num - 1] = numAnno + num - 1 + QueryManager.remove;
		QueryManager.type[numAnno + num - 1] = "q";
		query_posy = (numAnno + num - 1) * query_box_height;
		var margin = QueryManager.margin;
		
		var t_width = QueryManager.t_width; // transparency button width
		var c_width = QueryManager.c_width; // colour button width
		var e_width = QueryManager.e_width; //query_box_height-margin*2= exit button width
		var b_width = QueryManager.b_width; // scroll bar width
		var b_height = QueryManager.b_height; //8*query_box_height;
		var b_pos_y = QueryManager.b_pos_y; // initial scroll bar y position

		var x1 = QueryManager.x1;
		//queryWidth/2-25;
		var x2 = QueryManager.x2;
		//queryWidth/1.5-25;
		var x3 = QueryManager.x3;
		//x2 + c_width + margin;
		var x4 = QueryManager.x4;
		//x2 + c_width + 2*margin + e_width + 2;
		var transy = (query_posy + query_box_height * (QueryManager.remove + QueryManager.relative));

		QueryManager.query[num - 1] = [];
		QueryManager.querybox[num - 1] = [];
		QueryManager.exit[num - 1] = [];
		QueryManager.names[num - 1] = [];
		QueryManager.query[num - 1] = QueryManager.dock.append("g").attr("transform", "translate(0, " + (query_posy + query_box_height * (QueryManager.remove + QueryManager.relative)) + ")")
										.attr("class", "QueryBox");

		QueryManager.querybox[num - 1] = QueryManager.query[num - 1].append("rect").attr("class", num - 1).attr("x", 0).attr("y", 0).attr("rx", 2 * margin).attr("ry", 2 * margin).attr("width", queryWidth - QueryManager.b_width).attr("height", query_box_height).attr("style", "fill: white;stroke:black").on("click", function() {
			var index = parseInt(this.getAttributeNS(null, "class"));

			var del = QueryManager.querytoggle.indexOf(index);
			var k = QueryManager.querytoggle.length;
			if (del == -1) {
				this.setAttributeNS(null, "style", "fill: burlywood; stroke:black");
				QueryManager.querytoggle[k] = index;
			} else {
				this.setAttributeNS(null, "style", "fill: white; stroke:black");
				QueryManager.querytoggle.splice(del, 1);
			}
			if (VisDock.eventHandler.QueryClick != undefined) {
				VisDock.eventHandler.QueryClick(QueryManager.layers, index);
			};//alert(QueryManager.querytoggle)
		}).on("dblclick", function() {
			var index = parseInt(this.getAttributeNS(null, "class"));
			var str = "Query " + (index + 1).toString();
			var newname = prompt("Enter new query name please", str);
			var str = [];
			if (newname.length > 7) {
				for (var j = 0; j < 7; j++) {
					str = str + newname[j];
				}
				str = str + "...";
			} else {
				str = newname;
			}
			if (newname != null) {
				QueryManager.names[index]// = QueryManager.query[index].append("svg:text")
				.text(str);
			};
		});
		/*
		 QueryManager.query[num-1].append("svg:rect")
		 .attr("class",num-1)
		 .attr("x",x1)
		 .attr("y",margin)
		 .attr("height", query_box_height-margin*2)
		 .attr("width",t_width)
		 .attr("style","fill: " + VisDock.color[num-1] + ";stroke:black")
		 .on("click",function(){var newcolor=prompt("Please enter new color","green");
		 var index = parseInt(this.getAttributeNS(null,"class"));
		 if (newcolor != null){
		 QueryManager.colors[index] = newcolor;
		 //alert(this.getAttributeNS(null,"style"))
		 this.setAttributeNS(null,"style","fill:" + newcolor + ";stroke:black")
		 VisDock.eventHandler.changeColor(newcolor, QueryManager.layers[index], index);
		 }
		 });*/
		QueryManager.colorbutton[num - 1] = QueryManager.query[num - 1].append("svg:rect").attr("class", num - 1).attr("x", x1).attr("y", margin).attr("height", query_box_height - margin * 2).attr("width", t_width).attr("style", "fill: " + VisDock.color[num - 1] + ";stroke:black").on("click", function() {//alert(namedColors.length)
			//var newcolor = [];
			var index = this.getAttributeNS(null, "class");
			var margins = 1;
			var colorsize = 10;
			var colortext = 12;
			var colorheight = colortext + margin + 6 * colorsize;
			var colorwidth = margin + 6 * colorsize;
			var colorbox = QueryManager.dock.append("g").attr("transform", "translate(" + QueryManager.x1 + "," + (transy + query_box_height) + ")");
			colorbox.append("rect").attr("height", colorheight).attr("width", colorwidth).attr("fill", "white").attr("stroke", "black");
			colorbox.append("text").attr("y", colortext + 2 * margins).text("Colors");
			colorbox.append("rect").attr("x", (colorwidth - 3 * margins - colorsize)).attr("y", (3 * margins)).attr("width", colorsize).attr("height", colorsize).attr("fill", "white").attr("stroke", "black").on("click", function() {
				colorbox.remove();
			});
			for (var i = 0; i < 6; i++) {
				for (var j = 0; j < 6; j++) {
					var x = margins * j + colorsize * j;
					var y = colortext + 4 * margins + colorsize * i;
					var cbox = colorbox.append("rect").attr("id", colorchoose[i][j]).attr("x", x).attr("y", y).attr("height", colorsize).attr("width", colorsize).attr("stroke", "black").attr("fill", colorchoose[i][j]).on("click", function() {
						var str = this.getAttributeNS(null, "id");
						QueryManager.changecolor = str;
						QueryManager.colorbutton[index].attr("style", "fill: " + str + ";stroke:black");
						VisDock.eventHandler.changeColor(str, QueryManager.layers[index], index);
						QueryManager.colors[index] = str;
						colorbox.remove();
					});
				}
			}
		});
		QueryManager.query[num - 1].append("svg:rect").attr("class", num - 1).attr("x", x2).attr("y", margin).attr("height", query_box_height - margin * 2).attr("width", c_width).attr("style", "fill: darkgrey; stroke: black").on("click", function() {
			var visibility = prompt("Please enter new visibility", "1");
			var index = parseInt(this.getAttributeNS(null, "class"));
			if (visibility != null) {
				QueryManager.visibility = visibility;
				//alert(this.getAttributeNS(null,"style"))
				//this.setAttributeNS(null,"style","fill:" + newcolor + ";stroke:black")
				VisDock.eventHandler.changeVisibility(visibility, QueryManager.layers[index], index);
				var L = parseFloat(visibility) * c_width;
				//alert(QueryManager.percentile[index])
				QueryManager.percentile[index].attr("width", L);//;alert("DSJKL")
				QueryManager.percent[index].text(parseInt(visibility * 100) + "%");
			};//alert("outer")
		});
		var L = VisDock.opacity * c_width;
		this.percentile[num - 1] = QueryManager.query[num - 1].append("svg:rect").attr("class", num - 1).attr("x", x2).attr("y", margin).attr("height", query_box_height - margin * 2).attr("width", L).attr("style", "fill: midnightblue; stroke: black").on("click", function() {
			var visibility = prompt("Please enter new visibility", "1");
			var index = parseInt(this.getAttributeNS(null, "class"));
			if (visibility != null) {
				QueryManager.visibility = visibility;
				VisDock.eventHandler.changeVisibility(visibility, QueryManager.layers[index], index);
				var L = parseFloat(visibility) * c_width;
				//alert(visibility)
				this.setAttributeNS(null, "width", L);
				//alert("percent bar")
				QueryManager.percent[index].text(parseInt(visibility * 100) + "%");
			}
		});
		this.percent[num - 1] = QueryManager.query[num - 1].append("text").attr("class", num - 1).attr("x", (x2 + margin)).attr("y", query_box_height / 2 + QueryManager.margin).attr("style", "fill: white")
		//.attr("height", query_box_height-margin*2)
		//.attr("width",L)
		//.attr("style","fill: aquamarine; stroke: blue")
		.text(parseInt(VisDock.opacity * 100) + "%").on("click", function() {
			var visibility = prompt("Please enter new visibility", "1");
			var index = parseInt(this.getAttributeNS(null, "class"));
			var str;
			if (visibility != null) {
				QueryManager.visibility = visibility;
				VisDock.eventHandler.changeVisibility(visibility, QueryManager.layers[index], index);
				var L = parseFloat(visibility) * c_width;
				str = parseInt(visibility * 100);
				QueryManager.percentile[index].attr("width", L);
				QueryManager.percent[index].text(str.toString() + "%");
			}
		});
		QueryManager.exit[num - 1] = QueryManager.query[num - 1].append("svg:rect").attr("transform", "translate(" + x3 + "," + margin + ")").attr("class", num - 1).attr("x", 0)//x3)
		.attr("y", 0)//margin)
		.attr("height", query_box_height - margin * 2).attr("width", e_width).attr("style", "fill: white; stroke: black").on("click", function() {
			var index = parseInt(this.getAttributeNS(null, "class"));
			QueryManager.remove -= 1;
			//alert(QueryManager.remove)
			VisDock.captured[index] = [];
			//.splice(index,1);
			QueryManager.query[index].remove();

			QueryManager.removed.push(index);
			VisDock.eventHandler.removeColor(QueryManager.layers[index], index);
			var index2 = 0;
			var add = 0;
			var i = 0;
			//alert(num+numAnno-1);
			while (i <= num + numAnno - 1) {
				if (QueryManager.type[i] == "q") {
					if (add == index) {
						index2 = i;
						i = num + numAnno;
					}
					add++;
				}
				i++;
			};

			for (var i = index2; i <= num + numAnno - 1; i++) {
				QueryManager.position[i] -= 1;
			};
			var add = 0;
			var add2 = 0;
			for (var i = 0; i <= num + numAnno - 1; i++) {
				var move = ((QueryManager.relative + QueryManager.position[i]) * query_box_height);
				if (QueryManager.type[i] == "q") {
					QueryManager.query[add].attr("transform", "translate(0," + (move) + ")");
					//alert(move);
					if (move <= 7 * query_box_height && move >= 0) {
						QueryManager.query[add].attr("display", "inline");
					} else {
						QueryManager.query[add].attr("display", "none");
					}
					add++;
				} else {
					QueryManager.annotation[add2].attr("transform", "translate(0," + (move) + ")");
					//alert(move);
					if (move <= 7 * query_box_height && move >= 0) {
						QueryManager.annotation[add2].attr("display", "inline");
					} else {
						QueryManager.annotation[add2].attr("display", "none");
					}
					add2++;
				}
			}
			if (QueryManager.ScrollbHeight < QueryManager.ScrollHeight) {
				QueryManager.ScrollbHeight = QueryManager.ScrollHeight - (num - 8 + QueryManager.remove) * QueryManager.ScrollHeight / (num + QueryManager.remove);
				if (QueryManager.ScrollbHeight + QueryManager.b_pos_y >= QueryManager.ScrollHeight) {
					var increment = QueryManager.ScrollHeight / (num + QueryManager.remove) - QueryManager.ScrollHeight / (num + QueryManager.remove - 1);
					//alert(QueryManager.b_pos_y)
					QueryManager.Bar.attr("transform", "translate(0," + (b_width + QueryManager.b_pos_y + increment) + ")");
					//var add = 0;
					//for (var i=0;i<num;i++){

				}
				QueryManager.Bar.attr("height", QueryManager.ScrollbHeight);

			} else {
				QueryManager.extra = -1 * (num - 8 + QueryManager.remove) * QueryManager.ScrollHeight / (num + QueryManager.remove);
			}
		});
		//QueryManager.exit[num-1] = QueryManager.query[num-1].append("svg:rect")
		QueryManager.query[num - 1].append("svg:line").attr("transform", "translate(" + x3 + "," + margin + ")").attr("class", num - 1).attr("x1", 0).attr("y1", 0).attr("x2", e_width).attr("y2", query_box_height - margin * 2)//query_box_height-margin*2)
		.attr("style", "stroke: black; stroke-width:2").on("click", function() {
			var index = parseInt(this.getAttributeNS(null, "class"));
			QueryManager.remove -= 1;
			//alert(QueryManager.remove)
			VisDock.captured[index] = [];
			//.splice(index,1);
			QueryManager.query[index].remove();

			QueryManager.removed.push(index);
			VisDock.eventHandler.removeColor(QueryManager.layers[index], index);
			var index2 = 0;
			var add = 0;
			var i = 0;
			//alert(num+numAnno-1);
			while (i <= num + numAnno - 1) {
				if (QueryManager.type[i] == "q") {
					if (add == index) {
						index2 = i;
						i = num + numAnno;
					}
					add++;
				}
				i++;
			}

			for (var i = index2; i <= num + numAnno - 1; i++) {
				QueryManager.position[i] -= 1;
			};
			var add = 0;
			var add2 = 0;
			for (var i = 0; i <= num + numAnno - 1; i++) {
				var move = ((QueryManager.relative + QueryManager.position[i]) * query_box_height);
				if (QueryManager.type[i] == "q") {
					QueryManager.query[add].attr("transform", "translate(0," + (move) + ")");
					//alert(move);
					if (move <= 7 * query_box_height && move >= 0) {
						QueryManager.query[add].attr("display", "inline");
					} else {
						QueryManager.query[add].attr("display", "none");
					}
					add++;
				} else {
					QueryManager.annotation[add2].attr("transform", "translate(0," + (move) + ")");
					//alert(move);
					if (move <= 7 * query_box_height && move >= 0) {
						QueryManager.annotation[add2].attr("display", "inline");
					} else {
						QueryManager.annotation[add2].attr("display", "none");
					}
					add2++;
				}
			}
			if (QueryManager.ScrollbHeight < QueryManager.ScrollHeight) {
				QueryManager.ScrollbHeight = QueryManager.ScrollHeight - (num - 8 + QueryManager.remove) * QueryManager.ScrollHeight / (num + QueryManager.remove);
				if (QueryManager.ScrollbHeight + QueryManager.b_pos_y >= QueryManager.ScrollHeight) {
					var increment = QueryManager.ScrollHeight / (num + QueryManager.remove) - QueryManager.ScrollHeight / (num + QueryManager.remove - 1);
					//alert(QueryManager.b_pos_y)
					QueryManager.Bar.attr("transform", "translate(0," + (b_width + QueryManager.b_pos_y + increment) + ")");
					//var add = 0;
					//for (var i=0;i<num;i++){

				}
				QueryManager.Bar.attr("height", QueryManager.ScrollbHeight);

			} else {
				QueryManager.extra = -1 * (num - 8 + QueryManager.remove) * QueryManager.ScrollHeight / (num + QueryManager.remove);
			}
		});
		//		    QueryManager.exit[num-1].append("svg:line")
		QueryManager.query[num - 1].append("svg:line").attr("transform", "translate(" + x3 + "," + margin + ")").attr("class", num - 1).attr("x1", 0).attr("y1", query_box_height - margin * 2).attr("x2", e_width).attr("y2", 0)//query_box_height-margin*2)
		.attr("style", "stroke: black; stroke-width:2").on("click", function() {
			var index = parseInt(this.getAttributeNS(null, "class"));
			QueryManager.remove -= 1;
			//alert(QueryManager.remove)
			VisDock.captured[index] = [];
			//.splice(index,1);
			QueryManager.query[index].remove();

			QueryManager.removed.push(index);
			VisDock.eventHandler.removeColor(QueryManager.layers[index], index);
			var index2 = 0;
			var add = 0;
			var i = 0;
			//alert(num+numAnno-1);
			while (i <= num + numAnno - 1) {
				if (QueryManager.type[i] == "q") {
					if (add == index) {
						index2 = i;
						i = num + numAnno;
					}
					add++;
				}
				i++;
			};

			for (var i = index2; i <= num + numAnno - 1; i++) {
				QueryManager.position[i] -= 1;
			};
			var add = 0;
			var add2 = 0;
			for (var i = 0; i <= num + numAnno - 1; i++) {
				var move = ((QueryManager.relative + QueryManager.position[i]) * query_box_height);
				if (QueryManager.type[i] == "q") {
					QueryManager.query[add].attr("transform", "translate(0," + (move) + ")");
					//alert(move);
					if (move <= 7 * query_box_height && move >= 0) {
						QueryManager.query[add].attr("display", "inline");
					} else {
						QueryManager.query[add].attr("display", "none");
					}
					add++;
				} else {
					QueryManager.annotation[add2].attr("transform", "translate(0," + (move) + ")");
					//alert(move);
					if (move <= 7 * query_box_height && move >= 0) {
						QueryManager.annotation[add2].attr("display", "inline");
					} else {
						QueryManager.annotation[add2].attr("display", "none");
					}
					add2++;
				}
			}
			if (QueryManager.ScrollbHeight < QueryManager.ScrollHeight) {
				QueryManager.ScrollbHeight = QueryManager.ScrollHeight - (num - 8 + QueryManager.remove) * QueryManager.ScrollHeight / (num + QueryManager.remove);
				if (QueryManager.ScrollbHeight + QueryManager.b_pos_y >= QueryManager.ScrollHeight) {
					var increment = QueryManager.ScrollHeight / (num + QueryManager.remove) - QueryManager.ScrollHeight / (num + QueryManager.remove - 1);
					//alert(QueryManager.b_pos_y)
					QueryManager.Bar.attr("transform", "translate(0," + (b_width + QueryManager.b_pos_y + increment) + ")");
					//var add = 0;
					//for (var i=0;i<num;i++){

				}
				QueryManager.Bar.attr("height", QueryManager.ScrollbHeight);

			} else {
				QueryManager.extra = -1 * (num - 8 + QueryManager.remove) * QueryManager.ScrollHeight / (num + QueryManager.remove);
			}
		});
		QueryManager.names[num - 1] = QueryManager.query[num - 1].append("svg:text").attr("class", num - 1).attr("x", 10).attr("y", query_box_height / 2 + QueryManager.margin).text("Query " + num).on("dblclick", function() {
			var index = parseInt(this.getAttributeNS(null, "class"));
			var str = "Query" + (index + 1).toString();
			var newname = prompt("Enter new query name please", str);
			var str = [];
			if (newname.length > 7) {
				for (var j = 0; j < 7; j++) {
					str = str + newname[j];
				}
				str = str + "...";
			} else {
				str = newname;
			}
			//alert(newname.length);
			if (newname != null) {
				//this.text(newname)
				QueryManager.names[index]//.append("svg:text")
				.text(str);
			};
		});
		if (num + numAnno + QueryManager.remove > 8) {
			if ((num + numAnno - 1 + QueryManager.remove + QueryManager.relative) * query_box_height > 7 * query_box_height) {
				QueryManager.query[num - 1].attr("display", "none");
			}
			if (QueryManager.b_pos_y > 0) {
				QueryManager.b_pos_y -= QueryManager.ScrollHeight / (num + numAnno - 1) - QueryManager.ScrollHeight / (num + numAnno) + QueryManager.correct;
				QueryManager.b_posy = QueryManager.b_pos_y;
			}
			QueryManager.ScrollbHeight = QueryManager.ScrollHeight - (numAnno + num - 8 + QueryManager.remove) * QueryManager.ScrollHeight / (numAnno + num + QueryManager.remove);
			//var Bar = QueryManager.ScrollBar.append("g")
			//    .attr("transform","translate(0," + b_width + ")")
			if (QueryManager.b_pos_y != 0) {
				var move = QueryManager.ScrollHeight / (num + numAnno);
				QueryManager.Bar.attr("transform", "translate(0," + (b_width - QueryManager.relative * move) + ")");
				QueryManager.b_pos_y = -QueryManager.relative * move;
			}
			//		        QueryManager.Bar.append("rect")
			//			    .attr("x", 0).attr("y",0)
			//			    .attr("width",b_width)
			//			    .attr("height",QueryManager.ScrollbHeight)
			//			    .attr("style","fill: lightgrey; stroke: black")
			QueryManager.Bar.attr("height", QueryManager.ScrollbHeight);
			//alert(QueryManager.Bar.getAttributeNS(null,"height"))
		}
		QueryManager.refresh();
	},
	
	addAnnotation : function(color, visibility, name) {
		QueryManager.position[numAnno + num - 1] = numAnno + num - 1 + QueryManager.remove;
		QueryManager.type[numAnno + num - 1] = "a";

		query_posy = (num + numAnno - 1) * query_box_height;
		var margin = QueryManager.margin;
		;
		var t_width = QueryManager.t_width;
		//20; // transparency button width
		var c_width = QueryManager.c_width;
		//40; // colour button width
		var e_width = QueryManager.e_width;
		//query_box_height-margin*2; // exit button width
		var b_width = QueryManager.b_width;
		//20; // scroll bar width
		var b_height = QueryManager.b_height;
		//8*query_box_height;
		var b_pos_y = QueryManager.b_pos_y;
		//0; // initial scroll bar y position

		var x1 = QueryManager.x1;
		//queryWidth/2-25;
		var x2 = QueryManager.x2;
		//queryWidth/1.5-25;
		var x3 = QueryManager.x3;
		//x2 + c_width + margin;
		var x4 = QueryManager.x4;
		//x2 + c_width + 2*margin + e_width + 2;

		QueryManager.annotation[numAnno - 1] = [];
		QueryManager.annotationbox[numAnno - 1] = [];
		QueryManager.exit[numAnno - 1] = [];
		QueryManager.names2[numAnno - 1] = [];
		//QueryManager.annotationtoggle[numAnno-1] = 0;
		QueryManager.annotation[numAnno - 1] = QueryManager.dock.append("g").attr("transform", "translate(0, " + (query_posy + query_box_height * (QueryManager.remove + QueryManager.relative)) + ")")
												.attr("class", "QueryBox2");
		if (VisDock.dockOrient){
			var W = dockWidth - 1 * QueryManager.b_width;
		} else {
			var W = dockWidth - buttonHeight + titleOffset - 1 * QueryManager.b_width;
		}
		QueryManager.annotationbox[numAnno - 1] = QueryManager.annotation[numAnno - 1].append("rect").attr("class", numAnno - 1).attr("x", 0).attr("y", 0).attr("rx", 2 * margin).attr("ry", 2 * margin).attr("width", W).attr("height", query_box_height).attr("style", "fill: cornflowerblue;stroke:blue").on("click", function() {
			var index = parseInt(this.getAttributeNS(null, "class"));
			QueryManager.annotationindex = index;

			var del = QueryManager.annotationtoggle.indexOf(index);
			//alert(QueryManager.annotationtoggle)
			var k = QueryManager.annotationtoggle.length;
			if (del == -1) {
				//if (QueryManager.annotationtoggle[index] == 0){
				this.setAttributeNS(null, "style", "fill: burlywood; stroke:black");
				//QueryManager.annotationtoggle[index] = 1
				QueryManager.annotationtoggle[k] = index;
			} else {
				this.setAttributeNS(null, "style", "fill: cornflowerblue; stroke:black");
				//QueryManager.annotationtoggle[index] = 0
				QueryManager.annotationtoggle.splice(del, 1);
			}
			if (VisDock.eventHandler.QueryClick != undefined) {
				VisDock.eventHandler.QueryClick(QueryManager.layers, index);
			};//alert(QueryManager.annotationtoggle)
		}).on("dblclick", function() {
			var index = parseInt(this.getAttributeNS(null, "class"));
			var str = "Label " + (index + 1).toString();
			var newname = prompt("Enter new query name please", str);
			var str = [];
			if (newname.length > 7) {
				for (var j = 0; j < 7; j++) {
					str = str + newname[j];
				}
				str = str + "...";
			} else {
				str = newname;
			}
			if (newname != null) {
				QueryManager.names2[index]// = QueryManager.query[index].append("svg:text")
					.text(str);
			};
		});

		QueryManager.annotation[numAnno - 1].append("svg:rect").attr("class", numAnno - 1).attr("x", x1).attr("y", margin).attr("height", query_box_height - margin * 2).attr("width", t_width).attr("style", "fill: " + color + ";stroke:black").on("click", function() {
			var newcolor = prompt("Please enter new color", "green");
			var index = parseInt(this.getAttributeNS(null, "class"));
			if (newcolor != null) {
				QueryManager.colors[index] = newcolor;
				//alert(this.getAttributeNS(null,"style"))
				this.setAttributeNS(null, "style", "fill:" + newcolor + ";stroke:black");
				if (annotationArray[index][1] == 0) {
					AnnotatedByPointTool.changeColor(newcolor, index);
				} else {
					AnnotatedByAreaTool.changeColor(newcolor, index);
				}
			}
		});
		QueryManager.annotation[numAnno - 1].append("svg:rect").attr("class", numAnno - 1).attr("x", x2).attr("y", margin).attr("height", query_box_height - margin * 2).attr("width", c_width).attr("style", "fill: white; stroke: black").on("click", function() {//alert(annotationArray[0][0])
			var index = parseInt(this.getAttributeNS(null, "class"));
			if (QueryManager.annotationtoggle[index] == 0) {
				annotationArray[index][0].attr("style", "opacity: 0");
				QueryManager.annotationbox[index].attr("style", "fill: lightblue; stroke:black");
				QueryManager.annotationtoggle[index][1] = 1;
			} else {
				annotationArray[index][0].attr("style", "opacity: 0.8");
				QueryManager.annotationbox[index].attr("style", "fill: cornflowerblue; stroke:black");
				QueryManager.annotationtoggle[index] = 0;
			}
		});

		QueryManager.hide[numAnno - 1] = QueryManager.annotation[numAnno - 1].append("svg:rect").attr("transform", "translate(" + x3 + "," + margin + ")").attr("class", numAnno - 1).attr("x", 0)//x3)
		.attr("y", 0)//margin)
		.attr("height", query_box_height - margin * 2).attr("width", e_width).attr("style", "fill: white; stroke: black").on("click", function() {
			var index = parseInt(this.getAttributeNS(null, "class"));
			QueryManager.remove -= 1;
			//alert(QueryManager.remove)
			//VisDock.captured[index] = [];//.splice(index,1);
			QueryManager.annotation[index].remove();
			annotationArray[index][0].remove();

			var index2 = 0;
			var add = 0;
			var i = 0;
			//alert(num+numAnno-1);
			while (i <= num + numAnno - 1) {
				if (QueryManager.type[i] == "a") {
					if (add == index) {
						index2 = i;
						i = num + numAnno;
					}
					add++;
				}
				i++;
			};
			for (var i = index2; i <= num + numAnno - 1; i++) {
				QueryManager.position[i] -= 1;
			};
			var add = 0;
			var add2 = 0;
			for (var i = 0; i <= num + numAnno - 1; i++) {
				var move = ((QueryManager.relative + QueryManager.position[i]) * query_box_height);
				if (QueryManager.type[i] == "q") {
					QueryManager.query[add].attr("transform", "translate(0," + (move) + ")");
					//alert(move);
					if (move <= 7 * query_box_height && move >= 0) {
						QueryManager.query[add].attr("display", "inline");
					} else {
						QueryManager.query[add].attr("display", "none");
					}
					add++;
				} else {
					QueryManager.annotation[add2].attr("transform", "translate(0," + (move) + ")");
					//alert(move);
					if (move <= 7 * query_box_height && move >= 0) {
						QueryManager.annotation[add2].attr("display", "inline");
					} else {
						QueryManager.annotation[add2].attr("display", "none");
					}
					add2++;
				}
			}
			var add = AnnotatedByAreaTool.areaarray.indexOf(index);
			AnnotatedByAreaTool.blasso[add].remove();
			if (QueryManager.ScrollbHeight < QueryManager.ScrollHeight) {
				QueryManager.ScrollbHeight = QueryManager.ScrollHeight - (numAnno - 8 + QueryManager.remove) * QueryManager.ScrollHeight / (numAnno + QueryManager.remove);
				if (QueryManager.ScrollbHeight + QueryManager.b_pos_y >= QueryManager.ScrollHeight) {
					var increment = QueryManager.ScrollHeight / (numAnno + QueryManager.remove) - QueryManager.ScrollHeight / (numAnno + QueryManager.remove - 1);
					//alert(QueryManager.b_pos_y)
					QueryManager.Bar.attr("transform", "translate(0," + (b_width + QueryManager.b_pos_y + increment) + ")");
					//var add = 0;
					//for (var i=0;i<numAnno;i++){

				}
				QueryManager.Bar.attr("height", QueryManager.ScrollbHeight);

			} else {
				QueryManager.extra = -1 * (numAnno - 8 + QueryManager.remove) * QueryManager.ScrollHeight / (numAnno + QueryManager.remove);
			}
		});
		//QueryManager.hide[numAnno-1] = QueryManager.query[numAnno-1].append("svg:rect")
		QueryManager.annotation[numAnno - 1].append("svg:line").attr("transform", "translate(" + x3 + "," + margin + ")").attr("class", numAnno - 1).attr("x1", 0).attr("y1", 0).attr("x2", e_width).attr("y2", query_box_height - margin * 2)//query_box_height-margin*2)
		.attr("style", "stroke: black; stroke-width:2").on("click", function() {
			var index = parseInt(this.getAttributeNS(null, "class"));
			QueryManager.remove -= 1;
			//alert(QueryManager.remove)
			//VisDock.captured[index] = [];//.splice(index,1);
			QueryManager.annotation[index].remove();
			annotationArray[index][0].remove();

			//QueryManager.removed.push(index);

			//alert(QueryManager.query[index].getAttributeNS(null,"class"));
			//	VisDock.eventHandler.removeColor(QueryManager.layers[index], index);
			var index2 = 0;
			var add = 0;
			var i = 0;
			//alert(num+numAnno-1);
			while (i <= num + numAnno - 1) {
				if (QueryManager.type[i] == "a") {
					if (add == index) {
						index2 = i;
						i = num + numAnno;
					}
					add++;
				}
				i++;
			};
			for (var i = index2; i <= num + numAnno - 1; i++) {
				QueryManager.position[i] -= 1;
			};
			var add = 0;
			var add2 = 0;
			for (var i = 0; i <= num + numAnno - 1; i++) {
				var move = ((QueryManager.relative + QueryManager.position[i]) * query_box_height);
				if (QueryManager.type[i] == "q") {
					QueryManager.query[add].attr("transform", "translate(0," + (move) + ")");
					//alert(move);
					if (move <= 7 * query_box_height && move >= 0) {
						QueryManager.query[add].attr("display", "inline");
					} else {
						QueryManager.query[add].attr("display", "none");
					}
					add++;
				} else {
					QueryManager.annotation[add2].attr("transform", "translate(0," + (move) + ")");
					//alert(move);
					if (move <= 7 * query_box_height && move >= 0) {
						QueryManager.annotation[add2].attr("display", "inline");
					} else {
						QueryManager.annotation[add2].attr("display", "none");
					}
					add2++;
				}
			}
			var add = AnnotatedByAreaTool.areaarray.indexOf(index);
			AnnotatedByAreaTool.blasso[add].remove();
			if (QueryManager.ScrollbHeight < QueryManager.ScrollHeight) {
				QueryManager.ScrollbHeight = QueryManager.ScrollHeight - (numAnno - 8 + QueryManager.remove) * QueryManager.ScrollHeight / (numAnno + QueryManager.remove);
				if (QueryManager.ScrollbHeight + QueryManager.b_pos_y >= QueryManager.ScrollHeight) {
					var increment = QueryManager.ScrollHeight / (numAnno + QueryManager.remove) - QueryManager.ScrollHeight / (numAnno + QueryManager.remove - 1);
					//alert(QueryManager.b_pos_y)
					QueryManager.Bar.attr("transform", "translate(0," + (b_width + QueryManager.b_pos_y + increment) + ")");
					//var add = 0;
					//for (var i=0;i<numAnno;i++){

				}
				QueryManager.Bar.attr("height", QueryManager.ScrollbHeight);

			} else {
				QueryManager.extra = -1 * (numAnno - 8 + QueryManager.remove) * QueryManager.ScrollHeight / (numAnno + QueryManager.remove);
			}
		});
		//QueryManager.hide[numAnno-1].append("svg:line")
		QueryManager.annotation[numAnno - 1].append("svg:line").attr("transform", "translate(" + x3 + "," + margin + ")").attr("class", numAnno - 1).attr("x1", 0).attr("y1", query_box_height - margin * 2).attr("x2", e_width).attr("y2", 0)//query_box_height-margin*2)
		.attr("style", "stroke: black; stroke-width:2").on("click", function() {
			var index = parseInt(this.getAttributeNS(null, "class"));
			QueryManager.remove -= 1;
			//alert(QueryManager.remove)
			//VisDock.captured[index] = [];//.splice(index,1);
			QueryManager.annotation[index].remove();
			annotationArray[index][0].remove();

			//QueryManager.removed.push(index);

			//alert(QueryManager.query[index].getAttributeNS(null,"class"));
			//	VisDock.eventHandler.removeColor(QueryManager.layers[index], index);
			var index2 = 0;
			var add = 0;
			var i = 0;
			//alert(num+numAnno-1);
			while (i <= num + numAnno - 1) {
				if (QueryManager.type[i] == "a") {
					if (add == index) {
						index2 = i;
						i = num + numAnno;
					}
					add++;
				}
				i++;
			}
			for (var i = index2; i <= num + numAnno - 1; i++) {
				QueryManager.position[i] -= 1;
			};
			var add = 0;
			var add2 = 0;
			for (var i = 0; i <= num + numAnno - 1; i++) {
				var move = ((QueryManager.relative + QueryManager.position[i]) * query_box_height);
				if (QueryManager.type[i] == "q") {
					QueryManager.query[add].attr("transform", "translate(0," + (move) + ")");
					//alert(move);
					if (move <= 7 * query_box_height && move >= 0) {
						QueryManager.query[add].attr("display", "inline");
					} else {
						QueryManager.query[add].attr("display", "none");
					}
					add++;
				} else {
					QueryManager.annotation[add2].attr("transform", "translate(0," + (move) + ")");
					//alert(move);
					if (move <= 7 * query_box_height && move >= 0) {
						QueryManager.annotation[add2].attr("display", "inline");
					} else {
						QueryManager.annotation[add2].attr("display", "none");
					}
					add2++;
				}
			}
			var add = AnnotatedByAreaTool.areaarray.indexOf(index);
			AnnotatedByAreaTool.blasso[add].remove();
			if (QueryManager.ScrollbHeight < QueryManager.ScrollHeight) {
				QueryManager.ScrollbHeight = QueryManager.ScrollHeight - (numAnno - 8 + QueryManager.remove) * QueryManager.ScrollHeight / (numAnno + QueryManager.remove);
				if (QueryManager.ScrollbHeight + QueryManager.b_pos_y >= QueryManager.ScrollHeight) {
					var increment = QueryManager.ScrollHeight / (numAnno + QueryManager.remove) - QueryManager.ScrollHeight / (numAnno + QueryManager.remove - 1);
					//alert(QueryManager.b_pos_y)
					QueryManager.Bar.attr("transform", "translate(0," + (b_width + QueryManager.b_pos_y + increment) + ")");
					//var add = 0;
					//for (var i=0;i<numAnno;i++){

				}
				QueryManager.Bar.attr("height", QueryManager.ScrollbHeight);

			} else {
				QueryManager.extra = -1 * (numAnno - 8 + QueryManager.remove) * QueryManager.ScrollHeight / (numAnno + QueryManager.remove);
			}
		});
		QueryManager.names2[numAnno - 1] = QueryManager.annotation[numAnno - 1].append("svg:text").attr("class", numAnno - 1).attr("x", 10).attr("y", query_box_height / 2 + QueryManager.margin).text(name).on("dblclick", function() {
			var index = parseInt(this.getAttributeNS(null, "class"));
			var str = "Label" + (index + 1).toString();
			var newname = prompt("Enter new label please", str);
			var str = [];
			if (newname.length > 7) {
				for (var j = 0; j < 7; j++) {
					str = str + newname[j];
				}
				str = str + "...";
			} else {
				str = newname;
			}
			if (newname != null) {
				//this.text(newname)
				QueryManager.names2[index].text(str);
				if (annotationArray[index][1] == 0) {
					AnnotatedByPointTool.changeLabel(str, index);
				} else {
					AnnotatedByAreaTool.changeLabel(str, index);
				}

			};
		});
		if (num + numAnno + QueryManager.remove > 8) {
			if ((num + numAnno - 1 + QueryManager.remove + QueryManager.relative) * query_box_height > 7 * query_box_height) {
				QueryManager.annotation[numAnno - 1].attr("display", "none");
			}
			if (QueryManager.b_pos_y > 0) {
				QueryManager.b_pos_y -= QueryManager.ScrollHeight / (num + numAnno - 1) - QueryManager.ScrollHeight / (num + numAnno) + QueryManager.correct;
				QueryManager.b_posy = QueryManager.b_pos_y;
			}
			QueryManager.ScrollbHeight = QueryManager.ScrollHeight - (num + numAnno - 8 + QueryManager.remove) * QueryManager.ScrollHeight / (num + numAnno + QueryManager.remove);
			//var Bar = QueryManager.ScrollBar.append("g")
			//    .attr("transform","translate(0," + b_width + ")")
			if (QueryManager.b_pos_y != 0) {
				var move = QueryManager.ScrollHeight / numAnno;
				QueryManager.Bar.attr("transform", "translate(0," + (b_width - QueryManager.relative * move) + ")");
				QueryManager.b_pos_y = -QueryManager.relative * move;
			}
			//		        QueryManager.Bar.append("rect")
			//			    .attr("x", 0).attr("y",0)
			//			    .attr("width",b_width)
			//			    .attr("height",QueryManager.ScrollbHeight)
			//			    .attr("style","fill: lightgrey; stroke: black")
			QueryManager.Bar.attr("height", QueryManager.ScrollbHeight);
			//alert(QueryManager.Bar.getAttributeNS(null,"height"))
		}
		return numAnno - 1;
		QueryManager.refresh();
	},
	
	removeAnnotation : function(index, type){
			//var index = parseInt(this.getAttributeNS(null, "class"));
			QueryManager.remove -= 1;
			//alert(QueryManager.remove)
			//VisDock.captured[index] = [];//.splice(index,1);
			QueryManager.annotation[index].remove();
			annotationArray[index][0].remove();

			var index2 = 0;
			var add = 0;
			var i = 0;
			//alert(num+numAnno-1);
			while (i <= num + numAnno - 1) {
				if (QueryManager.type[i] == "a") {
					if (add == index) {
						index2 = i;
						i = num + numAnno;
					}
					add++;
				}
				i++;
			};
			for (var i = index2; i <= num + numAnno - 1; i++) {
				QueryManager.position[i] -= 1;
			};
			var add = 0;
			var add2 = 0;
			for (var i = 0; i <= num + numAnno - 1; i++) {
				var move = ((QueryManager.relative + QueryManager.position[i]) * query_box_height);
				if (QueryManager.type[i] == "q") {
					QueryManager.query[add].attr("transform", "translate(0," + (move) + ")");
					//alert(move);
					if (move <= 7 * query_box_height && move >= 0) {
						QueryManager.query[add].attr("display", "inline");
					} else {
						QueryManager.query[add].attr("display", "none");
					}
					add++;
				} else {
					QueryManager.annotation[add2].attr("transform", "translate(0," + (move) + ")");
					//alert(move);
					if (move <= 7 * query_box_height && move >= 0) {
						QueryManager.annotation[add2].attr("display", "inline");
					} else {
						QueryManager.annotation[add2].attr("display", "none");
					}
					add2++;
				}
			}
			if (type == "byArea"){
				var add = AnnotatedByAreaTool.areaarray.indexOf(index);
				AnnotatedByAreaTool.blasso[add].remove();
			}
					
			if (QueryManager.ScrollbHeight < QueryManager.ScrollHeight) {
				QueryManager.ScrollbHeight = QueryManager.ScrollHeight - (numAnno - 8 + QueryManager.remove) * QueryManager.ScrollHeight / (numAnno + QueryManager.remove);
				if (QueryManager.ScrollbHeight + QueryManager.b_pos_y >= QueryManager.ScrollHeight) {
					var increment = QueryManager.ScrollHeight / (numAnno + QueryManager.remove) - QueryManager.ScrollHeight / (numAnno + QueryManager.remove - 1);
					//alert(QueryManager.b_pos_y)
					QueryManager.Bar.attr("transform", "translate(0," + (b_width + QueryManager.b_pos_y + increment) + ")");
					//var add = 0;
					//for (var i=0;i<numAnno;i++){

				}
				QueryManager.Bar.attr("height", QueryManager.ScrollbHeight);

			} else {
				QueryManager.extra = -1 * (numAnno - 8 + QueryManager.remove) * QueryManager.ScrollHeight / (numAnno + QueryManager.remove);
			}		
	},
	
	refresh : function(){
		if (VisDock.dockOrient){
			var QueryBoxes = d3.selectAll(".QueryBox")[0];
			var QueryBoxes2 = d3.selectAll(".QueryBox2")[0];
			for (var i = 0; i < QueryBoxes.length; i++){
				QueryBoxes[i].childNodes[0].setAttributeNS(null, "width", dockWidth - 1 * QueryManager.b_width);
				QueryBoxes[i].childNodes[8].setAttributeNS(null, "display", "in-line");
				for (var j = 1; j < 5; j++){
					QueryBoxes[i].childNodes[j].setAttributeNS(null, "transform", "translate(" + (0) + ",0)");
				}
				for (var j = 5; j < 8; j++){
					QueryBoxes[i].childNodes[j].setAttributeNS(null, "transform", "translate(" + (153.3) + ",5)");
				}											
			}	
			for (var i = 0; i < QueryBoxes2.length; i++){
				QueryBoxes2[i].childNodes[0].setAttributeNS(null, "width", dockWidth - 1 * QueryManager.b_width);
				QueryBoxes2[i].childNodes[6].setAttributeNS(null, "display", "in-line");
				for (var j = 1; j < 3; j++){
					QueryBoxes2[i].childNodes[j].setAttributeNS(null, "transform", "translate(" + (0) + ",0)");
				}
				for (var j = 3; j < 6; j++){
					QueryBoxes2[i].childNodes[j].setAttributeNS(null, "transform", "translate(" + (153.3) + ",5)");
				}										
			}
		} else {
			var QueryBoxes = d3.selectAll(".QueryBox")[0];
			var QueryBoxes2 = d3.selectAll(".QueryBox2")[0];
			for (var i = 0; i < QueryBoxes.length; i++){
				QueryBoxes[i].childNodes[0].setAttributeNS(null, "width", dockWidth - buttonSize + titleOffset - 1 * QueryManager.b_width);
				QueryBoxes[i].childNodes[8].setAttributeNS(null, "display", "none");
				for (var j = 1; j < 5; j++){
					QueryBoxes[i].childNodes[j].setAttributeNS(null, "transform", "translate(" + (-1*buttonSize) + ",0)");
				}
				for (var j = 5; j < 8; j++){
					QueryBoxes[i].childNodes[j].setAttributeNS(null, "transform", "translate(" + (153.3-1*buttonSize) + ",5)");
				}											
			}	
			for (var i = 0; i < QueryBoxes2.length; i++){
				QueryBoxes2[i].childNodes[0].setAttributeNS(null, "width", dockWidth - buttonSize + titleOffset - 1 * QueryManager.b_width);
				QueryBoxes2[i].childNodes[6].setAttributeNS(null, "display", "none");
				for (var j = 1; j < 3; j++){
					QueryBoxes2[i].childNodes[j].setAttributeNS(null, "transform", "translate(" + (-1*buttonSize) + ",0)");
				}
				for (var j = 3; j < 6; j++){
					QueryBoxes2[i].childNodes[j].setAttributeNS(null, "transform", "translate(" + (153.3-1*buttonSize) + ",5)");
				}										
			}				
		}
		
	}
};
d3.selectAll("html").on("mousemove",function(){
	//alert(d3.mouse(this))
});
var Panel = {
	panel : null,
	panelArray : [],
	viewindex : 0,
	viewport : null,
	multiview : [],
	x : 0,
	xArray : [],
	y : 0,
	yArray : [],
	scale : 1,
	scaleArray : [],
	rotation : 0,
	rotationArray : [],
	zoomScale : 0.8,
	annotation : null,
	annotationArray : [],
	annotations : null,
	multiAnnotations : [],
	hostvis : null,
	multivis : [],
	width : 0,
	widthArray : [],
	height : 0,
	heightArray : [],

	init : function(svg, width, height) {
		if (VisDock.mode == "single"){

			// Create the main panel group
			this.panel = svg.append("g").attr("id", "MainPanel");
			this.width = width;
			this.height = height;
			
			// Define the viewport rectangle
			this.panel.append("rect")
				.attr("width", width - dockWidth + dockWidth)
				.attr("height", height).attr("style", "fill:none")
				.attr("class", "panel");
			this.panel.append("rect")
				.attr("width", width - dockWidth + dockWidth)
				.attr("height", height).attr("style", "opacity:0")
				.attr("class", "panel");
		
			//this.viewport = this.panel.append("g")
			//.attr("clip-path", "url(#panel)");
			var clipped = this.panel.append("g").attr("clip-path", "url(#panel)");

			// Set the clip path for the new panel
			var clip = this.panel.append("clipPath").attr("id", "panel");
			clip.append("rect").attr("width", width - dockWidth + dockWidth).attr("height", height);

			// Create the viewport
		//this.viewport = this.panel.append("g").attr("id", "VisDockViewPort");
			this.viewport = clipped.append("g").attr("id", "VisDockViewPort");
			this.hostvis = this.viewport.append("g");
			this.annotation = this.viewport.append("g");

		/*
		 // Demonstrates clipping
		 this.viewport.append("ellipse")
		 .attr("cx", (width - dockWidth) / 2)
		 .attr("cy", height / 2)
		 .attr("rx", width / 1.5)
		 .attr("ry", height / 1.5)
		 .attr("style", "fill: red;");
		 */
			
		} else {
			var i = svg.attr("id").split("svgVisDock")[1];
			var counter = 0;
			//while (i < VisDock.svgArray.length){
				// Create the main panel group
				this.panelArray[i] = VisDock.svgArray[i].append("g").attr("id", "MainPanel" + i);
				this.widthArray[i] = width;
				this.heightArray[i] = height;
				// Define the viewport rectangle
				this.panelArray[i].append("rect")
					.attr("width", width - dockWidth + dockWidth)
					.attr("height", height).attr("style", "fill:none")
					.attr("class", "panel");
				this.panelArray[i].append("rect")
					.attr("width", width - dockWidth + dockWidth)
					.attr("height", height).attr("style", "opacity:0")
					.attr("class", "panel");
					
				this.scaleArray[i] = 1;
				this.rotationArray[i] = 0;
				//this.viewport = this.panel.append("g")
				//.attr("clip-path", "url(#panel)");
				var clipped = this.panelArray[i].append("g").attr("clip-path", "url(#panel)");

				// Set the clip path for the new panel
				var clip = this.panelArray[i].append("clipPath").attr("id", "panel");
				clip.append("rect").attr("width", width - dockWidth + dockWidth).attr("height", height);

				// Create the viewport
		//this.viewport = this.panel.append("g").attr("id", "VisDockViewPort");
				this.multiview[i] = clipped.append("g").attr("id", "VisDockViewPort" + i);
				this.multivis[i] = this.multiview[i].append("g");
				this.multiAnnotations[i] = this.multiview[i].append("g");
				this.annotationArray[i] = this.multiview[i].append("g");
				
				// x and y translate
				this.xArray[i] = 0;
				this.yArray[i] = 0; 
				i++;
			//}
		}

	},

	pan : function(dx, dy, view) {
		if (VisDock.mode == "single"){
			this.x += dx / this.scale;
			this.y += dy / this.scale;
		} else {
			var index = view.getAttribute("id").split("VisDockViewPort")[1];
			this.xArray[index] += dx / this.scaleArray[index];
			this.yArray[index] += dy / this.scaleArray[index];		
		}

		this.setTransform(view);
	},

	zoom : function(px, py, delta, view) {
		if (VisDock.mode == "single"){
			var dz = Math.pow(1 + this.zoomScale, delta);
			this.x -= px / this.scale - px / (this.scale * dz);
			this.y -= py / this.scale - py / (this.scale * dz);
			this.scale *= dz;
			this.setTransform();
		} else {
			var dz = Math.pow(1 + this.zoomScale, delta);
			var index = parseInt(view.getAttribute("id").split("VisDockViewPort")[1]);
			this.xArray[index] -= px / this.scaleArray[index] - px / (this.scaleArray[index] * dz);
			this.yArray[index] -= py / this.scaleArray[index] - py / (this.scaleArray[index] * dz);
			this.scaleArray[index] *= dz;
			this.setTransform(view);			
		}
	},

	rotate : function(delta, displace, view) {
		VisDock.startChrome();
		
		var x = displace[0];
		var y = displace[1];
		
		
		if (VisDock.mode == "single") { 
			var T = this.viewport[0][0].getCTM();
			this.rotation += delta * 10.0;
		} else {
			var index = view.getAttribute("id").split("VisDockViewPort")[1];
			this.rotationArray[index] += delta * 10.0;
			var T = view.getCTM();
		} 
		
		var TI = T.inverse();
		
		//x = (displace[0]+Panel.x*0) * TI.a + (displace[1]+Panel.y*0) * TI.c + TI.e;
		//y = (displace[0]+Panel.x*0) * TI.b + (displace[1]+Panel.y*0) * TI.d + TI.f;			
		
		x = (displace[0]) * TI.a + (displace[1]) * TI.c + TI.e;
		y = (displace[0]) * TI.b + (displace[1]) * TI.d + TI.f;		
		
		var TMat = T.translate(1*x, 1*y).rotate(delta*10).translate(-1*x, -1*y);
		var r = document.createElementNS("http://www.w3.org/2000/svg", "polygon");


		var gView, pView, panelview, mainpanel, rotateAngle;
		if (VisDock.mode == "single"){
			gView = Panel.hostvis;
			pView = Panel.viewport;
			mainpanel = Panel.panel;
			panelview = VisDock.svg;
			rotateAngle = Panel.rotation;
		} else {
			var index = parseInt(view.getAttribute("id").split("VisDockViewPort")[1]);
			gView = Panel.multivis[index];
			pView = Panel.multiview[index];
			mainpanel = Panel.panelArray[index];
			panelview = VisDock.svgArray[index];
			rotateAngle = Panel.rotationArray[index];
		}		
		
		if (VisDock.mode == "single"){
			this.viewport
				.attr("transform","matrix("+TMat.a+","+TMat.b+","+TMat.c+","+TMat.d+","+TMat.e+","+TMat.f+")");
			var Tf = this.viewport[0][0].getCTM();
			Panel.x = Tf.e/this.scale;
			Panel.y = Tf.f/this.scale;			
			
		} else {
			d3.select(view)
				.attr("transform","matrix("+TMat.a+","+TMat.b+","+TMat.c+","+TMat.d+","+TMat.e+","+TMat.f+")");
			
			var Tf = view.getCTM();
			Panel.xArray[index] = Tf.e/this.scaleArray[index];
			Panel.yArray[index] = Tf.f/this.scaleArray[index];				
		}	

		panelview[0][0].appendChild(r);
		//VisDock.svg[0][0].appendChild(r);
		var tpoints = [];
		//r.setAttributeNS(null, "transform", "rotate(" + this.rotation + ")")
		
		//var anno1 = Panel.panel.selectAll(".annotations")[0];
		//var anno2 = Panel.panel.selectAll(".annotationsD")[0];
		var anno1 = mainpanel.selectAll(".annotations")[0];
		var anno2 = mainpanel.selectAll(".annotationsD")[0];		
		var annotations = anno1.concat(anno2);
		//var annotations = d3.selectAll(".annotations")[0];
		for (var i = 0; i < annotations.length; i++){
			//var t = annotations[i].childNodes[2].getCTM()
			var t = r.getCTM().inverse();
			if (t == null){
				VisDock.svg[0][0].appendChild(r);
				t = r.getCTM().inverse();
			}
		//var t2 = AnnotatedByPointTool.T[i];
			//var t2 = Panel.viewport[0][0].getCTM().inverse();
			var t2 = pView[0][0].getCTM().inverse();
			var x2 = parseFloat(annotations[i].childNodes[0].getAttributeNS(null, "x2"));
			var y2 = parseFloat(annotations[i].childNodes[0].getAttributeNS(null, "y2"));
		
			//var T = this.viewport[0][0].getCTM();
		
		//tpoints[0] = (x2+0*Panel.x) * t2.a + (y2+0*Panel.y) * t2.c + t2.e;
		//tpoints[1] = (x2+0*Panel.x) * t2.b + (y2+0*Panel.y) * t2.d + t2.f; 
		//tpoints[0] = (x2+0*Panel.x) * TMat.a + (y2+0*Panel.y) * TMat.c + TMat.e;
		//tpoints[1] = (x2+0*Panel.x) * TMat.b + (y2+0*Panel.y) * TMat.d + TMat.f; 
			//var tmat = t.translate(1*x2, 1*y2)//.rotate(-this.rotation).translate(-1*x2, -1*y2)
			//var tmat = t.translate(x2,y2).rotate(-this.rotation).translate(-1*x2,-1*y2);
			var tmat = t.translate(x2,y2).rotate(-rotateAngle).translate(-1*x2,-1*y2);
			//var tmat = t.translate(1*tpoints[0], 1*tpoints[1]).rotate(-this.rotation).translate(-1*tpoints[0], -1*tpoints[1])
			
			//var tmat = t.rotate(-this.rotation)
		
			//var tmat = t.translate(1*x2, 1*y2).rotate(-this.rotation).translate(-1*x2, -1*y2)
			annotations[i].childNodes[1].setAttributeNS(null, "transform", "matrix("+ tmat.a+","+ tmat.b+","+ tmat.c+","+ tmat.d+","+ tmat.e+","+ tmat.f+")");
			for (var j = 0; j < annotations[i].childNodes[1].childNodes.length; j++){
				
				if (j == 2){ // Exit Button
					annotations[i].childNodes[1].childNodes[j].setAttributeNS(null, "x", x2);
					annotations[i].childNodes[1].childNodes[j].setAttributeNS(null, "y", parseFloat(y2)+AnnotatedByPointTool.boxHeight/2);
				} else if (j == 3){ // Exit X
					annotations[i].childNodes[1].childNodes[j].setAttributeNS(null, "x1", x2);
					annotations[i].childNodes[1].childNodes[j].setAttributeNS(null, "x2", x2 + AnnotatedByPointTool.boxWidth/10);
					annotations[i].childNodes[1].childNodes[j].setAttributeNS(null, "y1", y2 + AnnotatedByPointTool.boxHeight);
					annotations[i].childNodes[1].childNodes[j].setAttributeNS(null, "y2", y2 + AnnotatedByPointTool.boxHeight/2);					
				} else if (j == 4){
					annotations[i].childNodes[1].childNodes[j].setAttributeNS(null, "x1", x2);
					annotations[i].childNodes[1].childNodes[j].setAttributeNS(null, "x2", x2 + AnnotatedByPointTool.boxWidth/10);
					annotations[i].childNodes[1].childNodes[j].setAttributeNS(null, "y1", y2 + AnnotatedByPointTool.boxHeight/2);
					annotations[i].childNodes[1].childNodes[j].setAttributeNS(null, "y2", y2 + AnnotatedByPointTool.boxHeight);					
				} else if (j == 5){ // Text
					annotations[i].childNodes[1].childNodes[j].setAttributeNS(null, "x", 5 + x2 + AnnotatedByPointTool.boxWidth/10);
					annotations[i].childNodes[1].childNodes[j].setAttributeNS(null, "y", y2 + AnnotatedByPointTool.boxHeight*2/3);
				} else {
					annotations[i].childNodes[1].childNodes[j].setAttributeNS(null, "x", x2);
					annotations[i].childNodes[1].childNodes[j].setAttributeNS(null, "y", y2);
				}
			//annotations[i].childNodes[2].setAttributeNS(null, "transform", "matrix("+ tmat.a+","+ tmat.b+","+ tmat.c+","+ tmat.d+","+ tmat.e+","+ tmat.f+")")
			}
					/*d3.selectAll("#exit_1").attr("x1", x2).attr("x2", x2 + AnnotatedByPointTool.boxWidth/10)
						.attr("y1", parseFloat(y2) + AnnotatedByPointTool.boxHeight).attr("y2", parseFloat(y2) + AnnotatedByPointTool.boxHeight/2)
			
					d3.selectAll("#exit_2").attr("x1", x2).attr("x2", x2 + AnnotatedByPointTool.boxWidth/10)
						.attr("y1", parseFloat(y2) + AnnotatedByPointTool.boxHeight/2).attr("y2", parseFloat(y2) + AnnotatedByPointTool.boxHeight)*/							
			
			//annotations[i].childNodes[2].setAttributeNS(null, "transform", "rotate(" + (-this.rotation)+")")
		}
		panelview[0][0].removeChild(r);
		//VisDock.svg[0][0].removeChild(r);

		
		VisDock.finishChrome();
		//var invTransform = Panel.viewport[0][0].getCTM().inverse();
		//BirdView.applyInverse(invTransform);
		
	},

	setTransform : function(view) {
		if (VisDock.mode == "single"){
			this.viewport.attr("transform", "scale(" + this.scale + ")" + "translate(" + this.x + " " + this.y + ") " + "rotate(" + this.rotation + ")");

			var invTransform = Panel.viewport[0][0].getCTM().inverse();
			BirdView.applyInverse(invTransform);
		} else {
			if (view != undefined){
				var index = parseInt(view.getAttribute("id").split("VisDockViewPort")[1]);
				d3.select(view)
					//.attr("transform", "scale(" + 1 + ")" + "translate(" + this.xArray[index] 
					.attr("transform", "scale(" + this.scaleArray[index] + ")" + "translate(" + this.xArray[index] 
					+ " " + this.yArray[index] + ") " + "rotate(" + this.rotationArray[index] + ")");
			} else {
				for (var i = 0; i < VisDock.svgArray.length; i++){
					Panel.multiview[i]
						.attr("transform", "scale(" + this.scaleArray[i] + ")" + "translate(" +
							 this.xArray[i] + " " + this.yArray[i] + ") " + "rotate(" + this.rotationArray[i] + ")");
					//this.xArray[i] = 0;
					//this.yArray[i] = 0;	
				}
			}
			//var invTransform = Panel.multiview[index][0][0].getCTM().inverse();
			//BirdView.applyInverse(invTransform, view);
			
		}
	},

	reset : function() {
		this.dx = this.dy = 0;
		this.scale = 1.0;
		this.rotation = 0;
		this.viewport.attr("transform", "");
	},
};

var Bird;
var VisDock = {

	// VisDock elements
	dockspace: null,
	mode : null,
	svg : null,
	svgArray : [],
	svgWidth : 0,
	svgWidthArray : [],
	svgHeight : 0,
	svgHeightArray : [],
	captured : [],
	SelectShape : "polygon",
	color : ["red", "magenta", "orange", "yellow", "OliveDrab", "green", "DeepSkyBlue", "SlateBlue", "cyan", "dodgerblue", "lightseagreen"],
	opacity : "1",
	init_text : 0,
	query : [],
	birdtemp : [],
	birdclipped : [],
	dockOrient : 1,
	objects: [],
	searchLayers : [],
	responseScaleX : 1,
	responseScaleY : 1,
	// Selection handler - provided by host visualization:
	//
	// getHits(polygon, inclusive : boolean) - returns a list of
	//   unique hit objects.
	//
	// setColor(hits, color) - set the color of selected items?
	//
	// clearSelection() - clear all selections
	eventHandler : null,
	multi_init: function(selector, number, masterNumber, width, height){

		
		
	},
	init : function(selector, width, height) {
		
		if (!isNaN(width) && !isNaN(height)){
			this.mode = "single";
			this.svg = d3.select(selector).append("svg")
					.attr("width", width)
					.attr("height", height)
					.attr("class", "svgVisDock");
	
			
			this.svgWidth = width;
			this.svgHeight = height;
			Panel.init(this.svg, width, height);
			Toolbox.init(this.svg, width, height);					
			QueryManager.init(this.svg, width, height);
					
		} else if (width.length == undefined){
			this.mode = "single";
			//this.svg = d3.select(width);
			this.svg = d3.select(selector).append("svg")
					.attr("width", width.width)
					.attr("height", width.height)
					.attr("class", "svgVisDock");			
			//if (width.getAttribute("width") == null){
			//	this.svgWidth = width.getAttribute("style").split("width")[1].split(";")[0].split(":")[1].split("px")[0];
			//} else {
			//	this.svgWidth = width.getAttribute("width");
			//}
			this.svgWidth = width.width;
			//if (width.getAttribute("height") == null){	
			//	this.svgHeight = width.getAttribute("style").split("height")[1].split(";")[0].split(":")[1].split("px")[0];
			//} else {
			//	this.svgHeight = width.getAttribute("height");
			//}
			this.svgHeight = width.height;
			
			Panel.init(this.svg, this.svgWidth, this.svgHeight);
			/*var i = 0;
			while (d3.select(width)[0][0].childNodes.length > 1){
				if (d3.select(width)[0][0].childNodes[i].getAttribute("id") != "MainPanel"){
					d3.select("#VisDockViewPort")[0][0].appendChild(d3.select(width)[0][0].childNodes[i]);
				}
			}*/
			QueryManager.init(this.svg, this.svgWidth, this.svgHeight);
			Toolbox.init(this.svg, this.svgWidth, this.svgHeight);					
		} else {
			if (width.length == undefined){// || width.length == 1){
				this.mode = "single";


				this.svg = d3.select(selector).append("svg")
					.attr("width", width.width)
					.attr("height", width.height)
					.attr("class", "svgVisDock");	
				this.svgWidth = width.width;
				this.svgHeight = width.height;
			
				Panel.init(this.svg, this.svgWidth, this.svgHeight);				
				/*this.mode = "single";
				this.svg = d3.select(width);
				if (width.getAttribute("width") == null){
					this.svgWidth = width.getAttribute("style").split("width")[1].split(";")[0].split(":")[1].split("px")[0];
				} else {
					this.svgWidth = width.getAttribute("width");
				}
				if (width.getAttribute("height") == null){	
					this.svgHeight = width.getAttribute("style").split("height")[1].split(";")[0].split(":")[1].split("px")[0];
				} else {
					this.svgHeight = width.getAttribute("height");
				}
			
				Panel.init(this.svg, this.svgWidth, this.svgHeight);
				var i = 0;
				while (d3.select(width)[0][0].childNodes.length > 1){
			//for (var i = 0; i != d3.select(width)[0][0].childNodes.length; ){//d3.select(width).selectAll("*")[0].length; i++){
				//Panel.hostvis[0][0].appendChild(d3.select(width)[0][0].childNodes[i]);
					if (d3.select(width)[0][0].childNodes[i].getAttribute("id") != "MainPanel"){
						d3.select("#VisDockViewPort")[0][0].appendChild(d3.select(width)[0][0].childNodes[i]);
					//d3.select(width)[0][0].childNodes[i].remove();
					//d3.select(width)[0][0].removeChild(d3.select(width)[0][0].childNodes[i]);
					}
				//Panel.hostvis[0][0].appendChild(d3.select(width).selectAll("*")[0][i]);
				//d3.select(width)[0][0].removeChild(d3.select(width).selectAll("*")[0][i]);
				}
			
				Toolbox.init(this.svg, this.svgWidth, this.svgHeight);					
				QueryManager.init(this.svg, this.svgWidth, this.svgHeight);	*/		
						
			} else if (width.length == 1){
				this.mode = "single";

				this.svg = d3.select(selector).append("svg")
					.attr("width", width.width)
					.attr("height", width.height)
					.attr("class", "svgVisDock");	
				this.svgWidth = width.width;
				this.svgHeight = width.height;
			
				Panel.init(this.svg, this.svgWidth, this.svgHeight);					
			} 
			else {
				for (var i = 0; i < width.length; i++){
					//if (width.length > 1){
					var w0 = width[i].width;
					var h0 = width[i].height;
					//} else {
					//	var w0 = width;	
					//	var h0 = height;
					//VisDock.init(selector, width, height);
					//}
				//if (selector.legnth == 1){
				//	var frame = selector;
				//} else {
				//	var frame = selector[i];
				//}
					var frame = selector;
					this.svgArray[i] = d3.select(frame).append("svg")
						.attr("width", w0)
						.attr("height", h0)
						.attr("class", "svgVisDock")
						.attr("id", "svgVisDock" + i);
					this.mode = "multi";
					this.svgWidthArray[i] = w0;
					this.svgHeightArray[i] = h0;
					
					Panel.init(this.svgArray[i], w0, h0);
				
					if (width[i].dock == true){
						Toolbox.init(this.svgArray[i], w0, h0);					
						QueryManager.init(this.svgArray[i], w0, h0);
					}			
				//VisDock.init(selector, )
				}				
			}
				
		}
		
		// Responsive Algorithm
		window.onresize = function(){
			if (VisDock.svgWidth > 3 * window.innerWidth || VisDock.svgHeight > 3 * window.innerHeight){
				VisDock.responseScaleX = 1/2;
				VisDock.responseScaleY = 1/2;
				
				
			} else if (VisDock.svgWidth > 2 * window.innerWidth || VisDock.svgHeight > 2 * window.innerHeight){

				VisDock.responseScaleX = 1/1.5;
				VisDock.responseScaleY = 1/1.5;				
				
			} else if (VisDock.svgWidth > 1 * window.innerWidth || VisDock.svgHeight > 1 * window.innerHeight){

				VisDock.responseScaleX = 1/1.2;
				VisDock.responseScaleY = 1/1.2;				
				
			} else {//if (this.svgWidth > 2 * window.innerWidth || this.svgHeight > 2 * window.innerHeight){

				VisDock.responseScaleX = 1;
				VisDock.responseScaleY = 1;				
				
			}  
		};


		
		/*if (this.init_text == 0) {
			var init_text = document.getElementsByTagName("g")
			this.init_text = init_text.length;
		}*/
		/*if (init_g == 0) {
			initg = document.getElementsByTagName("g");
			init_g = initg.length;
		}*/
		//alert(init_g)

		

		// initialize bird eye
		/*var h = height / width * dockWidth;
		//alert(dockHeight + " " + queryHeight + " " + width + " " + dockWidth)
		this.birdtemp = this.svg.append("g").attr("transform", "translate(" + (width - dockWidth) + "," + (dockHeight + queryHeight + query_box_height - 8) + ")")
							.attr("id", "BirdViewCanvas");
		this.birdclipped = this.birdtemp.append("clipPath").attr("id","BirdClipped")
		this.birdtemp.append("rect").attr("rx", 5).attr("ry", 5).attr("width", dockWidth).attr("height", h).attr("fill", "white").attr("stroke", "black")
		this.birdclipped.append("rect").attr("rx", 5).attr("ry", 5).attr("width", dockWidth).attr("height", h).attr("fill", "white").attr("stroke", "black")

		var svgns = 'http://www.w3.org/1999/xlink'
		Bird = document.createElementNS(xmlns,'use');
		Bird.setAttributeNS(svgns,'xlink:href','#VisDockViewPort');
		Bird.setAttributeNS(null, "clip-path","url(#BirdClipped)")
		Bird.setAttributeNS(null, "transform", "scale(0.5)")
		
		this.birdtemp[0][0].appendChild(Bird)*/
	
		Toolbox.panelbox.on("mousedown", function(){
								var dx = d3.mouse(Toolbox.panelbox[0][0])[0];
								var dy = d3.mouse(Toolbox.panelbox[0][0])[1];	
							Toolbox.move = 1;
						d3.selectAll("html").on("mousemove", function(){
							if (Toolbox.move == 1){
								//var xy = d3.mouse(this);
								var x = d3.mouse(this)[0];
								var y = d3.mouse(this)[1];
								var x2 = d3.mouse(VisDock.svg[0][0])[0];
								var y2 = d3.mouse(VisDock.svg[0][0])[1];
								
								VisDock.svg.attr("pointer-events", "none");
								
								//var dx = d3.mouse(Toolbox.panelbox[0][0])[0];
								//var dy = d3.mouse(Toolbox.panelbox[0][0])[1];
								//d3.selectAll("svg").attr("pointer-events", "none")
								
								var offset = parseInt(Toolbox.dock.selectAll("text").style("font-size"),10);
								offset += padding / 2 ; 
								
								if (y2 >= VisDock.svgHeight - dockWidth) {
									
								
									VisDock.dockOrient = 0;
									dockHeight = 300 + 3 * buttonHeight + 2 * padding;
									var rotate = -90;
									if (x2 <= titleOffset){
										var xoff = 0;
									}else {
										var xoff = x2-dy-10;
									}
									//Toolbox.dock
																		//Toolbox.dock.attr("transform", "translate(" + (x-dx-10) + "," + (y-dy-40) + ")rotate("+ rotate + ")")
									var numButtonCols2 = 3;
									var yPos2 = Math.floor(Toolbox.tools.length / numButtonCols2) * buttonOffset + offset;
									if (Toolbox.hideorshow) Toolbox.dock[0][0].childNodes[0].setAttributeNS(null, "height", dockHeight*4/5);
									Toolbox.dock[0][0].childNodes[0].setAttributeNS(null, "width", dockWidth - buttonHeight + titleOffset);
									
									d3.selectAll(".borderline").attr("transform", "translate(" + (3*buttonHeight+titleOffset) + "," + (yPos2-3*buttonHeight) + ")");
									d3.selectAll(".borderline").selectAll("image").attr("transform","translate(14,-14)rotate(90)");
									d3.selectAll(".borderline").selectAll("rect").attr("transform","translate(14,-14)rotate(90)");
									d3.selectAll(".borderline").selectAll("text").attr("transform","rotate(90)");
									
									Toolbox.dock.selectAll("text")[0][0].setAttributeNS(null, "transform", "translate(" + (3*buttonHeight+2*titleOffset+1*padding) + ",0) rotate(90)");
									d3.selectAll(".MinMax").attr("transform", "translate(" + (-1*buttonHeight+2*padding) + ", 0)");
									
									//d3.selectAll(".borderline").attr("transform", "translate(0,0)rotate(90)")//(0," + (2*buttonSize + 2*padding) + ")")
									//d3.selectAll(".borderline").attr("transform", "translate(0," + (2*buttonSize + 2*padding) + ")")
								
									var buttons = Toolbox.dock.selectAll("g")[0];
									for (var i = 0; i < Toolbox.tools.length; i++) {

									// Create the button group
										var xPos = -18 + (i % numButtonCols2) * 3/4 * buttonOffset + padding;
										var yPos = Math.floor(i / numButtonCols2) * buttonOffset + offset;
										//button[i] = this.dock.append("g").attr("transform", "translate(" + xPos + ", " + yPos + ")").on("click", this.tools[i].select);
										buttons[i].setAttributeNS(null, "transform", "translate(" + (xPos + buttonSize) + ", " + yPos + ")rotate(90)");//.on("click", Toolbox.tools[i].select);
										
									// Create the button panel
										//button[i].append("rect").attr("x", 0).attr("y", 0).attr("rx", 10).attr("ry", 10).attr("width", buttonSize).attr("height", buttonSize).attr("id", this.tools[i].name).attr("class", "button");

									// Create the label
										//button[i].append("svg:text").attr("x", buttonSize / 2).attr("y", (buttonSize * 3 / 4 + 10)).attr("text-anchor", "middle").attr("class", "label").text(this.tools[i].name);

										//button[i].append("svg:image").attr("x", (buttonSize / 4)).attr("y", (buttonSize / 4)).attr("width", buttonSize / 2).attr("height", buttonSize / 2).attr("xlink:href", this.tools[i].image);

									}
									
									
									var eoffx = (dockWidth - dockWidth*VisDock.responseScaleX); /// VisDock.responseScaleX; // extra offset due to response;
									var eoffy = (dockHeight - dockHeight*VisDock.responseScaleY); /// VisDock.responseScaleY; // extra offset due to response;
																											
									Toolbox.dock.attr("transform", "translate(" + (xoff) + "," + (VisDock.svgHeight) + ")rotate("+ rotate + ")scale(" 
											+ VisDock.responseScaleX + "," + VisDock.responseScaleY + ")");
									d3.selectAll(".QueryDock")
										.attr("transform", "translate(" + (xoff+4/5*dockHeight-eoffx*2) + "," + (VisDock.svgHeight) + ")rotate("+ rotate +")scale("
											+ VisDock.responseScaleX + "," + VisDock.responseScaleY + ")");
										
									d3.selectAll(".QueryDock").selectAll("rect")[0][0].setAttributeNS(null, "width", dockWidth - buttonHeight + titleOffset);//dockWidth - buttonHeight + titleOffset - QueryManager.b_width)
									d3.selectAll(".ScrollBar").attr("transform", "translate("+ (dockWidth - buttonHeight + titleOffset - QueryManager.b_width) + ",0)");
									
									var QueryBoxes = d3.selectAll(".QueryBox")[0];
									var QueryBoxes2 = d3.selectAll(".QueryBox2")[0];
									for (var i = 0; i < QueryBoxes.length; i++){
										QueryBoxes[i].childNodes[0].setAttributeNS(null, "width", dockWidth - buttonHeight + titleOffset - 1 * QueryManager.b_width);
										QueryBoxes[i].childNodes[8].setAttributeNS(null, "display", "none");
										for (var j = 1; j < 5; j++){
											QueryBoxes[i].childNodes[j].setAttributeNS(null, "transform", "translate(" + (-1*buttonSize) + ",0)");
										}
										for (var j = 5; j < 8; j++){
											QueryBoxes[i].childNodes[j].setAttributeNS(null, "transform", "translate(" + (153.3-1*buttonSize) + ",5)");
										}											
									}	
									for (var i = 0; i < QueryBoxes2.length; i++){
										QueryBoxes2[i].childNodes[0].setAttributeNS(null, "width", dockWidth - buttonHeight + titleOffset - 1 * QueryManager.b_width);
										QueryBoxes2[i].childNodes[6].setAttributeNS(null, "display", "none");
										for (var j = 1; j < 3; j++){
											QueryBoxes2[i].childNodes[j].setAttributeNS(null, "transform", "translate(" + (-1*buttonSize) + ",0)");
										}
										for (var j = 3; j < 6; j++){
											QueryBoxes2[i].childNodes[j].setAttributeNS(null, "transform", "translate(" + (153.3-1*buttonSize) + ",5)");
										}										
									}
									
									d3.selectAll(".SETOP")[0][0].childNodes[0].setAttributeNS(null, "width", dockWidth - buttonSize + titleOffset);
									d3.selectAll(".SETOP")[0][0].childNodes[0].setAttributeNS(null, "height", (query_box_height + QueryManager.b_width));
									d3.selectAll(".DELETE").attr("transform", "translate(" + (QueryManager.b_width/2 + QueryManager.margin + query_box_height - 2 * QueryManager.margin) + "," + QueryManager.margin + ")rotate(90)");
									d3.selectAll(".OR").attr("transform", "translate(" + (QueryManager.b_width/2 + queryWidth / 4 * 2 / 3 + QueryManager.margin + query_box_height - 2 * QueryManager.margin) + "," + QueryManager.margin + ")rotate(90)");
									d3.selectAll(".AND").attr("transform", "translate(" + (QueryManager.b_width/2 + 2 * queryWidth / 4 * 2 / 3 + QueryManager.margin + query_box_height - 2 * QueryManager.margin) + "," + QueryManager.margin + ")rotate(90)");
									d3.selectAll(".XOR").attr("transform", "translate(" + (QueryManager.b_width/2 + 3 * queryWidth / 4 * 2 / 3 + QueryManager.margin + query_box_height - 2 * QueryManager.margin) + "," + QueryManager.margin + ")rotate(90)");
									//d3.selectAll(".DELETE")[0][0].childNodes[0].setAttributeNS(null, "width", (queryWidth / 4 - 2 * QueryManager.margin) * 2/3)	
									//d3.selectAll(".DELETE")[0][0].childNodes[1].setAttributeNS(null, "x", 5)
																								
								} else if (y2 < VisDock.svgHeight - dockWidth) {
									
									VisDock.dockOrient = 1;
									dockHeight = 300;
									if (y2 <= titleOffset){
										var yoff = 0;
									} else {
										var yoff = y2-dy-40;
									}
									if (x2 > VisDock.svgWidth - dockWidth){
										var xoff = VisDock.svgWidth - dockWidth;
									}else {
										var xoff = x2-dx-10;
									}
									
									var numButtonCols2 = 3;
									if (Toolbox.hideorshow) Toolbox.dock[0][0].childNodes[0].setAttributeNS(null, "height", dockHeight);
									Toolbox.dock[0][0].childNodes[0].setAttributeNS(null, "width", dockWidth);
									
									var buttons = Toolbox.dock.selectAll("g")[0];
									var yPos2 = Math.floor(Toolbox.tools.length / numButtonCols2) * (1) * (3/4)*buttonOffset + offset;
									d3.selectAll(".borderline").attr("transform", "translate(" + (25) + "," + yPos2 + ")");
									d3.selectAll(".borderline").selectAll("image").attr("transform","rotate(0)");
									d3.selectAll(".borderline").selectAll("rect").attr("transform","rotate(0)");
									d3.selectAll(".borderline").selectAll("text").attr("transform","translate(20,13)rotate(0)");					
									
									Toolbox.dock.selectAll("text")[0][0].setAttributeNS(null, "transform", "translate(" + (0) + ",0) rotate(0)");
									d3.selectAll(".MinMax").attr("transform", "translate(0, 0)");
																		
									for (var i = 0; i < Toolbox.tools.length; i++) {

									// Create the button group
										var xPos = (i % numButtonCols2) * buttonOffset + padding;
										var yPos = Math.floor(i / numButtonCols2) * (3 / 4) * buttonOffset + offset;
										//button[i] = this.dock.append("g").attr("transform", "translate(" + xPos + ", " + yPos + ")").on("click", this.tools[i].select);
										buttons[i].setAttributeNS(null, "transform", "translate(" + (xPos) + ", " + yPos + ")rotate(0)");//.on("click", Toolbox.tools[i].select);

									}
																		
										
									if (x2 - dx < 0) var xoff = 0;								
									var rotate = 0;
									var eoffx = (dockWidth - dockWidth*VisDock.responseScaleX); /// VisDock.responseScaleX; // extra offset due to response;
									var eoffy = (dockHeight - dockHeight*VisDock.responseScaleY); /// VisDock.responseScaleY; // extra offset due to response;
									Toolbox.dock.attr("transform", "translate(" + (xoff+eoffx*1) + "," + (yoff+eoffy*0) + ")rotate("+ rotate + ")scale(" 
									+ VisDock.responseScaleX + "," + VisDock.responseScaleY + ")");
									
									d3.selectAll(".QueryDock")
										//.attr("transform", "translate(" + (x-dx-10) + "," + (y-dy+dockHeight-40) + ")rotate("+ rotate +")")
										.attr("transform", "translate(" + (xoff+eoffx*1) + "," + (yoff-eoffy*1+dockHeight) + ")rotate("+ rotate +")scale("
											+ VisDock.responseScaleX + "," + VisDock.responseScaleY +")");
										
										
										
									d3.selectAll(".QueryDock").selectAll("rect")[0][0].setAttributeNS(null, "width", dockWidth);
									d3.selectAll(".ScrollBar").attr("transform", "translate("+ (dockWidth - QueryManager.b_width) + ",0)");
									
									var QueryBoxes = d3.selectAll(".QueryBox")[0];
									var QueryBoxes2 = d3.selectAll(".QueryBox2")[0];
									for (var i = 0; i < QueryBoxes.length; i++){
										QueryBoxes[i].childNodes[0].setAttributeNS(null, "width", dockWidth - 1 * QueryManager.b_width);
										QueryBoxes[i].childNodes[8].setAttributeNS(null, "display", "in-line");
										for (var j = 1; j < 5; j++){
											QueryBoxes[i].childNodes[j].setAttributeNS(null, "transform", "translate(" + (0) + ",0)");
										}
										for (var j = 5; j < 8; j++){
											QueryBoxes[i].childNodes[j].setAttributeNS(null, "transform", "translate(" + (153.3) + ",5)");
										}											
									}	
									for (var i = 0; i < QueryBoxes2.length; i++){
										QueryBoxes2[i].childNodes[0].setAttributeNS(null, "width", dockWidth - 1 * QueryManager.b_width);
										QueryBoxes2[i].childNodes[6].setAttributeNS(null, "display", "in-line");
										for (var j = 1; j < 3; j++){
											QueryBoxes2[i].childNodes[j].setAttributeNS(null, "transform", "translate(" + (0) + ",0)");
										}
										for (var j = 3; j < 6; j++){
											QueryBoxes2[i].childNodes[j].setAttributeNS(null, "transform", "translate(" + (153.3) + ",5)");
										}										
									}									
									d3.selectAll(".SETOP")[0][0].childNodes[0].setAttributeNS(null, "width", dockWidth);
									d3.selectAll(".SETOP")[0][0].childNodes[0].setAttributeNS(null, "height", (query_box_height));
									d3.selectAll(".DELETE").attr("transform", "translate(" + (0*QueryManager.b_width/2 + QueryManager.margin + 0 * query_box_height - 0 * QueryManager.margin) + "," + QueryManager.margin + ")rotate(0)");
									d3.selectAll(".OR").attr("transform", "translate(" + (0*QueryManager.b_width/2 + queryWidth / 4 * 1 + QueryManager.margin + 0 * query_box_height - 0 * QueryManager.margin) + "," + QueryManager.margin + ")rotate(0)");
									d3.selectAll(".AND").attr("transform", "translate(" + (0*QueryManager.b_width/2 + 2 * queryWidth / 4 * 1 + QueryManager.margin + 0 * query_box_height - 0 * QueryManager.margin) + "," + QueryManager.margin + ")rotate(0)");
									d3.selectAll(".XOR").attr("transform", "translate(" + (0*QueryManager.b_width/2 + 3 * queryWidth / 4 * 1 + QueryManager.margin + 0 * query_box_height - 0 * QueryManager.margin) + "," + QueryManager.margin + ")rotate(0)");

									
								} else if (y2 <= titleOffset){
									
								}
								
								

								//d3.selectAll(".Bird")
								//	.attr("transform", "translate(" + (x-dx-10) + 
								//	"," + (y-dy+dockHeight+query_box_height+QueryManager.b_height-40) + ")")
							} 
						});
						d3.selectAll("html").on("mouseup", function(){
							if (Toolbox.move == 1){
								Toolbox.move = 0;
								//d3.selectAll("svg").attr("pointer-events", "visiblePainted")
								VisDock.svg.attr("pointer-events", "visiblePainted");
							}
						});
					});		
		

	},
	setupDefault: function(objects, clone, vis){
		VisDock.objects = objects;
		VisDock.opacity = vis;
		VisDock.eventHandler = {
			getHitsPolygon : function(points, inclusive) {
				var shapebound = new createPolygon(points);
				var hits = [];
				for (var i = 0; i < VisDock.objects.length; i++){
					if (VisDock.objects[i].tagName == "path"){
						var captured = shapebound.intersectPath([VisDock.objects[i]], inclusive);
					} else if (VisDock.objects[i].tagName == "circle"){
						var captured = shapebound.intersectEllipse([VisDock.objects[i]], inclusive);
					} else if (VisDock.objects[i].tagName == "ellipse"){
						var captured = shapebound.intersectEllipse([VisDock.objects[i]], inclusive);
					} else if (VisDock.objects[i].tagName == "polygon"){
						var captured = shapebound.intersectPolygon([VisDock.objects[i]], inclusive);
					} else if (VisDock.objects[i].tagName == "rect"){
						var captured = shapebound.intersectPolygon([VisDock.objects[i]], inclusive);
					} else if (VisDock.objects[i].tagName == "line"){
						var captured = shapebound.intersectLine([VisDock.objects[i]], inclusive);
					}
					if (captured.length == 1) {
						hits.push(captured[0]);
					}
				}
				return hits; //shapebound.intersectPath(VisDock.objects, inclusive);
			},
			getHitsLine : function(points, inclusive) {
				var shapebound = new createLine(points);
				var hits = [];
				for (var i = 0; i < VisDock.objects.length; i++){
					if (VisDock.objects[i].tagName == "path"){
						var captured = shapebound.intersectPath([VisDock.objects[i]], inclusive);
					} else if (VisDock.objects[i].tagName == "circle"){
						var captured = shapebound.intersectEllipse([VisDock.objects[i]], inclusive);
					} else if (VisDock.objects[i].tagName == "ellipse"){
						var captured = shapebound.intersectEllipse([VisDock.objects[i]], inclusive);
					} else if (VisDock.objects[i].tagName == "polygon"){
						var captured = shapebound.intersectPolygon([VisDock.objects[i]], inclusive);
					} else if (VisDock.objects[i].tagName == "rect"){
						var captured = shapebound.intersectPolygon([VisDock.objects[i]], inclusive);
					} else if (VisDock.objects[i].tagName == "line"){
						var captured = shapebound.intersectLine([VisDock.objects[i]], inclusive);
					}
					if (captured.length == 1) hits.push(captured[0]);
				}
				return hits; //
			},
			getHitsEllipse : function(points, inclusive) {
				var shapebound = new createEllipse(points);
				var hits = [];
				for (var i = 0; i < VisDock.objects.length; i++){
					if (VisDock.objects[i].tagName == "path"){
						var captured = shapebound.intersectPath([VisDock.objects[i]], inclusive);
					} else if (VisDock.objects[i].tagName == "circle"){
						var captured = shapebound.intersectEllipse([VisDock.objects[i]], inclusive);
					} else if (VisDock.objects[i].tagName == "ellipse"){
						var captured = shapebound.intersectEllipse([VisDock.objects[i]], inclusive);
					} else if (VisDock.objects[i].tagName == "polygon"){
						var captured = shapebound.intersectPolygon([VisDock.objects[i]], inclusive);
					} else if (VisDock.objects[i].tagName == "rect"){
						var captured = shapebound.intersectPolygon([VisDock.objects[i]], inclusive);
					} else if (VisDock.objects[i].tagName == "line"){
						var captured = shapebound.intersectLine([VisDock.objects[i]], inclusive);
					}
					if (captured.length == 1) hits.push(captured[0]);
				}
				return hits; //
			},
			setColor : function(hits) {
				QueryManager.layers[num - 1] = [];
				for (var i = 0; i < hits.length; i++) {
					if (hits[i].tagName == "polygon"){
						VisDock.utils.addPolygonLayer(hits[i], "fill: " + VisDock.color[num - 1] + "; opacity: " + VisDock.opacity, num - 1);
					} else if (hits[i].tagName == "path"){
						VisDock.utils.addPathLayer(hits[i], "fill: " + VisDock.color[num - 1] + "; opacity: " + VisDock.opacity, num - 1);
					} else if (hits[i].tagName == "ellipse" || hits[i].tagName == "circle"){
						VisDock.utils.addEllipseLayer(hits[i], "fill: " + VisDock.color[num - 1] + "; opacity: " + VisDock.opacity, num - 1);
					} else if (hits[i].tagName == "line" || hits[i].tagName == "polyline"){
						VisDock.utils.addLineLayer(hits[i], "fill: " + VisDock.color[num - 1] + "; opacity: " + VisDock.opacity, num - 1);
					} 
					//var str = hits[i].getAttributeNS(null, "transform");
					//var d = hits[i].getAttributeNS(null, "d");
			//QueryManager.layers[num - 1][i] = d3.select(hits[i].parentNode).append("path").attr("transform", str)
			//	.attr("d", d)
			//	.attr("style", "fill: " + VisDock.color[num-1] + "; stroke:" + VisDock.color[num - 1] + "; opacity: 0.5; pointer-events: none")
				//.attr("id", hits[i].getAttributeNS(null, "id"))
				//		.attr("class", "VisDockPathLayer");
				}
			},
			changeColor : function(color, query, index) {
				var vis = VisDock.utils.getQueryVisibility(index);
				for (var i = 0; i < query.length; i++) {
					query[i][0][0].setAttributeNS(null, "style", "stroke: " + color + "; fill:none; opacity: " + vis);
				}
			},
			changeVisibility : function(vis, query, index) {
				for (var i = 0; i < query.length; i++) {
					var color = query[i][0][0].getAttributeNS(null, "style").split(";")[1];
					query[i][0][0].setAttributeNS(null, "style", "fill: none;" + color + "; opacity: " + vis);
				}
			},
			removeColor : function(hits, index) {
				for (var i = 0; i < hits.length; i++) {
					hits[i].remove();
				}
			},

		};		
	},
	startChrome: function(){
		var Chrome =(/Firefox/i.test(navigator.userAgent))? 0 : 1;
		var xmlns = "http://www.w3.org/2000/svg";
		var svgns = "http://www.w3.org/1999/xlink"; 
		
		if (VisDock.mode == "single"){
			if (Chrome && BirdView.birdinit) {
				BirdView.removeBirdView();
			}
			if (Chrome && CircMagLens.lensOn){
   			   	CircMagLens.node.setAttributeNS(svgns,'xlink:href', null);				
					//CircMagLens.uninstall();
				CircMagLens.lensOn = 1;
			}
			if (Chrome && RectMagLens.lensOn){
   			   	RectMagLens.node.setAttributeNS(svgns,'xlink:href', null);				
				RectMagLens.lensOn = 1;
			}				
		} else {
			for (var i = 0; i < VisDock.svgArray.length; i++){
				if (Chrome && BirdView.birdinit) {
					BirdView.removeBirdView();
				}
				if (Chrome && CircMagLens.lensOn){
   				   	CircMagLens.nodeArray[i].setAttributeNS(svgns,'xlink:href', null);				
						//CircMagLens.uninstall();
					CircMagLens.lensOn = 1;
				}
				if (Chrome && RectMagLens.lensOn){
   				   	RectMagLens.nodeArray[i].setAttributeNS(svgns,'xlink:href', null);				
					RectMagLens.lensOn = 1;
				}				
			}	
		}
	
	},
	finishChrome: function(){
		var Chrome =(/Firefox/i.test(navigator.userAgent))? 0 : 1;
		var xmlns = "http://www.w3.org/2000/svg";
		var svgns = "http://www.w3.org/1999/xlink"; 
		if (VisDock.mode == "single") {
			if (Chrome && BirdView.birdinit) {
				BirdView.restoreBirdView();//this.Bird.setAttributeNS(svgns,'xlink:href','#VisDockViewPort');
				//BirdView.init(Panel.panel, BirdView.width, BirdView.height)
			}
			if (Chrome && CircMagLens.lensOn){
				CircMagLens.node.setAttributeNS(svgns,'xlink:href', '#VisDockViewPort');
			}	
			if (Chrome && RectMagLens.lensOn){
				RectMagLens.node.setAttributeNS(svgns,'xlink:href', '#VisDockViewPort');
			}						
		} else {
			for (var i = 0; i < VisDock.svgArray.length; i++){
				if (Chrome && BirdView.birdinit) {
					BirdView.restoreBirdView();//this.Bird.setAttributeNS(svgns,'xlink:href','#VisDockViewPort');
				//BirdView.init(Panel.panel, BirdView.width, BirdView.height)
				}
				if (Chrome && CircMagLens.lensOn){
					CircMagLens.nodeArray[i].setAttributeNS(svgns,'xlink:href', '#VisDockViewPort');
				}	
				if (Chrome && RectMagLens.lensOn){
					RectMagLens.nodeArray[i].setAttributeNS(svgns,'xlink:href', '#VisDockViewPort');
				}					
			}
		}	
	
	},
	getBirdViewport : function() {

		return BirdView.viewport;
	},
	StartBirdViewBound : function(width, height, tx, ty, sx, sy) {
		BirdView.StartBound(width, height, tx, ty, sx, sy);
	},

	getViewport : function(n) {
		if (VisDock.mode == "single")
			return Panel.hostvis;
		else {
			if (n == undefined)	return Panel.multivis[0];
			else return Panel.multivis[n];
			//return Panel.multivis;
		}
	},
	utils : {
		getQueryColor : function(index) {
			return QueryManager.colors[index];
		},
		changeQueryColor : function(index, color) {
			QueryManager.colors[index] = color;
		},
		getQueryVisibility : function(index) {
			return QueryManager.visibility[index];
		},
		addPathLayer : function(path, style, index) {
			if (QueryManager.layers[num - 1] == undefined) {
				QueryManager.layers[num - 1] = [];
				QueryManager.colors[num - 1] = [];
				QueryManager.visibility[num - 1] = [];
			}
			
			if (VisDock.mode == "single"){
				var pView = Panel.viewport;
			} else {
				pView = Panel.multiview[Panel.viewindex];
			}			
			
			var d = path.getAttributeNS(null, "d");
			var T = path.getCTM();
			var T2 = pView[0][0].getCTM();
			var t = T2.inverse().multiply(T);
			T = t;
			//T = Panel.viewport[0][0].getCTM().inverse();//T2.inverse();
			
			//var viewport = d3.select("#VisDockViewPort")[0][0];

			if (path._VisDockID == undefined){
				var stop = 1;
			}

			if (style == null){
				var P = pView.append("path")
					.attr("d", d)
					.attr("style", "opacity:" + VisDock.opacity + "; fill:" + VisDock.color[index])// + "; pointer-events: none")
					.attr("pointer-events", "none")
					.attr("id", "cloned" + path._VisDockID)
					.attr("class", "VisDockPathLayer")
					.attr("transform", "matrix(" + T.a + "," + T.b + "," + T.c + "," +
						T.d + "," + T.e + "," + T.f + ")");										
			} else {
				var P = pView.append("path")
					.attr("d", d)
					.attr("style", style)// + "; pointer-events: none")
					.attr("pointer-events", "none")
					.attr("id", "cloned" + path._VisDockID)
					.attr("class", "VisDockPathLayer")		
					.attr("transform", "matrix(" + T.a + "," + T.b + "," + T.c + "," +
						T.d + "," + T.e + "," + T.f + ")");							
			}

			QueryManager.layers[num - 1].push(P);
			if (QueryManager.colors[num - 1] == undefined) QueryManager.colors[num - 1] = [];
			if (QueryManager.colors[num - 1].length == 0) {
				QueryManager.colors[num - 1] = VisDock.color[num - 1];
				QueryManager.visibility[num - 1] = VisDock.opacity;
			}
		},
		addEllipseLayer : function(ellipse, style, index) {
			if (QueryManager.layers[num - 1] == undefined) {
				QueryManager.layers[num - 1] = [];
				QueryManager.colors[num - 1] = [];
				QueryManager.visibility[num - 1] = [];
			}
			
			if (VisDock.mode == "single"){
				var pView = Panel.viewport;
			} else {
				pView = Panel.multiview[Panel.viewindex];
			}
			
			var T = ellipse.getCTM();//.inverse();
			var T2 = pView[0][0].getCTM();
			var t = T2.inverse().multiply(T);
			T = t;
						
			var cx = parseFloat(ellipse.getAttributeNS(null, "cx"));
			if (isNaN(cx)){
				cx = 0;
			}
			
			var cy = parseFloat(ellipse.getAttributeNS(null, "cy"));
			if (isNaN(cy)){//ellipse.getAttributeNS(null, "cy") == "") {
				cy = 0;
			}
			if (ellipse.tagName == "ellipse") {
				var rx = parseFloat(ellipse.getAttributeNS(null, "rx"));
				var ry = parseFloat(ellipse.getAttributeNS(null, "ry"));
			} else {
				var rx = parseFloat(ellipse.getAttributeNS(null, "r"));
				var ry = rx;
			}
			//var viewport = d3.select("#VisDockViewPort")[0][0];
			if (style == null || style == undefined){
				var style = "opacity:" + VisDock.opacity + "; fill:" + VisDock.color[index];
			
			}
			var C = pView.append("ellipse")
				.attr("cx", cx)
				.attr("cy", cy)
				.attr("rx", rx)
				.attr("ry", ry)
				.attr("display", "inline")
				.attr("style", style)// + "; pointer-events: none")
				.attr("id", "cloned" + ellipse._VisDockID)
				.attr("class", "VisDockEllipseLayer")
				.attr("pointer-events", "none")
				.attr("transform", "matrix(" + T.a + "," + T.b + "," + T.c + "," +
				T.d + "," + T.e + "," + T.f + ")");
				//.attr("transform", "translate("+ [Panel.x, Panel.y]+")");

			QueryManager.layers[index].push(C);
			if (QueryManager.colors[num - 1] == undefined) QueryManager.colors[num - 1] = [];
			if (QueryManager.colors[index].length == 0) {
				QueryManager.colors[index] = VisDock.color[index];
				QueryManager.visibility[index] = VisDock.opacity;
			}
		},
		addPolygonLayer : function(polygon, style, index) {
			if (QueryManager.layers[num - 1] == undefined) {
				QueryManager.layers[num - 1] = [];
				QueryManager.colors[num - 1] = [];
				QueryManager.visibility[num - 1] = [];
			}
			
			var gView, pView, panelview, mainpanel;
			if (VisDock.mode == "single"){
				gView = Panel.hostvis;
				pView = Panel.viewport;
				mainpanel = Panel.panel;
				panelview = VisDock.svg;
			} else {
				//AnnotatedByAreaTool.index = parseInt(this.parentNode.getAttribute("id").split("svgVisDock")[1]);
				gView = Panel.multivis[Panel.viewindex];
				pView = Panel.multiview[Panel.viewindex];
				mainpanel = Panel.panelArray[Panel.viewindex];
				panelview = VisDock.svgArray[Panel.viewindex];
			}
					
			if (polygon.tagName == "rect"){
				var px = parseFloat(polygon.getAttributeNS(null, "x"));
				if (isNaN(px)){
					px = 0;
				}
				
				var py = parseFloat(polygon.getAttributeNS(null, "y"));
				if (isNaN(py)){
					py = 0;
				}
				var height = polygon.getAttributeNS(null, "height");
				var width = polygon.getAttributeNS(null, "width");
				var T = polygon.getCTM();//.inverse();;//getAttributeNS(null, "transform")
				//var T = path.getCTM();
				var T2 = pView[0][0].getCTM();
				//var T2 = Panel.viewport[0][0].getCTM();
				var t = T2.inverse().multiply(T);
				T = t;
				
			//var viewport = d3.select("#VisDockViewPort")[0][0];
				if (style == null || style == undefined){
					var style = "opacity:" + VisDock.opacity + "; fill:" + VisDock.color[index];// + ";pointer-events: none";
				}			
				//var C = Panel.viewport.append("rect")
				var C = pView.append("rect")
					.attr("x", px)
					.attr("y", py)
					.attr("height", height)
					.attr("width", width)
					.attr("style", style)// + "; pointer-events: none")
					.attr("pointer-events", "none")
					.attr("transform", "matrix(" + T.a + "," + T.b + "," + T.c + "," + T.d +
					"," + T.e + "," + T.f + ")")
					.attr("id", "cloned" + polygon._VisDockID)
					.attr("class", "VisDockPolygonLayer");				
			} else {
				var points = polygon.getAttributeNS(null, "points");
				var T = polygon.getCTM();//.inverse();;//getAttributeNS(null, "transform")
				//var T = path.getCTM();
				//var T2 = Panel.viewport[0][0].getCTM();
				var T2 = pView[0][0].getCTM();
				var t = T2.inverse().multiply(T);
				T = t;				
			//var viewport = d3.select("#VisDockViewPort")[0][0];
				if (style == null){
					var style = "opacity:" + VisDock.opacity + "; fill:" + VisDock.color[num - 1];// + ";pointer-events: none";
				}
				//var C = Panel.viewport.append("polygon")
				var C = pView.append("polygon")
					.attr("points", points)
					.attr("style", style)
					.attr("class", "VisDockPolygonLayer")
					.attr("id", "cloned" + polygon._VisDockID)	
					.attr("pointer-events", "none")		
					.attr("transform", "matrix(" + T.a + "," + T.b + "," + T.c + "," + T.d +
					"," + T.e + "," + T.f + ")");
				//.attr("transform", "translate("+ [Panel.x, Panel.y]+")");
			}
			QueryManager.layers[num - 1].push(C);
			if (QueryManager.colors[num - 1] == undefined) QueryManager.colors[num - 1] = [];
			if (QueryManager.colors[num - 1].length == 0) {
				QueryManager.colors[num - 1] = VisDock.color[num - 1];
				QueryManager.visibility[num - 1] = VisDock.opacity;
			}
		},
		changeVisibility: function(vis, query){
			var isVis = parseFloat(query[0][0][0].getAttribute("opacity"));
			var isStyle = 0;
			if (isNaN(isVis)){
				isVis = 0;
				isStyle = 1;
			}
			for (var i = 0; i < query.length; i++){
				if (isVis){
					query[i][0][0].setAttribute("opacity", vis);
				} else {
					var style = query[i][0][0].getAttribute("style").split(";");
					var newStyle = "";
					for (var j = 0; j < style.length; j++){
						var substr = style[j].split(/opacity|Opacity/g);
						if (substr.length == 2){
							substr = "opacity: " + vis + ";";
						}
						if (j == 0){
							newStyle = substr;
						} else {
							newStyle = newStyle + ";" + substr;
						}
					}
					query[i][0][0].setAttribute("style", newStyle);
				}
			}
		},
		changeColor: function(color, query, attribute){
			var isColor = parseFloat(query[0][0][0].getAttribute(attribute));
			var isStyle = 0;
			if (isNaN(isColor)){
				isColor = 0;
				isStyle = 1;
			}
			for (var i = 0; i < query.length; i++){
				if (isColor){
					query[i][0][0].setAttribute(attribute, color);
				} else {
					var style = query[i][0][0].getAttribute("style").split(";");
					var newStyle = "";
					for (var j = 0; j < style.length; j++){
						var substr = style[j].split(attribute);
						if (substr.length == 2){
							substr = attribute + ": " + color;
						}
						if (j == 0){
							newStyle = substr;
						} else {
							newStyle = newStyle + ";" + substr;
						}
						
					}
					query[i][0][0].setAttribute("style", newStyle);
				}
			}			
		},		
		addLineLayer : function(line, style, index) {
			if (QueryManager.layers[num - 1] == undefined) {
				QueryManager.layers[num - 1] = [];
				QueryManager.colors[num - 1] = [];
				QueryManager.visibility[num - 1] = [];
			}
			var x1 = line.getAttributeNS(null, "x1");
			var y1 = line.getAttributeNS(null, "y1");
			var x2 = line.getAttributeNS(null, "x2");
			var y2 = line.getAttributeNS(null, "y2");
			var T = line.getCTM();//.inverse();;
			//var T = path.getCTM();
			var T2 = Panel.viewport[0][0].getCTM();
			var t = T2.inverse().multiply(T);
			T = t;			
			//var points = polygon.getAttributeNS(null, "points");
			//var viewport = d3.select("#VisDockViewPort")[0][0];
			if (style == null){
				var style = "opacity:" + VisDock.opacity + "; fill:" + VisDock.color[num - 1]; // + ";pointer-events: none";
			}			
			var C = Panel.viewport.append("line")
				.attr("x1", x1)
				.attr("y1", y1)
				.attr("x2", x2)
				.attr("y2", y2)
				//.attr("points", points)
				//.attr("style", "opacity:" + VisDock.opacity + "; fill:" + VisDock.color[num - 1])
				.attr("style", style)
				.attr("pointer-events", "none")
				.attr("class", "VisDockLineLayer")
				.attr("id", "cloned" + line._VisDockID)
				.attr("transform", "matrix(" + T.a + "," + T.b + "," + T.c + "," + T.d +
					"," + T.e + "," + T.f + ")");
				//.attr("transform", "translate("+ [Panel.x, Panel.y]+")");

			QueryManager.layers[num - 1].push(C);
			if (QueryManager.colors[num - 1] == undefined) QueryManager.colors[num - 1] = [];
			if (QueryManager.colors[num - 1].length == 0) {
				QueryManager.colors[num - 1] = VisDock.color[num - 1];
				QueryManager.visibility[num - 1] = VisDock.opacity;
			}
		}			
	},
	updateLayers : function(){
		var types = ["Path", "Ellipse", "Polygon", "Line"];
		if (d3.selectAll(".VisDockPathLayer")[0].length != 0){
			var paths = d3.selectAll(".VisDockPathLayer")[0];
			for (var v = 0; v < paths.length; v++){
				if (paths[v] == undefined){
					var stop = 1;
				}
				var id = paths[v].getAttribute("id").split("cloned_vis")[1];
				if (VisDock.searchLayers[id] == undefined){
					var stop = 1;
				}
				
				var d =	VisDock.searchLayers[id].getAttribute("d");
				var t = VisDock.searchLayers[id].getCTM();//.inverse;
				//var T = path.getCTM();
				var T2 = Panel.viewport[0][0].getCTM();
				var T = T2.inverse().multiply(t);
				t = T;
								
				paths[v].setAttribute("d", d);
				paths[v].setAttribute("transform", "matrix("+ t.a + "," + t.b +
				"," + t.c + "," + t.d + "," + t.e + "," + t.f + ")");
			}
		}
		if (d3.selectAll(".VisDockEllipseLayer")[0].length != 0){
			var ellipses = d3.selectAll(".VisDockEllipseLayer")[0];
			for (var v = 0; v < ellipses.length; v++){
				var id = ellipses[v].getAttribute("id").split("cloned_vis")[1];
				var cx = parseFloat(VisDock.searchLayers[id].getAttribute("cx"));
				var cy = parseFloat(VisDock.searchLayers[id].getAttribute("cy"));
				var r = parseFloat(VisDock.searchLayers[id].getAttribute("r"));
				if (isNaN(cx)){
					cx = 0;
				}
				if (isNaN(cy)){
					cy = 0;
				}
				var t = VisDock.searchLayers[id].getCTM();//.inverse;
				
				var T = VisDock.searchLayers[id].getCTM();
				var T2 = Panel.viewport[0][0].getCTM();
				var t = T2.inverse().multiply(T);
				
				ellipses[v].setAttribute("cx", cx);
				ellipses[v].setAttribute("cy", cy);
				ellipses[v].setAttribute("r", r);
				ellipses[v].setAttribute("transform", "matrix("+ t.a + "," + t.b +
				"," + t.c + "," + t.d + "," + t.e + "," + t.f + ")");				
			}			
		}
		if (d3.selectAll(".VisDockPolygonLayer")[0].length != 0){
			var polygons = d3.selectAll(".VisDockPolygonLayer")[0];
			for (var v = 0; v < polygons.length; v++){
				var id = polygons[v].getAttribute("id").split("cloned_vis")[1];
				var points = VisDock.searchLayers[id].getAttribute("points");
				var t = VisDock.searchLayers[id].getCTM();//.inverse;
				
				var T = VisDock.searchLayers[id].getCTM();
				var T2 = Panel.viewport[0][0].getCTM();
				var t = T2.inverse().multiply(T);				
				
				polygons[v].setAttribute("points", points);
				polygons[v].setAttribute("transform", "matrix("+ t.a + "," + t.b +
				"," + t.c + "," + t.d + "," + t.e + "," + t.f + ")");				
			}			
		}
		if (d3.selectAll(".VisDockLineLayer")[0].length != 0){
			var lines = d3.selectAll(".VisDockLineLayer")[0];
			
			for (var v = 0; v < paths.length; v++){
				var id = lines[v].getAttribute("id").split("cloned_vis")[1];
				var x1 = VisDock.searchLayers[id].getAttribute("x1");
				var x2 = VisDock.searchLayers[id].getAttribute("x2");
				var y1 = VisDock.searchLayers[id].getAttribute("y1");
				var y1 = VisDock.searchLayers[id].getAttribute("y2");
				var t = VisDock.searchLayers[id].getCTM();//.inverse;
				var T = VisDock.searchLayers[id].getCTM();
				var T2 = Panel.viewport[0][0].getCTM();
				var t = T2.inverse().multiply(T);				
				
				lines[v].setAttribute("x1", x1);
				lines[v].setAttribute("x2", x2);
				lines[v].setAttribute("y1", y1);
				lines[v].setAttribute("y2", y2);
				lines[v].setAttribute("transform", "matrix("+ t.a + "," + t.b +
				"," + t.c + "," + t.d + "," + t.e + "," + t.f + ")");				
			}			
		}						
	}

};
