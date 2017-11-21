//>>built
define("dojox/treemap/DrillDownUp","dojo/_base/lang dojo/_base/event dojo/_base/declare dojo/on dojo/dom-geometry dojo/dom-construct dojo/dom-style dojo/_base/fx dojo/has!touch?dojox/gesture/tap".split(" "),function(d,k,n,h,e,l,f,m,g){return n("dojox.treemap.DrillDownUp",null,{postCreate:function(){this.inherited(arguments);this.own(h(this.domNode,"dblclick",d.hitch(this,this._onDoubleClick)));g&&this.own(h(this.domNode,g.doubletap,d.hitch(this,this._onDoubleClick)))},_onDoubleClick:function(b){var a=
this._getRendererFromTarget(b.target);if(a.item){var c=a.item;if(this._isLeaf(c)&&(c=a.parentItem,a=this.itemToRenderer[this.getIdentity(c)],null==a))return;this.rootItem==c?this.drillUp(a):this.drillDown(a);k.stop(b)}},drillUp:function(b){var a=b.item;this.domNode.removeChild(b);var c=this._getRenderer(a).parentItem;this.set("rootItem",c);this.validateRendering();l.place(b,this.domNode);f.set(b,"zIndex",40);a=e.position(this._getRenderer(a),!0);c=e.getMarginBox(this.domNode);m.animateProperty({node:b,
duration:500,properties:{left:{end:a.x-c.l},top:{end:a.y-c.t},height:{end:a.h},width:{end:a.w}},onAnimate:d.hitch(this,function(a){a=e.getContentBox(b);this._layoutGroupContent(b,a.w,a.h,b.level+1,!1,!0)}),onEnd:d.hitch(this,function(){this.domNode.removeChild(b)})}).play()},drillDown:function(b){var a=e.getMarginBox(this.domNode),c=b.item,h=b.parentNode,g=e.position(b,!0);h.removeChild(b);l.place(b,this.domNode);f.set(b,{left:g.x-a.l+"px",top:g.y-a.t+"px"});var k=f.get(b,"zIndex");f.set(b,"zIndex",
40);m.animateProperty({node:b,duration:500,properties:{left:{end:a.l},top:{end:a.t},height:{end:a.h},width:{end:a.w}},onAnimate:d.hitch(this,function(a){a=e.getContentBox(b);this._layoutGroupContent(b,a.w,a.h,b.level+1,!1)}),onEnd:d.hitch(this,function(){f.set(b,"zIndex",k);this.set("rootItem",c)})}).play()}})});