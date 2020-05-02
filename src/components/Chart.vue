<script>
import { Bar } from "vue-chartjs";
import firebase from "firebase";
import moment from "moment";

export default {
  extends: Bar,
  name: "chart",
  data() {
    return {
      data: {
        labels: [],
        datasets: [
          {
            label: "Line Dataset",
            data: [],
            borderColor: "#CFD8DC",
            fill: false,
            type: "line",
            lineTension: 0.3
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                stepSize: 10
              }
            }
          ]
        }
      }
    };
  },
  mounted() {
    this.renderChart(this.data, this.options);
  },
  created() {
    this.db = firebase.firestore();

    let m = moment();
    let Year = m.format('YYYY');
    let Month = m.format('MM');
    let day = m.format('DD');
    this.Today = Year + "" + Month + "" + day;
    this.db
      .collection("kanazawa")
      .where("Timestamp", "<=", this.Today) //今日までのtempを取得
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.data.datasets[0].data.push(doc.data().temp);
          this.data.labels.push(doc.data().Timestamp2);
        });
      });
  }
};
</script>