<template>
    <v-card class="mx-auto" max-width="400">
      <v-img class="white--text align-end" height="300px" :src="image_src">
        <v-card-title>{{city}}</v-card-title>
      </v-img>
      <v-card-subtitle class="pb-0 text--primary">
        Now
        <div v-show="loading">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </div>
        <div v-show="!dataOutputLoading">{{temp}}℃</div>
      </v-card-subtitle>
      <v-card-text>
        <div>Today's high temperature {{maxtemp}}℃</div>
        <div>Lowest Temperature {{mintemp}}℃</div>
        <div>The current weather {{condition.main }}</div>
        <img v-bind:src="icon">
      </v-card-text>
      <v-card-actions>
        <v-btn color="orange" text>Share</v-btn>
        <v-btn color="orange" text>Explore</v-btn>
      </v-card-actions>
    </v-card>
</template>


<script>
import axios from "axios";


export default {
  data() {
    return {
    image_src: require("../../assets/osaka.png") ,
    city: null,
    temp: null,
    maxtemp: null,
    mintemp: null,
    condition: {
      main: null
    },
    loading: true
    }
  },
  mounted: function(){
    axios.get('https://api.openweathermap.org/data/2.5/weather?q=Osaka,jp&units=metric&appid=4dff50a83aa2145ba555d8f59e9d3ef0')
    .then(function(response){
      this.city = response.data.name
      this.temp = response.data.main.temp
      this.maxtemp = response.data.main.temp_max
      this.mintemp = response.data.main.temp_min
      this.condition = response.data.weather[0]
      this.icon = "https://openweathermap.org/img/w/" + response.data.weather[0].icon + ".png"
      this.loading = false;
    }.bind(this))
  },
  };
</script>
