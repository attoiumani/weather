<template>
  <v-row>

    <v-container>
      <v-overflow-btn :items="dropdown" label="select & click!" segmented></v-overflow-btn>
    </v-container>

    <v-col :key="item.id" v-for="item in Items" cols="12" sm="12" md="6" lg="4" xl="4">
      <WeatherCard :place="item.place" :lon="item.lon" :lat="item.lat" @emit="parentMethod" />
    </v-col>

    <!--<GChart
      :settings="{ packages: ['geochart']}"
      type="GeoChart"
      :data="chartData"
      :options="chartOptions"
    />-->
  </v-row>
</template>


<script>
import WeatherCard from "@/components/WeatherCard";
//import { GChart } from "vue-google-charts";

export default {
  components: {
    WeatherCard,
    //GChart 
  },
  data() {
    return {
      Items: [
        { id: 1, place: "hokkaido", lat:43.06417, lon:141.34694 , temp: null },
        { id: 2, place: "aomori", lat:40.82444, lon:140.74 ,temp: null },
        { id: 3, place: "akita",lat:39.71861, lon:140.1025 , temp: null },
        { id: 4, place: "yamagata",lat:38.24056, lon:140.36333 , temp: null },
        { id: 5, place: "tokyo", lat:35.68944, lon:139.69167 ,temp: null },
        { id: 6, place: "ishikawa", lat:36.59444, lon:136.62556 ,temp: null },
        { id: 7, place: "osaka", lat:34.68639, lon:135.52 ,temp: null },
        { id: 8, place: "fukuoka",lat:33.60639, lon:130.41806 , temp: null },
      ],
      chartData: [
        ["States", "temp"],
        ["hokkaido", null],
        ["aomori", null],
        ["akita", null],
        ["yamagata", null],
        ["tokyo", null],
        ["ishikawa", null],
        ["osaka", null],
        ["fukuoka", null],
      ],

      dropdown: [
        {
          text: "N→S",
          callback: () =>
            this.Items.sort(function (a, b) {
              if (a.id < b.id) return -1;
              if (a.id > b.id) return 1;
              return 0;
            }),
        },
        {
          text: "A→Z",
          callback: () =>
            this.Items.sort(function (a, b) {
              if (a.place < b.place) return -1;
              if (a.place > b.place) return 1;
              return 0;
            }),
        },
        {
          text: "0℃→1℃",
          callback: () =>
            this.Items.sort(function (a, b) {
              if (a.temp < b.temp) return -1;
              if (a.temp > b.temp) return 1;
              return 0;
            }),
        },
        {
          text: "1℃→0℃",
          callback: () =>
            this.Items.sort(function (a, b) {
              if (a.temp > b.temp) return -1;
              if (a.temp < b.temp) return 1;
              return 0;
            }),
        },
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
  
  methods: {
    parentMethod(temp, place) {
      for (let i = 0 ,j=1; i < this.Items.length; i++,j++) {
        if (this.Items[i].place == place) {
          this.Items[i].temp = temp;
          this.chartData[j][1]=temp;
        }
      }
    },
    selectHandler(reg) {
      console.log(reg);
      alert(reg.region);
    },
  },
};
</script>
