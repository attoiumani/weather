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
            label: "max",
            data: [],
            borderWidth: 1,
            borderColor: "#FC2525",
            pointBackgroundColor: "rgba(255, 0,0, 0.5)",
            pointBorderColor: "white",
            backgroundColor: "rgba(255, 0, 0, 0.3)"
          },
          {
            label: "min",
            data: [],
            borderColor: "#05CBE1",
            pointBackgroundColor: "white",
            pointBorderColor: "white",
            borderWidth: 1,
            backgroundColor: "rgba(0, 0, 255, 0.3)"
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
    this.db
      .collection(this.place)
      .where("Timestamp", "<=", this.Today) //今日までのtempを取得
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.data.datasets[0].data.push(doc.data().maxtemp);
          this.data.datasets[1].data.push(doc.data().mintemp);
          this.data.labels.push(doc.data().Timestamp2);
        });
      });
  },
  props: ["place"]
};
</script>