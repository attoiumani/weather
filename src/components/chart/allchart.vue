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
            label: "℃",
            data: [],
            backgroundColor: "transparent",
            borderColor: "rgba(1, 116, 188, 0.50)",
            pointBackgroundColor: "rgba(171, 71, 188, 1)"
          },
          {
            label: "max℃",
            data: [],
            backgroundColor: "transparent",
            borderColor: "red",
            pointBackgroundColor: "red"
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
          this.data.datasets[0].data.push(doc.data().temp);
          this.data.datasets[1].data.push(doc.data().maxtemp);
          this.data.labels.push(doc.data().Timestamp2);
        });
      });
  },
  props: ["place"]
};
</script>