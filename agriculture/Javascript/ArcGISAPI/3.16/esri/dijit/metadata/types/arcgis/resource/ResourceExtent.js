// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.16/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/dijit/metadata/types/arcgis/resource/templates/ResourceExtent.html":'\x3cdiv data-dojo-attach-point\x3d"containerNode"\x3e\r\n\r\n  \x3c!-- resource extent --\x3e\r\n  \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/arcgis/form/ExtentElement"\r\n    data-dojo-props\x3d"target:\'dataExt\',minOccurs:0,maxOccurs:\'unbounded\',label:\'${i18nArcGIS.resource.dataExt}\'"\x3e\r\n    \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/arcgis/extent/ExtentElements"\x3e\x3c/div\x3e\r\n  \x3c/div\x3e  \r\n  \r\n\x3c/div\x3e'}});
define("esri/dijit/metadata/types/arcgis/resource/ResourceExtent","dojo/_base/declare dojo/_base/lang dojo/has ../../../../../kernel ../../../base/Descriptor dojo/text!./templates/ResourceExtent.html ../form/ExtentElement ../extent/ExtentElements".split(" "),function(a,b,c,d,e,f){a=a(e,{templateString:f});c("extend-esri")&&b.setObject("dijit.metadata.types.arcgis.resource.ResourceExtent",a,d);return a});