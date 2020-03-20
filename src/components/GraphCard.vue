<template>
  <div class="graph">
    <!---- ↓追加 ---->
    <line-chart class="chart" :data="getChartData()" :options="getOptions()" :height="270" :width="770"></line-chart>
  </div>
</template>
<script>
import LineChart from "@/components/LineChart";    //←追加
export default {
  components: {
    LineChart        //←追加
  },
  props: {
    name: String,
    data: Array,     //←追加
    label: Array     //←追加
  },

  data() {
    return {
      graphData: null
    };
  },
  methods: {
    getChartData() {
      return {
        labels: this.label,
        datasets: [
          {
            data: this.data,
            borderColor: "#3280f57e",
            backgroundColor: "#3280f528",
            animation: false
          }
        ]
      };
    },
    getOptions() {
      // TODO: fix min and max value
      return {
        legend: {
          display: false
        },
        scales: {
          yAxes: [
            {
              ticks: {
                min: 200,
                max: 600,
                stepSize: 100
              }
            }
          ]
        }
      };
    }

  }
};
</script>
<style scoped lang="scss">
.graph {
  display: inline-block;
  margin: 0 0 40px 40px;
  height: 300px;
  width: 770px;
  background-color: white;
  border: 0 solid #aaa;
  border-radius: 4px;
  box-shadow: 2px 2px 2px 2px #ccc;
  padding: 15px;
}
// ↓追加
.chart {
  padding-top: 15px;
}
</style>