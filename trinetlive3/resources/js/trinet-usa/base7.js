! function() {
 var d3 = {
  version: "3.4.6"
 };
 if (!Date.now) Date.now = function() {
  return +new Date
 };
 var d3_arraySlice = [].slice,
  d3_array = function(list) {
   return d3_arraySlice.call(list)
  };
 var d3_document = document,
  d3_documentElement = d3_document.documentElement,
  d3_window = window;
 try {
  d3_array(d3_documentElement.childNodes)[0].nodeType
 } catch (e) {
  d3_array = function(list) {
   var i = list.length,
    array = new Array(i);
   while (i--) array[i] = list[i];
   return array
  }
 }
 try {
  d3_document.createElement("div").style.setProperty("opacity", 0, "")
 } catch (error) {
  var d3_element_prototype = d3_window.Element.prototype,
   d3_element_setAttribute = d3_element_prototype.setAttribute,
   d3_element_setAttributeNS = d3_element_prototype.setAttributeNS,
   d3_style_prototype = d3_window.CSSStyleDeclaration.prototype,
   d3_style_setProperty = d3_style_prototype.setProperty;
  d3_element_prototype.setAttribute = function(name, value) {
   d3_element_setAttribute.call(this, name, value + "")
  };
  d3_element_prototype.setAttributeNS = function(space, local, value) {
   d3_element_setAttributeNS.call(this, space, local, value + "")
  };
  d3_style_prototype.setProperty = function(name, value, priority) {
   d3_style_setProperty.call(this, name, value + "", priority)
  }
 }
 d3.ascending = d3_ascending;

 function d3_ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN
 }
 d3.descending = function(a, b) {
  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN
 };
 d3.min = function(array, f) {
  var i = -1,
   n = array.length,
   a, b;
  if (arguments.length === 1) {
   while (++i < n && !((a = array[i]) != null && a <= a)) a = undefined;
   while (++i < n)
    if ((b = array[i]) != null && a > b) a = b
  } else {
   while (++i < n && !((a = f.call(array, array[i], i)) != null && a <= a)) a = undefined;
   while (++i < n)
    if ((b = f.call(array, array[i], i)) != null && a > b) a = b
  }
  return a
 };
 d3.max = function(array, f) {
  var i = -1,
   n = array.length,
   a, b;
  if (arguments.length === 1) {
   while (++i < n && !((a = array[i]) != null && a <= a)) a = undefined;
   while (++i < n)
    if ((b = array[i]) != null && b > a) a = b
  } else {
   while (++i < n && !((a = f.call(array, array[i], i)) != null && a <= a)) a = undefined;
   while (++i < n)
    if ((b = f.call(array, array[i], i)) != null && b > a) a = b
  }
  return a
 };
 d3.extent = function(array, f) {
  var i = -1,
   n = array.length,
   a, b, c;
  if (arguments.length === 1) {
   while (++i < n && !((a = c = array[i]) != null && a <= a)) a = c = undefined;
   while (++i < n)
    if ((b = array[i]) != null) {
     if (a > b) a = b;
     if (c < b) c = b
    }
  } else {
   while (++i < n && !((a = c = f.call(array, array[i], i)) != null && a <= a)) a = undefined;
   while (++i < n)
    if ((b = f.call(array, array[i], i)) != null) {
     if (a > b) a = b;
     if (c < b) c = b
    }
  }
  return [a, c]
 };
 d3.sum = function(array, f) {
  var s = 0,
   n = array.length,
   a, i = -1;
  if (arguments.length === 1) {
   while (++i < n)
    if (!isNaN(a = +array[i])) s += a
  } else {
   while (++i < n)
    if (!isNaN(a = +f.call(array, array[i], i))) s += a
  }
  return s
 };

 function d3_number(x) {
  return x != null && !isNaN(x)
 }
 d3.mean = function(array, f) {
  var s = 0,
   n = array.length,
   a, i = -1,
   j = n;
  if (arguments.length === 1) {
   while (++i < n)
    if (d3_number(a = array[i])) s += a;
    else --j
  } else {
   while (++i < n)
    if (d3_number(a = f.call(array, array[i], i))) s += a;
    else --j
  }
  return j ? s / j : undefined
 };
 d3.quantile = function(values, p) {
  var H = (values.length - 1) * p + 1,
   h = Math.floor(H),
   v = +values[h - 1],
   e = H - h;
  return e ? v + e * (values[h] - v) : v
 };
 d3.median = function(array, f) {
  if (arguments.length > 1) array = array.map(f);
  array = array.filter(d3_number);
  return array.length ? d3.quantile(array.sort(d3_ascending), .5) : undefined
 };

 function d3_bisector(compare) {
  return {
   left: function(a, x, lo, hi) {
    if (arguments.length < 3) lo = 0;
    if (arguments.length < 4) hi = a.length;
    while (lo < hi) {
     var mid = lo + hi >>> 1;
     if (compare(a[mid], x) < 0) lo = mid + 1;
     else hi = mid
    }
    return lo
   },
   right: function(a, x, lo, hi) {
    if (arguments.length < 3) lo = 0;
    if (arguments.length < 4) hi = a.length;
    while (lo < hi) {
     var mid = lo + hi >>> 1;
     if (compare(a[mid], x) > 0) hi = mid;
     else lo = mid + 1
    }
    return lo
   }
  }
 }
 var d3_bisect = d3_bisector(d3_ascending);
 d3.bisectLeft = d3_bisect.left;
 d3.bisect = d3.bisectRight = d3_bisect.right;
 d3.bisector = function(f) {
  return d3_bisector(f.length === 1 ? function(d, x) {
   return d3_ascending(f(d), x)
  } : f)
 };
 d3.shuffle = function(array) {
  var m = array.length,
   t, i;
  while (m) {
   i = Math.random() * m-- | 0;
   t = array[m], array[m] = array[i], array[i] = t
  }
  return array
 };
 d3.permute = function(array, indexes) {
  var i = indexes.length,
   permutes = new Array(i);
  while (i--) permutes[i] = array[indexes[i]];
  return permutes
 };
 d3.pairs = function(array) {
  var i = 0,
   n = array.length - 1,
   p0, p1 = array[0],
   pairs = new Array(n < 0 ? 0 : n);
  while (i < n) pairs[i] = [p0 = p1, p1 = array[++i]];
  return pairs
 };
 d3.zip = function() {
  if (!(n = arguments.length)) return [];
  for (var i = -1, m = d3.min(arguments, d3_zipLength), zips = new Array(m); ++i < m;) {
   for (var j = -1, n, zip = zips[i] = new Array(n); ++j < n;) {
    zip[j] = arguments[j][i]
   }
  }
  return zips
 };

 function d3_zipLength(d) {
  return d.length
 }
 d3.transpose = function(matrix) {
  return d3.zip.apply(d3, matrix)
 };
 d3.keys = function(map) {
  var keys = [];
  for (var key in map) keys.push(key);
  return keys
 };
 d3.values = function(map) {
  var values = [];
  for (var key in map) values.push(map[key]);
  return values
 };
 d3.entries = function(map) {
  var entries = [];
  for (var key in map) entries.push({
   key: key,
   value: map[key]
  });
  return entries
 };
 d3.merge = function(arrays) {
  var n = arrays.length,
   m, i = -1,
   j = 0,
   merged, array;
  while (++i < n) j += arrays[i].length;
  merged = new Array(j);
  while (--n >= 0) {
   array = arrays[n];
   m = array.length;
   while (--m >= 0) {
    merged[--j] = array[m]
   }
  }
  return merged
 };
 var abs = Math.abs;
 d3.range = function(start, stop, step) {
  if (arguments.length < 3) {
   step = 1;
   if (arguments.length < 2) {
    stop = start;
    start = 0
   }
  }
  if ((stop - start) / step === Infinity) throw new Error("infinite range");
  var range = [],
   k = d3_range_integerScale(abs(step)),
   i = -1,
   j;
  start *= k, stop *= k, step *= k;
  if (step < 0)
   while ((j = start + step * ++i) > stop) range.push(j / k);
  else
   while ((j = start + step * ++i) < stop) range.push(j / k);
  return range
 };

 function d3_range_integerScale(x) {
  var k = 1;
  while (x * k % 1) k *= 10;
  return k
 }

 function d3_class(ctor, properties) {
  try {
   for (var key in properties) {
    Object.defineProperty(ctor.prototype, key, {
     value: properties[key],
     enumerable: false
    })
   }
  } catch (e) {
   ctor.prototype = properties
  }
 }
 d3.map = function(object) {
  var map = new d3_Map;
  if (object instanceof d3_Map) object.forEach(function(key, value) {
   map.set(key, value)
  });
  else
   for (var key in object) map.set(key, object[key]);
  return map
 };

 function d3_Map() {}
 d3_class(d3_Map, {
  has: d3_map_has,
  get: function(key) {
   return this[d3_map_prefix + key]
  },
  set: function(key, value) {
   return this[d3_map_prefix + key] = value
  },
  remove: d3_map_remove,
  keys: d3_map_keys,
  values: function() {
   var values = [];
   this.forEach(function(key, value) {
    values.push(value)
   });
   return values
  },
  entries: function() {
   var entries = [];
   this.forEach(function(key, value) {
    entries.push({
     key: key,
     value: value
    })
   });
   return entries
  },
  size: d3_map_size,
  empty: d3_map_empty,
  forEach: function(f) {
   for (var key in this)
    if (key.charCodeAt(0) === d3_map_prefixCode) f.call(this, key.substring(1), this[key])
  }
 });
 var d3_map_prefix = "\x00",
  d3_map_prefixCode = d3_map_prefix.charCodeAt(0);

 function d3_map_has(key) {
  return d3_map_prefix + key in this
 }

 function d3_map_remove(key) {
  key = d3_map_prefix + key;
  return key in this && delete this[key]
 }

 function d3_map_keys() {
  var keys = [];
  this.forEach(function(key) {
   keys.push(key)
  });
  return keys
 }

 function d3_map_size() {
  var size = 0;
  for (var key in this)
   if (key.charCodeAt(0) === d3_map_prefixCode) ++size;
  return size
 }

 function d3_map_empty() {
  for (var key in this)
   if (key.charCodeAt(0) === d3_map_prefixCode) return false;
  return true
 }
 d3.nest = function() {
  var nest = {},
   keys = [],
   sortKeys = [],
   sortValues, rollup;

  function map(mapType, array, depth) {
   if (depth >= keys.length) return rollup ? rollup.call(nest, array) : sortValues ? array.sort(sortValues) : array;
   var i = -1,
    n = array.length,
    key = keys[depth++],
    keyValue, object, setter, valuesByKey = new d3_Map,
    values;
   while (++i < n) {
    if (values = valuesByKey.get(keyValue = key(object = array[i]))) {
     values.push(object)
    } else {
     valuesByKey.set(keyValue, [object])
    }
   }
   if (mapType) {
    object = mapType();
    setter = function(keyValue, values) {
     object.set(keyValue, map(mapType, values, depth))
    }
   } else {
    object = {};
    setter = function(keyValue, values) {
     object[keyValue] = map(mapType, values, depth)
    }
   }
   valuesByKey.forEach(setter);
   return object
  }

  function entries(map, depth) {
   if (depth >= keys.length) return map;
   var array = [],
    sortKey = sortKeys[depth++];
   map.forEach(function(key, keyMap) {
    array.push({
     key: key,
     values: entries(keyMap, depth)
    })
   });
   return sortKey ? array.sort(function(a, b) {
    return sortKey(a.key, b.key)
   }) : array
  }
  nest.map = function(array, mapType) {
   return map(mapType, array, 0)
  };
  nest.entries = function(array) {
   return entries(map(d3.map, array, 0), 0)
  };
  nest.key = function(d) {
   keys.push(d);
   return nest
  };
  nest.sortKeys = function(order) {
   sortKeys[keys.length - 1] = order;
   return nest
  };
  nest.sortValues = function(order) {
   sortValues = order;
   return nest
  };
  nest.rollup = function(f) {
   rollup = f;
   return nest
  };
  return nest
 };
 d3.set = function(array) {
  var set = new d3_Set;
  if (array)
   for (var i = 0, n = array.length; i < n; ++i) set.add(array[i]);
  return set
 };

 function d3_Set() {}
 d3_class(d3_Set, {
  has: d3_map_has,
  add: function(value) {
   this[d3_map_prefix + value] = true;
   return value
  },
  remove: function(value) {
   value = d3_map_prefix + value;
   return value in this && delete this[value]
  },
  values: d3_map_keys,
  size: d3_map_size,
  empty: d3_map_empty,
  forEach: function(f) {
   for (var value in this)
    if (value.charCodeAt(0) === d3_map_prefixCode) f.call(this, value.substring(1))
  }
 });
 d3.behavior = {};
 d3.rebind = function(target, source) {
  var i = 1,
   n = arguments.length,
   method;
  while (++i < n) target[method = arguments[i]] = d3_rebind(target, source, source[method]);
  return target
 };

 function d3_rebind(target, source, method) {
  return function() {
   var value = method.apply(source, arguments);
   return value === source ? target : value
  }
 }

 function d3_vendorSymbol(object, name) {
  if (name in object) return name;
  name = name.charAt(0).toUpperCase() + name.substring(1);
  for (var i = 0, n = d3_vendorPrefixes.length; i < n; ++i) {
   var prefixName = d3_vendorPrefixes[i] + name;
   if (prefixName in object) return prefixName
  }
 }
 var d3_vendorPrefixes = ["webkit", "ms", "moz", "Moz", "o", "O"];

 function d3_noop() {}
 d3.dispatch = function() {
  var dispatch = new d3_dispatch,
   i = -1,
   n = arguments.length;
  while (++i < n) dispatch[arguments[i]] = d3_dispatch_event(dispatch);
  return dispatch
 };

 function d3_dispatch() {}
 d3_dispatch.prototype.on = function(type, listener) {
  var i = type.indexOf("."),
   name = "";
  if (i >= 0) {
   name = type.substring(i + 1);
   type = type.substring(0, i)
  }
  if (type) return arguments.length < 2 ? this[type].on(name) : this[type].on(name, listener);
  if (arguments.length === 2) {
   if (listener == null)
    for (type in this) {
     if (this.hasOwnProperty(type)) this[type].on(name, null)
    }
   return this
  }
 };

 function d3_dispatch_event(dispatch) {
  var listeners = [],
   listenerByName = new d3_Map;

  function event() {
   var z = listeners,
    i = -1,
    n = z.length,
    l;
   while (++i < n)
    if (l = z[i].on) l.apply(this, arguments);
   return dispatch
  }
  event.on = function(name, listener) {
   var l = listenerByName.get(name),
    i;
   if (arguments.length < 2) return l && l.on;
   if (l) {
    l.on = null;
    listeners = listeners.slice(0, i = listeners.indexOf(l)).concat(listeners.slice(i + 1));
    listenerByName.remove(name)
   }
   if (listener) listeners.push(listenerByName.set(name, {
    on: listener
   }));
   return dispatch
  };
  return event
 }
 d3.event = null;

 function d3_eventPreventDefault() {
  d3.event.preventDefault()
 }

 function d3_eventSource() {
  var e = d3.event,
   s;
  while (s = e.sourceEvent) e = s;
  return e
 }

 function d3_eventDispatch(target) {
  var dispatch = new d3_dispatch,
   i = 0,
   n = arguments.length;
  while (++i < n) dispatch[arguments[i]] = d3_dispatch_event(dispatch);
  dispatch.of = function(thiz, argumentz) {
   return function(e1) {
    try {
     var e0 = e1.sourceEvent = d3.event;
     e1.target = target;
     d3.event = e1;
     dispatch[e1.type].apply(thiz, argumentz)
    } finally {
     d3.event = e0
    }
   }
  };
  return dispatch
 }
 d3.requote = function(s) {
  return s.replace(d3_requote_re, "\\$&")
 };
 var d3_requote_re = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;
 var d3_subclass = {}.__proto__ ? function(object, prototype) {
  object.__proto__ = prototype
 } : function(object, prototype) {
  for (var property in prototype) object[property] = prototype[property]
 };

 function d3_selection(groups) {
  d3_subclass(groups, d3_selectionPrototype);
  return groups
 }
 var d3_select = function(s, n) {
   return n.querySelector(s)
  },
  d3_selectAll = function(s, n) {
   return n.querySelectorAll(s)
  },
  d3_selectMatcher = d3_documentElement[d3_vendorSymbol(d3_documentElement, "matchesSelector")],
  d3_selectMatches = function(n, s) {
   return d3_selectMatcher.call(n, s)
  };
 if (typeof Sizzle === "function") {
  d3_select = function(s, n) {
   return Sizzle(s, n)[0] || null
  };
  d3_selectAll = Sizzle;
  d3_selectMatches = Sizzle.matchesSelector
 }
 d3.selection = function() {
  return d3_selectionRoot
 };
 var d3_selectionPrototype = d3.selection.prototype = [];
 d3_selectionPrototype.select = function(selector) {
  var subgroups = [],
   subgroup, subnode, group, node;
  selector = d3_selection_selector(selector);
  for (var j = -1, m = this.length; ++j < m;) {
   subgroups.push(subgroup = []);
   subgroup.parentNode = (group = this[j]).parentNode;
   for (var i = -1, n = group.length; ++i < n;) {
    if (node = group[i]) {
     subgroup.push(subnode = selector.call(node, node.__data__, i, j));
     if (subnode && "__data__" in node) subnode.__data__ = node.__data__
    } else {
     subgroup.push(null)
    }
   }
  }
  return d3_selection(subgroups)
 };

 function d3_selection_selector(selector) {
  return typeof selector === "function" ? selector : function() {
   return d3_select(selector, this)
  }
 }
 d3_selectionPrototype.selectAll = function(selector) {
  var subgroups = [],
   subgroup, node;
  selector = d3_selection_selectorAll(selector);
  for (var j = -1, m = this.length; ++j < m;) {
   for (var group = this[j], i = -1, n = group.length; ++i < n;) {
    if (node = group[i]) {
     subgroups.push(subgroup = d3_array(selector.call(node, node.__data__, i, j)));
     subgroup.parentNode = node
    }
   }
  }
  return d3_selection(subgroups)
 };

 function d3_selection_selectorAll(selector) {
  return typeof selector === "function" ? selector : function() {
   return d3_selectAll(selector, this)
  }
 }
 var d3_nsPrefix = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: "http://www.w3.org/1999/xhtml",
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
 };
 d3.ns = {
  prefix: d3_nsPrefix,
  qualify: function(name) {
   var i = name.indexOf(":"),
    prefix = name;
   if (i >= 0) {
    prefix = name.substring(0, i);
    name = name.substring(i + 1)
   }
   return d3_nsPrefix.hasOwnProperty(prefix) ? {
    space: d3_nsPrefix[prefix],
    local: name
   } : name
  }
 };
 d3_selectionPrototype.attr = function(name, value) {
  if (arguments.length < 2) {
   if (typeof name === "string") {
    var node = this.node();
    name = d3.ns.qualify(name);
    return name.local ? node.getAttributeNS(name.space, name.local) : node.getAttribute(name)
   }
   for (value in name) this.each(d3_selection_attr(value, name[value]));
   return this
  }
  return this.each(d3_selection_attr(name, value))
 };

 function d3_selection_attr(name, value) {
  name = d3.ns.qualify(name);

  function attrNull() {
   this.removeAttribute(name)
  }

  function attrNullNS() {
   this.removeAttributeNS(name.space, name.local)
  }

  function attrConstant() {
   this.setAttribute(name, value)
  }

  function attrConstantNS() {
   this.setAttributeNS(name.space, name.local, value)
  }

  function attrFunction() {
   var x = value.apply(this, arguments);
   if (x == null) this.removeAttribute(name);
   else this.setAttribute(name, x)
  }

  function attrFunctionNS() {
   var x = value.apply(this, arguments);
   if (x == null) this.removeAttributeNS(name.space, name.local);
   else this.setAttributeNS(name.space, name.local, x)
  }
  return value == null ? name.local ? attrNullNS : attrNull : typeof value === "function" ? name.local ? attrFunctionNS : attrFunction : name.local ? attrConstantNS : attrConstant
 }

 function d3_collapse(s) {
  return s.trim().replace(/\s+/g, " ")
 }
 d3_selectionPrototype.classed = function(name, value) {
  if (arguments.length < 2) {
   if (typeof name === "string") {
    var node = this.node(),
     n = (name = d3_selection_classes(name)).length,
     i = -1;
    if (value = node.classList) {
     while (++i < n)
      if (!value.contains(name[i])) return false
    } else {
     value = node.getAttribute("class");
     while (++i < n)
      if (!d3_selection_classedRe(name[i]).test(value)) return false
    }
    return true
   }
   for (value in name) this.each(d3_selection_classed(value, name[value]));
   return this
  }
  return this.each(d3_selection_classed(name, value))
 };

 function d3_selection_classedRe(name) {
  return new RegExp("(?:^|\\s+)" + d3.requote(name) + "(?:\\s+|$)", "g")
 }

 function d3_selection_classes(name) {
  return name.trim().split(/^|\s+/)
 }

 function d3_selection_classed(name, value) {
  name = d3_selection_classes(name).map(d3_selection_classedName);
  var n = name.length;

  function classedConstant() {
   var i = -1;
   while (++i < n) name[i](this, value)
  }

  function classedFunction() {
   var i = -1,
    x = value.apply(this, arguments);
   while (++i < n) name[i](this, x)
  }
  return typeof value === "function" ? classedFunction : classedConstant
 }

 function d3_selection_classedName(name) {
  var re = d3_selection_classedRe(name);
  return function(node, value) {
   if (c = node.classList) return value ? c.add(name) : c.remove(name);
   var c = node.getAttribute("class") || "";
   if (value) {
    re.lastIndex = 0;
    if (!re.test(c)) node.setAttribute("class", d3_collapse(c + " " + name))
   } else {
    node.setAttribute("class", d3_collapse(c.replace(re, " ")))
   }
  }
 }
 d3_selectionPrototype.style = function(name, value, priority) {
  var n = arguments.length;
  if (n < 3) {
   if (typeof name !== "string") {
    if (n < 2) value = "";
    for (priority in name) this.each(d3_selection_style(priority, name[priority], value));
    return this
   }
   if (n < 2) return d3_window.getComputedStyle(this.node(), null).getPropertyValue(name);
   priority = ""
  }
  return this.each(d3_selection_style(name, value, priority))
 };

 function d3_selection_style(name, value, priority) {
  function styleNull() {
   this.style.removeProperty(name)
  }

  function styleConstant() {
   this.style.setProperty(name, value, priority)
  }

  function styleFunction() {
   var x = value.apply(this, arguments);
   if (x == null) this.style.removeProperty(name);
   else this.style.setProperty(name, x, priority)
  }
  return value == null ? styleNull : typeof value === "function" ? styleFunction : styleConstant
 }
 d3_selectionPrototype.property = function(name, value) {
  if (arguments.length < 2) {
   if (typeof name === "string") return this.node()[name];
   for (value in name) this.each(d3_selection_property(value, name[value]));
   return this
  }
  return this.each(d3_selection_property(name, value))
 };

 function d3_selection_property(name, value) {
  function propertyNull() {
   delete this[name]
  }

  function propertyConstant() {
   this[name] = value
  }

  function propertyFunction() {
   var x = value.apply(this, arguments);
   if (x == null) delete this[name];
   else this[name] = x
  }
  return value == null ? propertyNull : typeof value === "function" ? propertyFunction : propertyConstant
 }
 d3_selectionPrototype.text = function(value) {
  return arguments.length ? this.each(typeof value === "function" ? function() {
   var v = value.apply(this, arguments);
   this.textContent = v == null ? "" : v
  } : value == null ? function() {
   this.textContent = ""
  } : function() {
   this.textContent = value
  }) : this.node().textContent
 };
 d3_selectionPrototype.html = function(value) {
  return arguments.length ? this.each(typeof value === "function" ? function() {
   var v = value.apply(this, arguments);
   this.innerHTML = v == null ? "" : v
  } : value == null ? function() {
   this.innerHTML = ""
  } : function() {
   this.innerHTML = value
  }) : this.node().innerHTML
 };
 d3_selectionPrototype.append = function(name) {
  name = d3_selection_creator(name);
  return this.select(function() {
   return this.appendChild(name.apply(this, arguments))
  })
 };

 function d3_selection_creator(name) {
  return typeof name === "function" ? name : (name = d3.ns.qualify(name)).local ? function() {
   return this.ownerDocument.createElementNS(name.space, name.local)
  } : function() {
   return this.ownerDocument.createElementNS(this.namespaceURI, name)
  }
 }
 d3_selectionPrototype.insert = function(name, before) {
  name = d3_selection_creator(name);
  before = d3_selection_selector(before);
  return this.select(function() {
   return this.insertBefore(name.apply(this, arguments), before.apply(this, arguments) || null)
  })
 };
 d3_selectionPrototype.remove = function() {
  return this.each(function() {
   var parent = this.parentNode;
   if (parent) parent.removeChild(this)
  })
 };
 d3_selectionPrototype.data = function(value, key) {
  var i = -1,
   n = this.length,
   group, node;
  if (!arguments.length) {
   value = new Array(n = (group = this[0]).length);
   while (++i < n) {
    if (node = group[i]) {
     value[i] = node.__data__
    }
   }
   return value
  }

  function bind(group, groupData) {
   var i, n = group.length,
    m = groupData.length,
    n0 = Math.min(n, m),
    updateNodes = new Array(m),
    enterNodes = new Array(m),
    exitNodes = new Array(n),
    node, nodeData;
   if (key) {
    var nodeByKeyValue = new d3_Map,
     dataByKeyValue = new d3_Map,
     keyValues = [],
     keyValue;
    for (i = -1; ++i < n;) {
     keyValue = key.call(node = group[i], node.__data__, i);
     if (nodeByKeyValue.has(keyValue)) {
      exitNodes[i] = node
     } else {
      nodeByKeyValue.set(keyValue, node)
     }
     keyValues.push(keyValue)
    }
    for (i = -1; ++i < m;) {
     keyValue = key.call(groupData, nodeData = groupData[i], i);
     if (node = nodeByKeyValue.get(keyValue)) {
      updateNodes[i] = node;
      node.__data__ = nodeData
     } else if (!dataByKeyValue.has(keyValue)) {
      enterNodes[i] = d3_selection_dataNode(nodeData)
     }
     dataByKeyValue.set(keyValue, nodeData);
     nodeByKeyValue.remove(keyValue)
    }
    for (i = -1; ++i < n;) {
     if (nodeByKeyValue.has(keyValues[i])) {
      exitNodes[i] = group[i]
     }
    }
   } else {
    for (i = -1; ++i < n0;) {
     node = group[i];
     nodeData = groupData[i];
     if (node) {
      node.__data__ = nodeData;
      updateNodes[i] = node
     } else {
      enterNodes[i] = d3_selection_dataNode(nodeData)
     }
    }
    for (; i < m; ++i) {
     enterNodes[i] = d3_selection_dataNode(groupData[i])
    }
    for (; i < n; ++i) {
     exitNodes[i] = group[i]
    }
   }
   enterNodes.update = updateNodes;
   enterNodes.parentNode = updateNodes.parentNode = exitNodes.parentNode = group.parentNode;
   enter.push(enterNodes);
   update.push(updateNodes);
   exit.push(exitNodes)
  }
  var enter = d3_selection_enter([]),
   update = d3_selection([]),
   exit = d3_selection([]);
  if (typeof value === "function") {
   while (++i < n) {
    bind(group = this[i], value.call(group, group.parentNode.__data__, i))
   }
  } else {
   while (++i < n) {
    bind(group = this[i], value)
   }
  }
  update.enter = function() {
   return enter
  };
  update.exit = function() {
   return exit
  };
  return update
 };

 function d3_selection_dataNode(data) {
  return {
   __data__: data
  }
 }
 d3_selectionPrototype.datum = function(value) {
  return arguments.length ? this.property("__data__", value) : this.property("__data__")
 };
 d3_selectionPrototype.filter = function(filter) {
  var subgroups = [],
   subgroup, group, node;
  if (typeof filter !== "function") filter = d3_selection_filter(filter);
  for (var j = 0, m = this.length; j < m; j++) {
   subgroups.push(subgroup = []);
   subgroup.parentNode = (group = this[j]).parentNode;
   for (var i = 0, n = group.length; i < n; i++) {
    if ((node = group[i]) && filter.call(node, node.__data__, i, j)) {
     subgroup.push(node)
    }
   }
  }
  return d3_selection(subgroups)
 };

 function d3_selection_filter(selector) {
  return function() {
   return d3_selectMatches(this, selector)
  }
 }
 d3_selectionPrototype.order = function() {
  for (var j = -1, m = this.length; ++j < m;) {
   for (var group = this[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
    if (node = group[i]) {
     if (next && next !== node.nextSibling) next.parentNode.insertBefore(node, next);
     next = node
    }
   }
  }
  return this
 };
 d3_selectionPrototype.sort = function(comparator) {
  comparator = d3_selection_sortComparator.apply(this, arguments);
  for (var j = -1, m = this.length; ++j < m;) this[j].sort(comparator);
  return this.order()
 };

 function d3_selection_sortComparator(comparator) {
  if (!arguments.length) comparator = d3_ascending;
  return function(a, b) {
   return a && b ? comparator(a.__data__, b.__data__) : !a - !b
  }
 }
 d3_selectionPrototype.each = function(callback) {
  return d3_selection_each(this, function(node, i, j) {
   callback.call(node, node.__data__, i, j)
  })
 };

 function d3_selection_each(groups, callback) {
  for (var j = 0, m = groups.length; j < m; j++) {
   for (var group = groups[j], i = 0, n = group.length, node; i < n; i++) {
    if (node = group[i]) callback(node, i, j)
   }
  }
  return groups
 }
 d3_selectionPrototype.call = function(callback) {
  var args = d3_array(arguments);
  callback.apply(args[0] = this, args);
  return this
 };
 d3_selectionPrototype.empty = function() {
  return !this.node()
 };
 d3_selectionPrototype.node = function() {
  for (var j = 0, m = this.length; j < m; j++) {
   for (var group = this[j], i = 0, n = group.length; i < n; i++) {
    var node = group[i];
    if (node) return node
   }
  }
  return null
 };
 d3_selectionPrototype.size = function() {
  var n = 0;
  this.each(function() {
   ++n
  });
  return n
 };

 function d3_selection_enter(selection) {
  d3_subclass(selection, d3_selection_enterPrototype);
  return selection
 }
 var d3_selection_enterPrototype = [];
 d3.selection.enter = d3_selection_enter;
 d3.selection.enter.prototype = d3_selection_enterPrototype;
 d3_selection_enterPrototype.append = d3_selectionPrototype.append;
 d3_selection_enterPrototype.empty = d3_selectionPrototype.empty;
 d3_selection_enterPrototype.node = d3_selectionPrototype.node;
 d3_selection_enterPrototype.call = d3_selectionPrototype.call;
 d3_selection_enterPrototype.size = d3_selectionPrototype.size;
 d3_selection_enterPrototype.select = function(selector) {
  var subgroups = [],
   subgroup, subnode, upgroup, group, node;
  for (var j = -1, m = this.length; ++j < m;) {
   upgroup = (group = this[j]).update;
   subgroups.push(subgroup = []);
   subgroup.parentNode = group.parentNode;
   for (var i = -1, n = group.length; ++i < n;) {
    if (node = group[i]) {
     subgroup.push(upgroup[i] = subnode = selector.call(group.parentNode, node.__data__, i, j));
     subnode.__data__ = node.__data__
    } else {
     subgroup.push(null)
    }
   }
  }
  return d3_selection(subgroups)
 };
 d3_selection_enterPrototype.insert = function(name, before) {
  if (arguments.length < 2) before = d3_selection_enterInsertBefore(this);
  return d3_selectionPrototype.insert.call(this, name, before)
 };

 function d3_selection_enterInsertBefore(enter) {
  var i0, j0;
  return function(d, i, j) {
   var group = enter[j].update,
    n = group.length,
    node;
   if (j != j0) j0 = j, i0 = 0;
   if (i >= i0) i0 = i + 1;
   while (!(node = group[i0]) && ++i0 < n);
   return node
  }
 }
 d3_selectionPrototype.transition = function() {
  var id = d3_transitionInheritId || ++d3_transitionId,
   subgroups = [],
   subgroup, node, transition = d3_transitionInherit || {
    time: Date.now(),
    ease: d3_ease_cubicInOut,
    delay: 0,
    duration: 250
   };
  for (var j = -1, m = this.length; ++j < m;) {
   subgroups.push(subgroup = []);
   for (var group = this[j], i = -1, n = group.length; ++i < n;) {
    if (node = group[i]) d3_transitionNode(node, i, id, transition);
    subgroup.push(node)
   }
  }
  return d3_transition(subgroups, id)
 };
 d3_selectionPrototype.interrupt = function() {
  return this.each(d3_selection_interrupt)
 };

 function d3_selection_interrupt() {
  var lock = this.__transition__;
  if (lock) ++lock.active
 }
 d3.select = function(node) {
  var group = [typeof node === "string" ? d3_select(node, d3_document) : node];
  group.parentNode = d3_documentElement;
  return d3_selection([group])
 };
 d3.selectAll = function(nodes) {
  var group = d3_array(typeof nodes === "string" ? d3_selectAll(nodes, d3_document) : nodes);
  group.parentNode = d3_documentElement;
  return d3_selection([group])
 };
 var d3_selectionRoot = d3.select(d3_documentElement);
 d3_selectionPrototype.on = function(type, listener, capture) {
  var n = arguments.length;
  if (n < 3) {
   if (typeof type !== "string") {
    if (n < 2) listener = false;
    for (capture in type) this.each(d3_selection_on(capture, type[capture], listener));
    return this
   }
   if (n < 2) return (n = this.node()["__on" + type]) && n._;
   capture = false
  }
  return this.each(d3_selection_on(type, listener, capture))
 };

 function d3_selection_on(type, listener, capture) {
  var name = "__on" + type,
   i = type.indexOf("."),
   wrap = d3_selection_onListener;
  if (i > 0) type = type.substring(0, i);
  var filter = d3_selection_onFilters.get(type);
  if (filter) type = filter, wrap = d3_selection_onFilter;

  function onRemove() {
   var l = this[name];
   if (l) {
    this.removeEventListener(type, l, l.$);
    delete this[name]
   }
  }

  function onAdd() {
   var l = wrap(listener, d3_array(arguments));
   onRemove.call(this);
   this.addEventListener(type, this[name] = l, l.$ = capture);
   l._ = listener
  }

  function removeAll() {
   var re = new RegExp("^__on([^.]+)" + d3.requote(type) + "$"),
    match;
   for (var name in this) {
    if (match = name.match(re)) {
     var l = this[name];
     this.removeEventListener(match[1], l, l.$);
     delete this[name]
    }
   }
  }
  return i ? listener ? onAdd : onRemove : listener ? d3_noop : removeAll
 }
 var d3_selection_onFilters = d3.map({
  mouseenter: "mouseover",
  mouseleave: "mouseout"
 });
 d3_selection_onFilters.forEach(function(k) {
  if ("on" + k in d3_document) d3_selection_onFilters.remove(k)
 });

 function d3_selection_onListener(listener, argumentz) {
  return function(e) {
   var o = d3.event;
   d3.event = e;
   argumentz[0] = this.__data__;
   try {
    listener.apply(this, argumentz)
   } finally {
    d3.event = o
   }
  }
 }

 function d3_selection_onFilter(listener, argumentz) {
  var l = d3_selection_onListener(listener, argumentz);
  return function(e) {
   var target = this,
    related = e.relatedTarget;
   if (!related || related !== target && !(related.compareDocumentPosition(target) & 8)) {
    l.call(target, e)
   }
  }
 }
 var d3_event_dragSelect = "onselectstart" in d3_document ? null : d3_vendorSymbol(d3_documentElement.style, "userSelect"),
  d3_event_dragId = 0;

 function d3_event_dragSuppress() {
  var name = ".dragsuppress-" + ++d3_event_dragId,
   click = "click" + name,
   w = d3.select(d3_window).on("touchmove" + name, d3_eventPreventDefault).on("dragstart" + name, d3_eventPreventDefault).on("selectstart" + name, d3_eventPreventDefault);
  if (d3_event_dragSelect) {
   var style = d3_documentElement.style,
    select = style[d3_event_dragSelect];
   style[d3_event_dragSelect] = "none"
  }
  return function(suppressClick) {
   w.on(name, null);
   if (d3_event_dragSelect) style[d3_event_dragSelect] = select;
   if (suppressClick) {
    function off() {
     w.on(click, null)
    }
    w.on(click, function() {
     d3_eventPreventDefault();
     off()
    }, true);
    setTimeout(off, 0)
   }
  }
 }
 d3.mouse = function(container) {
  return d3_mousePoint(container, d3_eventSource())
 };

 function d3_mousePoint(container, e) {
  if (e.changedTouches) e = e.changedTouches[0];
  var svg = container.ownerSVGElement || container;
  if (svg.createSVGPoint) {
   var point = svg.createSVGPoint();
   point.x = e.clientX, point.y = e.clientY;
   point = point.matrixTransform(container.getScreenCTM().inverse());
   return [point.x, point.y]
  }
  var rect = container.getBoundingClientRect();
  return [e.clientX - rect.left - container.clientLeft, e.clientY - rect.top - container.clientTop]
 }
 d3.touches = function(container, touches) {
  if (arguments.length < 2) touches = d3_eventSource().touches;
  return touches ? d3_array(touches).map(function(touch) {
   var point = d3_mousePoint(container, touch);
   point.identifier = touch.identifier;
   return point
  }) : []
 };
 d3.behavior.drag = function() {
  var event = d3_eventDispatch(drag, "drag", "dragstart", "dragend"),
   origin = null,
   mousedown = dragstart(d3_noop, d3.mouse, d3_behavior_dragMouseSubject, "mousemove", "mouseup"),
   touchstart = dragstart(d3_behavior_dragTouchId, d3.touch, d3_behavior_dragTouchSubject, "touchmove", "touchend");

  function drag() {
   this.on("mousedown.drag", mousedown).on("touchstart.drag", touchstart)
  }

  function dragstart(id, position, subject, move, end) {
   return function() {
    var that = this,
     target = d3.event.target,
     parent = that.parentNode,
     dispatch = event.of(that, arguments),
     dragged = 0,
     dragId = id(),
     dragName = ".drag" + (dragId == null ? "" : "-" + dragId),
     dragOffset, dragSubject = d3.select(subject()).on(move + dragName, moved).on(end + dragName, ended),
     dragRestore = d3_event_dragSuppress(),
     position0 = position(parent, dragId);
    if (origin) {
     dragOffset = origin.apply(that, arguments);
     dragOffset = [dragOffset.x - position0[0], dragOffset.y - position0[1]]
    } else {
     dragOffset = [0, 0]
    }
    dispatch({
     type: "dragstart"
    });

    function moved() {
     var position1 = position(parent, dragId),
      dx, dy;
     if (!position1) return;
     dx = position1[0] - position0[0];
     dy = position1[1] - position0[1];
     dragged |= dx | dy;
     position0 = position1;
     dispatch({
      type: "drag",
      x: position1[0] + dragOffset[0],
      y: position1[1] + dragOffset[1],
      dx: dx,
      dy: dy
     })
    }

    function ended() {
     if (!position(parent, dragId)) return;
     dragSubject.on(move + dragName, null).on(end + dragName, null);
     dragRestore(dragged && d3.event.target === target);
     dispatch({
      type: "dragend"
     })
    }
   }
  }
  drag.origin = function(x) {
   if (!arguments.length) return origin;
   origin = x;
   return drag
  };
  return d3.rebind(drag, event, "on")
 };

 function d3_behavior_dragTouchId() {
  return d3.event.changedTouches[0].identifier
 }

 function d3_behavior_dragTouchSubject() {
  return d3.event.target
 }

 function d3_behavior_dragMouseSubject() {
  return d3_window
 }
 
 function decode(s){
	 return decodeURIComponent( unescape(s) );
 }
 var IE = Math.PI,
  I2 = 2 * IE,
  halfIE = IE / 2,
  Iu = 1e-6,
  Iu2 = Iu * Iu,
  d3_radians = IE / 180,
  d3_degrees = 180 / IE;

 function d3_sgn(x) {
  return x > 0 ? 1 : x < 0 ? -1 : 0
 }

 function d3_cross2d(a, b, c) {
  return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])
 }

 function d3_acos(x) {
  return x > 1 ? 0 : x < -1 ? IE : Math.acos(x)
 }

 function d3_asin(x) {
  return x > 1 ? halfIE : x < -1 ? -halfIE : Math.asin(x)
 }

 function d3_sinh(x) {
  return ((x = Math.exp(x)) - 1 / x) / 2
 }

 function d3_cosh(x) {
  return ((x = Math.exp(x)) + 1 / x) / 2
 }

 function d3_tanh(x) {
  return ((x = Math.exp(2 * x)) - 1) / (x + 1)
 }

 function d3_haversin(x) {
  return (x = Math.sin(x / 2)) * x
 }
 var ITOPLINE = Math.SQRT2,
 ITOPLINE2 = 2,
 ITOPLINE4  = 4;
 d3.interpolateZoom = function(p0, p1) {
  var ux0 = p0[0],
   uy0 = p0[1],
   w0 = p0[2],
   ux1 = p1[0],
   uy1 = p1[1],
   w1 = p1[2];
  var dx = ux1 - ux0,
   dy = uy1 - uy0,
   d2 = dx * dx + dy * dy,
   d1 = Math.sqrt(d2),
   b0 = (w1 * w1 - w0 * w0 + ITOPLINE4  * d2) / (2 * w0 * ITOPLINE2 * d1),
   b1 = (w1 * w1 - w0 * w0 - ITOPLINE4  * d2) / (2 * w1 * ITOPLINE2 * d1),
   r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
   r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1),
   dr = r1 - r0,
   S = (dr || Math.log(w1 / w0)) / ITOPLINE;

  function interpolate(t) {
   var s = t * S;
   if (dr) {
    var coshr0 = d3_cosh(r0),
     u = w0 / (ITOPLINE2 * d1) * (coshr0 * d3_tanh(ITOPLINE * s + r0) - d3_sinh(r0));
    return [ux0 + u * dx, uy0 + u * dy, w0 * coshr0 / d3_cosh(ITOPLINE * s + r0)]
   }
   return [ux0 + t * dx, uy0 + t * dy, w0 * Math.exp(ITOPLINE * s)]
  }
  interpolate.duration = S * 1e3;
  return interpolate
 };
 d3.behavior.zoom = function() {
  var view = {
    x: 0,
    y: 0,
    k: 1
   },
   translate0, center, size = [960, 500],
   scaleExtent = d3_behavior_zoomInfinity,
   mousedown = "mousedown.zoom",
   mousemove = "mousemove.zoom",
   mouseup = "mouseup.zoom",
   mousewheelTimer, touchstart = "touchstart.zoom",
   touchtime, event = d3_eventDispatch(zoom, "zoomstart", "zoom", "zoomend"),
   x0, x1, y0, y1;

  function zoom(g) {
   g.on(mousedown, mousedowned).on(d3_behavior_zoomWheel + ".zoom", mousewheeled).on(mousemove, mousewheelreset).on("dblclick.zoom", dblclicked).on(touchstart, touchstarted)
  }
  zoom.event = function(g) {
   g.each(function() {
    var dispatch = event.of(this, arguments),
     view1 = view;
    if (d3_transitionInheritId) {
     d3.select(this).transition().each("start.zoom", function() {
      view = this.__chart__ || {
       x: 0,
       y: 0,
       k: 1
      };
      zoomstarted(dispatch)
     }).tween("zoom:zoom", function() {
      var dx = size[0],
       dy = size[1],
       cx = dx / 2,
       cy = dy / 2,
       i = d3.interpolateZoom([(cx - view.x) / view.k, (cy - view.y) / view.k, dx / view.k], [(cx - view1.x) / view1.k, (cy - view1.y) / view1.k, dx / view1.k]);
      return function(t) {
       var l = i(t),
        k = dx / l[2];
       this.__chart__ = view = {
        x: cx - l[0] * k,
        y: cy - l[1] * k,
        k: k
       };
       zoomed(dispatch)
      }
     }).each("end.zoom", function() {
      zoomended(dispatch)
     })
    } else {
     this.__chart__ = view;
     zoomstarted(dispatch);
     zoomed(dispatch);
     zoomended(dispatch)
    }
   })
  };
  zoom.translate = function(_) {
   if (!arguments.length) return [view.x, view.y];
   view = {
    x: +_[0],
    y: +_[1],
    k: view.k
   };
   rescale();
   return zoom
  };
  zoom.scale = function(_) {
   if (!arguments.length) return view.k;
   view = {
    x: view.x,
    y: view.y,
    k: +_
   };
   rescale();
   return zoom
  };
  zoom.scaleExtent = function(_) {
   if (!arguments.length) return scaleExtent;
   scaleExtent = _ == null ? d3_behavior_zoomInfinity : [+_[0], +_[1]];
   return zoom
  };
  zoom.center = function(_) {
   if (!arguments.length) return center;
   center = _ && [+_[0], +_[1]];
   return zoom
  };
  zoom.size = function(_) {
   if (!arguments.length) return size;
   size = _ && [+_[0], +_[1]];
   return zoom
  };
  zoom.x = function(z) {
   if (!arguments.length) return x1;
   x1 = z;
   x0 = z.copy();
   view = {
    x: 0,
    y: 0,
    k: 1
   };
   return zoom
  };
  zoom.y = function(z) {
   if (!arguments.length) return y1;
   y1 = z;
   y0 = z.copy();
   view = {
    x: 0,
    y: 0,
    k: 1
   };
   return zoom
  };

  function location(p) {
   return [(p[0] - view.x) / view.k, (p[1] - view.y) / view.k]
  }

  function point(l) {
   return [l[0] * view.k + view.x, l[1] * view.k + view.y]
  }

  function scaleTo(s) {
   view.k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], s))
  }

  function translateTo(p, l) {
   l = point(l);
   view.x += p[0] - l[0];
   view.y += p[1] - l[1]
  }

  function rescale() {
   if (x1) x1.domain(x0.range().map(function(x) {
    return (x - view.x) / view.k
   }).map(x0.invert));
   if (y1) y1.domain(y0.range().map(function(y) {
    return (y - view.y) / view.k
   }).map(y0.invert))
  }

  function zoomstarted(dispatch) {
   dispatch({
    type: "zoomstart"
   })
  }

  function zoomed(dispatch) {
   rescale();
   dispatch({
    type: "zoom",
    scale: view.k,
    translate: [view.x, view.y]
   })
  }

  function zoomended(dispatch) {
   dispatch({
    type: "zoomend"
   })
  }

  function mousedowned() {
   var that = this,
    target = d3.event.target,
    dispatch = event.of(that, arguments),
    dragged = 0,
    subject = d3.select(d3_window).on(mousemove, moved).on(mouseup, ended),
    location0 = location(d3.mouse(that)),
    dragRestore = d3_event_dragSuppress();
   d3_selection_interrupt.call(that);
   zoomstarted(dispatch);

   function moved() {
    dragged = 1;
    translateTo(d3.mouse(that), location0);
    zoomed(dispatch)
   }

   function ended() {
    subject.on(mousemove, d3_window === that ? mousewheelreset : null).on(mouseup, null);
    dragRestore(dragged && d3.event.target === target);
    zoomended(dispatch)
   }
  }

  function touchstarted() {
   var that = this,
    dispatch = event.of(that, arguments),
    locations0 = {},
    distance0 = 0,
    scale0, zoomName = ".zoom-" + d3.event.changedTouches[0].identifier,
    touchmove = "touchmove" + zoomName,
    touchend = "touchend" + zoomName,
    target = d3.select(d3.event.target).on(touchmove, moved).on(touchend, ended),
    subject = d3.select(that).on(mousedown, null).on(touchstart, started),
    dragRestore = d3_event_dragSuppress();
   d3_selection_interrupt.call(that);
   started();
   zoomstarted(dispatch);

   function relocate() {
    var touches = d3.touches(that);
    scale0 = view.k;
    touches.forEach(function(t) {
     if (t.identifier in locations0) locations0[t.identifier] = location(t)
    });
    return touches
   }

   function started() {
    var changed = d3.event.changedTouches;
    for (var i = 0, n = changed.length; i < n; ++i) {
     locations0[changed[i].identifier] = null
    }
    var touches = relocate(),
     now = Date.now();
    if (touches.length === 1) {
     if (now - touchtime < 500) {
      var p = touches[0],
       l = locations0[p.identifier];
      scaleTo(view.k * 2);
      translateTo(p, l);
      d3_eventPreventDefault();
      zoomed(dispatch)
     }
     touchtime = now
    } else if (touches.length > 1) {
     var p = touches[0],
      q = touches[1],
      dx = p[0] - q[0],
      dy = p[1] - q[1];
     distance0 = dx * dx + dy * dy
    }
   }

   function moved() {
    var touches = d3.touches(that),
     p0, l0, p1, l1;
    for (var i = 0, n = touches.length; i < n; ++i, l1 = null) {
     p1 = touches[i];
     if (l1 = locations0[p1.identifier]) {
      if (l0) break;
      p0 = p1, l0 = l1
     }
    }
    if (l1) {
     var distance1 = (distance1 = p1[0] - p0[0]) * distance1 + (distance1 = p1[1] - p0[1]) * distance1,
      scale1 = distance0 && Math.sqrt(distance1 / distance0);
     p0 = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
     l0 = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];
     scaleTo(scale1 * scale0)
    }
    touchtime = null;
    translateTo(p0, l0);
    zoomed(dispatch)
   }

   function ended() {
    if (d3.event.touches.length) {
     var changed = d3.event.changedTouches;
     for (var i = 0, n = changed.length; i < n; ++i) {
      delete locations0[changed[i].identifier]
     }
     for (var identifier in locations0) {
      return void relocate()
     }
    }
    target.on(zoomName, null);
    subject.on(mousedown, mousedowned).on(touchstart, touchstarted);
    dragRestore();
    zoomended(dispatch)
   }
  }

  function mousewheeled() {
   var dispatch = event.of(this, arguments);
   if (mousewheelTimer) clearTimeout(mousewheelTimer);
   else d3_selection_interrupt.call(this), zoomstarted(dispatch);
   mousewheelTimer = setTimeout(function() {
    mousewheelTimer = null;
    zoomended(dispatch)
   }, 50);
   d3_eventPreventDefault();
   var point = center || d3.mouse(this);
   if (!translate0) translate0 = location(point);
   scaleTo(Math.pow(2, d3_behavior_zoomDelta() * .002) * view.k);
   translateTo(point, translate0);
   zoomed(dispatch)
  }

  function mousewheelreset() {
   translate0 = null
  }

  function dblclicked() {
   var dispatch = event.of(this, arguments),
    p = d3.mouse(this),
    l = location(p),
    k = Math.log(view.k) / Math.LN2;
   zoomstarted(dispatch);
   scaleTo(Math.pow(2, d3.event.shiftKey ? Math.ceil(k) - 1 : Math.floor(k) + 1));
   translateTo(p, l);
   zoomed(dispatch);
   zoomended(dispatch)
  }
  return d3.rebind(zoom, event, "on")
 };
 var d3_behavior_zoomInfinity = [0, Infinity];
 var d3_behavior_zoomDelta, d3_behavior_zoomWheel = "onwheel" in d3_document ? (d3_behavior_zoomDelta = function() {
  return -d3.event.deltaY * (d3.event.deltaMode ? 120 : 1)
 }, "wheel") : "onmousewheel" in d3_document ? (d3_behavior_zoomDelta = function() {
  return d3.event.wheelDelta
 }, "mousewheel") : (d3_behavior_zoomDelta = function() {
  return -d3.event.detail
 }, "MozMousePixelScroll");

 function d3_Color() {}
 d3_Color.prototype.toString = function() {
  return this.rgb() + ""
 };
 d3.hsl = function(h, s, l) {
  return arguments.length === 1 ? h instanceof d3_Hsl ? d3_hsl(h.h, h.s, h.l) : d3_rgb_parse("" + h, d3_rgb_hsl, d3_hsl) : d3_hsl(+h, +s, +l)
 };

 function d3_hsl(h, s, l) {
  return new d3_Hsl(h, s, l)
 }

 function d3_Hsl(h, s, l) {
  this.h = h;
  this.s = s;
  this.l = l
 }
 var d3_hslPrototype = d3_Hsl.prototype = new d3_Color;
 d3_hslPrototype.brighter = function(k) {
  k = Math.pow(.7, arguments.length ? k : 1);
  return d3_hsl(this.h, this.s, this.l / k)
 };
 d3_hslPrototype.darker = function(k) {
  k = Math.pow(.7, arguments.length ? k : 1);
  return d3_hsl(this.h, this.s, k * this.l)
 };
 d3_hslPrototype.rgb = function() {
  return d3_hsl_rgb(this.h, this.s, this.l)
 };

 function d3_hsl_rgb(h, s, l) {
  var m1, m2;
  h = isNaN(h) ? 0 : (h %= 360) < 0 ? h + 360 : h;
  s = isNaN(s) ? 0 : s < 0 ? 0 : s > 1 ? 1 : s;
  l = l < 0 ? 0 : l > 1 ? 1 : l;
  m2 = l <= .5 ? l * (1 + s) : l + s - l * s;
  m1 = 2 * l - m2;

  function v(h) {
   if (h > 360) h -= 360;
   else if (h < 0) h += 360;
   if (h < 60) return m1 + (m2 - m1) * h / 60;
   if (h < 180) return m2;
   if (h < 240) return m1 + (m2 - m1) * (240 - h) / 60;
   return m1
  }

  function vv(h) {
   return Math.round(v(h) * 255)
  }
  return d3_rgb(vv(h + 120), vv(h), vv(h - 120))
 }
 d3.hcl = function(h, c, l) {
  return arguments.length === 1 ? h instanceof d3_Hcl ? d3_hcl(h.h, h.c, h.l) : h instanceof d3_Lab ? d3_lab_hcl(h.l, h.a, h.b) : d3_lab_hcl((h = d3_rgb_lab((h = d3.rgb(h)).r, h.g, h.b)).l, h.a, h.b) : d3_hcl(+h, +c, +l)
 };

 function d3_hcl(h, c, l) {
  return new d3_Hcl(h, c, l)
 }

 function d3_Hcl(h, c, l) {
  this.h = h;
  this.c = c;
  this.l = l
 }
 var d3_hclPrototype = d3_Hcl.prototype = new d3_Color;
 d3_hclPrototype.brighter = function(k) {
  return d3_hcl(this.h, this.c, Math.min(100, this.l + d3_lab_K * (arguments.length ? k : 1)))
 };
 d3_hclPrototype.darker = function(k) {
  return d3_hcl(this.h, this.c, Math.max(0, this.l - d3_lab_K * (arguments.length ? k : 1)))
 };
 d3_hclPrototype.rgb = function() {
  return d3_hcl_lab(this.h, this.c, this.l).rgb()
 };

 function d3_hcl_lab(h, c, l) {
  if (isNaN(h)) h = 0;
  if (isNaN(c)) c = 0;
  return d3_lab(l, Math.cos(h *= d3_radians) * c, Math.sin(h) * c)
 }
 d3.lab = function(l, a, b) {
  return arguments.length === 1 ? l instanceof d3_Lab ? d3_lab(l.l, l.a, l.b) : l instanceof d3_Hcl ? d3_hcl_lab(l.l, l.c, l.h) : d3_rgb_lab((l = d3.rgb(l)).r, l.g, l.b) : d3_lab(+l, +a, +b)
 };

 function d3_lab(l, a, b) {
  return new d3_Lab(l, a, b)
 }

 function d3_Lab(l, a, b) {
  this.l = l;
  this.a = a;
  this.b = b
 }
 var d3_lab_K = 18;
 var d3_lab_X = .95047,
  d3_lab_Y = 1,
  d3_lab_Z = 1.08883;
 var d3_labPrototype = d3_Lab.prototype = new d3_Color;
 d3_labPrototype.brighter = function(k) {
  return d3_lab(Math.min(100, this.l + d3_lab_K * (arguments.length ? k : 1)), this.a, this.b)
 };
 d3_labPrototype.darker = function(k) {
  return d3_lab(Math.max(0, this.l - d3_lab_K * (arguments.length ? k : 1)), this.a, this.b)
 };
 d3_labPrototype.rgb = function() {
  return d3_lab_rgb(this.l, this.a, this.b)
 };

 function d3_lab_rgb(l, a, b) {
  var y = (l + 16) / 116,
   x = y + a / 500,
   z = y - b / 200;
  x = d3_lab_xyz(x) * d3_lab_X;
  y = d3_lab_xyz(y) * d3_lab_Y;
  z = d3_lab_xyz(z) * d3_lab_Z;
  return d3_rgb(d3_xyz_rgb(3.2404542 * x - 1.5371385 * y - .4985314 * z), d3_xyz_rgb(-.969266 * x + 1.8760108 * y + .041556 * z), d3_xyz_rgb(.0556434 * x - .2040259 * y + 1.0572252 * z))
 }

 function d3_lab_hcl(l, a, b) {
  return l > 0 ? d3_hcl(Math.atan2(b, a) * d3_degrees, Math.sqrt(a * a + b * b), l) : d3_hcl(NaN, NaN, l)
 }

 function d3_lab_xyz(x) {
  return x > .206893034 ? x * x * x : (x - 4 / 29) / 7.787037
 }

 function d3_xyz_lab(x) {
  return x > .008856 ? Math.pow(x, 1 / 3) : 7.787037 * x + 4 / 29
 }

 function d3_xyz_rgb(r) {
  return Math.round(255 * (r <= .00304 ? 12.92 * r : 1.055 * Math.pow(r, 1 / 2.4) - .055))
 }
 d3.rgb = function(r, g, b) {
  return arguments.length === 1 ? r instanceof d3_Rgb ? d3_rgb(r.r, r.g, r.b) : d3_rgb_parse("" + r, d3_rgb, d3_hsl_rgb) : d3_rgb(~~r, ~~g, ~~b)
 };

 function d3_rgbNumber(value) {
  return d3_rgb(value >> 16, value >> 8 & 255, value & 255)
 }

 function d3_rgbString(value) {
  return d3_rgbNumber(value) + ""
 }

 function d3_rgb(r, g, b) {
  return new d3_Rgb(r, g, b)
 }

 function d3_Rgb(r, g, b) {
  this.r = r;
  this.g = g;
  this.b = b
 }
 var d3_rgbPrototype = d3_Rgb.prototype = new d3_Color;
 d3_rgbPrototype.brighter = function(k) {
  k = Math.pow(.7, arguments.length ? k : 1);
  var r = this.r,
   g = this.g,
   b = this.b,
   i = 30;
  if (!r && !g && !b) return d3_rgb(i, i, i);
  if (r && r < i) r = i;
  if (g && g < i) g = i;
  if (b && b < i) b = i;
  return d3_rgb(Math.min(255, ~~(r / k)), Math.min(255, ~~(g / k)), Math.min(255, ~~(b / k)))
 };
 d3_rgbPrototype.darker = function(k) {
  k = Math.pow(.7, arguments.length ? k : 1);
  return d3_rgb(~~(k * this.r), ~~(k * this.g), ~~(k * this.b))
 };
 d3_rgbPrototype.hsl = function() {
  return d3_rgb_hsl(this.r, this.g, this.b)
 };
 d3_rgbPrototype.toString = function() {
  return "#" + d3_rgb_hex(this.r) + d3_rgb_hex(this.g) + d3_rgb_hex(this.b)
 };

 function d3_rgb_hex(v) {
  return v < 16 ? "0" + Math.max(0, v).toString(16) : Math.min(255, v).toString(16)
 }

 function d3_rgb_parse(format, rgb, hsl) {
  var r = 0,
   g = 0,
   b = 0,
   m1, m2, color;
  m1 = /([a-z]+)\((.*)\)/i.exec(format);
  if (m1) {
   m2 = m1[2].split(",");
   switch (m1[1]) {
    case "hsl":
     {
      return hsl(parseFloat(m2[0]), parseFloat(m2[1]) / 100, parseFloat(m2[2]) / 100)
     }
    case "rgb":
     {
      return rgb(d3_rgb_parseNumber(m2[0]), d3_rgb_parseNumber(m2[1]), d3_rgb_parseNumber(m2[2]))
     }
   }
  }
  if (color = d3_rgb_names.get(format)) return rgb(color.r, color.g, color.b);
  if (format != null && format.charAt(0) === "#" && !isNaN(color = parseInt(format.substring(1), 16))) {
   if (format.length === 4) {
    r = (color & 3840) >> 4;
    r = r >> 4 | r;
    g = color & 240;
    g = g >> 4 | g;
    b = color & 15;
    b = b << 4 | b
   } else if (format.length === 7) {
    r = (color & 16711680) >> 16;
    g = (color & 65280) >> 8;
    b = color & 255
   }
  }
  return rgb(r, g, b)
 }

 function d3_rgb_hsl(r, g, b) {
  var min = Math.min(r /= 255, g /= 255, b /= 255),
   max = Math.max(r, g, b),
   d = max - min,
   h, s, l = (max + min) / 2;
  if (d) {
   s = l < .5 ? d / (max + min) : d / (2 - max - min);
   if (r == max) h = (g - b) / d + (g < b ? 6 : 0);
   else if (g == max) h = (b - r) / d + 2;
   else h = (r - g) / d + 4;
   h *= 60
  } else {
   h = NaN;
   s = l > 0 && l < 1 ? 0 : h
  }
  return d3_hsl(h, s, l)
 }

 function d3_rgb_lab(r, g, b) {
  r = d3_rgb_xyz(r);
  g = d3_rgb_xyz(g);
  b = d3_rgb_xyz(b);
  var x = d3_xyz_lab((.4124564 * r + .3575761 * g + .1804375 * b) / d3_lab_X),
   y = d3_xyz_lab((.2126729 * r + .7151522 * g + .072175 * b) / d3_lab_Y),
   z = d3_xyz_lab((.0193339 * r + .119192 * g + .9503041 * b) / d3_lab_Z);
  return d3_lab(116 * y - 16, 500 * (x - y), 200 * (y - z))
 }

 function d3_rgb_xyz(r) {
  return (r /= 255) <= .04045 ? r / 12.92 : Math.pow((r + .055) / 1.055, 2.4)
 }

 function d3_rgb_parseNumber(c) {
  var f = parseFloat(c);
  return c.charAt(c.length - 1) === "%" ? Math.round(f * 2.55) : f
 }
 var d3_rgb_names = d3.map({
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
 });
 d3_rgb_names.forEach(function(key, value) {
  d3_rgb_names.set(key, d3_rgbNumber(value))
 });

 function d3_functor(v) {
  return typeof v === "function" ? v : function() {
   return v
  }
 }
 d3.functor = d3_functor;

 function d3_identity(d) {
  return d
 }
 d3.xhr = d3_xhrType(d3_identity);

 function d3_xhrType(response) {
  return function(url, mimeType, callback) {
   if (arguments.length === 2 && typeof mimeType === "function") callback = mimeType, mimeType = null;
   return d3_xhr(url, mimeType, response, callback)
  }
 }

 function d3_xhr(url, mimeType, response, callback) {
  var xhr = {},
   dispatch = d3.dispatch("beforesend", "progress", "load", "error"),
   headers = {},
   request = new XMLHttpRequest,
   responseType = null;
  if (d3_window.XDomainRequest && !("withCredentials" in request) && /^(http(s)?:)?\/\//.test(url)) request = new XDomainRequest;
  "onload" in request ? request.onload = request.onerror = respond : request.onreadystatechange = function() {
   request.readyState > 3 && respond()
  };

  function respond() {
   var status = request.status,
    result;
   if (!status && request.responseText || status >= 200 && status < 300 || status === 304) {
    try {
     result = response.call(xhr, request)
    } catch (e) {
     dispatch.error.call(xhr, e);
     return
    }
    dispatch.load.call(xhr, result)
   } else {
    dispatch.error.call(xhr, request)
   }
  }
  request.onprogress = function(event) {
   var o = d3.event;
   d3.event = event;
   try {
    dispatch.progress.call(xhr, request)
   } finally {
    d3.event = o
   }
  };
  xhr.header = function(name, value) {
   name = (name + "").toLowerCase();
   if (arguments.length < 2) return headers[name];
   if (value == null) delete headers[name];
   else headers[name] = value + "";
   return xhr
  };
  xhr.mimeType = function(value) {
   if (!arguments.length) return mimeType;
   mimeType = value == null ? null : value + "";
   return xhr
  };
  xhr.responseType = function(value) {
   if (!arguments.length) return responseType;
   responseType = value;
   return xhr
  };
  xhr.response = function(value) {
   response = value;
   return xhr
  };
  ["get", "post"].forEach(function(method) {
   xhr[method] = function() {
    return xhr.send.apply(xhr, [method].concat(d3_array(arguments)))
   }
  });
  xhr.send = function(method, data, callback) {
   if (arguments.length === 2 && typeof data === "function") callback = data, data = null;
   request.open(method, url, true);
   if (mimeType != null && !("accept" in headers)) headers["accept"] = mimeType + ",*/*";
   if (request.setRequestHeader)
    for (var name in headers) request.setRequestHeader(name, headers[name]);
   if (mimeType != null && request.overrideMimeType) request.overrideMimeType(mimeType);
   if (responseType != null) request.responseType = responseType;
   if (callback != null) xhr.on("error", callback).on("load", function(request) {
    callback(null, request)
   });
   dispatch.beforesend.call(xhr, request);
   request.send(data == null ? null : data);
   return xhr
  };
  xhr.abort = function() {
   request.abort();
   return xhr
  };
  d3.rebind(xhr, dispatch, "on");
  return callback == null ? xhr : xhr.get(d3_xhr_fixCallback(callback))
 }

 function d3_xhr_fixCallback(callback) {
  return callback.length === 1 ? function(error, request) {
   callback(error == null ? request : null)
  } : callback
 }
 d3.dsv = function(delimiter, mimeType) {
  var reFormat = new RegExp('["' + delimiter + "\n]"),
   delimiterCode = delimiter.charCodeAt(0);

  function dsv(url, row, callback) {
   if (arguments.length < 3) callback = row, row = null;
   var xhr = d3_xhr(url, mimeType, row == null ? response : typedResponse(row), callback);
   xhr.row = function(_) {
    return arguments.length ? xhr.response((row = _) == null ? response : typedResponse(_)) : row
   };
   return xhr
  }

  function response(request) {
   return dsv.parse(request.responseText)
  }

  function typedResponse(f) {
   return function(request) {
    return dsv.parse(request.responseText, f)
   }
  }
  dsv.parse = function(text, f) {
   var o;
   return dsv.parseRows(text, function(row, i) {
    if (o) return o(row, i - 1);
    var a = new Function("d", "return {" + row.map(function(name, i) {
     return JSON.stringify(name) + ": d[" + i + "]"
    }).join(",") + "}");
    o = f ? function(row, i) {
     return f(a(row), i)
    } : a
   })
  };
  dsv.parseRows = function(text, f) {
   var EOL = {},
    EOF = {},
    rows = [],
    N = text.length,
    I = 0,
    n = 0,
    t, eol;

   function token() {
    if (I >= N) return EOF;
    if (eol) return eol = false, EOL;
    var j = I;
    if (text.charCodeAt(j) === 34) {
     var i = j;
     while (i++ < N) {
      if (text.charCodeAt(i) === 34) {
       if (text.charCodeAt(i + 1) !== 34) break;
       ++i
      }
     }
     I = i + 2;
     var c = text.charCodeAt(i + 1);
     if (c === 13) {
      eol = true;
      if (text.charCodeAt(i + 2) === 10) ++I
     } else if (c === 10) {
      eol = true
     }
     return text.substring(j + 1, i).replace(/""/g, '"')
    }
    while (I < N) {
     var c = text.charCodeAt(I++),
      k = 1;
     if (c === 10) eol = true;
     else if (c === 13) {
      eol = true;
      if (text.charCodeAt(I) === 10) ++I, ++k
     } else if (c !== delimiterCode) continue;
     return text.substring(j, I - k)
    }
    return text.substring(j)
   }
   while ((t = token()) !== EOF) {
    var a = [];
    while (t !== EOL && t !== EOF) {
     a.push(t);
     t = token()
    }
    if (f && !(a = f(a, n++))) continue;
    rows.push(a)
   }
   return rows
  };
  dsv.format = function(rows) {
   if (Array.isArray(rows[0])) return dsv.formatRows(rows);
   var fieldSet = new d3_Set,
    fields = [];
   rows.forEach(function(row) {
    for (var field in row) {
     if (!fieldSet.has(field)) {
      fields.push(fieldSet.add(field))
     }
    }
   });
   return [fields.map(formatValue).join(delimiter)].concat(rows.map(function(row) {
    return fields.map(function(field) {
     return formatValue(row[field])
    }).join(delimiter)
   })).join("\n")
  };
  dsv.formatRows = function(rows) {
   return rows.map(formatRow).join("\n")
  };

  function formatRow(row) {
   return row.map(formatValue).join(delimiter)
  }

  function formatValue(text) {
   return reFormat.test(text) ? '"' + text.replace(/\"/g, '""') + '"' : text
  }
  return dsv
 };
 d3.csv = d3.dsv(",", "text/csv");
 d3.tsv = d3.dsv("	", "text/tab-separated-values");
 d3.touch = function(container, touches, identifier) {
  if (arguments.length < 3) identifier = touches, touches = d3_eventSource().changedTouches;
  if (touches)
   for (var i = 0, n = touches.length, touch; i < n; ++i) {
    if ((touch = touches[i]).identifier === identifier) {
     return d3_mousePoint(container, touch)
    }
   }
 };
 var d3_timer_queueHead, d3_timer_queueTail, d3_timer_interval, d3_timer_timeout, d3_timer_active, d3_timer_frame = d3_window[d3_vendorSymbol(d3_window, "requestAnimationFrame")] || function(callback) {
  setTimeout(callback, 17)
 };
 d3.timer = function(callback, delay, then) {
  var n = arguments.length;
  if (n < 2) delay = 0;
  if (n < 3) then = Date.now();
  var time = then + delay,
   timer = {
    c: callback,
    t: time,
    f: false,
    n: null
   };
  if (d3_timer_queueTail) d3_timer_queueTail.n = timer;
  else d3_timer_queueHead = timer;
  d3_timer_queueTail = timer;
  if (!d3_timer_interval) {
   d3_timer_timeout = clearTimeout(d3_timer_timeout);
   d3_timer_interval = 1;
   d3_timer_frame(d3_timer_step)
  }
 };

 function d3_timer_step() {
  var now = d3_timer_mark(),
   delay = d3_timer_sweep() - now;
  if (delay > 24) {
   if (isFinite(delay)) {
    clearTimeout(d3_timer_timeout);
    d3_timer_timeout = setTimeout(d3_timer_step, delay)
   }
   d3_timer_interval = 0
  } else {
   d3_timer_interval = 1;
   d3_timer_frame(d3_timer_step)
  }
 }
 d3.timer.flush = function() {
  d3_timer_mark();
  d3_timer_sweep()
 };

 function d3_timer_mark() {
  var now = Date.now();
  d3_timer_active = d3_timer_queueHead;
  while (d3_timer_active) {
   if (now >= d3_timer_active.t) d3_timer_active.f = d3_timer_active.c(now - d3_timer_active.t);
   d3_timer_active = d3_timer_active.n
  }
  return now
 }

 function d3_timer_sweep() {
  var t0, t1 = d3_timer_queueHead,
   time = Infinity;
  while (t1) {
   if (t1.f) {
    t1 = t0 ? t0.n = t1.n : d3_timer_queueHead = t1.n
   } else {
    if (t1.t < time) time = t1.t;
    t1 = (t0 = t1).n
   }
  }
  d3_timer_queueTail = t0;
  return time
 }

 function d3_format_precision(x, p) {
  return p - (x ? Math.ceil(Math.log(x) / Math.LN10) : 1)
 }
 d3.round = function(x, n) {
  return n ? Math.round(x * (n = Math.pow(10, n))) / n : Math.round(x)
 };
 var d3_formatPrefixes = ["y", "z", "a", "f", "p", "n", "Au", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"].map(d3_formatPrefix);
 d3.formatPrefix = function(value, precision) {
  var i = 0;
  if (value) {
   if (value < 0) value *= -1;
   if (precision) value = d3.round(value, d3_format_precision(value, precision));
   i = 1 + Math.floor(1e-12 + Math.log(value) / Math.LN10);
   i = Math.max(-24, Math.min(24, Math.floor((i - 1) / 3) * 3))
  }
  return d3_formatPrefixes[8 + i / 3]
 };

 function d3_formatPrefix(d, i) {
  var k = Math.pow(10, abs(8 - i) * 3);
  return {
   scale: i > 8 ? function(d) {
    return d / k
   } : function(d) {
    return d * k
   },
   symbol: d
  }
 }

 function d3_locale_numberFormat(locale) {
  var locale_decimal = locale.decimal,
   locale_thousands = locale.thousands,
   locale_grouping = locale.grouping,
   locale_currency = locale.currency,
   formatGroup = locale_grouping ? function(value) {
    var i = value.length,
     t = [],
     j = 0,
     g = locale_grouping[0];
    while (i > 0 && g > 0) {
     t.push(value.substring(i -= g, i + g));
     g = locale_grouping[j = (j + 1) % locale_grouping.length]
    }
    return t.reverse().join(locale_thousands)
   } : d3_identity;
  return function(specifier) {
   var match = d3_format_re.exec(specifier),
    fill = match[1] || " ",
    align = match[2] || ">",
    sign = match[3] || "",
    symbol = match[4] || "",
    zfill = match[5],
    width = +match[6],
    comma = match[7],
    precision = match[8],
    type = match[9],
    scale = 1,
    prefix = "",
    suffix = "",
    integer = false;
   if (precision) precision = +precision.substring(1);
   if (zfill || fill === "0" && align === "=") {
    zfill = fill = "0";
    align = "=";
    if (comma) width -= Math.floor((width - 1) / 4)
   }
   switch (type) {
    case "n":
     comma = true;
     type = "g";
     break;
    case "%":
     scale = 100;
     suffix = "%";
     type = "f";
     break;
    case "p":
     scale = 100;
     suffix = "%";
     type = "r";
     break;
    case "b":
    case "o":
    case "x":
    case "X":
     if (symbol === "#") prefix = "0" + type.toLowerCase();
    case "c":
    case "d":
     integer = true;
     precision = 0;
     break;
    case "s":
     scale = -1;
     type = "r";
     break
   }
   if (symbol === "$") prefix = locale_currency[0], suffix = locale_currency[1];
   if (type == "r" && !precision) type = "g";
   if (precision != null) {
    if (type == "g") precision = Math.max(1, Math.min(21, precision));
    else if (type == "e" || type == "f") precision = Math.max(0, Math.min(20, precision))
   }
   type = d3_format_types.get(type) || d3_format_typeDefault;
   var zcomma = zfill && comma;
   return function(value) {
    var fullSuffix = suffix;
    if (integer && value % 1) return "";
    var negative = value < 0 || value === 0 && 1 / value < 0 ? (value = -value, "-") : sign;
    if (scale < 0) {
     var unit = d3.formatPrefix(value, precision);
     value = unit.scale(value);
     fullSuffix = unit.symbol + suffix
    } else {
     value *= scale
    }
    value = type(value, precision);
    var i = value.lastIndexOf("."),
     before = i < 0 ? value : value.substring(0, i),
     after = i < 0 ? "" : locale_decimal + value.substring(i + 1);
    if (!zfill && comma) before = formatGroup(before);
    var length = prefix.length + before.length + after.length + (zcomma ? 0 : negative.length),
     padding = length < width ? new Array(length = width - length + 1).join(fill) : "";
    if (zcomma) before = formatGroup(padding + before);
    negative += prefix;
    value = before + after;
    return (align === "<" ? negative + value + padding : align === ">" ? padding + negative + value : align === "^" ? padding.substring(0, length >>= 1) + negative + value + padding.substring(length) : negative + (zcomma ? value : padding + value)) + fullSuffix
   }
  }
 }
 var d3_format_re = /(?:([^{])?([<>=^]))?([+\- ])?([$#])?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i;
 var d3_format_types = d3.map({
  b: function(x) {
   return x.toString(2)
  },
  c: function(x) {
   return String.fromCharCode(x)
  },
  o: function(x) {
   return x.toString(8)
  },
  x: function(x) {
   return x.toString(16)
  },
  X: function(x) {
   return x.toString(16).toUpperCase()
  },
  g: function(x, p) {
   return x.toPrecision(p)
  },
  e: function(x, p) {
   return x.toExponential(p)
  },
  f: function(x, p) {
   return x.toFixed(p)
  },
  r: function(x, p) {
   return (x = d3.round(x, d3_format_precision(x, p))).toFixed(Math.max(0, Math.min(20, d3_format_precision(x * (1 + 1e-15), p))))
  }
 });

 function d3_format_typeDefault(x) {
  return x + ""
 }
 var d3_time = d3.time = {},
  d3_date = Date;

 function d3_date_utc() {
  this._ = new Date(arguments.length > 1 ? Date.UTC.apply(this, arguments) : arguments[0])
 }
 d3_date_utc.prototype = {
  getDate: function() {
   return this._.getUTCDate()
  },
  getDay: function() {
   return this._.getUTCDay()
  },
  getFullYear: function() {
   return this._.getUTCFullYear()
  },
  getHours: function() {
   return this._.getUTCHours()
  },
  getMilliseconds: function() {
   return this._.getUTCMilliseconds()
  },
  getMinutes: function() {
   return this._.getUTCMinutes()
  },
  getMonth: function() {
   return this._.getUTCMonth()
  },
  getSeconds: function() {
   return this._.getUTCSeconds()
  },
  getTime: function() {
   return this._.getTime()
  },
  getTimezoneOffset: function() {
   return 0
  },
  valueOf: function() {
   return this._.valueOf()
  },
  setDate: function() {
   d3_time_prototype.setUTCDate.apply(this._, arguments)
  },
  setDay: function() {
   d3_time_prototype.setUTCDay.apply(this._, arguments)
  },
  setFullYear: function() {
   d3_time_prototype.setUTCFullYear.apply(this._, arguments)
  },
  setHours: function() {
   d3_time_prototype.setUTCHours.apply(this._, arguments)
  },
  setMilliseconds: function() {
   d3_time_prototype.setUTCMilliseconds.apply(this._, arguments)
  },
  setMinutes: function() {
   d3_time_prototype.setUTCMinutes.apply(this._, arguments)
  },
  setMonth: function() {
   d3_time_prototype.setUTCMonth.apply(this._, arguments)
  },
  setSeconds: function() {
   d3_time_prototype.setUTCSeconds.apply(this._, arguments)
  },
  setTime: function() {
   d3_time_prototype.setTime.apply(this._, arguments)
  }
 };
 var d3_time_prototype = Date.prototype;

 function d3_time_interval(local, step, number) {
  function round(date) {
   var d0 = local(date),
    d1 = offset(d0, 1);
   return date - d0 < d1 - date ? d0 : d1
  }

  function ceil(date) {
   step(date = local(new d3_date(date - 1)), 1);
   return date
  }

  function offset(date, k) {
   step(date = new d3_date(+date), k);
   return date
  }

  function range(t0, t1, dt) {
   var time = ceil(t0),
    times = [];
   if (dt > 1) {
    while (time < t1) {
     if (!(number(time) % dt)) times.push(new Date(+time));
     step(time, 1)
    }
   } else {
    while (time < t1) times.push(new Date(+time)), step(time, 1)
   }
   return times
  }

  function range_utc(t0, t1, dt) {
   try {
    d3_date = d3_date_utc;
    var utc = new d3_date_utc;
    utc._ = t0;
    return range(utc, t1, dt)
   } finally {
    d3_date = Date
   }
  }
  local.floor = local;
  local.round = round;
  local.ceil = ceil;
  local.offset = offset;
  local.range = range;
  var utc = local.utc = d3_time_interval_utc(local);
  utc.floor = utc;
  utc.round = d3_time_interval_utc(round);
  utc.ceil = d3_time_interval_utc(ceil);
  utc.offset = d3_time_interval_utc(offset);
  utc.range = range_utc;
  return local
 }

 function d3_time_interval_utc(method) {
  return function(date, k) {
   try {
    d3_date = d3_date_utc;
    var utc = new d3_date_utc;
    utc._ = date;
    return method(utc, k)._
   } finally {
    d3_date = Date
   }
  }
 }
 d3_time.year = d3_time_interval(function(date) {
  date = d3_time.day(date);
  date.setMonth(0, 1);
  return date
 }, function(date, offset) {
  date.setFullYear(date.getFullYear() + offset)
 }, function(date) {
  return date.getFullYear()
 });
 d3_time.years = d3_time.year.range;
 d3_time.years.utc = d3_time.year.utc.range;
 d3_time.day = d3_time_interval(function(date) {
  var day = new d3_date(2e3, 0);
  day.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
  return day
 }, function(date, offset) {
  date.setDate(date.getDate() + offset)
 }, function(date) {
  return date.getDate() - 1
 });
 d3_time.days = d3_time.day.range;
 d3_time.days.utc = d3_time.day.utc.range;
 d3_time.dayOfYear = function(date) {
  var year = d3_time.year(date);
  return Math.floor((date - year - (date.getTimezoneOffset() - year.getTimezoneOffset()) * 6e4) / 864e5)
 };
 ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"].forEach(function(day, i) {
  i = 7 - i;
  var interval = d3_time[day] = d3_time_interval(function(date) {
   (date = d3_time.day(date)).setDate(date.getDate() - (date.getDay() + i) % 7);
   return date
  }, function(date, offset) {
   date.setDate(date.getDate() + Math.floor(offset) * 7)
  }, function(date) {
   var day = d3_time.year(date).getDay();
   return Math.floor((d3_time.dayOfYear(date) + (day + i) % 7) / 7) - (day !== i)
  });
  d3_time[day + "s"] = interval.range;
  d3_time[day + "s"].utc = interval.utc.range;
  d3_time[day + "OfYear"] = function(date) {
   var day = d3_time.year(date).getDay();
   return Math.floor((d3_time.dayOfYear(date) + (day + i) % 7) / 7)
  }
 });
 d3_time.week = d3_time.sunday;
 d3_time.weeks = d3_time.sunday.range;
 d3_time.weeks.utc = d3_time.sunday.utc.range;
 d3_time.weekOfYear = d3_time.sundayOfYear;

 function d3_locale_timeFormat(locale) {
  var locale_dateTime = locale.dateTime,
   locale_date = locale.date,
   locale_time = locale.time,
   locale_periods = locale.periods,
   locale_days = locale.days,
   locale_shortDays = locale.shortDays,
   locale_months = locale.months,
   locale_shortMonths = locale.shortMonths;

  function d3_time_format(template) {
   var n = template.length;

   function format(date) {
    var string = [],
     i = -1,
     j = 0,
     c, p, f;
    while (++i < n) {
     if (template.charCodeAt(i) === 37) {
      string.push(template.substring(j, i));
      if ((p = d3_time_formatPads[c = template.charAt(++i)]) != null) c = template.charAt(++i);
      if (f = d3_time_formats[c]) c = f(date, p == null ? c === "e" ? " " : "0" : p);
      string.push(c);
      j = i + 1
     }
    }
    string.push(template.substring(j, i));
    return string.join("")
   }
   format.parse = function(string) {
    var d = {
      y: 1900,
      m: 0,
      d: 1,
      H: 0,
      M: 0,
      S: 0,
      L: 0,
      Z: null
     },
     i = d3_time_parse(d, template, string, 0);
    if (i != string.length) return null;
    if ("p" in d) d.H = d.H % 12 + d.p * 12;
    var localZ = d.Z != null && d3_date !== d3_date_utc,
     date = new(localZ ? d3_date_utc : d3_date);
    if ("j" in d) date.setFullYear(d.y, 0, d.j);
    else if ("w" in d && ("W" in d || "U" in d)) {
     date.setFullYear(d.y, 0, 1);
     date.setFullYear(d.y, 0, "W" in d ? (d.w + 6) % 7 + d.W * 7 - (date.getDay() + 5) % 7 : d.w + d.U * 7 - (date.getDay() + 6) % 7)
    } else date.setFullYear(d.y, d.m, d.d);
    date.setHours(d.H + Math.floor(d.Z / 100), d.M + d.Z % 100, d.S, d.L);
    return localZ ? date._ : date
   };
   format.toString = function() {
    return template
   };
   return format
  }

  function d3_time_parse(date, template, string, j) {
   var c, p, t, i = 0,
    n = template.length,
    m = string.length;
   while (i < n) {
    if (j >= m) return -1;
    c = template.charCodeAt(i++);
    if (c === 37) {
     t = template.charAt(i++);
     p = d3_time_parsers[t in d3_time_formatPads ? template.charAt(i++) : t];
     if (!p || (j = p(date, string, j)) < 0) return -1
    } else if (c != string.charCodeAt(j++)) {
     return -1
    }
   }
   return j
  }
  d3_time_format.utc = function(template) {
   var local = d3_time_format(template);

   function format(date) {
    try {
     d3_date = d3_date_utc;
     var utc = new d3_date;
     utc._ = date;
     return local(utc)
    } finally {
     d3_date = Date
    }
   }
   format.parse = function(string) {
    try {
     d3_date = d3_date_utc;
     var date = local.parse(string);
     return date && date._
    } finally {
     d3_date = Date
    }
   };
   format.toString = local.toString;
   return format
  };
  d3_time_format.multi = d3_time_format.utc.multi = d3_time_formatMulti;
  var d3_time_periodLookup = d3.map(),
   d3_time_dayRe = d3_time_formatRe(locale_days),
   d3_time_dayLookup = d3_time_formatLookup(locale_days),
   d3_time_dayAbbrevRe = d3_time_formatRe(locale_shortDays),
   d3_time_dayAbbrevLookup = d3_time_formatLookup(locale_shortDays),
   d3_time_monthRe = d3_time_formatRe(locale_months),
   d3_time_monthLookup = d3_time_formatLookup(locale_months),
   d3_time_monthAbbrevRe = d3_time_formatRe(locale_shortMonths),
   d3_time_monthAbbrevLookup = d3_time_formatLookup(locale_shortMonths);
  locale_periods.forEach(function(p, i) {
   d3_time_periodLookup.set(p.toLowerCase(), i)
  });
  var d3_time_formats = {
   a: function(d) {
    return locale_shortDays[d.getDay()]
   },
   A: function(d) {
    return locale_days[d.getDay()]
   },
   b: function(d) {
    return locale_shortMonths[d.getMonth()]
   },
   B: function(d) {
    return locale_months[d.getMonth()]
   },
   c: d3_time_format(locale_dateTime),
   d: function(d, p) {
    return d3_time_formatPad(d.getDate(), p, 2)
   },
   e: function(d, p) {
    return d3_time_formatPad(d.getDate(), p, 2)
   },
   H: function(d, p) {
    return d3_time_formatPad(d.getHours(), p, 2)
   },
   I: function(d, p) {
    return d3_time_formatPad(d.getHours() % 12 || 12, p, 2)
   },
   j: function(d, p) {
    return d3_time_formatPad(1 + d3_time.dayOfYear(d), p, 3)
   },
   L: function(d, p) {
    return d3_time_formatPad(d.getMilliseconds(), p, 3)
   },
   m: function(d, p) {
    return d3_time_formatPad(d.getMonth() + 1, p, 2)
   },
   M: function(d, p) {
    return d3_time_formatPad(d.getMinutes(), p, 2)
   },
   p: function(d) {
    return locale_periods[+(d.getHours() >= 12)]
   },
   S: function(d, p) {
    return d3_time_formatPad(d.getSeconds(), p, 2)
   },
   U: function(d, p) {
    return d3_time_formatPad(d3_time.sundayOfYear(d), p, 2)
   },
   w: function(d) {
    return d.getDay()
   },
   W: function(d, p) {
    return d3_time_formatPad(d3_time.mondayOfYear(d), p, 2)
   },
   x: d3_time_format(locale_date),
   X: d3_time_format(locale_time),
   y: function(d, p) {
    return d3_time_formatPad(d.getFullYear() % 100, p, 2)
   },
   Y: function(d, p) {
    return d3_time_formatPad(d.getFullYear() % 1e4, p, 4)
   },
   Z: d3_time_zone,
   "%": function() {
    return "%"
   }
  };
  var d3_time_parsers = {
   a: d3_time_parseWeekdayAbbrev,
   A: d3_time_parseWeekday,
   b: d3_time_parseMonthAbbrev,
   B: d3_time_parseMonth,
   c: d3_time_parseLocaleFull,
   d: d3_time_parseDay,
   e: d3_time_parseDay,
   H: d3_time_parseHour24,
   I: d3_time_parseHour24,
   j: d3_time_parseDayOfYear,
   L: d3_time_parseMilliseconds,
   m: d3_time_parseMonthNumber,
   M: d3_time_parseMinutes,
   p: d3_time_parseAmPm,
   S: d3_time_parseSeconds,
   U: d3_time_parseWeekNumberSunday,
   w: d3_time_parseWeekdayNumber,
   W: d3_time_parseWeekNumberMonday,
   x: d3_time_parseLocaleDate,
   X: d3_time_parseLocaleTime,
   y: d3_time_parseYear,
   Y: d3_time_parseFullYear,
   Z: d3_time_parseZone,
   "%": d3_time_parseLiteralPercent
  };

  function d3_time_parseWeekdayAbbrev(date, string, i) {
   d3_time_dayAbbrevRe.lastIndex = 0;
   var n = d3_time_dayAbbrevRe.exec(string.substring(i));
   return n ? (date.w = d3_time_dayAbbrevLookup.get(n[0].toLowerCase()), i + n[0].length) : -1
  }

  function d3_time_parseWeekday(date, string, i) {
   d3_time_dayRe.lastIndex = 0;
   var n = d3_time_dayRe.exec(string.substring(i));
   return n ? (date.w = d3_time_dayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1
  }

  function d3_time_parseMonthAbbrev(date, string, i) {
   d3_time_monthAbbrevRe.lastIndex = 0;
   var n = d3_time_monthAbbrevRe.exec(string.substring(i));
   return n ? (date.m = d3_time_monthAbbrevLookup.get(n[0].toLowerCase()), i + n[0].length) : -1
  }

  function d3_time_parseMonth(date, string, i) {
   d3_time_monthRe.lastIndex = 0;
   var n = d3_time_monthRe.exec(string.substring(i));
   return n ? (date.m = d3_time_monthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1
  }

  function d3_time_parseLocaleFull(date, string, i) {
   return d3_time_parse(date, d3_time_formats.c.toString(), string, i)
  }

  function d3_time_parseLocaleDate(date, string, i) {
   return d3_time_parse(date, d3_time_formats.x.toString(), string, i)
  }

  function d3_time_parseLocaleTime(date, string, i) {
   return d3_time_parse(date, d3_time_formats.X.toString(), string, i)
  }

  function d3_time_parseAmPm(date, string, i) {
   var n = d3_time_periodLookup.get(string.substring(i, i += 2).toLowerCase());
   return n == null ? -1 : (date.p = n, i)
  }
  return d3_time_format
 }
 var d3_time_formatPads = {
   "-": "",
   _: " ",
   0: "0"
  },
  d3_time_numberRe = /^\s*\d+/,
  d3_time_percentRe = /^%/;

 function d3_time_formatPad(value, fill, width) {
  var sign = value < 0 ? "-" : "",
   string = (sign ? -value : value) + "",
   length = string.length;
  return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string)
 }

 function d3_time_formatRe(names) {
  return new RegExp("^(?:" + names.map(d3.requote).join("|") + ")", "i")
 }

 function d3_time_formatLookup(names) {
  var map = new d3_Map,
   i = -1,
   n = names.length;
  while (++i < n) map.set(names[i].toLowerCase(), i);
  return map
 }

 function d3_time_parseWeekdayNumber(date, string, i) {
  d3_time_numberRe.lastIndex = 0;
  var n = d3_time_numberRe.exec(string.substring(i, i + 1));
  return n ? (date.w = +n[0], i + n[0].length) : -1
 }

 function d3_time_parseWeekNumberSunday(date, string, i) {
  d3_time_numberRe.lastIndex = 0;
  var n = d3_time_numberRe.exec(string.substring(i));
  return n ? (date.U = +n[0], i + n[0].length) : -1
 }

 function d3_time_parseWeekNumberMonday(date, string, i) {
  d3_time_numberRe.lastIndex = 0;
  var n = d3_time_numberRe.exec(string.substring(i));
  return n ? (date.W = +n[0], i + n[0].length) : -1
 }

 function d3_time_parseFullYear(date, string, i) {
  d3_time_numberRe.lastIndex = 0;
  var n = d3_time_numberRe.exec(string.substring(i, i + 4));
  return n ? (date.y = +n[0], i + n[0].length) : -1
 }

 function d3_time_parseYear(date, string, i) {
  d3_time_numberRe.lastIndex = 0;
  var n = d3_time_numberRe.exec(string.substring(i, i + 2));
  return n ? (date.y = d3_time_expandYear(+n[0]), i + n[0].length) : -1
 }

 function d3_time_parseZone(date, string, i) {
  return /^[+-]\d{4}$/.test(string = string.substring(i, i + 5)) ? (date.Z = -string, i + 5) : -1
 }

 function d3_time_expandYear(d) {
  return d + (d > 68 ? 1900 : 2e3)
 }

 function d3_time_parseMonthNumber(date, string, i) {
  d3_time_numberRe.lastIndex = 0;
  var n = d3_time_numberRe.exec(string.substring(i, i + 2));
  return n ? (date.m = n[0] - 1, i + n[0].length) : -1
 }

 function d3_time_parseDay(date, string, i) {
  d3_time_numberRe.lastIndex = 0;
  var n = d3_time_numberRe.exec(string.substring(i, i + 2));
  return n ? (date.d = +n[0], i + n[0].length) : -1
 }

 function d3_time_parseDayOfYear(date, string, i) {
  d3_time_numberRe.lastIndex = 0;
  var n = d3_time_numberRe.exec(string.substring(i, i + 3));
  return n ? (date.j = +n[0], i + n[0].length) : -1
 }

 function d3_time_parseHour24(date, string, i) {
  d3_time_numberRe.lastIndex = 0;
  var n = d3_time_numberRe.exec(string.substring(i, i + 2));
  return n ? (date.H = +n[0], i + n[0].length) : -1
 }

 function d3_time_parseMinutes(date, string, i) {
  d3_time_numberRe.lastIndex = 0;
  var n = d3_time_numberRe.exec(string.substring(i, i + 2));
  return n ? (date.M = +n[0], i + n[0].length) : -1
 }

 function d3_time_parseSeconds(date, string, i) {
  d3_time_numberRe.lastIndex = 0;
  var n = d3_time_numberRe.exec(string.substring(i, i + 2));
  return n ? (date.S = +n[0], i + n[0].length) : -1
 }

 function d3_time_parseMilliseconds(date, string, i) {
  d3_time_numberRe.lastIndex = 0;
  var n = d3_time_numberRe.exec(string.substring(i, i + 3));
  return n ? (date.L = +n[0], i + n[0].length) : -1
 }

 function d3_time_zone(d) {
  var z = d.getTimezoneOffset(),
   zs = z > 0 ? "-" : "+",
   zh = ~~(abs(z) / 60),
   zm = abs(z) % 60;
  return zs + d3_time_formatPad(zh, "0", 2) + d3_time_formatPad(zm, "0", 2)
 }

 function d3_time_parseLiteralPercent(date, string, i) {
  d3_time_percentRe.lastIndex = 0;
  var n = d3_time_percentRe.exec(string.substring(i, i + 1));
  return n ? i + n[0].length : -1
 }

 function d3_time_formatMulti(formats) {
  var n = formats.length,
   i = -1;
  while (++i < n) formats[i][0] = this(formats[i][0]);
  return function(date) {
   var i = 0,
    f = formats[i];
   while (!f[1](date)) f = formats[++i];
   return f[0](date)
  }
 }
 d3.locale = function(locale) {
  return {
   numberFormat: d3_locale_numberFormat(locale),
   timeFormat: d3_locale_timeFormat(locale)
  }
 };
 var d3_locale_enUS = d3.locale({
  decimal: ".",
  thousands: ",",
  grouping: [3],
  currency: ["$", ""],
  dateTime: "%a %b %e %X %Y",
  date: "%m/%d/%Y",
  time: "%H:%M:%S",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
 });
 d3.format = d3_locale_enUS.numberFormat;
 d3.geo = {};

 function d3_adder() {}
 d3_adder.prototype = {
  s: 0,
  t: 0,
  add: function(y) {
   d3_adderSum(y, this.t, d3_adderTemp);
   d3_adderSum(d3_adderTemp.s, this.s, this);
   if (this.s) this.t += d3_adderTemp.t;
   else this.s = d3_adderTemp.t
  },
  reset: function() {
   this.s = this.t = 0
  },
  valueOf: function() {
   return this.s
  }
 };
 var d3_adderTemp = new d3_adder;

 function d3_adderSum(a, b, o) {
  var x = o.s = a + b,
   bv = x - a,
   av = x - bv;
  o.t = a - av + (b - bv)
 }
 d3.geo.stream = function(object, listener) {
  if (object && d3_geo_streamObjectType.hasOwnProperty(object.type)) {
   d3_geo_streamObjectType[object.type](object, listener)
  } else {
   d3_geo_streamGeometry(object, listener)
  }
 };

 function d3_geo_streamGeometry(geometry, listener) {
  if (geometry && d3_geo_streamGeometryType.hasOwnProperty(geometry.type)) {
   d3_geo_streamGeometryType[geometry.type](geometry, listener)
  }
 }
 var d3_geo_streamObjectType = {
  Feature: function(feature, listener) {
   d3_geo_streamGeometry(feature.geometry, listener)
  },
  FeatureCollection: function(object, listener) {
   var features = object.features,
    i = -1,
    n = features.length;
   while (++i < n) d3_geo_streamGeometry(features[i].geometry, listener)
  }
 };
 var d3_geo_streamGeometryType = {
  Sphere: function(object, listener) {
   listener.sphere()
  },
  Point: function(object, listener) {
   object = object.coordinates;
   listener.point(object[0], object[1], object[2])
  },
  MultiPoint: function(object, listener) {
   var coordinates = object.coordinates,
    i = -1,
    n = coordinates.length;
   while (++i < n) object = coordinates[i], listener.point(object[0], object[1], object[2])
  },
  LineString: function(object, listener) {
   d3_geo_streamLine(object.coordinates, listener, 0)
  },
  MultiLineString: function(object, listener) {
   var coordinates = object.coordinates,
    i = -1,
    n = coordinates.length;
   while (++i < n) d3_geo_streamLine(coordinates[i], listener, 0)
  },
  Polygon: function(object, listener) {
   d3_geo_streamPolygon(object.coordinates, listener)
  },
  MultiPolygon: function(object, listener) {
   var coordinates = object.coordinates,
    i = -1,
    n = coordinates.length;
   while (++i < n) d3_geo_streamPolygon(coordinates[i], listener)
  },
  GeometryCollection: function(object, listener) {
   var geometries = object.geometries,
    i = -1,
    n = geometries.length;
   while (++i < n) d3_geo_streamGeometry(geometries[i], listener)
  }
 };

 function d3_geo_streamLine(coordinates, listener, closed) {
  var i = -1,
   n = coordinates.length - closed,
   coordinate;
  listener.lineStart();
  while (++i < n) coordinate = coordinates[i], listener.point(coordinate[0], coordinate[1], coordinate[2]);
  listener.lineEnd()
 }

 function d3_geo_streamPolygon(coordinates, listener) {
  var i = -1,
   n = coordinates.length;
  listener.polygonStart();
  while (++i < n) d3_geo_streamLine(coordinates[i], listener, 1);
  listener.polygonEnd()
 }
 d3.geo.area = function(object) {
  d3_geo_areaSum = 0;
  d3.geo.stream(object, d3_geo_area);
  return d3_geo_areaSum
 };
 var d3_geo_areaSum, d3_geo_areaRingSum = new d3_adder;
 var d3_geo_area = {
  sphere: function() {
   d3_geo_areaSum += 4 * IE
  },
  point: d3_noop,
  lineStart: d3_noop,
  lineEnd: d3_noop,
  polygonStart: function() {
   d3_geo_areaRingSum.reset();
   d3_geo_area.lineStart = d3_geo_areaRingStart
  },
  polygonEnd: function() {
   var area = 2 * d3_geo_areaRingSum;
   d3_geo_areaSum += area < 0 ? 4 * IE + area : area;
   d3_geo_area.lineStart = d3_geo_area.lineEnd = d3_geo_area.point = d3_noop
  }
 };

 function d3_geo_areaRingStart() {
  var ICAP00, ITOPLINETAN00, ICAP0, cosITOPLINETAN0, sinITOPLINETAN0;
  d3_geo_area.point = function(ICAP, ITOPLINETAN) {
   d3_geo_area.point = nextPoint;
   ICAP0 = (ICAP00 = ICAP) * d3_radians, cosITOPLINETAN0 = Math.cos(ITOPLINETAN = (ITOPLINETAN00 = ITOPLINETAN) * d3_radians / 2 + IE / 4), sinITOPLINETAN0 = Math.sin(ITOPLINETAN)
  };

  function nextPoint(ICAP, ITOPLINETAN) {
   ICAP *= d3_radians;
   ITOPLINETAN = ITOPLINETAN * d3_radians / 2 + IE / 4;
   var dICAP = ICAP - ICAP0,
    sdICAP = dICAP >= 0 ? 1 : -1,
    adICAP = sdICAP * dICAP,
    cosITOPLINETAN = Math.cos(ITOPLINETAN),
    sinITOPLINETAN = Math.sin(ITOPLINETAN),
    k = sinITOPLINETAN0 * sinITOPLINETAN,
    u = cosITOPLINETAN0 * cosITOPLINETAN + k * Math.cos(adICAP),
    v = k * sdICAP * Math.sin(adICAP);
   d3_geo_areaRingSum.add(Math.atan2(v, u));
   ICAP0 = ICAP, cosITOPLINETAN0 = cosITOPLINETAN, sinITOPLINETAN0 = sinITOPLINETAN
  }
  d3_geo_area.lineEnd = function() {
   nextPoint(ICAP00, ITOPLINETAN00)
  }
 }

 function d3_geo_cartesian(spherical) {
  var ICAP = spherical[0],
   ITOPLINETAN = spherical[1],
   cosITOPLINETAN = Math.cos(ITOPLINETAN);
  return [cosITOPLINETAN * Math.cos(ICAP), cosITOPLINETAN * Math.sin(ICAP), Math.sin(ITOPLINETAN)]
 }

 function d3_geo_cartesianDot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
 }

 function d3_geo_cartesianCross(a, b) {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
 }

 function d3_geo_cartesianAdd(a, b) {
  a[0] += b[0];
  a[1] += b[1];
  a[2] += b[2]
 }

 function d3_geo_cartesianScale(vector, k) {
  return [vector[0] * k, vector[1] * k, vector[2] * k]
 }

 function d3_geo_cartesianNormalize(d) {
  var l = Math.sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
  d[0] /= l;
  d[1] /= l;
  d[2] /= l
 }

 function d3_geo_spherical(cartesian) {
  return [Math.atan2(cartesian[1], cartesian[0]), d3_asin(cartesian[2])]
 }

 function d3_geo_sphericalEqual(a, b) {
  return abs(a[0] - b[0]) < Iu && abs(a[1] - b[1]) < Iu
 }
 d3.geo.bounds = function() {
  var ICAP0, ITOPLINETAN0, ICAP1, ITOPLINETAN1, ICAP_, ICAP__, ITOPLINETAN__, p0, dICAPSum, ranges, range;
  var bound = {
   point: point,
   lineStart: lineStart,
   lineEnd: lineEnd,
   polygonStart: function() {
    bound.point = ringPoint;
    bound.lineStart = ringStart;
    bound.lineEnd = ringEnd;
    dICAPSum = 0;
    d3_geo_area.polygonStart()
   },
   polygonEnd: function() {
    d3_geo_area.polygonEnd();
    bound.point = point;
    bound.lineStart = lineStart;
    bound.lineEnd = lineEnd;
    if (d3_geo_areaRingSum < 0) ICAP0 = -(ICAP1 = 180), ITOPLINETAN0 = -(ITOPLINETAN1 = 90);
    else if (dICAPSum > Iu) ITOPLINETAN1 = 90;
    else if (dICAPSum < -Iu) ITOPLINETAN0 = -90;
    range[0] = ICAP0, range[1] = ICAP1
   }
  };

  function point(ICAP, ITOPLINETAN) {
   ranges.push(range = [ICAP0 = ICAP, ICAP1 = ICAP]);
   if (ITOPLINETAN < ITOPLINETAN0) ITOPLINETAN0 = ITOPLINETAN;
   if (ITOPLINETAN > ITOPLINETAN1) ITOPLINETAN1 = ITOPLINETAN
  }

  function linePoint(ICAP, ITOPLINETAN) {
   var p = d3_geo_cartesian([ICAP * d3_radians, ITOPLINETAN * d3_radians]);
   if (p0) {
    var normal = d3_geo_cartesianCross(p0, p),
     equatorial = [normal[1], -normal[0], 0],
     inflection = d3_geo_cartesianCross(equatorial, normal);
    d3_geo_cartesianNormalize(inflection);
    inflection = d3_geo_spherical(inflection);
    var dICAP = ICAP - ICAP_,
     s = dICAP > 0 ? 1 : -1,
     ICAPi = inflection[0] * d3_degrees * s,
     antimeridian = abs(dICAP) > 180;
    if (antimeridian ^ (s * ICAP_ < ICAPi && ICAPi < s * ICAP)) {
     var ITOPLINETANi = inflection[1] * d3_degrees;
     if (ITOPLINETANi > ITOPLINETAN1) ITOPLINETAN1 = ITOPLINETANi
    } else if (ICAPi = (ICAPi + 360) % 360 - 180, antimeridian ^ (s * ICAP_ < ICAPi && ICAPi < s * ICAP)) {
     var ITOPLINETANi = -inflection[1] * d3_degrees;
     if (ITOPLINETANi < ITOPLINETAN0) ITOPLINETAN0 = ITOPLINETANi
    } else {
     if (ITOPLINETAN < ITOPLINETAN0) ITOPLINETAN0 = ITOPLINETAN;
     if (ITOPLINETAN > ITOPLINETAN1) ITOPLINETAN1 = ITOPLINETAN
    }
    if (antimeridian) {
     if (ICAP < ICAP_) {
      if (angle(ICAP0, ICAP) > angle(ICAP0, ICAP1)) ICAP1 = ICAP
     } else {
      if (angle(ICAP, ICAP1) > angle(ICAP0, ICAP1)) ICAP0 = ICAP
     }
    } else {
     if (ICAP1 >= ICAP0) {
      if (ICAP < ICAP0) ICAP0 = ICAP;
      if (ICAP > ICAP1) ICAP1 = ICAP
     } else {
      if (ICAP > ICAP_) {
       if (angle(ICAP0, ICAP) > angle(ICAP0, ICAP1)) ICAP1 = ICAP
      } else {
       if (angle(ICAP, ICAP1) > angle(ICAP0, ICAP1)) ICAP0 = ICAP
      }
     }
    }
   } else {
    point(ICAP, ITOPLINETAN)
   }
   p0 = p, ICAP_ = ICAP
  }

  function lineStart() {
   bound.point = linePoint
  }

  function lineEnd() {
   range[0] = ICAP0, range[1] = ICAP1;
   bound.point = point;
   p0 = null
  }

  function ringPoint(ICAP, ITOPLINETAN) {
   if (p0) {
    var dICAP = ICAP - ICAP_;
    dICAPSum += abs(dICAP) > 180 ? dICAP + (dICAP > 0 ? 360 : -360) : dICAP
   } else ICAP__ = ICAP, ITOPLINETAN__ = ITOPLINETAN;
   d3_geo_area.point(ICAP, ITOPLINETAN);
   linePoint(ICAP, ITOPLINETAN)
  }

  function ringStart() {
   d3_geo_area.lineStart()
  }

  function ringEnd() {
   ringPoint(ICAP__, ITOPLINETAN__);
   d3_geo_area.lineEnd();
   if (abs(dICAPSum) > Iu) ICAP0 = -(ICAP1 = 180);
   range[0] = ICAP0, range[1] = ICAP1;
   p0 = null
  }

  function angle(ICAP0, ICAP1) {
   return (ICAP1 -= ICAP0) < 0 ? ICAP1 + 360 : ICAP1
  }

  function compareRanges(a, b) {
   return a[0] - b[0]
  }

  function withinRange(x, range) {
   return range[0] <= range[1] ? range[0] <= x && x <= range[1] : x < range[0] || range[1] < x
  }
  return function(feature) {
   ITOPLINETAN1 = ICAP1 = -(ICAP0 = ITOPLINETAN0 = Infinity);
   ranges = [];
   d3.geo.stream(feature, bound);
   var n = ranges.length;
   if (n) {
    ranges.sort(compareRanges);
    for (var i = 1, a = ranges[0], b, merged = [a]; i < n; ++i) {
     b = ranges[i];
     if (withinRange(b[0], a) || withinRange(b[1], a)) {
      if (angle(a[0], b[1]) > angle(a[0], a[1])) a[1] = b[1];
      if (angle(b[0], a[1]) > angle(a[0], a[1])) a[0] = b[0]
     } else {
      merged.push(a = b)
     }
    }
    var best = -Infinity,
     dICAP;
    for (var n = merged.length - 1, i = 0, a = merged[n], b; i <= n; a = b, ++i) {
     b = merged[i];
     if ((dICAP = angle(a[1], b[0])) > best) best = dICAP, ICAP0 = b[0], ICAP1 = a[1]
    }
   }
   ranges = range = null;
   return ICAP0 === Infinity || ITOPLINETAN0 === Infinity ? [
    [NaN, NaN],
    [NaN, NaN]
   ] : [
    [ICAP0, ITOPLINETAN0],
    [ICAP1, ITOPLINETAN1]
   ]
  }
 }();
 d3.geo.centroid = function(object) {
  d3_geo_centroidW0 = d3_geo_centroidW1 = d3_geo_centroidX0 = d3_geo_centroidY0 = d3_geo_centroidZ0 = d3_geo_centroidX1 = d3_geo_centroidY1 = d3_geo_centroidZ1 = d3_geo_centroidX2 = d3_geo_centroidY2 = d3_geo_centroidZ2 = 0;
  d3.geo.stream(object, d3_geo_centroid);
  var x = d3_geo_centroidX2,
   y = d3_geo_centroidY2,
   z = d3_geo_centroidZ2,
   m = x * x + y * y + z * z;
  if (m < Iu2) {
   x = d3_geo_centroidX1, y = d3_geo_centroidY1, z = d3_geo_centroidZ1;
   if (d3_geo_centroidW1 < Iu) x = d3_geo_centroidX0, y = d3_geo_centroidY0, z = d3_geo_centroidZ0;
   m = x * x + y * y + z * z;
   if (m < Iu2) return [NaN, NaN]
  }
  return [Math.atan2(y, x) * d3_degrees, d3_asin(z / Math.sqrt(m)) * d3_degrees]
 };
 var d3_geo_centroidW0, d3_geo_centroidW1, d3_geo_centroidX0, d3_geo_centroidY0, d3_geo_centroidZ0, d3_geo_centroidX1, d3_geo_centroidY1, d3_geo_centroidZ1, d3_geo_centroidX2, d3_geo_centroidY2, d3_geo_centroidZ2;
 var d3_geo_centroid = {
  sphere: d3_noop,
  point: d3_geo_centroidPoint,
  lineStart: d3_geo_centroidLineStart,
  lineEnd: d3_geo_centroidLineEnd,
  polygonStart: function() {
   d3_geo_centroid.lineStart = d3_geo_centroidRingStart
  },
  polygonEnd: function() {
   d3_geo_centroid.lineStart = d3_geo_centroidLineStart
  }
 };

 function d3_geo_centroidPoint(ICAP, ITOPLINETAN) {
  ICAP *= d3_radians;
  var cosITOPLINETAN = Math.cos(ITOPLINETAN *= d3_radians);
  d3_geo_centroidPointXYZ(cosITOPLINETAN * Math.cos(ICAP), cosITOPLINETAN * Math.sin(ICAP), Math.sin(ITOPLINETAN))
 }

 function d3_geo_centroidPointXYZ(x, y, z) {
  ++d3_geo_centroidW0;
  d3_geo_centroidX0 += (x - d3_geo_centroidX0) / d3_geo_centroidW0;
  d3_geo_centroidY0 += (y - d3_geo_centroidY0) / d3_geo_centroidW0;
  d3_geo_centroidZ0 += (z - d3_geo_centroidZ0) / d3_geo_centroidW0
 }

 function d3_geo_centroidLineStart() {
  var x0, y0, z0;
  d3_geo_centroid.point = function(ICAP, ITOPLINETAN) {
   ICAP *= d3_radians;
   var cosITOPLINETAN = Math.cos(ITOPLINETAN *= d3_radians);
   x0 = cosITOPLINETAN * Math.cos(ICAP);
   y0 = cosITOPLINETAN * Math.sin(ICAP);
   z0 = Math.sin(ITOPLINETAN);
   d3_geo_centroid.point = nextPoint;
   d3_geo_centroidPointXYZ(x0, y0, z0)
  };

  function nextPoint(ICAP, ITOPLINETAN) {
   ICAP *= d3_radians;
   var cosITOPLINETAN = Math.cos(ITOPLINETAN *= d3_radians),
    x = cosITOPLINETAN * Math.cos(ICAP),
    y = cosITOPLINETAN * Math.sin(ICAP),
    z = Math.sin(ITOPLINETAN),
    w = Math.atan2(Math.sqrt((w = y0 * z - z0 * y) * w + (w = z0 * x - x0 * z) * w + (w = x0 * y - y0 * x) * w), x0 * x + y0 * y + z0 * z);
   d3_geo_centroidW1 += w;
   d3_geo_centroidX1 += w * (x0 + (x0 = x));
   d3_geo_centroidY1 += w * (y0 + (y0 = y));
   d3_geo_centroidZ1 += w * (z0 + (z0 = z));
   d3_geo_centroidPointXYZ(x0, y0, z0)
  }
 }

 function d3_geo_centroidLineEnd() {
  d3_geo_centroid.point = d3_geo_centroidPoint
 }

 function d3_geo_centroidRingStart() {
  var ICAP00, ITOPLINETAN00, x0, y0, z0;
  d3_geo_centroid.point = function(ICAP, ITOPLINETAN) {
   ICAP00 = ICAP, ITOPLINETAN00 = ITOPLINETAN;
   d3_geo_centroid.point = nextPoint;
   ICAP *= d3_radians;
   var cosITOPLINETAN = Math.cos(ITOPLINETAN *= d3_radians);
   x0 = cosITOPLINETAN * Math.cos(ICAP);
   y0 = cosITOPLINETAN * Math.sin(ICAP);
   z0 = Math.sin(ITOPLINETAN);
   d3_geo_centroidPointXYZ(x0, y0, z0)
  };
  d3_geo_centroid.lineEnd = function() {
   nextPoint(ICAP00, ITOPLINETAN00);
   d3_geo_centroid.lineEnd = d3_geo_centroidLineEnd;
   d3_geo_centroid.point = d3_geo_centroidPoint
  };

  function nextPoint(ICAP, ITOPLINETAN) {
   ICAP *= d3_radians;
   var cosITOPLINETAN = Math.cos(ITOPLINETAN *= d3_radians),
    x = cosITOPLINETAN * Math.cos(ICAP),
    y = cosITOPLINETAN * Math.sin(ICAP),
    z = Math.sin(ITOPLINETAN),
    cx = y0 * z - z0 * y,
    cy = z0 * x - x0 * z,
    cz = x0 * y - y0 * x,
    m = Math.sqrt(cx * cx + cy * cy + cz * cz),
    u = x0 * x + y0 * y + z0 * z,
    v = m && -d3_acos(u) / m,
    w = Math.atan2(m, u);
   d3_geo_centroidX2 += v * cx;
   d3_geo_centroidY2 += v * cy;
   d3_geo_centroidZ2 += v * cz;
   d3_geo_centroidW1 += w;
   d3_geo_centroidX1 += w * (x0 + (x0 = x));
   d3_geo_centroidY1 += w * (y0 + (y0 = y));
   d3_geo_centroidZ1 += w * (z0 + (z0 = z));
   d3_geo_centroidPointXYZ(x0, y0, z0)
  }
 }

 function d3_true() {
  return true
 }

 function d3_geo_clipPolygon(segments, compare, clipStartInside, interpolate, listener) {
  var subject = [],
   clip = [];
  segments.forEach(function(segment) {
   if ((n = segment.length - 1) <= 0) return;
   var n, p0 = segment[0],
    p1 = segment[n];
   if (d3_geo_sphericalEqual(p0, p1)) {
    listener.lineStart();
    for (var i = 0; i < n; ++i) listener.point((p0 = segment[i])[0], p0[1]);
    listener.lineEnd();
    return
   }
   var a = new d3_geo_clipPolygonIntersection(p0, segment, null, true),
    b = new d3_geo_clipPolygonIntersection(p0, null, a, false);
   a.o = b;
   subject.push(a);
   clip.push(b);
   a = new d3_geo_clipPolygonIntersection(p1, segment, null, false);
   b = new d3_geo_clipPolygonIntersection(p1, null, a, true);
   a.o = b;
   subject.push(a);
   clip.push(b)
  });
  clip.sort(compare);
  d3_geo_clipPolygonLinkCircular(subject);
  d3_geo_clipPolygonLinkCircular(clip);
  if (!subject.length) return;
  for (var i = 0, entry = clipStartInside, n = clip.length; i < n; ++i) {
   clip[i].e = entry = !entry
  }
  var start = subject[0],
   points, point;
  while (1) {
   var current = start,
    isSubject = true;
   while (current.v)
    if ((current = current.n) === start) return;
   points = current.z;
   listener.lineStart();
   do {
    current.v = current.o.v = true;
    if (current.e) {
     if (isSubject) {
      for (var i = 0, n = points.length; i < n; ++i) listener.point((point = points[i])[0], point[1])
     } else {
      interpolate(current.x, current.n.x, 1, listener)
     }
     current = current.n
    } else {
     if (isSubject) {
      points = current.p.z;
      for (var i = points.length - 1; i >= 0; --i) listener.point((point = points[i])[0], point[1])
     } else {
      interpolate(current.x, current.p.x, -1, listener)
     }
     current = current.p
    }
    current = current.o;
    points = current.z;
    isSubject = !isSubject
   } while (!current.v);
   listener.lineEnd()
  }
 }

 function d3_geo_clipPolygonLinkCircular(array) {
  if (!(n = array.length)) return;
  var n, i = 0,
   a = array[0],
   b;
  while (++i < n) {
   a.n = b = array[i];
   b.p = a;
   a = b
  }
  a.n = b = array[0];
  b.p = a
 }

 function d3_geo_clipPolygonIntersection(point, points, other, entry) {
  this.x = point;
  this.z = points;
  this.o = other;
  this.e = entry;
  this.v = false;
  this.n = this.p = null
 }

 function d3_geo_clip(pointVisible, clipLine, interpolate, clipStart) {
  return function(rotate, listener) {
   var line = clipLine(listener),
    rotatedClipStart = rotate.invert(clipStart[0], clipStart[1]);
   var clip = {
    point: point,
    lineStart: lineStart,
    lineEnd: lineEnd,
    polygonStart: function() {
     clip.point = pointRing;
     clip.lineStart = ringStart;
     clip.lineEnd = ringEnd;
     segments = [];
     polygon = []
    },
    polygonEnd: function() {
     clip.point = point;
     clip.lineStart = lineStart;
     clip.lineEnd = lineEnd;
     segments = d3.merge(segments);
     var clipStartInside = d3_geo_pointInPolygon(rotatedClipStart, polygon);
     if (segments.length) {
      if (!polygonStarted) listener.polygonStart(), polygonStarted = true;
      d3_geo_clipPolygon(segments, d3_geo_clipSort, clipStartInside, interpolate, listener)
     } else if (clipStartInside) {
      if (!polygonStarted) listener.polygonStart(), polygonStarted = true;
      listener.lineStart();
      interpolate(null, null, 1, listener);
      listener.lineEnd()
     }
     if (polygonStarted) listener.polygonEnd(), polygonStarted = false;
     segments = polygon = null
    },
    sphere: function() {
     listener.polygonStart();
     listener.lineStart();
     interpolate(null, null, 1, listener);
     listener.lineEnd();
     listener.polygonEnd()
    }
   };

   function point(ICAP, ITOPLINETAN) {
    var point = rotate(ICAP, ITOPLINETAN);
    if (pointVisible(ICAP = point[0], ITOPLINETAN = point[1])) listener.point(ICAP, ITOPLINETAN)
   }

   function pointLine(ICAP, ITOPLINETAN) {
    var point = rotate(ICAP, ITOPLINETAN);
    line.point(point[0], point[1])
   }

   function lineStart() {
    clip.point = pointLine;
    line.lineStart()
   }

   function lineEnd() {
    clip.point = point;
    line.lineEnd()
   }
   var segments;
   var buffer = d3_geo_clipBufferListener(),
    ringListener = clipLine(buffer),
    polygonStarted = false,
    polygon, ring;

   function pointRing(ICAP, ITOPLINETAN) {
    ring.push([ICAP, ITOPLINETAN]);
    var point = rotate(ICAP, ITOPLINETAN);
    ringListener.point(point[0], point[1])
   }

   function ringStart() {
    ringListener.lineStart();
    ring = []
   }

   function ringEnd() {
    pointRing(ring[0][0], ring[0][1]);
    ringListener.lineEnd();
    var clean = ringListener.clean(),
     ringSegments = buffer.buffer(),
     segment, n = ringSegments.length;
    ring.pop();
    polygon.push(ring);
    ring = null;
    if (!n) return;
    if (clean & 1) {
     segment = ringSegments[0];
     var n = segment.length - 1,
      i = -1,
      point;
     if (n > 0) {
      if (!polygonStarted) listener.polygonStart(), polygonStarted = true;
      listener.lineStart();
      while (++i < n) listener.point((point = segment[i])[0], point[1]);
      listener.lineEnd()
     }
     return
    }
    if (n > 1 && clean & 2) ringSegments.push(ringSegments.pop().concat(ringSegments.shift()));
    segments.push(ringSegments.filter(d3_geo_clipSegmentLength1))
   }
   return clip
  }
 }

 function d3_geo_clipSegmentLength1(segment) {
  return segment.length > 1
 }

 function d3_geo_clipBufferListener() {
  var lines = [],
   line;
  return {
   lineStart: function() {
    lines.push(line = [])
   },
   point: function(ICAP, ITOPLINETAN) {
    line.push([ICAP, ITOPLINETAN])
   },
   lineEnd: d3_noop,
   buffer: function() {
    var buffer = lines;
    lines = [];
    line = null;
    return buffer
   },
   rejoin: function() {
    if (lines.length > 1) lines.push(lines.pop().concat(lines.shift()))
   }
  }
 }

 function d3_geo_clipSort(a, b) {
  return ((a = a.x)[0] < 0 ? a[1] - halfIE - Iu : halfIE - a[1]) - ((b = b.x)[0] < 0 ? b[1] - halfIE - Iu : halfIE - b[1])
 }

 function d3_geo_pointInPolygon(point, polygon) {
  var meridian = point[0],
   parallel = point[1],
   meridianNormal = [Math.sin(meridian), -Math.cos(meridian), 0],
   polarAngle = 0,
   winding = 0;
  d3_geo_areaRingSum.reset();
  for (var i = 0, n = polygon.length; i < n; ++i) {
   var ring = polygon[i],
    m = ring.length;
   if (!m) continue;
   var point0 = ring[0],
    ICAP0 = point0[0],
    ITOPLINETAN0 = point0[1] / 2 + IE / 4,
    sinITOPLINETAN0 = Math.sin(ITOPLINETAN0),
    cosITOPLINETAN0 = Math.cos(ITOPLINETAN0),
    j = 1;
   while (true) {
    if (j === m) j = 0;
    point = ring[j];
    var ICAP = point[0],
     ITOPLINETAN = point[1] / 2 + IE / 4,
     sinITOPLINETAN = Math.sin(ITOPLINETAN),
     cosITOPLINETAN = Math.cos(ITOPLINETAN),
     dICAP = ICAP - ICAP0,
     sdICAP = dICAP >= 0 ? 1 : -1,
     adICAP = sdICAP * dICAP,
     antimeridian = adICAP > IE,
     k = sinITOPLINETAN0 * sinITOPLINETAN;
    d3_geo_areaRingSum.add(Math.atan2(k * sdICAP * Math.sin(adICAP), cosITOPLINETAN0 * cosITOPLINETAN + k * Math.cos(adICAP)));
    polarAngle += antimeridian ? dICAP + sdICAP * I2 : dICAP;
    if (antimeridian ^ ICAP0 >= meridian ^ ICAP >= meridian) {
     var arc = d3_geo_cartesianCross(d3_geo_cartesian(point0), d3_geo_cartesian(point));
     d3_geo_cartesianNormalize(arc);
     var intersection = d3_geo_cartesianCross(meridianNormal, arc);
     d3_geo_cartesianNormalize(intersection);
     var ITOPLINETANarc = (antimeridian ^ dICAP >= 0 ? -1 : 1) * d3_asin(intersection[2]);
     if (parallel > ITOPLINETANarc || parallel === ITOPLINETANarc && (arc[0] || arc[1])) {
      winding += antimeridian ^ dICAP >= 0 ? 1 : -1
     }
    }
    if (!j++) break;
    ICAP0 = ICAP, sinITOPLINETAN0 = sinITOPLINETAN, cosITOPLINETAN0 = cosITOPLINETAN, point0 = point
   }
  }
  return (polarAngle < -Iu || polarAngle < Iu && d3_geo_areaRingSum < 0) ^ winding & 1
 }
 var d3_geo_clipAntimeridian = d3_geo_clip(d3_true, d3_geo_clipAntimeridianLine, d3_geo_clipAntimeridianInterpolate, [-IE, -IE / 2]);

 function d3_geo_clipAntimeridianLine(listener) {
  var ICAP0 = NaN,
   ITOPLINETAN0 = NaN,
   sICAP0 = NaN,
   clean;
  return {
   lineStart: function() {
    listener.lineStart();
    clean = 1
   },
   point: function(ICAP1, ITOPLINETAN1) {
    var sICAP1 = ICAP1 > 0 ? IE : -IE,
     dICAP = abs(ICAP1 - ICAP0);
    if (abs(dICAP - IE) < Iu) {
     listener.point(ICAP0, ITOPLINETAN0 = (ITOPLINETAN0 + ITOPLINETAN1) / 2 > 0 ? halfIE : -halfIE);
     listener.point(sICAP0, ITOPLINETAN0);
     listener.lineEnd();
     listener.lineStart();
     listener.point(sICAP1, ITOPLINETAN0);
     listener.point(ICAP1, ITOPLINETAN0);
     clean = 0
    } else if (sICAP0 !== sICAP1 && dICAP >= IE) {
     if (abs(ICAP0 - sICAP0) < Iu) ICAP0 -= sICAP0 * Iu;
     if (abs(ICAP1 - sICAP1) < Iu) ICAP1 -= sICAP1 * Iu;
     ITOPLINETAN0 = d3_geo_clipAntimeridianIntersect(ICAP0, ITOPLINETAN0, ICAP1, ITOPLINETAN1);
     listener.point(sICAP0, ITOPLINETAN0);
     listener.lineEnd();
     listener.lineStart();
     listener.point(sICAP1, ITOPLINETAN0);
     clean = 0
    }
    listener.point(ICAP0 = ICAP1, ITOPLINETAN0 = ITOPLINETAN1);
    sICAP0 = sICAP1
   },
   lineEnd: function() {
    listener.lineEnd();
    ICAP0 = ITOPLINETAN0 = NaN
   },
   clean: function() {
    return 2 - clean
   }
  }
 }

 function d3_geo_clipAntimeridianIntersect(ICAP0, ITOPLINETAN0, ICAP1, ITOPLINETAN1) {
  var cosITOPLINETAN0, cosITOPLINETAN1, sinICAP0_ICAP1 = Math.sin(ICAP0 - ICAP1);
  return abs(sinICAP0_ICAP1) > Iu ? Math.atan((Math.sin(ITOPLINETAN0) * (cosITOPLINETAN1 = Math.cos(ITOPLINETAN1)) * Math.sin(ICAP1) - Math.sin(ITOPLINETAN1) * (cosITOPLINETAN0 = Math.cos(ITOPLINETAN0)) * Math.sin(ICAP0)) / (cosITOPLINETAN0 * cosITOPLINETAN1 * sinICAP0_ICAP1)) : (ITOPLINETAN0 + ITOPLINETAN1) / 2
 }

 function d3_geo_clipAntimeridianInterpolate(from, to, direction, listener) {
  var ITOPLINETAN;
  if (from == null) {
   ITOPLINETAN = direction * halfIE;
   listener.point(-IE, ITOPLINETAN);
   listener.point(0, ITOPLINETAN);
   listener.point(IE, ITOPLINETAN);
   listener.point(IE, 0);
   listener.point(IE, -ITOPLINETAN);
   listener.point(0, -ITOPLINETAN);
   listener.point(-IE, -ITOPLINETAN);
   listener.point(-IE, 0);
   listener.point(-IE, ITOPLINETAN)
  } else if (abs(from[0] - to[0]) > Iu) {
   var s = from[0] < to[0] ? IE : -IE;
   ITOPLINETAN = direction * s / 2;
   listener.point(-s, ITOPLINETAN);
   listener.point(0, ITOPLINETAN);
   listener.point(s, ITOPLINETAN)
  } else {
   listener.point(to[0], to[1])
  }
 }

 function d3_geo_clipCircle(radius) {
  var cr = Math.cos(radius),
   smallRadius = cr > 0,
   notHemisphere = abs(cr) > Iu,
   interpolate = d3_geo_circleInterpolate(radius, 6 * d3_radians);
  return d3_geo_clip(visible, clipLine, interpolate, smallRadius ? [0, -radius] : [-IE, radius - IE]);

  function visible(ICAP, ITOPLINETAN) {
   return Math.cos(ICAP) * Math.cos(ITOPLINETAN) > cr
  }

  function clipLine(listener) {
   var point0, c0, v0, v00, clean;
   return {
    lineStart: function() {
     v00 = v0 = false;
     clean = 1
    },
    point: function(ICAP, ITOPLINETAN) {
     var point1 = [ICAP, ITOPLINETAN],
      point2, v = visible(ICAP, ITOPLINETAN),
      c = smallRadius ? v ? 0 : code(ICAP, ITOPLINETAN) : v ? code(ICAP + (ICAP < 0 ? IE : -IE), ITOPLINETAN) : 0;
     if (!point0 && (v00 = v0 = v)) listener.lineStart();
     if (v !== v0) {
      point2 = intersect(point0, point1);
      if (d3_geo_sphericalEqual(point0, point2) || d3_geo_sphericalEqual(point1, point2)) {
       point1[0] += Iu;
       point1[1] += Iu;
       v = visible(point1[0], point1[1])
      }
     }
     if (v !== v0) {
      clean = 0;
      if (v) {
       listener.lineStart();
       point2 = intersect(point1, point0);
       listener.point(point2[0], point2[1])
      } else {
       point2 = intersect(point0, point1);
       listener.point(point2[0], point2[1]);
       listener.lineEnd()
      }
      point0 = point2
     } else if (notHemisphere && point0 && smallRadius ^ v) {
      var t;
      if (!(c & c0) && (t = intersect(point1, point0, true))) {
       clean = 0;
       if (smallRadius) {
        listener.lineStart();
        listener.point(t[0][0], t[0][1]);
        listener.point(t[1][0], t[1][1]);
        listener.lineEnd()
       } else {
        listener.point(t[1][0], t[1][1]);
        listener.lineEnd();
        listener.lineStart();
        listener.point(t[0][0], t[0][1])
       }
      }
     }
     if (v && (!point0 || !d3_geo_sphericalEqual(point0, point1))) {
      listener.point(point1[0], point1[1])
     }
     point0 = point1, v0 = v, c0 = c
    },
    lineEnd: function() {
     if (v0) listener.lineEnd();
     point0 = null
    },
    clean: function() {
     return clean | (v00 && v0) << 1
    }
   }
  }

  function intersect(a, b, two) {
   var pa = d3_geo_cartesian(a),
    pb = d3_geo_cartesian(b);
   var n1 = [1, 0, 0],
    n2 = d3_geo_cartesianCross(pa, pb),
    n2n2 = d3_geo_cartesianDot(n2, n2),
    n1n2 = n2[0],
    determinant = n2n2 - n1n2 * n1n2;
   if (!determinant) return !two && a;
   var c1 = cr * n2n2 / determinant,
    c2 = -cr * n1n2 / determinant,
    n1xn2 = d3_geo_cartesianCross(n1, n2),
    A = d3_geo_cartesianScale(n1, c1),
    B = d3_geo_cartesianScale(n2, c2);
   d3_geo_cartesianAdd(A, B);
   var u = n1xn2,
    w = d3_geo_cartesianDot(A, u),
    uu = d3_geo_cartesianDot(u, u),
    t2 = w * w - uu * (d3_geo_cartesianDot(A, A) - 1);
   if (t2 < 0) return;
   var t = Math.sqrt(t2),
    q = d3_geo_cartesianScale(u, (-w - t) / uu);
   d3_geo_cartesianAdd(q, A);
   q = d3_geo_spherical(q);
   if (!two) return q;
   var ICAP0 = a[0],
    ICAP1 = b[0],
    ITOPLINETAN0 = a[1],
    ITOPLINETAN1 = b[1],
    z;
   if (ICAP1 < ICAP0) z = ICAP0, ICAP0 = ICAP1, ICAP1 = z;
   var IICAP = ICAP1 - ICAP0,
    polar = abs(IICAP - IE) < Iu,
    meridian = polar || IICAP < Iu;
   if (!polar && ITOPLINETAN1 < ITOPLINETAN0) z = ITOPLINETAN0, ITOPLINETAN0 = ITOPLINETAN1, ITOPLINETAN1 = z;
   if (meridian ? polar ? ITOPLINETAN0 + ITOPLINETAN1 > 0 ^ q[1] < (abs(q[0] - ICAP0) < Iu ? ITOPLINETAN0 : ITOPLINETAN1) : ITOPLINETAN0 <= q[1] && q[1] <= ITOPLINETAN1 : IICAP > IE ^ (ICAP0 <= q[0] && q[0] <= ICAP1)) {
    var q1 = d3_geo_cartesianScale(u, (-w + t) / uu);
    d3_geo_cartesianAdd(q1, A);
    return [q, d3_geo_spherical(q1)]
   }
  }

  function code(ICAP, ITOPLINETAN) {
   var r = smallRadius ? radius : IE - radius,
    code = 0;
   if (ICAP < -r) code |= 1;
   else if (ICAP > r) code |= 2;
   if (ITOPLINETAN < -r) code |= 4;
   else if (ITOPLINETAN > r) code |= 8;
   return code
  }
 }

 function d3_geom_clipLine(x0, y0, x1, y1) {
  return function(line) {
   var a = line.a,
    b = line.b,
    ax = a.x,
    ay = a.y,
    bx = b.x,
    by = b.y,
    t0 = 0,
    t1 = 1,
    dx = bx - ax,
    dy = by - ay,
    r;
   r = x0 - ax;
   if (!dx && r > 0) return;
   r /= dx;
   if (dx < 0) {
    if (r < t0) return;
    if (r < t1) t1 = r
   } else if (dx > 0) {
    if (r > t1) return;
    if (r > t0) t0 = r
   }
   r = x1 - ax;
   if (!dx && r < 0) return;
   r /= dx;
   if (dx < 0) {
    if (r > t1) return;
    if (r > t0) t0 = r
   } else if (dx > 0) {
    if (r < t0) return;
    if (r < t1) t1 = r
   }
   r = y0 - ay;
   if (!dy && r > 0) return;
   r /= dy;
   if (dy < 0) {
    if (r < t0) return;
    if (r < t1) t1 = r
   } else if (dy > 0) {
    if (r > t1) return;
    if (r > t0) t0 = r
   }
   r = y1 - ay;
   if (!dy && r < 0) return;
   r /= dy;
   if (dy < 0) {
    if (r > t1) return;
    if (r > t0) t0 = r
   } else if (dy > 0) {
    if (r < t0) return;
    if (r < t1) t1 = r
   }
   if (t0 > 0) line.a = {
    x: ax + t0 * dx,
    y: ay + t0 * dy
   };
   if (t1 < 1) line.b = {
    x: ax + t1 * dx,
    y: ay + t1 * dy
   };
   return line
  }
 }
 var d3_geo_clipExtentMAX = 1e9;
 d3.geo.clipExtent = function() {
  var x0, y0, x1, y1, stream, clip, clipExtent = {
   stream: function(output) {
    if (stream) stream.valid = false;
    stream = clip(output);
    stream.valid = true;
    return stream
   },
   extent: function(_) {
    if (!arguments.length) return [
     [x0, y0],
     [x1, y1]
    ];
    clip = d3_geo_clipExtent(x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1]);
    if (stream) stream.valid = false, stream = null;
    return clipExtent
   }
  };
  return clipExtent.extent([
   [0, 0],
   [960, 500]
  ])
 };

 function d3_geo_clipExtent(x0, y0, x1, y1) {
  return function(listener) {
   var listener_ = listener,
    bufferListener = d3_geo_clipBufferListener(),
    clipLine = d3_geom_clipLine(x0, y0, x1, y1),
    segments, polygon, ring;
   var clip = {
    point: point,
    lineStart: lineStart,
    lineEnd: lineEnd,
    polygonStart: function() {
     listener = bufferListener;
     segments = [];
     polygon = [];
     clean = true
    },
    polygonEnd: function() {
     listener = listener_;
     segments = d3.merge(segments);
     var clipStartInside = insidePolygon([x0, y1]),
      inside = clean && clipStartInside,
      visible = segments.length;
     if (inside || visible) {
      listener.polygonStart();
      if (inside) {
       listener.lineStart();
       interpolate(null, null, 1, listener);
       listener.lineEnd()
      }
      if (visible) {
       d3_geo_clipPolygon(segments, compare, clipStartInside, interpolate, listener)
      }
      listener.polygonEnd()
     }
     segments = polygon = ring = null
    }
   };

   function insidePolygon(p) {
    var wn = 0,
     n = polygon.length,
     y = p[1];
    for (var i = 0; i < n; ++i) {
     for (var j = 1, v = polygon[i], m = v.length, a = v[0], b; j < m; ++j) {
      b = v[j];
      if (a[1] <= y) {
       if (b[1] > y && d3_cross2d(a, b, p) > 0) ++wn
      } else {
       if (b[1] <= y && d3_cross2d(a, b, p) < 0) --wn
      }
      a = b
     }
    }
    return wn !== 0
   }

   function interpolate(from, to, direction, listener) {
    var a = 0,
     a1 = 0;
    if (from == null || (a = corner(from, direction)) !== (a1 = corner(to, direction)) || comparePoints(from, to) < 0 ^ direction > 0) {
     do {
      listener.point(a === 0 || a === 3 ? x0 : x1, a > 1 ? y1 : y0)
     } while ((a = (a + direction + 4) % 4) !== a1)
    } else {
     listener.point(to[0], to[1])
    }
   }

   function pointVisible(x, y) {
    return x0 <= x && x <= x1 && y0 <= y && y <= y1
   }

   function point(x, y) {
    if (pointVisible(x, y)) listener.point(x, y)
   }
   var x__, y__, v__, x_, y_, v_, first, clean;

   function lineStart() {
    clip.point = linePoint;
    if (polygon) polygon.push(ring = []);
    first = true;
    v_ = false;
    x_ = y_ = NaN
   }

   function lineEnd() {
    if (segments) {
     linePoint(x__, y__);
     if (v__ && v_) bufferListener.rejoin();
     segments.push(bufferListener.buffer())
    }
    clip.point = point;
    if (v_) listener.lineEnd()
   }

   function linePoint(x, y) {
    x = Math.max(-d3_geo_clipExtentMAX, Math.min(d3_geo_clipExtentMAX, x));
    y = Math.max(-d3_geo_clipExtentMAX, Math.min(d3_geo_clipExtentMAX, y));
    var v = pointVisible(x, y);
    if (polygon) ring.push([x, y]);
    if (first) {
     x__ = x, y__ = y, v__ = v;
     first = false;
     if (v) {
      listener.lineStart();
      listener.point(x, y)
     }
    } else {
     if (v && v_) listener.point(x, y);
     else {
      var l = {
       a: {
        x: x_,
        y: y_
       },
       b: {
        x: x,
        y: y
       }
      };
      if (clipLine(l)) {
       if (!v_) {
        listener.lineStart();
        listener.point(l.a.x, l.a.y)
       }
       listener.point(l.b.x, l.b.y);
       if (!v) listener.lineEnd();
       clean = false
      } else if (v) {
       listener.lineStart();
       listener.point(x, y);
       clean = false
      }
     }
    }
    x_ = x, y_ = y, v_ = v
   }
   return clip
  };

  function corner(p, direction) {
   return abs(p[0] - x0) < Iu ? direction > 0 ? 0 : 3 : abs(p[0] - x1) < Iu ? direction > 0 ? 2 : 1 : abs(p[1] - y0) < Iu ? direction > 0 ? 1 : 0 : direction > 0 ? 3 : 2
  }

  function compare(a, b) {
   return comparePoints(a.x, b.x)
  }

  function comparePoints(a, b) {
   var ca = corner(a, 1),
    cb = corner(b, 1);
   return ca !== cb ? ca - cb : ca === 0 ? b[1] - a[1] : ca === 1 ? a[0] - b[0] : ca === 2 ? a[1] - b[1] : b[0] - a[0]
  }
 }

 function d3_geo_compose(a, b) {
  function compose(x, y) {
   return x = a(x, y), b(x[0], x[1])
  }
  if (a.invert && b.invert) compose.invert = function(x, y) {
   return x = b.invert(x, y), x && a.invert(x[0], x[1])
  };
  return compose
 }

 function d3_geo_conic(projectAt) {
  var ITOPLINETAN0 = 0,
   ITOPLINETAN1 = IE / 3,
   m = d3_geo_projectionMutator(projectAt),
   p = m(ITOPLINETAN0, ITOPLINETAN1);
  p.parallels = function(_) {
   if (!arguments.length) return [ITOPLINETAN0 / IE * 180, ITOPLINETAN1 / IE * 180];
   return m(ITOPLINETAN0 = _[0] * IE / 180, ITOPLINETAN1 = _[1] * IE / 180)
  };
  return p
 }

 function d3_geo_conicEqualArea(ITOPLINETAN0, ITOPLINETAN1) {
  var sinITOPLINETAN0 = Math.sin(ITOPLINETAN0),
   n = (sinITOPLINETAN0 + Math.sin(ITOPLINETAN1)) / 2,
   C = 1 + sinITOPLINETAN0 * (2 * n - sinITOPLINETAN0),
   ITOPLINE0 = Math.sqrt(C) / n;

  function forward(ICAP, ITOPLINETAN) {
   var ITOPLINE= Math.sqrt(C - 2 * n * Math.sin(ITOPLINETAN)) / n;
   return [ITOPLINE* Math.sin(ICAP *= n), ITOPLINE0 - ITOPLINE* Math.cos(ICAP)]
  }
  forward.invert = function(x, y) {
   var ITOPLINE0_y = ITOPLINE0 - y;
   return [Math.atan2(x, ITOPLINE0_y) / n, d3_asin((C - (x * x + ITOPLINE0_y * ITOPLINE0_y) * n * n) / (2 * n))]
  };
  return forward
 }(d3.geo.conicEqualArea = function() {
  return d3_geo_conic(d3_geo_conicEqualArea)
 }).raw = d3_geo_conicEqualArea;
 d3.geo.albers = function() {
  return d3.geo.conicEqualArea().rotate([96, 0]).center([-.6, 38.7]).parallels([29.5, 45.5]).scale(1070)
 };
 d3.geo.albersUsa = function() {
  var lower48 = d3.geo.albers();
  var alaska = d3.geo.conicEqualArea().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]);
  var hawaii = d3.geo.conicEqualArea().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]);
  var point, pointStream = {
    point: function(x, y) {
     point = [x, y]
    }
   },
   lower48Point, alaskaPoint, hawaiiPoint;

  function albersUsa(coordinates) {
   var x = coordinates[0],
    y = coordinates[1];
   point = null;
   (lower48Point(x, y), point) || (alaskaPoint(x, y), point) || hawaiiPoint(x, y);
   return point
  }
  albersUsa.invert = function(coordinates) {
   var k = lower48.scale(),
    t = lower48.translate(),
    x = (coordinates[0] - t[0]) / k,
    y = (coordinates[1] - t[1]) / k;
   return (y >= .12 && y < .234 && x >= -.425 && x < -.214 ? alaska : y >= .166 && y < .234 && x >= -.214 && x < -.115 ? hawaii : lower48).invert(coordinates)
  };
  albersUsa.stream = function(stream) {
   var lower48Stream = lower48.stream(stream),
    alaskaStream = alaska.stream(stream),
    hawaiiStream = hawaii.stream(stream);
   return {
    point: function(x, y) {
     lower48Stream.point(x, y);
     alaskaStream.point(x, y);
     hawaiiStream.point(x, y)
    },
    sphere: function() {
     lower48Stream.sphere();
     alaskaStream.sphere();
     hawaiiStream.sphere()
    },
    lineStart: function() {
     lower48Stream.lineStart();
     alaskaStream.lineStart();
     hawaiiStream.lineStart()
    },
    lineEnd: function() {
     lower48Stream.lineEnd();
     alaskaStream.lineEnd();
     hawaiiStream.lineEnd()
    },
    polygonStart: function() {
     lower48Stream.polygonStart();
     alaskaStream.polygonStart();
     hawaiiStream.polygonStart()
    },
    polygonEnd: function() {
     lower48Stream.polygonEnd();
     alaskaStream.polygonEnd();
     hawaiiStream.polygonEnd()
    }
   }
  };
  albersUsa.precision = function(_) {
   if (!arguments.length) return lower48.precision();
   lower48.precision(_);
   alaska.precision(_);
   hawaii.precision(_);
   return albersUsa
  };
  albersUsa.scale = function(_) {
   if (!arguments.length) return lower48.scale();
   lower48.scale(_);
   alaska.scale(_ * .35);
   hawaii.scale(_);
   return albersUsa.translate(lower48.translate())
  };
  albersUsa.translate = function(_) {
   if (!arguments.length) return lower48.translate();
   var k = lower48.scale(),
    x = +_[0],
    y = +_[1];
   lower48Point = lower48.translate(_).clipExtent([
    [x - .455 * k, y - .238 * k],
    [x + .455 * k, y + .238 * k]
   ]).stream(pointStream).point;
   alaskaPoint = alaska.translate([x - .307 * k, y + .201 * k]).clipExtent([
    [x - .425 * k + Iu, y + .12 * k + Iu],
    [x - .214 * k - Iu, y + .234 * k - Iu]
   ]).stream(pointStream).point;
   hawaiiPoint = hawaii.translate([x - .205 * k, y + .212 * k]).clipExtent([
    [x - .214 * k + Iu, y + .166 * k + Iu],
    [x - .115 * k - Iu, y + .234 * k - Iu]
   ]).stream(pointStream).point;
   return albersUsa
  };
  return albersUsa.scale(1070)
 };
 var d3_geo_pathAreaSum, d3_geo_pathAreaPolygon, d3_geo_pathArea = {
  point: d3_noop,
  lineStart: d3_noop,
  lineEnd: d3_noop,
  polygonStart: function() {
   d3_geo_pathAreaPolygon = 0;
   d3_geo_pathArea.lineStart = d3_geo_pathAreaRingStart
  },
  polygonEnd: function() {
   d3_geo_pathArea.lineStart = d3_geo_pathArea.lineEnd = d3_geo_pathArea.point = d3_noop;
   d3_geo_pathAreaSum += abs(d3_geo_pathAreaPolygon / 2)
  }
 };

 function d3_geo_pathAreaRingStart() {
  var x00, y00, x0, y0;
  d3_geo_pathArea.point = function(x, y) {
   d3_geo_pathArea.point = nextPoint;
   x00 = x0 = x, y00 = y0 = y
  };

  function nextPoint(x, y) {
   d3_geo_pathAreaPolygon += y0 * x - x0 * y;
   x0 = x, y0 = y
  }
  d3_geo_pathArea.lineEnd = function() {
   nextPoint(x00, y00)
  }
 }
 var d3_geo_pathBoundsX0, d3_geo_pathBoundsY0, d3_geo_pathBoundsX1, d3_geo_pathBoundsY1;
 var d3_geo_pathBounds = {
  point: d3_geo_pathBoundsPoint,
  lineStart: d3_noop,
  lineEnd: d3_noop,
  polygonStart: d3_noop,
  polygonEnd: d3_noop
 };

 function d3_geo_pathBoundsPoint(x, y) {
  if (x < d3_geo_pathBoundsX0) d3_geo_pathBoundsX0 = x;
  if (x > d3_geo_pathBoundsX1) d3_geo_pathBoundsX1 = x;
  if (y < d3_geo_pathBoundsY0) d3_geo_pathBoundsY0 = y;
  if (y > d3_geo_pathBoundsY1) d3_geo_pathBoundsY1 = y
 }

 function d3_geo_pathBuffer() {
  var pointCircle = d3_geo_pathBufferCircle(4.5),
   buffer = [];
  var stream = {
   point: point,
   lineStart: function() {
    stream.point = pointLineStart
   },
   lineEnd: lineEnd,
   polygonStart: function() {
    stream.lineEnd = lineEndPolygon
   },
   polygonEnd: function() {
    stream.lineEnd = lineEnd;
    stream.point = point
   },
   pointRadius: function(_) {
    pointCircle = d3_geo_pathBufferCircle(_);
    return stream
   },
   result: function() {
    if (buffer.length) {
     var result = buffer.join("");
     buffer = [];
     return result
    }
   }
  };

  function point(x, y) {
   buffer.push("M", x, ",", y, pointCircle)
  }

  function pointLineStart(x, y) {
   buffer.push("M", x, ",", y);
   stream.point = pointLine
  }

  function pointLine(x, y) {
   buffer.push("L", x, ",", y)
  }

  function lineEnd() {
   stream.point = point
  }

  function lineEndPolygon() {
   buffer.push("Z")
  }
  return stream
 }

 function d3_geo_pathBufferCircle(radius) {
  return "m0," + radius + "a" + radius + "," + radius + " 0 1,1 0," + -2 * radius + "a" + radius + "," + radius + " 0 1,1 0," + 2 * radius + "z"
 }
 var d3_geo_pathCentroid = {
  point: d3_geo_pathCentroidPoint,
  lineStart: d3_geo_pathCentroidLineStart,
  lineEnd: d3_geo_pathCentroidLineEnd,
  polygonStart: function() {
   d3_geo_pathCentroid.lineStart = d3_geo_pathCentroidRingStart
  },
  polygonEnd: function() {
   d3_geo_pathCentroid.point = d3_geo_pathCentroidPoint;
   d3_geo_pathCentroid.lineStart = d3_geo_pathCentroidLineStart;
   d3_geo_pathCentroid.lineEnd = d3_geo_pathCentroidLineEnd
  }
 };

 function d3_geo_pathCentroidPoint(x, y) {
  d3_geo_centroidX0 += x;
  d3_geo_centroidY0 += y;
  ++d3_geo_centroidZ0
 }

 function d3_geo_pathCentroidLineStart() {
  var x0, y0;
  d3_geo_pathCentroid.point = function(x, y) {
   d3_geo_pathCentroid.point = nextPoint;
   d3_geo_pathCentroidPoint(x0 = x, y0 = y)
  };

  function nextPoint(x, y) {
   var dx = x - x0,
    dy = y - y0,
    z = Math.sqrt(dx * dx + dy * dy);
   d3_geo_centroidX1 += z * (x0 + x) / 2;
   d3_geo_centroidY1 += z * (y0 + y) / 2;
   d3_geo_centroidZ1 += z;
   d3_geo_pathCentroidPoint(x0 = x, y0 = y)
  }
 }

 function d3_geo_pathCentroidLineEnd() {
  d3_geo_pathCentroid.point = d3_geo_pathCentroidPoint
 }

 function d3_geo_pathCentroidRingStart() {
  var x00, y00, x0, y0;
  d3_geo_pathCentroid.point = function(x, y) {
   d3_geo_pathCentroid.point = nextPoint;
   d3_geo_pathCentroidPoint(x00 = x0 = x, y00 = y0 = y)
  };

  function nextPoint(x, y) {
   var dx = x - x0,
    dy = y - y0,
    z = Math.sqrt(dx * dx + dy * dy);
   d3_geo_centroidX1 += z * (x0 + x) / 2;
   d3_geo_centroidY1 += z * (y0 + y) / 2;
   d3_geo_centroidZ1 += z;
   z = y0 * x - x0 * y;
   d3_geo_centroidX2 += z * (x0 + x);
   d3_geo_centroidY2 += z * (y0 + y);
   d3_geo_centroidZ2 += z * 3;
   d3_geo_pathCentroidPoint(x0 = x, y0 = y)
  }
  d3_geo_pathCentroid.lineEnd = function() {
   nextPoint(x00, y00)
  }
 }

 function d3_geo_pathContext(context) {
  var pointRadius = 4.5;
  var stream = {
   point: point,
   lineStart: function() {
    stream.point = pointLineStart
   },
   lineEnd: lineEnd,
   polygonStart: function() {
    stream.lineEnd = lineEndPolygon
   },
   polygonEnd: function() {
    stream.lineEnd = lineEnd;
    stream.point = point
   },
   pointRadius: function(_) {
    pointRadius = _;
    return stream
   },
   result: d3_noop
  };

  function point(x, y) {
   context.moveTo(x, y);
   context.arc(x, y, pointRadius, 0, I2)
  }

  function pointLineStart(x, y) {
   context.moveTo(x, y);
   stream.point = pointLine
  }

  function pointLine(x, y) {
   context.lineTo(x, y)
  }

  function lineEnd() {
   stream.point = point
  }

  function lineEndPolygon() {
   context.closePath()
  }
  return stream
 }

 function d3_geo_resample(project) {
  var ICAP2 = .5,
   cosMinDistance = Math.cos(30 * d3_radians),
   maxDepth = 16;

  function resample(stream) {
   return (maxDepth ? resampleRecursive : resampleNone)(stream)
  }

  function resampleNone(stream) {
   return d3_geo_transformPoint(stream, function(x, y) {
    x = project(x, y);
    stream.point(x[0], x[1])
   })
  }

  function resampleRecursive(stream) {
   var ICAP00, ITOPLINETAN00, x00, y00, a00, b00, c00, ICAP0, x0, y0, a0, b0, c0;
   var resample = {
    point: point,
    lineStart: lineStart,
    lineEnd: lineEnd,
    polygonStart: function() {
     stream.polygonStart();
     resample.lineStart = ringStart
    },
    polygonEnd: function() {
     stream.polygonEnd();
     resample.lineStart = lineStart
    }
   };

   function point(x, y) {
    x = project(x, y);
    stream.point(x[0], x[1])
   }

   function lineStart() {
    x0 = NaN;
    resample.point = linePoint;
    stream.lineStart()
   }

   function linePoint(ICAP, ITOPLINETAN) {
    var c = d3_geo_cartesian([ICAP, ITOPLINETAN]),
     p = project(ICAP, ITOPLINETAN);
    resampleLineTo(x0, y0, ICAP0, a0, b0, c0, x0 = p[0], y0 = p[1], ICAP0 = ICAP, a0 = c[0], b0 = c[1], c0 = c[2], maxDepth, stream);
    stream.point(x0, y0)
   }

   function lineEnd() {
    resample.point = point;
    stream.lineEnd()
   }

   function ringStart() {
    lineStart();
    resample.point = ringPoint;
    resample.lineEnd = ringEnd
   }

   function ringPoint(ICAP, ITOPLINETAN) {
    linePoint(ICAP00 = ICAP, ITOPLINETAN00 = ITOPLINETAN), x00 = x0, y00 = y0, a00 = a0, b00 = b0, c00 = c0;
    resample.point = linePoint
   }

   function ringEnd() {
    resampleLineTo(x0, y0, ICAP0, a0, b0, c0, x00, y00, ICAP00, a00, b00, c00, maxDepth, stream);
    resample.lineEnd = lineEnd;
    lineEnd()
   }
   return resample
  }

  function resampleLineTo(x0, y0, ICAP0, a0, b0, c0, x1, y1, ICAP1, a1, b1, c1, depth, stream) {
   var dx = x1 - x0,
    dy = y1 - y0,
    d2 = dx * dx + dy * dy;
   if (d2 > 4 * ICAP2 && depth--) {
    var a = a0 + a1,
     b = b0 + b1,
     c = c0 + c1,
     m = Math.sqrt(a * a + b * b + c * c),
     ITOPLINETAN2 = Math.asin(c /= m),
     ICAP2 = abs(abs(c) - 1) < Iu || abs(ICAP0 - ICAP1) < Iu ? (ICAP0 + ICAP1) / 2 : Math.atan2(b, a),
     p = project(ICAP2, ITOPLINETAN2),
     x2 = p[0],
     y2 = p[1],
     dx2 = x2 - x0,
     dy2 = y2 - y0,
     dz = dy * dx2 - dx * dy2;
    if (dz * dz / d2 > ICAP2 || abs((dx * dx2 + dy * dy2) / d2 - .5) > .3 || a0 * a1 + b0 * b1 + c0 * c1 < cosMinDistance) {
     resampleLineTo(x0, y0, ICAP0, a0, b0, c0, x2, y2, ICAP2, a /= m, b /= m, c, depth, stream);
     stream.point(x2, y2);
     resampleLineTo(x2, y2, ICAP2, a, b, c, x1, y1, ICAP1, a1, b1, c1, depth, stream)
    }
   }
  }
  resample.precision = function(_) {
   if (!arguments.length) return Math.sqrt(ICAP2);
   maxDepth = (ICAP2 = _ * _) > 0 && 16;
   return resample
  };
  return resample
 }
 d3.geo.path = function() {
  var pointRadius = 4.5,
   projection, context, projectStream, contextStream, cacheStream;

  function path(object) {
   if (object) {
    if (typeof pointRadius === "function") contextStream.pointRadius(+pointRadius.apply(this, arguments));
    if (!cacheStream || !cacheStream.valid) cacheStream = projectStream(contextStream);
    d3.geo.stream(object, cacheStream)
   }
   return contextStream.result()
  }
  path.area = function(object) {
   d3_geo_pathAreaSum = 0;
   d3.geo.stream(object, projectStream(d3_geo_pathArea));
   return d3_geo_pathAreaSum
  };
  path.centroid = function(object) {
   d3_geo_centroidX0 = d3_geo_centroidY0 = d3_geo_centroidZ0 = d3_geo_centroidX1 = d3_geo_centroidY1 = d3_geo_centroidZ1 = d3_geo_centroidX2 = d3_geo_centroidY2 = d3_geo_centroidZ2 = 0;
   d3.geo.stream(object, projectStream(d3_geo_pathCentroid));
   return d3_geo_centroidZ2 ? [d3_geo_centroidX2 / d3_geo_centroidZ2, d3_geo_centroidY2 / d3_geo_centroidZ2] : d3_geo_centroidZ1 ? [d3_geo_centroidX1 / d3_geo_centroidZ1, d3_geo_centroidY1 / d3_geo_centroidZ1] : d3_geo_centroidZ0 ? [d3_geo_centroidX0 / d3_geo_centroidZ0, d3_geo_centroidY0 / d3_geo_centroidZ0] : [NaN, NaN]
  };
  path.bounds = function(object) {
   d3_geo_pathBoundsX1 = d3_geo_pathBoundsY1 = -(d3_geo_pathBoundsX0 = d3_geo_pathBoundsY0 = Infinity);
   d3.geo.stream(object, projectStream(d3_geo_pathBounds));
   return [
    [d3_geo_pathBoundsX0, d3_geo_pathBoundsY0],
    [d3_geo_pathBoundsX1, d3_geo_pathBoundsY1]
   ]
  };
  path.projection = function(_) {
   if (!arguments.length) return projection;
   projectStream = (projection = _) ? _.stream || d3_geo_pathProjectStream(_) : d3_identity;
   return reset()
  };
  path.context = function(_) {
   if (!arguments.length) return context;
   contextStream = (context = _) == null ? new d3_geo_pathBuffer : new d3_geo_pathContext(_);
   if (typeof pointRadius !== "function") contextStream.pointRadius(pointRadius);
   return reset()
  };
  path.pointRadius = function(_) {
   if (!arguments.length) return pointRadius;
   pointRadius = typeof _ === "function" ? _ : (contextStream.pointRadius(+_), +_);
   return path
  };

  function reset() {
   cacheStream = null;
   return path
  }
  return path.projection(d3.geo.albersUsa()).context(null)
 };

 function d3_geo_pathProjectStream(project) {
  var resample = d3_geo_resample(function(x, y) {
   return project([x * d3_degrees, y * d3_degrees])
  });
  return function(stream) {
   return d3_geo_projectionRadians(resample(stream))
  }
 }
 d3.geo.transform = function(methods) {
  return {
   stream: function(stream) {
    var transform = new d3_geo_transform(stream);
    for (var k in methods) transform[k] = methods[k];
    return transform
   }
  }
 };

 function d3_geo_transform(stream) {
  this.stream = stream
 }
 d3_geo_transform.prototype = {
  point: function(x, y) {
   this.stream.point(x, y)
  },
  sphere: function() {
   this.stream.sphere()
  },
  lineStart: function() {
   this.stream.lineStart()
  },
  lineEnd: function() {
   this.stream.lineEnd()
  },
  polygonStart: function() {
   this.stream.polygonStart()
  },
  polygonEnd: function() {
   this.stream.polygonEnd()
  }
 };

 function d3_geo_transformPoint(stream, point) {
  return {
   point: point,
   sphere: function() {
    stream.sphere()
   },
   lineStart: function() {
    stream.lineStart()
   },
   lineEnd: function() {
    stream.lineEnd()
   },
   polygonStart: function() {
    stream.polygonStart()
   },
   polygonEnd: function() {
    stream.polygonEnd()
   }
  }
 }
 d3.geo.projection = d3_geo_projection;
 d3.geo.projectionMutator = d3_geo_projectionMutator;

 function d3_geo_projection(project) {
  return d3_geo_projectionMutator(function() {
   return project
  })()
 }

 function d3_geo_projectionMutator(projectAt) {
  var project, rotate, projectRotate, projectResample = d3_geo_resample(function(x, y) {
    x = project(x, y);
    return [x[0] * k + ICAPX,ICAPY - x[1] * k]
   }),
   k = 150,
   x = 480,
   y = 250,
   ICAP = 0,
   ITOPLINETAN = 0,
   IICAP = 0,
   IITOPLINETAN = 0,
   IICUBE = 0,
   ICAPX,ICAPY, preclip = d3_geo_clipAntimeridian,
   postclip = d3_identity,
   clipAngle = null,
   clipExtent = null,
   stream;

  function projection(point) {
   point = projectRotate(point[0] * d3_radians, point[1] * d3_radians);
   return [point[0] * k + ICAPX,ICAPY - point[1] * k]
  }

  function invert(point) {
   point = projectRotate.invert((point[0] - ICAPX) / k, (IASCAPY - point[1]) / k);
   return point && [point[0] * d3_degrees, point[1] * d3_degrees]
  }
  projection.stream = function(output) {
   if (stream) stream.valid = false;
   stream = d3_geo_projectionRadians(preclip(rotate, projectResample(postclip(output))));
   stream.valid = true;
   return stream
  };
  projection.clipAngle = function(_) {
   if (!arguments.length) return clipAngle;
   preclip = _ == null ? (clipAngle = _, d3_geo_clipAntimeridian) : d3_geo_clipCircle((clipAngle = +_) * d3_radians);
   return invalidate()
  };
  projection.clipExtent = function(_) {
   if (!arguments.length) return clipExtent;
   clipExtent = _;
   postclip = _ ? d3_geo_clipExtent(_[0][0], _[0][1], _[1][0], _[1][1]) : d3_identity;
   return invalidate()
  };
  projection.scale = function(_) {
   if (!arguments.length) return k;
   k = +_;
   return reset()
  };
  projection.translate = function(_) {
   if (!arguments.length) return [x, y];
   x = +_[0];
   y = +_[1];
   return reset()
  };
  projection.center = function(_) {
   if (!arguments.length) return [ICAP * d3_degrees, ITOPLINETAN * d3_degrees];
   ICAP = _[0] % 360 * d3_radians;
   ITOPLINETAN = _[1] % 360 * d3_radians;
   return reset()
  };
  projection.rotate = function(_) {
   if (!arguments.length) return [IICAP * d3_degrees, IITOPLINETAN * d3_degrees, IICUBE * d3_degrees];
   IICAP = _[0] % 360 * d3_radians;
   IITOPLINETAN = _[1] % 360 * d3_radians;
   IICUBE = _.length > 2 ? _[2] % 360 * d3_radians : 0;
   return reset()
  };
  d3.rebind(projection, projectResample, "precision");

  function reset() {
   projectRotate = d3_geo_compose(rotate = d3_geo_rotation(IICAP, IITOPLINETAN, IICUBE), project);
   var center = project(ICAP, ITOPLINETAN);
   ICAPX = x - center[0] * k;
  ICAPY = y + center[1] * k;
   return invalidate()
  }

  function invalidate() {
   if (stream) stream.valid = false, stream = null;
   return projection
  }
  return function() {
   project = projectAt.apply(this, arguments);
   projection.invert = project.invert && invert;
   return reset()
  }
 }

 function d3_geo_projectionRadians(stream) {
  return d3_geo_transformPoint(stream, function(x, y) {
   stream.point(x * d3_radians, y * d3_radians)
  })
 }

 function d3_geo_equirectangular(ICAP, ITOPLINETAN) {
  return [ICAP, ITOPLINETAN]
 }(d3.geo.equirectangular = function() {
  return d3_geo_projection(d3_geo_equirectangular)
 }).raw = d3_geo_equirectangular.invert = d3_geo_equirectangular;
 d3.geo.rotation = function(rotate) {
  rotate = d3_geo_rotation(rotate[0] % 360 * d3_radians, rotate[1] * d3_radians, rotate.length > 2 ? rotate[2] * d3_radians : 0);

  function forward(coordinates) {
   coordinates = rotate(coordinates[0] * d3_radians, coordinates[1] * d3_radians);
   return coordinates[0] *= d3_degrees, coordinates[1] *= d3_degrees, coordinates
  }
  forward.invert = function(coordinates) {
   coordinates = rotate.invert(coordinates[0] * d3_radians, coordinates[1] * d3_radians);
   return coordinates[0] *= d3_degrees, coordinates[1] *= d3_degrees, coordinates
  };
  return forward
 };

 function d3_geo_identityRotation(ICAP, ITOPLINETAN) {
  return [ICAP > IE ? ICAP - I2 : ICAP < -IE ? ICAP + I2 : ICAP, ITOPLINETAN]
 }
 d3_geo_identityRotation.invert = d3_geo_equirectangular;

 function d3_geo_rotation(IICAP, IITOPLINETAN, IICUBE) {
  return IICAP ? IITOPLINETAN || IICUBE ? d3_geo_compose(d3_geo_rotationICAP(IICAP), d3_geo_rotationITOPLINETANICUBE(IITOPLINETAN, IICUBE)) : d3_geo_rotationICAP(IICAP) : IITOPLINETAN || IICUBE ? d3_geo_rotationITOPLINETANICUBE(IITOPLINETAN, IICUBE) : d3_geo_identityRotation
 }

 function d3_geo_forwardRotationICAP(IICAP) {
  return function(ICAP, ITOPLINETAN) {
   return ICAP += IICAP, [ICAP > IE ? ICAP - I2 : ICAP < -IE ? ICAP + I2 : ICAP, ITOPLINETAN]
  }
 }

 function d3_geo_rotationICAP(IICAP) {
  var rotation = d3_geo_forwardRotationICAP(IICAP);
  rotation.invert = d3_geo_forwardRotationICAP(-IICAP);
  return rotation
 }

 function d3_geo_rotationITOPLINETANICUBE(IITOPLINETAN, IICUBE) {
  var cosIITOPLINETAN = Math.cos(IITOPLINETAN),
   sinIITOPLINETAN = Math.sin(IITOPLINETAN),
   cosIICUBE = Math.cos(IICUBE),
   sinIICUBE = Math.sin(IICUBE);

  function rotation(ICAP, ITOPLINETAN) {
   var cosITOPLINETAN = Math.cos(ITOPLINETAN),
    x = Math.cos(ICAP) * cosITOPLINETAN,
    y = Math.sin(ICAP) * cosITOPLINETAN,
    z = Math.sin(ITOPLINETAN),
    k = z * cosIITOPLINETAN + x * sinIITOPLINETAN;
   return [Math.atan2(y * cosIICUBE - k * sinIICUBE, x * cosIITOPLINETAN - z * sinIITOPLINETAN), d3_asin(k * cosIICUBE + y * sinIICUBE)]
  }
  rotation.invert = function(ICAP, ITOPLINETAN) {
   var cosITOPLINETAN = Math.cos(ITOPLINETAN),
    x = Math.cos(ICAP) * cosITOPLINETAN,
    y = Math.sin(ICAP) * cosITOPLINETAN,
    z = Math.sin(ITOPLINETAN),
    k = z * cosIICUBE - y * sinIICUBE;
   return [Math.atan2(y * cosIICUBE + z * sinIICUBE, x * cosIITOPLINETAN + k * sinIITOPLINETAN), d3_asin(k * cosIITOPLINETAN - x * sinIITOPLINETAN)]
  };
  return rotation
 }
 d3.geo.circle = function() {
  var origin = [0, 0],
   angle, precision = 6,
   interpolate;

  function circle() {
   var center = typeof origin === "function" ? origin.apply(this, arguments) : origin,
    rotate = d3_geo_rotation(-center[0] * d3_radians, -center[1] * d3_radians, 0).invert,
    ring = [];
   interpolate(null, null, 1, {
    point: function(x, y) {
     ring.push(x = rotate(x, y));
     x[0] *= d3_degrees, x[1] *= d3_degrees
    }
   });
   return {
    type: "Polygon",
    coordinates: [ring]
   }
  }
  circle.origin = function(x) {
   if (!arguments.length) return origin;
   origin = x;
   return circle
  };
  circle.angle = function(x) {
   if (!arguments.length) return angle;
   interpolate = d3_geo_circleInterpolate((angle = +x) * d3_radians, precision * d3_radians);
   return circle
  };
  circle.precision = function(_) {
   if (!arguments.length) return precision;
   interpolate = d3_geo_circleInterpolate(angle * d3_radians, (precision = +_) * d3_radians);
   return circle
  };
  return circle.angle(90)
 };

 function d3_geo_circleInterpolate(radius, precision) {
  var cr = Math.cos(radius),
   sr = Math.sin(radius);
  return function(from, to, direction, listener) {
   var step = direction * precision;
   if (from != null) {
    from = d3_geo_circleAngle(cr, from);
    to = d3_geo_circleAngle(cr, to);
    if (direction > 0 ? from < to : from > to) from += direction * I2
   } else {
    from = radius + direction * I2;
    to = radius - .5 * step
   }
   for (var point, t = from; direction > 0 ? t > to : t < to; t -= step) {
    listener.point((point = d3_geo_spherical([cr, -sr * Math.cos(t), -sr * Math.sin(t)]))[0], point[1])
   }
  }
 }

 function d3_geo_circleAngle(cr, point) {
  var a = d3_geo_cartesian(point);
  a[0] -= cr;
  d3_geo_cartesianNormalize(a);
  var angle = d3_acos(-a[1]);
  return ((-a[2] < 0 ? -angle : angle) + 2 * Math.PI - Iu) % (2 * Math.PI)
 }
 d3.geo.distance = function(a, b) {
  var ITWOQUPTESICAP = (b[0] - a[0]) * d3_radians,
   ITOPLINETAN0 = a[1] * d3_radians,
   ITOPLINETAN1 = b[1] * d3_radians,
   sinITWOQUPTESICAP = Math.sin(ITWOQUPTESICAP),
   cosITWOQUPTESICAP = Math.cos(ITWOQUPTESICAP),
   sinITOPLINETAN0 = Math.sin(ITOPLINETAN0),
   cosITOPLINETAN0 = Math.cos(ITOPLINETAN0),
   sinITOPLINETAN1 = Math.sin(ITOPLINETAN1),
   cosITOPLINETAN1 = Math.cos(ITOPLINETAN1),
   t;
  return Math.atan2(Math.sqrt((t = cosITOPLINETAN1 * sinITWOQUPTESICAP) * t + (t = cosITOPLINETAN0 * sinITOPLINETAN1 - sinITOPLINETAN0 * cosITOPLINETAN1 * cosITWOQUPTESICAP) * t), sinITOPLINETAN0 * sinITOPLINETAN1 + cosITOPLINETAN0 * cosITOPLINETAN1 * cosITWOQUPTESICAP)
 };
 d3.geo.graticule = function() {
  var x1, x0, X1, X0, y1, y0, Y1, Y0, dx = 10,
   dy = dx,
   DX = 90,
   DY = 360,
   x, y, X, Y, precision = 2.5;

  function graticule() {
   return {
    type: "MultiLineString",
    coordinates: lines()
   }
  }

  function lines() {
   return d3.range(Math.ceil(X0 / DX) * DX, X1, DX).map(X).concat(d3.range(Math.ceil(Y0 / DY) * DY, Y1, DY).map(Y)).concat(d3.range(Math.ceil(x0 / dx) * dx, x1, dx).filter(function(x) {
    return abs(x % DX) > Iu
   }).map(x)).concat(d3.range(Math.ceil(y0 / dy) * dy, y1, dy).filter(function(y) {
    return abs(y % DY) > Iu
   }).map(y))
  }
  graticule.lines = function() {
   return lines().map(function(coordinates) {
    return {
     type: "LineString",
     coordinates: coordinates
    }
   })
  };
  graticule.outline = function() {
   return {
    type: "Polygon",
    coordinates: [X(X0).concat(Y(Y1).slice(1), X(X1).reverse().slice(1), Y(Y0).reverse().slice(1))]
   }
  };
  graticule.extent = function(_) {
   if (!arguments.length) return graticule.minorExtent();
   return graticule.majorExtent(_).minorExtent(_)
  };
  graticule.majorExtent = function(_) {
   if (!arguments.length) return [
    [X0, Y0],
    [X1, Y1]
   ];
   X0 = +_[0][0], X1 = +_[1][0];
   Y0 = +_[0][1], Y1 = +_[1][1];
   if (X0 > X1) _ = X0, X0 = X1, X1 = _;
   if (Y0 > Y1) _ = Y0, Y0 = Y1, Y1 = _;
   return graticule.precision(precision)
  };
  graticule.minorExtent = function(_) {
   if (!arguments.length) return [
    [x0, y0],
    [x1, y1]
   ];
   x0 = +_[0][0], x1 = +_[1][0];
   y0 = +_[0][1], y1 = +_[1][1];
   if (x0 > x1) _ = x0, x0 = x1, x1 = _;
   if (y0 > y1) _ = y0, y0 = y1, y1 = _;
   return graticule.precision(precision)
  };
  graticule.step = function(_) {
   if (!arguments.length) return graticule.minorStep();
   return graticule.majorStep(_).minorStep(_)
  };
  graticule.majorStep = function(_) {
   if (!arguments.length) return [DX, DY];
   DX = +_[0], DY = +_[1];
   return graticule
  };
  graticule.minorStep = function(_) {
   if (!arguments.length) return [dx, dy];
   dx = +_[0], dy = +_[1];
   return graticule
  };
  graticule.precision = function(_) {
   if (!arguments.length) return precision;
   precision = +_;
   x = d3_geo_graticuleX(y0, y1, 90);
   y = d3_geo_graticuleY(x0, x1, precision);
   X = d3_geo_graticuleX(Y0, Y1, 90);
   Y = d3_geo_graticuleY(X0, X1, precision);
   return graticule
  };
  return graticule.majorExtent([
   [-180, -90 + Iu],
   [180, 90 - Iu]
  ]).minorExtent([
   [-180, -80 - Iu],
   [180, 80 + Iu]
  ])
 };

 function d3_geo_graticuleX(y0, y1, dy) {
  var y = d3.range(y0, y1 - Iu, dy).concat(y1);
  return function(x) {
   return y.map(function(y) {
    return [x, y]
   })
  }
 }

 function d3_geo_graticuleY(x0, x1, dx) {
  var x = d3.range(x0, x1 - Iu, dx).concat(x1);
  return function(y) {
   return x.map(function(x) {
    return [x, y]
   })
  }
 }

 function d3_source(d) {
  return d.source
 }

 function d3_target(d) {
  return d.target
 }
 d3.geo.greatArc = function() {
  var source = d3_source,
   source_, target = d3_target,
   target_;

  function greatArc() {
   return {
    type: "LineString",
    coordinates: [source_ || source.apply(this, arguments), target_ || target.apply(this, arguments)]
   }
  }
  greatArc.distance = function() {
   return d3.geo.distance(source_ || source.apply(this, arguments), target_ || target.apply(this, arguments))
  };
  greatArc.source = function(_) {
   if (!arguments.length) return source;
   source = _, source_ = typeof _ === "function" ? null : _;
   return greatArc
  };
  greatArc.target = function(_) {
   if (!arguments.length) return target;
   target = _, target_ = typeof _ === "function" ? null : _;
   return greatArc
  };
  greatArc.precision = function() {
   return arguments.length ? greatArc : 0
  };
  return greatArc
 };
 d3.geo.interpolate = function(source, target) {
  return d3_geo_interpolate(source[0] * d3_radians, source[1] * d3_radians, target[0] * d3_radians, target[1] * d3_radians)
 };

 function d3_geo_interpolate(x0, y0, x1, y1) {
  var cy0 = Math.cos(y0),
   sy0 = Math.sin(y0),
   cy1 = Math.cos(y1),
   sy1 = Math.sin(y1),
   kx0 = cy0 * Math.cos(x0),
   ky0 = cy0 * Math.sin(x0),
   kx1 = cy1 * Math.cos(x1),
   ky1 = cy1 * Math.sin(x1),
   d = 2 * Math.asin(Math.sqrt(d3_haversin(y1 - y0) + cy0 * cy1 * d3_haversin(x1 - x0))),
   k = 1 / Math.sin(d);
  var interpolate = d ? function(t) {
   var B = Math.sin(t *= d) * k,
    A = Math.sin(d - t) * k,
    x = A * kx0 + B * kx1,
    y = A * ky0 + B * ky1,
    z = A * sy0 + B * sy1;
   return [Math.atan2(y, x) * d3_degrees, Math.atan2(z, Math.sqrt(x * x + y * y)) * d3_degrees]
  } : function() {
   return [x0 * d3_degrees, y0 * d3_degrees]
  };
  interpolate.distance = d;
  return interpolate
 }
 d3.geo.length = function(object) {
  d3_geo_lengthSum = 0;
  d3.geo.stream(object, d3_geo_length);
  return d3_geo_lengthSum
 };
 var d3_geo_lengthSum;
 var d3_geo_length = {
  sphere: d3_noop,
  point: d3_noop,
  lineStart: d3_geo_lengthLineStart,
  lineEnd: d3_noop,
  polygonStart: d3_noop,
  polygonEnd: d3_noop
 };

 function d3_geo_lengthLineStart() {
  var ICAP0, sinITOPLINETAN0, cosITOPLINETAN0;
  d3_geo_length.point = function(ICAP, ITOPLINETAN) {
   ICAP0 = ICAP * d3_radians, sinITOPLINETAN0 = Math.sin(ITOPLINETAN *= d3_radians), cosITOPLINETAN0 = Math.cos(ITOPLINETAN);
   d3_geo_length.point = nextPoint
  };
  d3_geo_length.lineEnd = function() {
   d3_geo_length.point = d3_geo_length.lineEnd = d3_noop
  };

  function nextPoint(ICAP, ITOPLINETAN) {
   var sinITOPLINETAN = Math.sin(ITOPLINETAN *= d3_radians),
    cosITOPLINETAN = Math.cos(ITOPLINETAN),
    t = abs((ICAP *= d3_radians) - ICAP0),
    cosITWOQUPTESICAP = Math.cos(t);
   d3_geo_lengthSum += Math.atan2(Math.sqrt((t = cosITOPLINETAN * Math.sin(t)) * t + (t = cosITOPLINETAN0 * sinITOPLINETAN - sinITOPLINETAN0 * cosITOPLINETAN * cosITWOQUPTESICAP) * t), sinITOPLINETAN0 * sinITOPLINETAN + cosITOPLINETAN0 * cosITOPLINETAN * cosITWOQUPTESICAP);
   ICAP0 = ICAP, sinITOPLINETAN0 = sinITOPLINETAN, cosITOPLINETAN0 = cosITOPLINETAN
  }
 }

 function d3_geo_azimuthal(scale, angle) {
  function azimuthal(ICAP, ITOPLINETAN) {
   var cosICAP = Math.cos(ICAP),
    cosITOPLINETAN = Math.cos(ITOPLINETAN),
    k = scale(cosICAP * cosITOPLINETAN);
   return [k * cosITOPLINETAN * Math.sin(ICAP), k * Math.sin(ITOPLINETAN)]
  }
  azimuthal.invert = function(x, y) {
   var ITOPLINE = Math.sqrt(x * x + y * y),
    c = angle(ITOPLINE),
    sinc = Math.sin(c),
    cosc = Math.cos(c);
   return [Math.atan2(x * sinc, ITOPLINE* cosc), Math.asin(ITOPLINE && y * sinc / ITOPLINE)]
  };
  return azimuthal
 }
 var d3_geo_azimuthalEqualArea = d3_geo_azimuthal(function(cosICAPcosITOPLINETAN) {
  return Math.sqrt(2 / (1 + cosICAPcosITOPLINETAN))
 }, function(ITOPLINE) {
  return 2 * Math.asin(ITOPLINE/2)
 });
 (d3.geo.azimuthalEqualArea = function() {
  return d3_geo_projection(d3_geo_azimuthalEqualArea)
 }).raw = d3_geo_azimuthalEqualArea;
 var d3_geo_azimuthalEquidistant = d3_geo_azimuthal(function(cosICAPcosITOPLINETAN) {
  var c = Math.acos(cosICAPcosITOPLINETAN);
  return c && c / Math.sin(c)
 }, d3_identity);
 (d3.geo.azimuthalEquidistant = function() {
  return d3_geo_projection(d3_geo_azimuthalEquidistant)
 }).raw = d3_geo_azimuthalEquidistant;

 function d3_geo_conicConformal(ITOPLINETAN0, ITOPLINETAN1) {
  var cosITOPLINETAN0 = Math.cos(ITOPLINETAN0),
   t = function(ITOPLINETAN) {
    return Math.tan(IE / 4 + ITOPLINETAN / 2)
   },
   n = ITOPLINETAN0 === ITOPLINETAN1 ? Math.sin(ITOPLINETAN0) : Math.log(cosITOPLINETAN0 / Math.cos(ITOPLINETAN1)) / Math.log(t(ITOPLINETAN1) / t(ITOPLINETAN0)),
   F = cosITOPLINETAN0 * Math.pow(t(ITOPLINETAN0), n) / n;
  if (!n) return d3_geo_mercator;

  function forward(ICAP, ITOPLINETAN) {
   if (F > 0) {
    if (ITOPLINETAN < -halfIE + Iu) ITOPLINETAN = -halfIE + Iu
   } else {
    if (ITOPLINETAN > halfIE - Iu) ITOPLINETAN = halfIE - Iu
   }
   var ITOPLINE= F / Math.pow(t(ITOPLINETAN), n);
   return [ITOPLINE * Math.sin(n * ICAP), F - ITOPLINE * Math.cos(n * ICAP)]
  }
  forward.invert = function(x, y) {
   var ITOPLINE0_y = F - y,
    ITOPLINE = d3_sgn(n) * Math.sqrt(x * x + ITOPLINE0_y * ITOPLINE0_y);
   return [Math.atan2(x, ITOPLINE0_y) / n, 2 * Math.atan(Math.pow(F / ITOPLINE, 1 / n)) - halfIE]
  };
  return forward
 }(d3.geo.conicConformal = function() {
  return d3_geo_conic(d3_geo_conicConformal)
 }).raw = d3_geo_conicConformal;

 function d3_geo_conicEquidistant(ITOPLINETAN0, ITOPLINETAN1) {
  var cosITOPLINETAN0 = Math.cos(ITOPLINETAN0),
   n = ITOPLINETAN0 === ITOPLINETAN1 ? Math.sin(ITOPLINETAN0) : (cosITOPLINETAN0 - Math.cos(ITOPLINETAN1)) / (ITOPLINETAN1 - ITOPLINETAN0),
   G = cosITOPLINETAN0 / n + ITOPLINETAN0;
  if (abs(n) < Iu) return d3_geo_equirectangular;

  function forward(ICAP, ITOPLINETAN) {
   var ITOPLINE = G - ITOPLINETAN;
   return [ITOPLINE*Math.sin(n * ICAP), G - ITOPLINE * Math.cos(n * ICAP)]
  }
  forward.invert = function(x, y) {
   var ITOPLINE0_y = G - y;
   return [Math.atan2(x, ITOPLINE0_y) / n, G - d3_sgn(n) * Math.sqrt(x * x + ITOPLINE0_y * ITOPLINE0_y)]
  };
  return forward
 }(d3.geo.conicEquidistant = function() {
  return d3_geo_conic(d3_geo_conicEquidistant)
 }).raw = d3_geo_conicEquidistant;
 var d3_geo_gnomonic = d3_geo_azimuthal(function(cosICAPcosITOPLINETAN) {
  return 1 / cosICAPcosITOPLINETAN
 }, Math.atan);
 (d3.geo.gnomonic = function() {
  return d3_geo_projection(d3_geo_gnomonic)
 }).raw = d3_geo_gnomonic;

 function d3_geo_mercator(ICAP, ITOPLINETAN) {
  return [ICAP, Math.log(Math.tan(IE / 4 + ITOPLINETAN / 2))]
 }
 d3_geo_mercator.invert = function(x, y) {
  return [x, 2 * Math.atan(Math.exp(y)) - halfIE]
 };

 function d3_geo_mercatorProjection(project) {
  var m = d3_geo_projection(project),
   scale = m.scale,
   translate = m.translate,
   clipExtent = m.clipExtent,
   clipAuto;
  m.scale = function() {
   var v = scale.apply(m, arguments);
   return v === m ? clipAuto ? m.clipExtent(null) : m : v
  };
  m.translate = function() {
   var v = translate.apply(m, arguments);
   return v === m ? clipAuto ? m.clipExtent(null) : m : v
  };
  m.clipExtent = function(_) {
   var v = clipExtent.apply(m, arguments);
   if (v === m) {
    if (clipAuto = _ == null) {
     var k = IE * scale(),
      t = translate();
     clipExtent([
      [t[0] - k, t[1] - k],
      [t[0] + k, t[1] + k]
     ])
    }
   } else if (clipAuto) {
    v = null
   }
   return v
  };
  return m.clipExtent(null)
 }(d3.geo.mercator = function() {
  return d3_geo_mercatorProjection(d3_geo_mercator)
 }).raw = d3_geo_mercator;
 var d3_geo_orthographic = d3_geo_azimuthal(function() {
  return 1
 }, Math.asin);
 (d3.geo.orthographic = function() {
  return d3_geo_projection(d3_geo_orthographic)
 }).raw = d3_geo_orthographic;
 var d3_geo_stereographic = d3_geo_azimuthal(function(cosICAPcosITOPLINETAN) {
  return 1 / (1 + cosICAPcosITOPLINETAN)
 }, function(ITOPLINE) {
  return 2 * Math.atan(ITOPLINE)
 });
 (d3.geo.stereographic = function() {
  return d3_geo_projection(d3_geo_stereographic)
 }).raw = d3_geo_stereographic;

 function d3_geo_transverseMercator(ICAP, ITOPLINETAN) {
  return [Math.log(Math.tan(IE / 4 + ITOPLINETAN / 2)), -ICAP]
 }
 d3_geo_transverseMercator.invert = function(x, y) {
  return [-y, 2 * Math.atan(Math.exp(x)) - halfIE]
 };
 (d3.geo.transverseMercator = function() {
  var projection = d3_geo_mercatorProjection(d3_geo_transverseMercator),
   center = projection.center,
   rotate = projection.rotate;
  projection.center = function(_) {
   return _ ? center([-_[1], _[0]]) : (_ = center(), [-_[1], _[0]])
  };
  projection.rotate = function(_) {
   return _ ? rotate([_[0], _[1], _.length > 2 ? _[2] + 90 : 90]) : (_ = rotate(), [_[0], _[1], _[2] - 90])
  };
  return projection.rotate([0, 0])
 }).raw = d3_geo_transverseMercator;
 d3.geom = {};

 function d3_geom_pointX(d) {
  return d[0]
 }

 function d3_geom_pointY(d) {
  return d[1]
 }
 d3.geom.hull = function(vertices) {
  var x = d3_geom_pointX,
   y = d3_geom_pointY;
  if (arguments.length) return hull(vertices);

  function hull(data) {
   if (data.length < 3) return [];
   var fx = d3_functor(x),
    fy = d3_functor(y),
    i, n = data.length,
    points = [],
    flippedPoints = [];
   for (i = 0; i < n; i++) {
    points.push([+fx.call(this, data[i], i), +fy.call(this, data[i], i), i])
   }
   points.sort(d3_geom_hullOrder);
   for (i = 0; i < n; i++) flippedPoints.push([points[i][0], -points[i][1]]);
   var upper = d3_geom_hullUpper(points),
    lower = d3_geom_hullUpper(flippedPoints);
   var skipLeft = lower[0] === upper[0],
    skipRight = lower[lower.length - 1] === upper[upper.length - 1],
    polygon = [];
   for (i = upper.length - 1; i >= 0; --i) polygon.push(data[points[upper[i]][2]]);
   for (i = +skipLeft; i < lower.length - skipRight; ++i) polygon.push(data[points[lower[i]][2]]);
   return polygon
  }
  hull.x = function(_) {
   return arguments.length ? (x = _, hull) : x
  };
  hull.y = function(_) {
   return arguments.length ? (y = _, hull) : y
  };
  return hull
 };

 function d3_geom_hullUpper(points) {
  var n = points.length,
   hull = [0, 1],
   hs = 2;
  for (var i = 2; i < n; i++) {
   while (hs > 1 && d3_cross2d(points[hull[hs - 2]], points[hull[hs - 1]], points[i]) <= 0) --hs;
   hull[hs++] = i
  }
  return hull.slice(0, hs)
 }

 function d3_geom_hullOrder(a, b) {
  return a[0] - b[0] || a[1] - b[1]
 }
 d3.geom.polygon = function(coordinates) {
  d3_subclass(coordinates, d3_geom_polygonPrototype);
  return coordinates
 };
 var d3_geom_polygonPrototype = d3.geom.polygon.prototype = [];
 d3_geom_polygonPrototype.area = function() {
  var i = -1,
   n = this.length,
   a, b = this[n - 1],
   area = 0;
  while (++i < n) {
   a = b;
   b = this[i];
   area += a[1] * b[0] - a[0] * b[1]
  }
  return area * .5
 };
 d3_geom_polygonPrototype.centroid = function(k) {
  var i = -1,
   n = this.length,
   x = 0,
   y = 0,
   a, b = this[n - 1],
   c;
  if (!arguments.length) k = -1 / (6 * this.area());
  while (++i < n) {
   a = b;
   b = this[i];
   c = a[0] * b[1] - b[0] * a[1];
   x += (a[0] + b[0]) * c;
   y += (a[1] + b[1]) * c
  }
  return [x * k, y * k]
 };
 d3_geom_polygonPrototype.clip = function(subject) {
  var input, closed = d3_geom_polygonClosed(subject),
   i = -1,
   n = this.length - d3_geom_polygonClosed(this),
   j, m, a = this[n - 1],
   b, c, d;
  while (++i < n) {
   input = subject.slice();
   subject.length = 0;
   b = this[i];
   c = input[(m = input.length - closed) - 1];
   j = -1;
   while (++j < m) {
    d = input[j];
    if (d3_geom_polygonInside(d, a, b)) {
     if (!d3_geom_polygonInside(c, a, b)) {
      subject.push(d3_geom_polygonIntersect(c, d, a, b))
     }
     subject.push(d)
    } else if (d3_geom_polygonInside(c, a, b)) {
     subject.push(d3_geom_polygonIntersect(c, d, a, b))
    }
    c = d
   }
   if (closed) subject.push(subject[0]);
   a = b
  }
  return subject
 };

 function d3_geom_polygonInside(p, a, b) {
  return (b[0] - a[0]) * (p[1] - a[1]) < (b[1] - a[1]) * (p[0] - a[0])
 }

 function d3_geom_polygonIntersect(c, d, a, b) {
  var x1 = c[0],
   x3 = a[0],
   x21 = d[0] - x1,
   x43 = b[0] - x3,
   y1 = c[1],
   y3 = a[1],
   y21 = d[1] - y1,
   y43 = b[1] - y3,
   ua = (x43 * (y1 - y3) - y43 * (x1 - x3)) / (y43 * x21 - x43 * y21);
  return [x1 + ua * x21, y1 + ua * y21]
 }

 function d3_geom_polygonClosed(coordinates) {
  var a = coordinates[0],
   b = coordinates[coordinates.length - 1];
  return !(a[0] - b[0] || a[1] - b[1])
 }
 var d3_geom_voronoiEdges, d3_geom_voronoiCells, d3_geom_voronoiBeaches, d3_geom_voronoiBeachPool = [],
  d3_geom_voronoiFirstCircle, d3_geom_voronoiCircles, d3_geom_voronoiCirclePool = [];

 function d3_geom_voronoiBeach() {
  d3_geom_voronoiRedBlackNode(this);
  this.edge = this.site = this.circle = null
 }

 function d3_geom_voronoiCreateBeach(site) {
  var beach = d3_geom_voronoiBeachPool.pop() || new d3_geom_voronoiBeach;
  beach.site = site;
  return beach
 }

 function d3_geom_voronoiDetachBeach(beach) {
  d3_geom_voronoiDetachCircle(beach);
  d3_geom_voronoiBeaches.remove(beach);
  d3_geom_voronoiBeachPool.push(beach);
  d3_geom_voronoiRedBlackNode(beach)
 }

 function d3_geom_voronoiRemoveBeach(beach) {
  var circle = beach.circle,
   x = circle.x,
   y = circle.cy,
   vertex = {
    x: x,
    y: y
   },
   previous = beach.P,
   next = beach.N,
   disappearing = [beach];
  d3_geom_voronoiDetachBeach(beach);
  var lArc = previous;
  while (lArc.circle && abs(x - lArc.circle.x) < Iu && abs(y - lArc.circle.cy) < Iu) {
   previous = lArc.P;
   disappearing.unshift(lArc);
   d3_geom_voronoiDetachBeach(lArc);
   lArc = previous
  }
  disappearing.unshift(lArc);
  d3_geom_voronoiDetachCircle(lArc);
  var rArc = next;
  while (rArc.circle && abs(x - rArc.circle.x) < Iu && abs(y - rArc.circle.cy) < Iu) {
   next = rArc.N;
   disappearing.push(rArc);
   d3_geom_voronoiDetachBeach(rArc);
   rArc = next
  }
  disappearing.push(rArc);
  d3_geom_voronoiDetachCircle(rArc);
  var nArcs = disappearing.length,
   iArc;
  for (iArc = 1; iArc < nArcs; ++iArc) {
   rArc = disappearing[iArc];
   lArc = disappearing[iArc - 1];
   d3_geom_voronoiSetEdgeEnd(rArc.edge, lArc.site, rArc.site, vertex)
  }
  lArc = disappearing[0];
  rArc = disappearing[nArcs - 1];
  rArc.edge = d3_geom_voronoiCreateEdge(lArc.site, rArc.site, null, vertex);
  d3_geom_voronoiAttachCircle(lArc);
  d3_geom_voronoiAttachCircle(rArc)
 }

 function d3_geom_voronoiAddBeach(site) {
  var x = site.x,
   directrix = site.y,
   lArc, rArc, dxl, dxr, node = d3_geom_voronoiBeaches._;
  while (node) {
   dxl = d3_geom_voronoiLeftBreakPoint(node, directrix) - x;
   if (dxl > Iu) node = node.L;
   else {
    dxr = x - d3_geom_voronoiRightBreakPoint(node, directrix);
    if (dxr > Iu) {
     if (!node.R) {
      lArc = node;
      break
     }
     node = node.R
    } else {
     if (dxl > -Iu) {
      lArc = node.P;
      rArc = node
     } else if (dxr > -Iu) {
      lArc = node;
      rArc = node.N
     } else {
      lArc = rArc = node
     }
     break
    }
   }
  }
  var newArc = d3_geom_voronoiCreateBeach(site);
  d3_geom_voronoiBeaches.insert(lArc, newArc);
  if (!lArc && !rArc) return;
  if (lArc === rArc) {
   d3_geom_voronoiDetachCircle(lArc);
   rArc = d3_geom_voronoiCreateBeach(lArc.site);
   d3_geom_voronoiBeaches.insert(newArc, rArc);
   newArc.edge = rArc.edge = d3_geom_voronoiCreateEdge(lArc.site, newArc.site);
   d3_geom_voronoiAttachCircle(lArc);
   d3_geom_voronoiAttachCircle(rArc);
   return
  }
  if (!rArc) {
   newArc.edge = d3_geom_voronoiCreateEdge(lArc.site, newArc.site);
   return
  }
  d3_geom_voronoiDetachCircle(lArc);
  d3_geom_voronoiDetachCircle(rArc);
  var lSite = lArc.site,
   ax = lSite.x,
   ay = lSite.y,
   bx = site.x - ax,
   by = site.y - ay,
   rSite = rArc.site,
   cx = rSite.x - ax,
   cy = rSite.y - ay,
   d = 2 * (bx * cy - by * cx),
   hb = bx * bx + by * by,
   hc = cx * cx + cy * cy,
   vertex = {
    x: (cy * hb - by * hc) / d + ax,
    y: (bx * hc - cx * hb) / d + ay
   };
  d3_geom_voronoiSetEdgeEnd(rArc.edge, lSite, rSite, vertex);
  newArc.edge = d3_geom_voronoiCreateEdge(lSite, site, null, vertex);
  rArc.edge = d3_geom_voronoiCreateEdge(site, rSite, null, vertex);
  d3_geom_voronoiAttachCircle(lArc);
  d3_geom_voronoiAttachCircle(rArc)
 }

 function d3_geom_voronoiLeftBreakPoint(arc, directrix) {
  var site = arc.site,
   rfocx = site.x,
   rfocy = site.y,
   pby2 = rfocy - directrix;
  if (!pby2) return rfocx;
  var lArc = arc.P;
  if (!lArc) return -Infinity;
  site = lArc.site;
  var lfocx = site.x,
   lfocy = site.y,
   plby2 = lfocy - directrix;
  if (!plby2) return lfocx;
  var hl = lfocx - rfocx,
   aby2 = 1 / pby2 - 1 / plby2,
   b = hl / plby2;
  if (aby2) return (-b + Math.sqrt(b * b - 2 * aby2 * (hl * hl / (-2 * plby2) - lfocy + plby2 / 2 + rfocy - pby2 / 2))) / aby2 + rfocx;
  return (rfocx + lfocx) / 2
 }

 function d3_geom_voronoiRightBreakPoint(arc, directrix) {
  var rArc = arc.N;
  if (rArc) return d3_geom_voronoiLeftBreakPoint(rArc, directrix);
  var site = arc.site;
  return site.y === directrix ? site.x : Infinity
 }

 function d3_geom_voronoiCell(site) {
  this.site = site;
  this.edges = []
 }
 d3_geom_voronoiCell.prototype.prepare = function() {
  var halfEdges = this.edges,
   iHalfEdge = halfEdges.length,
   edge;
  while (iHalfEdge--) {
   edge = halfEdges[iHalfEdge].edge;
   if (!edge.b || !edge.a) halfEdges.splice(iHalfEdge, 1)
  }
  halfEdges.sort(d3_geom_voronoiHalfEdgeOrder);
  return halfEdges.length
 };

 function d3_geom_voronoiCloseCells(extent) {
  var x0 = extent[0][0],
   x1 = extent[1][0],
   y0 = extent[0][1],
   y1 = extent[1][1],
   x2, y2, x3, y3, cells = d3_geom_voronoiCells,
   iCell = cells.length,
   cell, iHalfEdge, halfEdges, nHalfEdges, start, end;
  while (iCell--) {
   cell = cells[iCell];
   if (!cell || !cell.prepare()) continue;
   halfEdges = cell.edges;
   nHalfEdges = halfEdges.length;
   iHalfEdge = 0;
   while (iHalfEdge < nHalfEdges) {
    end = halfEdges[iHalfEdge].end(), x3 = end.x, y3 = end.y;
    start = halfEdges[++iHalfEdge % nHalfEdges].start(), x2 = start.x, y2 = start.y;
    if (abs(x3 - x2) > Iu || abs(y3 - y2) > Iu) {
     halfEdges.splice(iHalfEdge, 0, new d3_geom_voronoiHalfEdge(d3_geom_voronoiCreateBorderEdge(cell.site, end, abs(x3 - x0) < Iu && y1 - y3 > Iu ? {
      x: x0,
      y: abs(x2 - x0) < Iu ? y2 : y1
     } : abs(y3 - y1) < Iu && x1 - x3 > Iu ? {
      x: abs(y2 - y1) < Iu ? x2 : x1,
      y: y1
     } : abs(x3 - x1) < Iu && y3 - y0 > Iu ? {
      x: x1,
      y: abs(x2 - x1) < Iu ? y2 : y0
     } : abs(y3 - y0) < Iu && x3 - x0 > Iu ? {
      x: abs(y2 - y0) < Iu ? x2 : x0,
      y: y0
     } : null), cell.site, null));
     ++nHalfEdges
    }
   }
  }
 }

 function d3_geom_voronoiHalfEdgeOrder(a, b) {
  return b.angle - a.angle
 }

 function d3_geom_voronoiCircle() {
  d3_geom_voronoiRedBlackNode(this);
  this.x = this.y = this.arc = this.site = this.cy = null
 }

 function d3_geom_voronoiAttachCircle(arc) {
  var lArc = arc.P,
   rArc = arc.N;
  if (!lArc || !rArc) return;
  var lSite = lArc.site,
   cSite = arc.site,
   rSite = rArc.site;
  if (lSite === rSite) return;
  var bx = cSite.x,
   by = cSite.y,
   ax = lSite.x - bx,
   ay = lSite.y - by,
   cx = rSite.x - bx,
   cy = rSite.y - by;
  var d = 2 * (ax * cy - ay * cx);
  if (d >= -Iu2) return;
  var ha = ax * ax + ay * ay,
   hc = cx * cx + cy * cy,
   x = (cy * ha - ay * hc) / d,
   y = (ax * hc - cx * ha) / d,
   cy = y + by;
  var circle = d3_geom_voronoiCirclePool.pop() || new d3_geom_voronoiCircle;
  circle.arc = arc;
  circle.site = cSite;
  circle.x = x + bx;
  circle.y = cy + Math.sqrt(x * x + y * y);
  circle.cy = cy;
  arc.circle = circle;
  var before = null,
   node = d3_geom_voronoiCircles._;
  while (node) {
   if (circle.y < node.y || circle.y === node.y && circle.x <= node.x) {
    if (node.L) node = node.L;
    else {
     before = node.P;
     break
    }
   } else {
    if (node.R) node = node.R;
    else {
     before = node;
     break
    }
   }
  }
  d3_geom_voronoiCircles.insert(before, circle);
  if (!before) d3_geom_voronoiFirstCircle = circle
 }

 function d3_geom_voronoiDetachCircle(arc) {
  var circle = arc.circle;
  if (circle) {
   if (!circle.P) d3_geom_voronoiFirstCircle = circle.N;
   d3_geom_voronoiCircles.remove(circle);
   d3_geom_voronoiCirclePool.push(circle);
   d3_geom_voronoiRedBlackNode(circle);
   arc.circle = null
  }
 }

 function d3_geom_voronoiClipEdges(extent) {
  var edges = d3_geom_voronoiEdges,
   clip = d3_geom_clipLine(extent[0][0], extent[0][1], extent[1][0], extent[1][1]),
   i = edges.length,
   e;
  while (i--) {
   e = edges[i];
   if (!d3_geom_voronoiConnectEdge(e, extent) || !clip(e) || abs(e.a.x - e.b.x) < Iu && abs(e.a.y - e.b.y) < Iu) {
    e.a = e.b = null;
    edges.splice(i, 1)
   }
  }
 }

 function d3_geom_voronoiConnectEdge(edge, extent) {
  var vb = edge.b;
  if (vb) return true;
  var va = edge.a,
   x0 = extent[0][0],
   x1 = extent[1][0],
   y0 = extent[0][1],
   y1 = extent[1][1],
   lSite = edge.l,
   rSite = edge.r,
   lx = lSite.x,
   ly = lSite.y,
   rx = rSite.x,
   ry = rSite.y,
   fx = (lx + rx) / 2,
   fy = (ly + ry) / 2,
   fm, fb;
  if (ry === ly) {
   if (fx < x0 || fx >= x1) return;
   if (lx > rx) {
    if (!va) va = {
     x: fx,
     y: y0
    };
    else if (va.y >= y1) return;
    vb = {
     x: fx,
     y: y1
    }
   } else {
    if (!va) va = {
     x: fx,
     y: y1
    };
    else if (va.y < y0) return;
    vb = {
     x: fx,
     y: y0
    }
   }
  } else {
   fm = (lx - rx) / (ry - ly);
   fb = fy - fm * fx;
   if (fm < -1 || fm > 1) {
    if (lx > rx) {
     if (!va) va = {
      x: (y0 - fb) / fm,
      y: y0
     };
     else if (va.y >= y1) return;
     vb = {
      x: (y1 - fb) / fm,
      y: y1
     }
    } else {
     if (!va) va = {
      x: (y1 - fb) / fm,
      y: y1
     };
     else if (va.y < y0) return;
     vb = {
      x: (y0 - fb) / fm,
      y: y0
     }
    }
   } else {
    if (ly < ry) {
     if (!va) va = {
      x: x0,
      y: fm * x0 + fb
     };
     else if (va.x >= x1) return;
     vb = {
      x: x1,
      y: fm * x1 + fb
     }
    } else {
     if (!va) va = {
      x: x1,
      y: fm * x1 + fb
     };
     else if (va.x < x0) return;
     vb = {
      x: x0,
      y: fm * x0 + fb
     }
    }
   }
  }
  edge.a = va;
  edge.b = vb;
  return true
 }

 function d3_geom_voronoiEdge(lSite, rSite) {
  this.l = lSite;
  this.r = rSite;
  this.a = this.b = null
 }

 function d3_geom_voronoiCreateEdge(lSite, rSite, va, vb) {
  var edge = new d3_geom_voronoiEdge(lSite, rSite);
  d3_geom_voronoiEdges.push(edge);
  if (va) d3_geom_voronoiSetEdgeEnd(edge, lSite, rSite, va);
  if (vb) d3_geom_voronoiSetEdgeEnd(edge, rSite, lSite, vb);
  d3_geom_voronoiCells[lSite.i].edges.push(new d3_geom_voronoiHalfEdge(edge, lSite, rSite));
  d3_geom_voronoiCells[rSite.i].edges.push(new d3_geom_voronoiHalfEdge(edge, rSite, lSite));
  return edge
 }

 function d3_geom_voronoiCreateBorderEdge(lSite, va, vb) {
  var edge = new d3_geom_voronoiEdge(lSite, null);
  edge.a = va;
  edge.b = vb;
  d3_geom_voronoiEdges.push(edge);
  return edge
 }

 function d3_geom_voronoiSetEdgeEnd(edge, lSite, rSite, vertex) {
  if (!edge.a && !edge.b) {
   edge.a = vertex;
   edge.l = lSite;
   edge.r = rSite
  } else if (edge.l === rSite) {
   edge.b = vertex
  } else {
   edge.a = vertex
  }
 }

 function d3_geom_voronoiHalfEdge(edge, lSite, rSite) {
  var va = edge.a,
   vb = edge.b;
  this.edge = edge;
  this.site = lSite;
  this.angle = rSite ? Math.atan2(rSite.y - lSite.y, rSite.x - lSite.x) : edge.l === lSite ? Math.atan2(vb.x - va.x, va.y - vb.y) : Math.atan2(va.x - vb.x, vb.y - va.y)
 }
 d3_geom_voronoiHalfEdge.prototype = {
  start: function() {
   return this.edge.l === this.site ? this.edge.a : this.edge.b
  },
  end: function() {
   return this.edge.l === this.site ? this.edge.b : this.edge.a
  }
 };

 function d3_geom_voronoiRedBlackTree() {
  this._ = null
 }

 function d3_geom_voronoiRedBlackNode(node) {
  node.U = node.C = node.L = node.R = node.P = node.N = null
 }
 d3_geom_voronoiRedBlackTree.prototype = {
  insert: function(after, node) {
   var parent, grandpa, uncle;
   if (after) {
    node.P = after;
    node.N = after.N;
    if (after.N) after.N.P = node;
    after.N = node;
    if (after.R) {
     after = after.R;
     while (after.L) after = after.L;
     after.L = node
    } else {
     after.R = node
    }
    parent = after
   } else if (this._) {
    after = d3_geom_voronoiRedBlackFirst(this._);
    node.P = null;
    node.N = after;
    after.P = after.L = node;
    parent = after
   } else {
    node.P = node.N = null;
    this._ = node;
    parent = null
   }
   node.L = node.R = null;
   node.U = parent;
   node.C = true;
   after = node;
   while (parent && parent.C) {
    grandpa = parent.U;
    if (parent === grandpa.L) {
     uncle = grandpa.R;
     if (uncle && uncle.C) {
      parent.C = uncle.C = false;
      grandpa.C = true;
      after = grandpa
     } else {
      if (after === parent.R) {
       d3_geom_voronoiRedBlackRotateLeft(this, parent);
       after = parent;
       parent = after.U
      }
      parent.C = false;
      grandpa.C = true;
      d3_geom_voronoiRedBlackRotateRight(this, grandpa)
     }
    } else {
     uncle = grandpa.L;
     if (uncle && uncle.C) {
      parent.C = uncle.C = false;
      grandpa.C = true;
      after = grandpa
     } else {
      if (after === parent.L) {
       d3_geom_voronoiRedBlackRotateRight(this, parent);
       after = parent;
       parent = after.U
      }
      parent.C = false;
      grandpa.C = true;
      d3_geom_voronoiRedBlackRotateLeft(this, grandpa)
     }
    }
    parent = after.U
   }
   this._.C = false
  },
  remove: function(node) {
   if (node.N) node.N.P = node.P;
   if (node.P) node.P.N = node.N;
   node.N = node.P = null;
   var parent = node.U,
    sibling, left = node.L,
    right = node.R,
    next, red;
   if (!left) next = right;
   else if (!right) next = left;
   else next = d3_geom_voronoiRedBlackFirst(right);
   if (parent) {
    if (parent.L === node) parent.L = next;
    else parent.R = next
   } else {
    this._ = next
   }
   if (left && right) {
    red = next.C;
    next.C = node.C;
    next.L = left;
    left.U = next;
    if (next !== right) {
     parent = next.U;
     next.U = node.U;
     node = next.R;
     parent.L = node;
     next.R = right;
     right.U = next
    } else {
     next.U = parent;
     parent = next;
     node = next.R
    }
   } else {
    red = node.C;
    node = next
   }
   if (node) node.U = parent;
   if (red) return;
   if (node && node.C) {
    node.C = false;
    return
   }
   do {
    if (node === this._) break;
    if (node === parent.L) {
     sibling = parent.R;
     if (sibling.C) {
      sibling.C = false;
      parent.C = true;
      d3_geom_voronoiRedBlackRotateLeft(this, parent);
      sibling = parent.R
     }
     if (sibling.L && sibling.L.C || sibling.R && sibling.R.C) {
      if (!sibling.R || !sibling.R.C) {
       sibling.L.C = false;
       sibling.C = true;
       d3_geom_voronoiRedBlackRotateRight(this, sibling);
       sibling = parent.R
      }
      sibling.C = parent.C;
      parent.C = sibling.R.C = false;
      d3_geom_voronoiRedBlackRotateLeft(this, parent);
      node = this._;
      break
     }
    } else {
     sibling = parent.L;
     if (sibling.C) {
      sibling.C = false;
      parent.C = true;
      d3_geom_voronoiRedBlackRotateRight(this, parent);
      sibling = parent.L
     }
     if (sibling.L && sibling.L.C || sibling.R && sibling.R.C) {
      if (!sibling.L || !sibling.L.C) {
       sibling.R.C = false;
       sibling.C = true;
       d3_geom_voronoiRedBlackRotateLeft(this, sibling);
       sibling = parent.L
      }
      sibling.C = parent.C;
      parent.C = sibling.L.C = false;
      d3_geom_voronoiRedBlackRotateRight(this, parent);
      node = this._;
      break
     }
    }
    sibling.C = true;
    node = parent;
    parent = parent.U
   } while (!node.C);
   if (node) node.C = false
  }
 };

 function d3_geom_voronoiRedBlackRotateLeft(tree, node) {
  var p = node,
   q = node.R,
   parent = p.U;
  if (parent) {
   if (parent.L === p) parent.L = q;
   else parent.R = q
  } else {
   tree._ = q
  }
  q.U = parent;
  p.U = q;
  p.R = q.L;
  if (p.R) p.R.U = p;
  q.L = p
 }

 function d3_geom_voronoiRedBlackRotateRight(tree, node) {
  var p = node,
   q = node.L,
   parent = p.U;
  if (parent) {
   if (parent.L === p) parent.L = q;
   else parent.R = q
  } else {
   tree._ = q
  }
  q.U = parent;
  p.U = q;
  p.L = q.R;
  if (p.L) p.L.U = p;
  q.R = p
 }

 function d3_geom_voronoiRedBlackFirst(node) {
  while (node.L) node = node.L;
  return node
 }

 function d3_geom_voronoi(sites, bbox) {
  var site = sites.sort(d3_geom_voronoiVertexOrder).pop(),
   x0, y0, circle;
  d3_geom_voronoiEdges = [];
  d3_geom_voronoiCells = new Array(sites.length);
  d3_geom_voronoiBeaches = new d3_geom_voronoiRedBlackTree;
  d3_geom_voronoiCircles = new d3_geom_voronoiRedBlackTree;
  while (true) {
   circle = d3_geom_voronoiFirstCircle;
   if (site && (!circle || site.y < circle.y || site.y === circle.y && site.x < circle.x)) {
    if (site.x !== x0 || site.y !== y0) {
     d3_geom_voronoiCells[site.i] = new d3_geom_voronoiCell(site);
     d3_geom_voronoiAddBeach(site);
     x0 = site.x, y0 = site.y
    }
    site = sites.pop()
   } else if (circle) {
    d3_geom_voronoiRemoveBeach(circle.arc)
   } else {
    break
   }
  }
  if (bbox) d3_geom_voronoiClipEdges(bbox), d3_geom_voronoiCloseCells(bbox);
  var diagram = {
   cells: d3_geom_voronoiCells,
   edges: d3_geom_voronoiEdges
  };
  d3_geom_voronoiBeaches = d3_geom_voronoiCircles = d3_geom_voronoiEdges = d3_geom_voronoiCells = null;
  return diagram
 }

 function d3_geom_voronoiVertexOrder(a, b) {
  return b.y - a.y || b.x - a.x
 }
 d3.geom.voronoi = function(points) {
  var x = d3_geom_pointX,
   y = d3_geom_pointY,
   fx = x,
   fy = y,
   clipExtent = d3_geom_voronoiClipExtent;
  if (points) return voronoi(points);

  function voronoi(data) {
   var polygons = new Array(data.length),
    x0 = clipExtent[0][0],
    y0 = clipExtent[0][1],
    x1 = clipExtent[1][0],
    y1 = clipExtent[1][1];
   d3_geom_voronoi(sites(data), clipExtent).cells.forEach(function(cell, i) {
    var edges = cell.edges,
     site = cell.site,
     polygon = polygons[i] = edges.length ? edges.map(function(e) {
      var s = e.start();
      return [s.x, s.y]
     }) : site.x >= x0 && site.x <= x1 && site.y >= y0 && site.y <= y1 ? [
      [x0, y1],
      [x1, y1],
      [x1, y0],
      [x0, y0]
     ] : [];
    polygon.point = data[i]
   });
   return polygons
  }

  function sites(data) {
   return data.map(function(d, i) {
    return {
     x: Math.round(fx(d, i) / Iu) * Iu,
     y: Math.round(fy(d, i) / Iu) * Iu,
     i: i
    }
   })
  }
  voronoi.links = function(data) {
   return d3_geom_voronoi(sites(data)).edges.filter(function(edge) {
    return edge.l && edge.r
   }).map(function(edge) {
    return {
     source: data[edge.l.i],
     target: data[edge.r.i]
    }
   })
  };
  voronoi.triangles = function(data) {
   var triangles = [];
   d3_geom_voronoi(sites(data)).cells.forEach(function(cell, i) {
    var site = cell.site,
     edges = cell.edges.sort(d3_geom_voronoiHalfEdgeOrder),
     j = -1,
     m = edges.length,
     e0, s0, e1 = edges[m - 1].edge,
     s1 = e1.l === site ? e1.r : e1.l;
    while (++j < m) {
     e0 = e1;
     s0 = s1;
     e1 = edges[j].edge;
     s1 = e1.l === site ? e1.r : e1.l;
     if (i < s0.i && i < s1.i && d3_geom_voronoiTriangleArea(site, s0, s1) < 0) {
      triangles.push([data[i], data[s0.i], data[s1.i]])
     }
    }
   });
   return triangles
  };
  voronoi.x = function(_) {
   return arguments.length ? (fx = d3_functor(x = _), voronoi) : x
  };
  voronoi.y = function(_) {
   return arguments.length ? (fy = d3_functor(y = _), voronoi) : y
  };
  voronoi.clipExtent = function(_) {
   if (!arguments.length) return clipExtent === d3_geom_voronoiClipExtent ? null : clipExtent;
   clipExtent = _ == null ? d3_geom_voronoiClipExtent : _;
   return voronoi
  };
  voronoi.size = function(_) {
   if (!arguments.length) return clipExtent === d3_geom_voronoiClipExtent ? null : clipExtent && clipExtent[1];
   return voronoi.clipExtent(_ && [
    [0, 0], _
   ])
  };
  return voronoi
 };
 var d3_geom_voronoiClipExtent = [
  [-1e6, -1e6],
  [1e6, 1e6]
 ];

 function d3_geom_voronoiTriangleArea(a, b, c) {
  return (a.x - c.x) * (b.y - a.y) - (a.x - b.x) * (c.y - a.y)
 }
 d3.geom.delaunay = function(vertices) {
  return d3.geom.voronoi().triangles(vertices)
 };
 d3.geom.quadtree = function(points, x1, y1, x2, y2) {
  var x = d3_geom_pointX,
   y = d3_geom_pointY,
   compat;
  if (compat = arguments.length) {
   x = d3_geom_quadtreeCompatX;
   y = d3_geom_quadtreeCompatY;
   if (compat === 3) {
    y2 = y1;
    x2 = x1;
    y1 = x1 = 0
   }
   return quadtree(points)
  }

  function quadtree(data) {
   var d, fx = d3_functor(x),
    fy = d3_functor(y),
    xs, ys, i, n, x1_, y1_, x2_, y2_;
   if (x1 != null) {
    x1_ = x1, y1_ = y1, x2_ = x2, y2_ = y2
   } else {
    x2_ = y2_ = -(x1_ = y1_ = Infinity);
    xs = [], ys = [];
    n = data.length;
    if (compat)
     for (i = 0; i < n; ++i) {
      d = data[i];
      if (d.x < x1_) x1_ = d.x;
      if (d.y < y1_) y1_ = d.y;
      if (d.x > x2_) x2_ = d.x;
      if (d.y > y2_) y2_ = d.y;
      xs.push(d.x);
      ys.push(d.y)
     } else
      for (i = 0; i < n; ++i) {
       var x_ = +fx(d = data[i], i),
        y_ = +fy(d, i);
       if (x_ < x1_) x1_ = x_;
       if (y_ < y1_) y1_ = y_;
       if (x_ > x2_) x2_ = x_;
       if (y_ > y2_) y2_ = y_;
       xs.push(x_);
       ys.push(y_)
      }
   }
   var dx = x2_ - x1_,
    dy = y2_ - y1_;
   if (dx > dy) y2_ = y1_ + dx;
   else x2_ = x1_ + dy;

   function insert(n, d, x, y, x1, y1, x2, y2) {
    if (isNaN(x) || isNaN(y)) return;
    if (n.leaf) {
     var nx = n.x,
      ny = n.y;
     if (nx != null) {
      if (abs(nx - x) + abs(ny - y) < .01) {
       insertChild(n, d, x, y, x1, y1, x2, y2)
      } else {
       var nPoint = n.point;
       n.x = n.y = n.point = null;
       insertChild(n, nPoint, nx, ny, x1, y1, x2, y2);
       insertChild(n, d, x, y, x1, y1, x2, y2)
      }
     } else {
      n.x = x, n.y = y, n.point = d
     }
    } else {
     insertChild(n, d, x, y, x1, y1, x2, y2)
    }
   }

   function insertChild(n, d, x, y, x1, y1, x2, y2) {
    var sx = (x1 + x2) * .5,
     sy = (y1 + y2) * .5,
     right = x >= sx,
     bottom = y >= sy,
     i = (bottom << 1) + right;
    n.leaf = false;
    n = n.nodes[i] || (n.nodes[i] = d3_geom_quadtreeNode());
    if (right) x1 = sx;
    else x2 = sx;
    if (bottom) y1 = sy;
    else y2 = sy;
    insert(n, d, x, y, x1, y1, x2, y2)
   }
   var root = d3_geom_quadtreeNode();
   root.add = function(d) {
    insert(root, d, +fx(d, ++i), +fy(d, i), x1_, y1_, x2_, y2_)
   };
   root.visit = function(f) {
    d3_geom_quadtreeVisit(f, root, x1_, y1_, x2_, y2_)
   };
   i = -1;
   if (x1 == null) {
    while (++i < n) {
     insert(root, data[i], xs[i], ys[i], x1_, y1_, x2_, y2_)
    }--i
   } else data.forEach(root.add);
   xs = ys = data = d = null;
   return root
  }
  quadtree.x = function(_) {
   return arguments.length ? (x = _, quadtree) : x
  };
  quadtree.y = function(_) {
   return arguments.length ? (y = _, quadtree) : y
  };
  quadtree.extent = function(_) {
   if (!arguments.length) return x1 == null ? null : [
    [x1, y1],
    [x2, y2]
   ];
   if (_ == null) x1 = y1 = x2 = y2 = null;
   else x1 = +_[0][0], y1 = +_[0][1], x2 = +_[1][0], y2 = +_[1][1];
   return quadtree
  };
  quadtree.size = function(_) {
   if (!arguments.length) return x1 == null ? null : [x2 - x1, y2 - y1];
   if (_ == null) x1 = y1 = x2 = y2 = null;
   else x1 = y1 = 0, x2 = +_[0], y2 = +_[1];
   return quadtree
  };
  return quadtree
 };

 function d3_geom_quadtreeCompatX(d) {
  return d.x
 }

 function d3_geom_quadtreeCompatY(d) {
  return d.y
 }

 function d3_geom_quadtreeNode() {
  return {
   leaf: true,
   nodes: [],
   point: null,
   x: null,
   y: null
  }
 }

 function d3_geom_quadtreeVisit(f, node, x1, y1, x2, y2) {
  if (!f(node, x1, y1, x2, y2)) {
   var sx = (x1 + x2) * .5,
    sy = (y1 + y2) * .5,
    children = node.nodes;
   if (children[0]) d3_geom_quadtreeVisit(f, children[0], x1, y1, sx, sy);
   if (children[1]) d3_geom_quadtreeVisit(f, children[1], sx, y1, x2, sy);
   if (children[2]) d3_geom_quadtreeVisit(f, children[2], x1, sy, sx, y2);
   if (children[3]) d3_geom_quadtreeVisit(f, children[3], sx, sy, x2, y2)
  }
 }
 d3.interpolateRgb = d3_interpolateRgb;

 function d3_interpolateRgb(a, b) {
  a = d3.rgb(a);
  b = d3.rgb(b);
  var ar = a.r,
   ag = a.g,
   ab = a.b,
   br = b.r - ar,
   bg = b.g - ag,
   bb = b.b - ab;
  return function(t) {
   return "#" + d3_rgb_hex(Math.round(ar + br * t)) + d3_rgb_hex(Math.round(ag + bg * t)) + d3_rgb_hex(Math.round(ab + bb * t))
  }
 }
 d3.interpolateObject = d3_interpolateObject;

 function d3_interpolateObject(a, b) {
  var i = {},
   c = {},
   k;
  for (k in a) {
   if (k in b) {
    i[k] = d3_interpolate(a[k], b[k])
   } else {
    c[k] = a[k]
   }
  }
  for (k in b) {
   if (!(k in a)) {
    c[k] = b[k]
   }
  }
  return function(t) {
   for (k in i) c[k] = i[k](t);
   return c
  }
 }
 d3.interpolateNumber = d3_interpolateNumber;

 function d3_interpolateNumber(a, b) {
  b -= a = +a;
  return function(t) {
   return a + b * t
  }
 }
 d3.interpolateString = d3_interpolateString;

 function d3_interpolateString(a, b) {
  var bi = d3_interpolate_numberA.lastIndex = d3_interpolate_numberB.lastIndex = 0,
   am, bm, bs, i = -1,
   s = [],
   q = [];
  a = a + "", b = b + "";
  while ((am = d3_interpolate_numberA.exec(a)) && (bm = d3_interpolate_numberB.exec(b))) {
   if ((bs = bm.index) > bi) {
    bs = b.substring(bi, bs);
    if (s[i]) s[i] += bs;
    else s[++i] = bs
   }
   if ((am = am[0]) === (bm = bm[0])) {
    if (s[i]) s[i] += bm;
    else s[++i] = bm
   } else {
    s[++i] = null;
    q.push({
     i: i,
     x: d3_interpolateNumber(am, bm)
    })
   }
   bi = d3_interpolate_numberB.lastIndex
  }
  if (bi < b.length) {
   bs = b.substring(bi);
   if (s[i]) s[i] += bs;
   else s[++i] = bs
  }
  return s.length < 2 ? q[0] ? (b = q[0].x, function(t) {
   return b(t) + ""
  }) : function() {
   return b
  } : (b = q.length, function(t) {
   for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
   return s.join("")
  })
 }
 var d3_interpolate_numberA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  d3_interpolate_numberB = new RegExp(d3_interpolate_numberA.source, "g");
 d3.interpolate = d3_interpolate;

 function d3_interpolate(a, b) {
  var i = d3.interpolators.length,
   f;
  while (--i >= 0 && !(f = d3.interpolators[i](a, b)));
  return f
 }
 d3.interpolators = [function(a, b) {
  var t = typeof b;
  return (t === "string" ? d3_rgb_names.has(b) || /^(#|rgb\(|hsl\()/.test(b) ? d3_interpolateRgb : d3_interpolateString : b instanceof d3_Color ? d3_interpolateRgb : Array.isArray(b) ? d3_interpolateArray : t === "object" && isNaN(b) ? d3_interpolateObject : d3_interpolateNumber)(a, b)
 }];
 d3.interpolateArray = d3_interpolateArray;

 function d3_interpolateArray(a, b) {
  var x = [],
   c = [],
   na = a.length,
   nb = b.length,
   n0 = Math.min(a.length, b.length),
   i;
  for (i = 0; i < n0; ++i) x.push(d3_interpolate(a[i], b[i]));
  for (; i < na; ++i) c[i] = a[i];
  for (; i < nb; ++i) c[i] = b[i];
  return function(t) {
   for (i = 0; i < n0; ++i) c[i] = x[i](t);
   return c
  }
 }
 var d3_ease_default = function() {
  return d3_identity
 };
 var d3_ease = d3.map({
  linear: d3_ease_default,
  poly: d3_ease_poly,
  quad: function() {
   return d3_ease_quad
  },
  cubic: function() {
   return d3_ease_cubic
  },
  sin: function() {
   return d3_ease_sin
  },
  exp: function() {
   return d3_ease_exp
  },
  circle: function() {
   return d3_ease_circle
  },
  elastic: d3_ease_elastic,
  back: d3_ease_back,
  bounce: function() {
   return d3_ease_bounce
  }
 });
 var d3_ease_mode = d3.map({
  "in": d3_identity,
  out: d3_ease_reverse,
  "in-out": d3_ease_reflect,
  "out-in": function(f) {
   return d3_ease_reflect(d3_ease_reverse(f))
  }
 });
 d3.ease = function(name) {
  var i = name.indexOf("-"),
   t = i >= 0 ? name.substring(0, i) : name,
   m = i >= 0 ? name.substring(i + 1) : "in";
  t = d3_ease.get(t) || d3_ease_default;
  m = d3_ease_mode.get(m) || d3_identity;
  return d3_ease_clamp(m(t.apply(null, d3_arraySlice.call(arguments, 1))))
 };

 function d3_ease_clamp(f) {
  return function(t) {
   return t <= 0 ? 0 : t >= 1 ? 1 : f(t)
  }
 }

 function d3_ease_reverse(f) {
  return function(t) {
   return 1 - f(1 - t)
  }
 }

 function d3_ease_reflect(f) {
  return function(t) {
   return .5 * (t < .5 ? f(2 * t) : 2 - f(2 - 2 * t))
  }
 }

 function d3_ease_quad(t) {
  return t * t
 }

 function d3_ease_cubic(t) {
  return t * t * t
 }

 function d3_ease_cubicInOut(t) {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  var t2 = t * t,
   t3 = t2 * t;
  return 4 * (t < .5 ? t3 : 3 * (t - t2) + t3 - .75)
 }

 function d3_ease_poly(e) {
  return function(t) {
   return Math.pow(t, e)
  }
 }

 function d3_ease_sin(t) {
  return 1 - Math.cos(t * halfIE)
 }

 function d3_ease_exp(t) {
  return Math.pow(2, 10 * (t - 1))
 }

 function d3_ease_circle(t) {
  return 1 - Math.sqrt(1 - t * t)
 }

 function d3_ease_elastic(a, p) {
  var s;
  if (arguments.length < 2) p = .45;
  if (arguments.length) s = p / I2 * Math.asin(1 / a);
  else a = 1, s = p / 4;
  return function(t) {
   return 1 + a * Math.pow(2, -10 * t) * Math.sin((t - s) * I2 / p)
  }
 }

 function d3_ease_back(s) {
  if (!s) s = 1.70158;
  return function(t) {
   return t * t * ((s + 1) * t - s)
  }
 }

 function d3_ease_bounce(t) {
  return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
 }
 d3.interpolateHcl = d3_interpolateHcl;

 function d3_interpolateHcl(a, b) {
  a = d3.hcl(a);
  b = d3.hcl(b);
  var ah = a.h,
   ac = a.c,
   al = a.l,
   bh = b.h - ah,
   bc = b.c - ac,
   bl = b.l - al;
  if (isNaN(bc)) bc = 0, ac = isNaN(ac) ? b.c : ac;
  if (isNaN(bh)) bh = 0, ah = isNaN(ah) ? b.h : ah;
  else if (bh > 180) bh -= 360;
  else if (bh < -180) bh += 360;
  return function(t) {
   return d3_hcl_lab(ah + bh * t, ac + bc * t, al + bl * t) + ""
  }
 }
 d3.interpolateHsl = d3_interpolateHsl;

 function d3_interpolateHsl(a, b) {
  a = d3.hsl(a);
  b = d3.hsl(b);
  var ah = a.h,
   as = a.s,
   al = a.l,
   bh = b.h - ah,
   bs = b.s - as,
   bl = b.l - al;
  if (isNaN(bs)) bs = 0, as = isNaN(as) ? b.s : as;
  if (isNaN(bh)) bh = 0, ah = isNaN(ah) ? b.h : ah;
  else if (bh > 180) bh -= 360;
  else if (bh < -180) bh += 360;
  return function(t) {
   return d3_hsl_rgb(ah + bh * t, as + bs * t, al + bl * t) + ""
  }
 }
 d3.interpolateLab = d3_interpolateLab;

 function d3_interpolateLab(a, b) {
  a = d3.lab(a);
  b = d3.lab(b);
  var al = a.l,
   aa = a.a,
   ab = a.b,
   bl = b.l - al,
   ba = b.a - aa,
   bb = b.b - ab;
  return function(t) {
   return d3_lab_rgb(al + bl * t, aa + ba * t, ab + bb * t) + ""
  }
 }
 d3.interpolateRound = d3_interpolateRound;

 function d3_interpolateRound(a, b) {
  b -= a;
  return function(t) {
   return Math.round(a + b * t)
  }
 }
 d3.transform = function(string) {
  var g = d3_document.createElementNS(d3.ns.prefix.svg, "g");
  return (d3.transform = function(string) {
   if (string != null) {
    g.setAttribute("transform", string);
    var t = g.transform.baseVal.consolidate()
   }
   return new d3_transform(t ? t.matrix : d3_transformIdentity)
  })(string)
 };

 function d3_transform(m) {
  var r0 = [m.a, m.b],
   r1 = [m.c, m.d],
   kx = d3_transformNormalize(r0),
   kz = d3_transformDot(r0, r1),
   ky = d3_transformNormalize(d3_transformCombine(r1, r0, -kz)) || 0;
  if (r0[0] * r1[1] < r1[0] * r0[1]) {
   r0[0] *= -1;
   r0[1] *= -1;
   kx *= -1;
   kz *= -1
  }
  this.rotate = (kx ? Math.atan2(r0[1], r0[0]) : Math.atan2(-r1[0], r1[1])) * d3_degrees;
  this.translate = [m.e, m.f];
  this.scale = [kx, ky];
  this.skew = ky ? Math.atan2(kz, ky) * d3_degrees : 0
 }
 d3_transform.prototype.toString = function() {
  return "translate(" + this.translate + ")rotate(" + this.rotate + ")skewX(" + this.skew + ")scale(" + this.scale + ")"
 };

 function d3_transformDot(a, b) {
  return a[0] * b[0] + a[1] * b[1]
 }

 function d3_transformNormalize(a) {
  var k = Math.sqrt(d3_transformDot(a, a));
  if (k) {
   a[0] /= k;
   a[1] /= k
  }
  return k
 }

 function d3_transformCombine(a, b, k) {
  a[0] += k * b[0];
  a[1] += k * b[1];
  return a
 }
 var d3_transformIdentity = {
  a: 1,
  b: 0,
  c: 0,
  d: 1,
  e: 0,
  f: 0
 };
 d3.interpolateTransform = d3_interpolateTransform;

 function d3_interpolateTransform(a, b) {
  var s = [],
   q = [],
   n, A = d3.transform(a),
   B = d3.transform(b),
   ta = A.translate,
   tb = B.translate,
   ra = A.rotate,
   rb = B.rotate,
   wa = A.skew,
   wb = B.skew,
   ka = A.scale,
   kb = B.scale;
  if (ta[0] != tb[0] || ta[1] != tb[1]) {
   s.push("translate(", null, ",", null, ")");
   q.push({
    i: 1,
    x: d3_interpolateNumber(ta[0], tb[0])
   }, {
    i: 3,
    x: d3_interpolateNumber(ta[1], tb[1])
   })
  } else if (tb[0] || tb[1]) {
   s.push("translate(" + tb + ")")
  } else {
   s.push("")
  }
  if (ra != rb) {
   if (ra - rb > 180) rb += 360;
   else if (rb - ra > 180) ra += 360;
   q.push({
    i: s.push(s.pop() + "rotate(", null, ")") - 2,
    x: d3_interpolateNumber(ra, rb)
   })
  } else if (rb) {
   s.push(s.pop() + "rotate(" + rb + ")")
  }
  if (wa != wb) {
   q.push({
    i: s.push(s.pop() + "skewX(", null, ")") - 2,
    x: d3_interpolateNumber(wa, wb)
   })
  } else if (wb) {
   s.push(s.pop() + "skewX(" + wb + ")")
  }
  if (ka[0] != kb[0] || ka[1] != kb[1]) {
   n = s.push(s.pop() + "scale(", null, ",", null, ")");
   q.push({
    i: n - 4,
    x: d3_interpolateNumber(ka[0], kb[0])
   }, {
    i: n - 2,
    x: d3_interpolateNumber(ka[1], kb[1])
   })
  } else if (kb[0] != 1 || kb[1] != 1) {
   s.push(s.pop() + "scale(" + kb + ")")
  }
  n = q.length;
  return function(t) {
   var i = -1,
    o;
   while (++i < n) s[(o = q[i]).i] = o.x(t);
   return s.join("")
  }
 }

 function d3_uninterpolateNumber(a, b) {
  b = b - (a = +a) ? 1 / (b - a) : 0;
  return function(x) {
   return (x - a) * b
  }
 }

 function d3_uninterpolateClamp(a, b) {
  b = b - (a = +a) ? 1 / (b - a) : 0;
  return function(x) {
   return Math.max(0, Math.min(1, (x - a) * b))
  }
 }
 d3.layout = {};
 d3.layout.bundle = function() {
  return function(links) {
   var paths = [],
    i = -1,
    n = links.length;
   while (++i < n) paths.push(d3_layout_bundlePath(links[i]));
   return paths
  }
 };

 function d3_layout_bundlePath(link) {
  var start = link.source,
   end = link.target,
   lca = d3_layout_bundleLeastCommonAncestor(start, end),
   points = [start];
  while (start !== lca) {
   start = start.parent;
   points.push(start)
  }
  var k = points.length;
  while (end !== lca) {
   points.splice(k, 0, end);
   end = end.parent
  }
  return points
 }

 function d3_layout_bundleAncestors(node) {
  var ancestors = [],
   parent = node.parent;
  while (parent != null) {
   ancestors.push(node);
   node = parent;
   parent = parent.parent
  }
  ancestors.push(node);
  return ancestors
 }

 function d3_layout_bundleLeastCommonAncestor(a, b) {
  if (a === b) return a;
  var aNodes = d3_layout_bundleAncestors(a),
   bNodes = d3_layout_bundleAncestors(b),
   aNode = aNodes.pop(),
   bNode = bNodes.pop(),
   sharedNode = null;
  while (aNode === bNode) {
   sharedNode = aNode;
   aNode = aNodes.pop();
   bNode = bNodes.pop()
  }
  return sharedNode
 }
 d3.layout.chord = function() {
  var chord = {},
   chords, groups, matrix, n, padding = 0,
   sortGroups, sortSubgroups, sortChords;

  function relayout() {
   var subgroups = {},
    groupSums = [],
    groupIndex = d3.range(n),
    subgroupIndex = [],
    k, x, x0, i, j;
   chords = [];
   groups = [];
   k = 0, i = -1;
   while (++i < n) {
    x = 0, j = -1;
    while (++j < n) {
     x += matrix[i][j]
    }
    groupSums.push(x);
    subgroupIndex.push(d3.range(n));
    k += x
   }
   if (sortGroups) {
    groupIndex.sort(function(a, b) {
     return sortGroups(groupSums[a], groupSums[b])
    })
   }
   if (sortSubgroups) {
    subgroupIndex.forEach(function(d, i) {
     d.sort(function(a, b) {
      return sortSubgroups(matrix[i][a], matrix[i][b])
     })
    })
   }
   k = (I2 - padding * n) / k;
   x = 0, i = -1;
   while (++i < n) {
    x0 = x, j = -1;
    while (++j < n) {
     var di = groupIndex[i],
      dj = subgroupIndex[di][j],
      v = matrix[di][dj],
      a0 = x,
      a1 = x += v * k;
     subgroups[di + "-" + dj] = {
      index: di,
      subindex: dj,
      startAngle: a0,
      endAngle: a1,
      value: v
     }
    }
    groups[di] = {
     index: di,
     startAngle: x0,
     endAngle: x,
     value: (x - x0) / k
    };
    x += padding
   }
   i = -1;
   while (++i < n) {
    j = i - 1;
    while (++j < n) {
     var source = subgroups[i + "-" + j],
      target = subgroups[j + "-" + i];
     if (source.value || target.value) {
      chords.push(source.value < target.value ? {
       source: target,
       target: source
      } : {
       source: source,
       target: target
      })
     }
    }
   }
   if (sortChords) resort()
  }

  function resort() {
   chords.sort(function(a, b) {
    return sortChords((a.source.value + a.target.value) / 2, (b.source.value + b.target.value) / 2)
   })
  }
  chord.matrix = function(x) {
   if (!arguments.length) return matrix;
   n = (matrix = x) && matrix.length;
   chords = groups = null;
   return chord
  };
  chord.padding = function(x) {
   if (!arguments.length) return padding;
   padding = x;
   chords = groups = null;
   return chord
  };
  chord.sortGroups = function(x) {
   if (!arguments.length) return sortGroups;
   sortGroups = x;
   chords = groups = null;
   return chord
  };
  chord.sortSubgroups = function(x) {
   if (!arguments.length) return sortSubgroups;
   sortSubgroups = x;
   chords = null;
   return chord
  };
  chord.sortChords = function(x) {
   if (!arguments.length) return sortChords;
   sortChords = x;
   if (chords) resort();
   return chord
  };
  chord.chords = function() {
   if (!chords) relayout();
   return chords
  };
  chord.groups = function() {
   if (!groups) relayout();
   return groups
  };
  return chord
 };
 d3.layout.force = function() {
  var force = {},
   event = d3.dispatch("start", "tick", "end"),
   size = [1, 1],
   drag, alpha, friction = .9,
   linkDistance = d3_layout_forceLinkDistance,
   linkStrength = d3_layout_forceLinkStrength,
   charge = -30,
   chargeDistance2 = d3_layout_forceChargeDistance2,
   gravity = .1,
   theta2 = .64,
   nodes = [],
   links = [],
   distances, strengths, charges;

  function repulse(node) {
   return function(quad, x1, _, x2) {
    if (quad.point !== node) {
     var dx = quad.cx - node.x,
      dy = quad.cy - node.y,
      dw = x2 - x1,
      dn = dx * dx + dy * dy;
     if (dw * dw / theta2 < dn) {
      if (dn < chargeDistance2) {
       var k = quad.charge / dn;
       node.px -= dx * k;
       node.py -= dy * k
      }
      return true
     }
     if (quad.point && dn && dn < chargeDistance2) {
      var k = quad.pointCharge / dn;
      node.px -= dx * k;
      node.py -= dy * k
     }
    }
    return !quad.charge
   }
  }
  force.tick = function() {
   if ((alpha *= .99) < .005) {
    event.end({
     type: "end",
     alpha: alpha = 0
    });
    return true
   }
   var n = nodes.length,
    m = links.length,
    q, i, o, s, t, l, k, x, y;
   for (i = 0; i < m; ++i) {
    o = links[i];
    s = o.source;
    t = o.target;
    x = t.x - s.x;
    y = t.y - s.y;
    if (l = x * x + y * y) {
     l = alpha * strengths[i] * ((l = Math.sqrt(l)) - distances[i]) / l;
     x *= l;
     y *= l;
     t.x -= x * (k = s.weight / (t.weight + s.weight));
     t.y -= y * k;
     s.x += x * (k = 1 - k);
     s.y += y * k
    }
   }
   if (k = alpha * gravity) {
    x = size[0] / 2;
    y = size[1] / 2;
    i = -1;
    if (k)
     while (++i < n) {
      o = nodes[i];
      o.x += (x - o.x) * k;
      o.y += (y - o.y) * k
     }
   }
   if (charge) {
    d3_layout_forceAccumulate(q = d3.geom.quadtree(nodes), alpha, charges);
    i = -1;
    while (++i < n) {
     if (!(o = nodes[i]).fixed) {
      q.visit(repulse(o))
     }
    }
   }
   i = -1;
   while (++i < n) {
    o = nodes[i];
    if (o.fixed) {
     o.x = o.px;
     o.y = o.py
    } else {
     o.x -= (o.px - (o.px = o.x)) * friction;
     o.y -= (o.py - (o.py = o.y)) * friction
    }
   }
   event.tick({
    type: "tick",
    alpha: alpha
   })
  };
  force.nodes = function(x) {
   if (!arguments.length) return nodes;
   nodes = x;
   return force
  };
  force.links = function(x) {
   if (!arguments.length) return links;
   links = x;
   return force
  };
  force.size = function(x) {
   if (!arguments.length) return size;
   size = x;
   return force
  };
  force.linkDistance = function(x) {
   if (!arguments.length) return linkDistance;
   linkDistance = typeof x === "function" ? x : +x;
   return force
  };
  force.distance = force.linkDistance;
  force.linkStrength = function(x) {
   if (!arguments.length) return linkStrength;
   linkStrength = typeof x === "function" ? x : +x;
   return force
  };
  force.friction = function(x) {
   if (!arguments.length) return friction;
   friction = +x;
   return force
  };
  force.charge = function(x) {
   if (!arguments.length) return charge;
   charge = typeof x === "function" ? x : +x;
   return force
  };
  force.chargeDistance = function(x) {
   if (!arguments.length) return Math.sqrt(chargeDistance2);
   chargeDistance2 = x * x;
   return force
  };
  force.gravity = function(x) {
   if (!arguments.length) return gravity;
   gravity = +x;
   return force
  };
  force.theta = function(x) {
   if (!arguments.length) return Math.sqrt(theta2);
   theta2 = x * x;
   return force
  };
  force.alpha = function(x) {
   if (!arguments.length) return alpha;
   x = +x;
   if (alpha) {
    if (x > 0) alpha = x;
    else alpha = 0
   } else if (x > 0) {
    event.start({
     type: "start",
     alpha: alpha = x
    });
    d3.timer(force.tick)
   }
   return force
  };
  force.start = function() {
   var i, n = nodes.length,
    m = links.length,
    w = size[0],
    h = size[1],
    neighbors, o;
   for (i = 0; i < n; ++i) {
    (o = nodes[i]).index = i;
    o.weight = 0
   }
   for (i = 0; i < m; ++i) {
    o = links[i];
    if (typeof o.source == "number") o.source = nodes[o.source];
    if (typeof o.target == "number") o.target = nodes[o.target];
    ++o.source.weight;
    ++o.target.weight
   }
   for (i = 0; i < n; ++i) {
    o = nodes[i];
    if (isNaN(o.x)) o.x = position("x", w);
    if (isNaN(o.y)) o.y = position("y", h);
    if (isNaN(o.px)) o.px = o.x;
    if (isNaN(o.py)) o.py = o.y
   }
   distances = [];
   if (typeof linkDistance === "function")
    for (i = 0; i < m; ++i) distances[i] = +linkDistance.call(this, links[i], i);
   else
    for (i = 0; i < m; ++i) distances[i] = linkDistance;
   strengths = [];
   if (typeof linkStrength === "function")
    for (i = 0; i < m; ++i) strengths[i] = +linkStrength.call(this, links[i], i);
   else
    for (i = 0; i < m; ++i) strengths[i] = linkStrength;
   charges = [];
   if (typeof charge === "function")
    for (i = 0; i < n; ++i) charges[i] = +charge.call(this, nodes[i], i);
   else
    for (i = 0; i < n; ++i) charges[i] = charge;

   function position(dimension, size) {
    if (!neighbors) {
     neighbors = new Array(n);
     for (j = 0; j < n; ++j) {
      neighbors[j] = []
     }
     for (j = 0; j < m; ++j) {
      var o = links[j];
      neighbors[o.source.index].push(o.target);
      neighbors[o.target.index].push(o.source)
     }
    }
    var candidates = neighbors[i],
     j = -1,
     m = candidates.length,
     x;
    while (++j < m)
     if (!isNaN(x = candidates[j][dimension])) return x;
    return Math.random() * size
   }
   return force.resume()
  };
  force.resume = function() {
   return force.alpha(.1)
  };
  force.stop = function() {
   return force.alpha(0)
  };
  force.drag = function() {
   if (!drag) drag = d3.behavior.drag().origin(d3_identity).on("dragstart.force", d3_layout_forceDragstart).on("drag.force", dragmove).on("dragend.force", d3_layout_forceDragend);
   if (!arguments.length) return drag;
   this.on("mouseover.force", d3_layout_forceMouseover).on("mouseout.force", d3_layout_forceMouseout).call(drag)
  };

  function dragmove(d) {
   d.px = d3.event.x, d.py = d3.event.y;
   force.resume()
  }
  return d3.rebind(force, event, "on")
 };

 function d3_layout_forceDragstart(d) {
  d.fixed |= 2
 }

 function d3_layout_forceDragend(d) {
  d.fixed &= ~6
 }

 function d3_layout_forceMouseover(d) {
  d.fixed |= 4;
  d.px = d.x, d.py = d.y
 }

 function d3_layout_forceMouseout(d) {
  d.fixed &= ~4
 }

 function d3_layout_forceAccumulate(quad, alpha, charges) {
  var cx = 0,
   cy = 0;
  quad.charge = 0;
  if (!quad.leaf) {
   var nodes = quad.nodes,
    n = nodes.length,
    i = -1,
    c;
   while (++i < n) {
    c = nodes[i];
    if (c == null) continue;
    d3_layout_forceAccumulate(c, alpha, charges);
    quad.charge += c.charge;
    cx += c.charge * c.cx;
    cy += c.charge * c.cy
   }
  }
  if (quad.point) {
   if (!quad.leaf) {
    quad.point.x += Math.random() - .5;
    quad.point.y += Math.random() - .5
   }
   var k = alpha * charges[quad.point.index];
   quad.charge += quad.pointCharge = k;
   cx += k * quad.point.x;
   cy += k * quad.point.y
  }
  quad.cx = cx / quad.charge;
  quad.cy = cy / quad.charge
 }
 var d3_layout_forceLinkDistance = 20,
  d3_layout_forceLinkStrength = 1,
  d3_layout_forceChargeDistance2 = Infinity;
 d3.layout.hierarchy = function() {
  var sort = d3_layout_hierarchySort,
   children = d3_layout_hierarchyChildren,
   value = d3_layout_hierarchyValue;

  function recurse(node, depth, nodes) {
   var childs = children.call(hierarchy, node, depth);
   node.depth = depth;
   nodes.push(node);
   if (childs && (n = childs.length)) {
    var i = -1,
     n, c = node.children = new Array(n),
     v = 0,
     j = depth + 1,
     d;
    while (++i < n) {
     d = c[i] = recurse(childs[i], j, nodes);
     d.parent = node;
     v += d.value
    }
    if (sort) c.sort(sort);
    if (value) node.value = v
   } else {
    delete node.children;
    if (value) {
     node.value = +value.call(hierarchy, node, depth) || 0
    }
   }
   return node
  }

  function revalue(node, depth) {
   var children = node.children,
    v = 0;
   if (children && (n = children.length)) {
    var i = -1,
     n, j = depth + 1;
    while (++i < n) v += revalue(children[i], j)
   } else if (value) {
    v = +value.call(hierarchy, node, depth) || 0
   }
   if (value) node.value = v;
   return v
  }

  function hierarchy(d) {
   var nodes = [];
   recurse(d, 0, nodes);
   return nodes
  }
  hierarchy.sort = function(x) {
   if (!arguments.length) return sort;
   sort = x;
   return hierarchy
  };
  hierarchy.children = function(x) {
   if (!arguments.length) return children;
   children = x;
   return hierarchy
  };
  hierarchy.value = function(x) {
   if (!arguments.length) return value;
   value = x;
   return hierarchy
  };
  hierarchy.revalue = function(root) {
   revalue(root, 0);
   return root
  };
  return hierarchy
 };

 function d3_layout_hierarchyRebind(object, hierarchy) {
  d3.rebind(object, hierarchy, "sort", "children", "value");
  object.nodes = object;
  object.links = d3_layout_hierarchyLinks;
  return object
 }

 function d3_layout_hierarchyChildren(d) {
  return d.children
 }

 function d3_layout_hierarchyValue(d) {
  return d.value
 }

 function d3_layout_hierarchySort(a, b) {
  return b.value - a.value
 }

 function d3_layout_hierarchyLinks(nodes) {
  return d3.merge(nodes.map(function(parent) {
   return (parent.children || []).map(function(child) {
    return {
     source: parent,
     target: child
    }
   })
  }))
 }
 d3.layout.partition = function() {
  var hierarchy = d3.layout.hierarchy(),
   size = [1, 1];

  function position(node, x, dx, dy) {
   var children = node.children;
   node.x = x;
   node.y = node.depth * dy;
   node.dx = dx;
   node.dy = dy;
   if (children && (n = children.length)) {
    var i = -1,
     n, c, d;
    dx = node.value ? dx / node.value : 0;
    while (++i < n) {
     position(c = children[i], x, d = c.value * dx, dy);
     x += d
    }
   }
  }

  function depth(node) {
   var children = node.children,
    d = 0;
   if (children && (n = children.length)) {
    var i = -1,
     n;
    while (++i < n) d = Math.max(d, depth(children[i]))
   }
   return 1 + d
  }

  function partition(d, i) {
   var nodes = hierarchy.call(this, d, i);
   position(nodes[0], 0, size[0], size[1] / depth(nodes[0]));
   return nodes
  }
  partition.size = function(x) {
   if (!arguments.length) return size;
   size = x;
   return partition
  };
  return d3_layout_hierarchyRebind(partition, hierarchy)
 };
 d3.layout.pie = function() {
  var value = Number,
   sort = d3_layout_pieSortByValue,
   startAngle = 0,
   endAngle = I2;

  function pie(data) {
   var values = data.map(function(d, i) {
    return +value.call(pie, d, i)
   });
   var a = +(typeof startAngle === "function" ? startAngle.apply(this, arguments) : startAngle);
   var k = ((typeof endAngle === "function" ? endAngle.apply(this, arguments) : endAngle) - a) / d3.sum(values);
   var index = d3.range(data.length);
   if (sort != null) index.sort(sort === d3_layout_pieSortByValue ? function(i, j) {
    return values[j] - values[i]
   } : function(i, j) {
    return sort(data[i], data[j])
   });
   var arcs = [];
   index.forEach(function(i) {
    var d;
    arcs[i] = {
     data: data[i],
     value: d = values[i],
     startAngle: a,
     endAngle: a += d * k
    }
   });
   return arcs
  }
  pie.value = function(x) {
   if (!arguments.length) return value;
   value = x;
   return pie
  };
  pie.sort = function(x) {
   if (!arguments.length) return sort;
   sort = x;
   return pie
  };
  pie.startAngle = function(x) {
   if (!arguments.length) return startAngle;
   startAngle = x;
   return pie
  };
  pie.endAngle = function(x) {
   if (!arguments.length) return endAngle;
   endAngle = x;
   return pie
  };
  return pie
 };
 var d3_layout_pieSortByValue = {};
 d3.layout.stack = function() {
  var values = d3_identity,
   order = d3_layout_stackOrderDefault,
   offset = d3_layout_stackOffsetZero,
   out = d3_layout_stackOut,
   x = d3_layout_stackX,
   y = d3_layout_stackY;

  function stack(data, index) {
   var series = data.map(function(d, i) {
    return values.call(stack, d, i)
   });
   var points = series.map(function(d) {
    return d.map(function(v, i) {
     return [x.call(stack, v, i), y.call(stack, v, i)]
    })
   });
   var orders = order.call(stack, points, index);
   series = d3.permute(series, orders);
   points = d3.permute(points, orders);
   var offsets = offset.call(stack, points, index);
   var n = series.length,
    m = series[0].length,
    i, j, o;
   for (j = 0; j < m; ++j) {
    out.call(stack, series[0][j], o = offsets[j], points[0][j][1]);
    for (i = 1; i < n; ++i) {
     out.call(stack, series[i][j], o += points[i - 1][j][1], points[i][j][1])
    }
   }
   return data
  }
  stack.values = function(x) {
   if (!arguments.length) return values;
   values = x;
   return stack
  };
  stack.order = function(x) {
   if (!arguments.length) return order;
   order = typeof x === "function" ? x : d3_layout_stackOrders.get(x) || d3_layout_stackOrderDefault;
   return stack
  };
  stack.offset = function(x) {
   if (!arguments.length) return offset;
   offset = typeof x === "function" ? x : d3_layout_stackOffsets.get(x) || d3_layout_stackOffsetZero;
   return stack
  };
  stack.x = function(z) {
   if (!arguments.length) return x;
   x = z;
   return stack
  };
  stack.y = function(z) {
   if (!arguments.length) return y;
   y = z;
   return stack
  };
  stack.out = function(z) {
   if (!arguments.length) return out;
   out = z;
   return stack
  };
  return stack
 };

 function d3_layout_stackX(d) {
  return d.x
 }

 function d3_layout_stackY(d) {
  return d.y
 }

 function d3_layout_stackOut(d, y0, y) {
  d.y0 = y0;
  d.y = y
 }
 var d3_layout_stackOrders = d3.map({
  "inside-out": function(data) {
   var n = data.length,
    i, j, max = data.map(d3_layout_stackMaxIndex),
    sums = data.map(d3_layout_stackReduceSum),
    index = d3.range(n).sort(function(a, b) {
     return max[a] - max[b]
    }),
    top = 0,
    bottom = 0,
    tops = [],
    bottoms = [];
   for (i = 0; i < n; ++i) {
    j = index[i];
    if (top < bottom) {
     top += sums[j];
     tops.push(j)
    } else {
     bottom += sums[j];
     bottoms.push(j)
    }
   }
   return bottoms.reverse().concat(tops)
  },
  reverse: function(data) {
   return d3.range(data.length).reverse()
  },
  "default": d3_layout_stackOrderDefault
 });
 var d3_layout_stackOffsets = d3.map({
  silhouette: function(data) {
   var n = data.length,
    m = data[0].length,
    sums = [],
    max = 0,
    i, j, o, y0 = [];
   for (j = 0; j < m; ++j) {
    for (i = 0, o = 0; i < n; i++) o += data[i][j][1];
    if (o > max) max = o;
    sums.push(o)
   }
   for (j = 0; j < m; ++j) {
    y0[j] = (max - sums[j]) / 2
   }
   return y0
  },
  wiggle: function(data) {
   var n = data.length,
    x = data[0],
    m = x.length,
    i, j, k, s1, s2, s3, dx, o, o0, y0 = [];
   y0[0] = o = o0 = 0;
   for (j = 1; j < m; ++j) {
    for (i = 0, s1 = 0; i < n; ++i) s1 += data[i][j][1];
    for (i = 0, s2 = 0, dx = x[j][0] - x[j - 1][0]; i < n; ++i) {
     for (k = 0, s3 = (data[i][j][1] - data[i][j - 1][1]) / (2 * dx); k < i; ++k) {
      s3 += (data[k][j][1] - data[k][j - 1][1]) / dx
     }
     s2 += s3 * data[i][j][1]
    }
    y0[j] = o -= s1 ? s2 / s1 * dx : 0;
    if (o < o0) o0 = o
   }
   for (j = 0; j < m; ++j) y0[j] -= o0;
   return y0
  },
  expand: function(data) {
   var n = data.length,
    m = data[0].length,
    k = 1 / n,
    i, j, o, y0 = [];
   for (j = 0; j < m; ++j) {
    for (i = 0, o = 0; i < n; i++) o += data[i][j][1];
    if (o)
     for (i = 0; i < n; i++) data[i][j][1] /= o;
    else
     for (i = 0; i < n; i++) data[i][j][1] = k
   }
   for (j = 0; j < m; ++j) y0[j] = 0;
   return y0
  },
  zero: d3_layout_stackOffsetZero
 });

 function d3_layout_stackOrderDefault(data) {
  return d3.range(data.length)
 }

 function d3_layout_stackOffsetZero(data) {
  var j = -1,
   m = data[0].length,
   y0 = [];
  while (++j < m) y0[j] = 0;
  return y0
 }

 function d3_layout_stackMaxIndex(array) {
  var i = 1,
   j = 0,
   v = array[0][1],
   k, n = array.length;
  for (; i < n; ++i) {
   if ((k = array[i][1]) > v) {
    j = i;
    v = k
   }
  }
  return j
 }

 function d3_layout_stackReduceSum(d) {
  return d.reduce(d3_layout_stackSum, 0)
 }

 function d3_layout_stackSum(p, d) {
  return p + d[1]
 }
 d3.layout.histogram = function() {
  var frequency = true,
   valuer = Number,
   ranger = d3_layout_histogramRange,
   binner = d3_layout_histogramBinSturges;

  function histogram(data, i) {
   var bins = [],
    values = data.map(valuer, this),
    range = ranger.call(this, values, i),
    thresholds = binner.call(this, range, values, i),
    bin, i = -1,
    n = values.length,
    m = thresholds.length - 1,
    k = frequency ? 1 : 1 / n,
    x;
   while (++i < m) {
    bin = bins[i] = [];
    bin.dx = thresholds[i + 1] - (bin.x = thresholds[i]);
    bin.y = 0
   }
   if (m > 0) {
    i = -1;
    while (++i < n) {
     x = values[i];
     if (x >= range[0] && x <= range[1]) {
      bin = bins[d3.bisect(thresholds, x, 1, m) - 1];
      bin.y += k;
      bin.push(data[i])
     }
    }
   }
   return bins
  }
  histogram.value = function(x) {
   if (!arguments.length) return valuer;
   valuer = x;
   return histogram
  };
  histogram.range = function(x) {
   if (!arguments.length) return ranger;
   ranger = d3_functor(x);
   return histogram
  };
  histogram.bins = function(x) {
   if (!arguments.length) return binner;
   binner = typeof x === "number" ? function(range) {
    return d3_layout_histogramBinFixed(range, x)
   } : d3_functor(x);
   return histogram
  };
  histogram.frequency = function(x) {
   if (!arguments.length) return frequency;
   frequency = !!x;
   return histogram
  };
  return histogram
 };

 function d3_layout_histogramBinSturges(range, values) {
  return d3_layout_histogramBinFixed(range, Math.ceil(Math.log(values.length) / Math.LN2 + 1))
 }

 function d3_layout_histogramBinFixed(range, n) {
  var x = -1,
   b = +range[0],
   m = (range[1] - b) / n,
   f = [];
  while (++x <= n) f[x] = m * x + b;
  return f
 }

 function d3_layout_histogramRange(values) {
  return [d3.min(values), d3.max(values)]
 }
 d3.layout.tree = function() {
  var hierarchy = d3.layout.hierarchy().sort(null).value(null),
   separation = d3_layout_treeSeparation,
   size = [1, 1],
   nodeSize = false;

  function tree(d, i) {
   var nodes = hierarchy.call(this, d, i),
    root = nodes[0];

   function firstWalk(node, previousSibling) {
    var children = node.children,
     layout = node._tree;
    if (children && (n = children.length)) {
     var n, firstChild = children[0],
      previousChild, ancestor = firstChild,
      child, i = -1;
     while (++i < n) {
      child = children[i];
      firstWalk(child, previousChild);
      ancestor = apportion(child, previousChild, ancestor);
      previousChild = child
     }
     d3_layout_treeShift(node);
     var midpoint = .5 * (firstChild._tree.prelim + child._tree.prelim);
     if (previousSibling) {
      layout.prelim = previousSibling._tree.prelim + separation(node, previousSibling);
      layout.mod = layout.prelim - midpoint
     } else {
      layout.prelim = midpoint
     }
    } else {
     if (previousSibling) {
      layout.prelim = previousSibling._tree.prelim + separation(node, previousSibling)
     }
    }
   }

   function secondWalk(node, x) {
    node.x = node._tree.prelim + x;
    var children = node.children;
    if (children && (n = children.length)) {
     var i = -1,
      n;
     x += node._tree.mod;
     while (++i < n) {
      secondWalk(children[i], x)
     }
    }
   }

   function apportion(node, previousSibling, ancestor) {
    if (previousSibling) {
     var vip = node,
      vop = node,
      vim = previousSibling,
      vom = node.parent.children[0],
      sip = vip._tree.mod,
      sop = vop._tree.mod,
      sim = vim._tree.mod,
      som = vom._tree.mod,
      shift;
     while (vim = d3_layout_treeRight(vim), vip = d3_layout_treeLeft(vip), vim && vip) {
      vom = d3_layout_treeLeft(vom);
      vop = d3_layout_treeRight(vop);
      vop._tree.ancestor = node;
      shift = vim._tree.prelim + sim - vip._tree.prelim - sip + separation(vim, vip);
      if (shift > 0) {
       d3_layout_treeMove(d3_layout_treeAncestor(vim, node, ancestor), node, shift);
       sip += shift;
       sop += shift
      }
      sim += vim._tree.mod;
      sip += vip._tree.mod;
      som += vom._tree.mod;
      sop += vop._tree.mod
     }
     if (vim && !d3_layout_treeRight(vop)) {
      vop._tree.thread = vim;
      vop._tree.mod += sim - sop
     }
     if (vip && !d3_layout_treeLeft(vom)) {
      vom._tree.thread = vip;
      vom._tree.mod += sip - som;
      ancestor = node
     }
    }
    return ancestor
   }
   d3_layout_treeVisitAfter(root, function(node, previousSibling) {
    node._tree = {
     ancestor: node,
     prelim: 0,
     mod: 0,
     change: 0,
     shift: 0,
     number: previousSibling ? previousSibling._tree.number + 1 : 0
    }
   });
   firstWalk(root);
   secondWalk(root, -root._tree.prelim);
   var left = d3_layout_treeSearch(root, d3_layout_treeLeftmost),
    right = d3_layout_treeSearch(root, d3_layout_treeRightmost),
    deep = d3_layout_treeSearch(root, d3_layout_treeDeepest),
    x0 = left.x - separation(left, right) / 2,
    x1 = right.x + separation(right, left) / 2,
    y1 = deep.depth || 1;
   d3_layout_treeVisitAfter(root, nodeSize ? function(node) {
    node.x *= size[0];
    node.y = node.depth * size[1];
    delete node._tree
   } : function(node) {
    node.x = (node.x - x0) / (x1 - x0) * size[0];
    node.y = node.depth / y1 * size[1];
    delete node._tree
   });
   return nodes
  }
  tree.separation = function(x) {
   if (!arguments.length) return separation;
   separation = x;
   return tree
  };
  tree.size = function(x) {
   if (!arguments.length) return nodeSize ? null : size;
   nodeSize = (size = x) == null;
   return tree
  };
  tree.nodeSize = function(x) {
   if (!arguments.length) return nodeSize ? size : null;
   nodeSize = (size = x) != null;
   return tree
  };
  return d3_layout_hierarchyRebind(tree, hierarchy)
 };

 function d3_layout_treeSeparation(a, b) {
  return a.parent == b.parent ? 1 : 2
 }

 function d3_layout_treeLeft(node) {
  var children = node.children;
  return children && children.length ? children[0] : node._tree.thread
 }

 function d3_layout_treeRight(node) {
  var children = node.children,
   n;
  return children && (n = children.length) ? children[n - 1] : node._tree.thread
 }

 function d3_layout_treeSearch(node, compare) {
  var children = node.children;
  if (children && (n = children.length)) {
   var child, n, i = -1;
   while (++i < n) {
    if (compare(child = d3_layout_treeSearch(children[i], compare), node) > 0) {
     node = child
    }
   }
  }
  return node
 }

 function d3_layout_treeRightmost(a, b) {
  return a.x - b.x
 }

 function d3_layout_treeLeftmost(a, b) {
  return b.x - a.x
 }

 function d3_layout_treeDeepest(a, b) {
  return a.depth - b.depth
 }

 function d3_layout_treeVisitAfter(node, callback) {
  function visit(node, previousSibling) {
   var children = node.children;
   if (children && (n = children.length)) {
    var child, previousChild = null,
     i = -1,
     n;
    while (++i < n) {
     child = children[i];
     visit(child, previousChild);
     previousChild = child
    }
   }
   callback(node, previousSibling)
  }
  visit(node, null)
 }

 function d3_layout_treeShift(node) {
  var shift = 0,
   change = 0,
   children = node.children,
   i = children.length,
   child;
  while (--i >= 0) {
   child = children[i]._tree;
   child.prelim += shift;
   child.mod += shift;
   shift += child.shift + (change += child.change)
  }
 }

 function d3_layout_treeMove(ancestor, node, shift) {
  ancestor = ancestor._tree;
  node = node._tree;
  var change = shift / (node.number - ancestor.number);
  ancestor.change += change;
  node.change -= change;
  node.shift += shift;
  node.prelim += shift;
  node.mod += shift
 }

 function d3_layout_treeAncestor(vim, node, ancestor) {
  return vim._tree.ancestor.parent == node.parent ? vim._tree.ancestor : ancestor
 }
 d3.layout.pack = function() {
  var hierarchy = d3.layout.hierarchy().sort(d3_layout_packSort),
   padding = 0,
   size = [1, 1],
   radius;

  function pack(d, i) {
   var nodes = hierarchy.call(this, d, i),
    root = nodes[0],
    w = size[0],
    h = size[1],
    r = radius == null ? Math.sqrt : typeof radius === "function" ? radius : function() {
     return radius
    };
   root.x = root.y = 0;
   d3_layout_treeVisitAfter(root, function(d) {
    d.r = +r(d.value)
   });
   d3_layout_treeVisitAfter(root, d3_layout_packSiblings);
   if (padding) {
    var dr = padding * (radius ? 1 : Math.max(2 * root.r / w, 2 * root.r / h)) / 2;
    d3_layout_treeVisitAfter(root, function(d) {
     d.r += dr
    });
    d3_layout_treeVisitAfter(root, d3_layout_packSiblings);
    d3_layout_treeVisitAfter(root, function(d) {
     d.r -= dr
    })
   }
   d3_layout_packTransform(root, w / 2, h / 2, radius ? 1 : 1 / Math.max(2 * root.r / w, 2 * root.r / h));
   return nodes
  }
  pack.size = function(_) {
   if (!arguments.length) return size;
   size = _;
   return pack
  };
  pack.radius = function(_) {
   if (!arguments.length) return radius;
   radius = _ == null || typeof _ === "function" ? _ : +_;
   return pack
  };
  pack.padding = function(_) {
   if (!arguments.length) return padding;
   padding = +_;
   return pack
  };
  return d3_layout_hierarchyRebind(pack, hierarchy)
 };

 function d3_layout_packSort(a, b) {
  return a.value - b.value
 }

 function d3_layout_packInsert(a, b) {
  var c = a._pack_next;
  a._pack_next = b;
  b._pack_prev = a;
  b._pack_next = c;
  c._pack_prev = b
 }

 function d3_layout_packSplice(a, b) {
  a._pack_next = b;
  b._pack_prev = a
 }

 function d3_layout_packIntersects(a, b) {
  var dx = b.x - a.x,
   dy = b.y - a.y,
   dr = a.r + b.r;
  return .999 * dr * dr > dx * dx + dy * dy
 }

 function d3_layout_packSiblings(node) {
  if (!(nodes = node.children) || !(n = nodes.length)) return;
  var nodes, xMin = Infinity,
   xMax = -Infinity,
   yMin = Infinity,
   yMax = -Infinity,
   a, b, c, i, j, k, n;

  function bound(node) {
   xMin = Math.min(node.x - node.r, xMin);
   xMax = Math.max(node.x + node.r, xMax);
   yMin = Math.min(node.y - node.r, yMin);
   yMax = Math.max(node.y + node.r, yMax)
  }
  nodes.forEach(d3_layout_packLink);
  a = nodes[0];
  a.x = -a.r;
  a.y = 0;
  bound(a);
  if (n > 1) {
   b = nodes[1];
   b.x = b.r;
   b.y = 0;
   bound(b);
   if (n > 2) {
    c = nodes[2];
    d3_layout_packPlace(a, b, c);
    bound(c);
    d3_layout_packInsert(a, c);
    a._pack_prev = c;
    d3_layout_packInsert(c, b);
    b = a._pack_next;
    for (i = 3; i < n; i++) {
     d3_layout_packPlace(a, b, c = nodes[i]);
     var isect = 0,
      s1 = 1,
      s2 = 1;
     for (j = b._pack_next; j !== b; j = j._pack_next, s1++) {
      if (d3_layout_packIntersects(j, c)) {
       isect = 1;
       break
      }
     }
     if (isect == 1) {
      for (k = a._pack_prev; k !== j._pack_prev; k = k._pack_prev, s2++) {
       if (d3_layout_packIntersects(k, c)) {
        break
       }
      }
     }
     if (isect) {
      if (s1 < s2 || s1 == s2 && b.r < a.r) d3_layout_packSplice(a, b = j);
      else d3_layout_packSplice(a = k, b);
      i--
     } else {
      d3_layout_packInsert(a, c);
      b = c;
      bound(c)
     }
    }
   }
  }
  var cx = (xMin + xMax) / 2,
   cy = (yMin + yMax) / 2,
   cr = 0;
  for (i = 0; i < n; i++) {
   c = nodes[i];
   c.x -= cx;
   c.y -= cy;
   cr = Math.max(cr, c.r + Math.sqrt(c.x * c.x + c.y * c.y))
  }
  node.r = cr;
  nodes.forEach(d3_layout_packUnlink)
 }

 function d3_layout_packLink(node) {
  node._pack_next = node._pack_prev = node
 }

 function d3_layout_packUnlink(node) {
  delete node._pack_next;
  delete node._pack_prev
 }

 function d3_layout_packTransform(node, x, y, k) {
  var children = node.children;
  node.x = x += k * node.x;
  node.y = y += k * node.y;
  node.r *= k;
  if (children) {
   var i = -1,
    n = children.length;
   while (++i < n) d3_layout_packTransform(children[i], x, y, k)
  }
 }

 function d3_layout_packPlace(a, b, c) {
  var db = a.r + c.r,
   dx = b.x - a.x,
   dy = b.y - a.y;
  if (db && (dx || dy)) {
   var da = b.r + c.r,
    dc = dx * dx + dy * dy;
   da *= da;
   db *= db;
   var x = .5 + (db - da) / (2 * dc),
    y = Math.sqrt(Math.max(0, 2 * da * (db + dc) - (db -= dc) * db - da * da)) / (2 * dc);
   c.x = a.x + x * dx + y * dy;
   c.y = a.y + x * dy - y * dx
  } else {
   c.x = a.x + db;
   c.y = a.y
  }
 }
 d3.layout.cluster = function() {
  var hierarchy = d3.layout.hierarchy().sort(null).value(null),
   separation = d3_layout_treeSeparation,
   size = [1, 1],
   nodeSize = false;

  function cluster(d, i) {
   var nodes = hierarchy.call(this, d, i),
    root = nodes[0],
    previousNode, x = 0;
   d3_layout_treeVisitAfter(root, function(node) {
    var children = node.children;
    if (children && children.length) {
     node.x = d3_layout_clusterX(children);
     node.y = d3_layout_clusterY(children)
    } else {
     node.x = previousNode ? x += separation(node, previousNode) : 0;
     node.y = 0;
     previousNode = node
    }
   });
   var left = d3_layout_clusterLeft(root),
    right = d3_layout_clusterRight(root),
    x0 = left.x - separation(left, right) / 2,
    x1 = right.x + separation(right, left) / 2;
   d3_layout_treeVisitAfter(root, nodeSize ? function(node) {
    node.x = (node.x - root.x) * size[0];
    node.y = (root.y - node.y) * size[1]
   } : function(node) {
    node.x = (node.x - x0) / (x1 - x0) * size[0];
    node.y = (1 - (root.y ? node.y / root.y : 1)) * size[1]
   });
   return nodes
  }
  cluster.separation = function(x) {
   if (!arguments.length) return separation;
   separation = x;
   return cluster
  };
  cluster.size = function(x) {
   if (!arguments.length) return nodeSize ? null : size;
   nodeSize = (size = x) == null;
   return cluster
  };
  cluster.nodeSize = function(x) {
   if (!arguments.length) return nodeSize ? size : null;
   nodeSize = (size = x) != null;
   return cluster
  };
  return d3_layout_hierarchyRebind(cluster, hierarchy)
 };

 function d3_layout_clusterY(children) {
  return 1 + d3.max(children, function(child) {
   return child.y
  })
 }

 function d3_layout_clusterX(children) {
  return children.reduce(function(x, child) {
   return x + child.x
  }, 0) / children.length
 }

 function d3_layout_clusterLeft(node) {
  var children = node.children;
  return children && children.length ? d3_layout_clusterLeft(children[0]) : node
 }

 function d3_layout_clusterRight(node) {
  var children = node.children,
   n;
  return children && (n = children.length) ? d3_layout_clusterRight(children[n - 1]) : node
 }
 d3.layout.treemap = function() {
  var hierarchy = d3.layout.hierarchy(),
   round = Math.round,
   size = [1, 1],
   padding = null,
   pad = d3_layout_treemapPadNull,
   sticky = false,
   stickies, mode = "squarify",
   ratio = .5 * (1 + Math.sqrt(5));

  function scale(children, k) {
   var i = -1,
    n = children.length,
    child, area;
   while (++i < n) {
    area = (child = children[i]).value * (k < 0 ? 0 : k);
    child.area = isNaN(area) || area <= 0 ? 0 : area
   }
  }

  function squarify(node) {
   var children = node.children;
   if (children && children.length) {
    var rect = pad(node),
     row = [],
     remaining = children.slice(),
     child, best = Infinity,
     score, u = mode === "slice" ? rect.dx : mode === "dice" ? rect.dy : mode === "slice-dice" ? node.depth & 1 ? rect.dy : rect.dx : Math.min(rect.dx, rect.dy),
     n;
    scale(remaining, rect.dx * rect.dy / node.value);
    row.area = 0;
    while ((n = remaining.length) > 0) {
     row.push(child = remaining[n - 1]);
     row.area += child.area;
     if (mode !== "squarify" || (score = worst(row, u)) <= best) {
      remaining.pop();
      best = score
     } else {
      row.area -= row.pop().area;
      position(row, u, rect, false);
      u = Math.min(rect.dx, rect.dy);
      row.length = row.area = 0;
      best = Infinity
     }
    }
    if (row.length) {
     position(row, u, rect, true);
     row.length = row.area = 0
    }
    children.forEach(squarify)
   }
  }

  function stickify(node) {
   var children = node.children;
   if (children && children.length) {
    var rect = pad(node),
     remaining = children.slice(),
     child, row = [];
    scale(remaining, rect.dx * rect.dy / node.value);
    row.area = 0;
    while (child = remaining.pop()) {
     row.push(child);
     row.area += child.area;
     if (child.z != null) {
      position(row, child.z ? rect.dx : rect.dy, rect, !remaining.length);
      row.length = row.area = 0
     }
    }
    children.forEach(stickify)
   }
  }

  function worst(row, u) {
   var s = row.area,
    r, rmax = 0,
    rmin = Infinity,
    i = -1,
    n = row.length;
   while (++i < n) {
    if (!(r = row[i].area)) continue;
    if (r < rmin) rmin = r;
    if (r > rmax) rmax = r
   }
   s *= s;
   u *= u;
   return s ? Math.max(u * rmax * ratio / s, s / (u * rmin * ratio)) : Infinity
  }

  function position(row, u, rect, flush) {
   var i = -1,
    n = row.length,
    x = rect.x,
    y = rect.y,
    v = u ? round(row.area / u) : 0,
    o;
   if (u == rect.dx) {
    if (flush || v > rect.dy) v = rect.dy;
    while (++i < n) {
     o = row[i];
     o.x = x;
     o.y = y;
     o.dy = v;
     x += o.dx = Math.min(rect.x + rect.dx - x, v ? round(o.area / v) : 0)
    }
    o.z = true;
    o.dx += rect.x + rect.dx - x;
    rect.y += v;
    rect.dy -= v
   } else {
    if (flush || v > rect.dx) v = rect.dx;
    while (++i < n) {
     o = row[i];
     o.x = x;
     o.y = y;
     o.dx = v;
     y += o.dy = Math.min(rect.y + rect.dy - y, v ? round(o.area / v) : 0)
    }
    o.z = false;
    o.dy += rect.y + rect.dy - y;
    rect.x += v;
    rect.dx -= v
   }
  }

  function treemap(d) {
   var nodes = stickies || hierarchy(d),
    root = nodes[0];
   root.x = 0;
   root.y = 0;
   root.dx = size[0];
   root.dy = size[1];
   if (stickies) hierarchy.revalue(root);
   scale([root], root.dx * root.dy / root.value);
   (stickies ? stickify : squarify)(root);
   if (sticky) stickies = nodes;
   return nodes
  }
  treemap.size = function(x) {
   if (!arguments.length) return size;
   size = x;
   return treemap
  };
  treemap.padding = function(x) {
   if (!arguments.length) return padding;

   function padFunction(node) {
    var p = x.call(treemap, node, node.depth);
    return p == null ? d3_layout_treemapPadNull(node) : d3_layout_treemapPad(node, typeof p === "number" ? [p, p, p, p] : p)
   }

   function padConstant(node) {
    return d3_layout_treemapPad(node, x)
   }
   var type;
   pad = (padding = x) == null ? d3_layout_treemapPadNull : (type = typeof x) === "function" ? padFunction : type === "number" ? (x = [x, x, x, x], padConstant) : padConstant;
   return treemap
  };
  treemap.round = function(x) {
   if (!arguments.length) return round != Number;
   round = x ? Math.round : Number;
   return treemap
  };
  treemap.sticky = function(x) {
   if (!arguments.length) return sticky;
   sticky = x;
   stickies = null;
   return treemap
  };
  treemap.ratio = function(x) {
   if (!arguments.length) return ratio;
   ratio = x;
   return treemap
  };
  treemap.mode = function(x) {
   if (!arguments.length) return mode;
   mode = x + "";
   return treemap
  };
  return d3_layout_hierarchyRebind(treemap, hierarchy)
 };

 function d3_layout_treemapPadNull(node) {
  return {
   x: node.x,
   y: node.y,
   dx: node.dx,
   dy: node.dy
  }
 }

 function d3_layout_treemapPad(node, padding) {
  var x = node.x + padding[3],
   y = node.y + padding[0],
   dx = node.dx - padding[1] - padding[3],
   dy = node.dy - padding[0] - padding[2];
  if (dx < 0) {
   x += dx / 2;
   dx = 0
  }
  if (dy < 0) {
   y += dy / 2;
   dy = 0
  }
  return {
   x: x,
   y: y,
   dx: dx,
   dy: dy
  }
 }
 d3.random = {
  normal: function(Au, s) {
   var n = arguments.length;
   if (n < 2) s = 1;
   if (n < 1) Au = 0;
   return function() {
    var x, y, r;
    do {
     x = Math.random() * 2 - 1;
     y = Math.random() * 2 - 1;
     r = x * x + y * y
    } while (!r || r > 1);
    return Au + s * x * Math.sqrt(-2 * Math.log(r) / r)
   }
  },
  logNormal: function() {
   var random = d3.random.normal.apply(d3, arguments);
   return function() {
    return Math.exp(random())
   }
  },
  bates: function(m) {
   var random = d3.random.irwinHall(m);
   return function() {
    return random() / m
   }
  },
  irwinHall: function(m) {
   return function() {
    for (var s = 0, j = 0; j < m; j++) s += Math.random();
    return s
   }
  }
 };
 d3.scale = {};

 function d3_scaleExtent(domain) {
  var start = domain[0],
   stop = domain[domain.length - 1];
  return start < stop ? [start, stop] : [stop, start]
 }

 function d3_scaleRange(scale) {
  return scale.rangeExtent ? scale.rangeExtent() : d3_scaleExtent(scale.range())
 }

 function d3_scale_bilinear(domain, range, uninterpolate, interpolate) {
  var u = uninterpolate(domain[0], domain[1]),
   i = interpolate(range[0], range[1]);
  return function(x) {
   return i(u(x))
  }
 }

 function d3_scale_nice(domain, nice) {
  var i0 = 0,
   i1 = domain.length - 1,
   x0 = domain[i0],
   x1 = domain[i1],
   dx;
  if (x1 < x0) {
   dx = i0, i0 = i1, i1 = dx;
   dx = x0, x0 = x1, x1 = dx
  }
  domain[i0] = nice.floor(x0);
  domain[i1] = nice.ceil(x1);
  return domain
 }

 function d3_scale_niceStep(step) {
  return step ? {
   floor: function(x) {
    return Math.floor(x / step) * step
   },
   ceil: function(x) {
    return Math.ceil(x / step) * step
   }
  } : d3_scale_niceIdentity
 }
 var d3_scale_niceIdentity = {
  floor: d3_identity,
  ceil: d3_identity
 };

 function d3_scale_polylinear(domain, range, uninterpolate, interpolate) {
  var u = [],
   i = [],
   j = 0,
   k = Math.min(domain.length, range.length) - 1;
  if (domain[k] < domain[0]) {
   domain = domain.slice().reverse();
   range = range.slice().reverse()
  }
  while (++j <= k) {
   u.push(uninterpolate(domain[j - 1], domain[j]));
   i.push(interpolate(range[j - 1], range[j]))
  }
  return function(x) {
   var j = d3.bisect(domain, x, 1, k) - 1;
   return i[j](u[j](x))
  }
 }
 d3.scale.linear = function() {
  return d3_scale_linear([0, 1], [0, 1], d3_interpolate, false)
 };

 function d3_scale_linear(domain, range, interpolate, clamp) {
  var output, input;

  function rescale() {
   var linear = Math.min(domain.length, range.length) > 2 ? d3_scale_polylinear : d3_scale_bilinear,
    uninterpolate = clamp ? d3_uninterpolateClamp : d3_uninterpolateNumber;
   output = linear(domain, range, uninterpolate, interpolate);
   input = linear(range, domain, uninterpolate, d3_interpolate);
   return scale
  }

  function scale(x) {
   return output(x)
  }
  scale.invert = function(y) {
   return input(y)
  };
  scale.domain = function(x) {
   if (!arguments.length) return domain;
   domain = x.map(Number);
   return rescale()
  };
  scale.range = function(x) {
   if (!arguments.length) return range;
   range = x;
   return rescale()
  };
  scale.rangeRound = function(x) {
   return scale.range(x).interpolate(d3_interpolateRound)
  };
  scale.clamp = function(x) {
   if (!arguments.length) return clamp;
   clamp = x;
   return rescale()
  };
  scale.interpolate = function(x) {
   if (!arguments.length) return interpolate;
   interpolate = x;
   return rescale()
  };
  scale.ticks = function(m) {
   return d3_scale_linearTicks(domain, m)
  };
  scale.tickFormat = function(m, format) {
   return d3_scale_linearTickFormat(domain, m, format)
  };
  scale.nice = function(m) {
   d3_scale_linearNice(domain, m);
   return rescale()
  };
  scale.copy = function() {
   return d3_scale_linear(domain, range, interpolate, clamp)
  };
  return rescale()
 }

 function d3_scale_linearRebind(scale, linear) {
  return d3.rebind(scale, linear, "range", "rangeRound", "interpolate", "clamp")
 }

 function d3_scale_linearNice(domain, m) {
  return d3_scale_nice(domain, d3_scale_niceStep(d3_scale_linearTickRange(domain, m)[2]))
 }

 function d3_scale_linearTickRange(domain, m) {
  if (m == null) m = 10;
  var extent = d3_scaleExtent(domain),
   span = extent[1] - extent[0],
   step = Math.pow(10, Math.floor(Math.log(span / m) / Math.LN10)),
   err = m / span * step;
  if (err <= .15) step *= 10;
  else if (err <= .35) step *= 5;
  else if (err <= .75) step *= 2;
  extent[0] = Math.ceil(extent[0] / step) * step;
  extent[1] = Math.floor(extent[1] / step) * step + step * .5;
  extent[2] = step;
  return extent
 }

 function d3_scale_linearTicks(domain, m) {
  return d3.range.apply(d3, d3_scale_linearTickRange(domain, m))
 }

 function d3_scale_linearTickFormat(domain, m, format) {
  var range = d3_scale_linearTickRange(domain, m);
  if (format) {
   var match = d3_format_re.exec(format);
   match.shift();
   if (match[8] === "s") {
    var prefix = d3.formatPrefix(Math.max(abs(range[0]), abs(range[1])));
    if (!match[7]) match[7] = "." + d3_scale_linearPrecision(prefix.scale(range[2]));
    match[8] = "f";
    format = d3.format(match.join(""));
    return function(d) {
     return format(prefix.scale(d)) + prefix.symbol
    }
   }
   if (!match[7]) match[7] = "." + d3_scale_linearFormatPrecision(match[8], range);
   format = match.join("")
  } else {
   format = ",." + d3_scale_linearPrecision(range[2]) + "f"
  }
  return d3.format(format)
 }
 var d3_scale_linearFormatSignificant = {
  s: 1,
  g: 1,
  p: 1,
  r: 1,
  e: 1
 };

 function d3_scale_linearPrecision(value) {
  return -Math.floor(Math.log(value) / Math.LN10 + .01)
 }

 function d3_scale_linearFormatPrecision(type, range) {
  var p = d3_scale_linearPrecision(range[2]);
  return type in d3_scale_linearFormatSignificant ? Math.abs(p - d3_scale_linearPrecision(Math.max(abs(range[0]), abs(range[1])))) + +(type !== "e") : p - (type === "%") * 2
 }
 d3.scale.log = function() {
  return d3_scale_log(d3.scale.linear().domain([0, 1]), 10, true, [1, 10])
 };

 function d3_scale_log(linear, base, positive, domain) {
  function log(x) {
   return (positive ? Math.log(x < 0 ? 0 : x) : -Math.log(x > 0 ? 0 : -x)) / Math.log(base)
  }

  function pow(x) {
   return positive ? Math.pow(base, x) : -Math.pow(base, -x)
  }

  function scale(x) {
   return linear(log(x))
  }
  scale.invert = function(x) {
   return pow(linear.invert(x))
  };
  scale.domain = function(x) {
   if (!arguments.length) return domain;
   positive = x[0] >= 0;
   linear.domain((domain = x.map(Number)).map(log));
   return scale
  };
  scale.base = function(_) {
   if (!arguments.length) return base;
   base = +_;
   linear.domain(domain.map(log));
   return scale
  };
  scale.nice = function() {
   var niced = d3_scale_nice(domain.map(log), positive ? Math : d3_scale_logNiceNegative);
   linear.domain(niced);
   domain = niced.map(pow);
   return scale
  };
  scale.ticks = function() {
   var extent = d3_scaleExtent(domain),
    ticks = [],
    u = extent[0],
    v = extent[1],
    i = Math.floor(log(u)),
    j = Math.ceil(log(v)),
    n = base % 1 ? 2 : base;
   if (isFinite(j - i)) {
    if (positive) {
     for (; i < j; i++)
      for (var k = 1; k < n; k++) ticks.push(pow(i) * k);
     ticks.push(pow(i))
    } else {
     ticks.push(pow(i));
     for (; i++ < j;)
      for (var k = n - 1; k > 0; k--) ticks.push(pow(i) * k)
    }
    for (i = 0; ticks[i] < u; i++) {}
    for (j = ticks.length; ticks[j - 1] > v; j--) {}
    ticks = ticks.slice(i, j)
   }
   return ticks
  };
  scale.tickFormat = function(n, format) {
   if (!arguments.length) return d3_scale_logFormat;
   if (arguments.length < 2) format = d3_scale_logFormat;
   else if (typeof format !== "function") format = d3.format(format);
   var k = Math.max(.1, n / scale.ticks().length),
    f = positive ? (e = 1e-12, Math.ceil) : (e = -1e-12, Math.floor),
    e;
   return function(d) {
    return d / pow(f(log(d) + e)) <= k ? format(d) : ""
   }
  };
  scale.copy = function() {
   return d3_scale_log(linear.copy(), base, positive, domain)
  };
  return d3_scale_linearRebind(scale, linear)
 }
 var d3_scale_logFormat = d3.format(".0e"),
  d3_scale_logNiceNegative = {
   floor: function(x) {
    return -Math.ceil(-x)
   },
   ceil: function(x) {
    return -Math.floor(-x)
   }
  };
 d3.scale.pow = function() {
  return d3_scale_pow(d3.scale.linear(), 1, [0, 1])
 };

 function d3_scale_pow(linear, exponent, domain) {
  var powp = d3_scale_powPow(exponent),
   powb = d3_scale_powPow(1 / exponent);

  function scale(x) {
   return linear(powp(x))
  }
  scale.invert = function(x) {
   return powb(linear.invert(x))
  };
  scale.domain = function(x) {
   if (!arguments.length) return domain;
   linear.domain((domain = x.map(Number)).map(powp));
   return scale
  };
  scale.ticks = function(m) {
   return d3_scale_linearTicks(domain, m)
  };
  scale.tickFormat = function(m, format) {
   return d3_scale_linearTickFormat(domain, m, format)
  };
  scale.nice = function(m) {
   return scale.domain(d3_scale_linearNice(domain, m))
  };
  scale.exponent = function(x) {
   if (!arguments.length) return exponent;
   powp = d3_scale_powPow(exponent = x);
   powb = d3_scale_powPow(1 / exponent);
   linear.domain(domain.map(powp));
   return scale
  };
  scale.copy = function() {
   return d3_scale_pow(linear.copy(), exponent, domain)
  };
  return d3_scale_linearRebind(scale, linear)
 }

 function d3_scale_powPow(e) {
  return function(x) {
   return x < 0 ? -Math.pow(-x, e) : Math.pow(x, e)
  }
 }
 d3.scale.sqrt = function() {
  return d3.scale.pow().exponent(.5)
 };
 d3.scale.ordinal = function() {
  return d3_scale_ordinal([], {
   t: "range",
   a: [
    []
   ]
  })
 };

 function d3_scale_ordinal(domain, ranger) {
  var index, range, rangeBand;

  function scale(x) {
   return range[((index.get(x) || (ranger.t === "range" ? index.set(x, domain.push(x)) : NaN)) - 1) % range.length]
  }

  function steps(start, step) {
   return d3.range(domain.length).map(function(i) {
    return start + step * i
   })
  }
  scale.domain = function(x) {
   if (!arguments.length) return domain;
   domain = [];
   index = new d3_Map;
   var i = -1,
    n = x.length,
    xi;
   while (++i < n)
    if (!index.has(xi = x[i])) index.set(xi, domain.push(xi));
   return scale[ranger.t].apply(scale, ranger.a)
  };
  scale.range = function(x) {
   if (!arguments.length) return range;
   range = x;
   rangeBand = 0;
   ranger = {
    t: "range",
    a: arguments
   };
   return scale
  };
  scale.rangePoints = function(x, padding) {
   if (arguments.length < 2) padding = 0;
   var start = x[0],
    stop = x[1],
    step = (stop - start) / (Math.max(1, domain.length - 1) + padding);
   range = steps(domain.length < 2 ? (start + stop) / 2 : start + step * padding / 2, step);
   rangeBand = 0;
   ranger = {
    t: "rangePoints",
    a: arguments
   };
   return scale
  };
  scale.rangeBands = function(x, padding, outerPadding) {
   if (arguments.length < 2) padding = 0;
   if (arguments.length < 3) outerPadding = padding;
   var reverse = x[1] < x[0],
    start = x[reverse - 0],
    stop = x[1 - reverse],
    step = (stop - start) / (domain.length - padding + 2 * outerPadding);
   range = steps(start + step * outerPadding, step);
   if (reverse) range.reverse();
   rangeBand = step * (1 - padding);
   ranger = {
    t: "rangeBands",
    a: arguments
   };
   return scale
  };
  scale.rangeRoundBands = function(x, padding, outerPadding) {
   if (arguments.length < 2) padding = 0;
   if (arguments.length < 3) outerPadding = padding;
   var reverse = x[1] < x[0],
    start = x[reverse - 0],
    stop = x[1 - reverse],
    step = Math.floor((stop - start) / (domain.length - padding + 2 * outerPadding)),
    error = stop - start - (domain.length - padding) * step;
   range = steps(start + Math.round(error / 2), step);
   if (reverse) range.reverse();
   rangeBand = Math.round(step * (1 - padding));
   ranger = {
    t: "rangeRoundBands",
    a: arguments
   };
   return scale
  };
  scale.rangeBand = function() {
   return rangeBand
  };
  scale.rangeExtent = function() {
   return d3_scaleExtent(ranger.a[0])
  };
  scale.copy = function() {
   return d3_scale_ordinal(domain, ranger)
  };
  return scale.domain(domain)
 }
 d3.scale.category10 = function() {
  return d3.scale.ordinal().range(d3_category10)
 };
 d3.scale.category20 = function() {
  return d3.scale.ordinal().range(d3_category20)
 };
 d3.scale.category20b = function() {
  return d3.scale.ordinal().range(d3_category20b)
 };
 d3.scale.category20c = function() {
  return d3.scale.ordinal().range(d3_category20c)
 };
 var d3_category10 = [2062260, 16744206, 2924588, 14034728, 9725885, 9197131, 14907330, 8355711, 12369186, 1556175].map(d3_rgbString);
 var d3_category20 = [2062260, 11454440, 16744206, 16759672, 2924588, 10018698, 14034728, 16750742, 9725885, 12955861, 9197131, 12885140, 14907330, 16234194, 8355711, 13092807, 12369186, 14408589, 1556175, 10410725].map(d3_rgbString);
 var d3_category20b = [3750777, 5395619, 7040719, 10264286, 6519097, 9216594, 11915115, 13556636, 9202993, 12426809, 15186514, 15190932, 8666169, 11356490, 14049643, 15177372, 8077683, 10834324, 13528509, 14589654].map(d3_rgbString);
 var d3_category20c = [3244733, 7057110, 10406625, 13032431, 15095053, 16616764, 16625259, 16634018, 3253076, 7652470, 10607003, 13101504, 7695281, 10394312, 12369372, 14342891, 6513507, 9868950, 12434877, 14277081].map(d3_rgbString);
 d3.scale.quantile = function() {
  return d3_scale_quantile([], [])
 };

 function d3_scale_quantile(domain, range) {
  var thresholds;

  function rescale() {
   var k = 0,
    q = range.length;
   thresholds = [];
   while (++k < q) thresholds[k - 1] = d3.quantile(domain, k / q);
   return scale
  }

  function scale(x) {
   if (!isNaN(x = +x)) return range[d3.bisect(thresholds, x)]
  }
  scale.domain = function(x) {
   if (!arguments.length) return domain;
   domain = x.filter(d3_number).sort(d3_ascending);
   return rescale()
  };
  scale.range = function(x) {
   if (!arguments.length) return range;
   range = x;
   return rescale()
  };
  scale.quantiles = function() {
   return thresholds
  };
  scale.invertExtent = function(y) {
   y = range.indexOf(y);
   return y < 0 ? [NaN, NaN] : [y > 0 ? thresholds[y - 1] : domain[0], y < thresholds.length ? thresholds[y] : domain[domain.length - 1]]
  };
  scale.copy = function() {
   return d3_scale_quantile(domain, range)
  };
  return rescale()
 }
 d3.scale.quantize = function() {
  return d3_scale_quantize(0, 1, [0, 1])
 };

 function d3_scale_quantize(x0, x1, range) {
  var kx, i;

  function scale(x) {
   return range[Math.max(0, Math.min(i, Math.floor(kx * (x - x0))))]
  }

  function rescale() {
   kx = range.length / (x1 - x0);
   i = range.length - 1;
   return scale
  }
  scale.domain = function(x) {
   if (!arguments.length) return [x0, x1];
   x0 = +x[0];
   x1 = +x[x.length - 1];
   return rescale()
  };
  scale.range = function(x) {
   if (!arguments.length) return range;
   range = x;
   return rescale()
  };
  scale.invertExtent = function(y) {
   y = range.indexOf(y);
   y = y < 0 ? NaN : y / kx + x0;
   return [y, y + 1 / kx]
  };
  scale.copy = function() {
   return d3_scale_quantize(x0, x1, range)
  };
  return rescale()
 }
 d3.scale.threshold = function() {
  return d3_scale_threshold([.5], [0, 1])
 };

 function d3_scale_threshold(domain, range) {
  function scale(x) {
   if (x <= x) return range[d3.bisect(domain, x)]
  }
  scale.domain = function(_) {
   if (!arguments.length) return domain;
   domain = _;
   return scale
  };
  scale.range = function(_) {
   if (!arguments.length) return range;
   range = _;
   return scale
  };
  scale.invertExtent = function(y) {
   y = range.indexOf(y);
   return [domain[y - 1], domain[y]]
  };
  scale.copy = function() {
   return d3_scale_threshold(domain, range)
  };
  return scale
 }
 d3.scale.identity = function() {
  return d3_scale_identity([0, 1])
 };

 function d3_scale_identity(domain) {
  function identity(x) {
   return +x
  }
  identity.invert = identity;
  identity.domain = identity.range = function(x) {
   if (!arguments.length) return domain;
   domain = x.map(identity);
   return identity
  };
  identity.ticks = function(m) {
   return d3_scale_linearTicks(domain, m)
  };
  identity.tickFormat = function(m, format) {
   return d3_scale_linearTickFormat(domain, m, format)
  };
  identity.copy = function() {
   return d3_scale_identity(domain)
  };
  return identity
 }
 d3.svg = {};
 d3.svg.arc = function() {
  var innerRadius = d3_svg_arcInnerRadius,
   outerRadius = d3_svg_arcOuterRadius,
   startAngle = d3_svg_arcStartAngle,
   endAngle = d3_svg_arcEndAngle;

  function arc() {
   var r0 = innerRadius.apply(this, arguments),
    r1 = outerRadius.apply(this, arguments),
    a0 = startAngle.apply(this, arguments) + d3_svg_arcOffset,
    a1 = endAngle.apply(this, arguments) + d3_svg_arcOffset,
    da = (a1 < a0 && (da = a0, a0 = a1, a1 = da), a1 - a0),
    df = da < IE ? "0" : "1",
    c0 = Math.cos(a0),
    s0 = Math.sin(a0),
    c1 = Math.cos(a1),
    s1 = Math.sin(a1);
   return da >= d3_svg_arcMax ? r0 ? "M0," + r1 + "A" + r1 + "," + r1 + " 0 1,1 0," + -r1 + "A" + r1 + "," + r1 + " 0 1,1 0," + r1 + "M0," + r0 + "A" + r0 + "," + r0 + " 0 1,0 0," + -r0 + "A" + r0 + "," + r0 + " 0 1,0 0," + r0 + "Z" : "M0," + r1 + "A" + r1 + "," + r1 + " 0 1,1 0," + -r1 + "A" + r1 + "," + r1 + " 0 1,1 0," + r1 + "Z" : r0 ? "M" + r1 * c0 + "," + r1 * s0 + "A" + r1 + "," + r1 + " 0 " + df + ",1 " + r1 * c1 + "," + r1 * s1 + "L" + r0 * c1 + "," + r0 * s1 + "A" + r0 + "," + r0 + " 0 " + df + ",0 " + r0 * c0 + "," + r0 * s0 + "Z" : "M" + r1 * c0 + "," + r1 * s0 + "A" + r1 + "," + r1 + " 0 " + df + ",1 " + r1 * c1 + "," + r1 * s1 + "L0,0" + "Z"
  }
  arc.innerRadius = function(v) {
   if (!arguments.length) return innerRadius;
   innerRadius = d3_functor(v);
   return arc
  };
  arc.outerRadius = function(v) {
   if (!arguments.length) return outerRadius;
   outerRadius = d3_functor(v);
   return arc
  };
  arc.startAngle = function(v) {
   if (!arguments.length) return startAngle;
   startAngle = d3_functor(v);
   return arc
  };
  arc.endAngle = function(v) {
   if (!arguments.length) return endAngle;
   endAngle = d3_functor(v);
   return arc
  };
  arc.centroid = function() {
   var r = (innerRadius.apply(this, arguments) + outerRadius.apply(this, arguments)) / 2,
    a = (startAngle.apply(this, arguments) + endAngle.apply(this, arguments)) / 2 + d3_svg_arcOffset;
   return [Math.cos(a) * r, Math.sin(a) * r]
  };
  return arc
 };
 var d3_svg_arcOffset = -halfIE,
  d3_svg_arcMax = I2 - Iu;

 function d3_svg_arcInnerRadius(d) {
  return d.innerRadius
 }

 function d3_svg_arcOuterRadius(d) {
  return d.outerRadius
 }

 function d3_svg_arcStartAngle(d) {
  return d.startAngle
 }

 function d3_svg_arcEndAngle(d) {
  return d.endAngle
 }

 function d3_svg_line(projection) {
  var x = d3_geom_pointX,
   y = d3_geom_pointY,
   defined = d3_true,
   interpolate = d3_svg_lineLinear,
   interpolateKey = interpolate.key,
   tension = .7;

  function line(data) {
   var segments = [],
    points = [],
    i = -1,
    n = data.length,
    d, fx = d3_functor(x),
    fy = d3_functor(y);

   function segment() {
    segments.push("M", interpolate(projection(points), tension))
   }
   while (++i < n) {
    if (defined.call(this, d = data[i], i)) {
     points.push([+fx.call(this, d, i), +fy.call(this, d, i)])
    } else if (points.length) {
     segment();
     points = []
    }
   }
   if (points.length) segment();
   return segments.length ? segments.join("") : null
  }
  line.x = function(_) {
   if (!arguments.length) return x;
   x = _;
   return line
  };
  line.y = function(_) {
   if (!arguments.length) return y;
   y = _;
   return line
  };
  line.defined = function(_) {
   if (!arguments.length) return defined;
   defined = _;
   return line
  };
  line.interpolate = function(_) {
   if (!arguments.length) return interpolateKey;
   if (typeof _ === "function") interpolateKey = interpolate = _;
   else interpolateKey = (interpolate = d3_svg_lineInterpolators.get(_) || d3_svg_lineLinear).key;
   return line
  };
  line.tension = function(_) {
   if (!arguments.length) return tension;
   tension = _;
   return line
  };
  return line
 }
 d3.svg.line = function() {
  return d3_svg_line(d3_identity)
 };
 var d3_svg_lineInterpolators = d3.map({
  linear: d3_svg_lineLinear,
  "linear-closed": d3_svg_lineLinearClosed,
  step: d3_svg_lineStep,
  "step-before": d3_svg_lineStepBefore,
  "step-after": d3_svg_lineStepAfter,
  basis: d3_svg_lineBasis,
  "basis-open": d3_svg_lineBasisOpen,
  "basis-closed": d3_svg_lineBasisClosed,
  bundle: d3_svg_lineBundle,
  cardinal: d3_svg_lineCardinal,
  "cardinal-open": d3_svg_lineCardinalOpen,
  "cardinal-closed": d3_svg_lineCardinalClosed,
  monotone: d3_svg_lineMonotone
 });
 d3_svg_lineInterpolators.forEach(function(key, value) {
  value.key = key;
  value.closed = /-closed$/.test(key)
 });

 function d3_svg_lineLinear(points) {
  return points.join("L")
 }

 function d3_svg_lineLinearClosed(points) {
  return d3_svg_lineLinear(points) + "Z"
 }

 function d3_svg_lineStep(points) {
  var i = 0,
   n = points.length,
   p = points[0],
   path = [p[0], ",", p[1]];
  while (++i < n) path.push("H", (p[0] + (p = points[i])[0]) / 2, "V", p[1]);
  if (n > 1) path.push("H", p[0]);
  return path.join("")
 }

 function d3_svg_lineStepBefore(points) {
  var i = 0,
   n = points.length,
   p = points[0],
   path = [p[0], ",", p[1]];
  while (++i < n) path.push("V", (p = points[i])[1], "H", p[0]);
  return path.join("")
 }

 function d3_svg_lineStepAfter(points) {
  var i = 0,
   n = points.length,
   p = points[0],
   path = [p[0], ",", p[1]];
  while (++i < n) path.push("H", (p = points[i])[0], "V", p[1]);
  return path.join("")
 }

 function d3_svg_lineCardinalOpen(points, tension) {
  return points.length < 4 ? d3_svg_lineLinear(points) : points[1] + d3_svg_lineHermite(points.slice(1, points.length - 1), d3_svg_lineCardinalTangents(points, tension))
 }

 function d3_svg_lineCardinalClosed(points, tension) {
  return points.length < 3 ? d3_svg_lineLinear(points) : points[0] + d3_svg_lineHermite((points.push(points[0]), points), d3_svg_lineCardinalTangents([points[points.length - 2]].concat(points, [points[1]]), tension))
 }

 function d3_svg_lineCardinal(points, tension) {
  return points.length < 3 ? d3_svg_lineLinear(points) : points[0] + d3_svg_lineHermite(points, d3_svg_lineCardinalTangents(points, tension))
 }

 function d3_svg_lineHermite(points, tangents) {
  if (tangents.length < 1 || points.length != tangents.length && points.length != tangents.length + 2) {
   return d3_svg_lineLinear(points)
  }
  var quad = points.length != tangents.length,
   path = "",
   p0 = points[0],
   p = points[1],
   t0 = tangents[0],
   t = t0,
   pi = 1;
  if (quad) {
   path += "Q" + (p[0] - t0[0] * 2 / 3) + "," + (p[1] - t0[1] * 2 / 3) + "," + p[0] + "," + p[1];
   p0 = points[1];
   pi = 2
  }
  if (tangents.length > 1) {
   t = tangents[1];
   p = points[pi];
   pi++;
   path += "C" + (p0[0] + t0[0]) + "," + (p0[1] + t0[1]) + "," + (p[0] - t[0]) + "," + (p[1] - t[1]) + "," + p[0] + "," + p[1];
   for (var i = 2; i < tangents.length; i++, pi++) {
    p = points[pi];
    t = tangents[i];
    path += "S" + (p[0] - t[0]) + "," + (p[1] - t[1]) + "," + p[0] + "," + p[1]
   }
  }
  if (quad) {
   var lp = points[pi];
   path += "Q" + (p[0] + t[0] * 2 / 3) + "," + (p[1] + t[1] * 2 / 3) + "," + lp[0] + "," + lp[1]
  }
  return path
 }

 function d3_svg_lineCardinalTangents(points, tension) {
  var tangents = [],
   a = (1 - tension) / 2,
   p0, p1 = points[0],
   p2 = points[1],
   i = 1,
   n = points.length;
  while (++i < n) {
   p0 = p1;
   p1 = p2;
   p2 = points[i];
   tangents.push([a * (p2[0] - p0[0]), a * (p2[1] - p0[1])])
  }
  return tangents
 }

 function d3_svg_lineBasis(points) {
  if (points.length < 3) return d3_svg_lineLinear(points);
  var i = 1,
   n = points.length,
   pi = points[0],
   x0 = pi[0],
   y0 = pi[1],
   px = [x0, x0, x0, (pi = points[1])[0]],
   py = [y0, y0, y0, pi[1]],
   path = [x0, ",", y0, "L", d3_svg_lineDot4(d3_svg_lineBasisBezier3, px), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, py)];
  points.push(points[n - 1]);
  while (++i <= n) {
   pi = points[i];
   px.shift();
   px.push(pi[0]);
   py.shift();
   py.push(pi[1]);
   d3_svg_lineBasisBezier(path, px, py)
  }
  points.pop();
  path.push("L", pi);
  return path.join("")
 }

 function d3_svg_lineBasisOpen(points) {
  if (points.length < 4) return d3_svg_lineLinear(points);
  var path = [],
   i = -1,
   n = points.length,
   pi, px = [0],
   py = [0];
  while (++i < 3) {
   pi = points[i];
   px.push(pi[0]);
   py.push(pi[1])
  }
  path.push(d3_svg_lineDot4(d3_svg_lineBasisBezier3, px) + "," + d3_svg_lineDot4(d3_svg_lineBasisBezier3, py));
  --i;
  while (++i < n) {
   pi = points[i];
   px.shift();
   px.push(pi[0]);
   py.shift();
   py.push(pi[1]);
   d3_svg_lineBasisBezier(path, px, py)
  }
  return path.join("")
 }

 function d3_svg_lineBasisClosed(points) {
  var path, i = -1,
   n = points.length,
   m = n + 4,
   pi, px = [],
   py = [];
  while (++i < 4) {
   pi = points[i % n];
   px.push(pi[0]);
   py.push(pi[1])
  }
  path = [d3_svg_lineDot4(d3_svg_lineBasisBezier3, px), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, py)];
  --i;
  while (++i < m) {
   pi = points[i % n];
   px.shift();
   px.push(pi[0]);
   py.shift();
   py.push(pi[1]);
   d3_svg_lineBasisBezier(path, px, py)
  }
  return path.join("")
 }

 function d3_svg_lineBundle(points, tension) {
  var n = points.length - 1;
  if (n) {
   var x0 = points[0][0],
    y0 = points[0][1],
    dx = points[n][0] - x0,
    dy = points[n][1] - y0,
    i = -1,
    p, t;
   while (++i <= n) {
    p = points[i];
    t = i / n;
    p[0] = tension * p[0] + (1 - tension) * (x0 + t * dx);
    p[1] = tension * p[1] + (1 - tension) * (y0 + t * dy)
   }
  }
  return d3_svg_lineBasis(points)
 }

 function d3_svg_lineDot4(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3]
 }
 var d3_svg_lineBasisBezier1 = [0, 2 / 3, 1 / 3, 0],
  d3_svg_lineBasisBezier2 = [0, 1 / 3, 2 / 3, 0],
  d3_svg_lineBasisBezier3 = [0, 1 / 6, 2 / 3, 1 / 6];

 function d3_svg_lineBasisBezier(path, x, y) {
  path.push("C", d3_svg_lineDot4(d3_svg_lineBasisBezier1, x), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier1, y), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier2, x), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier2, y), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, x), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, y))
 }

 function d3_svg_lineSlope(p0, p1) {
  return (p1[1] - p0[1]) / (p1[0] - p0[0])
 }

 function d3_svg_lineFiniteDifferences(points) {
  var i = 0,
   j = points.length - 1,
   m = [],
   p0 = points[0],
   p1 = points[1],
   d = m[0] = d3_svg_lineSlope(p0, p1);
  while (++i < j) {
   m[i] = (d + (d = d3_svg_lineSlope(p0 = p1, p1 = points[i + 1]))) / 2
  }
  m[i] = d;
  return m
 }

 function d3_svg_lineMonotoneTangents(points) {
  var tangents = [],
   d, a, b, s, m = d3_svg_lineFiniteDifferences(points),
   i = -1,
   j = points.length - 1;
  while (++i < j) {
   d = d3_svg_lineSlope(points[i], points[i + 1]);
   if (abs(d) < Iu) {
    m[i] = m[i + 1] = 0
   } else {
    a = m[i] / d;
    b = m[i + 1] / d;
    s = a * a + b * b;
    if (s > 9) {
     s = d * 3 / Math.sqrt(s);
     m[i] = s * a;
     m[i + 1] = s * b
    }
   }
  }
  i = -1;
  while (++i <= j) {
   s = (points[Math.min(j, i + 1)][0] - points[Math.max(0, i - 1)][0]) / (6 * (1 + m[i] * m[i]));
   tangents.push([s || 0, m[i] * s || 0])
  }
  return tangents
 }

 function d3_svg_lineMonotone(points) {
  return points.length < 3 ? d3_svg_lineLinear(points) : points[0] + d3_svg_lineHermite(points, d3_svg_lineMonotoneTangents(points))
 }
 d3.svg.line.radial = function() {
  var line = d3_svg_line(d3_svg_lineRadial);
  line.radius = line.x, delete line.x;
  line.angle = line.y, delete line.y;
  return line
 };

 function d3_svg_lineRadial(points) {
  var point, i = -1,
   n = points.length,
   r, a;
  while (++i < n) {
   point = points[i];
   r = point[0];
   a = point[1] + d3_svg_arcOffset;
   point[0] = r * Math.cos(a);
   point[1] = r * Math.sin(a)
  }
  return points
 }

 function d3_svg_area(projection) {
  var x0 = d3_geom_pointX,
   x1 = d3_geom_pointX,
   y0 = 0,
   y1 = d3_geom_pointY,
   defined = d3_true,
   interpolate = d3_svg_lineLinear,
   interpolateKey = interpolate.key,
   interpolateReverse = interpolate,
   L = "L",
   tension = .7;

  function area(data) {
   var segments = [],
    points0 = [],
    points1 = [],
    i = -1,
    n = data.length,
    d, fx0 = d3_functor(x0),
    fy0 = d3_functor(y0),
    fx1 = x0 === x1 ? function() {
     return x
    } : d3_functor(x1),
    fy1 = y0 === y1 ? function() {
     return y
    } : d3_functor(y1),
    x, y;

   function segment() {
    segments.push("M", interpolate(projection(points1), tension), L, interpolateReverse(projection(points0.reverse()), tension), "Z")
   }
   while (++i < n) {
    if (defined.call(this, d = data[i], i)) {
     points0.push([x = +fx0.call(this, d, i), y = +fy0.call(this, d, i)]);
     points1.push([+fx1.call(this, d, i), +fy1.call(this, d, i)])
    } else if (points0.length) {
     segment();
     points0 = [];
     points1 = []
    }
   }
   if (points0.length) segment();
   return segments.length ? segments.join("") : null
  }
  area.x = function(_) {
   if (!arguments.length) return x1;
   x0 = x1 = _;
   return area
  };
  area.x0 = function(_) {
   if (!arguments.length) return x0;
   x0 = _;
   return area
  };
  area.x1 = function(_) {
   if (!arguments.length) return x1;
   x1 = _;
   return area
  };
  area.y = function(_) {
   if (!arguments.length) return y1;
   y0 = y1 = _;
   return area
  };
  area.y0 = function(_) {
   if (!arguments.length) return y0;
   y0 = _;
   return area
  };
  area.y1 = function(_) {
   if (!arguments.length) return y1;
   y1 = _;
   return area
  };
  area.defined = function(_) {
   if (!arguments.length) return defined;
   defined = _;
   return area
  };
  area.interpolate = function(_) {
   if (!arguments.length) return interpolateKey;
   if (typeof _ === "function") interpolateKey = interpolate = _;
   else interpolateKey = (interpolate = d3_svg_lineInterpolators.get(_) || d3_svg_lineLinear).key;
   interpolateReverse = interpolate.reverse || interpolate;
   L = interpolate.closed ? "M" : "L";
   return area
  };
  area.tension = function(_) {
   if (!arguments.length) return tension;
   tension = _;
   return area
  };
  return area
 }
 d3_svg_lineStepBefore.reverse = d3_svg_lineStepAfter;
 d3_svg_lineStepAfter.reverse = d3_svg_lineStepBefore;
 d3.svg.area = function() {
  return d3_svg_area(d3_identity)
 };
 d3.svg.area.radial = function() {
  var area = d3_svg_area(d3_svg_lineRadial);
  area.radius = area.x, delete area.x;
  area.innerRadius = area.x0, delete area.x0;
  area.outerRadius = area.x1, delete area.x1;
  area.angle = area.y, delete area.y;
  area.startAngle = area.y0, delete area.y0;
  area.endAngle = area.y1, delete area.y1;
  return area
 };
 d3.svg.chord = function() {
  var source = d3_source,
   target = d3_target,
   radius = d3_svg_chordRadius,
   startAngle = d3_svg_arcStartAngle,
   endAngle = d3_svg_arcEndAngle;

  function chord(d, i) {
   var s = subgroup(this, source, d, i),
    t = subgroup(this, target, d, i);
   return "M" + s.p0 + arc(s.r, s.p1, s.a1 - s.a0) + (equals(s, t) ? curve(s.r, s.p1, s.r, s.p0) : curve(s.r, s.p1, t.r, t.p0) + arc(t.r, t.p1, t.a1 - t.a0) + curve(t.r, t.p1, s.r, s.p0)) + "Z"
  }

  function subgroup(self, f, d, i) {
   var subgroup = f.call(self, d, i),
    r = radius.call(self, subgroup, i),
    a0 = startAngle.call(self, subgroup, i) + d3_svg_arcOffset,
    a1 = endAngle.call(self, subgroup, i) + d3_svg_arcOffset;
   return {
    r: r,
    a0: a0,
    a1: a1,
    p0: [r * Math.cos(a0), r * Math.sin(a0)],
    p1: [r * Math.cos(a1), r * Math.sin(a1)]
   }
  }

  function equals(a, b) {
   return a.a0 == b.a0 && a.a1 == b.a1
  }

  function arc(r, p, a) {
   return "A" + r + "," + r + " 0 " + +(a > IE) + ",1 " + p
  }

  function curve(r0, p0, r1, p1) {
   return "Q 0,0 " + p1
  }
  chord.radius = function(v) {
   if (!arguments.length) return radius;
   radius = d3_functor(v);
   return chord
  };
  chord.source = function(v) {
   if (!arguments.length) return source;
   source = d3_functor(v);
   return chord
  };
  chord.target = function(v) {
   if (!arguments.length) return target;
   target = d3_functor(v);
   return chord
  };
  chord.startAngle = function(v) {
   if (!arguments.length) return startAngle;
   startAngle = d3_functor(v);
   return chord
  };
  chord.endAngle = function(v) {
   if (!arguments.length) return endAngle;
   endAngle = d3_functor(v);
   return chord
  };
  return chord
 };

 function d3_svg_chordRadius(d) {
  return d.radius
 }
 d3.svg.diagonal = function() {
  var source = d3_source,
   target = d3_target,
   projection = d3_svg_diagonalProjection;

  function diagonal(d, i) {
   var p0 = source.call(this, d, i),
    p3 = target.call(this, d, i),
    m = (p0.y + p3.y) / 2,
    p = [p0, {
     x: p0.x,
     y: m
    }, {
     x: p3.x,
     y: m
    }, p3];
   p = p.map(projection);
   return "M" + p[0] + "C" + p[1] + " " + p[2] + " " + p[3]
  }
  diagonal.source = function(x) {
   if (!arguments.length) return source;
   source = d3_functor(x);
   return diagonal
  };
  diagonal.target = function(x) {
   if (!arguments.length) return target;
   target = d3_functor(x);
   return diagonal
  };
  diagonal.projection = function(x) {
   if (!arguments.length) return projection;
   projection = x;
   return diagonal
  };
  return diagonal
 };

 function d3_svg_diagonalProjection(d) {
  return [d.x, d.y]
 }
 d3.svg.diagonal.radial = function() {
  var diagonal = d3.svg.diagonal(),
   projection = d3_svg_diagonalProjection,
   projection_ = diagonal.projection;
  diagonal.projection = function(x) {
   return arguments.length ? projection_(d3_svg_diagonalRadialProjection(projection = x)) : projection
  };
  return diagonal
 };

 function d3_svg_diagonalRadialProjection(projection) {
  return function() {
   var d = projection.apply(this, arguments),
    r = d[0],
    a = d[1] + d3_svg_arcOffset;
   return [r * Math.cos(a), r * Math.sin(a)]
  }
 }
 d3.svg.symbol = function() {
  var type = d3_svg_symbolType,
   size = d3_svg_symbolSize;

  function symbol(d, i) {
   return (d3_svg_symbols.get(type.call(this, d, i)) || d3_svg_symbolCircle)(size.call(this, d, i))
  }
  symbol.type = function(x) {
   if (!arguments.length) return type;
   type = d3_functor(x);
   return symbol
  };
  symbol.size = function(x) {
   if (!arguments.length) return size;
   size = d3_functor(x);
   return symbol
  };
  return symbol
 };

 function d3_svg_symbolSize() {
  return 64
 }

 function d3_svg_symbolType() {
  return "circle"
 }

 function d3_svg_symbolCircle(size) {
  var r = Math.sqrt(size / IE);
  return "M0," + r + "A" + r + "," + r + " 0 1,1 0," + -r + "A" + r + "," + r + " 0 1,1 0," + r + "Z"
 }
 var d3_svg_symbols = d3.map({
  circle: d3_svg_symbolCircle,
  cross: function(size) {
   var r = Math.sqrt(size / 5) / 2;
   return "M" + -3 * r + "," + -r + "H" + -r + "V" + -3 * r + "H" + r + "V" + -r + "H" + 3 * r + "V" + r + "H" + r + "V" + 3 * r + "H" + -r + "V" + r + "H" + -3 * r + "Z"
  },
  diamond: function(size) {
   var ry = Math.sqrt(size / (2 * d3_svg_symbolTan30)),
    rx = ry * d3_svg_symbolTan30;
   return "M0," + -ry + "L" + rx + ",0" + " 0," + ry + " " + -rx + ",0" + "Z"
  },
  square: function(size) {
   var r = Math.sqrt(size) / 2;
   return "M" + -r + "," + -r + "L" + r + "," + -r + " " + r + "," + r + " " + -r + "," + r + "Z"
  },
  "triangle-down": function(size) {
   var rx = Math.sqrt(size / d3_svg_symbolSqrt3),
    ry = rx * d3_svg_symbolSqrt3 / 2;
   return "M0," + ry + "L" + rx + "," + -ry + " " + -rx + "," + -ry + "Z"
  },
  "triangle-up": function(size) {
   var rx = Math.sqrt(size / d3_svg_symbolSqrt3),
    ry = rx * d3_svg_symbolSqrt3 / 2;
   return "M0," + -ry + "L" + rx + "," + ry + " " + -rx + "," + ry + "Z"
  }
 });
 d3.svg.symbolTypes = d3_svg_symbols.keys();
 var d3_svg_symbolSqrt3 = Math.sqrt(3),
  d3_svg_symbolTan30 = Math.tan(30 * d3_radians);

 function d3_transition(groups, id) {
  d3_subclass(groups, d3_transitionPrototype);
  groups.id = id;
  return groups
 }
 var d3_transitionPrototype = [],
  d3_transitionId = 0,
  d3_transitionInheritId, d3_transitionInherit;
 d3_transitionPrototype.call = d3_selectionPrototype.call;
 d3_transitionPrototype.empty = d3_selectionPrototype.empty;
 d3_transitionPrototype.node = d3_selectionPrototype.node;
 d3_transitionPrototype.size = d3_selectionPrototype.size;
 d3.transition = function(selection) {
  return arguments.length ? d3_transitionInheritId ? selection.transition() : selection : d3_selectionRoot.transition()
 };
 d3.transition.prototype = d3_transitionPrototype;
 d3_transitionPrototype.select = function(selector) {
  var id = this.id,
   subgroups = [],
   subgroup, subnode, node;
  selector = d3_selection_selector(selector);
  for (var j = -1, m = this.length; ++j < m;) {
   subgroups.push(subgroup = []);
   for (var group = this[j], i = -1, n = group.length; ++i < n;) {
    if ((node = group[i]) && (subnode = selector.call(node, node.__data__, i, j))) {
     if ("__data__" in node) subnode.__data__ = node.__data__;
     d3_transitionNode(subnode, i, id, node.__transition__[id]);
     subgroup.push(subnode)
    } else {
     subgroup.push(null)
    }
   }
  }
  return d3_transition(subgroups, id)
 };
 d3_transitionPrototype.selectAll = function(selector) {
  var id = this.id,
   subgroups = [],
   subgroup, subnodes, node, subnode, transition;
  selector = d3_selection_selectorAll(selector);
  for (var j = -1, m = this.length; ++j < m;) {
   for (var group = this[j], i = -1, n = group.length; ++i < n;) {
    if (node = group[i]) {
     transition = node.__transition__[id];
     subnodes = selector.call(node, node.__data__, i, j);
     subgroups.push(subgroup = []);
     for (var k = -1, o = subnodes.length; ++k < o;) {
      if (subnode = subnodes[k]) d3_transitionNode(subnode, k, id, transition);
      subgroup.push(subnode)
     }
    }
   }
  }
  return d3_transition(subgroups, id)
 };
 d3_transitionPrototype.filter = function(filter) {
  var subgroups = [],
   subgroup, group, node;
  if (typeof filter !== "function") filter = d3_selection_filter(filter);
  for (var j = 0, m = this.length; j < m; j++) {
   subgroups.push(subgroup = []);
   for (var group = this[j], i = 0, n = group.length; i < n; i++) {
    if ((node = group[i]) && filter.call(node, node.__data__, i, j)) {
     subgroup.push(node)
    }
   }
  }
  return d3_transition(subgroups, this.id)
 };
 d3_transitionPrototype.tween = function(name, tween) {
  var id = this.id;
  if (arguments.length < 2) return this.node().__transition__[id].tween.get(name);
  return d3_selection_each(this, tween == null ? function(node) {
   node.__transition__[id].tween.remove(name)
  } : function(node) {
   node.__transition__[id].tween.set(name, tween)
  })
 };

 function d3_transition_tween(groups, name, value, tween) {
  var id = groups.id;
  return d3_selection_each(groups, typeof value === "function" ? function(node, i, j) {
   node.__transition__[id].tween.set(name, tween(value.call(node, node.__data__, i, j)))
  } : (value = tween(value), function(node) {
   node.__transition__[id].tween.set(name, value)
  }))
 }
 d3_transitionPrototype.attr = function(nameNS, value) {
  if (arguments.length < 2) {
   for (value in nameNS) this.attr(value, nameNS[value]);
   return this
  }
  var interpolate = nameNS == "transform" ? d3_interpolateTransform : d3_interpolate,
   name = d3.ns.qualify(nameNS);

  function attrNull() {
   this.removeAttribute(name)
  }

  function attrNullNS() {
   this.removeAttributeNS(name.space, name.local)
  }

  function attrTween(b) {
   return b == null ? attrNull : (b += "", function() {
    var a = this.getAttribute(name),
     i;
    return a !== b && (i = interpolate(a, b), function(t) {
     this.setAttribute(name, i(t))
    })
   })
  }

  function attrTweenNS(b) {
   return b == null ? attrNullNS : (b += "", function() {
    var a = this.getAttributeNS(name.space, name.local),
     i;
    return a !== b && (i = interpolate(a, b), function(t) {
     this.setAttributeNS(name.space, name.local, i(t))
    })
   })
  }
  return d3_transition_tween(this, "attr." + nameNS, value, name.local ? attrTweenNS : attrTween)
 };
 d3_transitionPrototype.attrTween = function(nameNS, tween) {
  var name = d3.ns.qualify(nameNS);

  function attrTween(d, i) {
   var f = tween.call(this, d, i, this.getAttribute(name));
   return f && function(t) {
    this.setAttribute(name, f(t))
   }
  }

  function attrTweenNS(d, i) {
   var f = tween.call(this, d, i, this.getAttributeNS(name.space, name.local));
   return f && function(t) {
    this.setAttributeNS(name.space, name.local, f(t))
   }
  }
  return this.tween("attr." + nameNS, name.local ? attrTweenNS : attrTween)
 };
 d3_transitionPrototype.style = function(name, value, priority) {
  var n = arguments.length;
  if (n < 3) {
   if (typeof name !== "string") {
    if (n < 2) value = "";
    for (priority in name) this.style(priority, name[priority], value);
    return this
   }
   priority = ""
  }

  function styleNull() {
   this.style.removeProperty(name)
  }

  function styleString(b) {
   return b == null ? styleNull : (b += "", function() {
    var a = d3_window.getComputedStyle(this, null).getPropertyValue(name),
     i;
    return a !== b && (i = d3_interpolate(a, b), function(t) {
     this.style.setProperty(name, i(t), priority)
    })
   })
  }
  return d3_transition_tween(this, "style." + name, value, styleString)
 };
 d3_transitionPrototype.styleTween = function(name, tween, priority) {
  if (arguments.length < 3) priority = "";

  function styleTween(d, i) {
   var f = tween.call(this, d, i, d3_window.getComputedStyle(this, null).getPropertyValue(name));
   return f && function(t) {
    this.style.setProperty(name, f(t), priority)
   }
  }
  return this.tween("style." + name, styleTween)
 };
 d3_transitionPrototype.text = function(value) {
  return d3_transition_tween(this, "text", value, d3_transition_text)
 };

 function d3_transition_text(b) {
  if (b == null) b = "";
  return function() {
   this.textContent = b
  }
 }
 d3_transitionPrototype.remove = function() {
  return this.each("end.transition", function() {
   var p;
   if (this.__transition__.count < 2 && (p = this.parentNode)) p.removeChild(this)
  })
 };
 d3_transitionPrototype.ease = function(value) {
  var id = this.id;
  if (arguments.length < 1) return this.node().__transition__[id].ease;
  if (typeof value !== "function") value = d3.ease.apply(d3, arguments);
  return d3_selection_each(this, function(node) {
   node.__transition__[id].ease = value
  })
 };
 d3_transitionPrototype.delay = function(value) {
  var id = this.id;
  if (arguments.length < 1) return this.node().__transition__[id].delay;
  return d3_selection_each(this, typeof value === "function" ? function(node, i, j) {
   node.__transition__[id].delay = +value.call(node, node.__data__, i, j)
  } : (value = +value, function(node) {
   node.__transition__[id].delay = value
  }))
 };
 d3_transitionPrototype.duration = function(value) {
  var id = this.id;
  if (arguments.length < 1) return this.node().__transition__[id].duration;
  return d3_selection_each(this, typeof value === "function" ? function(node, i, j) {
   node.__transition__[id].duration = Math.max(1, value.call(node, node.__data__, i, j))
  } : (value = Math.max(1, value), function(node) {
   node.__transition__[id].duration = value
  }))
 };
 d3_transitionPrototype.each = function(type, listener) {
  var id = this.id;
  if (arguments.length < 2) {
   var inherit = d3_transitionInherit,
    inheritId = d3_transitionInheritId;
   d3_transitionInheritId = id;
   d3_selection_each(this, function(node, i, j) {
    d3_transitionInherit = node.__transition__[id];
    type.call(node, node.__data__, i, j)
   });
   d3_transitionInherit = inherit;
   d3_transitionInheritId = inheritId
  } else {
   d3_selection_each(this, function(node) {
    var transition = node.__transition__[id];
    (transition.event || (transition.event = d3.dispatch("start", "end"))).on(type, listener)
   })
  }
  return this
 };
 d3_transitionPrototype.transition = function() {
  var id0 = this.id,
   id1 = ++d3_transitionId,
   subgroups = [],
   subgroup, group, node, transition;
  for (var j = 0, m = this.length; j < m; j++) {
   subgroups.push(subgroup = []);
   for (var group = this[j], i = 0, n = group.length; i < n; i++) {
    if (node = group[i]) {
     transition = Object.create(node.__transition__[id0]);
     transition.delay += transition.duration;
     d3_transitionNode(node, i, id1, transition)
    }
    subgroup.push(node)
   }
  }
  return d3_transition(subgroups, id1)
 };

 function d3_transitionNode(node, i, id, inherit) {
  var lock = node.__transition__ || (node.__transition__ = {
    active: 0,
    count: 0
   }),
   transition = lock[id];
  if (!transition) {
   var time = inherit.time;
   transition = lock[id] = {
    tween: new d3_Map,
    time: time,
    ease: inherit.ease,
    delay: inherit.delay,
    duration: inherit.duration
   };
   ++lock.count;
   d3.timer(function(elapsed) {
    var d = node.__data__,
     ease = transition.ease,
     delay = transition.delay,
     duration = transition.duration,
     timer = d3_timer_active,
     tweened = [];
    timer.t = delay + time;
    if (delay <= elapsed) return start(elapsed - delay);
    timer.c = start;

    function start(elapsed) {
     if (lock.active > id) return stop();
     lock.active = id;
     transition.event && transition.event.start.call(node, d, i);
     transition.tween.forEach(function(key, value) {
      if (value = value.call(node, d, i)) {
       tweened.push(value)
      }
     });
     d3.timer(function() {
      timer.c = tick(elapsed || 1) ? d3_true : tick;
      return 1
     }, 0, time)
    }

    function tick(elapsed) {
     if (lock.active !== id) return stop();
     var t = elapsed / duration,
      e = ease(t),
      n = tweened.length;
     while (n > 0) {
      tweened[--n].call(node, e)
     }
     if (t >= 1) {
      transition.event && transition.event.end.call(node, d, i);
      return stop()
     }
    }

    function stop() {
     if (--lock.count) delete lock[id];
     else delete node.__transition__;
     return 1
    }
   }, 0, time)
  }
 }
 d3.svg.axis = function() {
  var scale = d3.scale.linear(),
   orient = d3_svg_axisDefaultOrient,
   innerTickSize = 6,
   outerTickSize = 6,
   tickPadding = 3,
   tickArguments_ = [10],
   tickValues = null,
   tickFormat_;

  function axis(g) {
   g.each(function() {
    var g = d3.select(this);
    var scale0 = this.__chart__ || scale,
     scale1 = this.__chart__ = scale.copy();
    var ticks = tickValues == null ? scale1.ticks ? scale1.ticks.apply(scale1, tickArguments_) : scale1.domain() : tickValues,
     tickFormat = tickFormat_ == null ? scale1.tickFormat ? scale1.tickFormat.apply(scale1, tickArguments_) : d3_identity : tickFormat_,
     tick = g.selectAll(".tick").data(ticks, scale1),
     tickEnter = tick.enter().insert("g", ".domain").attr("class", "tick").style("opacity", Iu),
     tickExit = d3.transition(tick.exit()).style("opacity", Iu).remove(),
     tickUpdate = d3.transition(tick.order()).style("opacity", 1),
     tickTransform;
    var range = d3_scaleRange(scale1),
     path = g.selectAll(".domain").data([0]),
     pathUpdate = (path.enter().append("path").attr("class", "domain"), d3.transition(path));
    tickEnter.append("line");
    tickEnter.append("text");
    var lineEnter = tickEnter.select("line"),
     lineUpdate = tickUpdate.select("line"),
     text = tick.select("text").text(tickFormat),
     textEnter = tickEnter.select("text"),
     textUpdate = tickUpdate.select("text");
    switch (orient) {
     case "bottom":
      {
       tickTransform = d3_svg_axisX;lineEnter.attr("y2", innerTickSize);textEnter.attr("y", Math.max(innerTickSize, 0) + tickPadding);lineUpdate.attr("x2", 0).attr("y2", innerTickSize);textUpdate.attr("x", 0).attr("y", Math.max(innerTickSize, 0) + tickPadding);text.attr("dy", ".71em").style("text-anchor", "middle");pathUpdate.attr("d", "M" + range[0] + "," + outerTickSize + "V0H" + range[1] + "V" + outerTickSize);
       break
      }
     case "top":
      {
       tickTransform = d3_svg_axisX;lineEnter.attr("y2", -innerTickSize);textEnter.attr("y", -(Math.max(innerTickSize, 0) + tickPadding));lineUpdate.attr("x2", 0).attr("y2", -innerTickSize);textUpdate.attr("x", 0).attr("y", -(Math.max(innerTickSize, 0) + tickPadding));text.attr("dy", "0em").style("text-anchor", "middle");pathUpdate.attr("d", "M" + range[0] + "," + -outerTickSize + "V0H" + range[1] + "V" + -outerTickSize);
       break
      }
     case "left":
      {
       tickTransform = d3_svg_axisY;lineEnter.attr("x2", -innerTickSize);textEnter.attr("x", -(Math.max(innerTickSize, 0) + tickPadding));lineUpdate.attr("x2", -innerTickSize).attr("y2", 0);textUpdate.attr("x", -(Math.max(innerTickSize, 0) + tickPadding)).attr("y", 0);text.attr("dy", ".32em").style("text-anchor", "end");pathUpdate.attr("d", "M" + -outerTickSize + "," + range[0] + "H0V" + range[1] + "H" + -outerTickSize);
       break
      }
     case "right":
      {
       tickTransform = d3_svg_axisY;lineEnter.attr("x2", innerTickSize);textEnter.attr("x", Math.max(innerTickSize, 0) + tickPadding);lineUpdate.attr("x2", innerTickSize).attr("y2", 0);textUpdate.attr("x", Math.max(innerTickSize, 0) + tickPadding).attr("y", 0);text.attr("dy", ".32em").style("text-anchor", "start");pathUpdate.attr("d", "M" + outerTickSize + "," + range[0] + "H0V" + range[1] + "H" + outerTickSize);
       break
      }
    }
    if (scale1.rangeBand) {
     var x = scale1,
      dx = x.rangeBand() / 2;
     scale0 = scale1 = function(d) {
      return x(d) + dx
     }
    } else if (scale0.rangeBand) {
     scale0 = scale1
    } else {
     tickExit.call(tickTransform, scale1)
    }
    tickEnter.call(tickTransform, scale0);
    tickUpdate.call(tickTransform, scale1)
   })
  }
  axis.scale = function(x) {
   if (!arguments.length) return scale;
   scale = x;
   return axis
  };
  axis.orient = function(x) {
   if (!arguments.length) return orient;
   orient = x in d3_svg_axisOrients ? x + "" : d3_svg_axisDefaultOrient;
   return axis
  };
  axis.ticks = function() {
   if (!arguments.length) return tickArguments_;
   tickArguments_ = arguments;
   return axis
  };
  axis.tickValues = function(x) {
   if (!arguments.length) return tickValues;
   tickValues = x;
   return axis
  };
  axis.tickFormat = function(x) {
   if (!arguments.length) return tickFormat_;
   tickFormat_ = x;
   return axis
  };
  axis.tickSize = function(x) {
   var n = arguments.length;
   if (!n) return innerTickSize;
   innerTickSize = +x;
   outerTickSize = +arguments[n - 1];
   return axis
  };
  axis.innerTickSize = function(x) {
   if (!arguments.length) return innerTickSize;
   innerTickSize = +x;
   return axis
  };
  axis.outerTickSize = function(x) {
   if (!arguments.length) return outerTickSize;
   outerTickSize = +x;
   return axis
  };
  axis.tickPadding = function(x) {
   if (!arguments.length) return tickPadding;
   tickPadding = +x;
   return axis
  };
  axis.tickSubdivide = function() {
   return arguments.length && axis
  };
  return axis
 };
 var d3_svg_axisDefaultOrient = "bottom",
  d3_svg_axisOrients = {
   top: 1,
   right: 1,
   bottom: 1,
   left: 1
  };

 function d3_svg_axisX(selection, x) {
  selection.attr("transform", function(d) {
   return "translate(" + x(d) + ",0)"
  })
 }

 function d3_svg_axisY(selection, y) {
  selection.attr("transform", function(d) {
   return "translate(0," + y(d) + ")"
  })
 }
 d3.svg.brush = function() {
  var event = d3_eventDispatch(brush, "brushstart", "brush", "brushend"),
   x = null,
   y = null,
   xExtent = [0, 0],
   yExtent = [0, 0],
   xExtentDomain, yExtentDomain, xClamp = true,
   yClamp = true,
   resizes = d3_svg_brushResizes[0];

  function brush(g) {
   g.each(function() {
    var g = d3.select(this).style("pointer-events", "all").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)").on("mousedown.brush", brushstart).on("touchstart.brush", brushstart);
    var background = g.selectAll(".background").data([0]);
    background.enter().append("rect").attr("class", "background").style("visibility", "hidden").style("cursor", "crosshair");
    g.selectAll(".extent").data([0]).enter().append("rect").attr("class", "extent").style("cursor", "move");
    var resize = g.selectAll(".resize").data(resizes, d3_identity);
    resize.exit().remove();
    resize.enter().append("g").attr("class", function(d) {
     return "resize " + d
    }).style("cursor", function(d) {
     return d3_svg_brushCursor[d]
    }).append("rect").attr("x", function(d) {
     return /[ew]$/.test(d) ? -3 : null
    }).attr("y", function(d) {
     return /^[ns]/.test(d) ? -3 : null
    }).attr("width", 6).attr("height", 6).style("visibility", "hidden");
    resize.style("display", brush.empty() ? "none" : null);
    var gUpdate = d3.transition(g),
     backgroundUpdate = d3.transition(background),
     range;
    if (x) {
     range = d3_scaleRange(x);
     backgroundUpdate.attr("x", range[0]).attr("width", range[1] - range[0]);
     redrawX(gUpdate)
    }
    if (y) {
     range = d3_scaleRange(y);
     backgroundUpdate.attr("y", range[0]).attr("height", range[1] - range[0]);
     redrawY(gUpdate)
    }
    redraw(gUpdate)
   })
  }
  brush.event = function(g) {
   g.each(function() {
    var event_ = event.of(this, arguments),
     extent1 = {
      x: xExtent,
      y: yExtent,
      i: xExtentDomain,
      j: yExtentDomain
     },
     extent0 = this.__chart__ || extent1;
    this.__chart__ = extent1;
    if (d3_transitionInheritId) {
     d3.select(this).transition().each("start.brush", function() {
      xExtentDomain = extent0.i;
      yExtentDomain = extent0.j;
      xExtent = extent0.x;
      yExtent = extent0.y;
      event_({
       type: "brushstart"
      })
     }).tween("brush:brush", function() {
      var xi = d3_interpolateArray(xExtent, extent1.x),
       yi = d3_interpolateArray(yExtent, extent1.y);
      xExtentDomain = yExtentDomain = null;
      return function(t) {
       xExtent = extent1.x = xi(t);
       yExtent = extent1.y = yi(t);
       event_({
        type: "brush",
        mode: "resize"
       })
      }
     }).each("end.brush", function() {
      xExtentDomain = extent1.i;
      yExtentDomain = extent1.j;
      event_({
       type: "brush",
       mode: "resize"
      });
      event_({
       type: "brushend"
      })
     })
    } else {
     event_({
      type: "brushstart"
     });
     event_({
      type: "brush",
      mode: "resize"
     });
     event_({
      type: "brushend"
     })
    }
   })
  };

  function redraw(g) {
   g.selectAll(".resize").attr("transform", function(d) {
    return "translate(" + xExtent[+/e$/.test(d)] + "," + yExtent[+/^s/.test(d)] + ")"
   })
  }

  function redrawX(g) {
   g.select(".extent").attr("x", xExtent[0]);
   g.selectAll(".extent,.n>rect,.s>rect").attr("width", xExtent[1] - xExtent[0])
  }

  function redrawY(g) {
   g.select(".extent").attr("y", yExtent[0]);
   g.selectAll(".extent,.e>rect,.w>rect").attr("height", yExtent[1] - yExtent[0])
  }

  function brushstart() {
   var target = this,
    eventTarget = d3.select(d3.event.target),
    event_ = event.of(target, arguments),
    g = d3.select(target),
    resizing = eventTarget.datum(),
    resizingX = !/^(n|s)$/.test(resizing) && x,
    resizingY = !/^(e|w)$/.test(resizing) && y,
    dragging = eventTarget.classed("extent"),
    dragRestore = d3_event_dragSuppress(),
    center, origin = d3.mouse(target),
    offset;
   var w = d3.select(d3_window).on("keydown.brush", keydown).on("keyup.brush", keyup);
   if (d3.event.changedTouches) {
    w.on("touchmove.brush", brushmove).on("touchend.brush", brushend)
   } else {
    w.on("mousemove.brush", brushmove).on("mouseup.brush", brushend)
   }
   g.interrupt().selectAll("*").interrupt();
   if (dragging) {
    origin[0] = xExtent[0] - origin[0];
    origin[1] = yExtent[0] - origin[1]
   } else if (resizing) {
    var ex = +/w$/.test(resizing),
     ey = +/^n/.test(resizing);
    offset = [xExtent[1 - ex] - origin[0], yExtent[1 - ey] - origin[1]];
    origin[0] = xExtent[ex];
    origin[1] = yExtent[ey]
   } else if (d3.event.altKey) center = origin.slice();
   g.style("pointer-events", "none").selectAll(".resize").style("display", null);
   d3.select("body").style("cursor", eventTarget.style("cursor"));
   event_({
    type: "brushstart"
   });
   brushmove();

   function keydown() {
    if (d3.event.keyCode == 32) {
     if (!dragging) {
      center = null;
      origin[0] -= xExtent[1];
      origin[1] -= yExtent[1];
      dragging = 2
     }
     d3_eventPreventDefault()
    }
   }

   function keyup() {
    if (d3.event.keyCode == 32 && dragging == 2) {
     origin[0] += xExtent[1];
     origin[1] += yExtent[1];
     dragging = 0;
     d3_eventPreventDefault()
    }
   }

   function brushmove() {
    var point = d3.mouse(target),
     moved = false;
    if (offset) {
     point[0] += offset[0];
     point[1] += offset[1]
    }
    if (!dragging) {
     if (d3.event.altKey) {
      if (!center) center = [(xExtent[0] + xExtent[1]) / 2, (yExtent[0] + yExtent[1]) / 2];
      origin[0] = xExtent[+(point[0] < center[0])];
      origin[1] = yExtent[+(point[1] < center[1])]
     } else center = null
    }
    if (resizingX && move1(point, x, 0)) {
     redrawX(g);
     moved = true
    }
    if (resizingY && move1(point, y, 1)) {
     redrawY(g);
     moved = true
    }
    if (moved) {
     redraw(g);
     event_({
      type: "brush",
      mode: dragging ? "move" : "resize"
     })
    }
   }

   function move1(point, scale, i) {
    var range = d3_scaleRange(scale),
     r0 = range[0],
     r1 = range[1],
     position = origin[i],
     extent = i ? yExtent : xExtent,
     size = extent[1] - extent[0],
     min, max;
    if (dragging) {
     r0 -= position;
     r1 -= size + position
    }
    min = (i ? yClamp : xClamp) ? Math.max(r0, Math.min(r1, point[i])) : point[i];
    if (dragging) {
     max = (min += position) + size
    } else {
     if (center) position = Math.max(r0, Math.min(r1, 2 * center[i] - min));
     if (position < min) {
      max = min;
      min = position
     } else {
      max = position
     }
    }
    if (extent[0] != min || extent[1] != max) {
     if (i) yExtentDomain = null;
     else xExtentDomain = null;
     extent[0] = min;
     extent[1] = max;
     return true
    }
   }

   function brushend() {
    brushmove();
    g.style("pointer-events", "all").selectAll(".resize").style("display", brush.empty() ? "none" : null);
    d3.select("body").style("cursor", null);
    w.on("mousemove.brush", null).on("mouseup.brush", null).on("touchmove.brush", null).on("touchend.brush", null).on("keydown.brush", null).on("keyup.brush", null);
    dragRestore();
    event_({
     type: "brushend"
    })
   }
  }
  brush.x = function(z) {
   if (!arguments.length) return x;
   x = z;
   resizes = d3_svg_brushResizes[!x << 1 | !y];
   return brush
  };
  brush.y = function(z) {
   if (!arguments.length) return y;
   y = z;
   resizes = d3_svg_brushResizes[!x << 1 | !y];
   return brush
  };
  brush.clamp = function(z) {
   if (!arguments.length) return x && y ? [xClamp, yClamp] : x ? xClamp : y ? yClamp : null;
   if (x && y) xClamp = !!z[0], yClamp = !!z[1];
   else if (x) xClamp = !!z;
   else if (y) yClamp = !!z;
   return brush
  };
  brush.extent = function(z) {
   var x0, x1, y0, y1, t;
   if (!arguments.length) {
    if (x) {
     if (xExtentDomain) {
      x0 = xExtentDomain[0], x1 = xExtentDomain[1]
     } else {
      x0 = xExtent[0], x1 = xExtent[1];
      if (x.invert) x0 = x.invert(x0), x1 = x.invert(x1);
      if (x1 < x0) t = x0, x0 = x1, x1 = t
     }
    }
    if (y) {
     if (yExtentDomain) {
      y0 = yExtentDomain[0], y1 = yExtentDomain[1]
     } else {
      y0 = yExtent[0], y1 = yExtent[1];
      if (y.invert) y0 = y.invert(y0), y1 = y.invert(y1);
      if (y1 < y0) t = y0, y0 = y1, y1 = t
     }
    }
    return x && y ? [
     [x0, y0],
     [x1, y1]
    ] : x ? [x0, x1] : y && [y0, y1]
   }
   if (x) {
    x0 = z[0], x1 = z[1];
    if (y) x0 = x0[0], x1 = x1[0];
    xExtentDomain = [x0, x1];
    if (x.invert) x0 = x(x0), x1 = x(x1);
    if (x1 < x0) t = x0, x0 = x1, x1 = t;
    if (x0 != xExtent[0] || x1 != xExtent[1]) xExtent = [x0, x1]
   }
   if (y) {
    y0 = z[0], y1 = z[1];
    if (x) y0 = y0[1], y1 = y1[1];
    yExtentDomain = [y0, y1];
    if (y.invert) y0 = y(y0), y1 = y(y1);
    if (y1 < y0) t = y0, y0 = y1, y1 = t;
    if (y0 != yExtent[0] || y1 != yExtent[1]) yExtent = [y0, y1]
   }
   return brush
  };
  brush.clear = function() {
   if (!brush.empty()) {
    xExtent = [0, 0], yExtent = [0, 0];
    xExtentDomain = yExtentDomain = null
   }
   return brush
  };
  brush.empty = function() {
   return !!x && xExtent[0] == xExtent[1] || !!y && yExtent[0] == yExtent[1]
  };
  return d3.rebind(brush, event, "on")
 };
 var d3_svg_brushCursor = {
  n: "ns-resize",
  e: "ew-resize",
  s: "ns-resize",
  w: "ew-resize",
  nw: "nwse-resize",
  ne: "nesw-resize",
  se: "nwse-resize",
  sw: "nesw-resize"
 };
 var d3_svg_brushResizes = [
  ["n", "e", "s", "w", "nw", "ne", "se", "sw"],
  ["e", "w"],
  ["n", "s"],
  []
 ];
 var d3_time_format = d3_time.format = d3_locale_enUS.timeFormat;
 var d3_time_formatUtc = d3_time_format.utc;
 var d3_time_formatIso = d3_time_formatUtc("%Y-%m-%dT%H:%M:%S.%LZ");
 d3_time_format.iso = Date.prototype.toISOString && +new Date("2000-01-01T00:00:00.000Z") ? d3_time_formatIsoNative : d3_time_formatIso;

 function d3_time_formatIsoNative(date) {
  return date.toISOString()
 }
 d3_time_formatIsoNative.parse = function(string) {
  var date = new Date(string);
  return isNaN(date) ? null : date
 };
 d3_time_formatIsoNative.toString = d3_time_formatIso.toString;
 d3_time.second = d3_time_interval(function(date) {
  return new d3_date(Math.floor(date / 1e3) * 1e3)
 }, function(date, offset) {
  date.setTime(date.getTime() + Math.floor(offset) * 1e3)
 }, function(date) {
  return date.getSeconds()
 });
 d3_time.seconds = d3_time.second.range;
 d3_time.seconds.utc = d3_time.second.utc.range;
 d3_time.minute = d3_time_interval(function(date) {
  return new d3_date(Math.floor(date / 6e4) * 6e4)
 }, function(date, offset) {
  date.setTime(date.getTime() + Math.floor(offset) * 6e4)
 }, function(date) {
  return date.getMinutes()
 });
 d3_time.minutes = d3_time.minute.range;
 d3_time.minutes.utc = d3_time.minute.utc.range;
 d3_time.hour = d3_time_interval(function(date) {
  var timezone = date.getTimezoneOffset() / 60;
  return new d3_date((Math.floor(date / 36e5 - timezone) + timezone) * 36e5)
 }, function(date, offset) {
  date.setTime(date.getTime() + Math.floor(offset) * 36e5)
 }, function(date) {
  return date.getHours()
 });
 d3_time.hours = d3_time.hour.range;
 d3_time.hours.utc = d3_time.hour.utc.range;
 d3_time.month = d3_time_interval(function(date) {
  date = d3_time.day(date);
  date.setDate(1);
  return date
 }, function(date, offset) {
  date.setMonth(date.getMonth() + offset)
 }, function(date) {
  return date.getMonth()
 });
 d3_time.months = d3_time.month.range;
 d3_time.months.utc = d3_time.month.utc.range;

 function d3_time_scale(linear, methods, format) {
  function scale(x) {
   return linear(x)
  }
  scale.invert = function(x) {
   return d3_time_scaleDate(linear.invert(x))
  };
  scale.domain = function(x) {
   if (!arguments.length) return linear.domain().map(d3_time_scaleDate);
   linear.domain(x);
   return scale
  };

  function tickMethod(extent, count) {
   var span = extent[1] - extent[0],
    target = span / count,
    i = d3.bisect(d3_time_scaleSteps, target);
   return i == d3_time_scaleSteps.length ? [methods.year, d3_scale_linearTickRange(extent.map(function(d) {
    return d / 31536e6
   }), count)[2]] : !i ? [d3_time_scaleMilliseconds, d3_scale_linearTickRange(extent, count)[2]] : methods[target / d3_time_scaleSteps[i - 1] < d3_time_scaleSteps[i] / target ? i - 1 : i]
  }
  scale.nice = function(interval, skip) {
   var domain = scale.domain(),
    extent = d3_scaleExtent(domain),
    method = interval == null ? tickMethod(extent, 10) : typeof interval === "number" && tickMethod(extent, interval);
   if (method) interval = method[0], skip = method[1];

   function skipped(date) {
    return !isNaN(date) && !interval.range(date, d3_time_scaleDate(+date + 1), skip).length
   }
   return scale.domain(d3_scale_nice(domain, skip > 1 ? {
    floor: function(date) {
     while (skipped(date = interval.floor(date))) date = d3_time_scaleDate(date - 1);
     return date
    },
    ceil: function(date) {
     while (skipped(date = interval.ceil(date))) date = d3_time_scaleDate(+date + 1);
     return date
    }
   } : interval))
  };
  scale.ticks = function(interval, skip) {
   var extent = d3_scaleExtent(scale.domain()),
    method = interval == null ? tickMethod(extent, 10) : typeof interval === "number" ? tickMethod(extent, interval) : !interval.range && [{
     range: interval
    }, skip];
   if (method) interval = method[0], skip = method[1];
   return interval.range(extent[0], d3_time_scaleDate(+extent[1] + 1), skip < 1 ? 1 : skip)
  };
  scale.tickFormat = function() {
   return format
  };
  scale.copy = function() {
   return d3_time_scale(linear.copy(), methods, format)
  };
  return d3_scale_linearRebind(scale, linear)
 }

 function d3_time_scaleDate(t) {
  return new Date(t)
 }
 var d3_time_scaleSteps = [1e3, 5e3, 15e3, 3e4, 6e4, 3e5, 9e5, 18e5, 36e5, 108e5, 216e5, 432e5, 864e5, 1728e5, 6048e5, 2592e6, 7776e6, 31536e6];
 var d3_time_scaleLocalMethods = [
  [d3_time.second, 1],
  [d3_time.second, 5],
  [d3_time.second, 15],
  [d3_time.second, 30],
  [d3_time.minute, 1],
  [d3_time.minute, 5],
  [d3_time.minute, 15],
  [d3_time.minute, 30],
  [d3_time.hour, 1],
  [d3_time.hour, 3],
  [d3_time.hour, 6],
  [d3_time.hour, 12],
  [d3_time.day, 1],
  [d3_time.day, 2],
  [d3_time.week, 1],
  [d3_time.month, 1],
  [d3_time.month, 3],
  [d3_time.year, 1]
 ];
 var d3_time_scaleLocalFormat = d3_time_format.multi([
  [".%L", function(d) {
   return d.getMilliseconds()
  }],
  [":%S", function(d) {
   return d.getSeconds()
  }],
  ["%I:%M", function(d) {
   return d.getMinutes()
  }],
  ["%I %p", function(d) {
   return d.getHours()
  }],
  ["%a %d", function(d) {
   return d.getDay() && d.getDate() != 1
  }],
  ["%b %d", function(d) {
   return d.getDate() != 1
  }],
  ["%B", function(d) {
   return d.getMonth()
  }],
  ["%Y", d3_true]
 ]);
 var d3_time_scaleMilliseconds = {
  range: function(start, stop, step) {
   return d3.range(Math.ceil(start / step) * step, +stop, step).map(d3_time_scaleDate)
  },
  floor: d3_identity,
  ceil: d3_identity
 };
 d3_time_scaleLocalMethods.year = d3_time.year;
 d3_time.scale = function() {
  return d3_time_scale(d3.scale.linear(), d3_time_scaleLocalMethods, d3_time_scaleLocalFormat)
 };
 var d3_time_scaleUtcMethods = d3_time_scaleLocalMethods.map(function(m) {
  return [m[0].utc, m[1]]
 });
 var d3_time_scaleUtcFormat = d3_time_formatUtc.multi([
  [".%L", function(d) {
   return d.getUTCMilliseconds()
  }],
  [":%S", function(d) {
   return d.getUTCSeconds()
  }],
  ["%I:%M", function(d) {
   return d.getUTCMinutes()
  }],
  ["%I %p", function(d) {
   return d.getUTCHours()
  }],
  ["%a %d", function(d) {
   return d.getUTCDay() && d.getUTCDate() != 1
  }],
  ["%b %d", function(d) {
   return d.getUTCDate() != 1
  }],
  ["%B", function(d) {
   return d.getUTCMonth()
  }],
  ["%Y", d3_true]
 ]);
 d3_time_scaleUtcMethods.year = d3_time.year.utc;
 d3_time.scale.utc = function() {
  return d3_time_scale(d3.scale.linear(), d3_time_scaleUtcMethods, d3_time_scaleUtcFormat)
 };
 d3.text = d3_xhrType(function(request) {
  return request.responseText
 });
 d3.json = function(url, callback) {
  return d3_xhr(url, "application/json", d3_json, callback)
 };

 function d3_json(request) {
  return JSON.parse(request.responseText)
 }
 d3.html = function(url, callback) {
  return d3_xhr(url, "text/html", d3_html, callback)
 };

 function d3_html(request) {
  var range = d3_document.createRange();
  range.selectNode(d3_document.body);
  return range.createContextualFragment(request.responseText)
 }
 d3.xml = d3_xhrType(function(request) {
  return request.responseXML
 });
 if (typeof define === "function" && define.amd) {
  define(d3)
 } else if (typeof module === "object" && module.exports) {
  module.exports = d3
 } else {
  this.d3 = d3
 }
}();
(function() {
 if (typeof module === "undefined") self.queue = queue;
 else module.exports = queue;
 queue.version = "1.0.4";
 var slice = [].slice;

 function queue(parallelism) {
  var q, tasks = [],
   started = 0,
   active = 0,
   remaining = 0,
   popping, error = null,
   await = noop,
   all;
  if (!parallelism) parallelism = Infinity;

  function pop() {
   while (popping = started < tasks.length && active < parallelism) {
    var i = started++,
     t = tasks[i],
     a = slice.call(t, 1);
    a.push(callback(i));
    ++active;
    t[0].apply(null, a)
   }
  }

  function callback(i) {
   return function(e, r) {
    --active;
    if (error != null) return;
    if (e != null) {
     error = e;
     started = remaining = NaN;
     notify()
    } else {
     tasks[i] = r;
     if (--remaining) popping || pop();
     else notify()
    }
   }
  }

  function notify() {
   if (error != null) await (error);
   else if (all) await (error, tasks);
   else await.apply(null, [error].concat(tasks))
  }
  return q = {
   defer: function() {
    if (!error) {
     tasks.push(arguments);
     ++remaining;
     pop()
    }
    return q
   },
   await: function(f) {
    await = f;
    all = false;
    if (!remaining) notify();
    return q
   },
   awaitAll: function(f) {
    await = f;
    all = true;
    if (!remaining) notify();
    return q
   }
  }
 }

 function noop() {}
})();
topojson = function() {
 function merge(topology, arcs) {
  var fragmentByStart = {},
   fragmentByEnd = {};
  arcs.forEach(function(i) {
   var e = ends(i),
    start = e[0],
    end = e[1],
    f, g;
   if (f = fragmentByEnd[start]) {
    delete fragmentByEnd[f.end];
    f.push(i);
    f.end = end;
    if (g = fragmentByStart[end]) {
     delete fragmentByStart[g.start];
     var fg = g === f ? f : f.concat(g);
     fragmentByStart[fg.start = f.start] = fragmentByEnd[fg.end = g.end] = fg
    } else if (g = fragmentByEnd[end]) {
     delete fragmentByStart[g.start];
     delete fragmentByEnd[g.end];
     var fg = f.concat(g.map(function(i) {
      return ~i
     }).reverse());
     fragmentByStart[fg.start = f.start] = fragmentByEnd[fg.end = g.start] = fg
    } else {
     fragmentByStart[f.start] = fragmentByEnd[f.end] = f
    }
   } else if (f = fragmentByStart[end]) {
    delete fragmentByStart[f.start];
    f.unshift(i);
    f.start = start;
    if (g = fragmentByEnd[start]) {
     delete fragmentByEnd[g.end];
     var gf = g === f ? f : g.concat(f);
     fragmentByStart[gf.start = g.start] = fragmentByEnd[gf.end = f.end] = gf
    } else if (g = fragmentByStart[start]) {
     delete fragmentByStart[g.start];
     delete fragmentByEnd[g.end];
     var gf = g.map(function(i) {
      return ~i
     }).reverse().concat(f);
     fragmentByStart[gf.start = g.end] = fragmentByEnd[gf.end = f.end] = gf
    } else {
     fragmentByStart[f.start] = fragmentByEnd[f.end] = f
    }
   } else if (f = fragmentByStart[start]) {
    delete fragmentByStart[f.start];
    f.unshift(~i);
    f.start = end;
    if (g = fragmentByEnd[end]) {
     delete fragmentByEnd[g.end];
     var gf = g === f ? f : g.concat(f);
     fragmentByStart[gf.start = g.start] = fragmentByEnd[gf.end = f.end] = gf
    } else if (g = fragmentByStart[end]) {
     delete fragmentByStart[g.start];
     delete fragmentByEnd[g.end];
     var gf = g.map(function(i) {
      return ~i
     }).reverse().concat(f);
     fragmentByStart[gf.start = g.end] = fragmentByEnd[gf.end = f.end] = gf
    } else {
     fragmentByStart[f.start] = fragmentByEnd[f.end] = f
    }
   } else if (f = fragmentByEnd[end]) {
    delete fragmentByEnd[f.end];
    f.push(~i);
    f.end = start;
    if (g = fragmentByEnd[start]) {
     delete fragmentByStart[g.start];
     var fg = g === f ? f : f.concat(g);
     fragmentByStart[fg.start = f.start] = fragmentByEnd[fg.end = g.end] = fg
    } else if (g = fragmentByStart[start]) {
     delete fragmentByStart[g.start];
     delete fragmentByEnd[g.end];
     var fg = f.concat(g.map(function(i) {
      return ~i
     }).reverse());
     fragmentByStart[fg.start = f.start] = fragmentByEnd[fg.end = g.start] = fg
    } else {
     fragmentByStart[f.start] = fragmentByEnd[f.end] = f
    }
   } else {
    f = [i];
    fragmentByStart[f.start = start] = fragmentByEnd[f.end = end] = f
   }
  });

  function ends(i) {
   var arc = topology.arcs[i],
    p0 = arc[0],
    p1 = [0, 0];
   arc.forEach(function(dp) {
    p1[0] += dp[0], p1[1] += dp[1]
   });
   return [p0, p1]
  }
  var fragments = [];
  for (var k in fragmentByEnd) fragments.push(fragmentByEnd[k]);
  return fragments
 }

 function mesh(topology, o, filter) {
  var arcs = [];
  if (arguments.length > 1) {
   var geomsByArc = [],
    geom;

   function arc(i) {
    if (i < 0) i = ~i;
    (geomsByArc[i] || (geomsByArc[i] = [])).push(geom)
   }

   function line(arcs) {
    arcs.forEach(arc)
   }

   function polygon(arcs) {
    arcs.forEach(line)
   }

   function geometry(o) {
    if (o.type === "GeometryCollection") o.geometries.forEach(geometry);
    else if (o.type in geometryType) {
     geom = o;
     geometryType[o.type](o.arcs)
    }
   }
   var geometryType = {
    LineString: line,
    MultiLineString: polygon,
    Polygon: polygon,
    MultiPolygon: function(arcs) {
     arcs.forEach(polygon)
    }
   };
   geometry(o);
   geomsByArc.forEach(arguments.length < 3 ? function(geoms, i) {
    arcs.push(i)
   } : function(geoms, i) {
    if (filter(geoms[0], geoms[geoms.length - 1])) arcs.push(i)
   })
  } else {
   for (var i = 0, n = topology.arcs.length; i < n; ++i) arcs.push(i)
  }
  return object(topology, {
   type: "MultiLineString",
   arcs: merge(topology, arcs)
  })
 }

 function featureOrCollection(topology, o) {
  return o.type === "GeometryCollection" ? {
   type: "FeatureCollection",
   features: o.geometries.map(function(o) {
    return feature(topology, o)
   })
  } : feature(topology, o)
 }

 function feature(topology, o) {
  var f = {
   type: "Feature",
   id: o.id,
   properties: o.properties || {},
   geometry: object(topology, o)
  };
  if (o.id == null) delete f.id;
  return f
 }

 function object(topology, o) {
  var absolute = transformAbsolute(topology.transform),
   arcs = topology.arcs;

  function arc(i, points) {
   if (points.length) points.pop();
   for (var a = arcs[i < 0 ? ~i : i], k = 0, n = a.length, p; k < n; ++k) {
    points.push(p = a[k].slice());
    absolute(p, k)
   }
   if (i < 0) reverse(points, n)
  }

  function point(p) {
   p = p.slice();
   absolute(p, 0);
   return p
  }

  function line(arcs) {
   var points = [];
   for (var i = 0, n = arcs.length; i < n; ++i) arc(arcs[i], points);
   if (points.length < 2) points.push(points[0].slice());
   return points
  }

  function ring(arcs) {
   var points = line(arcs);
   while (points.length < 4) points.push(points[0].slice());
   return points
  }

  function polygon(arcs) {
   return arcs.map(ring)
  }

  function geometry(o) {
   var t = o.type;
   return t === "GeometryCollection" ? {
    type: t,
    geometries: o.geometries.map(geometry)
   } : t in geometryType ? {
    type: t,
    coordinates: geometryType[t](o)
   } : null
  }
  var geometryType = {
   Point: function(o) {
    return point(o.coordinates)
   },
   MultiPoint: function(o) {
    return o.coordinates.map(point)
   },
   LineString: function(o) {
    return line(o.arcs)
   },
   MultiLineString: function(o) {
    return o.arcs.map(line)
   },
   Polygon: function(o) {
    return polygon(o.arcs)
   },
   MultiPolygon: function(o) {
    return o.arcs.map(polygon)
   }
  };
  return geometry(o)
 }

 function reverse(array, n) {
  var t, j = array.length,
   i = j - n;
  while (i < --j) t = array[i], array[i++] = array[j], array[j] = t
 }

 function bisect(a, x) {
  var lo = 0,
   hi = a.length;
  while (lo < hi) {
   var mid = lo + hi >>> 1;
   if (a[mid] < x) lo = mid + 1;
   else hi = mid
  }
  return lo
 }

 function neighbors(objects) {
  var indexesByArc = {},
   neighbors = objects.map(function() {
    return []
   });

  function line(arcs, i) {
   arcs.forEach(function(a) {
    if (a < 0) a = ~a;
    var o = indexesByArc[a];
    if (o) o.push(i);
    else indexesByArc[a] = [i]
   })
  }

  function polygon(arcs, i) {
   arcs.forEach(function(arc) {
    line(arc, i)
   })
  }

  function geometry(o, i) {
   if (o.type === "GeometryCollection") o.geometries.forEach(function(o) {
    geometry(o, i)
   });
   else if (o.type in geometryType) geometryType[o.type](o.arcs, i)
  }
  var geometryType = {
   LineString: line,
   MultiLineString: polygon,
   Polygon: polygon,
   MultiPolygon: function(arcs, i) {
    arcs.forEach(function(arc) {
     polygon(arc, i)
    })
   }
  };
  objects.forEach(geometry);
  for (var i in indexesByArc) {
   for (var indexes = indexesByArc[i], m = indexes.length, j = 0; j < m; ++j) {
    for (var k = j + 1; k < m; ++k) {
     var ij = indexes[j],
      ik = indexes[k],
      n;
     if ((n = neighbors[ij])[i = bisect(n, ik)] !== ik) n.splice(i, 0, ik);
     if ((n = neighbors[ik])[i = bisect(n, ij)] !== ij) n.splice(i, 0, ij)
    }
   }
  }
  return neighbors
 }

 function presimplify(topology, triangleArea) {
  var absolute = transformAbsolute(topology.transform),
   relative = transformRelative(topology.transform),
   heap = minHeap(compareArea),
   maxArea = 0,
   triangle;
  if (!triangleArea) triangleArea = cartesianArea;
  topology.arcs.forEach(function(arc) {
   var triangles = [];
   arc.forEach(absolute);
   for (var i = 1, n = arc.length - 1; i < n; ++i) {
    triangle = arc.slice(i - 1, i + 2);
    triangle[1][2] = triangleArea(triangle);
    triangles.push(triangle);
    heap.push(triangle)
   }
   arc[0][2] = arc[n][2] = Infinity;
   for (var i = 0, n = triangles.length; i < n; ++i) {
    triangle = triangles[i];
    triangle.previous = triangles[i - 1];
    triangle.next = triangles[i + 1]
   }
  });
  while (triangle = heap.pop()) {
   var previous = triangle.previous,
    next = triangle.next;
   if (triangle[1][2] < maxArea) triangle[1][2] = maxArea;
   else maxArea = triangle[1][2];
   if (previous) {
    previous.next = next;
    previous[2] = triangle[2];
    update(previous)
   }
   if (next) {
    next.previous = previous;
    next[0] = triangle[0];
    update(next)
   }
  }
  topology.arcs.forEach(function(arc) {
   arc.forEach(relative)
  });

  function update(triangle) {
   heap.remove(triangle);
   triangle[1][2] = triangleArea(triangle);
   heap.push(triangle)
  }
  return topology
 }

 function cartesianArea(triangle) {
  return Math.abs((triangle[0][0] - triangle[2][0]) * (triangle[1][1] - triangle[0][1]) - (triangle[0][0] - triangle[1][0]) * (triangle[2][1] - triangle[0][1]))
 }

 function compareArea(a, b) {
  return a[1][2] - b[1][2]
 }

 function minHeap(compare) {
  var heap = {},
   array = [];
  heap.push = function() {
   for (var i = 0, n = arguments.length; i < n; ++i) {
    var object = arguments[i];
    up(object.index = array.push(object) - 1)
   }
   return array.length
  };
  heap.pop = function() {
   var removed = array[0],
    object = array.pop();
   if (array.length) {
    array[object.index = 0] = object;
    down(0)
   }
   return removed
  };
  heap.remove = function(removed) {
   var i = removed.index,
    object = array.pop();
   if (i !== array.length) {
    array[object.index = i] = object;
    (compare(object, removed) < 0 ? up : down)(i)
   }
   return i
  };

  function up(i) {
   var object = array[i];
   while (i > 0) {
    var up = (i + 1 >> 1) - 1,
     parent = array[up];
    if (compare(object, parent) >= 0) break;
    array[parent.index = i] = parent;
    array[object.index = i = up] = object
   }
  }

  function down(i) {
   var object = array[i];
   while (true) {
    var right = i + 1 << 1,
     left = right - 1,
     down = i,
     child = array[down];
    if (left < array.length && compare(array[left], child) < 0) child = array[down = left];
    if (right < array.length && compare(array[right], child) < 0) child = array[down = right];
    if (down === i) break;
    array[child.index = i] = child;
    array[object.index = i = down] = object
   }
  }
  return heap
 }

 function transformAbsolute(transform) {
  if (!transform) return noop;
  var x0, y0, kx = transform.scale[0],
   ky = transform.scale[1],
   dx = transform.translate[0],
   dy = transform.translate[1];
  return function(point, i) {
   if (!i) x0 = y0 = 0;
   point[0] = (x0 += point[0]) * kx + dx;
   point[1] = (y0 += point[1]) * ky + dy
  }
 }

 function transformRelative(transform) {
  if (!transform) return noop;
  var x0, y0, kx = transform.scale[0],
   ky = transform.scale[1],
   dx = transform.translate[0],
   dy = transform.translate[1];
  return function(point, i) {
   if (!i) x0 = y0 = 0;
   var x1 = (point[0] - dx) / kx | 0,
    y1 = (point[1] - dy) / ky | 0;
   point[0] = x1 - x0;
   point[1] = y1 - y0;
   x0 = x1;
   y0 = y1
  }
 }

 function noop() {}
 return {
  version: "1.4.0",
  mesh: mesh,
  feature: featureOrCollection,
  neighbors: neighbors,
  presimplify: presimplify
 }
}();
(function(win, doc) {
 var data = win.staticData;
 if (!data) data = win.staticData = {};
 data.dates = {
  dates: [{
   labels: ["12.", "Jun", "2014"]
  }, {
   labels: ["13.", "Jun", "2014"]
  }, {
   labels: ["14.", "Jun", "2014"]
  }, {
   labels: ["15.", "Jun", "2014"]
  }, {
   labels: ["16.", "Jun", "2014"]
  }, {
   labels: ["17.", "Jun", "2014"]
  }, {
   labels: ["18.", "Jun", "2014"]
  }, {
   labels: ["19.", "Jun", "2014"]
  }, {
   labels: ["20.", "Jun", "2014"]
  }, {
   labels: ["21.", "Jun", "2014"]
  }, {
   labels: ["22.", "Jun", "2014"]
  }, {
   labels: ["23.", "Jun", "2014"]
  }, {
   labels: ["24.", "Jun", "2014"]
  }, {
   labels: ["25.", "Jun", "2014"]
  }, {
   labels: ["26.", "Jun", "2014"]
  }, {
   labels: ["28.", "Jun", "2014"]
  }, {
   labels: ["29.", "Jun", "2014"]
  }, {
   labels: ["30.", "Jun", "2014"]
  }, {
   labels: ["1.", "Jul", "2014"]
  }, {
   labels: ["4.", "Jul", "2014"]
  }, {
   labels: ["5.", "Jul", "2014"]
  }, {
   labels: ["8.", "Jul", "2014"]
  }, {
   labels: ["9.", "Jul", "2014"]
  }, {
   labels: ["12.", "Jul", "2014"]
  }, {
   labels: ["13.", "Jul", "2014"]
  }]
 };
 data.groups = [{
  label: "A",
  teams: ["Brazil", "Croatia", "Mexico", "Cameroon"]
 }, {
  label: "B",
  teams: ["Spain", "Netherlands", "Chile", "Australia"]
 }, {
  label: "C",
  teams: ["Colombia", "Greece", "Ivory Coast", "Japan"]
 }, {
  label: "D",
  teams: ["Uruguay", "Costa Rica", "England", "Italy"]
 }, {
  label: "E",
  teams: ["Switzerland", "Ecuador", "France", "Honduras"]
 }, {
  label: "F",
  teams: ["Argentina", "Bosnia and Herzegovina", "Iran", "Nigeria"]
 }, {
  label: "G",
  teams: ["Germany", "Portugal", "Ghana", "USA"]
 }, {
  label: "H",
  teams: ["Belgium", "Algeria", "Russia", "South Korea"]
 }, {
  label: LABELS.last_sixteen
 }, {
  label: LABELS.quarter_finals
 }, {
  label: LABELS.semi_finals
 }, {
  label: LABELS.third_place
 }, {
  label: LABELS.finals
 }];
 data.worldmap = {
  type: "Topology",
  objects: {
   countries: {
    type: "GeometryCollection",
    geometries: [{
     type: "Polygon",
     id: 4,
     arcs: [
      [0, 1, 2, 3, 4, 5]
     ]
    }, {
     type: "MultiPolygon",
     id: 24,
     arcs: [
      [
       [6, 7, 8, 9]
      ],
      [
       [10, 11, 12]
      ]
     ]
    }, {
     type: "Polygon",
     id: 8,
     arcs: [
      [13, 14, 15, 16, 17]
     ]
    }, {
     type: "Polygon",
     id: 784,
     arcs: [
      [18, 19, 20, 21, 22]
     ]
    }, {
     type: "MultiPolygon",
     id: 32,
     arcs: [
      [
       [23, 24]
      ],
      [
       [25, 26, 27, 28, 29, 30]
      ]
     ]
    }, {
     type: "Polygon",
     id: 51,
     arcs: [
      [31, 32, 33, 34, 35]
     ]
    }, {
     type: "Polygon",
     id: 260,
     arcs: [
      [36]
     ]
    }, {
     type: "MultiPolygon",
     id: 36,
     arcs: [
      [
       [37]
      ],
      [
       [38]
      ]
     ]
    }, {
     type: "Polygon",
     id: 40,
     arcs: [
      [39, 40, 41, 42, 43, 44, 45]
     ]
    }, {
     type: "MultiPolygon",
     id: 31,
     arcs: [
      [
       [46, -35]
      ],
      [
       [47, 48, -33, 49, 50]
      ]
     ]
    }, {
     type: "Polygon",
     id: 108,
     arcs: [
      [51, 52, 53]
     ]
    }, {
     type: "Polygon",
     id: 56,
     arcs: [
      [54, 55, 56, 57, 58]
     ]
    }, {
     type: "Polygon",
     id: 204,
     arcs: [
      [59, 60, 61, 62, 63]
     ]
    }, {
     type: "Polygon",
     id: 854,
     arcs: [
      [64, 65, 66, -62, 67, 68]
     ]
    }, {
     type: "Polygon",
     id: 50,
     arcs: [
      [69, 70, 71]
     ]
    }, {
     type: "Polygon",
     id: 100,
     arcs: [
      [72, 73, 74, 75, 76, 77]
     ]
    }, {
     type: "MultiPolygon",
     id: 44,
     arcs: [
      [
       [78]
      ],
      [
       [79]
      ],
      [
       [80]
      ]
     ]
    }, {
     type: "Polygon",
     id: 70,
     arcs: [
      [81, 82, 83]
     ]
    }, {
     type: "Polygon",
     id: 112,
     arcs: [
      [84, 85, 86, 87, 88]
     ]
    }, {
     type: "Polygon",
     id: 84,
     arcs: [
      [89, 90, 91]
     ]
    }, {
     type: "Polygon",
     id: 68,
     arcs: [
      [92, 93, 94, 95, -31]
     ]
    }, {
     type: "Polygon",
     id: 76,
     arcs: [
      [-27, 96, -95, 97, 98, 99, 100, 101, 102, 103, 104]
     ]
    }, {
     type: "Polygon",
     id: 96,
     arcs: [
      [105, 106]
     ]
    }, {
     type: "Polygon",
     id: 64,
     arcs: [
      [107, 108]
     ]
    }, {
     type: "Polygon",
     id: 72,
     arcs: [
      [109, 110, 111, 112]
     ]
    }, {
     type: "Polygon",
     id: 140,
     arcs: [
      [113, 114, 115, 116, 117, 118, 119]
     ]
    }, {
     type: "MultiPolygon",
     id: 124,
     arcs: [
      [
       [120]
      ],
      [
       [121]
      ],
      [
       [122]
      ],
      [
       [123]
      ],
      [
       [124]
      ],
      [
       [125]
      ],
      [
       [126]
      ],
      [
       [127]
      ],
      [
       [128]
      ],
      [
       [129]
      ],
      [
       [130, 131, 132, 133]
      ],
      [
       [134]
      ],
      [
       [135]
      ],
      [
       [136]
      ],
      [
       [137]
      ],
      [
       [138]
      ],
      [
       [139]
      ],
      [
       [140]
      ],
      [
       [141]
      ],
      [
       [142]
      ],
      [
       [143]
      ],
      [
       [144]
      ],
      [
       [145]
      ],
      [
       [146]
      ],
      [
       [147]
      ],
      [
       [148]
      ],
      [
       [149]
      ],
      [
       [150]
      ],
      [
       [151]
      ],
      [
       [152]
      ]
     ]
    }, {
     type: "Polygon",
     id: 756,
     arcs: [
      [-43, 153, 154, 155]
     ]
    }, {
     type: "MultiPolygon",
     id: 152,
     arcs: [
      [
       [-24, 156]
      ],
      [
       [-30, 157, 158, -93]
      ]
     ]
    }, {
     type: "MultiPolygon",
     id: 156,
     arcs: [
      [
       [159]
      ],
      [
       [160, 161, 162, 163, 164, 165, -109, 166, 167, 168, 169, -4, 170, 171, 172, 173, 174, 175]
      ]
     ]
    }, {
     type: "Polygon",
     id: 384,
     arcs: [
      [176, 177, 178, 179, -65, 180]
     ]
    }, {
     type: "Polygon",
     id: 120,
     arcs: [
      [181, 182, 183, 184, 185, 186, -120, 187]
     ]
    }, {
     type: "Polygon",
     id: 180,
     arcs: [
      [188, 189, -52, 190, 191, -10, 192, -13, 193, -118, 194]
     ]
    }, {
     type: "Polygon",
     id: 178,
     arcs: [
      [-12, 195, 196, -188, -119, -194]
     ]
    }, {
     type: "Polygon",
     id: 170,
     arcs: [
      [197, 198, 199, 200, 201, -99, 202]
     ]
    }, {
     type: "Polygon",
     id: 188,
     arcs: [
      [203, 204, 205, 206]
     ]
    }, {
     type: "Polygon",
     id: 192,
     arcs: [
      [207]
     ]
    }, {
     type: "Polygon",
     id: -99,
     arcs: [
      [208, 209]
     ]
    }, {
     type: "Polygon",
     id: 196,
     arcs: [
      [210, -210]
     ]
    }, {
     type: "Polygon",
     id: 203,
     arcs: [
      [-45, 211, 212, 213]
     ]
    }, {
     type: "Polygon",
     id: 276,
     arcs: [
      [214, 215, -212, -44, -156, 216, 217, -56, 218, 219, 220]
     ]
    }, {
     type: "Polygon",
     id: 262,
     arcs: [
      [221, 222, 223, 224]
     ]
    }, {
     type: "MultiPolygon",
     id: 208,
     arcs: [
      [
       [225]
      ],
      [
       [-221, 226]
      ]
     ]
    }, {
     type: "Polygon",
     id: 214,
     arcs: [
      [227, 228]
     ]
    }, {
     type: "Polygon",
     id: 12,
     arcs: [
      [229, 230, 231, 232, 233, 234, 235, 236]
     ]
    }, {
     type: "Polygon",
     id: 218,
     arcs: [
      [237, -198, 238]
     ]
    }, {
     type: "Polygon",
     id: 818,
     arcs: [
      [239, 240, 241, 242, 243]
     ]
    }, {
     type: "Polygon",
     id: 232,
     arcs: [
      [244, 245, 246, -225]
     ]
    }, {
     type: "Polygon",
     id: 724,
     arcs: [
      [247, 248, 249, 250]
     ]
    }, {
     type: "Polygon",
     id: 233,
     arcs: [
      [251, 252, 253]
     ]
    }, {
     type: "Polygon",
     id: 231,
     arcs: [
      [-224, 254, 255, 256, 257, 258, 259, -245]
     ]
    }, {
     type: "Polygon",
     id: 246,
     arcs: [
      [260, 261, 262, 263]
     ]
    }, {
     type: "MultiPolygon",
     id: 242,
     arcs: [
      [
       [264]
      ],
      [
       [265]
      ],
      [
       [266]
      ]
     ]
    }, {
     type: "Polygon",
     id: 238,
     arcs: [
      [267]
     ]
    }, {
     type: "MultiPolygon",
     id: 250,
     arcs: [
      [
       [268, 269, 270, -103]
      ],
      [
       [271]
      ],
      [
       [272, -217, -155, 273, 274, -249, 275, -58]
      ]
     ]
    }, {
     type: "Polygon",
     id: 266,
     arcs: [
      [276, 277, -182, -197]
     ]
    }, {
     type: "Polygon",
     id: 82600,
     arcs: [
      [278, 279]
     ]
    }, {
     type: "Polygon",
     id: 826,
     arcs: [
      [280]
     ]
    }, {
     type: "Polygon",
     id: 82601,
     arcs: [
      [594]
     ]
    }, {
     type: "Polygon",
     id: 268,
     arcs: [
      [281, 282, -50, -32, 283]
     ]
    }, {
     type: "Polygon",
     id: 288,
     arcs: [
      [284, -181, -69, 285]
     ]
    }, {
     type: "Polygon",
     id: 324,
     arcs: [
      [286, 287, 288, 289, 290, 291, -179]
     ]
    }, {
     type: "Polygon",
     id: 270,
     arcs: [
      [292, 293]
     ]
    }, {
     type: "Polygon",
     id: 624,
     arcs: [
      [294, 295, -290]
     ]
    }, {
     type: "Polygon",
     id: 226,
     arcs: [
      [296, -183, -278]
     ]
    }, {
     type: "MultiPolygon",
     id: 300,
     arcs: [
      [
       [297]
      ],
      [
       [298, -15, 299, -76, 300]
      ]
     ]
    }, {
     type: "Polygon",
     id: 304,
     arcs: [
      [301]
     ]
    }, {
     type: "Polygon",
     id: 320,
     arcs: [
      [302, 303, -92, 304, 305, 306]
     ]
    }, {
     type: "Polygon",
     id: 328,
     arcs: [
      [307, 308, -101, 309]
     ]
    }, {
     type: "Polygon",
     id: 340,
     arcs: [
      [310, 311, -306, 312, 313]
     ]
    }, {
     type: "Polygon",
     id: 191,
     arcs: [
      [314, -84, 315, 316, 317, 318]
     ]
    }, {
     type: "Polygon",
     id: 332,
     arcs: [
      [-229, 319]
     ]
    }, {
     type: "Polygon",
     id: 348,
     arcs: [
      [-40, 320, 321, 322, 323, -319, 324]
     ]
    }, {
     type: "MultiPolygon",
     id: 360,
     arcs: [
      [
       [325]
      ],
      [
       [326, 327]
      ],
      [
       [328]
      ],
      [
       [329]
      ],
      [
       [330]
      ],
      [
       [331]
      ],
      [
       [332]
      ],
      [
       [333]
      ],
      [
       [334, 335]
      ],
      [
       [336]
      ],
      [
       [337]
      ],
      [
       [338, 339]
      ],
      [
       [340]
      ]
     ]
    }, {
     type: "Polygon",
     id: 356,
     arcs: [
      [-169, 341, -167, -108, -166, 342, -72, 343, 344]
     ]
    }, {
     type: "Polygon",
     id: 372,
     arcs: [
      [345, -279]
     ]
    }, {
     type: "Polygon",
     id: 364,
     arcs: [
      [346, -6, 347, 348, 349, 350, -47, -34, -49, 351]
     ]
    }, {
     type: "Polygon",
     id: 368,
     arcs: [
      [352, 353, 354, 355, 356, 357, -350]
     ]
    }, {
     type: "Polygon",
     id: 352,
     arcs: [
      [358]
     ]
    }, {
     type: "Polygon",
     id: 376,
     arcs: [
      [359, 360, 361, -244, 362, 363, 364]
     ]
    }, {
     type: "MultiPolygon",
     id: 380,
     arcs: [
      [
       [365]
      ],
      [
       [366]
      ],
      [
       [367, 368, -274, -154, -42]
      ]
     ]
    }, {
     type: "Polygon",
     id: 388,
     arcs: [
      [369]
     ]
    }, {
     type: "Polygon",
     id: 400,
     arcs: [
      [-360, 370, -356, 371, 372, -362, 373]
     ]
    }, {
     type: "MultiPolygon",
     id: 392,
     arcs: [
      [
       [374]
      ],
      [
       [375]
      ],
      [
       [376]
      ]
     ]
    }, {
     type: "Polygon",
     id: 398,
     arcs: [
      [377, 378, 379, 380, -173, 381]
     ]
    }, {
     type: "Polygon",
     id: 404,
     arcs: [
      [382, 383, 384, 385, -257, 386]
     ]
    }, {
     type: "Polygon",
     id: 417,
     arcs: [
      [-382, -172, 387, 388]
     ]
    }, {
     type: "Polygon",
     id: 116,
     arcs: [
      [389, 390, 391, 392]
     ]
    }, {
     type: "Polygon",
     id: 410,
     arcs: [
      [393, 394]
     ]
    }, {
     type: "Polygon",
     id: -99,
     arcs: [
      [-18, 395, 396, 397]
     ]
    }, {
     type: "Polygon",
     id: 414,
     arcs: [
      [398, 399, -354]
     ]
    }, {
     type: "Polygon",
     id: 418,
     arcs: [
      [400, 401, -164, 402, -391]
     ]
    }, {
     type: "Polygon",
     id: 422,
     arcs: [
      [-364, 403, 404]
     ]
    }, {
     type: "Polygon",
     id: 430,
     arcs: [
      [405, 406, -287, -178]
     ]
    }, {
     type: "Polygon",
     id: 434,
     arcs: [
      [407, -237, 408, 409, -242, 410, 411]
     ]
    }, {
     type: "Polygon",
     id: 144,
     arcs: [
      [412]
     ]
    }, {
     type: "Polygon",
     id: 426,
     arcs: [
      [413]
     ]
    }, {
     type: "Polygon",
     id: 440,
     arcs: [
      [414, 415, 416, -85, 417]
     ]
    }, {
     type: "Polygon",
     id: 442,
     arcs: [
      [-218, -273, -57]
     ]
    }, {
     type: "Polygon",
     id: 428,
     arcs: [
      [418, -254, 419, -86, -417]
     ]
    }, {
     type: "Polygon",
     id: 504,
     arcs: [
      [-234, 420, 421]
     ]
    }, {
     type: "Polygon",
     id: 498,
     arcs: [
      [422, 423]
     ]
    }, {
     type: "Polygon",
     id: 450,
     arcs: [
      [424]
     ]
    }, {
     type: "Polygon",
     id: 484,
     arcs: [
      [425, -90, -304, 426, 427]
     ]
    }, {
     type: "Polygon",
     id: 807,
     arcs: [
      [-398, 428, -77, -300, -14]
     ]
    }, {
     type: "Polygon",
     id: 466,
     arcs: [
      [429, -231, 430, -66, -180, -292, 431]
     ]
    }, {
     type: "Polygon",
     id: 104,
     arcs: [
      [432, -70, -343, -165, -402, 433]
     ]
    }, {
     type: "Polygon",
     id: 499,
     arcs: [
      [434, -316, -83, 435, -396, -17]
     ]
    }, {
     type: "Polygon",
     id: 496,
     arcs: [
      [436, -175]
     ]
    }, {
     type: "Polygon",
     id: 508,
     arcs: [
      [437, 438, 439, 440, 441, 442, 443, 444]
     ]
    }, {
     type: "Polygon",
     id: 478,
     arcs: [
      [445, 446, 447, -232, -430]
     ]
    }, {
     type: "Polygon",
     id: 454,
     arcs: [
      [-445, 448, 449]
     ]
    }, {
     type: "MultiPolygon",
     id: 458,
     arcs: [
      [
       [450, 451]
      ],
      [
       [-339, 452, -107, 453]
      ]
     ]
    }, {
     type: "Polygon",
     id: 516,
     arcs: [
      [454, -8, 455, -111, 456]
     ]
    }, {
     type: "Polygon",
     id: 540,
     arcs: [
      [457]
     ]
    }, {
     type: "Polygon",
     id: 562,
     arcs: [
      [-67, -431, -230, -408, 458, -186, 459, -63]
     ]
    }, {
     type: "Polygon",
     id: 566,
     arcs: [
      [460, -64, -460, -185]
     ]
    }, {
     type: "Polygon",
     id: 558,
     arcs: [
      [461, -314, 462, -205]
     ]
    }, {
     type: "Polygon",
     id: 528,
     arcs: [
      [-219, -55, 463]
     ]
    }, {
     type: "MultiPolygon",
     id: 578,
     arcs: [
      [
       [464, -264, 465, 466]
      ],
      [
       [467]
      ],
      [
       [468]
      ],
      [
       [469]
      ]
     ]
    }, {
     type: "Polygon",
     id: 524,
     arcs: [
      [-342, -168]
     ]
    }, {
     type: "MultiPolygon",
     id: 554,
     arcs: [
      [
       [470]
      ],
      [
       [471]
      ]
     ]
    }, {
     type: "MultiPolygon",
     id: 512,
     arcs: [
      [
       [472, 473, -22, 474]
      ],
      [
       [-20, 475]
      ]
     ]
    }, {
     type: "Polygon",
     id: 586,
     arcs: [
      [-170, -345, 476, -348, -5]
     ]
    }, {
     type: "Polygon",
     id: 591,
     arcs: [
      [477, -207, 478, -200]
     ]
    }, {
     type: "Polygon",
     id: 604,
     arcs: [
      [-159, 479, -239, -203, -98, -94]
     ]
    }, {
     type: "MultiPolygon",
     id: 608,
     arcs: [
      [
       [480]
      ],
      [
       [481]
      ],
      [
       [482]
      ],
      [
       [483]
      ],
      [
       [484]
      ],
      [
       [485]
      ],
      [
       [486]
      ]
     ]
    }, {
     type: "MultiPolygon",
     id: 598,
     arcs: [
      [
       [487]
      ],
      [
       [488]
      ],
      [
       [-335, 489]
      ],
      [
       [490]
      ]
     ]
    }, {
     type: "Polygon",
     id: 616,
     arcs: [
      [-216, 491, 492, -418, -89, 493, 494, -213]
     ]
    }, {
     type: "Polygon",
     id: 630,
     arcs: [
      [495]
     ]
    }, {
     type: "Polygon",
     id: 408,
     arcs: [
      [496, 497, -395, 498, -161]
     ]
    }, {
     type: "Polygon",
     id: 620,
     arcs: [
      [-251, 499]
     ]
    }, {
     type: "Polygon",
     id: 600,
     arcs: [
      [-96, -97, -26]
     ]
    }, {
     type: "Polygon",
     id: 275,
     arcs: [
      [-374, -361]
     ]
    }, {
     type: "Polygon",
     id: 634,
     arcs: [
      [500, 501]
     ]
    }, {
     type: "Polygon",
     id: 642,
     arcs: [
      [502, -424, 503, 504, -73, 505, -323]
     ]
    }, {
     type: "MultiPolygon",
     id: 643,
     arcs: [
      [
       [506]
      ],
      [
       [-493, 507, -415]
      ],
      [
       [508]
      ],
      [
       [509]
      ],
      [
       [510]
      ],
      [
       [511]
      ],
      [
       [512]
      ],
      [
       [513]
      ],
      [
       [514]
      ],
      [
       [-497, -176, -437, -174, -381, 515, -51, -283, 516, 517, -87, -420, -253, 518, -261, -465, 519]
      ],
      [
       [520]
      ],
      [
       [521]
      ],
      [
       [522]
      ]
     ]
    }, {
     type: "Polygon",
     id: 646,
     arcs: [
      [523, -53, -190, 524]
     ]
    }, {
     type: "Polygon",
     id: 732,
     arcs: [
      [-233, -448, 525, -421]
     ]
    }, {
     type: "Polygon",
     id: 682,
     arcs: [
      [526, -372, -355, -400, 527, -502, 528, -23, -474, 529]
     ]
    }, {
     type: "Polygon",
     id: 729,
     arcs: [
      [530, 531, -115, 532, -411, -241, 533, -246, -260, 534]
     ]
    }, {
     type: "Polygon",
     id: 728,
     arcs: [
      [535, -258, -386, 536, -195, -117, 537, -531]
     ]
    }, {
     type: "Polygon",
     id: 686,
     arcs: [
      [538, -446, -432, -291, -296, 539, -294]
     ]
    }, {
     type: "MultiPolygon",
     id: 90,
     arcs: [
      [
       [540]
      ],
      [
       [541]
      ],
      [
       [542]
      ],
      [
       [543]
      ],
      [
       [544]
      ]
     ]
    }, {
     type: "Polygon",
     id: 694,
     arcs: [
      [545, -288, -407]
     ]
    }, {
     type: "Polygon",
     id: 222,
     arcs: [
      [546, -307, -312]
     ]
    }, {
     type: "Polygon",
     id: -99,
     arcs: [
      [-255, -223, 547, 548]
     ]
    }, {
     type: "Polygon",
     id: 706,
     arcs: [
      [-387, -256, -549, 549]
     ]
    }, {
     type: "Polygon",
     id: 688,
     arcs: [
      [-78, -429, -397, -436, -82, -315, -324, -506]
     ]
    }, {
     type: "Polygon",
     id: 740,
     arcs: [
      [550, -270, 551, -102, -309]
     ]
    }, {
     type: "Polygon",
     id: 703,
     arcs: [
      [-495, 552, -321, -46, -214]
     ]
    }, {
     type: "Polygon",
     id: 705,
     arcs: [
      [-41, -325, -318, 553, -368]
     ]
    }, {
     type: "Polygon",
     id: 752,
     arcs: [
      [-466, -263, 554]
     ]
    }, {
     type: "Polygon",
     id: 748,
     arcs: [
      [555, -441]
     ]
    }, {
     type: "Polygon",
     id: 760,
     arcs: [
      [-371, -365, -405, 556, 557, -357]
     ]
    }, {
     type: "Polygon",
     id: 148,
     arcs: [
      [-459, -412, -533, -114, -187]
     ]
    }, {
     type: "Polygon",
     id: 768,
     arcs: [
      [558, -286, -68, -61]
     ]
    }, {
     type: "Polygon",
     id: 764,
     arcs: [
      [559, -452, 560, -434, -401, -390]
     ]
    }, {
     type: "Polygon",
     id: 762,
     arcs: [
      [-388, -171, -3, 561]
     ]
    }, {
     type: "Polygon",
     id: 795,
     arcs: [
      [-347, 562, -379, 563, -1]
     ]
    }, {
     type: "Polygon",
     id: 626,
     arcs: [
      [564, -327]
     ]
    }, {
     type: "Polygon",
     id: 780,
     arcs: [
      [565]
     ]
    }, {
     type: "Polygon",
     id: 788,
     arcs: [
      [-236, 566, -409]
     ]
    }, {
     type: "MultiPolygon",
     id: 792,
     arcs: [
      [
       [-284, -36, -351, -358, -558, 567]
      ],
      [
       [-301, -75, 568]
      ]
     ]
    }, {
     type: "Polygon",
     id: 158,
     arcs: [
      [569]
     ]
    }, {
     type: "Polygon",
     id: 834,
     arcs: [
      [-384, 570, -438, -450, 571, -191, -54, -524, 572]
     ]
    }, {
     type: "Polygon",
     id: 800,
     arcs: [
      [-525, -189, -537, -385, -573]
     ]
    }, {
     type: "Polygon",
     id: 804,
     arcs: [
      [-518, 573, -504, -423, -503, -322, -553, -494, -88]
     ]
    }, {
     type: "Polygon",
     id: 858,
     arcs: [
      [-105, 574, -28]
     ]
    }, {
     type: "MultiPolygon",
     id: 840,
     arcs: [
      [
       [575]
      ],
      [
       [576]
      ],
      [
       [577]
      ],
      [
       [578]
      ],
      [
       [579]
      ],
      [
       [580, -428, 581, -131]
      ],
      [
       [582]
      ],
      [
       [583]
      ],
      [
       [584]
      ],
      [
       [-133, 585]
      ]
     ]
    }, {
     type: "Polygon",
     id: 860,
     arcs: [
      [-564, -378, -389, -562, -2]
     ]
    }, {
     type: "Polygon",
     id: 862,
     arcs: [
      [586, -310, -100, -202]
     ]
    }, {
     type: "Polygon",
     id: 704,
     arcs: [
      [587, -392, -403, -163]
     ]
    }, {
     type: "MultiPolygon",
     id: 548,
     arcs: [
      [
       [588]
      ],
      [
       [589]
      ]
     ]
    }, {
     type: "Polygon",
     id: 887,
     arcs: [
      [590, -530, -473]
     ]
    }, {
     type: "Polygon",
     id: 710,
     arcs: [
      [-457, -110, 591, -442, -556, -440, 592],
      [-414]
     ]
    }, {
     type: "Polygon",
     id: 894,
     arcs: [
      [-449, -444, 593, -112, -456, -7, -192, -572]
     ]
    }, {
     type: "Polygon",
     id: 716,
     arcs: [
      [-592, -113, -594, -443]
     ]
    }]
   }
  },
  arcs: [
   [
    [6700, 6553],
    [28, -27],
    [21, 9],
    [6, 33],
    [22, 11],
    [15, 21],
    [6, 58],
    [23, 14],
    [5, 25],
    [13, -19],
    [8, -2]
   ],
   [
    [6847, 6676],
    [16, -1],
    [20, -15]
   ],
   [
    [6883, 6660],
    [9, -9],
    [20, 23],
    [9, -13],
    [9, 32],
    [17, -1],
    [4, 11],
    [3, 29],
    [12, 24],
    [15, -16],
    [-3, -22],
    [9, -3],
    [-3, -61],
    [11, -23],
    [10, 15],
    [12, 7],
    [17, 32],
    [19, -5],
    [29, 0]
   ],
   [
    [7082, 6680],
    [5, -21]
   ],
   [
    [7087, 6659],
    [-16, -8],
    [-14, -13],
    [-32, -8],
    [-30, -15],
    [-16, -32],
    [6, -30],
    [4, -36],
    [-14, -30],
    [1, -28],
    [-8, -25],
    [-26, 2],
    [11, -48],
    [-18, -18],
    [-12, -43],
    [2, -43],
    [-11, -21],
    [-10, 7],
    [-22, -9],
    [-3, -20],
    [-20, 0],
    [-16, -41],
    [-1, -61],
    [-36, -30],
    [-19, 7],
    [-6, -16],
    [-16, 9],
    [-28, -11],
    [-47, 37]
   ],
   [
    [6690, 6135],
    [25, 65],
    [-2, 46],
    [-21, 12],
    [-2, 46],
    [-9, 57],
    [12, 40],
    [-12, 10],
    [7, 52],
    [12, 90]
   ],
   [
    [5664, 3208],
    [3, -22],
    [-4, -35],
    [5, -33],
    [-4, -27],
    [3, -25],
    [-58, 1],
    [-2, -229],
    [19, -58],
    [18, -45]
   ],
   [
    [5644, 2735],
    [-51, -29],
    [-67, 10],
    [-19, 34],
    [-113, -3],
    [-4, -5],
    [-17, 32],
    [-18, 3],
    [-16, -13],
    [-14, -13]
   ],
   [
    [5325, 2751],
    [-2, 45],
    [4, 63],
    [9, 66],
    [2, 31],
    [9, 64],
    [6, 30],
    [16, 47],
    [9, 32],
    [3, 53],
    [-1, 41],
    [-9, 25],
    [-7, 44],
    [-7, 43],
    [2, 15],
    [8, 28],
    [-8, 70],
    [-6, 48],
    [-14, 45],
    [3, 14]
   ],
   [
    [5342, 3555],
    [11, 10],
    [8, -2],
    [10, 9],
    [82, -1],
    [7, -53],
    [8, -44],
    [6, -23],
    [11, -37],
    [18, 6],
    [9, 10],
    [16, -11],
    [4, 18],
    [7, 42],
    [17, 3],
    [2, 13],
    [14, 0],
    [-3, -26],
    [34, 1],
    [1, -46],
    [5, -27],
    [-4, -44],
    [2, -44],
    [9, -26],
    [-1, -86],
    [7, 7],
    [12, -2],
    [17, 11],
    [13, -5]
   ],
   [
    [5338, 3577],
    [-8, 54]
   ],
   [
    [5330, 3631],
    [12, 31],
    [8, 12],
    [10, -24]
   ],
   [
    [5360, 3650],
    [-10, -15],
    [-4, -19],
    [-1, -31],
    [-7, -8]
   ],
   [
    [5571, 6998],
    [-3, -24],
    [4, -31],
    [11, -17]
   ],
   [
    [5583, 6926],
    [0, -19],
    [-9, -11],
    [-2, -23],
    [-13, -35]
   ],
   [
    [5559, 6838],
    [-5, 5],
    [0, 16],
    [-15, 24],
    [-3, 34],
    [2, 49],
    [4, 23],
    [-4, 11]
   ],
   [
    [5538, 7e3],
    [-2, 23],
    [12, 35],
    [1, -13],
    [8, 6]
   ],
   [
    [5557, 7051],
    [6, -19],
    [7, -8],
    [1, -26]
   ],
   [
    [6432, 5734],
    [5, 3],
    [1, -19],
    [22, 11],
    [23, -2],
    [17, -2],
    [19, 49],
    [20, 46],
    [18, 44]
   ],
   [
    [6557, 5864],
    [5, -25]
   ],
   [
    [6562, 5839],
    [4, -56]
   ],
   [
    [6566, 5783],
    [-14, -1],
    [-3, -46],
    [5, -10],
    [-12, -14],
    [0, -30],
    [-8, -30],
    [-1, -28]
   ],
   [
    [6533, 5624],
    [-6, -16],
    [-83, 37],
    [-11, 72],
    [-1, 17]
   ],
   [
    [3140, 51],
    [-17, 2],
    [-30, 0],
    [0, 161]
   ],
   [
    [3093, 214],
    [11, -34],
    [14, -53],
    [36, -44],
    [39, -18],
    [-13, -35],
    [-26, -4],
    [-14, 25]
   ],
   [
    [3258, 2396],
    [51, -118],
    [23, -11],
    [34, -53],
    [29, -28],
    [4, -31],
    [-28, -109],
    [28, -20],
    [32, -11],
    [22, 12],
    [25, 55],
    [4, 63]
   ],
   [
    [3482, 2145],
    [14, 14],
    [14, -42],
    [-1, -57],
    [-23, -40],
    [-19, -29],
    [-31, -70],
    [-37, -98]
   ],
   [
    [3399, 1823],
    [-7, -57],
    [-7, -74],
    [0, -71],
    [-6, -16],
    [-2, -47]
   ],
   [
    [3377, 1558],
    [-2, -37],
    [35, -62],
    [-4, -49],
    [18, -31],
    [-2, -36],
    [-26, -92],
    [-42, -38],
    [-55, -15],
    [-31, 7],
    [6, -43],
    [-6, -53],
    [5, -37],
    [-16, -25],
    [-29, -10],
    [-26, 26],
    [-11, -18],
    [4, -72],
    [18, -21],
    [16, 22],
    [8, -37],
    [-26, -22],
    [-22, -45],
    [-4, -72],
    [-7, -39],
    [-26, 0],
    [-22, -37],
    [-8, -54],
    [28, -52],
    [26, -15],
    [-9, -64],
    [-33, -41],
    [-18, -84],
    [-25, -28],
    [-12, -34],
    [9, -74],
    [19, -42],
    [-12, 4]
   ],
   [
    [3095, 238],
    [-26, 11],
    [-67, 10],
    [-11, 42],
    [0, 53],
    [-18, -4],
    [-10, 26],
    [-3, 76],
    [22, 31],
    [9, 46],
    [-4, 36],
    [15, 62],
    [10, 95],
    [-3, 42],
    [12, 13],
    [-3, 27],
    [-13, 15],
    [10, 30],
    [-13, 27],
    [-6, 83],
    [11, 15],
    [-5, 87],
    [7, 74],
    [7, 64],
    [17, 26],
    [-9, 70],
    [0, 66],
    [21, 47],
    [-1, 60],
    [16, 70],
    [0, 66],
    [-7, 13],
    [-13, 124],
    [17, 74],
    [-2, 69],
    [10, 66],
    [18, 67],
    [20, 45],
    [-9, 28],
    [6, 23],
    [-1, 120],
    [30, 35],
    [10, 75],
    [-3, 18]
   ],
   [
    [3136, 2361],
    [23, 64],
    [36, -17],
    [16, -52],
    [11, 58],
    [32, -3],
    [4, -15]
   ],
   [
    [6210, 6944],
    [39, 11]
   ],
   [
    [6249, 6955],
    [5, -19],
    [11, -13],
    [-6, -18],
    [15, -24],
    [-8, -23],
    [12, -20],
    [13, -11],
    [0, -50]
   ],
   [
    [6291, 6777],
    [-10, -2]
   ],
   [
    [6281, 6775],
    [-11, 41],
    [0, 11],
    [-12, 0],
    [-9, 20],
    [-5, -2]
   ],
   [
    [6244, 6845],
    [-11, 21],
    [-21, 17],
    [3, 35],
    [-5, 26]
   ],
   [
    [6914, 502],
    [18, -23],
    [26, -9],
    [1, -14],
    [-7, -32],
    [-43, -5],
    [-1, 38],
    [4, 30],
    [2, 15]
   ],
   [
    [9038, 1064],
    [27, -25],
    [15, 10],
    [22, 14],
    [16, -5],
    [2, -85],
    [-9, -25],
    [-3, -58],
    [-10, 20],
    [-19, -50],
    [-6, 4],
    [-17, 2],
    [-17, 62],
    [-4, 47],
    [-16, 62],
    [1, 33],
    [18, -6]
   ],
   [
    [8987, 3005],
    [10, -57],
    [18, 28],
    [9, -31],
    [13, -28],
    [-3, -32],
    [6, -61],
    [5, -36],
    [7, -9],
    [7, -61],
    [-3, -37],
    [9, -49],
    [31, -38],
    [19, -34],
    [19, -31],
    [-4, -17],
    [16, -45],
    [11, -78],
    [11, 16],
    [11, -32],
    [7, 12],
    [5, -77],
    [19, -44],
    [13, -27],
    [22, -58],
    [8, -58],
    [1, -41],
    [-2, -44],
    [13, -61],
    [-2, -64],
    [-5, -33],
    [-7, -64],
    [1, -41],
    [-6, -52],
    [-12, -65],
    [-21, -35],
    [-10, -56],
    [-9, -36],
    [-8, -61],
    [-11, -36],
    [-7, -54],
    [-4, -49],
    [2, -23],
    [-16, -25],
    [-31, -3],
    [-26, -29],
    [-13, -28],
    [-17, -31],
    [-23, 32],
    [-17, 13],
    [5, 37],
    [-15, -14],
    [-25, -52],
    [-24, 20],
    [-15, 11],
    [-16, 5],
    [-27, 21],
    [-18, 44],
    [-5, 55],
    [-7, 36],
    [-13, 29],
    [-27, 9],
    [9, 35],
    [-7, 53],
    [-13, -50],
    [-25, -13],
    [14, 40],
    [5, 41],
    [10, 36],
    [-2, 53],
    [-22, -61],
    [-18, -25],
    [-10, -57],
    [-22, 29],
    [1, 39],
    [-18, 52],
    [-14, 26],
    [5, 17],
    [-36, 44],
    [-19, 2],
    [-27, 35],
    [-50, -7],
    [-36, -26],
    [-31, -24],
    [-27, 5],
    [-29, -37],
    [-24, -17],
    [-6, -37],
    [-10, -29],
    [-23, -2],
    [-18, -6],
    [-24, 13],
    [-20, -8],
    [-19, -3],
    [-17, -39],
    [-8, 3],
    [-14, -20],
    [-13, -23],
    [-21, 3],
    [-18, 0],
    [-30, 46],
    [-15, 14],
    [1, 41],
    [14, 10],
    [4, 16],
    [-1, 26],
    [4, 50],
    [-3, 42],
    [-15, 73],
    [-4, 41],
    [1, 41],
    [-11, 46],
    [-1, 22],
    [-12, 28],
    [-4, 56],
    [-16, 57],
    [-4, 31],
    [13, -31],
    [-10, 66],
    [14, -20],
    [8, -28],
    [0, 37],
    [-14, 56],
    [-3, 23],
    [-6, 21],
    [3, 42],
    [6, 17],
    [4, 36],
    [-3, 42],
    [11, 52],
    [2, -55],
    [12, 50],
    [22, 24],
    [14, 30],
    [21, 27],
    [13, 5],
    [7, -9],
    [22, 27],
    [17, 8],
    [4, 16],
    [8, 6],
    [15, -1],
    [29, 21],
    [15, 32],
    [7, 38],
    [17, 36],
    [1, 29],
    [1, 39],
    [19, 61],
    [12, -62],
    [12, 14],
    [-10, 34],
    [9, 35],
    [12, -15],
    [3, 54],
    [15, 36],
    [7, 28],
    [14, 12],
    [0, 20],
    [13, -8],
    [0, 18],
    [12, 10],
    [14, 10],
    [20, -33],
    [16, -43],
    [17, 0],
    [18, -7],
    [-6, 40],
    [13, 57],
    [13, 19],
    [-5, 18],
    [12, 41],
    [17, 25],
    [14, -8],
    [24, 13],
    [-1, 37],
    [-20, 24],
    [15, 10],
    [18, -18],
    [15, -29],
    [23, -19],
    [8, 8],
    [17, -22],
    [17, 20],
    [10, -6],
    [7, 14],
    [12, -36],
    [-7, -38],
    [-11, -29],
    [-9, -3],
    [3, -28],
    [-8, -36],
    [-10, -36],
    [2, -20],
    [22, -39],
    [21, -23],
    [15, -25],
    [20, -43],
    [8, 0],
    [14, -18],
    [4, -22],
    [27, -25],
    [18, 25],
    [6, 38],
    [5, 32],
    [4, 40],
    [8, 57],
    [-4, 35],
    [2, 20],
    [-3, 42],
    [4, 54],
    [5, 14],
    [-4, 24],
    [7, 38],
    [5, 40],
    [1, 20],
    [10, 27],
    [8, -35],
    [2, -45],
    [7, -9],
    [1, -30],
    [10, -36],
    [2, -41],
    [-1, -26]
   ],
   [
    [5471, 7448],
    [-2, -29],
    [-16, 0],
    [6, -16],
    [-9, -46]
   ],
   [
    [5450, 7357],
    [-6, -12],
    [-24, -2],
    [-14, -16],
    [-23, 6]
   ],
   [
    [5383, 7333],
    [-40, 18],
    [-6, 25],
    [-27, -12],
    [-4, -14],
    [-16, 10]
   ],
   [
    [5290, 7360],
    [-15, 2],
    [-12, 13],
    [4, 18],
    [-1, 12]
   ],
   [
    [5266, 7405],
    [8, 4],
    [14, -19],
    [4, 18],
    [25, -3],
    [20, 13],
    [13, -2],
    [9, -15],
    [2, 13],
    [-4, 46],
    [10, 9],
    [10, 34]
   ],
   [
    [5377, 7503],
    [21, -24],
    [15, 30],
    [10, 5],
    [22, -22],
    [13, 4],
    [13, -14]
   ],
   [
    [5471, 7482],
    [-3, -9],
    [3, -25]
   ],
   [
    [6281, 6775],
    [-19, 9],
    [-14, 33],
    [-4, 28]
   ],
   [
    [6349, 6995],
    [15, -38],
    [14, -51],
    [13, -3],
    [8, -19],
    [-23, -6],
    [-5, -56],
    [-4, -25],
    [-11, -17],
    [1, -35]
   ],
   [
    [6357, 6745],
    [-7, -4],
    [-17, 38],
    [10, 35],
    [-9, 21],
    [-10, -5],
    [-33, -53]
   ],
   [
    [6249, 6955],
    [6, 12],
    [21, -21],
    [15, -4],
    [4, 8],
    [-14, 39],
    [7, 10]
   ],
   [
    [6288, 6999],
    [8, -3],
    [19, -43],
    [13, -5],
    [4, 18],
    [17, 29]
   ],
   [
    [5814, 3670],
    [-1, 87],
    [-7, 32]
   ],
   [
    [5806, 3789],
    [17, -5],
    [8, 40],
    [15, -4]
   ],
   [
    [5846, 3820],
    [1, -29],
    [6, -16],
    [1, -23],
    [-7, -15],
    [-11, -38],
    [-10, -26],
    [-12, -3]
   ],
   [
    [5092, 7680],
    [20, -6],
    [26, 15],
    [17, -31],
    [16, -17]
   ],
   [
    [5171, 7641],
    [-4, -49]
   ],
   [
    [5167, 7592],
    [-7, -2],
    [-3, -41]
   ],
   [
    [5157, 7549],
    [-24, 33],
    [-14, -5],
    [-20, 33],
    [-13, 29],
    [-13, 1],
    [-4, 26]
   ],
   [
    [5069, 7666],
    [23, 14]
   ],
   [
    [5074, 4442],
    [-23, -8]
   ],
   [
    [5051, 4434],
    [-7, 50],
    [2, 165],
    [-6, 14],
    [-1, 36],
    [-10, 25],
    [-8, 21],
    [3, 38]
   ],
   [
    [5024, 4783],
    [10, 8],
    [6, 31],
    [13, 7],
    [6, 21]
   ],
   [
    [5059, 4850],
    [10, 21],
    [10, 1],
    [21, -42]
   ],
   [
    [5100, 4830],
    [-1, -24],
    [6, -42],
    [-6, -29],
    [3, -19],
    [-13, -45],
    [-9, -22],
    [-5, -45],
    [1, -46],
    [-2, -116]
   ],
   [
    [4921, 4685],
    [-19, 19],
    [-13, -3],
    [-10, -18],
    [-12, 15],
    [-5, 24],
    [-13, 16]
   ],
   [
    [4849, 4738],
    [-1, 41],
    [7, 31],
    [-1, 24],
    [23, 60],
    [4, 49],
    [7, 17],
    [14, -9],
    [11, 14],
    [4, 19],
    [22, 32],
    [5, 22],
    [26, 30],
    [15, 10],
    [7, -13],
    [18, 0]
   ],
   [
    [5010, 5065],
    [-2, -35],
    [3, -33],
    [16, -46],
    [1, -35],
    [32, -16],
    [-1, -50]
   ],
   [
    [5024, 4783],
    [-24, 1]
   ],
   [
    [5e3, 4784],
    [-13, 6],
    [-9, -12],
    [-12, 6],
    [-48, -4],
    [-1, -41],
    [4, -54]
   ],
   [
    [7573, 5576],
    [0, -52],
    [-10, 11],
    [2, -58]
   ],
   [
    [7565, 5477],
    [-8, 38],
    [-1, 36],
    [-6, 35],
    [-11, 42],
    [-26, 3],
    [3, -30],
    [-9, -40],
    [-12, 15],
    [-4, -14],
    [-8, 8],
    [-11, 7]
   ],
   [
    [7472, 5577],
    [-4, 59],
    [-10, 54],
    [5, 43],
    [-17, 19],
    [6, 27],
    [18, 26],
    [-20, 38],
    [9, 49],
    [22, -31],
    [14, -4],
    [2, -49],
    [26, -10],
    [26, 1],
    [16, -13],
    [-13, -60],
    [-12, -4],
    [-9, -41],
    [16, -38],
    [4, 46],
    [8, 1],
    [14, -114]
   ],
   [
    [5629, 7169],
    [8, -29],
    [11, 5],
    [21, -11],
    [41, -4],
    [13, 18],
    [33, 17],
    [20, -26],
    [17, -8]
   ],
   [
    [5793, 7131],
    [-15, -29],
    [-10, -52],
    [9, -41]
   ],
   [
    [5777, 7009],
    [-24, 10],
    [-28, -23]
   ],
   [
    [5725, 6996],
    [0, -35],
    [-26, -7],
    [-19, 25],
    [-22, -20],
    [-21, 2]
   ],
   [
    [5637, 6961],
    [-2, 48],
    [-14, 23]
   ],
   [
    [5621, 7032],
    [5, 10],
    [-3, 8],
    [4, 23],
    [11, 23],
    [-14, 31],
    [-2, 26],
    [7, 16]
   ],
   [
    [2846, 5699],
    [-7, -3],
    [-7, 41],
    [-10, 21],
    [6, 45],
    [8, -3],
    [10, -59],
    [0, -42]
   ],
   [
    [2838, 5902],
    [-30, -12],
    [-2, 27],
    [13, 5],
    [18, -2],
    [1, -18]
   ],
   [
    [2861, 5902],
    [-5, -51],
    [-5, 9],
    [0, 38],
    [-12, 28],
    [0, 9],
    [22, -33]
   ],
   [
    [5527, 7214],
    [10, 0],
    [-7, -31],
    [14, -28],
    [-4, -34],
    [-7, -3]
   ],
   [
    [5533, 7118],
    [-5, -6],
    [-9, -17],
    [-4, -40]
   ],
   [
    [5515, 7055],
    [-25, 28],
    [-10, 30],
    [-11, 16],
    [-12, 26],
    [-6, 23],
    [-14, 33],
    [6, 30],
    [10, -17],
    [6, 15],
    [13, 2],
    [24, -12],
    [19, 1],
    [12, -16]
   ],
   [
    [5652, 7864],
    [27, 0],
    [30, 27],
    [6, 40],
    [23, 23],
    [-3, 32]
   ],
   [
    [5735, 7986],
    [17, 12],
    [30, 28]
   ],
   [
    [5782, 8026],
    [29, -18],
    [4, -18],
    [15, 9],
    [27, -17],
    [3, -34],
    [-6, -19],
    [17, -47],
    [12, -13],
    [-2, -13],
    [19, -13],
    [8, -19],
    [-11, -16],
    [-23, 3],
    [-5, -7],
    [7, -24],
    [6, -46]
   ],
   [
    [5882, 7734],
    [-23, -4],
    [-9, -16],
    [-2, -36],
    [-11, 7],
    [-25, -4],
    [-7, 17],
    [-11, -12],
    [-10, 10],
    [-22, 2],
    [-31, 17],
    [-28, 5],
    [-22, -1],
    [-15, -20],
    [-13, -2]
   ],
   [
    [5653, 7697],
    [-1, 31],
    [-8, 34],
    [17, 14],
    [0, 29],
    [-8, 27],
    [-1, 32]
   ],
   [
    [2524, 5272],
    [-1, 10],
    [4, 4],
    [5, -9],
    [10, 43],
    [5, 1]
   ],
   [
    [2547, 5321],
    [0, -10],
    [5, 0],
    [0, -20],
    [-5, -31],
    [3, -11],
    [-3, -26],
    [2, -7],
    [-4, -36],
    [-5, -19],
    [-5, -2],
    [-6, -25]
   ],
   [
    [2529, 5134],
    [-8, 0],
    [2, 81],
    [1, 57]
   ],
   [
    [3136, 2361],
    [-20, -10],
    [-11, 99],
    [-15, 80],
    [9, 70],
    [-15, 30],
    [-4, 52],
    [-13, 49]
   ],
   [
    [3067, 2731],
    [17, 77],
    [-12, 61],
    [7, 24],
    [-5, 26],
    [10, 36],
    [1, 61],
    [1, 51],
    [6, 24],
    [-24, 116]
   ],
   [
    [3068, 3207],
    [21, -6],
    [14, 1],
    [6, 22],
    [25, 29],
    [14, 27],
    [37, 12],
    [-3, -54],
    [3, -27],
    [-2, -48],
    [30, -65],
    [31, -12],
    [11, -26],
    [19, -15],
    [11, -20],
    [18, 0],
    [16, -21],
    [1, -42],
    [6, -21],
    [0, -31],
    [-8, -1],
    [11, -83],
    [53, -3],
    [-4, -42],
    [3, -28],
    [15, -20],
    [6, -45],
    [-4, -56],
    [-8, -32],
    [3, -41],
    [-9, -15]
   ],
   [
    [3384, 2544],
    [-1, 22],
    [-25, 37],
    [-26, 1],
    [-49, -21],
    [-13, -63],
    [-1, -38],
    [-11, -86]
   ],
   [
    [3482, 2145],
    [6, 41],
    [3, 43],
    [1, 39],
    [-10, 13],
    [-11, -11],
    [-10, 3],
    [-4, 28],
    [-2, 65],
    [-5, 22],
    [-19, 19],
    [-11, -14],
    [-30, 14],
    [2, 97],
    [-8, 40]
   ],
   [
    [3068, 3207],
    [-15, -13],
    [-13, 9],
    [2, 109],
    [-23, -43],
    [-24, 2],
    [-11, 38],
    [-18, 5],
    [5, 30],
    [-15, 44],
    [-11, 65],
    [7, 13],
    [0, 30],
    [17, 21],
    [-3, 39],
    [7, 25],
    [2, 33],
    [32, 49],
    [22, 14],
    [4, 11],
    [25, -4]
   ],
   [
    [3058, 3684],
    [13, 197],
    [0, 31],
    [-4, 42],
    [-12, 26],
    [0, 52],
    [15, 12],
    [6, -8],
    [1, 28],
    [-16, 7],
    [-1, 45],
    [54, -1],
    [10, 24],
    [7, -22],
    [6, -43],
    [5, 9]
   ],
   [
    [3142, 4083],
    [15, -38],
    [22, 5],
    [5, 22],
    [21, 16],
    [11, 12],
    [4, 31],
    [19, 20],
    [-1, 15],
    [-24, 6],
    [-3, 46],
    [1, 48],
    [-13, 18],
    [5, 7],
    [21, -9],
    [22, -18],
    [8, 17],
    [20, 11],
    [31, 27],
    [10, 27],
    [-3, 20]
   ],
   [
    [3313, 4366],
    [14, 4],
    [7, -17],
    [-4, -31],
    [9, -11],
    [7, -34],
    [-8, -25],
    [-4, -61],
    [7, -36],
    [2, -34],
    [17, -33],
    [14, -4],
    [3, 14],
    [8, 3],
    [13, 13],
    [9, 19],
    [15, -6],
    [7, 2]
   ],
   [
    [3429, 4129],
    [15, -5],
    [3, 14],
    [-5, 15],
    [3, 20],
    [11, -6],
    [13, 7],
    [16, -15]
   ],
   [
    [3485, 4159],
    [12, -15],
    [9, 20],
    [6, -3],
    [4, -20],
    [13, 5],
    [11, 27],
    [8, 53],
    [17, 65]
   ],
   [
    [3565, 4291],
    [9, 4],
    [7, -40],
    [16, -125],
    [14, -12],
    [1, -50],
    [-21, -59],
    [9, -22],
    [49, -11],
    [1, -72],
    [21, 47],
    [35, -25],
    [46, -44],
    [14, -42],
    [-5, -40],
    [33, 22],
    [54, -38],
    [41, 3],
    [41, -60],
    [36, -80],
    [21, -21],
    [24, -3],
    [10, -22],
    [9, -92],
    [5, -43],
    [-11, -119],
    [-14, -47],
    [-39, -100],
    [-18, -81],
    [-21, -62],
    [-7, -2],
    [-7, -52],
    [2, -135],
    [-8, -111],
    [-3, -47],
    [-9, -28],
    [-5, -96],
    [-28, -94],
    [-5, -74],
    [-22, -31],
    [-7, -43],
    [-30, 0],
    [-44, -28],
    [-19, -32],
    [-31, -21],
    [-33, -57],
    [-23, -71],
    [-5, -54],
    [5, -39],
    [-5, -73],
    [-6, -35],
    [-20, -39],
    [-31, -127],
    [-24, -57],
    [-19, -33],
    [-13, -69],
    [-18, -41]
   ],
   [
    [3517, 1568],
    [-8, 41],
    [13, 34],
    [-16, 49],
    [-22, 40],
    [-29, 46],
    [-10, -2],
    [-28, 55],
    [-18, -8]
   ],
   [
    [8172, 4318],
    [11, 27],
    [23, 39]
   ],
   [
    [8206, 4384],
    [-1, -35],
    [-2, -46],
    [-13, 2],
    [-6, -24],
    [-12, 37]
   ],
   [
    [7546, 5987],
    [12, -23],
    [-2, -44],
    [-23, -2],
    [-23, 5],
    [-18, -11],
    [-25, 27],
    [-1, 14]
   ],
   [
    [7466, 5953],
    [19, 54],
    [15, 18],
    [20, -17],
    [14, -2],
    [12, -19]
   ],
   [
    [5817, 2407],
    [-39, -53],
    [-25, -54],
    [-10, -47],
    [-8, -27],
    [-15, -6],
    [-5, -35],
    [-3, -22],
    [-17, -17],
    [-23, 4],
    [-13, 20],
    [-12, 9],
    [-14, -17],
    [-6, -34],
    [-14, -22],
    [-13, -32],
    [-20, -7],
    [-6, 25],
    [2, 44],
    [-16, 68],
    [-8, 11]
   ],
   [
    [5552, 2215],
    [0, 209],
    [27, 3],
    [1, 256],
    [21, 2],
    [43, 25],
    [10, -30],
    [18, 29],
    [9, 0],
    [15, 16]
   ],
   [
    [5696, 2725],
    [5, -5]
   ],
   [
    [5701, 2720],
    [11, -58],
    [5, -13],
    [9, -41],
    [32, -79],
    [12, -8],
    [0, -25],
    [8, -46],
    [21, -11],
    [18, -32]
   ],
   [
    [5424, 4526],
    [23, 5],
    [5, 19],
    [5, -2],
    [7, -16],
    [34, 28],
    [12, 28],
    [15, 25],
    [-3, 25],
    [8, 7],
    [27, -5],
    [26, 33],
    [20, 79],
    [14, 29],
    [18, 12]
   ],
   [
    [5635, 4793],
    [3, -31],
    [16, -44],
    [0, -30],
    [-5, -30],
    [2, -22],
    [10, -21]
   ],
   [
    [5661, 4615],
    [21, -31]
   ],
   [
    [5682, 4584],
    [15, -29],
    [0, -23],
    [19, -38],
    [12, -31],
    [7, -43],
    [20, -28],
    [5, -23]
   ],
   [
    [5760, 4369],
    [-9, -8],
    [-18, 2],
    [-21, 7],
    [-10, -6],
    [-5, -17],
    [-9, -2],
    [-10, 15],
    [-31, -36],
    [-13, 7],
    [-4, -5],
    [-8, -44],
    [-21, 14],
    [-20, 7],
    [-18, 27],
    [-23, 24],
    [-15, -23],
    [-10, -36],
    [-3, -50]
   ],
   [
    [5512, 4245],
    [-18, 4],
    [-19, 12],
    [-16, -38],
    [-15, -67]
   ],
   [
    [5444, 4156],
    [-3, 21],
    [-1, 32],
    [-13, 24],
    [-10, 37],
    [-2, 25],
    [-13, 38],
    [2, 21],
    [-3, 31],
    [2, 55],
    [7, 13],
    [14, 73]
   ],
   [
    [3231, 7335],
    [20, -9],
    [26, 2],
    [-14, -30],
    [-10, -4],
    [-35, 30],
    [-7, 24],
    [10, 22],
    [10, -35]
   ],
   [
    [3283, 7519],
    [-14, -1],
    [-36, 22],
    [-26, 34],
    [10, 6],
    [37, -18],
    [28, -30],
    [1, -13]
   ],
   [
    [1569, 7476],
    [-14, -10],
    [-46, 33],
    [-8, 25],
    [-25, 25],
    [-5, 21],
    [-28, 13],
    [-11, 39],
    [2, 17],
    [30, -16],
    [17, -11],
    [26, -8],
    [9, -24],
    [14, -34],
    [28, -30],
    [11, -40]
   ],
   [
    [3440, 7633],
    [-18, -63],
    [18, 24],
    [19, -15],
    [-10, -25],
    [25, -20],
    [12, 17],
    [28, -22],
    [-8, -52],
    [19, 12],
    [4, -38],
    [8, -45],
    [-11, -63],
    [-13, -3],
    [-18, 14],
    [6, 59],
    [-8, 9],
    [-32, -62],
    [-17, 2],
    [20, 34],
    [-27, 17],
    [-30, -4],
    [-54, 2],
    [-4, 21],
    [17, 26],
    [-12, 19],
    [24, 43],
    [28, 115],
    [18, 41],
    [24, 24],
    [13, -3],
    [-6, -19],
    [-15, -45]
   ],
   [
    [1300, 7883],
    [13, -10],
    [27, 6],
    [-8, -82],
    [24, -57],
    [-11, 0],
    [-17, 33],
    [-10, 33],
    [-14, 22],
    [-5, 32],
    [1, 23]
   ],
   [
    [2798, 8456],
    [-11, -38],
    [-12, 7],
    [-8, 21],
    [2, 5],
    [10, 22],
    [12, -2],
    [7, -15]
   ],
   [
    [2725, 8496],
    [-33, -40],
    [-19, 2],
    [-6, 19],
    [20, 33],
    [38, 0],
    [0, -14]
   ],
   [
    [2634, 8707],
    [5, -31],
    [15, 11],
    [16, -19],
    [30, -25],
    [32, -22],
    [2, -34],
    [21, 6],
    [20, -24],
    [-25, -23],
    [-43, 17],
    [-16, 33],
    [-27, -38],
    [-40, -38],
    [-9, 42],
    [-38, -7],
    [24, 36],
    [4, 57],
    [9, 65],
    [20, -6]
   ],
   [
    [2892, 8815],
    [-31, -4],
    [-7, 35],
    [12, 40],
    [26, 10],
    [21, -20],
    [1, -30],
    [-4, -10],
    [-18, -21]
   ],
   [
    [2343, 8955],
    [-17, -25],
    [-38, 22],
    [-22, -8],
    [-38, 32],
    [24, 22],
    [19, 32],
    [30, -21],
    [17, -13],
    [8, -13],
    [17, -28]
   ],
   [
    [3135, 7234],
    [-18, 41],
    [0, 98],
    [-13, 20],
    [-18, -12],
    [-10, 19],
    [-21, -54],
    [-8, -56],
    [-10, -33],
    [-12, -11],
    [-9, -4],
    [-3, -17],
    [-51, 0],
    [-42, -1],
    [-12, -13],
    [-30, -52],
    [-3, -5],
    [-9, -28],
    [-26, 0],
    [-27, -1],
    [-12, -11],
    [4, -14],
    [2, -22],
    [0, -7],
    [-36, -36],
    [-29, -11],
    [-32, -39],
    [-7, 0],
    [-10, 12],
    [-3, 10],
    [1, 8],
    [6, 25],
    [13, 39],
    [8, 43],
    [-5, 62],
    [-6, 65],
    [-29, 34],
    [3, 13],
    [-4, 8],
    [-8, 0],
    [-5, 12],
    [-2, 17],
    [-5, -8],
    [-7, 3],
    [1, 7],
    [-6, 7],
    [-3, 19],
    [-21, 23],
    [-23, 24],
    [-27, 27],
    [-26, 26],
    [-25, -20],
    [-9, -1],
    [-34, 19],
    [-23, -9],
    [-27, 22],
    [-28, 11],
    [-19, 5],
    [-9, 12],
    [-5, 39],
    [-9, 0],
    [-1, -28],
    [-57, 0],
    [-95, 0],
    [-94, 0],
    [-84, 0],
    [-83, 0],
    [-82, 0],
    [-85, 0],
    [-27, 0],
    [-82, 0],
    [-79, 0]
   ],
   [
    [1588, 7511],
    [-4, 1],
    [-54, 70],
    [-20, 31],
    [-50, 30],
    [-15, 63],
    [3, 44],
    [-35, 31],
    [-5, 58],
    [-34, 52],
    [0, 37]
   ],
   [
    [1374, 7928],
    [15, 35],
    [0, 45],
    [-48, 46],
    [-28, 82],
    [-17, 51],
    [-26, 32],
    [-19, 30],
    [-14, 37],
    [-28, -23],
    [-27, -40],
    [-25, 47],
    [-19, 31],
    [-27, 20],
    [-28, 2],
    [0, 409],
    [1, 267]
   ],
   [
    [1084, 8999],
    [51, -18],
    [44, -34],
    [29, -7],
    [24, 30],
    [34, 22],
    [41, -8],
    [42, 31],
    [45, 18],
    [20, -30],
    [20, 17],
    [6, 34],
    [20, -8],
    [47, -64],
    [37, 49],
    [3, -55],
    [34, 12],
    [11, 21],
    [34, -4],
    [42, -30],
    [65, -27],
    [38, -12],
    [28, 5],
    [37, -37],
    [-39, -35],
    [50, -16],
    [75, 9],
    [24, 12],
    [29, -43],
    [31, 37],
    [-29, 30],
    [18, 25],
    [34, 3],
    [22, 7],
    [23, -17],
    [28, -39],
    [31, 6],
    [49, -33],
    [43, 12],
    [40, -2],
    [-3, 45],
    [25, 12],
    [43, -24],
    [0, -68],
    [17, 57],
    [23, -2],
    [12, 72],
    [-30, 45],
    [-32, 29],
    [2, 79],
    [33, 52],
    [37, -11],
    [28, -32],
    [38, -81],
    [-25, -35],
    [52, -15],
    [-1, -73],
    [38, 56],
    [33, -46],
    [-9, -53],
    [27, -49],
    [29, 52],
    [21, 62],
    [1, 79],
    [40, -6],
    [41, -10],
    [37, -36],
    [2, -36],
    [-21, -38],
    [20, -38],
    [-4, -35],
    [-54, -50],
    [-39, -11],
    [-29, 21],
    [-8, -36],
    [-27, -60],
    [-8, -32],
    [-32, -48],
    [-40, -5],
    [-22, -31],
    [-2, -46],
    [-32, -9],
    [-34, -58],
    [-30, -81],
    [-11, -57],
    [-1, -83],
    [40, -12],
    [13, -67],
    [13, -55],
    [39, 14],
    [51, -31],
    [28, -27],
    [20, -34],
    [35, -20],
    [29, -30],
    [46, -4],
    [30, -7],
    [-4, -62],
    [8, -73],
    [21, -80],
    [41, -68],
    [21, 23],
    [15, 74],
    [-14, 114],
    [-20, 37],
    [45, 34],
    [31, 50],
    [16, 50],
    [-3, 48],
    [-19, 61],
    [-33, 54],
    [32, 76],
    [-12, 65],
    [-9, 112],
    [19, 16],
    [48, -19],
    [29, -7],
    [23, 19],
    [25, -25],
    [35, -41],
    [8, -28],
    [50, -6],
    [-1, -60],
    [9, -91],
    [25, -11],
    [21, -42],
    [40, 40],
    [26, 79],
    [19, 33],
    [21, -64],
    [36, -91],
    [31, -87],
    [-11, -45],
    [37, -40],
    [25, -41],
    [44, -19],
    [18, -23],
    [11, -60],
    [22, -10],
    [11, -27],
    [2, -81],
    [-20, -27],
    [-20, -25],
    [-46, -25],
    [-35, -59],
    [-47, -12],
    [-59, 15],
    [-42, 1],
    [-29, -5],
    [-23, -52],
    [-35, -32],
    [-40, -95],
    [-32, -66],
    [23, 12],
    [45, 94],
    [58, 60],
    [42, 7],
    [24, -35],
    [-26, -48],
    [9, -78],
    [9, -54],
    [36, -36],
    [46, 11],
    [28, 80],
    [2, -52],
    [17, -26],
    [-34, -47],
    [-61, -43],
    [-28, -29],
    [-31, -51],
    [-21, 5],
    [-1, 61],
    [48, 59],
    [-44, -2],
    [-31, -9]
   ],
   [
    [1829, 9243],
    [-14, -33],
    [61, 21],
    [39, -36],
    [31, 37],
    [26, -24],
    [23, -70],
    [14, 30],
    [-20, 73],
    [24, 11],
    [28, -12],
    [31, -29],
    [17, -70],
    [9, -50],
    [47, -36],
    [50, -34],
    [-3, -32],
    [-46, -5],
    [18, -28],
    [-9, -26],
    [-51, 11],
    [-48, 19],
    [-32, -4],
    [-52, -24],
    [-70, -11],
    [-50, -7],
    [-15, 34],
    [-38, 20],
    [-24, -8],
    [-35, 56],
    [19, 8],
    [43, 12],
    [39, -3],
    [36, 13],
    [-54, 16],
    [-59, -5],
    [-39, 1],
    [-15, 27],
    [64, 28],
    [-42, -1],
    [-49, 19],
    [23, 54],
    [20, 29],
    [74, 43],
    [29, -14]
   ],
   [
    [2097, 9265],
    [-24, -48],
    [-44, 51],
    [10, 10],
    [37, 3],
    [21, -16]
   ],
   [
    [2879, 9242],
    [3, -20],
    [-30, 2],
    [-30, 2],
    [-30, -10],
    [-8, 5],
    [-31, 38],
    [1, 25],
    [14, 5],
    [63, -8],
    [48, -39]
   ],
   [
    [2595, 9246],
    [22, -45],
    [26, 58],
    [70, 30],
    [48, -75],
    [-4, -47],
    [55, 21],
    [26, 29],
    [62, -37],
    [38, -34],
    [3, -31],
    [52, 16],
    [29, -46],
    [67, -28],
    [24, -29],
    [26, -67],
    [-51, -34],
    [66, -47],
    [44, -15],
    [40, -66],
    [44, -5],
    [-9, -50],
    [-49, -84],
    [-34, 31],
    [-44, 69],
    [-36, -9],
    [-3, -41],
    [29, -42],
    [38, -33],
    [11, -19],
    [18, -71],
    [-9, -52],
    [-35, 20],
    [-70, 57],
    [39, -62],
    [29, -43],
    [5, -25],
    [-76, 29],
    [-59, 41],
    [-34, 35],
    [10, 20],
    [-42, 37],
    [-40, 35],
    [0, -21],
    [-80, -11],
    [-23, 25],
    [18, 52],
    [52, 2],
    [57, 9],
    [-9, 26],
    [10, 35],
    [36, 70],
    [-8, 32],
    [-11, 25],
    [-42, 34],
    [-57, 25],
    [18, 18],
    [-29, 45],
    [-25, 4],
    [-22, 24],
    [-14, -21],
    [-51, -9],
    [-101, 16],
    [-59, 21],
    [-45, 11],
    [-23, 25],
    [29, 33],
    [-39, 0],
    [-9, 73],
    [21, 64],
    [29, 29],
    [72, 19],
    [-21, -46]
   ],
   [
    [2212, 9295],
    [33, -15],
    [50, 9],
    [7, -21],
    [-26, -34],
    [42, -31],
    [-5, -65],
    [-45, -27],
    [-27, 6],
    [-19, 27],
    [-69, 55],
    [0, 23],
    [57, -8],
    [-31, 47],
    [33, 34]
   ],
   [
    [2411, 9218],
    [-30, -53],
    [-32, 2],
    [-17, 63],
    [1, 36],
    [14, 31],
    [28, 19],
    [58, -2],
    [53, -18],
    [-42, -64],
    [-33, -14]
   ],
   [
    [1654, 9119],
    [-73, -35],
    [-15, 31],
    [-64, 38],
    [12, 31],
    [19, 52],
    [24, 47],
    [-27, 44],
    [94, 12],
    [39, -15],
    [71, -4],
    [27, -21],
    [30, -30],
    [-35, -18],
    [-68, -51],
    [-34, -50],
    [0, -31]
   ],
   [
    [2399, 9377],
    [-15, -28],
    [-40, 5],
    [-34, 19],
    [15, 32],
    [40, 20],
    [24, -25],
    [10, -23]
   ],
   [
    [2264, 9502],
    [21, -34],
    [1, -36],
    [-13, -54],
    [-46, -7],
    [-30, 11],
    [1, 42],
    [-45, -5],
    [-2, 55],
    [30, -2],
    [41, 24],
    [40, -4],
    [2, 10]
   ],
   [
    [1994, 9465],
    [11, -26],
    [25, 12],
    [29, -3],
    [5, -35],
    [-17, -34],
    [-94, -12],
    [-70, -31],
    [-43, -1],
    [-3, 23],
    [57, 32],
    [-125, -9],
    [-39, 13],
    [38, 70],
    [26, 20],
    [78, -24],
    [50, -42],
    [48, -6],
    [-40, 69],
    [26, 26],
    [29, -8],
    [9, -34]
   ],
   [
    [2370, 9529],
    [30, -23],
    [55, 0],
    [24, -24],
    [-6, -27],
    [32, -16],
    [17, -17],
    [38, -3],
    [40, -6],
    [44, 15],
    [57, 7],
    [45, -5],
    [30, -28],
    [6, -29],
    [-17, -19],
    [-42, -16],
    [-35, 9],
    [-80, -11],
    [-57, -1],
    [-45, 8],
    [-74, 24],
    [-9, 39],
    [-4, 36],
    [-27, 31],
    [-58, 9],
    [-32, 22],
    [10, 29],
    [58, -4]
   ],
   [
    [1772, 9568],
    [-4, -55],
    [-21, -25],
    [-26, -3],
    [-52, -31],
    [-44, -11],
    [-38, 15],
    [47, 54],
    [57, 47],
    [43, -1],
    [38, 10]
   ],
   [
    [2393, 9559],
    [-13, -2],
    [-52, 5],
    [-7, 20],
    [56, -1],
    [19, -14],
    [-3, -8]
   ],
   [
    [1939, 9572],
    [-52, -21],
    [-41, 23],
    [23, 23],
    [40, 8],
    [39, -12],
    [-9, -21]
   ],
   [
    [1954, 9637],
    [-34, -14],
    [-46, 0],
    [0, 10],
    [29, 22],
    [14, -4],
    [37, -14]
   ],
   [
    [2338, 9598],
    [-41, -15],
    [-23, 17],
    [-12, 27],
    [-2, 29],
    [36, -3],
    [16, -4],
    [33, -25],
    [-7, -26]
   ],
   [
    [2220, 9617],
    [11, -30],
    [-45, 8],
    [-46, 23],
    [-62, 3],
    [27, 21],
    [-34, 18],
    [-2, 27],
    [55, -10],
    [75, -26],
    [21, -34]
   ],
   [
    [2583, 9713],
    [33, -23],
    [-38, -22],
    [-51, -54],
    [-50, -5],
    [-57, 9],
    [-30, 30],
    [0, 26],
    [22, 19],
    [-50, -1],
    [-31, 24],
    [-18, 33],
    [20, 32],
    [19, 21],
    [28, 5],
    [-12, 17],
    [65, 4],
    [35, -39],
    [47, -15],
    [46, -14],
    [22, -47]
   ],
   [
    [3097, 9960],
    [74, -5],
    [60, -10],
    [51, -19],
    [-2, -19],
    [-67, -31],
    [-68, -15],
    [-25, -16],
    [61, 0],
    [-66, -43],
    [-45, -20],
    [-48, -59],
    [-57, -12],
    [-18, -15],
    [-84, -7],
    [39, -9],
    [-20, -13],
    [23, -36],
    [-26, -24],
    [-43, -21],
    [-13, -28],
    [-39, -21],
    [4, -16],
    [48, 2],
    [0, -17],
    [-74, -43],
    [-73, 20],
    [-81, -11],
    [-42, 8],
    [-52, 4],
    [-4, 34],
    [52, 17],
    [-14, 51],
    [17, 6],
    [74, -31],
    [-38, 46],
    [-45, 13],
    [23, 28],
    [49, 17],
    [8, 25],
    [-39, 28],
    [-12, 37],
    [76, -3],
    [22, -8],
    [43, 27],
    [-62, 8],
    [-98, -5],
    [-49, 25],
    [-23, 29],
    [-32, 21],
    [-6, 24],
    [41, 14],
    [32, 2],
    [55, 12],
    [41, 27],
    [34, -4],
    [30, -20],
    [21, 39],
    [37, 11],
    [50, 8],
    [85, 3],
    [14, -8],
    [81, 12],
    [60, -4],
    [60, -5]
   ],
   [
    [5290, 7360],
    [-3, -29],
    [-12, -12],
    [-20, 9],
    [-6, -29],
    [-14, -3],
    [-5, 12],
    [-15, -25],
    [-13, -3],
    [-12, 15]
   ],
   [
    [5190, 7295],
    [-10, 32],
    [-13, -11],
    [0, 32],
    [21, 40],
    [-1, 19],
    [12, -7],
    [8, 12]
   ],
   [
    [5207, 7412],
    [24, 0],
    [5, 15],
    [30, -22]
   ],
   [
    [3140, 51],
    [-10, -29],
    [-23, -22],
    [-14, 2],
    [-16, 6],
    [-21, 22],
    [-29, 10],
    [-35, 40],
    [-28, 39],
    [-38, 80],
    [23, -15],
    [39, -48],
    [36, -26],
    [15, 33],
    [9, 49],
    [25, 30],
    [20, -8]
   ],
   [
    [3095, 238],
    [-25, 0],
    [-13, -17],
    [-25, -26],
    [-5, -67],
    [-11, -2],
    [-32, 23],
    [-32, 50],
    [-34, 41],
    [-9, 46],
    [8, 42],
    [-14, 48],
    [-4, 122],
    [12, 69],
    [30, 56],
    [-43, 21],
    [27, 63],
    [9, 119],
    [31, -25],
    [15, 149],
    [-19, 19],
    [-9, -90],
    [-17, 10],
    [9, 103],
    [9, 133],
    [13, 49],
    [-8, 70],
    [-2, 81],
    [11, 2],
    [17, 116],
    [20, 115],
    [11, 107],
    [-6, 108],
    [8, 59],
    [-3, 89],
    [16, 87],
    [5, 139],
    [9, 149],
    [9, 161],
    [-2, 118],
    [-6, 101]
   ],
   [
    [3045, 2676],
    [14, 18],
    [8, 37]
   ],
   [
    [8064, 5334],
    [-24, -34],
    [-23, 22],
    [0, 62],
    [13, 32],
    [31, 20],
    [16, -1],
    [6, -28],
    [-12, -31],
    [-7, -42]
   ],
   [
    [8628, 7037],
    [-18, 43],
    [-11, -41],
    [-43, -31],
    [4, -38],
    [-24, 3],
    [-13, 23],
    [-19, -51],
    [-30, -39],
    [-23, -46]
   ],
   [
    [8451, 6860],
    [-39, -21],
    [-20, -33],
    [-30, -20],
    [15, 33],
    [-6, 28],
    [22, 49],
    [-15, 37],
    [-24, -25],
    [-32, -50],
    [-17, -47],
    [-27, -3],
    [-14, -33],
    [15, -49],
    [22, -12],
    [1, -32],
    [22, -21],
    [31, 51],
    [25, -28],
    [18, -2],
    [4, -37],
    [-39, -20],
    [-13, -39],
    [-27, -36],
    [-14, -50],
    [30, -40],
    [11, -70],
    [17, -66],
    [18, -55],
    [0, -54],
    [-17, -19],
    [6, -39],
    [17, -22],
    [-5, -58],
    [-7, -57],
    [-15, -7],
    [-21, -77],
    [-22, -95],
    [-26, -85],
    [-38, -67],
    [-39, -60],
    [-31, -8],
    [-17, -32],
    [-10, 23],
    [-15, -36],
    [-39, -36],
    [-29, -11],
    [-10, -75],
    [-15, -5],
    [-8, 53],
    [7, 27],
    [-37, 23],
    [-13, -11]
   ],
   [
    [8001, 5541],
    [-28, 18],
    [-14, 29],
    [5, 42],
    [-26, 13],
    [-13, 27],
    [-24, -38],
    [-27, -9],
    [-22, 1],
    [-15, -18]
   ],
   [
    [7837, 5606],
    [-14, -10],
    [4, -83],
    [-15, 2],
    [-2, 17]
   ],
   [
    [7810, 5532],
    [-1, 30],
    [-20, -21],
    [-12, 13],
    [-21, 27],
    [8, 60],
    [-18, 14],
    [-6, 66],
    [-30, -12],
    [4, 85],
    [26, 60],
    [1, 59],
    [-1, 55],
    [-12, 17],
    [-9, 43],
    [-16, -6]
   ],
   [
    [7703, 6022],
    [-30, 11],
    [9, 30],
    [-13, 45],
    [-20, -30],
    [-23, 17],
    [-32, -45],
    [-25, -54],
    [-23, -9]
   ],
   [
    [7466, 5953],
    [-2, 57],
    [-17, -15]
   ],
   [
    [7447, 5995],
    [-32, 7],
    [-32, 16],
    [-22, 32],
    [-22, 14],
    [-9, 34],
    [-16, 11],
    [-28, 46],
    [-22, 22],
    [-12, -17]
   ],
   [
    [7252, 6160],
    [-38, 51],
    [-28, 45],
    [-7, 79],
    [20, -10],
    [1, 37],
    [-12, 37],
    [3, 58],
    [-30, 85]
   ],
   [
    [7161, 6542],
    [-45, 29],
    [-8, 55],
    [-21, 33]
   ],
   [
    [7082, 6680],
    [-4, 41],
    [1, 28],
    [-17, 16],
    [-9, -7],
    [-7, 66]
   ],
   [
    [7046, 6824],
    [8, 17],
    [-4, 17],
    [26, 33],
    [20, 15],
    [29, -10],
    [11, 46],
    [35, 8],
    [10, 29],
    [44, 39],
    [4, 16]
   ],
   [
    [7229, 7034],
    [-2, 41],
    [19, 19],
    [-25, 124],
    [55, 29],
    [14, 16],
    [20, 128],
    [55, -23],
    [15, 32],
    [2, 72],
    [23, 7],
    [21, 48]
   ],
   [
    [7426, 7527],
    [11, 6]
   ],
   [
    [7437, 7533],
    [7, -50],
    [23, -38],
    [40, -27],
    [19, -58],
    [-10, -84],
    [10, -31],
    [33, -13],
    [37, -10],
    [33, -44],
    [18, -8],
    [12, -66],
    [17, -43],
    [30, 2],
    [58, -17],
    [36, 10],
    [28, -10],
    [41, -44],
    [34, 0],
    [12, -22],
    [32, 38],
    [45, 25],
    [42, 3],
    [32, 25],
    [20, 39],
    [20, 24],
    [-5, 24],
    [-9, 27],
    [15, 47],
    [15, -7],
    [29, -15],
    [28, 39],
    [42, 27],
    [20, 48],
    [20, 20],
    [40, 10],
    [22, -8],
    [3, 25],
    [-25, 50],
    [-22, 23],
    [-22, -26],
    [-27, 11],
    [-16, -9],
    [-7, 29],
    [20, 72],
    [13, 54]
   ],
   [
    [8240, 7575],
    [34, -27],
    [39, 45],
    [-1, 32],
    [26, 76],
    [15, 23],
    [0, 40],
    [-16, 17],
    [23, 36],
    [35, 13],
    [37, 2],
    [41, -22],
    [25, -26],
    [17, -73],
    [10, -31],
    [10, -44],
    [10, -70],
    [49, -23],
    [32, -51],
    [12, -67],
    [42, -1],
    [24, 29],
    [46, 21],
    [-15, -65],
    [-11, -26],
    [-9, -79],
    [-19, -69],
    [-33, 12],
    [-24, -25],
    [7, -62],
    [-4, -84],
    [-14, -2],
    [0, -37]
   ],
   [
    [4920, 4352],
    [-12, -1],
    [-20, 14],
    [-18, -1],
    [-33, -12],
    [-19, -21],
    [-27, -26],
    [-6, 1]
   ],
   [
    [4785, 4306],
    [2, 60],
    [3, 9],
    [-1, 28],
    [-12, 30],
    [-8, 5],
    [-8, 19],
    [6, 32],
    [-3, 35],
    [1, 21]
   ],
   [
    [4765, 4545],
    [5, 0],
    [1, 31],
    [-2, 14],
    [3, 10],
    [10, 9],
    [-7, 57],
    [-6, 30],
    [2, 24],
    [5, 6]
   ],
   [
    [4776, 4726],
    [4, 6],
    [8, -10],
    [21, -1],
    [5, 21],
    [5, -1],
    [8, 8],
    [4, -31],
    [7, 9],
    [11, 11]
   ],
   [
    [4921, 4685],
    [7, -102],
    [-11, -60],
    [-8, -81],
    [12, -62],
    [-1, -28]
   ],
   [
    [5363, 4156],
    [-4, 4],
    [-16, -9],
    [-17, 9],
    [-13, -5]
   ],
   [
    [5313, 4155],
    [-45, 2]
   ],
   [
    [5268, 4157],
    [4, 57],
    [-11, 47],
    [-13, 12],
    [-6, 33],
    [-7, 10],
    [1, 20]
   ],
   [
    [5236, 4336],
    [7, 51],
    [13, 69],
    [8, 0],
    [17, 42],
    [10, 2],
    [16, -30],
    [19, 24],
    [2, 30],
    [7, 29],
    [4, 36],
    [15, 30],
    [5, 50],
    [6, 16],
    [4, 38],
    [7, 45],
    [24, 56],
    [1, 24],
    [3, 13],
    [-11, 28]
   ],
   [
    [5393, 4889],
    [1, 23],
    [8, 4]
   ],
   [
    [5402, 4916],
    [11, -46],
    [2, -47],
    [-1, -48],
    [15, -65],
    [-15, 1],
    [-8, -6],
    [-13, 8],
    [-6, -34],
    [16, -42],
    [13, -12],
    [3, -30],
    [9, -50],
    [-4, -19]
   ],
   [
    [5444, 4156],
    [-2, -39],
    [-22, 17],
    [-22, 19],
    [-35, 3]
   ],
   [
    [5856, 4245],
    [-2, -84],
    [11, -10],
    [-9, -25],
    [-10, -19],
    [-11, -38],
    [-6, -33],
    [-1, -58],
    [-7, -27],
    [0, -54]
   ],
   [
    [5821, 3897],
    [-8, -20],
    [-1, -43],
    [-4, -6],
    [-2, -39]
   ],
   [
    [5814, 3670],
    [5, -66],
    [-2, -37],
    [5, -42],
    [16, -40],
    [15, -91]
   ],
   [
    [5853, 3394],
    [-11, 8],
    [-37, -13],
    [-7, -8],
    [-8, -46],
    [6, -32],
    [-5, -85],
    [-3, -72],
    [7, -13],
    [19, -27],
    [8, 13],
    [2, -78],
    [-21, 1],
    [-11, 39],
    [-10, 31],
    [-22, 10],
    [-6, 38],
    [-17, -23],
    [-22, 10],
    [-10, 32],
    [-17, 7],
    [-13, -2],
    [-2, 23],
    [-9, 1]
   ],
   [
    [5342, 3555],
    [-4, 22]
   ],
   [
    [5360, 3650],
    [8, -8],
    [9, 28],
    [15, -1],
    [2, -20],
    [11, -13],
    [16, 45],
    [16, 35],
    [7, 23],
    [-1, 59],
    [12, 70],
    [13, 37],
    [18, 35],
    [3, 23],
    [1, 26],
    [5, 25],
    [-2, 41],
    [4, 63],
    [5, 45],
    [8, 38],
    [2, 44]
   ],
   [
    [5760, 4369],
    [17, -59],
    [12, -9],
    [8, 12],
    [12, -5],
    [16, 15],
    [6, -30],
    [25, -48]
   ],
   [
    [5330, 3631],
    [-22, 76]
   ],
   [
    [5308, 3707],
    [21, 40],
    [-11, 47],
    [10, 19],
    [19, 8],
    [2, 32],
    [15, -34],
    [24, -3],
    [9, 34],
    [3, 47],
    [-3, 56],
    [-13, 43],
    [12, 83],
    [-7, 14],
    [-21, -6],
    [-7, 38],
    [2, 31]
   ],
   [
    [2906, 3982],
    [-12, 17],
    [-14, 24],
    [-7, -11],
    [-24, 9],
    [-7, 31],
    [-5, -1],
    [-28, 41]
   ],
   [
    [2809, 4092],
    [-3, 23],
    [10, 5],
    [-1, 36],
    [6, 26],
    [14, 5],
    [12, 45],
    [10, 37],
    [-10, 18],
    [5, 41],
    [-6, 66],
    [6, 19],
    [-4, 61],
    [-12, 38]
   ],
   [
    [2836, 4512],
    [4, 35],
    [9, -5],
    [5, 21],
    [-6, 42],
    [3, 11]
   ],
   [
    [2851, 4616],
    [14, -3],
    [21, 50],
    [12, 8],
    [0, 24],
    [5, 61],
    [16, 33],
    [17, 1],
    [3, 15],
    [21, -6],
    [22, 36],
    [11, 17],
    [14, 34],
    [9, -4],
    [8, -19],
    [-6, -24]
   ],
   [
    [3018, 4839],
    [-18, -12],
    [-7, -36],
    [-10, -21],
    [-8, -27],
    [-4, -51],
    [-8, -42],
    [15, -5],
    [3, -33],
    [6, -15],
    [3, -29],
    [-4, -27],
    [1, -15],
    [7, -6],
    [7, -25],
    [36, 7],
    [16, -9],
    [19, -62],
    [11, 8],
    [20, -4],
    [16, 8],
    [10, -12],
    [-5, -39],
    [-6, -24],
    [-2, -52],
    [5, -47],
    [8, -22],
    [1, -16],
    [-14, -35],
    [10, -16],
    [8, -25],
    [8, -72]
   ],
   [
    [3058, 3684],
    [-14, 39],
    [-8, 1],
    [18, 73],
    [-21, 34],
    [-17, -6],
    [-10, 12],
    [-15, -19],
    [-21, 9],
    [-16, 76],
    [-13, 18],
    [-9, 34],
    [-19, 34],
    [-7, -7]
   ],
   [
    [2695, 4584],
    [-15, 16],
    [-6, 15],
    [4, 12],
    [-1, 16],
    [-8, 17],
    [-11, 14],
    [-10, 9],
    [-1, 21],
    [-8, 13],
    [2, -21],
    [-5, -17],
    [-7, 20],
    [-9, 7],
    [-4, 15],
    [1, 22],
    [3, 22],
    [-8, 10],
    [7, 14]
   ],
   [
    [2619, 4789],
    [4, 9],
    [18, -19],
    [7, 10],
    [9, -6],
    [4, -15],
    [8, -5],
    [7, 16]
   ],
   [
    [2676, 4779],
    [7, -40],
    [11, -28],
    [13, -31]
   ],
   [
    [2707, 4680],
    [-11, -6],
    [0, -29],
    [6, -11],
    [-4, -9],
    [1, -13],
    [-2, -14],
    [-2, -14]
   ],
   [
    [2715, 5658],
    [23, -5],
    [22, -1],
    [26, -24],
    [11, -27],
    [26, 8],
    [10, -16],
    [24, -45],
    [17, -32],
    [9, 1],
    [17, -15],
    [-2, -20],
    [20, -3],
    [21, -29],
    [-3, -17],
    [-19, -9],
    [-18, -4],
    [-19, 6],
    [-40, -7],
    [18, 40],
    [-11, 18],
    [-18, 5],
    [-9, 21],
    [-7, 41],
    [-16, -3],
    [-26, 19],
    [-8, 15],
    [-36, 12],
    [-10, 14],
    [11, 17],
    [-28, 4],
    [-20, -37],
    [-11, -1],
    [-4, -18],
    [-14, -8],
    [-12, 7],
    [15, 22],
    [6, 26],
    [13, 16],
    [14, 14],
    [21, 7],
    [7, 8]
   ],
   [
    [5909, 6516],
    [2, 1],
    [4, 17],
    [20, -1],
    [25, 21],
    [-19, -30],
    [2, -14]
   ],
   [
    [5943, 6510],
    [-3, 3],
    [-5, -6],
    [-4, 2],
    [-2, -3],
    [0, 7],
    [-2, 5],
    [-6, 1],
    [-7, -7],
    [-5, 4]
   ],
   [
    [5943, 6510],
    [1, -5],
    [-28, -30],
    [-14, 10],
    [-7, 29],
    [14, 2]
   ],
   [
    [5377, 7503],
    [-16, 30],
    [-14, 18],
    [-3, 30],
    [-5, 21],
    [21, 16],
    [10, 18],
    [20, 14],
    [7, 13],
    [7, -8],
    [13, 8]
   ],
   [
    [5417, 7663],
    [13, -23],
    [21, -7],
    [-2, -19],
    [15, -15],
    [4, 18],
    [19, -8],
    [3, -22],
    [20, -5],
    [13, -35]
   ],
   [
    [5523, 7547],
    [-8, 0],
    [-4, -13],
    [-7, -3],
    [-2, -16],
    [-5, -4],
    [-1, -7],
    [-9, -7],
    [-12, 1],
    [-4, -16]
   ],
   [
    [5275, 7941],
    [1, -28],
    [28, -16],
    [-1, -26],
    [29, 14],
    [15, 19],
    [32, -28],
    [13, -23]
   ],
   [
    [5392, 7853],
    [6, -37],
    [-8, -19],
    [11, -25],
    [6, -39],
    [-2, -24],
    [12, -46]
   ],
   [
    [5207, 7412],
    [3, 52],
    [14, 49],
    [-40, 13],
    [-13, 19]
   ],
   [
    [5171, 7545],
    [2, 31],
    [-6, 16]
   ],
   [
    [5171, 7641],
    [-5, 75],
    [17, 0],
    [7, 27],
    [6, 66],
    [-5, 24]
   ],
   [
    [5191, 7833],
    [6, 15],
    [23, 4],
    [5, -16],
    [19, 36],
    [-6, 27],
    [-2, 41]
   ],
   [
    [5236, 7940],
    [21, -10],
    [18, 11]
   ],
   [
    [6196, 4905],
    [7, -22],
    [-1, -30],
    [-16, -17],
    [12, -20]
   ],
   [
    [6198, 4816],
    [-10, -38]
   ],
   [
    [6188, 4778],
    [-7, 12],
    [-6, -5],
    [-16, 2],
    [0, 21],
    [-2, 20],
    [9, 34],
    [10, 32]
   ],
   [
    [6176, 4894],
    [12, -7],
    [8, 18]
   ],
   [
    [5352, 7986],
    [-17, -58],
    [-29, 40],
    [-4, 30],
    [41, 24],
    [9, -36]
   ],
   [
    [5236, 7940],
    [-11, 39],
    [-1, 74],
    [5, 19],
    [8, 22],
    [24, 4],
    [10, 20],
    [22, 20],
    [-1, -37],
    [-8, -23],
    [4, -20],
    [15, -11],
    [-7, -27],
    [-8, 8],
    [-20, -52],
    [7, -35]
   ],
   [
    [3008, 5409],
    [3, 12],
    [22, 0],
    [16, -19],
    [8, 2],
    [5, -26],
    [15, 2],
    [-1, -22],
    [12, -2],
    [14, -27],
    [-10, -29],
    [-14, 16],
    [-12, -3],
    [-9, 3],
    [-5, -13],
    [-11, -4],
    [-4, 17],
    [-10, -10],
    [-11, -49],
    [-7, 11],
    [-1, 21]
   ],
   [
    [3008, 5289],
    [0, 19],
    [-7, 22],
    [7, 12],
    [2, 28],
    [-2, 39]
   ],
   [
    [5333, 5678],
    [-95, -136],
    [-81, -142],
    [-39, -32]
   ],
   [
    [5118, 5368],
    [-31, -7],
    [0, 46],
    [-13, 12],
    [-17, 20],
    [-7, 34],
    [-94, 157],
    [-93, 156]
   ],
   [
    [4863, 5786],
    [-105, 174]
   ],
   [
    [4758, 5960],
    [1, 14],
    [0, 5]
   ],
   [
    [4759, 5979],
    [0, 85],
    [44, 53],
    [28, 11],
    [23, 19],
    [11, 36],
    [32, 29],
    [1, 53],
    [16, 6],
    [13, 27],
    [36, 12],
    [5, 28],
    [-7, 15],
    [-10, 76],
    [-1, 43],
    [-11, 46]
   ],
   [
    [4939, 6518],
    [27, 39],
    [30, 13],
    [17, 30],
    [27, 21],
    [47, 13],
    [46, 6],
    [14, -11],
    [26, 29],
    [30, 0],
    [11, -16],
    [19, 4]
   ],
   [
    [5233, 6646],
    [-5, -37],
    [4, -68],
    [-6, -60],
    [-18, -40],
    [3, -54],
    [23, -43],
    [0, -17],
    [17, -29],
    [12, -129]
   ],
   [
    [5263, 6169],
    [9, -63],
    [1, -34],
    [-5, -58],
    [2, -33],
    [-3, -39],
    [2, -45],
    [-11, -30],
    [17, -53],
    [1, -30],
    [10, -40],
    [13, 13],
    [22, -34],
    [12, -45]
   ],
   [
    [2769, 3749],
    [15, 53],
    [-6, 32],
    [-11, -34],
    [-16, 32],
    [5, 20],
    [-4, 65],
    [9, 11],
    [5, 45],
    [11, 46],
    [-2, 29],
    [15, 16],
    [19, 28]
   ],
   [
    [2906, 3982],
    [4, -54],
    [-9, -47],
    [-30, -75],
    [-33, -29],
    [-17, -62],
    [-6, -48],
    [-15, -30],
    [-12, 36],
    [-11, 8],
    [-12, -6],
    [-1, 27],
    [8, 17],
    [-3, 30]
   ],
   [
    [5969, 6111],
    [-7, -29],
    [-6, -54],
    [-8, -37],
    [-6, -13],
    [-10, 23],
    [-12, 33],
    [-20, 102],
    [-3, -6],
    [12, -76],
    [17, -72],
    [21, -112],
    [10, -39],
    [9, -40],
    [25, -80],
    [-6, -12],
    [1, -47],
    [33, -65],
    [4, -14]
   ],
   [
    [6023, 5573],
    [-110, 0],
    [-107, 0],
    [-112, 0]
   ],
   [
    [5694, 5573],
    [0, 264],
    [0, 255],
    [-8, 58],
    [7, 45],
    [-5, 30],
    [10, 35]
   ],
   [
    [5698, 6260],
    [37, 1],
    [27, -19],
    [28, -21],
    [13, -11],
    [21, 22],
    [11, 21],
    [25, 6],
    [20, -9],
    [7, -36],
    [7, 24],
    [22, -17],
    [22, -4],
    [13, 18]
   ],
   [
    [5951, 6235],
    [18, -124]
   ],
   [
    [6176, 4894],
    [-10, 23],
    [-11, 42],
    [-12, 23],
    [-8, 25],
    [-24, 29],
    [-19, 0],
    [-7, 15],
    [-16, -16],
    [-17, 32],
    [-8, -53],
    [-33, 15]
   ],
   [
    [6011, 5029],
    [-3, 28],
    [12, 106],
    [3, 48],
    [9, 22],
    [20, 11],
    [14, 41]
   ],
   [
    [6066, 5285],
    [16, -83],
    [8, -66],
    [15, -35],
    [38, -67],
    [16, -41],
    [15, -42],
    [8, -24],
    [14, -22]
   ],
   [
    [4749, 7e3],
    [1, 51],
    [-11, 31],
    [39, 52],
    [34, -13],
    [37, 1],
    [30, -12],
    [23, 3],
    [45, -2]
   ],
   [
    [4947, 7111],
    [11, -28],
    [51, -33],
    [10, 16],
    [31, -33],
    [32, 10]
   ],
   [
    [5082, 7043],
    [2, -42],
    [-26, -48],
    [-36, -15],
    [-2, -24],
    [-18, -40],
    [-10, -58],
    [11, -41],
    [-16, -32],
    [-6, -47],
    [-21, -14],
    [-20, -56],
    [-35, -1],
    [-27, 2],
    [-17, -26],
    [-11, -27],
    [-13, 6],
    [-11, 24],
    [-8, 42],
    [-26, 11]
   ],
   [
    [4792, 6657],
    [-2, 24],
    [10, 26],
    [4, 20],
    [-9, 21],
    [7, 48],
    [-11, 43],
    [12, 5],
    [1, 34],
    [5, 11],
    [0, 56],
    [13, 19],
    [-8, 36],
    [-16, 3],
    [-5, -9],
    [-16, 0],
    [-7, 35],
    [-11, -11],
    [-10, -18]
   ],
   [
    [5675, 8143],
    [3, 42],
    [-10, -9],
    [-18, 26],
    [-2, 41],
    [35, 20],
    [35, 10],
    [30, -12],
    [29, 3]
   ],
   [
    [5777, 8264],
    [4, -13],
    [-20, -41],
    [8, -67],
    [-12, -23]
   ],
   [
    [5757, 8120],
    [-22, 0],
    [-24, 27],
    [-13, 8],
    [-23, -12]
   ],
   [
    [6188, 4778],
    [-6, -26],
    [10, -39],
    [10, -35],
    [11, -26],
    [90, -85],
    [24, 1]
   ],
   [
    [6327, 4568],
    [-79, -216],
    [-36, -3],
    [-25, -51],
    [-17, -1],
    [-8, -23]
   ],
   [
    [6162, 4274],
    [-19, 0],
    [-11, 25],
    [-26, -30],
    [-8, -30],
    [-18, 5],
    [-6, 9],
    [-7, -2],
    [-9, 0],
    [-35, 61],
    [-19, 0],
    [-10, 24],
    [0, 40],
    [-14, 12]
   ],
   [
    [5980, 4388],
    [-17, 79],
    [-12, 16],
    [-5, 29],
    [-14, 35],
    [-17, 5],
    [9, 41],
    [15, 2],
    [4, 22]
   ],
   [
    [5943, 4617],
    [0, 64]
   ],
   [
    [5943, 4681],
    [8, 75],
    [13, 20],
    [3, 30],
    [12, 55],
    [17, 35],
    [11, 71],
    [4, 62]
   ],
   [
    [5794, 8952],
    [-4, -50],
    [42, -48],
    [-26, -54],
    [33, -82],
    [-19, -61],
    [25, -54],
    [-11, -47],
    [41, -49],
    [-11, -36],
    [-25, -42],
    [-60, -92]
   ],
   [
    [5779, 8337],
    [-50, -5],
    [-49, -27],
    [-45, -15],
    [-16, 39],
    [-27, 24],
    [6, 71],
    [-14, 64],
    [14, 42],
    [25, 45],
    [63, 78],
    [19, 15],
    [-3, 31],
    [-39, 34]
   ],
   [
    [5663, 8733],
    [-9, 27],
    [-1, 111],
    [-43, 49],
    [-37, 35]
   ],
   [
    [5573, 8955],
    [17, 19],
    [30, -38],
    [37, 4],
    [30, -18],
    [26, 32],
    [14, 53],
    [43, 24],
    [35, -29],
    [-11, -50]
   ],
   [
    [9954, 2748],
    [9, -21],
    [-4, -37],
    [-17, -10],
    [-16, 9],
    [-2, 31],
    [10, 25],
    [13, -9],
    [7, 12]
   ],
   [
    [9981, 2787],
    [-17, -15],
    [-4, 26],
    [14, 15],
    [9, 4],
    [16, 22],
    [0, -35],
    [-18, -17]
   ],
   [
    [2, 2808],
    [-2, -4],
    [0, 35],
    [6, 4],
    [-4, -35]
   ],
   [
    [3300, 270],
    [33, 43],
    [24, -18],
    [16, 29],
    [22, -32],
    [-8, -25],
    [-37, -22],
    [-13, 25],
    [-23, -32],
    [-14, 32]
   ],
   [
    [3485, 4159],
    [7, 31],
    [3, 32]
   ],
   [
    [3495, 4222],
    [4, 31],
    [-10, 43],
    [-3, 49],
    [15, 61]
   ],
   [
    [3501, 4406],
    [9, -7],
    [21, -17],
    [29, -61],
    [5, -30]
   ],
   [
    [5265, 7020],
    [-9, -56],
    [-13, 15],
    [-6, 48],
    [5, 27],
    [18, 27],
    [5, -61]
   ],
   [
    [5157, 7549],
    [6, -6],
    [8, 2]
   ],
   [
    [5190, 7295],
    [-2, -20],
    [9, -27],
    [-10, -22],
    [7, -55],
    [15, -9],
    [-3, -32]
   ],
   [
    [5206, 7130],
    [-25, -40],
    [-55, 19],
    [-40, -23],
    [-4, -43]
   ],
   [
    [4947, 7111],
    [14, 43],
    [5, 143],
    [-28, 75],
    [-21, 37],
    [-42, 27],
    [-3, 53],
    [36, 15],
    [47, -18],
    [-9, 81],
    [26, -31],
    [65, 56],
    [8, 59],
    [24, 15]
   ],
   [
    [5308, 3707],
    [-29, 73],
    [-18, 59],
    [-17, 74],
    [1, 24],
    [6, 23],
    [7, 52],
    [5, 54]
   ],
   [
    [5263, 4066],
    [10, 4],
    [40, -1],
    [0, 86]
   ],
   [
    [4827, 7861],
    [-21, 15],
    [-17, -1],
    [6, 38],
    [-6, 39]
   ],
   [
    [4789, 7952],
    [23, 3],
    [30, -45],
    [-15, -49]
   ],
   [
    [4916, 8203],
    [-30, -77],
    [29, 9],
    [30, 0],
    [-7, -59],
    [-25, -64],
    [29, -4],
    [2, -8],
    [25, -85],
    [19, -11],
    [17, -82],
    [8, -28],
    [33, -14],
    [-3, -46],
    [-14, -21],
    [11, -37],
    [-25, -38],
    [-37, 1],
    [-48, -20],
    [-13, 14],
    [-18, -33],
    [-26, 8],
    [-19, -28],
    [-15, 15],
    [41, 75],
    [25, 16],
    [-1, 0],
    [-43, 12],
    [-8, 28],
    [29, 22],
    [-15, 39],
    [5, 47],
    [42, -6],
    [4, 41],
    [-19, 45],
    [0, 1],
    [-34, 12],
    [-7, 20],
    [10, 32],
    [-9, 19],
    [-15, -33],
    [-1, 69],
    [-14, 36],
    [10, 75],
    [21, 58],
    [23, -6],
    [33, 6]
   ],
   [
    [6154, 6975],
    [4, 31],
    [-7, 49],
    [-16, 27],
    [-16, 8],
    [-10, 22]
   ],
   [
    [6109, 7112],
    [4, 8],
    [23, -12],
    [41, -12],
    [38, -34],
    [5, -13],
    [17, 11],
    [25, -15],
    [9, -30],
    [17, -16]
   ],
   [
    [6210, 6944],
    [-27, 35],
    [-29, -4]
   ],
   [
    [5029, 4419],
    [-44, -42],
    [-15, -25],
    [-25, -21],
    [-25, 21]
   ],
   [
    [5e3, 4784],
    [-2, -22],
    [12, -37],
    [0, -52],
    [2, -57],
    [7, -26],
    [-6, -65],
    [2, -35],
    [8, -46],
    [6, -25]
   ],
   [
    [4765, 4545],
    [-8, 2],
    [-5, -29],
    [-8, 0],
    [-6, 16],
    [2, 28],
    [-11, 44],
    [-8, -8],
    [-6, -1]
   ],
   [
    [4715, 4597],
    [-7, -4],
    [0, 26],
    [-4, 19],
    [0, 21],
    [-6, 30],
    [-7, 25],
    [-23, 0],
    [-6, -13],
    [-8, -2],
    [-4, -15],
    [-4, -20],
    [-14, -32]
   ],
   [
    [4632, 4632],
    [-13, 43],
    [-10, 28],
    [-8, 9],
    [-6, 14],
    [-4, 32],
    [-4, 16],
    [-8, 12]
   ],
   [
    [4579, 4786],
    [13, 35],
    [8, -2],
    [7, 13],
    [6, 0],
    [5, 9],
    [-3, 24],
    [3, 7],
    [1, 25]
   ],
   [
    [4619, 4897],
    [13, -1],
    [20, -17],
    [6, 1],
    [3, 8],
    [15, -6],
    [4, 5]
   ],
   [
    [4680, 4887],
    [1, -27],
    [5, 0],
    [7, 10],
    [5, -3],
    [7, -18],
    [12, -5],
    [8, 15],
    [9, 10],
    [6, 10],
    [6, -2],
    [6, -16],
    [3, -20],
    [12, -30],
    [-6, -18],
    [-1, -24],
    [6, 7],
    [3, -8],
    [-1, -21],
    [8, -21]
   ],
   [
    [4532, 4937],
    [3, 32]
   ],
   [
    [4535, 4969],
    [31, 2],
    [6, 17],
    [9, 1],
    [11, -17],
    [8, -1],
    [9, 13],
    [6, -21],
    [-12, -16],
    [-12, 1],
    [-12, 15],
    [-10, -16],
    [-5, -1],
    [-7, -10],
    [-25, 1]
   ],
   [
    [4579, 4786],
    [-15, 30],
    [-11, 5],
    [-7, 20],
    [1, 11],
    [-9, 15],
    [-2, 15]
   ],
   [
    [4536, 4882],
    [15, 12],
    [9, -2],
    [8, 8],
    [51, -3]
   ],
   [
    [5263, 4066],
    [-5, 10],
    [10, 81]
   ],
   [
    [5658, 6557],
    [15, -24],
    [22, 4],
    [20, -5],
    [0, -13],
    [15, 9],
    [-4, -21],
    [-40, -7],
    [1, 12],
    [-34, 14],
    [5, 31]
   ],
   [
    [5723, 6924],
    [-17, 2],
    [-14, 7],
    [-34, -18],
    [19, -41],
    [-14, -12],
    [-15, 0],
    [-15, 37],
    [-5, -15],
    [6, -43],
    [14, -34],
    [-10, -16],
    [15, -33],
    [14, -21],
    [0, -40],
    [-25, 19],
    [8, -37],
    [-18, -7],
    [11, -64],
    [-19, -1],
    [-23, 32],
    [-10, 57],
    [-5, 48],
    [-11, 33],
    [-14, 41],
    [-2, 20]
   ],
   [
    [5583, 6926],
    [18, 6],
    [11, 16],
    [15, -2],
    [5, 13],
    [5, 2]
   ],
   [
    [5725, 6996],
    [13, -19],
    [-8, -45],
    [-7, -8]
   ],
   [
    [3701, 9926],
    [93, 43],
    [97, -3],
    [36, 26],
    [98, 7],
    [222, -9],
    [174, -57],
    [-52, -28],
    [-106, -3],
    [-150, -7],
    [14, -13],
    [99, 8],
    [83, -24],
    [54, 22],
    [23, -26],
    [-30, -42],
    [71, 27],
    [135, 28],
    [83, -14],
    [15, -31],
    [-113, -51],
    [-16, -17],
    [-88, -12],
    [64, -3],
    [-32, -53],
    [-23, -46],
    [1, -80],
    [33, -47],
    [-43, -3],
    [-46, -23],
    [52, -38],
    [6, -61],
    [-30, -7],
    [36, -61],
    [-61, -5],
    [32, -30],
    [-9, -25],
    [-39, -11],
    [-39, 0],
    [35, -49],
    [0, -32],
    [-55, 30],
    [-14, -19],
    [37, -18],
    [37, -44],
    [10, -58],
    [-49, -14],
    [-22, 28],
    [-34, 41],
    [10, -49],
    [-33, -37],
    [73, -4],
    [39, -3],
    [-75, -63],
    [-75, -57],
    [-81, -24],
    [-31, -1],
    [-29, -27],
    [-38, -76],
    [-60, -50],
    [-19, -3],
    [-37, -18],
    [-40, -17],
    [-24, -44],
    [0, -51],
    [-15, -47],
    [-45, -57],
    [11, -56],
    [-12, -60],
    [-14, -70],
    [-39, -4],
    [-41, 58],
    [-56, 1],
    [-27, 39],
    [-18, 70],
    [-49, 90],
    [-14, 46],
    [-3, 65],
    [-39, 66],
    [10, 53],
    [-18, 25],
    [27, 84],
    [42, 27],
    [11, 30],
    [6, 56],
    [-32, -25],
    [-15, -11],
    [-25, -10],
    [-34, 23],
    [-2, 49],
    [11, 38],
    [25, 1],
    [57, -19],
    [-48, 46],
    [-24, 24],
    [-28, -10],
    [-23, 18],
    [31, 67],
    [-17, 27],
    [-22, 49],
    [-34, 76],
    [-35, 28],
    [0, 30],
    [-74, 42],
    [-59, 6],
    [-74, -3],
    [-68, -6],
    [-32, 23],
    [-49, 45],
    [73, 23],
    [56, 4],
    [-119, 19],
    [-62, 29],
    [3, 28],
    [106, 34],
    [101, 35],
    [11, 26],
    [-75, 26],
    [24, 28],
    [97, 50],
    [40, 8],
    [-12, 32],
    [66, 19],
    [86, 12],
    [85, 0],
    [30, -22],
    [74, 39],
    [66, -26],
    [39, -6],
    [58, -23],
    [-66, 38],
    [4, 31]
   ],
   [
    [2497, 4979],
    [-14, 13],
    [-17, 1],
    [-13, 14],
    [-15, 30]
   ],
   [
    [2438, 5037],
    [1, 21],
    [3, 17],
    [-4, 13],
    [13, 59],
    [36, 0],
    [1, 24],
    [-5, 5],
    [-3, 15],
    [-10, 17],
    [-11, 24],
    [13, 0],
    [0, 40],
    [26, 1],
    [26, -1]
   ],
   [
    [2529, 5134],
    [10, -13],
    [2, 11],
    [8, -10]
   ],
   [
    [2549, 5122],
    [-13, -27],
    [-13, -20],
    [-2, -14],
    [2, -14],
    [-5, -18]
   ],
   [
    [2518, 5029],
    [-7, -5],
    [2, -8],
    [-6, -8],
    [-9, -18],
    [-1, -11]
   ],
   [
    [3340, 4594],
    [18, -27],
    [17, -46],
    [1, -37],
    [10, -2],
    [15, -35],
    [11, -25]
   ],
   [
    [3412, 4422],
    [-4, -65],
    [-17, -18],
    [1, -17],
    [-5, -37],
    [13, -52],
    [9, -1],
    [3, -40],
    [17, -63]
   ],
   [
    [3313, 4366],
    [-19, 55],
    [7, 20],
    [0, 33],
    [17, 11],
    [7, 14],
    [-10, 26],
    [3, 27],
    [22, 42]
   ],
   [
    [2574, 4925],
    [-5, 23],
    [-8, 6]
   ],
   [
    [2561, 4954],
    [2, 29],
    [-4, 8],
    [-6, 5],
    [-12, -9],
    [-1, 10],
    [-8, 11],
    [-6, 15],
    [-8, 6]
   ],
   [
    [2549, 5122],
    [3, -2],
    [6, 12],
    [8, 1],
    [3, -6],
    [4, 4],
    [13, -7],
    [13, 2],
    [9, 8],
    [3, 8],
    [9, -3],
    [6, -5],
    [8, 1],
    [5, 7],
    [13, -10],
    [4, -2],
    [9, -13],
    [8, -16],
    [10, -11],
    [7, -20]
   ],
   [
    [2690, 5070],
    [-9, 1],
    [-4, -10],
    [-10, -9],
    [-7, 0],
    [-6, -9],
    [-6, 3],
    [-4, 11],
    [-3, -2],
    [-4, -17],
    [-3, 1],
    [0, -15],
    [-10, -20],
    [-5, -9],
    [-3, -8],
    [-8, 14],
    [-6, -19],
    [-6, 0],
    [-6, -1],
    [0, -36],
    [-4, 0],
    [-3, -17],
    [-9, -3]
   ],
   [
    [5522, 7289],
    [7, -27],
    [9, -21],
    [-11, -27]
   ],
   [
    [5515, 7055],
    [-3, -12]
   ],
   [
    [5512, 7043],
    [-26, 27],
    [-16, 26],
    [-26, 21],
    [-23, 53],
    [6, 5],
    [-13, 30],
    [-1, 25],
    [-17, 11],
    [-9, -31],
    [-8, 24],
    [0, 25],
    [1, 1]
   ],
   [
    [5380, 7260],
    [20, -2],
    [5, 12],
    [9, -12],
    [11, -1],
    [0, 20],
    [10, 7],
    [2, 29],
    [23, 19]
   ],
   [
    [5460, 7332],
    [8, -9],
    [21, -30],
    [23, -14],
    [10, 10]
   ],
   [
    [3008, 5289],
    [-19, 12],
    [-13, -5],
    [-17, 5],
    [-13, -13],
    [-15, 22],
    [3, 23],
    [25, -10],
    [21, -5],
    [10, 16],
    [-12, 31],
    [0, 27],
    [-18, 11],
    [7, 20],
    [17, -3],
    [24, -11]
   ],
   [
    [5471, 7448],
    [14, -18],
    [10, -8],
    [24, 9],
    [2, 14],
    [11, 3],
    [14, 11],
    [3, -5],
    [13, 9],
    [6, 17],
    [9, 4],
    [30, -21],
    [6, 7]
   ],
   [
    [5613, 7470],
    [15, -20],
    [2, -19]
   ],
   [
    [5630, 7431],
    [-17, -15],
    [-13, -49],
    [-17, -48],
    [-22, -14]
   ],
   [
    [5561, 7305],
    [-17, 3],
    [-22, -19]
   ],
   [
    [5460, 7332],
    [-6, 24],
    [-4, 1]
   ],
   [
    [8352, 3258],
    [-11, -2],
    [-37, 51],
    [26, 14],
    [14, -22],
    [10, -22],
    [-2, -19]
   ],
   [
    [8471, 3355],
    [2, -15],
    [1, -21]
   ],
   [
    [8474, 3319],
    [-18, -54],
    [-24, -16],
    [-3, 9],
    [2, 24],
    [12, 44],
    [28, 29]
   ],
   [
    [8274, 3412],
    [10, -19],
    [17, 5],
    [7, -30],
    [-32, -14],
    [-19, -10],
    [-15, 0],
    [10, 42],
    [15, 0],
    [7, 26]
   ],
   [
    [8413, 3412],
    [-4, -40],
    [-42, -20],
    [-37, 8],
    [0, 27],
    [22, 15],
    [18, -22],
    [18, 6],
    [25, 26]
   ],
   [
    [8017, 3506],
    [53, -7],
    [6, 30],
    [51, -35],
    [10, -46],
    [42, -13],
    [34, -43],
    [-31, -27],
    [-31, 29],
    [-25, -2],
    [-29, 5],
    [-26, 13],
    [-32, 27],
    [-21, 7],
    [-11, -9],
    [-51, 30],
    [-5, 31],
    [-25, 5],
    [19, 69],
    [34, -5],
    [22, -28],
    [12, -5],
    [4, -26]
   ],
   [
    [8741, 3547],
    [-14, -49],
    [-3, 54],
    [5, 26],
    [6, 24],
    [7, -21],
    [-1, -34]
   ],
   [
    [8534, 3745],
    [-11, -24],
    [-19, 13],
    [-5, 31],
    [28, 3],
    [7, -23]
   ],
   [
    [8623, 3771],
    [10, -55],
    [-23, 30],
    [-23, 6],
    [-16, -5],
    [-19, 2],
    [6, 40],
    [35, 3],
    [30, -21]
   ],
   [
    [8916, 3806],
    [0, -234],
    [1, -234]
   ],
   [
    [8917, 3338],
    [-25, 59],
    [-28, 15],
    [-7, -21],
    [-35, -2],
    [12, 59],
    [17, 19],
    [-7, 79],
    [-14, 60],
    [-53, 61],
    [-23, 6],
    [-42, 66],
    [-8, -35],
    [-11, -6],
    [-6, 26],
    [0, 31],
    [-21, 36],
    [29, 25],
    [20, -1],
    [-2, 19],
    [-41, 0],
    [-11, 43],
    [-25, 13],
    [-11, 36],
    [37, 17],
    [14, 24],
    [45, -30],
    [4, -27],
    [8, -116],
    [29, -43],
    [23, 76],
    [32, 44],
    [25, 0],
    [23, -25],
    [21, -26],
    [30, -14]
   ],
   [
    [8478, 4095],
    [-22, -71],
    [-21, -14],
    [-27, 14],
    [-46, -4],
    [-24, -10],
    [-4, -54],
    [24, -64],
    [15, 32],
    [52, 25],
    [-2, -33],
    [-12, 10],
    [-12, -42],
    [-25, -28],
    [27, -92],
    [-5, -24],
    [25, -83],
    [-1, -47],
    [-14, -22],
    [-11, 26],
    [13, 59],
    [-27, -28],
    [-7, 20],
    [3, 27],
    [-20, 42],
    [3, 70],
    [-19, -21],
    [2, -84],
    [1, -103],
    [-17, -10],
    [-12, 21],
    [8, 66],
    [-4, 69],
    [-12, 1],
    [-9, 49],
    [12, 47],
    [4, 57],
    [14, 108],
    [5, 30],
    [24, 53],
    [22, -21],
    [35, -10],
    [32, 3],
    [27, 52],
    [5, -16]
   ],
   [
    [8574, 4074],
    [-2, -62],
    [-14, 7],
    [-4, -44],
    [11, -38],
    [-8, -9],
    [-11, 46],
    [-8, 92],
    [6, 57],
    [9, 26],
    [2, -39],
    [16, -6],
    [3, -30]
   ],
   [
    [8045, 4137],
    [5, -48],
    [19, -40],
    [18, 14],
    [18, -5],
    [16, 36],
    [13, 7],
    [26, -21],
    [23, 16],
    [14, 100],
    [11, 25],
    [10, 81],
    [32, 0],
    [24, -12]
   ],
   [
    [8274, 4290],
    [-16, -65],
    [20, -68],
    [-5, -33],
    [32, -66],
    [-33, -9],
    [-10, -49],
    [2, -65],
    [-27, -49],
    [-1, -71],
    [-10, -110],
    [-5, 25],
    [-31, -32],
    [-11, 44],
    [-20, 4],
    [-14, 23],
    [-33, -26],
    [-10, 35],
    [-18, -4],
    [-23, 8],
    [-4, 97],
    [-14, 20],
    [-13, 61],
    [-4, 63],
    [3, 66],
    [16, 48]
   ],
   [
    [7939, 3573],
    [-31, -2],
    [-24, 60],
    [-35, 59],
    [-12, 44],
    [-21, 58],
    [-14, 54],
    [-21, 100],
    [-24, 60],
    [-9, 62],
    [-10, 56],
    [-25, 45],
    [-14, 62],
    [-21, 40],
    [-29, 79],
    [-3, 37],
    [18, -3],
    [43, -14],
    [25, -70],
    [21, -49],
    [16, -30],
    [26, -77],
    [28, -1],
    [23, -50],
    [16, -60],
    [22, -32],
    [-12, -59],
    [16, -25],
    [10, -2],
    [5, -50],
    [10, -40],
    [20, -6],
    [14, -46],
    [-7, -89],
    [-1, -111]
   ],
   [
    [7252, 6160],
    [-17, -32],
    [-11, -67],
    [27, -28],
    [26, -35],
    [36, -40],
    [38, -9],
    [16, -37],
    [22, -7],
    [33, -16],
    [23, 1],
    [4, 28],
    [-4, 46],
    [2, 31]
   ],
   [
    [7703, 6022],
    [2, -27],
    [-10, -13],
    [2, -44],
    [-19, 13],
    [-36, -50],
    [0, -41],
    [-15, -60],
    [-1, -35],
    [-13, -59],
    [-21, 16],
    [-1, -74],
    [-7, -25],
    [3, -30],
    [-14, -17]
   ],
   [
    [7472, 5577],
    [-4, -26],
    [-19, 0],
    [-34, -14],
    [2, -55],
    [-15, -42],
    [-40, -48],
    [-31, -85],
    [-21, -45],
    [-28, -47],
    [0, -33],
    [-13, -18],
    [-26, -26],
    [-12, -3],
    [-9, -55],
    [6, -93],
    [1, -60],
    [-11, -68],
    [0, -122],
    [-15, -4],
    [-12, -54],
    [8, -24],
    [-25, -21],
    [-10, -48],
    [-11, -21],
    [-26, 67],
    [-13, 101],
    [-11, 72],
    [-9, 34],
    [-15, 69],
    [-7, 90],
    [-5, 45],
    [-25, 98],
    [-12, 139],
    [-8, 92],
    [0, 87],
    [-5, 67],
    [-41, -42],
    [-19, 8],
    [-36, 87],
    [13, 26],
    [-8, 28],
    [-33, 61]
   ],
   [
    [6893, 5694],
    [19, 48],
    [61, 0],
    [-6, 62],
    [-15, 36],
    [-4, 55],
    [-18, 32],
    [31, 76],
    [32, -6],
    [29, 76],
    [18, 72],
    [27, 72],
    [-1, 52],
    [24, 41],
    [-23, 36],
    [-9, 48],
    [-10, 63],
    [14, 31],
    [42, -17],
    [31, 10],
    [26, 61]
   ],
   [
    [4827, 7861],
    [5, -51],
    [-21, -65],
    [-49, -42],
    [-40, 11],
    [23, 75],
    [-15, 73],
    [38, 56],
    [21, 34]
   ],
   [
    [6497, 6664],
    [25, 14],
    [19, 41],
    [19, -2],
    [12, 13],
    [20, -6],
    [31, -37],
    [22, -8],
    [31, -63],
    [21, -3],
    [3, -60]
   ],
   [
    [6690, 6135],
    [14, -38],
    [11, -43],
    [27, -32],
    [1, -63],
    [13, -12],
    [2, -33],
    [-40, -37],
    [-10, -83]
   ],
   [
    [6708, 5794],
    [-53, 21],
    [-30, 17],
    [-31, 9],
    [-12, 88],
    [-13, 13],
    [-22, -13],
    [-28, -35],
    [-34, 24],
    [-28, 55],
    [-27, 21],
    [-18, 68],
    [-21, 96],
    [-15, -12],
    [-17, 24],
    [-11, -28]
   ],
   [
    [6348, 6142],
    [-15, 38],
    [0, 38],
    [-9, 0],
    [5, 52],
    [-15, 54],
    [-34, 40],
    [-19, 68],
    [6, 56],
    [14, 25],
    [-2, 42],
    [-18, 21],
    [-18, 86]
   ],
   [
    [6243, 6662],
    [-15, 58],
    [5, 22],
    [-8, 82],
    [19, 21]
   ],
   [
    [6357, 6745],
    [9, -53],
    [26, -15],
    [20, -36],
    [39, -13],
    [44, 19],
    [2, 17]
   ],
   [
    [6348, 6142],
    [-16, 3]
   ],
   [
    [6332, 6145],
    [-19, 6],
    [-20, -69]
   ],
   [
    [6293, 6082],
    [-52, 6],
    [-78, 145],
    [-41, 50],
    [-34, 19]
   ],
   [
    [6088, 6302],
    [-11, 88]
   ],
   [
    [6077, 6390],
    [61, 74],
    [11, 87],
    [-3, 53],
    [16, 17],
    [14, 45]
   ],
   [
    [6176, 6666],
    [12, 11],
    [32, -9],
    [10, -18],
    [13, 12]
   ],
   [
    [4597, 8765],
    [-7, -47],
    [31, -49],
    [-36, -54],
    [-80, -50],
    [-24, -13],
    [-36, 11],
    [-78, 23],
    [28, 31],
    [-61, 35],
    [49, 14],
    [-1, 21],
    [-58, 17],
    [19, 47],
    [42, 11],
    [43, -49],
    [42, 39],
    [35, -20],
    [45, 38],
    [47, -5]
   ],
   [
    [5992, 6342],
    [-5, -23]
   ],
   [
    [5987, 6319],
    [-10, 10],
    [-6, -48],
    [7, -8],
    [-7, -10],
    [-1, -19],
    [13, 10]
   ],
   [
    [5983, 6254],
    [0, -28],
    [-14, -115]
   ],
   [
    [5951, 6235],
    [8, 23],
    [-2, 4],
    [8, 34],
    [5, 54],
    [4, 18],
    [1, 1]
   ],
   [
    [5975, 6369],
    [9, 0],
    [3, 13],
    [7, 0]
   ],
   [
    [5994, 6382],
    [1, -29],
    [-4, -11],
    [1, 0]
   ],
   [
    [5431, 6738],
    [-10, -56],
    [4, -23],
    [-6, -37],
    [-21, 28],
    [-14, 7],
    [-39, 37],
    [4, 37],
    [32, -7],
    [28, 8],
    [22, 6]
   ],
   [
    [5255, 6952],
    [17, -51],
    [-4, -95],
    [-13, 5],
    [-11, -24],
    [-10, 19],
    [-2, 86],
    [-6, 41],
    [15, -3],
    [14, 22]
   ],
   [
    [5383, 7333],
    [-3, -36],
    [7, -30]
   ],
   [
    [5387, 7267],
    [-22, 10],
    [-23, -25],
    [1, -36],
    [-3, -21],
    [9, -36],
    [26, -36],
    [14, -60],
    [31, -57],
    [22, 0],
    [7, -16],
    [-8, -14],
    [25, -26],
    [20, -22],
    [24, -37],
    [3, -14],
    [-5, -25],
    [-16, 33],
    [-24, 12],
    [-12, -47],
    [20, -26],
    [-3, -38],
    [-11, -4],
    [-15, -61],
    [-12, -6],
    [0, 22],
    [6, 38],
    [6, 16],
    [-11, 41],
    [-8, 37],
    [-12, 9],
    [-8, 31],
    [-18, 13],
    [-12, 28],
    [-21, 5],
    [-21, 33],
    [-26, 46],
    [-19, 42],
    [-8, 71],
    [-14, 8],
    [-23, 24],
    [-12, -10],
    [-16, -33],
    [-12, -6]
   ],
   [
    [2845, 5321],
    [19, -7],
    [14, -17],
    [5, -20],
    [-19, -1],
    [-9, -12],
    [-15, 12],
    [-16, 26],
    [3, 16],
    [12, 5],
    [6, -2]
   ],
   [
    [5992, 6342],
    [31, -29],
    [54, 77]
   ],
   [
    [6088, 6302],
    [-5, -11],
    [-56, -36],
    [28, -71],
    [-9, -13],
    [-5, -24],
    [-21, -10],
    [-7, -25],
    [-12, -22],
    [-31, 11]
   ],
   [
    [5970, 6101],
    [-1, 10]
   ],
   [
    [5983, 6254],
    [4, 21],
    [0, 44]
   ],
   [
    [8739, 6445],
    [4, -25],
    [-16, -43],
    [-11, 23],
    [-15, -17],
    [-7, -42],
    [-18, 21],
    [0, 34],
    [15, 43],
    [16, -9],
    [12, 31],
    [20, -16]
   ],
   [
    [8915, 6660],
    [-10, -57],
    [4, -36],
    [-14, -51],
    [-35, -34],
    [-49, -4],
    [-40, -82],
    [-19, 28],
    [-1, 53],
    [-48, -16],
    [-33, -33],
    [-32, -2],
    [28, -53],
    [-19, -122],
    [-18, -30],
    [-13, 28],
    [7, 65],
    [-18, 21],
    [-11, 49],
    [26, 22],
    [15, 45],
    [28, 37],
    [20, 49],
    [55, 22],
    [30, -15],
    [29, 128],
    [19, -35],
    [40, 72],
    [16, 28],
    [18, 88],
    [-5, 81],
    [11, 45],
    [30, 13],
    [15, -99],
    [-1, -59],
    [-25, -72],
    [0, -74]
   ],
   [
    [8997, 7165],
    [19, -15],
    [20, 30],
    [6, -81],
    [-41, -19],
    [-25, -72],
    [-43, 50],
    [-15, -79],
    [-31, -1],
    [-4, 71],
    [14, 56],
    [29, 3],
    [8, 100],
    [9, 56],
    [32, -75],
    [22, -24]
   ],
   [
    [6970, 7028],
    [-15, -13],
    [-37, -50],
    [-12, -52],
    [-11, 0],
    [-7, 34],
    [-36, 2],
    [-5, 59],
    [-14, 0],
    [2, 72],
    [-33, 53],
    [-48, -6],
    [-32, -10],
    [-27, 65],
    [-22, 27],
    [-43, 51],
    [-6, 6],
    [-71, -42],
    [1, -265]
   ],
   [
    [6554, 6959],
    [-14, -3],
    [-20, 56],
    [-18, 20],
    [-32, -15],
    [-12, -24]
   ],
   [
    [6458, 6993],
    [-2, 18],
    [7, 30],
    [-5, 25],
    [-32, 24],
    [-13, 65],
    [-15, 18],
    [-1, 23],
    [27, -7],
    [1, 53],
    [23, 12],
    [25, -11],
    [5, 70],
    [-5, 44],
    [-28, -3],
    [-24, 17],
    [-32, -31],
    [-26, -15]
   ],
   [
    [6363, 7325],
    [-14, 11],
    [3, 37],
    [-18, 48],
    [-20, -2],
    [-24, 49],
    [16, 54],
    [-8, 15],
    [22, 79],
    [29, -42],
    [3, 53],
    [58, 78],
    [43, 2],
    [61, -50],
    [33, -29],
    [30, 30],
    [44, 2],
    [35, -38],
    [8, 22],
    [39, -3],
    [7, 34],
    [-45, 49],
    [27, 35],
    [-5, 19],
    [26, 19],
    [-20, 49],
    [13, 25],
    [104, 25],
    [13, 18],
    [70, 26],
    [25, 30],
    [50, -16],
    [9, -74],
    [29, 17],
    [35, -24],
    [-2, -39],
    [27, 4],
    [69, 68],
    [-10, -23],
    [35, -55],
    [62, -183],
    [15, 38],
    [39, -41],
    [39, 18],
    [16, -13],
    [13, -41],
    [20, -14],
    [11, -31],
    [36, 10],
    [15, -44]
   ],
   [
    [7229, 7034],
    [-17, 10],
    [-14, 26],
    [-42, 8],
    [-46, 2],
    [-10, -8],
    [-39, 30],
    [-16, -15],
    [-4, -42],
    [-46, 24],
    [-18, -10],
    [-7, -31]
   ],
   [
    [6155, 3872],
    [-20, -28],
    [-7, -30],
    [-10, -6],
    [-4, -50],
    [-9, -29],
    [-5, -48],
    [-12, -24]
   ],
   [
    [6088, 3657],
    [-40, 72],
    [-1, 42],
    [-101, 146],
    [-5, 8]
   ],
   [
    [5941, 3925],
    [0, 76],
    [8, 29],
    [14, 48],
    [10, 52],
    [-13, 82],
    [-3, 36],
    [-13, 50]
   ],
   [
    [5944, 4298],
    [17, 43],
    [19, 47]
   ],
   [
    [6162, 4274],
    [-24, -81],
    [0, -262],
    [17, -59]
   ],
   [
    [7046, 6824],
    [-53, -11],
    [-34, 24],
    [-30, -6],
    [3, 42],
    [30, -12],
    [10, 22]
   ],
   [
    [6972, 6883],
    [21, -7],
    [36, 51],
    [-33, 38],
    [-20, -18],
    [-21, 27],
    [24, 47],
    [-9, 7]
   ],
   [
    [7849, 4868],
    [-7, 87],
    [18, 60],
    [36, 13],
    [26, -10]
   ],
   [
    [7922, 5018],
    [23, -28],
    [12, 49],
    [25, -26]
   ],
   [
    [7982, 5013],
    [6, -48],
    [-3, -86],
    [-47, -55],
    [13, -44],
    [-30, -5],
    [-24, -29]
   ],
   [
    [7897, 4746],
    [-23, 11],
    [-11, 37],
    [-14, 74]
   ],
   [
    [8564, 6766],
    [24, -85],
    [7, -47],
    [0, -82],
    [-10, -40],
    [-25, -14],
    [-22, -29],
    [-25, -7],
    [-3, 39],
    [5, 54],
    [-13, 75],
    [21, 12],
    [-19, 62]
   ],
   [
    [8504, 6704],
    [2, 6],
    [12, -2],
    [11, 32],
    [20, 3],
    [11, 5],
    [4, 18]
   ],
   [
    [5557, 7051],
    [5, 16]
   ],
   [
    [5562, 7067],
    [7, 5],
    [4, 24],
    [5, 4],
    [4, -10],
    [5, -4],
    [3, -12],
    [5, -3],
    [5, -14],
    [4, 1],
    [-3, -18],
    [-3, -8],
    [1, -6]
   ],
   [
    [5599, 7026],
    [-6, -2],
    [-17, -12],
    [-1, -14],
    [-4, 0]
   ],
   [
    [6332, 6145],
    [6, -31],
    [-3, -17],
    [9, -54]
   ],
   [
    [6344, 6043],
    [-19, -2],
    [-7, 35],
    [-25, 6]
   ],
   [
    [7922, 5018],
    [9, 32],
    [1, 61],
    [-22, 63],
    [-2, 71],
    [-21, 58],
    [-21, 5],
    [-6, -25],
    [-16, -2],
    [-8, 12],
    [-30, -42],
    [0, 64],
    [7, 76],
    [-19, 3],
    [-2, 43],
    [-12, 22]
   ],
   [
    [7780, 5459],
    [6, 27],
    [24, 46]
   ],
   [
    [7837, 5606],
    [17, -57],
    [12, -65],
    [34, 0],
    [11, -63],
    [-18, -19],
    [-8, -26],
    [34, -43],
    [23, -84],
    [17, -64],
    [21, -50],
    [7, -50],
    [-5, -72]
   ],
   [
    [5975, 6369],
    [10, 59],
    [14, 50],
    [0, 3]
   ],
   [
    [5999, 6481],
    [13, -4],
    [4, -28],
    [-15, -27],
    [-7, -40]
   ],
   [
    [4785, 4306],
    [-7, 0],
    [-29, 34],
    [-25, 55],
    [-24, 39],
    [-18, 46]
   ],
   [
    [4682, 4480],
    [6, 23],
    [2, 21],
    [12, 39],
    [13, 34]
   ],
   [
    [5412, 5635],
    [-20, -27],
    [-15, 39],
    [-44, 31]
   ],
   [
    [5263, 6169],
    [13, 17],
    [3, 30],
    [-3, 30],
    [19, 28],
    [8, 23],
    [14, 20],
    [2, 55]
   ],
   [
    [5319, 6372],
    [32, -24],
    [12, 6],
    [23, -12],
    [37, -32],
    [13, -64],
    [25, -14],
    [39, -30],
    [30, -36],
    [13, 19],
    [13, 33],
    [-6, 55],
    [9, 35],
    [20, 33],
    [19, 10],
    [37, -14],
    [10, -33],
    [10, 0],
    [9, -12],
    [28, -8],
    [6, -24]
   ],
   [
    [5694, 5573],
    [0, -144],
    [-32, 0],
    [0, -30]
   ],
   [
    [5662, 5399],
    [-111, 137],
    [-111, 138],
    [-28, -39]
   ],
   [
    [7271, 4533],
    [-4, -75],
    [-12, -20],
    [-24, -16],
    [-13, 57],
    [-5, 103],
    [13, 116],
    [19, -39],
    [13, -51],
    [13, -75]
   ],
   [
    [5804, 1914],
    [10, -22],
    [-9, -35],
    [-4, -23],
    [-16, -11],
    [-5, -23],
    [-10, -7],
    [-21, 55],
    [15, 45],
    [15, 28],
    [13, 15],
    [12, -22]
   ],
   [
    [5631, 7894],
    [-2, 18],
    [3, 20],
    [-13, 11],
    [-29, 13]
   ],
   [
    [5590, 7956],
    [-6, 60]
   ],
   [
    [5584, 8016],
    [32, 22],
    [47, -4],
    [27, 7],
    [4, -15],
    [15, -5],
    [26, -35]
   ],
   [
    [5652, 7864],
    [-7, 22],
    [-14, 8]
   ],
   [
    [5584, 8016],
    [1, 54],
    [14, 45],
    [26, 25],
    [22, -54],
    [22, 2],
    [6, 55]
   ],
   [
    [5757, 8120],
    [14, -17],
    [2, -34],
    [9, -43]
   ],
   [
    [4759, 5979],
    [-4, 0],
    [0, -39],
    [-17, -2],
    [-9, -16],
    [-13, 0],
    [-10, 9],
    [-23, -8],
    [-9, -56],
    [-9, -5],
    [-13, -90],
    [-38, -78],
    [-9, -99],
    [-12, -32],
    [-3, -26],
    [-63, -6]
   ],
   [
    [4527, 5531],
    [1, 34],
    [11, 19],
    [9, 38],
    [-2, 24],
    [10, 50],
    [15, 46],
    [9, 12],
    [8, 42],
    [0, 38],
    [10, 44],
    [19, 26],
    [18, 74],
    [0, 1],
    [14, 27],
    [26, 8],
    [22, 49],
    [14, 19],
    [23, 60],
    [-7, 90],
    [10, 61],
    [4, 38],
    [18, 49],
    [28, 33],
    [21, 29],
    [18, 75],
    [9, 44],
    [20, -1],
    [17, -30],
    [26, 5],
    [29, -16],
    [12, -1]
   ],
   [
    [5739, 7455],
    [6, 11],
    [19, 7],
    [20, -22],
    [12, -3],
    [12, -19],
    [-2, -25],
    [11, -11],
    [4, -30],
    [9, -19],
    [-2, -10],
    [5, -8],
    [-7, -5],
    [-16, 2],
    [-3, 10],
    [-6, -6],
    [2, -12],
    [-7, -23],
    [-5, -25],
    [-7, -8]
   ],
   [
    [5784, 7259],
    [-5, 33],
    [3, 31],
    [-1, 31],
    [-16, 43],
    [-9, 30],
    [-9, 21],
    [-8, 7]
   ],
   [
    [6376, 3098],
    [7, -31],
    [7, -47],
    [4, -87],
    [7, -33],
    [-2, -35],
    [-5, -21],
    [-10, 42],
    [-5, -21],
    [5, -53],
    [-2, -31],
    [-8, -16],
    [-1, -61],
    [-11, -84],
    [-14, -99],
    [-17, -136],
    [-11, -100],
    [-12, -83],
    [-23, -17],
    [-24, -30],
    [-16, 18],
    [-22, 26],
    [-8, 38],
    [-2, 63],
    [-10, 58],
    [-2, 51],
    [5, 52],
    [13, 12],
    [0, 24],
    [13, 55],
    [2, 46],
    [-6, 34],
    [-5, 45],
    [-2, 66],
    [9, 40],
    [4, 46],
    [14, 2],
    [15, 15],
    [11, 13],
    [12, 1],
    [16, 41],
    [23, 44],
    [8, 36],
    [-4, 31],
    [12, -9],
    [15, 50],
    [1, 43],
    [9, 33],
    [10, -31]
   ],
   [
    [2301, 5851],
    [-10, -63],
    [-5, -52],
    [-2, -96],
    [-3, -35],
    [5, -40],
    [9, -35],
    [5, -55],
    [19, -54],
    [6, -41],
    [11, -35],
    [29, -19],
    [12, -30],
    [24, 20],
    [21, 7],
    [21, 13],
    [18, 12],
    [17, 30],
    [7, 42],
    [2, 60],
    [5, 21],
    [19, 19],
    [29, 16],
    [25, -2],
    [17, 6],
    [6, -15],
    [-1, -35],
    [-15, -43],
    [-6, -43],
    [5, -13],
    [-4, -31],
    [-7, -56],
    [-7, 19],
    [-6, -2]
   ],
   [
    [2438, 5037],
    [-32, 77],
    [-14, 24],
    [-23, 18],
    [-15, -5],
    [-22, -27],
    [-14, -7],
    [-20, 19],
    [-21, 14],
    [-26, 33],
    [-21, 10],
    [-31, 33],
    [-23, 34],
    [-7, 19],
    [-16, 5],
    [-28, 23],
    [-12, 32],
    [-30, 41],
    [-14, 45],
    [-6, 35],
    [9, 7],
    [-3, 21],
    [7, 18],
    [0, 25],
    [-10, 32],
    [-2, 29],
    [-9, 36],
    [-25, 72],
    [-28, 56],
    [-13, 45],
    [-24, 29],
    [-5, 17],
    [4, 45],
    [-14, 16],
    [-17, 35],
    [-7, 50],
    [-14, 6],
    [-17, 38],
    [-13, 35],
    [-1, 23],
    [-15, 54],
    [-10, 55],
    [1, 27],
    [-20, 29],
    [-10, -3],
    [-15, 19],
    [-5, -29],
    [5, -34],
    [2, -54],
    [10, -30],
    [21, -49],
    [4, -17],
    [4, -5],
    [4, -25],
    [5, 1],
    [6, -46],
    [8, -19],
    [6, -25],
    [17, -36],
    [10, -67],
    [8, -32],
    [8, -33],
    [1, -38],
    [13, -3],
    [12, -32],
    [10, -32],
    [-1, -13],
    [-12, -27],
    [-5, 1],
    [-7, 43],
    [-18, 41],
    [-20, 35],
    [-14, 18],
    [1, 53],
    [-5, 39],
    [-13, 22],
    [-19, 32],
    [-4, -9],
    [-7, 19],
    [-17, 17],
    [-16, 42],
    [2, 5],
    [11, -4],
    [11, 27],
    [1, 32],
    [-22, 51],
    [-16, 20],
    [-10, 45],
    [-11, 47],
    [-12, 58],
    [-12, 64]
   ],
   [
    [1746, 6329],
    [32, 6],
    [35, 8],
    [-2, -15],
    [41, -34],
    [64, -51],
    [55, 0],
    [22, 1],
    [0, 29],
    [48, 0],
    [10, -25],
    [15, -23],
    [16, -32],
    [9, -37],
    [7, -40],
    [15, -21],
    [23, -22],
    [17, 57],
    [23, 1],
    [19, -28],
    [14, -49],
    [10, -43],
    [16, -40],
    [6, -51],
    [8, -33],
    [22, -23],
    [20, -16],
    [10, 3]
   ],
   [
    [5599, 7026],
    [9, 5],
    [13, 1]
   ],
   [
    [4661, 5043],
    [10, 13],
    [4, 42],
    [9, 2],
    [20, -20],
    [15, 14],
    [11, -5],
    [4, 16],
    [112, 1],
    [6, 50],
    [-5, 9],
    [-13, 310],
    [-14, 310],
    [43, 1]
   ],
   [
    [5118, 5368],
    [0, -165],
    [-15, -48],
    [-2, -44],
    [-25, -11],
    [-38, -7],
    [-10, -25],
    [-18, -3]
   ],
   [
    [4680, 4887],
    [1, 22],
    [-2, 28],
    [-11, 20],
    [-5, 41],
    [-2, 45]
   ],
   [
    [7737, 4706],
    [-3, 54],
    [9, 55],
    [-10, 42],
    [3, 78],
    [-12, 37],
    [-9, 86],
    [-5, 91],
    [-12, 60],
    [-18, -36],
    [-32, -52],
    [-15, 7],
    [-17, 17],
    [9, 89],
    [-6, 67],
    [-21, 83],
    [3, 26],
    [-16, 9],
    [-20, 58]
   ],
   [
    [7780, 5459],
    [-16, -16],
    [-16, -32],
    [-20, -3],
    [-12, -77],
    [-12, -14],
    [14, -63],
    [17, -52],
    [12, -47],
    [-11, -63],
    [-9, -13],
    [6, -36],
    [19, -57],
    [3, -40],
    [0, -34],
    [11, -65],
    [-16, -67],
    [-13, -74]
   ],
   [
    [5538, 7e3],
    [-6, 6],
    [-8, 23],
    [-12, 14]
   ],
   [
    [5533, 7118],
    [8, -12],
    [4, -10],
    [9, -8],
    [10, -15],
    [-2, -6]
   ],
   [
    [7437, 7533],
    [29, 12],
    [53, 62],
    [42, 34],
    [24, -22],
    [29, -1],
    [19, -34],
    [28, -2],
    [40, -18],
    [27, 50],
    [-11, 42],
    [28, 74],
    [31, -29],
    [26, -9],
    [32, -18],
    [6, -54],
    [39, -30],
    [26, 13],
    [36, 9],
    [27, -9],
    [28, -35],
    [16, -36],
    [26, 0],
    [35, -11],
    [26, 18],
    [36, 11],
    [41, 51],
    [17, -8],
    [14, -24],
    [33, 6]
   ],
   [
    [5959, 3166],
    [21, 6],
    [34, -21],
    [7, 10],
    [19, 1],
    [10, 22],
    [17, -1],
    [30, 28],
    [22, 41]
   ],
   [
    [6119, 3252],
    [5, -32],
    [-1, -71],
    [3, -63],
    [1, -113],
    [5, -35],
    [-8, -51],
    [-11, -50],
    [-18, -45],
    [-25, -27],
    [-31, -35],
    [-32, -77],
    [-10, -13],
    [-20, -51],
    [-11, -16],
    [-3, -52],
    [14, -54],
    [5, -42],
    [0, -22],
    [5, 4],
    [-1, -70],
    [-4, -34],
    [6, -12],
    [-4, -30],
    [-11, -26],
    [-23, -24],
    [-34, -39],
    [-12, -26],
    [3, -30],
    [7, -5],
    [-3, -38]
   ],
   [
    [5911, 2073],
    [-21, 1]
   ],
   [
    [5890, 2074],
    [-2, 31],
    [-4, 32]
   ],
   [
    [5884, 2137],
    [-3, 26],
    [5, 80],
    [-7, 51],
    [-13, 101]
   ],
   [
    [5866, 2395],
    [29, 82],
    [7, 52],
    [5, 6],
    [3, 42],
    [-5, 22],
    [1, 53],
    [6, 50],
    [0, 91],
    [-15, 23],
    [-13, 5],
    [-6, 18],
    [-13, 15],
    [-23, -1],
    [-2, 27]
   ],
   [
    [5840, 2880],
    [-2, 51],
    [84, 59]
   ],
   [
    [5922, 2990],
    [16, -35],
    [8, 7],
    [11, -18],
    [1, -29],
    [-6, -33],
    [2, -51],
    [19, -44],
    [8, 50],
    [12, 15],
    [-2, 92],
    [-12, 52],
    [-10, 23],
    [-10, -1],
    [-7, 93],
    [7, 55]
   ],
   [
    [4661, 5043],
    [-18, 49],
    [-17, 53],
    [-18, 19],
    [-13, 21],
    [-16, -1],
    [-13, -16],
    [-14, 7],
    [-10, -23]
   ],
   [
    [4542, 5152],
    [-2, 38],
    [8, 36],
    [3, 67],
    [-3, 71],
    [-3, 36],
    [2, 36],
    [-7, 34],
    [-14, 31]
   ],
   [
    [4526, 5501],
    [6, 24],
    [108, -1],
    [-5, 104],
    [7, 37],
    [26, 6],
    [-1, 184],
    [91, -4],
    [0, 109]
   ],
   [
    [5922, 2990],
    [-15, 18],
    [9, 67],
    [9, 25],
    [-6, 60],
    [6, 58],
    [5, 19],
    [-7, 61],
    [-14, 32]
   ],
   [
    [5909, 3330],
    [28, -13],
    [5, -20],
    [10, -33],
    [7, -98]
   ],
   [
    [7836, 4440],
    [7, -7],
    [16, -43],
    [12, -48],
    [2, -49],
    [-3, -32],
    [2, -25],
    [2, -43],
    [10, -19],
    [11, -64],
    [-1, -24],
    [-19, -5],
    [-27, 53],
    [-32, 57],
    [-4, 37],
    [-16, 48],
    [-4, 59],
    [-10, 40],
    [4, 52],
    [-7, 30]
   ],
   [
    [7779, 4457],
    [5, 13],
    [23, -31],
    [2, -37],
    [18, 8],
    [9, 30]
   ],
   [
    [8045, 4137],
    [21, -24],
    [21, 13],
    [6, 61],
    [12, 13],
    [33, 16],
    [20, 57],
    [14, 45]
   ],
   [
    [8206, 4384],
    [22, 50],
    [14, 56],
    [11, 1],
    [14, -37],
    [1, -31],
    [19, -20],
    [23, -22],
    [-2, -28],
    [-19, -3],
    [5, -35],
    [-20, -25]
   ],
   [
    [5453, 1941],
    [-20, 54],
    [-11, 53],
    [-6, 70],
    [-7, 52],
    [-9, 110],
    [-1, 86],
    [-3, 39],
    [-11, 30],
    [-15, 59],
    [-14, 86],
    [-6, 46],
    [-23, 70],
    [-2, 55]
   ],
   [
    [5644, 2735],
    [23, 16],
    [18, -4],
    [11, -16],
    [0, -6]
   ],
   [
    [5552, 2215],
    [0, -266],
    [-25, -36],
    [-15, -5],
    [-17, 13],
    [-13, 5],
    [-4, 31],
    [-11, 20],
    [-14, -36]
   ],
   [
    [9604, 2479],
    [23, -44],
    [14, -33],
    [-10, -17],
    [-16, 19],
    [-19, 32],
    [-18, 38],
    [-19, 51],
    [-4, 24],
    [12, -1],
    [16, -24],
    [12, -24],
    [9, -21]
   ],
   [
    [5412, 5635],
    [7, -112],
    [10, -19],
    [1, -22],
    [11, -25],
    [-6, -31],
    [-11, -146],
    [-1, -93],
    [-35, -68],
    [-12, -94],
    [11, -27],
    [0, -46],
    [18, -2],
    [-3, -34]
   ],
   [
    [5393, 4889],
    [-5, -1],
    [-19, 78],
    [-6, 3],
    [-22, -40],
    [-21, 21],
    [-15, 4],
    [-8, -10],
    [-17, 2],
    [-16, -30],
    [-14, -2],
    [-34, 37],
    [-13, -17],
    [-14, 1],
    [-10, 27],
    [-28, 27],
    [-30, -9],
    [-7, -15],
    [-4, -42],
    [-8, -29],
    [-2, -64]
   ],
   [
    [5236, 4336],
    [-29, -26],
    [-11, 4],
    [-10, -16],
    [-23, 1],
    [-15, 45],
    [-9, 52],
    [-19, 47],
    [-21, -1],
    [-25, 0]
   ],
   [
    [2619, 4789],
    [-10, 23],
    [-13, 29],
    [-6, 24],
    [-12, 23],
    [-13, 32],
    [3, 11],
    [4, -11],
    [2, 5]
   ],
   [
    [2690, 5070],
    [-2, -7],
    [-2, -16],
    [3, -26],
    [-6, -25],
    [-3, -29],
    [-1, -31],
    [1, -19],
    [1, -32],
    [-4, -7],
    [-3, -31],
    [2, -19],
    [-6, -18],
    [2, -20],
    [4, -11]
   ],
   [
    [5092, 7680],
    [14, 20],
    [24, 105],
    [38, 30],
    [23, -2]
   ],
   [
    [5863, 8988],
    [-47, -29],
    [-22, -7]
   ],
   [
    [5573, 8955],
    [-17, -3],
    [-4, -47],
    [-53, 11],
    [-7, -40],
    [-27, 1],
    [-18, -51],
    [-28, -80],
    [-43, -101],
    [10, -25],
    [-10, -28],
    [-27, 1],
    [-18, -67],
    [2, -96],
    [17, -36],
    [-9, -84],
    [-23, -50],
    [-12, -41]
   ],
   [
    [5306, 8219],
    [-19, 44],
    [-55, -83],
    [-37, -17],
    [-38, 37],
    [-10, 77],
    [-9, 166],
    [26, 46],
    [73, 60],
    [55, 74],
    [51, 100],
    [66, 139],
    [47, 54],
    [76, 90],
    [61, 32],
    [46, -4],
    [42, 59],
    [51, -3],
    [50, 14],
    [87, -52],
    [-36, -19],
    [30, -45]
   ],
   [
    [5686, 9583],
    [-62, -29],
    [-49, 16],
    [19, 19],
    [-16, 23],
    [57, 14],
    [11, -27],
    [40, -16]
   ],
   [
    [5506, 9716],
    [92, -54],
    [-70, -28],
    [-15, -53],
    [-25, -13],
    [-13, -60],
    [-34, -3],
    [-59, 44],
    [25, 26],
    [-42, 20],
    [-54, 61],
    [-21, 56],
    [75, 26],
    [16, -25],
    [39, 1],
    [11, 24],
    [40, 3],
    [35, -25]
   ],
   [
    [5706, 9767],
    [55, -26],
    [-41, -38],
    [-81, -9],
    [-82, 12],
    [-5, 20],
    [-40, 1],
    [-30, 33],
    [86, 20],
    [40, -17],
    [28, 21],
    [70, -17]
   ],
   [
    [9805, 1055],
    [6, -30],
    [20, 29],
    [8, -30],
    [0, -30],
    [-10, -33],
    [-18, -53],
    [-14, -29],
    [10, -35],
    [-22, -1],
    [-23, -27],
    [-8, -47],
    [-16, -72],
    [-21, -32],
    [-14, -21],
    [-26, 2],
    [-18, 23],
    [-30, 5],
    [-5, 27],
    [15, 53],
    [35, 71],
    [18, 13],
    [20, 28],
    [24, 37],
    [16, 38],
    [13, 53],
    [10, 18],
    [5, 40],
    [19, 34],
    [6, -31]
   ],
   [
    [9849, 1397],
    [20, -76],
    [1, 49],
    [13, -19],
    [4, -55],
    [22, -23],
    [19, -6],
    [16, 28],
    [14, -9],
    [-7, -63],
    [-8, -42],
    [-22, 1],
    [-7, -22],
    [3, -30],
    [-4, -14],
    [-11, -38],
    [-14, -50],
    [-21, -28],
    [-5, 19],
    [-12, 10],
    [16, 59],
    [-9, 40],
    [-30, 28],
    [1, 26],
    [20, 25],
    [5, 56],
    [-1, 46],
    [-12, 48],
    [1, 13],
    [-13, 29],
    [-22, 64],
    [-12, 51],
    [11, 5],
    [15, -39],
    [21, -19],
    [8, -64]
   ],
   [
    [6475, 5189],
    [-9, 50],
    [-22, 118]
   ],
   [
    [6444, 5357],
    [83, 72],
    [19, 144],
    [-13, 51]
   ],
   [
    [6566, 5783],
    [12, -49],
    [16, -26],
    [20, -10],
    [17, -13],
    [12, -41],
    [8, -24],
    [10, -9],
    [0, -16],
    [-10, -43],
    [-5, -20],
    [-12, -23],
    [-10, -49],
    [-13, 4],
    [-5, -17],
    [-5, -37],
    [4, -48],
    [-3, -9],
    [-13, 1],
    [-17, -27],
    [-3, -35],
    [-6, -15],
    [-18, 0],
    [-10, -18],
    [0, -29],
    [-14, -20],
    [-15, 7],
    [-19, -24],
    [-12, -4]
   ],
   [
    [6557, 5864],
    [8, 24],
    [3, -6],
    [-2, -30],
    [-4, -13]
   ],
   [
    [6893, 5694],
    [-20, 18],
    [-9, 52],
    [-21, 55],
    [-51, -14],
    [-45, -1],
    [-39, -10]
   ],
   [
    [2836, 4512],
    [-9, 20],
    [-6, 39],
    [7, 19],
    [-7, 5],
    [-5, 24],
    [-14, 20],
    [-12, -5],
    [-6, -25],
    [-11, -18],
    [-6, -2],
    [-3, -15],
    [13, -39],
    [-7, -9],
    [-4, -11],
    [-13, -3],
    [-5, 42],
    [-4, -12],
    [-9, 4],
    [-5, 29],
    [-12, 5],
    [-7, 8],
    [-12, 0],
    [-1, -15],
    [-3, 11]
   ],
   [
    [2707, 4680],
    [10, -26],
    [-1, -15],
    [11, -3],
    [3, 6],
    [8, -18],
    [13, 5],
    [12, 18],
    [17, 15],
    [9, 21],
    [16, -4],
    [-1, -7],
    [15, -3],
    [12, -12],
    [10, -22],
    [10, -19]
   ],
   [
    [3045, 2676],
    [-28, 41],
    [-2, 29],
    [-55, 72],
    [-50, 79],
    [-22, 44],
    [-11, 60],
    [4, 20],
    [-23, 94],
    [-28, 133],
    [-26, 143],
    [-11, 33],
    [-9, 52],
    [-21, 47],
    [-20, 29],
    [9, 32],
    [-14, 69],
    [9, 50],
    [22, 46]
   ],
   [
    [8510, 4597],
    [2, -47],
    [2, -41],
    [-9, -65],
    [-11, 73],
    [-13, -37],
    [9, -53],
    [-8, -33],
    [-32, 41],
    [-8, 52],
    [8, 35],
    [-17, 34],
    [-9, -30],
    [-13, 3],
    [-21, -41],
    [-4, 21],
    [11, 61],
    [17, 20],
    [15, 27],
    [10, -32],
    [21, 19],
    [5, 32],
    [19, 2],
    [-1, 56],
    [22, -34],
    [3, -36],
    [2, -27]
   ],
   [
    [8443, 4731],
    [-10, -23],
    [-9, -46],
    [-8, -21],
    [-17, 50],
    [5, 19],
    [7, 20],
    [3, 44],
    [16, 5],
    [-5, -49],
    [21, 70],
    [-3, -69]
   ],
   [
    [8291, 4662],
    [-37, -68],
    [14, 50],
    [20, 44],
    [16, 50],
    [15, 71],
    [5, -58],
    [-18, -40],
    [-15, -49]
   ],
   [
    [8385, 4847],
    [16, -22],
    [18, 0],
    [0, -30],
    [-13, -31],
    [-18, -21],
    [-1, 33],
    [2, 37],
    [-4, 34]
   ],
   [
    [8485, 4866],
    [8, -80],
    [-21, 19],
    [0, -24],
    [7, -44],
    [-13, -16],
    [-1, 50],
    [-9, 4],
    [-4, 43],
    [16, -5],
    [0, 27],
    [-17, 55],
    [27, -2],
    [7, -27]
   ],
   [
    [8375, 4931],
    [-7, -62],
    [-12, 36],
    [-15, 55],
    [24, -3],
    [10, -26]
   ],
   [
    [8369, 5322],
    [17, -21],
    [9, 19],
    [2, -18],
    [-4, -30],
    [9, -52],
    [-7, -59],
    [-16, -24],
    [-5, -58],
    [7, -57],
    [14, -8],
    [13, 8],
    [34, -39],
    [-2, -39],
    [9, -18],
    [-3, -33],
    [-22, 35],
    [-10, 38],
    [-7, -26],
    [-18, 43],
    [-25, -11],
    [-14, 16],
    [1, 30],
    [9, 18],
    [-8, 17],
    [-4, -26],
    [-14, 41],
    [-4, 31],
    [-1, 69],
    [11, -24],
    [3, 113],
    [9, 65],
    [17, 0]
   ],
   [
    [9329, 3503],
    [-8, -7],
    [-12, 28],
    [-12, 45],
    [-6, 55],
    [4, 7],
    [3, -21],
    [8, -17],
    [14, -45],
    [13, -25],
    [-4, -20]
   ],
   [
    [9221, 3600],
    [-15, -6],
    [-4, -20],
    [-15, -18],
    [-15, -17],
    [-14, 1],
    [-23, 20],
    [-16, 20],
    [2, 23],
    [25, -11],
    [15, 6],
    [5, 34],
    [4, 2],
    [2, -38],
    [16, 5],
    [8, 25],
    [16, 25],
    [-4, 43],
    [17, 1],
    [6, -12],
    [-1, -39],
    [-9, -44]
   ],
   [
    [8916, 3806],
    [48, -49],
    [51, -41],
    [19, -37],
    [16, -36],
    [4, -42],
    [46, -45],
    [7, -38],
    [-25, -8],
    [6, -47],
    [25, -48],
    [18, -76],
    [15, 3],
    [-1, -32],
    [22, -12],
    [-9, -14],
    [30, -30],
    [-3, -21],
    [-18, -5],
    [-7, 19],
    [-24, 8],
    [-28, 11],
    [-22, 45],
    [-16, 40],
    [-14, 63],
    [-36, 31],
    [-24, -20],
    [-17, -24],
    [4, -53],
    [-22, -25],
    [-16, 12],
    [-28, 3]
   ],
   [
    [9253, 3670],
    [-9, -19],
    [-5, 42],
    [-6, 28],
    [-13, 23],
    [-16, 31],
    [-20, 21],
    [8, 18],
    [15, -21],
    [9, -15],
    [12, -18],
    [11, -30],
    [11, -23],
    [3, -37]
   ],
   [
    [5392, 7853],
    [19, 21],
    [43, 33],
    [35, 25],
    [28, -13],
    [2, -17],
    [27, -1]
   ],
   [
    [5546, 7901],
    [34, -8],
    [51, 1]
   ],
   [
    [5653, 7697],
    [14, -63],
    [-3, -20],
    [-14, -9],
    [-25, -59],
    [7, -33],
    [-6, 5]
   ],
   [
    [5626, 7518],
    [-26, 27],
    [-20, -10],
    [-13, 7],
    [-17, -15],
    [-14, 25],
    [-11, -9],
    [-2, 4]
   ],
   [
    [3159, 5322],
    [14, -6],
    [5, -14],
    [-7, -18],
    [-21, 0],
    [-17, -2],
    [-1, 30],
    [4, 11],
    [23, -1]
   ],
   [
    [8628, 7037],
    [4, -12]
   ],
   [
    [8632, 7025],
    [-11, 4],
    [-12, -24],
    [-8, -25],
    [1, -51],
    [-14, -16],
    [-5, -13],
    [-11, -21],
    [-18, -12],
    [-12, -19],
    [-1, -31],
    [-3, -8],
    [11, -12],
    [15, -31]
   ],
   [
    [8504, 6704],
    [-13, 13],
    [-4, -13],
    [-8, -6],
    [-1, 13],
    [-7, 7],
    [-8, 11],
    [8, 32],
    [7, 8],
    [-3, 13],
    [7, 39],
    [-2, 12],
    [-16, 8],
    [-13, 19]
   ],
   [
    [4792, 6657],
    [-11, -19],
    [-14, 10],
    [-15, -8],
    [5, 57],
    [-3, 44],
    [-12, 6],
    [-7, 28],
    [2, 47],
    [11, 26],
    [2, 29],
    [6, 43],
    [-1, 30],
    [-5, 26],
    [-1, 24]
   ],
   [
    [6411, 5771],
    [-2, 52],
    [7, 37],
    [8, 8],
    [8, -22],
    [1, -42],
    [-6, -43]
   ],
   [
    [6427, 5761],
    [-8, -5],
    [-8, 15]
   ],
   [
    [5630, 7431],
    [12, 16],
    [17, -8],
    [18, -1],
    [13, -17],
    [10, 11],
    [20, 7],
    [7, 16],
    [12, 0]
   ],
   [
    [5784, 7259],
    [12, -13],
    [13, 12],
    [13, -13]
   ],
   [
    [5822, 7245],
    [0, -18],
    [-13, -16],
    [-9, 7],
    [-7, -87]
   ],
   [
    [5629, 7169],
    [-5, 13],
    [6, 12],
    [-7, 9],
    [-8, -16],
    [-17, 21],
    [-2, 29],
    [-17, 17],
    [-3, 23],
    [-15, 28]
   ],
   [
    [8989, 7637],
    [28, -127],
    [-41, 23],
    [-17, -103],
    [27, -74],
    [-1, -50],
    [-21, 43],
    [-18, -55],
    [-5, 60],
    [3, 70],
    [-3, 77],
    [6, 55],
    [2, 96],
    [-17, 70],
    [3, 98],
    [25, 33],
    [-11, 34],
    [13, 10],
    [7, -48],
    [10, -69],
    [-1, -71],
    [11, -72]
   ],
   [
    [5546, 7901],
    [6, 32],
    [38, 23]
   ],
   [
    [138, 8774],
    [19, -18],
    [-6, 52],
    [75, -10],
    [55, -68],
    [-28, -31],
    [-46, -7],
    [0, -70],
    [-11, -15],
    [-26, 2],
    [-22, 25],
    [-36, 21],
    [-7, 31],
    [-28, 12],
    [-31, -10],
    [-16, 25],
    [6, 27],
    [-33, -17],
    [13, -34],
    [-16, -30],
    [0, 286],
    [68, -55],
    [73, -71],
    [-3, -45]
   ],
   [
    [9999, 9079],
    [-30, -4],
    [-5, 23],
    [35, 30],
    [0, -49]
   ],
   [
    [36, 9083],
    [-36, -4],
    [0, 49],
    [4, 3],
    [23, 0],
    [40, -21],
    [-2, -9],
    [-29, -18]
   ],
   [
    [8988, 9250],
    [-42, -1],
    [-57, 8],
    [-5, 4],
    [27, 29],
    [34, 6],
    [40, -27],
    [3, -19]
   ],
   [
    [9186, 9384],
    [-32, -28],
    [-44, 6],
    [-52, 29],
    [7, 23],
    [51, -11],
    [70, -19]
   ],
   [
    [9029, 9419],
    [-22, -54],
    [-102, 2],
    [-46, -17],
    [-55, 47],
    [15, 49],
    [37, 14],
    [73, -3],
    [100, -38]
   ],
   [
    [6598, 9071],
    [-17, -6],
    [-91, 9],
    [-7, 32],
    [-50, 19],
    [-4, 39],
    [28, 15],
    [-1, 39],
    [55, 62],
    [-25, 8],
    [66, 64],
    [-7, 32],
    [62, 38],
    [91, 46],
    [93, 14],
    [48, 26],
    [54, 10],
    [19, -29],
    [-19, -22],
    [-98, -36],
    [-85, -34],
    [-86, -68],
    [-42, -70],
    [-43, -69],
    [5, -60],
    [54, -59]
   ],
   [
    [6363, 7325],
    [-12, -43],
    [-27, -12],
    [-28, -74],
    [25, -68],
    [-2, -48],
    [30, -85]
   ],
   [
    [6109, 7112],
    [-35, 60],
    [-32, 28],
    [-24, 42],
    [20, 11],
    [23, 60],
    [-15, 29],
    [41, 29],
    [-1, 16],
    [-25, -12]
   ],
   [
    [6061, 7375],
    [1, 32],
    [14, 20],
    [27, 5],
    [5, 24],
    [-7, 40],
    [12, 37],
    [-1, 22],
    [-41, 23],
    [-16, -1],
    [-17, 34],
    [-21, -12],
    [-35, 26],
    [0, 14],
    [-10, 31],
    [-22, 3],
    [-2, 23],
    [7, 14],
    [-18, 41],
    [-29, -7],
    [-8, 4],
    [-7, -17],
    [-11, 3]
   ],
   [
    [5777, 8264],
    [31, 39],
    [-29, 34]
   ],
   [
    [5863, 8988],
    [29, 24],
    [46, -43],
    [76, -17],
    [105, -81],
    [21, -34],
    [2, -48],
    [-31, -38],
    [-45, -19],
    [-124, 55],
    [-21, -10],
    [45, -52],
    [2, -33],
    [2, -74],
    [36, -22],
    [22, -18],
    [3, 34],
    [-17, 31],
    [18, 28],
    [67, -45],
    [24, 17],
    [-19, 53],
    [65, 70],
    [25, -4],
    [26, -25],
    [16, 49],
    [-23, 43],
    [14, 43],
    [-21, 45],
    [78, -23],
    [16, -41],
    [-35, -8],
    [0, -40],
    [22, -25],
    [43, 16],
    [7, 45],
    [58, 35],
    [97, 61],
    [20, -3],
    [-27, -44],
    [35, -7],
    [19, 24],
    [52, 2],
    [42, 30],
    [31, -43],
    [32, 47],
    [-29, 42],
    [14, 23],
    [82, -21],
    [39, -23],
    [100, -82],
    [19, 38],
    [-28, 38],
    [-1, 15],
    [-34, 7],
    [10, 34],
    [-15, 56],
    [-1, 23],
    [51, 65],
    [18, 65],
    [21, 15],
    [74, -19],
    [5, -40],
    [-26, -59],
    [17, -22],
    [9, -51],
    [-6, -98],
    [31, -44],
    [-12, -48],
    [-55, -102],
    [32, -11],
    [11, 26],
    [31, 19],
    [7, 35],
    [24, 34],
    [-16, 41],
    [13, 48],
    [-31, 6],
    [-6, 40],
    [22, 72],
    [-36, 58],
    [50, 49],
    [-7, 51],
    [14, 1],
    [15, -40],
    [-11, -69],
    [29, -13],
    [-12, 52],
    [46, 28],
    [58, 4],
    [51, -41],
    [-25, 60],
    [-2, 76],
    [48, 15],
    [67, -3],
    [60, 9],
    [-23, 37],
    [33, 48],
    [31, 2],
    [54, 35],
    [74, 10],
    [9, 19],
    [73, 7],
    [23, -16],
    [62, 38],
    [51, -1],
    [8, 31],
    [26, 31],
    [66, 29],
    [48, -23],
    [-38, -18],
    [63, -11],
    [7, -35],
    [25, 17],
    [82, -1],
    [62, -35],
    [23, -27],
    [-7, -37],
    [-31, -21],
    [-73, -40],
    [-21, -22],
    [35, -10],
    [41, -18],
    [25, 14],
    [14, -46],
    [12, 18],
    [44, 12],
    [90, -12],
    [6, -34],
    [116, -10],
    [2, 54],
    [59, -12],
    [44, 0],
    [45, -38],
    [13, -46],
    [-17, -30],
    [35, -56],
    [44, -29],
    [27, 75],
    [44, -32],
    [48, 19],
    [53, -22],
    [21, 20],
    [45, -10],
    [-20, 67],
    [37, 31],
    [251, -47],
    [24, -42],
    [72, -55],
    [112, 13],
    [56, -12],
    [23, -29],
    [-4, -53],
    [35, -20],
    [37, 15],
    [49, 1],
    [52, -14],
    [53, 8],
    [49, -64],
    [34, 23],
    [-23, 46],
    [13, 32],
    [88, -20],
    [58, 4],
    [80, -34],
    [39, -31],
    [0, -286],
    [0, -1],
    [-36, -31],
    [-36, 5],
    [25, -38],
    [17, -59],
    [13, -20],
    [3, -29],
    [-7, -19],
    [-52, 15],
    [-78, -54],
    [-25, -8],
    [-42, -51],
    [-40, -44],
    [-11, -32],
    [-39, 49],
    [-73, -56],
    [-12, 27],
    [-27, -31],
    [-37, 10],
    [-9, -47],
    [-33, -70],
    [1, -29],
    [31, -16],
    [-4, -105],
    [-25, -2],
    [-12, -60],
    [11, -31],
    [-48, -37],
    [-10, -82],
    [-41, -17],
    [-9, -73],
    [-40, -67],
    [-10, 49],
    [-12, 105],
    [-15, 160],
    [13, 99],
    [23, 43],
    [2, 34],
    [43, 16],
    [50, 90],
    [47, 74],
    [50, 57],
    [23, 101],
    [-34, -6],
    [-17, -59],
    [-70, -79],
    [-23, 89],
    [-72, -25],
    [-69, -120],
    [23, -44],
    [-62, -19],
    [-43, -7],
    [2, 52],
    [-43, 11],
    [-35, -36],
    [-85, 13],
    [-91, -22],
    [-90, -140],
    [-106, -169],
    [43, -9],
    [14, -45],
    [27, -16],
    [18, 36],
    [30, -5],
    [40, -79],
    [1, -61],
    [-21, -72],
    [-3, -86],
    [-12, -114],
    [-42, -104],
    [-9, -50],
    [-38, -84],
    [-38, -82],
    [-18, -43],
    [-37, -42],
    [-17, -1],
    [-17, 35],
    [-38, -53],
    [-4, -23]
   ],
   [
    [7918, 9616],
    [-157, -28],
    [51, 94],
    [23, 8],
    [21, -4],
    [70, -41],
    [-8, -29]
   ],
   [
    [6420, 9777],
    [-37, -10],
    [-25, -5],
    [-4, -12],
    [-33, -12],
    [-30, 17],
    [16, 22],
    [-62, 3],
    [54, 13],
    [43, 1],
    [5, -20],
    [16, 17],
    [26, 12],
    [42, -15],
    [-11, -11]
   ],
   [
    [7775, 9657],
    [-60, -9],
    [-78, 21],
    [-46, 27],
    [-21, 52],
    [-38, 14],
    [72, 49],
    [60, 16],
    [54, -36],
    [64, -70],
    [-7, -64]
   ],
   [
    [5844, 3912],
    [11, -41],
    [-1, -42],
    [-8, -9]
   ],
   [
    [5821, 3897],
    [7, -8],
    [16, 23]
   ],
   [
    [4526, 5501],
    [1, 30]
   ],
   [
    [6188, 5167],
    [-4, 31],
    [-8, 21],
    [-2, 29],
    [-15, 26],
    [-15, 60],
    [-7, 58],
    [-20, 50],
    [-12, 11],
    [-18, 69],
    [-4, 50],
    [2, 42],
    [-16, 80],
    [-13, 28],
    [-15, 15],
    [-10, 41],
    [2, 16],
    [-8, 37],
    [-8, 16],
    [-11, 54],
    [-17, 58],
    [-14, 49],
    [-14, 0],
    [5, 39],
    [1, 25],
    [3, 29]
   ],
   [
    [6344, 6043],
    [11, -62],
    [14, -16],
    [5, -25],
    [18, -31],
    [2, -29],
    [-3, -24],
    [4, -24],
    [8, -20],
    [4, -24],
    [4, -17]
   ],
   [
    [6427, 5761],
    [5, -27]
   ],
   [
    [6444, 5357],
    [-80, -27],
    [-26, -33],
    [-20, -75],
    [-13, -12],
    [-7, 24],
    [-11, -4],
    [-27, 8],
    [-5, 7],
    [-32, -2],
    [-7, -6],
    [-12, 18],
    [-7, -35],
    [3, -30],
    [-12, -23]
   ],
   [
    [5943, 4673],
    [-4, 1],
    [0, 36],
    [-3, 24],
    [-14, 29],
    [-4, 52],
    [4, 53],
    [-13, 5],
    [-2, -17],
    [-17, -3],
    [7, -21],
    [2, -43],
    [-15, -40],
    [-14, -52],
    [-14, -7],
    [-23, 42],
    [-11, -15],
    [-3, -21],
    [-14, -13],
    [-1, -15],
    [-28, 0],
    [-3, 15],
    [-20, 2],
    [-10, -12],
    [-8, 6],
    [-14, 42],
    [-5, 20],
    [-20, -10],
    [-8, -34],
    [-7, -64],
    [-10, -13],
    [-8, -8]
   ],
   [
    [5663, 4612],
    [-2, 3]
   ],
   [
    [5635, 4793],
    [0, 18],
    [-10, 21],
    [-1, 41],
    [-5, 28],
    [-10, -4],
    [3, 26],
    [7, 30],
    [-3, 30],
    [9, 22],
    [-6, 17],
    [7, 44],
    [13, 53],
    [24, -5],
    [-1, 285]
   ],
   [
    [6023, 5573],
    [9, -71],
    [-6, -13],
    [4, -74],
    [11, -85],
    [10, -18],
    [15, -27]
   ],
   [
    [5943, 4681],
    [0, -8]
   ],
   [
    [5943, 4673],
    [0, -56]
   ],
   [
    [5944, 4298],
    [-17, -33],
    [-20, 0],
    [-22, -16],
    [-18, 16],
    [-11, -20]
   ],
   [
    [5682, 4584],
    [-19, 28]
   ],
   [
    [4535, 4969],
    [-11, 56],
    [-14, 26],
    [12, 13],
    [14, 51],
    [6, 37]
   ],
   [
    [4536, 4882],
    [-4, 55]
   ],
   [
    [9502, 3240],
    [8, -24],
    [-19, 0],
    [-11, 44],
    [17, -17],
    [5, -3]
   ],
   [
    [9467, 3284],
    [-11, -1],
    [-17, 7],
    [-5, 11],
    [1, 28],
    [19, -11],
    [9, -15],
    [4, -19]
   ],
   [
    [9490, 3304],
    [-4, -13],
    [-21, 62],
    [-5, 43],
    [9, 0],
    [10, -58],
    [11, -34]
   ],
   [
    [9440, 3394],
    [1, -14],
    [-22, 30],
    [-15, 26],
    [-10, 24],
    [4, 7],
    [13, -17],
    [23, -33],
    [6, -23]
   ],
   [
    [9375, 3465],
    [-5, -4],
    [-13, 17],
    [-11, 29],
    [1, 12],
    [17, -30],
    [11, -24]
   ],
   [
    [4682, 4480],
    [-8, 6],
    [-20, 29],
    [-14, 38],
    [-5, 26],
    [-3, 53]
   ],
   [
    [2561, 4954],
    [-3, -17],
    [-16, 1],
    [-10, 7],
    [-12, 14],
    [-15, 5],
    [-8, 15]
   ],
   [
    [6198, 4816],
    [9, -13],
    [5, -30],
    [13, -30],
    [14, 0],
    [26, 18],
    [30, 9],
    [25, 22],
    [13, 5],
    [10, 13],
    [16, 2]
   ],
   [
    [6359, 4812],
    [0, -1],
    [0, -29],
    [0, -73],
    [0, -37],
    [-13, -44],
    [-19, -60]
   ],
   [
    [6359, 4812],
    [9, 2],
    [13, 10],
    [14, 8],
    [14, 24],
    [10, 0],
    [1, -19],
    [-3, -42],
    [0, -38],
    [-6, -26],
    [-7, -77],
    [-14, -81],
    [-17, -91],
    [-24, -106],
    [-23, -80],
    [-33, -98],
    [-28, -58],
    [-42, -71],
    [-25, -55],
    [-31, -87],
    [-6, -38],
    [-6, -17]
   ],
   [
    [3412, 4422],
    [34, -14],
    [2, 13],
    [23, 5],
    [30, -20]
   ],
   [
    [3495, 4222],
    [-3, -33],
    [-7, -30]
   ],
   [
    [5626, 7518],
    [-8, -19],
    [-5, -29]
   ],
   [
    [5380, 7260],
    [7, 7]
   ],
   [
    [5663, 8733],
    [-47, -21],
    [-27, -50],
    [4, -44],
    [-44, -58],
    [-54, -61],
    [-20, -101],
    [20, -51],
    [26, -40],
    [-25, -81],
    [-29, -17],
    [-11, -120],
    [-15, -68],
    [-34, 7],
    [-16, -57],
    [-32, -3],
    [-9, 68],
    [-23, 82],
    [-21, 101]
   ],
   [
    [5890, 2074],
    [-5, -32],
    [-17, -8],
    [-16, 39],
    [0, 25],
    [7, 27],
    [3, 20],
    [8, 6],
    [14, -14]
   ],
   [
    [5999, 6481],
    [-2, 55],
    [7, 29]
   ],
   [
    [6004, 6565],
    [7, 16],
    [7, 16],
    [2, 40],
    [9, -14],
    [31, 20],
    [14, -14],
    [23, 0],
    [32, 27],
    [15, -1],
    [32, 11]
   ],
   [
    [5051, 4434],
    [-22, -15]
   ],
   [
    [7849, 4868],
    [-25, 33],
    [-24, -1],
    [4, 56],
    [-24, 0],
    [-2, -79],
    [-15, -105],
    [-10, -64],
    [2, -52],
    [18, -2],
    [12, -65],
    [5, -62],
    [15, -42],
    [17, -8],
    [14, -37]
   ],
   [
    [7779, 4457],
    [-11, 28],
    [-4, 35],
    [-15, 41],
    [-14, 34],
    [-4, -42],
    [-5, 40],
    [3, 44],
    [8, 69]
   ],
   [
    [6883, 6660],
    [16, 73],
    [-6, 53],
    [-20, 17],
    [7, 32],
    [23, -3],
    [13, 39],
    [9, 46],
    [37, 17],
    [-6, -33],
    [4, -20],
    [12, 2]
   ],
   [
    [6497, 6664],
    [-5, 51],
    [4, 75],
    [-22, 24],
    [8, 49],
    [-19, 5],
    [6, 60],
    [26, -18],
    [25, 23],
    [-20, 44],
    [-8, 41],
    [-23, -19],
    [-3, -52],
    [-8, 46]
   ],
   [
    [6554, 6959],
    [31, 1],
    [-4, 36],
    [24, 25],
    [23, 42],
    [37, -38],
    [3, -58],
    [11, -14],
    [30, 3],
    [9, -13],
    [14, -74],
    [32, -50],
    [18, -33],
    [29, -36],
    [37, -30],
    [-1, -44]
   ],
   [
    [8471, 3355],
    [3, 16],
    [24, 17],
    [19, 2],
    [9, 9],
    [10, -9],
    [-10, -19],
    [-29, -32],
    [-23, -20]
   ],
   [
    [3286, 4766],
    [16, 9],
    [6, -3],
    [-1, -53],
    [-23, -8],
    [-5, 7],
    [8, 19],
    [-1, 29]
   ],
   [
    [5233, 6646],
    [31, 29],
    [19, -9],
    [-1, -36],
    [24, 26],
    [2, -13],
    [-14, -36],
    [0, -33],
    [9, -18],
    [-3, -62],
    [-19, -36],
    [6, -39],
    [14, -1],
    [7, -34],
    [11, -12]
   ],
   [
    [6004, 6565],
    [-11, 33],
    [11, 27],
    [-17, -6],
    [-23, 16],
    [-19, -41],
    [-43, -8],
    [-22, 38],
    [-30, 3],
    [-6, -30],
    [-20, -9],
    [-26, 39],
    [-31, -2],
    [-16, 72],
    [-21, 40],
    [14, 55],
    [-18, 35],
    [31, 68],
    [43, 3],
    [12, 55],
    [53, -10],
    [33, 47],
    [32, 20],
    [46, 2],
    [49, -51],
    [40, -28],
    [32, 11],
    [24, -6],
    [33, 37]
   ],
   [
    [5777, 7009],
    [3, -27],
    [25, -23],
    [-5, -18],
    [-33, -4],
    [-12, -22],
    [-23, -39],
    [-9, 34],
    [0, 14]
   ],
   [
    [8382, 5745],
    [-17, -115],
    [-12, -59],
    [-14, 60],
    [-4, 53],
    [17, 71],
    [22, 54],
    [13, -21],
    [-5, -43]
   ],
   [
    [6088, 3657],
    [-12, -88],
    [1, -41],
    [18, -26],
    [1, -19],
    [-8, -43],
    [2, -22],
    [-2, -34],
    [10, -45],
    [11, -71],
    [10, -16]
   ],
   [
    [5909, 3330],
    [-15, 22],
    [-18, 12],
    [-11, 12],
    [-12, 18]
   ],
   [
    [5844, 3912],
    [10, 8],
    [31, -1],
    [56, 6]
   ],
   [
    [6061, 7375],
    [-22, -6],
    [-18, -23],
    [-26, -4],
    [-24, -26],
    [1, -45],
    [14, -17],
    [28, 4],
    [-5, -26],
    [-31, -12],
    [-37, -42],
    [-16, 15],
    [6, 34],
    [-30, 21],
    [5, 13],
    [26, 24],
    [-8, 17],
    [-43, 18],
    [-2, 27],
    [-25, -9],
    [-11, -40],
    [-21, -53]
   ],
   [
    [3517, 1568],
    [-12, -45],
    [-31, -40],
    [-21, 15],
    [-15, -8],
    [-26, 31],
    [-18, -2],
    [-17, 39]
   ],
   [
    [679, 5363],
    [-4, -12],
    [-7, 11],
    [1, 20],
    [-4, 26],
    [1, 8],
    [5, 11],
    [-2, 15],
    [1, 6],
    [3, -1],
    [10, -12],
    [5, -6],
    [5, -10],
    [7, -25],
    [-1, -4],
    [-11, -15],
    [-9, -12]
   ],
   [
    [664, 5475],
    [-9, -5],
    [-5, 15],
    [-3, 6],
    [0, 5],
    [3, 6],
    [9, -7],
    [8, -11],
    [-3, -9]
   ],
   [
    [646, 5514],
    [-1, -8],
    [-15, 2],
    [2, 9],
    [14, -3]
   ],
   [
    [621, 5524],
    [-2, -4],
    [-2, 1],
    [-9, 2],
    [-4, 17],
    [-1, 3],
    [7, 9],
    [3, -4],
    [8, -24]
   ],
   [
    [574, 5571],
    [-4, -7],
    [-9, 13],
    [1, 6],
    [5, 7],
    [6, -2],
    [1, -17]
   ],
   [
    [3135, 7234],
    [5, -23],
    [-30, -35],
    [-29, -25],
    [-29, -21],
    [-15, -43],
    [-4, -16],
    [-1, -38],
    [10, -38],
    [11, -2],
    [-3, 26],
    [8, -16],
    [-2, -20],
    [-19, -12],
    [-13, 1],
    [-20, -12],
    [-12, -4],
    [-17, -3],
    [-23, -21],
    [41, 14],
    [8, -14],
    [-39, -22],
    [-17, 0],
    [0, 9],
    [-8, -20],
    [8, -3],
    [-6, -52],
    [-20, -55],
    [-2, 18],
    [-6, 4],
    [-9, 18],
    [5, -39],
    [7, -12],
    [1, -27],
    [-9, -28],
    [-16, -58],
    [-2, 3],
    [8, 49],
    [-14, 27],
    [-3, 60],
    [-5, -31],
    [5, -45],
    [-18, 11],
    [19, -23],
    [1, -69],
    [8, -5],
    [3, -24],
    [4, -72],
    [-17, -54],
    [-29, -21],
    [-18, -42],
    [-14, -5],
    [-14, -26],
    [-4, -24],
    [-31, -47],
    [-16, -34],
    [-13, -42],
    [-4, -51],
    [5, -50],
    [9, -62],
    [13, -51],
    [0, -31],
    [13, -83],
    [-1, -48],
    [-1, -28],
    [-7, -44],
    [-8, -9],
    [-14, 9],
    [-4, 31],
    [-11, 17],
    [-15, 61],
    [-13, 55],
    [-4, 28],
    [6, 48],
    [-8, 40],
    [-22, 60],
    [-10, 11],
    [-28, -33],
    [-5, 4],
    [-14, 33],
    [-17, 18],
    [-32, -9],
    [-24, 8],
    [-21, -5],
    [-12, -11],
    [5, -19],
    [0, -30],
    [5, -14],
    [-5, -9],
    [-10, 10],
    [-11, -13],
    [-20, 2],
    [-20, 38],
    [-25, -9],
    [-20, 17],
    [-17, -5],
    [-24, -17],
    [-25, -53],
    [-27, -31],
    [-16, -35],
    [-6, -32],
    [0, -50],
    [1, -34],
    [5, -24]
   ],
   [
    [1746, 6329],
    [-4, 37],
    [-18, 41],
    [-13, 9],
    [-3, 20],
    [-16, 4],
    [-10, 19],
    [-26, 7],
    [-7, 12],
    [-3, 39],
    [-27, 73],
    [-23, 99],
    [1, 17],
    [-13, 24],
    [-21, 60],
    [-4, 58],
    [-15, 40],
    [6, 59],
    [-1, 62],
    [-8, 55],
    [10, 67],
    [4, 66],
    [3, 65],
    [-5, 96],
    [-9, 61],
    [-8, 34],
    [4, 14],
    [40, -25],
    [15, -67],
    [7, 19],
    [-5, 59],
    [-9, 58]
   ],
   [
    [750, 8094],
    [-28, -27],
    [-14, 18],
    [-4, 34],
    [25, 25],
    [15, 11],
    [18, -4],
    [12, -23],
    [-24, -34]
   ],
   [
    [401, 8295],
    [-18, -11],
    [-18, 13],
    [-17, 20],
    [28, 12],
    [22, -7],
    [3, -27]
   ],
   [
    [230, 8573],
    [17, -14],
    [17, 8],
    [23, -19],
    [27, -10],
    [-2, -8],
    [-21, -15],
    [-21, 16],
    [-11, 13],
    [-24, -5],
    [-7, 7],
    [2, 27]
   ],
   [
    [1374, 7928],
    [-15, 27],
    [-25, 23],
    [-8, 63],
    [-36, 58],
    [-15, 67],
    [-26, 5],
    [-44, 2],
    [-33, 21],
    [-57, 74],
    [-27, 14],
    [-49, 25],
    [-38, -6],
    [-55, 33],
    [-33, 31],
    [-30, -15],
    [5, -50],
    [-15, -5],
    [-32, -15],
    [-25, -24],
    [-30, -15],
    [-4, 42],
    [12, 70],
    [30, 22],
    [-8, 18],
    [-35, -40],
    [-19, -47],
    [-40, -51],
    [20, -35],
    [-26, -52],
    [-30, -30],
    [-28, -22],
    [-7, -32],
    [-43, -37],
    [-9, -33],
    [-32, -31],
    [-20, 5],
    [-25, -20],
    [-29, -24],
    [-23, -24],
    [-47, -21],
    [-5, 12],
    [31, 34],
    [27, 22],
    [29, 39],
    [35, 9],
    [14, 29],
    [38, 43],
    [6, 14],
    [21, 26],
    [5, 54],
    [14, 43],
    [-32, -22],
    [-9, 12],
    [-15, -26],
    [-18, 36],
    [-8, -25],
    [-10, 36],
    [-28, -29],
    [-17, 0],
    [-3, 43],
    [5, 26],
    [-17, 25],
    [-37, -13],
    [-23, 33],
    [-19, 18],
    [0, 40],
    [-22, 31],
    [11, 41],
    [23, 40],
    [10, 37],
    [22, 5],
    [19, -11],
    [23, 35],
    [20, -7],
    [21, 23],
    [-5, 32],
    [-16, 13],
    [21, 28],
    [-17, -1],
    [-30, -15],
    [-8, -16],
    [-22, 16],
    [-39, -8],
    [-41, 17],
    [-12, 29],
    [-35, 41],
    [39, 30],
    [62, 35],
    [23, 0],
    [-4, -35],
    [59, 2],
    [-23, 45],
    [-34, 27],
    [-20, 36],
    [-26, 31],
    [-38, 22],
    [15, 38],
    [49, 2],
    [35, 33],
    [7, 35],
    [28, 34],
    [28, 8],
    [52, 32],
    [26, -5],
    [42, 39],
    [42, -15],
    [21, -33],
    [12, 14],
    [47, -4],
    [-2, -17],
    [43, -12],
    [28, 7],
    [59, -22],
    [53, -7],
    [21, -9],
    [37, 11],
    [42, -21],
    [31, -10]
   ],
   [
    [3018, 4839],
    [-1, -17],
    [-16, -9],
    [9, -32],
    [0, -38],
    [-12, -42],
    [10, -57],
    [12, 5],
    [6, 52],
    [-8, 25],
    [-2, 55],
    [35, 29],
    [-4, 34],
    [10, 22],
    [10, -50],
    [19, -1],
    [18, -40],
    [1, -24],
    [25, -1],
    [30, 8],
    [16, -32],
    [21, -9],
    [16, 22],
    [0, 18],
    [34, 4],
    [34, 1],
    [-24, -21],
    [10, -34],
    [22, -5],
    [21, -35],
    [4, -58],
    [15, 2],
    [11, -17]
   ],
   [
    [8001, 5541],
    [-37, -62],
    [-24, -68],
    [-6, -50],
    [22, -75],
    [25, -94],
    [26, -44],
    [17, -58],
    [12, -133],
    [-3, -126],
    [-24, -48],
    [-31, -46],
    [-23, -60],
    [-35, -66],
    [-10, 46],
    [8, 48],
    [-21, 41]
   ],
   [
    [9661, 2811],
    [-9, -10],
    [-9, 32],
    [1, 19],
    [17, -41]
   ],
   [
    [9641, 2921],
    [4, -58],
    [-7, 9],
    [-6, -4],
    [-4, 20],
    [0, 55],
    [13, -22]
   ],
   [
    [6475, 5189],
    [-21, -20],
    [-5, -32],
    [-1, -24],
    [-27, -30],
    [-45, -34],
    [-24, -50],
    [-13, -4],
    [-8, 4],
    [-16, -30],
    [-18, -14],
    [-23, -4],
    [-7, -4],
    [-6, -19],
    [-8, -5],
    [-4, -18],
    [-14, 2],
    [-9, -10],
    [-19, 3],
    [-7, 42],
    [1, 40],
    [-5, 21],
    [-5, 53],
    [-8, 29],
    [5, 4],
    [-2, 33],
    [3, 14],
    [-1, 31]
   ],
   [
    [5817, 2407],
    [11, -1],
    [14, -12],
    [9, 9],
    [15, -8]
   ],
   [
    [5911, 2073],
    [-7, -52],
    [-3, -60],
    [-7, -32],
    [-19, -37],
    [-5, -10],
    [-12, -37],
    [-8, -36],
    [-16, -52],
    [-31, -74],
    [-20, -43],
    [-21, -33],
    [-29, -28],
    [-14, -3],
    [-3, -20],
    [-17, 10],
    [-14, -13],
    [-30, 14],
    [-17, -9],
    [-12, 4],
    [-28, -29],
    [-24, -11],
    [-17, -27],
    [-13, -2],
    [-11, 26],
    [-10, 1],
    [-12, 32],
    [-1, -10],
    [-4, 19],
    [0, 42],
    [-9, 48],
    [9, 14],
    [0, 55],
    [-19, 67],
    [-14, 61],
    [-20, 93]
   ],
   [
    [5840, 2880],
    [-21, -10],
    [-15, -29],
    [-4, -25],
    [-10, -5],
    [-24, -59],
    [-15, -47],
    [-10, -2],
    [-9, 9],
    [-31, 8]
   ]
  ],
  transform: {
   scale: [.036003600360036005, .013927088708870888],
   translate: [-180, -55.61183]
  }
 };
 data.worldmap.arcs[280] = [
  [4944, 8e3],
  [25, -85],
  [19, -11],
  [17, -82],
  [8, -28],
  [33, -14],
  [-3, -46],
  [-14, -21],
  [11, -37],
  [-25, -38],
  [-37, 1],
  [-48, -20],
  [-13, 14],
  [-18, -33],
  [-26, 8],
  [-19, -28],
  [-15, 15],
  [41, 75],
  [25, 16],
  [-1, 0],
  [-43, 12],
  [-8, 28],
  [29, 22],
  [-15, 39],
  [5, 47],
  [42, -6],
  [4, 41],
  [-19, 45],
  [0, 1],
  [-34, 12],
  [-7, 20]
 ];
 data.worldmap.arcs.push([
  [4916, 8203],
  [-30, -77],
  [29, 9],
  [30, 0],
  [-7, -59],
  [-25, -64],
  [29, -4],
  [2, -8],
  [-86, -53],
  [10, 32],
  [-9, 19],
  [-15, -33],
  [-1, 69],
  [-14, 36],
  [10, 75],
  [21, 58],
  [23, -6],
  [33, 6]
 ]);
 data.matches = [{
  no: 1,
  date: "12/06 17:00",
  venue: "Sao Paulo",
  team1: "A1",
  team2: "A2"
 }, {
  no: 2,
  date: "13/06 13:00",
  venue: "Natal",
  team1: "A3",
  team2: "A4"
 }, {
  no: 3,
  date: "13/06 16:00",
  venue: "Salvador de Bahia",
  team1: "B1",
  team2: "B2"
 }, {
  no: 4,
  date: "13/06 18:00",
  venue: "Cuiaba",
  team1: "B3",
  team2: "B4"
 }, {
  no: 5,
  date: "14/06 13:00",
  venue: "Belo Horizonte",
  team1: "C1",
  team2: "C2"
 }, {
  no: 6,
  date: "14/06 22:00",
  venue: "Recife",
  team1: "C3",
  team2: "C4"
 }, {
  no: 7,
  date: "14/06 16:00",
  venue: "Fortaleza",
  team1: "D1",
  team2: "D2"
 }, {
  no: 8,
  date: "14/06 18:00",
  venue: "Manaus",
  team1: "D3",
  team2: "D4"
 }, {
  no: 9,
  date: "15/06 13:00",
  venue: "Brasilia",
  team1: "E1",
  team2: "E2"
 }, {
  no: 10,
  date: "15/06 16:00",
  venue: "Porto Alegre",
  team1: "E3",
  team2: "E4"
 }, {
  no: 11,
  date: "15/06 19:00",
  venue: "Rio de Janeiro",
  team1: "F1",
  team2: "F2"
 }, {
  no: 12,
  date: "16/06 16:00",
  venue: "Curitiba",
  team1: "F3",
  team2: "F4"
 }, {
  no: 13,
  date: "16/06 13:00",
  venue: "Salvador de Bahia",
  team1: "G1",
  team2: "G2"
 }, {
  no: 14,
  date: "16/06 19:00",
  venue: "Natal",
  team1: "G3",
  team2: "G4"
 }, {
  no: 15,
  date: "17/06 13:00",
  venue: "Belo Horizonte",
  team1: "H1",
  team2: "H2"
 }, {
  no: 16,
  date: "17/06 18:00",
  venue: "Cuiaba",
  team1: "H3",
  team2: "H4"
 }, {
  no: 17,
  date: "17/06 16:00",
  venue: "Fortaleza",
  team1: "A1",
  team2: "A3"
 }, {
  no: 18,
  date: "18/06 18:00",
  venue: "Manaus",
  team1: "A4",
  team2: "A2"
 }, {
  no: 19,
  date: "18/06 16:00",
  venue: "Rio de Janeiro",
  team1: "B1",
  team2: "B3"
 }, {
  no: 20,
  date: "18/06 13:00",
  venue: "Porto Alegre",
  team1: "B4",
  team2: "B2"
 }, {
  no: 21,
  date: "19/06 13:00",
  venue: "Brasilia",
  team1: "C1",
  team2: "C3"
 }, {
  no: 22,
  date: "19/06 19:00",
  venue: "Natal",
  team1: "C4",
  team2: "C2"
 }, {
  no: 23,
  date: "19/06 16:00",
  venue: "Sao Paulo",
  team1: "D1",
  team2: "D3"
 }, {
  no: 24,
  date: "20/06 13:00",
  venue: "Recife",
  team1: "D4",
  team2: "D2"
 }, {
  no: 25,
  date: "20/06 16:00",
  venue: "Salvador de Bahia",
  team1: "E1",
  team2: "E3"
 }, {
  no: 26,
  date: "20/06 19:00",
  venue: "Curitiba",
  team1: "E4",
  team2: "E2"
 }, {
  no: 27,
  date: "21/06 13:00",
  venue: "Belo Horizonte",
  team1: "F1",
  team2: "F3"
 }, {
  no: 28,
  date: "21/06 18:00",
  venue: "Cuiaba",
  team1: "F4",
  team2: "F2"
 }, {
  no: 29,
  date: "21/06 16:00",
  venue: "Fortaleza",
  team1: "G1",
  team2: "G3"
 }, {
  no: 30,
  date: "22/06 18:00",
  venue: "Manaus",
  team1: "G4",
  team2: "G2"
 }, {
  no: 31,
  date: "22/06 13:00",
  venue: "Rio de Janeiro",
  team1: "H1",
  team2: "H3"
 }, {
  no: 32,
  date: "22/06 16:00",
  venue: "Porto Alegre",
  team1: "H4",
  team2: "H2"
 }, {
  no: 33,
  date: "23/06 17:00",
  venue: "Brasilia",
  team1: "A4",
  team2: "A1"
 }, {
  no: 34,
  date: "23/06 17:00",
  venue: "Recife",
  team1: "A2",
  team2: "A3"
 }, {
  no: 35,
  date: "23/06 13:00",
  venue: "Curitiba",
  team1: "B4",
  team2: "B1"
 }, {
  no: 36,
  date: "23/06 13:00",
  venue: "Sao Paulo",
  team1: "B2",
  team2: "B3"
 }, {
  no: 37,
  date: "24/06 16:00",
  venue: "Cuiaba",
  team1: "C4",
  team2: "C1"
 }, {
  no: 38,
  date: "24/06 17:00",
  venue: "Fortaleza",
  team1: "C2",
  team2: "C3"
 }, {
  no: 39,
  date: "24/06 13:00",
  venue: "Natal",
  team1: "D4",
  team2: "D1"
 }, {
  no: 40,
  date: "24/06 13:00",
  venue: "Belo Horizonte",
  team1: "D2",
  team2: "D3"
 }, {
  no: 41,
  date: "25/06 16:00",
  venue: "Manaus",
  team1: "E4",
  team2: "E1"
 }, {
  no: 42,
  date: "25/06 17:00",
  venue: "Rio de Janeiro",
  team1: "E2",
  team2: "E3"
 }, {
  no: 43,
  date: "25/06 13:00",
  venue: "Porto Alegre",
  team1: "F4",
  team2: "F1"
 }, {
  no: 44,
  date: "25/06 13:00",
  venue: "Salvador de Bahia",
  team1: "F2",
  team2: "F3"
 }, {
  no: 45,
  date: "26/06 13:00",
  venue: "Recife",
  team1: "G4",
  team2: "G1"
 }, {
  no: 46,
  date: "26/06 13:00",
  venue: "Brasilia",
  team1: "G2",
  team2: "G3"
 }, {
  no: 47,
  date: "26/06 17:00",
  venue: "Sao Paulo",
  team1: "H4",
  team2: "H1"
 }, {
  no: 48,
  date: "26/06 17:00",
  venue: "Curitiba",
  team1: "H2",
  team2: "H3"
 }, {
  no: 49,
  date: "28/06 13:00",
  venue: "Belo Horizonte",
  team1: "1A",
  team2: "2B"
 }, {
  no: 50,
  date: "28/06 17:00",
  venue: "Rio de Janeiro",
  team1: "1C",
  team2: "2D"
 }, {
  no: 51,
  date: "29/06 13:00",
  venue: "Fortaleza",
  team1: "1B",
  team2: "2A"
 }, {
  no: 52,
  date: "29/06 17:00",
  venue: "Recife",
  team1: "1D",
  team2: "2C"
 }, {
  no: 53,
  date: "30/06 13:00",
  venue: "Brasilia",
  team1: "1E",
  team2: "2F"
 }, {
  no: 54,
  date: "30/06 17:00",
  venue: "Porto Alegre",
  team1: "1G",
  team2: "2H"
 }, {
  no: 55,
  date: "01/07 13:00",
  venue: "Sao Paulo",
  team1: "1F",
  team2: "2E"
 }, {
  no: 56,
  date: "01/07 17:00",
  venue: "Salvador de Bahia",
  team1: "1H",
  team2: "2G"
 }, {
  no: 57,
  date: "04/07 17:00",
  venue: "Fortaleza",
  team1: "W49",
  team2: "W50"
 }, {
  no: 58,
  date: "04/07 13:00",
  venue: "Rio de Janeiro",
  team1: "W53",
  team2: "W54"
 }, {
  no: 59,
  date: "05/07 17:00",
  venue: "Salvador de Bahia",
  team1: "W51",
  team2: "W52"
 }, {
  no: 60,
  date: "05/07 13:00",
  venue: "Brasilia",
  team1: "W55",
  team2: "W56"
 }, {
  no: 61,
  date: "08/07 17:00",
  venue: "Belo Horizonte",
  team1: "W57",
  team2: "W58"
 }, {
  no: 62,
  date: "09/07 17:00",
  venue: "Sao Paulo",
  team1: "W59",
  team2: "W60"
 }, {
  no: 63,
  date: "12/07 17:00",
  venue: "Brasilia",
  team1: "L61",
  team2: "L62"
 }, {
  no: 64,
  date: "13/07 16:00",
  venue: "Rio de Janeiro",
  team1: "W61",
  team2: "W62"
 }];
 data.stadiums = [{
  city: "Belo Horizonte",
  lat: -19.92,
  lon: -43.93,
  name: "name",
  label: "Belo Horizonte",
  sublabel: "MineirÃ£o"
 }, {
  city: "Brasilia",
  lat: -15.77,
  lon: -47.92,
  name: "name",
  label: "BrasÃ­lia",
  sublabel: "EstÃ¡dio Nacional de BrasÃ­lia"
 }, {
  city: "Salvador de Bahia",
  lat: -12.97,
  lon: -38.51,
  name: "name",
  label: "Salvador da Bahia",
  sublabel: "Arena Fonte Nova"
 }, {
  city: "Rio de Janeiro",
  lat: -22.9,
  lon: -43.207,
  name: "name",
  label: "Rio de Janeiro",
  sublabel: "MaracanÃ£"
 }, {
  city: "Sao Paulo",
  lat: -23.547,
  lon: -46.63,
  name: "name",
  label: "SÃ£o Paulo",
  sublabel: "Arena Corinthians"
 }, {
  city: "Cuiaba",
  lat: -15.596,
  lon: -56.096,
  name: "name",
  label: "CuiabÃ¡",
  sublabel: "Arena Pantanal"
 }, {
  city: "Curitiba",
  lat: -25.427,
  lon: -49.27,
  name: "name",
  label: "Curitiba",
  sublabel: "Arena da Baixada"
 }, {
  city: "Fortaleza",
  lat: -3.71,
  lon: -38.54,
  name: "name",
  label: "Fortaleza",
  sublabel: "CastelÃ£o"
 }, {
  city: "Manaus",
  lat: -3.1,
  lon: -60.025,
  name: "name",
  label: "Manaus",
  sublabel: "Arena da AmazÃ´nia"
 }, {
  city: "Natal",
  lat: -5.79,
  lon: -35.2,
  name: "name",
  label: "Natal",
  sublabel: "Arena das Dunas"
 }, {
  city: "Porto Alegre",
  lat: -30.033,
  lon: -51.23,
  name: "name",
  label: "Porto Alegre",
  sublabel: "EstÃ¡dio Beira-Rio"
 }, {
  city: "Recife",
  lat: -8.053,
  lon: -34.881,
  name: "name",
  label: "Recife",
  sublabel: "Arena Pernambuco"
 }];
 data.teams = [{
  name: "Australia",
  label: "Australien",
  code: 36
 }, {
  name: "Iran",
  label: "Iran",
  code: 364
 }, {
  name: "Japan",
  label: "Japan",
  code: 392
 }, {
  name: "South Korea",
  label: "Korea",
  code: 410
 }, {
  name: "Italy",
  label: "Italien",
  code: 380
 }, {
  name: "Netherlands",
  label: "Niederlande",
  code: 528
 }, {
  name: "Costa Rica",
  label: "Costa Rica",
  code: 188
 }, {
  name: "USA",
  label: "USA",
  code: 840
 }, {
  name: "Argentina",
  label: "Argentinien",
  code: 32
 }, {
  name: "Brazil",
  label: "Brasilien",
  code: 76
 }, {
  name: "Ivory Coast",
  label: "ElfenbeinkÃ¼ste",
  code: 384
 }, {
  name: "Nigeria",
  label: "Nigeria",
  code: 566
 }, {
  name: "Ghana",
  label: "Ghana",
  code: 288
 }, {
  name: "Algeria",
  label: "Algerien",
  code: 12
 }, {
  name: "Honduras",
  label: "Honduras",
  code: 340
 }, {
  name: "Colombia",
  date: "2010/10/11",
  label: "Kolumbien",
  code: 170
 }, {
  name: "Chile",
  label: "Chile",
  code: 152
 }, {
  name: "Ecuador",
  label: "Ecuador",
  code: 218
 }, {
  name: "Uruguay",
  label: "Uruguay",
  code: 858
 }, {
  name: "Germany",
  label: "Deutschland",
  code: 276
 }, {
  name: "Switzerland",
  label: "Schweiz",
  code: 756
 }, {
  name: "Russia",
  label: "Russland",
  code: 643
 }, {
  name: "Bosnia and Herzegovina",
  label: "Bosnien",
  code: 70
 }, {
  name: "Greece",
  label: "Griechenland",
  code: 300
 }, {
  name: "England",
  label: "England",
  code: 826
 }, {
  name: "Spain",
  label: "Spanien",
  code: 724
 }, {
  name: "France",
  label: "Frankreich",
  code: 250
 }, {
  name: "Cameroon",
  label: "Kamerun",
  code: 120
 }, {
  name: "Mexico",
  label: "Mexiko",
  code: 484
 }, {
  name: "Portugal",
  label: "Portugal",
  code: 620
 }, {
  name: "Belgium",
  label: "Belgien",
  code: 56
 }, {
  name: "Croatia",
  label: "Kroatien",
  code: 191
 }]
})(window, document);
(function(global) {
 "use strict";
 var A_CODE = "A".charCodeAt(0);

 function generateMatches(teamdata, matchdata, groupdata, matchresults, ugroups, isUpdate) {
  var isEng = LANG == "en";
  var teams = [];
  for (var i = 0; i < teamdata.length; i++) {
   teamdata[i].games = 0;
   teamdata[i].wins = 0;
   teamdata[i].ties = 0;
   teamdata[i].losses = 0;
   teamdata[i].points = 0;
   teamdata[i].goals = 0;
   teamdata[i].goalsFor = 0;
   teamdata[i].goalsAgainst = 0;
   teamdata[i].gameIds = [];
   if (isEng) {
    var l = teamdata[i].name,
     ix = l.indexOf(" and ");
    if (ix > 0) l = l.substring(0, ix) + "-Herz.";
    teamdata[i].label = l
   }
   teams.push(teamdata[i])
  }
  if (!isUpdate) {
   for (var i = 0, n = 8; i < n; i++) {
    var gd = groupdata[i],
     ts = gd.teams;
    gd.label = LABELS.group + " " + gd.label;
    for (var j = 0, m = ts.length; j < m; j++) {
     ts[j] = getTeamByName(ts[j])
    }
    gd.oteams = ts.concat()
   }
  }
  for (var i = 0; i < matchdata.length; i++) {
   var m = matchdata[i];
   m.team1data = null;
   m.team2data = null;
   m.winner = null;
   m.looser = null;
   m.result = null;
   if (i == 48) {
    var doSet = matchresults.length >= 48;
    for (var gi = 0; gi < 8; gi++) {
     var teams = groupdata[gi].teams;
     teams.sort(function(t1, t2) {
      return t2.points - t1.points || t2.goals - t1.goals || t2.goalsFor - t1.goalsFor
     });
     if (doSet || teams[0].games > 2 && teams[1].games > 2 && teams[2].games > 2 && teams[3].games > 2) {
      teams[2].out = 1;
      teams[3].out = 1
     } else if (teams[2].games > 1 && teams[3].games > 1) {
      if (teams[1].points - teams[2].points > 3) {
       teams[2].out = 1;
       teams[3].out = 1
      } else if (teams[1].points - teams[3].points > 3) {
       teams[3].out = 1
      }
     }
    }
   }
   playMatch(m, matchresults[i])
  }

  function playMatch(match, matchresult) {
   var mNo = parseInt(match.no, 10);
   var team1 = match.team1data,
    team2 = match.team2data;
   if (!team1 || !team1.gameIds) team1 = match.team1data = getTeamFromMatch(match, "team1");
   if (!team2 || !team2.gameIds) team2 = match.team2data = getTeamFromMatch(match, "team2");
   var score1 = matchresult ? +matchresult[0] : "-",
    score2 = matchresult ? +matchresult[1] : "-",
    remark = matchresult && matchresult[2];
   var opps = team1.name + " vs. " + team2.name,
    result = score1 + ":" + score2;
   if (remark) result = result += " " + remark;
   if (matchresult) {
    team1.gameIds.push(mNo);
    team2.gameIds.push(mNo);
    if (mNo <= 48) {
     team1.games++;
     team2.games++;
     team1.goalsFor += score1;
     team1.goalsAgainst += score2;
     team1.goals += score1 - score2;
     team2.goalsFor += score2;
     team2.goalsAgainst += score1;
     team2.goals += score2 - score1;
     if (score1 === score2) {
      team1.ties++;
      team1.points++;
      team2.ties++;
      team2.points++
     } else if (score1 > score2) {
      team1.wins++;
      team1.points += 3;
      team2.losses++
     } else {
      team2.wins++;
      team2.points += 3;
      team1.losses++
     }
    } else {
     if (score1 === score2) {} else if (score1 > score2) {
      match.winner = team1.name;
      match.loser = team2.name;
      team2.out = mNo
     } else {
      match.winner = team2.name;
      match.loser = team1.name;
      team1.out = mNo
     }
    }
   }
   match.result = result
  }

  function getTeamFromMatch(match, team) {
   var mNo = parseInt(match.no, 10);
   if (mNo <= 48) {
    var t = match[team];
    var group = t[0].charCodeAt(0) - A_CODE;
    if (!match.type) {
     match.type = "" + t[0];
     match.group = group
    }
    var no = parseInt(t[1], 10) - 1;
    return groupdata[group].oteams[no]
   } else if (mNo <= 56) {
    var t = match[team];
    var group = t.charCodeAt(1) - A_CODE;
    if (!match.type) {
     match.type = LABELS.last_sixteen;
     match.group = 8
    }
    var no = +t[0] - 1;
    var gd = groupdata[group];
    var tt = gd.teams[no];
    return tt.games ? tt : {
     name: "unknown",
     label: gd.label + " - " + LABELS.places[no]
    }
   } else {
    if (!match.type) {
     var g;
     match.type = mNo <= 60 ? (g = 9, LABELS.quarter_finals) : (g = 10, LABELS.semi_finals);
     if (mNo == 63) g = 11, match.type = LABELS.third_place;
     else if (mNo == 64) g = 12, match.type = LABELS.finals;
     match.group = g
    }
    var t = match[team];
    var no = parseInt(t.substr(1, 2));
    if (t[0] === "W") {
     return getTeamByName(getMatchByNumber(no).winner, LABELS.winner, no)
    } else {
     return getTeamByName(getMatchByNumber(no).loser, LABELS.looser, no)
    }
   }
  }

  function getMatchByNumber(no) {
   for (var i = 0; i < matchdata.length; i++) {
    if (matchdata[i].no === no) {
     return matchdata[i]
    }
   }
   return null
  }

  function getTeamByName(name, alt1, alt2) {
   for (var i = 0; i < teamdata.length; i++) {
    if (name === teamdata[i].name) return teamdata[i]
   }
   return {
    name: "unknown",
    label: alt1 + " " + alt2
   }
  }
 }

 function syncTips() {
  return false
 }

 function setTipInput(matchdata, match, first, second, cb) {
  var m = matchdata[match - 1],
   tip = [match, first, second];
  server.task("syncSingleTip", tip, function(result) {
   if (result.error) {
    if (console && console.error) console.error(result)
   } else {
    m.tipResult = tip;
    cb && cb(match, m, result)
   }
  })
 }

 function syncSettingData(group, id, data, cb) {
  server.task("syncSetting", [id, group && group[0], data], function(result) {
   if (result.error) {
    cb && cb(result.error)
   } else {
    cb && cb(0, id, data, result)
   }
  })
 }
 global.syncSettingData = syncSettingData;
 global.setTipInput = setTipInput;
 global.syncTips = syncTips;
 global.generateMatches = generateMatches
})(this);
(function(global) {
 "use strict";
 var ISO2TEAM = {},
  PHASE_DATES = [],
  MATCH2DATE = [],
  PHASE_DATE_INDEX = [
   [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
   [15, 16, 17, 18],
   [19, 20],
   [21, 22],
   [23],
   [24]
  ]; {
  for (var i = 0; i < PHASE_DATE_INDEX.length; i++) {
   var dd = PHASE_DATE_INDEX[i],
    rr = {};
   for (var j = 0; j < dd.length; j++) {
    rr[dd[j]] = 1
   }
   PHASE_DATES.push(rr)
  }
 }
 global.PHASE_DATES = PHASE_DATES;
 global.MATCH2DATE = MATCH2DATE;
 global.ISO2TEAM = ISO2TEAM;
 global.PHASE_COUNT = [48, 8, 4, 2, 1, 1];
 global.DEFAULT_PLAYER = [{
  span: 3
 }, {
  label: "Kein Spiel"
 }, {
  span: 3
 }];

 function Model(id, parent) {
  this.listeners = [];
  this.id = id;
  this.parent = parent;
  parent.addListener(this)
 }
 var proto = Model.prototype;
 proto.getActive = function() {
  return this.parent.getActive(this.id)
 };
 proto.getData = function() {
  return this.parent.getData(this.id)
 };
 proto.addListener = function(listener) {
  this.listeners.push(listener)
 };
 proto.changeSelection = function(data, index) {
  this.parent.changeSelection(this.id, data, index)
 };
 proto.modelChanged = function(wasDataUpdate, id) {
  if (!id || id == this.id) {
   this.listeners.forEach(function(listener) {
    listener.modelChanged(wasDataUpdate, id)
   })
  }
 };
 proto.getSelectionCriteria = function() {
  return this.parent.getSelectionCriteria(this.id)
 };
 proto.getGames = function() {
  return this.parent.getGames(this.id)
 };
 proto.getInfo = function() {
  return this.parent.getInfo(this.id)
 };
 global.Model = Model;

 function convertDateArr(l) {
  var res = l[0];
  if (!res) return res;
  if (res.length == 2) res = "0" + res.substring(0, 1);
  else res = res.substring(0, 2);
  res += "/";
  if (l[1] == "Jun") res += "06 ";
  else res += "07 ";
  return res
 }

 function getMatches(model, att, val) {
  var result = [],
   mats = model.matches,
   a = model.active["match"] = {};
  for (var i = 0, len = mats.length; i < len; i++) {
   var m = mats[i],
    matt = m[att];
   if (matt === val || matt.indexOf && matt.indexOf(val) == 0) {
    result.push(m);
    a[i] = 1
   }
  }
  return result
 }

 function getPhaseMatches(model, idx, upto) {
  var result = [],
   mats = model.matches,
   a = model.active["match"] = {},
   dates = PHASE_DATE_INDEX[idx],
   start = dates[0],
   end = dates[dates.length - 1];
  for (var i = 0, len = mats.length; i < len; i++) {
   var m = mats[i],
    md = MATCH2DATE[+m.no - 1];
   if (md >= start && md <= end) {
    result.push(m);
    a[i] = 1
   }
  }
  if (upto && idx > 0) result = result.concat(getPhaseMatches(model, idx - 1, 1));
  return result
 }

 function getTeamMatches(model, val) {
  var result = [],
   mats = model.matches,
   a = model.active["match"] = {};
  for (var i = 0, len = mats.length; i < len; i++) {
   var m = mats[i];
   if (m.team1data.name === val.name || m.team2data.name === val.name) {
    result.push(m);
    a[i] = 1
   }
  }
  return result
 }

 function getLocations(locs, matches) {
  var result = {};
  for (var i = 0, len = locs.length; i < len; i++) {
   var loc = locs[i].city;
   for (var j = 0, ll = matches.length; j < ll; j++) {
    if (loc === matches[j].venue) result[i] = 2
   }
  }
  return result
 }

 function getTeams(teams, matches) {
  var result = {};
  for (var i = 0, len = teams.length; i < len; i++) {
   var nm = teams[i].name;
   for (var j = 0, ll = matches.length; j < ll; j++) {
    if (nm === matches[j].team1data.name || nm === matches[j].team2data.name) result[i] = 2
   }
  }
  return result
 }

 function getDates(dates, matches) {
  var result = {};
  for (var i = 0, len = dates.length; i < len; i++) {
   var dat = convertDateArr(dates[i].labels);
   for (var j = 0, ll = matches.length; j < ll; j++) {
    if (matches[j].date.indexOf(dat) == 0) result[i] = 2
   }
  }
  return result
 }

 function getGroups(groups, matches) {
  var result = {};
  for (var j = 0, ll = matches.length; j < ll; j++) {
   result[matches[j].group] = 2
  }
  return result
 }

 function ParentModel(stadiums, teamdata, datedata, groupdata, matches, phaseData, now) {
  this.data = {
   location: stadiums,
   team: teamdata,
   date: datedata,
   group: groupdata,
   match: matches,
   phase: phaseData,
   player: DEFAULT_PLAYER
  };
  this.matches = matches;
  this.active = {};
  this.listeners = [];
  this.activeId = "none";
  this.startDate = now;
  var ld = null,
   idx = -1,
   m;
  for (var i = 0, l = matches.length; i < l; i++) {
   if ((m = matches[i].date.substring(0, 5)) != ld) {
    ld = m;
    idx++
   }
   MATCH2DATE[i] = idx
  }
  for (var i = 0, l = teamdata.length; i < l; i++) {
   var t = teamdata[i];
   ISO2TEAM[t.code] = t
  }
 }
 var proto = ParentModel.prototype;
 proto.addListener = function(listener) {
  this.listeners.push(listener)
 };
 proto.getData = function(id) {
  return this.data[id]
 };
 proto.getActive = function(id) {
  return this.active[id]
 };
 proto.setData = function(id, data) {
  this.data[id] = data;
  this.modelChanged(true, id)
 };
 proto.reset = function() {
  var THIS = this;
  var a = THIS.active,
   rr = false;
  a["location"] = rr;
  a["team"] = rr;
  a["date"] = rr;
  a["group"] = rr;
  a["matches"] = rr;
  a["phase"] = rr;
  a["player"] = rr;
  THIS.modelChanged()
 };
 proto.changeSelection = function(id, data, index) {
  var THIS = this;
  var a = THIS.active,
   matches = null,
   dd = THIS.data;
  var l = dd.location,
   g = dd.group,
   d = dd.date,
   t = dd.team,
   rr = {},
   sc, mm = {};
  rr[index] = 1;
  if (THIS.isGameModus) {
   var selIdx = THIS.gameIndex,
    empty = {};
   var me = {};
   me[dd["player"].myIndex] = 1;
   if (selIdx == 0) {
    var pdx = {},
     ddx = {};
    a["player"] = me;
    a["date"] = ddx;
    ddx[CURRENT_DATE_IDX == -1 ? 0 : CURRENT_DATE_IDX] = 1;
    a["phase"] = pdx;
    pdx[dd.player && dd.player.currentPhase || 0] = 1
   } else if (selIdx == 4) {
    a["player"] = id == "player" ? rr : empty;
    a["date"] = empty;
    a["phase"] = empty
   } else {
    switch (id) {
     case "player":
      sc = data && data.label;
      a["player"] = rr;
      if (selIdx == 1) {
       var d = {},
        ddd, p = {},
        pi = 0;
       for (var j = 0; j < PHASE_DATE_INDEX.length; j++) {
        p[j] = 1;
        ddd = PHASE_DATE_INDEX[j];
        for (var i = 0, l = ddd.length; i < l; i++) d[i] = 1;
        pi = j;
        if (ddd[ddd.length - 1] > (CURRENT_DATE_IDX || 24)) break
       }
       a["date"] = d;
       a["phase"] = p;
       a["matches"] = getPhaseMatches(THIS, pi, 1)
      } else {
       a["date"] = empty;
       a["phase"] = empty;
       a["matches"] = empty
      }
      break;
     case "date":
      if (!data) return;
      matches = selIdx != 2 ? getMatches(THIS, "date", convertDateArr(data.labels)) : null;
      var theDate = convertDateArr(data.labels);
      sc = data.labels.join(" ");
      a["player"] = me;
      a["date"] = rr;
      a["phase"] = empty;
      a["matches"] = empty;
      break;
     case "phase":
      matches = selIdx != 2 ? getPhaseMatches(THIS, index) : null;
      sc = data && data.label;
      a["player"] = me;
      a["date"] = PHASE_DATES[index];
      a["phase"] = rr;
      a["matches"] = empty;
      break
    }
    if (selIdx == 3) {
     if (id != "player") {
      var ms1 = 0,
       me1, ms2 = 0,
       me2, isDate = false,
       ratings = THIS.ratings,
       playerData = dd.player,
       playerSel = {};
      if (!playerData) return;
      a["player"] = playerSel;
      if (id == "date") {
       isDate = true
      } else if (id == "phase") {
       for (var i = 0; i < index - 1; i++) ms1 += PHASE_COUNT[i];
       me1 = ms2 = ms1 + (index == 0 ? 0 : PHASE_COUNT[index - 1]);
       me2 = ms2 + PHASE_COUNT[index]
      }
      for (var ip = 0, l = playerData.length; ip < l; ip++) {
       var p = playerData[ip],
        tot = 0,
        prv = 0,
        len, lst = 0;
       if (!p || !p.label || !p.tips) continue;
       len = p.tips.length;
       for (var ii = 0; ii < len; ii++) {
        var tp = p.tips[ii],
         t = tp[3],
         mn = tp[0] - 1,
         t0, t1;
        if (isDate) {
         t0 = MATCH2DATE[mn] == index - 1 ? ratings[t] : 0;
         t1 = MATCH2DATE[mn] == index ? ratings[t] : 0
        } else {
         t0 = mn >= ms1 && mn < me1 ? lst = ratings[t] : 0;
         t1 = mn >= ms2 && mn < me2 ? lst = ratings[t] : 0
        }
        prv += t0;
        tot += t1
       }
       p.xv = tot;
       p.xu = prv
      }
      playerData = playerData.concat();
      playerData.sort(function(a, b) {
       if (a.span) return 1;
       if (b.span) return -1;
       return b.xv - a.xv
      });
      var pos = -1,
       lst = -1;
      for (var i = 0, l = playerData.length; i < l; i++) {
       var pd = playerData[i],
        p = pd.xv;
       if (p != lst) pos++;
       lst = p;
       pd.xp = pos;
       if (pos == 0) {
        playerSel[pd.theIndex] = 1
       }
      }
      playerData.sort(function(a, b) {
       if (a.span) return 1;
       if (b.span) return -1;
       return b.xu - a.xu
      });
      pos = -1, lst = -1;
      for (var i = 0, l = playerData.length; i < l; i++) {
       var pd = playerData[i],
        p = pd.xu;
       if (p != lst) pos++;
       lst = p;
       pd.xo = pos
      }
      THIS.sortedPlayers = playerData
     }
    }
    if (matches) {
     matches.forEach(function(d, i) {
      mm[d.no - 1] = 1
     });
     a["matches"] = mm
    }
   }
  } else {
   if (!data && id != "group") return;
   switch (id) {
    case "location":
     sc = data.city;
     matches = getMatches(THIS, "venue", data.city);
     a["location"] = rr;
     a["team"] = getTeams(t, matches);
     a["date"] = getDates(d, matches);
     a["group"] = getGroups(g, matches);
     break;
    case "team":
     sc = data.label;
     matches = getTeamMatches(THIS, data);
     a["location"] = getLocations(l, matches);
     a["team"] = rr;
     a["date"] = getDates(d, matches);
     a["group"] = getGroups(g, matches);
     break;
    case "date":
     sc = data.labels.join(" ");
     matches = getMatches(THIS, "date", convertDateArr(data.labels));
     a["location"] = getLocations(l, matches);
     a["team"] = getTeams(t, matches);
     a["date"] = rr;
     a["group"] = getGroups(g, matches);
     break;
    case "group":
     sc = THIS.data["group"][index].label;
     matches = getMatches(THIS, "group", index);
     a["location"] = getLocations(l, matches);
     a["team"] = getTeams(t, matches);
     a["date"] = getDates(d, matches);
     a["group"] = rr;
     break;
    case "match":
     sc = data;
     matches = [THIS.matches[index]];
     a["location"] = getLocations(l, matches);
     a["team"] = getTeams(t, matches);
     a["date"] = getDates(d, matches);
     a["group"] = getGroups(g, matches)
   }
   matches.forEach(function(d, i) {
    mm[d.no - 1] = 1
   });
   a["matches"] = mm
  }
  THIS.selectionCriteria = sc;
  THIS.selectionSource = id;
  THIS.modelChanged()
 };
 proto.modelChanged = function(wasDataUpdate, id) {
  this.listeners.forEach(function(listener) {
   listener.modelChanged(wasDataUpdate, id)
  })
 };
 proto.getSelectionCriteria = function(id) {
  return this.selectionCriteria
 };
 proto.getCurrentGames = function() {
  var m = this.active.matches,
   r = [],
   dd = this.matches,
   idx;
  if (!m) return [];
  for (idx in m) {
   if (m[idx]) {
    r.push(dd[+idx])
   }
  }
  r.sort(function(a, b) {
   var da = a.date,
    db = b.date;
   if (da.substring(0, 6) == db.substring(0, 6)) return +da.substring(6, 8) - +db.substring(6, 8);
   return a.no - b.no
  });
  return r
 };
 proto.getGames = function() {
  var r = [],
   gms = this.getCurrentGames(),
   o, idx = 0,
   l = gms.length;
  for (l = gms.length; idx < l; idx++) {
   o = gms[idx];
   r.push({
    team1: o.team1data.label,
    team2: o.team2data.label,
    date: o.date,
    venue: o.venue,
    result: o.result,
    type: o.type,
    team1n: o.team1data.name,
    team2n: o.team2data.name,
    no: o.no,
    tip: o.tipResult
   })
  }
  return r
 };
 proto.getAllGames = function() {
  var r = [],
   i, l, o, dd = this.matches;
  for (i = 0, l = dd.length; i < l; i++) {
   o = dd[i];
   r.push({
    team1: o.team1data.label,
    team2: o.team2data.label,
    date: o.date,
    venue: o.venue,
    result: o.result,
    type: o.type,
    team1n: o.team1data.name,
    team2n: o.team2data.name,
    no: o.no,
    tip: o.tipResult
   })
  }
  return r
 };
 proto.getGamesTableData = function() {
  var r = [],
   idx = 0,
   gms = this.getCurrentGames(),
   l = gms.length,
   dd = this.matches,
   dat = this.data,
   tms = dat["team"],
   lcs = dat["location"],
   gps = dat["group"],
   dts = dat["date"],
   oo;
  for (l = gms.length; idx < l; idx++) {
   oo = gms[idx];
   var data = {},
    j = 2;
   for (var i = 0, len = tms.length; i < len; i++) {
    var nm = tms[i].name;
    if (nm === oo.team1data.name) {
     data.team1 = i;
     j--
    } else if (nm === oo.team2data.name) {
     data.team2 = i;
     j--
    }
    if (!j) break
   }
   for (var i = 0, len = lcs.length; i < len; i++) {
    var nm = lcs[i].city;
    if (nm === oo.venue) {
     data.venue = i;
     break
    }
   }
   for (var i = 0, len = gps.length; i < len; i++) {
    var nm = gps[i].label;
    if (nm.indexOf("Gruppe ") == 0) nm = nm.substring(7);
    if (nm === oo.type) {
     data.type = i;
     break
    }
   }
   for (var i = 0, len = dts.length; i < len; i++) {
    var nm = convertDateArr(dts[i].labels);
    if (oo.date.indexOf(nm) === 0) {
     data.date = i;
     break
    }
   }
   r.push(data)
  }
  return r
 };
 proto.getInfo = function(id) {
  var dd = this.data[id],
   ll = this.active[id];
  for (var i in ll) {
   return dd[i]
  }
  return null
 };
 proto.setRangeOffset = function(ro) {
  this.rangeOffset = ro;
  if (this.rangeListener) this.rangeListener()
 };
 proto.getLocationModel = function() {
  return new Model("location", this)
 };
 proto.getTeamModel = function() {
  return new Model("team", this)
 };
 proto.getDateModel = function() {
  return new Model("date", this)
 };
 proto.getGroupModel = function() {
  return new Model("group", this)
 };
 proto.getMatchModel = function() {
  return new Model("match", this)
 };
 proto.getPhaseModel = function() {
  return new Model("phase", this)
 };
 proto.getPlayerModel = function() {
  return new Model("player", this)
 };
 global.ParentModel = ParentModel
})(this);
(function(w) {
 var ua = navigator.userAgent,
  iphone = ~ua.indexOf("iPhone") || ~ua.indexOf("iPod"),
  ipad = ~ua.indexOf("iPad"),
  ios = iphone || ipad,
  fullscreen = window.navigator.standalone,
  android = ~ua.indexOf("Android"),
  aintern = ua.indexOf("Chrome") < 0;
 if (aintern) {
  var idx = ua.indexOf("AppleWebKit/"),
   val;
  if (idx != -1) {
   val = +ua.substring(idx + 12, Math.min(idx + 18, ua.length));
   if (!isNaN(val)) aintern = idx < 534.5
  }
 }
 w.IS_TOUCH = "ontouchstart" in document.documentElement;
 w.CLICK_EVENT = IS_TOUCH && ios ? "touchstart" : "click";
 w.BLANK = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
 w.SMALL_DEVICE = window.screen.availWidth < 600 || window.screen.availHeight < 500;
 w.IS_IOS = ios;
 w.IS_IE9 = navigator.appVersion.indexOf("MSIE 9") != -1;
 var styles = window.getComputedStyle(document.documentElement, ""),
  pre = ([].slice.call(styles).join("").match(/-(moz|webkit|ms)-/) || styles.OLink === "" && ["", "o"])[1],
  dom = "WebKit|Moz|MS|O".match(new RegExp("(" + pre + ")", "i"))[1];
 document.body.className = (ios ? "ios" : android ? "android" + (aintern ? " ainternal" : "") : "desktop") + " br" + dom;
 w.VENDOR_PREFIX = {
  dom: dom,
  lowercase: pre,
  css: "-" + pre + "-",
  js: pre[0].toUpperCase() + pre.substr(1)
 };
 d3.selectAll("ul.cornersubmenuinner").forEach(function(el) {
  var ul = el[0],
   eli = 0,
   fac = w.IS_TOUCH || w.SMALL_DEVICE ? 120 : 100;
  while (ul) {
   var prt = ul.parentNode,
    lis = ul.childNodes,
    lisl = 0,
    step = 0,
    pi = Math.PI,
    rot = 0,
    radius = 170,
    offset = 50,
    idx = 0,
    c;
   while (prt && (c = prt.className).indexOf("cornermenu") == -1) prt = prt.parentNode;
   var isLeft = c.indexOf("left") != -1,
    isTop = c.indexOf("top") != -1;
   if (isLeft) {
    rot = isTop ? -.15 : -pi / 2 - .25
   } else {
    rot = isTop ? pi / 2 + .25 : -pi + .15
   }
   for (var i = 0; i < lis.length; i++) {
    if (lis[i].tagName) lisl++
   }
   step = pi / (lisl + 1.5);
   for (var i = 0; i < lis.length; i++) {
    var li = lis[i];
    if (li.tagName) {
     var sty = li.style,
      x = Math.cos(idx * step + rot) * radius + offset,
      y = Math.sin(idx * step + rot) * radius + offset,
      span = li.firstChild;
     sty.left = Math.round(x * fac) / 100 + "%";
     sty.top = Math.round(y * fac) / 100 + "%";
     if (!span.tagName) span = span.nextSibling;
     span = span.firstChild;
     if (!span.tagName) span = span.nextSibling;
     sty = span.style;
     sty.left = Math.round(x * fac * .026) / 100 + "em";
     sty.top = Math.round(y * fac * .026) / 100 + "em";
     idx++
    }
   }
   eli++;
   ul = el[eli];
   if (!(ul && ul.tagName)) ul = 0
  }
 });
 var msgDiv = d3.select("#messageDiv");
 msgDiv.on(CLICK_EVENT, function() {
  msgDiv.classed("visible", false);
  window.setTimeout(function() {
   msgDiv.style("display", "none")
  }, 500)
 });

 function message(code, data) {
  var title = null,
   msg = null;
  if (code == 1) {
   title = MSG.commFail
  } else if (code == 2) {
   code = data.code;
   if (code == 200) title = MSG.internalError;
   else if (code == 220) {
    title = "Fehler";
    msg = data.error
   }
  } else {}
  if (title) {
   if (!msg) msg = title;
   msgDiv.style("display", "block");
   msgDiv.classed("visible", true);
   msgDiv.select("div.msgTitle").html(title);
   msgDiv.select("div.msgContent").html(msg)
  }
 }

 function serverTask(task_id, task_data, callback, hideMsg) {/*
  d3.json(TIPP_URL).header("Content-Type", "application/json; charset=utf-8").response(function(request) {
   return request.responseText
  }).post(JSON.stringify({
   task: task_id,
   data: task_data,
   lang: LANG
  }), function(error, data) {
   if (error || !data) {
    hideMsg || message(1, error)
   } else {
    if ((i = data.indexOf("{")) < 2 && i != -1 || (i = data.indexOf("[")) < 2 && i != -1) {
     try {
      callback && callback(JSON.parse(data))
     } catch (e) {
      hideMsg || message(1, "Invalid response " + data)
     }
    }
   }
  })
 */}
 w.server = {
  task: serverTask
 }
})(window);

function extendObject(obj, def) {
 for (var propertyName in def) {
  if (!obj[propertyName]) obj[propertyName] = def[propertyName]
 }
 return obj
}

function inheritClass(childCtor, parentCtor) {
 function tempCtor() {}
 tempCtor.prototype = parentCtor.prototype;
 childCtor.superClass_ = parentCtor.prototype;
 childCtor.prototype = new tempCtor;
 childCtor.prototype.constructor = childCtor
}

function setVendorStyles(element, style, value) {
 var p = VENDOR_PREFIX.css + style;
 element.style(p, value);
 if ("-moz-background-size" == p && element[0] && element[0][0]) {
  var dbs = document.body.style,
   els = element[0][0].style;
  if ("backgroundSize" in dbs) {
   els["backgroundSize"] = value
  } else if ("MozBackgroundSize" in document.body.style) {
   els["MozBackgroundSize"] = value
  }
 }
}
var vendorTransitionEnd = null;

function getVendorTransitionEnd() {
 if (!vendorTransitionEnd) {
  var dummy = document.createElement("div");
  var body = document.body;
  dummy.style.display = "none";
  body.appendChild(dummy);
  var eventNameHash = {
    webkit: "webkitTransitionEnd",
    Moz: "transitionend",
    O: "oTransitionEnd",
    ms: "MSTransitionEnd"
   },
   transitionEnd = "transitionend";
  Object.keys(eventNameHash).some(function(vendor) {
   if (vendor + "TransitionProperty" in dummy.style) {
    transitionEnd = eventNameHash[vendor];
    return true
   }
  });
  body.removeChild(dummy);
  vendorTransitionEnd = transitionEnd
 }
 return vendorTransitionEnd
}

function addTransitionEndListener(element, listener) {
 var event = getVendorTransitionEnd();
 element.addEventListener(vendorTransitionEnd, listener, false)
}

function removeTransitionEndListener(element, listener) {
 var event = getVendorTransitionEnd();
 element.removeEventListener(vendorTransitionEnd, listener, false)
}

function setVisible(element, visible, fade, cb) {
 if (!element || !element[0][0]) throw new Error("No element");
 visible = !!visible;
 var isVisible = element[0][0]._isVisible;
 if (isVisible === visible) return;
 element[0][0]._isVisible = visible;
 if (fade) {
  element.style("opacity", visible ? "0.0" : "1.0");
  if (visible) element.style("display", "");
  element.classed("animatedopacity", true);
  window.setTimeout(function() {
   var el = element[0][0];
   var call = 1;
   if (visible) {
    var f = function() {
     if (call) {
      call = 0;
      removeTransitionEndListener(el, f);
      element.classed("animatedopacity", false);
      cb && cb()
     }
    };
    addTransitionEndListener(el, f);
    window.setTimeout(f, 1e3);
    element.style("opacity", "1.0")
   } else {
    var f = function() {
     if (call) {
      call = 0;
      removeTransitionEndListener(el, f);
      element.classed("animatedopacity", false);
      if (!element[0][0]._isVisible) element.style("display", "none");
      cb && cb()
     }
    };
    addTransitionEndListener(el, f);
    window.setTimeout(f, 1e3);
    element.style("opacity", "0.0")
   }
  }, 1)
 } else {
  element.style("display", visible ? "" : "none");
  if (visible) element.style("opacity", "1.0");
  cb && cb()
 }
}

function stripTags(s) {
 return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br />")
}

function validateEmail(email) {
 var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 return re.test(email)
}

function setCookie(cname, cvalue, exdays) {
 var d = new Date;
 d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1e3);
 document.cookie = cname + "=" + cvalue + "; expires=" + d.toGMTString()
}

function getCookie(cname) {
 var name = cname + "=";
 var ca = document.cookie.split(";");
 for (var i = 0; i < ca.length; i++) {
  var c = ca[i].trim();
  if (c.indexOf(name) == 0) return c.substring(name.length, c.length)
 }
 return ""
}