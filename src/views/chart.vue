<template>
  <allchart v-if="loaded" :data="data" :options="options" />
</template>

<script>
import firebase from "firebase";
import moment from "moment";
import allchart from "@/components/chart/allchart";

export default {
  components: {
    allchart
  },
  data() {
    return {
      loaded: false,
      Today: null,
      data: {
        labels: [],
        datasets: [
          {
            label: "osaka",
            data: [],
            backgroundColor: "transparent",
            borderColor: "rgba(1, 116, 188, 0.50)",
            pointBackgroundColor: "rgba(171, 71, 188, 1)"
          },
          {
            label: "tokyo",
            data: [],
            backgroundColor: "transparent",
            borderColor: "red",
            pointBackgroundColor: "red"
          },
          {
            label: "kanazawa",
            data: [],
            backgroundColor: "transparent",
            borderColor: "green",
            pointBackgroundColor: "green"
          },
          {
            label: "fukuoka",
            data: [],
            backgroundColor: "transparent",
            borderColor: "yellow",
            pointBackgroundColor: "yellow"
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
    let db = firebase.firestore();
    const place = ["osaka", "tokyo", "kanazawa", "fukuoka"];

    for (let i = 0; i < place.length; i++) {
      db.collection(place[i])
        .where("Timestamp", "<=", this.Today) //今日までのtempを取得
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.data.datasets[i].data.push(doc.data().temp);
          });
        });
    }

    db.collection("fukuoka")
      .where("Timestamp", "<=", this.Today) //今日までのtempを取得
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.data.labels.push(doc.data().Timestamp2);
          this.loaded = true;
        });
      });
  }
};
</script>