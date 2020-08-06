<script>
import { Line } from "vue-chartjs";
const MyChart = {
  extends: Line,
  props: ["data", "options"],
  mounted() {
    this.renderChart(this.data , this.options);
  },
};
export default MyChart;
</script>