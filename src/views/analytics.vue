<template>
  <div id="app">
    <h1>
      <span>{{ $route.params.place }}</span>
    </h1>


    <v-row class="mb-4" justify="space-between">
      <v-col class="text-left">
        <span class="display-3 font-weight-light">{{fruits}}</span>
      </v-col>
    </v-row>
    <v-slider
      v-model="fruits"
      v-bind:tick-labels="slider"
      v-bind:max="4"
      step="1"
      ticks="always"
    >
    </v-slider>

    <div>
      <div>
        {{today[0].date}}
        {{today[0].temp}}
        <img v-bind:src="today[0].icon" />
      </div>

      <div :key="hour.id" v-for="hour in hours">
        {{hour.date}}
        {{hour.temp}}
      </div>

      <div :key="week.id" v-for="week in weeks">
        {{week.date}}
        {{week.temp}}
        <img v-bind:src="week.icon" />
      </div>
    </div>

    <div>
      <span>temp</span>
      <linechart v-if="loaded" :data="data1" :options="options" />
    </div>

    <v-row>
      <v-col cols="12" sm="6" md="6" lg="6" xl="6">
        <span>Days</span>
        <piechart v-if="loaded" :data="data2" :options="options2" />
      </v-col>
      <v-col cols="12" sm="6" md="6" lg="6" xl="6">
        <span>Precipitation amount</span>
        <radar v-if="loaded" :data="data4" :options="options2" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
import firebase from "firebase";
import moment from "moment";

import linechart from "@/components/chart/linechart";
import piechart from "@/components/chart/piechart";
import radar from "@/components/chart/radar";

export default {
  components: {
    linechart,
    piechart,
    radar
  },
  data() {
    return {
    fruits: 0,
    loaded: false,

      today: [
        {icon: null,date: null,temp: null},
      ],

      hours: [
         {id:0,date: null,temp: null},
         {id:1,date: null,temp: null},
         {id:2,date: null,temp: null},
         {id:3,date: null,temp: null},
         {id:4,date: null,temp: null},
      ],

      weeks: [
        {id:0,icon: null,date: null,temp: null},
        {id:1,icon: null,date: null,temp: null},
        {id:2,icon: null,date: null,temp: null},
        {id:3,icon: null,date: null,temp: null},
        {id:4,icon: null,date: null,temp: null},
        {id:5,icon: null,date: null,temp: null},
        {id:6,icon: null,date: null,temp: null},
      ],

      slider: [null],
      slider2: [     "😭",
      "😢",
      "☹️",
      "🙁",
      "😐",],


      data1: {
        labels: [],
        datasets: [
          {
            label: "℃",
            data: [],
            backgroundColor: "transparent",
            borderColor: "rgba(1, 116, 188, 0.50)",
            pointBackgroundColor: "rgba(171, 71, 188, 1)"
          }
        ]
      },

      data2: {
        labels: ["rain", "cloud", "sun"],
        datasets: [
          {
            label: "℃",
            data: [20, 10, 40],
            data2: [],
            borderWidth: 1,
            borderColor: "#FC2525",
            pointBackgroundColor: "rgba(255, 0,0, 0.5)",
            pointBorderColor: "white",
            backgroundColor: "rgba(255, 0,0, 0.5)"
          }
        ]
      },


      data4: {
        labels: ["1月", "2月", "3月", "4月", "5月", "6月", "7月"],
        datasets: [
          {
            label: "My First dataset",
            backgroundColor: "rgba(179,181,198,0.2)",
            borderColor: "rgba(179,181,198,1)",
            pointBackgroundColor: "rgba(179,181,198,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(179,181,198,1)",
            data: [65, 59, 90, 81, 56, 55, 40]
          },
          {
            label: "My Second dataset",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            pointBackgroundColor: "rgba(255,99,132,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(255,99,132,1)",
            data: [28, 48, 40, 19, 96, 27, 100]
          }
        ]
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              gridLines: {
                display: true,
                color: "rgba(0, 0, 0, 0.1)"
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: "rgba(0, 0, 0, 0.1)"
              }
            }
          ]
        }
      },
      options2: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              display: false
            }
          ],
          yAxes: [
            {
              display: false
            }
          ]
        }
      },

    };
  },
  created: function() {
    let m = moment();
    let Year = m.format("YYYY");
    let Month = m.format("MM");
    let day = m.format("DD");
    this.Today = Year + "" + Month + "" + day;
    this.db = firebase.firestore();

    this.db
      .collection(this.$route.params.place)
      .where("Timestamp", "<=", this.Today) //今日までのtempを取得
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.data1.datasets[0].data.push(doc.data().temp);
          this.data1.labels.push(doc.data().Timestamp2);
          this.loaded = true;
        });
      });

  axios;
    let lat = this.$route.params.lat;
    let lon = this.$route.params.lon;
    let getKey = "appid=4dff50a83aa2145ba555d8f59e9d3ef0";
      axios.get("https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&units=metric&"+getKey).then(
      function (response) {
        this.today[0].icon ="https://openweathermap.org/img/w/" +response.data.current.weather[0].icon +".png";
        this.today[0].date = new Date(response.data.current.dt * 1000).toLocaleDateString("ja-JP").slice(5);
        this.today[0].temp = response.data.current.temp;

      for (let i = 0, j = 2 ; i < this.hours.length; i++,j=j+2) {
        this.hours[i].date = new Date(response.data.hourly[j].dt * 1000).toLocaleTimeString().slice(0,5);
        this.hours[i].temp = response.data.hourly[j].temp;
        this.slider[i] = new Date(response.data.hourly[j].dt * 1000).toLocaleTimeString().slice(0,5);
      }

      for (let i = 0, j = 1 ; i < this.weeks.length; i++,j++) {
        this.weeks[i].icon = "https://openweathermap.org/img/w/" +response.data.daily[j].weather[0].icon +".png";
        this.weeks[i].date = new Date(response.data.daily[j].dt * 1000).toLocaleDateString("ja-JP").slice(5);
        this.weeks[i].temp = response.data.daily[j].temp.day;
      }
      }.bind(this)
    );

  }
};
</script>
