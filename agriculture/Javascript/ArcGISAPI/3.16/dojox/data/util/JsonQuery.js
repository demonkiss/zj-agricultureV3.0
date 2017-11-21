//>>built
define("dojox/data/util/JsonQuery",["dojo","dojox"],function(k,g){return k.declare("dojox.data.util.JsonQuery",null,{useFullIdInQueries:!1,_toJsonQuery:function(a,b){function g(b,e){var d=e.__id;if(d){var c={};c[l.idAttribute]=l.useFullIdInQueries?e.__id:e[l.idAttribute];e=c}for(var m in e){var c=e[m],n=b+(/^[a-zA-Z_][\w_]*$/.test(m)?"."+m:"["+k._escapeString(m)+"]");c&&"object"==typeof c?g(n,c):"*"!=c&&(h+=(f?"":"\x26")+n+(!d&&"string"==typeof c&&a.queryOptions&&a.queryOptions.ignoreCase?"~":"\x3d")+
(l.simplifiedQuery?encodeURIComponent(c):k.toJson(c)),f=!1)}}var f=!0,l=this;if(a.query&&"object"==typeof a.query){var h="[?(";g("@",a.query);h=f?"":h+")]";a.queryStr=h.replace(/\\"|"/g,function(a){return'"'==a?"'":a})}else if(!a.query||"*"==a.query)a.query="";var d=a.sort;if(d){a.queryStr=a.queryStr||("string"==typeof a.query?a.query:"");f=!0;for(i=0;i<d.length;i++)a.queryStr+=(f?"[":",")+(d[i].descending?"\\":"/")+"@["+k._escapeString(d[i].attribute)+"]",f=!1;a.queryStr+="]"}if(b&&(a.start||a.count))a.queryStr=
(a.queryStr||("string"==typeof a.query?a.query:""))+"["+(a.start||"")+":"+(a.count?(a.start||0)+a.count:"")+"]";return"string"==typeof a.queryStr?(a.queryStr=a.queryStr.replace(/\\"|"/g,function(a){return'"'==a?"'":a}),a.queryStr):a.query},jsonQueryPagination:!0,fetch:function(a){this._toJsonQuery(a,this.jsonQueryPagination);return this.inherited(arguments)},isUpdateable:function(){return!0},matchesQuery:function(a,b){b._jsonQuery=b._jsonQuery||g.json.query(this._toJsonQuery(b));return b._jsonQuery([a]).length},
clientSideFetch:function(a,b){a._jsonQuery=a._jsonQuery||g.json.query(this._toJsonQuery(a));return this.clientSidePaging(a,a._jsonQuery(b))},querySuperSet:function(a,b){return!a.query?b.query:this.inherited(arguments)}})});