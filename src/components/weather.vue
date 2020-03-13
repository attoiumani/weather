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
        <v-btn @click="sendItem" text>
          firestoreに送信する
          <v-icon color="orange">mdi-firebase</v-icon>
        </v-btn>
      </div>
    </v-expand-transition>
  </v-card>
</template>


<script>
import axios from "axios";
import firebase from "firebase";

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
      show: false,
      YMT: null
    };
  },
  created: function() {
    axios;
    let now = new Date();
    let Year = now.getFullYear();
    let Month = now.getMonth() + 1;
    let Today = now.getDate();
    this.YMT = Year + "/" + Month + "/" + Today;

    
    let selectedCity = this.place; //props
    let getUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
    let getKey = ",jp&units=metric&appid=4dff50a83aa2145ba555d8f59e9d3ef0";
    getUrl = getUrl + selectedCity + getKey;
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
    },
    sendItem() {
      //firebase firestore
      const saveData = {
        temp: this.temp,
        maxtemp: this.maxtemp,
        mintemp: this.mintemp
      };
      firebase
        .firestore()
        .collection(this.place) //props
        .doc(this.YMT)  //YearMonthToday
        .set({
          temp: saveData.temp,
          maxtemp: saveData.maxtemp,
          mintemp: saveData.mintemp
        })
        .then(function(docRef) {
          // 正常にデータ保存できた時の処理
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          // エラー発生時の処理
          console.error("Error adding document: ", error);
        });
    }
  },
  props: ["place"]
};
</script>
