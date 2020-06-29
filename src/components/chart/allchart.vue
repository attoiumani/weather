<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,

  props: ["data", "options"],
  mounted:function() {
    this.renderChart(this.data, this.options);
  },
  watch: {
    data: {
      handler() {
        this.renderChart(this.data, this.options);
        // for more errors uncomment this instead:
         this.$data._chart.update();
      },
      deep: true,
      immediate: false,
    }
  }
};
</script>