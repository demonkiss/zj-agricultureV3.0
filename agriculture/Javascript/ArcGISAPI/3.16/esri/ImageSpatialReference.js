// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.16/esri/copyright.txt for details.
//>>built
define("esri/ImageSpatialReference","dojo/_base/declare dojo/_base/lang dojo/has ./kernel ./lang ./SpatialReference".split(" "),function(d,e,f,g,h,k){d=d(k,{declaredClass:"esri.ImageSpatialReference",constructor:function(a){a&&(e.isObject(a)&&e.mixin(this,a),this.url||console.error("ImageSpatialReference: must provide image service URL."))},icsid:null,ics:null,_isWebMercator:function(){return!1},_isWrappable:function(){return!1},equals:function(a){var b=!1;a&&(this.icsid&&a.icsid?b=this.icsid===a.icsid:
this.ics&&a.ics&&(b=this.ics===a.ics));return b},toJson:function(a){var b=null,c=h.isDefined;a=c(a)?a:!0;c(this.icsid)?b={icsid:this.icsid}:c(this.ics)&&(b={ics:this.ics});c(this.url)&&(c(b)&&a)&&(b.url=this.url);return b}});f("extend-esri")&&(g.ImageSpatialReference=d);return d});