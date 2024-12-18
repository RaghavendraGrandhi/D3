webvowl.app = function(e) {
    function t(o) {
        if (n[o]) return n[o].exports;
        var r = n[o] = {
            exports: {},
            id: o,
            loaded: !1
        };
        return e[o].call(r.exports, r, r.exports, t), r.loaded = !0, r.exports
    }
    var n = {};
    return t.m = e, t.c = n, t.p = "", t(0)
}({
    0: function(e, t, n) {
        n(314), n(316), e.exports = n(317)
    },
    6: function(e, t) {
        e.exports = d3
    },
    86: function(e, t, n) {
        function o(e) {
            return null == e ? void 0 === e ? s : l : c && c in Object(e) ? i(e) : a(e)
        }
        var r = n(87),
            i = n(90),
            a = n(91),
            l = "[object Null]",
            s = "[object Undefined]",
            c = r ? r.toStringTag : void 0;
        e.exports = o
    },
    87: function(e, t, n) {
        var o = n(88),
            r = o.Symbol;
        e.exports = r
    },
    88: function(e, t, n) {
        var o = n(89),
            r = "object" == typeof self && self && self.Object === Object && self,
            i = o || r || Function("return this")();
        e.exports = i
    },
    89: function(e, t) {
        (function(t) {
            var n = "object" == typeof t && t && t.Object === Object && t;
            e.exports = n
        }).call(t, function() {
            return this
        }())
    },
    90: function(e, t, n) {
        function o(e) {
            var t = a.call(e, s),
                n = e[s];
            try {
                e[s] = void 0;
                var o = !0
            } catch (e) {}
            var r = l.call(e);
            return o && (t ? e[s] = n : delete e[s]), r
        }
        var r = n(87),
            i = Object.prototype,
            a = i.hasOwnProperty,
            l = i.toString,
            s = r ? r.toStringTag : void 0;
        e.exports = o
    },
    91: function(e, t) {
        function n(e) {
            return r.call(e)
        }
        var o = Object.prototype,
            r = o.toString;
        e.exports = n
    },
    98: function(e, t, n) {
        function o(e) {
            return "symbol" == typeof e || i(e) && r(e) == a
        }
        var r = n(86),
            i = n(99),
            a = "[object Symbol]";
        e.exports = o
    },
    99: function(e, t) {
        function n(e) {
            return null != e && "object" == typeof e
        }
        e.exports = n
    },
    107: function(e, t) {
        var n = Array.isArray;
        e.exports = n
    },
    149: function(e, t) {
        function n(e, t) {
            for (var n = -1, o = null == e ? 0 : e.length, r = Array(o); ++n < o;) r[n] = t(e[n], n, e);
            return r
        }
        e.exports = n
    },
    214: function(e, t, n) {
        function o(e) {
            return null == e ? "" : r(e)
        }
        var r = n(215);
        e.exports = o
    },
    215: function(e, t, n) {
        function o(e) {
            if ("string" == typeof e) return e;
            if (a(e)) return i(e, o) + "";
            if (l(e)) return d ? d.call(e) : "";
            var t = e + "";
            return "0" == t && 1 / e == -s ? "-0" : t
        }
        var r = n(87),
            i = n(149),
            a = n(107),
            l = n(98),
            s = 1 / 0,
            c = r ? r.prototype : void 0,
            d = c ? c.toString : void 0;
        e.exports = o
    },
    314: function(e, t) {},
    316: function(e, t, n) {
        (function(t) {
            function n() {
                var e, t, n = -1,
                    o = /(?:\b(MS)?IE\s+|\bTrident\/7\.0;.*\s+rv:|\bEdge\/)(\d+)/.test(navigator.userAgent);
                if (o) return n = parseInt("12");
                var r = /Trident.*rv[ :]*11\./.test(navigator.userAgent);
                return r ? n = parseInt("11") : ("Microsoft Internet Explorer" === navigator.appName ? (e = navigator.userAgent, t = new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})"), null !== t.exec(e) && (n = parseFloat(RegExp.$1))) : "Netscape" === navigator.appName && (e = navigator.userAgent, t = new RegExp("Trident/.*rv:([0-9]{1,}[\\.0-9]{0,})"), null !== t.exec(e) && (n = parseFloat(RegExp.$1))), n)
            }

            function o() {
                var e = n();
                if (console.log("Browser Version =" + e), e > 0 && e <= 11 && (t.select("#browserCheck").classed("hidden", !1), t.select("#killWarning").classed("hidden", !0), t.select("#optionsArea").classed("hidden", !0), t.select("#logo").classed("hidden", !0)), 12 == e) {
                    t.select("#logo").classed("hidden", !1), t.select("#browserCheck").classed("hidden", !1);
                    var o = t.select("#killWarning");
                    o.on("click", function() {
                        console.log("hide the warning please"), t.select("#browserCheck").classed("hidden", !0), t.select("#logo").style("padding", "10px")
                    })
                } else t.select("#logo").classed("hidden", !1), t.select("#browserCheck").classed("hidden", !0)
            }
            e.exports = o, o()
        }).call(t, n(6))
    },
    317: function(e, t, n) {
        (function(t) {
            e.exports = function() {
                function e(e, t, n) {
                    if (v.reset(), void 0 === e && void 0 === t) return void console.log("Nothing to load");
                    var o;
                    if (e) {
                        var r;
                        try {
                            o = JSON.parse(e), r = !0
                        } catch (e) {
                            r = !1
                        }
                        if (r === !1) return console.log("Retrieved data is not valid! (JSON.parse Error)"), void h.emptyGraphError();
                        if (!t) {
                            var i = o.header ? o.header.title : void 0,
                                c = s.textInLanguage(i);
                            t = c ? c : n
                        }
                    }
                    var u = parseInt(o.metrics.classCount),
                        p = parseInt(o.metrics.objectPropertyCount),
                        f = parseInt(o.metrics.datatypePropertyCount);
                    0 === u && 0 === p && 0 === f && h.emptyGraphError(), d.setJsonText(e), l.data(o), a.load(), b.updateOntologyInformation(o, L), d.setFilename(t)
                }

                function o() {
                    var e = t.select(c),
                        n = e.select("svg"),
                        o = window.innerHeight - 40,
                        r = window.innerWidth - .22 * window.innerWidth;
                    "0" === a.getSidebarVisibility() && (o = window.innerHeight - 40, r = window.innerWidth), e.style("height", o + "px"), n.attr("width", r).attr("height", o), l.width(r).height(o), a.updateStyle(), m.updateVisibilityStatus();
                    var i = t.select("#browserCheck");
                    if (i.classed("hidden") === !1) {
                        var s = 10 + i.node().getBoundingClientRect().height;
                        t.select("#logo").style("padding", s + "px 10px")
                    } else t.select("#logo").style("padding", "10px")
                }

                function r() {
                    var e, t, n = -1,
                        o = /(?:\b(MS)?IE\s+|\bTrident\/7\.0;.*\s+rv:|\bEdge\/)(\d+)/.test(navigator.userAgent);
                    if (o) return n = parseInt("12");
                    var r = /Trident.*rv[ :]*11\./.test(navigator.userAgent);
                    return r ? n = parseInt("11") : ("Microsoft Internet Explorer" === navigator.appName ? (e = navigator.userAgent, t = new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})"), null !== t.exec(e) && (n = parseFloat(RegExp.$1))) : "Netscape" === navigator.appName && (e = navigator.userAgent, t = new RegExp("Trident/.*rv:([0-9]{1,}[\\.0-9]{0,})"), null !== t.exec(e) && (n = parseFloat(RegExp.$1))), n)
                }
                var i = {},
                    a = webvowl.graph(),
                    l = a.graphOptions(),
                    s = webvowl.util.languageTools(),
                    c = "#graph",
                    d = n(318)(a),
                    u = n(319)(a),
                    p = n(320)(a),
                    f = n(321)(a),
                    h = n(322)(a),
                    v = n(326)(a),
                    g = n(327)(a),
                    y = n(328)(a),
                    m = n(329)(a),
                    b = n(330)(a),
                    x = webvowl.modules.colorExternalsSwitch(a),
                    k = webvowl.modules.compactNotationSwitch(a),
                    C = webvowl.modules.datatypeFilter(),
                    S = webvowl.modules.disjointFilter(),
                    w = webvowl.modules.focuser(),
                    O = webvowl.modules.emptyLiteralFilter(),
                    E = webvowl.modules.nodeDegreeFilter(u),
                    A = webvowl.modules.nodeScalingSwitch(a),
                    M = webvowl.modules.objectPropertyFilter(),
                    D = webvowl.modules.pickAndPin(),
                    I = webvowl.modules.selectionDetailsDisplayer(b.updateSelectionInformation),
                    L = webvowl.modules.statistics(),
                    R = webvowl.modules.subclassFilter(),
                    j = webvowl.modules.setOperatorFilter();
                return i.initialize = function() {
                    l.graphContainerSelector(c), l.selectionModules().push(w), l.selectionModules().push(I), l.selectionModules().push(D), l.filterModules().push(O), l.filterModules().push(L), l.filterModules().push(C), l.filterModules().push(M), l.filterModules().push(R), l.filterModules().push(S), l.filterModules().push(j), l.filterModules().push(A), l.filterModules().push(E), l.filterModules().push(k), l.filterModules().push(x), t.select(window).on("resize", o), d.setup(), p.setup(), u.setup(C, M, R, S, j, E), f.setup(D, A, k, x), v.setup(), b.setup();
                    var n = r();
                    if (console.log("agent Version " + n), n > 0 && n <= 11) console.log("this agent is not supported"), t.select("#browserCheck").classed("hidden", !1), t.select("#killWarning").classed("hidden", !0), t.select("#optionsArea").classed("hidden", !0), t.select("#logo").classed("hidden", !0);
                    else {
                        t.select("#logo").classed("hidden", !1), 12 === n ? (t.select("#browserCheck").classed("hidden", !1), t.select("#killWarning").classed("hidden", !1)) : t.select("#browserCheck").classed("hidden", !0), g.setup([p, u, f, w, I, v]), y.setup(), m.setup(), l.literalFilter(O), l.filterMenu(u), l.modeMenu(f), l.gravityMenu(p), l.pausedMenu(v), l.pickAndPinModule(D), l.resetMenu(g), l.searchMenu(y), l.ontologyMenu(h), l.navigationMenu(m), l.sidebar(b), h.setup(e), a.start(), o();
                        var i, s = a.options().width(),
                            N = a.options().height();
                        i = Math.min(s, N) / 1e3, t.select("#sidebarExpandButton").on("click", function() {
                            var e = parseInt(a.getSidebarVisibility());
                            1 === e ? a.showSidebar(0) : a.showSidebar(1)
                        }), a.setDefaultZoom(i), a.initSideBarAnimation()
                    }
                }, i
            }
        }).call(t, n(6))
    },
    318: function(e, t, n) {
        (function(t) {
            e.exports = function(e) {
                function n() {
                    t.select("#exportedUrl").node().focus(), t.select("#exportedUrl").node().select(), document.execCommand("copy")
                }

                function o(e, t) {
                    var n = 0,
                        o = "opts=[";
                    for (var r in e)
                        if (e.hasOwnProperty(r)) {
                            var i = e[r],
                                a = t[r];
                            i !== a && (o += r + "=" + a + ";", n++)
                        }
                    return o += "]", 0 === n ? "" : o
                }

                function r() {
                    var n = {};
                    n.sidebar = e.getSidebarVisibility();
                    var r = e.options().filterMenu().getDefaultDegreeValue(),
                        i = e.options().filterMenu().getDegreeSliderValue();
                    parseInt(r) === parseInt(i) ? n.doc = -1 : n.doc = i, n.cd = e.options().classDistance(), n.dd = e.options().datatypeDistance(), n.filter_datatypes = String(e.options().filterMenu().getCheckBoxValue("datatypeFilterCheckbox")), n.filter_sco = String(e.options().filterMenu().getCheckBoxValue("subclassFilterCheckbox")), n.filter_disjoint = String(e.options().filterMenu().getCheckBoxValue("disjointFilterCheckbox")), n.filter_setOperator = String(e.options().filterMenu().getCheckBoxValue("setoperatorFilterCheckbox")), n.filter_objectProperties = String(e.options().filterMenu().getCheckBoxValue("objectPropertyFilterCheckbox")), n.mode_dynamic = String(e.options().dynamicLabelWidth()), n.mode_scaling = String(e.options().modeMenu().getCheckBoxValue("nodescalingModuleCheckbox")), n.mode_compact = String(e.options().modeMenu().getCheckBoxValue("compactnotationModuleCheckbox")), n.mode_colorExt = String(e.options().modeMenu().getCheckBoxValue("colorexternalsModuleCheckbox")), n.mode_multiColor = String(e.options().modeMenu().colorModeState()), n.rect = 0;
                    var a, l = o(k, n),
                        s = String(location);
                    if (0 === l.length) return a = t.select("#exportedUrl").node(), a.value = s, a.focus(), a.select(), void(a.title = s);
                    var c, d = (s.match(/#/g) || []).length;
                    if (void 0 !== d && 0 !== d || (c = s + "#" + l), d > 0) {
                        var u, p = s.split("#");
                        for (p[1].indexOf("opts=[") >= 0 ? (p[1] = l, c = p[0]) : (c = p[0] + "#", c += l), u = 1; u < p.length; u++) p[u].length > 0 && (c += "#" + p[u])
                    }
                    a = t.select("#exportedUrl").node(), a.value = c, a.focus(), a.select(), a.title = c
                }

                function i() {
                    var n, o, r, i = t.select(e.options().graphContainerSelector()).select("svg");
                    l(), u(), n = i.attr("version", 1.1).attr("xmlns", "http://www.w3.org/2000/svg").node().parentNode.innerHTML, n = "<!-- Created with WebVOWL (version " + webvowl.version + "), http://vowl.visualdataweb.org -->\n" + n, o = a(n), r = "data:image/svg+xml;base64," + btoa(o), v.attr("href", r).attr("download", g + ".svg"), p(), f()
                }

                function a(e) {
                    var t, n, o, r = [],
                        i = e.length;
                    for (t = 0; t < i; t++) n = e.charAt(t), o = n.charCodeAt(0), o < 128 ? r.push(n) : r.push("&#" + o + ";");
                    return r.join("")
                }

                function l() {
                    s(".text", [{
                        name: "font-family",
                        value: "Helvetica, Arial, sans-serif"
                    }, {
                        name: "font-size",
                        value: "12px"
                    }]), s(".subtext", [{
                        name: "font-size",
                        value: "9px"
                    }]), s(".text.instance-count", [{
                        name: "fill",
                        value: "#666"
                    }]), s(".external + text .instance-count", [{
                        name: "fill",
                        value: "#aaa"
                    }]), s(".cardinality", [{
                        name: "font-size",
                        value: "10px"
                    }]), s(".text, .embedded", [{
                        name: "pointer-events",
                        value: "none"
                    }]), s(".class, .object, .disjoint, .objectproperty, .disjointwith, .equivalentproperty, .transitiveproperty, .functionalproperty, .inversefunctionalproperty, .symmetricproperty, .allvaluesfromproperty, .somevaluesfromproperty", [{
                        name: "fill",
                        value: "#acf"
                    }]), s(".label .datatype, .datatypeproperty", [{
                        name: "fill",
                        value: "#9c6"
                    }]), s(".rdf, .rdfproperty", [{
                        name: "fill",
                        value: "#c9c"
                    }]), s(".literal, .node .datatype", [{
                        name: "fill",
                        value: "#fc3"
                    }]), s(".deprecated, .deprecatedproperty", [{
                        name: "fill",
                        value: "#ccc"
                    }]), s(".external, .externalproperty", [{
                        name: "fill",
                        value: "#36c"
                    }]), s("path, .nofill", [{
                        name: "fill",
                        value: "none"
                    }]), s("marker path", [{
                        name: "fill",
                        value: "#000"
                    }]), s(".class, path, line, .fineline", [{
                        name: "stroke",
                        value: "#000"
                    }]), s(".white, .subclass, .subclassproperty, .external + text", [{
                        name: "fill",
                        value: "#fff"
                    }]), s(".class.hovered, .property.hovered, .cardinality.hovered, .cardinality.focused, circle.pin, .filled.hovered, .filled.focused", [{
                        name: "fill",
                        value: "#f00"
                    }, {
                        name: "cursor",
                        value: "pointer"
                    }]), s(".focused, path.hovered", [{
                        name: "stroke",
                        value: "#f00"
                    }]), s(".indirect-highlighting, .feature:hover", [{
                        name: "fill",
                        value: "#f90"
                    }]), s(".values-from", [{
                        name: "stroke",
                        value: "#69c"
                    }]), s(".symbol, .values-from.filled", [{
                        name: "fill",
                        value: "#69c"
                    }]), s(".class, path, line", [{
                        name: "stroke-width",
                        value: "2"
                    }]), s(".fineline", [{
                        name: "stroke-width",
                        value: "1"
                    }]), s(".dashed, .anonymous", [{
                        name: "stroke-dasharray",
                        value: "8"
                    }]), s(".dotted", [{
                        name: "stroke-dasharray",
                        value: "3"
                    }]), s("rect.focused, circle.focused", [{
                        name: "stroke-width",
                        value: "4px"
                    }]), s(".nostroke", [{
                        name: "stroke",
                        value: "none"
                    }]), s("marker path", [{
                        name: "stroke-dasharray",
                        value: "100"
                    }])
                }

                function s(e, n) {
                    var o = t.selectAll(e);
                    o.empty() || n.forEach(function(e) {
                        o.each(function() {
                            var n = t.select(this);
                            c(n, e.name) || n.style(e.name, e.value)
                        })
                    })
                }

                function c(e, t) {
                    return "fill" === t && d(e)
                }

                function d(e) {
                    var t = e.datum();
                    return t.backgroundColor && !!t.backgroundColor()
                }

                function u() {
                    t.selectAll(".hidden-in-export").style("display", "none")
                }

                function p() {
                    t.selectAll(".text, .subtext, .text.instance-count, .external + text .instance-count, .cardinality, .text, .embedded, .class, .object, .disjoint, .objectproperty, .disjointwith, .equivalentproperty, .transitiveproperty, .functionalproperty, .inversefunctionalproperty, .symmetricproperty, .allvaluesfromproperty, .somevaluesfromproperty, .label .datatype, .datatypeproperty, .rdf, .rdfproperty, .literal, .node .datatype, .deprecated, .deprecatedproperty, .external, .externalproperty, path, .nofill, .symbol, .values-from.filled, marker path, .class, path, line, .fineline, .white, .subclass, .subclassproperty, .external + text, .class.hovered, .property.hovered, .cardinality.hovered, .cardinality.focused, circle.pin, .filled.hovered, .filled.focused, .focused, path.hovered, .indirect-highlighting, .feature:hover, .values-from, .class, path, line, .fineline, .dashed, .anonymous, .dotted, rect.focused, circle.focused, .nostroke, marker path").each(function() {
                        var e = t.select(this),
                            n = e.node().style;
                        for (var o in n)
                            if (n.hasOwnProperty(o)) {
                                if (c(e, o)) continue;
                                e.style(o, null)
                            }
                        e.datum && e.datum().type && "rdfs:subClassOf" === e.datum().type() && e.style("fill", null)
                    })
                }

                function f() {
                    t.selectAll(".hidden-in-export").style("display", null)
                }

                function h() {
                    if (!b) return alert("No graph data available."), void t.event.preventDefault();
                    var n, o = e.graphNodeElements(),
                        r = e.graphLabelElements(),
                        i = JSON.parse(b),
                        a = i._comment,
                        l = " [Additional Information added by WebVOWL Exporter Version: 1.0.6]";
                    a.indexOf(l) === -1 && (i._comment = a + " [Additional Information added by WebVOWL Exporter Version: 1.0.6]");
                    var s = i.classAttribute,
                        c = i.propertyAttribute;
                    for (n = 0; n < s.length; n++) {
                        var d = s[n];
                        delete d.pos, delete d.pinned
                    }
                    var u;
                    for (n = 0; n < c.length; n++) u = c[n], delete u.pos, delete u.pinned;
                    o.each(function(e) {
                        var t = e.id();
                        for (n = 0; n < s.length; n++) {
                            var o = s[n];
                            if (o.id === t) {
                                o.pos = [e.x, e.y], e.pinned() && (o.pinned = !0);
                                break
                            }
                        }
                    });
                    for (var p = 0; p < r.length; p++) {
                        var f = r[p].property();
                        for (n = 0; n < c.length; n++)
                            if (u = c[n], u.id === f.id()) {
                                u.pos = [r[p].x, r[p].y], r[p].pinned() && (u.pinned = !0);
                                break
                            }
                    }
                    i.settings = {};
                    var h = e.scaleFactor(),
                        v = e.paused(),
                        m = e.translation();
                    i.settings.global = {}, i.settings.global.zoom = h, i.settings.global.translation = m, i.settings.global.paused = v;
                    var x, k, C, S = e.options().classDistance(),
                        w = e.options().datatypeDistance();
                    i.settings.gravity = {}, i.settings.gravity.classDistance = S, i.settings.gravity.datatypeDistance = w;
                    var O = e.options().filterMenu(),
                        E = O.getCheckBoxContainer(),
                        A = [];
                    for (n = 0; n < E.length; n++) x = E[n].checkbox.attr("id"), k = E[n].checkbox.property("checked"), C = {}, C.id = x, C.checked = k, A.push(C);
                    var M = O.getDegreeSliderValue();
                    i.settings.filter = {}, i.settings.filter.checkBox = A, i.settings.filter.degreeSliderValue = M;
                    var D = e.options().modeMenu(),
                        I = D.getCheckBoxContainer(),
                        L = [];
                    for (n = 0; n < I.length; n++) x = I[n].attr("id"), k = I[n].property("checked"), C = {}, C.id = x, C.checked = k, L.push(C);
                    var R = D.colorModeState();
                    i.settings.modes = {}, i.settings.modes.checkBox = L, i.settings.modes.colorSwitchState = R;
                    var j = {};
                    j._comment = i._comment, j.header = i.header, j.namespace = i.namespace, j.metrics = i.metrics, j.settings = i.settings, j.class = i.class, j.classAttribute = i.classAttribute, j.property = i.property, j.propertyAttribute = i.propertyAttribute;
                    var N = JSON.stringify(j, null, "  "),
                        F = "data:text/json;charset=utf-8," + encodeURIComponent(N);
                    y.attr("href", F).attr("download", g + ".json")
                }
                var v, g, y, m, b, x = {},
                    k = {};
                return k.sidebar = "1", k.doc = -1, k.cd = 200, k.dd = 120, k.filter_datatypes = "false", k.filter_objectProperties = "false", k.filter_sco = "false", k.filter_disjoint = "true", k.filter_setOperator = "false", k.mode_dynamic = "true", k.mode_scaling = "true", k.mode_compact = "false", k.mode_colorExt = "true", k.mode_multiColor = "false", k.rect = 0, x.setup = function() {
                    v = t.select("#exportSvg").on("click", i), y = t.select("#exportJson").on("click", h), m = t.select("#copyBt").on("click", n);
                    var o = t.select("#export");
                    o.on("mouseover", function() {
                        var t = e.options().searchMenu();
                        t.hideSearchEntries(), r()
                    })
                }, x.setFilename = function(e) {
                    g = e || "export"
                }, x.setJsonText = function(e) {
                    b = e
                }, x
            }
        }).call(t, n(6))
    },
    319: function(e, t, n) {
        (function(t) {
            e.exports = function(e) {
                function n(n, o, r, i) {
                    var a, l;
                    a = t.select(i).append("div").classed("checkboxContainer", !0), l = a.append("input").classed("filterCheckbox", !0).attr("id", o + "FilterCheckbox").attr("type", "checkbox").property("checked", n.enabled()), d.push({
                        checkbox: l,
                        defaultState: n.enabled()
                    }), l.on("click", function(t) {
                        var o = l.property("checked");
                        n.enabled(o), t !== !0 && e.update()
                    }), a.append("label").attr("for", o + "FilterCheckbox").text(r)
                }

                function o(t, n) {
                    t.setMaxDegreeSetter(function(e) {
                        s.attr("max", e), i(s, Math.min(e, s.property("value")))
                    }), t.setDegreeGetter(function() {
                        return +s.property("value")
                    }), t.setDegreeSetter(function(e) {
                        i(s, e)
                    });
                    var o, a;
                    o = n.append("div").classed("distanceSliderContainer", !0), s = o.append("input").attr("id", "nodeDegreeDistanceSlider").attr("type", "range").attr("min", 0).attr("step", 1), o.append("label").classed("description", !0).attr("for", "nodeDegreeDistanceSlider").text("Degree of collapsing"), a = o.append("label").classed("value", !0).attr("for", "nodeDegreeDistanceSlider").text(0), s.on("change", function(t) {
                        t !== !0 && (e.update(), l = s.property("value"))
                    }), s.on("input", function() {
                        var e = s.property("value");
                        a.text(e)
                    }), s.on("wheel", r), s.on("focusout", function() {
                        s.property("value") !== l && e.update()
                    })
                }

                function r() {
                    var n, o = t.event;
                    o.deltaY < 0 && (n = 1), o.deltaY > 0 && (n = -1);
                    var r = parseInt(s.property("value")),
                        i = r + n;
                    r !== i && (s.property("value", i), s.on("input")(), e.update())
                }

                function i(e, t) {
                    e.property("value", t).on("input")()
                }

                function a() {
                    u.node().addEventListener("animationend", function() {
                        console.log("filter button animation ended"), u.classed("buttonPulse", !1), u.classed("filterMenuButtonHighlight", !0)
                    })
                }
                var l, s, c = {},
                    d = [],
                    u = t.select("#filterOption a"),
                    p = t.select("#nodeDegreeFilteringOption"),
                    f = 0;
                return c.setDefaultDegreeValue = function(e) {
                    f = e
                }, c.getDefaultDegreeValue = function() {
                    return f
                }, c.getGraphObject = function() {
                    return e
                }, c.getCheckBoxContainer = function() {
                    return d
                }, c.getDegreeSliderValue = function() {
                    return s.property("value")
                }, c.setup = function(r, i, l, s, d, f) {
                    var h = t.select("#filterOption");
                    h.on("mouseover", function() {
                        var t = e.options().searchMenu();
                        t.hideSearchEntries()
                    }), u.on("mouseleave", function() {
                        c.highlightForDegreeSlider(!1)
                    }), n(r, "datatype", "Datatype properties", "#datatypeFilteringOption"), n(i, "objectProperty", "Object properties", "#objectPropertyFilteringOption"), n(l, "subclass", "Solitary subclasses", "#subclassFilteringOption"), n(s, "disjoint", "Class disjointness", "#disjointFilteringOption"), n(d, "setoperator", "Set operators", "#setOperatorFilteringOption"), o(f, p), a()
                }, c.reset = function() {
                    d.forEach(function(e) {
                        var t = e.checkbox,
                            n = e.defaultState,
                            o = t.property("checked");
                        o !== n && (t.property("checked", n), t.on("click")())
                    }), i(s, 0), s.on("change")()
                }, c.killButtonAnimation = function() {
                    u.classed("buttonPulse", !1), u.classed("filterMenuButtonHighlight", !1)
                }, c.highlightForDegreeSlider = function(e) {
                    if (arguments.length || (e = !0), u.classed("highlighted", e), p.classed("highlighted", e), u.classed("buttonPulse") === !0 && e === !0) {
                        u.classed("buttonPulse", !1);
                        var t = setTimeout(function() {
                            u.classed("buttonPulse", e), clearTimeout(t)
                        }, 100)
                    } else u.classed("buttonPulse", e), u.classed("filterMenuButtonHighlight", e)
                }, c.setCheckBoxValue = function(e, t) {
                    for (var n = 0; n < d.length; n++) {
                        var o = d[n].checkbox.attr("id");
                        if (o === e) {
                            d[n].checkbox.property("checked", t);
                            break
                        }
                    }
                }, c.getCheckBoxValue = function(e) {
                    for (var t = 0; t < d.length; t++) {
                        var n = d[t].checkbox.attr("id");
                        if (n === e) return d[t].checkbox.property("checked")
                    }
                }, c.setDegreeSliderValue = function(e) {
                    s.property("value", e)
                }, c.getDegreeSliderValue = function() {
                    return s.property("value")
                }, c.updateSettings = function() {
                    var e = !0,
                        t = s.property("value");
                    console.log("what is degrSlider Value;?" + t), t > 0 ? c.highlightForDegreeSlider(!0) : c.highlightForDegreeSlider(!1), d.forEach(function(t) {
                        var n = t.checkbox;
                        n.on("click")(e)
                    }), s.on("input")(), s.on("change")(e)
                }, c
            }
        }).call(t, n(6))
    },
    320: function(e, t, n) {
        (function(t) {
            e.exports = function(e) {
                function n(n, r, a, l) {
                    var s, c, d = l();
                    s = t.select(n).append("div").datum({
                        distanceFunction: l
                    }).classed("distanceSliderContainer", !0);
                    var u = s.append("input").attr("id", r + "DistanceSlider").attr("type", "range").attr("min", 10).attr("max", 600).attr("value", l()).attr("step", 10);
                    s.append("label").classed("description", !0).attr("for", r + "DistanceSlider").text(a), c = s.append("label").classed("value", !0).attr("for", r + "DistanceSlider").text(l()), i.push(u), u.on("focusout", function() {
                        e.updateStyle()
                    }), u.on("input", function() {
                        var t = u.property("value");
                        l(t), o(d), c.text(t), e.updateStyle()
                    }), u.on("wheel", function() {
                        var e, n = t.event;
                        n.deltaY < 0 && (e = 10), n.deltaY > 0 && (e = -10);
                        var o = parseInt(u.property("value")),
                            r = o + e;
                        r !== o && (u.property("value", r), l(r), u.on("input")())
                    })
                }

                function o(e) {
                    var t = Math.max(a.classDistance(), a.datatypeDistance()),
                        n = t / e,
                        o = l * n;
                    a.charge(o)
                }
                var r = {},
                    i = [],
                    a = e.graphOptions(),
                    l = a.charge();
                return r.setup = function() {
                    var o = t.select("#gravityOption");
                    o.on("mouseover", function() {
                        var t = e.options().searchMenu();
                        t.hideSearchEntries()
                    }), n("#classSliderOption", "class", "Class distance", a.classDistance), n("#datatypeSliderOption", "datatype", "Datatype distance", a.datatypeDistance)
                }, r.reset = function() {
                    i.forEach(function(e) {
                        e.property("value", function(e) {
                            return e.distanceFunction()
                        }), e.on("input")()
                    })
                }, r
            }
        }).call(t, n(6))
    },
    321: function(e, t, n) {
        (function(t) {
            e.exports = function(e) {
                function n(n, o, r, i, a) {
                    var l = t.select(r).append("div").classed("checkboxContainer", !0),
                        c = l.append("input").classed("moduleCheckbox", !0).attr("id", n + "ModuleCheckbox").attr("type", "checkbox").property("checked", i());
                    c.on("click", function(t) {
                        var n = c.property("checked");
                        i(n), a > 0 && e.update()
                    }), l.append("label").attr("for", n + "ModuleCheckbox").text(o), s = c
                }

                function o(n, o, r, i, a) {
                    var l, s;
                    return l = t.select(i).append("div").classed("checkboxContainer", !0).datum({
                        module: n,
                        defaultState: n.enabled()
                    }), s = l.append("input").classed("moduleCheckbox", !0).attr("id", o + "ModuleCheckbox").attr("type", "checkbox").property("checked", n.enabled()), p.push(s), s.on("click", function(t, n) {
                        var o = s.property("checked");
                        t.module.enabled(o), a && n !== !0 && e.update()
                    }), l.append("label").attr("for", o + "ModuleCheckbox").text(r), l
                }

                function r(t, n) {
                    var o = t.append("button").datum({
                        active: !1
                    }).classed("color-mode-switch", !0);
                    return i(o, n), o.on("click", function(t) {
                        var r = o.datum();
                        r.active = !r.active, i(o, n), n.enabled() && t !== !0 && e.update()
                    }), o
                }

                function i(e, t) {
                    var n = e.datum().active,
                        o = a(n);
                    e.classed("active", n).text(o.text), t && t.colorModeType(o.type)
                }

                function a(e) {
                    return e ? d : c
                }
                var l, s, c = {
                        text: "Multicolor",
                        type: "same"
                    },
                    d = {
                        text: "Multicolor",
                        type: "gradient"
                    },
                    u = {},
                    p = [];
                return u.colorModeState = function(e) {
                    return arguments.length ? (l.datum().active = e, u) : l.datum().active
                }, u.setDynamicLabelWidth = function(e) {
                    s.property("checked", e)
                }, u.getCheckBoxContainer = function() {
                    return p
                }, u.colorModeSwitch = function() {
                    return l
                }, u.setup = function(i, a, s, c) {
                    var d = t.select("#moduleOption");
                    d.on("mouseover", function() {
                        var t = e.options().searchMenu();
                        t.hideSearchEntries()
                    }), n("labelWidth", "Dynamic label width", "#dynamicLabelWidth", e.options().dynamicLabelWidth, 1), o(i, "pickandpin", "Pick & pin", "#pickAndPinOption", !1), o(a, "nodescaling", "Node scaling", "#nodeScalingOption", !0), o(s, "compactnotation", "Compact notation", "#compactNotationOption", !0);
                    var u = o(c, "colorexternals", "Color externals", "#colorExternalsOption", !0);
                    l = r(u, c)
                }, u.reset = function() {
                    p.forEach(function(e) {
                        var t = e.datum().defaultState,
                            n = e.property("checked");
                        n !== t && (e.property("checked", t), e.on("click")(e.datum())), e.datum().module.reset()
                    }), l.datum().active = !0, l.on("click")()
                }, u.setCheckBoxValue = function(e, t) {
                    for (var n = 0; n < p.length; n++) {
                        var o = p[n].attr("id");
                        if (o === e) {
                            p[n].property("checked", t);
                            break
                        }
                    }
                }, u.getCheckBoxValue = function(e) {
                    for (var t = 0; t < p.length; t++) {
                        var n = p[t].attr("id");
                        if (n === e) return p[t].property("checked")
                    }
                }, u.setColorSwitchState = function(e) {
                    u.colorModeState(!e)
                }, u.setColorSwitchStateUsingURL = function(e) {
                    u.colorModeState(!e), l.on("click")(!0)
                }, u.updateSettingsUsingURL = function() {
                    var e = !0;
                    p.forEach(function(t) {
                        t.on("click")(t.datum(), e)
                    })
                }, u.updateSettings = function() {
                    var e = !0;
                    p.forEach(function(t) {
                        t.on("click")(t.datum(), e)
                    }), l.on("click")(e)
                }, u
            }
        }).call(t, n(6))
    },
    322: function(e, t, n) {
        (function(t) {
            var o = n(323);
            e.exports = function(e) {
                function n() {
                    a(), t.select(window).on("hashchange", function() {
                        var e = t.event.oldURL,
                            n = t.event.newURL;
                        if (e !== n) {
                            if (n === e + "#") return;
                            r(), a()
                        }
                    }), r()
                }

                function r() {
                    t.selectAll("#optionsMenu > li > a").attr("href", location.hash || "#")
                }

                function i(t) {
                    var n = {};
                    if (n.sidebar = 1, n.doc = -1, n.cd = 200, n.dd = 120, n.filter_datatypes = "false", n.filter_objectProperties = "false", n.filter_sco = "false", n.filter_disjoint = "true", n.filter_setOperator = "false", n.mode_dynamic = "true", n.mode_scaling = "true", n.mode_compact = "false", n.mode_colorExt = "true", n.mode_multiColor = "false", n.rect = 0, void 0 === t) return void e.setOptionsFromURL(n);
                    for (var o = 0; o < t.length; o++) {
                        var r = t[o].split("=");
                        n[r[0]] = r[1]
                    }
                    e.setOptionsFromURL(n)
                }

                function a() {
                    var e = String(location);
                    console.log("-----------------------");
                    var n = (e.match(/#/g) || []).length,
                        o = [];
                    if (n > 0)
                        for (var r = e.split("#"), a = 1; a < r.length; a++) 0 === r[a].length ? o[o.length - 1] = o[o.length - 1] + "#" : o.push(r[a]);
                    var c, d, p, f, h = "opts=[";
                    0 === o.length && (c = S, i()), 1 === o.length && (o[0].indexOf(h) >= 0 ? (d = o[0].length, p = o[0].substr(6, d - 6 - 1), f = p.split(";"), i(f), c = S) : (c = o[0], i())), 2 === o.length && (o[0].indexOf(h) >= 0 ? (d = o[0].length, p = o[0].substr(6, d - 6 - 1), f = p.split(";"), i(f)) : i(), c = o[1]);
                    var v = t.selectAll(".select li").classed("selected-ontology", !1);
                    E = !1;
                    var g = "iri=",
                        y = "url=",
                        m = "file=";
                    if (c.substr(0, m.length) === m) {
                        var b = decodeURIComponent(c.slice(m.length));
                        u(b)
                    } else if (c.substr(0, y.length) === y) {
                        var x = decodeURIComponent(c.slice(y.length));
                        l("read?json=" + encodeURIComponent(x), x)
                    } else if (c.substr(0, g.length) === g) {
                        var k = decodeURIComponent(c.slice(g.length));
                        s("convert?iri=" + encodeURIComponent(k), k), t.select("#converter-option").classed("selected-ontology", !0)
                    } else s("" + c + ".json", c), v.each(function() {
                        var e = t.select(this);
                        e.select("a").size() > 0 && e.select("a").attr("href") === "#" + c && e.classed("selected-ontology", !0)
                    })
                }

                function l(n, o) {
                    x = o;
                    var r = A[n],
                        i = o.replace(/\/$/g, ""),
                        a = i.slice(i.lastIndexOf("/") + 1),
                        l = o.toLowerCase().endsWith(".json");
                    return l ? void(r ? (k(r, void 0, a), y(!0)) : (g(), t.xhr(n, "application/json", function(t, o) {
                        var r, i = !t;
                        if (null !== t && 500 === t.status || o && 0 === o.responseText.length) return m(), C.notValidJsonURL(), void(A[n] = void 0);
                        var l;
                        i ? (l = o.responseText, A[n] = l) : 404 === t.status && (r = "Connection to the OWL2VOWL interface could not be established.", e.clearGraphData()), k(l, void 0, a), y(i, t ? t.response : void 0, r), E === !0 && (C.notValidJsonFile(), e.clearGraphData()), m()
                    }))) : (C.notValidJsonURL(), void e.clearGraphData())
                }

                function s(n, o) {
                    x = o;
                    var r = A[n],
                        i = o.replace(/\/$/g, ""),
                        a = i.slice(i.lastIndexOf("/") + 1);
                    r ? (k(r, void 0, a), y(!0)) : (g(), t.xhr(n, "application/json", function(t, o) {
                        var r, i = !t;
                        if (console.log("Requestion XHR FUNCTION"), null !== t && 500 === t.status) return console.log(t), console.log("HAS AN ERROR AND A STATUS"), m(), void C.emptyGraphError();
                        var l;
                        if (i) l = o.responseText, A[n] = l;
                        else if (console.log("Something went wrong --.--"), 404 === t.status) {
                            var s = "iri=",
                                c = "url=",
                                d = "file=",
                                u = location.hash.slice(1);
                            u.substr(0, d.length) !== d && u.substr(0, c.length) !== c && u.substr(0, s.length) !== s && C.emptyGraphError(), r = "Connection to the OWL2VOWL interface could not be established.", e.clearGraphData()
                        }
                        k(l, void 0, a), y(i, t ? t.response : void 0, r), E === !0 && (C.emptyGraphError(), e.clearGraphData()), m()
                    }))
                }

                function c() {
                    var e = t.select("#iri-converter-button"),
                        n = t.select("#iri-converter-input");
                    n.on("input", function() {
                        v();
                        var t = "" === n.property("value");
                        e.attr("disabled", t || void 0)
                    }).on("click", function() {
                        v()
                    }), t.select("#iri-converter-form").on("submit", function() {
                        for (var e = n.property("value"), o = e.replace(/%20/g, " "); o.beginsWith(" ");) o = o.substr(1, o.length);
                        for (; o.endsWith(" ");) o = o.substr(0, o.length - 1);
                        e = o;
                        var r = e.toLowerCase();
                        return r.endsWith(".json") ? (console.log("file is an URL for a json "), location.hash = "url=" + e, n.property("value", ""), n.on("input")()) : (location.hash = "iri=" + e, n.property("value", ""), n.on("input")()), t.event.preventDefault(), !1
                    })
                }

                function d() {
                    var e = t.select("#file-converter-input"),
                        n = t.select("#file-converter-label"),
                        o = t.select("#file-converter-button");
                    e.on("change", function() {
                        var t = e.property("files");
                        t.length <= 0 ? (n.text("Select ontology file"), o.property("disabled", !0)) : (n.text(t[0].name), o.property("disabled", !1), v())
                    }), o.on("click", function() {
                        var t = e.property("files")[0];
                        if (!t) return !1;
                        var n = "file=" + t.name;
                        location.hash === "#" + n ? u() : location.hash = n
                    })
                }

                function u(n) {
                    var o = A[n];
                    if (o) return g(), k(o, n), y(!0), E === !0 && C.emptyGraphError(), void m();
                    var r = t.select("#file-converter-input").property("files")[0];
                    return !r || n && n !== r.name ? (k(void 0, void 0), y(!1, void 0, 'No cached version of "' + n + '" was found. Please reupload the file.'), void e.clearGraphData()) : (n = r.name, void(n.match(/\.json$/) ? (g(), p(r, n)) : f(r, n, !0)))
                }

                function p(e, t) {
                    var n = new FileReader;
                    n.readAsText(e), n.onload = function() {
                        g(), h(n.result, t), y(!0), E === !0 && C.emptyGraphError(), m()
                    }
                }

                function f(n, o, r) {
                    var i = t.select("#file-converter-button");
                    g(), i.property("disabled", !0);
                    var a = new FormData;
                    a.append("ontology", n);
                    var l = new XMLHttpRequest;
                    l.open("POST", "convert", !0), l.onload = function() {
                        i.property("disabled", !1), 200 === l.status ? (h(l.responseText, o), A[o] = l.responseText) : (k(void 0, void 0), y(!1, l.responseText), m(), e.clearGraphData()), m(), E === !0 && r === !0 && (console.log("Failed to convert the file"), A[o] = void 0, C.notValidJsonFile())
                    }, l.send(a)
                }

                function h(e, t) {
                    var n = t.split(".")[0];
                    k(e, n)
                }

                function v() {
                    function e() {
                        n.style("display", void 0), clearTimeout(b), t.select(window).on("click", void 0).on("keydown", void 0), n.on("mouseover", void 0)
                    }
                    var n = t.select("#select .toolTipMenu");
                    n.on("click", function() {
                        t.event.stopPropagation()
                    }).on("keydown", function() {
                        t.event.stopPropagation()
                    }), n.style("display", "block"), clearTimeout(b), b = setTimeout(function() {
                        e()
                    }, 3e3), t.select(window).on("click", function() {
                        e()
                    }).on("keydown", function() {
                        e()
                    }), n.on("mouseover", function() {
                        e()
                    })
                }

                function g() {
                    w.classed("hidden", !0), O.classed("hidden", !1)
                }

                function y(e, n, r) {
                    w.classed("hidden", e);
                    var i = t.select("#error-info");
                    r ? i.text(r) : i.html('Ontology could not be loaded.<br>Is it a valid OWL ontology? Please check with <a target="_blank"href="http://visualdataweb.de/validator/">OWL Validator</a>.');
                    var a = !n,
                        l = t.select("#error-description-button").classed("hidden", a).datum().open;
                    t.select("#error-description-container").classed("hidden", a || !l), t.select("#error-description").text(o(n))
                }

                function m() {
                    O.classed("hidden", !0)
                }
                var b, x, k, C = {},
                    S = "resources/json/foaf",
                    w = t.select("#loading-error"),
                    O = t.select("#loading-progress"),
                    E = !1,
                    A = {};
                return String.prototype.beginsWith = function(e) {
                    return 0 === this.indexOf(e)
                }, C.setup = function(o) {
                    k = o;
                    var r = t.select("#select");
                    r.on("mouseover", function() {
                        var t = e.options().searchMenu();
                        t.hideSearchEntries()
                    }), c(), d();
                    var i = t.select("#error-description-button").datum({
                        open: !1
                    });
                    i.on("click", function(e) {
                        var n = t.select("#error-description-container"),
                            o = t.select(this);
                        e.open = !e.open;
                        var r = e.open;
                        r ? o.text("Hide error details") : o.text("Show error details"), n.classed("hidden", !r)
                    }), n()
                }, C.setIriText = function(e) {
                    var n = t.select("#iri-converter-input");
                    n.node().value = e;
                    var o = t.select("#iri-converter-button");
                    o.attr("disabled", !1), t.select("#iri-converter-form").on("submit")()
                }, C.emptyGraphError = function() {
                    E = !0, w.classed("hidden", !1);
                    var n = t.select("#error-info");
                    n.text("There is nothing to visualize.");
                    var o = "There is no OWL input under the given IRI(" + x + "). Please try to load the OWL file directly.",
                        r = !o,
                        i = t.select("#error-description-button").classed("hidden", r).datum().open;
                    t.select("#error-description-container").classed("hidden", r || !i), t.select("#error-description").text(o), e.clearGraphData()
                }, C.notValidJsonURL = function() {
                    E = !0, w.classed("hidden", !1);
                    var n = t.select("#error-info");
                    n.text("Invalid JSON URL");
                    var o = "There is no JSON input under the given URL(" + x + "). Please try to load the JSON file directly.",
                        r = !o,
                        i = t.select("#error-description-button").classed("hidden", r).datum().open;
                    t.select("#error-description-container").classed("hidden", r || !i), t.select("#error-description").text(o), e.clearGraphData();
                }, C.notValidJsonFile = function() {
                    E = !0, w.classed("hidden", !1);
                    var n = t.select("#error-info");
                    n.text("Invalid JSON file");
                    var o = "The uploaded file is not a valid JSON file. (" + x + ")",
                        r = !o,
                        i = t.select("#error-description-button").classed("hidden", r).datum().open;
                    t.select("#error-description-container").classed("hidden", r || !i), t.select("#error-description").text(o), e.clearGraphData()
                }, C
            }
        }).call(t, n(6))
    },
    323: function(e, t, n) {
        function o(e) {
            return e = r(e), e && l.test(e) ? e.replace(a, i) : e
        }
        var r = n(214),
            i = n(324),
            a = /&(?:amp|lt|gt|quot|#39);/g,
            l = RegExp(a.source);
        e.exports = o
    },
    324: function(e, t, n) {
        var o = n(325),
            r = {
                "&amp;": "&",
                "&lt;": "<",
                "&gt;": ">",
                "&quot;": '"',
                "&#39;": "'"
            },
            i = o(r);
        e.exports = i
    },
    325: function(e, t) {
        function n(e) {
            return function(t) {
                return null == e ? void 0 : e[t]
            }
        }
        e.exports = n
    },
    326: function(e, t, n) {
        (function(t) {
            e.exports = function(e) {
                function n() {
                    o(), r()
                }

                function o() {
                    i.classed("paused", function(e) {
                        return e.paused
                    })
                }

                function r() {
                    i.datum().paused ? i.text("Resume") : i.text("Pause")
                }
                var i, a = {};
                return a.setup = function() {
                    var o = t.select("#pauseOption");
                    o.on("mouseover", function() {
                        var t = e.options().searchMenu();
                        t.hideSearchEntries()
                    }), i = t.select("#pause-button").datum({
                        paused: !1
                    }).on("click", function(t) {
                        e.paused(!t.paused), t.paused = !t.paused, n(), i.classed("highlighted", t.paused), e.options().navigationMenu().updateVisibilityStatus()
                    }), n()
                }, a.setPauseValue = function(t) {
                    i.datum().paused = t, e.paused(t), i.classed("highlighted", t), n()
                }, a.reset = function() {
                    a.setPauseValue(!1)
                }, a
            }
        }).call(t, n(6))
    },
    327: function(e, t, n) {
        (function(t) {
            e.exports = function(e) {
                function n() {
                    e.resetSearchHighlight(), e.options().searchMenu().clearText(), i.classDistance(a.classDistance()), i.datatypeDistance(a.datatypeDistance()), i.charge(a.charge()), i.gravity(a.gravity()), i.linkStrength(a.linkStrength()), e.reset(), o.forEach(function(e) {
                        e.reset()
                    }), e.updateStyle()
                }
                var o, r = {},
                    i = e.graphOptions(),
                    a = webvowl.options();
                return r.setup = function(r) {
                    o = r, t.select("#reset-button").on("click", n);
                    var i = t.select("#resetOption");
                    i.on("mouseover", function() {
                        var t = e.options().searchMenu();
                        t.hideSearchEntries()
                    })
                }, r
            }
        }).call(t, n(6))
    },
    328: function(e, t, n) {
        (function(t) {
            e.exports = function(e) {
                function n() {
                    h = e.getUpdateDictionary(), x = !1, y = [], m = [];
                    var t, n = [],
                        o = [];
                    for (t = 0; t < h.length; t++) {
                        var r = h[t].labelForCurrentLanguage();
                        if (n.push(h[t].id()), o.push(r), h[t].equivalents && h[t].equivalents().length > 0)
                            for (var i = h[t].equivalentsString(), a = i.split(", "), l = 0; l < a.length; l++) n.push(h[t].id()), o.push(a[l])
                    }
                    p = [], f = [];
                    var s, c, d = -1;
                    for (t = 0; t < o.length; t++)
                        if (0 !== t)
                            if (s = o[t], c = n[t], d = p.indexOf(s), d === -1) {
                                p.push(o[t]), f.push([]);
                                var u = f.length;
                                f[u - 1].push(c)
                            } else f[d].push(c);
                    else p.push(o[t]), f.push([]), f[0].push(n[t]);
                    for (t = 0; t < p.length; t++) {
                        for (var v = p[t], g = f[t], b = "[ ", k = 0; k < g.length; k++) b += g[k].toString(), b += ", ";
                        b = b.substring(0, b.length - 2), b += " ]";
                        var C = g[0];
                        if (g.length > 1) {
                            for (var S = !0, w = 0; w < g.length; w++) g[w] !== C && (S = !1);
                            S === !0 ? y.push(v) : y.push(v + " (" + g.length + ")")
                        } else y.push(v);
                        m.push(v)
                    }
                }

                function o() {
                    g.showSearchEntries()
                }

                function r() {
                    k ? g.hideSearchEntries() : g.showSearchEntries()
                }

                function i(e) {
                    var t = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
                    return t.test(e)
                }

                function a() {
                    x && n();
                    var o, r = u.node().children,
                        a = r.length,
                        l = 0,
                        s = -1;
                    for (o = 0; o < a; o++) {
                        var c = r[o].getAttribute("class");
                        "dbEntrySelected" === c && (s = o)
                    }
                    if (13 === t.event.keyCode)
                        if (s >= 0 && s < a) r[s].onclick(), g.hideSearchEntries();
                        else if (0 === a) {
                        v = d.node().value;
                        for (var p = v.replace(/%20/g, " "); p.beginsWith(" ");) p = p.substr(1, p.length);
                        for (; p.endsWith(" ");) p = p.substr(0, p.length - 1);
                        var f = p.replace(/ /g, "%20"),
                            h = i(f);
                        if (h) {
                            var y = e.options().ontologyMenu();
                            y.setIriText(f), d.node().value = ""
                        } else console.log(f + " is not a valid URL!")
                    }
                    38 === t.event.keyCode && (l = -1, g.showSearchEntries()), 40 === t.event.keyCode && (l = 1, g.showSearchEntries());
                    var m = s + l;
                    m !== s && (m < 0 && s <= 0 && r[0].setAttribute("class", "dbEntrySelected"), m >= a && r[s].setAttribute("class", "dbEntrySelected"), m >= 0 && m < a && (r[m].setAttribute("class", "dbEntrySelected"), s >= 0 && r[s].setAttribute("class", "dbEntry")))
                }

                function l() {
                    var e, t;
                    v = d.node().value;
                    var n, o, r = [],
                        i = [],
                        a = v.toLowerCase();
                    for (n = 0; n < y.length; n++) {
                        var l = y[n];
                        void 0 !== l && (o = y[n].toLowerCase(), o.indexOf(a) > -1 && (r.push(y[n]), i.push(n)))
                    }
                    for (e = u.node().children, t = e.length, n = 0; n < t; n++) e[0].remove();
                    var s = r;
                    t = r.length, t > b && (t = b);
                    var p = [],
                        f = [];
                    for (n = 0; n < t; n++) {
                        for (var h = 1e6, g = 1e6, m = -1, x = 0; x < s.length; x++) {
                            o = s[x].toLowerCase();
                            var k = o.indexOf(a),
                                C = o.length;
                            k > -1 && k <= h && C <= g && (m = x, h = k, g = C)
                        }
                        p.push(s[m]), f.push(i[m]), s[m] = ""
                    }
                    for (t = r.length, t > b && (t = b), n = 0; n < t; n++) {
                        var S = document.createElement("li");
                        S.setAttribute("elementID", f[n]), S.onclick = c(f[n]), S.setAttribute("class", "dbEntry");
                        var w = document.createTextNode(p[n]);
                        S.appendChild(w), u.node().appendChild(S)
                    }
                }

                function s() {
                    if (x && n(), e.resetSearchHighlight(), 0 === y.length) return void console.log("dictionary is empty");
                    var o, r = u.node().children,
                        i = r.length;
                    if (v = d.node().value, t.select("#locateSearchResult").classed("highlighted", !1), t.select("#locateSearchResult").node().title = "Nothing to locate, enter search term.", 0 !== v.length) {
                        var a, l = [],
                            s = [],
                            p = v.toLowerCase();
                        for (o = 0; o < y.length; o++) {
                            var f = y[o];
                            void 0 !== f && (a = y[o].toLowerCase(), a.indexOf(p) > -1 && (l.push(y[o]), s.push(o)))
                        }
                        for (r = u.node().children, i = r.length, o = 0; o < i; o++) r[0].remove();
                        var h = l;
                        i = l.length, i > b && (i = b);
                        var m = [],
                            k = [];
                        for (o = 0; o < i; o++) {
                            for (var C = 1e8, S = 1e8, w = -1, O = 0; O < h.length; O++) {
                                a = h[O].toLowerCase();
                                var E = a.indexOf(p),
                                    A = a.length;
                                E > -1 && E <= C && A <= S && (w = O, C = E, S = A)
                            }
                            m.push(h[w]), k.push(s[w]), h[w] = ""
                        }
                        for (o = 0; o < i; o++) {
                            var M;
                            M = document.createElement("li"), M.setAttribute("elementID", k[o]), M.setAttribute("class", "dbEntry"), M.onclick = c(k[o]);
                            var D = document.createTextNode(m[o]);
                            M.appendChild(D), u.node().appendChild(M)
                        }
                        g.showSearchEntries()
                    } else
                        for (o = 0; o < i; o++) r[0].remove()
                }

                function c(n) {
                    return function() {
                        var o = n,
                            r = f[o],
                            i = m[o];
                        d.node().value = i, e.resetSearchHighlight(), e.highLightNodes(r), t.select("#locateSearchResult").node().title = "Locate search term", i !== v && l(), g.hideSearchEntries()
                    }
                }
                var d, u, p, f, h, v, g = {},
                    y = [],
                    m = [],
                    b = 6,
                    x = !0,
                    k = !1;
                return String.prototype.beginsWith = function(e) {
                    return 0 === this.indexOf(e)
                }, g.requestDictionaryUpdate = function() {
                    x = !0;
                    for (var e = u.node().children, t = e.length, n = 0; n < t; n++) e[0].remove();
                    d.node().value = ""
                }, g.setup = function() {
                    y = [], d = t.select("#search-input-text"), u = t.select("#searchEntryContainer"), d.on("input", s), d.on("keydown", a), d.on("click", r), d.on("mouseover", o);
                    var n = t.select("#locateSearchResult");
                    n.on("click", function() {
                        e.locateSearchResult()
                    }), n.on("mouseover", function() {
                        g.hideSearchEntries()
                    })
                }, g.hideSearchEntries = function() {
                    u.style("display", "none"), k = !1
                }, g.showSearchEntries = function() {
                    u.style("display", "block"), k = !0
                }, g.getSearchString = function() {
                    return d.node().value
                }, g.clearText = function() {
                    d.node().value = "", t.select("#locateSearchResult").classed("highlighted", !1), t.select("#locateSearchResult").node().title = "Nothing to locate, enter search term.";
                    for (var e = u.node().children, n = e.length, o = 0; o < n; o++) e[0].remove()
                }, g
            }
        }).call(t, n(6))
    },
    329: function(e, t, n) {
        (function(t) {
            e.exports = function(e) {
                function n() {
                    u.on("mouseover", function() {
                        var t = e.options().searchMenu();
                        t.hideSearchEntries()
                    }), p.on("mouseover", function() {
                        var t = e.options().searchMenu();
                        t.hideSearchEntries()
                    }), u.on("click", function() {
                        var e, t, n;
                        if (1 !== c[0]) {
                            var o = c.indexOf(1) - 1,
                                l = c.indexOf(1);
                            for (e = l + 1; e < c.length; e++) c[e] = 0, s[e].style.display = "none";
                            for (c[o] = 1, s[o].style.display = "block", e = l + 1; e < c.length; e++) {
                                if (c[e] = 0, s[e].style.display = "block", t = s[o].getBoundingClientRect().top, n = s[e].getBoundingClientRect().top, t !== n) {
                                    s[e].style.display = "none", c[e] = 0;
                                    break
                                }
                                c[e] = 1
                            }
                            r();
                            var d = i(),
                                u = c.lastIndexOf(1);
                            d || (c[u] = 0, s[u].style.display = "none");
                            var p = c.lastIndexOf(1);
                            for (e = p - 1; e >= 0; e--) {
                                if (c[e] = 0, s[e].style.display = "block", t = s[o].getBoundingClientRect().top, n = s[e].getBoundingClientRect().top, t !== n) {
                                    s[e].style.display = "none", c[e] = 0;
                                    break
                                }
                                c[e] = 1
                            }
                            r(), d = i(), d || (u = c.indexOf(1), u !== -1 && (c[u] = 0, s[u].style.display = "none")), r(), d = i(), d || (u = c.indexOf(1), u !== -1 && (c[u] = 0, s[u].style.display = "none")), r(), d = i(), d || (u = c.indexOf(1), u !== -1 && (c[u] = 0, s[u].style.display = "none")), r(), a()
                        }
                    }), p.on("click", function() {
                        if (1 !== c[c.length - 1]) {
                            var e, t = c.lastIndexOf(1) + 1,
                                n = c.lastIndexOf(1);
                            for (e = n - 1; e >= 0; e--) c[e] = 0, s[e].style.display = "none";
                            for (c[t] = 1, s[t].style.display = "block", e = n - 1; e >= 0; e--) {
                                c[e] = 0, s[e].style.display = "block";
                                var o = s[t].getBoundingClientRect().top,
                                    l = s[e].getBoundingClientRect().top;
                                if (o !== l) {
                                    s[e].style.display = "none", c[e] = 0;
                                    break
                                }
                                c[e] = 1
                            }
                            r();
                            var d = i();
                            if (!d) {
                                var u = c.indexOf(1);
                                u !== -1 && (c[u] = 0, s[u].style.display = "none")
                            }
                            a()
                        }
                    })
                }

                function o() {
                    c[0] = 1, s[0].style.display = "block"
                }

                function r() {
                    var e = s.length - 2,
                        t = s.length - 1;
                    s[e].style.display = "none", s[t].style.display = "none", c.indexOf(0) !== -1 && (s[e].style.display = "block", s[t].style.display = "block")
                }

                function i() {
                    if (c.indexOf(0) === -1) return !0;
                    var e = s.length - 2,
                        t = s.length - 1,
                        n = c.indexOf(1);
                    n === -1 && (o(), n = c.indexOf(1));
                    var r = s[n].getBoundingClientRect().top,
                        i = s[e].getBoundingClientRect().top,
                        a = s[t].getBoundingClientRect().top;
                    s[e].style.display = "block", s[t].style.display = "block";
                    var l = !1;
                    return r === i && r === a && (l = !0), l
                }

                function a() {
                    1 !== c[c.length - 1] ? p.classed("highlighted", !0) : p.classed("highlighted", !1), 1 !== c[0] ? u.classed("highlighted", !0) : u.classed("highlighted", !1)
                }
                var l = {},
                    s = [],
                    c = [],
                    d = t.select("#optionsMenu"),
                    u = t.select("#LeftButton"),
                    p = t.select("#RightButton");
                return l.setup = function() {
                    var e, t = d.node().children;
                    for (e = 0; e < t.length; e++) s.push(t[e]);
                    for (n(), e = 0; e < s.length - 2; e++) s[e].style.display = "block", c[e] = 1
                }, l.updateVisibilityStatus = function() {
                    var e, t = c.indexOf(1);
                    t === -1 && (o(), t = c.indexOf(1));
                    var n, l = s[t].getBoundingClientRect().top;
                    for (e = 0; e < s.length - 2; e++) n = s[e].getBoundingClientRect().top, n === l ? c[e] = 1 : (c[e] = 0, s[e].style.display = "none");
                    var d = c.indexOf(1),
                        u = c.lastIndexOf(1);
                    for (d === -1 && u === -1 && (o(), d = c.indexOf(1), u = c.lastIndexOf(1)), e = d + 1; e < s.length - 2; e++) {
                        if (s[e].style.display = "block", l = s[d].getBoundingClientRect().top, n = s[e].getBoundingClientRect().top, l !== n) {
                            s[e].style.display = "none", c[e] = 0;
                            break
                        }
                        c[e] = 1
                    }
                    r();
                    var p, f = i();
                    if (f || 0 !== d || (p = c.lastIndexOf(1), p !== -1 && (c[p] = 0, s[p].style.display = "none")), 0 !== d || u !== c.length) {
                        if (u = c.lastIndexOf(1), u >= 1) {
                            for (e = u - 1; e >= 0; e--) c[e] = 0, s[e].style.display = "none";
                            for (e = u - 1; e >= 0; e--) {
                                if (c[e] = 0, s[e].style.display = "block", l = s[u].getBoundingClientRect().top, n = s[e].getBoundingClientRect().top, l !== n) {
                                    s[e].style.display = "none", c[e] = 0;
                                    break
                                }
                                c[e] = 1
                            }
                        }
                        r(), f = i(), f || (p = c.indexOf(1), p !== -1 && (c[p] = 0, s[p].style.display = "none"))
                    }
                    c.indexOf(1) === -1 && o(), a()
                }, l
            }
        }).call(t, n(6))
    },
    330: function(e, t, n) {
        (function(t) {
            e.exports = function(e) {
                function n() {
                    function e(e) {
                        e.classed("hidden", !0)
                    }

                    function n(e) {
                        e.classed("hidden", !1)
                    }
                    var o = t.selectAll(".accordion-trigger");
                    e(t.selectAll(".accordion-trigger:not(.accordion-trigger-active) + div")), o.on("click", function() {
                        var o = t.select(this),
                            r = t.selectAll(".accordion-trigger-active");
                        o.classed("accordion-trigger-active") ? (e(t.select(o.node().nextElementSibling)), o.classed("accordion-trigger-active", !1)) : (e(t.selectAll(".accordion-trigger-active + div")), r.classed("accordion-trigger-active", !1), n(t.select(o.node().nextElementSibling)), o.classed("accordion-trigger-active", !0))
                    })
                }

                function o(n) {
                    n = n || [], n.sort(function(e, t) {
                        return e === webvowl.util.constants().LANG_IRIBASED ? -1 : t === webvowl.util.constants().LANG_IRIBASED ? 1 : e === webvowl.util.constants().LANG_UNDEFINED ? -1 : t === webvowl.util.constants().LANG_UNDEFINED ? 1 : e.localeCompare(t)
                    });
                    var o = t.select("#language").on("change", function() {
                        e.language(t.event.target.value), i(), S.updateSelectionInformation(C)
                    });
                    o.selectAll("option").remove(), o.selectAll("option").data(n).enter().append("option").attr("value", function(e) {
                        return e
                    }).text(function(e) {
                        return e
                    }), r(o, n, "en") || r(o, n, webvowl.util.constants().LANG_UNDEFINED) || r(o, n, webvowl.util.constants().LANG_IRIBASED)
                }

                function r(t, n, o) {
                    var r = n.indexOf(o);
                    return r >= 0 && (t.property("selectedIndex", r), e.language(o), !0)
                }

                function i() {
                    var n = w.textInLanguage(k.title, e.language());
                    t.select("#title").text(n || "No title available"), t.select("#about").attr("href", k.iri).attr("target", "_blank").text(k.iri), t.select("#version").text(k.version || "--");
                    var o = k.author;
                    "string" == typeof o ? t.select("#authors").text(o) : o instanceof Array ? t.select("#authors").text(o.join(", ")) : t.select("#authors").text("--");
                    var r = w.textInLanguage(k.description, e.language());
                    t.select("#description").text(r || "No description available.")
                }

                function a(e, n) {
                    e = e || {}, t.select("#classCount").text(e.classCount || n.classCount()), t.select("#objectPropertyCount").text(e.objectPropertyCount || n.objectPropertyCount()), t.select("#datatypePropertyCount").text(e.datatypePropertyCount || n.datatypePropertyCount()), t.select("#individualCount").text(e.totalIndividualCount || n.totalIndividualCount()), t.select("#nodeCount").text(n.nodeCount()), t.select("#edgeCount").text(n.edgeCount())
                }

                function l(e) {
                    var n = t.select("#ontology-metadata");
                    n.selectAll("*").remove(), s(n, e), n.selectAll(".annotation").size() <= 0 && n.append("p").text("No annotations available.")
                }

                function s(e, n) {
                    n = n || {};
                    var o = [];
                    for (var r in n) n.hasOwnProperty(r) && o.push(n[r][0]);
                    e.selectAll(".annotation").remove(), e.selectAll(".annotation").data(o).enter().append("p").classed("annotation", !0).classed("statisticDetails", !0).text(function(e) {
                        return e.identifier + ":"
                    }).append("span").each(function(e) {
                        h(t.select(this), e.value, "iri" === e.type ? e.value : void 0)
                    })
                }

                function c() {
                    d(!1, !1, !0)
                }

                function d(e, n, o) {
                    t.select("#classSelectionInformation").classed("hidden", !e), t.select("#propertySelectionInformation").classed("hidden", !n), t.select("#noSelectionInformation").classed("hidden", !o)
                }

                function u(e) {
                    p(), f(t.select("#propname"), e.labelForCurrentLanguage(), e.iri()), t.select("#typeProp").text(e.type()), void 0 !== e.inverse() ? (t.select("#inverse").classed("hidden", !1), f(t.select("#inverse span"), e.inverse().labelForCurrentLanguage(), e.inverse().iri())) : t.select("#inverse").classed("hidden", !0);
                    var n = t.select("#propEquivUri");
                    b(n, e.equivalents()), b(t.select("#subproperties"), e.subproperties()), b(t.select("#superproperties"), e.superproperties()), void 0 !== e.minCardinality() ? (t.select("#infoCardinality").classed("hidden", !0), t.select("#minCardinality").classed("hidden", !1), t.select("#minCardinality span").text(e.minCardinality()), t.select("#maxCardinality").classed("hidden", !1), void 0 !== e.maxCardinality() ? t.select("#maxCardinality span").text(e.maxCardinality()) : t.select("#maxCardinality span").text("*")) : void 0 !== e.cardinality() ? (t.select("#minCardinality").classed("hidden", !0), t.select("#maxCardinality").classed("hidden", !0), t.select("#infoCardinality").classed("hidden", !1), t.select("#infoCardinality span").text(e.cardinality())) : (t.select("#infoCardinality").classed("hidden", !0), t.select("#minCardinality").classed("hidden", !0), t.select("#maxCardinality").classed("hidden", !0)), f(t.select("#domain"), e.domain().labelForCurrentLanguage(), e.domain().iri()), f(t.select("#range"), e.range().labelForCurrentLanguage(), e.range().iri()), v(e.attributes(), t.select("#propAttributes")), x(t.select("#propDescription"), e.descriptionForCurrentLanguage()), x(t.select("#propComment"), e.commentForCurrentLanguage()), s(t.select("#propertySelectionInformation"), e.annotations())
                }

                function p() {
                    d(!1, !0, !1)
                }

                function f(e, n, o) {
                    var r = t.select(e.node().parentNode);
                    n ? (e.selectAll("*").remove(), h(e, n, o), r.classed("hidden", !1)) : r.classed("hidden", !0)
                }

                function h(e, t, n) {
                    var o;
                    o = n ? e.append("a").attr("href", n).attr("title", n).attr("target", "_blank") : e.append("span"), o.text(t)
                }

                function v(e, n) {
                    var o = t.select(n.node().parentNode);
                    e && e.length > 0 && (g("object", e), g("datatype", e), g("rdf", e)), e && e.length > 0 ? (n.text(e.join(", ")), o.classed("hidden", !1)) : o.classed("hidden", !0)
                }

                function g(e, t) {
                    var n = t.indexOf(e);
                    n > -1 && t.splice(n, 1)
                }

                function y(e) {
                    m(), f(t.select("#name"), e.labelForCurrentLanguage(), e.iri());
                    var n = t.select("#classEquivUri");
                    b(n, e.equivalents()), t.select("#typeNode").text(e.type()), b(t.select("#individuals"), e.individuals());
                    var o = t.select("#disjointNodes"),
                        r = t.select(o.node().parentNode);
                    void 0 !== e.disjointWith() ? (o.selectAll("*").remove(), e.disjointWith().forEach(function(e, t) {
                        t > 0 && o.append("span").text(", "), h(o, e.labelForCurrentLanguage(), e.iri())
                    }), r.classed("hidden", !1)) : r.classed("hidden", !0), v(e.attributes(), t.select("#classAttributes")), x(t.select("#nodeDescription"), e.descriptionForCurrentLanguage()), x(t.select("#nodeComment"), e.commentForCurrentLanguage()), s(t.select("#classSelectionInformation"), e.annotations())
                }

                function m() {
                    d(!0, !1, !1)
                }

                function b(e, n) {
                    var o = t.select(e.node().parentNode);
                    n && n.length ? (e.selectAll("*").remove(), n.forEach(function(t, n) {
                        n > 0 && e.append("span").text(", "), h(e, t.labelForCurrentLanguage(), t.iri())
                    }), o.classed("hidden", !1)) : o.classed("hidden", !0)
                }

                function x(e, n) {
                    var o = t.select(e.node().parentNode),
                        r = !!n;
                    n && e.text(n), o.classed("hidden", !r)
                }
                var k, C, S = {},
                    w = webvowl.util.languageTools(),
                    O = webvowl.util.elementTools();
                return S.setup = function() {
                    n()
                }, S.clearOntologyInformation = function() {
                    t.select("#title").text("No title available"), t.select("#about").attr("href", "#").attr("target", "_blank").text("not given"), t.select("#version").text("--"), t.select("#authors").text("--"), t.select("#description").text("No description available.");
                    var e = t.select("#ontology-metadata");
                    e.selectAll("*").remove(), t.select("#classCount").text("0"), t.select("#objectPropertyCount").text("0"), t.select("#datatypePropertyCount").text("0"), t.select("#individualCount").text("0"), t.select("#nodeCount").text("0"), t.select("#edgeCount").text("0");
                    var n = t.select("#selection-details-trigger").classed("accordion-trigger-active");
                    n && t.select("#selection-details-trigger").node().click(), c()
                }, S.updateOntologyInformation = function(e, t) {
                    e = e || {}, k = e.header || {}, i(), a(e.metrics, t), l(k.other), S.updateSelectionInformation(void 0), o(k.languages)
                }, S.updateSelectionInformation = function(e) {
                    if (C = e, !t.event || !t.event.defaultPrevented) {
                        var n = t.select("#selection-details-trigger").classed("accordion-trigger-active");
                        if (e && !n) t.select("#selection-details-trigger").node().click();
                        else if (!e && n) return void c();
                        O.isProperty(e) ? u(e) : O.isNode(e) && y(e)
                    }
                }, S
            }
        }).call(t, n(6))
    }
});