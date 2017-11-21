//>>built
define("dojox/grid/enhanced/_PluginManager","dojo/_base/kernel dojo/_base/lang dojo/_base/declare dojo/_base/array dojo/_base/connect ./_Events ./_FocusManager ../util".split(" "),function(r,e,n,h,l,p,q,m){var k=n("dojox.grid.enhanced._PluginManager",null,{_options:null,_plugins:null,_connects:null,constructor:function(a){this.grid=a;this._store=a.store;this._options={};this._plugins=[];this._connects=[];this._parseProps(this.grid.plugins);a.connect(a,"_setStore",e.hitch(this,function(a){this._store!==
a&&(this.forEach("onSetStore",[a,this._store]),this._store=a)}))},startup:function(){this.forEach("onStartUp")},preInit:function(){this.grid.focus.destroy();this.grid.focus=new q(this.grid);new p(this.grid);this._init(!0);this.forEach("onPreInit")},postInit:function(){this._init(!1);h.forEach(this.grid.views.views,this._initView,this);this._connects.push(l.connect(this.grid.views,"addView",e.hitch(this,this._initView)));if(0<this._plugins.length){var a=this.grid.edit;a&&(a.styleRow=function(a){})}this.forEach("onPostInit")},
forEach:function(a,b){h.forEach(this._plugins,function(c){c&&c[a]&&c[a].apply(c,b?b:[])})},_parseProps:function(a){if(a){var b,c={},d=this._options,f=this.grid,g=k.registry;for(b in a)a[b]&&this._normalize(b,a,g,c);d.dnd&&(d.columnReordering=!1);e.mixin(f,d)}},_normalize:function(a,b,c,d){if(!c[a])throw Error("Plugin "+a+" is required.");if(d[a])throw Error("Recursive cycle dependency is not supported.");var f=this._options;if(f[a])return f[a];d[a]=!0;f[a]=e.mixin({},c[a],e.isObject(b[a])?b[a]:{});
var g=f[a].dependency;g&&(e.isArray(g)||(g=f[a].dependency=[g]),h.forEach(g,function(a){if(!this._normalize(a,b,c,d))throw Error("Plugin "+a+" is required.");},this));delete d[a];return f[a]},_init:function(a){var b,c,d=this._options;for(b in d)c=d[b].preInit,(a?c:!c)&&(d[b]["class"]&&!this.pluginExisted(b))&&this.loadPlugin(b)},loadPlugin:function(a){var b=this._options[a];if(!b)return null;if(a=this.getPlugin(a))return a;h.forEach(b.dependency,function(a){if(!this.loadPlugin(a))throw Error("Plugin "+
a+" is required.");},this);a=b["class"];delete b["class"];a=(new this.getPluginClazz(a))(this.grid,b);this._plugins.push(a);return a},_initView:function(a){a&&(m.funnelEvents(a.contentNode,a,"doContentEvent",["mouseup","mousemove"]),m.funnelEvents(a.headerNode,a,"doHeaderEvent",["mouseup"]))},pluginExisted:function(a){return!!this.getPlugin(a)},getPlugin:function(a){var b=this._plugins;a=a.toLowerCase();for(var c=0,d=b.length;c<d;c++)if(a==b[c].name.toLowerCase())return b[c];return null},getPluginClazz:function(a){if(e.isFunction(a))return a;
var b='Please make sure Plugin "'+a+'" is existed.';try{var c=e.getObject(a);if(!c)throw Error(b);return c}catch(d){throw Error(b);}},isFixedCell:function(a){return a&&(a.isRowSelector||a.fixedPos)},destroy:function(){h.forEach(this._connects,l.disconnect);this.forEach("destroy");this.grid.unwrap&&this.grid.unwrap();delete this._connects;delete this._plugins;delete this._options}});k.registerPlugin=function(a,b){if(a){var c=k;c.registry=c.registry||{};c.registry[a.prototype.name]=e.mixin({"class":a},
b?b:{})}else console.warn("Failed to register plugin, class missed!")};return k});