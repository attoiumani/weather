<template>
  <div id="app">
    <h1>
      <span>{{ $route.params.place }}</span>
    </h1>

    <v-row class="mb-4" justify="space-between">
      <v-col class="text-left">
        <span class="display-3 font-weight-light">{{sliderTemp}}</span>
      </v-col>
    </v-row>
    <v-slider v-model="sliderNum" v-bind:tick-labels="slider" v-bind:max="5" @click="test" step="1" ticks="always"></v-slider>

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

<analyticsChart/>

  </div>
</template>

<script>
import axios from "axios";
import analyticsChart from "@/components/analyticsChart";




export default {
  components: {
analyticsChart
  },
  data() {
    return {


      today: [
        {icon: null,date: null,temp: null},
      ],

      hours: [
         {id:0,slidekey:1,date: null,temp: null},
         {id:1,slidekey:2,date: null,temp: null},
         {id:2,slidekey:3,date: null,temp: null},
         {id:3,slidekey:4,date: null,temp: null},
         {id:4,slidekey:5,date: null,temp: null},
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
      sliderNum: 0,
      sliderTemp: 0,





    };
  },
  created: function() {


  axios;
    let lat = this.$route.params.lat;
    let lon = this.$route.params.lon;
    let getKey = "appid=4dff50a83aa2145ba555d8f59e9d3ef0";
      axios.get("https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&units=metric&"+getKey).then(
      function (response) {
        this.today[0].icon ="https://openweathermap.org/img/w/" +response.data.current.weather[0].icon +".png";
        this.today[0].date = new Date(response.data.current.dt * 1000).toLocaleDateString("ja-JP").slice(5);
        this.today[0].temp = response.data.current.temp;

      for (let i = 0, j = 1 ,k=1; i < this.hours.length; k++,i++,j=j+2) {
        this.hours[i].date = new Date(response.data.hourly[j].dt * 1000).toLocaleTimeString().slice(0,5);
        this.hours[i].temp = response.data.hourly[j].temp;
        this.slider[k] = new Date(response.data.hourly[j].dt * 1000).toLocaleTimeString().slice(0,5);
        this.slider[0]="now"
      }

      for (let i = 0, j = 1 ; i < this.weeks.length; i++,j++) {
        this.weeks[i].icon = "https://openweathermap.org/img/w/" +response.data.daily[j].weather[0].icon +".png";
        this.weeks[i].date = new Date(response.data.daily[j].dt * 1000).toLocaleDateString("ja-JP").slice(5);
        this.weeks[i].temp = response.data.daily[j].temp.day;
      }
      }.bind(this)
    );
  },

  methods: {
    test() {
    for(let i=0;i<this.hours.length;i++){
      if(this.sliderNum==this.hours[i].slidekey){
      this.sliderTemp=this.hours[i].temp;
      }
     }
     if(this.sliderNum==0){
       this.sliderTemp=this.today[0].temp
     }
    }
  },
};
</script>
