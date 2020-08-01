

<template>
  <div>
    <GChart
      :settings="{ packages: ['geochart']}"
      type="GeoChart"
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>



<script>
import { GChart } from "vue-google-charts";

export default {
    components: {
    GChart 
  },
  data() {
    return {
      chartData: [
        ["States", "temp"],
        ["hokkaido", 100],
        ["aomori", 200],
        ["akita", 300],
        ["yamagata", 300],
        ["tokyo", 300],
        ["ishikawa", 300],
        ["osaka", 300],
        ["fukuoka", 300],
      ],
      chartOptions: {
        colorAxis: {
          colors: ["f4e0d6", "ca6633"],
        },
        backgroundColor: "transparent",
        datalessRegionColor: "white",
        defaultColor: "white",
        region: "JP",
        displayMode: "region",
        resolution: "provinces",
        width: 500,
      },
    };
  },
  methods: {
    selectHandler(reg) {
      console.log(reg);
      alert(reg.region);
    },
  },
};
</script>