<template>
  <div>
    <div>
      {{date}}
      {{temp}}
      <img v-bind:src="icon" />
    </div>
    <div>
      {{date3}}
      {{temp3}}
    </div>
    <div>
      {{day1date}}
      {{day1temp}}
      <img v-bind:src="day1icon" />
    </div>
    <div>
      {{twodate}}
      {{twotemp}}
      <img v-bind:src="twoicon" />
    </div>
    <div>
      {{threedate}}
      {{threetemp}}
      <img v-bind:src="threeicon" />
    </div>
  </div>
</template>




<script>
import axios from "axios";

export default {
  data() {
    return {
      date: null,
      temp: null,
      icon: null,
      
      date3: null,
      temp3:null,

      day1date:null,
      day1temp:null,
      day1icon:null,

      twodate:null,
      twotemp:null,
      twoicon:null,

      threedate:null,
      threetemp:null,
      threeicon:null,
    };
  },
  created: function () {
    axios;

    let getUrl ="https://api.openweathermap.org/data/2.5/onecall?lat=35.681236&lon=139.767125&units=metric&";
    let getKey = "appid=4dff50a83aa2145ba555d8f59e9d3ef0";
      axios.get(getUrl + getKey).then(
      function (response) {
        this.icon ="https://openweathermap.org/img/w/" +response.data.current.weather[0].icon +".png";
        this.date = new Date(response.data.current.dt * 1000).toLocaleDateString("ja-JP").slice(5);
        this.temp = response.data.current.temp;

        this.date3 = new Date(response.data.hourly[3].dt * 1000).toLocaleTimeString().slice(0,5);
        this.temp3 = response.data.hourly[3].temp;

        this.day1icon ="https://openweathermap.org/img/w/" +response.data.daily[1].weather[0].icon +".png";
        this.day1date = new Date(response.data.daily[1].dt * 1000).toLocaleDateString("ja-JP").slice(5);
        this.day1temp = response.data.daily[1].temp.day;

        this.twoicon ="https://openweathermap.org/img/w/" +response.data.daily[2].weather[0].icon +".png";
        this.twodate = new Date(response.data.daily[2].dt * 1000).toLocaleDateString("ja-JP").slice(5);
        this.twotemp = response.data.daily[2].temp.day;

        this.threeicon ="https://openweathermap.org/img/w/" +response.data.daily[3].weather[0].icon +".png";
        this.threedate = new Date(response.data.daily[3].dt * 1000).toLocaleDateString("ja-JP").slice(5);
        this.threetemp = response.data.daily[3].temp.day;



      }.bind(this)
    );

  },
  methods: {},
};

//https://api.openweathermap.org/data/2.5/onecall?lat=35.681236&lon=139.767125&units=metric&appid=4dff50a83aa2145ba555d8f59e9d3ef0
//http://api.openweathermap.org/data/2.5/forecast?lat=35.681236&lon=139.767125&units=metric&lang=ja&APPID=4dff50a83aa2145ba555d8f59e9d3ef0
</script>