<script>
import { Line } from "vue-chartjs";
const MyChart = {
  extends: Line,
  props: ["data", "options"],
  mounted() {
    this.renderChart(this.data || this.chartData, this.options);
  },
  watch: {
    data: {
      handler() {
        this.renderChart(this.data, this.options);
        // for more errors uncomment this instead:
        // this.$data._chart.update();
      },
      deep: true
    }
  }
};
export default MyChart;
</script>