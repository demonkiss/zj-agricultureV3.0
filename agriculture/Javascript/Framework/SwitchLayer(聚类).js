﻿define(function () {
    return {
        switchLayer: switchLayer,
        addZJCityBorder: addZJCityBorder,
        addZJCityNumber: addZJCityNumber,
        getSearchSql: getSearchSql
    }
})
function clearHighLight() {
    tempLayer.clear();
    searchLayer.clear();
    map.infoWindow.hide();
    $("#searchList ul").html("");
    $("#searchList").hide();
}
function switchLayer() {
    let minzoom = 0;
    let midzoom = 0;
    let maxzoom = 0;
    require(["mapconfig"], function (mapconfig) {
        minzoom = mapconfig.minZoom;
        midzoom = mapconfig.midZoom
        maxzoom = mapconfig.maxZoom;
    })
    // alert(minzoom);
    //let Scale = map.getScale();
    //if (Scale > 60000) {
    //    //  lsLayer.hide();
    //    if (map.getLayer("ls")) {
    //        map.getLayer("ls").hide();
    //    }
    //    if (map.getLayer("clusters")) {
    //        map.getLayer("clusters").show();
    //    }
    //} else {
    //    if (map.getLayer("clusters")) {
    //        map.getLayer("clusters").hide();
    //    }
    //    if (map.getLayer("ls")) {
    //        map.getLayer("ls").show();
    //    }
    //}
    //   $(".esriPopup").hide();
    if (areaClick) {
        areaClick.remove();
    }
 //  map.infoWindow.hide();
    if (map.graphics) {
        map.graphics.clear();
    }
    $("#typeinfo").hide();
    total = 0;
    if (map.getLayer("ls")) {
        map.removeLayer(map.getLayer("ls"));
        
    }
    if ($("#map_ls")) {
        $("#map_ls").remove();
    }
   // searchLayer.clear();
    if (map.getLayer("clusters")) {
        map.removeLayer(map.getLayer("clusters"));
    }
    if (map.getLayer("cityLayer")) {
        map.removeLayer(map.getLayer("cityLayer"));
        map.removeLayer(map.getLayer("cityTextLayer"));
    }
    if (map.getLayer("borderLayer")) {
        map.removeLayer(map.getLayer("borderLayer"));
    }
    let zoomlevel = map.getZoom();
    if (zoomlevel <= minzoom) {
        clearHighLight();
        sssy = "浙江";
        $(".sel-fun button").text(sssy);
        $(".sel-fun button").append("<span class=\"caret\"></span>");
        ssqy = "";
        // addZJCityBorder();
       // getTotalNumber();
        addZJCityNumber();

    } else if (zoomlevel <= midzoom && zoomlevel > minzoom) {
        clearHighLight();
        $(".actionsPane").show();
        $(".next").show();
        $(".prev").show();
      //  $(".title").show();
        sssy = getCityName();
        ssqy = "";
        $(".sel-fun button").text(sssy);
        $(".sel-fun button").append("<span class=\"caret\"></span>");
        getCityBlockStatic();
        // getCityStaticNumber();
    }
    else if (zoomlevel <= maxzoom && zoomlevel > midzoom) {
        clearHighLight();
        //mapPanEvt = map.on("pan-end", function () {
        //  // switchLayer();
        //    getCityName();
        //})
        $(".actionsPane").show();
        $(".next").show();
        $(".prev").show();
       // $(".title").show();
        sssy = getCityName();
        ssqy = "";
        $(".sel-fun button").text(sssy);
        $(".sel-fun button").append("<span class=\"caret\"></span>");
        getCenterBlockName();
        if (clusterType[0] == "建设分布图") {
            getCityCluster(sssy);//获取建设分布图的聚类图层
            //showClusterData.push(ClusterData);
        } else {
            getClusterData(clusterType, currentattr);//添加聚类图层
        }


        //  console.log(clusterImg[0]);
        if (showClusterData.length) {
            addMultiClusters(showClusterData);
            // addClusters(showClusterData[0]);
            var number = 0;
            for (let k = 0; k < showClusterData.length; k++) {
                number += showClusterData[k].length
            }
           // alert();
            $("#total").text(number);
        }
        //  addBorder();
        addBlockBorder();

    } else if (zoomlevel > maxzoom) {

        // mapPanEvt = map.on("pan-end", function () {
        //    // switchLayer();
        //    getCityName();
        //})
        $(".actionsPane").hide();
        $(".next").hide();
        $(".prev").hide();
        $(".title").html("");
        sssy = getCityName();
        // ssqy = getBlockName();
        ssqy = getBlockName();
        $(".sel-fun button").text(ssqy);
        $(".sel-fun button").append("<span class=\"caret\"></span>");

//获取当前区域数据
        if (clusterType[0] == "建设分布图") {
            getCityCluster(sssy);//获取建设分布图的聚类图层
        } else {
            getClusterData(clusterType, currentattr);//添加聚类图层
        }
        if (showClusterData.length) {
            let number = 0;
            for (let k = 0; k < showClusterData.length; k++) {
                number += showClusterData[k].length
            }
            $("#total").text(number);
        } else {
            let number = 0;
            $("#total").text(number);
        }


        var ld = "";
        if (layerDType.length) {

            var ld = getLayerDefine(layerDType, currentattr);//添加矢量图层
            console.log(ld);

            addDynamicLayer(ld);
        }



    }

}
function getTypeNumber(city, attributeName,district) {
    typeNumber.length = 0;
    var number = 0;

    if (statisType[0] == "建设分布图") {

        for (let i = 0; i < ClusterData.length; i++) {
            if (district == ClusterData[i].attributes[attributeName]) {
                // cData.push(ClusterData[i]);
                number++;
            }        
        }
        let cData = {};
        cData.name = "建设分布图";
        cData.number = number;
        typeNumber.push(cData);
        // showClusterData.push(cData);
    } else {
        getStatisticsData(city, clusterType, currentattr);//获取统计数据
        for (let i = 0; i < statisticsData.length; i++) {
            // if (city == ClusterData[i].attributes["地市名称"]) {
            number += statisticsData[i].length;
            let cData = {};
            cData.name = statisType[i];
            cData.number = statisticsData[i].length;
            typeNumber.push(cData);
        }
    }



}


function getCityCluster(city) {
    showClusterData.length = 0;
    if (clusterType[0] == "建设分布图") {
        var cData = [];
        for (let i = 0; i < ClusterData.length; i++) {
            if (city == ClusterData[i].attributes["地市名称"]) {
                cData.push(ClusterData[i]);
                // number++;
            }

        }
        if (cData.length) {
            showClusterData.push(cData);
        }

    }
}
function getCityParam(city, attributeName) {
    let number = 0;
    if (clusterType[0] == "建设分布图") {
        var cData;
        if (ssqy != "") {
            for (let i = 0; i < ClusterData.length; i++) {

                if (ssqy == ClusterData[i].attributes[attributeName]) {
                    // cData.push(ClusterData[i]);
                    number++;
                }
            }
        } else {
            for (let i = 0; i < ClusterData.length; i++) {
                if (city == ClusterData[i].attributes["地市名称"]) {
                    // cData.push(ClusterData[i]);
                    number++;
                }
            }
        }
        // showClusterData.push(cData);
    } else {
        getStatisticsData(city, clusterType, currentattr);//获取统计数据
        for (let i = 0; i < statisticsData.length; i++) {
            // if (city == ClusterData[i].attributes["地市名称"]) {
            number += statisticsData[i].length;

        }
    }

    //for (let i = 0; i < statisticsData.length; i++) {
    //    // if (city == ClusterData[i].attributes["地市名称"]) {
    //    number += statisticsData[i].length;

    //}
    return number;
}
//获取城市区界统计
function getCityBlockStatic() {
    var _block = "";
    blockNumber.length = 0;
    require(["Javascript/config/cityCode.js"], function (cityCode) {
        //   var ccode = eval('(' + cityCode + ')');
        var cityname = sssy.replace("\"", "");
        var url = "Json/city/" + cityCode.citycode[cityname] + ".json";
        console.log(url);
        $.ajax({
            url: url,
            dataType: 'json',
            type: "GET",
            async: false,
            data: {},
            success: function (data) {
                require(["esri/layers/GraphicsLayer", "esri/geometry/Point", "esri/geometry/Polyline", "esri/geometry/Polygon", "esri/symbols/PictureMarkerSymbol", "esri/Color", "esri/graphic", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/symbols/TextSymbol",
              "esri/symbols/Font"], function (GraphicsLayer,Point, Polyline, Polygon, PictureMarkerSymbol, Color, Graphic, SimpleLineSymbol, SimpleFillSymbol, TextSymbol, Font) {
                  var cityLayer = new GraphicsLayer({ id: "cityLayer" });
                  var cityTextLayer = new GraphicsLayer({ id: "cityTextLayer" });
                  let centerPoint = [(map.extent.xmax + map.extent.xmin) / 2.0, (map.extent.ymax + map.extent.ymin) / 2.0];
                  var extent="";
                  for (let i = 0; i < data.features.length; i++) {
                      var geometry = data.features[i].geometry;
                     
                      var sls = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 255, 0]), 2);
                      if (geometry.type == "MultiPolygon") {
                          var length = geometry.coordinates.length;
                          for (var k = 0; k< length; k++) {
                              var polylineJson = {
                                  "paths": geometry.coordinates[k],
                                  "spatialReference": { "wkid": 4326 }
                              };
                              var polyline = new Polyline(polylineJson);
                              extent = polyline.getExtent();
                              var graphic = new Graphic(polyline, sls);
                              cityLayer.add(graphic);
                          }
                      }
                      else {
                          var polylineJson = {
                              "paths": geometry.coordinates,
                              "spatialReference": { "wkid": 4326 }
                          };
                          var polyline = new Polyline(polylineJson);
                          extent = polyline.getExtent();
                          var graphic = new Graphic(polyline, sls);
                          cityLayer.add(graphic);
                      }
                      var qxName = data.features[i].properties.name;
                      var point = new Point(data.features[i].properties.cp);
                      ssqy = qxName;
                      var blockCityNumber = getCityParam(sssy, "县市区名称");
                      var showLabel = qxName + "   " + blockCityNumber;
                      var attr = { "name": qxName, "number": blockCityNumber };
                      blockNumber.push(attr);
                      var font = new Font();
                      font.setSize("10pt");
                      font.setFamily("微软雅黑");
                      // font.setWeight(Font.WEIGHT_BOLD);
                      //  textSymbol.setFont(font);                     
                     // var point = extent.getCenter();
                      var defaultSymbol = new PictureMarkerSymbol("./images/orangetips.png", 120, 40).setOffset(0, 0);
                      cityTextLayer.add(
                        new Graphic(
                          point,
                          defaultSymbol,
                          attr
                        )
                      );

                      var label = new TextSymbol(showLabel)
                        .setColor(new Color([255, 255, 255]), 0.5)
                      .setFont(font);
                      cityTextLayer.add(
                        new Graphic(
                          point,
                          label,
                          attr
                        )
                      );
                      total += blockCityNumber;
                      // map.setExtent(extent, true);                    
                      //  map.disableScrollWheelZoom();
                  }
                  // map.addLayer(cityLayer);
                  map.addLayer(cityLayer);
                  map.addLayer(cityTextLayer);
                //  alert(2)
                  $("#total").text(total);
                  var cityTextClick = cityTextLayer.on("mouse-over", function (e) {
                      //get the associated node info when the graphic is clicked
                      currentGraphic = e.graphic;
                      var screenP = map.toScreen(e.graphic.geometry);
                      $("#typeinfo").html("");
                      ssqy = e.graphic.attributes["name"];
                      getTypeNumber(sssy, "县市区名称",ssqy);
                      var html = ""
                      for (let i = 0; i < typeNumber.length; i++) {
                          html += "<span>" + typeNumber[i].name + ":" + typeNumber[i].number + "</span></br>"
                      }
                      $("#typeinfo").append(html);
                      $("#typeinfo").css("left", screenP.x);
                      $("#typeinfo").css("top", screenP.y);
                      if (html) {
                          $("#typeinfo").show();
                      }
                    
                      map.setMapCursor("pointer");
                  })
                  var cityTextClick = cityTextLayer.on("mouse-out", function (e) {
                      //get the associated node info when the graphic is clicked
                      $("#typeinfo").hide();
                      map.setMapCursor("default");

                  })

              }


              )
            }

        })
    }
    )
}
//获取区界名称
function getBlockName() {
    if (map.graphics) {
        map.graphics.clear();
    }
    var _block = "";
    require(["Javascript/config/cityCode.js"], function (cityCode) {
        //   var ccode = eval('(' + cityCode + ')');
        var cityname = sssy.replace("\"", "");

        var url = "Json/city/" + cityCode.citycode[cityname] + ".json";
        console.log(url);
        $.ajax({
            url: url,
            dataType: 'json',
            type: "GET",
            async: false,
            data: {},
            success: function (data) {
                require(["esri/layers/GraphicsLayer", "esri/geometry/Point", "esri/geometry/Polygon", "esri/geometry/Polyline", "esri/symbols/PictureMarkerSymbol", "esri/Color", "esri/graphic", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/symbols/TextSymbol",
                          "esri/symbols/Font"],
                    function (GraphicsLayer,Point, Polygon, Polyline, PictureMarkerSymbol, Color, Graphic, SimpleLineSymbol, SimpleFillSymbol,TextSymbol, Font) {
                    var borderLayer = new GraphicsLayer({ id: "borderLayer" });
                    let centerPoint = [(map.extent.xmax + map.extent.xmin) / 2.0, (map.extent.ymax + map.extent.ymin) / 2.0];
                    for (let i = 0; i < data.features.length; i++) {
                        if (PointInsidePolygon(centerPoint, data.features[i].geometry.coordinates[0])) {
                            console.log(data.features[i].properties.name);
                            _block = data.features[i].properties.name;

                            var geometry = data.features[i].geometry;
                           // var extent;
                            var sls = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 255, 0]), 2);
                            if (geometry.type == "MultiPolygon") {
                                var length = geometry.coordinates.length;
                                for (var k = 0; k < length; k++) {
                                    var polylineJson = {
                                        "paths": geometry.coordinates[k],
                                        "spatialReference": { "wkid": 4326 }
                                    };
                                    var polyline = new Polyline(polylineJson);
                                   // extent = polyline.getExtent();
                                    var graphic = new Graphic(polyline, sls);
                                    borderLayer.add(graphic);
                                }
                            }
                            else {
                                var polylineJson = {
                                    "paths": geometry.coordinates,
                                    "spatialReference": { "wkid": 4326 }
                                };
                                var polyline = new Polyline(polylineJson);
                              //  extent = polyline.getExtent();
                                var graphic = new Graphic(polyline, sls);
                                borderLayer.add(graphic);
                            }
                            
                              var point = new Point(centerPoint);
                              var font = new Font();
                              font.setSize("16pt");
                              font.setFamily("微软雅黑");
                              var label = new TextSymbol(_block)
                                  //  .setColor(new Color([255, 255, 255]), 0.5)
                                   .setColor(new Color(textColor))
                                  .setFont(font);
                              map.graphics.add(
                                new Graphic(
                                  point,
                                  label
                                )
                              );
                          
                            borderLayer.add(graphic);

                            map.addLayer(borderLayer);
                            break;
                        }


                    }


                })
            }

        });
    })


    return _block;
}
function getCenterBlockName(){
    if (map.graphics) {
        map.graphics.clear();
    }
    var _block = "";
    require(["Javascript/config/cityCode.js"], function (cityCode) {
        //   var ccode = eval('(' + cityCode + ')');
        var cityname = sssy.replace("\"", "");

        var url = "Json/city/" + cityCode.citycode[cityname] + ".json";
        console.log(url);
        $.ajax({
            url: url,
            dataType: 'json',
            type: "GET",
            async: false,
            data: {},
            success: function (data) {
                require(["esri/layers/GraphicsLayer", "esri/geometry/Point", "esri/geometry/Polygon", "esri/geometry/Polyline", "esri/symbols/PictureMarkerSymbol", "esri/Color", "esri/graphic", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/symbols/TextSymbol",
                          "esri/symbols/Font"],
                    function (GraphicsLayer, Point, Polygon, Polyline, PictureMarkerSymbol, Color, Graphic, SimpleLineSymbol, SimpleFillSymbol, TextSymbol, Font) {
                        let centerPoint = [(map.extent.xmax + map.extent.xmin) / 2.0, (map.extent.ymax + map.extent.ymin) / 2.0];
                        for (let i = 0; i < data.features.length; i++) {
                            var geometry = data.features[i].geometry;
                            if (geometry.type == "MultiPolygon") {
                                var length = geometry.coordinates.length;
                                for (var k = 0; k < length; k++) {
                                    var vec = geometry.coordinates[k][0];
                                    if (PointInsidePolygon(centerPoint, vec)) {
                                        console.log(data.features[i].properties.name);
                                        _block = data.features[i].properties.name;


                                        var point = new Point(centerPoint);
                                        var font = new Font();
                                        font.setSize("16pt");
                                        font.setFamily("微软雅黑");
                                        var label = new TextSymbol(_block)
                                             // .setColor(new Color([255, 255, 255]), 0.5)
                                             .setColor(new Color(textColor))
                                            .setFont(font);
                                        map.graphics.add(
                                          new Graphic(
                                            point,
                                            label
                                          )
                                        );

                                        break;
                                    }
                                }
                            }
                            else {
                                var vec = geometry.coordinates[0];
                                if (PointInsidePolygon(centerPoint, vec)) {
                                    console.log(data.features[i].properties.name);
                                    _block = data.features[i].properties.name;


                                    var point = new Point(centerPoint);
                                    var font = new Font();
                                    font.setSize("16pt");
                                    font.setFamily("微软雅黑");
                                    var label = new TextSymbol(_block)
                                        //  .setColor(new Color([255, 255, 255]), 0.5)
                                         .setColor(new Color(textColor))
                                        .setFont(font);
                                    map.graphics.add(
                                      new Graphic(
                                        point,
                                        label
                                      )
                                    );

                                    break;
                                }
                            }
                         


                        }


                    })
            }

        });
    })


    return _block;
}
function addBlockBorder() {
    var _block = "";
    require(["Javascript/config/cityCode.js"], function (cityCode) {
        //   var ccode = eval('(' + cityCode + ')');
        var cityname = sssy.replace("\"", "");

        var url = "Json/city/" + cityCode.citycode[cityname] + ".json";
        console.log(url);
        $.ajax({
            url: url,
            dataType: 'json',
            type: "GET",
            async: false,
            data: {},
            success: function (data) {
                require(["esri/layers/GraphicsLayer", "esri/geometry/Polygon", "esri/geometry/Polyline", "esri/symbols/PictureMarkerSymbol", "esri/Color", "esri/graphic", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol","esri/symbols/TextSymbol",
              "esri/symbols/Font"], function (GraphicsLayer, Polygon, Polyline, PictureMarkerSymbol, Color, Graphic, SimpleLineSymbol, SimpleFillSymbol, TextSymbol, Font) {
                    var borderLayer = new GraphicsLayer({ id: "borderLayer" });
                    let centerPoint = [(map.extent.xmax + map.extent.xmin) / 2.0, (map.extent.ymax + map.extent.ymin) / 2.0];
                    for (let i = 0; i < data.features.length; i++) {
                            _block = data.features[i].properties.name;
                            var geometry = data.features[i].geometry;
                            var extent;
                            var sls = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 255, 0]), 2);
                            if (geometry.type == "MultiPolygon") {
                                var length = geometry.coordinates.length;
                                for (var k = 0; k < length; k++) {
                                    var polylineJson = {
                                        "paths": geometry.coordinates[k],
                                        "spatialReference": { "wkid": 4326 }
                                    };
                                    var polyline = new Polyline(polylineJson);
                                    extent = polyline.getExtent();
                                    var graphic = new Graphic(polyline, sls);
                                    borderLayer.add(graphic);
                                }
                            }
                            else {
                                var polylineJson = {
                                    "paths": geometry.coordinates,
                                    "spatialReference": { "wkid": 4326 }
                                };
                                var polyline = new Polyline(polylineJson);
                                extent = polyline.getExtent();
                                var graphic = new Graphic(polyline, sls);
                                borderLayer.add(graphic);
                            }
                            borderLayer.add(graphic);
                    }
                    map.addLayer(borderLayer);

                })
            }

        });
    })


    return _block;
}
function getCityName() {
    if (map.graphics) {
        map.graphics.clear();
    }
    let _city = "杭州市";
    // let centerPoint = map.getExtent().getCenter();
    let centerPoint = [(map.extent.xmax + map.extent.xmin) / 2.0, (map.extent.ymax + map.extent.ymin) / 2.0];
    for (let i = 0; i < borderData.length; i++) {
        if (PointInsidePolygon(centerPoint, borderData[i].geometry.coordinates[0])) {
            console.log(borderData[i].properties.name);
            _city = borderData[i].properties.name;
            // alert(borderData[i].properties.name);
            //获取城市中心名称
            //require(["esri/layers/GraphicsLayer", "esri/geometry/Point", "esri/geometry/Polyline", "esri/geometry/Polygon", "esri/symbols/PictureMarkerSymbol", "esri/Color", "esri/graphic", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/symbols/TextSymbol",
            // "esri/symbols/Font"], function (GraphicsLayer, Point, Polyline, Polygon, PictureMarkerSymbol, Color, Graphic, SimpleLineSymbol, SimpleFillSymbol, TextSymbol, Font) {
            //     var point = new Point(centerPoint);
            //     var font = new Font();
            //     font.setSize("16pt");
            //     font.setFamily("微软雅黑");
            //     var label = new TextSymbol(_city)
            //           .setColor(new Color([0, 0, 0]), 0.5)
            //         .setFont(font);
            //     map.graphics.add(
            //       new Graphic(
            //         point,
            //         label                   
            //       )
            //     );
            // })
          

            break;
        }
    }

    return _city;
}
function PointInsidePolygon(point, vs) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

    var x = point[0], y = point[1];

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
};
//添加动态图层
function addDynamicLayer(layersql) {
    require(["esri/layers/ImageParameters", "esri/layers/ArcGISDynamicMapServiceLayer"], function (ImageParameters, ArcGISDynamicMapServiceLayer) {
        var imageParameters = new ImageParameters();
        //  imageParameters.layerIds = [0];
        imageParameters.layerIds = visiableArray;
        imageParameters.layerOption = ImageParameters.LAYER_OPTION_SHOW;
        imageParameters.transparent = true;

        var layerDefs = [];
       // layerDefs[visiableArray[0]] = layersql;
        layerDefs[visiableArray[0]] = "";
        imageParameters.layerDefinitions = layerDefs;
        //imageParameters.layerDefinitions = [layersql];

        var rmap = map.getLayer("ls");
        if (rmap) {
            map.removeLayer(rmap);
            if ($("#map_ls")) {
                $("#map_ls").remove();
            }
        }
        console.log(currenturl, visiableArray);
        //   currenturl= "http://localhost:6080/arcgis/rest/services/ls_2000/MapServer";
        var lslayer = new ArcGISDynamicMapServiceLayer(currenturl, { "imageParameters": imageParameters, "id": "ls", "opacity": 0.6 });
        map.addLayer(lslayer, 2);
        areaClick = map.on("click", function (e) {
            require(["Javascript/Framework/IdentifyTask.js"], function (Identify) {
                Identify.DoIdentify(e.mapPoint, currenturl, visiableArray)
            })
        })


        // alert(visiableArray);
        lslayer.setVisibleLayers(visiableArray);
        //lslayer.on("click", function () {

        //    console.log(e.graphic.attributes["name"]);

        //})
    })

}
//获取统计数值
function getStatisticsData(city, types, attr) {
    if (ClusterData) {
        // console.log(ClusterData);
        statisticsData.length = 0;
        if (attr != "认定面积") {
            for (var k = 0; k < types.length; k++) {
                var cdata = [];
                for (var i = 0; i < ClusterData.length; i++) {
                    if (types[k] == ClusterData[i].attributes[attr]) {
                        if (city == ClusterData[i].attributes["地市名称"]) {
                            // cdata.push(ClusterData[i]);
                            if (ssqy != "") {
                                if (ssqy == ClusterData[i].attributes["县市区名称"]) {
                                    cdata.push(ClusterData[i]);
                                }

                            } else {
                                cdata.push(ClusterData[i]);
                            }
                        }


                    }
                }
               // if (cdata.length) {
                    statisticsData.push(cdata);
            //    }
             //   else {
            //        $(".checks span").each(function () {
             //           if ($(this).text() == types[k]) {
                            // $(this).prev().attr("data-state", "uncheck");
                            //   $(this).prev().removeClass("active");

                            // clusterImg.remove($(this).prev().attr("src"));
                            //  clusterType.remove(types[k]);
                            // layerDType.remove("'" + types[k] + "'");
             //         }
              //      })
                    // alert("暂无数据");
             //   }

            }
        } else {
            for (var k = 0; k < types.length; k++) {
                var cdata = [];
                switch (types[k]) {
                    case "大于1000亩":
                        for (var i = 0; i < ClusterData.length; i++) {
                            if (ClusterData[i].attributes[attr] >= 1000) {
                                if (city == ClusterData[i].attributes["地市名称"]) {
                                    // cdata.push(ClusterData[i]);
                                    if (ssqy != "") {
                                        if (ssqy == ClusterData[i].attributes["县市区名称"]) {
                                            cdata.push(ClusterData[i]);
                                        }

                                    } else {
                                        cdata.push(ClusterData[i]);
                                    }
                                }
                                // cdata.push(ClusterData[i]);
                            }
                        }

                        break;
                    case "500~1000亩":
                        for (var i = 0; i < ClusterData.length; i++) {
                            if (ClusterData[i].attributes[attr] < 1000 && ClusterData[i].attributes[attr] >= 500) {
                                // cdata.push(ClusterData[i]);
                                if (city == ClusterData[i].attributes["地市名称"]) {
                                    // cdata.push(ClusterData[i]);
                                    if (ssqy != "") {
                                        if (ssqy == ClusterData[i].attributes["县市区名称"]) {
                                            cdata.push(ClusterData[i]);
                                        }

                                    } else {
                                        cdata.push(ClusterData[i]);
                                    }
                                }
                            }
                        }
                        break;
                    case "200~500亩":
                        for (var i = 0; i < ClusterData.length; i++) {
                            if (ClusterData[i].attributes[attr] < 500 && ClusterData[i].attributes[attr] >= 200) {
                                // cdata.push(ClusterData[i]);
                                if (city == ClusterData[i].attributes["地市名称"]) {
                                    // cdata.push(ClusterData[i]);
                                    if (ssqy != "") {
                                        if (ssqy == ClusterData[i].attributes["县市区名称"]) {
                                            cdata.push(ClusterData[i]);
                                        }

                                    } else {
                                        cdata.push(ClusterData[i]);
                                    }
                                }
                            }
                        }
                        break;
                    case "小于200亩":
                        for (var i = 0; i < ClusterData.length; i++) {
                            if (ClusterData[i].attributes[attr] < 200) {
                                // cdata.push(ClusterData[i]);
                                if (city == ClusterData[i].attributes["地市名称"]) {
                                    // cdata.push(ClusterData[i]);
                                    if (ssqy != "") {
                                        if (ssqy == ClusterData[i].attributes["县市区名称"]) {
                                            cdata.push(ClusterData[i]);
                                        }

                                    } else {
                                        cdata.push(ClusterData[i]);
                                    }
                                }
                            }
                        }
                        break;
                }
              //  if (cdata.length) {
                    statisticsData.push(cdata);
              //  }
                //} else {
                //    $(".checks span").each(function () {
                //        if ($(this).text() == types[k]) {
                //            $(this).prev().attr("data-state", "uncheck");
                //            $(this).prev().removeClass("active");
                //            clusterImg.remove($(this).prev().attr("src"));
                //            clusterType.remove(types[k]);
                //            layerDType.remove("'" + types[k] + "'");
                //        }
                //    })
                //    alert("暂无数据");
                //}
            }

            // if
        }

    }

    // console.log(showClusterData);


}

//function getItemData(attr) {

//    var cdata = [];
//    for (var i = 0; i < ClusterData.length; i++) {
//        if (ClusterData[i].attributes[attr].indexOf("农田")) {
//            if (sssy == ClusterData[i].attributes["地市名称"]) {
//                // cdata.push(ClusterData[i]);
//                if (ssqy != "") {
//                    if (ssqy == ClusterData[i].attributes["县市区名称"]) {
//                        cdata.push(ClusterData[i]);
//                    }

//                } else {
//                    cdata.push(ClusterData[i]);
//                }
//            }


//        }
//    }
//    if (cdata.length) {
//        showClusterData.push(cdata);
//    }
//    else {
//        $(".checks span").each(function () {
//            if ($(this).text() == types[k]) {
//                $(this).prev().attr("data-state", "uncheck");
//                $(this).prev().removeClass("active");

//                clusterImg.remove($(this).prev().attr("src"));
//                clusterType.remove(types[k]);
//                layerDType.remove("'" + types[k] + "'");
//            }
//        })
//        alert("暂无数据");
//    }


//}
//获取聚类数据
function getClusterData(types, attr) {
    if (ClusterData) {
        // console.log(ClusterData);
        showClusterData.length = 0;
        if (attr != "认定面积") {
            for (var k = 0; k < types.length; k++) {
                var cdata = [];
                for (var i = 0; i < ClusterData.length; i++) {
                    if (types[k] == ClusterData[i].attributes[attr]) {
                        if (sssy == ClusterData[i].attributes["地市名称"]) {
                            // cdata.push(ClusterData[i]);
                            if (ssqy != "") {
                                if (ssqy == ClusterData[i].attributes["县市区名称"]) {
                                    cdata.push(ClusterData[i]);
                                }

                            } else {
                                cdata.push(ClusterData[i]);
                            }
                        }


                    }
                }
                if (cdata.length) {
                    showClusterData.push(cdata);
                }
                else {
                    $(".checks span").each(function () {
                        if ($(this).text() == types[k]) {
                           // $(this).prev().attr("data-state", "uncheck");
                           // $(this).prev().removeClass("active");

                          //  clusterImg.remove($(this).prev().attr("src"));
                          //  clusterType.remove(types[k]);
                          //  layerDType.remove("'" + types[k] + "'");
                        }
                    })
                   // alert("暂无此类数据");
                }

            }
        } else {
            for (var k = 0; k < types.length; k++) {
                var cdata = [];
                switch (types[k]) {
                    case "大于1000亩":
                        for (var i = 0; i < ClusterData.length; i++) {
                            if (ClusterData[i].attributes[attr] >= 1000) {
                                if (sssy == ClusterData[i].attributes["地市名称"]) {
                                    // cdata.push(ClusterData[i]);
                                    if (ssqy != "") {
                                        if (ssqy == ClusterData[i].attributes["县市区名称"]) {
                                            cdata.push(ClusterData[i]);
                                        }

                                    } else {
                                        cdata.push(ClusterData[i]);
                                    }
                                }
                                // cdata.push(ClusterData[i]);
                            }
                        }

                        break;
                    case "500~1000亩":
                        for (var i = 0; i < ClusterData.length; i++) {
                            if (ClusterData[i].attributes[attr] < 1000 && ClusterData[i].attributes[attr] >= 500) {
                                // cdata.push(ClusterData[i]);
                                if (sssy == ClusterData[i].attributes["地市名称"]) {
                                    // cdata.push(ClusterData[i]);
                                    if (ssqy != "") {
                                        if (ssqy == ClusterData[i].attributes["县市区名称"]) {
                                            cdata.push(ClusterData[i]);
                                        }

                                    } else {
                                        cdata.push(ClusterData[i]);
                                    }
                                }
                            }
                        }
                        break;
                    case "200~500亩":
                        for (var i = 0; i < ClusterData.length; i++) {
                            if (ClusterData[i].attributes[attr] < 500 && ClusterData[i].attributes[attr] >= 200) {
                                // cdata.push(ClusterData[i]);
                                if (sssy == ClusterData[i].attributes["地市名称"]) {
                                    // cdata.push(ClusterData[i]);
                                    if (ssqy != "") {
                                        if (ssqy == ClusterData[i].attributes["县市区名称"]) {
                                            cdata.push(ClusterData[i]);
                                        }

                                    } else {
                                        cdata.push(ClusterData[i]);
                                    }
                                }
                            }
                        }
                        break;
                    case "小于200亩":
                        for (var i = 0; i < ClusterData.length; i++) {
                            if (ClusterData[i].attributes[attr] < 200) {
                                // cdata.push(ClusterData[i]);
                                if (sssy == ClusterData[i].attributes["地市名称"]) {
                                    // cdata.push(ClusterData[i]);
                                    if (ssqy != "") {
                                        if (ssqy == ClusterData[i].attributes["县市区名称"]) {
                                            cdata.push(ClusterData[i]);
                                        }

                                    } else {
                                        cdata.push(ClusterData[i]);
                                    }
                                }
                            }
                        }
                        break;
                }
                if (cdata.length) {
                    showClusterData.push(cdata);
                }
                else {
                    $(".checks span").each(function () {
                        if ($(this).text() == types[k]) {
                           // $(this).prev().attr("data-state", "uncheck");
                          //  $(this).prev().removeClass("active");
                           // clusterImg.remove($(this).prev().attr("src"));
                          //  clusterType.remove(types[k]);
                           // layerDType.remove("'" + types[k] + "'");
                        }
                    })


                }
            }

            // if
        }

    }

    // console.log(showClusterData);


}

function addBorder() {
    $.ajax({
        url: "Json/zhejiang.json",
        dataType: 'json',
        async: true,
        data: {},
        success: function (data) {
            require(["esri/layers/GraphicsLayer", "esri/geometry/Polyline", "esri/geometry/Polygon", "esri/symbols/PictureMarkerSymbol", "esri/Color", "esri/graphic", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/symbols/TextSymbol",
              "esri/symbols/Font"], function (GraphicsLayer, Polyline, Polygon, PictureMarkerSymbol, Color, Graphic, SimpleLineSymbol, SimpleFillSymbol, TextSymbol, Font) {
                  borderData = data.features;
                  var borderLayer = new GraphicsLayer({ id: "borderLayer" });
                  // var cityTextLayer = new GraphicsLayer({ id: "cityTextLayer" });
                  //var textLayer
                  for (var i = 0; i < data.features.length; i++) {
                      let cityName = data.features[i].properties.name;
                      if (sssy == cityName) {
                          var polylineJson = {
                              "paths": data.features[i].geometry.coordinates,
                              "spatialReference": { "wkid": 4326 }
                          };

                          var polyline = new Polyline(polylineJson);
                          var sls = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 255, 0]), 2);
                          var graphic = new Graphic(polyline, sls);
                          //var polygonJson = {
                          //    "rings": data.features[i].geometry.coordinates,
                          //    "spatialReference": { "wkid": 4326 }
                          //};
                          //var polygon = new Polygon(polygonJson);
                          //  var pu = new Polygon(data.features[i].geometry.coordinates);

                          // var sfs = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 255, 0]), 2), new Color([255, 0, 0, 0]));
                          //  var graphic = new Graphic(polygon, sfs);
                          borderLayer.add(graphic);
                          map.addLayer(borderLayer);
                          return;

                      }
                  }
              })
        }
    })
}
//添加浙江边界
function addZJBorder() {
    var extent;
    $.ajax({
        url: "Json/china.json",
        dataType: 'json',
        async: false,
        data: {},
        success: function (data) {
            require(["esri/layers/GraphicsLayer", "esri/geometry/Polygon", "esri/symbols/PictureMarkerSymbol", "esri/Color", "esri/graphic", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol"], function (GraphicsLayer, Polygon, PictureMarkerSymbol, Color, Graphic, SimpleLineSymbol, SimpleFillSymbol) {
                //  var borderLayer = new GraphicsLayer({ id: "borderLayer" });

                for (var i = 0; i < data.features.length; i++) {
                    if (data.features[i].properties.name == "浙江") {
                        var polygonJson = {
                            "rings": data.features[i].geometry.coordinates,
                            "spatialReference": { "wkid": 4326 }
                        };
                        var polygon = new Polygon(polygonJson);
                        var pu = new Polygon(data.features[i].geometry.coordinates);
                        var attr = {};
                        // var attr = { "name": data.features[i].properties.name, "hospital": data.features[i].properties.hospital };
                        var RGB_value = parseInt(166 + parseInt(data.features[i].properties.hospital) * ((166 - 255) / 255));
                        var sfs = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 255, 0]), 0.5), new Color([255, 255, 0, 0.01]));
                        var graphic = new Graphic(polygon, sfs, attr);
                        extent = pu.getExtent();
                        //  console.log(extent);

                        //   borderLayer.add(graphic);
                        //  map.setExtent(extent, true);
                        // map.disableScrollWheelZoom();
                        // map.addLayer(borderLayer);
                        //  return extent;

                        var borderLayer = new GraphicsLayer({ id: "borderLayer" });
                        var symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 255, 0]), 2), new Color([RGB_value, 0, 0, 0.01]));
                        borderLayer.add(e.graphic.setSymbol(symbol));
                        map.addLayer(borderLayer);
                    }


                }


            })
        }
    })
    return extent;
}
//添加浙江市县区划
function addZJCityBorder() {
    if (map.getLayer("cityLayer")) {
        map.removeLayer(map.getLayer("cityLayer"));
        map.removeLayer(map.getLayer("cityTextLayer"));
    }
   
    $.ajax({
        url: "Json/zhejiang.json",
        dataType: 'json',
        async: true,
        data: {},
        success: function (data) {
            require(["esri/layers/GraphicsLayer", "esri/geometry/Polygon", "esri/symbols/PictureMarkerSymbol", "esri/Color", "esri/graphic", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/symbols/TextSymbol",
              "esri/symbols/Font"], function (GraphicsLayer, Polygon, PictureMarkerSymbol, Color, Graphic, SimpleLineSymbol, SimpleFillSymbol, TextSymbol, Font) {
                  borderData = data.features;
                  var cityLayer = new GraphicsLayer({ id: "cityLayer" });
                  var cityTextLayer = new GraphicsLayer({ id: "cityTextLayer" });
                  //var textLayer
                  for (var i = 0; i < data.features.length; i++) {

                      var polygonJson = {
                          "rings": data.features[i].geometry.coordinates,
                          "spatialReference": { "wkid": 4326 }
                      };
                      var polygon = new Polygon(polygonJson);
                      var pu = new Polygon(data.features[i].geometry.coordinates);
                      let cityName = data.features[i].properties.name;
                      let cityNumber = getCityParam(cityName, "地市名称");
                      // var attr = {};
                      var upperValue = 2000;
                      var lowerValue = 0;
                      var number = Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
                      var attr = { "name": cityName, "number": cityNumber };
                      var RGB_value = 60 + parseInt((cityNumber - lowerValue) * ((255 - 60) / (upperValue - lowerValue)));
                      // console.log(RGB_value);
                      var sfs = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([RGB_value, 255, 0]), 2), new Color([RGB_value, 0, 0, 0.6]));
                      var graphic = new Graphic(polygon, sfs, attr);
                      var extent = pu.getExtent();
                      var point = extent.getCenter();
                      //  var showLabel = cityName + "   <tspan style='color:#000'>|</tspan> " + cityNumber;
                      var showLabel =  cityName + "  " + cityNumber;
                      var font = new Font();
                      font.setSize("10pt");
                      font.setFamily("微软雅黑");
                      // font.setWeight(Font.WEIGHT_BOLD);
                      //  textSymbol.setFont(font);
                      cityLayer.add(graphic);
                      var label = new TextSymbol(showLabel)
                        .setColor(new Color([255, 255, 255]), 0.5)

                      .setFont(font);
                      cityTextLayer.add(
                        new Graphic(
                          point,
                          label
                        // attr
                        )
                      );

                      // map.setExtent(extent, true);
                      map.addLayer(cityLayer);
                      map.addLayer(cityTextLayer);
                      //  map.disableScrollWheelZoom();

                  }
                  var cityClick = cityLayer.on("click", function (e) {
                      //get the associated node info when the graphic is clicked
                      currentGraphic = e.graphic;
                      var ex = currentGraphic.geometry.getExtent();
                      var cp = ex.getCenter();
                      console.log(cp);
                      $(".sel-fun button").text(sssy);
                      $(".sel-fun button").append("<span class=\"caret\"></span>");
                      $("#farmArea").show();
                      $("#cityArea").hide();
                      map.centerAndZoom(cp, downLevel + 1);
               

                  })

              })
        }
    })
}
//添加浙江省统计值
function addZJCityNumber() {
    if (map.getLayer("cityLayer")) {
        map.removeLayer(map.getLayer("cityLayer"));
        map.removeLayer(map.getLayer("cityTextLayer"));
    }
    getTotalNumber();
    $.ajax({
        url: "Json/zhejiang.json",
        dataType: 'json',
        async: true,
        data: {},
        success: function (data) {
            require(["esri/layers/GraphicsLayer", "esri/geometry/Polygon", "esri/symbols/PictureMarkerSymbol", "esri/Color", "esri/graphic", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/symbols/TextSymbol",
              "esri/symbols/Font"], function (GraphicsLayer, Polygon, PictureMarkerSymbol, Color, Graphic, SimpleLineSymbol, SimpleFillSymbol, TextSymbol, Font) {
                  borderData = data.features;
                  var cityLayer = new GraphicsLayer({ id: "cityLayer" });
                  var cityTextLayer = new GraphicsLayer({ id: "cityTextLayer" });
                  //var textLayer
                  for (var i = 0; i < data.features.length; i++) {
                      var polygonJson = {
                          "rings": data.features[i].geometry.coordinates,
                          "spatialReference": { "wkid": 4326 }
                      };
                      var polygon = new Polygon(polygonJson);
                      var pu = new Polygon(data.features[i].geometry.coordinates);
                      let cityName = data.features[i].properties.name;
                      let cityNumber = getCityParam(cityName,"地市名称");
                      // var attr = {};
                      var upperValue = 2000;
                      var lowerValue = 0;
                      var number = Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
                      var attr = { "name": cityName, "number": cityNumber };
                      var RGB_value = 60 + parseInt((cityNumber - lowerValue) * ((255 - 60) / (upperValue - lowerValue)));
                      // console.log(RGB_value);
                      // var sfs = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([RGB_value, 255, 0]), 2), new Color([RGB_value, 0, 0, 0.01]));
                      var sfs = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 255, 0]), 2), new Color([255, 0, 0, 0.01]));
                      var graphic = new Graphic(polygon, sfs, attr);
                      cityLayer.add(graphic);
                      var extent = pu.getExtent();
                      var point = extent.getCenter();
                   //   var showLabel = cityName + "  <tspan style='color:#000'>|</tspan>  " + cityNumber;
                      var showLabel =  cityName + "    " + cityNumber;
                      var font = new Font();
                      font.setSize("10pt");
                      font.setFamily("微软雅黑");
                      // font.setWeight(Font.WEIGHT_BOLD);
                      //  textSymbol.setFont(font);

                      total += cityNumber; 
                      var defaultSymbol = new PictureMarkerSymbol("./images/bluetips.png", 120, 40).setOffset(0, 0);
                      cityTextLayer.add(
                        new Graphic(
                          point,
                          defaultSymbol,
                          attr
                        )
                      );

                      var label = new TextSymbol(showLabel)
                        .setColor(new Color([255, 255, 255]), 0.5)
                      .setFont(font);
                      cityTextLayer.add(
                        new Graphic(
                          point,
                          label,
                          attr
                        )
                      );
                      // map.setExtent(extent, true);                    
                      //  map.disableScrollWheelZoom();
                  }
                  map.addLayer(cityLayer);
                  map.addLayer(cityTextLayer);

                  console.log(total);
                  if(gnType!=="储备项目"){
                      $("#total").text(total);
                  }
                  
                  total = 0;
                  var cityClick = cityLayer.on("click", function (e) {
                      //get the associated node info when the graphic is clicked
                      currentGraphic = e.graphic;
                      var ex = currentGraphic.geometry.getExtent();
                      var cp = ex.getCenter();
                      console.log(cp);
                      $(".sel-fun button").text(sssy);
                      $(".sel-fun button").append("<span class=\"caret\"></span>");
                      $("#farmArea").show();
                      $("#cityArea").hide();
                      map.centerAndZoom(cp, downLevel + 1);
                      

                  })
                  var cityTextClick = cityTextLayer.on("mouse-over", function (e) {
                      //get the associated node info when the graphic is clicked
                      currentGraphic = e.graphic;
                      var screenP = map.toScreen(e.graphic.geometry);
                      $("#typeinfo").html("");
                      getTypeNumber(e.graphic.attributes["name"], "地市名称",e.graphic.attributes["name"]);
                      var html = ""
                      for (let i = 0; i < typeNumber.length; i++) {
                          html += "<span>" + typeNumber[i].name + ":" + typeNumber[i].number + "</span></br>"
                      }
                      $("#typeinfo").append(html);
                      $("#typeinfo").css("left", screenP.x);
                      $("#typeinfo").css("top", screenP.y + 10);
                      if (html) {
                          $("#typeinfo").show();
                      }
                      
                      map.setMapCursor("pointer");
                  })
                  var cityTextClick = cityTextLayer.on("mouse-out", function (e) {
                      //get the associated node info when the graphic is clicked
                      $("#typeinfo").hide();
                      map.setMapCursor("default");


                  })

              })
        }

    })
}
//计算特殊的总数
function getTotalNumber() {
    let tNumber = 0;
    total = 0;
    console.log(gnType);
    if (sssy == "浙江" && gnType == "储备项目") {
        for (var i = 0; i < ClusterData.length; i++) {
            let value = ClusterData[i].attributes[currentattr];
            if (clusterType.contains(value)) {
                tNumber++;
            }
        }
        total = tNumber;
        $("#total").text(total);
    }
}

function getCityStaticNumber() {
    if (map.getLayer("cityLayer")) {
        map.removeLayer(map.getLayer("cityLayer"));
        map.removeLayer(map.getLayer("cityTextLayer"));
    }
    $.ajax({
        url: "Json/zhejiang.json",
        dataType: 'json',
        async: true,
        data: {},
        success: function (data) {
            require(["esri/layers/GraphicsLayer", "esri/geometry/Polygon", "esri/symbols/PictureMarkerSymbol", "esri/Color", "esri/graphic", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/symbols/TextSymbol",
              "esri/symbols/Font"], function (GraphicsLayer, Polygon, PictureMarkerSymbol, Color, Graphic, SimpleLineSymbol, SimpleFillSymbol, TextSymbol, Font) {
                  borderData = data.features;
                  var cityLayer = new GraphicsLayer({ id: "cityLayer" });
                  var cityTextLayer = new GraphicsLayer({ id: "cityTextLayer" });
                  //var textLayer
                  for (var i = 0; i < data.features.length; i++) {
                      if (data.features[i].properties.name == sssy) {
                          var polygonJson = {
                              "rings": data.features[i].geometry.coordinates,
                              "spatialReference": { "wkid": 4326 }
                          };
                          var polygon = new Polygon(polygonJson);
                          var pu = new Polygon(data.features[i].geometry.coordinates);
                          let cityName = data.features[i].properties.name;
                          let cityNumber = getCityParam(cityName,"地市名称");
                          // var attr = {};
                          var upperValue = 2000;
                          var lowerValue = 0;
                          var number = Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
                          var attr = { "name": cityName, "number": cityNumber };
                          var RGB_value = 60 + parseInt((cityNumber - lowerValue) * ((255 - 60) / (upperValue - lowerValue)));
                          // console.log(RGB_value);
                          // var sfs = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([RGB_value, 255, 0]), 2), new Color([RGB_value, 0, 0, 0.01]));
                          var sfs = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 255, 0]), 2), new Color([255, 0, 0, 0.01]));
                          var graphic = new Graphic(polygon, sfs, attr);

                          var extent = pu.getExtent();
                          var point = extent.getCenter();
                          var showLabel = cityName + "：" + cityNumber;
                          var font = new Font();
                          font.setSize("10pt");
                          font.setFamily("微软雅黑");
                          // font.setWeight(Font.WEIGHT_BOLD);
                          //  textSymbol.setFont(font);
                          cityLayer.add(graphic);
                          var defaultSymbol = new PictureMarkerSymbol("./images/bluetips.png", 120, 40).setOffset(0, 0);
                          cityTextLayer.add(
                            new Graphic(
                              point,
                              defaultSymbol,
                              attr
                            )
                          );

                          var label = new TextSymbol(showLabel)
                            .setColor(new Color([255, 255, 255]), 0.5)
                          .setFont(font);
                          cityTextLayer.add(
                            new Graphic(
                              point,
                              label,
                              attr
                            )
                          );

                          // map.setExtent(extent, true);
                          map.addLayer(cityLayer);
                          map.addLayer(cityTextLayer);
                          break;
                          //  map.disableScrollWheelZoom();
                      }
                  }
                  var cityClick = cityLayer.on("click", function (e) {
                      //get the associated node info when the graphic is clicked
                      currentGraphic = e.graphic;
                      //  alert(currentGraphic.attributes["number"]);
                      var ex = currentGraphic.geometry.getExtent();
                      var cp = ex.getCenter();
                      console.log(cp);
                      $(".sel-fun button").text(sssy);
                      $(".sel-fun button").append("<span class=\"caret\"></span>");
                      $("#farmArea").show();
                      $("#cityArea").hide();
                      map.centerAndZoom(cp, downLevel + 1);
                  })
                  var cityTextClick = cityTextLayer.on("mouse-over", function (e) {
                      //get the associated node info when the graphic is clicked
                      currentGraphic = e.graphic;
                      var screenP = map.toScreen(e.graphic.geometry);
                      $("#typeinfo").html("");
                      getTypeNumber(e.graphic.attributes["name"], "地市名称", e.graphic.attributes["name"]);
                      var html = ""
                      for (let i = 0; i < typeNumber.length; i++) {
                          html += "<span>" + typeNumber[i].name + ":" + typeNumber[i].number + "</span></br>"
                      }
                      $("#typeinfo").append(html);
                      $("#typeinfo").css("left", screenP.x);
                      $("#typeinfo").css("top", screenP.y);
                      if (html) {
                          $("#typeinfo").show();
                      }
                      

                      map.setMapCursor("pointer");
                  })
                  var cityTextClick = cityTextLayer.on("mouse-out", function (e) {
                      //get the associated node info when the graphic is clicked
                      $("#typeinfo").hide();
                      map.setMapCursor("default");


                  })

              })
        }
    })
}

function getSearchSql(sValue) {
    let sSql = "";
    var noinput ;
    if (sssy == "浙江") {
        noinput = getSearchsql(layerDType, currentattr);
    } else {
        noinput = getSearchsql(layerDType, currentattr);
    }
    sSql = noinput + " and " + searchField + " like  '%" + sValue + "%'";
   
    return sSql;
}
function getSearchsql(layerDType, attrName) {
    let sql = "";
    if (layerDType[0] != "建设分布图") {
        if (attrName != "认定面积") {
            sql = attrName + " in (" + layerDType.toString() + ")";
        } else {
            sql = getAreaSql(clusterType);
        }
    } else {
        if (gnType != "标准农田建设区") {
            sql = "1=2";

        } else {
            sql = " ";
        }


    }
    return sql;
}
function getLayerDefine(layerDType, attrName) {
    let sql = "";
    if (layerDType[0] != "建设分布图") {
        if (attrName != "认定面积") {
            sql = "地市名称='" + sssy + "' and " + attrName + " in (" + layerDType.toString() + ")";
            if (ssqy != "") {
                sql = "县市区名称='" + ssqy + "' and " + attrName + " in (" + layerDType.toString() + ")";
            }
        } else {
            var asql = getAreaSql(clusterType);
            // console.log(asql);
            sql = "地市名称='" + sssy + "' and " + asql;
            if (ssqy != "") {
                sql = "县市区名称='" + ssqy + "' and " + asql;
            }
        }
    } else {
        if (gnType != "标准农田建设区") {
            sql = "地市名称='" + sssy + "' and 1=2";
            if (ssqy != "") {
                sql = "县市区名称='" + ssqy + "' and 1=2";
            }
        } else {
            sql = "地市名称='" + sssy + "'";
            if (ssqy != "") {
                sql = "县市区名称='" + ssqy + "'";
            }
        }


    }
    return sql;
}
function getAreaSql(types) {
    areasql.length = 0;
    for (var k = 0; k < types.length; k++) {
        var cdata = [];
        switch (types[k]) {
            case "大于1000亩":
                areasql.push("(认定面积>1000)");
                break;
            case "500~1000亩":
                areasql.push("(认定面积>500 and 认定面积<=1000)");
                break;
            case "200~500亩":
                areasql.push("(认定面积>200 and 认定面积<=500)");
                break;
            case "小于200亩":
                areasql.push("(认定面积<200)");
                break;
        }
    }
    var sql = "(";

    for (var i = 0; i < areasql.length; i++) {

        if (i == areasql.length - 1) {
            sql += areasql[i];
        } else {
            sql += areasql[i] + " or ";
        }
    }
    return sql + ")";
}
function addMultiClusters(multiData) {
    require(["dojo/parser",
          "dojo/ready",
          "dojo/_base/array",
          "esri/Color",
          "dojo/dom-style",
          "dojo/query",
          "esri/layers/ImageParameters",
          "esri/map",
          "esri/request",
          "esri/graphic",
          "esri/geometry/Extent",

          "esri/symbols/SimpleMarkerSymbol",
          "esri/symbols/SimpleFillSymbol",
          "esri/symbols/PictureMarkerSymbol",
          "esri/renderers/ClassBreaksRenderer",

          "esri/layers/GraphicsLayer",
          "esri/SpatialReference",
          "esri/InfoTemplate",
          "esri/dijit/PopupTemplate",
          "esri/geometry/Point",
          "esri/geometry/webMercatorUtils",
          "esri/layers/ArcGISDynamicMapServiceLayer",
          "extras/ClusterLayer_M",
          "dojo/on",
          "dojo/dom-class", "dojo/dom-style",
          "dijit/layout/BorderContainer",
          "dijit/layout/ContentPane",
          "dojo/domReady!"], function (parser, ready, arrayUtils, Color, domStyle, query, ImageParameters,
          Map, esriRequest, Graphic, Extent,
          SimpleMarkerSymbol, SimpleFillSymbol, PictureMarkerSymbol, ClassBreaksRenderer,
          GraphicsLayer, SpatialReference, InfoTemplate, PopupTemplate, Point, webMercatorUtils, ArcGISDynamicMapServiceLayer, ClusterLayer_M, on, domClass, domStyle) {
              if (map.getLayer("clusters")) {
                  map.removeLayer(map.getLayer("clusters"));
              }
              var point_array = [];
              var wgs = new esri.SpatialReference({
                  "wkid": 4326
              });
              var attributes = "";
              for (var k = 0; k < multiData.length; k++) {
                  var photoInfo = {};
                  var type = clusterType[k];

                  photoInfo.data = arrayUtils.map(multiData[k], function (p, i) {
                      var latlng = new Point(parseFloat(p.geometry.x), parseFloat(p.geometry.y), wgs);
                      //  var latlng = new Point(parseFloat(p.lng), parseFloat(p.lat), wgs);
                      //  var latlng = new Point(parseFloat(p.x), parseFloat(p.y), wgs);
                      var webMercator;
                      if (parseFloat(latlng.x) > 1000) {
                          webMercator = latlng;
                      } else {
                          webMercator = webMercatorUtils.geographicToWebMercator(latlng);
                      }
                      var attributes1 = {
                          "Name": p.name,
                          "Type": type,
                          "imgurl": clusterImg[k],

                      };
                      var attrbutes2 = p.attributes;
                      attributes = $.extend({}, attributes1, attrbutes2)
                      return {

                          "x": webMercator.x,
                          "y": webMercator.y,

                          "attributes": attributes



                      };
                  });
                  point_array.push(photoInfo.data);
              }
              //var infoTemplate = new InfoTemplate("Attributes", "${*}");
              //infoTemplate.setTitle("属性信息");
              //infoTemplate.setContent("State Name");
              // popupTemplate to work with attributes specific to this dataset
              var fieldInfos2 = [];
              for (var key in attributes) {
                  var s_key = key.toLowerCase();
                  var Regx = /^[A-Za-z]*$/;
                  if (s_key.indexOf("shape") > -1 || s_key.indexOf("object") > -1 || Regx.test(key)) {
                      continue;
                  }
                  else {
                      var field = {
                          "fieldName": key,
                          "label": key,
                          visible: true
                      }
                      fieldInfos2.push(field);
                  }
              }
              console.log(fieldInfos);
              //  var fieldInfos2 = fieldInfos
              var popupTemplate = new PopupTemplate({
                  "title": "属性信息",
                  "content": "聚集点信息",
                  "fieldInfos": fieldInfos,
                  //            "fieldInfos": [{

                  //            "fieldName": "认定编号",
                  //            "label": "认定编号",
                  //            visible: true
                  //}]
                  //, {
                  //        "fieldName": "认定名称",
                  //        "label": "认定名称",
                  //        visible: true
                  //    }, {
                  //        "fieldName": "规划名称",
                  //        //  "label": "By",
                  //        visible: true
                  //    }, {
                  //        "fieldName": "规划编号",

                  //        visible: true
                  //    },
                  //    {
                  //        "fieldName": "建设状态",
                  //        visible: true
                  //    }, {
                  //        "fieldName": "建设等级",

                  //        visible: true
                  //    }, {
                  //        "fieldName": "建设认定年",

                  //        visible: true
                  //    },
                  //{
                  //    "fieldName": "地市名称",

                  //    visible: true
                  //}, {
                  //    "fieldName": "县市区名称",

                  //    visible: true
                  //}]
              });

              // cluster layer that uses OpenLayers style clustering
              clusterLayer = new ClusterLayer_M({
                  //  "data": photoInfo.data,
                  "data": point_array,
                  "distance": 100,
                  "id": "clusters",
                  "labelColor": textColor,
                  "labelOffset": 10,
                  "showSingles": true,
                  "symbols": clusterType,
                  //  "resolution": map.extent.getWidth() / map.width,
                  "singleColor": "#888",
                  // "spatialReference" :new esri.SpatialReference({ "wkid": 4326 }),
                  "singleTemplate": popupTemplate,
                  "maxSingles": 5000
              });
              var defaultSym = new SimpleMarkerSymbol().setSize(4);
              var renderer = new ClassBreaksRenderer(defaultSym, "clusterCount");

              //var picBaseUrl = "https://static.arcgis.com/images/Symbols/Shapes/";
              //var blue = new PictureMarkerSymbol(picBaseUrl + "BluePin1LargeB.png", 100, 100).setOffset(0, 15);
              //var green = new PictureMarkerSymbol(picBaseUrl + "GreenPin1LargeB.png", 100, 100).setOffset(0, 15);
              //var red = new PictureMarkerSymbol(picBaseUrl + "RedPin1LargeB.png", 100, 100).setOffset(0, 15);
              var picBaseUrl = "img/";
              var blue = new PictureMarkerSymbol(picBaseUrl + "marker-blue.png", 28, 52).setOffset(0, 0);
              var red = new PictureMarkerSymbol(picBaseUrl + "marker-green.png", 28, 52).setOffset(0, 0);
              //  renderer.addBreak(0, 30000, blue);
              //    renderer.addBreak(100, 1000, green);
              //  renderer.addBreak(1000, 30000, red);

              // clusterLayer.setRenderer(renderer);
              map.addLayer(clusterLayer);

              // close the info window when the map is clicked
              //  map.on("click", cleanUp);
              // close the info window when esc is pressed
              //  map.on("key-down", function (e) {
              //     if (e.keyCode === 27) {
              //         cleanUp();
              //     }
              //   });

          })

}
//function addClusters(resp) {
//    var photoInfo = {};
//    var wgs = new esri.SpatialReference({
//        "wkid": 4326
//    });
//    //    photoInfo.data = arrayUtils.map(resp, function (p) {
//    photoInfo.data = arrayUtils.map(resp, function (p, i) {
//        var latlng = new Point(parseFloat(p.geometry.x), parseFloat(p.geometry.y), wgs);
//        //  var latlng = new Point(parseFloat(p.lng), parseFloat(p.lat), wgs);
//        //  var latlng = new Point(parseFloat(p.X), parseFloat(p.Y), wgs);
//        var webMercator = webMercatorUtils.geographicToWebMercator(latlng);
//        var attributes = {
//            "index": "111",
//            "Name": p.NAME
//            //"Image": p.image,
//            //"Link": p.link
//        };
//        return {
//            "x": webMercator.x,
//            "y": webMercator.y,
//            // "x": latlng.x,
//            //   "y": latlng.y,
//            "attributes": attributes
//        };
//    });

//    // popupTemplate to work with attributes specific to this dataset
//    var popupTemplate = new PopupTemplate({
//        "title": "",
//        "fieldInfos": [{
//            "fieldName": "index",
//            visible: true
//        }, {
//            "fieldName": "Name",
//            "label": "By",
//            visible: true
//        }, {
//            "fieldName": "Link",
//            "label": "On Instagram",
//            visible: true
//        }]
//    });

//    // cluster layer that uses OpenLayers style clustering
//    clusterLayer = new ClusterLayer({
//        "data": photoInfo.data,
//        "distance": 100,
//        "id": "clusters",
//        "labelColor": textColor,
//        "labelOffset": 10,
//        "showSingles": true,
//        //  "resolution": map.extent.getWidth() / map.width,
//        "singleColor": "#888",
//        // "spatialReference" :new esri.SpatialReference({ "wkid": 4326 }),
//        "singleTemplate": popupTemplate,
//        "maxSingles": 5000
//    });
//    var defaultSym = new SimpleMarkerSymbol().setSize(4);
//    var renderer = new ClassBreaksRenderer(defaultSym, "clusterCount");

//    //var picBaseUrl = "https://static.arcgis.com/images/Symbols/Shapes/";
//    //var blue = new PictureMarkerSymbol(picBaseUrl + "BluePin1LargeB.png", 100, 100).setOffset(0, 15);
//    //var green = new PictureMarkerSymbol(picBaseUrl + "GreenPin1LargeB.png", 100, 100).setOffset(0, 15);
//    //var red = new PictureMarkerSymbol(picBaseUrl + "RedPin1LargeB.png", 100, 100).setOffset(0, 15);
//    var picBaseUrl = "img/";
//    var blue = new PictureMarkerSymbol(picBaseUrl + "marker-blue.png", 28, 52).setOffset(0, 0);
//    var green = new PictureMarkerSymbol(picBaseUrl + "marker-green.png", 28, 52).setOffset(0, 0);
//    var red = new PictureMarkerSymbol(picBaseUrl + "marker-green.png", 28, 52).setOffset(0, 0);
//    renderer.addBreak(0, 30000, blue);
//    //    renderer.addBreak(100, 1000, green);
//    //  renderer.addBreak(1000, 30000, red);

//    clusterLayer.setRenderer(renderer);
//    map.addLayer(clusterLayer);

//    //// close the info window when the map is clicked
//    //map.on("click", cleanUp);
//    //// close the info window when esc is pressed
//    //map.on("key-down", function (e) {
//    //    if (e.keyCode === 27) {
//    //        cleanUp();
//    //    }
//    //});
//}
