<script>
import { Line } from "vue-chartjs";
import firebase from "firebase";
import moment from "moment";

export default {
  extends: Line,
  data() {
    return {
      gradient: null,
    };
  },
  mounted() {
    this.renderChart(
      {
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
          },
        ]
      },
      { responsive: true, maintainAspectRatio: false }
    );
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
          this.data.datasets[0].data.push(doc.data().temp);
          this.data.labels.push(doc.data().Timestamp2);
        });
      });
  }
};
</script>
