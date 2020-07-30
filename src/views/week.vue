<template>
  <div>
    
    <div>
      {{today[0].date}}
      {{today[0].temp}}
      <img v-bind:src="today[0].icon" />
    </div>

    <div>
      {{hour[0].temp}}
      {{hour[0].date}}
    </div>

    <div :key="week.id" v-for="week in weeks">
      {{week.date}}
      {{week.temp}}
      <img v-bind:src="week.icon" />
    </div>
  </div>
</template>




<script>
import axios from "axios";

export default {
  data() {
    return {

      today: [
        {icon: null,date: null,temp: null},
      ],

      hour: [
         {id:0,icon: null,date: null,temp: null},
      ],

      weeks: [
        {id:0,icon: null,date: null,temp: null},
        {id:1,icon: null,date: null,temp: null},
        {id:2,icon: null,date: null,temp: null},
        {id:3,icon: null,date: null,temp: null},
        {id:4,icon: null,date: null,temp: null},
        {id:5,icon: null,date: null,temp: null},
        {id:6,icon: null,date: null,temp: null},
        {id:7,icon: null,date: null,temp: null},
      ],

    };
  },

  created: function () {
    axios;

    let getUrl ="https://api.openweathermap.org/data/2.5/onecall?lat=35.681236&lon=139.767125&units=metric&";
    let getKey = "appid=4dff50a83aa2145ba555d8f59e9d3ef0";
      axios.get(getUrl + getKey).then(
      function (response) {
        this.today[0].icon ="https://openweathermap.org/img/w/" +response.data.current.weather[0].icon +".png";
        this.today[0].date = new Date(response.data.current.dt * 1000).toLocaleDateString("ja-JP").slice(5);
        this.today[0].temp = response.data.current.temp;

        this.hour[0].temp = new Date(response.data.hourly[3].dt * 1000).toLocaleTimeString().slice(0,5);
        this.hour[0].date = response.data.hourly[3].temp;


      for (let i = 1, j = 0 ; i < this.weeks.length; i++,j++) {
        this.weeks[j].icon = "https://openweathermap.org/img/w/" +response.data.daily[i].weather[0].icon +".png";
        this.weeks[j].date = new Date(response.data.daily[i].dt * 1000).toLocaleDateString("ja-JP").slice(5);
        this.weeks[j].temp = response.data.daily[i].temp.day;
      }

      }.bind(this)
    );

  },
  methods: {},
};

//https://api.openweathermap.org/data/2.5/onecall?lat=35.681236&lon=139.767125&units=metric&appid=4dff50a83aa2145ba555d8f59e9d3ef0
//http://api.openweathermap.org/data/2.5/forecast?lat=35.681236&lon=139.767125&units=metric&lang=ja&APPID=4dff50a83aa2145ba555d8f59e9d3ef0
</script>