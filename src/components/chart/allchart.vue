<script>
import { Line } from "vue-chartjs";
import firebase from "firebase";
import moment from "moment";

export default {
  extends: Line,
  data() {
    return {
      Today:null,
      data: {
        labels: [],
        datasets: [
          {
            label: "osaka",
            data: [],
            backgroundColor: "transparent",
            borderColor: "rgba(1, 116, 188, 0.50)",
            pointBackgroundColor: "rgba(171, 71, 188, 1)"
          }
          /*
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
          }*/
        ]
      }
    };
  },

  mounted() {
    this.renderChart(this.data, {
      responsive: true,
      maintainAspectRatio: false
    });
  },

  created: function() {
    let m = moment();
    let Year = m.format("YYYY");
    let Month = m.format("MM");
    let day = m.format("DD");
    this.Today = Year + "" + Month + "" + day;
    let db = firebase.firestore();

    db.collection("osaka")
      .where("Timestamp", "<=", this.Today) //今日までのtempを取得
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.data.datasets[0].data.push(doc.data().temp);
          this.data.labels.push(doc.data().Timestamp2);
        });
      });
      
    /*
    this.db
      .collection("tokyo")
      .where("Timestamp", "<=", this.Today) //今日までのtempを取得
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.data.datasets[1].data.push(doc.data().temp);
        });
      });
    this.db
      .collection("kanazawa")
      .where("Timestamp", "<=", this.Today) //今日までのtempを取得
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.data.datasets[2].data.push(doc.data().temp);
        });
      });
    this.db
      .collection("fukuoka")
      .where("Timestamp", "<=", this.Today) //今日までのtempを取得
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.data.datasets[3].data.push(doc.data().temp);
        });
      });*/
  }
};
</script>