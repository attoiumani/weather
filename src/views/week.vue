<template>
  <div>
    
    <div>
      {{today[0].date}}
      {{today[0].temp}}
      <img v-bind:src="today[0].icon" />
    </div>

    <div :key="hour.id" v-for="hour in hours">
      {{hour.temp}}
      {{hour.date}}
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

      hours: [
         {id:0,date: null,temp: null},
         {id:1,date: null,temp: null}, 
         {id:2,date: null,temp: null}, 
         {id:3,date: null,temp: null}, 
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

      for (let i = 0, j = 3 ; i < this.hours.length; i++,j=j+3) {
        this.hours[i].temp = new Date(response.data.hourly[j].dt * 1000).toLocaleTimeString().slice(0,5);
        this.hours[i].date = response.data.hourly[j].temp;
      }


      for (let i = 0, j = 1 ; i < this.weeks.length; i++,j++) {
        this.weeks[i].icon = "https://openweathermap.org/img/w/" +response.data.daily[j].weather[0].icon +".png";
        this.weeks[i].date = new Date(response.data.daily[j].dt * 1000).toLocaleDateString("ja-JP").slice(5);
        this.weeks[i].temp = response.data.daily[j].temp.day;
      }

      }.bind(this)
    );

  },
  methods: {},
};

//https://api.openweathermap.org/data/2.5/onecall?lat=35.681236&lon=139.767125&units=metric&appid=4dff50a83aa2145ba555d8f59e9d3ef0
//http://api.openweathermap.org/data/2.5/forecast?lat=35.681236&lon=139.767125&units=metric&lang=ja&APPID=4dff50a83aa2145ba555d8f59e9d3ef0
</script>