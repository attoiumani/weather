<script>
import { Pie } from "vue-chartjs";
import firebase from "firebase";
import moment from "moment";

export default {
  extends: Pie,
  data() {
    return {
      data: {
        labels: ["rain","sun","clouds","snow"],
        datasets: [
          {
            label: "℃",
            data: [],
            borderWidth: 1,
            borderColor: "#FC2525",
            pointBackgroundColor: "rgba(255, 0,0, 0.5)",
            pointBorderColor: "white",
            backgroundColor: "rgba(255, 0,0, 0.5)",
          }
        ]
      },
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
          this.data.datasets[0].data.push(doc.data().condition);
        });
      });
  },
  props: ["place"]
};
</script>