<template>
<div id="app">
  <linechart place="osaka" />
  <piechart place="osaka" />
  </div>
</template>

<script>
import linechart from "@/components/chart/linechart";
import piechart from "@/components/chart/piechart";

export default {
  components: {
    linechart,
    piechart
  }
};
</script>