 var icapture;
(function(){
    //initiate & destroy icapture on key press
   
    document.onkeydown = function(e) {
        var event = e || window.event;
        if(event.ctrlKey && event.key=="!") {
            console.log("working");
           // if(!icapture) {
            //window.print();
                html2canvas(document.body, {
                    onrendered: function(canvas) {
                        icapture = new ICapture({image: canvas.toDataURL()});
                    },
                    allowTaint : true,
                    useCORS : true
                });     
           // }
        }
        if(event.which=="27") {
            icapture.destroy();
            icapture = null;
            $("#draggable").show();
        } 
    }
    
   

    //Some common utility functions
    var util = {
        mixin: function(dest, src){
            for(var p in src)dest[p] = src[p];
        }
        ,byId: function(id){
            if(typeof id== 'string')return document.getElementById(id);
            else return id;
        }
        ,create: function(tag, attrs){
            var node = document.createElement(tag);
            this.mixin(node, attrs);
            return node;
        }
        ,connect: function(node, evtType, context, callback){
            //TODO: use event listeners instead
            var self = this;
            function handler(evt){
                evt = self.fixEvent(evt);
                context[callback](evt);
            }
            if(node.attachEvent)node.attachEvent('on' + evtType, handler);
            else node.addEventListener(evtType, handler, false);
        }
        ,style: function(node, args){
            if(typeof args == 'string'){
                var value = node.style[args];
                if(!value){
                    s = window.getComputedStyle ? getComputedStyle(node) : node.currentStyle;
                    value = s[args];
                }
                return value;
            }else this.mixin(node.style, args);
        }
        ,each: function(arr, callback){
            for(var i = 0; i < arr.length; i++)
                callback(arr[i], i);
        }
        ,indexOf: function(arr, value){
            for(var i = 0; i < arr.length; i++)
                if(value == arr[i])return i;
            return -1;
        }
        ,addCss: function(node, css){
            if(!node)return;
            var cn = node.className || '', arr = cn.split(' '), i = util.indexOf(arr, css);
            if(i < 0)arr.push(css);
            node.className = arr.join(' ');
        }
        ,rmCss: function(node, css){
            if(!node)return;
            var cn = node.className || '', arr = cn.split(' '), i = util.indexOf(arr, css);
            if(i >= 0)arr.splice(i, 1);
            node.className = arr.join(' ');
        }
        ,fixEvent: function(evt){
            evt = evt || event; 
            if(!evt.target)evt.target = evt.srcElement;
            if(!evt.keyCode)evt.keyCode = evt.which || evt.charCode;
            if(!evt.pageX){//only for IE
               evt.pageX = evt.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
               evt.pageY = evt.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }
            return evt;
        }
    };

    window.ICapture = function (options){

        // summary:
        //  Constructor of the Image Cropper, the container could be a dom node or id.
        var container = util.create('div');
        util.mixin(container.style,{position:'absolute',top:0,left:0,overflow:'hidden'});
        document.body.appendChild(container);

        var save_btn = util.create('div');
        util.mixin(save_btn.style,{position:'fixed',display:'block',top:'0',right:'40px',borderRadius:'0 0 4px 4px',padding:'10px 20px',background:'#ffa300',opacity:'0.8',color:'#fff',textAlign:'center',zIndex:'9999',fontFamily:'arial',boxShadow:'0 0 15px rgba(0,0,0,0.2)',cursor:'pointer'});
        document.body.appendChild(save_btn);
        save_btn.innerHTML = "COPY"; 

        save_btn.addEventListener('mouseover', function(e) {
            this.style.opacity=1;
        });        
        save_btn.addEventListener('mouseout', function (e) {
            this.style.opacity=0.9;
        });
        var self = this;

        save_btn.addEventListener('click', function (e) {
            var info = self.getInfo();    
            var canvas = util.create('canvas');
            canvas.width = info.w;
            canvas.height = info.h;
            var ctx = canvas.getContext("2d");
            var img = new Image();
                img.onload = function(){
                    ctx.drawImage(img,info.l,info.t,info.w,info.h,0,0,info.w,info.h);

                    var name = "Trinet-"+new Date().getTime();
                    var link = document.createElement('a');
                    link.style = 'position: fixed; left -10000px;'; // making it invisible
                    link.href = canvas.toDataURL(); // forcing content type
                    link.download = name+'.jpg';
                    /* file extension is very important! */
                    document.body.appendChild(link);
                    link.click();
//                    $("#selectedImg").remove();
//                    $("body").append("<div id='selectedImg' class='well well-lg'> <p class='success'>DRAG THE IMAGE </p><br><img src='"+link.href+"'" +
//                    		" name='"+name+"' style='max-width:100%'/></div>");
                    //$("body").append('<textarea id="imgCopy">FFFFFFFFF</textarea>')
                    
                    
//                    $
//					.post("copyToClipboard",{
//						data : link.href
//					})
//					.done(
//							function(data) {
//								if(data == "Success")
//										//$("body").append('<p id="copyMessage">SUCCESSFULLY COPIED TO CLIPBOARD</p>')
//									alert("COPIED TO CLIPBOARD");
//								});
                   // document.body.removeChild(link);
                   
                    self.destroy();
                };
                img.src = self.image;
                icapture.destroy();
    		    icapture = null;
//    		    setTimeout(function() {
//    		        document.getElementById("copyMessage").remove()
//    		    }, 2000);
                $("#draggable").show();
        });
        
        

        for(var p in options){
            if(options[p])this[p] = options[p];
        }
        this.domNode = container;
        this.btn = save_btn;
        this._init();
    }
    
    function copyImage(url){
    	 //Make the container Div contenteditable
        $("#imgCopy").attr("contenteditable", true);
        //Select the image
        SelectText($("#imgCopy").get(0));
        //Execute copy Command
        //Note: This will ONLY work directly inside a click listenner
        document.execCommand('copy');
        //Unselect the content
        window.getSelection().removeAllRanges();
        //Make the container Div uneditable again
        $("#imgCopy").removeAttr("contenteditable");
        //Success!!
        alert("image copied!");
    }
    
    function SelectText(element) {
        var doc = document;
        if (doc.body.createTextRange) {
            var range = document.body.createTextRange();
            range.moveToElementText(element);
            range.select();
        } else if (window.getSelection) {
            var selection = window.getSelection();
            var range = document.createRange();
            range.selectNodeContents(element);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }

    ICapture.prototype = {

        //The image url
        image: ''

        //The minimal size of the cropping area
        ,minWidth: 20
        ,minHeight: 20

        //The default gap between crop region border and container border
        ,gap:20

        //the initial crop region width and height
        ,initialSize: 0

        //whether to keep crop region as a square
        //DEPRECATED: use ratio=1 instead.
        ,keepSquare: false

        //whether to keep the ratio of width:height, 0 means not set
        ,ratio: 0

        //array: the nodes to show previews of cropped image
        ,preview: null

        ,domNode: null
        ,cropNode: null
        ,imageNode: null

        //Public APIs
        //------------------------------------------------------------
        ,setImage: function(url) {
            // summary:
            //  Set the image to be cropped. The container size will fit the image.
            var img = new Image();
            img.src = url;
            this.image = url;
            if (!this.imageNode) {
                this.imageNode = util.create('img');
                this.domNode.appendChild(this.imageNode);
                var self = this;
                //TODO: onerror?
                this.imageNode.onload = function(){
                	
                    self._setSize(this.offsetWidth, this.offsetHeight);
                }
            }
            this.imageNode.src = url;
            console.log(url)
        }

        ,bindPreview: function(node){
            // summary:
            //  Bind a node as the preview area. e.g: a real size avatar
            node = util.byId(node);
            util.style(node, {overflow: 'hidden'});
            var width = parseInt(util.style(node, 'width'))
                ,height = parseInt(util.style(node, 'height'))
                ;
            var previewImage = util.create('img', {src: this.image});
            node.appendChild(previewImage);

            var _oldOnChange = this.onChange;
            var self = this;
            this.onChange = function(info){
                _oldOnChange.call(this, info);

                var r = info.w/info.h
                    ,w2 = height*r
                    ,h2 = width/r
                    ;
                if(w2 >= width)w2 = width;
                if(h2 >= height)h2 = height;
                util.style(node, {width: w2 + 'px', height: h2 + 'px'});
                
                var rateX =  w2/info.w
                    ,rateY = h2/info.h;
                util.style(previewImage , {
                    width: info.cw*rateX + 'px'
                    ,height:info.ch*rateY + 'px'
                    ,marginLeft: -info.l*rateX + 'px'
                    ,marginTop: -info.t*rateY + 'px'
                });
            }
        }
        ,getInfo: function() {
            // summary:
            //  Get the cropping infomation. Such as being used by server side for real cropping.
            return {
                w: this.cropNode.offsetWidth - 2    //2 is hard code border width
                ,h: this.cropNode.offsetHeight - 2
                ,l: parseInt(util.style(this.cropNode, 'left'))
                ,t: parseInt(util.style(this.cropNode, 'top'))
                ,cw: this.domNode.offsetWidth //container width
                ,ch: this.domNode.offsetHeight //container height
            };
        }

        ,onChange: function() {
            //Event:
            //    When the cropping size is changed.
        }
        ,onComplete: function() {
            //Event:
            //    When mouseup.
        }
        ,destroy: function(){
            document.body.removeChild(this.domNode);
            //document.body.removeChild(this.btn);
            //TODO: destroy self to release memory
        }

        //Private APIs
        //------------------------------------------------------------
        ,_init: function() {
            util.addCss(this.domNode, 'icapture');
            this._buildRendering();
            this._updateUI();
            util.connect(this.cropNode, 'mousedown', this, '_onMouseDown');
            util.connect(document, 'mouseup', this, '_onMouseUp');
            util.connect(document, 'mousemove', this, '_onMouseMove');
            this.image && this.setImage(this.image);
            
            if(this.preview){
                var self = this;
                util.each(this.preview, function(node){
                    self.bindPreview(node);
                });
            }   
        }

        ,_buildRendering: function() {
            this._archors = {};
            this._blockNodes = {};

            this.cropNode = util.create('div', {className: 'crop-node no-select'});
            this.domNode.appendChild(this.cropNode);

            //Create archors
            var arr = ['lt', 't', 'rt', 'r', 'rb', 'b', 'lb', 'l'];
            for (var i = 0; i < 8; i++) {
                var n = util.create('div', {className: 'archor archor-' + arr[i]});
                this.cropNode.appendChild(n);
                this._archors[arr[i]] = n;
            }

            //Create blocks for showing dark areas
            arr = ['l', 't', 'r', 'b'];
            for (var i = 0; i < 4; i++) {
                var n = util.create('div', {className: 'block block-' + arr[i]});
                this.domNode.appendChild(n);
                this._blockNodes[arr[i]] = n;
            }
        }

        ,_setSize: function(w, h) {

            this.domNode.style.width = w + 'px';
            this.domNode.style.height = h + 'px';

            var w2, h2;
            if (this.initialSize) {
                var m = Math.min(w, h, this.initialSize);
                w2 = h2 = m - 2 + 'px';
            }else{
                w2 = w - this.gap * 30 - 2;
                h2 = h - this.gap * 2 - 2;
                if(h2>600)
                	h2=600;
                if(this.ratio){
                    var _w2 = h2*this.ratio, _h2 = w2/this.ratio;
                    if(w2 > _w2)w2 = _w2;
                    if(h2 > _h2)h2 = _h2;
                   
                }
                w2 += 'px';
                h2 += 'px';
            }

            var s = this.cropNode.style;
            s.width = w2;
            s.height = h2;

            var l = (w - this.cropNode.offsetWidth) / 2
                ,t = (h - this.cropNode.offsetHeight) / 2;

            if (l < 0) l = 0;
            if (t < 0) t = 0;

            s.left = l + 'px';
            s.top = 100 + 'px';
     
            this._posArchors();
            this._posBlocks();
            this.onChange(this.getInfo());
        }

        ,_updateUI: function() {
            this._posArchors();
            this._posBlocks();
        }

        ,_posArchors: function() {
            var a = this._archors,
                w = this.cropNode.offsetWidth,
                h = this.cropNode.offsetHeight;
            w = w / 2 - 4 + 'px';
            h = h / 2 - 4 + 'px';
            a.t.style.left = a.b.style.left = w;
            a.l.style.top = a.r.style.top = h;
        }

        ,_posBlocks: function() {
            var p = this.startedPos,
                b = this._blockNodes;
            var l = parseInt(util.style(this.cropNode, 'left'));
            var t = parseInt(util.style(this.cropNode, 'top'));
            var w = this.cropNode.offsetWidth;
            var ww = this.domNode.offsetWidth;
            var h = this.cropNode.offsetHeight;
            var hh = this.domNode.offsetHeight;

            b = this._blockNodes;
            b.t.style.height = b.l.style.top = b.r.style.top = t + 'px';

            b.l.style.height = b.r.style.height = h + 'px';
            b.l.style.width = l + 'px';


            w = ww - w - l;
            h = hh - h - t;

            //fix IE
            if(w < 0)w = 0;
            if(h < 0)h = 0;

            b.r.style.width = w + 'px';
            b.b.style.height = h + 'px';
        }

        ,_onMouseDown: function(e) {
            var n = this.cropNode, s = n.style;
            this.dragging = (e.target == n) ? 'move' : e.target.className;
            if(this.dragging != 'move'){
                var arr = this.dragging.split(' ');
                this.dragging = arr.pop().split('-')[1];
            }

            this.startedPos = {
                x: e.pageX
                ,y: e.pageY
                ,h: n.offsetHeight - 2 //2 is border width
                ,w: n.offsetWidth - 2
                ,l: parseInt(util.style(n, 'left'))
                ,t: parseInt(util.style(n, 'top'))
            }
            var c = util.style(e.target, 'cursor');
            util.style(document.body, {
                cursor: c
            });
            util.style(this.cropNode, {
                cursor: c
            });
            util.addCss(document.body, 'no-select');
            util.addCss(document.body, 'unselectable');//for IE
        }

        ,_onMouseUp: function(e) {
            this.dragging = false;
            util.style(document.body, {
                cursor: 'default'
            });
            util.style(this.cropNode, {
                cursor: 'move'
            });
            util.rmCss(document.body, 'no-select');
            util.rmCss(document.body, 'unselectable');
            this.onComplete && this.onComplete(this.getInfo());
        }

        ,_onMouseMove: function(e) {
            if (!this.dragging) return;

            if (this.dragging == 'move') this._doMove(e);
            else this._doResize(e);
            this._updateUI();
            this.onChange && this.onChange(this.getInfo());
        }

        ,_doMove: function(e) {
            var s = this.cropNode.style,
                p0 = this.startedPos;
            var l = p0.l + e.pageX - p0.x;
            var t = p0.t + e.pageY - p0.y;
            if (l < 0) l = 0;
            if (t < 0) t = 0;
            var maxL = this.domNode.offsetWidth - this.cropNode.offsetWidth;
            var maxT = this.domNode.offsetHeight - this.cropNode.offsetHeight;
            if (l > maxL) l = maxL;
            if (t > maxT) t = maxT;
            s.left = l + 'px';
            s.top = t + 'px'
        }
        
        ,_doResize: function(e) {
            var m = this.dragging
                ,s = this.cropNode.style
                ,cw = this.cropNode.offsetWidth
                ,ch = this.cropNode.offsetHeight
                ,p0 = this.startedPos
                ;
            //delta x and delta y
            var dx = e.pageX - p0.x,
                dy = e.pageY - p0.y;

            var ratio = this.ratio;
            if(!ratio && e.shiftKey)ratio = 1;//Shiftkey is only available when there's no ratio set.

            if (ratio){
                if (m == 'l') {
                    dy = dx/ratio;
                    if (p0.l + dx < 0) {dx = -p0.l; dy = dx / ratio;}
                    if (p0.t + dy < 0) {dy = -p0.t; dx = dy * ratio;}
                    m = 'lt';
                } else if (m == 'r') {
                    dy = dx/ratio;
                    m = 'rb';
                } else if (m == 'b') {
                    dx = dy*ratio;
                    m = 'rb';
                } else if (m == 'lt') {
                    dx = Math.abs(dx) > Math.abs(dy) ? dx : dy;
                    dy = dx/ratio;
                    if (p0.l + dx < 0) {dx = -p0.l; dy = dx / ratio;}
                    if (p0.t + dy < 0) {dy = -p0.t; dx = dy * ratio;}
                } else if (m == 'lb') {
                    dx = Math.abs(dx) > Math.abs(dy) ? dx : -dy;
                    dy = -dx/ratio;
                    if (p0.l + dx < 0) {
                        dx = -p0.l;
                        dy = p0.l;
                    }
                } else if (m == 'rt' || m == 't') {
                    dx = -dy*ratio;
                    m = 'rt';
                    if (p0.t + dy < 0) {
                        dy = -p0.t;
                        dx = -dy;
                    }
                }
            }
            if (/l/.test(m)) {
                dx = Math.min(dx, p0.w - this.minWidth);
                if (p0.l + dx >= 0) {
                    s.left = p0.l + dx + 'px';
                    s.width = p0.w - dx + 'px';
                } else {
                    s.left = 0;
                    s.width = p0.l + p0.w + 'px';
                }
            }
            if (/t/.test(m)) {
                dy = Math.min(dy, p0.h - this.minHeight);
                if (p0.t + dy >= 0) {
                    s.top = p0.t + dy + 'px';
                    s.height = p0.h - dy + 'px';
                } else {
                    s.top = 0;
                    s.height = p0.t + p0.h + 'px';
                }
            }
            if (/r/.test(m)) {
                dx = Math.max(dx, this.minWidth - p0.w);
                if (p0.l + p0.w + dx <= this.domNode.offsetWidth) {
                    s.width = p0.w + dx + 'px';
                } else {
                    s.width = this.domNode.offsetWidth - p0.l - 2 + 'px';
                }
            }
            if (/b/.test(m)) {
                dy = Math.max(dy, this.minHeight - p0.h);
                if (p0.t + p0.h + dy <= this.domNode.offsetHeight) {
                    s.height = p0.h + dy + 'px';
                } else {
                    s.height = this.domNode.offsetHeight - p0.t - 2 + 'px';
                }
            }

            if(ratio){
                var w = parseInt(s.width), h = parseInt(s.height);
                var w2 = h * ratio, h2 = w/ratio;
                if(w2 < w){
                    if (/l/.test(m)) {
                        s.left = parseInt(s.left) + w - w2 + 'px';
                    }
                    w = w2;
                }
                if(h2 < h){
                    if (/t/.test(m)){
                        s.top = parseInt(s.top) + h - h2 + 'px';
                    }
                    h = h2;
                }
                s.width = w + 'px';
                s.height = h + 'px';
            }
        }
    }
})();