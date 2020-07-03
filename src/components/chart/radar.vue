<script>
import { Radar } from "vue-chartjs";
const MyChart = {
  extends: Radar,
  props: ["data", "options"],
  mounted() {
    this.renderChart(this.data , this.options);
  },
  /*watch: {
    data: {
      handler() {
        this.renderChart(this.data, this.options);
        // for more errors uncomment this instead:
        // this.$data._chart.update();
      },
      deep: true
    }
  }*/
};
export default MyChart;
</script>