//>>built
define("dstore/legacy/StoreAdapter","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/when ../Store ../QueryResults".split(" "),function(h,b,m,g,q,r){b=function(a){return function(){var c=this.objectStore;return c[a].apply(c,arguments)}};return h(q,{objectStore:null,get:function(){var a=this,c=this.objectStore;return g(c.get.apply(c,arguments),function(c){return a._restore(c)})},put:b("put"),add:b("add"),remove:b("remove"),getIdentity:b("getIdentity"),_setIdentity:function(a,c){return a[this.objectStore.idProperty]=
c},fetch:function(){return this.fetchRange()},fetchRange:function(a){function c(a){for(var b=0;b<a.length;b++){var d=a[b],e=d.type,d=d.args;if("and"===e)c(d);else if("eq"===e||"match"===e)k[d[0]]=d[1];else if("string"===e)k=d[0];else if(e)throw Error('"'+e+" operator can not be converted to a legacy store query");}}var b={},h=this.queryLog,n=function(a){return m.map(m.filter(h,function(b){return b.type===a}),function(a){return a.normalizedArguments[0]})},f=n("sort").pop();if(f&&(b.sort=f,f instanceof
Array))for(var l=0;l<f.length;l++){var p=f[l];p.attribute=p.property}a&&(b.count=a.end-((b.start=a.start)||0));var k={};c(n("filter"));return(a=this.objectStore.query(k,b))?new r(g(a.map(this._restore,this)),{totalLength:g(a.total)}):g(a)}})});