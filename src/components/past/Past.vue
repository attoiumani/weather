<!--testコンポーネントsapporo一週間とる-->

<template>
  <v-card
    class="mx-auto"
    max-width="400"
  >
    <v-img class="white--text align-end" height="300px" :src="image_src">
      <v-card-title>{{city}}</v-card-title>
    </v-img>

    <v-card-text>
      <v-row align="center">
        <v-col class="headline" cols="6">
          {{temp}}&deg;C
        </v-col>
        <v-col cols="6">
<img v-bind:src="icon" />
        </v-col>
      </v-row>
    </v-card-text>

    <v-list-item>
      <v-list-item-icon>
        <v-icon>mdi-send</v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle>23 km/h</v-list-item-subtitle>
    </v-list-item>

    <v-list-item>
      <v-list-item-icon>
        <v-icon>mdi-cloud-download</v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle>48%</v-list-item-subtitle>
    </v-list-item>


    <v-list class="transparent">
      <v-list-item
      >
        <v-list-item-title>月曜日</v-list-item-title>

        <v-list-item-icon>
          <img v-bind:src="icon" />
        </v-list-item-icon>

        <v-list-item-subtitle class="text-right">
          ああ
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn text>Full Report</v-btn>
    </v-card-actions>
  </v-card>
</template>





<script>
import axios from "axios";
import firebase from "firebase";

export default {
  data() {
    return {
      image_src: require("@/assets/images/sapporo.png"),
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
    axios
      .get(
        "http://api.openweathermap.org/data/2.5/forecast?q=Tokyo&units=metric&APPID=4dff50a83aa2145ba555d8f59e9d3ef0"
      )
      .then(
        function(response) {
          this.temp = response.data.list[0].main.temp;
                    this.icon =
            "https://openweathermap.org/img/w/" +
            response.data.list[0].weather[0].icon +
            ".png";
          this.condition = response.data.weather[0];
        }.bind(this)
      );
    let now = new Date();
    let Year = now.getFullYear();
    let Month = now.getMonth() + 1;
    let Today = now.getDate();
    this.YMT = Year + "/" + Month + "/" + Today;
  },
  methods: {
    twitterShare() {
      //twitter share
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
        .collection("sapporo")
        .doc(this.YMT)
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
  }
};
</script>
