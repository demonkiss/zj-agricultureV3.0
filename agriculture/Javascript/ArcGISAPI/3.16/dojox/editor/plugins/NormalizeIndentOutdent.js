//>>built
define("dojox/editor/plugins/NormalizeIndentOutdent",["dojo","dijit","dojox","dijit/_editor/_Plugin","dojo/_base/declare"],function(g,k,n,m){var l=g.declare("dojox.editor.plugins.NormalizeIndentOutdent",m,{indentBy:40,indentUnits:"px",setEditor:function(a){this.editor=a;a._indentImpl=g.hitch(this,this._indentImpl);a._outdentImpl=g.hitch(this,this._outdentImpl);a._indentoutdent_queryCommandEnabled||(a._indentoutdent_queryCommandEnabled=a.queryCommandEnabled);a.queryCommandEnabled=g.hitch(this,this._queryCommandEnabled);
a.customUndo=!0},_queryCommandEnabled:function(a){var c=a.toLowerCase(),b,e,d,f="marginLeft";this._isLtr()||(f="marginRight");if("indent"===c){if(c=this.editor,(b=k.range.getSelection(c.window))&&0<b.rangeCount){b=b.getRangeAt(0);for(e=b.startContainer;e&&e!==c.document&&e!==c.editNode;){d=this._getTagName(e);if("li"===d){for(a=e.previousSibling;a&&1!==a.nodeType;)a=a.previousSibling;return a&&"li"===this._getTagName(a)?!0:!1}if(this._isIndentableElement(d))return!0;e=e.parentNode}if(this._isRootInline(b.startContainer))return!0}}else if("outdent"===
c){if(c=this.editor,(b=k.range.getSelection(c.window))&&0<b.rangeCount){b=b.getRangeAt(0);for(e=b.startContainer;e&&e!==c.document&&e!==c.editNode;){d=this._getTagName(e);if("li"===d)return this.editor._indentoutdent_queryCommandEnabled(a);if(this._isIndentableElement(d)){if(a=e.style?e.style[f]:"")if(a=this._convertIndent(a),1<=a/this.indentBy)return!0;return!1}e=e.parentNode}this._isRootInline(b.startContainer)}}else return this.editor._indentoutdent_queryCommandEnabled(a);return!1},_indentImpl:function(a){a=
this.editor;var c=k.range.getSelection(a.window);if(c&&0<c.rangeCount){var c=c.getRangeAt(0),b=c.startContainer,e,d;if(c.startContainer===c.endContainer)if(this._isRootInline(c.startContainer)){for(b=c.startContainer;b&&b.parentNode!==a.editNode;)b=b.parentNode;for(;b&&b.previousSibling&&(this._isTextElement(b)||1===b.nodeType&&this._isInlineFormat(this._getTagName(b)));)b=b.previousSibling;b&&(1===b.nodeType&&!this._isInlineFormat(this._getTagName(b)))&&(b=b.nextSibling);if(b){d=a.document.createElement("div");
g.place(d,b,"after");d.appendChild(b);for(e=d.nextSibling;e&&(this._isTextElement(e)||1===e.nodeType&&this._isInlineFormat(this._getTagName(e)));)d.appendChild(e),e=d.nextSibling;this._indentElement(d);a._sCall("selectElementChildren",[d]);a._sCall("collapse",[!0])}}else for(;b&&b!==a.document&&b!==a.editNode;){c=this._getTagName(b);if("li"===c){this._indentList(b);break}else if(this._isIndentableElement(c)){this._indentElement(b);break}b=b.parentNode}else{var f,b=c.startContainer;for(e=c.endContainer;b&&
this._isTextElement(b)&&b.parentNode!==a.editNode;)b=b.parentNode;for(;e&&this._isTextElement(e)&&e.parentNode!==a.editNode;)e=e.parentNode;if(e===a.editNode||e===a.document.body){for(f=b;f.nextSibling&&a._sCall("inSelection",[f]);)f=f.nextSibling;e=f;if(e===a.editNode||e===a.document.body){c=this._getTagName(b);if("li"===c)this._indentList(b);else if(this._isIndentableElement(c))this._indentElement(b);else if(this._isTextElement(b)||this._isInlineFormat(c)){d=a.document.createElement("div");g.place(d,
b,"after");for(a=b;a&&(this._isTextElement(a)||1===a.nodeType&&this._isInlineFormat(this._getTagName(a)));)d.appendChild(a),a=d.nextSibling;this._indentElement(d)}return}}e=e.nextSibling;for(f=b;f&&f!==e;){if(1===f.nodeType){c=this._getTagName(f);if(g.isIE&&"p"===c&&this._isEmpty(f)){f=f.nextSibling;continue}"li"===c?(d&&(this._isEmpty(d)?d.parentNode.removeChild(d):this._indentElement(d),d=null),this._indentList(f)):!this._isInlineFormat(c)&&this._isIndentableElement(c)?(d&&(this._isEmpty(d)?d.parentNode.removeChild(d):
this._indentElement(d),d=null),f=this._indentElement(f)):this._isInlineFormat(c)&&(d||(d=a.document.createElement("div"),g.place(d,f,"after")),d.appendChild(f),f=d)}else this._isTextElement(f)&&(d||(d=a.document.createElement("div"),g.place(d,f,"after")),d.appendChild(f),f=d);f=f.nextSibling}d&&(this._isEmpty(d)?d.parentNode.removeChild(d):this._indentElement(d))}}},_indentElement:function(a){var c="marginLeft";this._isLtr()||(c="marginRight");var b=this._getTagName(a);if("ul"===b||"ol"===b)b=this.editor.document.createElement("div"),
g.place(b,a,"after"),b.appendChild(a),a=b;(b=a.style?a.style[c]:"")?(b=this._convertIndent(b),b=parseInt(b,10)+this.indentBy+this.indentUnits):b=this.indentBy+this.indentUnits;g.style(a,c,b);return a},_outdentElement:function(a){var c="marginLeft";this._isLtr()||(c="marginRight");var b=a.style?a.style[c]:"";b&&(b=this._convertIndent(b),b=0<b-this.indentBy?parseInt(b,10)-this.indentBy+this.indentUnits:"",g.style(a,c,b))},_outdentImpl:function(a){var c=this.editor,b=k.range.getSelection(c.window);if(b&&
0<b.rangeCount){var b=b.getRangeAt(0),e=b.startContainer;if(b.startContainer===b.endContainer){for(;e&&e!==c.document&&e!==c.editNode;){b=this._getTagName(e);if("li"===b)return this._outdentList(e);if(this._isIndentableElement(b))return this._outdentElement(e);e=e.parentNode}c.document.execCommand("outdent",!1,a)}else{c=b.startContainer;for(a=b.endContainer;c&&3===c.nodeType;)c=c.parentNode;for(;a&&3===a.nodeType;)a=a.parentNode;for(a=a.nextSibling;c&&c!==a;)1===c.nodeType&&(b=this._getTagName(c),
"li"===b?this._outdentList(c):this._isIndentableElement(b)&&this._outdentElement(c)),c=c.nextSibling}}return null},_indentList:function(a){for(var c=this.editor,b,e,d=a.parentNode,f=a.previousSibling;f&&1!==f.nodeType;)f=f.previousSibling;b=null;d=this._getTagName(d);"ol"===d?b="ol":"ul"===d&&(b="ul");if(b&&f&&"li"==f.tagName.toLowerCase()){if(f.childNodes)for(d=0;d<f.childNodes.length;d++){var h=f.childNodes[d];if(3===h.nodeType){if(g.trim(h.nodeValue)&&e)break}else if(1===h.nodeType&&!e)b===h.tagName.toLowerCase()&&
(e=h);else break}e?e.appendChild(a):(b=c.document.createElement(b),g.style(b,{paddingTop:"0px",paddingBottom:"0px"}),e=c.document.createElement("li"),g.style(e,{listStyleImage:"none",listStyleType:"none"}),f.appendChild(b),b.appendChild(a));c._sCall("selectElementChildren",[a]);c._sCall("collapse",[!0])}},_outdentList:function(a){var c=this.editor,b=a.parentNode,e=null,d=b.tagName?b.tagName.toLowerCase():"";"ol"===d?e="ol":"ul"===d&&(e="ul");var d=b.parentNode,f=this._getTagName(d);if("li"===f||"ol"===
f||"ul"===f){if("ol"===f||"ul"===f){for(d=b.previousSibling;d&&(1!==d.nodeType||1===d.nodeType&&"li"!==this._getTagName(d));)d=d.previousSibling;if(d)d.appendChild(b);else{for(f=d=a;d.previousSibling;)d=d.previousSibling,1===d.nodeType&&"li"===this._getTagName(d)&&(f=d);f!==a?(g.place(f,b,"before"),f.appendChild(b),d=f):(d=c.document.createElement("li"),g.place(d,b,"before"),d.appendChild(b));g.style(b,{paddingTop:"0px",paddingBottom:"0px"})}}for(f=a.previousSibling;f&&1!==f.nodeType;)f=f.previousSibling;
for(var h=a.nextSibling;h&&1!==h.nodeType;)h=h.nextSibling;if(f){if(h){e=c.document.createElement(e);g.style(e,{paddingTop:"0px",paddingBottom:"0px"});for(a.appendChild(e);a.nextSibling;)e.appendChild(a.nextSibling)}g.place(a,d,"after")}else g.place(a,d,"after"),a.appendChild(b);b&&this._isEmpty(b)&&b.parentNode.removeChild(b);d&&this._isEmpty(d)&&d.parentNode.removeChild(d);c._sCall("selectElementChildren",[a]);c._sCall("collapse",[!0])}else c.document.execCommand("outdent",!1,null)},_isEmpty:function(a){if(a.childNodes){var c=
!0,b;for(b=0;b<a.childNodes.length;b++){var e=a.childNodes[b];if(1===e.nodeType){if("p"!==this._getTagName(e)||g.trim(e.innerHTML)){c=!1;break}}else if(this._isTextElement(e)){if((e=g.trim(e.nodeValue))&&"\x26nbsp;"!==e&&"\u00a0"!==e){c=!1;break}}else{c=!1;break}}return c}return!0},_isIndentableElement:function(a){switch(a){case "p":case "div":case "h1":case "h2":case "h3":case "center":case "table":case "ul":case "ol":return!0;default:return!1}},_convertIndent:function(a){a=(a+"").toLowerCase();
var c=0<a.indexOf("px")?"px":0<a.indexOf("em")?"em":"px";a=a.replace(/(px;?|em;?)/gi,"");"px"===c?"em"===this.indentUnits&&(a=Math.ceil(a/12)):"px"===this.indentUnits&&(a*=12);return a},_isLtr:function(){var a=g.getComputedStyle(this.editor.document.body);return a?"ltr"==a.direction:!0},_isInlineFormat:function(a){switch(a){case "a":case "b":case "strong":case "s":case "strike":case "i":case "u":case "em":case "sup":case "sub":case "span":case "font":case "big":case "cite":case "q":case "img":case "small":return!0;
default:return!1}},_getTagName:function(a){var c="";a&&1===a.nodeType&&(c=a.tagName?a.tagName.toLowerCase():"");return c},_isRootInline:function(a){var c=this.editor;if(this._isTextElement(a)&&a.parentNode===c.editNode||1===a.nodeType&&this._isInlineFormat(a)&&a.parentNode===c.editNode)return!0;if(this._isTextElement(a)&&this._isInlineFormat(this._getTagName(a.parentNode))){for(a=a.parentNode;a&&a!==c.editNode&&this._isInlineFormat(this._getTagName(a));)a=a.parentNode;if(a===c.editNode)return!0}return!1},
_isTextElement:function(a){return a&&3===a.nodeType||4===a.nodeType?!0:!1}});g.subscribe(k._scopeName+".Editor.getPlugin",null,function(a){!a.plugin&&"normalizeindentoutdent"===a.args.name.toLowerCase()&&(a.plugin=new l({indentBy:"indentBy"in a.args?0<a.args.indentBy?a.args.indentBy:40:40,indentUnits:"indentUnits"in a.args?"em"==a.args.indentUnits.toLowerCase()?"em":"px":"px"}))});return l});