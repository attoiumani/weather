<template>
  <v-card class="mx-auto" max-width="400">
    <v-img class="white--text align-end" height="300px" :src="image_src">
      <v-card-title>{{city}}</v-card-title>
    </v-img>
    <v-card-subtitle class="pb-0 text--primary">
      <img v-bind:src="icon" />
      <div v-show="loading">
        <v-progress-circular indeterminate color="#D32F2F"></v-progress-circular>
      </div>

      <div v-show="!loading" class="display-1">{{temp}}℃</div>
    </v-card-subtitle>
    <v-card-text>
      <div class="headline">
        <span class="red--text">{{maxtemp}}℃</span>
        /
        <span class="blue--text">{{mintemp}}℃</span>
      </div>
      <div>
        <router-link :to="{ name: 'analytics', params: { value: this.place }}"></router-link>
      </div>
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
          <v-icon color="blue">mdi-twitter</v-icon>
        </v-btn>
        <v-btn text>
          <router-link :to="{ name: 'analytics', params: { value: this.place }}">Analytics</router-link>
        </v-btn>
      </div>
    </v-expand-transition>
  </v-card>
</template>


<script>
import axios from "axios";
import firebase from "firebase";
import moment from "moment";

export default {
  data() {
    return {
      image_src: require(`@/assets/images/${this.place}.png`), //props
      city: null,
      temp: null,
      maxtemp: null,
      mintemp: null,
      wind: null,
      condition: {
        main: null
      },
      loading: true,
      show: false,
      Timestamp: null,
      Timestamp2: null
    };
  },
  created: function() {
    axios;
    let m = moment();
    let Year = m.format("YYYY");
    let Month = m.format("MM");
    let day = m.format("DD");
    this.Timestamp = Year + "" + Month + "" + day;
    this.Timestamp2 = Year + "/" + Month + "/" + day;

    let selectedCity = this.place; //props
    let getUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
    let getKey = ",jp&units=metric&appid=4dff50a83aa2145ba555d8f59e9d3ef0";
    let Url = getUrl + selectedCity + getKey;
    return axios.get(Url).then(
      function(response) {
        this.city = response.data.name;
        this.temp = response.data.main.temp;
        this.maxtemp = response.data.main.temp_max;
        this.mintemp = response.data.main.temp_min;
        this.wind = response.data.wind.speed;
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
  updated() {
    firebase
      .firestore()
      .collection(this.place) //props
      .doc(this.Timestamp) //tody
      .set({
        temp: this.$store.getters.getStateDataSetTemp,
        maxtemp: this.maxtemp,
        mintemp: this.mintemp,
        Timestamp: this.Timestamp,
        Timestamp2: this.Timestamp2,
        wind: this.wind,
        condition: this.condition.main
      })
      .then(function(docRef) {
        // 正常にデータ保存できた時の処理
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
        // エラー発生時の処理
        console.error("Error adding document: ", error);
      });
  },
  props: ["place"]
};
</script>
