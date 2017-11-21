//>>built
define("dojox/mdnd/Moveable","dojo/_base/kernel dojo/_base/declare dojo/_base/array dojo/_base/connect dojo/_base/event dojo/_base/sniff dojo/dom dojo/dom-geometry dojo/dom-style dojo/touch dojo/_base/window".split(" "),function(h,k,l,b,d,e,f,g,m,c){return k("dojox.mdnd.Moveable",null,{handle:null,skip:!0,dragDistance:3,constructor:function(a,n){this.node=f.byId(n);this.d=this.node.ownerDocument;a||(a={});this.handle=a.handle?f.byId(a.handle):null;this.handle||(this.handle=this.node);this.skip=a.skip;
this.events=[b.connect(this.handle,c.press,this,"onMouseDown")];dojox.mdnd.autoScroll&&(this.autoScroll=dojox.mdnd.autoScroll)},isFormElement:function(a){a=a.target;3==a.nodeType&&(a=a.parentNode);return 0<=" a button textarea input select option ".indexOf(" "+a.tagName.toLowerCase()+" ")},onMouseDown:function(a){if(!this._isDragging&&1==(a.which||a.button))if(!this.skip||!this.isFormElement(a))this.autoScroll&&(this.autoScroll.setAutoScrollNode(this.node),this.autoScroll.setAutoScrollMaxPage()),
this.events.push(b.connect(this.d,c.release,this,"onMouseUp")),this.events.push(b.connect(this.d,c.move,this,"onFirstMove")),this._selectStart=b.connect(h.body(),"onselectstart",d.stop),this._firstX=a.clientX,this._firstY=a.clientY,d.stop(a)},onFirstMove:function(a){d.stop(a);(this._firstX-a.clientX)*(this._firstX-a.clientX)+(this._firstY-a.clientY)*(this._firstY-a.clientY)>this.dragDistance*this.dragDistance&&(this._isDragging=!0,b.disconnect(this.events.pop()),m.set(this.node,"width",g.getContentBox(this.node).w+
"px"),this.initOffsetDrag(a),this.events.push(b.connect(this.d,c.move,this,"onMove")))},initOffsetDrag:function(a){this.offsetDrag={l:a.pageX,t:a.pageY};a=g.position(this.node,!0);this.offsetDrag.l=a.x-this.offsetDrag.l;this.offsetDrag.t=a.y-this.offsetDrag.t;var b={x:a.x,y:a.y};this.size={w:a.w,h:a.h};this.onDragStart(this.node,b,this.size)},onMove:function(a){d.stop(a);if(!(8==e("ie")&&20>new Date-this.date)){this.autoScroll&&this.autoScroll.checkAutoScroll(a);var b={x:this.offsetDrag.l+a.pageX,
y:this.offsetDrag.t+a.pageY},c=this.node.style;c.left=b.x+"px";c.top=b.y+"px";this.onDrag(this.node,b,this.size,{x:a.pageX,y:a.pageY});8==e("ie")&&(this.date=new Date)}},onMouseUp:function(a){this._isDragging&&(d.stop(a),this._isDragging=!1,this.autoScroll&&this.autoScroll.stopAutoScroll(),delete this.onMove,this.onDragEnd(this.node),this.node.focus());b.disconnect(this.events.pop());b.disconnect(this.events.pop());b.disconnect(this._selectStart);this._selectStart=null},onDragStart:function(a,b,c){},
onDragEnd:function(a){},onDrag:function(a,b,c,d){},destroy:function(){l.forEach(this.events,b.disconnect);this.events=this.node=null}})});