<template>
  <v-card class="mx-auto" max-width="400">
    <v-img class="white--text align-end" height="300px" :src="image_src">
      <v-card-title>{{city}}</v-card-title>
    </v-img>
    <v-card-subtitle class="pb-0 text--primary">
      <img v-bind:src="icon" />
      <div v-show="loading">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </div>
      <div v-show="!dataOutputLoading">{{temp}}℃</div>
    </v-card-subtitle>
    <v-card-text>
      <div>Today's high temperature {{maxtemp}}℃</div>
      <div>Lowest Temperature {{mintemp}}℃</div>
      <div>The current weather {{condition.main }}</div>
    </v-card-text>
    <v-card-actions class="pt-0">
      <v-spacer></v-spacer>
      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show">
        <v-btn @click="twitterShare" text>
          Share
          <v-icon color="blue">mdi-twitter</v-icon>
        </v-btn>
      </div>
    </v-expand-transition>
  </v-card>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      image_src: require(`@/assets/images/${this.place}.png`), //props
      city: null,
      temp: null,
      maxtemp: null,
      mintemp: null,
      condition: {
        main: null
      },
      loading: true,
      show: false
    };
  },
  created: function() {
    axios;
    let selectedCity = this.place; //props
    let getUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
    let getParam = ",jp&units=metric&appid=4dff50a83aa2145ba555d8f59e9d3ef0";
    getUrl = getUrl + selectedCity + getParam;
    return axios.get(getUrl).then(
      function(response) {
        this.city = response.data.name;
        this.temp = response.data.main.temp;
        this.maxtemp = response.data.main.temp_max;
        this.mintemp = response.data.main.temp_min;
        this.condition = response.data.weather[0];
        this.icon =
          "https://openweathermap.org/img/w/" +
          response.data.weather[0].icon +
          ".png";
        this.loading = false;
      }.bind(this)
    );
  },
  methods: {
    twitterShare() {
      var shareURL =
        "https://twitter.com/intent/tweet?text=" +
        this.city +
        this.temp +
        "%20%23今の温度";
      //シェア用の画面へ移行
      location.href = shareURL;
    }
  },
  props: ["place"]
};
</script>
