//>>built
define("dojox/charting/action2d/ChartAction",["dojo/_base/connect","dojo/_base/declare","./Base"],function(b,c,d){return c("dojox.charting.action2d.ChartAction",d,{constructor:function(a,b){},connect:function(){for(var a=0;a<this._listeners.length;++a)this._listeners[a].handle=b.connect(this.chart.node,this._listeners[a].eventName,this,this._listeners[a].methodName)},disconnect:function(){for(var a=0;a<this._listeners.length;++a)b.disconnect(this._listeners[a].handle),delete this._listeners[a].handle}})});