<script>
import { Line } from "vue-chartjs";
import firebase from "firebase";
import moment from "moment";

export default {
  extends: Line,
  data() {
    return {
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
          }
        ]
      }
    };
  },
  mounted() {
    this.renderChart(this.data, {
      responsive: true,
      maintainAspectRatio: false
    });

    let m = moment();
    let Year = m.format("YYYY");
    let Month = m.format("MM");
    let day = m.format("DD");
    this.Today = Year + "" + Month + "" + day;
    this.db = firebase.firestore();

    /*for (let i = 0; i < this.data.length; i++) {
      chartData.labels.push(this.data[i].date);
      chartData.datasets[0].data.push(this.data[i].new);
      chartData.datasets[1].data.push(this.data[i].old);
    }*/
    this.db
      .collection("osaka")
      .where("Timestamp", "<=", this.Today) //今日までのtempを取得
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.data.datasets[0].data.push(doc.data().temp);
          this.data.labels.push(doc.data().Timestamp2);
        });
      });
    this.db
      .collection("tokyo")
      .where("Timestamp", "<=", this.Today) //今日までのtempを取得
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.data.datasets[1].data.push(doc.data().temp);
          this.data.labels.push(doc.data().Timestamp2);
        });
      });
    this.db
      .collection("kanazawa")
      .where("Timestamp", "<=", this.Today) //今日までのtempを取得
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.data.datasets[2].data.push(doc.data().temp);
          this.data.labels.push(doc.data().Timestamp2);
        });
      });
  }
};
</script>