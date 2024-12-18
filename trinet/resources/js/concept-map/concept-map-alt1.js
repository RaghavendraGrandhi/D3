var ConceptMap = function(chartElementId, infoElementId, dataJson) {


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
    var subject_group;
    var level1;
    var level2;
    var level3;
    var level;
    var sub_area;
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
        x: (a / -2) - 100,
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
    depth = 0;

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
    T.get("perspectives").forEach(function(aa) {
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
    T.get("themes").forEach(function(aa) {
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
    T.get("folders").forEach(function(aa) {
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
    T.get("level1").forEach(function(aa) {
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
   
    T.get("level2").forEach(function(aa) {
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
        var aa = window.location.hash.substring(1);
    	if(aa == ""){
    		 parent_entity = null;
    	     subject_group = null;
    	     level1 = null;
    	     level2 = null;
    	     level3 = null;
    	     level = null;
    	     sub_area = false;
    	}
        if (aa && x[aa]) {
            G(x[aa], true)
        }
        count = 0;
       
       var update = setInterval(() => {
    	   d3.selectAll(".empty").each(function(d,i){
        	  d3.selectAll(".link").each(function(n,k){
        		 
        		  if(k == (d3.selectAll(".link").size()-1)){
        			  d3.select(this).classed("empty",true)
        		  }
        	  })
           })
        	if(depth == 2){
        	 d3.selectAll(".level1").each(function(n,i){
             	var str= d3.select(this).attr("transform")
             	if(str != null && str.includes("rotate(180")){
             		d3.select(this).attr("transform",function(a){
             			return "translate(160,-1.2246467991473533e-15),rotate(0)";
             		})
             	}
             		
             })
        	}
        	if(depth == 3){
        		d3.selectAll(".level2").each(function(n,i){
        			var str= d3.select(this).attr("transform")
        			if(str != null && str.includes("rotate(180")){
        				d3.select(this).attr("transform",function(a){
        					return "translate(-20,-1.2246467991473533e-15),rotate(0)";
        				})
        			}
        			
        		})
        	}
        	if(depth == 4){
        		d3.selectAll(".level3").each(function(n,i){
        			var str= d3.select(this).attr("transform")
        			if(str != null && str.includes("rotate(180")){
        				d3.select(this).attr("transform",function(a){
        					return "translate(-20,-1.2246467991473533e-15),rotate(0)";
        				})
        			}
        			
        		})
        	}
        	if(depth == 5){
        		d3.selectAll(".folders").each(function(n,i){
        			var str= d3.select(this).attr("transform")
        			if(str != null && str.includes("rotate(180")){
        				d3.select(this).attr("transform",function(a){
        					return "translate(-20,-1.2246467991473533e-15),rotate(0)";
        				})
        			}
        			
        		})
        	}
            // console.log(count)
             count++;
        	 if(count >20)
        	    clearInterval(update);

		}, 200);
       
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

    function G(Y, X) {
    	
    	
        if (L.node === Y && X !== true) {
            if (Y.type === "ditem") {
                 window.location.href = "/" + Y.slug;
                return
            }
            
//            L.node.children.forEach(function(aa) {
//                aa.children = aa._group
//            });
//            e();
            return
        }
//        if (Y.isGroup) {
//        	     var pc = 0;
//          
//            Y.parent.children = Y.parent._children;
//            e();
//            return
//        }
        
        
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
        //console.log(Y)
        if(Y.type === "ditem"){
        	depth = 0;
        	sub_area = true;
        	parent_entity = Y.name;
        	 L.node.children = j.get(Y.canonicalKey);
        	 if(L.node.children.length == 1){
         		T.get("empty").forEach(function(ac){
         			L.node.children.push(ac);
         		})
         	}
        }else if(Y.type === "theme" || Y.type === "perspective"){
        	depth = 1;
        		subject_group = Y.name;
        		child = []
        		if(parent_entity){
        		T.get("level1").forEach(function(ac){
        			if(ac.subject === parent_entity && ac.subject_group === Y.name)
        			child.push(ac)
        		});
        		if(child.length == 1){
            		T.get("empty").forEach(function(ac){
            			child.push(ac);
            		})
            	}
        		}else{
        			T.get("level1").forEach(function(ac){
        				var state = true;
            			if( ac.subject_group === Y.name){
            				for(cn =0 ;cn < child.length;cn++){
                    			if(child[cn].name == ac.name) {
                    				state = false;
                    				break;
                    			}
                    		}
            				if(state)
                    			child.push(ac)
            			}
            			
            		});
            		if(child.length == 1){
                		T.get("empty").forEach(function(ac){
                			child.push(ac);
                		})
                	}
//            		var ddd =[];
//            		for(cn =0 ;cn<3;cn++){
//            			ddd.push(child[cn])
//            		}
        		}
        		L.node.children = child;
        	
        	
        }else if(Y.type === "level1" ){
        	depth=2;
        	level1 = Y.name;
        	child = []
        	if(parent_entity){
    		T.get("level2").forEach(function(ac){
    			//console.log(ac)
    			if(ac.subject === parent_entity && ac.subject_group === subject_group && ac.folder_level1 === Y.name)
    			child.push(ac)
    		});
        	if(child.length == 0){
        		T.get("folders").forEach(function(ac){
        			//console.log(ac)
        			if(ac.subject === parent_entity && ac.subject_group === subject_group && ac.folder_level1 === Y.name)
        			child.push(ac)
        		});
        	}
        	if(child.length == 1){
        		T.get("empty").forEach(function(ac){
        			child.push(ac);
        		})
        	}
        	}else{
        		T.get("level2").forEach(function(ac){
        			var state = true;
        			if( ac.subject_group === subject_group && ac.folder_level1 === Y.name){
        				for(cn =0 ;cn < child.length;cn++){
                			if(child[cn].name == ac.name) {
                				state = false;
                				break;
                			}
                		}
        				if(state)
                			child.push(ac)
        			}
        		});
            	if(child.length == 0){
            		var state = true;
            		T.get("folders").forEach(function(ac){
            			//console.log(ac)
            			if( ac.subject_group === subject_group && ac.folder_level1 === Y.name){
            				for(cn =0 ;cn < child.length;cn++){
                    			if(child[cn].name === ac.name) {
                    				state = false;
                    				break;
                    			}
                    		}
            				if(state)
                    			child.push(ac)
            			}
            		});
            	}
            	if(child.length == 1){
            		T.get("empty").forEach(function(ac){
            			child.push(ac);
            		})
            	}
        	}
    		L.node.children = child;
        	
        }else if(Y.type === "level2" ){
        	depth = 3;
        	level2 = Y.name;
        	child = []
        	if(parent_entity){
    		T.get("level3").forEach(function(ac){
    			//console.log(ac)
    			if(ac.subject === parent_entity && ac.subject_group === subject_group && ac.folder_level1 === level1 && ac.folder_level2 === Y.name)
    			child.push(ac)
    			
    			
    		});
        	if(child.length == 0){
        		T.get("folders").forEach(function(ac){
        			var state = true;

        			if(ac.subject === parent_entity && ac.subject_group === subject_group && ac.folder_level1 === level1 && ac.folder_level2 === Y.name){
        				for(cn =0 ;cn < child.length;cn++){
                			if(child[cn].name === ac.name) {
                				state = false;
                				break;
                			}
                		}
        				if(state)
                			child.push(ac)
        			}
        		});
        	}
        	if(child.length == 1){
        		T.get("empty").forEach(function(ac){
        			child.push(ac);
        		})
        	}
        	}else{
        		T.get("level3").forEach(function(ac){
        			var state = true;

        			if(ac.subject_group === subject_group && ac.folder_level1 === level1 && ac.folder_level2 === Y.name){
        				for(cn =0 ;cn < child.length;cn++){
                			if(child[cn].name === ac.name) {
                				state = false;
                				break;
                			}
                		}
        				if(state)
                			child.push(ac)
        			}
        			
        			
        		});
            	if(child.length == 0){
            		T.get("folders").forEach(function(ac){
            			var state = true;

            			//console.log(ac)
            			if(ac.subject_group === subject_group && ac.folder_level1 === level1 && ac.folder_level2 === Y.name){
            				for(cn =0 ;cn < child.length;cn++){
                    			if(child[cn].name === ac.name) {
                    				state = false;
                    				break;
                    			}
                    		}
            				if(state)
                    			child.push(ac)
            			}
            		});
            	}
            	if(child.length == 1){
            		T.get("empty").forEach(function(ac){
            			child.push(ac);
            		})
            	}
        	}
    		L.node.children = child;
        	
        }else if(Y.type === "level3" ){
        	depth = 4;
        	level3 = Y.name;
        	//console.log(level3)
        	child = []
        	if(parent_entity){
    		T.get("folders").forEach(function(ac){
    			if(ac.subject === parent_entity && ac.subject_group === subject_group && ac.folder_level1 === level1 && ac.folder_level2 === level2
    					&& ac.folder_level3 === Y.name)
    			child.push(ac)
    		});
        	if(child.length == 1){
        		T.get("empty").forEach(function(ac){
        			child.push(ac);
        		})
        	}
        	}else{
        		T.get("folders").forEach(function(ac){
        			var state = true;

        			if(ac.subject === parent_entity && ac.subject_group === subject_group && ac.folder_level1 === level1 && ac.folder_level2 === level2
        					&& ac.folder_level3 === Y.name){
        				for(cn =0 ;cn < child.length;cn++){
                			if(child[cn].name == ac.name) {
                				state = false;
                				break;
                			}
                		}
        				if(state)
                			child.push(ac)
        			}
        		});
            	if(child.length == 1){
            		T.get("empty").forEach(function(ac){
            			child.push(ac);
            		})
            	}
        	}
    		L.node.children = child;
        	
        }else if(Y.type === "folders"){
        	depth = 5;
        }
      
        //L.node.children = j.get(Y.canonicalKey);
       
        L.map = {};
        var Z = 0;
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
//            var aa = ac.key + "-group",
//                ab = ac._children.length;// ac._children.length;
//            ac._group = [{
//                isGroup: true,
//                key: aa + "-group-key",
//                canonicalKey: aa,
//                name: ab,
//                count: ab,
//                xOffset: 0
//            }];
//            L.map[aa] = true;
//            Z += ab
        	}
        });
//        L.node.children.forEach(function(aa) {
//            aa.children = Z > 1000 ? aa._group : aa._children
//        });
        window.location.hash = L.node.key;
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
    	// console.log(X)
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
          // j.get(X.canonicalKey).forEach(function(Y) {
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
       // console.log(X)
        var Y = X.enter().append("g").attr("transform", function(aa) {
            var Z = aa.parent ? aa.parent : {
                xOffset: 0,
                x: 0,
                y: 0
            };
            return "translate(" + Z.xOffset + ",0)rotate(" + (Z.x - 90) + ")translate(" + Z.y + ")"
        }).attr("class", "node").attr("id",function(aa){
        	return aa.id;
        }).on("mouseover", g).on("mouseout", n).on("click", G)
        ;
        Y.append("circle").attr("r", 0);
        Y.append("text").attr("stroke", "#fff");
        Y.append("text").attr("font-size", 0).attr("class", "label");
        X.transition().duration(w).ease(F).attr("transform", function(Z) {
            if (Z === L.node) {
                return null
            }  
            var aa = Z.isGroup ? Z.y + (7 ) : Z.y;
            return "translate(" + Z.xOffset + ",0)rotate(" + (Z.x - 90) + ")translate(" + aa + ")"
        });
        X.selectAll("circle").attr("class",function(Z) {
        	return Z.type+"-circle"
        }).transition().duration(w).ease(F).attr("r", function(Z) {
        	
        	 
            if (Z == L.node) {
                return 125
            } else {
                if (Z.isGroup) {
                    return 50;// + Z.count
                } else {
                    return 4.5;
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
            return Z.name
        }).attr("text-anchor", function(Z) {
            if (Z === L.node || Z.isGroup) {
                return "middle"
            }
            return Z.x < 180 ? "start" : "end"
        }).attr("id",function(Z) {
        	
        	return Z.id
        }).style("fill",function(Z) {
        	
        	
            if (Z === L.node) {
            	
                return "#fff"
            } else {
            	return "#000"
            }}).attr("class",function(Z) {
        	return Z.type
        }).attr("transform", function(Z) {
        	
        	
            if (Z === L.node) {
            	
                return null
            } else {
                if (Z.isGroup) {
                    return Z.x > 180 ? "rotate(180)" : null
                }
            }

//            if(Z.type === "level1"){
//            	if(Z.x >= 180){
//            		console.log(Z.id)
//            		return "translate(" + t + ")rotate(0)translate(-" + t + ")";
//            	}
//            	
//            	//return Z.x > 180 ? "translate(" + t + ")" : "rotate(0)translate(-" + t + ")"
//            }
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
           var aa = Y.append("a").attr("xlink:href", function(ae) {
                return "/" + ae.slug
            });
            aa.append("text").attr("fill", N).attr("text-anchor", "middle").attr("y", (o + t) * -1).text(function(ae) {
            	//console.log(ae)
                return "";          //"ITEM " + ae.ditem
            })
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
//                    Y.append("text").attr("fill", "#aaa").attr("text-anchor", "middle").attr("y", (o + t) * -1).text("");
//                    ad.exit().remove()
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
        return X.toLowerCase().replace(/[ .,()]/g, "-")
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