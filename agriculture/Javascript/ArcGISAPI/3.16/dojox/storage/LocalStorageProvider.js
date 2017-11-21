//>>built
define("dojox/storage/LocalStorageProvider",["dijit","dojo","dojox","dojo/require!dojox/storage/Provider,dojox/storage/manager"],function(h,d,f){d.provide("dojox.storage.LocalStorageProvider");d.require("dojox.storage.Provider");d.require("dojox.storage.manager");d.declare("dojox.storage.LocalStorageProvider",[f.storage.Provider],{store:null,initialize:function(){this.store=localStorage;this.initialized=!0;f.storage.manager.loaded()},isAvailable:function(){return"undefined"!=typeof localStorage},
put:function(a,b,c,e){this._assertIsValidKey(a);e=e||this.DEFAULT_NAMESPACE;this._assertIsValidNamespace(e);var g=this.getFullKey(a,e);b=d.toJson(b);try{this.store.setItem(g,b),c&&c(this.SUCCESS,a,null,e)}catch(f){c&&c(this.FAILED,a,f.toString(),e)}},get:function(a,b){this._assertIsValidKey(a);b=b||this.DEFAULT_NAMESPACE;this._assertIsValidNamespace(b);a=this.getFullKey(a,b);return d.fromJson(this.store.getItem(a))},getKeys:function(a){a=a||this.DEFAULT_NAMESPACE;this._assertIsValidNamespace(a);a=
"__"+a+"_";for(var b=[],c=0;c<this.store.length;c++){var e=this.store.key(c);this._beginsWith(e,a)&&(e=e.substring(a.length),b.push(e))}return b},clear:function(a){a=a||this.DEFAULT_NAMESPACE;this._assertIsValidNamespace(a);a="__"+a+"_";for(var b=[],c=0;c<this.store.length;c++)this._beginsWith(this.store.key(c),a)&&b.push(this.store.key(c));d.forEach(b,d.hitch(this.store,"removeItem"))},remove:function(a,b){b=b||this.DEFAULT_NAMESPACE;this._assertIsValidNamespace(b);this.store.removeItem(this.getFullKey(a,
b))},getNamespaces:function(){var a=[this.DEFAULT_NAMESPACE],b={};b[this.DEFAULT_NAMESPACE]=!0;for(var c=/^__([^_]*)_/,e=0;e<this.store.length;e++){var d=this.store.key(e);!0==c.test(d)&&(d=d.match(c)[1],"undefined"==typeof b[d]&&(b[d]=!0,a.push(d)))}return a},isPermanent:function(){return!0},getMaximumSize:function(){return f.storage.SIZE_NO_LIMIT},hasSettingsUI:function(){return!1},isValidKey:function(a){return null===a||void 0===a?!1:/^[0-9A-Za-z_-]*$/.test(a)},isValidNamespace:function(a){return null===
a||void 0===a?!1:/^[0-9A-Za-z-]*$/.test(a)},getFullKey:function(a,b){return"__"+b+"_"+a},_beginsWith:function(a,b){return b.length>a.length?!1:a.substring(0,b.length)===b},_assertIsValidNamespace:function(a){if(!1===this.isValidNamespace(a))throw Error("Invalid namespace given: "+a);},_assertIsValidKey:function(a){if(!1===this.isValidKey(a))throw Error("Invalid key given: "+a);}});f.storage.manager.register("dojox.storage.LocalStorageProvider",new f.storage.LocalStorageProvider)});