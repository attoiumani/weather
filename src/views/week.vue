<template>
  <div>
    {{date}}
    {{date3}}
    {{temp}}
    <img v-bind:src="icon" />
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
    };
  },
  created: function () {
    axios;

    let getUrl =
      "https://api.openweathermap.org/data/2.5/onecall?lat=35.681236&lon=139.767125&units=metric&&exclude=minutely&";
    let getKey = "appid=4dff50a83aa2145ba555d8f59e9d3ef0";
    let Url = getUrl + getKey;
    return axios.get(Url).then(
      function (response) {
        this.dt = response.data.current.dt;
        this.date = new Date(this.dt * 1000).toLocaleDateString("ja-JP").slice(5);
        this.dt3 = response.data.hourly[3].dt;
        this.date3 = new Date(this.dt3 * 1000).toLocaleTimeString();
        this.temp = response.data.current.temp;
        this.icon ="https://openweathermap.org/img/w/" +response.data.current.weather[0].icon +".png";
      }.bind(this)
    );
  },
  methods: {},
};
</script>