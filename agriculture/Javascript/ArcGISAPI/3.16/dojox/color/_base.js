//>>built
define("dojox/color/_base",["../main","dojo/_base/lang","dojo/_base/Color","dojo/colors"],function(h,k,l,n){h=k.getObject("color",!0,h);h.Color=l;h.blend=l.blendColors;h.fromRgb=l.fromRgb;h.fromHex=l.fromHex;h.fromArray=l.fromArray;h.fromString=l.fromString;h.greyscale=n.makeGrey;k.mixin(h,{fromCmy:function(a,c,b){k.isArray(a)?(c=a[1],b=a[2],a=a[0]):k.isObject(a)&&(c=a.m,b=a.y,a=a.c);c=1-c/100;b=1-b/100;return new l({r:Math.round(255*(1-a/100)),g:Math.round(255*c),b:Math.round(255*b)})},fromCmyk:function(a,
c,b,d){k.isArray(a)?(c=a[1],b=a[2],d=a[3],a=a[0]):k.isObject(a)&&(c=a.m,b=a.y,d=a.b,a=a.c);c/=100;b/=100;d/=100;a=1-Math.min(1,a/100*(1-d)+d);c=1-Math.min(1,c*(1-d)+d);b=1-Math.min(1,b*(1-d)+d);return new l({r:Math.round(255*a),g:Math.round(255*c),b:Math.round(255*b)})},fromHsl:function(a,c,b){k.isArray(a)?(c=a[1],b=a[2],a=a[0]):k.isObject(a)&&(c=a.s,b=a.l,a=a.h);c/=100;for(b/=100;0>a;)a+=360;for(;360<=a;)a-=360;var d,e;120>a?(d=(120-a)/60,e=a/60,a=0):240>a?(d=0,e=(240-a)/60,a=(a-120)/60):(d=(a-240)/
60,e=0,a=(360-a)/60);d=2*c*Math.min(d,1)+(1-c);e=2*c*Math.min(e,1)+(1-c);a=2*c*Math.min(a,1)+(1-c);0.5>b?(d*=b,e*=b,a*=b):(d=(1-b)*d+2*b-1,e=(1-b)*e+2*b-1,a=(1-b)*a+2*b-1);return new l({r:Math.round(255*d),g:Math.round(255*e),b:Math.round(255*a)})}});h.fromHsv=function(a,c,b){k.isArray(a)?(c=a[1],b=a[2],a=a[0]):k.isObject(a)&&(c=a.s,b=a.v,a=a.h);360==a&&(a=0);c/=100;b/=100;var d,e,g;if(0==c)e=g=d=b;else{var f=a/60;a=Math.floor(f);var h=f-a,f=b*(1-c),m=b*(1-c*h);c=b*(1-c*(1-h));switch(a){case 0:d=
b;e=c;g=f;break;case 1:d=m;e=b;g=f;break;case 2:d=f;e=b;g=c;break;case 3:d=f;e=m;g=b;break;case 4:d=c;e=f;g=b;break;case 5:d=b,e=f,g=m}}return new l({r:Math.round(255*d),g:Math.round(255*e),b:Math.round(255*g)})};k.extend(l,{toCmy:function(){var a=1-this.g/255,c=1-this.b/255;return{c:Math.round(100*(1-this.r/255)),m:Math.round(100*a),y:Math.round(100*c)}},toCmyk:function(){var a,c,b,d=this.r/255;a=this.g/255;c=this.b/255;b=Math.min(1-d,1-a,1-c);a=(1-a-b)/(1-b);c=(1-c-b)/(1-b);return{c:Math.round(100*
((1-d-b)/(1-b))),m:Math.round(100*a),y:Math.round(100*c),b:Math.round(100*b)}},toHsl:function(){var a=this.r/255,c=this.g/255,b=this.b/255,d=Math.min(a,b,c),e=Math.max(a,c,b),g=e-d,f=0,h=0,d=(d+e)/2;0<d&&1>d&&(h=g/(0.5>d?2*d:2-2*d));0<g&&(e==a&&e!=c&&(f+=(c-b)/g),e==c&&e!=b&&(f+=2+(b-a)/g),e==b&&e!=a&&(f+=4+(a-c)/g),f*=60);return{h:f,s:Math.round(100*h),l:Math.round(100*d)}},toHsv:function(){var a=this.r/255,c=this.g/255,b=this.b/255,d=Math.min(a,b,c),e=Math.max(a,c,b),d=e-d,g=null,f=0==e?0:d/e;0==
f?g=0:(g=a==e?60*(c-b)/d:c==e?120+60*(b-a)/d:240+60*(a-c)/d,0>g&&(g+=360));return{h:g,s:Math.round(100*f),v:Math.round(100*e)}}});return h});