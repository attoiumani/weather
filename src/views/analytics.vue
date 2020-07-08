<template>
  <div id="app">
    <span>
    This page is {{ $route.params.value }} analytics
    </span>
    <linechart v-if="loaded" :data="data1" :options="options" />
    <piechart v-if="loaded" :data="data2" :options="options" />
    <bar v-if="loaded" :data="data3" :options="options" />
    <radar v-if="loaded" :data="data1" :options="options" />
  </div>
</template>

<script>
import firebase from "firebase";
import moment from "moment";

import linechart from "@/components/chart/linechart";
import piechart from "@/components/chart/piechart";
import radar from "@/components/chart/radar";
import bar from "@/components/chart/bar";

export default {
  components: {
    linechart,
    piechart,
    radar,
    bar
  },
  data() {
    return {
      loaded: false,
      name: null,
      data1: {
        labels: [],
        datasets: [
          {
            label: "℃",
            data: [],
            borderWidth: 1,
            borderColor: "#FC2525",
            pointBackgroundColor: "rgba(255, 0,0, 0.5)",
            pointBorderColor: "white",
            backgroundColor: "rgba(255, 0,0, 0.5)"
          }
        ]
      },


      data2: {
        labels: ["rain","cloud","sun"],
        datasets: [
          {
            label: "℃",
            data: [20,10,40],
            data2: [],
            borderWidth: 1,
            borderColor: "#FC2525",
            pointBackgroundColor: "rgba(255, 0,0, 0.5)",
            pointBorderColor: "white",
            backgroundColor: "rgba(255, 0,0, 0.5)"
          }
        ]
      },

            data3: {
        labels: ["1月","2月","3月"],
        datasets: [
          {
            label: "mm",
            data: [80,80,80],
            data2: [],
            borderWidth: 1,
            borderColor: "#FC2525",
            pointBackgroundColor: "rgba(255, 0,0, 0.5)",
            pointBorderColor: "white",
            backgroundColor: "rgba(255, 0,0, 0.5)"
          }
        ]
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              gridLines: {
                display: true,
                color: "rgba(0, 0, 0, 0.1)"
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: "rgba(0, 0, 0, 0.1)"
              }
            }
          ]
        }
      }
    };
  },
  created: function() {
    let m = moment();
    let Year = m.format("YYYY");
    let Month = m.format("MM");
    let day = m.format("DD");
    this.Today = Year + "" + Month + "" + day;
    this.db = firebase.firestore();


    this.db
      .collection(this.$route.params.value)
      .where("Timestamp", "<=", this.Today) //今日までのtempを取得
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.data1.datasets[0].data.push(doc.data().temp);
          this.data1.labels.push(doc.data().Timestamp2);
          this.loaded = true;
        });
      });
        /*  this.db
      .collection(this.$route.params.value)
      .where("Timestamp", "<=", this.Today) //今日までのtempを取得
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.data2.labels.push(doc.data().condition);
          this.data2.datasets[0].data2.push(doc.data().condition);
          this.loaded = true;
        });
      });*/
  }
};
</script>