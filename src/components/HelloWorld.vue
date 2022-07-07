<template>
  <div class="hello">
    <div :id="containerId" style="width: 100%; height: 100vh"></div>
  </div>
</template>

<script>
import "@/../node_modules/echarts/extension/bmap/bmap";
import data from "@/data/data";
import geoCoordMap from "@/data/geoCoordMap";
import BMap from "BMap";

export default {
  name: "HelloWorld",
  data() {
    return {
      containerId: "geo-map",
      seriesData: {},
      data: data,
      geoCoordMap: geoCoordMap,
      mapModel: null,
      myChart: null,
    };
  },

  mounted() {
    this.initOption();
    // 监听地图上的缩放移动事件
    this.myChart.on("bmaproam", this.bmaproamHandler);
  },

  methods: {
    convertData(data) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value),
          });
        }
      }
      return res;
    },
    initOption() {
      this.myChart = this.$echarts.init(
        document.getElementById(this.containerId)
      );
      let temData = this.convertData(
        this.data.sort((a, b) => {
          return b.value - a.value;
        })
      );
      let option = {
        tooltip: {
          trigger: "item",
          // 自定义显示的内容
          formatter: function (params) {
            // 可以直接在html元素上添加样式
            var html = `
            <div style="text-align: center;color:#fff">
              <div>${params.data.name}</div>
              位置：${params.data.value[0]},${params.data.value[1]}
            </div>
            `;
            return html;
          },
          // 也可以通过tooltip给的配置项修改显示的样式
          position: "top",
          backgroundColor: "rgba(63, 63, 63, 0.7)",
        },
        bmap: {
          // 地图展示的中心，即加载时首先出现在人眼前的点
          center: [104.114129, 37.550339],
          // 当前地图缩放的大小，如果是一个省内的一些地方，那么zoom值应该设置得大点
          // 设置的初始值大小应根据要展示的数据而定
          zoom: 5,
          roam: true, //允许缩放
          // 个性化地图
          mapStyle: {
            styleJson: [
              {
                featureType: "land",
                elementType: "geometry",
                stylers: {
                  color: "#242f3eff",
                },
              },
              {
                featureType: "manmade",
                elementType: "geometry",
                stylers: {
                  color: "#242f3eff",
                },
              },
              {
                featureType: "water",
                elementType: "geometry",
                stylers: {
                  color: "#17263cff",
                },
              },
              {
                featureType: "road",
                elementType: "geometry.fill",
                stylers: {
                  color: "#9e7d60ff",
                },
              },
              {
                featureType: "road",
                elementType: "geometry.stroke",
                stylers: {
                  color: "#554631ff",
                },
              },
              {
                featureType: "districtlabel",
                elementType: "labels.text.fill",
                stylers: {
                  color: "#d69563ff",
                },
              },
              {
                featureType: "districtlabel",
                elementType: "labels.text.stroke",
                stylers: {
                  color: "#17263cff",
                  weight: 3,
                },
              },
              {
                featureType: "poilabel",
                elementType: "labels.text.fill",
                stylers: {
                  color: "#d69563ff",
                },
              },
              {
                featureType: "poilabel",
                elementType: "labels.text.stroke",
                stylers: {
                  color: "#17263cff",
                  weight: 3,
                },
              },
              {
                featureType: "subway",
                elementType: "geometry",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "railway",
                elementType: "geometry",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "poilabel",
                elementType: "labels.icon",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "subwaylabel",
                elementType: "labels",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "subwaylabel",
                elementType: "labels.icon",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "tertiarywaysign",
                elementType: "labels",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "tertiarywaysign",
                elementType: "labels.icon",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "provincialwaysign",
                elementType: "labels.icon",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "provincialwaysign",
                elementType: "labels",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "nationalwaysign",
                elementType: "labels.icon",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "nationalwaysign",
                elementType: "labels",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "highwaysign",
                elementType: "labels.icon",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "highwaysign",
                elementType: "labels",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "green",
                elementType: "geometry",
                stylers: {
                  color: "#263b3eff",
                },
              },
              {
                featureType: "nationalwaysign",
                elementType: "labels.text.fill",
                stylers: {
                  color: "#d0021bff",
                },
              },
              {
                featureType: "nationalwaysign",
                elementType: "labels.text.stroke",
                stylers: {
                  color: "#ffffffff",
                },
              },
              {
                featureType: "city",
                elementType: "labels",
                stylers: {
                  visibility: "on",
                },
              },
              {
                featureType: "city",
                elementType: "labels.icon",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "city",
                elementType: "labels.text.fill",
                stylers: {
                  color: "#d69563ff",
                },
              },
              {
                featureType: "city",
                elementType: "labels.text.stroke",
                stylers: {
                  color: "#17263cff",
                },
              },
              {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: {
                  color: "#d69563ff",
                },
              },
              {
                featureType: "water",
                elementType: "labels.text.stroke",
                stylers: {
                  color: "#242f3eff",
                },
              },
              {
                featureType: "local",
                elementType: "geometry.fill",
                stylers: {
                  color: "#38414eff",
                },
              },
              {
                featureType: "local",
                elementType: "geometry.stroke",
                stylers: {
                  color: "#ffffff00",
                },
              },
              {
                featureType: "fourlevelway",
                elementType: "geometry.fill",
                stylers: {
                  color: "#38414eff",
                },
              },
              {
                featureType: "fourlevelway",
                elementType: "geometry.stroke",
                stylers: {
                  color: "#ffffff00",
                },
              },
              {
                featureType: "tertiaryway",
                elementType: "geometry.fill",
                stylers: {
                  color: "#38414eff",
                },
              },
              {
                featureType: "tertiaryway",
                elementType: "geometry.stroke",
                stylers: {
                  color: "#ffffff00",
                },
              },
              {
                featureType: "tertiaryway",
                elementType: "labels.text.fill",
                stylers: {
                  color: "#759879ff",
                },
              },
              {
                featureType: "fourlevelway",
                elementType: "labels.text.fill",
                stylers: {
                  color: "#759879ff",
                },
              },
              {
                featureType: "highway",
                elementType: "labels.text.fill",
                stylers: {
                  color: "#759879ff",
                },
              },
              {
                featureType: "highway",
                elementType: "geometry.fill",
                stylers: {
                  color: "#9e7d60ff",
                },
              },
              {
                featureType: "highway",
                elementType: "geometry.stroke",
                stylers: {
                  color: "#554631ff",
                },
              },
              {
                featureType: "provincialway",
                elementType: "geometry.fill",
                stylers: {
                  color: "#9e7d60ff",
                },
              },
              {
                featureType: "provincialway",
                elementType: "geometry.stroke",
                stylers: {
                  color: "#554631ff",
                },
              },
              {
                featureType: "tertiaryway",
                elementType: "labels.text.stroke",
                stylers: {
                  color: "#1a2e1cff",
                },
              },
              {
                featureType: "fourlevelway",
                elementType: "labels.text.stroke",
                stylers: {
                  color: "#1a2e1cff",
                },
              },
              {
                featureType: "highway",
                elementType: "labels.text.stroke",
                stylers: {
                  color: "#1a2e1cff",
                },
              },
              {
                featureType: "nationalway",
                elementType: "labels.text.stroke",
                stylers: {
                  color: "#1a2e1cff",
                },
              },
              {
                featureType: "nationalway",
                elementType: "labels.text.fill",
                stylers: {
                  color: "#759879ff",
                },
              },
              {
                featureType: "nationalway",
                elementType: "geometry.fill",
                stylers: {
                  color: "#9e7d60ff",
                },
              },
              {
                featureType: "nationalway",
                elementType: "geometry.stroke",
                stylers: {
                  color: "#554631ff",
                },
              },
              {
                featureType: "cityhighway",
                elementType: "geometry.fill",
                stylers: {
                  color: "#9e7d60ff",
                },
              },
              {
                featureType: "cityhighway",
                elementType: "geometry.stroke",
                stylers: {
                  color: "#554631ff",
                },
              },
              {
                featureType: "arterial",
                elementType: "geometry.fill",
                stylers: {
                  color: "#9e7d60ff",
                },
              },
              {
                featureType: "arterial",
                elementType: "geometry.stroke",
                stylers: {
                  color: "#554631fa",
                },
              },
              {
                featureType: "medicallabel",
                elementType: "labels",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "medicallabel",
                elementType: "labels.icon",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "entertainmentlabel",
                elementType: "labels",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "entertainmentlabel",
                elementType: "labels.icon",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "estatelabel",
                elementType: "labels",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "estatelabel",
                elementType: "labels.icon",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "businesstowerlabel",
                elementType: "labels",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "businesstowerlabel",
                elementType: "labels.icon",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "companylabel",
                elementType: "labels",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "companylabel",
                elementType: "labels.icon",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "governmentlabel",
                elementType: "labels",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "governmentlabel",
                elementType: "labels.icon",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "restaurantlabel",
                elementType: "labels",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "restaurantlabel",
                elementType: "labels.icon",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "hotellabel",
                elementType: "labels",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "hotellabel",
                elementType: "labels.icon",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "shoppinglabel",
                elementType: "labels",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "shoppinglabel",
                elementType: "labels.icon",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "lifeservicelabel",
                elementType: "labels",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "lifeservicelabel",
                elementType: "labels.icon",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "carservicelabel",
                elementType: "labels",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "carservicelabel",
                elementType: "labels.icon",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "financelabel",
                elementType: "labels",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "financelabel",
                elementType: "labels.icon",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "otherlabel",
                elementType: "labels",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "otherlabel",
                elementType: "labels.icon",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "airportlabel",
                elementType: "labels",
                stylers: {
                  visibility: "on",
                },
              },
              {
                featureType: "airportlabel",
                elementType: "labels.text.fill",
                stylers: {
                  color: "#d69563ff",
                },
              },
              {
                featureType: "airportlabel",
                elementType: "labels.text.stroke",
                stylers: {
                  color: "#17263cff",
                },
              },
              {
                featureType: "airportlabel",
                elementType: "labels.icon",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "highway",
                stylers: {
                  curZoomRegionId: "0",
                  curZoomRegion: "6,10",
                  level: "6",
                },
              },
              {
                featureType: "highway",
                stylers: {
                  curZoomRegionId: "0",
                  curZoomRegion: "6,10",
                  level: "7",
                },
              },
              {
                featureType: "highway",
                stylers: {
                  curZoomRegionId: "0",
                  curZoomRegion: "6,10",
                  level: "8",
                },
              },
              {
                featureType: "highway",
                stylers: {
                  curZoomRegionId: "0",
                  curZoomRegion: "6,10",
                  level: "9",
                },
              },
              {
                featureType: "highway",
                stylers: {
                  curZoomRegionId: "0",
                  curZoomRegion: "6,10",
                  level: "10",
                },
              },
              {
                featureType: "highway",
                elementType: "geometry",
                stylers: {
                  visibility: "off",
                  curZoomRegionId: "0",
                  curZoomRegion: "6,10",
                  level: "6",
                },
              },
              {
                featureType: "highway",
                elementType: "geometry",
                stylers: {
                  visibility: "off",
                  curZoomRegionId: "0",
                  curZoomRegion: "6,10",
                  level: "7",
                },
              },
              {
                featureType: "highway",
                elementType: "geometry",
                stylers: {
                  visibility: "off",
                  curZoomRegionId: "0",
                  curZoomRegion: "6,10",
                  level: "8",
                },
              },
              {
                featureType: "highway",
                elementType: "geometry",
                stylers: {
                  visibility: "off",
                  curZoomRegionId: "0",
                  curZoomRegion: "6,10",
                  level: "9",
                },
              },
              {
                featureType: "highway",
                elementType: "geometry",
                stylers: {
                  visibility: "off",
                  curZoomRegionId: "0",
                  curZoomRegion: "6,10",
                  level: "10",
                },
              },
              {
                featureType: "nationalway",
                stylers: {
                  curZoomRegionId: "0",
                  curZoomRegion: "6,10",
                  level: "6",
                },
              },
              {
                featureType: "nationalway",
                stylers: {
                  curZoomRegionId: "0",
                  curZoomRegion: "6,10",
                  level: "7",
                },
              },
              {
                featureType: "nationalway",
                stylers: {
                  curZoomRegionId: "0",
                  curZoomRegion: "6,10",
                  level: "8",
                },
              },
              {
                featureType: "nationalway",
                stylers: {
                  curZoomRegionId: "0",
                  curZoomRegion: "6,10",
                  level: "9",
                },
              },
              {
                featureType: "nationalway",
                stylers: {
                  curZoomRegionId: "0",
                  curZoomRegion: "6,10",
                  level: "10",
                },
              },
              {
                featureType: "nationalway",
                elementType: "geometry",
                stylers: {
                  visibility: "off",
                  curZoomRegionId: "0",
                  curZoomRegion: "6,10",
                  level: "6",
                },
              },
              {
                featureType: "nationalway",
                elementType: "geometry",
                stylers: {
                  visibility: "off",
                  curZoomRegionId: "0",
                  curZoomRegion: "6,10",
                  level: "7",
                },
              },
              {
                featureType: "nationalway",
                elementType: "geometry",
                stylers: {
                  visibility: "off",
                  curZoomRegionId: "0",
                  curZoomRegion: "6,10",
                  level: "8",
                },
              },
              {
                featureType: "nationalway",
                elementType: "geometry",
                stylers: {
                  visibility: "off",
                  curZoomRegionId: "0",
                  curZoomRegion: "6,10",
                  level: "9",
                },
              },
              {
                featureType: "nationalway",
                elementType: "geometry",
                stylers: {
                  visibility: "off",
                  curZoomRegionId: "0",
                  curZoomRegion: "6,10",
                  level: "10",
                },
              },
              {
                featureType: "nationalway",
                elementType: "labels",
                stylers: {
                  visibility: "off",
                  curZoomRegionId: "0",
                  curZoomRegion: "6,10",
                  level: "6",
                },
              },
              {
                featureType: "nationalway",
                elementType: "labels",
                stylers: {
                  visibility: "off",
                  curZoomRegionId: "0",
                  curZoomRegion: "6,10",
                  level: "7",
                },
              },
              {
                featureType: "nationalway",
                elementType: "labels",
                stylers: {
                  visibility: "off",
                  curZoomRegionId: "0",
                  curZoomRegion: "6,10",
                  level: "8",
                },
              },
              {
                featureType: "nationalway",
                elementType: "labels",
                stylers: {
                  visibility: "off",
                  curZoomRegionId: "0",
                  curZoomRegion: "6,10",
                  level: "9",
                },
              },
              {
                featureType: "nationalway",
                elementType: "labels",
                stylers: {
                  visibility: "off",
                  curZoomRegionId: "0",
                  curZoomRegion: "6,10",
                  level: "10",
                },
              },
              {
                featureType: "highway",
                elementType: "labels",
                stylers: {
                  visibility: "off",
                  curZoomRegionId: "0",
                  curZoomRegion: "6,10",
                  level: "6",
                },
              },
              {
                featureType: "highway",
                elementType: "labels",
                stylers: {
                  visibility: "off",
                  curZoomRegionId: "0",
                  curZoomRegion: "6,10",
                  level: "7",
                },
              },
              {
                featureType: "highway",
                elementType: "labels",
                stylers: {
                  visibility: "off",
                  curZoomRegionId: "0",
                  curZoomRegion: "6,10",
                  level: "8",
                },
              },
              {
                featureType: "highway",
                elementType: "labels",
                stylers: {
                  visibility: "off",
                  curZoomRegionId: "0",
                  curZoomRegion: "6,10",
                  level: "9",
                },
              },
              {
                featureType: "highway",
                elementType: "labels",
                stylers: {
                  visibility: "off",
                  curZoomRegionId: "0",
                  curZoomRegion: "6,10",
                  level: "10",
                },
              },
              {
                featureType: "provincialway",
                stylers: {
                  curZoomRegionId: "0",
                  curZoomRegion: "8,9",
                  level: "8",
                },
              },
              {
                featureType: "provincialway",
                stylers: {
                  curZoomRegionId: "0",
                  curZoomRegion: "8,9",
                  level: "9",
                },
              },
              {
                featureType: "provincialway",
                elementType: "geometry",
                stylers: {
                  visibility: "off",
                  curZoomRegionId: "0",
                  curZoomRegion: "8,9",
                  level: "8",
                },
              },
              {
                featureType: "provincialway",
                elementType: "geometry",
                stylers: {
                  visibility: "off",
                  curZoomRegionId: "0",
                  curZoomRegion: "8,9",
                  level: "9",
                },
              },
              {
                featureType: "provincialway",
                elementType: "labels",
                stylers: {
                  visibility: "off",
                  curZoomRegionId: "0",
                  curZoomRegion: "8,9",
                  level: "8",
                },
              },
              {
                featureType: "provincialway",
                elementType: "labels",
                stylers: {
                  visibility: "off",
                  curZoomRegionId: "0",
                  curZoomRegion: "8,9",
                  level: "9",
                },
              },
              {
                featureType: "cityhighway",
                stylers: {
                  curZoomRegionId: "0",
                  curZoomRegion: "6,10",
                  level: "6",
                },
              },
              {
                featureType: "cityhighway",
                stylers: {
                  curZoomRegionId: "0",
                  curZoomRegion: "6,10",
                  level: "7",
                },
              },
              {
                featureType: "cityhighway",
                stylers: {
                  curZoomRegionId: "0",
                  curZoomRegion: "6,10",
                  level: "8",
                },
              },
              {
                featureType: "cityhighway",
                stylers: {
                  curZoomRegionId: "0",
                  curZoomRegion: "6,10",
                  level: "9",
                },
              },
              {
                featureType: "cityhighway",
                stylers: {
                  curZoomRegionId: "0",
                  curZoomRegion: "6,10",
                  level: "10",
                },
              },
              {
                featureType: "cityhighway",
                elementType: "geometry",
                stylers: {
                  visibility: "off",
                  curZoomRegionId: "0",
                  curZoomRegion: "6,10",
                  level: "6",
                },
              },
              {
                featureType: "cityhighway",
                elementType: "geometry",
                stylers: {
                  visibility: "off",
                  curZoomRegionId: "0",
                  curZoomRegion: "6,10",
                  level: "7",
                },
              },
              {
                featureType: "cityhighway",
                elementType: "geometry",
                stylers: {
                  visibility: "off",
                  curZoomRegionId: "0",
                  curZoomRegion: "6,10",
                  level: "8",
                },
              },
              {
                featureType: "cityhighway",
                elementType: "geometry",
                stylers: {
                  visibility: "off",
                  curZoomRegionId: "0",
                  curZoomRegion: "6,10",
                  level: "9",
                },
              },
              {
                featureType: "cityhighway",
                elementType: "geometry",
                stylers: {
                  visibility: "off",
                  curZoomRegionId: "0",
                  curZoomRegion: "6,10",
                  level: "10",
                },
              },
              {
                featureType: "cityhighway",
                elementType: "labels",
                stylers: {
                  visibility: "off",
                  curZoomRegionId: "0",
                  curZoomRegion: "6,10",
                  level: "6",
                },
              },
              {
                featureType: "cityhighway",
                elementType: "labels",
                stylers: {
                  visibility: "off",
                  curZoomRegionId: "0",
                  curZoomRegion: "6,10",
                  level: "7",
                },
              },
              {
                featureType: "cityhighway",
                elementType: "labels",
                stylers: {
                  visibility: "off",
                  curZoomRegionId: "0",
                  curZoomRegion: "6,10",
                  level: "8",
                },
              },
              {
                featureType: "cityhighway",
                elementType: "labels",
                stylers: {
                  visibility: "off",
                  curZoomRegionId: "0",
                  curZoomRegion: "6,10",
                  level: "9",
                },
              },
              {
                featureType: "cityhighway",
                elementType: "labels",
                stylers: {
                  visibility: "off",
                  curZoomRegionId: "0",
                  curZoomRegion: "6,10",
                  level: "10",
                },
              },
              {
                featureType: "arterial",
                stylers: {
                  curZoomRegionId: "0",
                  curZoomRegion: "9,10",
                  level: "9",
                },
              },
              {
                featureType: "arterial",
                stylers: {
                  curZoomRegionId: "0",
                  curZoomRegion: "9,10",
                  level: "10",
                },
              },
              {
                featureType: "arterial",
                elementType: "geometry",
                stylers: {
                  visibility: "off",
                  curZoomRegionId: "0",
                  curZoomRegion: "9,10",
                  level: "9",
                },
              },
              {
                featureType: "arterial",
                elementType: "geometry",
                stylers: {
                  visibility: "off",
                  curZoomRegionId: "0",
                  curZoomRegion: "9,10",
                  level: "10",
                },
              },
              {
                featureType: "arterial",
                elementType: "labels",
                stylers: {
                  visibility: "off",
                  curZoomRegionId: "0",
                  curZoomRegion: "9,10",
                  level: "9",
                },
              },
              {
                featureType: "arterial",
                elementType: "labels",
                stylers: {
                  visibility: "off",
                  curZoomRegionId: "0",
                  curZoomRegion: "9,10",
                  level: "10",
                },
              },
              {
                featureType: "building",
                elementType: "geometry.topfill",
                stylers: {
                  color: "#2a3341ff",
                },
              },
              {
                featureType: "building",
                elementType: "geometry.sidefill",
                stylers: {
                  color: "#313b4cff",
                },
              },
              {
                featureType: "building",
                elementType: "geometry.stroke",
                stylers: {
                  color: "#1a212eff",
                },
              },
              {
                featureType: "road",
                elementType: "labels.text.fill",
                stylers: {
                  color: "#759879ff",
                },
              },
              {
                featureType: "road",
                elementType: "labels.text.stroke",
                stylers: {
                  color: "#1a2e1cff",
                },
              },
              {
                featureType: "provincialway",
                elementType: "labels.text.fill",
                stylers: {
                  color: "#759879ff",
                },
              },
              {
                featureType: "cityhighway",
                elementType: "labels.text.fill",
                stylers: {
                  color: "#759879ff",
                },
              },
              {
                featureType: "arterial",
                elementType: "labels.text.fill",
                stylers: {
                  color: "#759879ff",
                },
              },
              {
                featureType: "provincialway",
                elementType: "labels.text.stroke",
                stylers: {
                  color: "#1a2e1cff",
                },
              },
              {
                featureType: "cityhighway",
                elementType: "labels.text.stroke",
                stylers: {
                  color: "#1a2e1cff",
                },
              },
              {
                featureType: "arterial",
                elementType: "labels.text.stroke",
                stylers: {
                  color: "#1a2e1cff",
                },
              },
              {
                featureType: "local",
                elementType: "labels",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "manmade",
                elementType: "labels.text.fill",
                stylers: {
                  color: "#d69563ff",
                },
              },
              {
                featureType: "manmade",
                elementType: "labels.text.stroke",
                stylers: {
                  color: "#17263cff",
                },
              },
              {
                featureType: "subwaystation",
                elementType: "geometry",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "transportationlabel",
                elementType: "labels.icon",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "transportationlabel",
                elementType: "labels",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "estate",
                elementType: "geometry",
                stylers: {
                  color: "#2a3341ff",
                },
              },
            ],
          },
        },

        series: [
          {
            type: "effectScatter",
            coordinateSystem: "bmap",
            data: temData,
            symbol:
              "image://https://s3.bmp.ovh/imgs/2022/06/23/4664a0100da98724.png",
            symbolSize: 15,
            /**
             * label的显示有两种方式
             * 1.formatter回调函数，返回希望显示的内容，样式直接添加
             * 2.formatter字符串模板， 模板变量有：
                    {a}：系列名。
                    {b}：数据名。
                    {c}：数据值。
                    {@xxx}：数据中名为 'xxx' 的维度的值，如 {@product} 表示名为 'product' 的维度的值。
                    {@[n]}：数据中维度 n 的值，如 {@[3]} 表示维度 3 的值，从 0 开始计数。
                样式通过自定义富文本内容改变
             */
            label: {
              // 设置显示的地点名称
              show: false,
              position: "top",
              formatter: function (params) {
                return params.data.name;
              },
              color: "#fcd048",
              backgroundColor: "rgba(0, 2, 38, 0.4)",
              lineHeight: 32,
              // formatter: '{title|{c}}',
              // rich: {
              //     title: {
              //         color: '#000',
              //         backgroundColor: '#a0e80c'
              //     }
              // }
            },
            emphasis: {
              disabled: false,
              scale: 3,
              focus: "self", // 只聚焦（不淡出）当前高亮的数据的图形
            },
          },
        ],
      };
      this.myChart.setOption(option);
      // 获取百度地图实例，使用百度地图自带的控件
      this.mapModel = this.myChart.getModel().getComponent("bmap").getBMap();

      this.mapModel.addControl(new BMap.NavigationControl());
    },
    bmaproamHandler() {
      const option = this.myChart.getOption();
      if (option.bmap[0].zoom > 7) {
        option.series[0].label.show = true;
      } else {
        option.series[0].label.show = false;
      }

      this.myChart.setOption(option);
      // console.log(this.myChart.getOption(), '%%%%%%%%%%%%%%');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
