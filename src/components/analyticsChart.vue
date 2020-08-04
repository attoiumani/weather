<template>
  <div class="mb-10">
    <div>
      <span>temp</span>
      <linechart v-if="loaded" :data="data1" :options="options" />
    </div>

<!--
    <v-row>
      <v-col cols="12" sm="6" md="6" lg="6" xl="6">
        <span>Days</span>
        <piechart v-if="loaded" :data="data2" :options="options2" />
      </v-col>
      <v-col cols="12" sm="6" md="6" lg="6" xl="6">
        <span>Precipitation amount</span>
        <radar v-if="loaded" :data="data3" :options="options2" />
      </v-col>
    </v-row>
    -->
  </div>
</template>


<script>
import firebase from "firebase";
import moment from "moment";
import linechart from "@/components/chart/linechart";
//import piechart from "@/components/chart/piechart";
//import radar from "@/components/chart/radar";

export default {
  components: {
    linechart,
    //piechart,
    //radar,
  },
  data() {
    return {
      loaded: false,
      data1: {
        labels: [],
        datasets: [
          {
            label: "℃",
            data: [],
            backgroundColor: "transparent",
            borderColor: "rgba(1, 116, 188, 0.50)",
            pointBackgroundColor: "rgba(171, 71, 188, 1)",
          },
        ],
      },

      data2: {
        labels: ["rain", "cloud", "sun"],
        datasets: [
          {
            label: "℃",
            data: [20, 10, 40],
            data2: [],
            borderWidth: 1,
            borderColor: "#FC2525",
            pointBackgroundColor: "rgba(255, 0,0, 0.5)",
            pointBorderColor: "white",
            backgroundColor: "rgba(255, 0,0, 0.5)",
          },
        ],
      },

      data3: {
        labels: ["1月", "2月", "3月", "4月", "5月", "6月", "7月"],
        datasets: [
          {
            label: "My First dataset",
            backgroundColor: "rgba(179,181,198,0.2)",
            borderColor: "rgba(179,181,198,1)",
            pointBackgroundColor: "rgba(179,181,198,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(179,181,198,1)",
            data: [65, 59, 90, 81, 56, 55, 40],
          },
          {
            label: "My Second dataset",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            pointBackgroundColor: "rgba(255,99,132,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(255,99,132,1)",
            data: [28, 48, 40, 19, 96, 27, 100],
          },
        ],
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              gridLines: {
                display: true,
                color: "rgba(0, 0, 0, 0.1)",
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: "rgba(0, 0, 0, 0.1)",
              },
            },
          ],
        },
      },
      options2: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              display: false,
            },
          ],
          yAxes: [
            {
              display: false,
            },
          ],
        },
      },
    };
  },
  created: function () {
    let m = moment();
    let Year = m.format("YYYY");
    let Month = m.format("MM");
    let day = m.format("DD");
    this.Today = Year + "" + Month + "" + day;
    this.db = firebase.firestore();

    this.db
      .collection(this.$route.params.place)
      .where("Timestamp", "<=", this.Today) //今日までのtempを取得
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.data1.datasets[0].data.push(doc.data().temp);
          this.data1.labels.push(doc.data().Timestamp2);
          this.loaded = true;
        });
      });
  },
};
</script>