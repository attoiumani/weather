<script>
import { Line } from "vue-chartjs";
export default {
  extends: Line,
  props: {
    data: Object,
    options: Object
  },
  mounted() {
    this.renderChart(this.data, this.options);
  }
};
</script>