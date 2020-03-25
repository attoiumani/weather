<script>
import { Bar } from 'vue-chartjs';
import firebase from "firebase";

export default {
  extends: Bar,
  name: 'chart',
  data () {
    return {
      data: {
        labels: [],
        datasets: [
          {
            label: 'Line Dataset',
            data: [],
            borderColor: '#CFD8DC',
            fill: false,
            type: 'line',
            lineTension: 0.3,
          }
        ]
      },
      options: {
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Month'
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              stepSize: 10,
            }
          }]
        }
      }
    }
  },
  mounted () {
    this.renderChart(this.data, this.options)
  },
    created() {
    this.db = firebase.firestore();

    let now = new Date();
    let Year = now.getFullYear();
    let Month = now.getMonth() + 1;
    let Today = now.getDate();
    this.Today = Year + "" + Month + "" + Today;
    this.db
      .collection("kanazawa")
      .where("Timestamp", "<=", this.Today) //今日までのtempを取得
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.data.datasets[0].data.push(doc.data().temp);
          this.data.labels.push(doc.data().Timestamp);
        });
      });
  }
}
</script>