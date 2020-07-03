<template>
  <div id="app">
    This is hoge page. value is {{ $route.params.value }}
    <linechart :place="name" />
    <piechart v-if="loaded" :data="data" :options="options" />
    <bar :place="name" />
    <radar :place="name" />
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
      data: {
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
    this.name = this.$route.params.value;
    let m = moment();
    let Year = m.format("YYYY");
    let Month = m.format("MM");
    let day = m.format("DD");
    this.Today = Year + "" + Month + "" + day;
    this.db = firebase.firestore();
    this.db
      .collection(this.name)
      .where("Timestamp", "<=", this.Today) //今日までのtempを取得
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.data.datasets[0].data.push(doc.data().temp);
          this.data.labels.push(doc.data().Timestamp2);
          this.loaded = true;
        });
      });
  }
};
</script>