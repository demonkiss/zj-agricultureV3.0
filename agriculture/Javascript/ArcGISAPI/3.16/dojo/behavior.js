/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/behavior","./_base/kernel ./_base/lang ./_base/array ./_base/connect ./query ./domReady".split(" "),function(d,g,m,h,n,l){d.deprecated("dojo.behavior","Use dojo/on with event delegation (on.selector())");d.behavior=new function(){function d(a,b){a[b]||(a[b]=[]);return a[b]}function k(a,b,f){var e={},c;for(c in a)"undefined"==typeof e[c]&&(f?f.call(b,a[c],c):b(a[c],c))}var l=0;this._behaviors={};this.add=function(a){k(a,this,function(b,a){var e=d(this._behaviors,a);"number"!=typeof e.id&&
(e.id=l++);var c=[];e.push(c);if(g.isString(b)||g.isFunction(b))b={found:b};k(b,function(a,b){d(c,b).push(a)})})};var p=function(a,b,f){g.isString(b)?"found"==f?h.publish(b,[a]):h.connect(a,f,function(){h.publish(b,arguments)}):g.isFunction(b)&&("found"==f?b(a):h.connect(a,f,b))};this.apply=function(){k(this._behaviors,function(a,b){n(b).forEach(function(b){var e=0,c="_dj_behavior_"+a.id;if("number"==typeof b[c]&&(e=b[c],e==a.length))return;for(var d;d=a[e];e++)k(d,function(a,c){g.isArray(a)&&m.forEach(a,
function(a){p(b,a,c)})});b[c]=a.length})})}};l(function(){d.behavior.apply()});return d.behavior});