<template>
  <div>
    {{date}}
    {{date3}}
    {{temp}}
    <img v-bind:src="icon" />
    <img v-bind:src="icon" />
    {{fmonth}}
    {{fdate}}
    {{ftemp}}
    {{fdate3}}
    {{ftemp3}}

  </div>
</template>




<script>
import axios from "axios";

export default {
  data() {
    return {
      dt: null,
      dt3: null,
      date: null,
      date3: null,
      temp: null,
      icon: null,

      fmonth:null,
      ftemp:null,
      ftemp3:null,
      fdt:null,
      fdt3:null,
      fdate:null,
      fdate3:null
    };
  },
  created: function () {
    axios;

    let getUrl ="https://api.openweathermap.org/data/2.5/onecall?lat=35.681236&lon=139.767125&units=metric&";
    let getUrl2 ="http://api.openweathermap.org/data/2.5/forecast?lat=35.681236&lon=139.767125&units=metric&lang=ja&";
    let getKey = "appid=4dff50a83aa2145ba555d8f59e9d3ef0";
      axios.get(getUrl + getKey).then(
      function (response) {
        this.dt = response.data.current.dt;
        this.date = new Date(this.dt * 1000).toLocaleDateString("ja-JP").slice(5);
        this.dt3 = response.data.hourly[3].dt;
        this.date3 = new Date(this.dt3 * 1000).toLocaleTimeString().slice(0,4);
        this.temp = response.data.current.temp;
        this.icon ="https://openweathermap.org/img/w/" +response.data.current.weather[0].icon +".png";
      }.bind(this)
    );

      axios.get(getUrl2 + getKey).then(
      function (response) {
        this.fdt = response.data.list[0].dt_txt;
        this.fdate=this.fdt.slice(11,16);
        this.ftemp = response.data.list[0].main.temp;

        this.fdt3 = response.data.list[1].dt_txt;
        this.fdate3=this.fdt3.slice(11,16);
        this.ftemp3 = response.data.list[1].main.temp;

        this.fmonth=this.fdt.slice(5,10);
      }.bind(this)
    );

  },
  methods: {},
};

//https://api.openweathermap.org/data/2.5/onecall?lat=35.681236&lon=139.767125&units=metric&appid=4dff50a83aa2145ba555d8f59e9d3ef0
//http://api.openweathermap.org/data/2.5/forecast?lat=35.681236&lon=139.767125&units=metric&lang=ja&APPID=4dff50a83aa2145ba555d8f59e9d3ef0
</script>