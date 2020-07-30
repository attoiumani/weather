<template >
  <div class="container">
    <div id="tree">
      <GChart
        :settings="{ packages: ['orgchart'], callback: ()=>{this.drawChart()} }"
        type="OrgChart"
        :data="chartData"
      />
    </div>
  </div>
</template>

<script>
import { GChart } from "vue-google-charts";

export default {
  components: {
    GChart
  },
  data() {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: null
    };
  },
  methods: {
    drawChart() {
      this.chartData = new google.visualization.DataTable();
      this.chartData.addColumn("string", "Name");
      this.chartData.addColumn("string", "Manager");
      this.chartData.addColumn("string", "ToolTip");

      // For each orgchart box, provide the name, manager, and tooltip to show.
      this.chartData.addRows([
        [
          {
            v: "Mike",
            f: 'Mike<div style="color:red; font-style:italic">President</div>'
          },
          "",
          "The President"
        ],
        [
          {
            v: "Jim",
            f:
              'Jim<div style="color:red; font-style:italic">Vice President</div>'
          },
          "Mike",
          "VP"
        ],
        ["Alice", "Mike", ""],
        ["Bob", "Jim", "Bob Sponge"],
        ["Carol", "Bob", ""]
      ]);

      // Create the chart.
      var chart = new google.visualization.OrgChart(
        document.getElementById("tree")
      );
      // Draw the chart, setting the allowHtml option to true for the tooltips.

      chart.draw(this.chartData, { allowHtml: true });
    }
  }
};
</script>