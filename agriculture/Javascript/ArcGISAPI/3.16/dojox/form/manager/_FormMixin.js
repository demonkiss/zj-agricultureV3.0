//>>built
define("dojox/form/manager/_FormMixin","dojo/_base/lang dojo/_base/kernel dojo/_base/event dojo/window ./_Mixin dojo/_base/declare".split(" "),function(g,l,e,h,m,k){var f=g.getObject("dojox.form.manager",!0).actionAdapter;return k("dojox.form.manager._FormMixin",null,{name:"",action:"",method:"",encType:"","accept-charset":"",accept:"",target:"",startup:function(){if(this.isForm="form"==this.domNode.tagName.toLowerCase())this.connect(this.domNode,"onreset","_onReset"),this.connect(this.domNode,"onsubmit",
"_onSubmit");this.inherited(arguments)},_onReset:function(a){var b={returnValue:!0,preventDefault:function(){this.returnValue=!1},stopPropagation:function(){},currentTarget:a.currentTarget,target:a.target};!1!==this.onReset(b)&&b.returnValue&&this.reset();e.stop(a);return!1},onReset:function(){return!0},reset:function(){this.inspectFormWidgets(f(function(a,b){b.reset&&b.reset()}));this.isForm&&this.domNode.reset();return this},_onSubmit:function(a){!1===this.onSubmit(a)&&e.stop(a)},onSubmit:function(){return this.isValid()},
submit:function(){this.isForm&&!1!==this.onSubmit()&&this.domNode.submit()},isValid:function(){for(var a in this.formWidgets){var b=!1;f(function(a,c){!c.get("disabled")&&(c.isValid&&!c.isValid())&&(b=!0)}).call(this,null,this.formWidgets[a].widget);if(b)return!1}return!0},validate:function(){var a=!0,b=this.formWidgets,e=!1,c;for(c in b)f(function(b,d){d._hasBeenBlurred=!0;var c=d.disabled||!d.validate||d.validate();!c&&!e&&(h.scrollIntoView(d.containerNode||d.domNode),d.focus(),e=!0);a=a&&c}).call(this,
null,b[c].widget);return a}})});