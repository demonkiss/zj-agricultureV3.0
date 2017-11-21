//>>built
define("dojox/treemap/TreeMap","dojo/_base/array dojo/_base/lang dojo/_base/declare dojo/_base/event dojo/_base/Color dojo/touch dojo/when dojo/on dojo/query dojo/dom-construct dojo/dom-geometry dojo/dom-class dojo/dom-style ./_utils dijit/_WidgetBase dojox/widget/_Invalidating dojox/widget/Selection dojo/_base/sniff dojo/uacss".split(" "),function(t,n,w,D,x,y,z,u,r,q,p,f,l,v,A,B,C,s){return w("dojox.treemap.TreeMap",[A,B,C],{baseClass:"dojoxTreeMap",store:null,query:{},queryOptions:null,itemToRenderer:null,
_dataChanged:!1,rootItem:null,_rootItemChanged:!1,tooltipAttr:"",areaAttr:"",_areaChanged:!1,labelAttr:"label",labelThreshold:NaN,colorAttr:"",colorModel:null,_coloringChanged:!1,groupAttrs:[],groupFuncs:null,_groupFuncs:null,_groupingChanged:!1,constructor:function(){this.itemToRenderer={};this.invalidatingProperties="colorModel groupAttrs groupFuncs areaAttr areaFunc labelAttr labelFunc labelThreshold tooltipAttr tooltipFunc colorAttr colorFunc rootItem".split(" ")},getIdentity:function(a){return a.__treeID?
a.__treeID:this.store.getIdentity(a)},resize:function(a){a&&(p.setMarginBox(this.domNode,a),this.invalidateRendering())},postCreate:function(){this.inherited(arguments);this.own(u(this.domNode,"mouseover",n.hitch(this,this._onMouseOver)));this.own(u(this.domNode,"mouseout",n.hitch(this,this._onMouseOut)));this.own(u(this.domNode,y.release,n.hitch(this,this._onMouseUp)));this.domNode.setAttribute("role","presentation");this.domNode.setAttribute("aria-label","treemap")},buildRendering:function(){this.inherited(arguments);
this.refreshRendering()},refreshRendering:function(){var a=!1;this._dataChanged&&(this._dataChanged=!1,this._coloringChanged=this._groupingChanged=!0);this._groupingChanged&&(this._groupingChanged=!1,this._set("rootItem",null),this._updateTreeMapHierarchy(),a=!0);this._rootItemChanged&&(this._rootItemChanged=!1,a=!0);this._coloringChanged&&(this._coloringChanged=!1,null!=this.colorModel&&(null!=this._data&&this.colorModel.initialize)&&this.colorModel.initialize(this._data,n.hitch(this,function(a){return this.colorFunc(a,
this.store)})));this._areaChanged&&(this._areaChanged=!1,this._removeAreaForGroup());if(!(void 0==this.domNode||null==this._items)){a&&q.empty(this.domNode);var b=this.rootItem,c;if(null!=b){var d=this._getRenderer(b);d&&(this._isLeaf(b)&&(b=d.parentItem),c=d.parentItem)}d=p.getMarginBox(this.domNode);null!=b?this._buildRenderer(this.domNode,c,b,{x:d.l,y:d.t,w:d.w,h:d.h},0,a):this._buildChildrenRenderers(this.domNode,b?b:{__treeRoot:!0,children:this._items},0,a,d)}},_setRootItemAttr:function(a){this._rootItemChanged=
!0;this._set("rootItem",a)},_setStoreAttr:function(a){var b;this._observeHandler&&(this._observeHandler.remove(),this._observeHandler=null);null!=a?(b=a.query(this.query,this.queryOptions),b.observe&&(this._observeHandler=b.observe(n.hitch(this,this._updateItem),!0)),b=z(b,n.hitch(this,this._initItems))):b=this._initItems([]);this._set("store",a);return b},_initItems:function(a){this._dataChanged=!0;this._data=a;this.invalidateRendering();return a},_updateItem:function(a,b,c){-1!=b?c!=b?this._data.splice(b,
1):this._data[c]=a:-1!=c&&this._data.splice(c,0,a);this._dataChanged=!0;this.invalidateRendering()},_setGroupAttrsAttr:function(a){this._groupingChanged=!0;null==this.groupFuncs&&(this._groupFuncs=null!=a?t.map(a,function(a){return function(c){return c[a]}}):null);this._set("groupAttrs",a)},_setGroupFuncsAttr:function(a){this._groupingChanged=!0;this._set("groupFuncs",this._groupFuncs=a);null==a&&null!=this.groupAttrs&&(this._groupFuncs=t.map(this.groupAttrs,function(a){return function(c){return c[a]}}))},
_setAreaAttrAttr:function(a){this._areaChanged=!0;this._set("areaAttr",a)},areaFunc:function(a,b){return this.areaAttr&&0<this.areaAttr.length?parseFloat(a[this.areaAttr]):1},_setAreaFuncAttr:function(a){this._areaChanged=!0;this._set("areaFunc",a)},labelFunc:function(a,b){var c=this.labelAttr&&0<this.labelAttr.length?a[this.labelAttr]:null;return c?c.toString():null},tooltipFunc:function(a,b){var c=this.tooltipAttr&&0<this.tooltipAttr.length?a[this.tooltipAttr]:null;return c?c.toString():null},_setColorModelAttr:function(a){this._coloringChanged=
!0;this._set("colorModel",a)},_setColorAttrAttr:function(a){this._coloringChanged=!0;this._set("colorAttr",a)},colorFunc:function(a,b){var c=this.colorAttr&&0<this.colorAttr.length?a[this.colorAttr]:0;null==c&&(c=0);return parseFloat(c)},_setColorFuncAttr:function(a){this._coloringChanged=!0;this._set("colorFunc",a)},createRenderer:function(a,b,c){a=q.create("div");"header"!=c&&(l.set(a,"overflow","hidden"),l.set(a,"position","absolute"));return a},styleRenderer:function(a,b,c,d){switch(d){case "leaf":l.set(a,
"background",this.getColorForItem(b).toHex());case "header":(b=this.getLabelForItem(b))&&(isNaN(this.labelThreshold)||c<this.labelThreshold)?a.innerHTML=b:q.empty(a)}},_updateTreeMapHierarchy:function(){null!=this._data&&(this._items=null!=this._groupFuncs&&0<this._groupFuncs.length?v.group(this._data,this._groupFuncs,n.hitch(this,this._getAreaForItem)).children:this._data)},_removeAreaForGroup:function(a){if(null!=a)if(a.__treeValue)delete a.__treeValue,a=a.children;else return;else a=this._items;
if(a)for(var b=0;b<a.length;++b)this._removeAreaForGroup(a[b])},_getAreaForItem:function(a){a=this.areaFunc(a,this.store);return isNaN(a)?0:a},_computeAreaForItem:function(a){var b;if(a.__treeID){if(b=a.__treeValue,!b){b=0;for(var c=a.children,d=0;d<c.length;++d)b+=this._computeAreaForItem(c[d]);a.__treeValue=b}}else b=this._getAreaForItem(a);return b},getColorForItem:function(a){a=this.colorFunc(a,this.store);return null!=this.colorModel?this.colorModel.getColor(a):new x(a)},getLabelForItem:function(a){return a.__treeName?
a.__treeName:this.labelFunc(a,this.store)},_buildChildrenRenderers:function(a,b,c,d,k,e){var m=b.children,g=p.getMarginBox(a),g=v.solve(m,g.w,g.h,n.hitch(this,this._computeAreaForItem),!this.isLeftToRight()).rectangles;k&&(g=t.map(g,function(a){a.x+=k.l;a.y+=k.t;return a}));for(var h,f=0;f<m.length;++f)h=g[f],this._buildRenderer(a,b,m[f],h,c,d,e)},_isLeaf:function(a){return!a.children},_isRoot:function(a){return a.__treeRoot},_getRenderer:function(a,b,c){if(b)for(b=0;b<c.children.length;++b)if(c.children[b].item==
a)return c.children[b];return this.itemToRenderer[this.getIdentity(a)]},_buildRenderer:function(a,b,c,d,k,e,f){var g=this._isLeaf(c),h=!e?this._getRenderer(c,f,a):null,h=g?this._updateLeafRenderer(h,c,k):this._updateGroupRenderer(h,c,k);e&&(h.level=k,h.item=c,h.parentItem=b,this.itemToRenderer[this.getIdentity(c)]=h,this.updateRenderers(c));b=Math.floor(d.x);var l=Math.floor(d.y),n=Math.floor(d.x+d.w+1E-11)-b;d=Math.floor(d.y+d.h+1E-11)-l;e&&q.place(h,a);p.setMarginBox(h,{l:b,t:l,w:n,h:d});g||(a=
p.getContentBox(h),this._layoutGroupContent(h,a.w,a.h,k+1,e,f));this.onRendererUpdated({renderer:h,item:c,kind:g?"leaf":"group",level:k})},_layoutGroupContent:function(a,b,c,d,f,e){var m=r(".dojoxTreeMapHeader",a)[0],g=r(".dojoxTreeMapGroupContent",a)[0];if(!(null==m||null==g)){var h=p.getMarginBox(m);h.h>c?(h.h=c,l.set(g,"display","none")):(l.set(g,"display","block"),p.setMarginBox(g,{l:0,t:h.h,w:b,h:c-h.h}),this._buildChildrenRenderers(g,a.item,d,f,null,e));p.setMarginBox(m,{l:0,t:0,w:b,h:h.h})}},
_updateGroupRenderer:function(a,b,c){var d=null==a;null==a&&(a=this.createRenderer("div",c,"group"),f.add(a,"dojoxTreeMapGroup"));this.styleRenderer(a,b,c,"group");var k=r(".dojoxTreeMapHeader",a)[0],k=this._updateHeaderRenderer(k,b,c);d&&q.place(k,a);k=r(".dojoxTreeMapGroupContent",a)[0];k=this._updateGroupContentRenderer(k,b,c);d&&q.place(k,a);return a},_updateHeaderRenderer:function(a,b,c){null==a&&(a=this.createRenderer(b,c,"header"),f.add(a,"dojoxTreeMapHeader"),f.add(a,"dojoxTreeMapHeader_"+
c));this.styleRenderer(a,b,c,"header");return a},_updateLeafRenderer:function(a,b,c){null==a&&(a=this.createRenderer(b,c,"leaf"),f.add(a,"dojoxTreeMapLeaf"),f.add(a,"dojoxTreeMapLeaf_"+c));this.styleRenderer(a,b,c,"leaf");if(b=this.tooltipFunc(b,this.store))a.title=b;return a},_updateGroupContentRenderer:function(a,b,c){null==a&&(a=this.createRenderer(b,c,"content"),f.add(a,"dojoxTreeMapGroupContent"),f.add(a,"dojoxTreeMapGroupContent_"+c));this.styleRenderer(a,b,c,"content");return a},_getRendererFromTarget:function(a){for(;a!=
this.domNode&&!a.item;)a=a.parentNode;return a},_onMouseOver:function(a){var b=this._getRendererFromTarget(a.target);if(b.item){var c=b.item;this._hoveredItem=c;this.updateRenderers(c);this.onItemRollOver({renderer:b,item:c,triggerEvent:a})}},_onMouseOut:function(a){var b=this._getRendererFromTarget(a.target);if(b.item){var c=b.item;this._hoveredItem=null;this.updateRenderers(c);this.onItemRollOut({renderer:b,item:c,triggerEvent:a})}},_onMouseUp:function(a){var b=this._getRendererFromTarget(a.target);
b.item&&this.selectFromEvent(a,b.item,b,!0)},onRendererUpdated:function(){},onItemRollOver:function(){},onItemRollOut:function(){},updateRenderers:function(a){if(a){n.isArray(a)||(a=[a]);for(var b=0;b<a.length;b++){var c=a[b],d=this._getRenderer(c);if(d){var k=this.isItemSelected(c),e=s("ie");if(k){if(f.add(d,"dojoxTreeMapSelected"),e&&(s("quirks")||9>e)){var e=d.previousSibling,m=l.get(d);if(!e||!f.contains(e,"dojoxTreeMapIEHack"))e=this.createRenderer(c,-10,"group"),f.add(e,"dojoxTreeMapIEHack"),
f.add(e,"dojoxTreeMapSelected"),l.set(e,{position:"absolute",overflow:"hidden"}),q.place(e,d,"before");var g=2*parseInt(l.get(e,"border-width")),g=this._isLeaf(c)?g-1:g+1;"auto"!=m.left&&l.set(e,{left:parseInt(m.left)+1+"px",top:parseInt(m.top)+1+"px",width:parseInt(m.width)-g+"px",height:parseInt(m.height)-g+"px"})}}else{if(e&&(s("quirks")||9>e))(e=d.previousSibling)&&f.contains(e,"dojoxTreeMapIEHack")&&e.parentNode.removeChild(e);f.remove(d,"dojoxTreeMapSelected")}this._hoveredItem==c?f.add(d,"dojoxTreeMapHovered"):
f.remove(d,"dojoxTreeMapHovered");k||this._hoveredItem==c?l.set(d,"zIndex",20):l.set(d,"zIndex",7>=s("ie")?0:"auto")}}}}})});