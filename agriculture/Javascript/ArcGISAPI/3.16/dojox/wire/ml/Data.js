//>>built
define("dojox/wire/ml/Data",["dijit","dojo","dojox","dojo/require!dijit/_Widget,dijit/_Container,dojox/wire/ml/util"],function(g,e,f){e.provide("dojox.wire.ml.Data");e.require("dijit._Widget");e.require("dijit._Container");e.require("dojox.wire.ml.util");e.declare("dojox.wire.ml.Data",[g._Widget,g._Container],{startup:function(){this._initializeProperties()},_initializeProperties:function(a){if(!this._properties||a)this._properties={};a=this.getChildren();for(var b in a){var d=a[b];d instanceof f.wire.ml.DataProperty&&
d.name&&this.setPropertyValue(d.name,d.getValue())}},getPropertyValue:function(a){return this._properties[a]},setPropertyValue:function(a,b){this._properties[a]=b}});e.declare("dojox.wire.ml.DataProperty",[g._Widget,g._Container],{name:"",type:"",value:"",_getValueAttr:function(){return this.getValue()},getValue:function(){var a=this.value;if(this.type)if("number"==this.type)a=parseInt(a);else if("boolean"==this.type)a="true"==a;else if("array"==this.type){var a=[],b=this.getChildren(),d;for(d in b){var c=
b[d];c instanceof f.wire.ml.DataProperty&&a.push(c.getValue())}}else if("object"==this.type)for(d in a={},b=this.getChildren(),b)c=b[d],c instanceof f.wire.ml.DataProperty&&c.name&&(a[c.name]=c.getValue());else if("element"==this.type)for(d in a=new f.wire.ml.XmlElement(a),b=this.getChildren(),b)c=b[d],c instanceof f.wire.ml.DataProperty&&c.name&&a.setPropertyValue(c.name,c.getValue());return a}})});