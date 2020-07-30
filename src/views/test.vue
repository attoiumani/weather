<template>
  <div id="app">
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
  name: "App",
  components: {
    GChart
  },
  data() {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: [
        ["States", "temp"],
        ["北海道", 59406],
        ["青森", 42103],
        ["秋田", 40671],
      ],
      chartOptions: {
        colorAxis: {
          colors: ["f4e0d6", "ca6633"]
        },
        backgroundColor: "transparent",
        datalessRegionColor: "white",
        defaultColor: "white",
        region: "JP",
        displayMode: "region",
        resolution: "provinces",
        width: 500
      }
    };
  },

};
</script>
