<script>
import { Line } from "vue-chartjs";
import firebase from "firebase";
import moment from "moment";

export default {
  extends: Line,
  data() {
    return {
      gradient: null
    };
  },
  mounted() {
    let chartData = {
      labels: [],
      datasets: [
        {
          label: "Data One",
          borderColor: "#FC2525",
          pointBackgroundColor: "white",
          borderWidth: 1,
          pointBorderColor: "white",
          backgroundColor: this.gradient,
          data: []
        }
      ]
    };

    this.renderChart(chartData, {
      responsive: true,
      maintainAspectRatio: false
    });

    this.db = firebase.firestore();

    let m = moment();
    let Year = m.format("YYYY");
    let Month = m.format("MM");
    let day = m.format("DD");
    this.Today = Year + "" + Month + "" + day;
    this.db
      .collection(this.place)
      .where("Timestamp", "<=", this.Today) //今日までのtempを取得
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          chartData.datasets[0].data.push(doc.data().temp);
          chartData.labels.push(doc.data().Timestamp2);
        });
      });
  }
};
</script>
