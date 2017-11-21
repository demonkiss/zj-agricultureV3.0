//>>built
define("dojox/charting/widget/Chart","dojo/_base/kernel dojo/_base/lang dojo/_base/array dojo/dom-attr dojo/_base/declare dojo/query dijit/_WidgetBase ../Chart dojo/has dojo/has!dojo-bidi?../bidi/widget/Chart dojox/lang/utils dojox/lang/functional dojox/lang/functional/lambda".split(" "),function(g,h,r,y,s,k,l,z,t,A,m,B,C){var n,u,v,w,x,p=function(c){return c},q=h.getObject("dojox.charting");n=function(c,d,b){var a=eval("("+d+".prototype.defaultParams)"),e,f;for(e in a)e in b||(f=c.getAttribute(e),
b[e]=m.coerceType(a[e],null==f||"undefined"==typeof f?a[e]:f));d=eval("("+d+".prototype.optionalParams)");for(e in d)e in b||(f=c.getAttribute(e),null!=f&&(b[e]=m.coerceType(d[e],f)))};u=function(c){var d=c.getAttribute("name"),b=c.getAttribute("type");if(!d)return null;var d={name:d,kwArgs:{}},a=d.kwArgs;if(b){q.axis2d[b]&&(b=g._scopeName+"x.charting.axis2d."+b);var e=eval("("+b+")");e&&(a.type=e)}else b=g._scopeName+"x.charting.axis2d.Default";n(c,b,a);if(a.font||a.fontColor)a.tick||(a.tick={}),
a.font&&(a.tick.font=a.font),a.fontColor&&(a.tick.fontColor=a.fontColor);return d};v=function(c){var d=c.getAttribute("name"),b=c.getAttribute("type");if(!d)return null;var d={name:d,kwArgs:{}},a=d.kwArgs;if(b){q.plot2d&&q.plot2d[b]&&(b=g._scopeName+"x.charting.plot2d."+b);var e=eval("("+b+")");e&&(a.type=e)}else b=g._scopeName+"x.charting.plot2d.Default";n(c,b,a);var b=eval("("+b+".prototype.baseParams)"),f;for(f in b)f in a||(e=c.getAttribute(f),a[f]=m.coerceType(b[f],null==e||"undefined"==typeof e?
b[f]:e));return d};w=function(c){var d=c.getAttribute("plot"),b=c.getAttribute("type");d||(d="default");var d={plot:d,kwArgs:{}},a=d.kwArgs;if(b){q.action2d[b]&&(b=g._scopeName+"x.charting.action2d."+b);var e=eval("("+b+")");if(!e)return null;d.action=e}else return null;n(c,b,a);return d};x=function(c){c=h.partial(y.get,c);var d=c("name");if(!d)return null;var d={name:d,kwArgs:{}},b=d.kwArgs,a;a=c("plot");null!=a&&(b.plot=a);a=c("marker");null!=a&&(b.marker=a);a=c("stroke");null!=a&&(b.stroke=eval("("+
a+")"));a=c("outline");null!=a&&(b.outline=eval("("+a+")"));a=c("shadow");null!=a&&(b.shadow=eval("("+a+")"));a=c("fill");null!=a&&(b.fill=eval("("+a+")"));a=c("font");null!=a&&(b.font=a);a=c("fontColor");null!=a&&(b.fontColor=eval("("+a+")"));a=c("legend");null!=a&&(b.legend=a);a=c("data");if(null!=a)return d.type="data",d.data=a?r.map(String(a).split(","),Number):[],d;a=c("array");if(null!=a)return d.type="data",d.data=eval("("+a+")"),d;a=c("store");if(null!=a){d.type="store";d.data=eval("("+a+
")");a=c("field");d.field=null!=a?a:"value";if(a=c("query"))b.query=a;if(a=c("queryOptions"))b.queryOptions=eval("("+a+")");if(a=c("start"))b.start=Number(a);if(a=c("count"))b.count=Number(a);if(a=c("sort"))b.sort=eval("("+a+")");if(a=c("valueFn"))b.valueFn=C.lambda(a);return d}return null};l=s(t("dojo-bidi")?"dojox.charting.widget.NonBidiChart":"dojox.charting.widget.Chart",l,{theme:null,margins:null,stroke:void 0,fill:void 0,buildRendering:function(){this.inherited(arguments);var c=this.domNode,
d=k("\x3e .axis",c).map(u).filter(p),b=k("\x3e .plot",c).map(v).filter(p),a=k("\x3e .action",c).map(w).filter(p),e=k("\x3e .series",c).map(x).filter(p);c.innerHTML="";var f=this.chart=new z(c,{margins:this.margins,stroke:this.stroke,fill:this.fill,textDir:this.textDir});this.theme&&f.setTheme(this.theme);d.forEach(function(a){f.addAxis(a.name,a.kwArgs)});b.forEach(function(a){f.addPlot(a.name,a.kwArgs)});this.actions=a.map(function(a){return new a.action(f,a.plot,a.kwArgs)});B.foldl(e,function(a,
b){if("data"==b.type)f.addSeries(b.name,b.data,b.kwArgs),a=!0;else{f.addSeries(b.name,[0],b.kwArgs);var c={};m.updateWithPattern(c,b.kwArgs,{query:"",queryOptions:null,start:0,count:1},!0);b.kwArgs.sort&&(c.sort=h.clone(b.kwArgs.sort));h.mixin(c,{onComplete:function(a){if("valueFn"in b.kwArgs){var c=b.kwArgs.valueFn;a=r.map(a,function(a){return c(b.data.getValue(a,b.field,0))})}else a=r.map(a,function(a){return b.data.getValue(a,b.field,0)});f.addSeries(b.name,a,b.kwArgs).render()}});b.data.fetch(c)}return a},
!1)&&f.render()},destroy:function(){this.chart.destroy();this.inherited(arguments)},resize:function(c){this.chart.resize.apply(this.chart,arguments)}});return t("dojo-bidi")?s("dojox.charting.widget.Chart",[l,A]):l});