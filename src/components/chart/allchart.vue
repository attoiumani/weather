<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: {
    options: Number,
    data: Number
  },
  mounted() {
    this.renderLineChart();
  },
  computed: {
    chartData: function() {
      return this.data;
    }
  },
  methods: {
    renderLineChart: function() {
      this.renderChart(this.chartData, this.options);
    }
  },
  watch: {
    data: {
      handler() {
        this.renderChart(this.chartData, this.options);
        this._chart.destroy();
        this.renderLineChart();
      },
      deep: true,
      immediate: false
    }
  }
};
</script>