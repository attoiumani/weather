<template>
<div id="app">
  <linechart place="osaka" />
  <piechart place="osaka" />
  <bar place="osaka" />
  <radar place="osaka" />
  </div>
</template>

<script>
import linechart from "@/components/chart/linechart";
import piechart from "@/components/chart/piechart";
import radar from "@/components/chart/radar";
import bar from "@/components/chart/bar";

export default {
  components: {
    linechart,
    piechart,
    radar,
    bar,
  }
};
</script>