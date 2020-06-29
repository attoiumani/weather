<script>
import { Line,mixins } from "vue-chartjs";
const { reactiveProp } = mixins;
export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ["data", "options"],
  mounted() {
    this.renderChart(this.data, this.options);
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
</script>