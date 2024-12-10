var dashboard, columns,worksheet;
var isMapFilter = false;
var isMapBuild = false;
var payLoad;
$(document).ready(function () {
	tableau.extensions.initializeAsync({ 'configure': configure }).then(function () {
		dashboard = tableau.extensions.dashboardContent.dashboard;		
		const payLoadString = tableau.extensions.settings.get("payLoad");
        if (payLoadString) {
        	console.log(JSON.parse(payLoadString))
        	 payLoad = JSON.parse(payLoadString)
        	var worksheets = dashboard.worksheets;
		    worksheet = worksheets.find(function (sheet) {
		      return sheet.name === payLoad.workSheet;
		    });
		    
        	const filterEvent = tableau.TableauEventType.FilterChanged;
			worksheet.addEventListener(filterEvent, function (selectionEvent) {
				console.log(selectionEvent)
				if(!isMapFilter ){
						constructData(JSON.parse(tableau.extensions.settings.get("payLoad")));
					}
					//
			});
            constructData(JSON.parse(payLoadString));
        } else {
			configure();
		}
	});

});

function constructData(payLoad) {
	 isMapBuild = false;
	
    if(!payLoad.isDataSource){
         worksheet.getSummaryDataAsync().then(function (sumdata) {
        	 constructDataWithPayLoad(sumdata,payLoad)
         });
     }else{
    	 worksheet.getDataSourcesAsync().then(datasources => {
	    	  		var  dataSources1 = datasources.find(datasource => datasource.name === datasources[0].name);
	    	  		return dataSources1.getUnderlyingDataAsync();
	     }).then(function (sumdata) {
	    	 constructDataWithPayLoad(sumdata,payLoad)
        })		
     }
}
function constructDataWithPayLoad(sumdata,payLoad){
	 let list = [];
	 let consolidated = [];
	 columns =[];
	 payLoad.columns.forEach(i=>columns.push(sumdata.columns[parseInt(i)].fieldName))
//	 list.push(columns)
   	 sumdata.data.forEach(function(d){
			 var r=[],y=[];
			 payLoad.columns.forEach(i=>{
				 if(d[parseInt(i)].value != null && d[parseInt(i)].value != "%null%"){
					r.push(d[i].value);
					y.push(d[i].value);
				 }else{
	 				r.push("");
	 				y.push("");
				 }

			 })
			 
			 list.push(r);
			 payLoad.metrics.forEach(i=>{
				 if(d[parseInt(i)].value != null && d[parseInt(i)].value != "%null%"){
					y.push(d[i].value);
				 }else{
	 				y.push("");
				 }

			 })
			 consolidated.push(y);
			 //processData(list,property,metricColumn,metricFun);
   	 });	
	 list = multiDimensionalUnique(list)
	 consolidated = multiDimensionalUnique(consolidated)
	 list = calculateMetrics(list,consolidated,payLoad);
	 console.log(consolidated)
	 console.log(list)
	 processDataForConceptMap(list)
}

function multiDimensionalUnique(arr) {
    var uniques = [];
    var itemsFound = {};
    for(var i = 0, l = arr.length; i < l; i++) {
        var stringified = JSON.stringify(arr[i]);
        if(itemsFound[stringified]) { continue; }
        uniques.push(arr[i]);
        itemsFound[stringified] = true;
    }
    return uniques;
}

function calculateMetrics(list,consolidated,payLoad){
	$.each(payLoad.metrics,function(i,d){
		list.forEach(l=>{
			let arr = [];
			consolidated.forEach(r=>{
				if(l.join(',')== r.slice(0,l.length-1).join(',')){
					arr.push(r[l.length+i])
				}
			})
			
			l.push(getMetric(arr,payLoad.metricFunc[i]));
		})
	})
	return list;
}

function getMetric(arr,metricFunc){
	switch (metricFunc) {
	case "1":
		return sumFunction(arr)
	case "2":
		return avgAggFunction(arr)
	case "3":
		return Math.min.apply(Math,_arr)
	case "4":
		return Math.min.apply(Math,_arr)
	case "5":
		return customAggcount(arr)
	case "6":
		return customAggcountDist(arr)

	default:
		return;
	}
	
}

function customAggSum(values) {
	
    var sum = 0;
    values.forEach( function(value) {sum += value;} );
    return sum;
}
function customAggcount(values) {
	return values.length;
}
function customAggcountDist(values) {
	values = $.unique( values )
	return values.length;
}
function sumFunction(values) {
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
function getSelectedRows() {
    const selectedNodes = gridOptions.api.getSelectedNodes()  
    const selectedData = selectedNodes.map( function(node) { return node.data })
    const selectedDataStringPresentation = selectedData.map( function(node) { return node.make + ' ' + node.model }).join(', ')
    }

function configure() {
	const popupUrl = window.location.href+`/configure`;
	tableau.extensions.ui.displayDialogAsync(popupUrl, 0, { height: 650, width: 800 }).then((closePayload) => {
		const payLoadString = tableau.extensions.settings.get("payLoad");
		console.log(JSON.parse(payLoadString))
        if (payLoadString) {
            constructData(JSON.parse(payLoadString));
        } 
		const filterEvent = tableau.TableauEventType.FilterChanged;
		worksheet.addEventListener(filterEvent, function (selectionEvent) {
		
			const payLoadString = tableau.extensions.settings.get("payLoad");
	        if (payLoadString) {
	            constructData(JSON.parse(payLoadString));
	        } 
		});
	}).catch((error) => {
		switch (error.errorCode) {
			case tableau.ErrorCodes.DialogClosedByUser:
				console.log("Dialog was closed by user");
				break;
			default:
				console.error(error.message);
		}
	});
}

/*
 * MAP CODE
 * 
 */

function processDataForConceptMap(list){
	console.log(list)
	var ditems = new Set(); 
	var x = new Set(); 
	var theme = new Set(); 
	var prespective = new Set(); 
	var ditemAarr = [];
	var themeAarr = [];
	var prespectiveAarr = [];
	
	$.each(list,function(i,d){
			ditems.add(d[0]);
			x.add(d[1])
		
		
	})
	var i=0;
	x.forEach(function(v){
		if(i%2 == 0)
			theme.add(v);
		else
			prespective.add(v);
		i++;
	})
	ditems.forEach(function(v){
		var obj ={
				"type" : "ditem",
			    "name" : v,
			    "description" : "Sample Description goes here about "+v,
			    "date" : new Date(),
			    "slug" : "Slug goes here about "+v,
			    "links" : getLinks(v,list),
			    "column":columns[0]
		}
		ditemAarr.push(obj)
	})
	theme.forEach(function(v){
		var obj ={
				"type" : "theme",
			    "name" : v,
			    "column":columns[1]?columns[1]:""
			   
		}
		themeAarr.push(obj)
	})
	prespective.forEach(function(v){
		var obj ={
				"type" : "perspective",
			    "name" : v,
			    "column":columns[1]
			   
		}
		prespectiveAarr.push(obj)
	})
	var json ={
				"ditems" : ditemAarr,
			    "themes" : themeAarr,
			    "perspectives" : prespectiveAarr
			   
		}
	
	
	console.log(json)
	$("#graph").empty();
	var plot = new ConceptMap("graph", "graph-info", json);
	isMapBuild = true;

}
function getLinks(value,list) {
	var a = new Set();
	var arr =[];
	$.each(list,function(i,d){
		if(d.indexOf(value) > -1){
			a.add(d[1]);
		}
	})
	return Array.from(a);
}



var ConceptMap = function(chartElementId, infoElementId, dataJson) {
	d3.select("#"+chartElementId).html("");
	d3.select("#"+infoElementId).html("");
	isMapFilter = false;
    var a = 800,
        c = 800,
        h = c,
        U = 200,
        K = 22,
        S = 20,
        s = 8,
        R = 110,
        J = 30,
        o = 15,
        t = 10,
        w = 1000,
        F = "elastic",
        N = "#0da4d3";
    var parent_entity;
    var level;
    var T, q, x, j, H, A, P;
    var L = {},
        k = {};
    var i, y;
    var r = d3.layout.tree().size([360, h / 2 - R]).separation(function(Y, X) {
        return (Y.parent == X.parent ? 1 : 2) / Y.depth
    });
    var W = d3.svg.diagonal.radial().projection(function(X) {
        return [X.y, X.x / 180 * Math.PI]
    });
    var v = d3.svg.line().x(function(X) {
        return X[0]
    }).y(function(X) {
        return X[1]
    }).interpolate("bundle").tension(0.5);
    var d = d3.select("#" + chartElementId).append("svg").attr("width", a).attr("height", c).append("g").attr("transform", "translate(" + a / 2 + "," + c / 2 + ")");
    var I = d.append("rect").attr("class", "bg").attr({
        x: a / -2,
        y: c / -2,
        width: a,
        height: c,
        fill: "transparent"
    }).on("click", O);
    var B = d.append("g").attr("class", "links"),
        f = d.append("g").attr("class", "ditems"),
        E = d.append("g").attr("class", "nodes");
    var Q = d3.select("#" + infoElementId);

    T = d3.map(dataJson);
    q = d3.merge(T.values());
    x = {};
    A = d3.map();

    q.forEach(function(aa) {
        aa.key = p(aa.name);
        aa.canonicalKey = aa.key;
        x[aa.key] = aa;

        if (aa.group) {
            if (!A.has(aa.group)) {
                A.set(aa.group, [])
            }
            A.get(aa.group).push(aa);
        }
    });

    j = d3.map();

    T.get("ditems").forEach(function(aa) {
        aa.links = aa.links.filter(function(ab) {
            return typeof x[p(ab)] !== "undefined" && ab.indexOf("r-") !== 0
        });

        j.set(aa.key, aa.links.map(function(ab) {
            var ac = p(ab);
            if (typeof j.get(ac) === "undefined") {
                j.set(ac, [])
            }
            j.get(ac).push(aa);
            return x[ac];
        }));
    	
    });
   
    
    
    
    

    

    var Z = window.location.hash.substring(1);
    if (Z && x[Z]) {
        G(x[Z]);
    } else {
        O();
        M();
    }

    window.onhashchange = function() {
    	
    	if(window.location.hash == ""){
    		tabFilter(0)
    	}
        var aa = window.location.hash.substring(1);
        if (aa && x[aa]) {
            G(x[aa], true)
        }
    };

    function O() {
        if (L.node === null) {
            return
        }
        L = {
            node: null,
            map: {}
        };
        // i = Math.floor(c / T.get("ditems").length);
        i = 30;
        y = Math.floor(T.get("ditems").length * i / 2);
        T.get("ditems").forEach(function(af, ae) {
            af.x = U / -2;
            af.y = ae * i - y
        });
        var ad = 180 + J,
            Z = 360 - J,
            ac = (Z - ad) / (T.get("themes").length - 1);
        T.get("themes").forEach(function(af, ae) {
            af.x = Z - ae * ac;
            af.y = h / 2 - R;
            af.xOffset = -S;
            af.depth = 1
        });
        ad = J;
        Z = 180 - J;
        ac = (Z - ad) / (T.get("perspectives").length - 1);
        T.get("perspectives").forEach(function(af, ae) {
            af.x = ae * ac + ad;
            af.y = h / 2 - R;
            af.xOffset = S;
            af.depth = 1
        });
        H = [];
        var ab, Y, aa, X = h / 2 - R;
        T.get("ditems").forEach(function(ae) {
        	
            ae.links.forEach(function(af) {
            	
                ab = x[p(af)];
                if (!ab || ab.type === "reference") {
                    return
                }
                Y = (ab.x - 90) * Math.PI / 180;
                aa = ae.key + "-to-" + ab.key;
                H.push({
                    source: ae,
                    target: ab,
                    key: aa,
                    canonicalKey: aa,
                    x1: ae.x + (ab.type === "theme" ? 0 : U),
                    y1: ae.y + K / 2,
                    x2: Math.cos(Y) * X + ab.xOffset,
                    y2: Math.sin(Y) * X
                })
            })
        	
        });
        P = [];
        A.forEach(function(af, ag) {
            var ae = (ag[0].x - 90) * Math.PI / 180;
            a2 = (ag[1].x - 90) * Math.PI / 180, bulge = 20;
            P.push({
                x1: Math.cos(ae) * X + ag[0].xOffset,
                y1: Math.sin(ae) * X,
                xx: Math.cos((ae + a2) / 2) * (X + bulge) + ag[0].xOffset,
                yy: Math.sin((ae + a2) / 2) * (X + bulge),
                x2: Math.cos(a2) * X + ag[1].xOffset,
                y2: Math.sin(a2) * X
            })
        });
        window.location.hash = "";
        M()
    }
    
    function tabFilter(Y){
    	isMapFilter = true;
    	var filterColumns = [];
    	for(var x=1;x<=2;x++){
    		filterColumns.push(tableau.extensions.settings.get("level"+x))
    	}
    	
    	//document.write(workbook)
			tableau.extensions.initializeAsync().then(function () {
			      const dashboard = tableau.extensions.dashboardContent.dashboard;

			     
			      dashboard.worksheets.forEach(function (worksheet) {
			    	  if(Y == 0){
			    		  $.each(columns,function(i,d){
			    			  console.log(d)
			    			   worksheet.clearFilterAsync(d)
			    			   constructData(payLoad)
			    		  })
			    	  }else{
			     
			        	 worksheet.applyFilterAsync(Y.column, [Y.name],
		  				            tableau.FilterUpdateType.Replace).then(function(){

		  				            	setTimeout(function() {
		  				            		 isMapFilter = false;
		  				            	}, 1000);
		  				            	
		  				            });
			    	  }


			      });

			    }, function (err) {
			      // Something went wrong in initialization.
			      console.log('Error while Initializing: ' + err.toString());
			    });
    }
    function G(Y, X) {
    	var fil = Y;
        if (L.node === Y && X !== true) {
            if (Y.type === "ditem") {
                // window.location.href = "/" + Y.slug;
                return
            }
            
            L.node.children.forEach(function(aa) {
                aa.children = aa._group
            });
            e();
            return
        }
        if (Y.isGroup) {
            L.node.children.forEach(function(aa) {
                aa.children = aa._group
            });
            Y.parent.children = Y.parent._children;
            e();
            return
        }
        Y = x[Y.canonicalKey];
        q.forEach(function(aa) {
            aa.parent = null;
            aa.children = [];
            aa._children = [];
            aa._group = [];
            aa.canonicalKey = aa.key;
            aa.xOffset = 0
        });
        L.node = Y;
        
        L.map = {};
        var Z = 0;
        L.node.children = j.get(Y.canonicalKey);
        //console.log(L.node.children)
        L.node.children.forEach(function(ac) {
        	
        	if(ac != null && j.get(ac.key) != null){
            L.map[ac.key] = true;
            ac._children = j.get(ac.key).filter(function(ad) {
                return ad.canonicalKey !== Y.canonicalKey
            });
            ac._children = JSON.parse(JSON.stringify(ac._children));
            ac._children.forEach(function(ad) {
                ad.canonicalKey = ad.key;
                ad.key = ac.key + "-" + ad.key;
                L.map[ad.key] = true
            });
            var aa = ac.key + "-group",
                ab = ac._children.length;//ac._children.length;
            ac._group = [{
                isGroup: true,
                key: aa + "-group-key",
                canonicalKey: aa,
                name: ab,
                count: ab,
                xOffset: 0
            }];
            L.map[aa] = true;
            Z += ab
        	}
        });
        L.node.children.forEach(function(aa) {
            aa.children = Z > 500 ? aa._group : aa._children
        });
        window.location.hash = L.node.key;
        tabFilter(fil)
        e()
        
        
    }

    function n() {
        k = {
            node: null,
            map: {}
        };
        z()
    }

    function g(X) {
    	//console.log(X)
        if (k.node === X) {
            return
        }
        k.node = X;
        k.map = {};
        k.map[X.key] = true;
        if (X.key !== X.canonicalKey) {
            k.map[X.parent.canonicalKey] = true;
            k.map[X.parent.canonicalKey + "-to-" + X.canonicalKey] = true;
            k.map[X.canonicalKey + "-to-" + X.parent.canonicalKey] = true
        } else {
          //  j.get(X.canonicalKey).forEach(function(Y) {
        	if(j.get(X.canonicalKey)){
            	for(count =0 ; count < j.get(X.canonicalKey).length ;count++){
                k.map[j.get(X.canonicalKey)[count].canonicalKey] = true;
                k.map[X.canonicalKey + "-" + j.get(X.canonicalKey)[count].canonicalKey] = true
            }
        	}
            H.forEach(function(Y) {
                if (k.map[Y.source.canonicalKey] && k.map[Y.target.canonicalKey]) {
                    k.map[Y.canonicalKey] = true
                }
            })
        }
        z()
    }

    function M() {
        V();
        B.selectAll("path").attr("d", function(X) {
            return v([
                [X.x1, X.y1],
                [X.x1, X.y1],
                [X.x1, X.y1]
            ])
        }).transition().duration(w).ease(F).attr("d", function(X) {
            return v([
                [X.x1, X.y1],
                [X.target.xOffset * s, 0],
                [X.x2, X.y2]
            ])
        });
        D(T.get("ditems"));
        b(d3.merge([T.get("themes"), T.get("perspectives")]));
        C([]);
        m(P);
        n();
        z()
    }

    function e() {
        var X = r.nodes(L.node);
        X.forEach(function(Z) {
            if (Z.depth === 1) {
                Z.y -= 20
            }
        });
        H = r.links(X);
        H.forEach(function(Z) {
            if (Z.source.type === "ditem") {
                Z.key = Z.source.canonicalKey + "-to-" + Z.target.canonicalKey
            } else {
                Z.key = Z.target.canonicalKey + "-to-" + Z.source.canonicalKey
            }
            Z.canonicalKey = Z.key
        });
        V();
        B.selectAll("path").transition().duration(w).ease(F).attr("d", W);
        D([]);
        b(X);
        C([L.node]);
        m([]);
        var Y = "";
        if (L.node.description) {
            Y = L.node.description
        }
        Q.html(Y);
        n();
        z()
    }

    function b(X) {
        var X = E.selectAll(".node").data(X, u);
        var Y = X.enter().append("g").attr("transform", function(aa) {
            var Z = aa.parent ? aa.parent : {
                xOffset: 0,
                x: 0,
                y: 0
            };
            return "translate(" + Z.xOffset + ",0)rotate(" + (Z.x - 90) + ")translate(" + Z.y + ")"
        }).attr("class", "node").on("mouseover", g).on("mouseout", n).on("click", G);
        Y.append("circle").attr("r", 0);
        Y.append("text").attr("stroke", "#fff").attr("stroke-width", 4).attr("class", "label-stroke");
        Y.append("text").attr("font-size", 0).attr("class", "label");
        X.transition().duration(w).ease(F).attr("transform", function(Z) {
            if (Z === L.node) {
                return null
            }
            var aa = Z.isGroup ? Z.y + (7 ) : Z.y;
            return "translate(" + Z.xOffset + ",0)rotate(" + (Z.x - 90) + ")translate(" + aa + ")"
        });
        X.selectAll("circle").transition().duration(w).ease(F).attr("r", function(Z) {
            if (Z == L.node) {
                return 100
            } else {
                if (Z.isGroup) {
                    return 50;//+ Z.count
                } else {
                    return 4.5
                }
            }
        });
        X.selectAll("text").transition().duration(w).ease(F).attr("dy", ".3em").attr("font-size", function(Z) {
            if (Z.depth === 0) {
                return 20
            } else {
                return 15
            }
        }).text(function(Z) {
            return Z.name.replace(' (EG)','')
        }).attr("text-anchor", function(Z) {
            if (Z === L.node || Z.isGroup) {
                return "middle"
            }
            return Z.x < 180 ? "start" : "end"
        }).attr("transform", function(Z) {
            if (Z === L.node) {
                return null
            } else {
                if (Z.isGroup) {
                    return Z.x > 180 ? "rotate(180)" : null
                }
            }
            return Z.x < 180 ? "translate(" + t + ")" : "rotate(180)translate(-" + t + ")"
        });
        X.selectAll("text.label-stroke").attr("display", function(Z) {
            return Z.depth === 1 ? "block" : "none"
        });
        X.exit().remove()
    }

    function V() {
        var X = B.selectAll("path").data(H, u);
        X.enter().append("path").attr("d", function(Z) {
            var Y = Z.source ? {
                x: Z.source.x,
                y: Z.source.y
            } : {
                x: 0,
                y: 0
            };
            return W({
                source: Y,
                target: Y
            })
        }).attr("class", "link");
        X.exit().remove()
    }

    function C(Z) {
        var ac = d.selectAll(".detail").data(Z, u);
        var Y = ac.enter().append("g").attr("class", "detail");
        var ab = Z[0];
        if (ab && ab.type === "ditem") {
//           var aa = Y.append("a").attr("xlink:href", function(ae) {
//                return "/" + ae.slug
//            });
//            aa.append("text").attr("fill", N).attr("text-anchor", "middle").attr("y", (o + t) * -1).text(function(ae) {
//                return "";//"ITEM " + ae.ditem
//            })
        } else {
            if (ab && ab.type === "theme") {
                Y.append("text").attr("fill", "#aaa").attr("text-anchor", "middle").attr("y", (o + t) * -1).text("")
            } else {
                if (ab && ab.type === "perspective") {
//                    var ad = ac.selectAll(".pair").data(A.get(ab.group).filter(function(ae) {
//                        return ae !== ab
//                    }), u);
//                    ad.enter().append("text").attr("fill", "#aaa").attr("text-anchor", "middle").attr("y", function(af, ae) {
//                        return (o + t) * 2 + (ae * (o + t))
//                    }).text(function(ae) {
//                        return "(vs. " + ae.name + ")"
//                    }).attr("class", "pair").on("click", G);
                    Y.append("text").attr("fill", "#aaa").attr("text-anchor", "middle").attr("y", (o + t) * -1).text("");
                    //ad.exit().remove()
                }
            }
        }
        ac.exit().remove();
        var X = d.selectAll(".all-ditems").data(Z);
        X.enter().append("text").attr("text-anchor", "start").attr("x", a / -2 + t).attr("y", c / 2 - t).text("all data").attr("class", "all-ditems").on("click", O);
        X.exit().remove()
    }

    function D(Y) {
    	
        var Y = f.selectAll(".ditem").data(Y, u);
        var X = Y.enter().append("g").attr("class", "ditem").on("mouseover", g).on("mouseout", n).on("click", G);
        X.append("rect").attr("x", U / -2).attr("y", K / -2).attr("width", U).attr("height", K).transition().duration(w).ease(F).attr("x", function(Z) {
            return Z.x
        }).attr("y", function(Z) {
            return Z.y
        });
        X.append("text").attr("x", function(Z) {
            return U / -2 + t
        }).attr("y", function(Z) {
            return K / -2 + o
        }).attr("fill", "#fff").text(function(Z) {
            return Z.name
        }).transition().duration(w).ease(F).attr("x", function(Z) {
            return Z.x + t
        }).attr("y", function(Z) {
            return Z.y + o
        });
        Y.exit().selectAll("rect").transition().duration(w).ease(F).attr("x", function(Z) {
            return U / -2
        }).attr("y", function(Z) {
            return K / -2
        });
        Y.exit().selectAll("text").transition().duration(w).ease(F).attr("x", function(Z) {
            return U / -2 + t
        }).attr("y", function(Z) {
            return K / -2 + o
        });
        Y.exit().transition().duration(w).remove()
    }

    function m(Y) {
        var X = f.selectAll("path").data(Y);
        X.enter().append("path").attr("d", function(Z) {
            return v([
                [Z.x1, Z.y1],
                [Z.x1, Z.y1],
                [Z.x1, Z.y1]
            ])
        }).attr("stroke", "#000").attr("stroke-width", 1.5).transition().duration(w).ease(F).attr("d", function(Z) {
            return v([
                [Z.x1, Z.y1],
                [Z.xx, Z.yy],
                [Z.x2, Z.y2]
            ])
        });
        X.exit().remove()
    }

    function z() {
        f.selectAll("rect").attr("fill", function(X) {
            return l(X, "#000", N, "#000")
        });
        B.selectAll("path").attr("stroke", function(X) {
            return l(X, "#aaa", N, "#aaa")
        }).attr("stroke-width", function(X) {
            return l(X, "1.5px", "2.5px", "1px")
        }).attr("opacity", function(X) {
            return l(X, 0.4, 0.75, 0.3)
        }).sort(function(Y, X) {
            if (!k.node) {
                return 0
            }
            var aa = k.map[Y.canonicalKey] ? 1 : 0,
                Z = k.map[X.canonicalKey] ? 1 : 0;
            return aa - Z
        });
        E.selectAll("circle").attr("fill", function(X) {
            if (X === L.node) {
                return "#000"
            } else {
                if (X.type === "theme") {
                    return l(X, "#666", N, "#000")
                } else {
                    if (X.type === "perspective") {
                        return "#fff"
                    }
                }
            }
            return l(X, "#000", N, "#999")
        }).attr("stroke", function(X) {
            if (X === L.node) {
                return l(X, null, N, null)
            } else {
                if (X.type === "theme") {
                    return "#000"
                } else {
                    if (X.type === "perspective") {
                        return l(X, "#000", N, "#000")
                    }
                }
            }
            return null
        }).attr("stroke-width", function(X) {
            if (X === L.node) {
                return l(X, null, 2.5, null)
            } else {
                if (X.type === "theme" || X.type === "perspective") {
                    return 1.5
                }
            }
            return null
        });
        E.selectAll("text.label").attr("fill", function(X) {
            return (X === L.node || X.isGroup) ? "#fff" : l(X, "#000", N, "#999")
        })
    }

    function p(X) {
        return X
    }

    function u(X) {
        return X.key
    }

    function l(X, aa, Z, Y) {
        if (k.node === null) {
            return aa
        }
        return k.map[X.key] ? Z : aa
    }
};
